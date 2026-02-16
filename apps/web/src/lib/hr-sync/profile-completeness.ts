/**
 * Profile Completeness Calculator
 * Calculates a 0-100 score based on weighted fields
 */

interface FieldWeight {
  field: string;
  weight: number;
  check: (value: any) => boolean;
}

const FIELD_WEIGHTS: FieldWeight[] = [
  { field: 'first_name', weight: 15, check: (v) => !!v && v.trim() !== '' },
  { field: 'last_name', weight: 15, check: (v) => !!v && v.trim() !== '' },
  { field: 'title', weight: 15, check: (v) => !!v && v.trim() !== '' },
  { field: 'department', weight: 10, check: (v) => !!v && v.trim() !== '' },
  { field: 'phone', weight: 10, check: (v) => !!v && v.trim() !== '' },
  { field: 'avatar_url', weight: 10, check: (v) => !!v && v.trim() !== '' },
  { field: 'company', weight: 5, check: (v) => !!v && v.trim() !== '' },
  { field: 'office_location', weight: 5, check: (v) => !!v && v.trim() !== '' },
  { field: 'linkedin_url', weight: 5, check: (v) => !!v && v.trim() !== '' },
  { field: 'mobile', weight: 5, check: (v) => !!v && v.trim() !== '' },
  { field: 'region', weight: 5, check: (v) => !!v && v.trim() !== '' },
];

export function calculateProfileCompleteness(user: Record<string, any>): number {
  let score = 0;

  for (const fw of FIELD_WEIGHTS) {
    if (fw.check(user[fw.field])) {
      score += fw.weight;
    }
  }

  return Math.min(100, Math.max(0, score));
}

export function getIncompleteFields(user: Record<string, any>): string[] {
  return FIELD_WEIGHTS
    .filter(fw => !fw.check(user[fw.field]))
    .map(fw => fw.field);
}

export function getFieldWeights(): { field: string; weight: number }[] {
  return FIELD_WEIGHTS.map(fw => ({ field: fw.field, weight: fw.weight }));
}
