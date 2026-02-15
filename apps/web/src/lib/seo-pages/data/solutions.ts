import type { SEOLandingPageData } from '../types';

export const solutionsPages: SEOLandingPageData[] = [
  // ─── Sales Teams ──────────────────────────────────────────────────────────────
  {
    slug: 'sales-teams',
    category: 'solutions',
    meta: {
      title: 'Email Signatures for Sales Teams | Siggly',
      description:
        'Empower your sales reps with branded email signatures that include CTAs, banners, and booking links. Drive pipeline and close more deals.',
      keywords: [
        'sales email signature',
        'sales team branding',
        'email signature CTA',
        'sales pipeline',
      ],
      canonical: '/for/sales-teams',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Solutions', url: '/for' },
      { name: 'Sales Teams', url: '/for/sales-teams' },
    ],
    hero: {
      badge: { icon: 'target', text: 'Built for Sales' },
      title: 'Turn Every Email Into a Sales Opportunity',
      description:
        'Equip your sales team with professional, on-brand email signatures that feature dynamic CTAs, meeting links, and promotional banners to accelerate pipeline growth.',
      variant: 'violet',
    },
    stats: [
      { value: '28%', label: 'Increase in meeting bookings' },
      { value: '7x', label: 'More clicks on signature CTAs' },
      { value: '100%', label: 'Brand compliance across reps' },
      { value: '< 5 min', label: 'Deployment per rep' },
    ],
    featuresTitle: 'Everything Your Sales Team Needs',
    features: [
      {
        icon: 'target',
        title: 'Dynamic Call-to-Action Banners',
        description:
          'Add clickable banners to every signature that promote demos, case studies, or limited-time offers to drive engagement.',
      },
      {
        icon: 'clock',
        title: 'One-Click Meeting Links',
        description:
          'Embed Calendly, HubSpot, or custom scheduling links directly into signatures so prospects can book time instantly.',
      },
      {
        icon: 'bar-chart-3',
        title: 'Click & Impression Analytics',
        description:
          'Track which reps, links, and banners generate the most engagement with built-in analytics dashboards.',
      },
      {
        icon: 'users',
        title: 'Team-Wide Rollouts',
        description:
          'Push signature updates to your entire sales org in one click. No more chasing reps for manual changes.',
      },
      {
        icon: 'refresh-cw',
        title: 'Campaign Rotation',
        description:
          'Automatically rotate promotional banners by date range so your signatures always highlight the latest campaign.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'Get Your Sales Team Signed Up in Minutes',
        steps: [
          {
            step: '1',
            title: 'Design Your Signature',
            description:
              'Use the drag-and-drop editor to create a polished signature template with your brand colors, logo, and CTA.',
          },
          {
            step: '2',
            title: 'Assign to Your Sales Team',
            description:
              'Add team members individually or sync from your directory. Each rep gets a personalized version automatically.',
          },
          {
            step: '3',
            title: 'Deploy & Track',
            description:
              'Push signatures to Gmail or Outlook with one click and monitor click-through rates in real time.',
          },
        ],
      },
      {
        type: 'use-cases-grid',
        title: 'How Sales Teams Use Siggly',
        cases: [
          {
            title: 'Outbound Prospecting',
            description:
              'Include a "Book a Demo" CTA in every cold email to shorten the sales cycle.',
          },
          {
            title: 'Account Executives',
            description:
              'Showcase case studies and testimonials with rotating banner campaigns.',
          },
          {
            title: 'Sales Development Reps',
            description:
              'Add direct dial numbers and LinkedIn profiles for fast follow-ups.',
          },
          {
            title: 'Sales Leadership',
            description:
              'Ensure every rep maintains consistent, professional branding across all communications.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Since rolling out Siggly, our sales team books 30% more demos directly from email signatures. The campaign banners are a game-changer for promoting webinars and new content.',
      authorName: 'Jessica Torres',
      authorTitle: 'VP of Sales, CloudReach Solutions',
    },
    faqs: [
      {
        question: 'Can each sales rep have a personalized signature?',
        answer:
          'Yes. You create one template and Siggly automatically personalizes it for each rep with their name, title, phone number, photo, and meeting link.',
      },
      {
        question: 'Does Siggly integrate with our CRM?',
        answer:
          'Siggly integrates with popular CRMs like HubSpot and Salesforce so you can sync contact details and track signature engagement alongside your pipeline.',
      },
      {
        question: 'Can we rotate promotional banners automatically?',
        answer:
          'Absolutely. Set date ranges for each banner campaign and Siggly will automatically swap them out so your signatures always promote the latest content.',
      },
      {
        question: 'How do we deploy signatures to the entire team?',
        answer:
          'Use the one-click deployment feature to push signatures to Gmail via Google Workspace or to Outlook via Microsoft 365. No manual installation needed.',
      },
      {
        question: 'What analytics are available?',
        answer:
          'You can track impressions, clicks, and click-through rates for every link and banner in your signatures, broken down by team member and campaign.',
      },
    ],
    cta: {
      title: 'Supercharge Your Sales Emails',
      description:
        'Give your sales team signatures that sell. Start your free trial and deploy branded, CTA-driven signatures in minutes.',
    },
  },

  // ─── Customer Success ─────────────────────────────────────────────────────────
  {
    slug: 'customer-success',
    category: 'solutions',
    meta: {
      title: 'Email Signatures for Customer Success | Siggly',
      description:
        'Help your customer success team build trust with branded signatures that include support links, NPS surveys, and resource hubs.',
      keywords: [
        'customer success email signature',
        'CS team branding',
        'support email signature',
        'customer retention',
      ],
      canonical: '/for/customer-success',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Solutions', url: '/for' },
      { name: 'Customer Success', url: '/for/customer-success' },
    ],
    hero: {
      badge: { icon: 'heart', text: 'Customer Success' },
      title: 'Build Stronger Customer Relationships With Every Email',
      description:
        'Empower your customer success team with professional email signatures that link to support portals, knowledge bases, and feedback surveys.',
      variant: 'emerald',
    },
    stats: [
      { value: '40%', label: 'More support portal visits' },
      { value: '3x', label: 'Increase in NPS responses' },
      { value: '100%', label: 'On-brand across CS team' },
    ],
    featuresTitle: 'Tools for Customer-Centric Communication',
    features: [
      {
        icon: 'heart',
        title: 'Support Portal Links',
        description:
          'Include direct links to your help center, knowledge base, or ticketing system so customers always know where to get help.',
      },
      {
        icon: 'star',
        title: 'NPS & Feedback Surveys',
        description:
          'Embed satisfaction survey links in your signatures to collect feedback after every interaction.',
      },
      {
        icon: 'user-check',
        title: 'Dedicated CSM Details',
        description:
          'Display each CSM\'s photo, direct line, and calendar link so customers can easily reach their dedicated point of contact.',
      },
      {
        icon: 'trending-up',
        title: 'Renewal & Upsell Banners',
        description:
          'Promote upcoming renewals, new features, or upgrade paths with targeted banner campaigns.',
      },
      {
        icon: 'layers',
        title: 'Resource Hub Links',
        description:
          'Point customers to webinars, training sessions, and product documentation with signature-embedded links.',
      },
    ],
    sections: [
      {
        type: 'benefits',
        title: 'Why Customer Success Teams Choose Siggly',
        items: [
          {
            icon: 'shield',
            title: 'Trust & Professionalism',
            description:
              'Consistent branding across your CS team builds trust and reinforces your company identity in every customer touchpoint.',
          },
          {
            icon: 'zap',
            title: 'Faster Onboarding',
            description:
              'New CSMs are set up with professional signatures in minutes, not days, with automatic personalization.',
          },
          {
            icon: 'bar-chart-3',
            title: 'Measurable Impact',
            description:
              'Track how many customers click through to support resources, surveys, and renewal pages from email signatures.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Our CSAT scores went up after we started linking our knowledge base in every email. Customers love having instant access to resources without needing to ask.',
      authorName: 'Marcus Chen',
      authorTitle: 'Director of Customer Success, Relay Platform',
    },
    faqs: [
      {
        question: 'Can we link to our support portal in signatures?',
        answer:
          'Yes. Add any link you need, including help centers, ticketing portals, knowledge bases, and status pages, directly in your signature template.',
      },
      {
        question: 'Can we add NPS or CSAT survey links?',
        answer:
          'Absolutely. Embed links to survey tools like Delighted, Typeform, or your own survey platform to collect feedback passively.',
      },
      {
        question: 'How do we keep signatures consistent across the CS team?',
        answer:
          'Create a single template with locked brand elements and push it to all team members. Individual details like name and photo are auto-populated.',
      },
      {
        question: 'Does Siggly work with Zendesk or Intercom?',
        answer:
          'Siggly signatures work in any email client. While signatures are applied in Gmail and Outlook, the links can point to any support tool your team uses.',
      },
    ],
    cta: {
      title: 'Elevate Your Customer Communications',
      description:
        'Give your CS team signatures that strengthen relationships and drive engagement. Start your free trial today.',
    },
  },

  // ─── HR Departments ───────────────────────────────────────────────────────────
  {
    slug: 'hr-departments',
    category: 'solutions',
    meta: {
      title: 'Email Signatures for HR Departments | Siggly',
      description:
        'Standardize HR email signatures with branded templates that include job board links, company culture banners, and policy resources.',
      keywords: [
        'HR email signature',
        'human resources branding',
        'employee email signature',
        'HR department signature',
        'employer branding',
      ],
      canonical: '/for/hr-departments',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Solutions', url: '/for' },
      { name: 'HR Departments', url: '/for/hr-departments' },
    ],
    hero: {
      badge: { icon: 'users', text: 'HR & People Ops' },
      title: 'Professional Signatures That Reflect Your Company Culture',
      description:
        'Give your HR team branded email signatures that promote open roles, highlight company values, and link to important employee resources.',
      variant: 'indigo',
    },
    stats: [
      { value: '50%', label: 'More career page visits' },
      { value: '2x', label: 'Referral program engagement' },
      { value: '< 3 min', label: 'New hire signature setup' },
    ],
    featuresTitle: 'Signature Features Built for HR',
    features: [
      {
        icon: 'user-plus',
        title: 'Job Board & Career Links',
        description:
          'Promote open positions by embedding links to your careers page or specific job listings directly in HR signatures.',
      },
      {
        icon: 'award',
        title: 'Employer Brand Banners',
        description:
          'Showcase awards, certifications, and "Best Place to Work" badges to reinforce your employer brand.',
      },
      {
        icon: 'file-text',
        title: 'Policy & Handbook Links',
        description:
          'Give employees quick access to handbooks, benefits portals, and policy documents from every HR email.',
      },
      {
        icon: 'palette',
        title: 'Brand-Consistent Templates',
        description:
          'Lock down brand colors, fonts, and logos so every HR email reinforces the company identity.',
      },
    ],
    sections: [
      {
        type: 'use-cases-grid',
        title: 'How HR Teams Use Siggly',
        cases: [
          {
            title: 'Recruiting & Talent Acquisition',
            description:
              'Promote open roles and your employer brand in every recruiter email with clickable banners.',
          },
          {
            title: 'Employee Onboarding',
            description:
              'Set up new hire signatures automatically with correct titles, departments, and contact info.',
          },
          {
            title: 'Internal Communications',
            description:
              'Link to benefits enrollment, training portals, and company announcements from HR signatures.',
          },
          {
            title: 'Offboarding',
            description:
              'Quickly remove or redirect signatures for departing employees to maintain professionalism.',
          },
        ],
      },
      {
        type: 'checklist',
        title: 'HR Email Signature Best Practices',
        items: [
          'Include the company logo and brand colors for consistency',
          'Add a link to your careers page or current openings',
          'Display relevant HR certifications or employer awards',
          'Link to the employee handbook or benefits portal',
          'Include a confidentiality disclaimer when required',
          'Update banners seasonally for open enrollment or events',
        ],
      },
    ],
    testimonial: {
      quote:
        'We used to spend hours setting up signatures for new hires. With Siggly, it takes under three minutes and every signature looks perfect from day one.',
      authorName: 'Priya Nair',
      authorTitle: 'Head of People Operations, Vantage HR',
    },
    faqs: [
      {
        question: 'Can we automatically set up signatures for new hires?',
        answer:
          'Yes. When you add a new team member, Siggly auto-generates their personalized signature from the template. You can also sync with your HR system or directory.',
      },
      {
        question: 'Can we promote open roles in email signatures?',
        answer:
          'Absolutely. Add career page links or specific job listing URLs as banner CTAs that the entire HR team, or even the whole company, can display.',
      },
      {
        question: 'How do we handle departing employees?',
        answer:
          'Remove a team member from Siggly and their managed signature is no longer maintained. For Google Workspace users, admins can also clear signatures remotely.',
      },
      {
        question: 'Can we include legal disclaimers?',
        answer:
          'Yes. Add confidentiality notices, equal opportunity statements, or any required legal text as a fixed element in your signature template.',
      },
    ],
    cta: {
      title: 'Streamline HR Email Signatures',
      description:
        'Automate signature management for your HR department. Set up branded, compliant signatures for every team member in minutes.',
    },
  },

  // ─── Finance Teams ────────────────────────────────────────────────────────────
  {
    slug: 'finance-teams',
    category: 'solutions',
    meta: {
      title: 'Email Signatures for Finance Teams | Siggly',
      description:
        'Ensure compliance and professionalism in finance team emails with standardized signatures, disclaimers, and secure contact info.',
      keywords: [
        'finance email signature',
        'accounting team signature',
        'financial compliance email',
        'finance department branding',
      ],
      canonical: '/for/finance-teams',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Solutions', url: '/for' },
      { name: 'Finance Teams', url: '/for/finance-teams' },
    ],
    hero: {
      badge: { icon: 'dollar-sign', text: 'Finance & Accounting' },
      title: 'Compliant, Professional Signatures for Finance Teams',
      description:
        'Standardize email signatures across your finance department with built-in disclaimers, secure contact details, and brand-consistent formatting.',
      variant: 'slate',
    },
    stats: [
      { value: '100%', label: 'Disclaimer compliance' },
      { value: '0', label: 'Manual signature updates needed' },
      { value: '5 min', label: 'Full team deployment' },
      { value: '99.9%', label: 'Uptime for hosted assets' },
    ],
    featuresTitle: 'Signature Management for Finance Professionals',
    features: [
      {
        icon: 'shield-check',
        title: 'Mandatory Disclaimers',
        description:
          'Ensure every outgoing email includes required legal and confidentiality disclaimers that cannot be removed by individual users.',
      },
      {
        icon: 'lock',
        title: 'Locked Templates',
        description:
          'Prevent unauthorized edits by locking brand elements, disclaimers, and formatting while allowing personal details to populate automatically.',
      },
      {
        icon: 'file-text',
        title: 'Regulatory Compliance',
        description:
          'Meet industry regulations by including registration numbers, regulatory body affiliations, and required disclosures in every signature.',
      },
      {
        icon: 'building',
        title: 'Multi-Entity Support',
        description:
          'Manage signatures across multiple legal entities or subsidiaries, each with their own branding and compliance requirements.',
      },
      {
        icon: 'eye',
        title: 'Audit Trail',
        description:
          'Track all signature changes with a complete audit log so you can demonstrate compliance at any time.',
      },
    ],
    sections: [
      {
        type: 'checklist',
        title: 'Finance Email Signature Compliance Checklist',
        items: [
          'Include mandatory confidentiality disclaimers',
          'Display company registration and regulatory numbers',
          'Use locked templates to prevent unauthorized changes',
          'Maintain audit trails for all signature modifications',
          'Support multi-entity branding for subsidiaries',
          'Ensure signatures render correctly across all email clients',
        ],
      },
    ],
    testimonial: {
      quote:
        'Compliance is non-negotiable in finance. Siggly lets us enforce disclaimers and branding across every email without relying on individual team members to get it right.',
      authorName: 'David Kowalski',
      authorTitle: 'CFO, Meridian Financial Group',
    },
    faqs: [
      {
        question: 'Can we enforce disclaimers on all finance team emails?',
        answer:
          'Yes. Disclaimers can be set as locked, mandatory elements in your template that individual users cannot remove or modify.',
      },
      {
        question: 'Do you support multiple legal entities?',
        answer:
          'Siggly supports unlimited departments and entities, each with their own templates, branding, and disclaimer requirements.',
      },
      {
        question: 'Is there an audit trail for signature changes?',
        answer:
          'Yes. Every change to templates and individual signatures is logged with timestamps and user details for full traceability.',
      },
      {
        question: 'Can we include regulatory registration numbers?',
        answer:
          'Absolutely. Add registration numbers, FCA references, or any required regulatory information as locked fields in your templates.',
      },
      {
        question: 'How do we ensure signatures stay up to date?',
        answer:
          'Push updates to the entire team with one click. When you edit a template, all assigned signatures update automatically.',
      },
    ],
    cta: {
      title: 'Ensure Compliance in Every Finance Email',
      description:
        'Standardize your finance team signatures with mandatory disclaimers and locked branding. Start your free trial today.',
    },
  },

  // ─── Legal Teams ──────────────────────────────────────────────────────────────
  {
    slug: 'legal-teams',
    category: 'solutions',
    meta: {
      title: 'Email Signatures for Legal Teams | Siggly',
      description:
        'Manage professional email signatures for your legal team with mandatory disclaimers, bar numbers, and confidentiality notices.',
      keywords: [
        'legal email signature',
        'law firm signature',
        'attorney email signature',
        'legal disclaimer email',
        'confidentiality notice',
      ],
      canonical: '/for/legal-teams',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Solutions', url: '/for' },
      { name: 'Legal Teams', url: '/for/legal-teams' },
    ],
    hero: {
      badge: { icon: 'scale', text: 'Legal & Compliance' },
      title: 'Email Signatures That Meet the Highest Professional Standards',
      description:
        'Equip your legal team with meticulously formatted email signatures featuring mandatory confidentiality notices, bar admissions, and professional credentials.',
      variant: 'dark',
    },
    stats: [
      { value: '100%', label: 'Confidentiality notice compliance' },
      { value: '< 2 min', label: 'New attorney setup' },
      { value: '0', label: 'Branding inconsistencies' },
    ],
    featuresTitle: 'Purpose-Built for Legal Professionals',
    features: [
      {
        icon: 'shield',
        title: 'Confidentiality Notices',
        description:
          'Automatically append legally required confidentiality and privilege notices to every outgoing email signature.',
      },
      {
        icon: 'award',
        title: 'Bar Admission & Credentials',
        description:
          'Display bar numbers, court admissions, and professional certifications in a clean, standardized format.',
      },
      {
        icon: 'lock',
        title: 'Immutable Compliance Fields',
        description:
          'Lock critical elements like disclaimers and firm details so they cannot be altered by individual attorneys.',
      },
      {
        icon: 'building',
        title: 'Multi-Office Support',
        description:
          'Manage different templates for each office location with location-specific addresses, phone numbers, and branding.',
      },
      {
        icon: 'file-text',
        title: 'Practice Area Indicators',
        description:
          'Clearly communicate each attorney\'s practice areas and specializations within their email signature.',
      },
      {
        icon: 'eye',
        title: 'Full Audit History',
        description:
          'Maintain a detailed log of all signature changes to demonstrate compliance and governance at any time.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'Setting Up Legal Team Signatures',
        steps: [
          {
            step: '1',
            title: 'Configure Your Firm Template',
            description:
              'Design a signature template with your firm logo, colors, and mandatory disclaimer text locked into place.',
          },
          {
            step: '2',
            title: 'Add Attorney Details',
            description:
              'Import attorney names, titles, bar numbers, and practice areas. Siggly personalizes each signature automatically.',
          },
          {
            step: '3',
            title: 'Deploy & Enforce',
            description:
              'Push signatures to the entire firm and rest easy knowing every email carries the correct branding and disclaimers.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Managing 120 attorney signatures used to be a nightmare. Siggly ensures every email has the right disclaimers, bar numbers, and firm branding without any manual effort.',
      authorName: 'Katherine Ellis',
      authorTitle: 'Director of Operations, Barrett & Hughes LLP',
    },
    faqs: [
      {
        question: 'Can we include mandatory confidentiality disclaimers?',
        answer:
          'Yes. Confidentiality and privilege notices can be added as locked elements that appear on every signature and cannot be removed by individual users.',
      },
      {
        question: 'Can each attorney display their bar admissions?',
        answer:
          'Absolutely. Each attorney\'s signature is personalized with their bar numbers, court admissions, and any professional credentials you configure.',
      },
      {
        question: 'Do you support multiple office locations?',
        answer:
          'Yes. Create separate templates or template variations for each office with the correct address, phone, and any location-specific branding.',
      },
      {
        question: 'How do we handle lateral hires or departures?',
        answer:
          'Add new attorneys in minutes with auto-populated signatures. Remove departing attorneys and their managed signatures are immediately deactivated.',
      },
      {
        question: 'Is the signature compliant with ABA guidelines?',
        answer:
          'Siggly gives you full control over disclaimer text, credential display, and required disclosures so you can configure signatures to meet ABA and state bar requirements.',
      },
    ],
    cta: {
      title: 'Elevate Your Firm\'s Email Presence',
      description:
        'Deploy compliant, professional email signatures for every attorney. Start your free trial and ensure brand consistency across your firm.',
    },
  },

  // ─── Startups ─────────────────────────────────────────────────────────────────
  {
    slug: 'startups',
    category: 'solutions',
    meta: {
      title: 'Email Signatures for Startups | Siggly',
      description:
        'Launch professional email signatures for your startup fast. Affordable, easy to manage, and designed to scale as your team grows.',
      keywords: [
        'startup email signature',
        'small team email branding',
        'startup branding',
        'affordable email signature',
        'growing team signature',
      ],
      canonical: '/for/startups',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Solutions', url: '/for' },
      { name: 'Startups', url: '/for/startups' },
    ],
    hero: {
      badge: { icon: 'rocket', text: 'Startups' },
      title: 'Look Established From Day One',
      description:
        'Give your startup the professional polish it deserves with branded email signatures that are quick to set up, easy to update, and built to scale with your team.',
      variant: 'violet',
    },
    stats: [
      { value: '5 min', label: 'Setup for entire team' },
      { value: '$0', label: 'To get started' },
      { value: '10x', label: 'Faster than DIY signatures' },
    ],
    featuresTitle: 'Built for Fast-Moving Teams',
    features: [
      {
        icon: 'zap',
        title: 'Instant Setup',
        description:
          'Go from zero to fully branded signatures in minutes. No design skills or IT resources required.',
      },
      {
        icon: 'rocket',
        title: 'Scale as You Grow',
        description:
          'Start with a team of three and scale to three hundred. Siggly grows with your startup seamlessly.',
      },
      {
        icon: 'palette',
        title: 'Brand-First Design',
        description:
          'Create signatures that match your brand identity with customizable colors, logos, fonts, and layouts.',
      },
      {
        icon: 'dollar-sign',
        title: 'Startup-Friendly Pricing',
        description:
          'A generous free tier and affordable plans mean you get enterprise-grade signatures without the enterprise price tag.',
      },
      {
        icon: 'send',
        title: 'Social & Website Links',
        description:
          'Promote your website, Product Hunt launch, LinkedIn, and Twitter profiles in every email your team sends.',
      },
    ],
    sections: [
      {
        type: 'benefits',
        title: 'Why Startups Love Siggly',
        items: [
          {
            icon: 'sparkles',
            title: 'Professional First Impressions',
            description:
              'Consistent, polished signatures help your startup appear credible and trustworthy to investors, partners, and customers.',
          },
          {
            icon: 'clock',
            title: 'Zero Time Wasted',
            description:
              'Stop wasting engineering or design time on HTML signatures. Set it up once and forget about it.',
          },
          {
            icon: 'trending-up',
            title: 'Growth Marketing Built In',
            description:
              'Use signature banners to promote launches, events, or fundraising milestones to everyone your team emails.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'We went from inconsistent Gmail signatures to a unified, professional look in under ten minutes. Investors actually commented on how polished our emails looked.',
      authorName: 'Alex Rivera',
      authorTitle: 'Co-Founder & CEO, Launchpad AI',
    },
    faqs: [
      {
        question: 'Is Siggly free for small teams?',
        answer:
          'Yes. Siggly offers a generous free tier that covers small teams, so you can get started without any upfront cost.',
      },
      {
        question: 'Do I need a designer to create signatures?',
        answer:
          'Not at all. The drag-and-drop editor and pre-built templates make it easy for anyone to create professional signatures in minutes.',
      },
      {
        question: 'Can we update signatures as our branding evolves?',
        answer:
          'Absolutely. Update your template and every team member\'s signature updates automatically. Perfect for fast-moving startups that rebrand or iterate frequently.',
      },
      {
        question: 'Does it work with Google Workspace?',
        answer:
          'Yes. Siggly integrates natively with Google Workspace and Microsoft 365 for seamless deployment across your team.',
      },
      {
        question: 'Can we promote our Product Hunt launch?',
        answer:
          'Yes. Add a promotional banner to all team signatures to drive traffic to your Product Hunt page, landing page, or any campaign URL.',
      },
    ],
    cta: {
      title: 'Launch Professional Signatures Today',
      description:
        'Your startup deserves polished email signatures. Get started for free and set up your entire team in minutes.',
    },
  },

  // ─── Managed Service Providers ────────────────────────────────────────────────
  {
    slug: 'managed-service-providers',
    category: 'solutions',
    meta: {
      title: 'Email Signatures for Managed Service Providers | Siggly',
      description:
        'Manage email signatures across multiple client organizations from one dashboard. Built for MSPs who support many businesses.',
      keywords: [
        'MSP email signature',
        'managed service provider branding',
        'multi-client signature management',
        'IT managed services email',
      ],
      canonical: '/for/managed-service-providers',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Solutions', url: '/for' },
      {
        name: 'Managed Service Providers',
        url: '/for/managed-service-providers',
      },
    ],
    hero: {
      badge: { icon: 'network', text: 'MSPs & IT Partners' },
      title: 'One Dashboard to Manage Signatures for All Your Clients',
      description:
        'Manage branded email signatures across every client organization from a single platform. Deliver consistent branding as a value-added service.',
      variant: 'emerald',
    },
    stats: [
      { value: 'Unlimited', label: 'Client organizations' },
      { value: '1', label: 'Dashboard for all clients' },
      { value: '80%', label: 'Less time on signature requests' },
      { value: '100%', label: 'Client brand compliance' },
    ],
    featuresTitle: 'Multi-Tenant Signature Management for MSPs',
    features: [
      {
        icon: 'layers',
        title: 'Multi-Tenant Dashboard',
        description:
          'Manage signatures for every client organization from a single portal with isolated branding, templates, and user lists.',
      },
      {
        icon: 'building',
        title: 'Client-Specific Branding',
        description:
          'Each client gets their own branded templates with unique logos, colors, disclaimers, and contact information.',
      },
      {
        icon: 'settings',
        title: 'Delegated Admin Access',
        description:
          'Grant client stakeholders limited admin access to approve signatures or update details without full platform access.',
      },
      {
        icon: 'refresh-cw',
        title: 'Bulk Operations',
        description:
          'Push signature updates, onboard new users, or roll out campaigns across multiple client organizations simultaneously.',
      },
      {
        icon: 'monitor',
        title: 'White-Label Options',
        description:
          'Offer signature management under your own brand with white-label capabilities that reinforce your MSP identity.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'How MSPs Deliver Signature Management',
        steps: [
          {
            step: '1',
            title: 'Onboard Your Client',
            description:
              'Create a new client workspace, upload their branding assets, and configure their signature template.',
          },
          {
            step: '2',
            title: 'Import Users',
            description:
              'Sync users from the client\'s directory or import them via CSV. Each user gets a personalized signature instantly.',
          },
          {
            step: '3',
            title: 'Deploy & Manage Ongoing',
            description:
              'Push signatures to the client\'s email platform and manage updates, campaigns, and new hires from your MSP dashboard.',
          },
        ],
      },
      {
        type: 'use-cases-grid',
        title: 'MSP Signature Management Use Cases',
        cases: [
          {
            title: 'Client Onboarding',
            description:
              'Include professional email signatures as part of your standard client onboarding package.',
          },
          {
            title: 'Rebranding Projects',
            description:
              'Roll out new branding across a client\'s entire organization instantly when they rebrand.',
          },
          {
            title: 'Compliance Enforcement',
            description:
              'Ensure regulated clients have mandatory disclaimers and compliant signatures at all times.',
          },
          {
            title: 'Revenue Generation',
            description:
              'Offer signature management as a billable value-added service to increase your per-client revenue.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Siggly turned email signature management into a revenue stream for our MSP. We manage signatures for 40 clients from one dashboard and our clients love the professional results.',
      authorName: 'Brian Holloway',
      authorTitle: 'Managing Director, Apex IT Solutions',
    },
    faqs: [
      {
        question: 'Can we manage multiple client organizations?',
        answer:
          'Yes. Siggly supports unlimited client organizations, each with isolated branding, templates, and user management from a single MSP dashboard.',
      },
      {
        question: 'Can clients approve or edit their own signatures?',
        answer:
          'You can grant clients delegated access with limited permissions so they can review, approve, or update certain details without full admin access.',
      },
      {
        question: 'Is there a white-label option?',
        answer:
          'Yes. White-label capabilities allow you to offer signature management under your MSP brand for a seamless client experience.',
      },
      {
        question: 'How do you handle billing for multiple clients?',
        answer:
          'Siggly offers MSP-friendly pricing models that let you manage costs across all your client organizations efficiently.',
      },
      {
        question: 'Can we bulk-deploy to multiple organizations at once?',
        answer:
          'Yes. Bulk operations allow you to push updates, onboard users, or launch campaigns across multiple client organizations simultaneously.',
      },
    ],
    cta: {
      title: 'Add Signature Management to Your MSP Services',
      description:
        'Manage email signatures for all your clients from one powerful dashboard. Start your free trial and deliver instant value to your clients.',
    },
  },

  // ─── Education Institutions ───────────────────────────────────────────────────
  {
    slug: 'education-institutions',
    category: 'solutions',
    meta: {
      title: 'Email Signatures for Education Institutions | Siggly',
      description:
        'Unify email signatures across faculty, staff, and departments with branded templates designed for schools and universities.',
      keywords: [
        'education email signature',
        'university email signature',
        'school branding',
        'faculty email signature',
        'academic institution signature',
      ],
      canonical: '/for/education-institutions',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Solutions', url: '/for' },
      { name: 'Education Institutions', url: '/for/education-institutions' },
    ],
    hero: {
      badge: { icon: 'graduation-cap', text: 'Education' },
      title: 'Unified Email Branding for Your Entire Institution',
      description:
        'Manage professional email signatures for faculty, staff, and departments across your school, college, or university with centralized templates and easy deployment.',
      variant: 'indigo',
    },
    stats: [
      { value: '100%', label: 'Brand consistency campus-wide' },
      { value: '< 5 min', label: 'Setup per department' },
      { value: '0', label: 'IT tickets for signature issues' },
    ],
    featuresTitle: 'Designed for Academic Institutions',
    features: [
      {
        icon: 'graduation-cap',
        title: 'Department-Level Templates',
        description:
          'Create unique templates for each department, school, or college within your institution while maintaining overall brand consistency.',
      },
      {
        icon: 'building',
        title: 'Multi-Campus Support',
        description:
          'Manage signatures across multiple campuses with campus-specific addresses, phone numbers, and branding elements.',
      },
      {
        icon: 'users',
        title: 'Faculty & Staff Directories',
        description:
          'Sync with your institution\'s directory to automatically populate faculty titles, departments, and office locations.',
      },
      {
        icon: 'mail',
        title: 'Event & Campaign Promotion',
        description:
          'Promote open days, enrollment deadlines, research publications, or fundraising campaigns through signature banners.',
      },
      {
        icon: 'shield',
        title: 'Accreditation & Compliance',
        description:
          'Display accreditation badges, FERPA compliance notices, and institutional certifications in every email.',
      },
    ],
    sections: [
      {
        type: 'use-cases-grid',
        title: 'How Education Institutions Use Siggly',
        cases: [
          {
            title: 'Admissions & Enrollment',
            description:
              'Include application deadlines and open day invitations in admissions team signatures.',
          },
          {
            title: 'Faculty Communications',
            description:
              'Standardize faculty signatures with office hours, department info, and research links.',
          },
          {
            title: 'Alumni Relations',
            description:
              'Promote giving campaigns and alumni events through targeted signature banners.',
          },
          {
            title: 'Administrative Staff',
            description:
              'Ensure all administrative emails carry consistent institutional branding.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'With over 500 faculty and staff, managing email signatures was impossible before Siggly. Now every department has consistent, professional branding and we promote campus events effortlessly.',
      authorName: 'Dr. Sarah Mitchell',
      authorTitle: 'CIO, Westfield University',
    },
    faqs: [
      {
        question: 'Can different departments have different templates?',
        answer:
          'Yes. Create unique templates for each department, school, or college within your institution. Each can have its own logo, colors, and layout while adhering to institutional guidelines.',
      },
      {
        question: 'Do you integrate with education directory systems?',
        answer:
          'Siggly integrates with Google Workspace and Microsoft 365, which are the platforms most educational institutions use. User details sync automatically.',
      },
      {
        question: 'Can we promote campus events in signatures?',
        answer:
          'Absolutely. Use banner campaigns to promote open days, enrollment periods, fundraising events, or any campus initiative across all or selected departments.',
      },
      {
        question: 'Is there special pricing for education?',
        answer:
          'Yes. Siggly offers discounted pricing for accredited educational institutions. Contact our sales team for details on education plans.',
      },
      {
        question: 'Can we display accreditation badges?',
        answer:
          'Yes. Add accreditation logos, compliance badges, and institutional certifications as image elements in your signature templates.',
      },
    ],
    cta: {
      title: 'Unify Your Institution\'s Email Identity',
      description:
        'Deploy consistent, professional email signatures across every faculty member, department, and campus. Start your free trial today.',
    },
  },

  // ─── Remote Teams ─────────────────────────────────────────────────────────────
  {
    slug: 'remote-teams',
    category: 'solutions',
    meta: {
      title: 'Email Signatures for Remote Teams | Siggly',
      description:
        'Keep your distributed team aligned with consistent email signatures that reinforce brand identity no matter where they work.',
      keywords: [
        'remote team email signature',
        'distributed team branding',
        'work from home signature',
        'remote work email',
        'virtual team branding',
      ],
      canonical: '/for/remote-teams',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Solutions', url: '/for' },
      { name: 'Remote Teams', url: '/for/remote-teams' },
    ],
    hero: {
      badge: { icon: 'laptop', text: 'Remote & Distributed' },
      title: 'Consistent Branding for Teams Everywhere',
      description:
        'No matter where your team works, Siggly ensures every email carries your brand. Deploy and manage signatures remotely without IT overhead.',
      variant: 'light',
    },
    stats: [
      { value: '100%', label: 'Brand consistency across locations' },
      { value: '0', label: 'IT involvement required' },
      { value: '< 1 min', label: 'Self-service installation' },
      { value: '24/7', label: 'Cloud-based management' },
    ],
    featuresTitle: 'Signature Management Without Borders',
    features: [
      {
        icon: 'globe',
        title: 'Cloud-Based Management',
        description:
          'Manage all signatures from a cloud-based dashboard accessible from anywhere. No VPN or on-premise infrastructure needed.',
      },
      {
        icon: 'laptop',
        title: 'Self-Service Installation',
        description:
          'Team members can install their signature with one click from any location. No IT support required.',
      },
      {
        icon: 'users',
        title: 'Time Zone & Location Display',
        description:
          'Optionally display each team member\'s time zone or city so colleagues and clients know when to reach them.',
      },
      {
        icon: 'phone',
        title: 'Virtual Contact Details',
        description:
          'Include VoIP numbers, Zoom meeting links, and Slack handles alongside traditional contact information.',
      },
      {
        icon: 'refresh-cw',
        title: 'Instant Updates Everywhere',
        description:
          'Push signature changes to the entire team instantly, regardless of where they are or what device they use.',
      },
    ],
    sections: [
      {
        type: 'benefits',
        title: 'Why Remote Teams Need Siggly',
        items: [
          {
            icon: 'shield',
            title: 'Brand Cohesion at Scale',
            description:
              'When your team is spread across cities and countries, email signatures are one of the few touchpoints you can fully control.',
          },
          {
            icon: 'zap',
            title: 'No IT Bottleneck',
            description:
              'Self-service installation means new hires set up their signature themselves, even before their first day.',
          },
          {
            icon: 'globe',
            title: 'Works From Anywhere',
            description:
              'Cloud-based management means you can create, update, and deploy signatures from any browser, any device, any location.',
          },
        ],
      },
      {
        type: 'checklist',
        title: 'Remote Team Signature Best Practices',
        items: [
          'Include time zone or city for distributed team transparency',
          'Add video meeting links for easy scheduling',
          'Use cloud-hosted signature images to avoid broken logos',
          'Deploy signatures via Google Workspace or Microsoft 365 integration',
          'Include Slack or Teams handles for internal communication',
        ],
      },
    ],
    testimonial: {
      quote:
        'With 80 people across 12 countries, we struggled to maintain consistent branding. Siggly solved it completely. Everyone has a professional, up-to-date signature regardless of location.',
      authorName: 'Natalie Wu',
      authorTitle: 'Head of Operations, Nomad Collective',
    },
    faqs: [
      {
        question: 'Can remote employees install signatures themselves?',
        answer:
          'Yes. Siggly offers a self-service installation flow where team members click a link and their signature is automatically applied to Gmail or Outlook.',
      },
      {
        question: 'Do we need IT to manage signatures?',
        answer:
          'No. The entire platform is cloud-based and designed for non-technical users. Admins can manage everything from a browser without any IT infrastructure.',
      },
      {
        question: 'Can we show time zones in signatures?',
        answer:
          'Yes. Add a time zone or city field to your template so recipients always know when your team members are available.',
      },
      {
        question: 'What about team members using personal devices?',
        answer:
          'Siggly works with any device that runs Gmail or Outlook. Signatures are applied at the email platform level, not the device level.',
      },
      {
        question: 'Can we include virtual meeting links?',
        answer:
          'Absolutely. Add Zoom, Google Meet, Teams, or any video conferencing link to your signature template for easy meeting scheduling.',
      },
    ],
    cta: {
      title: 'Unite Your Remote Team\'s Email Identity',
      description:
        'Deploy consistent, professional signatures to your distributed team in minutes. No IT required. Start your free trial today.',
    },
  },

  // ─── Global Companies ─────────────────────────────────────────────────────────
  {
    slug: 'global-companies',
    category: 'solutions',
    meta: {
      title: 'Email Signatures for Global Companies | Siggly',
      description:
        'Manage email signatures across regions, languages, and brands with enterprise-grade controls built for multinational organizations.',
      keywords: [
        'global email signature',
        'multinational email branding',
        'enterprise email signature',
        'multi-language signature',
        'international email branding',
      ],
      canonical: '/for/global-companies',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Solutions', url: '/for' },
      { name: 'Global Companies', url: '/for/global-companies' },
    ],
    hero: {
      badge: { icon: 'globe', text: 'Enterprise & Global' },
      title: 'Enterprise Signature Management for Global Organizations',
      description:
        'Centrally manage email signatures across regions, languages, subsidiaries, and brands with the control, compliance, and scale that global companies demand.',
      variant: 'slate',
    },
    stats: [
      { value: '190+', label: 'Countries supported' },
      { value: 'Unlimited', label: 'Brands & subsidiaries' },
      { value: '99.9%', label: 'Platform uptime SLA' },
      { value: '< 1 hr', label: 'Global rollout time' },
    ],
    featuresTitle: 'Built for Multinational Complexity',
    features: [
      {
        icon: 'globe',
        title: 'Multi-Language Signatures',
        description:
          'Create signature templates in multiple languages and automatically assign the correct version based on user locale or region.',
      },
      {
        icon: 'building',
        title: 'Multi-Brand Management',
        description:
          'Manage distinct brands, subsidiaries, and legal entities from a single platform, each with unique branding and compliance rules.',
      },
      {
        icon: 'shield-check',
        title: 'Regional Compliance',
        description:
          'Apply region-specific disclaimers, legal requirements, and data privacy notices automatically based on user location.',
      },
      {
        icon: 'key',
        title: 'Enterprise SSO & Security',
        description:
          'Integrate with your identity provider via SAML or OIDC for secure, enterprise-grade single sign-on.',
      },
      {
        icon: 'settings',
        title: 'Role-Based Access Control',
        description:
          'Define granular permissions so regional admins manage their own templates while global admins maintain oversight.',
      },
      {
        icon: 'bar-chart-3',
        title: 'Global Analytics Dashboard',
        description:
          'Monitor signature adoption, compliance rates, and engagement metrics across all regions and brands from a unified dashboard.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'Deploying Signatures Globally',
        steps: [
          {
            step: '1',
            title: 'Define Your Global Standards',
            description:
              'Set global brand guidelines, mandatory elements, and compliance rules that apply across all regions and subsidiaries.',
          },
          {
            step: '2',
            title: 'Localize by Region',
            description:
              'Create regional variations with localized languages, addresses, legal disclaimers, and branding elements.',
          },
          {
            step: '3',
            title: 'Deploy & Monitor',
            description:
              'Roll out signatures worldwide in under an hour and track adoption, compliance, and engagement from a single dashboard.',
          },
        ],
      },
      {
        type: 'checklist',
        title: 'Global Email Signature Requirements',
        items: [
          'Support for multiple languages and character sets',
          'Region-specific legal disclaimers and compliance notices',
          'Multi-brand and subsidiary management from one platform',
          'Enterprise SSO integration (SAML, OIDC)',
          'Role-based access for regional and global administrators',
          'GDPR, CCPA, and regional data privacy compliance',
        ],
      },
    ],
    testimonial: {
      quote:
        'We operate in 35 countries with four distinct brands. Siggly is the only platform that lets us manage all of it centrally while giving regional teams the flexibility they need.',
      authorName: 'Henrik Johansson',
      authorTitle: 'Global Head of Communications, Nordica Group',
    },
    faqs: [
      {
        question: 'Can we manage multiple brands from one account?',
        answer:
          'Yes. Siggly supports unlimited brands and subsidiaries, each with their own templates, branding, and compliance rules, all managed from a single platform.',
      },
      {
        question: 'Do you support multi-language signatures?',
        answer:
          'Absolutely. Create templates in any language and automatically assign the correct version based on user locale, region, or department.',
      },
      {
        question: 'How do you handle regional compliance requirements?',
        answer:
          'Configure region-specific disclaimers, legal notices, and data privacy statements that are automatically applied based on user location or entity.',
      },
      {
        question: 'Do you offer enterprise SSO?',
        answer:
          'Yes. Siggly supports SAML and OIDC single sign-on, integrating with identity providers like Okta, Azure AD, and Google Workspace.',
      },
      {
        question: 'Can regional admins manage their own signatures?',
        answer:
          'Yes. Role-based access control lets you give regional admins permission to manage templates and users within their region while global admins maintain oversight.',
      },
    ],
    cta: {
      title: 'Signature Management at Global Scale',
      description:
        'Unify your global email identity across every region, language, and brand. Contact our enterprise team or start a free trial today.',
    },
  },
];
