/**
 * Field Mapper
 * Maps HR provider fields to user table columns via configurable field_mapping
 */

// Default field mappings per provider
const DEFAULT_MAPPINGS: Record<string, Record<string, string>> = {
  bamboohr: {
    firstName: 'first_name',
    lastName: 'last_name',
    workEmail: 'email',
    jobTitle: 'title',
    department: 'department',
    mobilePhone: 'mobile',
    workPhone: 'phone',
    photoUrl: 'avatar_url',
    location: 'office_location',
    supervisor: 'manager_email',
    hireDate: 'start_date',
  },
  gusto: {
    firstName: 'first_name',
    lastName: 'last_name',
    email: 'email',
    jobTitle: 'title',
    department: 'department',
    phone: 'phone',
    startDate: 'start_date',
  },
  rippling: {
    firstName: 'first_name',
    lastName: 'last_name',
    workEmail: 'email',
    title: 'title',
    department: 'department',
    phone: 'phone',
    startDate: 'start_date',
  },
};

export function mapFields(
  record: Record<string, any>,
  customMapping: Record<string, string>
): Record<string, any> {
  const result: Record<string, any> = {};
  const mapping = { ...customMapping };

  for (const [sourceField, value] of Object.entries(record)) {
    const targetField = mapping[sourceField];
    if (targetField && value !== undefined && value !== null && value !== '') {
      result[targetField] = value;
    }
  }

  return result;
}

export function getDefaultMapping(provider: string): Record<string, string> {
  return DEFAULT_MAPPINGS[provider] || {};
}
