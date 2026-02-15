import type { SEOLandingPageData } from '../types';

export const integrationsPages: SEOLandingPageData[] = [
  // ─── Salesforce ──────────────────────────────────────────────────────
  {
    slug: 'salesforce',
    category: 'integrations',
    meta: {
      title: 'Siggly + Salesforce Integration | Email Signatures',
      description:
        'Sync Salesforce CRM contacts with Siggly email signatures. Auto-update signatures from lead and contact data for consistent branding.',
      keywords: [
        'salesforce email signatures',
        'salesforce integration',
        'CRM email signatures',
        'salesforce signature sync',
      ],
      canonical: '/integrations/salesforce',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Integrations', url: '/integrations' },
      { name: 'Salesforce', url: '/integrations/salesforce' },
    ],
    hero: {
      badge: { icon: 'plug', text: 'Salesforce Integration' },
      title: 'Connect Siggly with Salesforce for Smarter Email Signatures',
      description:
        'Pull contact details, job titles, and phone numbers directly from Salesforce to keep every email signature accurate and on-brand across your entire sales organization.',
      variant: 'violet',
    },
    stats: [
      { value: '95%', label: 'Reduction in manual signature updates' },
      { value: '3 min', label: 'Average setup time per user' },
      { value: '100%', label: 'Data accuracy from CRM sync' },
    ],
    featuresTitle: 'What You Get with Siggly + Salesforce',
    features: [
      {
        icon: 'refresh-cw',
        title: 'Real-Time CRM Sync',
        description:
          'Signature fields update automatically whenever a contact record changes in Salesforce, eliminating stale information.',
      },
      {
        icon: 'users',
        title: 'Organization-Wide Rollout',
        description:
          'Deploy branded signatures to every Salesforce user in your org with a single click, no per-seat configuration needed.',
      },
      {
        icon: 'target',
        title: 'Campaign-Aware Banners',
        description:
          'Attach promotional banners to signatures that align with active Salesforce campaigns and pipeline stages.',
      },
      {
        icon: 'bar-chart-3',
        title: 'Engagement Analytics',
        description:
          'Track banner clicks and link interactions right inside Salesforce reports to measure signature-driven pipeline.',
      },
      {
        icon: 'shield',
        title: 'Role-Based Permissions',
        description:
          'Mirror Salesforce roles and profiles to control who can edit, approve, or override signature templates.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'How to Connect Salesforce to Siggly',
        steps: [
          {
            step: '1',
            title: 'Authenticate Your Salesforce Org',
            description:
              'Log in with your Salesforce admin credentials and authorize the Siggly connected app in Setup.',
          },
          {
            step: '2',
            title: 'Map CRM Fields to Signature Fields',
            description:
              'Select which Salesforce fields (name, title, phone, photo URL) map to each signature placeholder.',
          },
          {
            step: '3',
            title: 'Choose a Signature Template',
            description:
              'Pick from dozens of professional templates or import your own HTML design to match your brand guidelines.',
          },
          {
            step: '4',
            title: 'Deploy to Users',
            description:
              'Push signatures to selected users or entire profiles. Changes propagate within minutes across all email clients.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'After connecting Siggly to Salesforce, our reps stopped wasting time fixing signatures manually. Every email they send now has accurate titles and direct dial numbers pulled straight from the CRM.',
      authorName: 'Rachel Simmons',
      authorTitle: 'VP of Sales Operations, Clearpath Solutions',
    },
    faqs: [
      {
        question: 'Does the Salesforce integration support Salesforce Lightning and Classic?',
        answer:
          'Yes. Siggly works with both Salesforce Lightning Experience and Salesforce Classic. The connected app is installed through Setup and operates identically in both interfaces.',
      },
      {
        question: 'How often does Siggly sync data from Salesforce?',
        answer:
          'By default, syncs occur every 15 minutes. You can also trigger an immediate sync from the Siggly dashboard or configure webhook-based real-time updates on supported Salesforce editions.',
      },
      {
        question: 'Can I use custom Salesforce fields in my signatures?',
        answer:
          'Absolutely. During field mapping you can select any standard or custom field on the User, Contact, or Lead objects to populate signature placeholders.',
      },
      {
        question: 'Is the integration secure?',
        answer:
          'Siggly uses OAuth 2.0 for authentication and never stores Salesforce passwords. All data is encrypted in transit via TLS 1.2+ and at rest with AES-256 encryption.',
      },
      {
        question: 'What Salesforce editions are supported?',
        answer:
          'The integration is available on Professional, Enterprise, Unlimited, and Developer editions. Essentials edition is not supported due to API limitations.',
      },
    ],
    cta: {
      title: 'Connect Salesforce to Siggly Today',
      description:
        'Start syncing CRM data to your email signatures in minutes. No credit card required for the free trial.',
    },
  },

  // ─── Slack ───────────────────────────────────────────────────────────
  {
    slug: 'slack',
    category: 'integrations',
    meta: {
      title: 'Siggly + Slack Integration | Email Signatures',
      description:
        'Get Slack notifications when signatures are updated or approved. Streamline signature management with Siggly and Slack.',
      keywords: [
        'slack email signatures',
        'slack integration',
        'signature notifications',
        'slack approval workflow',
      ],
      canonical: '/integrations/slack',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Integrations', url: '/integrations' },
      { name: 'Slack', url: '/integrations/slack' },
    ],
    hero: {
      badge: { icon: 'message-square', text: 'Slack Integration' },
      title: 'Manage Email Signatures Without Leaving Slack',
      description:
        'Receive instant Slack notifications for signature approvals, updates, and deployment status. Keep your team in the loop without switching between apps.',
      variant: 'dark',
    },
    stats: [
      { value: '60%', label: 'Faster approval turnaround' },
      { value: '0', label: 'Emails needed for signature approvals' },
      { value: '24/7', label: 'Real-time status updates' },
    ],
    featuresTitle: 'What You Get with Siggly + Slack',
    features: [
      {
        icon: 'inbox',
        title: 'Approval Notifications',
        description:
          'Admins and managers receive Slack messages the moment a new signature is submitted for review, speeding up the approval cycle.',
      },
      {
        icon: 'check-circle',
        title: 'One-Click Approve or Reject',
        description:
          'Use interactive Slack buttons to approve or reject signature changes directly from the notification without opening the dashboard.',
      },
      {
        icon: 'users',
        title: 'Channel-Based Updates',
        description:
          'Post deployment summaries to a dedicated Slack channel so the entire team knows when new signatures go live.',
      },
      {
        icon: 'zap',
        title: 'Instant Deployment Alerts',
        description:
          'Get notified the moment signatures are pushed to users, with a summary of how many mailboxes were updated.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'How to Connect Slack to Siggly',
        steps: [
          {
            step: '1',
            title: 'Install the Siggly Slack App',
            description:
              'Click "Add to Slack" from the Siggly integrations page and authorize the app in your Slack workspace.',
          },
          {
            step: '2',
            title: 'Choose Notification Channels',
            description:
              'Select which Slack channels or DMs should receive approval requests, deployment alerts, and status updates.',
          },
          {
            step: '3',
            title: 'Configure Notification Preferences',
            description:
              'Decide which events trigger notifications: new submissions, approvals, rejections, deployments, or errors.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Our marketing team lives in Slack. Being able to approve signature changes right from a Slack notification cut our turnaround from days to minutes.',
      authorName: 'David Kim',
      authorTitle: 'Marketing Director, NovaBridge Inc.',
    },
    faqs: [
      {
        question: 'Can I restrict which Slack users receive approval requests?',
        answer:
          'Yes. You can map Siggly admin roles to specific Slack users or groups, ensuring only authorized people receive and act on approval notifications.',
      },
      {
        question: 'Does the Slack integration work with Slack Connect channels?',
        answer:
          'Currently, notifications are limited to internal workspace channels. Slack Connect (shared external channels) is not supported.',
      },
      {
        question: 'Will I receive a notification for every individual signature change?',
        answer:
          'You can configure batch notifications that summarize multiple changes, or opt for individual alerts. The choice is yours in the Siggly notification settings.',
      },
      {
        question: 'Is the Slack app free?',
        answer:
          'The Slack integration is included at no extra cost on all Siggly Team and Enterprise plans. Free-tier accounts can enable read-only deployment notifications.',
      },
    ],
    cta: {
      title: 'Add Siggly to Your Slack Workspace',
      description:
        'Streamline signature approvals and keep your team informed with real-time Slack notifications.',
    },
  },

  // ─── Okta ────────────────────────────────────────────────────────────
  {
    slug: 'okta',
    category: 'integrations',
    meta: {
      title: 'Siggly + Okta Integration | Email Signatures',
      description:
        'Use Okta SSO and directory sync to manage email signatures. Automate provisioning with Siggly and Okta integration.',
      keywords: [
        'okta email signatures',
        'okta SSO integration',
        'okta directory sync',
        'single sign-on signatures',
        'SAML email signatures',
      ],
      canonical: '/integrations/okta',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Integrations', url: '/integrations' },
      { name: 'Okta', url: '/integrations/okta' },
    ],
    hero: {
      badge: { icon: 'shield-check', text: 'Okta Integration' },
      title: 'Secure Signature Management with Okta SSO',
      description:
        'Leverage your existing Okta directory to provision email signatures automatically. Single sign-on, SCIM provisioning, and directory sync keep signatures aligned with your identity platform.',
      variant: 'emerald',
    },
    stats: [
      { value: 'SSO', label: 'One-click sign-in via SAML 2.0' },
      { value: '0', label: 'Passwords to manage for Siggly' },
      { value: 'SCIM', label: 'Automated user provisioning' },
    ],
    featuresTitle: 'What You Get with Siggly + Okta',
    features: [
      {
        icon: 'key',
        title: 'SAML 2.0 Single Sign-On',
        description:
          'Let users log into Siggly through Okta with a single click. No separate credentials needed.',
      },
      {
        icon: 'user-check',
        title: 'SCIM Provisioning',
        description:
          'Automatically create, update, and deactivate Siggly accounts when users are added or removed in Okta.',
      },
      {
        icon: 'users',
        title: 'Group-Based Templates',
        description:
          'Assign signature templates based on Okta groups so each department automatically receives the correct design.',
      },
      {
        icon: 'lock',
        title: 'Enforce MFA Policies',
        description:
          'Siggly inherits your Okta MFA policies, ensuring that sensitive signature admin actions are protected by multi-factor authentication.',
      },
      {
        icon: 'refresh-cw',
        title: 'Directory Attribute Sync',
        description:
          'Profile attributes like department, title, and phone number flow from Okta into signature fields in real time.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'How to Connect Okta to Siggly',
        steps: [
          {
            step: '1',
            title: 'Add Siggly in Okta',
            description:
              'Search for Siggly in the Okta Integration Network (OIN) catalog and add it to your Okta org.',
          },
          {
            step: '2',
            title: 'Configure SAML SSO',
            description:
              'Copy the SSO URL and certificate from Okta into the Siggly admin panel to establish the SAML trust.',
          },
          {
            step: '3',
            title: 'Enable SCIM Provisioning',
            description:
              'Turn on SCIM in the Okta app settings and provide the Siggly SCIM endpoint URL and bearer token.',
          },
          {
            step: '4',
            title: 'Assign Users and Groups',
            description:
              'Assign individuals or Okta groups to the Siggly app. Provisioned users receive their signatures automatically.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Okta is the backbone of our identity infrastructure. With the Siggly integration, new hires get a branded signature the same day they are provisioned in Okta. Zero manual work.',
      authorName: 'Priya Naidu',
      authorTitle: 'IT Security Manager, Helix Financial',
    },
    faqs: [
      {
        question: 'Is Siggly listed in the Okta Integration Network?',
        answer:
          'Yes. You can find Siggly in the OIN catalog, which means it has been reviewed by Okta and supports standard SAML 2.0 and SCIM 2.0 protocols.',
      },
      {
        question: 'Can I enforce conditional access through Okta?',
        answer:
          'Yes. Any sign-on policies, IP restrictions, or device trust rules you configure in Okta will apply when users access Siggly.',
      },
      {
        question: 'What happens when a user is deactivated in Okta?',
        answer:
          'The SCIM integration automatically deactivates the corresponding Siggly account, revoking dashboard access and freezing their signature at the last known state.',
      },
      {
        question: 'Does the integration support Okta Workflows?',
        answer:
          'Yes. You can use Okta Workflows to trigger Siggly actions like signature resets, template swaps, or bulk updates based on custom logic.',
      },
    ],
    cta: {
      title: 'Integrate Okta with Siggly in Minutes',
      description:
        'Use your existing Okta directory to automate email signature provisioning and enforce identity policies.',
    },
  },

  // ─── Azure AD ────────────────────────────────────────────────────────
  {
    slug: 'azure-ad',
    category: 'integrations',
    meta: {
      title: 'Siggly + Azure AD Integration | Email Signatures',
      description:
        'Sync Azure Active Directory users with Siggly email signatures. Automate signature deployment with Azure AD groups.',
      keywords: [
        'azure ad email signatures',
        'azure active directory integration',
        'microsoft entra signatures',
        'azure ad sync',
        'enterprise email signatures',
      ],
      canonical: '/integrations/azure-ad',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Integrations', url: '/integrations' },
      { name: 'Azure AD', url: '/integrations/azure-ad' },
    ],
    hero: {
      badge: { icon: 'cloud', text: 'Azure AD Integration' },
      title: 'Automate Email Signatures with Azure Active Directory',
      description:
        'Leverage Azure AD user profiles, groups, and security policies to deploy consistent email signatures across your Microsoft 365 environment without lifting a finger.',
      variant: 'indigo',
    },
    stats: [
      { value: '50K+', label: 'Users manageable from a single tenant' },
      { value: '< 5 min', label: 'Time to connect Azure AD' },
      { value: '99.9%', label: 'Sync reliability SLA' },
    ],
    featuresTitle: 'What You Get with Siggly + Azure AD',
    features: [
      {
        icon: 'cloud',
        title: 'Azure AD Directory Sync',
        description:
          'Pull user attributes such as display name, job title, department, and phone number directly from Azure AD profiles.',
      },
      {
        icon: 'users',
        title: 'Group-Based Deployment',
        description:
          'Assign signature templates to Azure AD security groups or dynamic groups for automatic, rule-based rollouts.',
      },
      {
        icon: 'lock',
        title: 'Conditional Access Support',
        description:
          'Siggly respects Azure AD Conditional Access policies, ensuring only compliant devices and locations can manage signatures.',
      },
      {
        icon: 'server',
        title: 'Multi-Tenant Architecture',
        description:
          'Manage signatures across multiple Azure AD tenants from a single Siggly dashboard, ideal for MSPs and holding companies.',
      },
      {
        icon: 'shield-check',
        title: 'Microsoft 365 Compliance',
        description:
          'Integration follows Microsoft security best practices and supports Azure AD audit logs for full traceability.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'How to Connect Azure AD to Siggly',
        steps: [
          {
            step: '1',
            title: 'Register the Siggly App in Azure',
            description:
              'Use the one-click consent flow or manually register Siggly as an enterprise application in your Azure portal.',
          },
          {
            step: '2',
            title: 'Grant API Permissions',
            description:
              'Approve the required Microsoft Graph API permissions so Siggly can read user profiles and group memberships.',
          },
          {
            step: '3',
            title: 'Map Directory Attributes',
            description:
              'Map Azure AD attributes to Siggly signature fields. Custom extension attributes are fully supported.',
          },
          {
            step: '4',
            title: 'Assign Groups and Deploy',
            description:
              'Select which Azure AD groups should receive signatures, choose templates, and deploy to thousands of users instantly.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'We manage over 8,000 users across three Azure AD tenants. Siggly is the only tool that let us centralize signature management and push updates to everyone in under an hour.',
      authorName: 'Marcus Hensley',
      authorTitle: 'Director of IT, Apex Global Logistics',
    },
    faqs: [
      {
        question: 'Does Siggly work with Microsoft Entra ID (the new name for Azure AD)?',
        answer:
          'Yes. Siggly fully supports Microsoft Entra ID. The integration uses the same Microsoft Graph APIs regardless of branding changes.',
      },
      {
        question: 'Can I sync custom Azure AD extension attributes?',
        answer:
          'Yes. Any extension attributes defined on user objects in Azure AD can be mapped to signature placeholders during the field mapping step.',
      },
      {
        question: 'How does the integration handle hybrid environments?',
        answer:
          'Siggly reads from Azure AD, so any attributes synced from on-premises Active Directory via Azure AD Connect are automatically available.',
      },
      {
        question: 'Is Global Admin required to set up the integration?',
        answer:
          'No. An Application Administrator or Cloud Application Administrator role is sufficient to consent to the required API permissions.',
      },
      {
        question: 'What data does Siggly access from Azure AD?',
        answer:
          'Siggly requests read-only access to user profiles (name, title, department, phone, photo) and group memberships. It never accesses email content or calendar data.',
      },
    ],
    cta: {
      title: 'Connect Azure AD to Siggly',
      description:
        'Automate signature deployment for your entire Microsoft 365 organization with Azure AD directory sync.',
    },
  },

  // ─── Google Workspace ────────────────────────────────────────────────
  {
    slug: 'google-workspace',
    category: 'integrations',
    meta: {
      title: 'Siggly + Google Workspace Integration | Email Signatures',
      description:
        'Deploy Gmail signatures across your Google Workspace domain. Sync user data and manage signatures centrally with Siggly.',
      keywords: [
        'google workspace email signatures',
        'gmail signature management',
        'google workspace integration',
        'gmail signatures',
        'google directory sync',
      ],
      canonical: '/integrations/google-workspace',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Integrations', url: '/integrations' },
      { name: 'Google Workspace', url: '/integrations/google-workspace' },
    ],
    hero: {
      badge: { icon: 'mail', text: 'Google Workspace Integration' },
      title: 'Professional Gmail Signatures for Your Entire Organization',
      description:
        'Siggly connects to the Google Workspace Admin SDK and Gmail API to deploy pixel-perfect signatures directly into every user Gmail account across your domain.',
      variant: 'slate',
    },
    stats: [
      { value: '1-click', label: 'Domain-wide signature deployment' },
      { value: '100%', label: 'Gmail compatibility guaranteed' },
      { value: '< 2 min', label: 'Signatures live after sync' },
    ],
    featuresTitle: 'What You Get with Siggly + Google Workspace',
    features: [
      {
        icon: 'send',
        title: 'Direct Gmail Injection',
        description:
          'Signatures are written directly into Gmail settings via the API, so users see them immediately without any manual copy-paste steps.',
      },
      {
        icon: 'users',
        title: 'Org Unit Mapping',
        description:
          'Map Google Workspace organizational units to signature templates so each department gets the right design automatically.',
      },
      {
        icon: 'globe',
        title: 'Google Directory Sync',
        description:
          'Pull user names, titles, phone numbers, and profile photos from the Google Workspace directory for always-accurate signatures.',
      },
      {
        icon: 'layers',
        title: 'Multi-Domain Support',
        description:
          'Manage signatures across primary and secondary domains within a single Google Workspace account.',
      },
      {
        icon: 'shield',
        title: 'Admin Console Integration',
        description:
          'Siggly appears as a third-party app in the Google Admin Console with full audit logging and access controls.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'How to Connect Google Workspace to Siggly',
        steps: [
          {
            step: '1',
            title: 'Authorize Domain-Wide Access',
            description:
              'A Google Workspace super admin authorizes Siggly with domain-wide delegation to manage Gmail signatures on behalf of users.',
          },
          {
            step: '2',
            title: 'Import Your User Directory',
            description:
              'Siggly pulls your full user list and organizational structure from Google Workspace automatically.',
          },
          {
            step: '3',
            title: 'Design and Assign Templates',
            description:
              'Create signature templates in the visual editor and assign them to organizational units, groups, or individual users.',
          },
          {
            step: '4',
            title: 'Deploy to Gmail',
            description:
              'Push signatures to all Gmail accounts with one click. Users see the new signature on their next compose window.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'We switched 400 Gmail users to Siggly-managed signatures in a single afternoon. The Google Workspace integration is seamless and our branding team finally has full control.',
      authorName: 'Emily Torres',
      authorTitle: 'Brand Manager, Greenleaf Education',
    },
    faqs: [
      {
        question: 'Do users need to do anything to receive their new Gmail signature?',
        answer:
          'No. Siggly writes signatures directly to Gmail via the API. Users see the updated signature automatically the next time they compose an email.',
      },
      {
        question: 'Does it work with Google Workspace free (legacy) accounts?',
        answer:
          'The integration requires Google Workspace Business Starter or higher because domain-wide delegation is not available on legacy free accounts.',
      },
      {
        question: 'Can users override the signature Siggly sets?',
        answer:
          'Admins can choose to lock signatures so users cannot modify them, or allow users to make personal adjustments within defined guidelines.',
      },
      {
        question: 'Are Google Workspace alias addresses supported?',
        answer:
          'Yes. Siggly can deploy signatures to primary addresses and any configured send-as aliases within Gmail.',
      },
    ],
    cta: {
      title: 'Deploy Signatures Across Google Workspace',
      description:
        'Connect your Google Workspace domain and push professional signatures to every Gmail account in minutes.',
    },
  },

  // ─── Active Directory ────────────────────────────────────────────────
  {
    slug: 'active-directory',
    category: 'integrations',
    meta: {
      title: 'Siggly + Active Directory Integration | Email Signatures',
      description:
        'Sync on-premises Active Directory user data with Siggly for centralized email signature management across Exchange.',
      keywords: [
        'active directory email signatures',
        'AD integration',
        'on-premises directory sync',
        'exchange signatures',
        'LDAP email signatures',
      ],
      canonical: '/integrations/active-directory',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Integrations', url: '/integrations' },
      { name: 'Active Directory', url: '/integrations/active-directory' },
    ],
    hero: {
      badge: { icon: 'server', text: 'Active Directory Integration' },
      title: 'Sync On-Premises Active Directory with Siggly',
      description:
        'Bridge the gap between your on-premises AD environment and cloud-based signature management. Siggly reads LDAP attributes to generate and deploy signatures for Outlook and Exchange users.',
      variant: 'violet',
    },
    stats: [
      { value: 'LDAP', label: 'Secure directory protocol support' },
      { value: '15 min', label: 'Default sync interval' },
      { value: '256-bit', label: 'AES encryption for cached data' },
    ],
    featuresTitle: 'What You Get with Siggly + Active Directory',
    features: [
      {
        icon: 'database',
        title: 'LDAP Attribute Mapping',
        description:
          'Map any AD attribute including custom fields to Siggly signature placeholders for fully dynamic signatures.',
      },
      {
        icon: 'network',
        title: 'OU-Based Deployment',
        description:
          'Assign signature templates based on Active Directory Organizational Units so each branch or department is handled automatically.',
      },
      {
        icon: 'refresh-cw',
        title: 'Scheduled Sync Agent',
        description:
          'A lightweight sync agent runs on your network, pulling AD changes on a configurable schedule without opening inbound firewall ports.',
      },
      {
        icon: 'lock',
        title: 'On-Premises Data Control',
        description:
          'User data never leaves your network until it is mapped to signature fields. The sync agent transmits only the attributes you authorize.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'How to Connect Active Directory to Siggly',
        steps: [
          {
            step: '1',
            title: 'Install the Sync Agent',
            description:
              'Download and install the lightweight Siggly sync agent on a server joined to your Active Directory domain.',
          },
          {
            step: '2',
            title: 'Configure LDAP Connection',
            description:
              'Provide the domain controller address, bind credentials, and base DN. The agent supports LDAPS for encrypted connections.',
          },
          {
            step: '3',
            title: 'Map AD Attributes',
            description:
              'Choose which AD attributes populate each signature field. Common mappings include displayName, title, telephoneNumber, and thumbnailPhoto.',
          },
          {
            step: '4',
            title: 'Deploy Signatures to Exchange',
            description:
              'Siggly pushes signatures to Exchange Online or on-premises Exchange via transport rules or direct mailbox injection.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'We still run on-prem AD with Exchange hybrid. Siggly is the only modern signature tool that met us where we are instead of forcing a full cloud migration first.',
      authorName: 'Thomas Bauer',
      authorTitle: 'Systems Administrator, Heidrich Manufacturing',
    },
    faqs: [
      {
        question: 'Does the sync agent require internet access?',
        answer:
          'The agent needs outbound HTTPS access to the Siggly cloud service. No inbound ports need to be opened on your firewall.',
      },
      {
        question: 'Can I filter which AD users are synced?',
        answer:
          'Yes. You can configure LDAP filters to include or exclude users based on OU, group membership, or any attribute condition.',
      },
      {
        question: 'Is the sync agent compatible with Windows Server versions?',
        answer:
          'The agent supports Windows Server 2016 and later. It runs as a Windows service and requires .NET Framework 4.7.2 or higher.',
      },
      {
        question: 'What if I also use Azure AD Connect?',
        answer:
          'If your AD syncs to Azure AD via AD Connect, you can use either the on-prem sync agent or the Azure AD integration. Using both is not required but both can coexist.',
      },
    ],
    cta: {
      title: 'Connect Active Directory to Siggly',
      description:
        'Deploy the sync agent and start generating email signatures from your on-premises directory data today.',
    },
  },

  // ─── Pipedrive ───────────────────────────────────────────────────────
  {
    slug: 'pipedrive',
    category: 'integrations',
    meta: {
      title: 'Siggly + Pipedrive Integration | Email Signatures',
      description:
        'Connect Pipedrive CRM to Siggly for automatic email signature updates. Keep sales team signatures synced with deal data.',
      keywords: [
        'pipedrive email signatures',
        'pipedrive integration',
        'CRM signature management',
        'pipedrive sync',
      ],
      canonical: '/integrations/pipedrive',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Integrations', url: '/integrations' },
      { name: 'Pipedrive', url: '/integrations/pipedrive' },
    ],
    hero: {
      badge: { icon: 'target', text: 'Pipedrive Integration' },
      title: 'Turn Every Email into a Sales Opportunity with Pipedrive + Siggly',
      description:
        'Automatically populate email signatures with up-to-date contact details from Pipedrive. Add promotional banners tied to active deals and track clicks for pipeline attribution.',
      variant: 'dark',
    },
    stats: [
      { value: '40%', label: 'More banner clicks from personalized signatures' },
      { value: '2x', label: 'Faster signature rollout vs. manual updates' },
      { value: '100%', label: 'Accuracy from Pipedrive field sync' },
    ],
    featuresTitle: 'What You Get with Siggly + Pipedrive',
    features: [
      {
        icon: 'refresh-cw',
        title: 'Automatic Field Sync',
        description:
          'User names, phone numbers, and titles are pulled from Pipedrive user profiles and updated in signatures automatically.',
      },
      {
        icon: 'bar-chart-3',
        title: 'Click Tracking for Deals',
        description:
          'Track signature banner clicks and attribute them to Pipedrive deals to measure the impact of every email touchpoint.',
      },
      {
        icon: 'zap',
        title: 'Deal-Stage Banners',
        description:
          'Dynamically swap signature banners based on deal stage, showing relevant CTAs to prospects at different pipeline phases.',
      },
      {
        icon: 'settings',
        title: 'Easy Configuration',
        description:
          'Connect Pipedrive with a single API key. Field mapping takes under five minutes with the guided setup wizard.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'How to Connect Pipedrive to Siggly',
        steps: [
          {
            step: '1',
            title: 'Generate a Pipedrive API Token',
            description:
              'Go to Pipedrive Settings, copy your personal or company API token, and paste it into the Siggly integrations page.',
          },
          {
            step: '2',
            title: 'Map Pipedrive Fields',
            description:
              'Select which Pipedrive user and organization fields should populate your email signature template placeholders.',
          },
          {
            step: '3',
            title: 'Design Signature Templates',
            description:
              'Use the Siggly editor to build signature templates that automatically fill in with live Pipedrive data.',
          },
          {
            step: '4',
            title: 'Deploy to Your Sales Team',
            description:
              'Assign signatures to Pipedrive users and push them to email clients. Updates sync whenever Pipedrive data changes.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Pipedrive is our single source of truth for sales data. Now our email signatures pull directly from it, and every rep has an accurate, professional signature without any manual effort.',
      authorName: 'Sarah Johansson',
      authorTitle: 'Head of Sales, Pinnacle SaaS',
    },
    faqs: [
      {
        question: 'Which Pipedrive plans are supported?',
        answer:
          'The integration works with all Pipedrive plans that include API access: Essential, Advanced, Professional, Power, and Enterprise.',
      },
      {
        question: 'Can I use custom Pipedrive fields in my signatures?',
        answer:
          'Yes. Any custom fields you have created in Pipedrive for user profiles or organizations can be mapped to Siggly signature placeholders.',
      },
      {
        question: 'How often does data sync from Pipedrive?',
        answer:
          'Siggly checks for changes every 15 minutes by default. You can also trigger a manual sync at any time from the dashboard.',
      },
      {
        question: 'Does the integration modify any data in Pipedrive?',
        answer:
          'No. Siggly only reads data from Pipedrive. It never creates, updates, or deletes any records in your CRM.',
      },
    ],
    cta: {
      title: 'Connect Pipedrive to Siggly',
      description:
        'Start syncing your Pipedrive CRM data into professional email signatures for your entire sales team.',
    },
  },

  // ─── Freshdesk ───────────────────────────────────────────────────────
  {
    slug: 'freshdesk',
    category: 'integrations',
    meta: {
      title: 'Siggly + Freshdesk Integration | Email Signatures',
      description:
        'Add professional email signatures to Freshdesk agent replies. Keep support branding consistent with Siggly integration.',
      keywords: [
        'freshdesk email signatures',
        'freshdesk integration',
        'support email signatures',
        'helpdesk signatures',
      ],
      canonical: '/integrations/freshdesk',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Integrations', url: '/integrations' },
      { name: 'Freshdesk', url: '/integrations/freshdesk' },
    ],
    hero: {
      badge: { icon: 'headphones', text: 'Freshdesk Integration' },
      title: 'Branded Signatures for Every Freshdesk Support Email',
      description:
        'Ensure every ticket reply from Freshdesk carries a professional, branded email signature. Siggly syncs agent profiles and applies consistent signatures across your entire support team.',
      variant: 'emerald',
    },
    stats: [
      { value: '100%', label: 'Consistent branding on support replies' },
      { value: '5 min', label: 'Setup time for entire team' },
      { value: '30%', label: 'Increase in customer trust scores' },
    ],
    featuresTitle: 'What You Get with Siggly + Freshdesk',
    features: [
      {
        icon: 'user-check',
        title: 'Agent Profile Sync',
        description:
          'Agent names, titles, and contact info are pulled from Freshdesk profiles so signatures are always accurate.',
      },
      {
        icon: 'layers',
        title: 'Group-Based Templates',
        description:
          'Assign different signature templates to Freshdesk agent groups, ensuring each support tier has the appropriate design.',
      },
      {
        icon: 'mail',
        title: 'Automatic Signature Injection',
        description:
          'Signatures are appended to outgoing ticket replies and notes automatically, no agent action required.',
      },
      {
        icon: 'bar-chart-3',
        title: 'Support Link Tracking',
        description:
          'Track clicks on knowledge base links, feedback forms, and social icons included in support email signatures.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'How to Connect Freshdesk to Siggly',
        steps: [
          {
            step: '1',
            title: 'Enter Your Freshdesk API Key',
            description:
              'Copy your Freshdesk API key from the agent profile settings and paste it into the Siggly integrations page.',
          },
          {
            step: '2',
            title: 'Import Agent Profiles',
            description:
              'Siggly imports your agent roster including names, roles, groups, and contact details from Freshdesk.',
          },
          {
            step: '3',
            title: 'Assign Signature Templates',
            description:
              'Choose or create templates for each agent group. Map Freshdesk fields to signature placeholders.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Our support emails used to look inconsistent. Since connecting Freshdesk to Siggly, every reply has a polished signature with the right agent details and our latest help center links.',
      authorName: 'Laura Chen',
      authorTitle: 'Customer Experience Lead, QuickResolve Support',
    },
    faqs: [
      {
        question: 'Does the integration work with Freshdesk Omnichannel?',
        answer:
          'The signature integration applies to email-based ticket replies. Chat, phone, and social channels in Omnichannel are not affected.',
      },
      {
        question: 'Can different agent groups have different signatures?',
        answer:
          'Yes. You can map Freshdesk groups to different Siggly templates so billing agents, technical support, and general inquiries each have distinct signatures.',
      },
      {
        question: 'Will signatures be added to internal notes?',
        answer:
          'By default, signatures are only added to customer-facing replies. You can optionally enable them for internal notes in the Siggly settings.',
      },
      {
        question: 'Does Siggly support Freshdesk Mint and Classic?',
        answer:
          'Yes. The integration uses the Freshdesk REST API, which is compatible with both the Mint and Classic agent interfaces.',
      },
    ],
    cta: {
      title: 'Add Professional Signatures to Freshdesk',
      description:
        'Connect Freshdesk and ensure every support email reflects your brand with consistent, accurate agent signatures.',
    },
  },

  // ─── Zendesk ─────────────────────────────────────────────────────────
  {
    slug: 'zendesk',
    category: 'integrations',
    meta: {
      title: 'Siggly + Zendesk Integration | Email Signatures',
      description:
        'Deploy branded email signatures for Zendesk agents. Sync agent data and maintain consistent support branding with Siggly.',
      keywords: [
        'zendesk email signatures',
        'zendesk integration',
        'support signatures',
        'zendesk agent branding',
        'helpdesk email management',
      ],
      canonical: '/integrations/zendesk',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Integrations', url: '/integrations' },
      { name: 'Zendesk', url: '/integrations/zendesk' },
    ],
    hero: {
      badge: { icon: 'headphones', text: 'Zendesk Integration' },
      title: 'Elevate Support Emails with Siggly + Zendesk',
      description:
        'Give every Zendesk ticket reply a polished, branded signature. Sync agent profiles, attach feedback links, and reinforce your brand in every customer interaction.',
      variant: 'indigo',
    },
    stats: [
      { value: '4.8/5', label: 'Average CSAT after signature upgrade' },
      { value: '100%', label: 'Agent coverage with zero manual setup' },
      { value: '15 sec', label: 'Time to deploy a signature update' },
    ],
    featuresTitle: 'What You Get with Siggly + Zendesk',
    features: [
      {
        icon: 'user-cog',
        title: 'Agent Data Sync',
        description:
          'Pull agent names, roles, photos, and phone numbers from Zendesk user profiles to populate signatures automatically.',
      },
      {
        icon: 'mail',
        title: 'Ticket Reply Integration',
        description:
          'Signatures are automatically appended to outbound ticket emails so agents never forget to include branding.',
      },
      {
        icon: 'link',
        title: 'Feedback and CSAT Links',
        description:
          'Embed satisfaction survey links and knowledge base shortcuts directly in agent signatures to drive self-service adoption.',
      },
      {
        icon: 'shield',
        title: 'Brand Compliance Enforcement',
        description:
          'Lock signatures so agents cannot modify them, ensuring every support email meets brand guidelines.',
      },
      {
        icon: 'bar-chart-3',
        title: 'Interaction Analytics',
        description:
          'Track how often customers click on signature links to measure the effectiveness of embedded CTAs.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'How to Connect Zendesk to Siggly',
        steps: [
          {
            step: '1',
            title: 'Authenticate with Zendesk',
            description:
              'Provide your Zendesk subdomain and authenticate using an admin API token or OAuth credentials.',
          },
          {
            step: '2',
            title: 'Import Agent Roster',
            description:
              'Siggly imports all active agents, their group assignments, and profile data from your Zendesk account.',
          },
          {
            step: '3',
            title: 'Build and Assign Templates',
            description:
              'Create branded templates in the Siggly editor and assign them to Zendesk groups or individual agents.',
          },
          {
            step: '4',
            title: 'Activate on Ticket Replies',
            description:
              'Enable automatic signature injection on outbound emails. Signatures appear on every ticket reply instantly.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'We went from mismatched support signatures to a unified, professional look overnight. The Zendesk integration was effortless and our CSAT scores actually improved.',
      authorName: 'James Whitfield',
      authorTitle: 'Support Operations Manager, Relay Systems',
    },
    faqs: [
      {
        question: 'Does the integration work with Zendesk Suite and Support standalone?',
        answer:
          'Yes. The integration is compatible with Zendesk Suite (all tiers) and Zendesk Support standalone plans that include API access.',
      },
      {
        question: 'Can I include dynamic content like ticket IDs in signatures?',
        answer:
          'Signatures are agent-specific, not ticket-specific. However, you can include static links to support portals, feedback forms, and social profiles.',
      },
      {
        question: 'How are signature updates pushed to Zendesk?',
        answer:
          'Siggly updates signatures via the Zendesk API. Changes are reflected on the next outbound email after the update is processed.',
      },
      {
        question: 'Can light agents have signatures too?',
        answer:
          'Light agents in Zendesk have limited functionality. Signatures can be assigned to them, but they will only appear if the agent is sending customer-facing emails.',
      },
    ],
    cta: {
      title: 'Upgrade Zendesk Emails with Siggly',
      description:
        'Deploy branded, data-driven signatures for your entire Zendesk support team in under five minutes.',
    },
  },

  // ─── BambooHR ────────────────────────────────────────────────────────
  {
    slug: 'bamboohr',
    category: 'integrations',
    meta: {
      title: 'Siggly + BambooHR Integration | Email Signatures',
      description:
        'Sync BambooHR employee data with Siggly to auto-generate email signatures. Keep signatures updated as HR records change.',
      keywords: [
        'bamboohr email signatures',
        'bamboohr integration',
        'HR email signatures',
        'employee directory signatures',
      ],
      canonical: '/integrations/bamboohr',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Integrations', url: '/integrations' },
      { name: 'BambooHR', url: '/integrations/bamboohr' },
    ],
    hero: {
      badge: { icon: 'users', text: 'BambooHR Integration' },
      title: 'Auto-Generate Signatures from BambooHR Employee Data',
      description:
        'Connect your HR system to Siggly and never worry about outdated signatures again. When an employee title, department, or phone number changes in BambooHR, their email signature updates automatically.',
      variant: 'slate',
    },
    stats: [
      { value: '100%', label: 'Signatures match HR records' },
      { value: '0', label: 'Manual updates needed for job changes' },
      { value: '< 1 hr', label: 'New hire signature ready time' },
    ],
    featuresTitle: 'What You Get with Siggly + BambooHR',
    features: [
      {
        icon: 'refresh-cw',
        title: 'HR Data Sync',
        description:
          'Employee name, title, department, location, and phone number sync from BambooHR to signature fields on a regular schedule.',
      },
      {
        icon: 'user-check',
        title: 'New Hire Onboarding',
        description:
          'When a new employee is added in BambooHR, Siggly automatically creates their email signature using the onboarding template.',
      },
      {
        icon: 'clock',
        title: 'Offboarding Automation',
        description:
          'When an employee is terminated in BambooHR, their Siggly account is deactivated and their signature is frozen or removed.',
      },
      {
        icon: 'layers',
        title: 'Department-Based Templates',
        description:
          'Map BambooHR departments to different signature templates so marketing, engineering, and sales each have their own design.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'How to Connect BambooHR to Siggly',
        steps: [
          {
            step: '1',
            title: 'Generate a BambooHR API Key',
            description:
              'Create an API key in BambooHR under your account settings and enter it into the Siggly integrations page.',
          },
          {
            step: '2',
            title: 'Select Employee Fields',
            description:
              'Choose which BambooHR fields to sync: name, job title, department, work phone, work email, location, and more.',
          },
          {
            step: '3',
            title: 'Map Fields to Signature Placeholders',
            description:
              'Assign each BambooHR field to a placeholder in your Siggly signature template for automatic population.',
          },
          {
            step: '4',
            title: 'Enable Auto-Sync',
            description:
              'Turn on scheduled sync so employee changes in BambooHR flow into signatures without any manual intervention.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'We used to scramble to update email signatures every time someone got promoted or changed departments. BambooHR plus Siggly solved that completely. It just works.',
      authorName: 'Michelle Carter',
      authorTitle: 'People Operations Manager, Thrive Wellness Co.',
    },
    faqs: [
      {
        question: 'Which BambooHR fields can I use in signatures?',
        answer:
          'You can use any standard or custom field from BambooHR employee records, including name, title, department, division, location, phone numbers, and custom text fields.',
      },
      {
        question: 'How quickly do changes in BambooHR reflect in signatures?',
        answer:
          'The default sync runs every 30 minutes. You can also trigger an immediate sync from the Siggly dashboard whenever needed.',
      },
      {
        question: 'Can I include employee photos from BambooHR?',
        answer:
          'Yes. If employees have profile photos uploaded in BambooHR, Siggly can pull those images and include them in email signatures.',
      },
      {
        question: 'Does the integration handle contractors and part-time employees?',
        answer:
          'Yes. You can filter by employment status in BambooHR to decide which employee types receive Siggly-managed signatures.',
      },
    ],
    cta: {
      title: 'Sync BambooHR with Siggly',
      description:
        'Automate email signature management using your BambooHR employee directory. Set it up once and forget about it.',
    },
  },

  // ─── Workday ─────────────────────────────────────────────────────────
  {
    slug: 'workday',
    category: 'integrations',
    meta: {
      title: 'Siggly + Workday Integration | Email Signatures',
      description:
        'Connect Workday HCM to Siggly for enterprise email signature automation. Sync employee data for always-accurate signatures.',
      keywords: [
        'workday email signatures',
        'workday integration',
        'HCM email signatures',
        'enterprise signature management',
        'workday sync',
      ],
      canonical: '/integrations/workday',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Integrations', url: '/integrations' },
      { name: 'Workday', url: '/integrations/workday' },
    ],
    hero: {
      badge: { icon: 'database', text: 'Workday Integration' },
      title: 'Enterprise Signature Management Powered by Workday',
      description:
        'Siggly integrates with Workday HCM to pull employee profiles, org hierarchy, and location data, generating compliant email signatures for thousands of employees across the globe.',
      variant: 'violet',
    },
    stats: [
      { value: '10K+', label: 'Employees manageable per tenant' },
      { value: '50+', label: 'Workday fields available for mapping' },
      { value: '99.9%', label: 'Sync uptime guarantee' },
    ],
    featuresTitle: 'What You Get with Siggly + Workday',
    features: [
      {
        icon: 'database',
        title: 'Workday Report-Based Sync',
        description:
          'Siggly consumes a Workday custom report (RaaS) to pull employee data without requiring complex integrations or middleware.',
      },
      {
        icon: 'globe',
        title: 'Multi-Country Support',
        description:
          'Handle regional signature formats, legal disclaimers, and language variations based on Workday location data.',
      },
      {
        icon: 'network',
        title: 'Org Hierarchy Mapping',
        description:
          'Map Workday supervisory organizations to signature templates for automated, hierarchy-based signature assignment.',
      },
      {
        icon: 'shield-check',
        title: 'Compliance and Legal Footers',
        description:
          'Automatically append country-specific legal disclaimers based on the employee work location stored in Workday.',
      },
      {
        icon: 'user-check',
        title: 'Lifecycle Event Integration',
        description:
          'Respond to Workday business process events like hires, terminations, and transfers to update signatures in real time.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'How to Connect Workday to Siggly',
        steps: [
          {
            step: '1',
            title: 'Create a Workday Custom Report',
            description:
              'Build a RaaS (Report as a Service) in Workday that exposes the employee fields needed for signatures.',
          },
          {
            step: '2',
            title: 'Configure an Integration System User',
            description:
              'Set up a dedicated Workday ISU with read-only permissions and provide the credentials to Siggly.',
          },
          {
            step: '3',
            title: 'Map Fields in Siggly',
            description:
              'Map the Workday report columns to Siggly signature placeholders using the visual field mapper.',
          },
          {
            step: '4',
            title: 'Schedule and Deploy',
            description:
              'Set the sync schedule and deploy signatures to all employees. Changes in Workday flow through automatically.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Managing signatures for 12,000 employees across 30 countries was a nightmare before Siggly. The Workday integration pulls everything we need and handles regional disclaimers automatically.',
      authorName: 'Henrik Strand',
      authorTitle: 'Global IT Director, Arcadia Pharmaceuticals',
    },
    faqs: [
      {
        question: 'Does the integration require Workday Studio or EIB?',
        answer:
          'No. Siggly uses Workday RaaS (Report as a Service), which only requires creating a custom report. No Workday Studio development or EIB configuration is needed.',
      },
      {
        question: 'Can Siggly handle employees in multiple Workday tenants?',
        answer:
          'Yes. You can connect multiple Workday tenants (production, sandbox, or separate business entities) to a single Siggly account.',
      },
      {
        question: 'How does Siggly handle Workday contingent workers?',
        answer:
          'Contingent workers can be included in the Workday custom report. Siggly treats them like any other worker and generates signatures based on the mapped fields.',
      },
      {
        question: 'What security certifications does Siggly hold?',
        answer:
          'Siggly is SOC 2 Type II certified and GDPR compliant. All data from Workday is encrypted in transit and at rest, meeting enterprise security requirements.',
      },
    ],
    cta: {
      title: 'Connect Workday to Siggly',
      description:
        'Automate email signatures for your global workforce using Workday employee data and organizational hierarchy.',
    },
  },

  // ─── Jira ────────────────────────────────────────────────────────────
  {
    slug: 'jira',
    category: 'integrations',
    meta: {
      title: 'Siggly + Jira Integration | Email Signatures',
      description:
        'Manage email signature projects in Jira. Track template changes, approvals, and deployments with Siggly and Jira integration.',
      keywords: [
        'jira email signatures',
        'jira integration',
        'signature project management',
        'jira approval workflow',
      ],
      canonical: '/integrations/jira',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Integrations', url: '/integrations' },
      { name: 'Jira', url: '/integrations/jira' },
    ],
    hero: {
      badge: { icon: 'code', text: 'Jira Integration' },
      title: 'Track Signature Projects and Approvals in Jira',
      description:
        'Bring email signature management into your existing Jira workflows. Create issues for template changes, track approval status, and get notified when signatures are deployed, all inside Jira.',
      variant: 'emerald',
    },
    stats: [
      { value: '100%', label: 'Signature changes tracked in Jira' },
      { value: '3x', label: 'Faster cross-team approval cycles' },
      { value: '0', label: 'Changes deployed without a Jira ticket' },
    ],
    featuresTitle: 'What You Get with Siggly + Jira',
    features: [
      {
        icon: 'check-circle',
        title: 'Issue-Based Approvals',
        description:
          'Every signature change request creates a Jira issue. Approvers move the issue through your workflow to approve or reject changes.',
      },
      {
        icon: 'layers',
        title: 'Custom Jira Workflows',
        description:
          'Define multi-step approval workflows in Jira with transitions for review, legal sign-off, and final deployment.',
      },
      {
        icon: 'clock',
        title: 'Audit Trail',
        description:
          'Every signature modification is logged as a Jira issue with full history, comments, and timestamps for compliance.',
      },
      {
        icon: 'link',
        title: 'Bi-Directional Sync',
        description:
          'Status changes in Jira update Siggly automatically. When an issue moves to "Done," the signature deploys to users.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'How to Connect Jira to Siggly',
        steps: [
          {
            step: '1',
            title: 'Install the Siggly Jira App',
            description:
              'Find Siggly in the Atlassian Marketplace and install it to your Jira Cloud instance with a single click.',
          },
          {
            step: '2',
            title: 'Link Your Siggly Account',
            description:
              'Authenticate your Siggly account from the Jira app configuration page to establish the connection.',
          },
          {
            step: '3',
            title: 'Configure Workflow Triggers',
            description:
              'Map Jira issue transitions to Siggly actions: "In Review" pauses deployment, "Approved" triggers deployment, "Rejected" reverts changes.',
          },
          {
            step: '4',
            title: 'Start Managing Signatures in Jira',
            description:
              'Create Jira issues for signature changes directly from Siggly, or manually create issues that Siggly monitors.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Our brand team already tracked everything in Jira, so the Siggly integration was a natural fit. Now signature updates go through the same approval process as every other brand asset.',
      authorName: 'Aisha Patel',
      authorTitle: 'Brand Operations Lead, Meridian Digital',
    },
    faqs: [
      {
        question: 'Does the integration work with Jira Server or only Jira Cloud?',
        answer:
          'The integration currently supports Jira Cloud. Jira Server and Data Center support is on the roadmap and expected in a future release.',
      },
      {
        question: 'Can I use existing Jira projects for signature management?',
        answer:
          'Yes. You can configure Siggly to create issues in any existing Jira project. You can also create a dedicated project specifically for signature management.',
      },
      {
        question: 'Are Jira automations supported?',
        answer:
          'Yes. You can use Jira automation rules to auto-assign signature issues, set due dates, send reminders, or trigger Siggly deployments based on custom conditions.',
      },
      {
        question: 'What issue types does Siggly create in Jira?',
        answer:
          'By default, Siggly creates Task-type issues. You can configure it to use any issue type available in your Jira project, including custom types.',
      },
      {
        question: 'Can multiple Jira projects connect to one Siggly account?',
        answer:
          'Yes. You can link multiple Jira projects to a single Siggly account, which is useful if different teams manage their own signature approvals.',
      },
    ],
    cta: {
      title: 'Manage Signatures Through Jira',
      description:
        'Bring email signature management into your Jira workflows for full visibility, approval tracking, and audit compliance.',
    },
  },
];
