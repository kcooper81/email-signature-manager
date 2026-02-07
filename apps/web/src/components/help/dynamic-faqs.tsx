'use client';

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface HelpArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  article_type: string;
}

export function DynamicFAQs() {
  const [articles, setArticles] = useState<HelpArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFAQs() {
      try {
        const response = await fetch('/api/help/articles?location=marketing&type=faq');
        if (response.ok) {
          const data = await response.json();
          setArticles(data.articles || []);
        }
      } catch (err) {
        console.error('Error loading FAQs:', err);
      } finally {
        setLoading(false);
      }
    }

    loadFAQs();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No FAQs available at this time.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {articles.map((article) => (
        <div key={article.id} className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-semibold mb-2">{article.title}</h3>
          <p className="text-gray-600">{article.content}</p>
        </div>
      ))}
    </div>
  );
}
