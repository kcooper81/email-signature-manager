export type SuperAdminRole = 'super_admin' | 'support';

// All admin view keys and their route prefixes
export const ADMIN_VIEW_ROUTES: Record<string, string> = {
  'dashboard': '/admin',
  'tickets': '/admin/tickets',
  'inbox-settings': '/admin/inbox-settings',
  'help': '/admin/help',
  'accounts': '/admin/accounts',
  'partners': '/admin/partner-applications',
  'billing': '/admin/billing',
  'analytics': '/admin/analytics',
  'seo': '/admin/seo',
  'jobs': '/admin/jobs',
  'activity': '/admin/activity',
  'errors': '/admin/errors',
  'platform-admins': '/admin/platform-admins',
  'testing-guide': '/admin/testing-guide',
};

// Default views for new support users
export const DEFAULT_SUPPORT_VIEWS = ['tickets', 'testing-guide'];

// All available admin views grouped by category (for the UI)
export const ADMIN_VIEW_OPTIONS = [
  {
    group: 'Support',
    views: [
      { key: 'tickets', label: 'Tickets' },
      { key: 'inbox-settings', label: 'Inbox Settings' },
      { key: 'help', label: 'Help Articles' },
    ],
  },
  {
    group: 'Customers',
    views: [
      { key: 'accounts', label: 'Accounts' },
      { key: 'partners', label: 'Partners' },
      { key: 'billing', label: 'Subscriptions' },
    ],
  },
  {
    group: 'Growth',
    views: [
      { key: 'analytics', label: 'Analytics' },
      { key: 'seo', label: 'SEO Engine' },
    ],
  },
  {
    group: 'System',
    views: [
      { key: 'dashboard', label: 'Dashboard' },
      { key: 'jobs', label: 'Jobs' },
      { key: 'activity', label: 'Activity Logs' },
      { key: 'errors', label: 'Error Logs' },
      { key: 'testing-guide', label: 'Testing Guide' },
    ],
  },
];
