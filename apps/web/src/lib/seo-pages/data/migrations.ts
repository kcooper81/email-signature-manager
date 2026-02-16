import type { SEOLandingPageData } from '../types';

export const migrationsPages: SEOLandingPageData[] = [
  // ---------------------------------------------------------------------------
  // 1. Exclaimer — Server-side transport rules (Exchange/M365)
  // ---------------------------------------------------------------------------
  {
    slug: 'exclaimer',
    category: 'migrations',
    meta: {
      title: 'Migrate from Exclaimer to Siggly | Guide',
      description:
        'Step-by-step guide to migrate from Exclaimer to Siggly. Remove transport rules, import templates, and deploy centrally — with zero downtime.',
      keywords: [
        'migrate from Exclaimer',
        'Exclaimer migration',
        'Exclaimer to Siggly',
        'switch from Exclaimer',
        'Exclaimer alternative migration',
      ],
      canonical: '/migrate-from/exclaimer',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Migration Guides', url: '/migrate-from' },
      { name: 'Migrate from Exclaimer', url: '/migrate-from/exclaimer' },
    ],
    hero: {
      badge: { icon: 'arrow-right-left', text: 'Migration Guide' },
      title: 'Migrate from Exclaimer to Siggly',
      description:
        'Exclaimer relies on Exchange transport rules and M365 connectors to inject signatures server-side. Siggly replaces that complexity with a streamlined cloud deployment that gives you more design flexibility, real-time analytics, and lower costs.',
      variant: 'dark',
    },
    stats: [
      { value: '< 2 hrs', label: 'Average migration time' },
      { value: '100%', label: 'Data & templates preserved' },
      { value: '99.7%', label: 'Successful migrations' },
    ],
    featuresTitle: 'Why Teams Migrate from Exclaimer',
    features: [
      {
        icon: 'zap',
        title: 'Zero Downtime Migration',
        description:
          'Run Siggly in parallel with Exclaimer during the transition period. Signatures never go dark.',
      },
      {
        icon: 'upload',
        title: 'Template Import',
        description:
          'Export your existing Exclaimer HTML templates and import them directly into Siggly\'s editor for refinement.',
      },
      {
        icon: 'users',
        title: 'User Data Preserved',
        description:
          'Siggly syncs with Azure AD and Google Directory, so all employee data maps automatically — no re-entry needed.',
      },
      {
        icon: 'shield',
        title: 'No Transport Rules Required',
        description:
          'Eliminate fragile Exchange transport rules. Siggly deploys signatures at the client level or via API, avoiding mail-flow disruption.',
      },
      {
        icon: 'clock',
        title: 'Parallel Running Period',
        description:
          'Keep Exclaimer active while you test Siggly with a pilot group. Cut over when you are fully confident.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'Step-by-Step Migration from Exclaimer',
        steps: [
          {
            step: '1',
            title: 'Audit Current Transport Rules',
            description:
              'Document your existing Exclaimer transport rules in Exchange Online or on-premises Exchange. Note which rules handle signature injection, disclaimers, and conditional logic.',
          },
          {
            step: '2',
            title: 'Export Templates & Assets',
            description:
              'Save your Exclaimer signature HTML, banner images, and social icons. Siggly can import raw HTML directly.',
          },
          {
            step: '3',
            title: 'Configure Siggly & Sync Directory',
            description:
              'Connect Siggly to Azure AD or Google Workspace. Map user attributes (name, title, phone, department) to dynamic template fields.',
          },
          {
            step: '4',
            title: 'Recreate Signature Rules in Siggly',
            description:
              'Set up department-based or role-based signature assignments in Siggly. Use conditional content blocks to replicate Exclaimer\'s rule logic.',
          },
          {
            step: '5',
            title: 'Pilot with a Test Group',
            description:
              'Deploy Siggly signatures to a small team while Exclaimer remains active for everyone else. Validate rendering across Outlook, Gmail, and mobile clients.',
          },
          {
            step: '6',
            title: 'Disable Exclaimer Transport Rules & Go Live',
            description:
              'Once validated, disable Exclaimer\'s Exchange transport rules and roll Siggly out to all users. Remove the Exclaimer connectors from your M365 admin center.',
          },
        ],
      },
      {
        type: 'checklist',
        title: 'Pre-Migration Checklist',
        items: [
          'Document all active Exclaimer transport rules and connectors',
          'Export signature HTML templates and image assets',
          'Verify Azure AD / Google Directory sync is working in Siggly',
          'Identify a pilot group of 5-10 users for testing',
          'Confirm Siggly subscription covers your total user count',
          'Notify IT team about the transport rule removal timeline',
          'Schedule a maintenance window for the final cutover',
          'Test signature rendering across all email clients used by your org',
        ],
      },
    ],
    testimonial: {
      quote:
        'We had 14 transport rules in Exchange just for signatures. Siggly replaced all of them in one afternoon and our IT team finally stopped getting support tickets about missing signatures.',
      authorName: 'Tomoko Hayashi',
      authorTitle: 'IT Director, Meridian Consulting Group',
    },
    faqs: [
      {
        question: 'How do I export my Exclaimer templates?',
        answer:
          'In the Exclaimer admin console, navigate to each signature template and copy the HTML source. Save banner images and icons separately. Siggly can import the raw HTML directly into its template editor.',
      },
      {
        question: 'How long does the migration typically take?',
        answer:
          'Most organizations complete the migration in under 2 hours. Complex setups with many conditional rules may take half a day. Our support team can help with planning.',
      },
      {
        question: 'Can I run Exclaimer and Siggly at the same time?',
        answer:
          'Yes. During the parallel running period, Exclaimer continues to apply transport-rule signatures while Siggly deploys to your pilot group. There is no conflict between the two systems.',
      },
      {
        question: 'What happens if I need to roll back?',
        answer:
          'Simply re-enable your Exclaimer transport rules in Exchange Online. We recommend keeping them disabled (not deleted) during the first week after cutover.',
      },
      {
        question: 'Do my users need training on Siggly?',
        answer:
          'End users need zero training — signatures are deployed automatically. Admins typically need 15-30 minutes to learn the Siggly dashboard, and our onboarding guide walks through every step.',
      },
    ],
    cta: {
      title: 'Start Your Free Migration',
      description:
        'Switch to Siggly with zero downtime. Our team helps you every step of the way.',
    },
  },

  // ---------------------------------------------------------------------------
  // 2. CodeTwo — On-premise agents
  // ---------------------------------------------------------------------------
  {
    slug: 'codetwo',
    category: 'migrations',
    meta: {
      title: 'Migrate from CodeTwo to Siggly | Guide',
      description:
        'Complete guide to migrating from CodeTwo to Siggly. Uninstall on-prem agents, move to cloud-based signature management, and simplify your infrastructure.',
      keywords: [
        'migrate from CodeTwo',
        'CodeTwo migration',
        'CodeTwo to Siggly',
        'switch from CodeTwo',
        'CodeTwo alternative migration',
      ],
      canonical: '/migrate-from/codetwo',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Migration Guides', url: '/migrate-from' },
      { name: 'Migrate from CodeTwo', url: '/migrate-from/codetwo' },
    ],
    hero: {
      badge: { icon: 'arrow-right-left', text: 'Migration Guide' },
      title: 'Migrate from CodeTwo to Siggly',
      description:
        'CodeTwo requires on-premise agents or Azure service installations to manage signatures. Siggly is 100% cloud-native — no agents, no server maintenance, no infrastructure overhead.',
      variant: 'violet',
    },
    stats: [
      { value: '< 3 hrs', label: 'Average migration time' },
      { value: '100%', label: 'Template designs preserved' },
      { value: '99.5%', label: 'Successful migrations' },
    ],
    featuresTitle: 'Why Teams Migrate from CodeTwo',
    features: [
      {
        icon: 'cloud',
        title: 'No Agents to Install',
        description:
          'Eliminate on-premise server agents entirely. Siggly runs in the cloud and requires zero local infrastructure.',
      },
      {
        icon: 'upload',
        title: 'Template Import',
        description:
          'Bring your CodeTwo signature designs into Siggly. Export your HTML and re-import it into our drag-and-drop editor.',
      },
      {
        icon: 'database',
        title: 'Active Directory Sync',
        description:
          'Siggly syncs with Azure AD and on-prem AD via Microsoft Graph, preserving all user attribute mappings from CodeTwo.',
      },
      {
        icon: 'refresh-cw',
        title: 'Automatic Updates',
        description:
          'No more patching on-prem agents. Siggly updates automatically and is always on the latest version.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'Step-by-Step Migration from CodeTwo',
        steps: [
          {
            step: '1',
            title: 'Inventory CodeTwo Components',
            description:
              'Identify all CodeTwo components: on-premise agents, Exchange rules, Azure tenant app registrations, and any CodeTwo cloud connectors.',
          },
          {
            step: '2',
            title: 'Export Signature Templates',
            description:
              'Open the CodeTwo admin panel and export each signature template as HTML. Download all associated images, logos, and banner files.',
          },
          {
            step: '3',
            title: 'Set Up Siggly Cloud Workspace',
            description:
              'Create your Siggly workspace, connect it to Azure AD or Google Workspace, and verify user sync is pulling the correct attributes.',
          },
          {
            step: '4',
            title: 'Import & Rebuild Templates',
            description:
              'Paste your CodeTwo HTML into Siggly\'s editor. Remap dynamic placeholders (e.g., {firstname}, {title}) to Siggly\'s field syntax.',
          },
          {
            step: '5',
            title: 'Test with a Pilot Department',
            description:
              'Assign Siggly signatures to a single department while CodeTwo continues handling the rest. Confirm rendering on desktop, web, and mobile clients.',
          },
          {
            step: '6',
            title: 'Uninstall CodeTwo Agents & Go Live',
            description:
              'After successful validation, remove CodeTwo agents from your servers, delete the Azure app registration, and disable any Exchange rules CodeTwo created. Roll Siggly out org-wide.',
          },
        ],
      },
      {
        type: 'benefits',
        title: 'What You Gain After Switching',
        items: [
          {
            icon: 'server',
            title: 'Zero Server Maintenance',
            description:
              'Stop patching, monitoring, and troubleshooting on-premise signature agents. Siggly runs entirely in the cloud.',
          },
          {
            icon: 'trending-down',
            title: 'Lower Infrastructure Costs',
            description:
              'Eliminate the server resources CodeTwo agents consume. Reduce your IT overhead immediately.',
          },
          {
            icon: 'bar-chart-3',
            title: 'Real-Time Signature Analytics',
            description:
              'Get visibility into signature impressions, link clicks, and banner campaign performance — data CodeTwo does not provide.',
          },
          {
            icon: 'globe',
            title: 'Manage From Anywhere',
            description:
              'Administer signatures from any browser. No VPN or RDP into on-prem servers needed.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Uninstalling the CodeTwo agent from our Exchange server felt like lifting a weight. Siggly gave us the same control with none of the maintenance headaches.',
      authorName: 'Rafiq Anwar',
      authorTitle: 'Systems Administrator, NovaTech Solutions',
    },
    faqs: [
      {
        question: 'How do I export templates from CodeTwo?',
        answer:
          'In the CodeTwo admin panel, open each signature rule and use the HTML editor view to copy the template source. Save images from the embedded assets folder.',
      },
      {
        question: 'How long does migration from CodeTwo take?',
        answer:
          'Typically 2-3 hours. Organizations with multiple on-prem agents or complex rule trees may need half a day. Our migration team offers guided sessions.',
      },
      {
        question: 'Can I keep CodeTwo running during the transition?',
        answer:
          'Absolutely. CodeTwo and Siggly can operate side by side. CodeTwo continues handling signatures for users not yet migrated to Siggly.',
      },
      {
        question: 'What if something goes wrong — can I revert?',
        answer:
          'Yes. Keep your CodeTwo agents installed (but inactive) during the first week. If you need to roll back, simply re-enable the CodeTwo service and disable Siggly deployment.',
      },
      {
        question: 'Will my team need training?',
        answer:
          'End users see no change — signatures are applied automatically. Admins typically complete Siggly onboarding in under 30 minutes with our interactive walkthrough.',
      },
    ],
    cta: {
      title: 'Start Your Free Migration',
      description:
        'Switch to Siggly with zero downtime. Our team helps you every step of the way.',
    },
  },

  // ---------------------------------------------------------------------------
  // 3. WiseStamp — Browser extension-based
  // ---------------------------------------------------------------------------
  {
    slug: 'wisestamp',
    category: 'migrations',
    meta: {
      title: 'Migrate from WiseStamp to Siggly | Guide',
      description:
        'How to migrate from WiseStamp to Siggly. Remove browser extensions, centralize signature management, and gain team-wide control.',
      keywords: [
        'migrate from WiseStamp',
        'WiseStamp migration',
        'WiseStamp to Siggly',
        'switch from WiseStamp',
        'WiseStamp alternative migration',
      ],
      canonical: '/migrate-from/wisestamp',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Migration Guides', url: '/migrate-from' },
      { name: 'Migrate from WiseStamp', url: '/migrate-from/wisestamp' },
    ],
    hero: {
      badge: { icon: 'arrow-right-left', text: 'Migration Guide' },
      title: 'Migrate from WiseStamp to Siggly',
      description:
        'WiseStamp uses browser extensions to inject signatures into webmail. Siggly deploys signatures server-side through native platform integrations — no extensions to install, manage, or troubleshoot.',
      variant: 'indigo',
    },
    stats: [
      { value: '< 1 hr', label: 'Average migration time' },
      { value: '100%', label: 'Design continuity' },
      { value: '99.8%', label: 'Successful migrations' },
    ],
    featuresTitle: 'Why Teams Migrate from WiseStamp',
    features: [
      {
        icon: 'shield-off',
        title: 'No Browser Extensions',
        description:
          'Stop relying on browser extensions that break with updates, require individual installs, and only work in webmail.',
      },
      {
        icon: 'smartphone',
        title: 'Signatures on Every Device',
        description:
          'WiseStamp extensions only work in desktop browsers. Siggly signatures appear on mobile, desktop apps, and webmail alike.',
      },
      {
        icon: 'lock',
        title: 'Centralized Admin Control',
        description:
          'Eliminate the need for each user to configure their own extension. Manage all signatures from one admin dashboard.',
      },
      {
        icon: 'upload',
        title: 'Design Import',
        description:
          'Recreate your WiseStamp look in Siggly\'s editor in minutes. Use our templates or paste your existing HTML.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'Step-by-Step Migration from WiseStamp',
        steps: [
          {
            step: '1',
            title: 'Capture Current Signature Designs',
            description:
              'Open the WiseStamp extension settings for each user (or your WiseStamp dashboard if on a team plan). Screenshot or copy the HTML of each signature variant.',
          },
          {
            step: '2',
            title: 'Set Up Siggly Workspace',
            description:
              'Create your Siggly account and connect it to Google Workspace or Microsoft 365. Sync your user directory.',
          },
          {
            step: '3',
            title: 'Rebuild Signatures in Siggly',
            description:
              'Use Siggly\'s drag-and-drop editor to recreate your WiseStamp designs. Map dynamic fields like name, title, and phone number from your directory.',
          },
          {
            step: '4',
            title: 'Deploy to a Pilot Group',
            description:
              'Push Siggly signatures to a small test group. Ask them to verify signatures appear correctly in Gmail, Outlook, and mobile email apps.',
          },
          {
            step: '5',
            title: 'Remove WiseStamp Extensions',
            description:
              'Once validated, uninstall the WiseStamp browser extension from all user browsers. If using Google Workspace, remove it via the admin console\'s Marketplace apps.',
          },
          {
            step: '6',
            title: 'Full Rollout',
            description:
              'Deploy Siggly signatures to the entire organization and cancel your WiseStamp subscription.',
          },
        ],
      },
      {
        type: 'prose',
        title: 'Common Pitfalls When Leaving WiseStamp',
        paragraphs: [
          'The most common mistake is forgetting to remove the WiseStamp extension from all browsers. If the extension remains installed, it may overwrite the Siggly signature with the old WiseStamp version. Use your IT admin tools (Google Workspace Admin Console or Group Policy) to force-remove the extension across all managed devices.',
          'Another pitfall is assuming WiseStamp signatures work on mobile. They do not — WiseStamp only injects signatures in browser-based webmail. When you switch to Siggly, mobile users will see a professional signature for the first time, which may prompt questions. Send a brief heads-up email to your team before the rollout.',
          'Finally, if you have users on WiseStamp\'s free plan with individually customized signatures, take time to audit those designs before migrating. Some users may have added personal branding that does not align with your company standards. The migration is a good opportunity to standardize.',
        ],
      },
    ],
    testimonial: {
      quote:
        'Half our team had the WiseStamp extension and half did not, so signatures were inconsistent. Siggly gave everyone the same professional signature instantly — even on mobile.',
      authorName: 'Elena Vasquez',
      authorTitle: 'Brand Manager, Skyline Creative Agency',
    },
    faqs: [
      {
        question: 'Can I export my WiseStamp signature design?',
        answer:
          'WiseStamp does not offer a direct export feature. You can copy the signature HTML from the extension settings or compose a test email and copy the rendered signature from there.',
      },
      {
        question: 'How quickly can we complete the migration?',
        answer:
          'Most teams finish in under an hour. WiseStamp migrations are among the fastest because there are no server-side rules to remove — just browser extensions.',
      },
      {
        question: 'Can we run WiseStamp and Siggly together?',
        answer:
          'Technically yes, but we recommend against it. The WiseStamp extension may overwrite the Siggly signature in webmail. Remove the extension before deploying Siggly.',
      },
      {
        question: 'Is there a rollback option?',
        answer:
          'You can reinstall the WiseStamp extension at any time. However, once Siggly is deployed server-side, it is rarely needed — users gain coverage on all devices, not just browsers.',
      },
      {
        question: 'Do users need to do anything during migration?',
        answer:
          'No. Admins handle the entire migration. Users may be asked to refresh their browser or restart their email client, but no training is required.',
      },
    ],
    cta: {
      title: 'Start Your Free Migration',
      description:
        'Switch to Siggly with zero downtime. Our team helps you every step of the way.',
    },
  },

  // ---------------------------------------------------------------------------
  // 4. Newoldstamp — Individual signature creator
  // ---------------------------------------------------------------------------
  {
    slug: 'newoldstamp',
    category: 'migrations',
    meta: {
      title: 'Migrate from Newoldstamp to Siggly | Guide',
      description:
        'Migrate from Newoldstamp to Siggly for centralized team signature management. Keep your designs, gain deployment automation and analytics.',
      keywords: [
        'migrate from Newoldstamp',
        'Newoldstamp migration',
        'Newoldstamp to Siggly',
        'switch from Newoldstamp',
        'centralize email signatures',
      ],
      canonical: '/migrate-from/newoldstamp',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Migration Guides', url: '/migrate-from' },
      { name: 'Migrate from Newoldstamp', url: '/migrate-from/newoldstamp' },
    ],
    hero: {
      badge: { icon: 'arrow-right-left', text: 'Migration Guide' },
      title: 'Migrate from Newoldstamp to Siggly',
      description:
        'Newoldstamp is a solid individual signature generator, but scaling it across a team means manual copy-paste for each user. Siggly centralizes everything — design once, deploy everywhere, update instantly.',
      variant: 'slate',
    },
    stats: [
      { value: '< 45 min', label: 'Average migration time' },
      { value: '100%', label: 'Design fidelity maintained' },
      { value: '99.9%', label: 'Successful migrations' },
    ],
    featuresTitle: 'Why Teams Migrate from Newoldstamp',
    features: [
      {
        icon: 'users',
        title: 'Centralized Team Management',
        description:
          'Stop managing signatures one user at a time. Siggly lets you assign templates by department, role, or location from a single dashboard.',
      },
      {
        icon: 'refresh-cw',
        title: 'Instant Organization-Wide Updates',
        description:
          'Change a banner or phone number once and it updates across every signature automatically. No more chasing individual users.',
      },
      {
        icon: 'bar-chart-3',
        title: 'Signature Analytics',
        description:
          'Track clicks, impressions, and campaign performance — data Newoldstamp does not provide at the team level.',
      },
      {
        icon: 'plug',
        title: 'Directory Integration',
        description:
          'Sync with Azure AD or Google Workspace so employee details auto-populate into signatures when people join, change roles, or leave.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'Step-by-Step Migration from Newoldstamp',
        steps: [
          {
            step: '1',
            title: 'Export Existing Signature HTML',
            description:
              'Log into Newoldstamp and copy the generated HTML for each signature you have created. Save any custom images or logos used in the designs.',
          },
          {
            step: '2',
            title: 'Create Your Siggly Workspace',
            description:
              'Sign up for Siggly and connect your Google Workspace or Microsoft 365 tenant. User data syncs automatically.',
          },
          {
            step: '3',
            title: 'Design a Unified Template',
            description:
              'Instead of individual signatures, create one or two master templates with dynamic fields. Siggly auto-fills each user\'s name, title, department, and contact details.',
          },
          {
            step: '4',
            title: 'Assign & Deploy',
            description:
              'Assign templates to teams or the entire organization. Deploy directly to Gmail or Outlook — users do not need to copy-paste anything.',
          },
        ],
      },
      {
        type: 'checklist',
        title: 'Pre-Migration Checklist',
        items: [
          'List all Newoldstamp signatures currently in use',
          'Copy the HTML source for each signature design',
          'Download all custom images, logos, and banner graphics',
          'Verify your user directory is up to date in Google Workspace or M365',
          'Decide on a unified template strategy (one template or department-based)',
          'Identify which users should be in the pilot group',
        ],
      },
    ],
    testimonial: {
      quote:
        'We had 40 people manually pasting Newoldstamp signatures. With Siggly, I set up one template and deployed it to everyone in 15 minutes. Never going back.',
      authorName: 'Samira Okafor',
      authorTitle: 'Operations Lead, Helix Ventures',
    },
    faqs: [
      {
        question: 'Can I recreate my Newoldstamp designs in Siggly?',
        answer:
          'Yes. You can paste your Newoldstamp HTML directly into Siggly or use our drag-and-drop editor to rebuild the design. Most teams use the migration as a chance to refresh their branding.',
      },
      {
        question: 'How long does the migration take?',
        answer:
          'Most teams finish in under 45 minutes. Since Newoldstamp is an individual tool with no server-side components, there is nothing to uninstall — you simply stop using it.',
      },
      {
        question: 'Can I run both tools during the transition?',
        answer:
          'Yes. Newoldstamp signatures are pasted into email clients manually, while Siggly deploys automatically. Once Siggly is active, it overwrites the old signature seamlessly.',
      },
      {
        question: 'What if I need to go back to Newoldstamp?',
        answer:
          'Your Newoldstamp account remains active until you cancel it. You can always log back in and re-copy signatures if needed, though most teams find that unnecessary.',
      },
      {
        question: 'Is training required for admins or users?',
        answer:
          'Users need zero training since signatures deploy automatically. Admins can learn the Siggly dashboard in a 15-minute walkthrough — our onboarding guide covers everything.',
      },
    ],
    cta: {
      title: 'Start Your Free Migration',
      description:
        'Switch to Siggly with zero downtime. Our team helps you every step of the way.',
    },
  },

  // ---------------------------------------------------------------------------
  // 5. Opensense — Server-side injection with DNS/routing
  // ---------------------------------------------------------------------------
  {
    slug: 'opensense',
    category: 'migrations',
    meta: {
      title: 'Migrate from Opensense to Siggly | Guide',
      description:
        'Step-by-step guide to migrate from Opensense to Siggly. Update DNS routing, import campaigns, and deploy with simpler infrastructure.',
      keywords: [
        'migrate from Opensense',
        'Opensense migration',
        'Opensense to Siggly',
        'switch from Opensense',
        'Opensense alternative migration',
      ],
      canonical: '/migrate-from/opensense',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Migration Guides', url: '/migrate-from' },
      { name: 'Migrate from Opensense', url: '/migrate-from/opensense' },
    ],
    hero: {
      badge: { icon: 'arrow-right-left', text: 'Migration Guide' },
      title: 'Migrate from Opensense to Siggly',
      description:
        'Opensense routes your email through its servers via MX record or connector changes to inject signatures. Siggly achieves the same result without rerouting your mail flow — keeping your email infrastructure cleaner and more secure.',
      variant: 'dark',
    },
    stats: [
      { value: '< 4 hrs', label: 'Average migration time' },
      { value: '100%', label: 'Campaign data exportable' },
      { value: '99.4%', label: 'Successful migrations' },
    ],
    featuresTitle: 'Why Teams Migrate from Opensense',
    features: [
      {
        icon: 'mail',
        title: 'No Mail Rerouting',
        description:
          'Siggly does not require MX record changes or mail connectors. Your email stays on its native path.',
      },
      {
        icon: 'bar-chart-3',
        title: 'Better Campaign Analytics',
        description:
          'Get deeper click and impression analytics with real-time dashboards and exportable reports.',
      },
      {
        icon: 'shield',
        title: 'Reduced Security Surface',
        description:
          'Eliminating the third-party mail relay removes a potential point of failure and security risk from your email pipeline.',
      },
      {
        icon: 'dollar-sign',
        title: 'Transparent Pricing',
        description:
          'No per-email fees or tiered pricing based on send volume. Siggly uses simple per-user pricing.',
      },
      {
        icon: 'zap',
        title: 'Faster Deployment',
        description:
          'Deploy signatures without waiting for DNS propagation. Changes take effect in minutes, not hours.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'Step-by-Step Migration from Opensense',
        steps: [
          {
            step: '1',
            title: 'Document DNS & Connector Configuration',
            description:
              'Record your current MX records, SPF records, and any Exchange/Google connectors that route mail through Opensense. You will need to revert these during cutover.',
          },
          {
            step: '2',
            title: 'Export Campaign Data & Templates',
            description:
              'Download your Opensense banner campaigns, signature templates, and analytics reports. Save all creative assets.',
          },
          {
            step: '3',
            title: 'Set Up Siggly & Connect Directory',
            description:
              'Create your Siggly workspace and connect your identity provider. Map user fields and set up department-based signature assignments.',
          },
          {
            step: '4',
            title: 'Recreate Campaigns in Siggly',
            description:
              'Import your banner creatives and set up campaign schedules in Siggly\'s campaign manager. Configure targeting rules by department or region.',
          },
          {
            step: '5',
            title: 'Pilot & Validate',
            description:
              'Deploy Siggly to a pilot group. Confirm that signatures render correctly and campaign tracking links are firing properly.',
          },
          {
            step: '6',
            title: 'Revert DNS & Remove Opensense Connectors',
            description:
              'Update MX records and SPF to remove Opensense from the mail path. Delete the Opensense connectors in Exchange or Google admin. Roll Siggly out to all users.',
          },
        ],
      },
      {
        type: 'checklist',
        title: 'Pre-Migration Checklist',
        items: [
          'Screenshot current MX, SPF, and DKIM records',
          'Document all Opensense mail connectors in Exchange or Google',
          'Export all banner campaign creatives and schedules',
          'Download Opensense analytics reports for historical reference',
          'Verify Siggly user sync matches your directory',
          'Plan DNS change window (allow 24-48 hrs for propagation)',
          'Notify email security team about routing changes',
        ],
      },
    ],
    testimonial: {
      quote:
        'Routing all our email through a third party made our security team nervous. Siggly gave us the same signature injection and campaign tracking without touching our mail flow.',
      authorName: 'David Okonkwo',
      authorTitle: 'VP of IT, Clearwater Financial',
    },
    faqs: [
      {
        question: 'How do I remove Opensense from my mail flow?',
        answer:
          'Revert your MX records to point directly to Google or Microsoft, update your SPF record to remove Opensense\'s include, and delete the inbound/outbound connectors in your admin console.',
      },
      {
        question: 'How long does the DNS change take to propagate?',
        answer:
          'DNS changes typically propagate within 1-4 hours, though full propagation can take up to 48 hours. Plan your cutover accordingly and keep Opensense active until propagation completes.',
      },
      {
        question: 'Can I run Opensense and Siggly in parallel?',
        answer:
          'Yes, but only for different user groups. Since Opensense modifies emails in transit, it could conflict with Siggly on the same messages. Segment users during the transition.',
      },
      {
        question: 'What if I need to roll back?',
        answer:
          'Re-add the Opensense connectors and update your MX/SPF records. Keep your Opensense configuration documented so you can restore it quickly if needed.',
      },
      {
        question: 'Will my campaign tracking data transfer?',
        answer:
          'Campaign creatives and schedules can be recreated in Siggly. Historical analytics remain in your Opensense account. Export reports before cancelling your subscription.',
      },
    ],
    cta: {
      title: 'Start Your Free Migration',
      description:
        'Switch to Siggly with zero downtime. Our team helps you every step of the way.',
    },
  },

  // ---------------------------------------------------------------------------
  // 6. Mailtastic — Campaign-focused signature management
  // ---------------------------------------------------------------------------
  {
    slug: 'mailtastic',
    category: 'migrations',
    meta: {
      title: 'Migrate from Mailtastic to Siggly | Guide',
      description:
        'How to migrate from Mailtastic to Siggly. Export campaign data, transfer templates, and get better analytics with simpler pricing.',
      keywords: [
        'migrate from Mailtastic',
        'Mailtastic migration',
        'Mailtastic to Siggly',
        'switch from Mailtastic',
        'Mailtastic alternative migration',
      ],
      canonical: '/migrate-from/mailtastic',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Migration Guides', url: '/migrate-from' },
      { name: 'Migrate from Mailtastic', url: '/migrate-from/mailtastic' },
    ],
    hero: {
      badge: { icon: 'arrow-right-left', text: 'Migration Guide' },
      title: 'Migrate from Mailtastic to Siggly',
      description:
        'Mailtastic focuses heavily on signature banner campaigns and marketing automation. Siggly delivers the same campaign capabilities with a more intuitive interface, better template flexibility, and transparent per-user pricing.',
      variant: 'violet',
    },
    stats: [
      { value: '< 2 hrs', label: 'Average migration time' },
      { value: '100%', label: 'Campaign assets transferable' },
      { value: '99.6%', label: 'Successful migrations' },
    ],
    featuresTitle: 'Why Teams Migrate from Mailtastic',
    features: [
      {
        icon: 'layout',
        title: 'More Flexible Templates',
        description:
          'Siggly\'s drag-and-drop editor gives you more design freedom than Mailtastic\'s template system, with support for custom HTML.',
      },
      {
        icon: 'bar-chart-3',
        title: 'Deeper Campaign Analytics',
        description:
          'Track impressions, clicks, and conversions with granular filtering by department, campaign, and time period.',
      },
      {
        icon: 'dollar-sign',
        title: 'Simpler Pricing',
        description:
          'No confusing tier structures. Siggly charges per user with all features included — campaigns, analytics, and deployment.',
      },
      {
        icon: 'plug',
        title: 'CRM Integrations',
        description:
          'Connect Siggly to Salesforce, HubSpot, and other CRMs to enrich signatures with contact-specific data and track engagement.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'Step-by-Step Migration from Mailtastic',
        steps: [
          {
            step: '1',
            title: 'Export Campaign Data',
            description:
              'Download all active and scheduled banner campaigns from Mailtastic, including creative assets, targeting rules, and performance reports.',
          },
          {
            step: '2',
            title: 'Export Signature Templates',
            description:
              'Copy the HTML for each signature template. Save all associated images, logos, and social icons to a shared folder.',
          },
          {
            step: '3',
            title: 'Create Siggly Workspace & Sync Users',
            description:
              'Connect Siggly to your identity provider. Map user attributes and set up groups for department-based signature assignment.',
          },
          {
            step: '4',
            title: 'Rebuild Templates & Campaigns',
            description:
              'Import your signature HTML into Siggly\'s editor. Recreate your banner campaigns with the same creative assets and scheduling rules.',
          },
          {
            step: '5',
            title: 'Validate with a Pilot Group',
            description:
              'Deploy to a test group, verify signature rendering, and confirm campaign tracking is recording clicks and impressions correctly.',
          },
          {
            step: '6',
            title: 'Full Rollout & Decommission Mailtastic',
            description:
              'Deploy Siggly to all users, remove any Mailtastic connectors or integrations, and cancel your Mailtastic subscription.',
          },
        ],
      },
      {
        type: 'benefits',
        title: 'What You Gain After Switching',
        items: [
          {
            icon: 'target',
            title: 'Smarter Campaign Targeting',
            description:
              'Target banner campaigns by department, region, seniority, or custom attributes. Run A/B tests to optimize click-through rates.',
          },
          {
            icon: 'layout',
            title: 'Superior Design Control',
            description:
              'Full drag-and-drop editor with custom HTML support means your signatures look exactly how your brand team wants them.',
          },
          {
            icon: 'trending-up',
            title: 'Unified Analytics Dashboard',
            description:
              'See all signature and campaign metrics in one place. Export reports to CSV or connect to your BI tools via API.',
          },
          {
            icon: 'wallet',
            title: 'Predictable Costs',
            description:
              'One price per user, all features included. No surprise charges for campaigns, analytics, or premium templates.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Mailtastic\'s pricing got confusing as we scaled. Siggly gave us the same campaign features at a flat rate per user, and the analytics dashboard is significantly better.',
      authorName: 'Lars Bergstrom',
      authorTitle: 'Marketing Director, Polaris Media Group',
    },
    faqs: [
      {
        question: 'Can I transfer my Mailtastic campaigns to Siggly?',
        answer:
          'Campaign creative assets and schedules can be recreated in Siggly. Download your banner images and note your targeting rules before cancelling Mailtastic.',
      },
      {
        question: 'How long does the migration take?',
        answer:
          'Most teams complete the migration in 1-2 hours. The bulk of the time is spent recreating campaign schedules and testing banner rendering.',
      },
      {
        question: 'Can Mailtastic and Siggly run in parallel?',
        answer:
          'Yes, for different user segments. Avoid running both for the same user, as the signatures may conflict. Migrate department by department for a clean transition.',
      },
      {
        question: 'How do I roll back if needed?',
        answer:
          'Keep your Mailtastic account active during the transition. If you need to revert, re-enable Mailtastic deployment for affected users.',
      },
      {
        question: 'Will my historical campaign data transfer?',
        answer:
          'Historical analytics remain in Mailtastic. Export all reports before cancelling. Going forward, Siggly captures all campaign performance data in its own dashboard.',
      },
    ],
    cta: {
      title: 'Start Your Free Migration',
      description:
        'Switch to Siggly with zero downtime. Our team helps you every step of the way.',
    },
  },

  // ---------------------------------------------------------------------------
  // 7. Letsignit — Campaign-focused signature management
  // ---------------------------------------------------------------------------
  {
    slug: 'letsignit',
    category: 'migrations',
    meta: {
      title: 'Migrate from Letsignit to Siggly | Guide',
      description:
        'Complete guide to migrating from Letsignit to Siggly. Transfer templates, export campaign schedules, and simplify your signature stack.',
      keywords: [
        'migrate from Letsignit',
        'Letsignit migration',
        'Letsignit to Siggly',
        'switch from Letsignit',
        'Letsignit alternative migration',
      ],
      canonical: '/migrate-from/letsignit',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Migration Guides', url: '/migrate-from' },
      { name: 'Migrate from Letsignit', url: '/migrate-from/letsignit' },
    ],
    hero: {
      badge: { icon: 'arrow-right-left', text: 'Migration Guide' },
      title: 'Migrate from Letsignit to Siggly',
      description:
        'Letsignit integrates with Microsoft 365 for signature and banner campaign management. Siggly offers broader platform support, more design flexibility, and an analytics dashboard that gives marketing teams actionable insights.',
      variant: 'indigo',
    },
    stats: [
      { value: '< 2 hrs', label: 'Average migration time' },
      { value: '100%', label: 'Templates transferable' },
      { value: '99.6%', label: 'Successful migrations' },
    ],
    featuresTitle: 'Why Teams Migrate from Letsignit',
    features: [
      {
        icon: 'globe',
        title: 'Multi-Platform Support',
        description:
          'Letsignit focuses on Microsoft 365. Siggly supports Google Workspace, M365, and hybrid environments equally well.',
      },
      {
        icon: 'layout',
        title: 'Advanced Template Editor',
        description:
          'Build signatures with a true drag-and-drop editor. Add conditional content, dynamic banners, and custom HTML blocks.',
      },
      {
        icon: 'bar-chart-3',
        title: 'Actionable Analytics',
        description:
          'Move beyond basic click counts. Siggly shows conversion paths, department comparisons, and campaign ROI estimates.',
      },
      {
        icon: 'dollar-sign',
        title: 'Better Value',
        description:
          'Get all features at every pricing tier. No need to upgrade for campaign management or analytics access.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'Step-by-Step Migration from Letsignit',
        steps: [
          {
            step: '1',
            title: 'Audit Letsignit Configuration',
            description:
              'Review your Letsignit signature rules, campaign schedules, and Azure AD integration settings. Note which groups or OUs have specific templates assigned.',
          },
          {
            step: '2',
            title: 'Export Templates & Campaign Assets',
            description:
              'Copy signature HTML from the Letsignit editor. Download all banner images, campaign schedules, and any custom CSS.',
          },
          {
            step: '3',
            title: 'Configure Siggly Workspace',
            description:
              'Connect Siggly to Azure AD or Google Workspace. Set up the same group-based assignments you used in Letsignit.',
          },
          {
            step: '4',
            title: 'Rebuild Signatures & Campaigns',
            description:
              'Import your templates into Siggly\'s editor. Set up banner campaigns with the same creatives and scheduling rules.',
          },
          {
            step: '5',
            title: 'Deploy to Pilot Group & Test',
            description:
              'Push Siggly to a small team. Verify signatures render correctly in Outlook desktop, OWA, Outlook mobile, and any other clients your org uses.',
          },
          {
            step: '6',
            title: 'Disable Letsignit & Go Live',
            description:
              'Remove the Letsignit app from Azure AD Enterprise Applications. Deploy Siggly to all users and cancel your Letsignit subscription.',
          },
        ],
      },
      {
        type: 'prose',
        title: 'Key Considerations for Letsignit Migrations',
        paragraphs: [
          'Letsignit stores its configuration as an Azure AD Enterprise Application. When you disable it, all Letsignit-managed signatures stop updating. Make sure Siggly is fully deployed before removing the Letsignit app registration.',
          'If you rely on Letsignit\'s banner campaign scheduling, map out your active and upcoming campaigns before starting the migration. Siggly\'s campaign manager supports date-based scheduling, audience targeting, and A/B testing, so you can replicate (and improve upon) your existing setup.',
          'Teams that used Letsignit\'s internal communication banners will find Siggly\'s campaign system familiar but more powerful. You can target by department, region, or custom user attributes, and the analytics dashboard shows real-time performance rather than end-of-day summaries.',
        ],
      },
    ],
    testimonial: {
      quote:
        'Letsignit only worked well with M365. When we added Google Workspace for a subsidiary, we needed something cross-platform. Siggly handled both tenants from one dashboard.',
      authorName: 'Isabelle Moreau',
      authorTitle: 'IT Manager, Pinnacle Industries',
    },
    faqs: [
      {
        question: 'How do I remove Letsignit from Azure AD?',
        answer:
          'Go to Azure Portal > Azure Active Directory > Enterprise Applications, find Letsignit, and delete the application. This removes its ability to manage signatures.',
      },
      {
        question: 'How long does migration from Letsignit take?',
        answer:
          'Most organizations complete the migration in 1-2 hours. Complex campaign setups may take slightly longer to recreate.',
      },
      {
        question: 'Can I run both tools at the same time?',
        answer:
          'Yes, temporarily. Letsignit and Siggly can coexist during the transition since they manage signatures through different mechanisms. Deploy Siggly to a test group first.',
      },
      {
        question: 'What happens to my campaign history?',
        answer:
          'Campaign performance data stays in your Letsignit account. Export reports before cancelling. Siggly starts tracking from the moment you deploy.',
      },
      {
        question: 'Is training required?',
        answer:
          'End users need no training. Admins familiar with Letsignit will find Siggly\'s interface intuitive — most are productive within 20 minutes.',
      },
    ],
    cta: {
      title: 'Start Your Free Migration',
      description:
        'Switch to Siggly with zero downtime. Our team helps you every step of the way.',
    },
  },

  // ---------------------------------------------------------------------------
  // 8. Rocketseed — Server-level email branding
  // ---------------------------------------------------------------------------
  {
    slug: 'rocketseed',
    category: 'migrations',
    meta: {
      title: 'Migrate from Rocketseed to Siggly | Guide',
      description:
        'How to migrate from Rocketseed to Siggly. Remove server-level branding rules, simplify your email infrastructure, and gain modern analytics.',
      keywords: [
        'migrate from Rocketseed',
        'Rocketseed migration',
        'Rocketseed to Siggly',
        'switch from Rocketseed',
        'Rocketseed alternative migration',
      ],
      canonical: '/migrate-from/rocketseed',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Migration Guides', url: '/migrate-from' },
      { name: 'Migrate from Rocketseed', url: '/migrate-from/rocketseed' },
    ],
    hero: {
      badge: { icon: 'arrow-right-left', text: 'Migration Guide' },
      title: 'Migrate from Rocketseed to Siggly',
      description:
        'Rocketseed applies email branding at the server level, requiring mail flow configuration changes. Siggly delivers the same branded signatures through a simpler cloud-based approach with no server modifications needed.',
      variant: 'slate',
    },
    stats: [
      { value: '< 3 hrs', label: 'Average migration time' },
      { value: '100%', label: 'Brand assets preserved' },
      { value: '99.5%', label: 'Successful migrations' },
    ],
    featuresTitle: 'Why Teams Migrate from Rocketseed',
    features: [
      {
        icon: 'cloud',
        title: 'No Server Configuration',
        description:
          'Eliminate server-level email branding rules. Siggly works through cloud APIs without modifying your mail flow.',
      },
      {
        icon: 'smartphone',
        title: 'Full Mobile Support',
        description:
          'Signatures render perfectly on mobile devices. No dependency on server-side injection that can produce inconsistent mobile rendering.',
      },
      {
        icon: 'bar-chart-3',
        title: 'Modern Analytics Dashboard',
        description:
          'Get real-time campaign performance data with visual dashboards, not just periodic CSV reports.',
      },
      {
        icon: 'layout',
        title: 'Drag-and-Drop Design',
        description:
          'Build beautiful branded signatures without writing HTML. Rocketseed\'s design tools feel dated by comparison.',
      },
      {
        icon: 'zap',
        title: 'Instant Updates',
        description:
          'Push signature changes immediately. No waiting for server-side rules to propagate across mail infrastructure.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'Step-by-Step Migration from Rocketseed',
        steps: [
          {
            step: '1',
            title: 'Document Server Branding Rules',
            description:
              'List all Rocketseed branding rules applied at the server level, including signature templates, banner configs, and any mail routing changes.',
          },
          {
            step: '2',
            title: 'Export Brand Assets',
            description:
              'Download all logos, banners, social icons, and template HTML from the Rocketseed admin panel.',
          },
          {
            step: '3',
            title: 'Set Up Siggly & Sync Directory',
            description:
              'Connect Siggly to your identity provider. Import your user directory and map attributes to signature template fields.',
          },
          {
            step: '4',
            title: 'Build Templates in Siggly',
            description:
              'Use the drag-and-drop editor to create branded signature templates. Import your existing HTML if you prefer to preserve the exact layout.',
          },
          {
            step: '5',
            title: 'Test with a Pilot Group',
            description:
              'Deploy Siggly signatures to a test department. Verify branding consistency across Outlook, Gmail, Apple Mail, and mobile clients.',
          },
          {
            step: '6',
            title: 'Remove Rocketseed Server Rules & Go Live',
            description:
              'Disable Rocketseed\'s server-level branding rules. Remove any mail connectors or transport rules Rocketseed added. Roll Siggly out to all users.',
          },
        ],
      },
      {
        type: 'benefits',
        title: 'What You Gain After Switching',
        items: [
          {
            icon: 'shield',
            title: 'Simpler Security Posture',
            description:
              'Removing server-level mail modifications reduces your attack surface and eliminates a dependency from your email pipeline.',
          },
          {
            icon: 'refresh-cw',
            title: 'Self-Service Brand Updates',
            description:
              'Marketing teams can update banners and campaigns without involving IT. Changes deploy instantly from the Siggly dashboard.',
          },
          {
            icon: 'monitor',
            title: 'Consistent Cross-Client Rendering',
            description:
              'Siggly\'s templates are tested across 80+ email clients. Server-side injection can produce rendering inconsistencies that are hard to debug.',
          },
          {
            icon: 'trending-up',
            title: 'Measurable Campaign ROI',
            description:
              'Track every banner click and signature impression. Connect the data to your CRM to measure actual pipeline impact.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Rocketseed branding was baked into our Exchange server and nobody wanted to touch it. Siggly moved everything to the cloud and now marketing manages signatures without an IT ticket.',
      authorName: 'Thandiwe Mabaso',
      authorTitle: 'Head of Digital, Springbok Communications',
    },
    faqs: [
      {
        question: 'How do I remove Rocketseed from my mail server?',
        answer:
          'Disable Rocketseed\'s branding rules in your Exchange or mail server admin panel. Remove any transport rules or connectors Rocketseed installed. Consult Rocketseed\'s documentation for server-specific steps.',
      },
      {
        question: 'How long does the migration take?',
        answer:
          'Typically 2-3 hours. The most time-consuming step is removing server-level rules, which may require coordination with your IT team.',
      },
      {
        question: 'Can I run both simultaneously?',
        answer:
          'We do not recommend it. Since Rocketseed modifies emails at the server level, running both could result in double signatures. Migrate department by department instead.',
      },
      {
        question: 'What if I need to revert?',
        answer:
          'Keep your Rocketseed server rules documented but disabled. If you need to roll back, re-enable them in your mail server configuration.',
      },
      {
        question: 'Will my team need training?',
        answer:
          'End users see no disruption — signatures update automatically. Admins and marketing teams can learn Siggly\'s campaign tools in a 20-minute walkthrough.',
      },
    ],
    cta: {
      title: 'Start Your Free Migration',
      description:
        'Switch to Siggly with zero downtime. Our team helps you every step of the way.',
    },
  },

  // ---------------------------------------------------------------------------
  // 9. Templafy — Document management platform
  // ---------------------------------------------------------------------------
  {
    slug: 'templafy',
    category: 'migrations',
    meta: {
      title: 'Migrate from Templafy to Siggly | Guide',
      description:
        'How to migrate your email signatures from Templafy to Siggly. Extract signature configs from the document platform and deploy with a purpose-built tool.',
      keywords: [
        'migrate from Templafy',
        'Templafy migration',
        'Templafy to Siggly',
        'switch from Templafy signatures',
        'Templafy email signature alternative',
      ],
      canonical: '/migrate-from/templafy',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Migration Guides', url: '/migrate-from' },
      { name: 'Migrate from Templafy', url: '/migrate-from/templafy' },
    ],
    hero: {
      badge: { icon: 'arrow-right-left', text: 'Migration Guide' },
      title: 'Migrate from Templafy to Siggly',
      description:
        'Templafy is a document management platform that includes email signatures as a secondary feature. Siggly is purpose-built for signature management — giving you better templates, deeper analytics, and dedicated support.',
      variant: 'dark',
    },
    stats: [
      { value: '< 2 hrs', label: 'Average migration time' },
      { value: '100%', label: 'Design assets preserved' },
      { value: '99.7%', label: 'Successful migrations' },
    ],
    featuresTitle: 'Why Teams Migrate from Templafy',
    features: [
      {
        icon: 'target',
        title: 'Purpose-Built for Signatures',
        description:
          'Templafy treats signatures as one feature among many. Siggly is 100% focused on email signatures, which means deeper functionality and faster innovation.',
      },
      {
        icon: 'layout',
        title: 'Superior Template Editor',
        description:
          'Siggly\'s drag-and-drop editor offers more design control than Templafy\'s signature module, including conditional content and dynamic banners.',
      },
      {
        icon: 'bar-chart-3',
        title: 'Signature-Specific Analytics',
        description:
          'Track clicks, impressions, and campaign performance with dashboards built specifically for email signature metrics.',
      },
      {
        icon: 'dollar-sign',
        title: 'Lower Total Cost',
        description:
          'Stop paying for a full document management platform just for signatures. Siggly costs a fraction of Templafy\'s per-user price.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'Step-by-Step Migration from Templafy',
        steps: [
          {
            step: '1',
            title: 'Extract Signature Configuration',
            description:
              'In Templafy\'s admin panel, navigate to the Email Signature section. Copy the template HTML and note any dynamic field mappings tied to Azure AD attributes.',
          },
          {
            step: '2',
            title: 'Download Brand Assets',
            description:
              'Export logos, banners, and social icons from Templafy\'s asset library. These will be uploaded to Siggly.',
          },
          {
            step: '3',
            title: 'Set Up Siggly Workspace',
            description:
              'Create your Siggly account and connect to Azure AD or Google Workspace. Verify user sync and attribute mapping.',
          },
          {
            step: '4',
            title: 'Rebuild Signatures in Siggly',
            description:
              'Import your template HTML or build fresh designs in the drag-and-drop editor. Map dynamic fields to the same directory attributes Templafy used.',
          },
          {
            step: '5',
            title: 'Pilot Deployment',
            description:
              'Deploy Siggly to a pilot group and validate signatures across all email clients. Compare rendering with your current Templafy signatures.',
          },
          {
            step: '6',
            title: 'Disable Templafy Signatures & Go Live',
            description:
              'Turn off the Email Signature module in Templafy\'s admin settings. Deploy Siggly to all users. You can keep Templafy for document management if needed.',
          },
        ],
      },
      {
        type: 'prose',
        title: 'Key Considerations for Templafy Migrations',
        paragraphs: [
          'Many organizations use Templafy primarily for document templates (PowerPoint, Word) and only secondarily for email signatures. If that describes your situation, you can migrate signatures to Siggly while keeping Templafy for documents — the two tools do not conflict.',
          'Templafy\'s signature module uses Outlook add-in deployment in many configurations. When you disable it, confirm that the add-in is removed from users\' Outlook clients to prevent confusion. Use the Microsoft 365 admin center to manage add-in deployment centrally.',
          'If your Templafy contract bundles signatures with document management, check whether removing the signature module affects your pricing. Some organizations negotiate a reduced rate for document-only access.',
        ],
      },
    ],
    testimonial: {
      quote:
        'We were paying enterprise Templafy prices mostly for email signatures. Siggly gave us better signature tools at a fifth of the cost, and we kept Templafy just for document templates.',
      authorName: 'Henrik Johansson',
      authorTitle: 'Procurement Manager, Baltic Shipping Co.',
    },
    faqs: [
      {
        question: 'Can I keep Templafy for documents and use Siggly for signatures?',
        answer:
          'Absolutely. Many organizations do exactly this. Siggly handles signatures independently, so there is no conflict with Templafy\'s document management features.',
      },
      {
        question: 'How do I extract my signature template from Templafy?',
        answer:
          'In the Templafy admin portal, navigate to Email Signatures and open the template editor. Copy the HTML source and save it locally. Export any images from the asset library.',
      },
      {
        question: 'How long does the migration take?',
        answer:
          'Most teams complete it in under 2 hours. Templafy migrations are straightforward because there are no server-level changes — just disabling the Templafy signature module.',
      },
      {
        question: 'Can I run both during the transition?',
        answer:
          'Yes, but for different user groups. If both tools try to set the same user\'s Outlook signature, the last one to deploy wins. Segment your rollout by department.',
      },
      {
        question: 'Do users need training?',
        answer:
          'No. Signatures deploy automatically. The only user-facing change is an improved signature design. Admins need about 20 minutes to learn the Siggly dashboard.',
      },
    ],
    cta: {
      title: 'Start Your Free Migration',
      description:
        'Switch to Siggly with zero downtime. Our team helps you every step of the way.',
    },
  },

  // ---------------------------------------------------------------------------
  // 10. Gimmio — Individual signature creator
  // ---------------------------------------------------------------------------
  {
    slug: 'gimmio',
    category: 'migrations',
    meta: {
      title: 'Migrate from Gimmio to Siggly | Guide',
      description:
        'How to migrate from Gimmio to Siggly. Move from individual signature generation to centralized team management with automated deployment.',
      keywords: [
        'migrate from Gimmio',
        'Gimmio migration',
        'Gimmio to Siggly',
        'switch from Gimmio',
        'Gimmio alternative migration',
      ],
      canonical: '/migrate-from/gimmio',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Migration Guides', url: '/migrate-from' },
      { name: 'Migrate from Gimmio', url: '/migrate-from/gimmio' },
    ],
    hero: {
      badge: { icon: 'arrow-right-left', text: 'Migration Guide' },
      title: 'Migrate from Gimmio to Siggly',
      description:
        'Gimmio generates individual email signatures that users copy and paste into their email clients. Siggly automates the entire process — design templates centrally, deploy them automatically, and update everyone instantly.',
      variant: 'violet',
    },
    stats: [
      { value: '< 30 min', label: 'Average migration time' },
      { value: '100%', label: 'Design style preserved' },
      { value: '99.9%', label: 'Successful migrations' },
    ],
    featuresTitle: 'Why Teams Migrate from Gimmio',
    features: [
      {
        icon: 'users',
        title: 'Team-Wide Deployment',
        description:
          'No more asking each employee to copy-paste their signature. Siggly pushes signatures directly to every inbox.',
      },
      {
        icon: 'refresh-cw',
        title: 'One-Click Updates',
        description:
          'Change a phone number, logo, or banner once and it updates across the entire organization automatically.',
      },
      {
        icon: 'shield',
        title: 'Brand Consistency Guaranteed',
        description:
          'Lock templates so users cannot modify their signatures. Ensure every email represents your brand correctly.',
      },
      {
        icon: 'bar-chart-3',
        title: 'Engagement Analytics',
        description:
          'Track how many people click your signature links. Gimmio offers no analytics capabilities.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'Step-by-Step Migration from Gimmio',
        steps: [
          {
            step: '1',
            title: 'Collect Current Signature Designs',
            description:
              'Log into Gimmio and note the designs your team is using. Copy the generated HTML for reference.',
          },
          {
            step: '2',
            title: 'Create Your Siggly Account',
            description:
              'Sign up for Siggly and connect your Google Workspace or Microsoft 365 tenant. Your user directory syncs automatically.',
          },
          {
            step: '3',
            title: 'Design a Master Template',
            description:
              'Build one template with dynamic fields for name, title, phone, and department. Siggly fills in each user\'s details automatically.',
          },
          {
            step: '4',
            title: 'Deploy to All Users',
            description:
              'Push the signature to your entire organization in one click. Users do not need to take any action — signatures update automatically.',
          },
        ],
      },
      {
        type: 'checklist',
        title: 'Pre-Migration Checklist',
        items: [
          'Screenshot or copy HTML of all Gimmio signatures currently in use',
          'Verify your Google Workspace or M365 directory is up to date',
          'Decide on a single unified template or department-specific designs',
          'Upload your company logo and brand assets to Siggly',
          'Identify any employees using custom signatures outside of Gimmio',
          'Communicate the upcoming change to your team',
        ],
      },
    ],
    testimonial: {
      quote:
        'We used Gimmio for years but every new hire meant another manual setup. Siggly automated the whole process — new employees get their signature on day one without anyone lifting a finger.',
      authorName: 'Anika Patel',
      authorTitle: 'HR Coordinator, Mosaic Consulting',
    },
    faqs: [
      {
        question: 'Can I recreate my Gimmio design in Siggly?',
        answer:
          'Yes. Siggly\'s template editor supports all the design elements Gimmio offers. You can also paste Gimmio\'s generated HTML directly into Siggly\'s custom HTML editor.',
      },
      {
        question: 'How fast is the migration?',
        answer:
          'Under 30 minutes for most teams. Gimmio has no server-side components, so migration is simply creating your template in Siggly and deploying it.',
      },
      {
        question: 'Do I need to uninstall anything?',
        answer:
          'No. Gimmio is a web-based generator — there is nothing to uninstall. Simply stop using it and let Siggly manage your signatures going forward.',
      },
      {
        question: 'Can I go back to Gimmio if needed?',
        answer:
          'Your Gimmio account remains accessible until you delete it. However, once you experience automated deployment, manual copy-paste feels outdated.',
      },
      {
        question: 'Is there any user training required?',
        answer:
          'None at all. Signatures deploy automatically to users\' email clients. Admins need about 10 minutes to learn Siggly\'s dashboard.',
      },
    ],
    cta: {
      title: 'Start Your Free Migration',
      description:
        'Switch to Siggly with zero downtime. Our team helps you every step of the way.',
    },
  },

  // ---------------------------------------------------------------------------
  // 11. Bybrand — Individual/team signature creator
  // ---------------------------------------------------------------------------
  {
    slug: 'bybrand',
    category: 'migrations',
    meta: {
      title: 'Migrate from Bybrand to Siggly | Guide',
      description:
        'Step-by-step guide to migrate from Bybrand to Siggly. Centralize your email signatures with automated deployment and real-time analytics.',
      keywords: [
        'migrate from Bybrand',
        'Bybrand migration',
        'Bybrand to Siggly',
        'switch from Bybrand',
        'Bybrand alternative migration',
      ],
      canonical: '/migrate-from/bybrand',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Migration Guides', url: '/migrate-from' },
      { name: 'Migrate from Bybrand', url: '/migrate-from/bybrand' },
    ],
    hero: {
      badge: { icon: 'arrow-right-left', text: 'Migration Guide' },
      title: 'Migrate from Bybrand to Siggly',
      description:
        'Bybrand offers signature creation with basic Google Workspace integration. Siggly goes further with full M365 support, advanced campaign management, and enterprise-grade analytics that Bybrand does not provide.',
      variant: 'indigo',
    },
    stats: [
      { value: '< 1 hr', label: 'Average migration time' },
      { value: '100%', label: 'Templates preserved' },
      { value: '99.8%', label: 'Successful migrations' },
    ],
    featuresTitle: 'Why Teams Migrate from Bybrand',
    features: [
      {
        icon: 'globe',
        title: 'Full M365 & Google Support',
        description:
          'Bybrand\'s M365 integration is limited. Siggly provides native deployment for both Google Workspace and Microsoft 365.',
      },
      {
        icon: 'bar-chart-3',
        title: 'Real-Time Analytics',
        description:
          'Track signature link clicks and banner impressions with live dashboards. Bybrand offers minimal reporting.',
      },
      {
        icon: 'image',
        title: 'Banner Campaign Management',
        description:
          'Schedule, target, and measure banner campaigns within signatures. Promote events, content, and offers automatically.',
      },
      {
        icon: 'lock',
        title: 'Template Locking',
        description:
          'Prevent users from editing their signatures. Maintain brand consistency that Bybrand\'s flexible model can undermine.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'Step-by-Step Migration from Bybrand',
        steps: [
          {
            step: '1',
            title: 'Export Bybrand Templates',
            description:
              'Log into Bybrand and copy the HTML for each signature template you have created. Download all associated images and logos.',
          },
          {
            step: '2',
            title: 'Set Up Siggly Workspace',
            description:
              'Create your Siggly account and connect it to Google Workspace and/or Microsoft 365. Sync your user directory.',
          },
          {
            step: '3',
            title: 'Import & Customize Templates',
            description:
              'Paste your Bybrand HTML into Siggly\'s editor or start with one of our professional templates. Add dynamic fields, banners, and conditional content.',
          },
          {
            step: '4',
            title: 'Deploy & Validate',
            description:
              'Push signatures to a pilot group first, then roll out to the entire organization. Verify rendering across Gmail, Outlook, and mobile.',
          },
          {
            step: '5',
            title: 'Disconnect Bybrand Integration',
            description:
              'Revoke Bybrand\'s API access in your Google Workspace admin console. Cancel your Bybrand subscription.',
          },
        ],
      },
      {
        type: 'benefits',
        title: 'What You Gain After Switching',
        items: [
          {
            icon: 'plug',
            title: 'True Cross-Platform Deployment',
            description:
              'Deploy signatures to Google Workspace and Microsoft 365 with equal functionality. No more platform limitations.',
          },
          {
            icon: 'target',
            title: 'Campaign-Ready Signatures',
            description:
              'Turn every email into a marketing touchpoint with scheduled banner campaigns, A/B testing, and click tracking.',
          },
          {
            icon: 'users',
            title: 'Scalable Team Management',
            description:
              'Manage hundreds or thousands of signatures from one dashboard. Department-based rules automate template assignments.',
          },
          {
            icon: 'trending-up',
            title: 'Actionable Insights',
            description:
              'See which signatures drive the most engagement. Use data to optimize your signature marketing strategy.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Bybrand worked for our Google Workspace setup, but when we added M365 for our sales team, it fell short. Siggly handles both platforms seamlessly.',
      authorName: 'Carlos Mendes',
      authorTitle: 'Technology Director, Atlas Digital Marketing',
    },
    faqs: [
      {
        question: 'How do I export my Bybrand templates?',
        answer:
          'In Bybrand, open each signature template and use the HTML editor to copy the source code. Download images from the asset library.',
      },
      {
        question: 'How long does the migration take?',
        answer:
          'Under an hour for most teams. Bybrand migrations are quick because there are no server-side components to remove.',
      },
      {
        question: 'Can I run Bybrand and Siggly together?',
        answer:
          'Not recommended for the same users. Both tools set Gmail signatures via API, so the last one to deploy wins. Migrate all users at once or by department.',
      },
      {
        question: 'How do I revoke Bybrand access?',
        answer:
          'In Google Workspace Admin Console, go to Security > API Controls > Third-Party App Access and revoke Bybrand\'s permissions.',
      },
      {
        question: 'Do users need training?',
        answer:
          'No. Signatures deploy automatically. Admins familiar with Bybrand will find Siggly\'s interface more powerful but equally intuitive.',
      },
    ],
    cta: {
      title: 'Start Your Free Migration',
      description:
        'Switch to Siggly with zero downtime. Our team helps you every step of the way.',
    },
  },

  // ---------------------------------------------------------------------------
  // 12. Sigstr (now Terminus Email Experiences) — Sales engagement signatures
  // ---------------------------------------------------------------------------
  {
    slug: 'sigstr',
    category: 'migrations',
    meta: {
      title: 'Migrate from Sigstr to Siggly | Guide',
      description:
        'How to migrate from Sigstr (Terminus) to Siggly. Transition your ABM signature campaigns to a more flexible and cost-effective platform.',
      keywords: [
        'migrate from Sigstr',
        'Sigstr migration',
        'Sigstr to Siggly',
        'Terminus email signatures',
        'switch from Sigstr',
      ],
      canonical: '/migrate-from/sigstr',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Migration Guides', url: '/migrate-from' },
      { name: 'Migrate from Sigstr', url: '/migrate-from/sigstr' },
    ],
    hero: {
      badge: { icon: 'arrow-right-left', text: 'Migration Guide' },
      title: 'Migrate from Sigstr to Siggly',
      description:
        'Sigstr (now part of Terminus) focuses on ABM-driven signature banners. Siggly delivers the same campaign capabilities with broader platform support, a better template editor, and pricing that does not require a full Terminus contract.',
      variant: 'slate',
    },
    stats: [
      { value: '< 3 hrs', label: 'Average migration time' },
      { value: '100%', label: 'Campaign assets transferable' },
      { value: '99.5%', label: 'Successful migrations' },
    ],
    featuresTitle: 'Why Teams Migrate from Sigstr',
    features: [
      {
        icon: 'unlink',
        title: 'No Terminus Lock-In',
        description:
          'Use Siggly independently. No need to purchase a full ABM platform just to manage email signature campaigns.',
      },
      {
        icon: 'layout',
        title: 'Better Template Design',
        description:
          'Siggly\'s drag-and-drop editor gives designers more control over layout, typography, and responsive behavior than Sigstr\'s template system.',
      },
      {
        icon: 'bar-chart-3',
        title: 'Campaign Analytics',
        description:
          'Track banner clicks, impressions, and engagement metrics. Export data to your CRM or BI platform via API.',
      },
      {
        icon: 'globe',
        title: 'Cross-Platform Support',
        description:
          'Sigstr focuses on Outlook/Exchange. Siggly supports Google Workspace, Microsoft 365, and hybrid environments.',
      },
      {
        icon: 'dollar-sign',
        title: 'Transparent Pricing',
        description:
          'Simple per-user pricing with no hidden fees or enterprise minimums. All features included at every tier.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'Step-by-Step Migration from Sigstr',
        steps: [
          {
            step: '1',
            title: 'Audit Active Campaigns',
            description:
              'Document all active Sigstr banner campaigns, including creative assets, targeting rules (account lists, segments), and performance benchmarks.',
          },
          {
            step: '2',
            title: 'Export Templates & Assets',
            description:
              'Download signature templates, banner images, and any custom HTML from the Sigstr admin panel. Export campaign performance reports for historical reference.',
          },
          {
            step: '3',
            title: 'Set Up Siggly Workspace',
            description:
              'Create your Siggly account and connect to Azure AD or Google Workspace. Set up user groups and department-based rules.',
          },
          {
            step: '4',
            title: 'Recreate Campaigns in Siggly',
            description:
              'Build your signature templates and banner campaigns in Siggly. Set up targeting rules by department, account list, or custom attributes.',
          },
          {
            step: '5',
            title: 'Validate with a Pilot Group',
            description:
              'Deploy Siggly to your most active email senders. Verify that signatures render correctly and campaign tracking fires properly.',
          },
          {
            step: '6',
            title: 'Decommission Sigstr & Go Live',
            description:
              'Remove the Sigstr Outlook add-in via your admin console. Disable any Sigstr API integrations. Roll Siggly out to all users.',
          },
        ],
      },
      {
        type: 'checklist',
        title: 'Pre-Migration Checklist',
        items: [
          'Export all active campaign creatives and schedules from Sigstr',
          'Download historical campaign performance reports',
          'Document Sigstr\'s Outlook add-in deployment configuration',
          'List all CRM integrations connected to Sigstr',
          'Verify Siggly user sync matches your directory',
          'Plan communication to sales and marketing teams about the switch',
          'Identify pilot users from your highest-volume email senders',
        ],
      },
    ],
    testimonial: {
      quote:
        'When Terminus acquired Sigstr, our costs ballooned. Siggly gave us the same signature campaign features without forcing us into an ABM platform we did not need.',
      authorName: 'Rachel Goldstein',
      authorTitle: 'Revenue Operations Manager, Summit Analytics',
    },
    faqs: [
      {
        question: 'Do I need a Terminus contract to use Sigstr?',
        answer:
          'Yes, Sigstr is now part of the Terminus platform. To continue using it, you need a Terminus subscription. Siggly offers the same signature campaign features as a standalone product.',
      },
      {
        question: 'How long does the migration take?',
        answer:
          'Typically 2-3 hours. Most of the time is spent recreating banner campaigns and validating targeting rules in Siggly.',
      },
      {
        question: 'Can I keep Sigstr running during the transition?',
        answer:
          'Yes. Sigstr\'s Outlook add-in and Siggly can coexist for different user groups. Avoid running both for the same user to prevent signature conflicts.',
      },
      {
        question: 'What happens to my ABM targeting data?',
        answer:
          'Sigstr\'s account-based targeting data stays in Terminus. In Siggly, you can set up similar targeting using CRM integrations, user groups, and custom attributes.',
      },
      {
        question: 'Will my sales team need training?',
        answer:
          'Sales reps need no training — signatures deploy automatically. Marketing and ops teams that manage campaigns will need about 30 minutes to learn Siggly\'s campaign builder.',
      },
    ],
    cta: {
      title: 'Start Your Free Migration',
      description:
        'Switch to Siggly with zero downtime. Our team helps you every step of the way.',
    },
  },
];
