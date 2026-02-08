'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button, Input, Card, CardContent, CardHeader, CardTitle, Badge, Modal, ModalHeader, ModalTitle, ModalDescription, ModalFooter } from '@/components/ui';
import { Search, Plus, Copy, Check, FileText, Shield, Heart, Building2, Scale, Home } from 'lucide-react';

interface DisclaimerTemplate {
  id: string;
  name: string;
  category: string;
  content: string;
  description: string | null;
  is_system: boolean;
}

interface DisclaimerLibraryProps {
  onSelect: (content: string) => void;
  organizationId: string;
}

const categoryIcons: Record<string, any> = {
  legal: Scale,
  gdpr: Shield,
  hipaa: Heart,
  confidentiality: FileText,
  finance: Building2,
  real_estate: Home,
  custom: FileText,
};

const categoryColors: Record<string, string> = {
  legal: 'bg-blue-100 text-blue-800',
  gdpr: 'bg-purple-100 text-purple-800',
  hipaa: 'bg-red-100 text-red-800',
  confidentiality: 'bg-gray-100 text-gray-800',
  finance: 'bg-green-100 text-green-800',
  real_estate: 'bg-orange-100 text-orange-800',
  custom: 'bg-violet-100 text-violet-800',
};

export function DisclaimerLibrary({ onSelect, organizationId }: DisclaimerLibraryProps) {
  const [disclaimers, setDisclaimers] = useState<DisclaimerTemplate[]>([]);
  const [filteredDisclaimers, setFilteredDisclaimers] = useState<DisclaimerTemplate[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewDisclaimer, setPreviewDisclaimer] = useState<DisclaimerTemplate | null>(null);

  useEffect(() => {
    loadDisclaimers();
  }, [organizationId]);

  useEffect(() => {
    filterDisclaimers();
  }, [searchQuery, selectedCategory, disclaimers]);

  const loadDisclaimers = async () => {
    try {
      const supabase = createClient();
      
      // Load system disclaimers and organization-specific ones
      const { data, error } = await supabase
        .from('disclaimer_templates')
        .select('*')
        .or(`is_system.eq.true,organization_id.eq.${organizationId}`)
        .order('category', { ascending: true })
        .order('name', { ascending: true });

      if (error) throw error;
      setDisclaimers(data || []);
    } catch (err) {
      console.error('Failed to load disclaimers:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterDisclaimers = () => {
    let filtered = disclaimers;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(d => d.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(d =>
        d.name.toLowerCase().includes(query) ||
        d.content.toLowerCase().includes(query) ||
        d.description?.toLowerCase().includes(query)
      );
    }

    setFilteredDisclaimers(filtered);
  };

  const categories = ['all', ...new Set(disclaimers.map(d => d.category))];

  const handleCopy = (disclaimer: DisclaimerTemplate) => {
    navigator.clipboard.writeText(disclaimer.content);
    setCopiedId(disclaimer.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleInsert = (disclaimer: DisclaimerTemplate) => {
    onSelect(disclaimer.content);
  };

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Loading disclaimers...</div>;
  }

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search disclaimers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="capitalize whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Disclaimers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDisclaimers.map((disclaimer) => {
          const Icon = categoryIcons[disclaimer.category] || FileText;
          const colorClass = categoryColors[disclaimer.category] || categoryColors.custom;

          return (
            <Card key={disclaimer.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <CardTitle className="text-base">{disclaimer.name}</CardTitle>
                    </div>
                    <Badge variant="secondary" className={`text-xs ${colorClass}`}>
                      {disclaimer.category}
                    </Badge>
                  </div>
                </div>
                {disclaimer.description && (
                  <p className="text-xs text-muted-foreground mt-2">{disclaimer.description}</p>
                )}
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground mb-3 line-clamp-3">
                  {disclaimer.content}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPreviewDisclaimer(disclaimer)}
                    className="flex-1"
                  >
                    Preview
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(disclaimer)}
                  >
                    {copiedId === disclaimer.id ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleInsert(disclaimer)}
                  >
                    Insert
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredDisclaimers.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No disclaimers found</h3>
          <p className="text-muted-foreground">
            {searchQuery || selectedCategory !== 'all'
              ? 'Try adjusting your search or filters'
              : 'No disclaimers available'}
          </p>
        </div>
      )}

      {/* Preview Modal */}
      {previewDisclaimer && (
        <Modal open={!!previewDisclaimer} onClose={() => setPreviewDisclaimer(null)}>
          <ModalHeader>
            <ModalTitle>{previewDisclaimer.name}</ModalTitle>
            <ModalDescription>
              <Badge variant="secondary" className={categoryColors[previewDisclaimer.category]}>
                {previewDisclaimer.category}
              </Badge>
            </ModalDescription>
          </ModalHeader>
          <div className="py-4">
            {previewDisclaimer.description && (
              <p className="text-sm text-muted-foreground mb-4">{previewDisclaimer.description}</p>
            )}
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm whitespace-pre-wrap">{previewDisclaimer.content}</p>
            </div>
          </div>
          <ModalFooter>
            <Button variant="outline" onClick={() => setPreviewDisclaimer(null)}>
              Close
            </Button>
            <Button onClick={() => handleCopy(previewDisclaimer)}>
              {copiedId === previewDisclaimer.id ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
            <Button onClick={() => {
              handleInsert(previewDisclaimer);
              setPreviewDisclaimer(null);
            }}>
              <Plus className="mr-2 h-4 w-4" />
              Insert
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
}
