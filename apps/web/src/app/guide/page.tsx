'use client';

import { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  Users, 
  Palette, 
  Rocket, 
  Settings, 
  Link2, 
  Building2, 
  CreditCard,
  UserPlus,
  Mail,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Calendar,
  BarChart3,
  Shield,
  Globe
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface GuideSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  steps: {
    title: string;
    description: string;
    tips?: string[];
  }[];
}

const guideSections: GuideSection[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: <Sparkles className="h-5 w-5" />,
    description: 'Set up your account and connect your email provider',
    steps: [
      {
        title: '1. Create Your Account',
        description: 'Sign up with your email address. You\'ll automatically get a free plan with up to 5 users and 1 signature template.',
        tips: [
          'Use your work email for the best experience',
          'You\'ll be the organization owner with full admin access'
        ]
      },
      {
        title: '2. Connect Google Workspace or Microsoft 365',
        description: 'Go to Settings → Integrations and click "Connect" next to your email provider. This allows Siggly to deploy signatures and sync your team members.',
        tips: [
          'You\'ll need admin access to your Google Workspace or Microsoft 365 account',
          'The OAuth flow will request permission to manage signatures and read user directory'
        ]
      },
      {
        title: '3. Sync Your Team',
        description: 'After connecting, go to the Team page and click "Sync Users". This imports all your team members from your directory.',
        tips: [
          'Users are imported with their name, email, title, and department',
          'You can manually add users too if needed'
        ]
      }
    ]
  },
  {
    id: 'templates',
    title: 'Creating Signature Templates',
    icon: <Palette className="h-5 w-5" />,
    description: 'Design beautiful, professional email signatures',
    steps: [
      {
        title: '1. Create a New Template',
        description: 'Go to Templates and click "Create Template". Give it a name like "Company Standard" or "Sales Team".',
        tips: [
          'Start with a blank template or duplicate an existing one',
          'Templates are organization-wide and can be assigned to specific users or departments'
        ]
      },
      {
        title: '2. Use the Visual Editor',
        description: 'Drag and drop blocks to build your signature. Available blocks include: Name, Title, Company, Phone, Email, Social Links, Logo, Banner, and Disclaimer.',
        tips: [
          'Use dynamic placeholders like {{first_name}} to personalize for each user',
          'Add your company logo by uploading an image or entering a URL',
          'Social links auto-detect the platform from the URL'
        ]
      },
      {
        title: '3. Add Compliance Blocks',
        description: 'For regulated industries, add pre-built compliance blocks for Legal, Healthcare, Finance, or Real Estate disclaimers.',
        tips: [
          'Compliance blocks are mobile-responsive',
          'You can customize the disclaimer text'
        ]
      },
      {
        title: '4. Preview and Save',
        description: 'Use the preview panel to see how your signature looks on desktop and mobile. Click Save when you\'re happy.',
        tips: [
          'Test with different user data to see how placeholders render',
          'Signatures are automatically optimized for email clients'
        ]
      }
    ]
  },
  {
    id: 'team-management',
    title: 'Team Management',
    icon: <Users className="h-5 w-5" />,
    description: 'Manage your team members and their signature data',
    steps: [
      {
        title: '1. View Your Team',
        description: 'The Team page shows all users in your organization with their name, email, title, department, and signature status.',
        tips: [
          'Filter by department to find specific users',
          'Search by name or email'
        ]
      },
      {
        title: '2. Edit User Details',
        description: 'Click on any user to edit their profile. You can update their title, department, phone, and personal links (LinkedIn, Calendly, etc.).',
        tips: [
          'Personal links appear in their signature if the template includes social blocks',
          'Changes take effect on the next deployment'
        ]
      },
      {
        title: '3. Invite New Users',
        description: 'Click "Add Member" to invite someone who isn\'t in your directory. They\'ll receive an email invitation.',
        tips: [
          'Invited users can self-manage their profile if enabled',
          'You can set their role: Admin, Editor, or Viewer'
        ]
      },
      {
        title: '4. Self-Manage Portal',
        description: 'Enable "Self-Manage" for users to let them update their own profile and personal links without admin access.',
        tips: [
          'Self-manage users see a simplified portal at /my-profile',
          'They can update their photo, title, phone, and social links',
          'Admins control which fields are editable'
        ]
      }
    ]
  },
  {
    id: 'deployments',
    title: 'Deploying Signatures',
    icon: <Rocket className="h-5 w-5" />,
    description: 'Push signatures to your team\'s email accounts',
    steps: [
      {
        title: '1. Start a Deployment',
        description: 'Go to Deployments and click "Deploy Signatures". Select a template and choose your target: Just Me, Selected Users, or All Users.',
        tips: [
          'Start with "Just Me" to test before deploying to everyone',
          'You can filter users by department'
        ]
      },
      {
        title: '2. Review and Confirm',
        description: 'Preview how the signature will look for each user. The system shows a summary of how many users will receive the signature.',
        tips: [
          'Each user gets a personalized signature with their own data',
          'Placeholders are replaced with actual user information'
        ]
      },
      {
        title: '3. Deploy',
        description: 'Click "Deploy" to push signatures to all selected users. The deployment runs in the background and you\'ll see progress updates.',
        tips: [
          'Deployments typically complete in under a minute for small teams',
          'Failed deployments show which users had issues'
        ]
      },
      {
        title: '4. View Deployment History',
        description: 'The Deployments page shows a history of all past deployments with status, user counts, and timestamps.',
        tips: [
          'Click on a deployment to see per-user results',
          'Re-deploy to fix any failed users'
        ]
      }
    ]
  },
  {
    id: 'integrations',
    title: 'Integrations',
    icon: <Link2 className="h-5 w-5" />,
    description: 'Connect with Google Workspace, Microsoft 365, HubSpot, and Calendly',
    steps: [
      {
        title: '1. Google Workspace',
        description: 'Connect to deploy Gmail signatures and sync users from Google Directory. Requires Workspace admin access.',
        tips: [
          'Signatures are deployed via Gmail API',
          'User sync pulls from Google Admin Directory',
          'Supports domain-wide delegation for enterprise'
        ]
      },
      {
        title: '2. Calendly',
        description: 'Connect Calendly to add meeting scheduling links to signatures. Users can set their own Calendly URL.',
        tips: [
          'Calendly links appear in the signature booking block',
          'Each user can have their own scheduling link',
          'Supports Calendly event types'
        ]
      },
      {
        title: '3. Google Calendar (OOO)',
        description: 'Enable Google Calendar integration to automatically show Out of Office banners in signatures.',
        tips: [
          'Detects OOO events from Google Calendar',
          'Automatically adds/removes OOO banner',
          'Customizable OOO message'
        ]
      }
    ]
  },
  {
    id: 'billing',
    title: 'Billing & Plans',
    icon: <CreditCard className="h-5 w-5" />,
    description: 'Manage your subscription and billing',
    steps: [
      {
        title: '1. View Your Plan',
        description: 'Go to Settings → Billing to see your current plan, usage, and limits.',
        tips: [
          'Free: 5 users, 1 template, Google Workspace only',
          'Starter: $0.50/user/month, 5 templates, Google + Microsoft',
          'Professional: $29/month + $1/user, unlimited templates, all integrations',
          'Enterprise: Custom pricing, SSO, API, white-label'
        ]
      },
      {
        title: '2. Upgrade Your Plan',
        description: 'Click "Upgrade" to move to a higher plan. You\'ll be redirected to Stripe Checkout.',
        tips: [
          'Upgrades take effect immediately',
          'You\'re only charged for the remaining billing period'
        ]
      },
      {
        title: '3. Manage Billing',
        description: 'Click "Manage Billing" to access the Stripe Customer Portal where you can update payment methods, view invoices, and cancel.',
        tips: [
          'Invoices are sent via email',
          'You can download past invoices from the portal'
        ]
      }
    ]
  },
  {
    id: 'msp-multi-tenant',
    title: 'MSP Multi-Tenant (Partners)',
    icon: <Building2 className="h-5 w-5" />,
    description: 'Manage multiple client organizations as an MSP or agency',
    steps: [
      {
        title: '1. Become an MSP Partner',
        description: 'Apply for MSP partner status to manage signatures for multiple client organizations. Go to Settings → Partner Program.',
        tips: [
          'MSP partners get volume discounts',
          'Manage all clients from a single dashboard',
          'White-label options available on Enterprise plan'
        ]
      },
      {
        title: '2. Add Client Organizations',
        description: 'Once approved, go to Clients and click "Add Client". Enter the client\'s company name and admin email.',
        tips: [
          'Each client is a separate organization with their own users and templates',
          'Client admins can manage their own organization',
          'You retain full access as the MSP'
        ]
      },
      {
        title: '3. Switch Between Clients',
        description: 'Use the organization switcher in the header to switch between your MSP organization and client organizations.',
        tips: [
          'The banner shows which client you\'re currently viewing',
          'All actions apply to the selected client organization'
        ]
      },
      {
        title: '4. Manage Client Access',
        description: 'Control which MSP team members can access which clients. Set access levels: Full, Read-Only, or None.',
        tips: [
          'Full access: Can deploy signatures and edit templates',
          'Read-only: Can view but not modify',
          'Audit logs track all MSP actions'
        ]
      },
      {
        title: '5. Client Billing',
        description: 'Choose how to bill clients: Direct (client pays Stripe), MSP-Managed (you pay and invoice client), or Included (bundled in your MSP fee).',
        tips: [
          'MSP-Managed billing gives you a single invoice for all clients',
          'Partner discounts apply to all client seats',
          'Revenue sharing available for referrals'
        ]
      }
    ]
  },
  {
    id: 'settings',
    title: 'Organization Settings',
    icon: <Settings className="h-5 w-5" />,
    description: 'Configure your organization preferences',
    steps: [
      {
        title: '1. Organization Profile',
        description: 'Update your company name, logo, and domain. This information is used in signature templates.',
        tips: [
          'Upload a high-resolution logo for best results',
          'Domain is used for email validation'
        ]
      },
      {
        title: '2. Branding',
        description: 'Customize the dashboard appearance with your brand colors. Available on Professional and Enterprise plans.',
        tips: [
          'Set primary and secondary colors',
          'Upload a custom logo for the dashboard header',
          'White-label removes Siggly branding (Enterprise only)'
        ]
      },
      {
        title: '3. Team Permissions',
        description: 'Configure default permissions for new team members and control what self-manage users can edit.',
        tips: [
          'Roles: Owner, Admin, Editor, Viewer, Member',
          'Self-manage fields: Name, Title, Phone, Photo, Social Links'
        ]
      },
      {
        title: '4. Notifications',
        description: 'Configure email notifications for deployments, team changes, and billing events.',
        tips: [
          'Get notified when deployments complete or fail',
          'Weekly summary emails available'
        ]
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
              <CardTitle className="text-lg">{section.title}</CardTitle>
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
                <h4 className="font-semibold text-base mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  {step.title}
                </h4>
                <p className="text-muted-foreground mb-3">{step.description}</p>
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
          <Badge variant="outline" className="text-orange-600 border-orange-300 bg-orange-50">
            Internal Testing Guide
          </Badge>
        </div>
        <h1 className="text-3xl font-bold mb-2">Siggly User Guide</h1>
        <p className="text-muted-foreground text-lg">
          A friendly walkthrough of all Siggly features. Click on any section to expand and see detailed steps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-1">
              <Globe className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-900">Integrations</span>
            </div>
            <p className="text-sm text-blue-700">Google, Microsoft, HubSpot, Calendly</p>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-1">
              <Users className="h-4 w-4 text-green-600" />
              <span className="font-medium text-green-900">Team Sync</span>
            </div>
            <p className="text-sm text-green-700">Auto-import from directory</p>
          </CardContent>
        </Card>
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-1">
              <Rocket className="h-4 w-4 text-purple-600" />
              <span className="font-medium text-purple-900">One-Click Deploy</span>
            </div>
            <p className="text-sm text-purple-700">Push to all users instantly</p>
          </CardContent>
        </Card>
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-1">
              <Building2 className="h-4 w-4 text-orange-600" />
              <span className="font-medium text-orange-900">Multi-Tenant</span>
            </div>
            <p className="text-sm text-orange-700">MSP client management</p>
          </CardContent>
        </Card>
      </div>

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
                <Badge variant="secondary">Help Center: /help</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
