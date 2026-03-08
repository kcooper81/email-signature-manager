import { NextRequest, NextResponse } from 'next/server';
import { verifySuperAdmin } from '@/lib/seo/admin-auth';
import { getStaticPageByCanonical } from '@/lib/seo/data-collector';
import { generateFixForIssue } from '@/lib/seo/score-to-recs';
import type { SEOLandingPageData } from '@/lib/seo-pages/types';

const VALID_CATEGORIES = ['metaTitle', 'metaDescription', 'faqCoverage', 'contentDepth'] as const;
type IssueCategory = (typeof VALID_CATEGORIES)[number];

export async function POST(request: NextRequest) {
  try {
    const auth = await verifySuperAdmin();
    if (auth instanceof NextResponse) return auth;
    const { supabaseAdmin } = auth;

    const body = await request.json();
    const { page_url, issue_category } = body as {
      page_url?: string;
      issue_category?: string;
    };

    if (!page_url || !issue_category) {
      return NextResponse.json(
        { error: 'page_url and issue_category are required' },
        { status: 400 }
      );
    }

    if (!VALID_CATEGORIES.includes(issue_category as IssueCategory)) {
      return NextResponse.json(
        { error: `Invalid issue_category. Must be one of: ${VALID_CATEGORIES.join(', ')}` },
        { status: 400 }
      );
    }

    // Look up page data — try static pages first, then generated pages
    let pageData: SEOLandingPageData | null = getStaticPageByCanonical(page_url);

    if (!pageData) {
      // Try generated pages
      const { data: generatedPages } = await supabaseAdmin
        .from('seo_generated_pages')
        .select('page_data')
        .in('status', ['draft', 'published']);

      for (const row of generatedPages || []) {
        const pd = row.page_data as SEOLandingPageData;
        if (pd?.meta?.canonical === page_url) {
          pageData = pd;
          break;
        }
      }
    }

    if (!pageData) {
      return NextResponse.json(
        { error: `Page not found: ${page_url}` },
        { status: 404 }
      );
    }

    // Generate the fix recommendation
    const rec = generateFixForIssue(pageData, issue_category as IssueCategory);

    if (!rec) {
      return NextResponse.json(
        { error: 'No fixable issues found for this category on this page' },
        { status: 200 }
      );
    }

    // Check for existing pending/applied rec with same page_url + type
    const { data: existing } = await supabaseAdmin
      .from('seo_recommendations')
      .select('id')
      .eq('page_url', rec.page_url)
      .eq('recommendation_type', rec.recommendation_type)
      .in('status', ['pending', 'applied'])
      .limit(1)
      .single();

    if (existing) {
      return NextResponse.json({
        created: false,
        existing_id: existing.id,
        message: 'A recommendation already exists for this page and type',
      });
    }

    // Insert the recommendation
    const { data: inserted, error: insertError } = await supabaseAdmin
      .from('seo_recommendations')
      .insert({
        page_url: rec.page_url,
        recommendation_type: rec.recommendation_type,
        current_value: rec.current_value,
        suggested_value: rec.suggested_value,
        rationale: rec.rationale,
        confidence: rec.confidence,
        data_basis: rec.data_basis,
        status: 'pending',
      })
      .select('id')
      .single();

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({
      created: true,
      recommendation_id: inserted.id,
      recommendation_type: rec.recommendation_type,
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
