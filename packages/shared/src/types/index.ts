// Core domain types for Email Signature Manager

// ============================================
// Organization & Users
// ============================================

export interface Organization {
  id: string;
  name: string;
  slug: string;
  domain?: string;
  logoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  title?: string;
  department?: string;
  phone?: string;
  mobile?: string;
  avatarUrl?: string;
  organizationId: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = 'owner' | 'admin' | 'member';

// ============================================
// Signature Templates (JSON Block Structure)
// ============================================

export interface SignatureTemplate {
  id: string;
  name: string;
  description?: string;
  organizationId: string;
  blocks: SignatureBlock[];
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export type SignatureBlock =
  | TextBlock
  | ImageBlock
  | VariableBlock
  | BannerBlock
  | DisclaimerBlock
  | DividerBlock
  | SocialLinksBlock
  | SpacerBlock;

export interface BaseBlock {
  id: string;
  type: string;
  styles?: BlockStyles;
}

export interface TextBlock extends BaseBlock {
  type: 'text';
  content: string;
  format?: 'plain' | 'html';
}

export interface ImageBlock extends BaseBlock {
  type: 'image';
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  link?: string;
}

export interface VariableBlock extends BaseBlock {
  type: 'variable';
  variable: UserVariable;
  fallback?: string;
  prefix?: string;
  suffix?: string;
}

export type UserVariable =
  | 'firstName'
  | 'lastName'
  | 'fullName'
  | 'email'
  | 'title'
  | 'department'
  | 'phone'
  | 'mobile'
  | 'company'
  | 'avatar';

export interface BannerBlock extends BaseBlock {
  type: 'banner';
  imageUrl: string;
  link?: string;
  alt?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface DisclaimerBlock extends BaseBlock {
  type: 'disclaimer';
  content: string;
}

export interface DividerBlock extends BaseBlock {
  type: 'divider';
  color?: string;
  thickness?: number;
}

export interface SocialLinksBlock extends BaseBlock {
  type: 'socialLinks';
  links: SocialLink[];
  iconSize?: number;
  iconStyle?: 'color' | 'monochrome' | 'outline';
}

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

export type SocialPlatform =
  | 'linkedin'
  | 'twitter'
  | 'facebook'
  | 'instagram'
  | 'youtube'
  | 'github'
  | 'website';

export interface SpacerBlock extends BaseBlock {
  type: 'spacer';
  height: number;
}

export interface BlockStyles {
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: 'normal' | 'bold';
  fontStyle?: 'normal' | 'italic';
  color?: string;
  backgroundColor?: string;
  textAlign?: 'left' | 'center' | 'right';
  padding?: number | { top?: number; right?: number; bottom?: number; left?: number };
  margin?: number | { top?: number; right?: number; bottom?: number; left?: number };
}

// ============================================
// Signature Assignments & Deployments
// ============================================

export interface SignatureAssignment {
  id: string;
  templateId: string;
  userId?: string;
  departmentId?: string;
  organizationId: string;
  priority: number;
  createdAt: Date;
}

export interface SignatureDeployment {
  id: string;
  assignmentId: string;
  userId: string;
  provider: EmailProvider;
  status: DeploymentStatus;
  renderedHtml?: string;
  errorMessage?: string;
  deployedAt?: Date;
  createdAt: Date;
}

export type EmailProvider = 'google' | 'microsoft';
export type DeploymentStatus = 'pending' | 'in_progress' | 'success' | 'failed';

// ============================================
// Provider Connections
// ============================================

export interface ProviderConnection {
  id: string;
  organizationId: string;
  provider: EmailProvider;
  accessToken: string; // Encrypted
  refreshToken: string; // Encrypted
  expiresAt: Date;
  scopes: string[];
  connectedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// Audit Log
// ============================================

export interface AuditLogEntry {
  id: string;
  organizationId: string;
  userId: string;
  action: AuditAction;
  resourceType: AuditResourceType;
  resourceId: string;
  metadata?: Record<string, unknown>;
  affectedUserIds?: string[];
  createdAt: Date;
}

export type AuditAction =
  | 'create'
  | 'update'
  | 'delete'
  | 'deploy'
  | 'connect'
  | 'disconnect';

export type AuditResourceType =
  | 'template'
  | 'assignment'
  | 'deployment'
  | 'banner'
  | 'provider_connection'
  | 'user'
  | 'organization';

// ============================================
// Job Logging (for background tasks)
// ============================================

export interface JobLog {
  id: string;
  organizationId: string;
  jobType: JobType;
  status: JobStatus;
  payload: Record<string, unknown>;
  result?: Record<string, unknown>;
  errorMessage?: string;
  attempts: number;
  maxAttempts: number;
  nextRetryAt?: Date;
  startedAt?: Date;
  completedAt?: Date;
  createdAt: Date;
}

export type JobType =
  | 'deploy_signature'
  | 'bulk_deploy'
  | 'sync_users'
  | 'update_banner';

export type JobStatus =
  | 'pending'
  | 'running'
  | 'completed'
  | 'failed'
  | 'retrying';

// ============================================
// Subscriptions & Billing
// ============================================

export interface Subscription {
  id: string;
  organizationId: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type SubscriptionPlan = 'free' | 'starter' | 'professional' | 'enterprise';
export type SubscriptionStatus = 'active' | 'past_due' | 'canceled' | 'trialing';

// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
