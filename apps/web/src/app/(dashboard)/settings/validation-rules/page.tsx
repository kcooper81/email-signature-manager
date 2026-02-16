'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Plus } from 'lucide-react';

export default function ValidationRulesPage() {
  const [rules, setRules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRules();
  }, []);

  async function loadRules() {
    setLoading(true);
    try {
      const res = await fetch('/api/profile/validation-rules');
      const data = await res.json();
      setRules(data.rules || []);
    } catch (err) {
      console.error('Failed to load rules:', err);
    }
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Data Validation Rules</h1>
          <p className="text-muted-foreground">Define validation rules for user profile fields</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Rule
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : rules.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <ShieldCheck className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No validation rules configured yet.</p>
          <p className="text-sm mt-1">Add rules to ensure data quality across your organization.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {rules.map(rule => (
            <div key={rule.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
              <div>
                <h3 className="font-medium">{rule.field_name}</h3>
                <p className="text-sm text-muted-foreground">
                  Type: {rule.validation_type}
                  {rule.validation_value && ` · Value: ${rule.validation_value}`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded ${rule.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                  {rule.is_active ? 'Active' : 'Inactive'}
                </span>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
