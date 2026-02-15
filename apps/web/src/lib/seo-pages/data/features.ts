import type { SEOLandingPageData } from '../types';

export const featuresPages: SEOLandingPageData[] = [
  // ─── 1. Email Banner Campaigns ──────────────────────────────────────
  {
    slug: 'email-banner-campaigns',
    category: 'features',
    meta: {
      title: 'Email Banner Campaigns - Email Signature Management | Siggly',
      description:
        'Run targeted banner campaigns inside every employee email signature. Drive clicks, promote events, and boost brand awareness effortlessly.',
      keywords: [
        'email banner campaigns',
        'signature banner ads',
        'email marketing banners',
        'promotional email signatures',
      ],
      canonical: '/features/email-banner-campaigns',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Features', url: '/features' },
      { name: 'Email Banner Campaigns', url: '/features/email-banner-campaigns' },
    ],
    hero: {
      badge: { icon: 'image', text: 'Banner Campaigns' },
      title: 'Turn Every Email Into a Marketing Opportunity',
      description:
        'Embed clickable banners in employee signatures to promote campaigns, events, and content. Manage everything centrally and swap creatives in seconds.',
      variant: 'light',
    },
    stats: [
      { value: '32%', label: 'Average click-through lift on internal promotions' },
      { value: '10x', label: 'More impressions than social media posts' },
      { value: '5 min', label: 'To launch a company-wide banner campaign' },
    ],
    featuresTitle: 'Everything You Need for Signature Banner Campaigns',
    features: [
      {
        icon: 'image',
        title: 'Visual Banner Editor',
        description:
          'Design eye-catching banners with the built-in editor or upload your own creative assets in seconds.',
      },
      {
        icon: 'target',
        title: 'Audience Targeting',
        description:
          'Show different banners to different departments, regions, or teams for hyper-relevant messaging.',
      },
      {
        icon: 'calendar',
        title: 'Scheduled Campaigns',
        description:
          'Set start and end dates so banners appear and disappear automatically without manual intervention.',
      },
      {
        icon: 'bar-chart-3',
        title: 'Campaign Analytics',
        description:
          'Track impressions, clicks, and conversion rates for every banner across your entire organization.',
      },
      {
        icon: 'repeat',
        title: 'A/B Testing',
        description:
          'Run multiple banner variants simultaneously and let data decide which creative performs best.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'How Email Banner Campaigns Work',
        steps: [
          {
            step: '1',
            title: 'Upload Your Creative',
            description:
              'Upload a banner image or design one in the built-in editor. Set the destination URL and call-to-action text.',
          },
          {
            step: '2',
            title: 'Choose Your Audience',
            description:
              'Select which departments, teams, or individual users should display the banner in their signatures.',
          },
          {
            step: '3',
            title: 'Launch & Monitor',
            description:
              'Activate the campaign and watch real-time analytics as clicks and impressions roll in across every email.',
          },
        ],
      },
      {
        type: 'benefits',
        title: 'Why Signature Banners Outperform Traditional Channels',
        items: [
          {
            icon: 'eye',
            title: 'Guaranteed Visibility',
            description:
              'Every outgoing email displays your banner, ensuring your message is seen by clients and partners.',
          },
          {
            icon: 'zap',
            title: 'Zero Extra Cost',
            description:
              'Leverage email traffic you already have instead of paying for ads or sponsored placements.',
          },
          {
            icon: 'refresh-cw',
            title: 'Instant Updates',
            description:
              'Swap banners company-wide in real time. No waiting for IT tickets or manual deployments.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'We replaced our expensive display ad spend with signature banners and saw a 40% increase in webinar registrations within the first month.',
      authorName: 'Rachel Kim',
      authorTitle: 'VP of Marketing, Cloudbridge Solutions',
    },
    faqs: [
      {
        question: 'What image formats are supported for banners?',
        answer:
          'Siggly supports PNG, JPG, GIF, and WebP formats. We recommend using images that are 600px wide and between 80-150px tall for optimal display across email clients.',
      },
      {
        question: 'Can I run multiple banner campaigns at the same time?',
        answer:
          'Yes. You can schedule multiple campaigns targeting different departments or time periods. Siggly will display the highest-priority active campaign for each user.',
      },
      {
        question: 'Do banners work in all email clients?',
        answer:
          'Banner images render natively in all major email clients including Outlook, Gmail, Apple Mail, and Thunderbird. Clickable links are universally supported.',
      },
      {
        question: 'How quickly are banner changes reflected in signatures?',
        answer:
          'Changes propagate within minutes. The next email each employee sends will automatically include the updated banner without any action on their part.',
      },
      {
        question: 'Can I track which banner performs best?',
        answer:
          'Absolutely. The built-in analytics dashboard shows impressions, clicks, and click-through rates per banner, per campaign, and per department so you can optimize your messaging.',
      },
    ],
    cta: {
      title: 'Start Your First Banner Campaign Today',
      description:
        'Transform every employee email into a high-impact marketing channel. Launch targeted banner campaigns in minutes, not days.',
    },
  },

  // ─── 2. Click Tracking ──────────────────────────────────────────────
  {
    slug: 'click-tracking',
    category: 'features',
    meta: {
      title: 'Click Tracking - Email Signature Management | Siggly',
      description:
        'Track every click on your email signature links. Measure engagement, optimize CTAs, and prove ROI with detailed click analytics.',
      keywords: [
        'email signature click tracking',
        'signature link analytics',
        'email click metrics',
        'CTA tracking',
        'signature engagement',
      ],
      canonical: '/features/click-tracking',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Features', url: '/features' },
      { name: 'Click Tracking', url: '/features/click-tracking' },
    ],
    hero: {
      badge: { icon: 'mouse-pointer-click', text: 'Click Tracking' },
      title: 'Know Exactly What Gets Clicked in Every Signature',
      description:
        'Siggly tracks clicks on every link, banner, and social icon across all employee signatures. Get actionable data to refine your messaging and prove marketing ROI.',
      variant: 'dark',
    },
    stats: [
      { value: '100%', label: 'Link coverage across all signature elements' },
      { value: 'Real-time', label: 'Click data updated as events occur' },
      { value: '3.2x', label: 'Average ROI improvement with data-driven CTAs' },
    ],
    featuresTitle: 'Comprehensive Click Tracking Capabilities',
    features: [
      {
        icon: 'mouse-pointer-click',
        title: 'Link-Level Tracking',
        description:
          'Monitor clicks on every individual link in your signatures, from website URLs to social profiles and banners.',
      },
      {
        icon: 'line-chart',
        title: 'Trend Analysis',
        description:
          'Visualize click trends over time to understand when and how recipients engage with your signature content.',
      },
      {
        icon: 'filter',
        title: 'Advanced Filtering',
        description:
          'Slice and dice click data by department, user, link type, date range, or campaign for granular insights.',
      },
      {
        icon: 'send',
        title: 'UTM Parameter Support',
        description:
          'Automatically append UTM parameters to signature links so clicks flow into Google Analytics and your marketing stack.',
      },
      {
        icon: 'pie-chart',
        title: 'Engagement Breakdown',
        description:
          'See which signature elements drive the most engagement with visual breakdowns by link type and position.',
      },
      {
        icon: 'upload',
        title: 'Data Export',
        description:
          'Export click data as CSV or connect via API to feed your BI tools and custom reporting dashboards.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'How Click Tracking Works',
        steps: [
          {
            step: '1',
            title: 'Automatic Link Wrapping',
            description:
              'Siggly transparently wraps every signature link with a tracking redirect. No manual setup needed.',
          },
          {
            step: '2',
            title: 'Click Capture',
            description:
              'When a recipient clicks a link, the event is recorded with metadata including timestamp, link type, and source user.',
          },
          {
            step: '3',
            title: 'Dashboard Reporting',
            description:
              'View aggregated and individual click data in the analytics dashboard. Filter, compare, and export as needed.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Click tracking showed us that our case study links got 5x more clicks than generic website links. We restructured every signature around that insight.',
      authorName: 'David Park',
      authorTitle: 'Director of Growth, Nexgen Analytics',
    },
    faqs: [
      {
        question: 'Does click tracking slow down link redirects?',
        answer:
          'No. Our tracking redirect adds less than 50ms of latency, which is imperceptible to end users. Links open instantly.',
      },
      {
        question: 'Can I disable tracking for specific links?',
        answer:
          'Yes. You can mark any link as "no-track" in the template editor, and it will be excluded from click tracking while still appearing in the signature.',
      },
      {
        question: 'Is click data compliant with privacy regulations?',
        answer:
          'Siggly does not collect personally identifiable information about email recipients. Click tracking records aggregate engagement data tied to the sending user, not the recipient.',
      },
      {
        question: 'How long is click data retained?',
        answer:
          'Click data is retained for 12 months by default. Enterprise plans offer configurable retention periods up to 36 months.',
      },
    ],
    cta: {
      title: 'Start Tracking Signature Clicks Now',
      description:
        'Stop guessing which signature links drive results. Get real-time click analytics and optimize every email touchpoint.',
    },
  },

  // ─── 3. Analytics Dashboard ─────────────────────────────────────────
  {
    slug: 'analytics-dashboard',
    category: 'features',
    meta: {
      title: 'Analytics Dashboard - Email Signature Management | Siggly',
      description:
        'Visualize email signature performance with real-time dashboards. Track impressions, clicks, and engagement across your entire organization.',
      keywords: [
        'email signature analytics',
        'signature dashboard',
        'email engagement metrics',
        'signature performance tracking',
        'email ROI analytics',
      ],
      canonical: '/features/analytics-dashboard',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Features', url: '/features' },
      { name: 'Analytics Dashboard', url: '/features/analytics-dashboard' },
    ],
    hero: {
      badge: { icon: 'bar-chart-3', text: 'Analytics Dashboard' },
      title: 'See the Full Picture of Signature Performance',
      description:
        'A centralized analytics dashboard that surfaces impressions, clicks, and engagement trends across every employee signature. Make data-driven decisions at a glance.',
      variant: 'violet',
    },
    stats: [
      { value: '50+', label: 'Metrics tracked across signature engagement' },
      { value: '< 1s', label: 'Dashboard load time with real-time data' },
      { value: '87%', label: 'Of admins say the dashboard saves them hours weekly' },
    ],
    featuresTitle: 'A Dashboard Built for Signature Intelligence',
    features: [
      {
        icon: 'bar-chart-3',
        title: 'Real-Time Metrics',
        description:
          'Watch impressions and clicks update in real time as employees send emails throughout the day.',
      },
      {
        icon: 'trending-up',
        title: 'Trend Visualization',
        description:
          'Interactive line and bar charts show how engagement evolves over days, weeks, and months.',
      },
      {
        icon: 'users',
        title: 'Team Comparisons',
        description:
          'Compare signature performance across departments and teams to identify top performers and laggards.',
      },
      {
        icon: 'filter',
        title: 'Custom Date Ranges',
        description:
          'Filter analytics by any date range, campaign period, or business quarter for precise reporting.',
      },
      {
        icon: 'pie-chart',
        title: 'Engagement Heatmaps',
        description:
          'Visual heatmaps show which signature elements get the most interaction so you can optimize layout.',
      },
      {
        icon: 'upload',
        title: 'Scheduled Reports',
        description:
          'Automatically email PDF or CSV reports to stakeholders on a daily, weekly, or monthly schedule.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'How the Analytics Dashboard Works',
        steps: [
          {
            step: '1',
            title: 'Data Collection',
            description:
              'Every signature impression and click is automatically captured and aggregated in real time.',
          },
          {
            step: '2',
            title: 'Visual Dashboards',
            description:
              'Pre-built and customizable widgets display your most important metrics in an intuitive interface.',
          },
          {
            step: '3',
            title: 'Actionable Insights',
            description:
              'Drill into any metric to understand the underlying data and take action to improve performance.',
          },
        ],
      },
      {
        type: 'benefits',
        title: 'Why Teams Love the Analytics Dashboard',
        items: [
          {
            icon: 'eye',
            title: 'Complete Visibility',
            description:
              'No more guessing. See exactly how your signatures perform across the entire organization.',
          },
          {
            icon: 'zap',
            title: 'Faster Decisions',
            description:
              'Real-time data means you can spot trends and act on them immediately, not weeks later.',
          },
          {
            icon: 'target',
            title: 'Prove ROI',
            description:
              'Generate reports that quantify the marketing value of your email signature program for leadership.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'The analytics dashboard paid for itself in the first week. We discovered our sales team signatures were generating more leads than our paid LinkedIn campaign.',
      authorName: 'Sarah Chen',
      authorTitle: 'Marketing Director, Vantage Group',
    },
    faqs: [
      {
        question: 'What metrics does the dashboard track?',
        answer:
          'The dashboard tracks impressions, clicks, click-through rates, top-performing links, engagement by department, banner campaign performance, and more. All data can be filtered by date range and segment.',
      },
      {
        question: 'Can I create custom dashboard views?',
        answer:
          'Yes. You can create saved views with custom widget layouts, filters, and date ranges. Each team member can have their own personalized dashboard.',
      },
      {
        question: 'Is there an API for pulling analytics data?',
        answer:
          'Yes. Our REST API provides full access to all analytics data for integration with BI platforms like Tableau, Looker, or Power BI.',
      },
      {
        question: 'How far back does historical data go?',
        answer:
          'Analytics data is available from the day you start using Siggly. Free and Professional plans retain 12 months of history, and Enterprise plans offer unlimited retention.',
      },
      {
        question: 'Can I share dashboards with people outside my team?',
        answer:
          'Yes. You can generate shareable read-only links or schedule automated report emails to any address, even external stakeholders.',
      },
    ],
    cta: {
      title: 'Unlock Your Signature Analytics',
      description:
        'Get a real-time view of how your email signatures drive engagement and business results across your organization.',
    },
  },

  // ─── 4. Template Builder ────────────────────────────────────────────
  {
    slug: 'template-builder',
    category: 'features',
    meta: {
      title: 'Template Builder - Email Signature Management | Siggly',
      description:
        'Design professional email signatures with a drag-and-drop template builder. No coding required. Brand-consistent signatures in minutes.',
      keywords: [
        'email signature template builder',
        'signature designer',
        'drag and drop signature editor',
        'email signature creator',
        'brand signature templates',
      ],
      canonical: '/features/template-builder',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Features', url: '/features' },
      { name: 'Template Builder', url: '/features/template-builder' },
    ],
    hero: {
      badge: { icon: 'palette', text: 'Template Builder' },
      title: 'Design Stunning Signatures Without Writing Code',
      description:
        'The intuitive drag-and-drop template builder lets you create pixel-perfect, brand-consistent email signatures. Choose from professional templates or start from scratch.',
      variant: 'emerald',
    },
    stats: [
      { value: '50+', label: 'Professional templates to start from' },
      { value: '2 min', label: 'Average time to create a polished signature' },
      { value: '100%', label: 'Rendering consistency across email clients' },
    ],
    featuresTitle: 'Build Signatures Your Brand Deserves',
    features: [
      {
        icon: 'layout',
        title: 'Drag-and-Drop Editor',
        description:
          'Rearrange signature blocks visually. Move photos, text, social icons, and banners with simple drag-and-drop.',
      },
      {
        icon: 'palette',
        title: 'Brand Customization',
        description:
          'Set brand colors, fonts, and logo placement to ensure every signature matches your brand guidelines precisely.',
      },
      {
        icon: 'monitor',
        title: 'Live Preview',
        description:
          'See exactly how your signature will look in Outlook, Gmail, and Apple Mail with real-time multi-client preview.',
      },
      {
        icon: 'layers',
        title: 'Reusable Blocks',
        description:
          'Create modular content blocks like legal disclaimers, social links, or promo banners that can be shared across templates.',
      },
      {
        icon: 'sparkles',
        title: 'Dynamic Fields',
        description:
          'Insert merge fields that auto-populate with each employee name, title, phone number, and other directory data.',
      },
      {
        icon: 'globe',
        title: 'Multi-Language Support',
        description:
          'Create signature variants for different languages and regions. The right version is assigned automatically.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'How the Template Builder Works',
        steps: [
          {
            step: '1',
            title: 'Pick a Starting Point',
            description:
              'Choose from over 50 professionally designed templates or start with a blank canvas tailored to your layout needs.',
          },
          {
            step: '2',
            title: 'Customize Everything',
            description:
              'Adjust colors, fonts, spacing, images, and content blocks. Add dynamic fields to personalize for each employee.',
          },
          {
            step: '3',
            title: 'Publish Instantly',
            description:
              'Assign the template to your organization, a department, or specific users. Signatures update across all email clients.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Our design team was blown away by how easy the template builder is. We created five department-specific signatures in under an hour and they all look perfect in every email client.',
      authorName: 'Michael Torres',
      authorTitle: 'Brand Manager, Elevate Digital',
    },
    faqs: [
      {
        question: 'Do I need HTML or coding skills to use the template builder?',
        answer:
          'Not at all. The template builder is fully visual with drag-and-drop editing. However, power users can access the HTML source if they want fine-grained control.',
      },
      {
        question: 'Will my signatures look the same in every email client?',
        answer:
          'Yes. Siggly generates HTML that is tested against 50+ email clients. The live preview shows you exactly how it renders in each one before you publish.',
      },
      {
        question: 'Can I save templates as reusable starting points?',
        answer:
          'Absolutely. Save any template to your library and clone it later. This is ideal for creating department variations from a single base design.',
      },
      {
        question: 'How do dynamic fields work?',
        answer:
          'Dynamic fields are placeholders like {{name}} or {{title}} that automatically fill in with each employee data from your directory sync or user profile.',
      },
      {
        question: 'Can I upload custom fonts?',
        answer:
          'You can choose from a curated set of web-safe and Google Fonts that render consistently across email clients. Custom font uploads are available on Enterprise plans.',
      },
    ],
    cta: {
      title: 'Build Your First Signature Template',
      description:
        'Create professional, on-brand email signatures in minutes with the drag-and-drop template builder. No coding required.',
    },
  },

  // ─── 5. Directory Sync ──────────────────────────────────────────────
  {
    slug: 'directory-sync',
    category: 'features',
    meta: {
      title: 'Directory Sync - Email Signature Management | Siggly',
      description:
        'Automatically sync employee data from Azure AD, Google Workspace, and LDAP. Keep every email signature accurate and up to date.',
      keywords: [
        'directory sync email signatures',
        'Azure AD signature sync',
        'Google Workspace sync',
        'LDAP email signatures',
        'automated signature updates',
      ],
      canonical: '/features/directory-sync',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Features', url: '/features' },
      { name: 'Directory Sync', url: '/features/directory-sync' },
    ],
    hero: {
      badge: { icon: 'refresh-cw', text: 'Directory Sync' },
      title: 'Always-Accurate Signatures Powered by Your Directory',
      description:
        'Connect your identity provider and let Siggly automatically pull employee names, titles, phone numbers, and department data. No more manual updates when people change roles.',
      variant: 'indigo',
    },
    stats: [
      { value: '0', label: 'Manual updates needed after initial sync' },
      { value: '< 5 min', label: 'To connect your directory and start syncing' },
      { value: '99.9%', label: 'Data accuracy with automated sync' },
    ],
    featuresTitle: 'Seamless Directory Integration',
    features: [
      {
        icon: 'database',
        title: 'Multi-Provider Support',
        description:
          'Natively integrates with Azure AD, Google Workspace, Okta, and on-premises LDAP directories.',
      },
      {
        icon: 'refresh-cw',
        title: 'Auto-Sync Scheduling',
        description:
          'Set sync intervals from real-time to daily. Changes in your directory propagate to signatures automatically.',
      },
      {
        icon: 'user-check',
        title: 'Field Mapping',
        description:
          'Map any directory attribute to any signature field. Custom attributes and extensions are fully supported.',
      },
      {
        icon: 'shield',
        title: 'Secure Connection',
        description:
          'All data is transferred over encrypted channels with OAuth 2.0 or SAML authentication. No passwords stored.',
      },
      {
        icon: 'toggle-left',
        title: 'Selective Sync',
        description:
          'Choose which organizational units, groups, or users to sync. Exclude contractors, service accounts, or specific OUs.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'How Directory Sync Works',
        steps: [
          {
            step: '1',
            title: 'Connect Your Provider',
            description:
              'Authenticate with Azure AD, Google Workspace, or your LDAP server using secure OAuth or service account credentials.',
          },
          {
            step: '2',
            title: 'Map Fields',
            description:
              'Define how directory attributes like displayName, jobTitle, and department map to your signature template fields.',
          },
          {
            step: '3',
            title: 'Sync & Forget',
            description:
              'Enable auto-sync and every signature stays current. When someone gets promoted or switches teams, their signature updates automatically.',
          },
        ],
      },
      {
        type: 'checklist',
        title: 'Supported Directory Providers',
        items: [
          'Microsoft Azure Active Directory (Entra ID)',
          'Google Workspace Directory',
          'Okta Universal Directory',
          'On-premises Active Directory via LDAP',
          'OneLogin Directory',
          'Custom SCIM 2.0 endpoints',
        ],
      },
    ],
    testimonial: {
      quote:
        'We have 2,000 employees across 12 offices. Before Siggly, updating signatures after org changes was a nightmare. Now directory sync handles everything automatically.',
      authorName: 'James Liu',
      authorTitle: 'IT Director, Meridian Financial',
    },
    faqs: [
      {
        question: 'Which directory providers are supported?',
        answer:
          'Siggly supports Azure AD (Entra ID), Google Workspace, Okta, OneLogin, on-premises Active Directory via LDAP, and any SCIM 2.0-compliant provider.',
      },
      {
        question: 'How often does the sync run?',
        answer:
          'You can configure sync intervals from real-time (webhook-based) to hourly or daily. Most organizations use hourly sync, which catches all routine changes.',
      },
      {
        question: 'What happens when an employee leaves the company?',
        answer:
          'When a user is disabled or deleted in your directory, Siggly automatically deactivates their signature. No orphaned signatures remain active.',
      },
      {
        question: 'Can I override directory data for specific users?',
        answer:
          'Yes. Manual overrides take precedence over synced data. This is useful for executives who need custom titles or for employees with preferred names.',
      },
      {
        question: 'Is my directory data stored securely?',
        answer:
          'All synced data is encrypted at rest and in transit. Siggly only stores the fields you explicitly map. We never access or store passwords.',
      },
    ],
    cta: {
      title: 'Connect Your Directory Today',
      description:
        'Eliminate manual signature updates forever. Connect your identity provider and let Siggly keep every signature accurate automatically.',
    },
  },

  // ─── 6. Compliance Management ───────────────────────────────────────
  {
    slug: 'compliance-management',
    category: 'features',
    meta: {
      title: 'Compliance Management - Email Signature Management | Siggly',
      description:
        'Ensure every email signature meets legal and regulatory requirements. Automate disclaimers, enforce branding, and maintain audit trails.',
      keywords: [
        'email signature compliance',
        'legal disclaimer management',
        'regulatory email signatures',
        'signature audit trail',
        'brand compliance email',
      ],
      canonical: '/features/compliance-management',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Features', url: '/features' },
      { name: 'Compliance Management', url: '/features/compliance-management' },
    ],
    hero: {
      badge: { icon: 'shield-check', text: 'Compliance Management' },
      title: 'Every Signature Compliant, Every Time',
      description:
        'Centrally manage legal disclaimers, regulatory text, and brand guidelines across all employee signatures. Maintain a complete audit trail for governance reviews.',
      variant: 'slate',
    },
    stats: [
      { value: '100%', label: 'Signature compliance rate across the organization' },
      { value: '0', label: 'Non-compliant signatures slipping through' },
      { value: '70%', label: 'Reduction in legal review time for signature content' },
    ],
    featuresTitle: 'Complete Compliance Control',
    features: [
      {
        icon: 'shield-check',
        title: 'Mandatory Disclaimers',
        description:
          'Append required legal disclaimers, confidentiality notices, or regulatory text that employees cannot modify or remove.',
      },
      {
        icon: 'lock',
        title: 'Locked Template Regions',
        description:
          'Lock specific sections of the signature to prevent unauthorized edits while allowing personalization in other areas.',
      },
      {
        icon: 'file-text',
        title: 'Policy Templates',
        description:
          'Maintain a library of pre-approved compliance text for different jurisdictions, industries, and use cases.',
      },
      {
        icon: 'eye',
        title: 'Audit Trail',
        description:
          'Every signature change is logged with who made it and when. Generate audit reports for compliance reviews.',
      },
      {
        icon: 'globe',
        title: 'Regional Rules',
        description:
          'Apply different compliance rules by region or country. GDPR disclaimers for EU, CAN-SPAM for US, and more.',
      },
      {
        icon: 'check-circle',
        title: 'Approval Workflows',
        description:
          'Require manager or legal team approval before any signature template changes go live across the organization.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'How Compliance Management Works',
        steps: [
          {
            step: '1',
            title: 'Define Compliance Rules',
            description:
              'Set up mandatory disclaimers, locked regions, and regional rules for your organization. Import existing policy text.',
          },
          {
            step: '2',
            title: 'Enforce Automatically',
            description:
              'Rules are applied to every signature automatically. Employees see compliant signatures without needing to understand the policies.',
          },
          {
            step: '3',
            title: 'Monitor & Audit',
            description:
              'Review the audit trail, generate compliance reports, and demonstrate adherence during regulatory reviews.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Our legal team used to spend days checking signatures before audits. With Siggly, we generate a compliance report in 30 seconds and every signature is guaranteed compliant.',
      authorName: 'Amanda Foster',
      authorTitle: 'General Counsel, Sterling & Associates',
    },
    faqs: [
      {
        question: 'Can employees bypass compliance rules?',
        answer:
          'No. Mandatory disclaimers and locked template regions cannot be modified by end users. Only administrators with the appropriate role can change compliance settings.',
      },
      {
        question: 'How do I handle different legal requirements in different countries?',
        answer:
          'Siggly supports regional compliance rules. You can define different disclaimer text and compliance policies for each country or region, and they are applied automatically based on user location.',
      },
      {
        question: 'What does the audit trail capture?',
        answer:
          'The audit trail records every template change, compliance rule modification, user assignment, and approval workflow action with timestamps and the identity of the person who made the change.',
      },
      {
        question: 'Can I require approval before signature changes go live?',
        answer:
          'Yes. You can configure approval workflows that require sign-off from legal, compliance, or management before any template modifications are deployed to users.',
      },
    ],
    cta: {
      title: 'Take Control of Signature Compliance',
      description:
        'Eliminate compliance risks with automated disclaimers, locked templates, and a complete audit trail for every email signature.',
    },
  },

  // ─── 7. Department Segmentation ─────────────────────────────────────
  {
    slug: 'department-segmentation',
    category: 'features',
    meta: {
      title: 'Department Segmentation - Email Signature Management | Siggly',
      description:
        'Assign unique email signature templates by department, team, or office. Ensure each group has the right branding and messaging.',
      keywords: [
        'department email signatures',
        'team signature templates',
        'signature segmentation',
        'department branding email',
        'group signature management',
      ],
      canonical: '/features/department-segmentation',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Features', url: '/features' },
      { name: 'Department Segmentation', url: '/features/department-segmentation' },
    ],
    hero: {
      badge: { icon: 'users', text: 'Department Segmentation' },
      title: 'The Right Signature for Every Team',
      description:
        'Assign tailored email signature templates to departments, teams, offices, or custom groups. Each segment gets its own branding, messaging, and promotional content.',
      variant: 'light',
    },
    stats: [
      { value: 'Unlimited', label: 'Segments and groups you can create' },
      { value: '85%', label: 'Less time managing per-department signatures' },
      { value: '1-click', label: 'To reassign users between segments' },
    ],
    featuresTitle: 'Powerful Segmentation Capabilities',
    features: [
      {
        icon: 'users',
        title: 'Group-Based Assignment',
        description:
          'Assign signature templates to Active Directory groups, departments, or custom user segments with a few clicks.',
      },
      {
        icon: 'layers',
        title: 'Template Inheritance',
        description:
          'Create a base template and let departments override specific sections while keeping core branding consistent.',
      },
      {
        icon: 'settings',
        title: 'Rule-Based Routing',
        description:
          'Define rules that automatically assign templates based on department, location, job title, or custom attributes.',
      },
      {
        icon: 'target',
        title: 'Targeted Campaigns',
        description:
          'Run banner campaigns that only appear in specific department signatures for relevant, targeted messaging.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'How Department Segmentation Works',
        steps: [
          {
            step: '1',
            title: 'Create Segments',
            description:
              'Define segments based on departments, teams, offices, or custom attributes. Import groups from your directory or create them manually.',
          },
          {
            step: '2',
            title: 'Assign Templates',
            description:
              'Link each segment to a signature template. Customize branding, messaging, and promotional content per group.',
          },
          {
            step: '3',
            title: 'Automatic Routing',
            description:
              'When employees are added to a segment or change departments, their signature updates automatically to match.',
          },
        ],
      },
      {
        type: 'benefits',
        title: 'Benefits of Department Segmentation',
        items: [
          {
            icon: 'palette',
            title: 'Tailored Branding',
            description:
              'Sales gets a direct booking link, support gets a help desk URL, and marketing gets the latest campaign banner.',
          },
          {
            icon: 'zap',
            title: 'Zero Manual Work',
            description:
              'Directory sync automatically routes new hires to the correct segment based on their department or team.',
          },
          {
            icon: 'shield',
            title: 'Consistent Governance',
            description:
              'Core branding and compliance elements stay locked while allowing department-level customization.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Each of our 8 departments now has a unique signature that reflects their function while staying on brand. Our CEO said it is the most polished our communications have ever looked.',
      authorName: 'Lisa Nguyen',
      authorTitle: 'Head of Communications, Atlas Ventures',
    },
    faqs: [
      {
        question: 'Can a user belong to multiple segments?',
        answer:
          'Yes. When a user belongs to multiple segments, you can set priority rules to determine which template they receive. The highest-priority segment wins.',
      },
      {
        question: 'How does segmentation work with directory sync?',
        answer:
          'Segments can be mapped directly to directory groups or OUs. When someone moves departments in your directory, their signature template updates automatically on the next sync.',
      },
      {
        question: 'Can department admins manage their own templates?',
        answer:
          'Yes. You can delegate template management to department leads while keeping global branding and compliance controls at the admin level.',
      },
      {
        question: 'Is there a limit to how many segments I can create?',
        answer:
          'No. You can create as many segments as your organization needs. There is no limit on segments, templates, or assignment rules.',
      },
      {
        question: 'Can I preview what each department signature looks like?',
        answer:
          'Absolutely. The admin panel lets you preview the signature for any user or department before publishing changes.',
      },
    ],
    cta: {
      title: 'Segment Your Signatures by Department',
      description:
        'Give every team a tailored email signature that matches their function and audience while maintaining brand consistency.',
    },
  },

  // ─── 8. Scheduled Deployments ───────────────────────────────────────
  {
    slug: 'scheduled-deployments',
    category: 'features',
    meta: {
      title: 'Scheduled Deployments - Email Signature Management | Siggly',
      description:
        'Schedule email signature updates for future dates. Coordinate launches with campaigns, rebrands, and organizational changes seamlessly.',
      keywords: [
        'scheduled signature deployment',
        'timed signature updates',
        'signature rollout scheduling',
        'email signature automation',
        'planned signature changes',
      ],
      canonical: '/features/scheduled-deployments',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Features', url: '/features' },
      { name: 'Scheduled Deployments', url: '/features/scheduled-deployments' },
    ],
    hero: {
      badge: { icon: 'calendar', text: 'Scheduled Deployments' },
      title: 'Deploy Signature Changes on Your Schedule',
      description:
        'Plan and schedule signature updates to go live at a specific date and time. Coordinate with rebrands, campaign launches, and organizational announcements.',
      variant: 'dark',
    },
    stats: [
      { value: '100%', label: 'On-time deployment accuracy' },
      { value: '0', label: 'Weekend or after-hours manual work required' },
      { value: '60%', label: 'Faster rebrand rollouts with scheduled deployments' },
    ],
    featuresTitle: 'Schedule, Preview, and Deploy with Confidence',
    features: [
      {
        icon: 'calendar',
        title: 'Date & Time Scheduling',
        description:
          'Set the exact date and time for signature updates to go live, down to the minute, in any timezone.',
      },
      {
        icon: 'eye',
        title: 'Pre-Deploy Preview',
        description:
          'Preview exactly what the new signature will look like before the scheduled deployment goes live.',
      },
      {
        icon: 'repeat',
        title: 'Automatic Rollback',
        description:
          'Set an end date to automatically revert signatures to the previous version after a campaign ends.',
      },
      {
        icon: 'clock',
        title: 'Timezone Awareness',
        description:
          'Deploy at the right local time for each office. A 9 AM launch means 9 AM in every timezone you choose.',
      },
      {
        icon: 'layers',
        title: 'Staged Rollouts',
        description:
          'Deploy to a pilot group first, then gradually roll out to the rest of the organization on a schedule.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'How Scheduled Deployments Work',
        steps: [
          {
            step: '1',
            title: 'Prepare Your Update',
            description:
              'Create or modify a signature template with all the changes you want to deploy. Save it as a draft.',
          },
          {
            step: '2',
            title: 'Set the Schedule',
            description:
              'Choose the deployment date, time, and timezone. Optionally set an end date for automatic rollback.',
          },
          {
            step: '3',
            title: 'Sit Back and Relax',
            description:
              'Siggly deploys the update at the scheduled time. No manual intervention needed. Monitor the rollout in real time.',
          },
        ],
      },
      {
        type: 'checklist',
        title: 'Perfect For',
        items: [
          'Company rebrands and logo changes',
          'Seasonal promotional campaigns',
          'Product launch announcements',
          'Event and webinar promotions',
          'Regulatory disclaimer updates',
          'New year contact information refreshes',
        ],
      },
    ],
    testimonial: {
      quote:
        'We scheduled our rebrand signature rollout for midnight on launch day. Every employee woke up with the new branding. Zero tickets to IT, zero confusion.',
      authorName: 'Chris Okafor',
      authorTitle: 'CTO, BrightPath Technologies',
    },
    faqs: [
      {
        question: 'Can I schedule multiple deployments in advance?',
        answer:
          'Yes. You can queue up as many scheduled deployments as you need. They execute in chronological order, and you can see the full schedule in the deployment timeline view.',
      },
      {
        question: 'What happens if I need to cancel a scheduled deployment?',
        answer:
          'You can cancel any pending deployment at any time before its scheduled execution. Simply find it in the deployment queue and click cancel.',
      },
      {
        question: 'Can I roll out changes gradually instead of all at once?',
        answer:
          'Yes. Staged rollouts let you deploy to a percentage of users first, monitor for issues, and then expand to the full organization on a set schedule.',
      },
      {
        question: 'Does the rollback feature require any manual steps?',
        answer:
          'No. When you set an end date during scheduling, the rollback happens automatically. Signatures revert to the previous version at the specified time.',
      },
    ],
    cta: {
      title: 'Schedule Your Next Signature Deployment',
      description:
        'Coordinate signature updates with your business calendar. Schedule deployments in advance and let automation handle the rest.',
    },
  },

  // ─── 9. Signature Versioning ────────────────────────────────────────
  {
    slug: 'signature-versioning',
    category: 'features',
    meta: {
      title: 'Signature Versioning - Email Signature Management | Siggly',
      description:
        'Track every change to your email signature templates with full version history. Compare versions, roll back instantly, and maintain control.',
      keywords: [
        'email signature version control',
        'signature history tracking',
        'template versioning',
        'signature rollback',
        'change management email signatures',
      ],
      canonical: '/features/signature-versioning',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Features', url: '/features' },
      { name: 'Signature Versioning', url: '/features/signature-versioning' },
    ],
    hero: {
      badge: { icon: 'layers', text: 'Signature Versioning' },
      title: 'Full Version History for Every Signature Template',
      description:
        'Every edit is saved. Compare any two versions side-by-side, see who changed what and when, and roll back to any previous version with a single click.',
      variant: 'violet',
    },
    stats: [
      { value: 'Unlimited', label: 'Version history retained for every template' },
      { value: '1-click', label: 'To roll back to any previous version' },
      { value: '100%', label: 'Change attribution with user and timestamp' },
    ],
    featuresTitle: 'Complete Version Control for Signatures',
    features: [
      {
        icon: 'layers',
        title: 'Automatic Versioning',
        description:
          'Every save creates a new version automatically. No manual snapshots needed. Your full history is always available.',
      },
      {
        icon: 'eye',
        title: 'Side-by-Side Comparison',
        description:
          'Compare any two versions visually to see exactly what changed in layout, text, images, and settings.',
      },
      {
        icon: 'refresh-cw',
        title: 'Instant Rollback',
        description:
          'Revert to any previous version with one click. The rollback deploys immediately across all assigned users.',
      },
      {
        icon: 'user-check',
        title: 'Change Attribution',
        description:
          'See who made each change and when. Ideal for governance, auditing, and understanding the evolution of your templates.',
      },
      {
        icon: 'file-text',
        title: 'Version Notes',
        description:
          'Add notes to any version explaining why the change was made. Build institutional knowledge into your template history.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'How Signature Versioning Works',
        steps: [
          {
            step: '1',
            title: 'Edit Your Template',
            description:
              'Make any change to a signature template. When you save, a new version is created automatically with a timestamp.',
          },
          {
            step: '2',
            title: 'Browse History',
            description:
              'Open the version timeline to see every change ever made. Preview any version or compare two versions side by side.',
          },
          {
            step: '3',
            title: 'Roll Back If Needed',
            description:
              'Found a problem? Click rollback on any previous version and it becomes the active template instantly.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'A team member accidentally deleted our legal disclaimer from the signature. With versioning, we spotted the change in the audit log and rolled back in 10 seconds flat.',
      authorName: 'Patricia Hernandez',
      authorTitle: 'IT Operations Manager, Summit Healthcare',
    },
    faqs: [
      {
        question: 'How many versions are stored?',
        answer:
          'Siggly stores unlimited version history for every template. You can browse, compare, and roll back to any version regardless of how old it is.',
      },
      {
        question: 'Can I compare two non-adjacent versions?',
        answer:
          'Yes. The comparison tool lets you select any two versions, not just consecutive ones. This is useful for understanding cumulative changes over time.',
      },
      {
        question: 'Does rolling back affect users immediately?',
        answer:
          'Yes. A rollback creates a new version that becomes the active template. Users receive the rolled-back signature on their next email, typically within minutes.',
      },
      {
        question: 'Can I add notes to explain why a change was made?',
        answer:
          'Yes. You can add version notes at save time or retroactively. Notes appear in the version timeline alongside the change details.',
      },
      {
        question: 'Is version history included in audit reports?',
        answer:
          'Yes. Version history feeds directly into compliance audit reports, showing the full chain of changes for any template.',
      },
    ],
    cta: {
      title: 'Never Lose a Signature Version Again',
      description:
        'Track every change, compare versions side by side, and roll back mistakes instantly. Full version control for your email signatures.',
    },
  },

  // ─── 10. Role-Based Access Control ──────────────────────────────────
  {
    slug: 'role-based-access-control',
    category: 'features',
    meta: {
      title: 'Role-Based Access Control - Email Signature Management | Siggly',
      description:
        'Control who can view, edit, and deploy email signatures with granular role-based permissions. Secure your signature management workflow.',
      keywords: [
        'role-based access control signatures',
        'RBAC email management',
        'signature permissions',
        'admin roles email signatures',
        'granular access control',
        'signature security',
      ],
      canonical: '/features/role-based-access-control',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Features', url: '/features' },
      { name: 'Role-Based Access Control', url: '/features/role-based-access-control' },
    ],
    hero: {
      badge: { icon: 'key', text: 'Role-Based Access Control' },
      title: 'The Right Permissions for Every Team Member',
      description:
        'Define granular roles and permissions so the right people can manage the right signatures. From global admins to department editors to view-only auditors.',
      variant: 'emerald',
    },
    stats: [
      { value: '5+', label: 'Built-in roles ready to assign out of the box' },
      { value: '100%', label: 'Of actions governed by permission checks' },
      { value: '0', label: 'Unauthorized changes with proper RBAC in place' },
    ],
    featuresTitle: 'Granular Permission Management',
    features: [
      {
        icon: 'key',
        title: 'Predefined Roles',
        description:
          'Start with built-in roles: Global Admin, Template Editor, Department Manager, Viewer, and Auditor. Customize as needed.',
      },
      {
        icon: 'settings',
        title: 'Custom Roles',
        description:
          'Create custom roles with fine-grained permissions. Control access to templates, deployments, analytics, users, and compliance settings independently.',
      },
      {
        icon: 'users',
        title: 'Group Assignment',
        description:
          'Assign roles to directory groups or individual users. When someone joins a group, they inherit its permissions automatically.',
      },
      {
        icon: 'shield',
        title: 'Permission Boundaries',
        description:
          'Scope permissions by department or region. A department admin can only manage signatures for their own department.',
      },
      {
        icon: 'eye',
        title: 'Access Audit Log',
        description:
          'Every permission change and access event is logged. Review who has access to what and when permissions were modified.',
      },
      {
        icon: 'lock',
        title: 'SSO Integration',
        description:
          'Roles sync with your identity provider. SAML and OIDC integration ensures access is always aligned with your directory.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'How Role-Based Access Control Works',
        steps: [
          {
            step: '1',
            title: 'Define Roles',
            description:
              'Use built-in roles or create custom ones. Set permissions for templates, deployments, analytics, users, and compliance.',
          },
          {
            step: '2',
            title: 'Assign to Users',
            description:
              'Assign roles to individuals or directory groups. Scope by department or region to limit access boundaries.',
          },
          {
            step: '3',
            title: 'Enforce & Monitor',
            description:
              'Siggly enforces permissions on every action. Review the access audit log to ensure governance compliance.',
          },
        ],
      },
      {
        type: 'benefits',
        title: 'Why RBAC Matters for Signature Management',
        items: [
          {
            icon: 'shield',
            title: 'Prevent Unauthorized Changes',
            description:
              'Only authorized users can modify templates, deploy changes, or alter compliance settings.',
          },
          {
            icon: 'users',
            title: 'Delegate Safely',
            description:
              'Give department leads the power to manage their own signatures without risking global settings.',
          },
          {
            icon: 'check-circle',
            title: 'Simplify Audits',
            description:
              'Demonstrate clear access controls and permission boundaries during security and compliance audits.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'RBAC was the deciding factor for us. We needed marketing to own their banners, IT to manage deployments, and legal to control disclaimers. Siggly made that possible without any conflicts.',
      authorName: 'Robert Chang',
      authorTitle: 'CISO, Pinnacle Enterprises',
    },
    faqs: [
      {
        question: 'What built-in roles are available?',
        answer:
          'Siggly includes Global Admin, Template Editor, Department Manager, Viewer, and Auditor roles out of the box. Each has a predefined set of permissions that covers common organizational needs.',
      },
      {
        question: 'Can I create custom roles with specific permissions?',
        answer:
          'Yes. Custom roles let you mix and match permissions across templates, deployments, analytics, user management, and compliance. You have full control over what each role can do.',
      },
      {
        question: 'How do roles integrate with my identity provider?',
        answer:
          'Roles can be mapped to groups in Azure AD, Google Workspace, Okta, or any SAML/OIDC provider. When group membership changes in your directory, Siggly permissions update automatically.',
      },
      {
        question: 'Can a user have multiple roles?',
        answer:
          'Yes. When a user has multiple roles, they receive the combined permissions of all assigned roles. This allows flexible permission modeling without creating dozens of custom roles.',
      },
      {
        question: 'Is there an audit log for permission changes?',
        answer:
          'Yes. Every role assignment, permission change, and access event is recorded in the audit log with the identity of who made the change and a timestamp.',
      },
    ],
    cta: {
      title: 'Secure Your Signature Management Workflow',
      description:
        'Implement granular role-based access control to ensure the right people manage the right signatures with full accountability.',
    },
  },

  // ─── HTML Signature Editor ─────────────────────────────────────────
  {
    slug: 'html-signature-editor',
    category: 'features',
    meta: {
      title: 'HTML Signature Editor with Live Preview | Siggly',
      description:
        'Edit email signature HTML with a full code editor, live preview, and template variables. Test cross-client rendering before deploying to your organization.',
      keywords: [
        'HTML signature editor',
        'email signature code editor',
        'live preview signatures',
        'responsive email signature HTML',
      ],
      canonical: '/features/html-signature-editor',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Features', url: '/features' },
      { name: 'HTML Signature Editor', url: '/features/html-signature-editor' },
    ],
    hero: {
      badge: { icon: 'code', text: 'HTML Editor' },
      title: 'Full Control Over Your Signature HTML',
      description:
        'For teams that want pixel-perfect control, the HTML Signature Editor gives you a full code editor with syntax highlighting, template variable insertion, and a real-time preview pane that shows exactly how your signature renders.',
      variant: 'slate',
    },
    stats: [
      { value: '30+', label: 'Email clients tested' },
      { value: '100%', label: 'HTML & CSS control' },
      { value: 'Live', label: 'Real-time preview rendering' },
    ],
    featuresTitle: 'HTML Editor Capabilities',
    features: [
      {
        icon: 'code',
        title: 'Syntax-Highlighted Code Editor',
        description:
          'Write and edit HTML with full syntax highlighting, auto-completion, and error detection in a professional-grade code editor.',
      },
      {
        icon: 'eye',
        title: 'Live Preview Pane',
        description:
          'See your signature render in real time as you type. Toggle between desktop and mobile views to verify responsive behavior.',
      },
      {
        icon: 'wand-2',
        title: 'Template Variable Insertion',
        description:
          'Insert dynamic variables like {{name}}, {{title}}, and {{phone}} that are replaced with real employee data at deployment time.',
      },
      {
        icon: 'monitor',
        title: 'Cross-Client Testing',
        description:
          'Preview how your signature looks in Gmail, Outlook, Apple Mail, and other popular clients before deploying to your team.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'Using the HTML Signature Editor',
        steps: [
          {
            step: '1',
            title: 'Open the Code Editor',
            description:
              'Switch to HTML mode from any template. Paste existing HTML or start from scratch with a clean boilerplate.',
          },
          {
            step: '2',
            title: 'Write and Preview',
            description:
              'Edit your HTML in the left pane while the right pane shows a live, rendered preview. Insert template variables from the sidebar.',
          },
          {
            step: '3',
            title: 'Test and Deploy',
            description:
              'Run the cross-client preview to check rendering across email clients, then deploy to your team with one click.',
          },
        ],
      },
      {
        type: 'checklist',
        title: 'Editor Features at a Glance',
        items: [
          'Full HTML and inline CSS support',
          'Template variable auto-completion',
          'Desktop and mobile preview toggle',
          'Cross-client rendering preview',
          'Import and export raw HTML',
          'Version history for every edit',
        ],
      },
    ],
    testimonial: {
      quote:
        'Our design team needed full HTML control, not just drag-and-drop. The Siggly code editor gave us exactly that, plus live preview so we could iterate without constant test emails.',
      authorName: 'Liam Novak',
      authorTitle: 'Front-End Lead, DigitalCraft Agency',
    },
    faqs: [
      {
        question: 'Can I paste HTML from an external editor?',
        answer:
          'Yes. Paste any valid HTML into the code editor. Siggly will validate it and highlight any issues that might affect email client rendering.',
      },
      {
        question: 'Does the editor support inline CSS?',
        answer:
          'Yes. Inline CSS is fully supported and recommended for email signatures. The editor can also inline CSS from style blocks automatically.',
      },
      {
        question: 'Are there HTML templates I can start from?',
        answer:
          'Siggly includes a library of starter HTML templates. You can also convert any drag-and-drop template to HTML for further customization.',
      },
    ],
    cta: {
      title: 'Build Pixel-Perfect Signatures in HTML',
      description:
        'Take full control of your email signature code with a professional editor, live preview, and cross-client testing.',
    },
  },

  // ─── Signature Approval Workflows ──────────────────────────────────
  {
    slug: 'signature-approval-workflows',
    category: 'features',
    meta: {
      title: 'Signature Approval Workflows & Compliance Review | Siggly',
      description:
        'Set up manager approvals, compliance reviews, and staged rollouts for email signature changes. Maintain an audit trail for every signature update.',
      keywords: [
        'signature approval workflow',
        'email signature compliance',
        'signature change management',
        'approval chain signatures',
      ],
      canonical: '/features/signature-approval-workflows',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Features', url: '/features' },
      { name: 'Signature Approval Workflows', url: '/features/signature-approval-workflows' },
    ],
    hero: {
      badge: { icon: 'file-check', text: 'Approval Workflows' },
      title: 'No Signature Goes Live Without Proper Approval',
      description:
        'Define multi-step approval chains so every signature change is reviewed by the right people before deployment. Managers, compliance officers, and brand guardians all get their say.',
      variant: 'indigo',
    },
    featuresTitle: 'Approval Workflow Features',
    features: [
      {
        icon: 'file-check',
        title: 'Multi-Step Approval Chains',
        description:
          'Configure sequential or parallel approval steps. Require manager sign-off first, then compliance review, then brand approval before any signature goes live.',
      },
      {
        icon: 'shield-check',
        title: 'Compliance Review Gates',
        description:
          'Add mandatory compliance review steps for signatures that contain legal disclaimers, regulatory text, or confidentiality notices.',
      },
      {
        icon: 'layers',
        title: 'Staged Rollouts',
        description:
          'Deploy approved signatures to a pilot group first, then roll out to the full organization after validation. Catch issues before they reach everyone.',
      },
      {
        icon: 'file-text',
        title: 'Full Audit Trail',
        description:
          'Every approval, rejection, and modification is logged with timestamps and user identity. Export audit logs for compliance reporting.',
      },
      {
        icon: 'mail',
        title: 'Email & Slack Notifications',
        description:
          'Reviewers receive instant notifications when a signature is pending their approval, with one-click approve or reject actions.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'How Approval Workflows Operate',
        steps: [
          {
            step: '1',
            title: 'Submit a Change',
            description:
              'A template editor or department admin submits a new or modified signature template for approval.',
          },
          {
            step: '2',
            title: 'Review Chain Begins',
            description:
              'Designated reviewers receive a notification and can preview the signature, leave comments, or request changes.',
          },
          {
            step: '3',
            title: 'Approve and Deploy',
            description:
              'Once all required approvals are granted, the signature is either deployed automatically or queued for a staged rollout.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Can I set different approval chains for different departments?',
        answer:
          'Yes. Each department or team can have its own approval workflow with different reviewers and approval requirements.',
      },
      {
        question: 'What happens if an approver is unavailable?',
        answer:
          'You can configure delegate approvers or escalation rules that automatically route pending approvals to a backup reviewer after a configurable timeout.',
      },
      {
        question: 'Can I bypass approval for minor changes?',
        answer:
          'Yes. Define which types of changes require approval and which can be deployed immediately. For example, phone number updates might skip review while template redesigns require full approval.',
      },
      {
        question: 'Are approval audit logs exportable?',
        answer:
          'Yes. Export audit logs as CSV or PDF for compliance reporting, internal reviews, or regulatory audits.',
      },
    ],
    cta: {
      title: 'Add Governance to Your Signature Process',
      description:
        'Ensure every email signature meets your brand and compliance standards before it reaches a single inbox.',
    },
  },

  // ─── Social Media Icons ────────────────────────────────────────────
  {
    slug: 'social-media-icons',
    category: 'features',
    meta: {
      title: 'Social Media Icons for Email Signatures | Siggly',
      description:
        'Add professionally designed social media icons to email signatures. Support for 30+ platforms with link validation, UTM tracking, and custom icon uploads.',
      keywords: [
        'social media icons signatures',
        'email signature social links',
        'social media email footer',
        'signature icon library',
      ],
      canonical: '/features/social-media-icons',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Features', url: '/features' },
      { name: 'Social Media Icons', url: '/features/social-media-icons' },
    ],
    hero: {
      badge: { icon: 'link', text: 'Social Icons' },
      title: 'Connect Every Email to Your Social Presence',
      description:
        'Add polished social media icons to your email signatures with support for LinkedIn, Twitter/X, Instagram, YouTube, and 30+ more platforms. Track clicks and validate links automatically.',
      variant: 'light',
    },
    stats: [
      { value: '30+', label: 'Social platforms supported' },
      { value: '5', label: 'Icon style sets included' },
      { value: '22%', label: 'Average social follower lift' },
    ],
    featuresTitle: 'Social Media Icon Features',
    features: [
      {
        icon: 'grid',
        title: 'Curated Icon Library',
        description:
          'Choose from five professionally designed icon sets: filled, outline, rounded, square, and minimal. All sets cover 30+ social platforms.',
      },
      {
        icon: 'upload',
        title: 'Custom Icon Uploads',
        description:
          'Upload your own icons for niche platforms, internal social networks, or branded icon styles that match your design system.',
      },
      {
        icon: 'check-circle',
        title: 'Link Validation',
        description:
          'Siggly checks every social link to ensure it resolves correctly. Broken or redirected URLs are flagged before deployment.',
      },
      {
        icon: 'tag',
        title: 'UTM Tracking',
        description:
          'Automatically append UTM parameters to social links so you can track which signatures and employees drive the most social traffic.',
      },
    ],
    sections: [
      {
        type: 'benefits',
        title: 'Why Social Icons Matter in Signatures',
        items: [
          {
            icon: 'trending-up',
            title: 'Grow Your Following',
            description:
              'Every email becomes a passive invitation to connect on social media. Teams with social icons in signatures see measurable follower growth.',
          },
          {
            icon: 'palette',
            title: 'Brand-Consistent Styling',
            description:
              'Social icons match your brand colors and signature design. No more mismatched icon styles from random internet downloads.',
          },
          {
            icon: 'bar-chart-3',
            title: 'Click Analytics',
            description:
              'See which social platforms get the most clicks from your signatures and adjust your social strategy accordingly.',
          },
        ],
      },
      {
        type: 'use-cases-grid',
        title: 'Social Icon Use Cases',
        cases: [
          {
            title: 'Sales Teams',
            description:
              'Link to LinkedIn profiles so prospects can learn more about their sales rep and build trust before a meeting.',
          },
          {
            title: 'Marketing Teams',
            description:
              'Drive followers to company social accounts with branded icons that match the latest campaign creative.',
          },
          {
            title: 'Executive Profiles',
            description:
              'Link executives to their personal LinkedIn, Twitter/X, or company blog to amplify thought leadership.',
          },
        ],
      },
    ],
    cta: {
      title: 'Add Social Icons to Every Signature',
      description:
        'Grow your social presence with every email your team sends. Choose from curated icon sets or upload your own.',
    },
  },

  // ─── Legal Disclaimer Management ───────────────────────────────────
  {
    slug: 'legal-disclaimer-management',
    category: 'features',
    meta: {
      title: 'Legal Disclaimer Management for Email Signatures | Siggly',
      description:
        'Manage jurisdiction-specific email disclaimers with conditional logic and regulatory compliance. Add confidentiality notices and legal footers automatically.',
      keywords: [
        'email disclaimer management',
        'legal disclaimer signatures',
        'confidentiality notice email',
        'regulatory email footer',
      ],
      canonical: '/features/legal-disclaimer-management',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Features', url: '/features' },
      { name: 'Legal Disclaimer Management', url: '/features/legal-disclaimer-management' },
    ],
    hero: {
      badge: { icon: 'scale', text: 'Legal Disclaimers' },
      title: 'Automated Legal Disclaimers for Every Email',
      description:
        'Different jurisdictions, industries, and recipients require different legal text. Siggly applies the right disclaimer to the right email automatically using conditional logic and user attributes.',
      variant: 'dark',
    },
    featuresTitle: 'Disclaimer Management Capabilities',
    features: [
      {
        icon: 'scale',
        title: 'Jurisdiction-Specific Rules',
        description:
          'Define disclaimers for specific countries, states, or regions. The correct legal text is applied based on the sender\'s location or entity.',
      },
      {
        icon: 'filter',
        title: 'Conditional Logic Engine',
        description:
          'Apply disclaimers based on department, role, recipient domain, or custom attributes. Only show financial disclaimers when the sender is in the finance team, for example.',
      },
      {
        icon: 'lock',
        title: 'Confidentiality Notices',
        description:
          'Append standard confidentiality notices to every outbound email. Lock the text so employees cannot modify or remove legally required language.',
      },
      {
        icon: 'file-check',
        title: 'Regulatory Compliance Templates',
        description:
          'Pre-built disclaimer templates for GDPR, HIPAA, SOX, and financial services regulations. Customize them to match your legal team\'s requirements.',
      },
      {
        icon: 'edit-3',
        title: 'Legal Team Self-Service',
        description:
          'Give your legal team direct access to edit disclaimer text without involving IT. Changes deploy organization-wide immediately after approval.',
      },
    ],
    sections: [
      {
        type: 'checklist',
        title: 'Supported Disclaimer Scenarios',
        items: [
          'GDPR privacy and data processing notices',
          'Financial services regulatory disclaimers',
          'Healthcare and HIPAA confidentiality notices',
          'Attorney-client privilege statements',
          'Government and public sector compliance text',
          'Industry-specific insurance liability disclaimers',
          'Multi-language disclaimer variants',
        ],
      },
      {
        type: 'prose',
        title: 'Why Disclaimer Management Matters',
        paragraphs: [
          'Email disclaimers are not just legal boilerplate. In regulated industries, missing or incorrect disclaimers can lead to fines, lawsuits, and reputational damage. Yet most organizations manage disclaimers manually, relying on employees to paste the right text into their signatures.',
          'Siggly eliminates that risk by applying disclaimers automatically based on rules you define. Your legal team maintains the text, your IT team sets the targeting rules, and every email leaves the organization with the correct legal footer. No manual copying, no missed updates, no compliance gaps.',
        ],
      },
    ],
    testimonial: {
      quote:
        'We operate in six countries with different regulatory requirements. Siggly applies the correct legal disclaimer to each employee automatically based on their entity. Our legal team finally sleeps at night.',
      authorName: 'Dr. Katarina Hoffman',
      authorTitle: 'General Counsel, Vantage Financial Group',
    },
    faqs: [
      {
        question: 'Can different departments have different disclaimers?',
        answer:
          'Yes. Use conditional logic to assign disclaimers by department, role, entity, or any custom attribute. Multiple disclaimers can be stacked if needed.',
      },
      {
        question: 'Can employees remove or edit the disclaimer?',
        answer:
          'No. Disclaimers managed through Siggly are locked and cannot be modified by end users. Only authorized admins or legal team members can edit disclaimer text.',
      },
      {
        question: 'Do disclaimers work with server-side signature injection?',
        answer:
          'Yes. When using server-side injection for Google Workspace or Microsoft 365, disclaimers are appended server-side so they appear on every email, including mobile.',
      },
    ],
    cta: {
      title: 'Automate Your Email Disclaimers',
      description:
        'Ensure every outbound email carries the correct legal text. Set up disclaimer rules once and let Siggly enforce them everywhere.',
    },
  },

  // ─── Multi-Brand Support ───────────────────────────────────────────
  {
    slug: 'multi-brand-support',
    category: 'features',
    meta: {
      title: 'Multi-Brand Email Signature Management | Siggly',
      description:
        'Manage email signatures for multiple brands, subsidiaries, and acquisitions from a single platform. Enforce brand guidelines and switch between brands effortlessly.',
      keywords: [
        'multi-brand email signatures',
        'subsidiary signature management',
        'brand switching signatures',
        'acquisition branding email',
      ],
      canonical: '/features/multi-brand-support',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Features', url: '/features' },
      { name: 'Multi-Brand Support', url: '/features/multi-brand-support' },
    ],
    hero: {
      badge: { icon: 'building', text: 'Multi-Brand' },
      title: 'One Platform, Every Brand',
      description:
        'Whether you run multiple subsidiaries, have recently completed an acquisition, or operate distinct product brands, Siggly lets you manage all of their email signatures from a single account with strict brand separation.',
      variant: 'violet',
    },
    stats: [
      { value: 'Unlimited', label: 'Brands per account' },
      { value: '100%', label: 'Brand guideline enforcement' },
      { value: '< 5 min', label: 'To add a new brand' },
    ],
    featuresTitle: 'Multi-Brand Management Features',
    features: [
      {
        icon: 'building',
        title: 'Brand Workspaces',
        description:
          'Each brand gets its own isolated workspace with dedicated templates, user assignments, and branding assets. No cross-contamination.',
      },
      {
        icon: 'toggle-left',
        title: 'Quick Brand Switching',
        description:
          'Admins managing multiple brands can switch between brand workspaces instantly from a single dashboard without logging out.',
      },
      {
        icon: 'palette',
        title: 'Brand Guidelines Enforcement',
        description:
          'Upload brand guidelines including approved logos, colors, fonts, and legal text. Templates enforce these rules so no off-brand signatures are possible.',
      },
    ],
    sections: [
      {
        type: 'use-cases-grid',
        title: 'Multi-Brand Scenarios',
        cases: [
          {
            title: 'Subsidiary Management',
            description:
              'Parent companies manage subsidiary email signatures centrally while each subsidiary maintains its own brand identity and templates.',
          },
          {
            title: 'Post-Acquisition Branding',
            description:
              'Transition acquired company signatures to your brand standards gradually. Run both brands in parallel during the integration period.',
          },
          {
            title: 'Product Brand Separation',
            description:
              'Companies with distinct product brands keep each brand\'s email signatures separate while managing them from one account.',
          },
          {
            title: 'Regional Brand Variants',
            description:
              'Global companies with region-specific brand adaptations can manage each variant as a distinct brand with shared corporate elements.',
          },
        ],
      },
      {
        type: 'how-it-works',
        title: 'Setting Up Multiple Brands',
        steps: [
          {
            step: '1',
            title: 'Create Brand Workspaces',
            description:
              'Add a new brand workspace for each subsidiary, product brand, or acquisition. Upload logos, colors, and brand assets.',
          },
          {
            step: '2',
            title: 'Assign Users to Brands',
            description:
              'Map employees to their respective brands using directory groups, manual assignment, or domain-based rules.',
          },
          {
            step: '3',
            title: 'Deploy Per-Brand Signatures',
            description:
              'Each brand deploys its own signature templates independently. Corporate admins maintain oversight across all brands.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'After acquiring two companies last year, we needed to manage three sets of email signatures without mixing brands. Siggly made the transition seamless with isolated brand workspaces.',
      authorName: 'Rebecca Liu',
      authorTitle: 'Brand Director, Ascend Holdings Group',
    },
    cta: {
      title: 'Manage All Your Brands in One Place',
      description:
        'Stop using separate tools for each brand. Siggly gives you unified control with strict brand separation built in.',
    },
  },
];
