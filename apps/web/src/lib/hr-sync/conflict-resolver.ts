/**
 * Conflict Resolver
 * Resolves data conflicts between HR sync data and existing user data
 */

export type ConflictStrategy = 'hr_wins' | 'manual_wins' | 'ask_admin';

export interface FieldConflict {
  field: string;
  currentValue: string | null;
  newValue: string | null;
}

export function resolveConflicts(
  currentData: Record<string, any>,
  newData: Record<string, any>,
  strategy: ConflictStrategy
): { resolved: Record<string, any>; conflicts: FieldConflict[] } {
  const resolved: Record<string, any> = {};
  const conflicts: FieldConflict[] = [];

  for (const [field, newValue] of Object.entries(newData)) {
    const currentValue = currentData[field];

    // No conflict if values are the same or current is empty
    if (currentValue === newValue || !currentValue) {
      resolved[field] = newValue;
      continue;
    }

    switch (strategy) {
      case 'hr_wins':
        resolved[field] = newValue;
        break;
      case 'manual_wins':
        resolved[field] = currentValue;
        break;
      case 'ask_admin':
        conflicts.push({
          field,
          currentValue: String(currentValue),
          newValue: String(newValue),
        });
        break;
    }
  }

  return { resolved, conflicts };
}
