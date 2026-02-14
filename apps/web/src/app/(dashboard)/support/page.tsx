'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { PageHeader } from '@/components/dashboard';
import { 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  FileText, 
  Rocket,
  Users,
  Settings,
  Shield,
  Zap,
  Link2,
  Loader2,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

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

function FAQItem({ article }: { article: HelpArticle }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left hover:bg-secondary px-4 -mx-4 transition-colors"
      >
        <span className="font-medium text-foreground pr-4">{article.title}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="pb-4 text-muted-foreground text-sm leading-relaxed prose prose-sm max-w-none">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default function SupportPage() {
  const [articles, setArticles] = useState<HelpArticle[]>([]);
  const [categories, setCategories] = useState<HelpCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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

  const filteredArticles = selectedCategory
    ? articles.filter((a) => a.category === selectedCategory)
    : articles;

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

      {/* Contact Options */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-violet-100 p-3">
              <Mail className="h-6 w-6 text-violet-600" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Email Support</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Get help from our support team. We typically respond within 24 hours.
              </p>
              <a
                href="mailto:support@siggly.io"
                className="text-sm text-violet-600 hover:text-violet-700 font-medium mt-2 inline-block"
              >
                support@siggly.io
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>
            Browse by category or search for answers
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === null
                  ? 'bg-violet-600 text-white'
                  : 'bg-muted text-muted-foreground hover:bg-secondary'
              }`}
            >
              All
            </button>
            {categories.map((category) => {
              const IconComponent = iconMap[category.icon] || FileText;
              return (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.name
                      ? 'bg-violet-600 text-white'
                      : 'bg-muted text-muted-foreground hover:bg-secondary'
                  }`}
                >
                  <IconComponent className="h-3.5 w-3.5" />
                  {category.name}
                </button>
              );
            })}
          </div>

          {/* FAQ List */}
          <div className="divide-y divide-gray-100">
            {filteredArticles.map((article) => (
              <FAQItem key={article.id} article={article} />
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No FAQs found for this category.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Still Need Help */}
      <Card className="bg-gradient-to-r from-violet-50 to-blue-50 border-violet-200">
        <CardContent className="p-6 text-center">
          <h3 className="font-semibold text-foreground mb-2">Still need help?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <a
            href="mailto:support@siggly.io"
            className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors"
          >
            <Mail className="h-4 w-4" />
            Contact Support
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
