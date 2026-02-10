'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2, BookOpen } from 'lucide-react';
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Link 
            href="/help" 
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Help Center
          </Link>
          <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Article Not Found</h1>
            <p className="text-gray-600 mb-6">
              The help article you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/help">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Browse Help Center
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link 
          href="/help" 
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Help Center
        </Link>

        <article className="bg-white rounded-xl shadow-sm border p-8 md:p-12">
          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {article.category}
              </span>
              <span className="text-sm text-gray-500">
                {article.article_type}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {article.title}
            </h1>
            <p className="text-sm text-gray-500">
              Last updated: {new Date(article.updated_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>

          {/* Article Content */}
          <div className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3 prose-p:text-gray-700 prose-p:leading-relaxed prose-ul:my-4 prose-li:text-gray-700 prose-strong:text-gray-900">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>

          {/* Article Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Need More Help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                    Contact Support
                  </button>
                </Link>
                <Link href="/help">
                  <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
                    Browse All Articles
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
