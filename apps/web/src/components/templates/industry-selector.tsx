'use client';

import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { IndustryType, INDUSTRY_LABELS } from './types';

interface IndustrySelectorProps {
  value: IndustryType;
  onChange: (value: IndustryType) => void;
  compact?: boolean;
}

export function IndustrySelector({ value, onChange, compact = false }: IndustrySelectorProps) {
  const options = Object.entries(INDUSTRY_LABELS).map(([key, label]) => ({
    value: key,
    label: label,
  }));

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <Label htmlFor="industry" className="text-sm text-gray-600 whitespace-nowrap">Industry:</Label>
        <Select
          id="industry"
          value={value}
          onChange={(e) => onChange(e.target.value as IndustryType)}
          options={options}
          className="w-40"
        />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="industry" className="text-xs text-gray-500">Industry</Label>
      <Select
        id="industry"
        value={value}
        onChange={(e) => onChange(e.target.value as IndustryType)}
        options={options}
      />
    </div>
  );
}
