/**
 * Data Validators
 * Validates user data against organization-configured validation rules
 */

export interface ValidationRule {
  id: string;
  fieldName: string;
  validationType: string; // required, regex, format, enum
  validationValue: string | null;
  errorMessage: string | null;
  isActive: boolean;
}

export interface ValidationResult {
  valid: boolean;
  errors: { field: string; message: string; rule: string }[];
}

export function validateUserData(
  data: Record<string, any>,
  rules: ValidationRule[]
): ValidationResult {
  const errors: { field: string; message: string; rule: string }[] = [];

  for (const rule of rules.filter(r => r.isActive)) {
    const value = data[rule.fieldName];

    switch (rule.validationType) {
      case 'required':
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          errors.push({
            field: rule.fieldName,
            message: rule.errorMessage || `${rule.fieldName} is required`,
            rule: rule.id,
          });
        }
        break;

      case 'regex':
        if (value && rule.validationValue) {
          try {
            const regex = new RegExp(rule.validationValue);
            if (!regex.test(String(value))) {
              errors.push({
                field: rule.fieldName,
                message: rule.errorMessage || `${rule.fieldName} does not match required format`,
                rule: rule.id,
              });
            }
          } catch {
            // Invalid regex, skip
          }
        }
        break;

      case 'format':
        if (value && rule.validationValue === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(String(value))) {
            errors.push({
              field: rule.fieldName,
              message: rule.errorMessage || `${rule.fieldName} must be a valid email`,
              rule: rule.id,
            });
          }
        }
        if (value && rule.validationValue === 'phone') {
          const phoneRegex = /^[+]?[\d\s\-().]+$/;
          if (!phoneRegex.test(String(value))) {
            errors.push({
              field: rule.fieldName,
              message: rule.errorMessage || `${rule.fieldName} must be a valid phone number`,
              rule: rule.id,
            });
          }
        }
        break;

      case 'enum':
        if (value && rule.validationValue) {
          const allowed = rule.validationValue.split(',').map(v => v.trim());
          if (!allowed.includes(String(value))) {
            errors.push({
              field: rule.fieldName,
              message: rule.errorMessage || `${rule.fieldName} must be one of: ${allowed.join(', ')}`,
              rule: rule.id,
            });
          }
        }
        break;
    }
  }

  return { valid: errors.length === 0, errors };
}
