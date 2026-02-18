'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useBulkSelection } from '@/hooks/use-bulk-selection';
import { BulkActionBar, type BulkAction } from '@/components/admin/bulk-action-bar';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Eye, 
  EyeOff,
  Save,
  X,
  Loader2,
  FileText,
  BookOpen,
} from 'lucide-react';

interface HelpArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  article_type: 'faq' | 'guide' | 'tutorial';
  show_in_marketing: boolean;
  show_in_dashboard: boolean;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

interface HelpCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  sort_order: number;
}

const ARTICLE_TYPES = [
  { value: 'faq', label: 'FAQ' },
  { value: 'guide', label: 'Guide' },
  { value: 'tutorial', label: 'Tutorial' },
];

export default function AdminHelpPage() {
  const [articles, setArticles] = useState<HelpArticle[]>([]);
  const [categories, setCategories] = useState<HelpCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingArticle, setEditingArticle] = useState<HelpArticle | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    category: '',
    article_type: 'faq' as 'faq' | 'guide' | 'tutorial',
    show_in_marketing: true,
    show_in_dashboard: true,
    sort_order: 0,
    is_published: true,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [articlesRes, categoriesRes] = await Promise.all([
        fetch('/api/admin/help/articles'),
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
      setError('Failed to load help articles');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }));
  };

  const startCreate = () => {
    setIsCreating(true);
    setEditingArticle(null);
    setFormData({
      title: '',
      slug: '',
      content: '',
      category: categories[0]?.name || '',
      article_type: 'faq',
      show_in_marketing: true,
      show_in_dashboard: true,
      sort_order: 0,
      is_published: true,
    });
  };

  const startEdit = (article: HelpArticle) => {
    setEditingArticle(article);
    setIsCreating(false);
    setFormData({
      title: article.title,
      slug: article.slug,
      content: article.content,
      category: article.category,
      article_type: article.article_type,
      show_in_marketing: article.show_in_marketing,
      show_in_dashboard: article.show_in_dashboard,
      sort_order: article.sort_order,
      is_published: article.is_published,
    });
  };

  const cancelEdit = () => {
    setEditingArticle(null);
    setIsCreating(false);
    setFormData({
      title: '',
      slug: '',
      content: '',
      category: '',
      article_type: 'faq',
      show_in_marketing: true,
      show_in_dashboard: true,
      sort_order: 0,
      is_published: true,
    });
  };

  const saveArticle = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const url = editingArticle 
        ? `/api/admin/help/articles/${editingArticle.id}`
        : '/api/admin/help/articles';
      
      const method = editingArticle ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save article');
      }

      setSuccess(editingArticle ? 'Article updated successfully' : 'Article created successfully');
      cancelEdit();
      loadData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const deleteArticle = async (articleId: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;

    try {
      const response = await fetch(`/api/admin/help/articles/${articleId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete article');
      }

      setSuccess('Article deleted successfully');
      loadData();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const togglePublished = async (article: HelpArticle) => {
    try {
      const response = await fetch(`/api/admin/help/articles/${article.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_published: !article.is_published }),
      });

      if (!response.ok) {
        throw new Error('Failed to update article');
      }

      loadData();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const filteredArticles = selectedCategory
    ? articles.filter(a => a.category === selectedCategory)
    : articles;

  const filteredArticleIds = useMemo(() => filteredArticles.map(a => a.id), [filteredArticles]);
  const bulk = useBulkSelection({ itemIds: filteredArticleIds });

  useEffect(() => {
    bulk.clearSelection();
  }, [selectedCategory]);

  const bulkPublish = async () => {
    const ids = [...bulk.selectedIds];
    for (const id of ids) {
      await fetch(`/api/admin/help/articles/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_published: true }),
      });
    }
    await loadData();
    bulk.clearSelection();
  };

  const bulkUnpublish = async () => {
    const ids = [...bulk.selectedIds];
    for (const id of ids) {
      await fetch(`/api/admin/help/articles/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_published: false }),
      });
    }
    await loadData();
    bulk.clearSelection();
  };

  const bulkDeleteArticles = async () => {
    const ids = [...bulk.selectedIds];
    for (const id of ids) {
      await fetch(`/api/admin/help/articles/${id}`, { method: 'DELETE' });
    }
    await loadData();
    bulk.clearSelection();
  };

  const bulkActions: BulkAction[] = [
    { label: 'Publish', icon: Eye, onClick: bulkPublish },
    { label: 'Unpublish', icon: EyeOff, onClick: bulkUnpublish },
    { label: 'Delete', icon: Trash2, onClick: bulkDeleteArticles, destructive: true, confirmMessage: `Permanently delete ${bulk.selectedCount} article(s)? This cannot be undone.` },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Help Articles</h1>
          <p className="text-muted-foreground">Manage FAQ and help content for marketing and dashboard</p>
        </div>
        <Button onClick={startCreate}>
          <Plus className="h-4 w-4 mr-2" />
          New Article
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
          {success}
        </div>
      )}

      {/* Editor Modal */}
      {(isCreating || editingArticle) && (
        <Card>
          <CardHeader>
            <CardTitle>{editingArticle ? 'Edit Article' : 'New Article'}</CardTitle>
            <CardDescription>
              {editingArticle ? 'Update the help article content' : 'Create a new help article'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="How do I...?"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Slug</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="how-do-i"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Content</label>
              <textarea
                className="w-full px-3 py-2 border rounded-md min-h-[120px]"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Answer or article content..."
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select
                  className="w-full px-3 py-2 border rounded-md"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <select
                  className="w-full px-3 py-2 border rounded-md"
                  value={formData.article_type}
                  onChange={(e) => setFormData(prev => ({ ...prev, article_type: e.target.value as any }))}
                >
                  {ARTICLE_TYPES.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Sort Order</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-md"
                  value={formData.sort_order}
                  onChange={(e) => setFormData(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
                />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.show_in_marketing}
                  onChange={(e) => setFormData(prev => ({ ...prev, show_in_marketing: e.target.checked }))}
                />
                <span className="text-sm">Show in Marketing (/help)</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.show_in_dashboard}
                  onChange={(e) => setFormData(prev => ({ ...prev, show_in_dashboard: e.target.checked }))}
                />
                <span className="text-sm">Show in Dashboard (/support)</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.is_published}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_published: e.target.checked }))}
                />
                <span className="text-sm">Published</span>
              </label>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={saveArticle} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={cancelEdit}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategory(null)}
        >
          All ({articles.length})
        </Button>
        {categories.map(cat => {
          const count = articles.filter(a => a.category === cat.name).length;
          return (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.name ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(cat.name)}
            >
              {cat.name} ({count})
            </Button>
          );
        })}
      </div>

      {/* Articles List */}
      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {filteredArticles.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No articles found</p>
              </div>
            ) : (
              <>
                <div className="p-4 flex items-center gap-3">
                  <Checkbox
                    checked={bulk.allSelected}
                    onCheckedChange={bulk.toggleAll}
                    aria-label="Select all articles"
                  />
                  <span className="text-sm text-muted-foreground">Select all</span>
                </div>
                {filteredArticles.map(article => (
                  <div key={article.id} className="p-4 flex items-center justify-between hover:bg-muted/50">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <Checkbox
                        checked={bulk.isSelected(article.id)}
                        onCheckedChange={() => bulk.toggle(article.id)}
                        aria-label={`Select ${article.title}`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                          <span className="font-medium truncate">{article.title}</span>
                          {!article.is_published && (
                            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">Draft</span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span>{article.category}</span>
                          <span>•</span>
                          <span className="uppercase">{article.article_type}</span>
                          <span>•</span>
                          <span>
                            {article.show_in_marketing && article.show_in_dashboard
                              ? 'Both'
                              : article.show_in_marketing
                              ? 'Marketing only'
                              : article.show_in_dashboard
                              ? 'Dashboard only'
                              : 'Hidden'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => togglePublished(article)}
                        title={article.is_published ? 'Unpublish' : 'Publish'}
                      >
                        {article.is_published ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => startEdit(article)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => deleteArticle(article.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <BulkActionBar
        selectedCount={bulk.selectedCount}
        onClear={bulk.clearSelection}
        actions={bulkActions}
      />
    </div>
  );
}
