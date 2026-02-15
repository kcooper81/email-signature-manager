'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { PageHeader } from '@/components/dashboard';
import {
  ChevronDown,
  Mail,
  FileText,
  Rocket,
  Users,
  Settings,
  Shield,
  Zap,
  Link2,
  Loader2,
  Search,
  BookOpen,
  ExternalLink,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

interface HelpArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  article_type: string;
}

interface HelpCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  sort_order: number;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Rocket,
  Zap,
  FileText,
  Settings,
  Shield,
  Link2,
  Users,
};

function FAQItem({ article, defaultOpen = false }: { article: HelpArticle; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
      >
        <span className="font-medium text-foreground pr-4 text-sm">{article.title}</span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-200 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 pt-0 border-t border-border">
            <div className="prose prose-sm max-w-none dark:prose-invert text-muted-foreground prose-headings:text-foreground prose-strong:text-foreground prose-a:text-primary prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5 prose-p:my-2 prose-p:leading-relaxed prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-foreground prose-code:text-xs mt-3">
              <ReactMarkdown>{article.content}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SupportPage() {
  const [articles, setArticles] = useState<HelpArticle[]>([]);
  const [categories, setCategories] = useState<HelpCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const [articlesRes, categoriesRes] = await Promise.all([
          fetch('/api/help/articles?location=dashboard&type=faq'),
          fetch('/api/help/categories'),
        ]);

        if (articlesRes.ok) {
          const data = await articlesRes.json();
          setArticles(data.articles || []);
        }

        if (categoriesRes.ok) {
          const data = await categoriesRes.json();
          setCategories(data.categories || []);
        }
      } catch (err) {
        console.error('Error loading help data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const filteredArticles = useMemo(() => {
    let result = articles;
    if (selectedCategory) {
      result = result.filter((a) => a.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(query) ||
          a.content.toLowerCase().includes(query)
      );
    }
    return result;
  }, [articles, selectedCategory, searchQuery]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Help & Support"
        description="Find answers to common questions or get in touch with our team"
      />

      {/* Search & Quick Links */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search help articles..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value) setSelectedCategory(null);
                }}
                className="w-full pl-9 pr-4 py-2.5 bg-muted/50 border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
          </CardContent>
        </Card>

        {/* Email Support */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2.5 shrink-0">
                <Mail className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0">
                <h3 className="font-medium text-foreground text-sm">Email Support</h3>
                <a
                  href="mailto:support@siggly.io"
                  className="text-xs text-primary hover:underline"
                >
                  support@siggly.io
                </a>
              </div>
              <span className="text-[11px] text-muted-foreground ml-auto shrink-0">
                ~24hr response
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <CardTitle>Frequently Asked Questions</CardTitle>
          </div>
          <CardDescription>
            {searchQuery
              ? `${filteredArticles.length} result${filteredArticles.length !== 1 ? 's' : ''} for "${searchQuery}"`
              : 'Browse by category or search for answers'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Category Filter */}
          {!searchQuery && (
            <div className="flex flex-wrap gap-2 mb-5">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  selectedCategory === null
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                }`}
              >
                All
              </button>
              {categories.map((category) => {
                const IconComponent = iconMap[category.icon] || FileText;
                const count = articles.filter(a => a.category === category.name).length;
                return (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      selectedCategory === category.name
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                    }`}
                  >
                    <IconComponent className="h-3 w-3" />
                    {category.name}
                    <span className="opacity-60">({count})</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* FAQ List */}
          <div className="space-y-2">
            {filteredArticles.map((article, index) => (
              <FAQItem
                key={article.id}
                article={article}
                defaultOpen={searchQuery.trim().length > 0 && index === 0}
              />
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-10">
              <Search className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">
                {searchQuery
                  ? `No results found for "${searchQuery}". Try different keywords.`
                  : 'No FAQs found for this category.'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Full Help Center Link */}
      <Link href="/help" target="_blank">
        <Card className="group hover:border-primary/30 transition-colors cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-500/10 p-2.5">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground text-sm">Full Help Center</h3>
                  <p className="text-xs text-muted-foreground">
                    Browse detailed guides, tutorials, and release notes
                  </p>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </CardContent>
        </Card>
      </Link>

      {/* Still Need Help */}
      <Card className="bg-gradient-to-r from-primary/5 to-blue-500/5 border-primary/20">
        <CardContent className="p-6 text-center">
          <h3 className="font-semibold text-foreground mb-2">Still need help?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <a
            href="mailto:support@siggly.io"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Mail className="h-4 w-4" />
            Contact Support
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
