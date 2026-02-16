import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  integer,
  jsonb,
  pgEnum,
  inet,
  date,
  primaryKey,
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
export const regulationTypeEnum = pgEnum('regulation_type', ['gdpr', 'hipaa', 'ccpa', 'finra', 'sox', 'custom']);
export const disclaimerRuleStatusEnum = pgEnum('disclaimer_rule_status', ['active', 'inactive', 'archived']);
export const syncProviderEnum = pgEnum('sync_provider', ['bamboohr', 'gusto', 'rippling', 'google', 'microsoft']);
export const syncScheduleEnum = pgEnum('sync_schedule', ['manual', 'daily', 'weekly', 'realtime']);
export const conflictResolutionEnum = pgEnum('conflict_resolution', ['hr_wins', 'manual_wins', 'ask_admin']);
export const changeTypeEnum = pgEnum('change_type', ['create', 'update', 'deactivate']);
export const changeStatusEnum = pgEnum('change_status', ['pending', 'approved', 'rejected', 'auto_applied']);
export const profileRequestStatusEnum = pgEnum('profile_request_status', ['pending', 'approved', 'rejected']);
export const lifecycleEventTypeEnum = pgEnum('lifecycle_event_type', ['user_joined', 'user_left', 'user_moved', 'user_updated', 'invite_accepted']);
export const lifecycleEventSourceEnum = pgEnum('lifecycle_event_source', ['hr_sync', 'google_sync', 'microsoft_sync', 'manual', 'invite']);
export const workflowRunStatusEnum = pgEnum('workflow_run_status', ['running', 'completed', 'failed', 'partial']);

// ============================================
// Organizations
// ============================================

export type OrganizationBranding = {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  textColor?: string;
  logoUrl?: string;
  logoIconUrl?: string;
  logoDarkUrl?: string;
  faviconUrl?: string;
  companyName?: string;
  supportEmail?: string;
  supportUrl?: string;
  hideSigglyBranding?: boolean;
  hideHelpLinks?: boolean;
  customCss?: string;
};

export const organizations = pgTable('organizations', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  domain: text('domain'),
  logoUrl: text('logo_url'),
  industry: industryTypeEnum('industry').default('general'),
  parentOrganizationId: uuid('parent_organization_id').references((): any => organizations.id),
  organizationType: text('organization_type').default('standard'),
  branding: jsonb('branding').$type<OrganizationBranding>().default({}),
  partnerTier: text('partner_tier').default('registered'),
  customSubdomain: text('custom_subdomain').unique(),
  googleWorkspaceConnected: boolean('google_workspace_connected').default(false),
  microsoft365Connected: boolean('microsoft_365_connected').default(false),
  hubspotConnected: boolean('hubspot_connected').default(false),
  createdAt: timestamp('created_at', { withTimezone: false }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: false }).defaultNow().notNull(),
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
  settings: one(organizationSettings),
}));

// ============================================
// Organization Settings
// ============================================

export const organizationSettings = pgTable('organization_settings', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id).notNull().unique(),
  allowEmployeeSelfManage: boolean('allow_employee_self_manage').default(true),
  allowEmployeePersonalLinks: boolean('allow_employee_personal_links').default(true),
  allowEmployeeCalendarIntegration: boolean('allow_employee_calendar_integration').default(true),
  allowEmployeeOooBanners: boolean('allow_employee_ooo_banners').default(true),
  googleCalendarEnabled: boolean('google_calendar_enabled').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const organizationSettingsRelations = relations(organizationSettings, ({ one }) => ({
  organization: one(organizations, {
    fields: [organizationSettings.organizationId],
    references: [organizations.id],
  }),
}));

// ============================================
// Users
// ============================================

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  authId: text('auth_id').unique(),
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
  isAdmin: boolean('is_admin').default(false).notNull(),
  isSuperAdmin: boolean('is_super_admin').default(false),
  source: text('source').default('manual'),
  company: text('company'),
  officeLocation: text('office_location'),
  emailNotifications: boolean('email_notifications').default(true),
  deploymentAlerts: boolean('deployment_alerts').default(true),
  weeklyDigest: boolean('weekly_digest').default(false),
  theme: text('theme').default('system'),
  calendlyUrl: text('calendly_url'),
  linkedinUrl: text('linkedin_url'),
  twitterUrl: text('twitter_url'),
  githubUrl: text('github_url'),
  personalWebsite: text('personal_website'),
  instagramUrl: text('instagram_url'),
  facebookUrl: text('facebook_url'),
  youtubeUrl: text('youtube_url'),
  googleCalendarEnabled: boolean('google_calendar_enabled').default(false),
  googleBookingUrl: text('google_booking_url'),
  oooBannerEnabled: boolean('ooo_banner_enabled').default(true),
  oooCustomMessage: text('ooo_custom_message'),
  calendarSyncEnabled: boolean('calendar_sync_enabled').default(false),
  lastCalendarSync: timestamp('last_calendar_sync'),
  selfManageEnabled: boolean('self_manage_enabled').default(true),
  isActive: boolean('is_active').default(true),
  deletedAt: timestamp('deleted_at'),
  region: text('region'),
  managerEmail: text('manager_email'),
  startDate: date('start_date'),
  dataSourcePriority: jsonb('data_source_priority').$type<Record<string, string>>(),
  profileCompleteness: integer('profile_completeness').default(0),
  lastEnrichmentAt: timestamp('last_enrichment_at'),
  lastEnrichmentSource: text('last_enrichment_source'),
  createdAt: timestamp('created_at', { withTimezone: false }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: false }).defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [users.organizationId],
    references: [organizations.id],
  }),
  assignments: many(signatureAssignments),
  createdTemplates: many(signatureTemplates),
  userRoles: many(userRoles),
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
  isDefault: boolean('is_default').default(false).notNull(),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at', { withTimezone: false }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: false }).defaultNow().notNull(),
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
  rules: many(signatureRules),
  deployments: many(signatureDeployments),
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
  createdAt: timestamp('created_at', { withTimezone: false }).defaultNow().notNull(),
});

export const signatureAssignmentsRelations = relations(signatureAssignments, ({ one }) => ({
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
}));

// ============================================
// Signature Deployments (Batch Deployments)
// ============================================

export const signatureDeployments = pgTable('signature_deployments', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id).notNull(),
  templateId: uuid('template_id').references(() => signatureTemplates.id).notNull(),
  status: text('status').default('pending').notNull(),
  totalUsers: integer('total_users').default(0).notNull(),
  successfulCount: integer('successful_count').default(0).notNull(),
  failedCount: integer('failed_count').default(0).notNull(),
  initiatedBy: uuid('initiated_by').references(() => users.id),
  targetEmails: text('target_emails').array(),
  targetType: text('target_type').default('me'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  completedAt: timestamp('completed_at'),
});

export const signatureDeploymentsRelations = relations(signatureDeployments, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [signatureDeployments.organizationId],
    references: [organizations.id],
  }),
  template: one(signatureTemplates, {
    fields: [signatureDeployments.templateId],
    references: [signatureTemplates.id],
  }),
  initiator: one(users, {
    fields: [signatureDeployments.initiatedBy],
    references: [users.id],
  }),
  userDeployments: many(userDeploymentHistory),
}));

// ============================================
// User Deployment History (Per-User Tracking)
// ============================================

export const userDeploymentHistory = pgTable('user_deployment_history', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id).notNull(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  deploymentId: uuid('deployment_id').references(() => signatureDeployments.id),
  templateId: uuid('template_id').references(() => signatureTemplates.id).notNull(),
  status: text('status').default('pending').notNull(),
  errorMessage: text('error_message'),
  deployedAt: timestamp('deployed_at').defaultNow().notNull(),
});

export const userDeploymentHistoryRelations = relations(userDeploymentHistory, ({ one }) => ({
  organization: one(organizations, {
    fields: [userDeploymentHistory.organizationId],
    references: [organizations.id],
  }),
  user: one(users, {
    fields: [userDeploymentHistory.userId],
    references: [users.id],
  }),
  deployment: one(signatureDeployments, {
    fields: [userDeploymentHistory.deploymentId],
    references: [signatureDeployments.id],
  }),
  template: one(signatureTemplates, {
    fields: [userDeploymentHistory.templateId],
    references: [signatureTemplates.id],
  }),
}));

// ============================================
// Provider Connections
// ============================================

export const providerConnections = pgTable('provider_connections', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id).notNull(),
  provider: emailProviderEnum('provider').notNull(),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  tokenExpiresAt: timestamp('token_expires_at', { withTimezone: false }),
  scopes: text('scopes').array(),
  connectedBy: uuid('connected_by').references(() => users.id),
  isActive: boolean('is_active').default(true),
  authType: text('auth_type').default('oauth'),
  adminEmail: text('admin_email'),
  domain: text('domain'),
  metadata: jsonb('metadata'),
  lastSyncAt: timestamp('last_sync_at'),
  createdAt: timestamp('created_at', { withTimezone: false }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: false }).defaultNow().notNull(),
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
  userId: uuid('user_id').references(() => users.id),
  action: text('action').notNull(),
  resourceType: text('resource_type').notNull(),
  resourceId: uuid('resource_id'),
  resourceName: text('resource_name'),
  changes: jsonb('changes'),
  metadata: jsonb('metadata'),
  ipAddress: inet('ip_address'),
  userAgent: text('user_agent'),
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
  nextRetryAt: timestamp('next_retry_at', { withTimezone: false }),
  startedAt: timestamp('started_at', { withTimezone: false }),
  completedAt: timestamp('completed_at', { withTimezone: false }),
  createdAt: timestamp('created_at', { withTimezone: false }).defaultNow().notNull(),
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
  currentPeriodStart: timestamp('current_period_start', { withTimezone: false }),
  currentPeriodEnd: timestamp('current_period_end', { withTimezone: false }),
  cancelAtPeriodEnd: boolean('cancel_at_period_end').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: false }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: false }).defaultNow().notNull(),
});

export const subscriptionsRelations = relations(subscriptions, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [subscriptions.organizationId],
    references: [organizations.id],
  }),
  events: many(subscriptionEvents),
}));

// ============================================
// Subscription Events
// ============================================

export const subscriptionEvents = pgTable('subscription_events', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id).notNull(),
  subscriptionId: uuid('subscription_id').references(() => subscriptions.id),
  eventType: text('event_type').notNull(),
  fromPlan: text('from_plan'),
  toPlan: text('to_plan'),
  fromStatus: text('from_status'),
  toStatus: text('to_status'),
  stripeEventId: text('stripe_event_id'),
  metadata: jsonb('metadata').default({}),
  createdAt: timestamp('created_at').defaultNow(),
});

export const subscriptionEventsRelations = relations(subscriptionEvents, ({ one }) => ({
  organization: one(organizations, {
    fields: [subscriptionEvents.organizationId],
    references: [organizations.id],
  }),
  subscription: one(subscriptions, {
    fields: [subscriptionEvents.subscriptionId],
    references: [subscriptions.id],
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
  priority: integer('priority').default(0),
  isActive: boolean('is_active').default(true),
  senderCondition: text('sender_condition').default('all'),
  senderUserIds: uuid('sender_user_ids').array(),
  senderDepartments: text('sender_departments').array(),
  emailType: text('email_type').default('all'),
  recipientCondition: text('recipient_condition').default('all'),
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
  subjectContains: text('subject_contains'),
  subjectNotContains: text('subject_not_contains'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
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
  source: text('source'),
  subscribedAt: timestamp('subscribed_at').defaultNow().notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  metadata: jsonb('metadata'),
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
  verificationMethod: text('verification_method').default('dns_txt'),
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
  accessLevel: text('access_level').default('full').notNull(),
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
  companyName: text('company_name').notNull(),
  website: text('website'),
  contactName: text('contact_name').notNull(),
  contactEmail: text('contact_email').notNull(),
  contactPhone: text('contact_phone'),
  numberOfClients: integer('number_of_clients'),
  primaryServices: text('primary_services').array(),
  howHeardAboutUs: text('how_heard_about_us'),
  additionalNotes: text('additional_notes'),
  status: text('status').default('pending').notNull(),
  reviewedBy: uuid('reviewed_by').references(() => users.id, { onDelete: 'set null' }),
  reviewedAt: timestamp('reviewed_at'),
  reviewNotes: text('review_notes'),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'set null' }),
  existingOrganizationId: uuid('existing_organization_id').references(() => organizations.id, { onDelete: 'set null' }),
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

// ============================================
// Disclaimer Templates
// ============================================

export const disclaimerTemplates = pgTable('disclaimer_templates', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  category: text('category').notNull(),
  content: text('content').notNull(),
  contentHtml: text('content_html'),
  description: text('description'),
  isSystem: boolean('is_system').default(false),
  organizationId: uuid('organization_id').references(() => organizations.id),
  regulationType: text('regulation_type'), // gdpr/hipaa/ccpa/finra/sox/custom
  locale: text('locale').default('en'),
  version: integer('version').default(1),
  isDeprecated: boolean('is_deprecated').default(false),
  parentTemplateId: uuid('parent_template_id').references((): any => disclaimerTemplates.id),
  styling: jsonb('styling').$type<{ backgroundColor?: string; borderColor?: string; textColor?: string; fontSize?: string; padding?: string }>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const disclaimerTemplatesRelations = relations(disclaimerTemplates, ({ one }) => ({
  organization: one(organizations, {
    fields: [disclaimerTemplates.organizationId],
    references: [organizations.id],
  }),
}));

// ============================================
// Disclaimer Rules (Compliance Engine)
// ============================================

export const disclaimerRules = pgTable('disclaimer_rules', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  name: text('name').notNull(),
  description: text('description'),
  priority: integer('priority').default(0).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  disclaimerTemplateId: uuid('disclaimer_template_id').references(() => disclaimerTemplates.id, { onDelete: 'cascade' }).notNull(),
  // Conditions
  departmentCondition: text('department_condition').default('all'), // 'all' | 'specific'
  departments: text('departments').array(),
  regionCondition: text('region_condition').default('all'),
  regions: text('regions').array(),
  recipientCondition: text('recipient_condition').default('all'), // 'all' | 'external' | 'internal' | 'specific_domains'
  recipientDomains: text('recipient_domains').array(),
  industryCondition: text('industry_condition').default('all'),
  industries: text('industries').array(),
  userSourceCondition: text('user_source_condition').default('all'),
  userSources: text('user_sources').array(),
  // Date range
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
  // MSP
  cascadeToClients: boolean('cascade_to_clients').default(false),
  // Audit
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const disclaimerRulesRelations = relations(disclaimerRules, ({ one }) => ({
  organization: one(organizations, {
    fields: [disclaimerRules.organizationId],
    references: [organizations.id],
  }),
  disclaimerTemplate: one(disclaimerTemplates, {
    fields: [disclaimerRules.disclaimerTemplateId],
    references: [disclaimerTemplates.id],
  }),
  creator: one(users, {
    fields: [disclaimerRules.createdBy],
    references: [users.id],
  }),
}));

// ============================================
// Disclaimer Deployments (Audit Trail)
// ============================================

export const disclaimerDeployments = pgTable('disclaimer_deployments', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  disclaimerTemplateId: uuid('disclaimer_template_id').references(() => disclaimerTemplates.id),
  disclaimerRuleId: uuid('disclaimer_rule_id').references(() => disclaimerRules.id),
  deploymentId: uuid('deployment_id').references(() => signatureDeployments.id),
  disclaimerHtml: text('disclaimer_html').notNull(),
  appliedAt: timestamp('applied_at').defaultNow().notNull(),
});

export const disclaimerDeploymentsRelations = relations(disclaimerDeployments, ({ one }) => ({
  organization: one(organizations, {
    fields: [disclaimerDeployments.organizationId],
    references: [organizations.id],
  }),
  user: one(users, {
    fields: [disclaimerDeployments.userId],
    references: [users.id],
  }),
  disclaimerTemplate: one(disclaimerTemplates, {
    fields: [disclaimerDeployments.disclaimerTemplateId],
    references: [disclaimerTemplates.id],
  }),
  rule: one(disclaimerRules, {
    fields: [disclaimerDeployments.disclaimerRuleId],
    references: [disclaimerRules.id],
  }),
  deployment: one(signatureDeployments, {
    fields: [disclaimerDeployments.deploymentId],
    references: [signatureDeployments.id],
  }),
}));

// ============================================
// Error Logs
// ============================================

export const errorLogs = pgTable('error_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  errorType: text('error_type').notNull(),
  errorMessage: text('error_message').notNull(),
  errorStack: text('error_stack'),
  route: text('route'),
  method: text('method'),
  statusCode: integer('status_code'),
  userId: uuid('user_id').references(() => users.id),
  organizationId: uuid('organization_id').references(() => organizations.id),
  requestBody: jsonb('request_body'),
  requestHeaders: jsonb('request_headers'),
  metadata: jsonb('metadata'),
  resolved: boolean('resolved').default(false),
  resolvedAt: timestamp('resolved_at'),
  resolvedBy: uuid('resolved_by').references(() => users.id),
  resolutionNotes: text('resolution_notes'),
});

export const errorLogsRelations = relations(errorLogs, ({ one }) => ({
  user: one(users, {
    fields: [errorLogs.userId],
    references: [users.id],
  }),
  organization: one(organizations, {
    fields: [errorLogs.organizationId],
    references: [organizations.id],
  }),
  resolver: one(users, {
    fields: [errorLogs.resolvedBy],
    references: [users.id],
    relationName: 'errorResolver',
  }),
}));

// ============================================
// Feature Releases
// ============================================

export const featureReleases = pgTable('feature_releases', {
  id: uuid('id').primaryKey().defaultRandom(),
  version: text('version').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  releaseDate: date('release_date').defaultNow().notNull(),
  releaseType: text('release_type').default('feature').notNull(),
  isPublished: boolean('is_published').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const featureReleasesRelations = relations(featureReleases, ({ many }) => ({
  items: many(featureReleaseItems),
}));

// ============================================
// Feature Release Items
// ============================================

export const featureReleaseItems = pgTable('feature_release_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  releaseId: uuid('release_id').references(() => featureReleases.id, { onDelete: 'cascade' }).notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  category: text('category').default('feature').notNull(),
  icon: text('icon'),
  linkUrl: text('link_url'),
  linkText: text('link_text'),
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const featureReleaseItemsRelations = relations(featureReleaseItems, ({ one }) => ({
  release: one(featureReleases, {
    fields: [featureReleaseItems.releaseId],
    references: [featureReleases.id],
  }),
}));

// ============================================
// Feedback
// ============================================

export const feedback = pgTable('feedback', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  userEmail: text('user_email'),
  type: text('type').default('other').notNull(),
  message: text('message').notNull(),
  pageUrl: text('page_url'),
  userAgent: text('user_agent'),
  metadata: jsonb('metadata').default({}),
  status: text('status').default('new'),
  priority: text('priority').default('normal'),
  assignedTo: uuid('assigned_to').references(() => users.id),
  updatedAt: timestamp('updated_at'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const feedbackRelations = relations(feedback, ({ one }) => ({
  user: one(users, {
    fields: [feedback.userId],
    references: [users.id],
  }),
  assignee: one(users, {
    fields: [feedback.assignedTo],
    references: [users.id],
    relationName: 'feedbackAssignee',
  }),
}));

// ============================================
// Help Articles
// ============================================

export const helpArticles = pgTable('help_articles', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  content: text('content').notNull(),
  category: text('category').notNull(),
  articleType: text('article_type').default('faq').notNull(),
  showInMarketing: boolean('show_in_marketing').default(true),
  showInDashboard: boolean('show_in_dashboard').default(true),
  sortOrder: integer('sort_order').default(0),
  isPublished: boolean('is_published').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const helpArticlesRelations = relations(helpArticles, ({ one }) => ({
  categoryRef: one(helpCategories, {
    fields: [helpArticles.category],
    references: [helpCategories.slug],
  }),
}));

// ============================================
// Help Categories
// ============================================

export const helpCategories = pgTable('help_categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  icon: text('icon'),
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const helpCategoriesRelations = relations(helpCategories, ({ many }) => ({
  articles: many(helpArticles),
}));

// ============================================
// OOO Banner Settings
// ============================================

export const oooBannerSettings = pgTable('ooo_banner_settings', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id).notNull().unique(),
  enabled: boolean('enabled').default(true),
  bannerImageUrl: text('banner_image_url'),
  bannerText: text('banner_text').default('I am currently out of office and will respond when I return.'),
  bannerBackgroundColor: text('banner_background_color').default('#FEF3C7'),
  bannerTextColor: text('banner_text_color').default('#92400E'),
  showReturnDate: boolean('show_return_date').default(true),
  autoDetectOoo: boolean('auto_detect_ooo').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const oooBannerSettingsRelations = relations(oooBannerSettings, ({ one }) => ({
  organization: one(organizations, {
    fields: [oooBannerSettings.organizationId],
    references: [organizations.id],
  }),
}));

// ============================================
// Signature Clicks (Analytics)
// ============================================

export const signatureClicks = pgTable('signature_clicks', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id).notNull(),
  userId: uuid('user_id').references(() => users.id),
  templateId: uuid('template_id').references(() => signatureTemplates.id),
  linkUrl: text('link_url').notNull(),
  linkType: text('link_type'),
  campaignName: text('campaign_name'),
  utmSource: text('utm_source'),
  utmMedium: text('utm_medium'),
  utmCampaign: text('utm_campaign'),
  utmContent: text('utm_content'),
  userAgent: text('user_agent'),
  ipAddress: inet('ip_address'),
  referrer: text('referrer'),
  clickedAt: timestamp('clicked_at').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const signatureClicksRelations = relations(signatureClicks, ({ one }) => ({
  organization: one(organizations, {
    fields: [signatureClicks.organizationId],
    references: [organizations.id],
  }),
  user: one(users, {
    fields: [signatureClicks.userId],
    references: [users.id],
  }),
  template: one(signatureTemplates, {
    fields: [signatureClicks.templateId],
    references: [signatureTemplates.id],
  }),
}));

// ============================================
// Signature Impressions (Analytics)
// ============================================

export const signatureImpressions = pgTable('signature_impressions', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id).notNull(),
  userId: uuid('user_id').references(() => users.id),
  templateId: uuid('template_id').references(() => signatureTemplates.id),
  userAgent: text('user_agent'),
  ipAddress: inet('ip_address'),
  viewedAt: timestamp('viewed_at').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const signatureImpressionsRelations = relations(signatureImpressions, ({ one }) => ({
  organization: one(organizations, {
    fields: [signatureImpressions.organizationId],
    references: [organizations.id],
  }),
  user: one(users, {
    fields: [signatureImpressions.userId],
    references: [users.id],
  }),
  template: one(signatureTemplates, {
    fields: [signatureImpressions.templateId],
    references: [signatureTemplates.id],
  }),
}));

// ============================================
// Brand Assets
// ============================================

export const brandAssets = pgTable('brand_assets', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  fileName: text('file_name').notNull(),
  filePath: text('file_path').notNull(),
  publicUrl: text('public_url').notNull(),
  mimeType: text('mime_type').notNull(),
  fileSize: integer('file_size').notNull(),
  width: integer('width'),
  height: integer('height'),
  displayName: text('display_name').notNull(),
  category: text('category').notNull().default('uncategorized'),
  tags: text('tags').array().default([]),
  description: text('description'),
  uploadedBy: uuid('uploaded_by').references(() => users.id, { onDelete: 'set null' }),
  usageCount: integer('usage_count').default(0),
  usageGuidelines: text('usage_guidelines'),
  approvedStatus: text('approved_status').default('approved'), // approved, pending, deprecated
  approvedBy: uuid('approved_by').references(() => users.id),
  approvedAt: timestamp('approved_at'),
  minSize: integer('min_size'),
  maxSize: integer('max_size'),
  allowedContexts: text('allowed_contexts').array(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const brandAssetsRelations = relations(brandAssets, ({ one }) => ({
  organization: one(organizations, {
    fields: [brandAssets.organizationId],
    references: [organizations.id],
  }),
  uploader: one(users, {
    fields: [brandAssets.uploadedBy],
    references: [users.id],
  }),
}));

// ============================================
// User Invites
// ============================================

export const userInvites = pgTable('user_invites', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  email: text('email').notNull(),
  token: text('token').notNull().unique(),
  expiresAt: timestamp('expires_at').notNull(),
  invitedBy: uuid('invited_by').references(() => users.id),
  acceptedAt: timestamp('accepted_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const userInvitesRelations = relations(userInvites, ({ one }) => ({
  user: one(users, {
    fields: [userInvites.userId],
    references: [users.id],
  }),
  inviter: one(users, {
    fields: [userInvites.invitedBy],
    references: [users.id],
    relationName: 'inviter',
  }),
}));

// ============================================
// Permissions
// ============================================

export const permissions = pgTable('permissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull().unique(),
  description: text('description'),
  category: text('category'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const permissionsRelations = relations(permissions, ({ many }) => ({
  rolePermissions: many(rolePermissions),
}));

// ============================================
// Roles
// ============================================

export const roles = pgTable('roles', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull().unique(),
  description: text('description'),
  isSystem: boolean('is_system').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const rolesRelations = relations(roles, ({ many }) => ({
  rolePermissions: many(rolePermissions),
  userRoles: many(userRoles),
}));

// ============================================
// Role Permissions (Junction Table)
// ============================================

export const rolePermissions = pgTable('role_permissions', {
  roleId: uuid('role_id').references(() => roles.id, { onDelete: 'cascade' }).notNull(),
  permissionId: uuid('permission_id').references(() => permissions.id, { onDelete: 'cascade' }).notNull(),
}, (table) => ({
  pk: primaryKey({ columns: [table.roleId, table.permissionId] }),
}));

export const rolePermissionsRelations = relations(rolePermissions, ({ one }) => ({
  role: one(roles, {
    fields: [rolePermissions.roleId],
    references: [roles.id],
  }),
  permission: one(permissions, {
    fields: [rolePermissions.permissionId],
    references: [permissions.id],
  }),
}));

// ============================================
// User Roles (Junction Table)
// ============================================

export const userRoles = pgTable('user_roles', {
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  roleId: uuid('role_id').references(() => roles.id, { onDelete: 'cascade' }).notNull(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  assignedAt: timestamp('assigned_at').defaultNow().notNull(),
  assignedBy: uuid('assigned_by').references(() => users.id),
}, (table) => ({
  pk: primaryKey({ columns: [table.userId, table.roleId, table.organizationId] }),
}));

export const userRolesRelations = relations(userRoles, ({ one }) => ({
  user: one(users, {
    fields: [userRoles.userId],
    references: [users.id],
  }),
  role: one(roles, {
    fields: [userRoles.roleId],
    references: [roles.id],
  }),
  organization: one(organizations, {
    fields: [userRoles.organizationId],
    references: [organizations.id],
  }),
  assigner: one(users, {
    fields: [userRoles.assignedBy],
    references: [users.id],
    relationName: 'roleAssigner',
  }),
}));

// ============================================
// Ticket Notes
// ============================================

export const ticketNotes = pgTable('ticket_notes', {
  id: uuid('id').primaryKey().defaultRandom(),
  ticketId: uuid('ticket_id').notNull(),
  authorId: uuid('author_id').references(() => users.id).notNull(),
  content: text('content').notNull(),
  isInternal: boolean('is_internal').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  emailSent: boolean('email_sent').default(false),
});

export const ticketNotesRelations = relations(ticketNotes, ({ one }) => ({
  author: one(users, {
    fields: [ticketNotes.authorId],
    references: [users.id],
  }),
}));

// ============================================
// Sync Configurations (HR/Directory Sync)
// ============================================

export const syncConfigurations = pgTable('sync_configurations', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  provider: text('provider').notNull(), // bamboohr, gusto, rippling, google, microsoft
  scheduleType: text('schedule_type').default('manual').notNull(),
  fieldMapping: jsonb('field_mapping').$type<Record<string, string>>().default({}),
  conflictResolution: text('conflict_resolution').default('ask_admin').notNull(),
  autoApplyChanges: boolean('auto_apply_changes').default(false),
  syncNewUsers: boolean('sync_new_users').default(true),
  syncDeactivated: boolean('sync_deactivated').default(true),
  apiKey: text('api_key'),
  apiUrl: text('api_url'),
  lastSyncAt: timestamp('last_sync_at'),
  lastSyncStatus: text('last_sync_status'),
  lastSyncResult: jsonb('last_sync_result'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const syncConfigurationsRelations = relations(syncConfigurations, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [syncConfigurations.organizationId],
    references: [organizations.id],
  }),
  changeQueue: many(syncChangeQueue),
}));

// ============================================
// Sync Change Queue (Pending Changes)
// ============================================

export const syncChangeQueue = pgTable('sync_change_queue', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  syncConfigurationId: uuid('sync_configuration_id').references(() => syncConfigurations.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id),
  userEmail: text('user_email').notNull(),
  changeType: text('change_type').notNull(), // create, update, deactivate
  fieldChanges: jsonb('field_changes').$type<{ field: string; oldValue: string | null; newValue: string | null }[]>().default([]),
  status: text('status').default('pending').notNull(),
  reviewedBy: uuid('reviewed_by').references(() => users.id),
  reviewedAt: timestamp('reviewed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const syncChangeQueueRelations = relations(syncChangeQueue, ({ one }) => ({
  organization: one(organizations, {
    fields: [syncChangeQueue.organizationId],
    references: [organizations.id],
  }),
  syncConfiguration: one(syncConfigurations, {
    fields: [syncChangeQueue.syncConfigurationId],
    references: [syncConfigurations.id],
  }),
  user: one(users, {
    fields: [syncChangeQueue.userId],
    references: [users.id],
  }),
  reviewer: one(users, {
    fields: [syncChangeQueue.reviewedBy],
    references: [users.id],
    relationName: 'changeReviewer',
  }),
}));

// ============================================
// Data Validation Rules
// ============================================

export const dataValidationRules = pgTable('data_validation_rules', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  fieldName: text('field_name').notNull(),
  validationType: text('validation_type').notNull(), // required, regex, format, enum
  validationValue: text('validation_value'),
  errorMessage: text('error_message'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const dataValidationRulesRelations = relations(dataValidationRules, ({ one }) => ({
  organization: one(organizations, {
    fields: [dataValidationRules.organizationId],
    references: [organizations.id],
  }),
}));

// ============================================
// User Profile Requests (Self-Service)
// ============================================

export const userProfileRequests = pgTable('user_profile_requests', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  fieldChanges: jsonb('field_changes').$type<{ field: string; oldValue: string | null; newValue: string | null }[]>().default([]),
  status: text('status').default('pending').notNull(),
  requiresApproval: boolean('requires_approval').default(true),
  reviewedBy: uuid('reviewed_by').references(() => users.id),
  reviewedAt: timestamp('reviewed_at'),
  rejectionReason: text('rejection_reason'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const userProfileRequestsRelations = relations(userProfileRequests, ({ one }) => ({
  organization: one(organizations, {
    fields: [userProfileRequests.organizationId],
    references: [organizations.id],
  }),
  user: one(users, {
    fields: [userProfileRequests.userId],
    references: [users.id],
  }),
  reviewer: one(users, {
    fields: [userProfileRequests.reviewedBy],
    references: [users.id],
    relationName: 'profileRequestReviewer',
  }),
}));

// ============================================
// Lifecycle Events
// ============================================

export const lifecycleEvents = pgTable('lifecycle_events', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id),
  eventType: text('event_type').notNull(), // user_joined, user_left, user_moved, user_updated, invite_accepted
  eventSource: text('event_source').notNull(), // hr_sync, google_sync, microsoft_sync, manual, invite
  eventData: jsonb('event_data').$type<Record<string, any>>().default({}),
  processed: boolean('processed').default(false),
  processedAt: timestamp('processed_at'),
  workflowId: uuid('workflow_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const lifecycleEventsRelations = relations(lifecycleEvents, ({ one }) => ({
  organization: one(organizations, {
    fields: [lifecycleEvents.organizationId],
    references: [organizations.id],
  }),
  user: one(users, {
    fields: [lifecycleEvents.userId],
    references: [users.id],
  }),
}));

// ============================================
// Lifecycle Workflows
// ============================================

export type WorkflowAction = {
  type: string; // assign_template, deploy_signature, apply_disclaimers, send_welcome_email, send_notification, set_self_service_access, wait, archive_signature_data, set_departed_signature, deactivate_user, webhook
  config: Record<string, any>;
};

export const lifecycleWorkflows = pgTable('lifecycle_workflows', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  name: text('name').notNull(),
  description: text('description'),
  eventType: text('event_type').notNull(),
  isActive: boolean('is_active').default(true),
  priority: integer('priority').default(0),
  departmentFilter: text('department_filter').array(),
  sourceFilter: text('source_filter').array(),
  actions: jsonb('actions').$type<WorkflowAction[]>().default([]),
  cascadeToClients: boolean('cascade_to_clients').default(false),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const lifecycleWorkflowsRelations = relations(lifecycleWorkflows, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [lifecycleWorkflows.organizationId],
    references: [organizations.id],
  }),
  creator: one(users, {
    fields: [lifecycleWorkflows.createdBy],
    references: [users.id],
  }),
  runs: many(lifecycleWorkflowRuns),
}));

// ============================================
// Lifecycle Workflow Runs
// ============================================

export const lifecycleWorkflowRuns = pgTable('lifecycle_workflow_runs', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  workflowId: uuid('workflow_id').references(() => lifecycleWorkflows.id, { onDelete: 'cascade' }).notNull(),
  eventId: uuid('event_id').references(() => lifecycleEvents.id),
  userId: uuid('user_id').references(() => users.id),
  status: text('status').default('running').notNull(),
  actionResults: jsonb('action_results').$type<{ action: string; status: string; error?: string }[]>().default([]),
  startedAt: timestamp('started_at').defaultNow().notNull(),
  completedAt: timestamp('completed_at'),
});

export const lifecycleWorkflowRunsRelations = relations(lifecycleWorkflowRuns, ({ one }) => ({
  organization: one(organizations, {
    fields: [lifecycleWorkflowRuns.organizationId],
    references: [organizations.id],
  }),
  workflow: one(lifecycleWorkflows, {
    fields: [lifecycleWorkflowRuns.workflowId],
    references: [lifecycleWorkflows.id],
  }),
  event: one(lifecycleEvents, {
    fields: [lifecycleWorkflowRuns.eventId],
    references: [lifecycleEvents.id],
  }),
  user: one(users, {
    fields: [lifecycleWorkflowRuns.userId],
    references: [users.id],
  }),
}));

// ============================================
// Brand Guidelines
// ============================================

export const brandGuidelines = pgTable('brand_guidelines', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  name: text('name').notNull(),
  description: text('description'),
  primaryColors: text('primary_colors').array(),
  secondaryColors: text('secondary_colors').array(),
  accentColors: text('accent_colors').array(),
  allowedFonts: text('allowed_fonts').array(),
  requiredLogoAssetId: uuid('required_logo_asset_id').references(() => brandAssets.id),
  logoMinWidth: integer('logo_min_width'),
  logoMaxWidth: integer('logo_max_width'),
  requiredDisclaimer: boolean('required_disclaimer').default(false),
  requiredSocialLinks: text('required_social_links').array(),
  lockedBlocks: text('locked_blocks').array(),
  lockedColors: boolean('locked_colors').default(false),
  lockedFonts: boolean('locked_fonts').default(false),
  isActive: boolean('is_active').default(true),
  version: integer('version').default(1),
  cascadeToClients: boolean('cascade_to_clients').default(false),
  allowClientOverride: boolean('allow_client_override').default(false),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const brandGuidelinesRelations = relations(brandGuidelines, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [brandGuidelines.organizationId],
    references: [organizations.id],
  }),
  requiredLogo: one(brandAssets, {
    fields: [brandGuidelines.requiredLogoAssetId],
    references: [brandAssets.id],
  }),
  creator: one(users, {
    fields: [brandGuidelines.createdBy],
    references: [users.id],
  }),
  auditResults: many(brandAuditResults),
}));

// ============================================
// Brand Audit Results
// ============================================

export const brandAuditResults = pgTable('brand_audit_results', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  guidelineId: uuid('guideline_id').references(() => brandGuidelines.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id),
  templateId: uuid('template_id').references(() => signatureTemplates.id),
  complianceScore: integer('compliance_score').default(0).notNull(),
  violations: jsonb('violations').$type<{ rule: string; expected: string; actual: string; severity: string }[]>().default([]),
  auditedAt: timestamp('audited_at').defaultNow().notNull(),
});

export const brandAuditResultsRelations = relations(brandAuditResults, ({ one }) => ({
  organization: one(organizations, {
    fields: [brandAuditResults.organizationId],
    references: [organizations.id],
  }),
  guideline: one(brandGuidelines, {
    fields: [brandAuditResults.guidelineId],
    references: [brandGuidelines.id],
  }),
  user: one(users, {
    fields: [brandAuditResults.userId],
    references: [users.id],
  }),
  template: one(signatureTemplates, {
    fields: [brandAuditResults.templateId],
    references: [signatureTemplates.id],
  }),
}));

// ============================================
// Brand Document Templates
// ============================================

export const brandDocumentTemplates = pgTable('brand_document_templates', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  name: text('name').notNull(),
  description: text('description'),
  templateType: text('template_type').notNull(), // google_doc, google_slide, pdf
  sourceUrl: text('source_url'),
  thumbnailUrl: text('thumbnail_url'),
  brandGuidelineId: uuid('brand_guideline_id').references(() => brandGuidelines.id),
  isActive: boolean('is_active').default(true),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const brandDocumentTemplatesRelations = relations(brandDocumentTemplates, ({ one }) => ({
  organization: one(organizations, {
    fields: [brandDocumentTemplates.organizationId],
    references: [organizations.id],
  }),
  guideline: one(brandGuidelines, {
    fields: [brandDocumentTemplates.brandGuidelineId],
    references: [brandGuidelines.id],
  }),
  creator: one(users, {
    fields: [brandDocumentTemplates.createdBy],
    references: [users.id],
  }),
}));
