import Anthropic from '@anthropic-ai/sdk';
import type { SEOLandingPageData, SEOContentSection } from '@/lib/seo-pages/types';

/**
 * Claude API Enhancement Layer (Optional).
 * Only active when claude_api_enabled = true in seo_settings.
 * Uses claude-haiku-4-5 for speed and cost efficiency.
 */

const MODEL = 'claude-haiku-4-5-20251001';

function getClient(): Anthropic | null {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;
  return new Anthropic({ apiKey });
}

export function isClaudeConfigured(): boolean {
  return !!process.env.ANTHROPIC_API_KEY;
}

/**
 * Test that the Claude API connection works.
 */
export async function testClaudeConnection(): Promise<{
  connected: boolean;
  error?: string;
}> {
  try {
    const client = getClient();
    if (!client) return { connected: false, error: 'ANTHROPIC_API_KEY not configured' };

    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 50,
      messages: [{ role: 'user', content: 'Reply with "ok"' }],
    });

    const text = response.content[0]?.type === 'text' ? response.content[0].text : '';
    return { connected: text.toLowerCase().includes('ok') };
  } catch (error: any) {
    return { connected: false, error: error.message };
  }
}

/**
 * Enhance a meta title with Claude.
 */
export async function enhanceMetaTitle(
  currentTitle: string,
  queries: string[],
  competitorTitles: string[]
): Promise<string> {
  const client = getClient();
  if (!client) throw new Error('Claude API not configured');

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 200,
    messages: [
      {
        role: 'user',
        content: `You are an SEO expert. Rewrite this meta title to be more compelling and click-worthy while keeping it under 60 characters.

Current title: "${currentTitle}"

Top search queries for this page: ${queries.slice(0, 5).join(', ')}

Competitor titles for similar pages:
${competitorTitles.slice(0, 5).map((t) => `- ${t}`).join('\n')}

Rules:
- Keep it under 60 characters
- Include the primary keyword naturally
- End with "| Siggly" brand suffix
- Make it compelling for searchers
- Don't use clickbait or misleading language

Return ONLY the new title, nothing else.`,
      },
    ],
  });

  const text = response.content[0]?.type === 'text' ? response.content[0].text : '';
  return text.trim().replace(/^["']|["']$/g, '');
}

/**
 * Enhance a meta description with Claude.
 */
export async function enhanceMetaDescription(
  currentDesc: string,
  queries: string[],
  competitorDescs: string[]
): Promise<string> {
  const client = getClient();
  if (!client) throw new Error('Claude API not configured');

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 300,
    messages: [
      {
        role: 'user',
        content: `You are an SEO expert. Rewrite this meta description to improve click-through rate while keeping it between 120-155 characters.

Current description: "${currentDesc}"

Top search queries: ${queries.slice(0, 5).join(', ')}

Competitor descriptions:
${competitorDescs.slice(0, 5).map((d) => `- ${d}`).join('\n')}

Rules:
- Between 120-155 characters
- Include a call-to-action
- Incorporate relevant keywords naturally
- Be specific about value proposition
- Don't be generic or vague

Return ONLY the new description, nothing else.`,
      },
    ],
  });

  const text = response.content[0]?.type === 'text' ? response.content[0].text : '';
  return text.trim().replace(/^["']|["']$/g, '');
}

/**
 * Generate FAQ entries with Claude.
 */
export async function generateFAQs(
  pageContext: { title: string; description: string; category: string },
  topQueries: string[]
): Promise<{ question: string; answer: string }[]> {
  const client = getClient();
  if (!client) throw new Error('Claude API not configured');

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 1500,
    messages: [
      {
        role: 'user',
        content: `Generate 3-5 FAQ entries for an email signature management page.

Page context:
- Title: "${pageContext.title}"
- Description: "${pageContext.description}"
- Category: ${pageContext.category}

Related search queries people use: ${topQueries.slice(0, 10).join(', ')}

Rules:
- Questions should match actual search queries people use
- Answers should be 2-3 sentences, helpful and specific
- Mention Siggly naturally where appropriate (don't force it)
- Focus on email signature management topics
- Don't be overly promotional

Return as JSON array: [{"question": "...", "answer": "..."}, ...]
Return ONLY the JSON array, no other text.`,
      },
    ],
  });

  const text = response.content[0]?.type === 'text' ? response.content[0].text : '[]';
  try {
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : [];
  } catch {
    return [];
  }
}

/**
 * Generate a prose content section with Claude.
 */
export async function generateProseSection(
  topic: string,
  keywords: string[],
  pageContext: { title: string; category: string }
): Promise<SEOContentSection> {
  const client = getClient();
  if (!client) throw new Error('Claude API not configured');

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 1000,
    messages: [
      {
        role: 'user',
        content: `Write a short content section for an email signature management landing page.

Topic: ${topic}
Page title: "${pageContext.title}"
Category: ${pageContext.category}
Keywords to incorporate: ${keywords.join(', ')}

Rules:
- Write 2-3 short paragraphs
- Natural, helpful tone (not salesy)
- Incorporate keywords naturally
- Relevant to email signature management
- Provide actionable insights

Return as JSON: {"type": "prose", "title": "...", "paragraphs": ["...", "..."]}
Return ONLY the JSON, no other text.`,
      },
    ],
  });

  const text = response.content[0]?.type === 'text' ? response.content[0].text : '';
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    return parsed || { type: 'prose', title: topic, paragraphs: ['Content generation failed.'] };
  } catch {
    return { type: 'prose', title: topic, paragraphs: ['Content generation failed.'] };
  }
}

/**
 * Generate a complete new SEO page with Claude.
 */
export async function generateNewPage(
  category: string,
  keywords: string[],
  competitorData: { title: string; description: string }[],
  templateExample?: Partial<SEOLandingPageData>
): Promise<SEOLandingPageData | null> {
  const client = getClient();
  if (!client) throw new Error('Claude API not configured');

  const slug = keywords[0]
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 4000,
    messages: [
      {
        role: 'user',
        content: `Generate a complete SEO landing page for an email signature management platform (Siggly).

Category: ${category}
Target keywords: ${keywords.join(', ')}
Slug: ${slug}

Competitor page titles/descriptions for reference:
${competitorData.slice(0, 5).map((c) => `- Title: "${c.title}" | Desc: "${c.description}"`).join('\n')}

${templateExample ? `Example page structure to follow:\n${JSON.stringify(templateExample, null, 2).substring(0, 2000)}` : ''}

Generate a JSON object matching this TypeScript interface:
{
  slug: string,
  category: string,
  meta: { title: string (under 60 chars), description: string (120-155 chars), keywords: string[], canonical: string },
  breadcrumbs: [{ name: string, url: string }],
  hero: { badge: { icon: string, text: string }, title: string, description: string, variant: "violet" | "emerald" | "indigo" },
  features: [{ icon: string, title: string, description: string }] (4-6 features),
  sections: [
    { type: "prose", title: string, paragraphs: string[] },
    { type: "benefits", title: string, items: [{ icon: string, title: string, description: string }] },
    { type: "checklist", title: string, items: string[] }
  ],
  faqs: [{ question: string, answer: string }] (3-5 FAQs),
  cta: { title: string, description: string, variant: "violet" }
}

Icons should be valid lucide-react icon names like: Shield, Zap, Users, Globe, Lock, BarChart, Mail, Clock, CheckCircle, Settings.
Canonical should be: /${category}/${slug}

Rules:
- Content must be helpful, specific, and unique
- Focus on email signature management benefits
- Don't be generic — make it specific to the keywords
- All content should sound natural, not AI-generated

Return ONLY the JSON object, no other text.`,
      },
    ],
  });

  const text = response.content[0]?.type === 'text' ? response.content[0].text : '';
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;
    const parsed = JSON.parse(jsonMatch[0]);
    // Ensure required fields
    parsed.slug = parsed.slug || slug;
    parsed.category = parsed.category || category;
    return parsed as SEOLandingPageData;
  } catch {
    return null;
  }
}

/**
 * Enhance a full recommendation value with Claude based on type.
 */
export async function enhanceRecommendation(
  recommendationType: string,
  currentValue: any,
  suggestedValue: any,
  dataBasis: any
): Promise<any> {
  switch (recommendationType) {
    case 'meta_title':
      return {
        ...suggestedValue,
        title: await enhanceMetaTitle(
          currentValue?.title || '',
          (dataBasis?.topQueries || []).map((q: any) => q.query || q),
          (dataBasis?.competitorPatterns?.competitorMeta || []).map((c: any) => c.title)
        ),
      };

    case 'meta_description':
      return {
        ...suggestedValue,
        description: await enhanceMetaDescription(
          currentValue?.description || '',
          (dataBasis?.topQueries || []).map((q: any) => q.query || q),
          (dataBasis?.competitorPatterns?.competitorMeta || []).map((c: any) => c.description)
        ),
      };

    case 'add_faq':
      return {
        faqs: await generateFAQs(
          {
            title: currentValue?.title || '',
            description: currentValue?.description || '',
            category: dataBasis?.category || 'general',
          },
          (dataBasis?.topQueries || []).map((q: any) => q.query || q)
        ),
      };

    default:
      // For types without specific enhancement, return the template suggestion
      return suggestedValue;
  }
}
