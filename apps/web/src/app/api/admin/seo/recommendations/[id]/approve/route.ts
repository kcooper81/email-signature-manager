import { NextRequest, NextResponse } from 'next/server';
import { verifySuperAdmin } from '@/lib/seo/admin-auth';
import { generateAndStorePage } from '@/lib/seo/page-generator';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await verifySuperAdmin();
    if (auth instanceof NextResponse) return auth;
    const { supabaseAdmin, userId } = auth;

    const { id } = await params;

    // Fetch the recommendation
    const { data: recommendation, error: fetchError } = await supabaseAdmin
      .from('seo_recommendations')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !recommendation) {
      return NextResponse.json({ error: 'Recommendation not found' }, { status: 404 });
    }

    if (recommendation.status !== 'pending' && recommendation.status !== 'rolled_back') {
      return NextResponse.json(
        { error: `Recommendation is already ${recommendation.status}` },
        { status: 400 }
      );
    }

    const isReapply = recommendation.status === 'rolled_back';
    const now = new Date().toISOString();
    const suggestedValue = recommendation.suggested_value as Record<string, unknown>;

    // Update recommendation status
    const { error: updateError } = await supabaseAdmin
      .from('seo_recommendations')
      .update({
        status: 'applied',
        applied_by: isReapply ? 're-apply' : 'manual',
        applied_at: now,
      })
      .eq('id', id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    // --- Handle new_page: generate a draft page ---
    let generatedPageId: string | null = null;
    let generatedPageUrl: string | null = null;

    if (recommendation.recommendation_type === 'new_page') {
      const category = (suggestedValue.category as string) || 'guides';
      const slug = (suggestedValue.suggestedSlug as string) || 'untitled';
      const keyword = (suggestedValue.keyword as string) || slug;
      const competitorTitles = (suggestedValue.competitorTitles as string[]) || [];

      // Check if Claude is enabled for AI generation
      const { data: settings } = await supabaseAdmin
        .from('seo_settings')
        .select('claude_api_enabled')
        .limit(1)
        .single();

      const useAI = settings?.claude_api_enabled && !!process.env.ANTHROPIC_API_KEY;

      const result = await generateAndStorePage(
        supabaseAdmin,
        category,
        slug,
        keyword,
        competitorTitles.map((t) => ({ title: t, description: '' })),
        useAI,
        id
      );

      if (result.success && result.pageId) {
        generatedPageId = result.pageId;
        // Build the preview URL based on category routing
        const routePrefixes: Record<string, string> = {
          alternatives: '/alternatives', features: '/features',
          industries: '/industries', 'use-cases': '/use-cases',
          integrations: '/integrations', guides: '/guides',
          compare: '/compare', compliance: '/compliance',
          'migrate-from': '/migrate-from', glossary: '/glossary',
          examples: '/examples', 'case-studies': '/case-studies',
          checklists: '/checklists', platforms: '/platforms',
          for: '/for', 'email-signature-templates': '/email-signature-templates',
          'email-signatures': '/email-signatures',
        };
        const prefix = routePrefixes[category] || `/${category}`;
        generatedPageUrl = `${prefix}/${slug}`;

        // Store generated page info back on the recommendation for UI access
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

      // Log the action
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
        },
      });

      return NextResponse.json({
        success: true,
        recommendation_id: id,
        type: 'new_page',
        generated_page_id: generatedPageId,
        generated_page_url: generatedPageUrl,
        page_status: 'draft',
      });
    }

    // --- Handle content overrides for existing pages ---
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

      // Only upsert if we have something to override
      if (Object.keys(overrideData).length > 4) {
        const { error: upsertError } = await supabaseAdmin
          .from('seo_content_overrides')
          .upsert(overrideData, { onConflict: 'page_url' });

        if (upsertError) {
          return NextResponse.json(
            { error: `Override upsert failed: ${upsertError.message}` },
            { status: 500 }
          );
        }
      }
    }

    // Log the action
    await supabaseAdmin.from('seo_change_log').insert({
      action: 'override_applied',
      page_url: recommendation.page_url,
      details: {
        recommendation_id: id,
        recommendation_type: recommendation.recommendation_type,
        suggested_value: recommendation.suggested_value,
        applied_by_user: userId,
      },
    });

    return NextResponse.json({
      success: true,
      recommendation_id: id,
      type: recommendation.recommendation_type,
      page_url: recommendation.page_url,
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
