import type { SEOLandingPageData } from '../types';

export const industriesPages: SEOLandingPageData[] = [
  // ─── Manufacturing ───────────────────────────────────────────────────
  {
    slug: 'manufacturing',
    category: 'industries',
    meta: {
      title: 'Email Signatures for Manufacturing | Siggly',
      description:
        'Standardize email signatures across plants, offices, and field teams. Siggly helps manufacturing companies project a unified, professional brand.',
      keywords: [
        'manufacturing email signatures',
        'factory email branding',
        'industrial email management',
        'manufacturing team signatures',
      ],
      canonical: '/industries/manufacturing',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Industries', url: '/industries' },
      { name: 'Manufacturing', url: '/industries/manufacturing' },
    ],
    hero: {
      badge: { icon: 'building', text: 'Manufacturing Solutions' },
      title: 'Professional Email Signatures Built for Manufacturing Teams',
      description:
        'From the factory floor to the boardroom, ensure every email reflects your manufacturing brand. Siggly gives you centralized control over signatures across plants, divisions, and global offices.',
      variant: 'light',
    },
    stats: [
      { value: '500+', label: 'Manufacturing teams' },
      { value: '98%', label: 'Brand consistency' },
      { value: '15 min', label: 'Average deployment' },
      { value: '40%', label: 'Fewer IT tickets' },
    ],
    features: [
      {
        icon: 'building-2',
        title: 'Multi-Plant Management',
        description:
          'Manage email signatures across multiple facilities, divisions, and subsidiaries from a single dashboard with location-based templates.',
      },
      {
        icon: 'shield-check',
        title: 'Compliance-Ready Signatures',
        description:
          'Include ISO certifications, safety disclaimers, and regulatory notices automatically in every outgoing email from your organization.',
      },
      {
        icon: 'users',
        title: 'Workforce Scalability',
        description:
          'Easily onboard seasonal workers and contractors with automated signature provisioning that scales with your workforce demands.',
      },
      {
        icon: 'refresh-cw',
        title: 'Automated Updates',
        description:
          'Push signature updates across all employees instantly when certifications change, new products launch, or branding refreshes occur.',
      },
      {
        icon: 'globe',
        title: 'Global Brand Consistency',
        description:
          'Maintain a unified brand identity across international offices while accommodating local languages and regional compliance requirements.',
      },
    ],
    featuresTitle: 'Why Manufacturing Teams Choose Siggly',
    sections: [
      {
        type: 'checklist',
        title: 'Email Signature Essentials for Manufacturing',
        items: [
          'Company logo and brand colors on every email',
          'ISO and quality certification badges displayed',
          'Safety and compliance disclaimers included automatically',
          'Department and plant location identifiers',
          'Product catalog or trade show banner promotions',
          'Consistent formatting across all shifts and teams',
        ],
      },
      {
        type: 'use-cases-grid',
        title: 'How Manufacturing Companies Use Siggly',
        cases: [
          {
            title: 'Supply Chain Communications',
            description:
              'Ensure vendor and supplier emails carry professional, branded signatures with procurement contact details.',
          },
          {
            title: 'Quality Assurance Teams',
            description:
              'Display ISO certifications and quality standards directly in QA team email signatures.',
          },
          {
            title: 'Trade Show Promotions',
            description:
              'Add event banners to employee signatures in the weeks leading up to industry conferences.',
          },
          {
            title: 'Safety & Compliance',
            description:
              'Include mandatory legal disclaimers and safety notices in all outbound communications.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Siggly helped us standardize signatures across 12 plants in 4 countries. Our procurement and sales teams finally look like they belong to the same company.',
      authorName: 'Grant Hollister',
      authorTitle: 'IT Director, Anvil Forge Industries',
    },
    faqs: [
      {
        question: 'Can Siggly handle signatures for multiple manufacturing plants?',
        answer:
          'Yes. Siggly supports multi-location management, letting you create plant-specific templates while enforcing company-wide branding standards from a single admin dashboard.',
      },
      {
        question: 'How do I include compliance disclaimers in signatures?',
        answer:
          'You can add legal disclaimers, safety notices, and certification badges as standard blocks in your signature templates. These are applied automatically to every user in the assigned group.',
      },
      {
        question: 'Does Siggly integrate with our existing email system?',
        answer:
          'Siggly works with Microsoft 365, Google Workspace, and other major email platforms. Signatures are deployed without requiring changes to your existing email infrastructure.',
      },
      {
        question: 'Can we display ISO certification logos in our signatures?',
        answer:
          'Absolutely. You can upload certification badges and logos to your signature templates, ensuring every email showcases your quality standards.',
      },
      {
        question: 'How quickly can we roll out signatures to all employees?',
        answer:
          'Most manufacturing companies deploy Siggly across their entire workforce in under 30 minutes. Bulk provisioning and group-based templates make large-scale rollouts fast.',
      },
    ],
    cta: {
      title: 'Unify Your Manufacturing Brand',
      description:
        'Deploy professional, compliant email signatures across every plant and office. Start your free trial today.',
    },
  },

  // ─── Retail ──────────────────────────────────────────────────────────
  {
    slug: 'retail',
    category: 'industries',
    meta: {
      title: 'Email Signatures for Retail | Siggly',
      description:
        'Drive foot traffic and online sales with branded retail email signatures. Promote seasonal campaigns and store locations in every email.',
      keywords: [
        'retail email signatures',
        'store email branding',
        'retail marketing signatures',
        'ecommerce email signatures',
      ],
      canonical: '/industries/retail',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Industries', url: '/industries' },
      { name: 'Retail', url: '/industries/retail' },
    ],
    hero: {
      badge: { icon: 'target', text: 'Retail Solutions' },
      title: 'Turn Every Email into a Retail Marketing Channel',
      description:
        'Promote sales, new arrivals, and store events through employee email signatures. Siggly helps retail brands transform routine emails into high-impact customer touchpoints.',
      variant: 'dark',
    },
    stats: [
      { value: '3x', label: 'More click-throughs' },
      { value: '700+', label: 'Retail brands' },
      { value: '5 min', label: 'Campaign updates' },
      { value: '20%', label: 'Promo engagement lift' },
    ],
    features: [
      {
        icon: 'sparkles',
        title: 'Seasonal Campaign Banners',
        description:
          'Swap promotional banners in employee signatures for Black Friday, holiday sales, new collections, and clearance events with one click.',
      },
      {
        icon: 'target',
        title: 'Store Locator Links',
        description:
          'Include dynamic store location links in signatures so customers can easily find their nearest retail location.',
      },
      {
        icon: 'trending-up',
        title: 'Promotion Tracking',
        description:
          'Track click-through rates on signature banners and links to measure the effectiveness of your email marketing campaigns.',
      },
      {
        icon: 'palette',
        title: 'On-Brand Designs',
        description:
          'Match your retail brand aesthetic perfectly with custom fonts, colors, and layouts that align with your visual identity.',
      },
      {
        icon: 'users',
        title: 'Multi-Store Management',
        description:
          'Manage signatures for corporate offices, regional managers, and individual store employees from a single platform.',
      },
    ],
    featuresTitle: 'Why Retail Teams Choose Siggly',
    sections: [
      {
        type: 'how-it-works',
        title: 'Launch a Retail Campaign in Minutes',
        steps: [
          {
            step: '1',
            title: 'Design Your Banner',
            description:
              'Upload a promotional banner for your sale, new collection, or seasonal event using the visual editor.',
          },
          {
            step: '2',
            title: 'Assign to Teams',
            description:
              'Select which stores, regions, or departments should display the promotional signature.',
          },
          {
            step: '3',
            title: 'Deploy Instantly',
            description:
              'Push the updated signature to hundreds of employees with a single click, no IT support needed.',
          },
          {
            step: '4',
            title: 'Track Results',
            description:
              'Monitor banner clicks and engagement to optimize future campaigns and measure ROI.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'During our holiday campaign, we added promotional banners to every store employee\'s signature. We saw a measurable increase in online traffic directly from email clicks.',
      authorName: 'Maya Robinson',
      authorTitle: 'Marketing Director, Ember & Oak Retail',
    },
    faqs: [
      {
        question: 'Can we run different promotions for different store locations?',
        answer:
          'Yes. Siggly lets you assign unique signature templates and banners to specific stores, regions, or departments, so each location can promote relevant local offers.',
      },
      {
        question: 'How quickly can we update signatures for flash sales?',
        answer:
          'Signature updates deploy in minutes. You can schedule campaigns in advance or push changes instantly for time-sensitive flash sales.',
      },
      {
        question: 'Do signature banners work on mobile email clients?',
        answer:
          'Yes. All Siggly signature designs are responsive and render correctly across desktop and mobile email clients including Gmail, Outlook, and Apple Mail.',
      },
      {
        question: 'Can part-time and seasonal staff get signatures too?',
        answer:
          'Absolutely. Siggly makes it easy to provision signatures for seasonal hires and remove them when their employment period ends.',
      },
      {
        question: 'Is there a way to measure the ROI of signature campaigns?',
        answer:
          'Siggly provides click tracking on signature banners and links so you can measure engagement and attribute traffic to your email signature campaigns.',
      },
    ],
    cta: {
      title: 'Make Every Email Sell for You',
      description:
        'Transform employee emails into a powerful retail marketing channel. Start free with Siggly.',
    },
  },

  // ─── Technology ──────────────────────────────────────────────────────
  {
    slug: 'technology',
    category: 'industries',
    meta: {
      title: 'Email Signatures for Technology Companies | Siggly',
      description:
        'Scalable email signature management for tech companies. Automate deployments, integrate with your stack, and maintain brand consistency.',
      keywords: [
        'tech company email signatures',
        'SaaS email branding',
        'developer email signatures',
        'technology startup signatures',
        'IT email management',
      ],
      canonical: '/industries/technology',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Industries', url: '/industries' },
      { name: 'Technology', url: '/industries/technology' },
    ],
    hero: {
      badge: { icon: 'monitor', text: 'Technology Solutions' },
      title: 'Email Signature Management That Scales with Your Tech Company',
      description:
        'From startups to enterprise tech, Siggly automates email signature management so your engineering, sales, and support teams always present a polished, professional image.',
      variant: 'violet',
    },
    stats: [
      { value: '1,200+', label: 'Tech companies' },
      { value: '99.9%', label: 'Uptime SLA' },
      { value: '<5 min', label: 'API deployment' },
      { value: '50%', label: 'Less IT overhead' },
    ],
    features: [
      {
        icon: 'zap',
        title: 'API-First Architecture',
        description:
          'Integrate signature management into your existing toolchain with a robust API. Automate provisioning through CI/CD pipelines or HR systems.',
      },
      {
        icon: 'database',
        title: 'Directory Sync',
        description:
          'Automatically sync employee data from Google Workspace, Microsoft 365, or your identity provider to keep signatures always up to date.',
      },
      {
        icon: 'layers',
        title: 'Template Versioning',
        description:
          'Manage signature templates like code with version history, rollback capability, and approval workflows for design changes.',
      },
      {
        icon: 'shield',
        title: 'Enterprise Security',
        description:
          'SOC 2 compliant infrastructure with SSO support, role-based access control, and audit logging for enterprise-grade security.',
      },
      {
        icon: 'rocket',
        title: 'Rapid Onboarding',
        description:
          'New hires automatically receive branded signatures the moment they are provisioned in your identity system, zero manual setup required.',
      },
      {
        icon: 'bar-chart-3',
        title: 'Analytics Dashboard',
        description:
          'Track signature deployment coverage, banner click-through rates, and identify employees with missing or outdated signatures.',
      },
    ],
    featuresTitle: 'Why Technology Teams Choose Siggly',
    sections: [
      {
        type: 'benefits',
        title: 'Built for How Tech Companies Work',
        items: [
          {
            icon: 'cog',
            title: 'Automated Provisioning',
            description:
              'Signatures are created and updated automatically as employees join, change roles, or leave your organization.',
          },
          {
            icon: 'lock',
            title: 'SSO & SCIM Support',
            description:
              'Integrate with Okta, Azure AD, or Google Identity for seamless, secure access management.',
          },
          {
            icon: 'globe',
            title: 'Multi-Region Support',
            description:
              'Manage signatures for distributed teams across time zones with localized content and language settings.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'We connected Siggly to our Google Workspace directory and every new engineer gets a perfectly branded signature on day one. It eliminated an entire onboarding step.',
      authorName: 'Arjun Kapoor',
      authorTitle: 'VP of Engineering, Zenith Cloud Labs',
    },
    faqs: [
      {
        question: 'Does Siggly offer an API for automation?',
        answer:
          'Yes. Siggly provides a comprehensive REST API that lets you automate signature creation, updates, and deployment as part of your existing DevOps or HR workflows.',
      },
      {
        question: 'Can Siggly integrate with our identity provider?',
        answer:
          'Siggly integrates with major identity providers including Google Workspace, Microsoft 365, Okta, and Azure Active Directory for automatic user synchronization.',
      },
      {
        question: 'How does Siggly handle fast-growing teams?',
        answer:
          'Siggly scales effortlessly. Whether you add 5 or 500 employees, signatures are automatically provisioned through directory sync without manual intervention.',
      },
      {
        question: 'Is Siggly secure enough for enterprise tech companies?',
        answer:
          'Siggly is built with enterprise security in mind, offering SSO, role-based access control, audit logs, and SOC 2 compliant infrastructure.',
      },
      {
        question: 'Can different departments have different signature styles?',
        answer:
          'Yes. You can create department-specific templates for engineering, sales, support, and marketing while enforcing company-wide brand guidelines.',
      },
    ],
    cta: {
      title: 'Automate Your Email Signatures',
      description:
        'Join 1,200+ tech companies using Siggly to manage email signatures at scale. Start your free trial.',
    },
  },

  // ─── Education ───────────────────────────────────────────────────────
  {
    slug: 'education',
    category: 'industries',
    meta: {
      title: 'Email Signatures for Education | Siggly',
      description:
        'Unified email signatures for schools, universities, and districts. Showcase accreditations, events, and enrollment campaigns effortlessly.',
      keywords: [
        'education email signatures',
        'university email branding',
        'school email signatures',
        'academic email management',
        'higher education signatures',
      ],
      canonical: '/industries/education',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Industries', url: '/industries' },
      { name: 'Education', url: '/industries/education' },
    ],
    hero: {
      badge: { icon: 'graduation-cap', text: 'Education Solutions' },
      title: 'Professional Email Signatures for Educational Institutions',
      description:
        'Give faculty, staff, and administrators polished email signatures that reflect your institution\'s prestige. Promote enrollment periods, open days, and accreditations in every email.',
      variant: 'emerald',
    },
    stats: [
      { value: '300+', label: 'Institutions served' },
      { value: '85%', label: 'Adoption in first week' },
      { value: '10 min', label: 'District-wide deployment' },
    ],
    features: [
      {
        icon: 'graduation-cap',
        title: 'Department-Specific Templates',
        description:
          'Create unique signature templates for different faculties, departments, and administrative units while maintaining institutional brand standards.',
      },
      {
        icon: 'award',
        title: 'Accreditation Showcase',
        description:
          'Display accreditation badges, rankings, and awards directly in email signatures to reinforce institutional credibility.',
      },
      {
        icon: 'sparkles',
        title: 'Event Promotion Banners',
        description:
          'Promote open days, enrollment deadlines, homecoming events, and fundraising campaigns through signature banners.',
      },
      {
        icon: 'users',
        title: 'Faculty & Staff Management',
        description:
          'Manage signatures for hundreds of faculty members, adjuncts, and staff with role-based templates and bulk deployment.',
      },
    ],
    featuresTitle: 'Why Education Institutions Choose Siggly',
    sections: [
      {
        type: 'use-cases-grid',
        title: 'Siggly Across Your Campus',
        cases: [
          {
            title: 'Admissions Office',
            description:
              'Include enrollment links and campus tour scheduling in admissions team signatures to drive prospective student engagement.',
          },
          {
            title: 'Faculty Communications',
            description:
              'Standardize professor and lecturer signatures with office hours, department info, and research profile links.',
          },
          {
            title: 'Alumni Relations',
            description:
              'Promote alumni events, donation campaigns, and networking opportunities through alumni office signatures.',
          },
          {
            title: 'Athletics Department',
            description:
              'Showcase team achievements, upcoming games, and season ticket information in athletic staff signatures.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'We deployed Siggly across our entire university system in a single afternoon. Every faculty member, from the provost to adjunct lecturers, now has a consistent, professional signature.',
      authorName: 'Dr. Patricia Holloway',
      authorTitle: 'CIO, Westfield State University',
    },
    faqs: [
      {
        question: 'Can different departments have unique signatures?',
        answer:
          'Yes. Siggly supports department-level templates so each faculty, school, or administrative unit can have its own design while staying within institutional brand guidelines.',
      },
      {
        question: 'How do we handle adjunct and part-time faculty?',
        answer:
          'You can easily provision and deprovision signatures for adjunct faculty, visiting scholars, and part-time staff as their appointments begin and end.',
      },
      {
        question: 'Can we promote enrollment campaigns in signatures?',
        answer:
          'Absolutely. Add promotional banners for enrollment periods, open houses, and application deadlines that are displayed in every staff email.',
      },
      {
        question: 'Does Siggly work with Google Workspace for Education?',
        answer:
          'Yes. Siggly fully integrates with Google Workspace for Education and Microsoft 365 Education, the two most common platforms in educational institutions.',
      },
      {
        question: 'Is there a discount for educational institutions?',
        answer:
          'Siggly offers special pricing for educational institutions. Contact our sales team to learn about our education pricing plans.',
      },
    ],
    cta: {
      title: 'Elevate Your Institution\'s Email Presence',
      description:
        'Deploy professional email signatures across your entire campus. Get started with Siggly for Education.',
    },
  },

  // ─── Nonprofit ───────────────────────────────────────────────────────
  {
    slug: 'nonprofit',
    category: 'industries',
    meta: {
      title: 'Email Signatures for Nonprofits | Siggly',
      description:
        'Amplify your nonprofit\'s mission in every email. Add donation links, event promos, and branding to staff signatures with Siggly.',
      keywords: [
        'nonprofit email signatures',
        'charity email branding',
        'NGO email management',
        'nonprofit marketing signatures',
      ],
      canonical: '/industries/nonprofit',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Industries', url: '/industries' },
      { name: 'Nonprofit', url: '/industries/nonprofit' },
    ],
    hero: {
      badge: { icon: 'heart', text: 'Nonprofit Solutions' },
      title: 'Turn Every Email into an Opportunity to Advance Your Mission',
      description:
        'Your team sends thousands of emails each week. Siggly helps nonprofits transform those emails into powerful touchpoints that promote campaigns, drive donations, and build awareness.',
      variant: 'indigo',
    },
    stats: [
      { value: '400+', label: 'Nonprofits served' },
      { value: '25%', label: 'Donation link clicks' },
      { value: '100%', label: 'Brand consistency' },
    ],
    features: [
      {
        icon: 'heart',
        title: 'Donation Call-to-Action',
        description:
          'Embed donation links and "Give Now" buttons directly in every staff email signature to create a passive fundraising channel.',
      },
      {
        icon: 'send',
        title: 'Campaign Promotion',
        description:
          'Promote annual fundraisers, volunteer drives, and awareness campaigns through signature banners that update organization-wide.',
      },
      {
        icon: 'users',
        title: 'Volunteer & Staff Management',
        description:
          'Manage signatures for full-time staff, part-time employees, and volunteers with role-appropriate templates and permissions.',
      },
      {
        icon: 'globe',
        title: 'Mission Statement Display',
        description:
          'Include your mission statement, social media links, and impact statistics in every outgoing email to reinforce your cause.',
      },
      {
        icon: 'star',
        title: 'Partner & Sponsor Recognition',
        description:
          'Showcase key sponsors, grant partners, and accreditation badges in email signatures to strengthen stakeholder relationships.',
      },
    ],
    featuresTitle: 'Why Nonprofits Choose Siggly',
    sections: [
      {
        type: 'checklist',
        title: 'Maximize Your Nonprofit Email Impact',
        items: [
          'Donation links in every outgoing email',
          'Seasonal campaign banners for fundraising events',
          'Social media profile links for community building',
          'Volunteer sign-up links in volunteer coordinator signatures',
          'Grant funder and sponsor recognition badges',
          'Mission statement and impact statistics',
        ],
      },
    ],
    testimonial: {
      quote:
        'Adding a donation link to every staff signature was the easiest fundraising win we have ever had. We saw a noticeable uptick in small donations within the first month.',
      authorName: 'Angela Torres',
      authorTitle: 'Development Director, Hope Forward Foundation',
    },
    faqs: [
      {
        question: 'Does Siggly offer nonprofit pricing?',
        answer:
          'Yes. Siggly provides discounted plans for registered nonprofit organizations. Contact our team to learn about our nonprofit pricing.',
      },
      {
        question: 'Can we include a donation button in signatures?',
        answer:
          'Absolutely. You can add clickable donation links, "Give Now" buttons, and fundraising campaign banners to every email signature across your organization.',
      },
      {
        question: 'How do we manage signatures for volunteers?',
        answer:
          'Volunteers can be assigned simplified signature templates with your branding. You can easily provision and remove signatures as volunteers come and go.',
      },
      {
        question: 'Can we change signature banners for different campaigns?',
        answer:
          'Yes. You can schedule banner changes in advance or update them instantly, making it easy to align signatures with your annual giving campaign, gala, or awareness month.',
      },
      {
        question: 'Is Siggly easy enough for non-technical staff?',
        answer:
          'Siggly is designed to be intuitive. Your communications or marketing team can manage all signature templates and deployments without any technical skills.',
      },
    ],
    cta: {
      title: 'Amplify Your Mission in Every Email',
      description:
        'Join hundreds of nonprofits using Siggly to promote donations, events, and awareness through professional email signatures.',
    },
  },

  // ─── Government ──────────────────────────────────────────────────────
  {
    slug: 'government',
    category: 'industries',
    meta: {
      title: 'Email Signatures for Government Agencies | Siggly',
      description:
        'Compliant, standardized email signatures for government agencies. Meet accessibility and branding requirements with centralized management.',
      keywords: [
        'government email signatures',
        'public sector email branding',
        'government agency signatures',
        'federal email compliance',
        'municipal email management',
      ],
      canonical: '/industries/government',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Industries', url: '/industries' },
      { name: 'Government', url: '/industries/government' },
    ],
    hero: {
      badge: { icon: 'landmark', text: 'Government Solutions' },
      title: 'Standardized Email Signatures for Government Agencies',
      description:
        'Meet compliance requirements, maintain accessibility standards, and project a professional public image with centrally managed email signatures for every department and division.',
      variant: 'slate',
    },
    stats: [
      { value: '200+', label: 'Government agencies' },
      { value: '100%', label: 'Compliance rate' },
      { value: 'WCAG', label: 'Accessible signatures' },
    ],
    features: [
      {
        icon: 'landmark',
        title: 'Agency-Wide Standardization',
        description:
          'Enforce uniform signature formatting across all departments, bureaus, and divisions to maintain a cohesive public-facing identity.',
      },
      {
        icon: 'shield-check',
        title: 'Regulatory Compliance',
        description:
          'Automatically include required legal disclaimers, confidentiality notices, and records retention statements in every email.',
      },
      {
        icon: 'eye',
        title: 'Accessibility Standards',
        description:
          'All signature templates are built to meet WCAG accessibility guidelines, ensuring emails are accessible to all recipients.',
      },
      {
        icon: 'lock',
        title: 'Secure Infrastructure',
        description:
          'Government-grade security with encrypted data storage, role-based access controls, and comprehensive audit trails.',
      },
      {
        icon: 'building-2',
        title: 'Department Hierarchy',
        description:
          'Mirror your organizational structure with hierarchical template management that supports agencies, departments, and sub-units.',
      },
    ],
    featuresTitle: 'Why Government Agencies Choose Siggly',
    sections: [
      {
        type: 'how-it-works',
        title: 'Deploying Siggly for Government',
        steps: [
          {
            step: '1',
            title: 'Define Brand Standards',
            description:
              'Work with your communications team to establish approved signature templates that meet agency branding and compliance guidelines.',
          },
          {
            step: '2',
            title: 'Configure Departments',
            description:
              'Set up your organizational hierarchy with department-specific templates, disclaimers, and contact information.',
          },
          {
            step: '3',
            title: 'Deploy to All Staff',
            description:
              'Roll out signatures across the agency through directory integration with no individual action required from employees.',
          },
          {
            step: '4',
            title: 'Maintain Compliance',
            description:
              'Use the admin dashboard to audit signature compliance, update disclaimers, and ensure ongoing adherence to standards.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Siggly allowed us to standardize email signatures across 14 departments and 2,000 employees in compliance with our state\'s branding guidelines. The audit trail feature is invaluable.',
      authorName: 'Robert Castillo',
      authorTitle: 'Chief Information Officer, City of Lakewood',
    },
    faqs: [
      {
        question: 'Does Siggly meet government security requirements?',
        answer:
          'Yes. Siggly provides enterprise-grade security with encrypted storage, role-based access, audit logging, and compliance with common government IT security standards.',
      },
      {
        question: 'Can we enforce a single signature format across all departments?',
        answer:
          'Absolutely. Administrators can lock signature templates so employees cannot modify branding, disclaimers, or formatting while still allowing personal details to populate automatically.',
      },
      {
        question: 'Are Siggly signatures accessible?',
        answer:
          'Yes. Siggly templates are designed to meet WCAG accessibility standards, including proper alt text, semantic structure, and sufficient color contrast.',
      },
      {
        question: 'Can elected officials have different signature templates?',
        answer:
          'Yes. You can create specialized templates for elected officials, appointed leadership, and general staff with different layouts and information fields.',
      },
      {
        question: 'How do we handle employee transfers between departments?',
        answer:
          'When an employee\'s department changes in your directory, Siggly automatically updates their signature to reflect their new department\'s template and information.',
      },
    ],
    cta: {
      title: 'Bring Consistency to Public Communications',
      description:
        'Deploy compliant, accessible email signatures across your agency. Get started with Siggly for Government.',
    },
  },

  // ─── Energy ──────────────────────────────────────────────────────────
  {
    slug: 'energy',
    category: 'industries',
    meta: {
      title: 'Email Signatures for Energy Companies | Siggly',
      description:
        'Professional email signatures for energy and utility companies. Include safety notices, compliance info, and brand standards effortlessly.',
      keywords: [
        'energy email signatures',
        'utility company email branding',
        'oil gas email signatures',
        'renewable energy signatures',
      ],
      canonical: '/industries/energy',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Industries', url: '/industries' },
      { name: 'Energy', url: '/industries/energy' },
    ],
    hero: {
      badge: { icon: 'zap', text: 'Energy Solutions' },
      title: 'Email Signatures Engineered for Energy Companies',
      description:
        'From renewable energy startups to established utilities, Siggly provides centralized signature management that keeps safety notices, compliance info, and branding consistent across your entire workforce.',
      variant: 'light',
    },
    stats: [
      { value: '150+', label: 'Energy companies' },
      { value: '30+', label: 'Countries supported' },
      { value: '99%', label: 'Compliance adherence' },
      { value: '10K+', label: 'Employees managed' },
    ],
    features: [
      {
        icon: 'shield-check',
        title: 'Safety & Compliance Notices',
        description:
          'Automatically include HSE disclaimers, safety certifications, and regulatory compliance statements in every outgoing email.',
      },
      {
        icon: 'globe',
        title: 'Multi-Region Operations',
        description:
          'Manage signatures across global operations with region-specific templates, languages, and regulatory requirements.',
      },
      {
        icon: 'building-2',
        title: 'Subsidiary Management',
        description:
          'Handle multiple subsidiaries, joint ventures, and partner companies with dedicated branding while maintaining corporate oversight.',
      },
      {
        icon: 'refresh-cw',
        title: 'Real-Time Updates',
        description:
          'Push safety notice changes and regulatory updates to all employees instantly across every office and field location.',
      },
    ],
    featuresTitle: 'Why Energy Companies Choose Siggly',
    sections: [
      {
        type: 'benefits',
        title: 'Signature Management for the Energy Sector',
        items: [
          {
            icon: 'shield',
            title: 'HSE Compliance',
            description:
              'Embed mandatory health, safety, and environment disclaimers that meet your regulatory obligations.',
          },
          {
            icon: 'users',
            title: 'Field Team Coverage',
            description:
              'Ensure field engineers, inspectors, and remote workers have professional signatures just like office staff.',
          },
          {
            icon: 'trending-up',
            title: 'Sustainability Messaging',
            description:
              'Highlight your sustainability initiatives, ESG commitments, and green certifications in every employee email.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Managing email signatures across our upstream, midstream, and downstream divisions used to be a nightmare. Siggly unified everything in a day.',
      authorName: 'Connor Walsh',
      authorTitle: 'IT Manager, Granite Peak Energy',
    },
    faqs: [
      {
        question: 'Can we include safety disclaimers in all signatures?',
        answer:
          'Yes. Siggly lets you add mandatory HSE disclaimers, confidentiality notices, and regulatory statements as locked blocks that appear in every employee signature.',
      },
      {
        question: 'How does Siggly handle multiple subsidiaries?',
        answer:
          'You can create separate branding profiles for each subsidiary or joint venture while maintaining corporate-level oversight and approval workflows.',
      },
      {
        question: 'Can field workers have mobile-optimized signatures?',
        answer:
          'Yes. All Siggly signatures are responsive and render correctly on mobile devices, which is essential for field personnel sending emails from phones and tablets.',
      },
      {
        question: 'Does Siggly support multiple languages for global operations?',
        answer:
          'Siggly supports multi-language signatures, allowing you to create region-specific templates in any language while maintaining global brand consistency.',
      },
    ],
    cta: {
      title: 'Power Up Your Email Communications',
      description:
        'Deploy compliant, branded email signatures across your energy company. Start your free trial today.',
    },
  },

  // ─── Insurance ───────────────────────────────────────────────────────
  {
    slug: 'insurance',
    category: 'industries',
    meta: {
      title: 'Email Signatures for Insurance Companies | Siggly',
      description:
        'Compliant email signatures for insurance agencies and carriers. Include license numbers, disclaimers, and professional branding automatically.',
      keywords: [
        'insurance email signatures',
        'insurance agent signatures',
        'insurance compliance email',
        'insurance agency branding',
      ],
      canonical: '/industries/insurance',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Industries', url: '/industries' },
      { name: 'Insurance', url: '/industries/insurance' },
    ],
    hero: {
      badge: { icon: 'shield', text: 'Insurance Solutions' },
      title: 'Compliant, Professional Email Signatures for Insurance Teams',
      description:
        'Insurance regulations demand precision. Siggly ensures every agent and underwriter email includes required license numbers, disclaimers, and professional designations while looking polished and on-brand.',
      variant: 'dark',
    },
    stats: [
      { value: '250+', label: 'Insurance companies' },
      { value: '100%', label: 'Disclaimer compliance' },
      { value: '80%', label: 'Time saved on setup' },
      { value: '35%', label: 'More policy inquiries' },
    ],
    features: [
      {
        icon: 'file-text',
        title: 'License & Designation Display',
        description:
          'Automatically include agent license numbers, professional designations like CLU or CPCU, and state-specific registration details.',
      },
      {
        icon: 'shield-check',
        title: 'Regulatory Disclaimers',
        description:
          'Add state-mandated disclaimers and compliance notices that update automatically when regulations change across different jurisdictions.',
      },
      {
        icon: 'user-check',
        title: 'Agent-Specific Signatures',
        description:
          'Give each agent a personalized signature with their photo, license number, specialties, and direct booking link for consultations.',
      },
      {
        icon: 'building-2',
        title: 'Multi-Office Agencies',
        description:
          'Manage signatures across multiple branch offices with location-specific contact details and regional compliance requirements.',
      },
      {
        icon: 'send',
        title: 'Quote & Policy Links',
        description:
          'Include direct links to quote tools, policy portals, and claims reporting in agent signatures to improve client self-service.',
      },
    ],
    featuresTitle: 'Why Insurance Teams Choose Siggly',
    sections: [
      {
        type: 'checklist',
        title: 'Insurance Email Signature Compliance Checklist',
        items: [
          'Agent license numbers displayed per state requirements',
          'Professional designations (CLU, CPCU, ChFC) included',
          'State-mandated disclaimers and disclosures',
          'Company NAIC number and registration info',
          'Errors & omissions disclaimer language',
          'Social media profile links for agent branding',
        ],
      },
    ],
    testimonial: {
      quote:
        'With agents across 12 states, keeping license numbers and disclaimers current was a constant headache. Siggly automated the entire process and eliminated our compliance risk.',
      authorName: 'Karen Mitchell',
      authorTitle: 'Compliance Director, Broadmoor Insurance Group',
    },
    faqs: [
      {
        question: 'Can agents display their license numbers in signatures?',
        answer:
          'Yes. Each agent\'s license number, professional designations, and state registration details can be included as required fields in their signature template.',
      },
      {
        question: 'How do we handle state-specific disclaimer requirements?',
        answer:
          'Siggly supports rule-based content, allowing you to assign different disclaimers based on an agent\'s state, lines of authority, or office location.',
      },
      {
        question: 'Can agents personalize their signatures?',
        answer:
          'Agents can add their photo and personal details within the template framework, while compliance elements like disclaimers and license info remain locked and enforced.',
      },
      {
        question: 'Does Siggly work with insurance CRM systems?',
        answer:
          'Siggly integrates with your existing email platform and can pull agent data from your directory or CRM to keep signatures always accurate.',
      },
      {
        question: 'Can we promote new insurance products through signatures?',
        answer:
          'Yes. You can add promotional banners for new policies, enrollment periods, or educational content to all agent signatures with a few clicks.',
      },
    ],
    cta: {
      title: 'Protect Your Brand and Stay Compliant',
      description:
        'Give every agent a compliant, professional email signature. Start your free trial with Siggly.',
    },
  },

  // ─── Telecommunications ──────────────────────────────────────────────
  {
    slug: 'telecommunications',
    category: 'industries',
    meta: {
      title: 'Email Signatures for Telecommunications | Siggly',
      description:
        'Manage email signatures across telecom sales, support, and engineering teams. Maintain brand consistency at enterprise scale with Siggly.',
      keywords: [
        'telecom email signatures',
        'telecommunications branding',
        'telecom company signatures',
        'ISP email management',
      ],
      canonical: '/industries/telecommunications',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Industries', url: '/industries' },
      { name: 'Telecommunications', url: '/industries/telecommunications' },
    ],
    hero: {
      badge: { icon: 'phone', text: 'Telecommunications Solutions' },
      title: 'Enterprise Email Signature Management for Telecom Companies',
      description:
        'Telecom companies communicate at massive scale. Siggly helps you maintain consistent, professional email signatures across sales, technical support, network operations, and executive teams.',
      variant: 'violet',
    },
    stats: [
      { value: '100+', label: 'Telecom providers' },
      { value: '50K+', label: 'Users managed' },
      { value: '12', label: 'Email platforms' },
      { value: '95%', label: 'Deployment rate' },
    ],
    features: [
      {
        icon: 'phone',
        title: 'Support Contact Integration',
        description:
          'Include direct support lines, ticket portal links, and service status pages in support team signatures for faster customer resolution.',
      },
      {
        icon: 'layers',
        title: 'Service Line Branding',
        description:
          'Create distinct signature templates for different service lines, whether wireless, broadband, enterprise, or managed services divisions.',
      },
      {
        icon: 'users',
        title: 'Large-Scale Deployment',
        description:
          'Deploy and manage signatures for thousands of employees across call centers, retail stores, offices, and field operations simultaneously.',
      },
      {
        icon: 'trending-up',
        title: 'Upsell & Cross-Sell Banners',
        description:
          'Promote new service plans, device launches, and bundle offers through strategic banner placements in customer-facing team signatures.',
      },
      {
        icon: 'settings',
        title: 'Centralized Administration',
        description:
          'Give regional managers the ability to customize local details while corporate marketing retains control over brand standards and messaging.',
      },
    ],
    featuresTitle: 'Why Telecommunications Companies Choose Siggly',
    sections: [
      {
        type: 'use-cases-grid',
        title: 'Siggly Across Your Telecom Organization',
        cases: [
          {
            title: 'Customer Support Centers',
            description:
              'Equip support agents with signatures that include ticket portal links, direct callback numbers, and satisfaction survey links.',
          },
          {
            title: 'Enterprise Sales Teams',
            description:
              'Arm B2B sales reps with signatures featuring service portfolio links, case studies, and meeting scheduling tools.',
          },
          {
            title: 'Network Operations',
            description:
              'Include service status page links and NOC contact information in network engineering team signatures.',
          },
          {
            title: 'Retail Store Staff',
            description:
              'Give retail employees signatures with store location details, appointment booking links, and current promotion banners.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'We manage over 8,000 email signatures across our consumer, enterprise, and wholesale divisions. Siggly made it possible to keep everyone on-brand without a dedicated team.',
      authorName: 'Renata Chang',
      authorTitle: 'Brand Director, NexGen Telecom',
    },
    faqs: [
      {
        question: 'Can Siggly handle tens of thousands of users?',
        answer:
          'Yes. Siggly is built for enterprise scale and actively manages signatures for telecom companies with over 50,000 employees across multiple divisions.',
      },
      {
        question: 'Can different divisions have different branding?',
        answer:
          'Absolutely. You can create distinct templates for consumer, enterprise, wholesale, and other divisions while maintaining corporate brand oversight.',
      },
      {
        question: 'How do we promote new services through signatures?',
        answer:
          'Siggly allows you to add promotional banners to specific team signatures, making it easy to promote new plans, devices, or bundle offers to customers through everyday emails.',
      },
      {
        question: 'Does Siggly integrate with telecom HR systems?',
        answer:
          'Siggly integrates with major directory and identity platforms. Employee data syncs automatically to keep signatures current as people join, move between teams, or leave.',
      },
    ],
    cta: {
      title: 'Connect Your Brand Across Every Team',
      description:
        'Manage email signatures at telecom scale. Start your free trial with Siggly today.',
    },
  },

  // ─── Transportation & Logistics ──────────────────────────────────────
  {
    slug: 'transportation-logistics',
    category: 'industries',
    meta: {
      title: 'Email Signatures for Transportation & Logistics | Siggly',
      description:
        'Professional email signatures for logistics, shipping, and transportation companies. Track shipments and build trust with every email.',
      keywords: [
        'logistics email signatures',
        'transportation email branding',
        'shipping company signatures',
        'freight email management',
        'supply chain signatures',
      ],
      canonical: '/industries/transportation-logistics',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Industries', url: '/industries' },
      {
        name: 'Transportation & Logistics',
        url: '/industries/transportation-logistics',
      },
    ],
    hero: {
      badge: { icon: 'truck', text: 'Transportation & Logistics Solutions' },
      title: 'Email Signatures That Move as Fast as Your Fleet',
      description:
        'From dispatchers to fleet managers, ensure every logistics email carries your brand, tracking links, and compliance information. Siggly keeps your transportation company connected and professional.',
      variant: 'emerald',
    },
    stats: [
      { value: '180+', label: 'Logistics companies' },
      { value: '15K+', label: 'Drivers & staff' },
      { value: '98%', label: 'Brand consistency' },
    ],
    features: [
      {
        icon: 'truck',
        title: 'Fleet & Operations Branding',
        description:
          'Create signatures for dispatchers, drivers, fleet managers, and warehouse staff that include relevant operational contact information.',
      },
      {
        icon: 'globe',
        title: 'Tracking Portal Links',
        description:
          'Include shipment tracking portal links directly in customer-facing team signatures so recipients can track orders with one click.',
      },
      {
        icon: 'shield-check',
        title: 'DOT & Compliance Info',
        description:
          'Display DOT numbers, MC authority, USDOT registration, and other regulatory information required in business communications.',
      },
      {
        icon: 'clock',
        title: 'Shift-Based Signatures',
        description:
          'Configure different contact information for different shifts so customers always reach the right team at the right time.',
      },
      {
        icon: 'building-2',
        title: 'Multi-Terminal Management',
        description:
          'Manage signatures across distribution centers, terminals, and regional offices with location-specific templates and contact details.',
      },
    ],
    featuresTitle: 'Why Transportation & Logistics Teams Choose Siggly',
    sections: [
      {
        type: 'checklist',
        title: 'Logistics Email Signature Must-Haves',
        items: [
          'Company DOT number and MC authority',
          'Shipment tracking portal link',
          'Terminal or warehouse location details',
          'After-hours and emergency contact numbers',
          'Insurance and bonding information',
          'Carrier safety rating and certifications',
        ],
      },
    ],
    testimonial: {
      quote:
        'Our customer service team fields hundreds of shipment inquiry emails daily. Having tracking links right in our signatures reduced follow-up calls significantly.',
      authorName: 'Mike Patterson',
      authorTitle: 'Operations Director, Continental Freight Lines',
    },
    faqs: [
      {
        question: 'Can we include shipment tracking links in signatures?',
        answer:
          'Yes. You can add direct links to your tracking portal, customer portals, and shipment inquiry pages so recipients can self-serve.',
      },
      {
        question: 'How do we display DOT and MC authority information?',
        answer:
          'Siggly templates support custom fields where you can include DOT numbers, MC authority, and any other regulatory identifiers required in your business communications.',
      },
      {
        question: 'Can drivers and field staff have email signatures?',
        answer:
          'Yes. Siggly supports mobile-optimized signatures that work perfectly on smartphones and tablets commonly used by drivers and field personnel.',
      },
      {
        question: 'How do we handle signatures for multiple terminals?',
        answer:
          'You can create location-specific templates for each terminal or distribution center with unique contact details, addresses, and hours of operation.',
      },
      {
        question: 'Can we promote new logistics services in signatures?',
        answer:
          'Absolutely. Add promotional banners for new service routes, warehousing capabilities, or partnership announcements to relevant team signatures.',
      },
    ],
    cta: {
      title: 'Deliver a Professional Brand in Every Email',
      description:
        'Equip your logistics team with compliant, branded email signatures. Get started with Siggly.',
    },
  },

  // ─── Professional Services ───────────────────────────────────────────
  {
    slug: 'professional-services',
    category: 'industries',
    meta: {
      title: 'Email Signatures for Professional Services | Siggly',
      description:
        'Polished email signatures for law firms, accounting firms, and consultancies. Showcase credentials and build client trust with Siggly.',
      keywords: [
        'professional services email signatures',
        'law firm email branding',
        'accounting firm signatures',
        'consulting email management',
        'CPA email signatures',
      ],
      canonical: '/industries/professional-services',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Industries', url: '/industries' },
      {
        name: 'Professional Services',
        url: '/industries/professional-services',
      },
    ],
    hero: {
      badge: { icon: 'briefcase', text: 'Professional Services Solutions' },
      title: 'Email Signatures That Reflect Your Professional Excellence',
      description:
        'In professional services, your reputation is everything. Siggly ensures every email from your firm carries polished signatures with credentials, practice areas, and booking links that inspire client confidence.',
      variant: 'indigo',
    },
    stats: [
      { value: '600+', label: 'Professional firms' },
      { value: '45%', label: 'More booking clicks' },
      { value: '100%', label: 'Brand compliance' },
      { value: '5 min', label: 'New hire setup' },
    ],
    features: [
      {
        icon: 'award',
        title: 'Credentials & Certifications',
        description:
          'Display professional designations like CPA, JD, PE, or PMP alongside partner and associate titles for immediate credibility.',
      },
      {
        icon: 'briefcase',
        title: 'Practice Area Highlights',
        description:
          'Include practice area specialties, industry focus areas, and service line descriptions so clients understand your full capabilities.',
      },
      {
        icon: 'user-check',
        title: 'Partner vs. Associate Templates',
        description:
          'Create tiered signature templates that reflect seniority levels, from managing partners to junior associates, while maintaining firm identity.',
      },
      {
        icon: 'clock',
        title: 'Booking & Scheduling Links',
        description:
          'Embed calendar booking links directly in signatures so clients and prospects can schedule consultations without back-and-forth emails.',
      },
      {
        icon: 'file-text',
        title: 'Thought Leadership Promotion',
        description:
          'Promote recent publications, whitepapers, speaking engagements, and blog posts through signature banners to build authority.',
      },
    ],
    featuresTitle: 'Why Professional Services Firms Choose Siggly',
    sections: [
      {
        type: 'benefits',
        title: 'Elevate Every Client Interaction',
        items: [
          {
            icon: 'star',
            title: 'Client Confidence',
            description:
              'Professional signatures with credentials and certifications build trust before the first meeting even starts.',
          },
          {
            icon: 'target',
            title: 'Business Development',
            description:
              'Turn every email into a subtle marketing tool with links to case studies, testimonials, and service descriptions.',
          },
          {
            icon: 'settings',
            title: 'Effortless Management',
            description:
              'Firm administrators can manage all signatures centrally while partners retain control over their personal details.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Our attorneys used to have wildly inconsistent signatures. Siggly gave us firm-wide uniformity while letting each lawyer display their bar admissions and practice areas.',
      authorName: 'Jennifer Walsh',
      authorTitle: 'Managing Partner, Walsh & Associates LLP',
    },
    faqs: [
      {
        question: 'Can each professional display their unique credentials?',
        answer:
          'Yes. Siggly templates include dynamic fields for professional designations, bar admissions, certifications, and specialty credentials unique to each individual.',
      },
      {
        question: 'How do we differentiate partner and associate signatures?',
        answer:
          'You can create role-based templates with different layouts, content, and prominence levels for managing partners, senior associates, and junior staff.',
      },
      {
        question: 'Can we include consultation booking links?',
        answer:
          'Absolutely. You can embed Calendly, Microsoft Bookings, or other scheduling tool links directly in each professional\'s signature.',
      },
      {
        question: 'How do lateral hires get their signatures?',
        answer:
          'New hires are automatically provisioned with a branded signature the moment they are added to your directory or HR system, complete with their credentials and practice area.',
      },
      {
        question: 'Can we promote firm publications and events?',
        answer:
          'Yes. Add banners promoting webinars, published articles, client alerts, and industry events to all firm signatures or targeted practice groups.',
      },
    ],
    cta: {
      title: 'Project Professionalism in Every Email',
      description:
        'Give your firm polished, credential-rich email signatures. Start your free trial with Siggly.',
    },
  },

  // ─── Media & Entertainment ───────────────────────────────────────────
  {
    slug: 'media-entertainment',
    category: 'industries',
    meta: {
      title: 'Email Signatures for Media & Entertainment | Siggly',
      description:
        'Creative, on-brand email signatures for media companies, studios, and agencies. Promote new releases and build your brand with Siggly.',
      keywords: [
        'media email signatures',
        'entertainment email branding',
        'studio email signatures',
        'creative agency signatures',
      ],
      canonical: '/industries/media-entertainment',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Industries', url: '/industries' },
      {
        name: 'Media & Entertainment',
        url: '/industries/media-entertainment',
      },
    ],
    hero: {
      badge: { icon: 'palette', text: 'Media & Entertainment Solutions' },
      title: 'Email Signatures as Creative as Your Content',
      description:
        'Your brand thrives on visual impact. Siggly gives media and entertainment companies stunning email signatures that promote new releases, showcase talent, and reinforce your creative identity.',
      variant: 'slate',
    },
    stats: [
      { value: '350+', label: 'Media companies' },
      { value: '5x', label: 'Banner engagement' },
      { value: '60%', label: 'Faster campaign launches' },
    ],
    features: [
      {
        icon: 'palette',
        title: 'Visually Rich Signatures',
        description:
          'Create visually striking signatures with custom layouts, brand imagery, and creative formatting that reflects your media brand\'s visual identity.',
      },
      {
        icon: 'sparkles',
        title: 'Release Promotion Banners',
        description:
          'Promote new shows, albums, films, publications, and events with eye-catching banners that update across all team signatures instantly.',
      },
      {
        icon: 'monitor',
        title: 'Social & Streaming Links',
        description:
          'Include links to social media profiles, streaming platforms, YouTube channels, and podcast feeds directly in every team member\'s signature.',
      },
      {
        icon: 'users',
        title: 'Talent & Crew Management',
        description:
          'Manage signatures for producers, editors, talent managers, publicists, and freelance contributors with role-appropriate templates.',
      },
      {
        icon: 'layout',
        title: 'Multi-Brand Support',
        description:
          'Operate multiple media brands, imprints, or labels under one roof with distinct signature templates for each property.',
      },
    ],
    featuresTitle: 'Why Media & Entertainment Companies Choose Siggly',
    sections: [
      {
        type: 'use-cases-grid',
        title: 'Siggly in Action Across Media',
        cases: [
          {
            title: 'Film & TV Studios',
            description:
              'Promote upcoming releases with trailer links and premiere dates in production team email signatures.',
          },
          {
            title: 'Music Labels & Artists',
            description:
              'Showcase new albums, tour dates, and streaming links in every email from label staff and artist management.',
          },
          {
            title: 'Publishing Houses',
            description:
              'Feature new book releases, author events, and pre-order links in editorial and marketing team signatures.',
          },
          {
            title: 'Digital Media Agencies',
            description:
              'Present a polished, creative brand to clients with agency signatures featuring portfolio links and case study highlights.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Every time we drop a new show, we update all employee signatures with the key art and premiere date. It turns our 200-person team into a promotional powerhouse.',
      authorName: 'Chris Hargrove',
      authorTitle: 'VP of Marketing, Prism Entertainment Group',
    },
    faqs: [
      {
        question: 'Can we update signatures for every new release?',
        answer:
          'Yes. Siggly makes it fast and easy to swap promotional banners for new releases, premieres, and launches across all employee signatures in minutes.',
      },
      {
        question: 'Do signatures support rich media elements?',
        answer:
          'Siggly supports high-quality images, branded banners, social media icons, and clickable links that render beautifully across all major email clients.',
      },
      {
        question: 'Can freelancers and contractors use Siggly signatures?',
        answer:
          'Yes. You can provision branded signatures for freelancers and contractors working on specific projects and remove them when the engagement ends.',
      },
      {
        question: 'How do we handle multiple brands or imprints?',
        answer:
          'Siggly supports multi-brand management, allowing you to maintain completely distinct signature templates for each brand, label, or imprint under your organization.',
      },
    ],
    cta: {
      title: 'Make Every Email a Billboard for Your Brand',
      description:
        'Promote your latest content in every email. Get started with Siggly for Media & Entertainment.',
    },
  },

  // ─── Automotive ──────────────────────────────────────────────────────
  {
    slug: 'automotive',
    category: 'industries',
    meta: {
      title: 'Email Signatures for Automotive Companies | Siggly',
      description:
        'Professional email signatures for auto dealerships, OEMs, and parts suppliers. Promote inventory, service specials, and brand standards.',
      keywords: [
        'automotive email signatures',
        'car dealership email branding',
        'auto dealer signatures',
        'OEM email management',
        'automotive marketing',
      ],
      canonical: '/industries/automotive',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Industries', url: '/industries' },
      { name: 'Automotive', url: '/industries/automotive' },
    ],
    hero: {
      badge: { icon: 'cog', text: 'Automotive Solutions' },
      title: 'Drive Sales with Professional Automotive Email Signatures',
      description:
        'From the showroom to the service bay, Siggly helps automotive businesses create professional email signatures that promote inventory, service specials, and financing offers in every customer email.',
      variant: 'light',
    },
    stats: [
      { value: '200+', label: 'Dealership groups' },
      { value: '30%', label: 'More service bookings' },
      { value: '100%', label: 'OEM brand compliance' },
      { value: '15 min', label: 'Full deployment' },
    ],
    features: [
      {
        icon: 'target',
        title: 'Inventory & Promotion Banners',
        description:
          'Promote new arrivals, clearance events, and seasonal sales through signature banners that drive traffic to your inventory pages.',
      },
      {
        icon: 'user-check',
        title: 'Sales Rep Personalization',
        description:
          'Give each sales rep a personalized signature with their photo, direct line, appointment booking link, and customer review score.',
      },
      {
        icon: 'settings',
        title: 'Service Department Signatures',
        description:
          'Create service-specific signatures with online booking links, service menu pages, and seasonal maintenance promotion banners.',
      },
      {
        icon: 'building-2',
        title: 'Multi-Dealership Management',
        description:
          'Manage signatures across multiple dealership locations, brands, and franchise requirements from a single admin dashboard.',
      },
      {
        icon: 'shield-check',
        title: 'OEM Brand Compliance',
        description:
          'Ensure all signatures meet manufacturer brand guidelines with locked templates that enforce OEM logo usage, colors, and formatting rules.',
      },
    ],
    featuresTitle: 'Why Automotive Companies Choose Siggly',
    sections: [
      {
        type: 'how-it-works',
        title: 'Get Your Dealership Signatures Running',
        steps: [
          {
            step: '1',
            title: 'Upload OEM Brand Assets',
            description:
              'Import your manufacturer-approved logos, brand colors, and templates to ensure signature compliance with franchise requirements.',
          },
          {
            step: '2',
            title: 'Create Department Templates',
            description:
              'Build templates for sales, service, parts, finance, and management with department-specific content and links.',
          },
          {
            step: '3',
            title: 'Personalize for Each Rep',
            description:
              'Add individual photos, direct phone numbers, and booking links so each team member has a personalized, professional signature.',
          },
          {
            step: '4',
            title: 'Deploy Across Locations',
            description:
              'Push signatures to all dealership locations in one step. New hires automatically receive their branded signature.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'We added service appointment booking links to every service advisor signature. Online service bookings jumped 30% in the first quarter.',
      authorName: 'Tony Esposito',
      authorTitle: 'General Manager, Premier Auto Group',
    },
    faqs: [
      {
        question: 'Can we meet OEM brand guidelines with Siggly?',
        answer:
          'Yes. You can lock templates to enforce manufacturer-approved logos, fonts, colors, and layouts. This ensures every franchise location stays compliant with OEM requirements.',
      },
      {
        question: 'Can sales reps include their own photos?',
        answer:
          'Absolutely. Each sales rep can have a personalized headshot, direct phone number, and individual booking link while staying within the dealership\'s brand template.',
      },
      {
        question: 'How do we manage multiple franchise brands?',
        answer:
          'Siggly supports multi-brand management, so you can maintain separate signature templates for each franchise brand under your dealership group.',
      },
      {
        question: 'Can service advisors promote maintenance specials?',
        answer:
          'Yes. Service department signatures can include seasonal maintenance promotions, recall notices, and online scheduling links that update with each campaign.',
      },
      {
        question: 'Do signatures work with our dealership email system?',
        answer:
          'Siggly works with Microsoft 365, Google Workspace, and all major email platforms commonly used by automotive dealerships.',
      },
    ],
    cta: {
      title: 'Accelerate Your Dealership\'s Email Presence',
      description:
        'Professional, OEM-compliant email signatures for every department. Start your free trial with Siggly.',
    },
  },

  // ─── Food & Beverage ─────────────────────────────────────────────────
  {
    slug: 'food-beverage',
    category: 'industries',
    meta: {
      title: 'Email Signatures for Food & Beverage Companies | Siggly',
      description:
        'Appetizing email signatures for food and beverage brands. Promote products, certifications, and seasonal offerings in every email.',
      keywords: [
        'food beverage email signatures',
        'restaurant email branding',
        'CPG email signatures',
        'food industry email management',
      ],
      canonical: '/industries/food-beverage',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Industries', url: '/industries' },
      { name: 'Food & Beverage', url: '/industries/food-beverage' },
    ],
    hero: {
      badge: { icon: 'star', text: 'Food & Beverage Solutions' },
      title: 'Email Signatures That Leave a Lasting Taste',
      description:
        'Whether you are a restaurant group, food manufacturer, or beverage brand, Siggly helps you promote products, highlight certifications, and maintain brand standards across your entire team.',
      variant: 'dark',
    },
    stats: [
      { value: '280+', label: 'F&B companies' },
      { value: '40%', label: 'More menu clicks' },
      { value: '100%', label: 'Brand consistency' },
    ],
    features: [
      {
        icon: 'star',
        title: 'Product & Menu Promotion',
        description:
          'Promote seasonal menus, new product launches, and limited-time offers through eye-catching signature banners that drive engagement.',
      },
      {
        icon: 'shield-check',
        title: 'Certification Badges',
        description:
          'Display food safety certifications, organic labels, kosher/halal certifications, and allergen-free designations directly in team signatures.',
      },
      {
        icon: 'building-2',
        title: 'Multi-Location Branding',
        description:
          'Manage signatures across restaurant chains, distribution centers, and corporate offices with location-specific menus and contact information.',
      },
      {
        icon: 'palette',
        title: 'Visual Brand Alignment',
        description:
          'Create signatures that match your food brand\'s visual identity with custom colors, appetizing imagery, and on-brand typography.',
      },
      {
        icon: 'globe',
        title: 'Distributor Communications',
        description:
          'Equip your sales and distribution teams with signatures that include product catalogs, ordering portals, and rep contact details.',
      },
    ],
    featuresTitle: 'Why Food & Beverage Companies Choose Siggly',
    sections: [
      {
        type: 'checklist',
        title: 'Essential Elements for F&B Email Signatures',
        items: [
          'Brand logo and visual identity elements',
          'Food safety and quality certification badges',
          'Seasonal menu or product promotion banners',
          'Online ordering and reservation links',
          'Social media and review platform links',
          'Distributor contact and ordering portal info',
        ],
      },
    ],
    testimonial: {
      quote:
        'We rotate seasonal promotion banners in our team\'s email signatures every month. It has become one of our most effective low-effort marketing channels.',
      authorName: 'Maria Gonzalez',
      authorTitle: 'Marketing Manager, Coastal Kitchen Restaurant Group',
    },
    faqs: [
      {
        question: 'Can we display food safety certifications in signatures?',
        answer:
          'Yes. You can add certification badges for SQF, FSSC 22000, organic, kosher, halal, and other food safety standards as permanent elements in your signature templates.',
      },
      {
        question: 'How do we promote seasonal menus through signatures?',
        answer:
          'Siggly lets you schedule and swap promotional banners easily. Update your seasonal menu banner across all team signatures with a few clicks whenever your menu changes.',
      },
      {
        question: 'Can franchise locations have custom signatures?',
        answer:
          'Yes. Each franchise location can have its own address, phone number, and local promotions while maintaining your brand\'s overall visual identity.',
      },
      {
        question: 'Do signatures support links to online ordering?',
        answer:
          'Absolutely. You can include links to your online ordering platform, reservation system, or delivery partner pages directly in team signatures.',
      },
      {
        question: 'Can we manage signatures for seasonal staff?',
        answer:
          'Yes. Siggly makes it easy to provision signatures for seasonal employees and remove them when their employment period ends.',
      },
    ],
    cta: {
      title: 'Serve Up a Professional Email Experience',
      description:
        'Promote your products and certifications in every email. Start your free trial with Siggly.',
    },
  },

  // ─── Hospitality ─────────────────────────────────────────────────────
  {
    slug: 'hospitality',
    category: 'industries',
    meta: {
      title: 'Email Signatures for Hospitality | Siggly',
      description:
        'Elegant email signatures for hotels, resorts, and hospitality groups. Promote bookings, loyalty programs, and guest services effortlessly.',
      keywords: [
        'hospitality email signatures',
        'hotel email branding',
        'resort email signatures',
        'hospitality group management',
        'hotel marketing email',
      ],
      canonical: '/industries/hospitality',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Industries', url: '/industries' },
      { name: 'Hospitality', url: '/industries/hospitality' },
    ],
    hero: {
      badge: { icon: 'key', text: 'Hospitality Solutions' },
      title: 'Email Signatures That Deliver a Five-Star Experience',
      description:
        'In hospitality, every touchpoint matters. Siggly helps hotels, resorts, and hospitality groups create elegant email signatures that promote direct bookings, loyalty programs, and exceptional guest experiences.',
      variant: 'violet',
    },
    stats: [
      { value: '220+', label: 'Hospitality brands' },
      { value: '25%', label: 'More direct bookings' },
      { value: '100%', label: 'Brand standard compliance' },
      { value: '3 min', label: 'Property-wide rollout' },
    ],
    features: [
      {
        icon: 'key',
        title: 'Direct Booking Promotion',
        description:
          'Include "Book Direct" links and rate comparison banners in every staff email to drive direct bookings and reduce OTA dependency.',
      },
      {
        icon: 'star',
        title: 'Loyalty Program Promotion',
        description:
          'Promote your loyalty program enrollment, point offers, and member benefits through signature banners and links.',
      },
      {
        icon: 'building-2',
        title: 'Multi-Property Management',
        description:
          'Manage signatures across an entire hotel portfolio with property-specific branding, contact details, and promotional campaigns.',
      },
      {
        icon: 'sparkles',
        title: 'Seasonal Package Banners',
        description:
          'Promote seasonal packages, holiday specials, spa offers, and event space availability through rotating signature banners.',
      },
      {
        icon: 'users',
        title: 'Department-Specific Templates',
        description:
          'Create distinct templates for front desk, concierge, sales, events, housekeeping management, and executive leadership.',
      },
    ],
    featuresTitle: 'Why Hospitality Companies Choose Siggly',
    sections: [
      {
        type: 'use-cases-grid',
        title: 'Siggly Across Your Hospitality Organization',
        cases: [
          {
            title: 'Reservations Team',
            description:
              'Include direct booking links, rate guarantees, and availability calendars in reservations team email signatures.',
          },
          {
            title: 'Sales & Events',
            description:
              'Showcase meeting space details, wedding packages, and corporate event capabilities in sales team signatures.',
          },
          {
            title: 'Guest Services',
            description:
              'Add concierge recommendations, spa booking links, and guest satisfaction survey links to front-of-house signatures.',
          },
          {
            title: 'Management & Corporate',
            description:
              'Present executive leadership with premium signature designs that reflect the property\'s luxury positioning.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'After adding "Book Direct" banners to every employee signature across our 8 properties, we saw a measurable shift from OTA bookings to direct reservations within two months.',
      authorName: 'Samantha Reed',
      authorTitle: 'VP of Revenue Management, Grand Horizon Hotels',
    },
    faqs: [
      {
        question: 'Can we promote direct bookings through signatures?',
        answer:
          'Yes. Siggly lets you add "Book Direct" buttons, best-rate-guarantee badges, and direct booking links to every staff email signature across your properties.',
      },
      {
        question: 'How do we manage signatures across multiple hotels?',
        answer:
          'Siggly supports multi-property management with distinct branding for each hotel, resort, or venue in your portfolio while maintaining brand family consistency.',
      },
      {
        question: 'Can seasonal staff get branded signatures?',
        answer:
          'Absolutely. Siggly makes it easy to provision and deprovision signatures for seasonal hospitality workers, interns, and temporary staff.',
      },
      {
        question: 'Do signatures support multiple languages for international guests?',
        answer:
          'Yes. You can create multi-language signature templates for properties that serve international guests, ensuring communications feel localized.',
      },
      {
        question: 'Can we track clicks on booking links in signatures?',
        answer:
          'Siggly provides click tracking on signature banners and links, allowing you to measure how effectively your signatures drive direct bookings and engagement.',
      },
    ],
    cta: {
      title: 'Check In to Better Email Branding',
      description:
        'Elevate your guest communications with elegant, branded email signatures. Start free with Siggly.',
    },
  },

  // ─── Consulting ──────────────────────────────────────────────────────
  {
    slug: 'consulting',
    category: 'industries',
    meta: {
      title: 'Email Signatures for Consulting Firms | Siggly',
      description:
        'Professional email signatures for management, IT, and strategy consulting firms. Build credibility and generate leads with every email.',
      keywords: [
        'consulting email signatures',
        'management consulting branding',
        'consulting firm signatures',
        'strategy consulting email',
        'IT consulting signatures',
      ],
      canonical: '/industries/consulting',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Industries', url: '/industries' },
      { name: 'Consulting', url: '/industries/consulting' },
    ],
    hero: {
      badge: { icon: 'bar-chart-3', text: 'Consulting Solutions' },
      title: 'Email Signatures That Position Your Firm as the Expert',
      description:
        'Consulting is built on expertise and trust. Siggly helps consulting firms project authority through polished email signatures that showcase thought leadership, credentials, and client results.',
      variant: 'emerald',
    },
    stats: [
      { value: '450+', label: 'Consulting firms' },
      { value: '50%', label: 'More whitepaper downloads' },
      { value: '100%', label: 'Firm-wide consistency' },
      { value: '3 min', label: 'Consultant onboarding' },
    ],
    features: [
      {
        icon: 'bar-chart-3',
        title: 'Thought Leadership Banners',
        description:
          'Promote your latest research reports, whitepapers, case studies, and industry insights through signature banners that position your firm as a thought leader.',
      },
      {
        icon: 'award',
        title: 'Credential Display',
        description:
          'Showcase consultant credentials, MBA programs, industry certifications, and speaking engagements to reinforce expertise and credibility.',
      },
      {
        icon: 'target',
        title: 'Lead Generation Links',
        description:
          'Include links to assessment tools, ROI calculators, and consultation booking pages that turn every email into a lead generation opportunity.',
      },
      {
        icon: 'layers',
        title: 'Practice Area Templates',
        description:
          'Create specialized signature templates for different practice areas, whether strategy, operations, technology, HR, or financial advisory.',
      },
      {
        icon: 'users',
        title: 'Project Team Signatures',
        description:
          'Configure project-specific signatures that display client engagement details, project team roles, and engagement manager contact info.',
      },
      {
        icon: 'globe',
        title: 'Global Firm Management',
        description:
          'Manage signatures across international offices with localized content while maintaining consistent global brand standards.',
      },
    ],
    featuresTitle: 'Why Consulting Firms Choose Siggly',
    sections: [
      {
        type: 'prose',
        title: 'Your Email Signature Is Your Silent Business Card',
        paragraphs: [
          'Consultants send hundreds of emails each week to clients, prospects, and partners. Each of those emails is an opportunity to reinforce your firm\'s brand, showcase your expertise, and generate new business. Yet many consulting firms still rely on inconsistent, poorly formatted signatures that undermine their professional image.',
          'Siggly transforms your firm\'s email signatures from an afterthought into a strategic asset. By centralizing signature management, you ensure every consultant, from partners to new analysts, represents the firm with a polished, consistent, and compelling email presence that builds client confidence and drives engagement.',
        ],
      },
      {
        type: 'benefits',
        title: 'The Consulting Firm Advantage',
        items: [
          {
            icon: 'rocket',
            title: 'Faster Business Development',
            description:
              'Signature banners with links to case studies and whitepapers generate inbound interest without any extra effort from consultants.',
          },
          {
            icon: 'shield',
            title: 'Consistent Client Experience',
            description:
              'Every email from your firm looks polished and professional, whether it comes from a managing director or a junior analyst.',
          },
          {
            icon: 'clock',
            title: 'Zero Admin Overhead',
            description:
              'New consultants get their branded signature automatically on day one. No IT tickets, no manual setup, no inconsistencies.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'We added links to our latest industry report in every consultant\'s signature. Within a month, whitepaper downloads doubled and we traced three new engagements back to those clicks.',
      authorName: 'Soren Lindqvist',
      authorTitle: 'Partner, Altimeter Strategy Group',
    },
    faqs: [
      {
        question: 'Can we promote thought leadership content in signatures?',
        answer:
          'Yes. Siggly makes it easy to add banners linking to your latest research, case studies, whitepapers, and blog posts. You can rotate content and track click-through rates.',
      },
      {
        question: 'How do we handle project-specific signatures?',
        answer:
          'Siggly supports dynamic templates that can display project engagement details, client-specific branding, and project team information as needed.',
      },
      {
        question: 'Can different practice areas have unique signatures?',
        answer:
          'Absolutely. Create distinct templates for strategy, operations, technology, and other practice areas while enforcing firm-wide brand standards.',
      },
      {
        question: 'How quickly can new consultants get their signatures?',
        answer:
          'New consultants automatically receive their branded signature the moment they are added to your firm\'s directory, with their credentials and practice area pre-populated.',
      },
      {
        question: 'Does Siggly work for boutique and mid-size consulting firms?',
        answer:
          'Yes. Siggly scales from boutique firms with a handful of consultants to global practices with thousands. Pricing is flexible to fit firms of all sizes.',
      },
    ],
    cta: {
      title: 'Elevate Your Consulting Firm\'s Email Presence',
      description:
        'Turn every consultant email into a business development opportunity. Start your free trial with Siggly.',
    },
  },

  // ─── Agriculture ───────────────────────────────────────────────────
  {
    slug: 'agriculture',
    category: 'industries',
    meta: {
      title: 'Email Signatures for Agriculture | Siggly',
      description:
        'Professional email signatures for farms, agribusinesses, and agricultural cooperatives. Showcase USDA compliance and supply chain credentials.',
      keywords: [
        'agriculture email signatures',
        'farming email branding',
        'agribusiness email management',
        'USDA compliant signatures',
        'agricultural cooperative email',
      ],
      canonical: '/industries/agriculture',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Industries', url: '/industries' },
      { name: 'Agriculture', url: '/industries/agriculture' },
    ],
    hero: {
      badge: { icon: 'activity', text: 'Agriculture Solutions' },
      title: 'Email Signatures That Grow with Your Agricultural Business',
      description:
        'From farm-to-table operations to large agribusinesses, Siggly ensures every email conveys professionalism, USDA compliance details, and supply chain credentials across your entire organization.',
      variant: 'indigo',
    },
    stats: [
      { value: '200+', label: 'Agricultural businesses' },
      { value: '100%', label: 'USDA badge support' },
      { value: '12 min', label: 'Average rollout' },
      { value: '35%', label: 'Fewer branding errors' },
    ],
    features: [
      {
        icon: 'shield-check',
        title: 'USDA Compliance Badges',
        description:
          'Automatically include USDA organic certification logos, GAP audit badges, and food safety credentials in every outgoing email.',
      },
      {
        icon: 'truck',
        title: 'Supply Chain Visibility',
        description:
          'Add traceability links and supply chain partner logos so buyers and distributors can verify your sourcing credentials directly from your email.',
      },
      {
        icon: 'map',
        title: 'Regional Field Office Branding',
        description:
          'Manage distinct signatures for field offices, grain elevators, processing plants, and corporate headquarters from a single dashboard.',
      },
      {
        icon: 'calendar',
        title: 'Seasonal Campaign Banners',
        description:
          'Promote harvest schedules, planting season updates, and commodity pricing through rotating signature banners tied to your agricultural calendar.',
      },
      {
        icon: 'bar-chart-3',
        title: 'Precision Ag Integration',
        description:
          'Link to precision agriculture dashboards, soil reports, and yield analytics directly in your email footer for data-driven client communications.',
      },
    ],
    featuresTitle: 'Purpose-Built for Agriculture Operations',
    sections: [
      {
        type: 'checklist',
        title: 'Email Signature Essentials for Agriculture',
        items: [
          'USDA organic and GAP certification badges',
          'Farm or cooperative logo with brand colors',
          'Traceability and supply chain partner links',
          'Seasonal promotion banners for harvest and planting',
          'Regional office and field location identifiers',
          'Direct phone and scheduling links for buyers',
        ],
      },
      {
        type: 'benefits',
        title: 'How Siggly Helps Agricultural Businesses',
        items: [
          {
            icon: 'target',
            title: 'Buyer Confidence',
            description:
              'Displaying certifications and traceability links in every email builds trust with wholesale buyers and retail partners.',
          },
          {
            icon: 'refresh-cw',
            title: 'Seasonal Updates',
            description:
              'Swap banners and promotional content across all employees in minutes when seasons change or new products launch.',
          },
          {
            icon: 'users',
            title: 'Cooperative Management',
            description:
              'Manage signatures for co-op members, seasonal workers, and permanent staff with role-based templates that scale.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'We added our USDA organic badge and a link to our traceability portal in every signature. Within weeks, two new distributors reached out citing the professionalism of our emails.',
      authorName: 'Rachel Gutierrez',
      authorTitle: 'Operations Director, Heartland Organic Farms',
    },
    faqs: [
      {
        question: 'Can I include USDA or organic certification logos?',
        answer:
          'Yes. Siggly supports custom badge uploads so you can display USDA organic, Non-GMO Project, Fair Trade, and other certification marks directly in your signature.',
      },
      {
        question: 'How do I manage signatures for seasonal workers?',
        answer:
          'Siggly integrates with your directory or HR system to automatically provision and deprovision signatures as seasonal staff come and go, with no manual effort required.',
      },
      {
        question: 'Can different farm locations have unique signatures?',
        answer:
          'Absolutely. You can create location-specific templates that include regional addresses, local phone numbers, and site-specific certifications while enforcing brand consistency.',
      },
      {
        question: 'Does Siggly work for agricultural cooperatives?',
        answer:
          'Yes. Cooperatives can manage member signatures centrally, ensuring every grower and partner uses a professionally branded email signature that reflects the co-op identity.',
      },
    ],
    cta: {
      title: 'Cultivate a Professional Email Presence',
      description:
        'Give every email from your agricultural operation the credibility it deserves. Start your free trial with Siggly today.',
    },
  },

  // ─── Architecture ──────────────────────────────────────────────────
  {
    slug: 'architecture',
    category: 'industries',
    meta: {
      title: 'Email Signatures for Architecture Firms | Siggly',
      description:
        'Polished email signatures for architects and design firms. Display AIA credentials, LEED certifications, and link to project portfolios seamlessly.',
      keywords: [
        'architecture email signatures',
        'architect email branding',
        'AIA email signatures',
        'LEED architect signature',
        'design firm email management',
      ],
      canonical: '/industries/architecture',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Industries', url: '/industries' },
      { name: 'Architecture', url: '/industries/architecture' },
    ],
    hero: {
      badge: { icon: 'building-2', text: 'Architecture Solutions' },
      title: 'Signature Design as Refined as Your Buildings',
      description:
        'Your firm designs structures that stand for decades. Your email signatures should reflect that same attention to detail. Siggly helps architecture firms present AIA credentials, LEED certifications, and portfolio links in every communication.',
      variant: 'slate',
    },
    stats: [
      { value: '250+', label: 'Architecture firms' },
      { value: '92%', label: 'Credential accuracy' },
      { value: '10 min', label: 'Firm-wide rollout' },
    ],
    features: [
      {
        icon: 'award',
        title: 'AIA Credential Display',
        description:
          'Prominently feature AIA membership status, NCARB certification, and state licensure numbers so clients verify your qualifications at a glance.',
      },
      {
        icon: 'file-check',
        title: 'LEED & Sustainability Badges',
        description:
          'Showcase LEED AP, WELL AP, and Living Building Challenge credentials to signal your commitment to sustainable design practices.',
      },
      {
        icon: 'image',
        title: 'Portfolio Integration',
        description:
          'Link directly to your online portfolio, recent project galleries, or Behance profile so prospective clients can explore your work from any email.',
      },
      {
        icon: 'layers',
        title: 'Studio & Branch Templates',
        description:
          'Create unique signature layouts for each studio location or practice area while maintaining firm-wide visual identity standards.',
      },
    ],
    featuresTitle: 'Designed for Architecture Professionals',
    sections: [
      {
        type: 'how-it-works',
        title: 'Get Your Firm on Siggly in Three Steps',
        steps: [
          {
            step: '01',
            title: 'Upload Your Brand Assets',
            description:
              'Import your firm logo, brand colors, and preferred typefaces. Add AIA badges and certification marks to your asset library.',
          },
          {
            step: '02',
            title: 'Design Your Template',
            description:
              'Choose a layout that complements your architectural aesthetic. Add credential fields, portfolio links, and project banners.',
          },
          {
            step: '03',
            title: 'Deploy Across Your Firm',
            description:
              'Roll out signatures to principals, project architects, interns, and support staff in a single click. Siggly handles the rest.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Our clients often comment on how polished our emails look. Having our LEED AP credentials and portfolio link in every signature has directly led to new project inquiries.',
      authorName: 'Steven Nakamura',
      authorTitle: 'Principal, Nakamura + Reed Architects',
    },
    faqs: [
      {
        question: 'Can I display my AIA and NCARB credentials?',
        answer:
          'Yes. Siggly includes dedicated fields for professional credentials like AIA, NCARB, LEED AP, RA, and state license numbers that appear beneath your name and title.',
      },
      {
        question: 'How do I link to my project portfolio?',
        answer:
          'The template includes a customizable portfolio button or banner area where you can link to your website, Behance, Archinect, or any online gallery.',
      },
      {
        question: 'Can different practice areas have distinct signature styles?',
        answer:
          'Yes. Siggly lets you create separate templates for residential, commercial, landscape, and interior design teams while enforcing consistent firm branding.',
      },
    ],
    cta: {
      title: 'Build a Signature Worthy of Your Firm',
      description:
        'Present every email with the precision your architecture practice is known for. Try Siggly free.',
    },
  },

  // ─── Aviation ──────────────────────────────────────────────────────
  {
    slug: 'aviation',
    category: 'industries',
    meta: {
      title: 'Email Signatures for Aviation | Siggly',
      description:
        'Standardized email signatures for airlines, MROs, and flight operations. Include FAA credentials, IATA codes, and crew communication details.',
      keywords: [
        'aviation email signatures',
        'airline email branding',
        'FAA compliant signatures',
        'flight operations email',
        'MRO email management',
      ],
      canonical: '/industries/aviation',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Industries', url: '/industries' },
      { name: 'Aviation', url: '/industries/aviation' },
    ],
    hero: {
      badge: { icon: 'send', text: 'Aviation Solutions' },
      title: 'Professional Email Signatures for the Aviation Industry',
      description:
        'Airlines, MROs, and charter operators rely on clear, credential-rich communication. Siggly gives aviation professionals polished signatures that include FAA certifications, IATA designators, and operational contact hierarchies.',
      variant: 'light',
    },
    stats: [
      { value: '150+', label: 'Aviation organizations' },
      { value: '99.5%', label: 'Deployment accuracy' },
      { value: '8 min', label: 'Fleet-wide rollout' },
    ],
    features: [
      {
        icon: 'shield-check',
        title: 'FAA Credential Integration',
        description:
          'Display FAA repair station certificates, Part 135/121 operator numbers, and AMT license details in a standardized, verifiable format.',
      },
      {
        icon: 'globe',
        title: 'IATA & ICAO Code Display',
        description:
          'Include your airline designator codes, station identifiers, and SITA addresses so industry contacts can reach you through standard aviation channels.',
      },
      {
        icon: 'users',
        title: 'Crew & Ground Staff Management',
        description:
          'Maintain distinct signature templates for flight crew, maintenance technicians, ground operations, and corporate staff under one unified platform.',
      },
    ],
    featuresTitle: 'Built for Aviation Operations',
    sections: [
      {
        type: 'use-cases-grid',
        title: 'Siggly Across Aviation Operations',
        cases: [
          {
            title: 'Airlines',
            description:
              'Unify signatures across flight ops, customer service, reservations, and corporate communications with airline-specific branding.',
          },
          {
            title: 'MRO Facilities',
            description:
              'Display repair station certificates and capabilities lists in technician and sales team signatures.',
          },
          {
            title: 'Charter Operators',
            description:
              'Present a premium image with signatures featuring fleet details, operating certificates, and booking links.',
          },
          {
            title: 'Airport Authorities',
            description:
              'Standardize communication across terminal operations, security, and administrative divisions.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Standardizing signatures across our flight ops, maintenance, and charter sales teams used to be a nightmare. Siggly deployed branded signatures to 200 employees across three bases in under ten minutes.',
      authorName: 'Captain Diana Salazar',
      authorTitle: 'Director of Operations, Pacific Air Charter',
    },
    faqs: [
      {
        question: 'Can I display FAA certifications in my signature?',
        answer:
          'Yes. Siggly supports custom credential fields where you can list FAA repair station numbers, operator certificates, and individual AMT or ATP license details.',
      },
      {
        question: 'How do I manage signatures across multiple bases?',
        answer:
          'Siggly allows location-based templates so each base or station has signatures with the correct local address, phone number, and station-specific branding.',
      },
      {
        question: 'Does Siggly support SITA or ARINC contact details?',
        answer:
          'Yes. You can add SITA addresses, ARINC identifiers, and AFTN addresses as custom contact fields visible in your signature.',
      },
    ],
    cta: {
      title: 'Clear for Takeoff with Siggly',
      description:
        'Equip your aviation team with email signatures that meet industry standards. Start your free trial now.',
    },
  },

  // ─── Biotech ───────────────────────────────────────────────────────
  {
    slug: 'biotech',
    category: 'industries',
    meta: {
      title: 'Email Signatures for Biotech Companies | Siggly',
      description:
        'Branded email signatures for biotech firms. Display FDA submission credentials, research affiliations, and clinical trial details professionally.',
      keywords: [
        'biotech email signatures',
        'biotechnology email branding',
        'FDA submission signatures',
        'clinical trial email',
        'research collaboration email',
      ],
      canonical: '/industries/biotech',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Industries', url: '/industries' },
      { name: 'Biotech', url: '/industries/biotech' },
    ],
    hero: {
      badge: { icon: 'activity', text: 'Biotech Solutions' },
      title: 'Email Signatures Engineered for Biotech Innovation',
      description:
        'Biotech professionals communicate with regulators, research partners, and investors daily. Siggly ensures those communications carry the right credentials, affiliations, and compliance details in every signature.',
      variant: 'dark',
    },
    stats: [
      { value: '100+', label: 'Biotech companies' },
      { value: '95%', label: 'Compliance accuracy' },
      { value: '<10 min', label: 'Company-wide setup' },
      { value: '60%', label: 'Less manual formatting' },
    ],
    features: [
      {
        icon: 'file-check',
        title: 'FDA & EMA Credential Fields',
        description:
          'Include IND/NDA submission references, EMA authorization numbers, and regulatory contact details that reviewers and partners expect to see.',
      },
      {
        icon: 'users',
        title: 'Research Collaboration Links',
        description:
          'Add ORCID profiles, PubMed author pages, and institutional affiliation links so collaborators can verify your publication record instantly.',
      },
      {
        icon: 'lock',
        title: 'Confidentiality Disclaimers',
        description:
          'Automatically append HIPAA, trade-secret, and proprietary-information disclaimers to signatures used in sensitive communications.',
      },
      {
        icon: 'database',
        title: 'Clinical Trial Banners',
        description:
          'Promote active clinical trials, patient recruitment drives, and ClinicalTrials.gov listings through rotating banner campaigns in employee signatures.',
      },
    ],
    featuresTitle: 'Why Biotech Teams Trust Siggly',
    featuresDescription:
      'From pre-clinical research to commercialization, Siggly adapts to every stage of the biotech lifecycle.',
    sections: [
      {
        type: 'benefits',
        title: 'Accelerate Your Biotech Communications',
        items: [
          {
            icon: 'shield',
            title: 'Regulatory Readiness',
            description:
              'Signatures that include proper disclaimers and credential formatting help your team stay audit-ready at all times.',
          },
          {
            icon: 'link',
            title: 'Peer Review Visibility',
            description:
              'ORCID and PubMed links in signatures make it easy for collaborators and journal editors to find your published research.',
          },
          {
            icon: 'trending-up',
            title: 'Investor Relations',
            description:
              'Pipeline milestone banners and investor deck links in executive signatures keep stakeholders informed passively.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'After deploying Siggly, our regulatory affairs team no longer worries about missing disclaimers. Every email to the FDA includes the proper credential block and confidentiality notice.',
      authorName: 'Dr. Anita Sharma',
      authorTitle: 'VP of Regulatory Affairs, Helix Therapeutics',
    },
    faqs: [
      {
        question: 'Can I include ORCID or PubMed links?',
        answer:
          'Yes. Siggly provides dedicated fields for ORCID iDs, PubMed author profiles, Google Scholar pages, and ResearchGate links that appear alongside your contact details.',
      },
      {
        question: 'How do I handle signatures for contract research staff?',
        answer:
          'Contract researchers can be added to Siggly with time-limited access. Their signatures are automatically deactivated when their contract period ends.',
      },
      {
        question: 'Can we promote clinical trials through signatures?',
        answer:
          'Yes. Siggly supports banner campaigns that link to ClinicalTrials.gov listings, patient recruitment pages, or study information sites. You can target banners to specific departments.',
      },
      {
        question: 'Is Siggly compliant with 21 CFR Part 11?',
        answer:
          'Siggly maintains audit trails and access controls that support 21 CFR Part 11 requirements. Consult your compliance team for validation of your specific use case.',
      },
    ],
    cta: {
      title: 'Advance Your Biotech Email Standards',
      description:
        'Ensure every email from your biotech organization carries the right credentials and compliance details. Get started free.',
    },
  },

  // ─── Cannabis ──────────────────────────────────────────────────────
  {
    slug: 'cannabis',
    category: 'industries',
    meta: {
      title: 'Email Signatures for Cannabis Companies | Siggly',
      description:
        'Compliant email signatures for cannabis operators. Display state licenses, seed-to-sale tracking, and regulatory details in every email.',
      keywords: [
        'cannabis email signatures',
        'marijuana business email',
        'cannabis compliance email',
        'dispensary email branding',
        'seed-to-sale email signatures',
      ],
      canonical: '/industries/cannabis',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Industries', url: '/industries' },
      { name: 'Cannabis', url: '/industries/cannabis' },
    ],
    hero: {
      badge: { icon: 'flag', text: 'Cannabis Solutions' },
      title: 'Compliant, Professional Email Signatures for Cannabis Operators',
      description:
        'The cannabis industry demands meticulous compliance. Siggly helps cultivators, dispensaries, and processors present state license numbers, seed-to-sale credentials, and regulatory notices in every outgoing email.',
      variant: 'violet',
    },
    features: [
      {
        icon: 'file-check',
        title: 'State License Display',
        description:
          'Automatically include state cultivation, manufacturing, distribution, or retail license numbers in employee signatures for instant regulatory verification.',
      },
      {
        icon: 'repeat',
        title: 'Seed-to-Sale Tracking Links',
        description:
          'Embed links to your Metrc, BioTrack, or LEAF Data compliance portal so supply chain partners can verify product chain-of-custody.',
      },
      {
        icon: 'shield',
        title: 'Regulatory Disclaimer Automation',
        description:
          'Append state-mandated disclaimers and age-verification notices to every email automatically, reducing compliance risk across your organization.',
      },
    ],
    featuresTitle: 'Compliance-First Signature Management',
    sections: [
      {
        type: 'checklist',
        title: 'Cannabis Email Signature Must-Haves',
        items: [
          'State license number and license type displayed',
          'Company logo with compliant branding guidelines',
          'Seed-to-sale tracking portal link',
          'State-mandated disclaimers appended automatically',
          'Age-gate or compliance notice for consumer-facing emails',
        ],
      },
      {
        type: 'use-cases-grid',
        title: 'Who Uses Siggly in Cannabis',
        cases: [
          {
            title: 'Dispensaries',
            description:
              'Display retail license numbers and link to online menus or ordering platforms from budtender and manager signatures.',
          },
          {
            title: 'Cultivators',
            description:
              'Include cultivation licenses, facility addresses, and harvest schedule links for distributor communications.',
          },
          {
            title: 'Processors & Manufacturers',
            description:
              'Showcase manufacturing licenses, lab testing partner links, and COA access portals in production team signatures.',
          },
          {
            title: 'Multi-State Operators',
            description:
              'Manage license-specific signatures across multiple states from one centralized Siggly dashboard.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Operating in four states means four different license numbers and disclaimer requirements. Siggly lets us manage all of them from one dashboard without a single compliance slip.',
      authorName: 'Jordan Whitaker',
      authorTitle: 'Compliance Director, Verdant Leaf Holdings',
    },
    faqs: [
      {
        question: 'Can I display different state licenses for multi-state operations?',
        answer:
          'Yes. Siggly supports location-based templates so each state operation displays the correct license numbers, local addresses, and state-specific disclaimers.',
      },
      {
        question: 'Does Siggly integrate with Metrc or BioTrack?',
        answer:
          'Siggly can link to your seed-to-sale tracking portal in signatures. While we do not pull data directly from Metrc or BioTrack, your compliance URLs are always one click away.',
      },
      {
        question: 'Can we add age-verification disclaimers?',
        answer:
          'Yes. Siggly supports mandatory disclaimer blocks that are automatically appended to every signature, including age-gate notices required in many cannabis markets.',
      },
    ],
    cta: {
      title: 'Stay Compliant with Every Email',
      description:
        'Give your cannabis operation the professional, license-verified email presence regulators and partners expect.',
    },
  },

  // ─── Construction ──────────────────────────────────────────────────
  {
    slug: 'construction',
    category: 'industries',
    meta: {
      title: 'Email Signatures for Construction Companies | Siggly',
      description:
        'Branded email signatures for general contractors, subcontractors, and construction managers. Highlight OSHA training, bonding status, and project details.',
      keywords: [
        'construction email signatures',
        'contractor email branding',
        'OSHA compliant email',
        'construction company signatures',
        'subcontractor email management',
      ],
      canonical: '/industries/construction',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Industries', url: '/industries' },
      { name: 'Construction', url: '/industries/construction' },
    ],
    hero: {
      badge: { icon: 'wrench', text: 'Construction Solutions' },
      title: 'Build Credibility with Every Email Your Construction Team Sends',
      description:
        'General contractors, specialty trades, and project managers all benefit from professional email signatures that showcase bonding, OSHA certifications, and licensing. Siggly keeps your entire crew on-brand.',
      variant: 'emerald',
    },
    stats: [
      { value: '350+', label: 'Construction firms' },
      { value: '97%', label: 'Brand compliance rate' },
      { value: '20 min', label: 'Crew-wide deployment' },
      { value: '45%', label: 'Fewer manual updates' },
    ],
    features: [
      {
        icon: 'shield-check',
        title: 'OSHA & Safety Certifications',
        description:
          'Display OSHA 10/30 certifications, EMR ratings, and safety record highlights so owners and GCs can verify your safety credentials instantly.',
      },
      {
        icon: 'credit-card',
        title: 'Bonding & Insurance Details',
        description:
          'Include bonding capacity, insurance carrier information, and certificate-of-insurance request links directly in project manager signatures.',
      },
      {
        icon: 'file-text',
        title: 'License & Classification Badges',
        description:
          'Show contractor license numbers, trade classifications, and DBE/MBE/WBE certifications that matter during bid evaluation.',
      },
      {
        icon: 'building-2',
        title: 'Project-Specific Signatures',
        description:
          'Create temporary signature templates for active projects that include job-site addresses, project numbers, and owner contact information.',
      },
      {
        icon: 'users',
        title: 'Subcontractor Coordination',
        description:
          'Provision branded signatures for subcontractors working under your GC umbrella so all project communication maintains a unified appearance.',
      },
    ],
    featuresTitle: 'Why Construction Professionals Rely on Siggly',
    sections: [
      {
        type: 'how-it-works',
        title: 'Deploy Signatures Across Your Crew',
        steps: [
          {
            step: '01',
            title: 'Add Your Credentials',
            description:
              'Upload your logo, license numbers, OSHA certs, and bonding details into Siggly. These become reusable assets for any template.',
          },
          {
            step: '02',
            title: 'Build Role-Based Templates',
            description:
              'Create templates for project managers, estimators, superintendents, and field staff with the credential fields each role needs.',
          },
          {
            step: '03',
            title: 'Roll Out and Track',
            description:
              'Deploy to your team and monitor adoption. Siggly alerts you when certifications expire so you can update signatures proactively.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'GCs started commenting on how professional our bid emails looked. Having our bonding capacity and EMR rating right in the signature saved back-and-forth during prequalification.',
      authorName: 'Mike Delgado',
      authorTitle: 'President, Delgado Mechanical Contractors',
    },
    faqs: [
      {
        question: 'Can I display OSHA certifications in signatures?',
        answer:
          'Yes. Siggly supports custom fields for OSHA 10, OSHA 30, and site-specific safety training certifications that appear beneath each employee name and title.',
      },
      {
        question: 'How do I manage signatures for subcontractors?',
        answer:
          'Subcontractors can be added with project-limited access. Their signatures use your GC branding and are automatically deactivated when the project closes out.',
      },
      {
        question: 'Can project-specific signatures expire automatically?',
        answer:
          'Yes. Siggly supports date-based templates that revert employees to their default company signature when a project reaches its scheduled completion date.',
      },
    ],
    cta: {
      title: 'Lay the Foundation for Professional Email',
      description:
        'Give every project email the credibility your construction firm has earned. Start free with Siggly.',
    },
  },

  // ─── Cryptocurrency ────────────────────────────────────────────────
  {
    slug: 'cryptocurrency',
    category: 'industries',
    meta: {
      title: 'Email Signatures for Cryptocurrency Companies | Siggly',
      description:
        'Professional email signatures for crypto exchanges, DeFi protocols, and blockchain startups. Build trust with compliance badges and wallet verification.',
      keywords: [
        'cryptocurrency email signatures',
        'crypto company email branding',
        'blockchain email signatures',
        'DeFi email management',
        'web3 email branding',
      ],
      canonical: '/industries/cryptocurrency',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Industries', url: '/industries' },
      { name: 'Cryptocurrency', url: '/industries/cryptocurrency' },
    ],
    hero: {
      badge: { icon: 'link', text: 'Crypto Solutions' },
      title: 'Trust-Building Email Signatures for the Crypto Industry',
      description:
        'In an industry where trust is everything, your email signature is a credibility signal. Siggly helps crypto exchanges, DeFi teams, and blockchain startups present regulatory compliance, verified contacts, and professional branding.',
      variant: 'indigo',
    },
    stats: [
      { value: '80+', label: 'Crypto organizations' },
      { value: '100%', label: 'Anti-phishing support' },
      { value: '5 min', label: 'Team-wide deployment' },
    ],
    features: [
      {
        icon: 'shield',
        title: 'Regulatory Compliance Badges',
        description:
          'Display FinCEN MSB registration, state MTL numbers, and international licensing details to demonstrate regulatory standing to partners and users.',
      },
      {
        icon: 'fingerprint',
        title: 'Anti-Phishing Verification',
        description:
          'Include a unique verification phrase or signed hash in your email signature so recipients can confirm emails genuinely originate from your organization.',
      },
      {
        icon: 'key',
        title: 'Public Key & Wallet Display',
        description:
          'Add your company treasury wallet address or PGP public key fingerprint for recipients who need to verify payments or encrypted communications.',
      },
      {
        icon: 'network',
        title: 'Multi-Chain Branding',
        description:
          'Showcase which blockchains your project operates on with chain-specific logos and explorer links for full transparency.',
      },
    ],
    featuresTitle: 'Crypto-Native Signature Features',
    sections: [
      {
        type: 'prose',
        title: 'Why Email Branding Matters in Crypto',
        paragraphs: [
          'Cryptocurrency businesses face unique trust challenges. Phishing attacks, impersonation scams, and regulatory scrutiny make professional email communication essential rather than optional.',
          'A well-branded email signature that includes licensing details, anti-phishing verification, and official contact channels signals legitimacy to institutional partners, regulators, and retail users alike.',
          'Siggly helps crypto organizations standardize these trust signals across every team member, from developers and community managers to C-suite executives and compliance officers.',
        ],
      },
      {
        type: 'checklist',
        title: 'Crypto Email Signature Best Practices',
        items: [
          'FinCEN MSB or equivalent regulatory registration displayed',
          'Anti-phishing verification phrase included',
          'Official support and security contact channels listed',
          'Company treasury or donation wallet address linked',
          'PGP public key fingerprint for encrypted communication',
        ],
      },
    ],
    testimonial: {
      quote:
        'Phishing is the number one threat in crypto. Adding our verification phrase and FinCEN registration to every team signature cut impersonation reports by over 60 percent.',
      authorName: 'Anya Petrov',
      authorTitle: 'Head of Security, ChainVault Exchange',
    },
    faqs: [
      {
        question: 'Can I include a wallet address in my signature?',
        answer:
          'Yes. Siggly supports custom fields for treasury wallet addresses, ENS domains, and payment links so recipients can verify official payment channels.',
      },
      {
        question: 'How does the anti-phishing feature work?',
        answer:
          'You set a unique verification phrase that appears in every team signature. Recipients learn to look for this phrase to confirm the email is genuine and not a spoofed message.',
      },
      {
        question: 'Can we display regulatory licenses from multiple jurisdictions?',
        answer:
          'Yes. Siggly supports multi-jurisdiction templates so your US, EU, and APAC teams each display the correct regulatory registrations for their operating region.',
      },
    ],
    cta: {
      title: 'Build Trust in Every Crypto Communication',
      description:
        'Legitimacy starts with professional email. Give your crypto organization verified, branded signatures with Siggly.',
    },
  },

  // ─── Cybersecurity ─────────────────────────────────────────────────
  {
    slug: 'cybersecurity',
    category: 'industries',
    meta: {
      title: 'Email Signatures for Cybersecurity Firms | Siggly',
      description:
        'Secure, professional email signatures for cybersecurity teams. Display SOC 2 compliance, NIST framework alignment, and security certifications.',
      keywords: [
        'cybersecurity email signatures',
        'infosec email branding',
        'SOC 2 email signatures',
        'NIST compliant signatures',
        'security firm email management',
      ],
      canonical: '/industries/cybersecurity',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Industries', url: '/industries' },
      { name: 'Cybersecurity', url: '/industries/cybersecurity' },
    ],
    hero: {
      badge: { icon: 'shield-check', text: 'Cybersecurity Solutions' },
      title: 'Email Signatures That Practice What Your Security Firm Preaches',
      description:
        'Your firm advises clients on security posture. Your own emails should reflect that expertise. Siggly delivers lean, secure signatures that showcase SOC 2 attestations, NIST alignment, and individual practitioner certifications.',
      variant: 'slate',
    },
    features: [
      {
        icon: 'shield',
        title: 'SOC 2 & ISO 27001 Badges',
        description:
          'Display your firm SOC 2 Type II attestation, ISO 27001 certification, and other compliance framework badges directly in email signatures.',
      },
      {
        icon: 'file-check',
        title: 'Practitioner Certifications',
        description:
          'Show CISSP, CISM, CEH, OSCP, and other security certifications alongside employee names so clients see credentialed professionals in every email.',
      },
      {
        icon: 'lock',
        title: 'Minimal-Footprint HTML',
        description:
          'Signatures use lean, script-free HTML with no external resource calls, meeting the strict email security policies your clients expect from a security vendor.',
      },
      {
        icon: 'eye',
        title: 'Incident Response Contacts',
        description:
          'Include 24/7 SOC hotline numbers, incident reporting links, and escalation paths so clients can reach your security operations center from any email.',
      },
      {
        icon: 'fingerprint',
        title: 'PGP Key Distribution',
        description:
          'Link to your public PGP key or keyserver URL directly in your signature, making encrypted communication effortless for security-conscious recipients.',
      },
    ],
    featuresTitle: 'Security-First Signature Design',
    featuresDescription:
      'Every feature is built with the security posture your clients expect from their cybersecurity partner.',
    sections: [
      {
        type: 'benefits',
        title: 'How Siggly Strengthens Your Security Brand',
        items: [
          {
            icon: 'target',
            title: 'Client Confidence',
            description:
              'Compliance badges and practitioner credentials in every email reinforce your authority before meetings even begin.',
          },
          {
            icon: 'code',
            title: 'Clean HTML Standards',
            description:
              'No tracking pixels, external scripts, or bloated markup. Just clean, auditable HTML that passes any email security scan.',
          },
          {
            icon: 'clock',
            title: 'Rapid Incident Contact',
            description:
              'Every signature includes direct links to your SOC, making it easy for clients to report incidents without searching for contact info.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'We could not credibly advise clients on email security while our own signatures were inconsistent and bloated. Siggly gave us lean, professional signatures that walk the walk.',
      authorName: 'Felix Andersen',
      authorTitle: 'CISO, Rampart Cyber Defense',
    },
    faqs: [
      {
        question: 'Is Siggly itself SOC 2 compliant?',
        answer:
          'Siggly maintains SOC 2 Type II compliance with annual audits. We can provide our attestation report to your security team upon request.',
      },
      {
        question: 'Does the signature HTML contain any external calls?',
        answer:
          'No. Siggly signatures use inline styles and base64-encoded images by default, with no external scripts, tracking pixels, or third-party resource loads.',
      },
      {
        question: 'Can analysts display their individual security certifications?',
        answer:
          'Yes. Each employee signature can list certifications like CISSP, CISM, CEH, OSCP, GIAC, and CompTIA Security+ beneath their name and title.',
      },
      {
        question: 'How do you handle signature deployment security?',
        answer:
          'Signatures are deployed via encrypted channels with role-based access controls. Only authorized administrators can modify templates or push updates.',
      },
      {
        question: 'Can we include a PGP public key in the signature?',
        answer:
          'Yes. Siggly supports a dedicated PGP key field where you can link to your public key on a keyserver or include the fingerprint directly in the signature.',
      },
    ],
    cta: {
      title: 'Secure Your Email Signature Strategy',
      description:
        'Your cybersecurity firm deserves signatures as rigorous as your threat assessments. Start your free Siggly trial.',
    },
  },

  // ─── E-commerce ────────────────────────────────────────────────────
  {
    slug: 'ecommerce',
    category: 'industries',
    meta: {
      title: 'Email Signatures for E-commerce Businesses | Siggly',
      description:
        'Drive conversions with branded email signatures for your e-commerce team. Promote sales, link to your storefront, and enhance customer support emails.',
      keywords: [
        'ecommerce email signatures',
        'online store email branding',
        'Shopify email signatures',
        'WooCommerce email branding',
        'e-commerce support signatures',
      ],
      canonical: '/industries/ecommerce',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Industries', url: '/industries' },
      { name: 'E-commerce', url: '/industries/ecommerce' },
    ],
    hero: {
      badge: { icon: 'store', text: 'E-commerce Solutions' },
      title: 'Turn Every Customer Email into a Conversion Opportunity',
      description:
        'Your e-commerce team sends hundreds of emails daily to customers, vendors, and partners. Siggly ensures each one drives traffic back to your store with promotional banners, review links, and branded support signatures.',
      variant: 'light',
    },
    stats: [
      { value: '400+', label: 'E-commerce brands' },
      { value: '22%', label: 'More repeat purchases' },
      { value: '<5 min', label: 'Banner swap time' },
      { value: '3x', label: 'Signature click rate' },
    ],
    features: [
      {
        icon: 'store',
        title: 'Storefront Promotion Banners',
        description:
          'Feature seasonal sales, new product drops, and coupon codes in rotating signature banners that link directly to your Shopify, WooCommerce, or custom storefront.',
      },
      {
        icon: 'star',
        title: 'Review & Referral Links',
        description:
          'Include Trustpilot, Google Reviews, or referral program links in support team signatures to turn every resolved ticket into a review or referral opportunity.',
      },
      {
        icon: 'headphones',
        title: 'Support Team Signatures',
        description:
          'Give customer support agents branded signatures with order tracking links, return policy pages, and live chat access for seamless post-purchase communication.',
      },
      {
        icon: 'bar-chart-3',
        title: 'Click-Through Analytics',
        description:
          'Track which signature banners and links generate the most clicks and conversions. Optimize your signature campaigns with real data.',
      },
    ],
    featuresTitle: 'Signature Features Built for Online Retail',
    sections: [
      {
        type: 'use-cases-grid',
        title: 'E-commerce Teams That Benefit from Siggly',
        cases: [
          {
            title: 'Customer Support',
            description:
              'Branded signatures with order tracking links and return policy pages that resolve customer questions before they are asked.',
          },
          {
            title: 'Marketing Team',
            description:
              'Promote flash sales, new arrivals, and loyalty programs in every marketing team email sent to partners and influencers.',
          },
          {
            title: 'Fulfillment & Operations',
            description:
              'Include warehouse contact details and shipping partner links for streamlined vendor communication.',
          },
          {
            title: 'Executive Team',
            description:
              'Present a polished brand image to investors, wholesale buyers, and strategic partners.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'We added a 15%-off coupon banner to our support team signatures. Over three months, it generated over $22,000 in repeat purchases we can directly attribute to those email clicks.',
      authorName: 'Lisa Cheng',
      authorTitle: 'Head of E-commerce, Bloom & Basket',
    },
    faqs: [
      {
        question: 'Can I rotate promotional banners in signatures?',
        answer:
          'Yes. Siggly supports banner rotation schedules so you can automatically swap promotions for seasonal sales, product launches, and clearance events.',
      },
      {
        question: 'Does Siggly integrate with Shopify or WooCommerce?',
        answer:
          'Siggly links to any e-commerce platform via URL. You can embed storefront links, product page URLs, and cart recovery pages in your signatures.',
      },
      {
        question: 'Can support agents have different signatures than sales?',
        answer:
          'Absolutely. Siggly supports department-based templates so support agents show help desk links while sales reps display product catalogs and scheduling tools.',
      },
    ],
    cta: {
      title: 'Boost Sales from Every Email',
      description:
        'Your e-commerce emails are untapped revenue. Let Siggly help you convert every interaction into a storefront visit.',
    },
  },

  // ─── Gaming ────────────────────────────────────────────────────────
  {
    slug: 'gaming',
    category: 'industries',
    meta: {
      title: 'Email Signatures for Gaming Studios | Siggly',
      description:
        'Creative, branded email signatures for game studios, publishers, and esports organizations. Showcase titles, platform partnerships, and community links.',
      keywords: [
        'gaming email signatures',
        'game studio email branding',
        'esports email signatures',
        'game publisher email',
        'gaming industry email management',
      ],
      canonical: '/industries/gaming',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Industries', url: '/industries' },
      { name: 'Gaming', url: '/industries/gaming' },
    ],
    hero: {
      badge: { icon: 'play-circle', text: 'Gaming Solutions' },
      title: 'Level Up Your Studio\'s Email Presence',
      description:
        'Game studios, publishers, and esports organizations need email signatures as creative as their products. Siggly delivers branded signatures with title showcases, platform badges, and community links that match your studio identity.',
      variant: 'dark',
    },
    features: [
      {
        icon: 'play-circle',
        title: 'Title Showcase Banners',
        description:
          'Promote your latest release, upcoming title, or flagship franchise with eye-catching banner art that links to store pages or trailers.',
      },
      {
        icon: 'grid',
        title: 'Platform Partnership Badges',
        description:
          'Display PlayStation, Xbox, Nintendo, Steam, and Epic Games Store partnership logos to signal your multi-platform presence.',
      },
      {
        icon: 'message-circle',
        title: 'Community Hub Links',
        description:
          'Include Discord server invites, Twitch channel links, and subreddit URLs so every email connects recipients to your gaming community.',
      },
    ],
    featuresTitle: 'Signature Features for the Gaming Industry',
    sections: [
      {
        type: 'checklist',
        title: 'What Gaming Professionals Include in Signatures',
        items: [
          'Studio logo with custom art style',
          'Current or upcoming title banner',
          'Platform partnership badges',
          'Discord, Twitch, and social community links',
          'Press kit and media contact information',
        ],
      },
    ],
    testimonial: {
      quote:
        'We added our latest game trailer banner to every team signature during launch week. Social impressions from email clicks alone beat our paid campaign by 3x.',
      authorName: 'Alex Kim',
      authorTitle: 'Community Director, Ironclad Studios',
    },
    faqs: [
      {
        question: 'Can I use custom artwork in my email signature?',
        answer:
          'Yes. Siggly supports custom banner images, so you can use key art from your latest title or your studio brand art as a signature header or footer.',
      },
      {
        question: 'How do I manage signatures for a large studio?',
        answer:
          'Siggly integrates with your directory to automatically assign signatures by department. Artists, engineers, producers, and community managers each get role-appropriate templates.',
      },
      {
        question: 'Can esports teams use Siggly?',
        answer:
          'Yes. Esports organizations can create player-specific signatures with team branding, sponsor logos, streaming schedules, and social handles.',
      },
      {
        question: 'Does Siggly work for indie developers?',
        answer:
          'Absolutely. Siggly scales from solo indie devs to AAA studios. Free and affordable plans make it accessible for teams of any size.',
      },
    ],
    cta: {
      title: 'Press Start on Professional Email',
      description:
        'Give your gaming studio email signatures that are as polished as the titles you ship. Try Siggly free.',
    },
  },

  // ─── Mining ────────────────────────────────────────────────────────
  {
    slug: 'mining',
    category: 'industries',
    meta: {
      title: 'Email Signatures for Mining Companies | Siggly',
      description:
        'Branded email signatures for mining operations. Display safety protocols, environmental compliance, and mineral rights credentials professionally.',
      keywords: [
        'mining email signatures',
        'mining company email branding',
        'MSHA compliant signatures',
        'mineral rights email',
        'mining safety email management',
      ],
      canonical: '/industries/mining',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Industries', url: '/industries' },
      { name: 'Mining', url: '/industries/mining' },
    ],
    hero: {
      badge: { icon: 'gauge', text: 'Mining Solutions' },
      title: 'Professional Email Signatures Forged for Mining Operations',
      description:
        'Mining companies operate under intense regulatory scrutiny. Siggly ensures every email from your corporate offices, field sites, and processing facilities carries proper safety credentials, environmental compliance details, and professional branding.',
      variant: 'violet',
    },
    stats: [
      { value: '75+', label: 'Mining companies' },
      { value: '100%', label: 'MSHA badge support' },
      { value: '15 min', label: 'Site-wide deployment' },
      { value: '50%', label: 'Fewer compliance gaps' },
    ],
    features: [
      {
        icon: 'shield-check',
        title: 'MSHA Safety Credentials',
        description:
          'Display MSHA training certifications, Part 46/48 compliance status, and safety performance metrics that regulators and partners expect to see.',
      },
      {
        icon: 'activity',
        title: 'Environmental Compliance Badges',
        description:
          'Include EPA permits, NEPA compliance notices, and environmental impact assessment references to demonstrate responsible mining practices.',
      },
      {
        icon: 'map',
        title: 'Multi-Site Management',
        description:
          'Manage unique signatures for each mine site, processing facility, and corporate office with location-specific contact details and permits.',
      },
      {
        icon: 'file-text',
        title: 'Mineral Rights Documentation',
        description:
          'Link to mineral rights registries, claim documentation, and royalty contact information directly from land management team signatures.',
      },
    ],
    featuresTitle: 'Mined for Mining Professionals',
    sections: [
      {
        type: 'benefits',
        title: 'Why Mining Companies Choose Siggly',
        items: [
          {
            icon: 'shield',
            title: 'Regulatory Confidence',
            description:
              'MSHA and EPA compliance details in every email demonstrate your commitment to safety and environmental responsibility before any meeting.',
          },
          {
            icon: 'building-2',
            title: 'Multi-Site Coordination',
            description:
              'Each mine site gets its own template with local permits, emergency contacts, and site-specific branding while corporate standards remain enforced.',
          },
          {
            icon: 'refresh-cw',
            title: 'Certification Tracking',
            description:
              'Siggly alerts you when safety certifications approach expiration, so signatures always reflect current credential status.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Having our MSHA training status and environmental permits visible in every email streamlined our interactions with regulators. It shows we take compliance seriously.',
      authorName: 'Tom Bridwell',
      authorTitle: 'VP of Operations, Copperhead Mining Corp',
    },
    cta: {
      title: 'Unearth Professional Email Signatures',
      description:
        'Give your mining operation branded, compliant signatures that reflect your safety commitment. Start free.',
    },
  },

  // ─── Pharmaceuticals ──────────────────────────────────────────────
  {
    slug: 'pharmaceuticals',
    category: 'industries',
    meta: {
      title: 'Email Signatures for Pharmaceutical Companies | Siggly',
      description:
        'Compliant email signatures for pharma teams. Display FDA approval details, GMP certifications, and drug safety information in every email.',
      keywords: [
        'pharmaceutical email signatures',
        'pharma email branding',
        'FDA compliant signatures',
        'GMP email management',
        'drug safety email signatures',
      ],
      canonical: '/industries/pharmaceuticals',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Industries', url: '/industries' },
      { name: 'Pharmaceuticals', url: '/industries/pharmaceuticals' },
    ],
    hero: {
      badge: { icon: 'heart', text: 'Pharmaceutical Solutions' },
      title: 'Prescription-Strength Email Signatures for Pharma Professionals',
      description:
        'Pharmaceutical companies face stringent communication requirements from the FDA, EMA, and global regulators. Siggly helps your teams maintain GMP-compliant signatures with proper disclaimers, credential displays, and adverse event reporting links.',
      variant: 'emerald',
    },
    stats: [
      { value: '120+', label: 'Pharma organizations' },
      { value: '99%', label: 'Disclaimer compliance' },
      { value: '<15 min', label: 'Global deployment' },
    ],
    features: [
      {
        icon: 'file-check',
        title: 'FDA & EMA Regulatory Fields',
        description:
          'Include NDA/ANDA numbers, EMA marketing authorization references, and regulatory affairs contact details that auditors and partners need.',
      },
      {
        icon: 'shield',
        title: 'GMP Compliance Badges',
        description:
          'Display current Good Manufacturing Practice certification status, facility registration numbers, and DEA schedule details where applicable.',
      },
      {
        icon: 'alert-triangle',
        title: 'Adverse Event Reporting Links',
        description:
          'Automatically include MedWatch reporting links and pharmacovigilance contact information in all outward-facing signatures as required by FDA guidance.',
      },
      {
        icon: 'lock',
        title: 'Promotional Review Compliance',
        description:
          'Ensure signatures used by commercial teams comply with OPDP guidelines by restricting unapproved claims and including required fair-balance references.',
      },
      {
        icon: 'globe',
        title: 'Multi-Market Localization',
        description:
          'Manage signature variations for US, EU, APAC, and LATAM markets with region-specific regulatory disclaimers, languages, and local affiliate branding.',
      },
    ],
    featuresTitle: 'Pharma-Grade Signature Management',
    sections: [
      {
        type: 'how-it-works',
        title: 'Get Your Pharma Team on Siggly',
        steps: [
          {
            step: '01',
            title: 'Configure Compliance Rules',
            description:
              'Set up mandatory disclaimer blocks, adverse event links, and credential fields that must appear on every signature across your organization.',
          },
          {
            step: '02',
            title: 'Build Department Templates',
            description:
              'Create distinct templates for R&D, regulatory affairs, commercial, medical affairs, and manufacturing teams with role-appropriate content.',
          },
          {
            step: '03',
            title: 'Deploy with Audit Trail',
            description:
              'Push signatures globally with full version history and audit logging to satisfy FDA and EMA inspection requirements.',
          },
        ],
      },
      {
        type: 'use-cases-grid',
        title: 'Pharma Teams Using Siggly',
        cases: [
          {
            title: 'Regulatory Affairs',
            description:
              'Signatures with NDA numbers, FDA contact references, and submission tracking links for seamless regulator communication.',
          },
          {
            title: 'Medical Science Liaisons',
            description:
              'Credential-rich signatures featuring MD/PharmD degrees, therapeutic area specialties, and publication links.',
          },
          {
            title: 'Commercial & Sales',
            description:
              'Compliant promotional signatures with fair-balance language and approved product messaging.',
          },
          {
            title: 'Pharmacovigilance',
            description:
              'Signatures with mandatory MedWatch links and adverse event reporting instructions for patient safety compliance.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'During our last FDA inspection, auditors asked how we enforce adverse event links in employee emails. We showed them Siggly and they were impressed that every signature was automatically compliant.',
      authorName: 'Dr. Naveen Gupta',
      authorTitle: 'VP of Pharmacovigilance, Alder Biosciences',
    },
    faqs: [
      {
        question: 'Can Siggly enforce mandatory disclaimers for pharma?',
        answer:
          'Yes. Administrators can lock disclaimer blocks so they cannot be removed or edited by individual employees, ensuring every email meets regulatory requirements.',
      },
      {
        question: 'How do you handle promotional review compliance?',
        answer:
          'Siggly supports approval workflows where medical-legal-regulatory teams can review and approve signature content before it goes live, preventing unapproved promotional claims.',
      },
      {
        question: 'Can we include adverse event reporting links?',
        answer:
          'Yes. MedWatch URLs, pharmacovigilance email addresses, and adverse event phone numbers can be added as mandatory fields that appear on all outward-facing signatures.',
      },
      {
        question: 'Does Siggly maintain an audit trail?',
        answer:
          'Yes. Every signature change is logged with timestamps, user attribution, and version snapshots. This audit trail supports FDA 21 CFR Part 11 and EMA Annex 11 inspection readiness.',
      },
    ],
    cta: {
      title: 'Prescribe Professional Email Standards',
      description:
        'Ensure every pharmaceutical email meets regulatory requirements and projects your brand with precision. Try Siggly free.',
    },
  },
];
