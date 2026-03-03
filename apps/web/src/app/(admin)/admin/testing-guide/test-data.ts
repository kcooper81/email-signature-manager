export type Priority = 'P0' | 'P1' | 'P2';
export type StepStatus = 'untested' | 'pass' | 'fail' | 'skip';

export interface TestStep {
  id: string;
  description: string;
  priority: Priority;
  notes?: string;
}

export interface TestSection {
  id: string;
  title: string;
  steps: TestStep[];
}

export const testSections: TestSection[] = [
  {
    id: 'auth',
    title: 'Auth & Onboarding',
    steps: [
      { id: 'auth-1', description: 'Sign up with email/password creates account and redirects to onboarding', priority: 'P0' },
      { id: 'auth-2', description: 'Sign up with Google OAuth creates account and redirects to onboarding', priority: 'P0' },
      { id: 'auth-3', description: 'Sign up with Microsoft OAuth creates account and redirects to onboarding', priority: 'P0' },
      { id: 'auth-4', description: 'Login with valid credentials redirects to dashboard', priority: 'P0' },
      { id: 'auth-5', description: 'Login with invalid credentials shows error message', priority: 'P0' },
      { id: 'auth-6', description: 'Password reset flow sends email and allows password change', priority: 'P0' },
      { id: 'auth-7', description: 'Onboarding wizard completes all steps (org name, industry, team size)', priority: 'P0' },
      { id: 'auth-8', description: 'Invite link creates user account with correct org and role', priority: 'P1' },
    ],
  },
  {
    id: 'signatures',
    title: 'Signature Creation & Editing',
    steps: [
      { id: 'sig-1', description: 'Create new signature from blank template', priority: 'P0' },
      { id: 'sig-2', description: 'Create signature from a pre-built template', priority: 'P0' },
      { id: 'sig-3', description: 'Edit signature fields (name, title, phone, email)', priority: 'P0' },
      { id: 'sig-4', description: 'Upload and display profile photo in signature', priority: 'P0' },
      { id: 'sig-5', description: 'Upload and display company logo in signature', priority: 'P0' },
      { id: 'sig-6', description: 'Add and edit social media links with icons', priority: 'P1' },
      { id: 'sig-7', description: 'Add promotional banner/CTA to signature', priority: 'P1' },
      { id: 'sig-8', description: 'Change signature colors and fonts', priority: 'P1' },
      { id: 'sig-9', description: 'Live preview updates in real-time as fields change', priority: 'P0' },
      { id: 'sig-10', description: 'Save signature persists all changes correctly', priority: 'P0' },
      { id: 'sig-11', description: 'Duplicate an existing signature creates a copy', priority: 'P1' },
      { id: 'sig-12', description: 'Delete signature with confirmation dialog', priority: 'P1' },
    ],
  },
  {
    id: 'templates',
    title: 'Template Management',
    steps: [
      { id: 'tmpl-1', description: 'Browse template gallery shows all available templates', priority: 'P0' },
      { id: 'tmpl-2', description: 'Preview template before selecting', priority: 'P1' },
      { id: 'tmpl-3', description: 'Select template pre-fills signature editor with correct layout', priority: 'P0' },
      { id: 'tmpl-4', description: 'Organization-level default template applies to new signatures', priority: 'P1' },
      { id: 'tmpl-5', description: 'Custom template creation (admin/owner only)', priority: 'P1' },
      { id: 'tmpl-6', description: 'Template categories filter correctly', priority: 'P1' },
      { id: 'tmpl-7', description: 'Industry-specific templates show for matching industries', priority: 'P1' },
      { id: 'tmpl-8', description: 'Template responsive preview (desktop/mobile)', priority: 'P2' },
    ],
  },
  {
    id: 'deployment',
    title: 'Signature Deployment',
    steps: [
      { id: 'dep-1', description: 'Copy signature HTML to clipboard', priority: 'P0' },
      { id: 'dep-2', description: 'Deploy signature via Google Workspace integration', priority: 'P0' },
      { id: 'dep-3', description: 'Deploy signature via Microsoft 365 integration', priority: 'P0' },
      { id: 'dep-4', description: 'Bulk deploy signatures to multiple users', priority: 'P0' },
      { id: 'dep-5', description: 'Deployment status shows progress and completion', priority: 'P0' },
      { id: 'dep-6', description: 'Failed deployments show error details and allow retry', priority: 'P1' },
      { id: 'dep-7', description: 'Deployment history log shows all past deployments', priority: 'P1' },
      { id: 'dep-8', description: 'Schedule deployment for a future date/time', priority: 'P1' },
      { id: 'dep-9', description: 'Rollback deployment reverts to previous signature', priority: 'P1' },
      { id: 'dep-10', description: 'Deployment confirmation email sent to admin', priority: 'P2' },
    ],
  },
  {
    id: 'team',
    title: 'Team & User Management',
    steps: [
      { id: 'team-1', description: 'Invite team member via email sends invite', priority: 'P0' },
      { id: 'team-2', description: 'Assign role (owner, admin, member) to team member', priority: 'P0' },
      { id: 'team-3', description: 'Remove team member with confirmation', priority: 'P0' },
      { id: 'team-4', description: 'Member can only edit their own signature', priority: 'P0' },
      { id: 'team-5', description: 'Admin can edit all team signatures', priority: 'P0' },
      { id: 'team-6', description: 'Bulk import users from CSV', priority: 'P1' },
      { id: 'team-7', description: 'Sync users from Google Workspace directory', priority: 'P1' },
      { id: 'team-8', description: 'Sync users from Microsoft 365 directory', priority: 'P1' },
      { id: 'team-9', description: 'Team member list shows correct roles and status', priority: 'P1' },
      { id: 'team-10', description: 'Deactivated users cannot log in', priority: 'P1' },
    ],
  },
  {
    id: 'billing',
    title: 'Billing & Subscriptions',
    steps: [
      { id: 'bill-1', description: 'Free plan limits enforced (5 users max)', priority: 'P0' },
      { id: 'bill-2', description: 'Upgrade to Professional plan via Stripe checkout', priority: 'P0' },
      { id: 'bill-3', description: 'Stripe webhook processes payment and activates plan', priority: 'P0' },
      { id: 'bill-4', description: 'Downgrade to free plan cancels Stripe subscription', priority: 'P0' },
      { id: 'bill-5', description: 'Billing portal link opens Stripe customer portal', priority: 'P1' },
      { id: 'bill-6', description: 'Per-seat billing updates when team size changes', priority: 'P1' },
      { id: 'bill-7', description: 'Past-due subscription shows warning banner', priority: 'P1' },
      { id: 'bill-8', description: 'Partner discount coupon applies correctly at checkout', priority: 'P1' },
    ],
  },
  {
    id: 'integrations',
    title: 'Integrations',
    steps: [
      { id: 'int-1', description: 'Connect Google Workspace OAuth flow completes', priority: 'P0' },
      { id: 'int-2', description: 'Connect Microsoft 365 OAuth flow completes', priority: 'P0' },
      { id: 'int-3', description: 'Disconnect integration removes access tokens', priority: 'P0' },
      { id: 'int-4', description: 'Google Workspace user sync pulls directory users', priority: 'P1' },
      { id: 'int-5', description: 'Microsoft 365 user sync pulls directory users', priority: 'P1' },
      { id: 'int-6', description: 'HubSpot integration connects and syncs contacts', priority: 'P1' },
      { id: 'int-7', description: 'Calendly integration adds meeting link to signatures', priority: 'P1' },
      { id: 'int-8', description: 'Google Calendar integration adds meeting link to signatures', priority: 'P1' },
      { id: 'int-9', description: 'Token refresh handles expired OAuth tokens gracefully', priority: 'P0' },
      { id: 'int-10', description: 'Integration status page shows connected/disconnected state', priority: 'P1' },
    ],
  },
  {
    id: 'analytics',
    title: 'Analytics & Tracking',
    steps: [
      { id: 'ana-1', description: 'Analytics dashboard loads with correct date range', priority: 'P1' },
      { id: 'ana-2', description: 'Click tracking records link clicks in signatures', priority: 'P1' },
      { id: 'ana-3', description: 'View tracking records email opens (pixel tracking)', priority: 'P1' },
      { id: 'ana-4', description: 'Analytics breakdown by user shows individual stats', priority: 'P2' },
      { id: 'ana-5', description: 'Analytics breakdown by signature shows per-signature stats', priority: 'P2' },
      { id: 'ana-6', description: 'Export analytics data to CSV', priority: 'P2' },
    ],
  },
  {
    id: 'whitelabel',
    title: 'White-Label & Branding',
    steps: [
      { id: 'wl-1', description: 'MSP portal loads at custom subdomain', priority: 'P1' },
      { id: 'wl-2', description: 'Custom branding (logo, colors) applies to MSP portal', priority: 'P1' },
      { id: 'wl-3', description: 'MSP can manage client organizations', priority: 'P1' },
      { id: 'wl-4', description: 'MSP can deploy signatures for client users', priority: 'P1' },
      { id: 'wl-5', description: 'Client users see MSP branding, not Siggly branding', priority: 'P2' },
      { id: 'wl-6', description: 'MSP billing aggregates across all client orgs', priority: 'P2' },
    ],
  },
];
