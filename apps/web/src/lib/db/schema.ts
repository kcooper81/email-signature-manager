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
export const emailProviderEnum = pgEnum('email_provider', ['google', 'microsoft', 'hubspot']);
export const deploymentStatusEnum = pgEnum('deployment_status', ['pending', 'in_progress', 'success', 'failed']);
export const jobStatusEnum = pgEnum('job_status', ['pending', 'running', 'completed', 'failed', 'retrying']);
export const subscriptionPlanEnum = pgEnum('subscription_plan', ['free', 'starter', 'professional', 'enterprise']);
export const subscriptionStatusEnum = pgEnum('subscription_status', ['active', 'past_due', 'canceled', 'trialing']);

// ============================================
// Organizations
// ============================================

export const organizations = pgTable('organizations', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  domain: text('domain'),
  logoUrl: text('logo_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const organizationsRelations = relations(organizations, ({ many }) => ({
  users: many(users),
  templates: many(signatureTemplates),
  providerConnections: many(providerConnections),
  subscriptions: many(subscriptions),
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
  isDefault: boolean('is_default').default(false).notNull(),
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
