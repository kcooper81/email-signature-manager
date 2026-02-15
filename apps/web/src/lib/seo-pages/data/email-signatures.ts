import type { SEOLandingPageData } from '../types';

export const emailSignaturesPages: SEOLandingPageData[] = [
  // ---------------------------------------------------------------------------
  // 1. Accountant
  // ---------------------------------------------------------------------------
  {
    slug: 'accountant',
    category: 'email-signatures',
    meta: {
      title: 'Email Signature for Accountants | Siggly',
      description:
        'Create professional email signatures that showcase your CPA credentials, firm branding, and AICPA membership. Build trust with every client email.',
      keywords: [
        'accountant email signature',
        'CPA email signature',
        'accounting firm email branding',
        'professional accountant signature',
      ],
      canonical: '/email-signatures/accountant',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Email Signatures', url: '/email-signatures' },
      { name: 'Email Signature for Accountants', url: '/email-signatures/accountant' },
    ],
    hero: {
      badge: { icon: 'briefcase', text: 'For Accounting Professionals' },
      title: 'Professional Email Signatures for Accountants & CPAs',
      description:
        'Display your CPA number, AICPA membership, and firm logo in every email. Siggly helps accountants project credibility during busy season and year-round client communication.',
      variant: 'dark',
    },
    stats: [
      { value: '1,200+', label: 'Accounting firms' },
      { value: '99%', label: 'Client satisfaction' },
      { value: '5 min', label: 'Setup time' },
      { value: '30%', label: 'More referrals' },
    ],
    features: [
      {
        icon: 'shield-check',
        title: 'CPA Credential Display',
        description:
          'Prominently display your CPA license number, state board registration, and AICPA membership badge so clients can verify your credentials at a glance.',
      },
      {
        icon: 'calendar',
        title: 'Seasonal Banner Scheduling',
        description:
          'Automatically swap signature banners for tax season reminders, filing deadlines, and extension notices without manually editing every signature.',
      },
      {
        icon: 'lock',
        title: 'Secure Client Portals',
        description:
          'Include a direct link to your secure client portal in every signature, making it easy for clients to upload documents and access their financial records.',
      },
      {
        icon: 'users',
        title: 'Firm-Wide Consistency',
        description:
          'Ensure every partner, associate, and staff accountant uses the same branded template with their individual credentials and contact details.',
      },
    ],
    featuresTitle: 'Built for the Way Accountants Work',
    featuresDescription:
      'Every feature is designed around the workflows, compliance needs, and client expectations unique to accounting professionals.',
    sections: [
      {
        type: 'checklist',
        title: 'What to Include in Your Accounting Email Signature',
        items: [
          'CPA license number and state of registration',
          'AICPA or state CPA society membership badge',
          'Firm logo with consistent brand colors',
          'Direct phone line and scheduling link',
          'Link to secure client document portal',
          'Tax season banner or current deadline reminder',
          'Professional headshot for partner-level staff',
        ],
      },
      {
        type: 'how-it-works',
        title: 'Set Up Your Accounting Firm Signatures in Minutes',
        steps: [
          {
            step: '1',
            title: 'Choose a Template',
            description:
              'Select from accounting-specific templates designed to display credentials, certifications, and firm branding.',
          },
          {
            step: '2',
            title: 'Add Your Credentials',
            description:
              'Enter your CPA number, firm details, and upload your AICPA membership badge or firm logo.',
          },
          {
            step: '3',
            title: 'Deploy to Your Team',
            description:
              'Roll out signatures across your entire firm instantly. Each team member gets their personalized signature automatically.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'During busy season, we updated our signatures with extension filing deadlines across all 45 staff in under two minutes. Clients actually thanked us for the reminders.',
      authorName: 'Rachel Moreno',
      authorTitle: 'Managing Partner, Moreno & Associates CPAs',
    },
    faqs: [
      {
        question: 'Can I display my CPA license number in my email signature?',
        answer:
          'Yes. Siggly lets you add your CPA license number, state registration, and any other professional credentials directly in your signature template. These appear consistently in every email you send.',
      },
      {
        question: 'How do I add a seasonal tax deadline banner?',
        answer:
          'Use the banner scheduling feature to set date ranges for your banners. Siggly will automatically display and remove them based on your schedule — perfect for tax season reminders and extension deadlines.',
      },
      {
        question: 'Can each accountant in my firm have a different signature?',
        answer:
          'Absolutely. Siggly uses a shared template with personalized fields so every partner, senior, and staff accountant gets their own name, credentials, and direct line while maintaining firm-wide branding.',
      },
      {
        question: 'Does Siggly work with Outlook and Gmail?',
        answer:
          'Siggly supports Microsoft 365, Google Workspace, and most major email clients. Your signatures deploy without any IT configuration changes.',
      },
    ],
    cta: {
      title: 'Build Your Accounting Signature Today',
      description:
        'Showcase your CPA credentials and firm brand in every email. Get started free — no credit card required.',
    },
  },
  // ---------------------------------------------------------------------------
  // 2. Architect
  // ---------------------------------------------------------------------------
  {
    slug: 'architect',
    category: 'email-signatures',
    meta: {
      title: 'Email Signature for Architects | Siggly',
      description:
        'Design email signatures that reflect your architectural practice. Display AIA credentials, LEED certifications, and link to your project portfolio.',
      keywords: [
        'architect email signature',
        'AIA email signature',
        'architecture firm branding',
        'LEED certified architect signature',
        'architect portfolio link',
      ],
      canonical: '/email-signatures/architect',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Email Signatures', url: '/email-signatures' },
      { name: 'Email Signature for Architects', url: '/email-signatures/architect' },
    ],
    hero: {
      badge: { icon: 'building', text: 'Architecture & Design' },
      title: 'Need a Professional Email Signature for Your Architecture Practice?',
      description:
        'Present your AIA membership, LEED accreditation, and project portfolio with a signature that matches the design quality of your work. Siggly makes it effortless.',
      variant: 'violet',
    },
    features: [
      {
        icon: 'award',
        title: 'AIA & LEED Badges',
        description:
          'Display your AIA membership tier and LEED accreditation badges directly in your signature, reinforcing your professional standing with every email.',
      },
      {
        icon: 'image',
        title: 'Portfolio Integration',
        description:
          'Link to your latest project portfolio or Behance profile so prospective clients can view your work from any email you send.',
      },
      {
        icon: 'palette',
        title: 'Design-Forward Templates',
        description:
          'Choose from signature templates with clean lines and modern typography that align with the aesthetic sensibility architects demand.',
      },
    ],
    featuresTitle: 'Signature Features for Design Professionals',
    sections: [
      {
        type: 'benefits',
        title: 'Why Architects Trust Siggly',
        items: [
          {
            icon: 'eye',
            title: 'Visual Impact',
            description:
              'Your email signature is an extension of your design portfolio. Siggly templates are crafted with the whitespace, alignment, and typography that architects appreciate.',
          },
          {
            icon: 'globe',
            title: 'Multi-Office Consistency',
            description:
              'Maintain brand consistency across your main studio, satellite offices, and remote team members with centrally managed templates.',
          },
          {
            icon: 'link',
            title: 'Portfolio & Social Links',
            description:
              'Include clickable links to your project gallery, LinkedIn, Instagram, and AIA profile without cluttering your signature.',
          },
          {
            icon: 'refresh-cw',
            title: 'Project Banner Rotation',
            description:
              'Rotate banners showcasing your latest completed project or current competition entry to keep your signature fresh.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'We switched to Siggly when we opened our second studio. Now both offices have perfectly consistent signatures that actually look like something an architect would design.',
      authorName: 'Marcus Vela, AIA',
      authorTitle: 'Principal, Vela Architecture Studio',
    },
    faqs: [
      {
        question: 'Can I include my AIA membership number in my signature?',
        answer:
          'Yes. You can display your AIA membership number, licensure state, and NCARB certification directly in your signature alongside your firm branding.',
      },
      {
        question: 'How do I link to my project portfolio?',
        answer:
          'Add a portfolio URL in your signature settings. Siggly can display it as a text link, a button, or a clickable thumbnail image of your latest project.',
      },
      {
        question: 'Can I show LEED accreditation in my signature?',
        answer:
          'Absolutely. Upload your LEED AP or LEED GA badge and Siggly will display it at the correct size alongside your other credentials.',
      },
    ],
    cta: {
      title: 'See It in Action',
      description:
        'Create an email signature that reflects the quality of your architectural work. Start free today.',
    },
  },
  // ---------------------------------------------------------------------------
  // 3. Dentist
  // ---------------------------------------------------------------------------
  {
    slug: 'dentist',
    category: 'email-signatures',
    meta: {
      title: 'Email Signature for Dentists | Siggly',
      description:
        'Build HIPAA-compliant email signatures for your dental practice. Showcase your NPI number, ADA membership, and online scheduling link in every patient email.',
      keywords: [
        'dentist email signature',
        'dental practice email branding',
        'HIPAA compliant email signature',
        'ADA member dentist signature',
      ],
      canonical: '/email-signatures/dentist',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Email Signatures', url: '/email-signatures' },
      { name: 'Email Signature for Dentists', url: '/email-signatures/dentist' },
    ],
    hero: {
      badge: { icon: 'heart', text: 'Dental Professionals' },
      title: 'Build Your Dental Practice Email Signature',
      description:
        'Include your NPI number, ADA membership, and appointment booking link in a clean, HIPAA-conscious signature. Siggly keeps your practice looking polished and professional.',
      variant: 'emerald',
    },
    stats: [
      { value: '800+', label: 'Dental practices' },
      { value: '100%', label: 'HIPAA conscious' },
      { value: '3 min', label: 'Average setup' },
    ],
    features: [
      {
        icon: 'shield-check',
        title: 'HIPAA-Conscious Design',
        description:
          'Signatures include configurable confidentiality notices and HIPAA disclaimers that meet healthcare communication best practices.',
      },
      {
        icon: 'calendar',
        title: 'Appointment Booking Link',
        description:
          'Embed a direct link to your online scheduling system so patients can book cleanings, consultations, and follow-ups right from your email.',
      },
      {
        icon: 'user-check',
        title: 'Provider Credentials',
        description:
          'Display your DDS or DMD degree, NPI number, and ADA membership to build patient confidence in your qualifications.',
      },
      {
        icon: 'star',
        title: 'Review Request Integration',
        description:
          'Add a subtle link to your Google or Yelp review page, encouraging satisfied patients to share their experience after appointments.',
      },
      {
        icon: 'users',
        title: 'Multi-Provider Support',
        description:
          'Manage signatures for every dentist, hygienist, and front-desk staff member in your practice from a single admin panel.',
      },
    ],
    featuresTitle: 'Everything Your Dental Practice Needs',
    featuresDescription:
      'Purpose-built features for the unique communication and compliance needs of dental professionals.',
    sections: [
      {
        type: 'use-cases-grid',
        title: 'How Dental Practices Use Siggly',
        cases: [
          {
            title: 'Appointment Reminders',
            description:
              'Every reminder email from your practice carries your branded signature with a one-click rebooking link.',
          },
          {
            title: 'New Patient Onboarding',
            description:
              'Welcome emails include provider credentials, office hours, and a link to your patient portal for forms.',
          },
          {
            title: 'Referral Communications',
            description:
              'When corresponding with specialists, your signature displays your NPI and license for seamless referral processing.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Is the HIPAA disclaimer customizable?',
        answer:
          'Yes. Siggly provides a default HIPAA confidentiality notice that you can customize to match your practice policies and your compliance officer requirements.',
      },
      {
        question: 'Can I include an appointment booking button?',
        answer:
          'Absolutely. Add your scheduling URL and Siggly will render a clean, clickable button or link in your signature that works across all major email clients.',
      },
      {
        question: 'How do I manage signatures for multiple providers?',
        answer:
          'Create a shared template and assign it to your team. Each provider gets their own name, credentials, NPI, and headshot populated automatically.',
      },
      {
        question: 'Can patients see my credentials in the signature?',
        answer:
          'Yes. Your DDS/DMD degree, NPI number, specialty certifications, and ADA membership can all be displayed prominently so patients know exactly who they are communicating with.',
      },
      {
        question: 'Does Siggly work with dental practice management software?',
        answer:
          'Siggly integrates with your existing email platform (Microsoft 365 or Google Workspace). Emails sent from your practice management system can also use your Siggly signature.',
      },
    ],
    cta: {
      title: 'Try It Today',
      description:
        'Give your dental practice a professional, compliant email signature. Set up in minutes — free to start.',
    },
  },
  // ---------------------------------------------------------------------------
  // 4. Engineer
  // ---------------------------------------------------------------------------
  {
    slug: 'engineer',
    category: 'email-signatures',
    meta: {
      title: 'Email Signature for Engineers | Siggly',
      description:
        'Create email signatures for engineers that highlight your PE license, technical certifications, and project specialties. Trusted by engineering firms worldwide.',
      keywords: [
        'engineer email signature',
        'PE license email signature',
        'engineering firm email branding',
        'professional engineer signature',
        'technical email signature',
      ],
      canonical: '/email-signatures/engineer',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Email Signatures', url: '/email-signatures' },
      { name: 'Email Signature for Engineers', url: '/email-signatures/engineer' },
    ],
    hero: {
      badge: { icon: 'wrench', text: 'Engineering Professionals' },
      title: 'Email Signatures Engineered for Precision',
      description:
        'Display your PE license, discipline, and firm credentials with the same precision you bring to your engineering work. Siggly keeps your team aligned across every project.',
      variant: 'slate',
    },
    stats: [
      { value: '2,000+', label: 'Engineers onboarded' },
      { value: '95%', label: 'Time saved on updates' },
      { value: '10 min', label: 'Firm-wide rollout' },
      { value: '50+', label: 'Engineering firms' },
    ],
    features: [
      {
        icon: 'award',
        title: 'PE License Display',
        description:
          'Show your Professional Engineer license number and state of registration prominently, meeting requirements for professional correspondence.',
      },
      {
        icon: 'layers',
        title: 'Discipline-Specific Templates',
        description:
          'Choose templates tailored to civil, mechanical, electrical, structural, or environmental engineering with relevant credential fields.',
      },
      {
        icon: 'file-check',
        title: 'Certification Badges',
        description:
          'Display FE, PE, SE, and specialty certification badges alongside your signature for immediate professional recognition.',
      },
      {
        icon: 'building-2',
        title: 'Multi-Office Deployment',
        description:
          'Deploy consistent signatures across branch offices and project sites while accommodating regional licensing requirements.',
      },
    ],
    featuresTitle: 'Why Engineering Firms Choose Siggly',
    sections: [
      {
        type: 'how-it-works',
        title: 'Deploy Engineering Signatures in Three Steps',
        steps: [
          {
            step: '1',
            title: 'Select Your Discipline',
            description:
              'Pick a template designed for your engineering discipline. Each includes the right credential fields for your specialty.',
          },
          {
            step: '2',
            title: 'Enter Your Credentials',
            description:
              'Add your PE number, firm name, discipline, and any specialty certifications. Upload your firm logo and headshot.',
          },
          {
            step: '3',
            title: 'Roll Out Firm-Wide',
            description:
              'Push signatures to your entire engineering team. Individual credentials populate automatically from your directory.',
          },
        ],
      },
      {
        type: 'checklist',
        title: 'Essential Elements for Engineering Email Signatures',
        items: [
          'PE license number and state of registration',
          'Engineering discipline and specialty',
          'Firm logo and brand-consistent formatting',
          'Direct phone number and project-specific contact',
          'Professional certifications (FE, SE, PMP, LEED)',
          'Link to firm project portfolio or case studies',
        ],
      },
    ],
    testimonial: {
      quote:
        'When we merged two engineering offices, Siggly let us unify 120 signatures under one brand in an afternoon. Every PE number, license state, and discipline was accurate.',
      authorName: 'James Hartfield, PE',
      authorTitle: 'Director of Operations, Meridian Engineering Group',
    },
    faqs: [
      {
        question: 'Can I display my PE license in multiple states?',
        answer:
          'Yes. Siggly allows you to list multiple state registrations in your signature. You can display all states where you hold a PE license.',
      },
      {
        question: 'Do you have templates for different engineering disciplines?',
        answer:
          'We offer flexible templates that work across civil, mechanical, electrical, structural, chemical, and environmental engineering. Each can be customized with discipline-specific credential fields.',
      },
      {
        question: 'Can project managers and non-PE staff use Siggly too?',
        answer:
          'Absolutely. Create different template variations for licensed engineers, EITs, project managers, and administrative staff — all under the same firm brand.',
      },
    ],
    cta: {
      title: 'Get Started',
      description:
        'Deploy professional, credential-rich email signatures across your engineering firm. Free to try.',
    },
  },
  // ---------------------------------------------------------------------------
  // 5. Financial Advisor
  // ---------------------------------------------------------------------------
  {
    slug: 'financial-advisor',
    category: 'email-signatures',
    meta: {
      title: 'Email Signature for Financial Advisors | Siggly',
      description:
        'Build compliant email signatures for financial advisors. Display CFP, CFA, or Series 65 credentials and required disclosures in every client email.',
      keywords: [
        'financial advisor email signature',
        'CFP email signature',
        'wealth management email branding',
        'financial planner signature',
        'RIA email signature',
      ],
      canonical: '/email-signatures/financial-advisor',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Email Signatures', url: '/email-signatures' },
      {
        name: 'Email Signature for Financial Advisors',
        url: '/email-signatures/financial-advisor',
      },
    ],
    hero: {
      badge: { icon: 'trending-up', text: 'Financial Services' },
      title: 'Compliant Email Signatures for Financial Advisors',
      description:
        'Present your CFP, CFA, or ChFC designations alongside required compliance disclosures. Siggly helps RIAs, broker-dealers, and independent advisors build client trust from every email.',
      variant: 'indigo',
    },
    stats: [
      { value: '3,500+', label: 'Advisors using Siggly' },
      { value: '100%', label: 'Compliance inclusion' },
      { value: '2 min', label: 'Signature creation' },
    ],
    features: [
      {
        icon: 'shield',
        title: 'Compliance Disclosures',
        description:
          'Automatically append SEC, FINRA, or state-required disclosure language to every outgoing email, reducing compliance risk across your practice.',
      },
      {
        icon: 'award',
        title: 'Designation Display',
        description:
          'Showcase CFP, CFA, ChFC, CLU, and other professional designations with proper formatting and trademark symbols.',
      },
      {
        icon: 'link',
        title: 'ADV & CRS Links',
        description:
          'Include required links to your Form ADV, Form CRS, and privacy policy directly in your email signature for regulatory compliance.',
      },
      {
        icon: 'calendar',
        title: 'Meeting Scheduler',
        description:
          'Embed a link to your Calendly or scheduling tool so prospects and clients can book consultations directly from your email.',
      },
      {
        icon: 'lock',
        title: 'Archival-Ready Format',
        description:
          'Signatures are rendered in a format compatible with email archival systems used by RIAs and broker-dealers for recordkeeping.',
      },
    ],
    featuresTitle: 'Designed for Financial Services Compliance',
    sections: [
      {
        type: 'prose',
        title: 'Why Email Signatures Matter in Financial Services',
        paragraphs: [
          'In financial services, every client touchpoint is subject to regulatory scrutiny. Your email signature is no exception. SEC and FINRA guidelines require specific disclosures in electronic communications, and an inconsistent or incomplete signature can expose your firm to compliance risks.',
          'Siggly ensures that every email from your practice — whether sent by a lead advisor, paraplanner, or client services associate — includes the correct designations, disclosure language, and required links. No manual oversight needed.',
          'Beyond compliance, a well-crafted signature reinforces the trust and professionalism that clients expect from their financial advisor. It signals attention to detail — the same quality you bring to managing their wealth.',
        ],
      },
    ],
    testimonial: {
      quote:
        'Our compliance officer used to spend hours reviewing advisor signatures quarterly. With Siggly, disclosures are baked in and we have not had a single compliance finding since we switched.',
      authorName: 'Katherine Liu, CFP',
      authorTitle: 'Chief Compliance Officer, Beacon Wealth Partners',
    },
    faqs: [
      {
        question: 'Does Siggly support required compliance disclosures?',
        answer:
          'Yes. You can configure mandatory disclosure text that is appended to every signature in your firm. Advisors cannot remove or edit compliance blocks, ensuring consistent regulatory adherence.',
      },
      {
        question: 'Can I include links to Form ADV and Form CRS?',
        answer:
          'Absolutely. Add URLs to your Form ADV Part 2A, Form CRS, privacy policy, and any other required documents. They will appear as clean links in every signature.',
      },
      {
        question: 'How do I show multiple designations correctly?',
        answer:
          'Siggly formats designations per industry conventions — for example, "John Smith, CFP\u00ae, CFA" — with proper trademark symbols and comma placement.',
      },
      {
        question: 'Is Siggly suitable for broker-dealer affiliated advisors?',
        answer:
          'Yes. Siggly supports the longer disclosure requirements typical of broker-dealer compliance, including registered representative disclosures and member FINRA/SIPC notices.',
      },
    ],
    cta: {
      title: 'Start Free',
      description:
        'Build compliant, professional email signatures for your advisory practice. No credit card needed.',
    },
  },
  // ---------------------------------------------------------------------------
  // 6. Insurance Agent
  // ---------------------------------------------------------------------------
  {
    slug: 'insurance-agent',
    category: 'email-signatures',
    meta: {
      title: 'Email Signature for Insurance Agents | Siggly',
      description:
        'Create professional email signatures for insurance agents. Display your license number, carrier appointments, and quote request links to win more clients.',
      keywords: [
        'insurance agent email signature',
        'insurance broker email branding',
        'licensed insurance agent signature',
        'insurance email template',
      ],
      canonical: '/email-signatures/insurance-agent',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Email Signatures', url: '/email-signatures' },
      {
        name: 'Email Signature for Insurance Agents',
        url: '/email-signatures/insurance-agent',
      },
    ],
    hero: {
      badge: { icon: 'shield', text: 'Insurance Professionals' },
      title: 'Professional Email Signatures for Insurance Agents',
      description:
        'Showcase your state license, carrier appointments, and lines of authority in a signature that drives quote requests. Siggly helps independent agents and agency teams look their best.',
      variant: 'light',
    },
    features: [
      {
        icon: 'file-check',
        title: 'License & Appointment Display',
        description:
          'Show your state insurance license number and carrier appointments so prospects can verify your credentials before requesting a quote.',
      },
      {
        icon: 'mouse-pointer-click',
        title: 'Quote Request Button',
        description:
          'Add a prominent "Get a Quote" button linked to your quoting platform or landing page, turning every email into a lead generation opportunity.',
      },
      {
        icon: 'phone',
        title: 'Click-to-Call Integration',
        description:
          'Include a clickable phone number so mobile users can call you directly from your email signature with a single tap.',
      },
      {
        icon: 'users',
        title: 'Agency Team Management',
        description:
          'Manage signatures for every agent, CSR, and claims specialist in your agency from one dashboard with role-based templates.',
      },
    ],
    featuresTitle: 'Win More Clients with Every Email',
    sections: [
      {
        type: 'benefits',
        title: 'Benefits for Insurance Professionals',
        items: [
          {
            icon: 'target',
            title: 'Lead Generation',
            description:
              'Every email becomes a marketing touchpoint with quote request links, referral program mentions, and seasonal coverage reminders.',
          },
          {
            icon: 'shield-check',
            title: 'Compliance Confidence',
            description:
              'Always display your license number and required disclosures, meeting state department of insurance requirements.',
          },
          {
            icon: 'star',
            title: 'Client Trust',
            description:
              'A polished, credential-rich signature builds the trust that policyholders and prospects need when choosing their insurance agent.',
          },
        ],
      },
      {
        type: 'use-cases-grid',
        title: 'Insurance Email Signature Use Cases',
        cases: [
          {
            title: 'Policy Renewal Reminders',
            description:
              'Renewal emails carry your branded signature with a direct link to review coverage options.',
          },
          {
            title: 'Claims Follow-Up',
            description:
              'Claims correspondence includes your license and direct line so clients can reach you immediately.',
          },
          {
            title: 'Cross-Selling Campaigns',
            description:
              'Add banners promoting umbrella, life, or commercial coverage to your signature during targeted campaigns.',
          },
          {
            title: 'Referral Requests',
            description:
              'Include a referral program link in your signature to encourage satisfied clients to recommend your services.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Can I show my insurance license number?',
        answer:
          'Yes. Siggly lets you display your state insurance license number, National Producer Number (NPN), and lines of authority directly in your email signature.',
      },
      {
        question: 'How do I add a quote request button?',
        answer:
          'Add your quoting platform URL in the signature builder and Siggly will render a clean, clickable button that works across all email clients including Outlook and Gmail.',
      },
      {
        question: 'Can I manage signatures for my entire agency?',
        answer:
          'Absolutely. Create role-based templates for agents, CSRs, and claims staff. Each person gets their own personalized signature with consistent agency branding.',
      },
    ],
    cta: {
      title: 'Build Yours Now',
      description:
        'Create professional email signatures that generate leads and build trust. Start your free trial.',
    },
  },
  // ---------------------------------------------------------------------------
  // 7. Journalist
  // ---------------------------------------------------------------------------
  {
    slug: 'journalist',
    category: 'email-signatures',
    meta: {
      title: 'Email Signature for Journalists | Siggly',
      description:
        'Create email signatures for journalists that link to your byline, portfolio, and media kit. Build your personal brand with every pitch and source email.',
      keywords: [
        'journalist email signature',
        'reporter email signature',
        'media professional email branding',
        'journalist byline signature',
      ],
      canonical: '/email-signatures/journalist',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Email Signatures', url: '/email-signatures' },
      { name: 'Email Signature for Journalists', url: '/email-signatures/journalist' },
    ],
    hero: {
      badge: { icon: 'pen-tool', text: 'Media & Journalism' },
      title: 'Your Byline Deserves a Better Signature',
      description:
        'Link to your published work, media kit, and beat coverage from a signature that establishes your credibility with every source, editor, and PR contact you email.',
      variant: 'dark',
    },
    features: [
      {
        icon: 'file-text',
        title: 'Byline & Portfolio Links',
        description:
          'Include clickable links to your latest published articles, Muck Rack profile, or personal portfolio site so recipients can see your work immediately.',
      },
      {
        icon: 'book-open',
        title: 'Beat & Publication Display',
        description:
          'Show your beat, publication name, and editorial role so sources and PR professionals know exactly what you cover.',
      },
      {
        icon: 'smartphone',
        title: 'Encrypted Contact Options',
        description:
          'Include your Signal number or SecureDrop link for confidential tipsters, displayed discreetly below your standard contact details.',
      },
    ],
    featuresTitle: 'Signature Features for Working Journalists',
    sections: [
      {
        type: 'checklist',
        title: 'What Journalists Should Include in Their Email Signature',
        items: [
          'Full name and editorial title',
          'Publication or outlet name with logo',
          'Beat or coverage area',
          'Link to published bylines or portfolio',
          'Signal or encrypted messaging handle for sources',
          'Social media handles (Twitter/X, LinkedIn)',
          'Headshot for name recognition',
          'Podcast or newsletter subscription link if applicable',
        ],
      },
    ],
    testimonial: {
      quote:
        'I started getting more responses from cold source pitches after adding my byline portfolio to my signature. People could immediately see I had covered their industry before.',
      authorName: 'Sarah Cho',
      authorTitle: 'Senior Reporter, The Capitol Herald',
    },
    faqs: [
      {
        question: 'Can I link to my Muck Rack or portfolio?',
        answer:
          'Yes. Add any URL to your signature — Muck Rack, Contently, a personal site, or even a Google Drive folder of clips. Siggly renders it as a clean, clickable link.',
      },
      {
        question: 'How do I include my beat information?',
        answer:
          'Add your beat or coverage area as a custom field in your signature template. It appears below your title, making it immediately clear to sources what you cover.',
      },
      {
        question: 'Can I add a secure tipline to my signature?',
        answer:
          'Absolutely. Include your Signal number, WhatsApp, or SecureDrop link as a secondary contact method in your signature.',
      },
      {
        question: 'Does Siggly work for freelance journalists too?',
        answer:
          'Yes. Freelancers can list multiple publications, link to a portfolio, and present a professional identity even without a single newsroom affiliation.',
      },
      {
        question: 'Can I update my signature when I change publications?',
        answer:
          'Instantly. Update your publication, title, and logo in Siggly and your new signature is live across all your email accounts within minutes.',
      },
    ],
    cta: {
      title: 'See It in Action',
      description:
        'Build a signature that opens doors with sources and editors. Free to create — takes under five minutes.',
    },
  },
  // ---------------------------------------------------------------------------
  // 8. Mortgage Broker
  // ---------------------------------------------------------------------------
  {
    slug: 'mortgage-broker',
    category: 'email-signatures',
    meta: {
      title: 'Email Signature for Mortgage Brokers | Siggly',
      description:
        'Build professional email signatures for mortgage brokers with NMLS number, equal housing logo, and pre-approval application links. Stand out in a competitive market.',
      keywords: [
        'mortgage broker email signature',
        'NMLS email signature',
        'loan officer email branding',
        'mortgage professional signature',
        'equal housing lender signature',
      ],
      canonical: '/email-signatures/mortgage-broker',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Email Signatures', url: '/email-signatures' },
      {
        name: 'Email Signature for Mortgage Brokers',
        url: '/email-signatures/mortgage-broker',
      },
    ],
    hero: {
      badge: { icon: 'home', text: 'Mortgage & Lending' },
      title: 'Close More Loans with a Professional Email Signature',
      description:
        'Display your NMLS number, equal housing logo, and pre-approval link in every borrower and realtor email. Siggly keeps your compliance and branding airtight.',
      variant: 'emerald',
    },
    stats: [
      { value: '1,800+', label: 'Loan officers' },
      { value: '100%', label: 'NMLS compliant' },
      { value: '25%', label: 'More applications' },
    ],
    features: [
      {
        icon: 'key',
        title: 'NMLS Number Display',
        description:
          'Automatically include your individual NMLS number and company NMLS as required by the SAFE Act in all electronic communications.',
      },
      {
        icon: 'landmark',
        title: 'Equal Housing Logo',
        description:
          'Display the Equal Housing Lender or Equal Housing Opportunity logo in your signature to meet fair lending compliance requirements.',
      },
      {
        icon: 'mouse-pointer-click',
        title: 'Apply Now Button',
        description:
          'Add a prominent "Apply Now" or "Get Pre-Approved" button linked to your online application, converting email conversations into applications.',
      },
    ],
    featuresTitle: 'Built for Mortgage Professionals',
    sections: [
      {
        type: 'how-it-works',
        title: 'Get Your Mortgage Signature Live in Minutes',
        steps: [
          {
            step: '1',
            title: 'Pick Your Template',
            description:
              'Choose from mortgage-specific templates with built-in fields for NMLS, licensing, and compliance logos.',
          },
          {
            step: '2',
            title: 'Add Your Details',
            description:
              'Enter your NMLS number, company information, headshot, and application URL. Compliance elements auto-populate.',
          },
          {
            step: '3',
            title: 'Start Closing',
            description:
              'Deploy your signature and start sending emails that convert. Every message includes your credentials and application link.',
          },
          {
            step: '4',
            title: 'Update Rate Banners',
            description:
              'Swap out promotional banners with current rates or seasonal offers as the market changes.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Is the NMLS number required in email signatures?',
        answer:
          'The SAFE Act requires mortgage loan originators to include their unique NMLS identifier in all electronic communications. Siggly makes this automatic and non-removable.',
      },
      {
        question: 'Can I include the Equal Housing Lender logo?',
        answer:
          'Yes. Upload the Equal Housing Lender or Equal Housing Opportunity logo and Siggly will display it at the correct size and placement in your signature.',
      },
      {
        question: 'How do I add a loan application link?',
        answer:
          'Add your online application URL in the signature builder. Siggly renders it as a professional button that works across Outlook, Gmail, and mobile email clients.',
      },
      {
        question: 'Can I show current mortgage rates in my signature?',
        answer:
          'You can add a rate banner or promotional area to your signature and update it whenever rates change. Many loan officers update this weekly.',
      },
    ],
    cta: {
      title: 'Build Yours Now',
      description:
        'Create a compliant, lead-generating email signature for your mortgage business. Get started free.',
    },
  },
  // ---------------------------------------------------------------------------
  // 9. Nurse
  // ---------------------------------------------------------------------------
  {
    slug: 'nurse',
    category: 'email-signatures',
    meta: {
      title: 'Email Signature for Nurses | Siggly',
      description:
        'Create HIPAA-compliant email signatures for nurses. Display RN, BSN, or MSN credentials, NPI number, and unit information in a clean professional format.',
      keywords: [
        'nurse email signature',
        'RN email signature',
        'nursing email branding',
        'HIPAA compliant nurse signature',
        'NPI nurse email',
      ],
      canonical: '/email-signatures/nurse',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Email Signatures', url: '/email-signatures' },
      { name: 'Email Signature for Nurses', url: '/email-signatures/nurse' },
    ],
    hero: {
      badge: { icon: 'heart', text: 'Nursing Professionals' },
      title: 'Need a Professional Email Signature as a Nurse?',
      description:
        'Show your RN, BSN, MSN, or NP credentials and NPI number in a HIPAA-conscious signature. Siggly helps nurses across hospitals, clinics, and private practices look professional in every email.',
      variant: 'violet',
    },
    features: [
      {
        icon: 'user-check',
        title: 'Nursing Credential Formatting',
        description:
          'Display your credentials in the correct ANCC-recommended order — degree, licensure, state designation, then certifications (e.g., Jane Doe, MSN, RN, CEN).',
      },
      {
        icon: 'shield-check',
        title: 'HIPAA Confidentiality Notice',
        description:
          'Include a customizable HIPAA disclaimer in every outgoing email to protect patient information and meet healthcare communication standards.',
      },
      {
        icon: 'building-2',
        title: 'Unit & Department Identification',
        description:
          'Specify your unit, department, and facility in your signature so recipients in large health systems can route communications correctly.',
      },
      {
        icon: 'fingerprint',
        title: 'NPI Number Display',
        description:
          'Show your individual NPI number for nurse practitioners and advanced practice nurses who need it in professional correspondence.',
      },
    ],
    featuresTitle: 'Signature Features for Every Nursing Role',
    featuresDescription:
      'Whether you work bedside, in administration, or as an NP, your signature should reflect your credentials accurately.',
    sections: [
      {
        type: 'benefits',
        title: 'Why Nurses Choose Siggly',
        items: [
          {
            icon: 'check-circle',
            title: 'Correct Credential Order',
            description:
              'Siggly formats your credentials following ANCC guidelines so your degrees, licenses, and certifications appear in the professionally accepted sequence.',
          },
          {
            icon: 'lock',
            title: 'HIPAA Compliance',
            description:
              'Every signature includes configurable confidentiality language that meets healthcare email communication best practices.',
          },
          {
            icon: 'zap',
            title: 'Instant Updates',
            description:
              'Earned a new certification? Changed units? Update your signature once and it is live across all your email accounts immediately.',
          },
        ],
      },
      {
        type: 'use-cases-grid',
        title: 'Nursing Email Signature Scenarios',
        cases: [
          {
            title: 'Nurse Practitioners',
            description:
              'Display NPI, prescriptive authority state, and collaborating physician information in your email signature.',
          },
          {
            title: 'Nurse Educators',
            description:
              'Include your academic title, department, and student advising appointment link.',
          },
          {
            title: 'Charge Nurses & Managers',
            description:
              'Show your unit, facility, and administrative title with appropriate credential formatting.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'What order should nursing credentials appear in?',
        answer:
          'ANCC recommends: highest degree, licensure, state designation, then national certifications. For example: Jane Doe, DNP, APRN, FNP-BC. Siggly formats this automatically.',
      },
      {
        question: 'Do I need to include my NPI number?',
        answer:
          'Nurse practitioners and advanced practice nurses who bill for services should include their NPI. Staff RNs typically do not need it in email signatures, but can include it if their facility requires it.',
      },
      {
        question: 'Can I include a HIPAA disclaimer?',
        answer:
          'Yes. Siggly provides a default HIPAA confidentiality notice that you can customize or use as-is. It is included in every email automatically.',
      },
    ],
    cta: {
      title: 'Try It Today',
      description:
        'Create a professional email signature that reflects your nursing credentials. Set up in under three minutes.',
    },
  },
  // ---------------------------------------------------------------------------
  // 10. Personal Trainer
  // ---------------------------------------------------------------------------
  {
    slug: 'personal-trainer',
    category: 'email-signatures',
    meta: {
      title: 'Email Signature for Personal Trainers | Siggly',
      description:
        'Build email signatures that showcase your NASM, ACE, or NSCA certifications. Include booking links and social media to grow your fitness client base.',
      keywords: [
        'personal trainer email signature',
        'fitness email signature',
        'NASM certified trainer signature',
        'gym trainer email branding',
      ],
      canonical: '/email-signatures/personal-trainer',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Email Signatures', url: '/email-signatures' },
      {
        name: 'Email Signature for Personal Trainers',
        url: '/email-signatures/personal-trainer',
      },
    ],
    hero: {
      badge: { icon: 'activity', text: 'Fitness Professionals' },
      title: 'Build Your Personal Training Brand with Every Email',
      description:
        'Display your NASM, ACE, ISSA, or NSCA certifications alongside your booking link and Instagram handle. Siggly helps personal trainers look as professional in their inbox as they are in the gym.',
      variant: 'slate',
    },
    features: [
      {
        icon: 'award',
        title: 'Certification Display',
        description:
          'Show your CPT, CSCS, CES, or other certifications from NASM, ACE, NSCA, or ISSA prominently in your email signature.',
      },
      {
        icon: 'calendar',
        title: 'Session Booking Link',
        description:
          'Embed a direct link to your booking platform — Mindbody, Acuity, or Calendly — so clients can schedule sessions from your emails.',
      },
      {
        icon: 'smartphone',
        title: 'Social Media Integration',
        description:
          'Link your Instagram, TikTok, and YouTube channels where you post workout content, transformations, and training tips.',
      },
      {
        icon: 'star',
        title: 'Testimonial Rotation',
        description:
          'Feature a rotating client testimonial or transformation stat in your signature to build social proof with every email.',
      },
      {
        icon: 'map',
        title: 'Training Location Details',
        description:
          'Show your gym location, in-home service area, or virtual training availability so prospects know how to train with you.',
      },
    ],
    featuresTitle: 'Everything You Need to Grow Your Training Business',
    sections: [
      {
        type: 'checklist',
        title: 'What Personal Trainers Should Include in Their Email Signature',
        items: [
          'Full name and professional title',
          'Primary certification (CPT, CSCS, etc.) and issuing body',
          'Specialty certifications (nutrition, corrective exercise, etc.)',
          'Session booking link or call-to-action button',
          'Gym name and location or virtual training note',
          'Instagram and social media handles',
        ],
      },
    ],
    cta: {
      title: 'Get Started',
      description:
        'Show off your certifications and fill your schedule. Create your free personal trainer signature now.',
    },
  },
  // ---------------------------------------------------------------------------
  // 11. Photographer
  // ---------------------------------------------------------------------------
  {
    slug: 'photographer',
    category: 'email-signatures',
    meta: {
      title: 'Email Signature for Photographers | Siggly',
      description:
        'Create stunning email signatures for photographers. Link to your portfolio, embed a sample image, and book more clients with every email you send.',
      keywords: [
        'photographer email signature',
        'photography business email',
        'photographer portfolio signature',
        'creative email branding',
      ],
      canonical: '/email-signatures/photographer',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Email Signatures', url: '/email-signatures' },
      { name: 'Email Signature for Photographers', url: '/email-signatures/photographer' },
    ],
    hero: {
      badge: { icon: 'image', text: 'Photography Professionals' },
      title: 'Your Portfolio Starts in the Inbox',
      description:
        'Showcase your best work, link to your gallery, and make booking effortless with a signature designed for professional photographers. Wedding, portrait, commercial — Siggly fits every niche.',
      variant: 'dark',
    },
    stats: [
      { value: '2,200+', label: 'Photographers' },
      { value: '45%', label: 'More inquiries' },
      { value: '3 min', label: 'Setup time' },
      { value: '12+', label: 'Creative templates' },
    ],
    features: [
      {
        icon: 'image',
        title: 'Portfolio Thumbnail',
        description:
          'Display a clickable thumbnail of your best shot that links to your full portfolio — giving prospects a visual taste of your work in every email.',
      },
      {
        icon: 'link',
        title: 'Gallery & Booking Links',
        description:
          'Include links to your online gallery (SmugMug, Pixieset, ShootProof) and booking page so clients can view proofs and schedule sessions.',
      },
      {
        icon: 'palette',
        title: 'Brand-Matched Design',
        description:
          'Match your signature to your photography brand with custom colors, fonts, and layout options that feel like an extension of your website.',
      },
    ],
    featuresTitle: 'Show Your Work in Every Email',
    sections: [
      {
        type: 'benefits',
        title: 'Why Photographers Love Siggly',
        items: [
          {
            icon: 'eye',
            title: 'Visual First Impression',
            description:
              'A portfolio thumbnail in your signature gives prospects an instant preview of your style before they even visit your website.',
          },
          {
            icon: 'mouse-pointer-click',
            title: 'One-Click Booking',
            description:
              'Reduce friction between inquiry and booking with a prominent scheduling link in every email you send.',
          },
          {
            icon: 'repeat',
            title: 'Seasonal Updates',
            description:
              'Swap your signature image for seasonal mini-session promos, holiday specials, or recent wedding highlights.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'I changed my signature thumbnail to a fall mini-session photo and booked six sessions that week just from follow-up emails to past clients. Siggly paid for itself immediately.',
      authorName: 'Aisha Rodriguez',
      authorTitle: 'Owner, Aisha Rodriguez Photography',
    },
    faqs: [
      {
        question: 'Can I add a photo to my email signature?',
        answer:
          'Yes. Upload a portfolio image or headshot and Siggly renders it as a clickable thumbnail that links to your gallery or website. It displays correctly across all major email clients.',
      },
      {
        question: 'How do I link to my online gallery?',
        answer:
          'Add your SmugMug, Pixieset, ShootProof, or personal website URL in the signature builder. Siggly can display it as a text link, icon, or button.',
      },
      {
        question: 'Can I change my signature image seasonally?',
        answer:
          'Absolutely. Swap your signature thumbnail anytime to promote seasonal sessions, recent work, or special offers. Changes are live across all your emails instantly.',
      },
    ],
    cta: {
      title: 'See It in Action',
      description:
        'Create a signature that showcases your photography and books more clients. Free to start.',
    },
  },
  // ---------------------------------------------------------------------------
  // 12. Professor
  // ---------------------------------------------------------------------------
  {
    slug: 'professor',
    category: 'email-signatures',
    meta: {
      title: 'Email Signature for Professors | Siggly',
      description:
        'Build academic email signatures for professors. Display your department, research interests, Google Scholar profile, and office hours in every email.',
      keywords: [
        'professor email signature',
        'academic email signature',
        'university professor signature',
        'faculty email branding',
        'Google Scholar link signature',
      ],
      canonical: '/email-signatures/professor',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Email Signatures', url: '/email-signatures' },
      { name: 'Email Signature for Professors', url: '/email-signatures/professor' },
    ],
    hero: {
      badge: { icon: 'graduation-cap', text: 'Academic Professionals' },
      title: 'Academic Email Signatures for Professors & Researchers',
      description:
        'Include your department, research focus, Google Scholar profile, and office hours in a clean signature that works for student emails, peer correspondence, and conference communications.',
      variant: 'indigo',
    },
    features: [
      {
        icon: 'graduation-cap',
        title: 'Academic Title & Department',
        description:
          'Display your rank (Assistant, Associate, Full Professor), department, and institutional affiliation with proper academic formatting.',
      },
      {
        icon: 'book-open',
        title: 'Research & Publication Links',
        description:
          'Link to your Google Scholar profile, ORCID, ResearchGate, or personal academic website so colleagues and students can find your published work.',
      },
      {
        icon: 'clock',
        title: 'Office Hours Display',
        description:
          'Show your current office hours and location directly in your signature so students always have this information handy.',
      },
      {
        icon: 'mail',
        title: 'Conference-Ready Format',
        description:
          'Your signature renders cleanly in plain text and HTML, ensuring it looks professional whether emailing a journal editor or a conference organizer.',
      },
    ],
    featuresTitle: 'Designed for Academic Communication',
    sections: [
      {
        type: 'prose',
        title: 'Why Your Academic Email Signature Matters',
        paragraphs: [
          'Professors send hundreds of emails each week — to students, colleagues, journal editors, grant committees, and conference organizers. Each of these emails is an opportunity to present your academic identity clearly and make it easy for others to find your work.',
          'A well-structured email signature that includes your Google Scholar link, ORCID, and current research focus can increase citations, spark collaborations, and help students find your office hours without a separate lookup.',
        ],
      },
      {
        type: 'checklist',
        title: 'Academic Email Signature Essentials',
        items: [
          'Full name with academic title and rank',
          'Department and university affiliation',
          'Office location and posted office hours',
          'Google Scholar or ORCID profile link',
          'Research interests or lab name',
          'University logo or departmental branding',
        ],
      },
    ],
    testimonial: {
      quote:
        'I added my Google Scholar link to my Siggly signature and noticed a meaningful uptick in citation alerts within the first semester. Small change, real impact.',
      authorName: 'Dr. Tomasz Wierzbicki',
      authorTitle: 'Associate Professor of Materials Science, Northfield University',
    },
    cta: {
      title: 'Start Free',
      description:
        'Build an academic email signature that makes your research discoverable and your office hours visible. No cost to begin.',
    },
  },
  // ---------------------------------------------------------------------------
  // 13. Project Manager
  // ---------------------------------------------------------------------------
  {
    slug: 'project-manager',
    category: 'email-signatures',
    meta: {
      title: 'Email Signature for Project Managers | Siggly',
      description:
        'Create email signatures for project managers that showcase PMP or PRINCE2 certifications, current project info, and team collaboration links.',
      keywords: [
        'project manager email signature',
        'PMP email signature',
        'PRINCE2 email branding',
        'PM professional signature',
      ],
      canonical: '/email-signatures/project-manager',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Email Signatures', url: '/email-signatures' },
      {
        name: 'Email Signature for Project Managers',
        url: '/email-signatures/project-manager',
      },
    ],
    hero: {
      badge: { icon: 'target', text: 'Project Management' },
      title: 'Email Signatures That Keep Projects Moving',
      description:
        'Display your PMP, PgMP, or PRINCE2 certification alongside your current project details and collaboration links. Siggly keeps your stakeholder communications polished and consistent.',
      variant: 'light',
    },
    stats: [
      { value: '5,000+', label: 'PMs using Siggly' },
      { value: '85%', label: 'Faster onboarding' },
      { value: '20%', label: 'Fewer clarification emails' },
    ],
    features: [
      {
        icon: 'award',
        title: 'PMP & Certification Badges',
        description:
          'Display your PMP, PgMP, PRINCE2, CSM, or SAFe certification with the official PMI digital badge directly in your signature.',
      },
      {
        icon: 'folder-open',
        title: 'Project Context Block',
        description:
          'Add a dynamic block showing your current project name, role, and status dashboard link so stakeholders always know your context.',
      },
      {
        icon: 'link',
        title: 'Collaboration Tool Links',
        description:
          'Include quick links to your Jira board, Confluence space, or Microsoft Teams channel for easy stakeholder access.',
      },
    ],
    featuresTitle: 'Purpose-Built for PM Communication',
    sections: [
      {
        type: 'use-cases-grid',
        title: 'How Project Managers Use Siggly',
        cases: [
          {
            title: 'Stakeholder Updates',
            description:
              'Status update emails include a link to your project dashboard and your direct calendar for scheduling review meetings.',
          },
          {
            title: 'Vendor Communication',
            description:
              'Vendor emails carry your PMP credentials and project-specific contact details for clear accountability.',
          },
          {
            title: 'Team Onboarding',
            description:
              'New team members see your role, project scope, and collaboration tool links from their first email interaction.',
          },
          {
            title: 'Cross-Functional Coordination',
            description:
              'When emailing across departments, your signature provides context about your project and the best way to reach you.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Adding my Jira board link to my signature reduced the number of "where do I find..." emails by at least half. Stakeholders just click the link instead of asking me.',
      authorName: 'Derek Okonkwo, PMP',
      authorTitle: 'Senior Program Manager, Apex Consulting',
    },
    faqs: [
      {
        question: 'Can I show my PMP digital badge in my signature?',
        answer:
          'Yes. Upload your PMI digital badge image or link to your Credly badge and Siggly will display it alongside your name and credentials.',
      },
      {
        question: 'Can I include links to Jira or Confluence?',
        answer:
          'Absolutely. Add any URL to your signature — Jira boards, Confluence spaces, Notion workspaces, or Microsoft Planner. They render as clean, clickable links.',
      },
      {
        question: 'How do I update my signature when I switch projects?',
        answer:
          'Edit your project context block in Siggly and the change is live immediately. Some PMs update this monthly or per project phase.',
      },
      {
        question: 'Does Siggly work with Microsoft Teams email?',
        answer:
          'Siggly works with Microsoft 365, which powers Teams email. Your signature appears in emails sent from Outlook, Outlook on the web, and the Teams email integration.',
      },
    ],
    cta: {
      title: 'Try It Today',
      description:
        'Streamline stakeholder communication with a professional PM signature. Free to set up in minutes.',
    },
  },
  // ---------------------------------------------------------------------------
  // 14. Recruiter
  // ---------------------------------------------------------------------------
  {
    slug: 'recruiter',
    category: 'email-signatures',
    meta: {
      title: 'Email Signature for Recruiters | Siggly',
      description:
        'Create recruiter email signatures that showcase open roles, scheduling links, and agency branding. Improve candidate response rates with a polished professional signature.',
      keywords: [
        'recruiter email signature',
        'talent acquisition email branding',
        'recruiting agency signature',
        'headhunter email signature',
        'HR email signature',
      ],
      canonical: '/email-signatures/recruiter',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Email Signatures', url: '/email-signatures' },
      { name: 'Email Signature for Recruiters', url: '/email-signatures/recruiter' },
    ],
    hero: {
      badge: { icon: 'users', text: 'Talent Acquisition' },
      title: 'Get More Candidate Responses with a Better Signature',
      description:
        'Candidates judge your outreach in seconds. A professional email signature with your headshot, scheduling link, and open roles builds trust and increases response rates from passive candidates.',
      variant: 'emerald',
    },
    features: [
      {
        icon: 'user-plus',
        title: 'Open Role Showcase',
        description:
          'Feature your hottest open role or careers page link directly in your signature, turning every outreach email into a job marketing touchpoint.',
      },
      {
        icon: 'calendar',
        title: 'Interview Scheduling Link',
        description:
          'Embed your Calendly, GoodTime, or scheduling link so candidates can book interviews without the back-and-forth email dance.',
      },
      {
        icon: 'image',
        title: 'Professional Headshot',
        description:
          'Include your headshot in your signature to build personal connection with candidates — especially important for cold outreach on LinkedIn-sourced emails.',
      },
      {
        icon: 'bar-chart-3',
        title: 'Recruitment Metrics Banner',
        description:
          'Optionally display stats like "500+ placements" or "Top 10% agency" to establish credibility with both candidates and hiring managers.',
      },
    ],
    featuresTitle: 'Signatures That Help You Recruit Better',
    featuresDescription:
      'Every feature is designed to increase candidate engagement and streamline the hiring process.',
    sections: [
      {
        type: 'how-it-works',
        title: 'Set Up Your Recruiting Signature',
        steps: [
          {
            step: '1',
            title: 'Choose Your Layout',
            description:
              'Select a template optimized for recruiter outreach with space for headshot, title, and featured role.',
          },
          {
            step: '2',
            title: 'Add Your Details',
            description:
              'Enter your name, title, agency branding, scheduling link, and upload your professional headshot.',
          },
          {
            step: '3',
            title: 'Feature Open Roles',
            description:
              'Add a link to your most urgent open role or careers page. Update it as positions are filled and new ones open.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Can I feature an open role in my signature?',
        answer:
          'Yes. Add a featured role title and link to your signature. Update it whenever you have a new priority role to fill — changes are live instantly.',
      },
      {
        question: 'Does a headshot really improve response rates?',
        answer:
          'Recruiting data consistently shows that emails with a sender photo get higher open and response rates. A headshot makes your outreach feel personal rather than automated.',
      },
      {
        question: 'Can my whole recruiting team use Siggly?',
        answer:
          'Absolutely. Create a branded template for your agency or TA team and each recruiter gets their own personalized signature with consistent branding.',
      },
      {
        question: 'How do I add my Calendly link?',
        answer:
          'Paste your scheduling URL into the signature builder. Siggly renders it as a clickable button or text link — candidates can book time on your calendar in one click.',
      },
      {
        question: 'Can I track how many people click my signature links?',
        answer:
          'Siggly supports link tracking so you can measure clicks on your scheduling link, featured role, and social profiles to understand candidate engagement.',
      },
    ],
    cta: {
      title: 'Start Free',
      description:
        'Build a recruiter signature that gets responses. Takes two minutes to set up — no credit card needed.',
    },
  },
  // ---------------------------------------------------------------------------
  // 15. Social Worker
  // ---------------------------------------------------------------------------
  {
    slug: 'social-worker',
    category: 'email-signatures',
    meta: {
      title: 'Email Signature for Social Workers | Siggly',
      description:
        'Create professional email signatures for social workers. Display your LCSW, LMSW, or MSW credentials and agency information in every client and colleague email.',
      keywords: [
        'social worker email signature',
        'LCSW email signature',
        'MSW email branding',
        'clinical social worker signature',
      ],
      canonical: '/email-signatures/social-worker',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Email Signatures', url: '/email-signatures' },
      { name: 'Email Signature for Social Workers', url: '/email-signatures/social-worker' },
    ],
    hero: {
      badge: { icon: 'life-buoy', text: 'Social Work Professionals' },
      title: 'Professional Email Signatures for Social Workers',
      description:
        'Display your LCSW, LMSW, or MSW credentials alongside your agency affiliation and confidentiality notice. Siggly helps social workers present a polished, trustworthy professional identity.',
      variant: 'violet',
    },
    stats: [
      { value: '900+', label: 'Social workers' },
      { value: '100%', label: 'Confidentiality included' },
      { value: '4 min', label: 'Setup time' },
    ],
    features: [
      {
        icon: 'award',
        title: 'License & Credential Display',
        description:
          'Show your LCSW, LMSW, LSW, or ACSW credentials and license number. Display your state of licensure for multi-state practice transparency.',
      },
      {
        icon: 'shield',
        title: 'Confidentiality Notice',
        description:
          'Include a confidentiality and privileged communication disclaimer required for clinical social work correspondence with clients and third parties.',
      },
      {
        icon: 'phone',
        title: 'Crisis Resource Links',
        description:
          'Optionally include crisis hotline numbers or resource links in your signature for client-facing emails where immediate support access is critical.',
      },
    ],
    featuresTitle: 'Built for Social Work Communication',
    sections: [
      {
        type: 'checklist',
        title: 'Social Worker Email Signature Checklist',
        items: [
          'Full name with credentials (e.g., MSW, LCSW)',
          'License number and state of licensure',
          'Agency or practice name',
          'Role and department (if applicable)',
          'Confidentiality and privileged communication notice',
          'Direct phone number and office hours',
          'Crisis resource link or hotline number (optional)',
        ],
      },
    ],
    testimonial: {
      quote:
        'Having a consistent confidentiality notice in every email gives me peace of mind. I do not have to remember to add it manually — Siggly handles it automatically.',
      authorName: 'Monica Reeves, LCSW',
      authorTitle: 'Clinical Social Worker, Community Health Partners',
    },
    faqs: [
      {
        question: 'Can I include my LCSW license number?',
        answer:
          'Yes. Display your LCSW, LMSW, or other social work license number and state of licensure directly in your email signature.',
      },
      {
        question: 'Is the confidentiality disclaimer customizable?',
        answer:
          'Absolutely. Siggly provides a default confidentiality notice that you can modify to align with your agency policies, NASW ethical guidelines, and state requirements.',
      },
      {
        question: 'Can I add crisis hotline information to my signature?',
        answer:
          'Yes. You can include the 988 Suicide and Crisis Lifeline, local crisis numbers, or other resource links in a dedicated section of your signature.',
      },
      {
        question: 'Does Siggly work for agency teams?',
        answer:
          'Yes. Create a shared template for your agency and each social worker gets their personalized signature with individual credentials and the agency branding applied consistently.',
      },
    ],
    cta: {
      title: 'Get Started',
      description:
        'Create a credential-rich, compliant email signature for your social work practice. Free to begin.',
    },
  },
  // ---------------------------------------------------------------------------
  // 16. Software Developer
  // ---------------------------------------------------------------------------
  {
    slug: 'software-developer',
    category: 'email-signatures',
    meta: {
      title: 'Email Signature for Software Developers | Siggly',
      description:
        'Build developer email signatures with GitHub, portfolio, and tech stack links. Perfect for freelance devs, agency teams, and engineering departments.',
      keywords: [
        'software developer email signature',
        'developer email branding',
        'programmer email signature',
        'GitHub email signature',
        'tech email signature',
      ],
      canonical: '/email-signatures/software-developer',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Email Signatures', url: '/email-signatures' },
      {
        name: 'Email Signature for Software Developers',
        url: '/email-signatures/software-developer',
      },
    ],
    hero: {
      badge: { icon: 'code', text: 'Software Development' },
      title: 'Email Signatures for Developers Who Ship',
      description:
        'Link to your GitHub profile, portfolio, and tech blog from a signature that is clean, minimal, and worthy of someone who cares about code quality. Siggly makes it easy.',
      variant: 'dark',
    },
    features: [
      {
        icon: 'code',
        title: 'GitHub & GitLab Integration',
        description:
          'Display clickable links to your GitHub, GitLab, or Bitbucket profile so collaborators and hiring managers can see your open source contributions.',
      },
      {
        icon: 'laptop',
        title: 'Tech Stack Display',
        description:
          'Optionally list your primary tech stack or specialization (React, Python, Rust, etc.) so people know your expertise at a glance.',
      },
      {
        icon: 'globe',
        title: 'Portfolio & Blog Links',
        description:
          'Link to your dev portfolio, personal blog, or documentation site. Perfect for freelance developers marketing their services.',
      },
      {
        icon: 'layout',
        title: 'Minimal, Clean Design',
        description:
          'Choose from minimalist templates that match the aesthetic sensibility of developers — no gaudy graphics, just clean typography and smart hierarchy.',
      },
    ],
    featuresTitle: 'No Bloat, Just the Right Features',
    sections: [
      {
        type: 'use-cases-grid',
        title: 'Developer Email Signature Scenarios',
        cases: [
          {
            title: 'Freelance Developers',
            description:
              'Present your portfolio, GitHub, and availability status to prospective clients in every proposal and follow-up email.',
          },
          {
            title: 'Engineering Teams',
            description:
              'Standardize signatures across your engineering department with consistent company branding and individual GitHub links.',
          },
          {
            title: 'Open Source Contributors',
            description:
              'Link to your maintained projects, sponsor page, or contributor profile to grow your open source presence.',
          },
          {
            title: 'Developer Advocates',
            description:
              'Include links to your talks, blog posts, and community profiles to amplify your developer relations work.',
          },
        ],
      },
    ],
    cta: {
      title: 'Build Yours Now',
      description:
        'Create a clean developer signature with GitHub, portfolio, and tech stack links. Free — set up in two minutes.',
    },
  },
  // ---------------------------------------------------------------------------
  // 17. Teacher
  // ---------------------------------------------------------------------------
  {
    slug: 'teacher',
    category: 'email-signatures',
    meta: {
      title: 'Email Signature for Teachers | Siggly',
      description:
        'Create professional email signatures for teachers and educators. Include your school, subject, office hours, and parent communication links in every email.',
      keywords: [
        'teacher email signature',
        'educator email branding',
        'school teacher signature',
        'K-12 email signature',
      ],
      canonical: '/email-signatures/teacher',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Email Signatures', url: '/email-signatures' },
      { name: 'Email Signature for Teachers', url: '/email-signatures/teacher' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Education Professionals' },
      title: 'Need a Better Email Signature for Your Classroom?',
      description:
        'Include your school, subject, conference hours, and parent portal link in a clean, professional signature. Siggly helps K-12 and higher ed teachers communicate with authority.',
      variant: 'light',
    },
    stats: [
      { value: '10,000+', label: 'Teachers using Siggly' },
      { value: '60%', label: 'Fewer parent follow-ups' },
      { value: '2 min', label: 'Setup time' },
      { value: '500+', label: 'School districts' },
    ],
    features: [
      {
        icon: 'graduation-cap',
        title: 'School & Subject Line',
        description:
          'Display your school name, grade level, and subject area so parents and administrators always know exactly who they are corresponding with.',
      },
      {
        icon: 'clock',
        title: 'Conference & Office Hours',
        description:
          'Include your conference period, tutoring hours, or availability window directly in your signature to reduce scheduling emails from parents.',
      },
      {
        icon: 'link',
        title: 'Classroom Links',
        description:
          'Add links to Google Classroom, Canvas, Schoology, or your class website so parents and students can access resources from every email you send.',
      },
      {
        icon: 'phone',
        title: 'Preferred Contact Method',
        description:
          'Specify whether you prefer email, phone, or the school messaging system, setting clear expectations for parent communication.',
      },
      {
        icon: 'calendar',
        title: 'Conference Booking',
        description:
          'Embed a parent-teacher conference scheduling link so families can book time without the paper-form shuffle.',
      },
    ],
    featuresTitle: 'Signature Features Teachers Actually Need',
    sections: [
      {
        type: 'benefits',
        title: 'Why Teachers Switch to Siggly',
        items: [
          {
            icon: 'timer',
            title: 'Save Time on Repetitive Emails',
            description:
              'Stop copying and pasting your conference hours and classroom links. Your signature includes them automatically in every email.',
          },
          {
            icon: 'users',
            title: 'Professional Parent Communication',
            description:
              'A polished signature with your credentials and school branding reinforces your professionalism in every parent interaction.',
          },
          {
            icon: 'refresh-cw',
            title: 'Semester Updates Made Easy',
            description:
              'Update your conference hours, room number, or class links at the start of each semester and your signature is refreshed instantly.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Parents stopped emailing me asking for my conference hours because it was right there in my signature every single time. Such a simple fix for such a common annoyance.',
      authorName: 'Emily Tran',
      authorTitle: '7th Grade Science Teacher, Maple Grove Middle School',
    },
    faqs: [
      {
        question: 'Can I include my Google Classroom link?',
        answer:
          'Yes. Add your Google Classroom, Canvas, Schoology, or any LMS link to your signature. Parents and students can access your class resources from every email.',
      },
      {
        question: 'Can my whole school district use Siggly?',
        answer:
          'Absolutely. Siggly supports district-wide deployment with school-specific templates, administrator controls, and bulk provisioning for hundreds of teachers.',
      },
      {
        question: 'How do I show my conference hours?',
        answer:
          'Add your conference period or office hours as a custom field. It appears in your signature so parents always know when you are available.',
      },
    ],
    cta: {
      title: 'Try It Today',
      description:
        'Give your parent and student emails a professional touch. Free for individual teachers — district pricing available.',
    },
  },
  // ---------------------------------------------------------------------------
  // 18. Therapist
  // ---------------------------------------------------------------------------
  {
    slug: 'therapist',
    category: 'email-signatures',
    meta: {
      title: 'Email Signature for Therapists | Siggly',
      description:
        'Build confidential, professional email signatures for therapists. Display your LMFT, LPC, or PsyD credentials with HIPAA-compliant confidentiality notices in every email.',
      keywords: [
        'therapist email signature',
        'LMFT email signature',
        'LPC email branding',
        'counselor email signature',
        'psychologist email signature',
        'HIPAA therapist email',
      ],
      canonical: '/email-signatures/therapist',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Email Signatures', url: '/email-signatures' },
      { name: 'Email Signature for Therapists', url: '/email-signatures/therapist' },
    ],
    hero: {
      badge: { icon: 'heart', text: 'Mental Health Professionals' },
      title: 'Confidential, Credential-Rich Email Signatures for Therapists',
      description:
        'Display your LMFT, LPC, LCSW, or PsyD credentials alongside a HIPAA confidentiality notice and online scheduling link. Siggly is trusted by therapists in private practice and group settings.',
      variant: 'slate',
    },
    features: [
      {
        icon: 'shield-check',
        title: 'HIPAA Confidentiality Block',
        description:
          'Every email includes a customizable confidentiality notice reminding recipients that therapy-related communications are privileged and protected.',
      },
      {
        icon: 'award',
        title: 'License & Credential Display',
        description:
          'Show your LMFT, LPC, LCPC, LCSW, PsyD, or PhD credentials and state license number so clients and referral sources can verify your qualifications.',
      },
      {
        icon: 'calendar',
        title: 'Client Portal & Scheduling',
        description:
          'Include a link to your SimplePractice, TherapyNotes, or Jane App client portal so clients can book sessions and access intake forms.',
      },
      {
        icon: 'map',
        title: 'Telehealth Availability',
        description:
          'Indicate your telehealth availability and the states where you are licensed to practice virtually, which is increasingly important for cross-state clients.',
      },
    ],
    featuresTitle: 'Designed for Therapeutic Practice Communication',
    sections: [
      {
        type: 'how-it-works',
        title: 'Create Your Therapist Signature in Three Steps',
        steps: [
          {
            step: '1',
            title: 'Select a Template',
            description:
              'Choose a clean, calming template appropriate for therapeutic practice communication. Nothing flashy — just professional.',
          },
          {
            step: '2',
            title: 'Add Your Credentials',
            description:
              'Enter your license type, number, state, specialties, and upload your practice logo or headshot.',
          },
          {
            step: '3',
            title: 'Enable Confidentiality Notice',
            description:
              'Toggle on the HIPAA confidentiality block and customize the language to match your practice policies.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'I was writing my confidentiality notice manually at the bottom of every email for years. Siggly automates it and my signature finally looks as professional as my practice.',
      authorName: 'Dr. Nadia Osman, PsyD',
      authorTitle: 'Licensed Psychologist, Clearpath Counseling',
    },
    faqs: [
      {
        question: 'Can I include a HIPAA confidentiality notice?',
        answer:
          'Yes. Siggly provides a default confidentiality and privileged communication notice that you can customize. It is included automatically in every email you send.',
      },
      {
        question: 'Does Siggly integrate with SimplePractice or TherapyNotes?',
        answer:
          'You can link to your SimplePractice, TherapyNotes, or any client portal URL directly in your signature. Clients click through to book sessions or complete intake paperwork.',
      },
      {
        question: 'Can I indicate which states I am licensed in?',
        answer:
          'Yes. List your licensure states in your signature so prospective telehealth clients can quickly see whether you are authorized to practice in their state.',
      },
      {
        question: 'Is the design appropriate for a therapy practice?',
        answer:
          'Siggly offers calm, minimal templates that are well-suited for therapeutic practice. No aggressive colors or flashy elements — just clean, trustworthy design.',
      },
      {
        question: 'Can group practices use Siggly?',
        answer:
          'Absolutely. Create a shared template for your group practice and each clinician gets their own personalized signature with individual credentials and the practice branding.',
      },
    ],
    cta: {
      title: 'See It in Action',
      description:
        'Build a professional, HIPAA-conscious email signature for your therapy practice. Free to get started.',
    },
  },
  // ---------------------------------------------------------------------------
  // 19. Veterinarian
  // ---------------------------------------------------------------------------
  {
    slug: 'veterinarian',
    category: 'email-signatures',
    meta: {
      title: 'Email Signature for Veterinarians | Siggly',
      description:
        'Create email signatures for veterinarians that display your DVM credentials, AVMA membership, and online appointment booking. Professional branding for every practice.',
      keywords: [
        'veterinarian email signature',
        'DVM email signature',
        'vet clinic email branding',
        'AVMA member signature',
      ],
      canonical: '/email-signatures/veterinarian',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Email Signatures', url: '/email-signatures' },
      { name: 'Email Signature for Veterinarians', url: '/email-signatures/veterinarian' },
    ],
    hero: {
      badge: { icon: 'heart', text: 'Veterinary Professionals' },
      title: 'Professional Email Signatures for Veterinarians & Vet Clinics',
      description:
        'Display your DVM or VMD degree, AVMA membership, specialty board certifications, and appointment booking link in every email. Siggly helps veterinary practices communicate with care and professionalism.',
      variant: 'indigo',
    },
    stats: [
      { value: '600+', label: 'Vet practices' },
      { value: '35%', label: 'More online bookings' },
      { value: '5 min', label: 'Setup time' },
    ],
    features: [
      {
        icon: 'user-check',
        title: 'DVM Credential Display',
        description:
          'Show your DVM or VMD degree, state veterinary license, and any ABVS board certifications directly in your email signature.',
      },
      {
        icon: 'calendar',
        title: 'Appointment Booking Button',
        description:
          'Add a "Book Appointment" button linked to your online scheduling system so pet owners can schedule visits right from your email.',
      },
      {
        icon: 'building-2',
        title: 'Multi-Location Practice Support',
        description:
          'Manage signatures across multiple clinic locations with location-specific hours, phone numbers, and emergency contact information.',
      },
      {
        icon: 'phone',
        title: 'Emergency After-Hours Contact',
        description:
          'Include your after-hours emergency number or local emergency vet referral so pet owners always know where to turn in urgent situations.',
      },
    ],
    featuresTitle: 'Features for Every Veterinary Practice',
    sections: [
      {
        type: 'checklist',
        title: 'Veterinary Email Signature Must-Haves',
        items: [
          'DVM or VMD degree and full name',
          'State veterinary license number',
          'AVMA membership badge',
          'Board certification (DACVS, DACVIM, etc.) if applicable',
          'Clinic name, address, and phone number',
          'Online appointment scheduling link',
          'After-hours emergency contact information',
        ],
      },
      {
        type: 'prose',
        title: 'Why Your Veterinary Email Signature Matters',
        paragraphs: [
          'Pet owners choose veterinarians they trust. Your email signature is often the first or last thing a client reads in your correspondence — it reinforces your credentials, makes booking easy, and provides emergency contact information that could be critical.',
          'For multi-veterinarian practices, consistent branded signatures ensure that every DVM, technician, and receptionist represents the practice professionally. Siggly makes this effortless to manage as your team grows.',
        ],
      },
    ],
    cta: {
      title: 'Start Free',
      description:
        'Build a professional email signature for your veterinary practice. Get set up in minutes — no cost to start.',
    },
  },
  // ---------------------------------------------------------------------------
  // 20. Virtual Assistant
  // ---------------------------------------------------------------------------
  {
    slug: 'virtual-assistant',
    category: 'email-signatures',
    meta: {
      title: 'Email Signature for Virtual Assistants | Siggly',
      description:
        'Create a professional email signature as a virtual assistant. Showcase your services, scheduling link, and client testimonials to win more retainer contracts.',
      keywords: [
        'virtual assistant email signature',
        'VA email branding',
        'remote assistant email signature',
        'freelance VA signature',
      ],
      canonical: '/email-signatures/virtual-assistant',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Email Signatures', url: '/email-signatures' },
      {
        name: 'Email Signature for Virtual Assistants',
        url: '/email-signatures/virtual-assistant',
      },
    ],
    hero: {
      badge: { icon: 'laptop', text: 'Virtual Assistants' },
      title: 'Look Professional in Every Client Email',
      description:
        'As a virtual assistant, your email is your office. Siggly helps you present a polished, branded signature that lists your services, timezone, and booking link — building client confidence with every message.',
      variant: 'light',
    },
    features: [
      {
        icon: 'briefcase',
        title: 'Services Overview',
        description:
          'List your core services — inbox management, calendar coordination, social media, bookkeeping — so prospective clients can see your capabilities immediately.',
      },
      {
        icon: 'globe',
        title: 'Timezone & Availability',
        description:
          'Display your working timezone and hours so clients across different regions know when to expect responses from you.',
      },
      {
        icon: 'calendar',
        title: 'Discovery Call Booking',
        description:
          'Embed a scheduling link for free discovery calls so potential clients can book a consultation directly from your email.',
      },
      {
        icon: 'star',
        title: 'Client Testimonial Snippet',
        description:
          'Feature a short client testimonial in your signature to build social proof and trust with prospective retainer clients.',
      },
      {
        icon: 'link',
        title: 'Portfolio & Rate Card',
        description:
          'Link to your portfolio website or rate card so prospects can evaluate your services and pricing without a separate conversation.',
      },
    ],
    featuresTitle: 'Everything VAs Need in a Signature',
    sections: [
      {
        type: 'benefits',
        title: 'Why Virtual Assistants Love Siggly',
        items: [
          {
            icon: 'thumbs-up',
            title: 'Instant Credibility',
            description:
              'A professional email signature signals that you run a real business, not just a side gig. Clients take VAs with polished branding more seriously.',
          },
          {
            icon: 'target',
            title: 'Lead Generation',
            description:
              'Every email you send to a prospect, collaborator, or referral partner markets your services through your signature.',
          },
          {
            icon: 'zap',
            title: 'Quick to Update',
            description:
              'Added a new service? Changed your hours? Update your signature in seconds and it is live everywhere immediately.',
          },
          {
            icon: 'smartphone',
            title: 'Mobile-Friendly',
            description:
              'Your signature looks great on phones and tablets — important for VAs whose clients read emails on the go.',
          },
        ],
      },
      {
        type: 'use-cases-grid',
        title: 'VA Email Signature Scenarios',
        cases: [
          {
            title: 'Client Onboarding',
            description:
              'New client emails include your services list, working hours, and a link to your project management tool.',
          },
          {
            title: 'Prospecting Outreach',
            description:
              'Cold outreach emails carry your testimonial snippet, portfolio link, and discovery call booking button.',
          },
          {
            title: 'Subcontractor Communication',
            description:
              'When coordinating with other VAs or freelancers, your signature establishes your role and business identity.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'I added a discovery call link to my Siggly signature and booked three new retainer clients in the first month just from email conversations I was already having.',
      authorName: 'Priya Nair',
      authorTitle: 'Founder, Priya Nair Virtual Services',
    },
    cta: {
      title: 'Get Started',
      description:
        'Create a virtual assistant email signature that wins clients and looks professional. Free to set up.',
    },
  },
];
