'use client';

import { useState, useCallback, useMemo } from 'react';

export type SortDirection = 'asc' | 'desc';

export function useSortableTable<T>(
  defaultField: keyof T & string,
  defaultDir: SortDirection = 'desc'
) {
  const [sortField, setSortField] = useState<keyof T & string>(defaultField);
  const [sortDir, setSortDir] = useState<SortDirection>(defaultDir);

  const toggleSort = useCallback((field: string) => {
    if (sortField === field) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field as keyof T & string);
      setSortDir('asc');
    }
  }, [sortField]);

  const sortData = useCallback(
    (items: T[]): T[] => {
      return [...items].sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];

        if (aVal == null && bVal == null) return 0;
        if (aVal == null) return 1;
        if (bVal == null) return -1;

        let comparison = 0;

        if (typeof aVal === 'number' && typeof bVal === 'number') {
          comparison = aVal - bVal;
        } else if (typeof aVal === 'boolean' && typeof bVal === 'boolean') {
          comparison = (aVal === bVal) ? 0 : aVal ? 1 : -1;
        } else {
          comparison = String(aVal).localeCompare(String(bVal), undefined, {
            numeric: true,
            sensitivity: 'base',
          });
        }

        return sortDir === 'asc' ? comparison : -comparison;
      });
    },
    [sortField, sortDir]
  );

  return { sortField: sortField as string, sortDir, toggleSort, sortData } as const;
}
