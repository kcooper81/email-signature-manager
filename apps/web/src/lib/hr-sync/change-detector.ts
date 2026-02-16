/**
 * Change Detector
 * Diffs HR data against current users to detect creates, updates, and deactivations
 */

export interface DetectedChange {
  type: 'create' | 'update' | 'deactivate';
  email: string;
  userId?: string;
  source: string;
  data?: Record<string, any>;
  fieldChanges: { field: string; oldValue: string | null; newValue: string | null }[];
}

export function detectChanges(
  hrRecords: Record<string, any>[],
  existingUsers: any[]
): DetectedChange[] {
  const changes: DetectedChange[] = [];
  const usersByEmail = new Map(existingUsers.map(u => [u.email?.toLowerCase(), u]));
  const hrEmails = new Set<string>();

  for (const record of hrRecords) {
    const email = (record.email || '').toLowerCase();
    if (!email) continue;

    hrEmails.add(email);
    const existing = usersByEmail.get(email);

    if (!existing) {
      // New user
      changes.push({
        type: 'create',
        email,
        source: 'hr_sync',
        data: record,
        fieldChanges: Object.entries(record).map(([field, value]) => ({
          field,
          oldValue: null,
          newValue: String(value ?? ''),
        })),
      });
    } else {
      // Check for updates
      const fieldChanges: { field: string; oldValue: string | null; newValue: string | null }[] = [];

      for (const [field, newValue] of Object.entries(record)) {
        if (field === 'email') continue;
        const oldValue = existing[field];
        if (newValue && String(newValue) !== String(oldValue || '')) {
          fieldChanges.push({
            field,
            oldValue: oldValue ? String(oldValue) : null,
            newValue: String(newValue),
          });
        }
      }

      if (fieldChanges.length > 0) {
        changes.push({
          type: 'update',
          email,
          userId: existing.id,
          source: 'hr_sync',
          fieldChanges,
        });
      }
    }
  }

  // Detect deactivations (users in our system but not in HR)
  for (const user of existingUsers) {
    if (
      user.source === 'hr_sync' &&
      user.is_active &&
      !hrEmails.has(user.email?.toLowerCase())
    ) {
      changes.push({
        type: 'deactivate',
        email: user.email,
        userId: user.id,
        source: 'hr_sync',
        fieldChanges: [{ field: 'is_active', oldValue: 'true', newValue: 'false' }],
      });
    }
  }

  return changes;
}
