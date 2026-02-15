'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2, BookOpen, Mail, ArrowRight, Clock, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

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

export default function HelpArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [article, setArticle] = useState<HelpArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`/api/help/articles/${slug}`);
        if (!response.ok) {
          throw new Error('Article not found');
        }
        const data = await response.json();
        setArticle(data.article);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-[60vh] bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <Link
            href="/help"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Help Center
          </Link>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10 text-center">
            <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-5">
              <BookOpen className="h-7 w-7 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Article Not Found</h1>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              The help article you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Link href="/help">
              <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors">
                Browse Help Center
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-[60vh]">
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
                day: 'numeric'
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
