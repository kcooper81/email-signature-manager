import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  integer,
  jsonb,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ============================================
// Enums
// ============================================

export const userRoleEnum = pgEnum('user_role', ['owner', 'admin', 'member']);
export const emailProviderEnum = pgEnum('email_provider', ['google', 'microsoft', 'hubspot', 'calendly']);
export const deploymentStatusEnum = pgEnum('deployment_status', ['pending', 'in_progress', 'success', 'failed']);
export const jobStatusEnum = pgEnum('job_status', ['pending', 'running', 'completed', 'failed', 'retrying']);
export const subscriptionPlanEnum = pgEnum('subscription_plan', ['free', 'starter', 'professional', 'enterprise']);
export const subscriptionStatusEnum = pgEnum('subscription_status', ['active', 'past_due', 'canceled', 'trialing']);
export const industryTypeEnum = pgEnum('industry_type', ['general', 'legal', 'healthcare', 'finance', 'real_estate']);
export const organizationTypeEnum = pgEnum('organization_type', ['standard', 'msp', 'msp_client']);
export const partnerTierEnum = pgEnum('partner_tier', ['registered', 'authorized', 'premier']);
export const partnerApplicationStatusEnum = pgEnum('partner_application_status', ['pending', 'under_review', 'approved', 'rejected', 'withdrawn']);
export const mspAccessLevelEnum = pgEnum('msp_access_level', ['full', 'read_only', 'deploy_only', 'billing_only']);

// ============================================
// Organizations
// ============================================

// Branding settings type for white-label support
export type OrganizationBranding = {
  // Colors
  primaryColor?: string;      // Main brand color (buttons, links, accents)
  secondaryColor?: string;    // Secondary color (backgrounds, borders)
  accentColor?: string;       // Accent color (highlights, notifications)
  // Logos
  logoUrl?: string;           // Main logo (header, ~200x50px recommended)
  logoIconUrl?: string;       // Square icon version (favicon, mobile, ~64x64px)
  logoDarkUrl?: string;       // Logo for dark backgrounds (optional)
  faviconUrl?: string;        // Browser favicon (32x32 or 16x16)
  // Text
  companyName?: string;       // Display name (overrides org name in UI)
  supportEmail?: string;      // Custom support email shown to users
  supportUrl?: string;        // Custom help/support page URL
  // Visibility
  hideSigglyBranding?: boolean;  // Hide "Powered by Siggly" footer
  hideHelpLinks?: boolean;       // Hide links to Siggly help docs
  // Custom CSS (advanced)
  customCss?: string;         // Additional CSS overrides (premium feature)
};

export const organizations = pgTable('organizations', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  domain: text('domain'),
  logoUrl: text('logo_url'),
  industry: industryTypeEnum('industry').default('general'),
  // MSP multi-tenant fields
  parentOrganizationId: uuid('parent_organization_id').references((): any => organizations.id),
  organizationType: organizationTypeEnum('organization_type').default('standard'),
  branding: jsonb('branding').$type<OrganizationBranding>().default({}),
  partnerTier: partnerTierEnum('partner_tier').default('registered'),
  // White-label subdomain (e.g., "acme-it" → acme-it.siggly.io)
  customSubdomain: text('custom_subdomain').unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const organizationsRelations = relations(organizations, ({ one, many }) => ({
  users: many(users),
  templates: many(signatureTemplates),
  providerConnections: many(providerConnections),
  subscriptions: many(subscriptions),
  domains: many(organizationDomains),
  parentOrganization: one(organizations, {
    fields: [organizations.parentOrganizationId],
    references: [organizations.id],
    relationName: 'parentChild',
  }),
  childOrganizations: many(organizations, { relationName: 'parentChild' }),
  mspClientAccess: many(mspClientAccess),
}));

// ============================================
// Users
// ============================================

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  authId: text('auth_id').unique(), // Supabase Auth ID
  email: text('email').notNull(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  title: text('title'),
  department: text('department'),
  phone: text('phone'),
  mobile: text('mobile'),
  avatarUrl: text('avatar_url'),
  organizationId: uuid('organization_id').references(() => organizations.id).notNull(),
  role: userRoleEnum('role').default('member').notNull(),
  isAdmin: boolean('is_admin').default(false).notNull(), // Organization admin flag
  isSuperAdmin: boolean('is_super_admin').default(false).notNull(), // Platform super admin flag
  calendlyUrl: text('calendly_url'),
  linkedinUrl: text('linkedin_url'),
  twitterUrl: text('twitter_url'),
  githubUrl: text('github_url'),
  personalWebsite: text('personal_website'),
  instagramUrl: text('instagram_url'),
  facebookUrl: text('facebook_url'),
  youtubeUrl: text('youtube_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [users.organizationId],
    references: [organizations.id],
  }),
  assignments: many(signatureAssignments),
  deployments: many(signatureDeployments),
}));

// ============================================
// Signature Templates
// ============================================

export const signatureTemplates = pgTable('signature_templates', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description'),
  organizationId: uuid('organization_id').references(() => organizations.id).notNull(),
  blocks: jsonb('blocks').notNull().$type<unknown[]>(),
  industry: industryTypeEnum('industry').default('general'),
  complianceFields: jsonb('compliance_fields'),
  isDefault: boolean('is_default').default(false).notNull(), // Fallback when no rules match
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const signatureTemplatesRelations = relations(signatureTemplates, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [signatureTemplates.organizationId],
    references: [organizations.id],
  }),
  creator: one(users, {
    fields: [signatureTemplates.createdBy],
    references: [users.id],
  }),
  assignments: many(signatureAssignments),
}));

// ============================================
// Signature Assignments
// ============================================

export const signatureAssignments = pgTable('signature_assignments', {
  id: uuid('id').primaryKey().defaultRandom(),
  templateId: uuid('template_id').references(() => signatureTemplates.id).notNull(),
  userId: uuid('user_id').references(() => users.id),
  department: text('department'),
  organizationId: uuid('organization_id').references(() => organizations.id).notNull(),
  priority: integer('priority').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const signatureAssignmentsRelations = relations(signatureAssignments, ({ one, many }) => ({
  template: one(signatureTemplates, {
    fields: [signatureAssignments.templateId],
    references: [signatureTemplates.id],
  }),
  user: one(users, {
    fields: [signatureAssignments.userId],
    references: [users.id],
  }),
  organization: one(organizations, {
    fields: [signatureAssignments.organizationId],
    references: [organizations.id],
  }),
  deployments: many(signatureDeployments),
}));

// ============================================
// Signature Deployments
// ============================================

export const signatureDeployments = pgTable('signature_deployments', {
  id: uuid('id').primaryKey().defaultRandom(),
  assignmentId: uuid('assignment_id').references(() => signatureAssignments.id).notNull(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  provider: emailProviderEnum('provider').notNull(),
  status: deploymentStatusEnum('status').default('pending').notNull(),
  renderedHtml: text('rendered_html'),
  errorMessage: text('error_message'),
  deployedAt: timestamp('deployed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const signatureDeploymentsRelations = relations(signatureDeployments, ({ one }) => ({
  assignment: one(signatureAssignments, {
    fields: [signatureDeployments.assignmentId],
    references: [signatureAssignments.id],
  }),
  user: one(users, {
    fields: [signatureDeployments.userId],
    references: [users.id],
  }),
}));

// ============================================
// Provider Connections
// ============================================

export const providerConnections = pgTable('provider_connections', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id).notNull(),
  provider: emailProviderEnum('provider').notNull(),
  accessToken: text('access_token').notNull(), // Encrypted
  refreshToken: text('refresh_token').notNull(), // Encrypted
  expiresAt: timestamp('expires_at').notNull(),
  scopes: text('scopes').array(),
  connectedBy: uuid('connected_by').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const providerConnectionsRelations = relations(providerConnections, ({ one }) => ({
  organization: one(organizations, {
    fields: [providerConnections.organizationId],
    references: [organizations.id],
  }),
  connector: one(users, {
    fields: [providerConnections.connectedBy],
    references: [users.id],
  }),
}));

// ============================================
// Audit Log
// ============================================

export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id).notNull(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  action: text('action').notNull(),
  resourceType: text('resource_type').notNull(),
  resourceId: text('resource_id').notNull(),
  metadata: jsonb('metadata'),
  affectedUserIds: uuid('affected_user_ids').array(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const auditLogsRelations = relations(auditLogs, ({ one }) => ({
  organization: one(organizations, {
    fields: [auditLogs.organizationId],
    references: [organizations.id],
  }),
  user: one(users, {
    fields: [auditLogs.userId],
    references: [users.id],
  }),
}));

// ============================================
// Job Logs (Background Tasks)
// ============================================

export const jobLogs = pgTable('job_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id).notNull(),
  jobType: text('job_type').notNull(),
  status: jobStatusEnum('status').default('pending').notNull(),
  payload: jsonb('payload').notNull(),
  result: jsonb('result'),
  errorMessage: text('error_message'),
  attempts: integer('attempts').default(0).notNull(),
  maxAttempts: integer('max_attempts').default(3).notNull(),
  nextRetryAt: timestamp('next_retry_at'),
  startedAt: timestamp('started_at'),
  completedAt: timestamp('completed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const jobLogsRelations = relations(jobLogs, ({ one }) => ({
  organization: one(organizations, {
    fields: [jobLogs.organizationId],
    references: [organizations.id],
  }),
}));

// ============================================
// Subscriptions
// ============================================

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id).notNull().unique(),
  stripeCustomerId: text('stripe_customer_id').notNull(),
  stripeSubscriptionId: text('stripe_subscription_id'),
  plan: subscriptionPlanEnum('plan').default('free').notNull(),
  status: subscriptionStatusEnum('status').default('active').notNull(),
  currentPeriodStart: timestamp('current_period_start'),
  currentPeriodEnd: timestamp('current_period_end'),
  cancelAtPeriodEnd: boolean('cancel_at_period_end').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  organization: one(organizations, {
    fields: [subscriptions.organizationId],
    references: [organizations.id],
  }),
}));

// ============================================
// Signature Rules (Conditional Logic)
// ============================================

export const signatureRules = pgTable('signature_rules', {
  id: uuid('id').primaryKey().defaultRandom(),
  templateId: uuid('template_id').references(() => signatureTemplates.id, { onDelete: 'cascade' }).notNull(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  name: text('name').notNull(),
  description: text('description'),
  priority: integer('priority').default(0).notNull(), // Higher priority evaluated first
  isActive: boolean('is_active').default(true).notNull(),
  
  // Sender conditions
  senderCondition: text('sender_condition').default('all').notNull(), // 'all', 'specific_users', 'specific_departments'
  senderUserIds: uuid('sender_user_ids').array(),
  senderDepartments: text('sender_departments').array(),
  
  // Email type conditions
  emailType: text('email_type').default('all').notNull(), // 'all', 'new', 'reply'
  
  // Recipient conditions
  recipientCondition: text('recipient_condition').default('all').notNull(), // 'all', 'all_internal', 'all_external', 'at_least_one_internal', 'at_least_one_external'
  
  // Date/Time conditions (for campaigns)
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
  
  // Advanced conditions
  subjectContains: text('subject_contains'),
  subjectNotContains: text('subject_not_contains'),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const signatureRulesRelations = relations(signatureRules, ({ one }) => ({
  template: one(signatureTemplates, {
    fields: [signatureRules.templateId],
    references: [signatureTemplates.id],
  }),
  organization: one(organizations, {
    fields: [signatureRules.organizationId],
    references: [organizations.id],
  }),
}));

// ============================================
// Email Subscribers (Newsletter/Marketing)
// ============================================

export const emailSubscribers = pgTable('email_subscribers', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  source: text('source'), // 'blog', 'tool', 'homepage', etc.
  subscribedAt: timestamp('subscribed_at').defaultNow().notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  metadata: jsonb('metadata'), // Store additional context (page URL, referrer, etc.)
});

// ============================================
// Organization Domains (Multi-Domain Support)
// ============================================

export const organizationDomains = pgTable('organization_domains', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  domain: text('domain').notNull().unique(),
  isPrimary: boolean('is_primary').default(false).notNull(),
  verified: boolean('verified').default(false).notNull(),
  verificationToken: text('verification_token'),
  verificationMethod: text('verification_method').default('dns_txt'), // 'dns_txt', 'dns_cname', 'meta_tag'
  verifiedAt: timestamp('verified_at'),
  verifiedBy: uuid('verified_by').references(() => users.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const organizationDomainsRelations = relations(organizationDomains, ({ one }) => ({
  organization: one(organizations, {
    fields: [organizationDomains.organizationId],
    references: [organizations.id],
  }),
  verifier: one(users, {
    fields: [organizationDomains.verifiedBy],
    references: [users.id],
  }),
}));

// ============================================
// MSP Client Access (Cross-Org Access Control)
// ============================================

export const mspClientAccess = pgTable('msp_client_access', {
  id: uuid('id').primaryKey().defaultRandom(),
  mspUserId: uuid('msp_user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  mspOrganizationId: uuid('msp_organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  clientOrganizationId: uuid('client_organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  accessLevel: mspAccessLevelEnum('access_level').default('full').notNull(),
  grantedAt: timestamp('granted_at').defaultNow().notNull(),
  grantedBy: uuid('granted_by').references(() => users.id, { onDelete: 'set null' }),
  revokedAt: timestamp('revoked_at'),
  revokedBy: uuid('revoked_by').references(() => users.id, { onDelete: 'set null' }),
});

export const mspClientAccessRelations = relations(mspClientAccess, ({ one }) => ({
  mspUser: one(users, {
    fields: [mspClientAccess.mspUserId],
    references: [users.id],
    relationName: 'mspUserAccess',
  }),
  mspOrganization: one(organizations, {
    fields: [mspClientAccess.mspOrganizationId],
    references: [organizations.id],
    relationName: 'mspOrgAccess',
  }),
  clientOrganization: one(organizations, {
    fields: [mspClientAccess.clientOrganizationId],
    references: [organizations.id],
    relationName: 'clientOrgAccess',
  }),
  granter: one(users, {
    fields: [mspClientAccess.grantedBy],
    references: [users.id],
    relationName: 'accessGranter',
  }),
}));

// ============================================
// Partner Applications
// ============================================

export const partnerApplications = pgTable('partner_applications', {
  id: uuid('id').primaryKey().defaultRandom(),
  // Applicant info
  companyName: text('company_name').notNull(),
  website: text('website'),
  contactName: text('contact_name').notNull(),
  contactEmail: text('contact_email').notNull(),
  contactPhone: text('contact_phone'),
  // Business info
  numberOfClients: integer('number_of_clients'),
  primaryServices: text('primary_services').array(),
  howHeardAboutUs: text('how_heard_about_us'),
  additionalNotes: text('additional_notes'),
  // Application status
  status: partnerApplicationStatusEnum('status').default('pending').notNull(),
  reviewedBy: uuid('reviewed_by').references(() => users.id, { onDelete: 'set null' }),
  reviewedAt: timestamp('reviewed_at'),
  reviewNotes: text('review_notes'),
  // If approved, link to the created MSP organization
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'set null' }),
  // Tracking
  submittedAt: timestamp('submitted_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const partnerApplicationsRelations = relations(partnerApplications, ({ one }) => ({
  reviewer: one(users, {
    fields: [partnerApplications.reviewedBy],
    references: [users.id],
  }),
  organization: one(organizations, {
    fields: [partnerApplications.organizationId],
    references: [organizations.id],
  }),
}));
