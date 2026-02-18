'use client';

import { useState, useCallback, useMemo } from 'react';

interface UseBulkSelectionProps {
  itemIds: string[];
}

export function useBulkSelection({ itemIds }: UseBulkSelectionProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const isSelected = useCallback(
    (id: string) => selectedIds.has(id),
    [selectedIds]
  );

  const toggle = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const selectAll = useCallback(() => {
    setSelectedIds(new Set(itemIds));
  }, [itemIds]);

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const toggleAll = useCallback(() => {
    setSelectedIds((prev) =>
      prev.size === itemIds.length ? new Set() : new Set(itemIds)
    );
  }, [itemIds]);

  const selectedCount = useMemo(() => selectedIds.size, [selectedIds]);
  const allSelected = useMemo(
    () => itemIds.length > 0 && selectedIds.size === itemIds.length,
    [itemIds, selectedIds]
  );
  const someSelected = useMemo(
    () => selectedIds.size > 0 && selectedIds.size < itemIds.length,
    [itemIds, selectedIds]
  );

  return {
    selectedIds,
    isSelected,
    toggle,
    selectAll,
    clearSelection,
    toggleAll,
    allSelected,
    someSelected,
    selectedCount,
  };
}
