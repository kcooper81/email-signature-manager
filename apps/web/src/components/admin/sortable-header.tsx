'use client';

import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import type { SortDirection } from '@/hooks/use-sortable-table';

interface SortableHeaderProps {
  field: string;
  label: string;
  currentSort: string;
  currentDir: SortDirection;
  onToggle: (field: string) => void;
  className?: string;
}

export function SortableHeader({
  field,
  label,
  currentSort,
  currentDir,
  onToggle,
  className = '',
}: SortableHeaderProps) {
  const isActive = currentSort === field;

  return (
    <th
      className={`pb-3 font-medium text-slate-500 cursor-pointer select-none hover:text-slate-700 transition-colors ${className}`}
      onClick={() => onToggle(field)}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        {isActive ? (
          currentDir === 'asc' ? (
            <ChevronUp className="h-3.5 w-3.5 text-slate-700" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5 text-slate-700" />
          )
        ) : (
          <ChevronsUpDown className="h-3.5 w-3.5 text-slate-300" />
        )}
      </span>
    </th>
  );
}

/**
 * Inline sort button for card/list layouts that don't use <table>.
 * Renders as a clickable button instead of a <th>.
 */
export function SortButton({
  field,
  label,
  currentSort,
  currentDir,
  onToggle,
  className = '',
}: SortableHeaderProps) {
  const isActive = currentSort === field;

  return (
    <button
      className={`inline-flex items-center gap-1 text-xs font-medium transition-colors ${
        isActive ? 'text-slate-700' : 'text-slate-400 hover:text-slate-600'
      } ${className}`}
      onClick={() => onToggle(field)}
    >
      {label}
      {isActive ? (
        currentDir === 'asc' ? (
          <ChevronUp className="h-3 w-3" />
        ) : (
          <ChevronDown className="h-3 w-3" />
        )
      ) : (
        <ChevronsUpDown className="h-3 w-3 text-slate-300" />
      )}
    </button>
  );
}
