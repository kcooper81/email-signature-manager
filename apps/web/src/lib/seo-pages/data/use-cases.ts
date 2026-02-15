import type { SEOLandingPageData } from '../types';

export const useCasesPages: SEOLandingPageData[] = [
  // 1. Brand Consistency
  {
    slug: 'brand-consistency',
    category: 'use-cases',
    meta: {
      title: 'Email Signature Brand Consistency | Siggly',
      description:
        'Ensure every employee email reflects your brand identity. Siggly enforces consistent logos, colors, and formatting across all email signatures company-wide.',
      keywords: [
        'brand consistency',
        'email signature branding',
        'corporate identity',
        'brand guidelines',
      ],
      canonical: '/use-cases/brand-consistency',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Use Cases', url: '/use-cases' },
      { name: 'Brand Consistency', url: '/use-cases/brand-consistency' },
    ],
    hero: {
      badge: { icon: 'palette', text: 'Brand Identity' },
      title: 'Enforce Brand Consistency Across Every Email Signature',
      description:
        'Your brand is only as strong as its weakest touchpoint. Siggly ensures every email sent from your organization carries a pixel-perfect, on-brand signature that reinforces your identity with every message.',
      variant: 'light',
    },
    stats: [
      { value: '100%', label: 'Brand compliance across all employees' },
      { value: '75%', label: 'Reduction in off-brand signatures' },
      { value: '10x', label: 'Faster brand rollout to all teams' },
    ],
    featuresTitle: 'Everything You Need for Unified Branding',
    features: [
      {
        icon: 'palette',
        title: 'Centralized Brand Templates',
        description:
          'Design once, deploy everywhere. Create approved signature templates that lock in your brand colors, fonts, and logo placement.',
      },
      {
        icon: 'lock',
        title: 'Locked Fields & Layouts',
        description:
          'Prevent unauthorized edits by locking critical brand elements while allowing employees to personalize permitted fields.',
      },
      {
        icon: 'eye',
        title: 'Real-Time Brand Preview',
        description:
          'See exactly how signatures appear across email clients before deployment, ensuring consistent rendering everywhere.',
      },
      {
        icon: 'refresh-cw',
        title: 'Instant Global Updates',
        description:
          'Push brand updates to every employee signature simultaneously. No more chasing individuals to update their signatures manually.',
      },
      {
        icon: 'layers',
        title: 'Multi-Template Management',
        description:
          'Manage distinct signature templates for different departments or brands while maintaining overarching brand standards.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'How Brand Consistency Works with Siggly',
        steps: [
          {
            step: '1',
            title: 'Upload Your Brand Assets',
            description:
              'Add your logo, brand colors, fonts, and social media links to the Siggly brand library for centralized access.',
          },
          {
            step: '2',
            title: 'Design Approved Templates',
            description:
              'Create signature templates using your brand guidelines. Lock elements that must remain consistent across all users.',
          },
          {
            step: '3',
            title: 'Deploy to Your Organization',
            description:
              'Roll out approved signatures to every employee instantly. Siggly ensures no one can deviate from the approved design.',
          },
        ],
      },
      {
        type: 'checklist',
        title: 'Brand Consistency Checklist',
        items: [
          'Logo is correctly sized and positioned in all signatures',
          'Brand colors are accurately applied across all elements',
          'Social media icons link to official company profiles',
          'Legal disclaimers are present where required',
          'Contact information format is standardized',
          'Font choices match corporate brand guidelines',
        ],
      },
    ],
    testimonial: {
      quote:
        'Before Siggly, we had over 200 employees with 200 different signature styles. Now every email looks like it came from one unified brand. The impact on our professional image has been remarkable.',
      authorName: 'Jessica Moreno',
      authorTitle: 'Brand Director, Apex Media Group',
    },
    faqs: [
      {
        question: 'Can I enforce brand guidelines without restricting personal details?',
        answer:
          'Absolutely. Siggly lets you lock brand elements like logos, colors, and layouts while giving employees the freedom to enter their own name, title, phone number, and other personal details.',
      },
      {
        question: 'How quickly can I update signatures across the entire company?',
        answer:
          'Signature updates are pushed instantly. When you change a template, every employee using that template sees the update reflected in their next email automatically.',
      },
      {
        question: 'Does Siggly support multiple brands within one organization?',
        answer:
          'Yes. You can create and manage separate brand templates for different subsidiaries, divisions, or brands while maintaining centralized control over all of them.',
      },
      {
        question: 'Will signatures look consistent across different email clients?',
        answer:
          'Siggly generates signatures optimized for all major email clients including Outlook, Gmail, Apple Mail, and Thunderbird, ensuring consistent rendering everywhere.',
      },
      {
        question: 'What happens if an employee tries to edit a locked signature?',
        answer:
          'Locked elements cannot be modified by employees. They can only update fields you have explicitly permitted, ensuring brand integrity is always maintained.',
      },
    ],
    cta: {
      title: 'Unify Your Brand Across Every Email',
      description:
        'Stop losing brand equity to inconsistent email signatures. Deploy professional, on-brand signatures to your entire organization in minutes.',
    },
  },

  // 2. Employee Advocacy
  {
    slug: 'employee-advocacy',
    category: 'use-cases',
    meta: {
      title: 'Email Signature Employee Advocacy | Siggly',
      description:
        'Turn every employee email into a marketing channel. Siggly helps you embed promotional banners, social links, and CTAs into email signatures.',
      keywords: [
        'employee advocacy',
        'email marketing',
        'signature banners',
        'brand ambassadors',
        'employee branding',
      ],
      canonical: '/use-cases/employee-advocacy',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Use Cases', url: '/use-cases' },
      { name: 'Employee Advocacy', url: '/use-cases/employee-advocacy' },
    ],
    hero: {
      badge: { icon: 'users', text: 'Employee Advocacy' },
      title: 'Turn Every Employee Into a Brand Ambassador',
      description:
        'Your team sends thousands of emails every day. With Siggly, each one becomes a powerful marketing touchpoint featuring promotional banners, event announcements, and calls to action.',
      variant: 'dark',
    },
    stats: [
      { value: '650+', label: 'Brand impressions per employee per month' },
      { value: '4.5x', label: 'Higher engagement than social media ads' },
      { value: '32%', label: 'Increase in campaign click-through rates' },
    ],
    featuresTitle: 'Amplify Your Marketing Through Employee Emails',
    features: [
      {
        icon: 'target',
        title: 'Promotional Signature Banners',
        description:
          'Add eye-catching banners to employee signatures that promote events, product launches, webinars, or company news.',
      },
      {
        icon: 'bar-chart-3',
        title: 'Click Tracking & Analytics',
        description:
          'Measure the performance of every banner and link in your signatures. Track clicks, impressions, and conversion metrics in real time.',
      },
      {
        icon: 'calendar',
        title: 'Scheduled Banner Campaigns',
        description:
          'Schedule signature banners to go live and expire automatically, aligning perfectly with your marketing calendar.',
      },
      {
        icon: 'users',
        title: 'Team-Targeted Campaigns',
        description:
          'Deploy different promotional banners to different teams. Sales gets product promos while support shares satisfaction surveys.',
      },
    ],
    sections: [
      {
        type: 'benefits',
        title: 'Why Employee Advocacy Through Email Signatures Works',
        items: [
          {
            icon: 'trending-up',
            title: 'Massive Organic Reach',
            description:
              'Every employee email is a one-to-one marketing touchpoint with higher trust and engagement than traditional advertising.',
          },
          {
            icon: 'zap',
            title: 'Zero Extra Effort for Employees',
            description:
              'Employees do not need to do anything. Banners and promotions are automatically embedded in their signatures by admins.',
          },
          {
            icon: 'check-circle',
            title: 'Consistent Messaging',
            description:
              'Ensure every team member communicates the same promotional message, eliminating conflicting or outdated information.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'We replaced our entire internal email newsletter with signature banners. The engagement was five times higher and it cost us nothing extra. Siggly made employee advocacy effortless.',
      authorName: 'David Chen',
      authorTitle: 'VP of Marketing, BrightPath Solutions',
    },
    faqs: [
      {
        question: 'How many banner campaigns can I run simultaneously?',
        answer:
          'There is no limit. You can run multiple banner campaigns across different teams, departments, or the entire organization at the same time.',
      },
      {
        question: 'Can I track how many clicks each banner receives?',
        answer:
          'Yes. Siggly provides detailed analytics for every banner including click counts, click-through rates, and engagement trends over time.',
      },
      {
        question: 'Do employees need to manually add banners to their signatures?',
        answer:
          'No. Admins control banners centrally. Employees automatically receive the latest banner in their signature without any manual action required.',
      },
      {
        question: 'Can I schedule banners to start and stop on specific dates?',
        answer:
          'Absolutely. Set start and end dates for any banner campaign. Siggly will automatically activate and deactivate banners according to your schedule.',
      },
      {
        question: 'Will banners display correctly on mobile email clients?',
        answer:
          'Yes. All Siggly banners are fully responsive and optimized to display correctly on desktop and mobile email clients alike.',
      },
    ],
    cta: {
      title: 'Unlock the Marketing Power of Employee Email',
      description:
        'Transform every outgoing email into a branded marketing opportunity. Launch your first signature banner campaign in minutes.',
    },
  },

  // 3. Regulatory Compliance
  {
    slug: 'regulatory-compliance',
    category: 'use-cases',
    meta: {
      title: 'Email Signature Regulatory Compliance | Siggly',
      description:
        'Meet legal and regulatory requirements with compliant email signatures. Siggly automates disclaimers, certifications, and legal notices.',
      keywords: [
        'regulatory compliance',
        'email disclaimers',
        'legal email signatures',
        'GDPR compliance',
        'email regulations',
      ],
      canonical: '/use-cases/regulatory-compliance',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Use Cases', url: '/use-cases' },
      { name: 'Regulatory Compliance', url: '/use-cases/regulatory-compliance' },
    ],
    hero: {
      badge: { icon: 'shield-check', text: 'Compliance' },
      title: 'Stay Compliant with Every Email You Send',
      description:
        'Industries like finance, healthcare, and legal require specific disclaimers and notices in email communications. Siggly ensures every signature meets your regulatory obligations automatically.',
      variant: 'violet',
    },
    stats: [
      { value: '100%', label: 'Disclaimer compliance rate' },
      { value: '0', label: 'Compliance violations since deployment' },
      { value: '15min', label: 'Average time to deploy compliance updates' },
    ],
    featuresTitle: 'Compliance Features Built for Regulated Industries',
    features: [
      {
        icon: 'file-text',
        title: 'Automated Legal Disclaimers',
        description:
          'Automatically append required legal disclaimers, confidentiality notices, and regulatory text to every employee email signature.',
      },
      {
        icon: 'shield',
        title: 'Industry-Specific Templates',
        description:
          'Use pre-built compliance templates designed for finance, healthcare, legal, insurance, and government sectors.',
      },
      {
        icon: 'lock',
        title: 'Tamper-Proof Compliance Fields',
        description:
          'Lock compliance-critical fields so employees cannot accidentally remove or modify required legal text.',
      },
      {
        icon: 'globe',
        title: 'Multi-Jurisdiction Support',
        description:
          'Apply different disclaimers based on employee location or jurisdiction, ensuring compliance with regional regulations.',
      },
      {
        icon: 'clock',
        title: 'Compliance Audit Trail',
        description:
          'Maintain a complete audit trail of all signature changes, deployments, and compliance updates for regulatory review.',
      },
    ],
    sections: [
      {
        type: 'checklist',
        title: 'Compliance Requirements Covered by Siggly',
        items: [
          'GDPR-compliant data handling disclosures',
          'Financial services regulatory disclaimers (SEC, FCA, FINRA)',
          'Healthcare confidentiality notices (HIPAA)',
          'Legal profession ethical notices',
          'Company registration and incorporation details',
          'Confidentiality and privilege notices',
        ],
      },
      {
        type: 'how-it-works',
        title: 'How Siggly Keeps You Compliant',
        steps: [
          {
            step: '1',
            title: 'Select Your Industry Requirements',
            description:
              'Choose from pre-built compliance templates or create custom disclaimer text that matches your specific regulatory needs.',
          },
          {
            step: '2',
            title: 'Configure Rules and Conditions',
            description:
              'Set rules to apply different disclaimers based on department, location, or recipient type for precise compliance control.',
          },
          {
            step: '3',
            title: 'Deploy and Monitor',
            description:
              'Push compliant signatures to your entire organization and monitor compliance status through the admin dashboard.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'As a financial services firm, compliance is non-negotiable. Siggly gave us the confidence that every single email leaving our organization meets regulatory requirements. It eliminated a major source of risk.',
      authorName: 'Margaret Thornton',
      authorTitle: 'Chief Compliance Officer, Sterling Capital Advisors',
    },
    faqs: [
      {
        question: 'Can I apply different disclaimers to different departments?',
        answer:
          'Yes. Siggly supports conditional disclaimer rules that let you apply specific legal text based on department, role, location, or any other organizational attribute.',
      },
      {
        question: 'How do I update disclaimers when regulations change?',
        answer:
          'Simply update the disclaimer text in your Siggly admin panel. Changes are pushed to all affected employees instantly with no manual intervention required.',
      },
      {
        question: 'Does Siggly provide an audit trail for compliance reviews?',
        answer:
          'Yes. Every signature change, deployment, and update is logged with timestamps and user information, giving you a complete audit trail for regulatory reviews.',
      },
      {
        question: 'Can employees remove or modify compliance disclaimers?',
        answer:
          'No. Compliance fields are locked and tamper-proof. Only administrators with appropriate permissions can modify compliance-related signature content.',
      },
    ],
    cta: {
      title: 'Eliminate Compliance Risk from Email Signatures',
      description:
        'Automate legal disclaimers, confidentiality notices, and regulatory text across your entire organization. Stay compliant effortlessly.',
    },
  },

  // 4. Company Rebranding
  {
    slug: 'company-rebranding',
    category: 'use-cases',
    meta: {
      title: 'Email Signature Company Rebranding | Siggly',
      description:
        'Execute a flawless company rebrand across all email signatures. Siggly lets you update logos, colors, and branding for every employee instantly.',
      keywords: [
        'company rebranding',
        'brand refresh',
        'email signature update',
        'corporate rebrand',
      ],
      canonical: '/use-cases/company-rebranding',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Use Cases', url: '/use-cases' },
      { name: 'Company Rebranding', url: '/use-cases/company-rebranding' },
    ],
    hero: {
      badge: { icon: 'refresh-cw', text: 'Rebranding' },
      title: 'Rebrand Your Email Signatures in Minutes, Not Months',
      description:
        'A company rebrand touches every communication channel. With Siggly, you can update every employee email signature with your new logo, colors, and messaging simultaneously on launch day.',
      variant: 'emerald',
    },
    stats: [
      { value: '1 day', label: 'To rebrand all email signatures' },
      { value: '100%', label: 'Employee adoption on launch day' },
      { value: '0', label: 'Old branding signatures remaining' },
    ],
    featuresTitle: 'Tools for a Seamless Rebrand Rollout',
    features: [
      {
        icon: 'rocket',
        title: 'Instant Company-Wide Deployment',
        description:
          'Push new branding to every employee signature at the exact moment your rebrand goes live. No staggered rollouts or stragglers.',
      },
      {
        icon: 'palette',
        title: 'Brand Asset Swap',
        description:
          'Replace logos, colors, fonts, and social links across all templates with a single update. No need to edit signatures one by one.',
      },
      {
        icon: 'eye',
        title: 'Pre-Launch Preview',
        description:
          'Preview your new branded signatures across all email clients before going live. Catch rendering issues before they reach customers.',
      },
      {
        icon: 'calendar',
        title: 'Scheduled Go-Live',
        description:
          'Schedule your signature rebrand to go live at a specific date and time, perfectly coordinated with your broader launch timeline.',
      },
      {
        icon: 'bar-chart-3',
        title: 'Rollout Monitoring',
        description:
          'Track rebrand adoption in real time. See which employees have the new signatures and identify any holdouts instantly.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'How to Rebrand Email Signatures with Siggly',
        steps: [
          {
            step: '1',
            title: 'Upload New Brand Assets',
            description:
              'Add your new logo, updated brand colors, and any revised social media links to your Siggly brand library.',
          },
          {
            step: '2',
            title: 'Update Templates',
            description:
              'Modify your signature templates to reflect the new branding. Preview them across different email clients to ensure perfect rendering.',
          },
          {
            step: '3',
            title: 'Schedule and Deploy',
            description:
              'Set a go-live date or deploy immediately. Every employee receives the updated signature automatically with zero manual effort.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'We rebranded our 500-person company over a weekend. Monday morning, every single email going out had the new logo, colors, and tagline. Without Siggly, that would have taken weeks of IT tickets.',
      authorName: 'Ryan Mitchell',
      authorTitle: 'CTO, Lumina Technologies',
    },
    faqs: [
      {
        question: 'Can I schedule the rebrand to go live at a specific time?',
        answer:
          'Yes. Siggly allows you to schedule signature updates for a precise date and time, so your email rebrand launches in sync with your broader brand reveal.',
      },
      {
        question: 'What happens to old signatures after the rebrand?',
        answer:
          'Old signatures are automatically replaced. No employee will continue using outdated branding once the new templates are deployed.',
      },
      {
        question: 'Can I preview new signatures before deploying them?',
        answer:
          'Absolutely. Use the built-in preview tool to see how your new branded signatures will render across Outlook, Gmail, Apple Mail, and other clients.',
      },
      {
        question: 'How do I handle a phased rebrand across different regions?',
        answer:
          'Siggly supports group-based deployments. You can rebrand signatures for specific offices, regions, or departments on different schedules.',
      },
      {
        question: 'Do employees need to take any action during the rebrand?',
        answer:
          'No. The entire rebrand process is handled centrally by administrators. Employees do not need to take any action whatsoever.',
      },
    ],
    cta: {
      title: 'Launch Your Rebrand Across Every Email Signature',
      description:
        'Coordinate a flawless rebrand rollout across your entire organization. Update every signature simultaneously with zero employee effort.',
    },
  },

  // 5. Onboarding Automation
  {
    slug: 'onboarding-automation',
    category: 'use-cases',
    meta: {
      title: 'Email Signature Onboarding Automation | Siggly',
      description:
        'Automate email signature setup for new hires. Siggly provisions professional, on-brand signatures as part of your employee onboarding workflow.',
      keywords: [
        'onboarding automation',
        'new hire email signature',
        'employee onboarding',
        'automated provisioning',
        'HR automation',
      ],
      canonical: '/use-cases/onboarding-automation',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Use Cases', url: '/use-cases' },
      { name: 'Onboarding Automation', url: '/use-cases/onboarding-automation' },
    ],
    hero: {
      badge: { icon: 'user-plus', text: 'Onboarding' },
      title: 'Automate Email Signatures for Every New Hire',
      description:
        'New employees should have a professional email signature from their very first email. Siggly automates signature provisioning as part of your onboarding process, eliminating manual setup entirely.',
      variant: 'indigo',
    },
    stats: [
      { value: '0 min', label: 'Manual setup time per new hire' },
      { value: '100%', label: 'Day-one signature readiness' },
      { value: '30hrs', label: 'IT time saved per year on onboarding' },
    ],
    featuresTitle: 'Streamline New Hire Signature Provisioning',
    features: [
      {
        icon: 'zap',
        title: 'Automatic Signature Generation',
        description:
          'New hires receive a professionally designed, on-brand email signature the moment their account is created. No IT tickets needed.',
      },
      {
        icon: 'users',
        title: 'Directory Integration',
        description:
          'Sync with your HR system or employee directory to automatically pull name, title, department, and contact details into signatures.',
      },
      {
        icon: 'settings',
        title: 'Role-Based Templates',
        description:
          'Automatically assign the correct signature template based on department, role, or location. Sales gets one design, engineering another.',
      },
      {
        icon: 'check-circle',
        title: 'Onboarding Verification',
        description:
          'Confirm that every new hire has a properly configured signature as part of your onboarding checklist and compliance workflow.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'How Onboarding Automation Works',
        steps: [
          {
            step: '1',
            title: 'Connect Your Directory',
            description:
              'Integrate Siggly with your HR system, Active Directory, or Google Workspace to detect new employee accounts automatically.',
          },
          {
            step: '2',
            title: 'Map Templates to Roles',
            description:
              'Assign signature templates to departments, teams, or roles so new hires automatically get the right signature design.',
          },
          {
            step: '3',
            title: 'Automatic Provisioning',
            description:
              'When a new employee is added to your directory, Siggly generates and deploys their signature instantly with no manual steps.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'We onboard about 20 new hires per month. Before Siggly, each one required a support ticket for their email signature. Now it is fully automated and I never have to think about it.',
      authorName: 'Angela Rivera',
      authorTitle: 'IT Operations Manager, Cascade Health Systems',
    },
    faqs: [
      {
        question: 'Does Siggly integrate with our HR system?',
        answer:
          'Siggly integrates with popular HR platforms and employee directories including Google Workspace, Microsoft 365, and Azure Active Directory to automatically provision signatures for new hires.',
      },
      {
        question: 'Can different departments get different signature designs?',
        answer:
          'Yes. You can map specific signature templates to departments, teams, roles, or locations. New hires automatically receive the template that matches their organizational assignment.',
      },
      {
        question: 'What information is needed to generate a signature?',
        answer:
          'Siggly pulls employee details like name, title, department, phone number, and email from your directory. Any missing information can be filled in manually or left optional.',
      },
      {
        question: 'How quickly is a signature ready after a new account is created?',
        answer:
          'Signatures are generated within minutes of a new account being detected. Your new hire will have a professional signature ready for their very first email.',
      },
      {
        question: 'Can I review signatures before they are deployed to new hires?',
        answer:
          'Yes. You can configure Siggly to require admin approval before deploying signatures, or use fully automatic mode for hands-free provisioning.',
      },
    ],
    cta: {
      title: 'Automate Signatures for Every New Hire',
      description:
        'Eliminate manual email signature setup from your onboarding process. Every new employee gets a professional signature from day one.',
    },
  },

  // 6. Campaign Tracking
  {
    slug: 'campaign-tracking',
    category: 'use-cases',
    meta: {
      title: 'Email Signature Campaign Tracking | Siggly',
      description:
        'Track the performance of email signature marketing campaigns. Siggly provides analytics on banner clicks, impressions, and conversions.',
      keywords: [
        'campaign tracking',
        'email signature analytics',
        'banner performance',
        'marketing metrics',
        'click tracking',
      ],
      canonical: '/use-cases/campaign-tracking',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Use Cases', url: '/use-cases' },
      { name: 'Campaign Tracking', url: '/use-cases/campaign-tracking' },
    ],
    hero: {
      badge: { icon: 'bar-chart-3', text: 'Analytics' },
      title: 'Measure the Impact of Every Email Signature Campaign',
      description:
        'Stop guessing whether your email signature banners are working. Siggly gives you detailed analytics on clicks, impressions, and engagement so you can optimize every campaign for maximum ROI.',
      variant: 'slate',
    },
    stats: [
      { value: '3.2%', label: 'Average banner click-through rate' },
      { value: '50K+', label: 'Impressions tracked per campaign' },
      { value: '24hr', label: 'Real-time reporting updates' },
    ],
    featuresTitle: 'Analytics That Drive Smarter Campaigns',
    features: [
      {
        icon: 'bar-chart-3',
        title: 'Real-Time Click Analytics',
        description:
          'Track every click on every banner in real time. See which campaigns, teams, and messages drive the most engagement.',
      },
      {
        icon: 'trending-up',
        title: 'Conversion Tracking',
        description:
          'Measure how signature banner clicks convert into leads, sign-ups, or sales by integrating with your marketing analytics stack.',
      },
      {
        icon: 'target',
        title: 'A/B Testing',
        description:
          'Run A/B tests on banner designs, messaging, and calls to action to find the highest-performing combinations.',
      },
      {
        icon: 'filter',
        title: 'Segment-Level Reporting',
        description:
          'Break down campaign performance by department, region, or team to understand which segments drive the best results.',
      },
      {
        icon: 'calendar',
        title: 'Campaign Performance History',
        description:
          'Review historical performance across all campaigns. Identify trends and patterns that inform future strategy.',
      },
    ],
    sections: [
      {
        type: 'benefits',
        title: 'Benefits of Tracking Signature Campaigns',
        items: [
          {
            icon: 'eye',
            title: 'Full Visibility',
            description:
              'See exactly how your email signature campaigns perform with click-level data and engagement metrics.',
          },
          {
            icon: 'zap',
            title: 'Faster Optimization',
            description:
              'Use real-time data to quickly swap underperforming banners for better-performing alternatives.',
          },
          {
            icon: 'check-circle',
            title: 'Prove Marketing ROI',
            description:
              'Demonstrate the value of signature marketing with hard data on impressions, clicks, and conversions.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Siggly showed us that our email signature banners were driving more qualified leads than our paid social campaigns. The analytics dashboard gave our marketing team the proof they needed to double down on this channel.',
      authorName: 'Laura Simmons',
      authorTitle: 'Director of Digital Marketing, NovaBridge Inc.',
    },
    faqs: [
      {
        question: 'What metrics does Siggly track for signature campaigns?',
        answer:
          'Siggly tracks clicks, click-through rates, impressions, engagement by department and region, and integrates with external tools for conversion tracking.',
      },
      {
        question: 'Can I run A/B tests on different banner designs?',
        answer:
          'Yes. Siggly supports A/B testing where you can compare two or more banner variants to determine which one resonates most with your audience.',
      },
      {
        question: 'Does Siggly integrate with Google Analytics or other tools?',
        answer:
          'Siggly supports UTM parameters on all banner links, making it easy to track signature campaign performance in Google Analytics, HubSpot, or any other marketing platform.',
      },
      {
        question: 'How far back can I view campaign history?',
        answer:
          'Siggly retains full campaign performance history for as long as your account is active. You can review and compare campaigns from any time period.',
      },
    ],
    cta: {
      title: 'Start Tracking Your Email Signature Campaigns',
      description:
        'Get full visibility into how your email signature banners perform. Make data-driven decisions that maximize your marketing ROI.',
    },
  },

  // 7. Team Offboarding
  {
    slug: 'team-offboarding',
    category: 'use-cases',
    meta: {
      title: 'Email Signature Team Offboarding | Siggly',
      description:
        'Manage email signatures when employees leave. Siggly automates signature removal and updates during the offboarding process securely.',
      keywords: [
        'team offboarding',
        'employee departure',
        'signature removal',
        'offboarding automation',
      ],
      canonical: '/use-cases/team-offboarding',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Use Cases', url: '/use-cases' },
      { name: 'Team Offboarding', url: '/use-cases/team-offboarding' },
    ],
    hero: {
      badge: { icon: 'user-minus', text: 'Offboarding' },
      title: 'Clean, Secure Email Signature Offboarding',
      description:
        'When employees leave, their email signatures should not linger with outdated information. Siggly automates signature cleanup during offboarding to protect your brand and security.',
      variant: 'light',
    },
    stats: [
      { value: '100%', label: 'Departed employee signatures cleaned up' },
      { value: '< 1hr', label: 'Time to revoke signature access' },
      { value: '0', label: 'Orphaned signatures with outdated info' },
    ],
    featuresTitle: 'Offboarding Features That Protect Your Organization',
    features: [
      {
        icon: 'user-minus',
        title: 'Automatic Signature Removal',
        description:
          'When an employee is removed from your directory, their Siggly signature is automatically deactivated. No lingering access or outdated information.',
      },
      {
        icon: 'shield',
        title: 'Security-First Offboarding',
        description:
          'Ensure departing employees cannot continue using company-branded signatures after their last day, protecting your organization from misrepresentation.',
      },
      {
        icon: 'clock',
        title: 'Scheduled Deactivation',
        description:
          'Schedule signature deactivation for a specific date aligned with the employee departure date for precise timing.',
      },
      {
        icon: 'file-text',
        title: 'Offboarding Audit Log',
        description:
          'Maintain a complete record of all signature deactivations and offboarding actions for compliance and HR documentation.',
      },
    ],
    sections: [
      {
        type: 'checklist',
        title: 'Employee Offboarding Signature Checklist',
        items: [
          'Remove employee from active signature template assignment',
          'Deactivate their personal signature immediately',
          'Remove employee from any active banner campaigns',
          'Archive signature data for compliance records',
          'Update team member counts in department templates',
          'Verify no shared mailbox signatures reference departed employee',
        ],
      },
    ],
    testimonial: {
      quote:
        'We had a former employee whose branded signature was still being used months after they left. That was a serious brand risk. With Siggly, offboarding now includes automatic signature removal and we never worry about it.',
      authorName: 'Thomas Grant',
      authorTitle: 'HR Director, Meridian Consulting Group',
    },
    faqs: [
      {
        question: 'What happens to signatures when an employee is removed from the directory?',
        answer:
          'Siggly detects the removal automatically and deactivates the employee signature. You can also manually deactivate signatures at any time from the admin dashboard.',
      },
      {
        question: 'Can I schedule signature deactivation for a future date?',
        answer:
          'Yes. You can set a specific deactivation date that aligns with the employee last day, ensuring the signature remains active until exactly when it should not.',
      },
      {
        question: 'Is offboarding data retained for compliance purposes?',
        answer:
          'Yes. Siggly archives offboarding records including when signatures were deactivated, by whom, and full change history for audit and compliance needs.',
      },
      {
        question: 'Can a deactivated signature be reactivated if an employee returns?',
        answer:
          'Yes. If an employee returns to the organization, their previous signature configuration can be restored and reactivated from the archive.',
      },
    ],
    cta: {
      title: 'Secure Your Offboarding Process',
      description:
        'Automate email signature removal when employees depart. Protect your brand and security with clean, thorough offboarding.',
    },
  },

  // 8. Multi-Office Management
  {
    slug: 'multi-office-management',
    category: 'use-cases',
    meta: {
      title: 'Multi-Office Email Signature Management | Siggly',
      description:
        'Manage email signatures across multiple office locations. Siggly supports location-specific details, regional branding, and global oversight.',
      keywords: [
        'multi-office management',
        'multiple locations',
        'regional email signatures',
        'global signature management',
        'office locations',
      ],
      canonical: '/use-cases/multi-office-management',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Use Cases', url: '/use-cases' },
      { name: 'Multi-Office Management', url: '/use-cases/multi-office-management' },
    ],
    hero: {
      badge: { icon: 'building', text: 'Multi-Office' },
      title: 'Manage Email Signatures Across Every Office Location',
      description:
        'Whether you have two offices or two hundred, Siggly gives you centralized control over email signatures while supporting location-specific addresses, phone numbers, and regional branding.',
      variant: 'dark',
    },
    stats: [
      { value: '50+', label: 'Office locations managed from one dashboard' },
      { value: '100%', label: 'Location-accurate contact details' },
      { value: '1', label: 'Central dashboard for all offices' },
    ],
    featuresTitle: 'Signature Management for Multi-Location Organizations',
    features: [
      {
        icon: 'building',
        title: 'Location-Specific Signatures',
        description:
          'Each office gets signatures with the correct local address, phone number, and office-specific details while maintaining brand consistency.',
      },
      {
        icon: 'globe',
        title: 'Regional Branding Variations',
        description:
          'Support regional brand variations including localized logos, language-specific disclaimers, and market-appropriate messaging.',
      },
      {
        icon: 'layout',
        title: 'Centralized Dashboard',
        description:
          'Manage all office locations from a single admin dashboard. Push updates globally or target specific locations as needed.',
      },
      {
        icon: 'users',
        title: 'Office Group Management',
        description:
          'Organize employees by office location for easy template assignment and targeted banner campaigns per location.',
      },
      {
        icon: 'settings',
        title: 'Delegated Administration',
        description:
          'Grant local office managers limited admin access to manage their own office signatures within your global brand guidelines.',
      },
    ],
    sections: [
      {
        type: 'use-cases-grid',
        title: 'Multi-Office Scenarios Siggly Handles',
        cases: [
          {
            title: 'Headquarters + Branch Offices',
            description:
              'Maintain unified branding while each branch displays its own local address and contact information.',
          },
          {
            title: 'International Offices',
            description:
              'Support multilingual disclaimers, regional phone formats, and country-specific legal requirements.',
          },
          {
            title: 'Remote-First with Hubs',
            description:
              'Give remote employees signatures tied to their nearest hub office or a generic corporate signature.',
          },
          {
            title: 'Franchise Networks',
            description:
              'Allow individual franchise locations to maintain local identity within corporate brand standards.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'We have 12 offices across 4 countries. Before Siggly, keeping signatures consistent while showing the right local details was an impossible task. Now it takes five minutes to manage all of them from one place.',
      authorName: 'Sophia Laurent',
      authorTitle: 'Global Operations Director, Athena Logistics',
    },
    faqs: [
      {
        question: 'Can each office have its own address and phone number in signatures?',
        answer:
          'Yes. Siggly automatically populates location-specific contact details for each office while maintaining consistent branding, layout, and design across all locations.',
      },
      {
        question: 'Can I manage all offices from a single dashboard?',
        answer:
          'Absolutely. The Siggly admin dashboard provides centralized control over all office locations, with the ability to filter, search, and manage signatures by location.',
      },
      {
        question: 'Can local office managers edit their own signatures?',
        answer:
          'Yes. You can delegate limited admin access to local managers, allowing them to update office-specific details without modifying global brand elements.',
      },
      {
        question: 'How are employees assigned to office locations?',
        answer:
          'Employees can be assigned to offices manually, via directory sync, or through group-based rules that automatically match employees to their correct office location.',
      },
    ],
    cta: {
      title: 'Unify Signatures Across All Your Offices',
      description:
        'Manage location-specific email signatures from a single dashboard. Maintain brand consistency while supporting local details for every office.',
    },
  },

  // 9. Contractor Management
  {
    slug: 'contractor-management',
    category: 'use-cases',
    meta: {
      title: 'Contractor Email Signature Management | Siggly',
      description:
        'Provide contractors and freelancers with professional branded email signatures. Siggly makes it easy to manage temporary team member signatures.',
      keywords: [
        'contractor management',
        'freelancer email signatures',
        'temporary staff branding',
        'contractor onboarding',
      ],
      canonical: '/use-cases/contractor-management',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Use Cases', url: '/use-cases' },
      { name: 'Contractor Management', url: '/use-cases/contractor-management' },
    ],
    hero: {
      badge: { icon: 'briefcase', text: 'Contractors' },
      title: 'Professional Email Signatures for Contractors and Freelancers',
      description:
        'Contractors represent your brand too. Siggly provides temporary, branded email signatures for freelancers and external team members with automatic expiration and easy management.',
      variant: 'violet',
    },
    stats: [
      { value: '5min', label: 'To provision a contractor signature' },
      { value: '100%', label: 'Brand compliance for external team' },
      { value: 'Auto', label: 'Signature expiration on contract end' },
    ],
    featuresTitle: 'Signature Management Built for Flexible Teams',
    features: [
      {
        icon: 'briefcase',
        title: 'Contractor-Specific Templates',
        description:
          'Create dedicated signature templates for contractors that clearly identify their role while maintaining your brand standards.',
      },
      {
        icon: 'clock',
        title: 'Auto-Expiring Signatures',
        description:
          'Set contract end dates and signatures are automatically deactivated when the engagement ends. No cleanup required.',
      },
      {
        icon: 'user-check',
        title: 'Quick Provisioning',
        description:
          'Provision branded signatures for new contractors in minutes. No IT involvement needed. Just add their details and deploy.',
      },
      {
        icon: 'shield',
        title: 'Access Controls',
        description:
          'Limit what contractors can modify in their signatures. Keep brand elements locked while allowing personal contact details.',
      },
      {
        icon: 'layers',
        title: 'Separate Contractor Groups',
        description:
          'Manage contractor signatures separately from full-time employees with distinct groups, templates, and policies.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'How Contractor Signature Management Works',
        steps: [
          {
            step: '1',
            title: 'Add Contractor Details',
            description:
              'Enter the contractor name, role, contact info, and contract end date into Siggly. No directory integration required.',
          },
          {
            step: '2',
            title: 'Assign a Template',
            description:
              'Choose a contractor-specific signature template that identifies them as an external team member while maintaining brand consistency.',
          },
          {
            step: '3',
            title: 'Deploy and Auto-Expire',
            description:
              'The contractor receives their branded signature immediately. When their contract ends, the signature is automatically deactivated.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'We work with dozens of freelancers at any given time. Siggly lets us give them all professional signatures that match our brand, and they automatically disappear when contracts end. It is a huge time saver.',
      authorName: 'Marcus Webb',
      authorTitle: 'Head of Operations, Pixel & Code Agency',
    },
    faqs: [
      {
        question: 'Can contractor signatures look different from employee signatures?',
        answer:
          'Yes. You can create distinct templates for contractors that maintain your brand identity while clearly identifying them as external team members or consultants.',
      },
      {
        question: 'Do contractor signatures expire automatically?',
        answer:
          'Yes. When you set a contract end date, Siggly automatically deactivates the contractor signature on that date. You can also manually deactivate at any time.',
      },
      {
        question: 'Do contractors need to be in our company directory?',
        answer:
          'No. Contractors can be added manually to Siggly without needing access to your company directory, Active Directory, or Google Workspace.',
      },
      {
        question: 'Can I reactivate a contractor signature for a returning freelancer?',
        answer:
          'Yes. If a contractor returns for a new engagement, you can reactivate their previous signature or provision a new one in just a few minutes.',
      },
      {
        question: 'Is there a limit to how many contractors I can manage?',
        answer:
          'There is no limit on the number of contractor signatures you can manage. Siggly scales to accommodate teams of any size.',
      },
    ],
    cta: {
      title: 'Give Every Contractor a Professional Signature',
      description:
        'Provision branded email signatures for contractors in minutes. Auto-expire them when contracts end. No IT overhead required.',
    },
  },

  // 10. Client Communication
  {
    slug: 'client-communication',
    category: 'use-cases',
    meta: {
      title: 'Email Signature Client Communication | Siggly',
      description:
        'Enhance client-facing email communications with professional signatures. Siggly ensures every client interaction reflects your brand quality.',
      keywords: [
        'client communication',
        'professional email signatures',
        'client-facing emails',
        'business communication',
      ],
      canonical: '/use-cases/client-communication',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Use Cases', url: '/use-cases' },
      { name: 'Client Communication', url: '/use-cases/client-communication' },
    ],
    hero: {
      badge: { icon: 'send', text: 'Client Comms' },
      title: 'Make Every Client Email a Professional Impression',
      description:
        'First impressions matter, and many happen over email. Siggly ensures every client-facing email carries a polished, professional signature with easy access to your contact details and resources.',
      variant: 'emerald',
    },
    stats: [
      { value: '92%', label: 'Of clients notice email signature quality' },
      { value: '3x', label: 'More likely to trust a branded email' },
      { value: '45%', label: 'Increase in meeting bookings via signature links' },
    ],
    featuresTitle: 'Elevate Every Client Interaction',
    features: [
      {
        icon: 'star',
        title: 'Professional Signature Design',
        description:
          'Present a polished, consistent image to every client with beautifully designed signatures that reflect your brand quality.',
      },
      {
        icon: 'phone',
        title: 'Easy Contact Access',
        description:
          'Include clickable phone numbers, calendar booking links, and office addresses so clients can reach you through their preferred channel.',
      },
      {
        icon: 'award',
        title: 'Credential & Certification Display',
        description:
          'Showcase professional certifications, awards, and accreditations directly in your signature to build client trust and credibility.',
      },
      {
        icon: 'mouse-pointer-click',
        title: 'Meeting Booking Links',
        description:
          'Embed calendar scheduling links in signatures so clients can book meetings with one click, reducing back-and-forth scheduling emails.',
      },
    ],
    sections: [
      {
        type: 'benefits',
        title: 'How Better Signatures Improve Client Relationships',
        items: [
          {
            icon: 'heart',
            title: 'Build Trust Instantly',
            description:
              'A professional, consistent email signature signals credibility and attention to detail, building client confidence from the first interaction.',
          },
          {
            icon: 'trending-up',
            title: 'Drive More Engagement',
            description:
              'Signature links to booking pages, case studies, and resources give clients easy paths to deepen their engagement with your business.',
          },
          {
            icon: 'users',
            title: 'Unified Team Presence',
            description:
              'When every team member has matching professional signatures, clients perceive a cohesive, well-organized team behind the scenes.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Our consulting team communicates with C-suite executives daily. Siggly gave us signatures that match the caliber of our work. Clients have actually commented on how professional our emails look.',
      authorName: 'Patricia Nakamura',
      authorTitle: 'Managing Partner, Evergreen Strategic Advisory',
    },
    faqs: [
      {
        question: 'Can I include booking links in employee signatures?',
        answer:
          'Yes. Siggly supports embedding Calendly, Microsoft Bookings, and other scheduling tool links directly in employee signatures for easy client meeting booking.',
      },
      {
        question: 'Can different client-facing teams have different signature designs?',
        answer:
          'Absolutely. Create tailored signature templates for sales, support, consulting, and other client-facing teams that suit their specific communication needs.',
      },
      {
        question: 'Can I showcase awards or certifications in signatures?',
        answer:
          'Yes. You can add certification badges, award icons, and accreditation logos to signatures to build credibility with clients.',
      },
      {
        question: 'Do signature links work on mobile email?',
        answer:
          'Yes. All links, buttons, and contact details in Siggly signatures are fully functional on mobile email clients, ensuring clients can reach you from any device.',
      },
      {
        question: 'Can signatures include social proof elements?',
        answer:
          'Yes. You can include client testimonial snippets, review ratings, case study links, or trust badges in your signatures to reinforce your credibility.',
      },
    ],
    cta: {
      title: 'Impress Every Client with Professional Signatures',
      description:
        'Ensure every client-facing email reflects the quality of your work. Deploy polished, branded signatures across your entire team.',
    },
  },

  // 11. Event Promotion
  {
    slug: 'event-promotion',
    category: 'use-cases',
    meta: {
      title: 'Email Signature Event Promotion | Siggly',
      description:
        'Promote events, webinars, and conferences through employee email signatures. Siggly turns every outgoing email into an event marketing channel.',
      keywords: [
        'event promotion',
        'email signature marketing',
        'webinar promotion',
        'conference marketing',
        'event banners',
      ],
      canonical: '/use-cases/event-promotion',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Use Cases', url: '/use-cases' },
      { name: 'Event Promotion', url: '/use-cases/event-promotion' },
    ],
    hero: {
      badge: { icon: 'calendar', text: 'Events' },
      title: 'Promote Your Events Through Every Employee Email',
      description:
        'Conferences, webinars, product launches, and trade shows deserve maximum visibility. Siggly lets you embed event banners and registration links in every employee email signature.',
      variant: 'indigo',
    },
    stats: [
      { value: '28%', label: 'Boost in event registrations' },
      { value: '100K+', label: 'Event impressions per campaign' },
      { value: '$0', label: 'Additional advertising spend required' },
    ],
    featuresTitle: 'Event Promotion Tools in Every Signature',
    features: [
      {
        icon: 'calendar',
        title: 'Event Banner Campaigns',
        description:
          'Design eye-catching event banners with registration links that appear in every employee email signature during your promotion window.',
      },
      {
        icon: 'clock',
        title: 'Countdown & Auto-Removal',
        description:
          'Set event dates and Siggly automatically removes the banner once the event has passed. No stale promotions cluttering signatures.',
      },
      {
        icon: 'target',
        title: 'Targeted Promotion',
        description:
          'Show event banners only to teams whose contacts are most relevant. Sales promotes sales events, engineering promotes tech talks.',
      },
      {
        icon: 'bar-chart-3',
        title: 'Registration Click Tracking',
        description:
          'Track how many event registrations originate from email signature banners versus other marketing channels.',
      },
    ],
    sections: [
      {
        type: 'use-cases-grid',
        title: 'Events You Can Promote Through Signatures',
        cases: [
          {
            title: 'Webinars & Online Events',
            description:
              'Drive registrations for virtual events with clickable banners that link directly to your registration page.',
          },
          {
            title: 'Industry Conferences',
            description:
              'Let contacts know you will be exhibiting or speaking at an upcoming conference and invite them to visit your booth.',
          },
          {
            title: 'Product Launches',
            description:
              'Build anticipation for upcoming product launches with teaser banners that link to landing pages.',
          },
          {
            title: 'Company Milestones',
            description:
              'Celebrate anniversaries, achievements, and milestones with banners that reinforce your brand story.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'We added a webinar banner to all 150 employee signatures and saw a 35% increase in registrations compared to our previous webinar. Siggly turned our team into a free promotion engine.',
      authorName: 'Kevin O\'Brien',
      authorTitle: 'Events Manager, SummitPoint Technologies',
    },
    faqs: [
      {
        question: 'How do I add an event banner to employee signatures?',
        answer:
          'Upload your event banner image, set the registration link, choose which teams should display it, and set start and end dates. Siggly handles the rest automatically.',
      },
      {
        question: 'Does the banner automatically disappear after the event?',
        answer:
          'Yes. When you set an end date for the event campaign, Siggly automatically removes the banner from all signatures once the event has passed.',
      },
      {
        question: 'Can I track how many registrations came from signature banners?',
        answer:
          'Yes. Siggly tracks banner clicks and supports UTM parameters so you can attribute event registrations specifically to your email signature campaign.',
      },
      {
        question: 'Can different teams promote different events?',
        answer:
          'Absolutely. You can run multiple event campaigns simultaneously, targeting different teams with different event promotions based on relevance.',
      },
    ],
    cta: {
      title: 'Boost Event Registrations with Email Signatures',
      description:
        'Turn every employee email into an event promotion channel. Drive registrations and awareness with zero additional ad spend.',
    },
  },

  // 12. Seasonal Campaigns
  {
    slug: 'seasonal-campaigns',
    category: 'use-cases',
    meta: {
      title: 'Seasonal Email Signature Campaigns | Siggly',
      description:
        'Run seasonal and holiday email signature campaigns with ease. Siggly lets you schedule themed signatures that auto-activate and deactivate.',
      keywords: [
        'seasonal campaigns',
        'holiday email signatures',
        'themed signatures',
        'seasonal marketing',
        'holiday branding',
      ],
      canonical: '/use-cases/seasonal-campaigns',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Use Cases', url: '/use-cases' },
      { name: 'Seasonal Campaigns', url: '/use-cases/seasonal-campaigns' },
    ],
    hero: {
      badge: { icon: 'sparkles', text: 'Seasonal' },
      title: 'Seasonal Email Signature Campaigns That Run Themselves',
      description:
        'From holiday greetings to end-of-year promotions, Siggly lets you schedule seasonal signature themes and banners that automatically activate and deactivate on the dates you choose.',
      variant: 'slate',
    },
    stats: [
      { value: '12+', label: 'Seasonal campaigns per year' },
      { value: '40%', label: 'Higher engagement on seasonal banners' },
      { value: '0', label: 'Manual effort to swap seasonal themes' },
    ],
    featuresTitle: 'Seasonal Campaign Features',
    features: [
      {
        icon: 'calendar',
        title: 'Scheduled Activations',
        description:
          'Plan your entire year of seasonal signature campaigns in advance. Each one activates and deactivates automatically on your chosen dates.',
      },
      {
        icon: 'sparkles',
        title: 'Themed Signature Designs',
        description:
          'Apply seasonal flair to signatures with themed banners, color accents, and promotional messaging that match the occasion.',
      },
      {
        icon: 'refresh-cw',
        title: 'Automatic Reversion',
        description:
          'When a seasonal campaign ends, signatures automatically revert to their standard design. No cleanup needed from IT or marketing.',
      },
      {
        icon: 'layers',
        title: 'Campaign Library',
        description:
          'Save and reuse seasonal campaign templates year after year. Duplicate last year holiday campaign and update it in minutes.',
      },
      {
        icon: 'tag',
        title: 'Promotional Offers',
        description:
          'Embed seasonal discount codes, promotional offers, and limited-time deals directly in employee signatures.',
      },
    ],
    sections: [
      {
        type: 'use-cases-grid',
        title: 'Seasonal Campaign Ideas',
        cases: [
          {
            title: 'Holiday Greetings',
            description:
              'Add festive holiday messages and themed designs to signatures during the end-of-year holiday season.',
          },
          {
            title: 'End-of-Quarter Promotions',
            description:
              'Promote quarterly sales, special offers, or clearance events through signature banners.',
          },
          {
            title: 'Back-to-School Campaigns',
            description:
              'Relevant for education, retail, and tech companies running seasonal back-to-school promotions.',
          },
          {
            title: 'New Year & Fresh Start',
            description:
              'Ring in the new year with updated messaging, new branding, or resolution-themed promotions.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'We plan all 12 months of seasonal campaigns at the start of the year. Siggly handles everything automatically. Holiday banners go up and come down without anyone lifting a finger.',
      authorName: 'Emily Tran',
      authorTitle: 'Marketing Manager, Harvest Retail Co.',
    },
    faqs: [
      {
        question: 'Can I schedule seasonal campaigns months in advance?',
        answer:
          'Yes. You can plan and schedule your entire year of seasonal signature campaigns upfront. Each campaign will automatically activate and deactivate on the dates you specify.',
      },
      {
        question: 'What happens when a seasonal campaign ends?',
        answer:
          'Signatures automatically revert to your standard default design when the seasonal campaign end date passes. No manual intervention is required.',
      },
      {
        question: 'Can I reuse campaigns from previous years?',
        answer:
          'Yes. Save campaigns to your library and duplicate them for future use. Update the messaging or design as needed and schedule the new dates.',
      },
      {
        question: 'Can different offices run different seasonal campaigns?',
        answer:
          'Absolutely. Target seasonal campaigns to specific offices, regions, or departments. This is especially useful for international teams with different holiday calendars.',
      },
    ],
    cta: {
      title: 'Automate Your Seasonal Signature Campaigns',
      description:
        'Plan, schedule, and forget. Siggly runs your seasonal campaigns automatically so your signatures are always timely and relevant.',
    },
  },

  // 13. Email Security
  {
    slug: 'email-security',
    category: 'use-cases',
    meta: {
      title: 'Email Signature Security | Siggly',
      description:
        'Strengthen email security with managed signatures. Siggly prevents phishing impersonation, unauthorized branding, and ensures sender authenticity.',
      keywords: [
        'email security',
        'phishing prevention',
        'signature authentication',
        'brand protection',
        'email fraud prevention',
      ],
      canonical: '/use-cases/email-security',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Use Cases', url: '/use-cases' },
      { name: 'Email Security', url: '/use-cases/email-security' },
    ],
    hero: {
      badge: { icon: 'shield', text: 'Security' },
      title: 'Protect Your Organization with Secure Email Signatures',
      description:
        'Unsecured email signatures are a vector for phishing, impersonation, and brand abuse. Siggly provides centrally managed, tamper-proof signatures that strengthen your email security posture.',
      variant: 'light',
    },
    stats: [
      { value: '91%', label: 'Of cyberattacks start with email' },
      { value: '100%', label: 'Tamper-proof signature deployment' },
      { value: '0', label: 'Unauthorized signature modifications' },
    ],
    featuresTitle: 'Security-First Email Signature Management',
    features: [
      {
        icon: 'shield-check',
        title: 'Tamper-Proof Signatures',
        description:
          'Employees cannot modify, replace, or remove their managed signatures, preventing impersonation and ensuring consistent sender identity.',
      },
      {
        icon: 'lock',
        title: 'Centralized Control',
        description:
          'Only authorized administrators can create, modify, and deploy signatures. No shadow IT or rogue signature edits.',
      },
      {
        icon: 'key',
        title: 'Role-Based Access Control',
        description:
          'Define who can manage signatures with granular permissions. Limit access to trusted administrators and compliance officers.',
      },
      {
        icon: 'eye',
        title: 'Signature Integrity Monitoring',
        description:
          'Monitor all signature deployments and changes. Get alerts if any anomalies or unauthorized modifications are detected.',
      },
      {
        icon: 'file-text',
        title: 'Complete Audit Trail',
        description:
          'Every signature creation, modification, deployment, and deactivation is logged for security review and incident investigation.',
      },
    ],
    sections: [
      {
        type: 'checklist',
        title: 'Email Signature Security Best Practices',
        items: [
          'Use centrally managed signatures instead of user-edited ones',
          'Lock all brand elements to prevent impersonation',
          'Maintain an audit trail of all signature changes',
          'Implement role-based access control for signature administration',
          'Automatically deactivate signatures for departed employees',
          'Regularly review and update signature compliance policies',
        ],
      },
    ],
    testimonial: {
      quote:
        'We experienced a phishing incident where someone impersonated our CEO using a copied email signature. After switching to Siggly, our signatures are centrally controlled and tamper-proof. That attack vector is now closed.',
      authorName: 'James Whitfield',
      authorTitle: 'CISO, Fortis Financial Group',
    },
    faqs: [
      {
        question: 'How does Siggly prevent email signature impersonation?',
        answer:
          'Siggly centrally manages all signatures so employees cannot create or modify their own. This eliminates the risk of anyone copying or forging a company signature for phishing purposes.',
      },
      {
        question: 'Can employees modify their managed signatures?',
        answer:
          'No. Managed signatures are deployed centrally and cannot be edited, replaced, or removed by employees. Only authorized administrators can make changes.',
      },
      {
        question: 'Does Siggly maintain a log of all signature changes?',
        answer:
          'Yes. Every action taken on signatures including creation, modification, deployment, and deactivation is logged with timestamps and user attribution for complete auditability.',
      },
      {
        question: 'How does role-based access control work?',
        answer:
          'You define which team members have admin access to manage signatures. Permissions can be scoped by department, location, or function to ensure least-privilege access.',
      },
    ],
    cta: {
      title: 'Secure Your Email Signatures Today',
      description:
        'Eliminate signature-based impersonation risks with centrally managed, tamper-proof email signatures. Protect your brand and your people.',
    },
  },

  // 14. Department Management
  {
    slug: 'department-management',
    category: 'use-cases',
    meta: {
      title: 'Department Email Signature Management | Siggly',
      description:
        'Manage email signatures by department with unique templates and branding. Siggly gives each team the right signature for their role.',
      keywords: [
        'department management',
        'team signatures',
        'department branding',
        'role-based signatures',
        'team email management',
      ],
      canonical: '/use-cases/department-management',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Use Cases', url: '/use-cases' },
      { name: 'Department Management', url: '/use-cases/department-management' },
    ],
    hero: {
      badge: { icon: 'layers', text: 'Departments' },
      title: 'Tailored Email Signatures for Every Department',
      description:
        'Sales, engineering, support, and marketing all communicate differently. Siggly lets you create department-specific email signatures that match each team role while maintaining company-wide brand consistency.',
      variant: 'dark',
    },
    stats: [
      { value: '10+', label: 'Departments managed from one platform' },
      { value: '100%', label: 'Role-appropriate signature assignment' },
      { value: '5min', label: 'To deploy templates to a new department' },
    ],
    featuresTitle: 'Department-Level Signature Control',
    features: [
      {
        icon: 'layers',
        title: 'Department-Specific Templates',
        description:
          'Create unique signature templates for each department. Sales gets booking links, support gets ticket submission links, engineering gets tech blog links.',
      },
      {
        icon: 'users',
        title: 'Automatic Department Assignment',
        description:
          'Sync with your directory to automatically assign employees to the correct department template based on their organizational unit.',
      },
      {
        icon: 'settings',
        title: 'Department Admin Delegation',
        description:
          'Give department heads the ability to manage their own team signatures within the guardrails set by your brand and compliance teams.',
      },
      {
        icon: 'layout',
        title: 'Unified Brand Framework',
        description:
          'All department templates share a common brand framework ensuring consistency in logo placement, colors, and layout across the organization.',
      },
      {
        icon: 'refresh-cw',
        title: 'Bulk Department Updates',
        description:
          'Update all signatures in a department simultaneously. When a team restructures, re-assign templates in bulk with a few clicks.',
      },
      {
        icon: 'monitor',
        title: 'Department Compliance Dashboard',
        description:
          'View signature compliance status by department. Quickly identify which teams have up-to-date signatures and which need attention.',
      },
    ],
    sections: [
      {
        type: 'use-cases-grid',
        title: 'Department Signature Variations',
        cases: [
          {
            title: 'Sales Team',
            description:
              'Signatures with calendar booking links, product pages, and promotional banners for ongoing campaigns.',
          },
          {
            title: 'Customer Support',
            description:
              'Signatures linking to knowledge bases, ticket portals, and satisfaction survey forms.',
          },
          {
            title: 'Engineering',
            description:
              'Clean signatures with links to developer documentation, tech blogs, and open-source projects.',
          },
          {
            title: 'Executive Leadership',
            description:
              'Premium signature designs showcasing credentials, LinkedIn profiles, and company mission statements.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Our sales team needed booking links, support needed ticket links, and executives wanted a premium look. Siggly let us give each department exactly what they needed while keeping everything on-brand.',
      authorName: 'Nina Kowalski',
      authorTitle: 'Director of Internal Communications, Vantage Corp.',
    },
    faqs: [
      {
        question: 'Can each department have a completely different signature design?',
        answer:
          'Yes, within brand guidelines. Each department can have a unique template with different layouts, links, and content while sharing core brand elements like logo and colors.',
      },
      {
        question: 'How are employees assigned to department templates?',
        answer:
          'Employees can be assigned automatically through directory sync or manually by administrators. When an employee moves departments, their signature template updates accordingly.',
      },
      {
        question: 'Can department managers control their own team signatures?',
        answer:
          'Yes. You can delegate management to department heads, giving them the ability to customize their team templates within the boundaries set by global brand guidelines.',
      },
      {
        question: 'What happens when an employee transfers to a new department?',
        answer:
          'When the employee department changes in your directory, Siggly automatically assigns them the new department signature template. Manual reassignment is also available.',
      },
    ],
    cta: {
      title: 'Give Every Department the Right Signature',
      description:
        'Manage department-specific email signatures from one platform. Ensure every team member has a signature tailored to their role.',
    },
  },

  // 15. Partner Branding
  {
    slug: 'partner-branding',
    category: 'use-cases',
    meta: {
      title: 'Partner Branding Email Signatures | Siggly',
      description:
        'Co-brand email signatures with partners, resellers, and affiliates. Siggly supports dual logos, partner badges, and joint branding templates.',
      keywords: [
        'partner branding',
        'co-branded signatures',
        'channel partner emails',
        'affiliate branding',
        'reseller signatures',
      ],
      canonical: '/use-cases/partner-branding',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Use Cases', url: '/use-cases' },
      { name: 'Partner Branding', url: '/use-cases/partner-branding' },
    ],
    hero: {
      badge: { icon: 'award', text: 'Partner Branding' },
      title: 'Co-Branded Email Signatures for Your Partner Network',
      description:
        'Partners, resellers, and affiliates represent your brand to their customers. Siggly provides co-branded email signature templates that showcase both your brand and theirs in a professional, unified format.',
      variant: 'violet',
    },
    stats: [
      { value: '100%', label: 'Partner brand compliance' },
      { value: '2x', label: 'Brand visibility through partner emails' },
      { value: '50+', label: 'Partners managed in one dashboard' },
    ],
    featuresTitle: 'Partner Branding Features',
    features: [
      {
        icon: 'award',
        title: 'Co-Branded Templates',
        description:
          'Create signature templates that feature both your logo and your partner logo side by side, reinforcing the strength of your partnership.',
      },
      {
        icon: 'shield-check',
        title: 'Brand Asset Protection',
        description:
          'Control how your brand appears in partner signatures. Lock logo placement, sizing, and colors to prevent brand misuse.',
      },
      {
        icon: 'globe',
        title: 'Partner Portal',
        description:
          'Give partners a self-service portal where they can generate their co-branded signatures using your approved templates and assets.',
      },
      {
        icon: 'tag',
        title: 'Partner Tier Badges',
        description:
          'Display partner tier badges like Gold, Silver, or Platinum in signatures to communicate partner status to recipients.',
      },
      {
        icon: 'flag',
        title: 'Campaign Coordination',
        description:
          'Coordinate promotional banner campaigns across your partner network. Launch joint marketing messages through partner email signatures.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'How Partner Branding Works with Siggly',
        steps: [
          {
            step: '1',
            title: 'Create Partner Templates',
            description:
              'Design co-branded signature templates that combine your brand identity with placeholders for partner logos and details.',
          },
          {
            step: '2',
            title: 'Invite Partners',
            description:
              'Invite partner organizations to Siggly where they can access their co-branded templates and generate signatures for their team.',
          },
          {
            step: '3',
            title: 'Maintain Brand Control',
            description:
              'Your brand elements remain locked and protected. Partners can customize only their own details within your approved template framework.',
          },
        ],
      },
      {
        type: 'benefits',
        title: 'Why Co-Branded Signatures Strengthen Partnerships',
        items: [
          {
            icon: 'trending-up',
            title: 'Amplified Brand Reach',
            description:
              'Every email your partners send carries your brand, extending your visibility to their entire customer base and network.',
          },
          {
            icon: 'shield',
            title: 'Consistent Brand Representation',
            description:
              'Ensure partners always use your current logo, approved colors, and correct brand positioning. No outdated or distorted assets.',
          },
          {
            icon: 'star',
            title: 'Elevated Partner Status',
            description:
              'Co-branded signatures with partner tier badges elevate the perceived status of your partners, strengthening the relationship.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'We have over 40 channel partners. Before Siggly, each one used our logo differently in their emails. Now they all use approved co-branded signatures that look fantastic and protect our brand integrity.',
      authorName: 'Robert Chang',
      authorTitle: 'VP of Channel Partnerships, CloudReach Solutions',
    },
    faqs: [
      {
        question: 'Can partners generate their own co-branded signatures?',
        answer:
          'Yes. Partners can access a self-service portal where they generate co-branded signatures using your approved templates. They enter their own details while your brand elements remain locked.',
      },
      {
        question: 'How do I protect my brand assets in partner signatures?',
        answer:
          'All your brand elements including logo, colors, and positioning are locked in the template. Partners cannot modify, resize, or reposition your branding in any way.',
      },
      {
        question: 'Can I display different partner tier levels in signatures?',
        answer:
          'Yes. Add partner tier badges such as Gold, Silver, Platinum, or Certified to signatures so recipients can see the partner level at a glance.',
      },
      {
        question: 'Can I run joint promotional campaigns through partner signatures?',
        answer:
          'Absolutely. Deploy promotional banners and campaign messaging across your entire partner network signatures, coordinating joint marketing efforts seamlessly.',
      },
      {
        question: 'Is there a limit to how many partners I can manage?',
        answer:
          'No. Siggly scales to support any number of partner organizations, each with their own co-branded templates, users, and campaign assignments.',
      },
    ],
    cta: {
      title: 'Extend Your Brand Through Partner Signatures',
      description:
        'Equip your partner network with professional co-branded email signatures. Protect your brand while amplifying reach through every partner email.',
    },
  },
];
