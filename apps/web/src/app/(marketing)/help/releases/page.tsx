'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowLeft, 
  Calendar, 
  Tag,
  Link2,
  UserPlus,
  GitBranch,
  Image,
  BarChart3,
  Shield,
  ClipboardList,
  FileText,
  Zap,
  Bug,
  Wrench,
  Lock,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface ReleaseItem {
  id: string;
  title: string;
  description: string;
  category: 'feature' | 'improvement' | 'fix' | 'security';
  icon: string;
  link_url: string | null;
  link_text: string | null;
  sort_order: number;
}

interface Release {
  id: string;
  version: string;
  title: string;
  description: string;
  release_date: string;
  release_type: 'major' | 'feature' | 'improvement' | 'fix';
  items: ReleaseItem[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Link2,
  UserPlus,
  GitBranch,
  Image,
  BarChart3,
  Shield,
  ClipboardList,
  FileText,
  Zap,
  Bug,
  Wrench,
  Lock,
  Sparkles,
};

const categoryColors: Record<string, { bg: string; text: string; label: string }> = {
  feature: { bg: 'bg-violet-100', text: 'text-violet-700', label: 'New Feature' },
  improvement: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Improvement' },
  fix: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Bug Fix' },
  security: { bg: 'bg-red-100', text: 'text-red-700', label: 'Security' },
};

const releaseTypeColors: Record<string, { bg: string; border: string }> = {
  major: { bg: 'bg-gradient-to-r from-violet-500 to-purple-600', border: 'border-violet-200' },
  feature: { bg: 'bg-gradient-to-r from-blue-500 to-cyan-500', border: 'border-blue-200' },
  improvement: { bg: 'bg-gradient-to-r from-emerald-500 to-green-500', border: 'border-emerald-200' },
  fix: { bg: 'bg-gradient-to-r from-amber-500 to-orange-500', border: 'border-amber-200' },
};

export default function ReleasesPage() {
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedReleases, setExpandedReleases] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function fetchReleases() {
      const supabase = createClient();
      
      // Fetch releases
      const { data: releasesData, error: releasesError } = await supabase
        .from('feature_releases')
        .select('*')
        .eq('is_published', true)
        .order('release_date', { ascending: false });

      if (releasesError) {
        console.error('Error fetching releases:', releasesError);
        setLoading(false);
        return;
      }

      // Fetch items for each release
      const releasesWithItems: Release[] = await Promise.all(
        (releasesData || []).map(async (release) => {
          const { data: itemsData } = await supabase
            .from('feature_release_items')
            .select('*')
            .eq('release_id', release.id)
            .order('sort_order', { ascending: true });

          return {
            ...release,
            items: itemsData || [],
          };
        })
      );

      setReleases(releasesWithItems);
      // Expand the most recent release by default
      if (releasesWithItems.length > 0) {
        setExpandedReleases(new Set([releasesWithItems[0].id]));
      }
      setLoading(false);
    }

    fetchReleases();
  }, []);

  const toggleRelease = (releaseId: string) => {
    setExpandedReleases((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(releaseId)) {
        newSet.delete(releaseId);
      } else {
        newSet.add(releaseId);
      }
      return newSet;
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-violet-50 to-white">
        <div className="max-w-4xl mx-auto px-6">
          <Link 
            href="/help" 
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Help Center
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-14 w-14 bg-violet-100 rounded-2xl flex items-center justify-center">
              <Sparkles className="h-7 w-7 text-violet-600" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold">What's New</h1>
              <p className="text-gray-600">Feature releases and product updates</p>
            </div>
          </div>
        </div>
      </section>

      {/* Releases */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          {loading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
                  <div className="h-4 bg-gray-100 rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : releases.length === 0 ? (
            <div className="text-center py-12">
              <Sparkles className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No releases yet</h3>
              <p className="text-gray-500">Check back soon for product updates!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {releases.map((release, index) => {
                const isExpanded = expandedReleases.has(release.id);
                const typeColors = releaseTypeColors[release.release_type] || releaseTypeColors.feature;
                
                return (
                  <div 
                    key={release.id} 
                    className={`bg-white border rounded-xl overflow-hidden transition-shadow hover:shadow-md ${typeColors.border}`}
                  >
                    {/* Release Header */}
                    <button
                      onClick={() => toggleRelease(release.id)}
                      className="w-full text-left p-6 flex items-start justify-between gap-4"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`h-12 w-12 rounded-xl ${typeColors.bg} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                          v{release.version.split('.')[0]}
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h2 className="text-xl font-bold text-gray-900">{release.title}</h2>
                            <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                              v{release.version}
                            </span>
                            {index === 0 && (
                              <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">
                                Latest
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {formatDate(release.release_date)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Tag className="h-4 w-4" />
                              {release.items.length} updates
                            </span>
                          </div>
                          <p className="text-gray-600 mt-2">{release.description}</p>
                        </div>
                      </div>
                      <div className="flex-shrink-0 mt-1">
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </button>

                    {/* Release Items */}
                    {isExpanded && release.items.length > 0 && (
                      <div className="border-t border-gray-100 px-6 py-4 bg-gray-50">
                        <div className="grid gap-4">
                          {release.items.map((item) => {
                            const IconComponent = iconMap[item.icon] || Sparkles;
                            const category = categoryColors[item.category] || categoryColors.feature;
                            
                            return (
                              <div 
                                key={item.id}
                                className="bg-white rounded-lg p-4 border border-gray-200 flex items-start gap-4"
                              >
                                <div className={`h-10 w-10 rounded-lg ${category.bg} flex items-center justify-center flex-shrink-0`}>
                                  <IconComponent className={`h-5 w-5 ${category.text}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${category.bg} ${category.text}`}>
                                      {category.label}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                                  {item.link_url && (
                                    <Link 
                                      href={item.link_url}
                                      className="text-sm text-violet-600 hover:text-violet-700 font-medium"
                                    >
                                      {item.link_text || 'Learn more'} →
                                    </Link>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-6">
            Get notified when we release new features and improvements.
          </p>
          <Link 
            href="/signup"
            className="inline-flex items-center justify-center px-6 py-3 bg-violet-600 text-white font-medium rounded-lg hover:bg-violet-700 transition-colors"
          >
            Create Free Account
          </Link>
        </div>
      </section>
    </>
  );
}
