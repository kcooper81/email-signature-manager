import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Mail, Clock, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { createServiceClient } from '@/lib/supabase/server';
import { generateMetadata as genMeta, generateArticleSchema } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';

export const revalidate = 3600;
export const dynamicParams = true;

interface HelpArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  article_type: string;
  created_at: string;
  updated_at: string;
}

const typeLabels: Record<string, string> = {
  faq: 'FAQ',
  guide: 'Guide',
  tutorial: 'Tutorial',
};

async function getArticle(slug: string): Promise<HelpArticle | null> {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('help_articles')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();
  if (error || !data) return null;
  return data as HelpArticle;
}

/** Strip markdown to a plain-text meta description, trimmed to ~155 chars. */
function toDescription(markdown: string): string {
  const plain = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`~-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return plain.length > 155 ? `${plain.slice(0, 152).trimEnd()}…` : plain;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) {
    return genMeta({
      title: 'Help Article Not Found',
      description: 'The help article you are looking for could not be found.',
      canonical: `/help/${slug}`,
      noIndex: true,
    });
  }
  return genMeta({
    // genMeta appends the single " | Siggly" brand suffix, so don't add one here.
    title: article.title,
    description: toDescription(article.content) || `${article.title} — Siggly Help Center.`,
    canonical: `/help/${slug}`,
  });
}

export default async function HelpArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const articleSchema = generateArticleSchema({
    title: article.title,
    description: toDescription(article.content) || article.title,
    url: `/help/${slug}`,
  });

  return (
    <div className="bg-gray-50 min-h-[60vh]">
      <JsonLd data={articleSchema} />
      {/* Breadcrumb bar */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/help" className="hover:text-gray-900 transition-colors">
              Help Center
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium truncate">{article.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <article className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Article Header */}
          <div className="px-8 md:px-12 pt-8 md:pt-10 pb-6 border-b border-gray-100">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
                <Tag className="h-3 w-3" />
                {article.category}
              </span>
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                {typeLabels[article.article_type] || article.article_type}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">
              {article.title}
            </h1>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Clock className="h-3 w-3" />
              Last updated {new Date(article.updated_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>

          {/* Article Content */}
          <div className="px-8 md:px-12 py-8 md:py-10">
            <div className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-h2:text-xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-3 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-100 prose-h3:text-lg prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-2 prose-p:text-gray-600 prose-p:leading-relaxed prose-p:my-3 prose-ul:my-3 prose-ul:space-y-1 prose-ol:my-3 prose-ol:space-y-1 prose-li:text-gray-600 prose-li:leading-relaxed prose-strong:text-gray-800 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:text-gray-800 prose-code:before:content-none prose-code:after:content-none prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50/50 prose-blockquote:rounded-r-lg prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:not-italic prose-blockquote:text-gray-700 prose-hr:my-8 prose-img:rounded-lg prose-img:shadow-sm">
              <ReactMarkdown>{article.content}</ReactMarkdown>
            </div>
          </div>

          {/* Article Footer */}
          <div className="px-8 md:px-12 pb-8 md:pb-10">
            <div className="bg-gradient-to-br from-blue-50 to-violet-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-1.5">Need More Help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Our support team is here to help if you have questions.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="mailto:support@siggly.io">
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors">
                    <Mail className="h-3.5 w-3.5" />
                    Email Support
                  </button>
                </a>
                <Link href="/help">
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium transition-colors">
                    <ArrowLeft className="h-3.5 w-3.5" />
                    All Articles
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
