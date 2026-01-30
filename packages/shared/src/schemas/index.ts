import { z } from 'zod';

// ============================================
// Organization Schemas
// ============================================

export const createOrganizationSchema = z.object({
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(50).regex(/^[a-z0-9-]+$/),
  domain: z.string().email().optional(),
});

export const updateOrganizationSchema = createOrganizationSchema.partial();

// ============================================
// User Schemas
// ============================================

export const userRoleSchema = z.enum(['owner', 'admin', 'member']);

export const createUserSchema = z.object({
  email: z.string().email(),
  firstName: z.string().max(50).optional(),
  lastName: z.string().max(50).optional(),
  title: z.string().max(100).optional(),
  department: z.string().max(100).optional(),
  phone: z.string().max(30).optional(),
  mobile: z.string().max(30).optional(),
  role: userRoleSchema.default('member'),
});

export const updateUserSchema = createUserSchema.partial();

// ============================================
// Signature Block Schemas
// ============================================

export const blockStylesSchema = z.object({
  fontFamily: z.string().optional(),
  fontSize: z.number().min(8).max(72).optional(),
  fontWeight: z.enum(['normal', 'bold']).optional(),
  fontStyle: z.enum(['normal', 'italic']).optional(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
  backgroundColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
  textAlign: z.enum(['left', 'center', 'right']).optional(),
  padding: z.union([
    z.number(),
    z.object({
      top: z.number().optional(),
      right: z.number().optional(),
      bottom: z.number().optional(),
      left: z.number().optional(),
    }),
  ]).optional(),
  margin: z.union([
    z.number(),
    z.object({
      top: z.number().optional(),
      right: z.number().optional(),
      bottom: z.number().optional(),
      left: z.number().optional(),
    }),
  ]).optional(),
});

export const userVariableSchema = z.enum([
  'firstName',
  'lastName',
  'fullName',
  'email',
  'title',
  'department',
  'phone',
  'mobile',
  'company',
  'avatar',
]);

export const socialPlatformSchema = z.enum([
  'linkedin',
  'twitter',
  'facebook',
  'instagram',
  'youtube',
  'github',
  'website',
]);

const baseBlockSchema = z.object({
  id: z.string().uuid(),
  styles: blockStylesSchema.optional(),
});

export const textBlockSchema = baseBlockSchema.extend({
  type: z.literal('text'),
  content: z.string(),
  format: z.enum(['plain', 'html']).optional(),
});

export const imageBlockSchema = baseBlockSchema.extend({
  type: z.literal('image'),
  src: z.string().url(),
  alt: z.string().optional(),
  width: z.number().positive().optional(),
  height: z.number().positive().optional(),
  link: z.string().url().optional(),
});

export const variableBlockSchema = baseBlockSchema.extend({
  type: z.literal('variable'),
  variable: userVariableSchema,
  fallback: z.string().optional(),
  prefix: z.string().optional(),
  suffix: z.string().optional(),
});

export const bannerBlockSchema = baseBlockSchema.extend({
  type: z.literal('banner'),
  imageUrl: z.string().url(),
  link: z.string().url().optional(),
  alt: z.string().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
});

export const disclaimerBlockSchema = baseBlockSchema.extend({
  type: z.literal('disclaimer'),
  content: z.string(),
});

export const dividerBlockSchema = baseBlockSchema.extend({
  type: z.literal('divider'),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
  thickness: z.number().min(1).max(10).optional(),
});

export const socialLinkSchema = z.object({
  platform: socialPlatformSchema,
  url: z.string().url(),
});

export const socialLinksBlockSchema = baseBlockSchema.extend({
  type: z.literal('socialLinks'),
  links: z.array(socialLinkSchema),
  iconSize: z.number().min(16).max(64).optional(),
  iconStyle: z.enum(['color', 'monochrome', 'outline']).optional(),
});

export const spacerBlockSchema = baseBlockSchema.extend({
  type: z.literal('spacer'),
  height: z.number().min(1).max(100),
});

export const signatureBlockSchema = z.discriminatedUnion('type', [
  textBlockSchema,
  imageBlockSchema,
  variableBlockSchema,
  bannerBlockSchema,
  disclaimerBlockSchema,
  dividerBlockSchema,
  socialLinksBlockSchema,
  spacerBlockSchema,
]);

// ============================================
// Signature Template Schemas
// ============================================

export const createTemplateSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  blocks: z.array(signatureBlockSchema),
  isDefault: z.boolean().default(false),
});

export const updateTemplateSchema = createTemplateSchema.partial();

// ============================================
// Assignment Schemas
// ============================================

export const createAssignmentSchema = z.object({
  templateId: z.string().uuid(),
  userId: z.string().uuid().optional(),
  departmentId: z.string().uuid().optional(),
  priority: z.number().int().min(0).max(100).default(0),
}).refine(
  (data) => data.userId || data.departmentId,
  { message: 'Either userId or departmentId must be provided' }
);

// ============================================
// Deployment Schemas
// ============================================

export const emailProviderSchema = z.enum(['google', 'microsoft']);
export const deploymentStatusSchema = z.enum(['pending', 'in_progress', 'success', 'failed']);

export const createDeploymentSchema = z.object({
  assignmentId: z.string().uuid(),
  userId: z.string().uuid(),
  provider: emailProviderSchema,
});

// ============================================
// Type Exports (inferred from schemas)
// ============================================

export type CreateOrganizationInput = z.infer<typeof createOrganizationSchema>;
export type UpdateOrganizationInput = z.infer<typeof updateOrganizationSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type CreateTemplateInput = z.infer<typeof createTemplateSchema>;
export type UpdateTemplateInput = z.infer<typeof updateTemplateSchema>;
export type CreateAssignmentInput = z.infer<typeof createAssignmentSchema>;
export type CreateDeploymentInput = z.infer<typeof createDeploymentSchema>;
export type SignatureBlockInput = z.infer<typeof signatureBlockSchema>;
