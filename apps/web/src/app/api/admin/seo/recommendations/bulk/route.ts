import { NextRequest, NextResponse } from 'next/server';
import { verifySuperAdmin } from '@/lib/seo/admin-auth';
import { generateAndStorePage } from '@/lib/seo/page-generator';

const ROUTE_PREFIXES: Record<string, string> = {
  alternatives: '/alternatives',
  features: '/features',
  industries: '/industries',
  'use-cases': '/use-cases',
  integrations: '/integrations',
  guides: '/guides',
  compare: '/compare',
  compliance: '/compliance',
  'migrate-from': '/migrate-from',
  glossary: '/glossary',
  examples: '/examples',
  'case-studies': '/case-studies',
  checklists: '/checklists',
  platforms: '/platforms',
  for: '/for',
  'email-signature-templates': '/email-signature-templates',
  'email-signatures': '/email-signatures',
};

export async function POST(request: NextRequest) {
  try {
    const auth = await verifySuperAdmin();
    if (auth instanceof NextResponse) return auth;
    const { supabaseAdmin, userId } = auth;

    const body = await request.json();
    const { action, ids } = body as { action: string; ids: string[] };

    if (!action || !['approve', 'dismiss'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action. Must be "approve" or "dismiss".' },
        { status: 400 }
      );
    }

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: 'ids must be a non-empty array.' },
        { status: 400 }
      );
    }

    if (ids.length > 100) {
      return NextResponse.json(
        { error: 'Cannot process more than 100 recommendations at once.' },
        { status: 400 }
      );
    }

    const errors: string[] = [];
    let processed = 0;

    if (action === 'dismiss') {
      for (const id of ids) {
        try {
          const { data: rec, error: fetchError } = await supabaseAdmin
            .from('seo_recommendations')
            .select('id, status, recommendation_type, page_url')
            .eq('id', id)
            .single();

          if (fetchError || !rec) {
            errors.push(`${id}: not found`);
            continue;
          }

          if (rec.status === 'dismissed') {
            errors.push(`${id}: already dismissed`);
            continue;
          }

          const { error: updateError } = await supabaseAdmin
            .from('seo_recommendations')
            .update({ status: 'dismissed' })
            .eq('id', id);

          if (updateError) {
            errors.push(`${id}: ${updateError.message}`);
            continue;
          }

          await supabaseAdmin.from('seo_change_log').insert({
            action: 'recommendation_dismissed',
            page_url: rec.page_url,
            details: {
              recommendation_id: id,
              recommendation_type: rec.recommendation_type,
              dismissed_by_user: userId,
              bulk: true,
            },
          });

          processed++;
        } catch (err: any) {
          errors.push(`${id}: ${err.message}`);
        }
      }
    } else {
      // Bulk Approve
      const { data: settings } = await supabaseAdmin
        .from('seo_settings')
        .select('claude_api_enabled')
        .limit(1)
        .single();

      const useAI = settings?.claude_api_enabled && !!process.env.ANTHROPIC_API_KEY;

      for (const id of ids) {
        try {
          const { data: recommendation, error: fetchError } = await supabaseAdmin
            .from('seo_recommendations')
            .select('*')
            .eq('id', id)
            .single();

          if (fetchError || !recommendation) {
            errors.push(`${id}: not found`);
            continue;
          }

          if (recommendation.status !== 'pending') {
            errors.push(`${id}: already ${recommendation.status}`);
            continue;
          }

          const now = new Date().toISOString();
          const suggestedValue = recommendation.suggested_value as Record<string, unknown>;

          const { error: updateError } = await supabaseAdmin
            .from('seo_recommendations')
            .update({
              status: 'applied',
              applied_by: 'bulk',
              applied_at: now,
            })
            .eq('id', id);

          if (updateError) {
            errors.push(`${id}: ${updateError.message}`);
            continue;
          }

          // Handle new_page
          if (recommendation.recommendation_type === 'new_page') {
            const category = (suggestedValue.category as string) || 'guides';
            const slug = (suggestedValue.suggestedSlug as string) || 'untitled';
            const keyword = (suggestedValue.keyword as string) || slug;
            const competitorTitles = (suggestedValue.competitorTitles as string[]) || [];

            const result = await generateAndStorePage(
              supabaseAdmin,
              category,
              slug,
              keyword,
              competitorTitles.map((t) => ({ title: t, description: '' })),
              useAI,
              id
            );

            let generatedPageId: string | null = null;
            let generatedPageUrl: string | null = null;

            if (result.success && result.pageId) {
              generatedPageId = result.pageId;
              const prefix = ROUTE_PREFIXES[category] || `/${category}`;
              generatedPageUrl = `${prefix}/${slug}`;

              await supabaseAdmin
                .from('seo_recommendations')
                .update({
                  suggested_value: {
                    ...suggestedValue,
                    generated_page_id: generatedPageId,
                    generated_page_url: generatedPageUrl,
                  },
                })
                .eq('id', id);
            }

            await supabaseAdmin.from('seo_change_log').insert({
              action: 'page_generated',
              page_url: generatedPageUrl,
              details: {
                recommendation_id: id,
                generated_page_id: generatedPageId,
                category,
                slug,
                keyword,
                status: result.success ? 'draft' : 'failed',
                error: result.error || null,
                applied_by_user: userId,
                bulk: true,
              },
            });

            processed++;
            continue;
          }

          // Handle content overrides for existing pages
          if (recommendation.page_url) {
            const overrideData: Record<string, unknown> = {
              page_url: recommendation.page_url,
              is_active: true,
              recommendation_id: id,
              updated_at: now,
            };

            switch (recommendation.recommendation_type) {
              case 'meta_title':
                overrideData.meta_title = suggestedValue.title || null;
                break;
              case 'meta_description':
                overrideData.meta_description = suggestedValue.description || null;
                break;
              case 'add_faq':
                overrideData.additional_faqs = suggestedValue.faqs || [];
                break;
              default:
                break;
            }

            if (Object.keys(overrideData).length > 4) {
              const { error: upsertError } = await supabaseAdmin
                .from('seo_content_overrides')
                .upsert(overrideData, { onConflict: 'page_url' });

              if (upsertError) {
                errors.push(`${id}: override upsert failed - ${upsertError.message}`);
                processed++;
                continue;
              }
            }
          }

          await supabaseAdmin.from('seo_change_log').insert({
            action: 'override_applied',
            page_url: recommendation.page_url,
            details: {
              recommendation_id: id,
              recommendation_type: recommendation.recommendation_type,
              suggested_value: recommendation.suggested_value,
              applied_by_user: userId,
              bulk: true,
            },
          });

          processed++;
        } catch (err: any) {
          errors.push(`${id}: ${err.message}`);
        }
      }
    }

    return NextResponse.json({
      success: true,
      processed,
      errors,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
