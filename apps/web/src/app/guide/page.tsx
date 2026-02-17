'use client';

import { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Users,
  Palette,
  Rocket,
  Settings,
  Building2,
  CreditCard,
  Mail,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Globe,
  ExternalLink,
  UserCog,
  Calendar,
  Play,
  AlertTriangle,
  BarChart3,
  Shield,
  RefreshCw,
  Zap,
  ClipboardCheck,
  FileText,
} from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface GuideSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  link?: string;
  badge?: string;
  steps: {
    title: string;
    description: string;
    role?: string;
    link?: string;
    tips?: string[];
    warning?: string;
  }[];
}

const guideSections: GuideSection[] = [
  {
    id: 'getting-started',
    title: '1. Getting Started',
    icon: <Sparkles className="h-5 w-5" />,
    description: 'Create your account and set up your organization',
    steps: [
      {
        title: 'Step 1: Sign Up',
        role: 'New User',
        description: 'Go to the signup page and create an account with your work email. You\'ll automatically become the organization owner.',
        link: '/signup',
        tips: [
          'Use your work email (e.g., you@company.com)',
          'You\'ll get a free plan with 5 users and 1 template'
        ]
      },
      {
        title: 'Step 2: Verify Your Email',
        role: 'New User',
        description: 'Check your inbox for a verification email and click the link to confirm your account.',
        tips: [
          'Check spam/junk folder if you don\'t see it',
          'The link expires after 24 hours'
        ]
      },
      {
        title: 'Step 3: Log In',
        role: 'New User',
        description: 'After verifying, log in to access your dashboard.',
        link: '/login',
      }
    ]
  },
  {
    id: 'connect-google',
    title: '2. Connect Google Workspace',
    icon: <Globe className="h-5 w-5" />,
    description: 'Connect your Google Workspace to sync users and deploy signatures',
    link: '/integrations',
    steps: [
      {
        title: 'Step 1: Go to Integrations',
        role: 'Admin',
        description: 'From the dashboard sidebar, click "Integrations" to see available connections.',
        link: '/integrations',
      },
      {
        title: 'Step 2: Click "Connect" on Google Workspace',
        role: 'Admin',
        description: 'Find the Google Workspace card and click the "Connect" button. You\'ll be redirected to Google\'s OAuth screen.',
        tips: [
          'You must be a Google Workspace admin to connect',
          'The app will request permission to manage Gmail signatures and read your directory'
        ],
        warning: 'Personal Gmail accounts won\'t work - you need Google Workspace (business)'
      },
      {
        title: 'Step 3: Authorize the App',
        role: 'Admin',
        description: 'On Google\'s screen, review the permissions and click "Allow" to grant access.',
        tips: [
          'You\'ll see permissions for Gmail API and Admin Directory API',
          'These are required to deploy signatures and sync users'
        ]
      },
      {
        title: 'Step 4: Verify Connection',
        role: 'Admin',
        description: 'After authorizing, you\'ll be redirected back. The Google Workspace card should now show "Connected" with a green checkmark.',
        link: '/integrations',
      }
    ]
  },
  {
    id: 'sync-team',
    title: '3. Sync Your Team',
    icon: <Users className="h-5 w-5" />,
    description: 'Import team members from Google Workspace',
    link: '/team',
    steps: [
      {
        title: 'Step 1: Go to Team Page',
        role: 'Admin',
        description: 'From the sidebar, click "Team" to see your team members list.',
        link: '/team',
      },
      {
        title: 'Step 2: Click "Sync Users"',
        role: 'Admin',
        description: 'Click the "Sync Users" button (cloud icon) in the top right. This imports all users from your Google Workspace directory.',
        tips: [
          'Users are imported with name, email, title, and department',
          'Sync can take a few seconds for large organizations'
        ]
      },
      {
        title: 'Step 3: Review Imported Users',
        role: 'Admin',
        description: 'After sync completes, you\'ll see all your team members listed with their details.',
        tips: [
          'Users show their source (Google, Microsoft, Manual)',
          'You can search and filter by department'
        ]
      }
    ]
  },
  {
    id: 'create-template',
    title: '4. Create a Signature Template',
    icon: <Palette className="h-5 w-5" />,
    description: 'Design your email signature using the visual editor',
    link: '/templates',
    steps: [
      {
        title: 'Step 1: Go to Templates',
        role: 'Admin / Editor',
        description: 'From the sidebar, click "Templates" to see your signature templates.',
        link: '/templates',
      },
      {
        title: 'Step 2: Click "Create Template"',
        role: 'Admin / Editor',
        description: 'Click the "Create Template" button to start designing a new signature.',
        link: '/templates/new',
      },
      {
        title: 'Step 3: Name Your Template',
        role: 'Admin / Editor',
        description: 'Give your template a descriptive name like "Company Standard" or "Sales Team Signature".',
      },
      {
        title: 'Step 4: Add Blocks',
        role: 'Admin / Editor',
        description: 'Use the block palette on the left to add elements: Name, Title, Company, Phone, Email, Social Links, Logo, Banner, Divider, Disclaimer.',
        tips: [
          'Drag blocks to reorder them',
          'Click a block to edit its settings',
          'Use placeholders like {{first_name}}, {{title}}, {{email}} for dynamic content'
        ]
      },
      {
        title: 'Step 5: Add Your Logo',
        role: 'Admin / Editor',
        description: 'Add a Logo block and either upload an image or paste a URL to your company logo.',
        tips: [
          'Recommended size: 200-300px wide',
          'Use PNG or JPG format',
          'The logo will be embedded in the signature'
        ]
      },
      {
        title: 'Step 6: Add Social Links',
        role: 'Admin / Editor',
        description: 'Add a Social Links block. Links are pulled from each user\'s profile (LinkedIn, Twitter, etc.).',
        tips: [
          'Social icons are automatically detected from URLs',
          'Users can set their own links in their profile or /my-profile'
        ]
      },
      {
        title: 'Step 7: Set Up Signature Rules (Optional)',
        role: 'Admin / Editor',
        description: 'On the Rules tab of your template, create rules to control when this template is used. Target by department, recipient type (internal/external), or schedule date ranges.',
        tips: [
          'Rules use priority ordering — higher priority rules are evaluated first',
          'First matching rule wins: the system stops at the first match',
          'Use date ranges for campaign-based signatures'
        ]
      },
      {
        title: 'Step 8: Preview and Save',
        role: 'Admin / Editor',
        description: 'Use the preview panel on the right to see how the signature looks. Click "Save" when done.',
        tips: [
          'Preview shows desktop and mobile views',
          'Test with sample user data to see placeholders replaced'
        ]
      }
    ]
  },
  {
    id: 'deploy-signatures',
    title: '5. Deploy Signatures',
    icon: <Rocket className="h-5 w-5" />,
    description: 'Push your signature to Gmail for your team',
    link: '/deployments',
    steps: [
      {
        title: 'Step 1: Go to Deployments',
        role: 'Admin',
        description: 'From the sidebar, click "Deployments" to manage signature deployments.',
        link: '/deployments',
      },
      {
        title: 'Step 2: Click "Deploy Signatures"',
        role: 'Admin',
        description: 'Click the "Deploy Signatures" button to start the deployment wizard.',
      },
      {
        title: 'Step 3: Select a Template',
        role: 'Admin',
        description: 'Choose which signature template to deploy from the dropdown.',
      },
      {
        title: 'Step 4: Choose Target Users',
        role: 'Admin',
        description: 'Select who should receive the signature: "Just Me" (test), "Selected Users", or "All Users".',
        tips: [
          'Start with "Just Me" to test before deploying to everyone',
          'You can filter by department when selecting users'
        ],
        warning: 'Deploying to "All Users" will overwrite everyone\'s Gmail signature'
      },
      {
        title: 'Step 5: Deploy',
        role: 'Admin',
        description: 'Click "Deploy" to push signatures. The system will show progress and results.',
        tips: [
          'Deployment typically takes a few seconds',
          'Check Gmail to verify the signature was applied'
        ]
      },
      {
        title: 'Step 6: View Results',
        role: 'Admin',
        description: 'After deployment, you\'ll see a summary showing successful and failed deployments.',
        tips: [
          'Click on a deployment to see per-user results',
          'Failed users can be re-deployed individually'
        ]
      }
    ]
  },
  {
    id: 'user-profile-settings',
    title: '6. User Profile & Personal Links',
    icon: <UserCog className="h-5 w-5" />,
    description: 'How users can manage their own profile and links',
    steps: [
      {
        title: 'Edit User from Team Page',
        role: 'Admin',
        description: 'Admins can edit any user by going to Team \u2192 clicking on a user \u2192 Edit. This opens a modal where you can update their title, department, phone, and personal links.',
        link: '/team',
        tips: [
          'Personal links include: LinkedIn, Twitter, Calendly, GitHub, Instagram, Facebook, YouTube, Personal Website',
          'These links appear in signatures if the template has a Social Links block'
        ]
      },
      {
        title: 'Enable Self-Manage for Users',
        role: 'Admin',
        description: 'To let users manage their own profile, edit the user and enable "Self-Manage Portal". This gives them access to /my-profile.',
        link: '/team',
      },
      {
        title: 'Access Self-Manage Portal',
        role: 'Employee',
        description: 'Users with self-manage enabled can log in and access /my-profile to update their own information.',
        link: '/my-profile',
        tips: [
          'Users can update: Name, Title, Phone, Personal Links',
          'Changes require a re-deployment to update their signature'
        ]
      },
      {
        title: 'Setting Calendly URL',
        role: 'Admin / Employee',
        description: 'Calendly links are set per-user. Admin: Edit user on Team page. User: Update in /my-profile under "Personal Links".',
        tips: [
          'Enter the full Calendly URL (e.g., https://calendly.com/yourname)',
          'This appears in signatures with a Booking/Calendly block'
        ]
      }
    ]
  },
  {
    id: 'google-calendar-ooo',
    title: '7. Google Calendar & Out of Office',
    icon: <Calendar className="h-5 w-5" />,
    description: 'Automatic OOO banners based on Google Calendar',
    steps: [
      {
        title: 'Enable Calendar Integration',
        role: 'Admin',
        description: 'Go to Settings \u2192 General \u2192 Organization tab \u2192 scroll to "Employee Features" \u2192 enable "Allow Calendar Integration" and "Allow OOO Banners".',
        link: '/settings',
      },
      {
        title: 'Enable in Self-Manage Portal',
        role: 'Employee',
        description: 'Users go to /my-profile \u2192 find "Calendar Integration" section \u2192 toggle "Enable Google Calendar" and "Show OOO Banner".',
        link: '/my-profile',
        tips: [
          'User must have Google Calendar access',
          'OOO events are detected automatically from their calendar'
        ]
      },
      {
        title: 'How It Works',
        role: 'All Users',
        description: 'When a user has an OOO event in Google Calendar, their signature automatically shows an OOO banner with dates.',
        tips: [
          'Users can customize their OOO message',
          'Banner appears/disappears automatically based on calendar events'
        ]
      }
    ]
  },
  {
    id: 'analytics',
    title: '8. Analytics & Click Tracking',
    icon: <BarChart3 className="h-5 w-5" />,
    description: 'Track clicks, measure signature performance, and view reports',
    link: '/analytics',
    badge: 'Pro',
    steps: [
      {
        title: 'View Analytics Dashboard',
        role: 'Admin',
        description: 'From the sidebar, click "Analytics" to see your signature performance overview with total clicks, top links, and trends.',
        link: '/analytics',
      },
      {
        title: 'Link Performance',
        role: 'Admin',
        description: 'See which links in your signatures get the most clicks. Track social links, website links, booking links, and banner clicks.',
        tips: [
          'Click tracking is automatic for all deployed signatures',
          'Data updates in real-time as recipients click links'
        ]
      },
      {
        title: 'Campaign Analytics',
        role: 'Admin',
        description: 'Track banner campaign performance with click-through rates and engagement metrics.',
        tips: [
          'Use date filters to compare campaign periods',
          'Export data for reporting'
        ]
      }
    ]
  },
  {
    id: 'disclaimers',
    title: '9. Email Disclaimers',
    icon: <Shield className="h-5 w-5" />,
    description: 'Add legal disclaimers and compliance text to signatures',
    link: '/settings/disclaimers',
    badge: 'Pro',
    steps: [
      {
        title: 'Step 1: Go to Disclaimers',
        role: 'Admin (Pro)',
        description: 'Go to Settings \u2192 click "Disclaimers" in the Compliance section of the sidebar.',
        link: '/settings/disclaimers',
      },
      {
        title: 'Step 2: Create a Disclaimer Template',
        role: 'Admin (Pro)',
        description: 'On the Templates tab, click "Add Template". Fill in the name, category (Legal/Privacy/Compliance/Custom), and the disclaimer content text.',
        tips: [
          'Use presets for common regulations \u2014 click the Presets tab and hit "Use This" to pre-fill a template',
          'Available presets: GDPR, HIPAA, Confidentiality, SOX, FINRA, and more',
          'Free plan: up to 2 templates. Professional: unlimited'
        ]
      },
      {
        title: 'Step 3: Create Disclaimer Rules',
        role: 'Admin (Pro)',
        description: 'Switch to the Rules tab and click "Add Rule". Select which disclaimer template to use and set conditions for when it applies.',
        tips: [
          'Target by department (e.g., only Legal team)',
          'Target by region (e.g., only EU employees for GDPR)',
          'Target by recipient domain (e.g., only external emails)',
          'Set date ranges for time-limited disclaimers',
          'Multiple rules can match \u2014 all matching disclaimers are appended'
        ]
      },
      {
        title: 'Step 4: Edit and Delete',
        role: 'Admin (Pro)',
        description: 'Click "Edit" on any template or rule to modify it. Click "Delete" to remove it. Changes take effect on the next signature deployment.',
      },
      {
        title: 'Testing with Sample Data',
        role: 'Admin (Pro)',
        description: 'Create a test disclaimer to verify the full flow:',
        tips: [
          'Template name: "Test Confidentiality Notice"',
          'Category: Legal',
          'Content: "This email and any attachments are confidential and intended solely for the addressee. If you are not the intended recipient, please delete this message immediately."',
          'Then create a Rule: name "External Only", link it to your template, set recipient condition to "external"',
          'Or use the Presets tab \u2014 click "Use This" on any regulatory preset (GDPR, HIPAA, etc.) to auto-fill a template'
        ]
      }
    ]
  },
  {
    id: 'hr-sync',
    title: '10. HR Sync',
    icon: <RefreshCw className="h-5 w-5" />,
    description: 'Sync employee data from HR systems to keep signatures current',
    link: '/settings/hr-sync',
    badge: 'Pro',
    steps: [
      {
        title: 'Step 1: Go to HR Sync',
        role: 'Admin (Pro)',
        description: 'Go to Settings \u2192 click "HR Sync" in the Automation section of the sidebar.',
        link: '/settings/hr-sync',
      },
      {
        title: 'Step 2: Add an Integration',
        role: 'Admin (Pro)',
        description: 'Click "Add Integration" and select your HR provider: BambooHR, Gusto, Rippling, Google, or Microsoft.',
      },
      {
        title: 'Step 3: Configure the Sync',
        role: 'Admin (Pro)',
        description: 'Set the schedule (manual, daily, weekly), conflict resolution (HR wins, Siggly wins, or manual review), and enter your API credentials.',
        tips: [
          'Enable "Auto-apply changes" to update user profiles automatically',
          'Enable "Sync new users" to auto-create Siggly accounts for new hires',
          'Enable "Sync deactivated" to auto-deactivate users who leave',
          'Realtime sync is available on Enterprise plans'
        ]
      },
      {
        title: 'Step 4: Test the Sync',
        role: 'Admin (Pro)',
        description: 'Click "Sync Now" to trigger a manual sync. Review the results to verify data is pulling correctly.',
      },
      {
        title: 'Testing with Dummy Data',
        role: 'Admin (Pro)',
        description: 'To test HR Sync without a real HR provider, create a configuration with these test values:',
        tips: [
          'Provider: BambooHR',
          'API Key: test_api_key_12345',
          'API URL: https://api.bamboohr.com/api/gateway.php/testcompany',
          'Schedule: Manual (so it only runs when you click "Sync Now")',
          'Conflict Resolution: Manual Review (to inspect changes before applying)',
          'The sync will attempt to connect \u2014 it will show an error since the credentials are fake, but this verifies the UI flow end-to-end'
        ]
      }
    ]
  },
  {
    id: 'validation-rules',
    title: '11. Validation Rules',
    icon: <ClipboardCheck className="h-5 w-5" />,
    description: 'Enforce data quality on user profile fields',
    link: '/settings/validation-rules',
    badge: 'Pro',
    steps: [
      {
        title: 'Step 1: Go to Validation',
        role: 'Admin (Pro)',
        description: 'Go to Settings \u2192 click "Validation" in the Compliance section of the sidebar.',
        link: '/settings/validation-rules',
      },
      {
        title: 'Step 2: Add a Rule',
        role: 'Admin (Pro)',
        description: 'Click "Add Rule". Select the field to validate (email, phone, job_title, etc.), the validation type (required, regex, min_length, max_length, format), and set the value and error message.',
        tips: [
          'Example: Phone must match format +1-555-123-4567',
          'Example: Job title is required',
          'Example: First name minimum 2 characters'
        ]
      },
      {
        title: 'Step 3: Test',
        role: 'Employee',
        description: 'When an employee updates their profile, validation rules run against the submitted data. If a field fails, they see your custom error message.',
      },
      {
        title: 'Sample Validation Rules to Try',
        role: 'Admin (Pro)',
        description: 'Create these test rules to see validation in action:',
        tips: [
          'Field: phone, Type: format, Value: "+1-XXX-XXX-XXXX", Error: "Phone must be in +1-XXX-XXX-XXXX format"',
          'Field: job_title, Type: required, Value: "true", Error: "Job title is required for all employees"',
          'Field: first_name, Type: min_length, Value: "2", Error: "First name must be at least 2 characters"'
        ]
      }
    ]
  },
  {
    id: 'automation-workflows',
    title: '12. Lifecycle Automation',
    icon: <Zap className="h-5 w-5" />,
    description: 'Automate signature assignment when users join, leave, or change departments',
    link: '/settings/automation',
    badge: 'Pro',
    steps: [
      {
        title: 'Step 1: Go to Workflows',
        role: 'Admin (Pro)',
        description: 'Go to Settings \u2192 click "Workflows" in the Automation section of the sidebar.',
        link: '/settings/automation',
      },
      {
        title: 'Step 2: Create a Workflow',
        role: 'Admin (Pro)',
        description: 'Click "Create Workflow". Give it a name and select a trigger event: User Joined, User Left, User Moved Department, User Updated, or Invite Accepted.',
      },
      {
        title: 'Step 3: Add Actions',
        role: 'Admin (Pro)',
        description: 'In the Actions section, add one or more actions that execute when the trigger fires.',
        tips: [
          'Assign Template \u2014 select a signature template from the dropdown',
          'Remove Template \u2014 unassign a template',
          'Deploy Signature \u2014 push to Gmail/Outlook automatically',
          'Send Notification \u2014 alert an admin or the user',
          'Add/Remove from Group \u2014 manage group membership',
          'Set Field \u2014 update a profile field value',
          'Call Webhook \u2014 hit an external URL (Enterprise only)'
        ]
      },
      {
        title: 'Step 4: Set Filters (Optional)',
        role: 'Admin (Pro)',
        description: 'Narrow the trigger to specific departments or user sources. Set priority to control execution order when multiple workflows match.',
        tips: [
          'Department filter: only trigger for Sales, Engineering, etc.',
          'Source filter: only trigger for users from Google, manual entry, etc.',
          'Higher priority workflows run first'
        ]
      },
      {
        title: 'Step 5: Test the Workflow',
        role: 'Admin (Pro)',
        description: 'Click the "Test" button on any workflow to simulate execution and verify it works correctly.',
      },
      {
        title: 'Sample Workflow to Try',
        role: 'Admin (Pro)',
        description: 'Create this onboarding workflow to test the full flow:',
        tips: [
          'Name: "New Hire Onboarding"',
          'Trigger: User Joined',
          'Action 1: Assign Template \u2192 select your default signature template',
          'Action 2: Deploy Signature \u2192 push to their email client',
          'Action 3: Send Notification \u2192 alert admin of new hire',
          'Department filter: leave empty to apply to all departments',
          'Then click "Test" to simulate \u2014 it will show a success/failure result without affecting real data'
        ]
      }
    ]
  },
  {
    id: 'brand-governance',
    title: '13. Brand Governance',
    icon: <FileText className="h-5 w-5" />,
    description: 'Define brand standards and audit signature compliance',
    link: '/brand',
    badge: 'Enterprise',
    steps: [
      {
        title: 'Step 1: Go to Brand',
        role: 'Admin (Enterprise)',
        description: 'From the sidebar, click "Brand" to access the Brand Hub. This shows your compliance score and quick links to all brand tools.',
        link: '/brand',
        tips: [
          'Brand is visible in the sidebar for all plans',
          'Free and Professional users see an upgrade prompt \u2014 brand governance features require Enterprise'
        ]
      },
      {
        title: 'Step 2: Create Brand Guidelines',
        role: 'Admin (Enterprise)',
        description: 'Go to Brand \u2192 Guidelines \u2192 click "New Guideline". Define your approved colors (hex values), allowed fonts, and required elements.',
        link: '/brand/guidelines',
        tips: [
          'Add primary, secondary, and accent colors with hex color picker',
          'Lock colors and fonts to prevent deviations',
          'Require disclaimers or specific social links in all signatures'
        ]
      },
      {
        title: 'Step 3: Upload Brand Assets',
        role: 'Admin (All Plans)',
        description: 'Go to Brand \u2192 Assets to upload and manage logos, banners, and icons for use in signature templates.',
        link: '/brand/assets',
        tips: [
          'Drag and drop images or click to upload',
          'Categorize assets: logo, banner, icon, photo',
          'Assets are available to all plans \u2014 no Enterprise required'
        ]
      },
      {
        title: 'Step 4: Run a Brand Audit',
        role: 'Admin (Enterprise)',
        description: 'Go to Brand \u2192 Audit \u2192 click "Re-run Audit". The system scores every user\'s signature against your brand guidelines.',
        link: '/brand/audit',
        tips: [
          'Each user gets a compliance score (0-100%)',
          'Violations are listed with expected vs. actual values',
          'Green = 80%+, Yellow = 60-79%, Red = below 60%'
        ]
      },
      {
        title: 'Sample Brand Guideline to Try',
        role: 'Admin (Enterprise)',
        description: 'Create a test guideline to see the audit in action:',
        tips: [
          'Name: "Company Brand Standards"',
          'Primary colors: #7c3aed (violet), #2563eb (blue)',
          'Secondary colors: #0891b2 (cyan)',
          'Allowed fonts: Arial, Helvetica, Inter',
          'Toggle "Lock Colors" and "Lock Fonts" on',
          'Enable "Required Disclaimer" \u2014 audit will flag signatures missing a disclaimer',
          'Then run a Brand Audit to see how current signatures score against these rules'
        ]
      }
    ]
  },
  {
    id: 'settings',
    title: '14. Settings & Billing',
    icon: <Settings className="h-5 w-5" />,
    description: 'Manage your account, organization, and subscription',
    link: '/settings',
    steps: [
      {
        title: 'Settings Navigation',
        role: 'All Users',
        description: 'Click "Settings" in the sidebar. The settings page has a grouped sidebar with three sections: Account (General, Billing), Compliance (Disclaimers, Validation, Branding for MSP), and Automation (HR Sync, Workflows).',
        link: '/settings',
        tips: [
          'General: Profile, Organization, Notifications, Appearance, Security \u2014 all accessible via tabs on the main settings page',
          'Each sub-page in Compliance and Automation has its own dedicated page'
        ]
      },
      {
        title: 'View Current Plan',
        role: 'Admin / Owner',
        description: 'Go to Settings \u2192 Billing to see your current plan, usage, and manage your subscription.',
        link: '/settings/billing',
      },
      {
        title: 'Upgrade Plan',
        role: 'Owner',
        description: 'Click "Upgrade" to see available plans. You\'ll be redirected to Stripe Checkout.',
        tips: [
          'Free: 5 users, 1 template, basic features',
          'Professional ($1.50/user, 10-user min): Unlimited templates, analytics, disclaimers, HR sync, automation',
          'Enterprise: Custom pricing, brand governance, SSO, white-label, dedicated support'
        ]
      },
      {
        title: 'Manage Billing',
        role: 'Owner',
        description: 'Click "Manage Billing" to access Stripe Customer Portal for payment methods, invoices, and cancellation.',
      }
    ]
  },
  {
    id: 'msp-multi-tenant',
    title: '15. MSP Multi-Tenant (Partners)',
    icon: <Building2 className="h-5 w-5" />,
    description: 'Manage multiple client organizations',
    steps: [
      {
        title: 'Step 1: Apply for Partner Status',
        role: 'Admin',
        description: 'Click "Become a Partner" in the sidebar or go to the Partner Application page and submit your application.',
        tips: [
          'Partners get volume discounts',
          'Manage all clients from one dashboard'
        ]
      },
      {
        title: 'Step 2: Wait for Approval',
        role: 'Admin',
        description: 'Our team will review your application. You\'ll receive an email when approved.',
      },
      {
        title: 'Step 3: Add Client Organizations',
        role: 'MSP Admin',
        description: 'Once approved, go to Clients page and click "Add Client". Enter client company name and admin email.',
        link: '/clients',
        tips: [
          'Each client is a separate organization',
          'Client admin receives an invite email'
        ]
      },
      {
        title: 'Step 4: Switch Between Clients',
        role: 'MSP Admin',
        description: 'Use the organization switcher in the dashboard header to switch between your MSP org and client orgs.',
        tips: [
          'A banner shows which client you\'re currently viewing',
          'All actions apply to the selected organization'
        ]
      },
      {
        title: 'Step 5: Manage Client Templates & Deployments',
        role: 'MSP Admin',
        description: 'While viewing a client org, you can create templates and deploy signatures just like your own org.',
      },
      {
        title: 'Step 6: Cascade Settings to Clients',
        role: 'MSP Admin',
        description: 'Disclaimer rules, automation workflows, and brand guidelines can be set to "Cascade to Clients" \u2014 they automatically apply to all your managed client organizations.',
        tips: [
          'Cascaded rules appear as read-only in client orgs',
          'Clients cannot modify cascaded rules'
        ]
      }
    ]
  },
  {
    id: 'testing-checklist',
    title: '16. Testing Checklist',
    icon: <CheckCircle2 className="h-5 w-5" />,
    description: 'Quick checklist to verify everything works',
    steps: [
      {
        title: '\u2713 Account & Auth',
        role: 'New User',
        description: 'Sign up \u2192 Verify email \u2192 Log in \u2192 Log out \u2192 Log back in',
        link: '/signup',
      },
      {
        title: '\u2713 Google Integration',
        role: 'Admin',
        description: 'Connect Google Workspace \u2192 Verify "Connected" status \u2192 Sync users',
        link: '/integrations',
      },
      {
        title: '\u2713 Team Management',
        role: 'Admin',
        description: 'View synced users \u2192 Edit a user \u2192 Add personal links \u2192 Enable self-manage',
        link: '/team',
      },
      {
        title: '\u2713 Templates & Rules',
        role: 'Admin / Editor',
        description: 'Create template \u2192 Add blocks \u2192 Set up signature rules \u2192 Preview \u2192 Save',
        link: '/templates',
      },
      {
        title: '\u2713 Deployment',
        role: 'Admin',
        description: 'Deploy to "Just Me" \u2192 Check Gmail for signature \u2192 Deploy to selected users',
        link: '/deployments',
      },
      {
        title: '\u2713 Self-Manage Portal',
        role: 'Employee',
        description: 'Log in as a self-manage user \u2192 Access /my-profile \u2192 Update personal links',
        link: '/my-profile',
      },
      {
        title: '\u2713 Analytics',
        role: 'Admin (Pro)',
        description: 'View analytics dashboard \u2192 Check click tracking \u2192 Review campaign performance',
        link: '/analytics',
      },
      {
        title: '\u2713 Disclaimers',
        role: 'Admin (Pro)',
        description: 'Create disclaimer template \u2192 Add rule with conditions \u2192 Verify disclaimer appends on deploy',
        link: '/settings/disclaimers',
      },
      {
        title: '\u2713 HR Sync',
        role: 'Admin (Pro)',
        description: 'Add HR integration \u2192 Configure schedule \u2192 Run manual sync \u2192 Verify data pulled',
        link: '/settings/hr-sync',
      },
      {
        title: '\u2713 Automation',
        role: 'Admin (Pro)',
        description: 'Create workflow \u2192 Select trigger \u2192 Add actions with template dropdown \u2192 Test workflow',
        link: '/settings/automation',
      },
      {
        title: '\u2713 Brand Governance',
        role: 'Admin (Enterprise)',
        description: 'Create brand guideline \u2192 Upload assets to Brand > Assets \u2192 Run audit \u2192 Review scores',
        link: '/brand',
      },
      {
        title: '\u2713 Billing',
        role: 'Owner',
        description: 'View current plan \u2192 Test upgrade flow (use test card 4242424242424242)',
        link: '/settings/billing',
      },
      {
        title: '\u2713 MSP (if applicable)',
        role: 'MSP Admin',
        description: 'Apply for partner \u2192 Add client org \u2192 Switch to client \u2192 Create template \u2192 Deploy',
      }
    ]
  }
];

function CollapsibleSection({ section }: { section: GuideSection }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="mb-4">
      <CardHeader
        className="cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              {section.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg">{section.title}</CardTitle>
                {section.badge && (
                  <Badge variant="secondary" className="text-xs">{section.badge}</Badge>
                )}
                {section.link && (
                  <Link
                    href={section.link}
                    target="_blank"
                    className="text-primary hover:text-primary/80"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                )}
              </div>
              <CardDescription>{section.description}</CardDescription>
            </div>
          </div>
          {isOpen ? (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </CardHeader>
      {isOpen && (
        <CardContent className="pt-0">
          <div className="space-y-6">
            {section.steps.map((step, index) => (
              <div key={index} className="border-l-2 border-primary/20 pl-4">
                <h4 className="font-semibold text-base mb-2 flex items-center gap-2 flex-wrap">
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                  {step.role && (
                    <Badge variant="secondary" className="text-xs font-medium">{step.role}</Badge>
                  )}
                  {step.title}
                  {step.link && (
                    <Link
                      href={step.link}
                      target="_blank"
                      className="text-primary hover:text-primary/80 ml-1"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  )}
                </h4>
                <p className="text-muted-foreground mb-3">{step.description}</p>
                {step.link && (
                  <Link
                    href={step.link}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline mb-3"
                  >
                    <Play className="h-3 w-3" /> Open {step.link}
                  </Link>
                )}
                {step.warning && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                    <p className="text-sm text-yellow-800 flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      {step.warning}
                    </p>
                  </div>
                )}
                {step.tips && step.tips.length > 0 && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-sm font-medium mb-2 flex items-center gap-1">
                      <Sparkles className="h-3 w-3" /> Tips
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {step.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start gap-2">
                          <ArrowRight className="h-3 w-3 mt-1 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}

export default function GuidePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="text-violet-600 border-violet-300 bg-violet-50">
            User Guide
          </Badge>
        </div>
        <h1 className="text-3xl font-bold mb-2">Siggly User Guide</h1>
        <p className="text-muted-foreground text-lg">
          Step-by-step instructions for all Siggly features. Click any section to expand.
        </p>
        <p className="text-muted-foreground text-sm mt-2">
          Each step is labeled with the account type you need — look for tags like <Badge variant="secondary" className="text-xs mx-1">Admin</Badge> <Badge variant="secondary" className="text-xs mx-1">Employee</Badge> <Badge variant="secondary" className="text-xs mx-1">Pro</Badge> to know which account to log in as.
        </p>
      </div>

      <Card className="mb-6 bg-blue-50 border-blue-200">
        <CardContent className="pt-4">
          <h3 className="font-semibold text-blue-900 mb-2">Quick Links</h3>
          <div className="flex flex-wrap gap-2">
            <Link href="/signup" target="_blank" className="inline-flex items-center gap-1 text-sm bg-white px-3 py-1 rounded-full border hover:bg-blue-100">
              Sign Up <ExternalLink className="h-3 w-3" />
            </Link>
            <Link href="/login" target="_blank" className="inline-flex items-center gap-1 text-sm bg-white px-3 py-1 rounded-full border hover:bg-blue-100">
              Log In <ExternalLink className="h-3 w-3" />
            </Link>
            <Link href="/integrations" target="_blank" className="inline-flex items-center gap-1 text-sm bg-white px-3 py-1 rounded-full border hover:bg-blue-100">
              Integrations <ExternalLink className="h-3 w-3" />
            </Link>
            <Link href="/team" target="_blank" className="inline-flex items-center gap-1 text-sm bg-white px-3 py-1 rounded-full border hover:bg-blue-100">
              Team <ExternalLink className="h-3 w-3" />
            </Link>
            <Link href="/templates" target="_blank" className="inline-flex items-center gap-1 text-sm bg-white px-3 py-1 rounded-full border hover:bg-blue-100">
              Templates <ExternalLink className="h-3 w-3" />
            </Link>
            <Link href="/deployments" target="_blank" className="inline-flex items-center gap-1 text-sm bg-white px-3 py-1 rounded-full border hover:bg-blue-100">
              Deployments <ExternalLink className="h-3 w-3" />
            </Link>
            <Link href="/analytics" target="_blank" className="inline-flex items-center gap-1 text-sm bg-white px-3 py-1 rounded-full border hover:bg-blue-100">
              Analytics <ExternalLink className="h-3 w-3" />
            </Link>
            <Link href="/brand" target="_blank" className="inline-flex items-center gap-1 text-sm bg-white px-3 py-1 rounded-full border hover:bg-blue-100">
              Brand <ExternalLink className="h-3 w-3" />
            </Link>
            <Link href="/settings" target="_blank" className="inline-flex items-center gap-1 text-sm bg-white px-3 py-1 rounded-full border hover:bg-blue-100">
              Settings <ExternalLink className="h-3 w-3" />
            </Link>
            <Link href="/my-profile" target="_blank" className="inline-flex items-center gap-1 text-sm bg-white px-3 py-1 rounded-full border hover:bg-blue-100">
              My Profile <ExternalLink className="h-3 w-3" />
            </Link>
            <Link href="/clients" target="_blank" className="inline-flex items-center gap-1 text-sm bg-white px-3 py-1 rounded-full border hover:bg-blue-100">
              Clients (MSP) <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {guideSections.map((section) => (
          <CollapsibleSection key={section.id} section={section} />
        ))}
      </div>

      <Card className="mt-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-primary/20">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Need Help?</h3>
              <p className="text-muted-foreground mb-3">
                If you run into any issues or have questions, reach out to our support team.
              </p>
              <div className="flex gap-2">
                <Badge variant="secondary">support@siggly.io</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
