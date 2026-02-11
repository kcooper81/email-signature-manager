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
  steps: {
    title: string;
    description: string;
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
        description: 'Go to the signup page and create an account with your work email. You\'ll automatically become the organization owner.',
        link: '/signup',
        tips: [
          'Use your work email (e.g., you@company.com)',
          'You\'ll get a free plan with 5 users and 1 template'
        ]
      },
      {
        title: 'Step 2: Verify Your Email',
        description: 'Check your inbox for a verification email and click the link to confirm your account.',
        tips: [
          'Check spam/junk folder if you don\'t see it',
          'The link expires after 24 hours'
        ]
      },
      {
        title: 'Step 3: Log In',
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
        description: 'From the dashboard sidebar, click "Integrations" to see available connections.',
        link: '/integrations',
      },
      {
        title: 'Step 2: Click "Connect" on Google Workspace',
        description: 'Find the Google Workspace card and click the "Connect" button. You\'ll be redirected to Google\'s OAuth screen.',
        tips: [
          'You must be a Google Workspace admin to connect',
          'The app will request permission to manage Gmail signatures and read your directory'
        ],
        warning: 'Personal Gmail accounts won\'t work - you need Google Workspace (business)'
      },
      {
        title: 'Step 3: Authorize the App',
        description: 'On Google\'s screen, review the permissions and click "Allow" to grant access.',
        tips: [
          'You\'ll see permissions for Gmail API and Admin Directory API',
          'These are required to deploy signatures and sync users'
        ]
      },
      {
        title: 'Step 4: Verify Connection',
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
        description: 'From the sidebar, click "Team" to see your team members list.',
        link: '/team',
      },
      {
        title: 'Step 2: Click "Sync Users"',
        description: 'Click the "Sync Users" button (cloud icon) in the top right. This imports all users from your Google Workspace directory.',
        tips: [
          'Users are imported with name, email, title, and department',
          'Sync can take a few seconds for large organizations'
        ]
      },
      {
        title: 'Step 3: Review Imported Users',
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
        description: 'From the sidebar, click "Templates" to see your signature templates.',
        link: '/templates',
      },
      {
        title: 'Step 2: Click "Create Template"',
        description: 'Click the "Create Template" button to start designing a new signature.',
        link: '/templates/new',
      },
      {
        title: 'Step 3: Name Your Template',
        description: 'Give your template a descriptive name like "Company Standard" or "Sales Team Signature".',
      },
      {
        title: 'Step 4: Add Blocks',
        description: 'Use the block palette on the left to add elements: Name, Title, Company, Phone, Email, Social Links, Logo, Banner, Divider, Disclaimer.',
        tips: [
          'Drag blocks to reorder them',
          'Click a block to edit its settings',
          'Use placeholders like {{first_name}}, {{title}}, {{email}} for dynamic content'
        ]
      },
      {
        title: 'Step 5: Add Your Logo',
        description: 'Add a Logo block and either upload an image or paste a URL to your company logo.',
        tips: [
          'Recommended size: 200-300px wide',
          'Use PNG or JPG format',
          'The logo will be embedded in the signature'
        ]
      },
      {
        title: 'Step 6: Add Social Links',
        description: 'Add a Social Links block. Links are pulled from each user\'s profile (LinkedIn, Twitter, etc.).',
        tips: [
          'Social icons are automatically detected from URLs',
          'Users can set their own links in their profile or /my-profile'
        ]
      },
      {
        title: 'Step 7: Preview and Save',
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
        description: 'From the sidebar, click "Deployments" to manage signature deployments.',
        link: '/deployments',
      },
      {
        title: 'Step 2: Click "Deploy Signatures"',
        description: 'Click the "Deploy Signatures" button to start the deployment wizard.',
      },
      {
        title: 'Step 3: Select a Template',
        description: 'Choose which signature template to deploy from the dropdown.',
      },
      {
        title: 'Step 4: Choose Target Users',
        description: 'Select who should receive the signature: "Just Me" (test), "Selected Users", or "All Users".',
        tips: [
          'Start with "Just Me" to test before deploying to everyone',
          'You can filter by department when selecting users'
        ],
        warning: 'Deploying to "All Users" will overwrite everyone\'s Gmail signature'
      },
      {
        title: 'Step 5: Deploy',
        description: 'Click "Deploy" to push signatures. The system will show progress and results.',
        tips: [
          'Deployment typically takes a few seconds',
          'Check Gmail to verify the signature was applied'
        ]
      },
      {
        title: 'Step 6: View Results',
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
        title: 'Admin: Edit User from Team Page',
        description: 'Admins can edit any user by going to Team → clicking on a user → Edit. This opens a modal where you can update their title, department, phone, and personal links.',
        link: '/team',
        tips: [
          'Personal links include: LinkedIn, Twitter, Calendly, GitHub, Instagram, Facebook, YouTube, Personal Website',
          'These links appear in signatures if the template has a Social Links block'
        ]
      },
      {
        title: 'Admin: Enable Self-Manage for Users',
        description: 'To let users manage their own profile, edit the user and enable "Self-Manage Portal". This gives them access to /my-profile.',
        link: '/team',
      },
      {
        title: 'User: Access Self-Manage Portal',
        description: 'Users with self-manage enabled can log in and access /my-profile to update their own information.',
        link: '/my-profile',
        tips: [
          'Users can update: Name, Title, Phone, Personal Links',
          'Changes require a re-deployment to update their signature'
        ]
      },
      {
        title: 'Setting Calendly URL',
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
        title: 'Admin: Enable Calendar Integration',
        description: 'Go to Settings → scroll to "Employee Features" → enable "Allow Calendar Integration" and "Allow OOO Banners".',
        link: '/settings',
      },
      {
        title: 'User: Enable in Self-Manage Portal',
        description: 'Users go to /my-profile → find "Calendar Integration" section → toggle "Enable Google Calendar" and "Show OOO Banner".',
        link: '/my-profile',
        tips: [
          'User must have Google Calendar access',
          'OOO events are detected automatically from their calendar'
        ]
      },
      {
        title: 'How It Works',
        description: 'When a user has an OOO event in Google Calendar, their signature automatically shows an OOO banner with dates.',
        tips: [
          'Users can customize their OOO message',
          'Banner appears/disappears automatically based on calendar events'
        ]
      }
    ]
  },
  {
    id: 'billing',
    title: '8. Billing & Upgrades',
    icon: <CreditCard className="h-5 w-5" />,
    description: 'Manage your subscription',
    link: '/settings',
    steps: [
      {
        title: 'View Current Plan',
        description: 'Go to Settings → scroll to the Billing section to see your current plan and usage.',
        link: '/settings',
      },
      {
        title: 'Upgrade Plan',
        description: 'Click "Upgrade" to see available plans. You\'ll be redirected to Stripe Checkout.',
        tips: [
          'Free: 5 users, 1 template, Google only',
          'Starter ($0.50/user): Unlimited users, 5 templates, Google + Microsoft',
          'Professional ($29 + $1/user): Unlimited templates, all integrations',
          'Enterprise: Custom pricing, SSO, API, white-label'
        ]
      },
      {
        title: 'Manage Billing',
        description: 'Click "Manage Billing" to access Stripe Customer Portal for payment methods, invoices, and cancellation.',
      }
    ]
  },
  {
    id: 'msp-multi-tenant',
    title: '9. MSP Multi-Tenant (Partners)',
    icon: <Building2 className="h-5 w-5" />,
    description: 'Manage multiple client organizations',
    steps: [
      {
        title: 'Step 1: Apply for Partner Status',
        description: 'Go to the Partner Application page and submit your application to become an MSP partner.',
        link: '/partners/apply',
        tips: [
          'Partners get volume discounts',
          'Manage all clients from one dashboard'
        ]
      },
      {
        title: 'Step 2: Wait for Approval',
        description: 'Our team will review your application. You\'ll receive an email when approved.',
      },
      {
        title: 'Step 3: Add Client Organizations',
        description: 'Once approved, go to Clients page and click "Add Client". Enter client company name and admin email.',
        link: '/clients',
        tips: [
          'Each client is a separate organization',
          'Client admin receives an invite email'
        ]
      },
      {
        title: 'Step 4: Switch Between Clients',
        description: 'Use the organization switcher in the dashboard header to switch between your MSP org and client orgs.',
        tips: [
          'A banner shows which client you\'re currently viewing',
          'All actions apply to the selected organization'
        ]
      },
      {
        title: 'Step 5: Manage Client Templates & Deployments',
        description: 'While viewing a client org, you can create templates and deploy signatures just like your own org.',
      }
    ]
  },
  {
    id: 'testing-checklist',
    title: '10. Testing Checklist',
    icon: <CheckCircle2 className="h-5 w-5" />,
    description: 'Quick checklist to verify everything works',
    steps: [
      {
        title: '✓ Account & Auth',
        description: 'Sign up → Verify email → Log in → Log out → Log back in',
        link: '/signup',
      },
      {
        title: '✓ Google Integration',
        description: 'Connect Google Workspace → Verify "Connected" status → Sync users',
        link: '/integrations',
      },
      {
        title: '✓ Team Management',
        description: 'View synced users → Edit a user → Add personal links → Enable self-manage',
        link: '/team',
      },
      {
        title: '✓ Templates',
        description: 'Create template → Add blocks (Name, Title, Logo, Social) → Preview → Save',
        link: '/templates',
      },
      {
        title: '✓ Deployment',
        description: 'Deploy to "Just Me" → Check Gmail for signature → Deploy to selected users',
        link: '/deployments',
      },
      {
        title: '✓ Self-Manage Portal',
        description: 'Log in as a self-manage user → Access /my-profile → Update personal links',
        link: '/my-profile',
      },
      {
        title: '✓ Billing',
        description: 'View current plan → Test upgrade flow (use test card 4242424242424242)',
        link: '/settings',
      },
      {
        title: '✓ MSP (if applicable)',
        description: 'Apply for partner → Add client org → Switch to client → Create template → Deploy',
        link: '/partners/apply',
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
                <h4 className="font-semibold text-base mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
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
          <Badge variant="outline" className="text-orange-600 border-orange-300 bg-orange-50">
            Internal Testing Guide
          </Badge>
        </div>
        <h1 className="text-3xl font-bold mb-2">Siggly Testing Guide</h1>
        <p className="text-muted-foreground text-lg">
          Step-by-step instructions to test all Siggly features. Click any section to expand.
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
            <Link href="/my-profile" target="_blank" className="inline-flex items-center gap-1 text-sm bg-white px-3 py-1 rounded-full border hover:bg-blue-100">
              My Profile <ExternalLink className="h-3 w-3" />
            </Link>
            <Link href="/settings" target="_blank" className="inline-flex items-center gap-1 text-sm bg-white px-3 py-1 rounded-full border hover:bg-blue-100">
              Settings <ExternalLink className="h-3 w-3" />
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
