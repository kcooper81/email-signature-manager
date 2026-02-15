import type { SEOLandingPageData } from '../types';

export const templatesPages: SEOLandingPageData[] = [
  // ─── 1. Corporate ────────────────────────────────────────────────────
  {
    slug: 'corporate',
    category: 'templates',
    meta: {
      title: 'Corporate Email Signature Template | Siggly',
      description:
        'Create polished corporate email signatures that reinforce your brand identity. Professional layouts with logo, title, and contact details.',
      keywords: [
        'corporate email signature',
        'business email template',
        'professional signature',
        'brand identity signature',
      ],
      canonical: '/email-signature-templates/corporate',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Templates', url: '/email-signature-templates' },
      { name: 'Corporate', url: '/email-signature-templates/corporate' },
    ],
    hero: {
      badge: { icon: 'building', text: 'Template' },
      title: 'Corporate Email Signature Template',
      description:
        'Present a unified, authoritative image with every email your team sends. The corporate template features structured layouts designed for enterprise branding, complete with logo placement, department details, and social links.',
      variant: 'dark',
    },
    features: [
      {
        icon: 'building',
        title: 'Enterprise-Ready Layout',
        description:
          'Structured design that accommodates company logos, department names, and hierarchical titles for a polished corporate presence.',
      },
      {
        icon: 'palette',
        title: 'Brand Color Integration',
        description:
          'Apply your exact brand colors, fonts, and guidelines so every signature aligns with your corporate identity system.',
      },
      {
        icon: 'shield',
        title: 'Legal Disclaimer Support',
        description:
          'Add confidentiality notices and legal disclaimers beneath your signature to meet compliance requirements.',
      },
      {
        icon: 'users',
        title: 'Team-Wide Deployment',
        description:
          'Roll out consistent signatures across departments in minutes with centralized template management.',
      },
      {
        icon: 'globe',
        title: 'Multi-Language Ready',
        description:
          'Support international teams with signature templates that handle multiple languages and character sets.',
      },
    ],
    featuresTitle: 'Features of the Corporate Template',
    sections: [
      {
        type: 'checklist',
        title: "What's Included",
        items: [
          'Company logo placement with precise sizing',
          'Full name, job title, and department fields',
          'Phone, email, and website contact links',
          'Social media icon row',
          'Optional legal disclaimer block',
          'Brand color customization controls',
        ],
      },
      {
        type: 'use-cases-grid',
        title: 'Who This Template Is For',
        cases: [
          {
            title: 'Large Enterprises',
            description:
              'Maintain brand consistency across thousands of employees with a standardized corporate signature.',
          },
          {
            title: 'HR & People Teams',
            description:
              'Onboard new hires with professional signatures from day one without manual design work.',
          },
          {
            title: 'C-Suite Executives',
            description:
              'Project authority and credibility in every executive communication with a refined layout.',
          },
          {
            title: 'Legal & Compliance Teams',
            description:
              'Ensure every outgoing email includes required disclaimers and regulatory notices.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'We deployed the corporate template to over 500 employees in under an hour. The brand consistency across our global offices has been remarkable.',
      authorName: 'Sarah Mitchell',
      authorTitle: 'Brand Director at Meridian Corp',
    },
    faqs: [
      {
        question: 'Can I add our company logo to this template?',
        answer:
          'Yes. The corporate template includes a dedicated logo area that supports PNG, JPG, and SVG formats with adjustable sizing to fit your brand guidelines.',
      },
      {
        question: 'How do I apply our exact brand colors?',
        answer:
          'You can enter your hex color codes directly into the template editor. The colors will apply to text, dividers, and icon accents throughout the signature.',
      },
      {
        question: 'Can different departments have different signatures?',
        answer:
          'Absolutely. You can create department-specific variations of the corporate template while keeping the overall layout and branding consistent.',
      },
      {
        question: 'Does this template work with Outlook and Gmail?',
        answer:
          'Yes. All Siggly templates are tested across major email clients including Outlook, Gmail, Apple Mail, and Thunderbird to ensure consistent rendering.',
      },
      {
        question: 'Can I include a legal disclaimer?',
        answer:
          'Yes. The corporate template has a built-in disclaimer section where you can add confidentiality notices, regulatory text, or any other legal language your organization requires.',
      },
    ],
    cta: {
      title: 'Start with the Corporate Template',
      description:
        'Build a professional corporate email signature that reinforces your brand with every message you send.',
    },
  },

  // ─── 2. Minimalist ───────────────────────────────────────────────────
  {
    slug: 'minimalist',
    category: 'templates',
    meta: {
      title: 'Minimalist Email Signature Template | Siggly',
      description:
        'Design clean, clutter-free email signatures with the minimalist template. Simple elegance that keeps the focus on your message.',
      keywords: [
        'minimalist email signature',
        'clean signature template',
        'simple email signature',
        'elegant signature design',
      ],
      canonical: '/email-signature-templates/minimalist',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Templates', url: '/email-signature-templates' },
      { name: 'Minimalist', url: '/email-signature-templates/minimalist' },
    ],
    hero: {
      badge: { icon: 'layout', text: 'Template' },
      title: 'Minimalist Email Signature Template',
      description:
        'Less is more. The minimalist template strips away visual noise to deliver a signature that is clean, elegant, and effortlessly professional. Perfect for those who value simplicity and clarity.',
      variant: 'light',
    },
    features: [
      {
        icon: 'layout',
        title: 'Clean Typography',
        description:
          'Carefully chosen font sizes and spacing ensure readability without overwhelming the recipient with visual clutter.',
      },
      {
        icon: 'eye',
        title: 'Whitespace-First Design',
        description:
          'Strategic use of whitespace keeps the signature compact and easy to scan at a glance.',
      },
      {
        icon: 'pen-tool',
        title: 'Subtle Dividers',
        description:
          'Thin, understated dividers separate sections without adding unnecessary visual weight to the layout.',
      },
      {
        icon: 'smartphone',
        title: 'Mobile Optimized',
        description:
          'The lightweight design loads quickly and displays perfectly on mobile devices and small screens.',
      },
    ],
    featuresTitle: 'Features of the Minimalist Template',
    sections: [
      {
        type: 'checklist',
        title: "What's Included",
        items: [
          'Name and title in clean typography',
          'Essential contact details only',
          'Optional single-color accent line',
          'Compact social media links',
          'Responsive mobile-friendly layout',
        ],
      },
      {
        type: 'use-cases-grid',
        title: 'Who This Template Is For',
        cases: [
          {
            title: 'Designers & Creatives',
            description:
              'Let your work speak for itself with a signature that reflects design sensibility and restraint.',
          },
          {
            title: 'Academics & Researchers',
            description:
              'Present credentials and contact information without distracting from scholarly communication.',
          },
          {
            title: 'Tech Professionals',
            description:
              'Match the clean aesthetic of the tech industry with a signature that feels modern and efficient.',
          },
          {
            title: 'Personal Branding',
            description:
              'Create a refined personal identity that communicates professionalism through simplicity.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'The minimalist template is exactly what I needed. It looks sharp, loads instantly, and never gets mangled by different email clients.',
      authorName: 'David Chen',
      authorTitle: 'UX Designer at Canopy Studio',
    },
    faqs: [
      {
        question: 'Can I add a logo to the minimalist template?',
        answer:
          'Yes, though the design works best with a small, compact logo or icon to maintain the clean aesthetic. You can optionally leave the logo out entirely.',
      },
      {
        question: 'How many contact fields should I include?',
        answer:
          'For the best minimalist look, we recommend including only essential contacts: email, phone, and one website link. The template supports more fields if you need them.',
      },
      {
        question: 'Can I change the accent color?',
        answer:
          'Yes. The minimalist template features a single accent color for dividers and subtle highlights. You can set this to any color that matches your brand.',
      },
      {
        question: 'Will this look good without social media icons?',
        answer:
          'Absolutely. The minimalist template is designed to look complete with or without social media links, so you can include only what you need.',
      },
    ],
    cta: {
      title: 'Start with the Minimalist Template',
      description:
        'Create a clean, elegant email signature that communicates professionalism through simplicity.',
    },
  },

  // ─── 3. Creative ─────────────────────────────────────────────────────
  {
    slug: 'creative',
    category: 'templates',
    meta: {
      title: 'Creative Email Signature Template | Siggly',
      description:
        'Stand out with a bold, creative email signature template. Vibrant colors, unique layouts, and eye-catching design for creative pros.',
      keywords: [
        'creative email signature',
        'designer signature template',
        'artistic email signature',
        'bold signature design',
        'colorful email template',
      ],
      canonical: '/email-signature-templates/creative',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Templates', url: '/email-signature-templates' },
      { name: 'Creative', url: '/email-signature-templates/creative' },
    ],
    hero: {
      badge: { icon: 'sparkles', text: 'Template' },
      title: 'Creative Email Signature Template',
      description:
        'Make every email a statement. The creative template offers bold color palettes, dynamic layouts, and room for visual flair that showcases your personality and artistic vision.',
      variant: 'violet',
    },
    features: [
      {
        icon: 'palette',
        title: 'Vibrant Color Palettes',
        description:
          'Choose from bold, eye-catching color combinations or create your own palette to match your creative brand.',
      },
      {
        icon: 'image',
        title: 'Portfolio-Ready Design',
        description:
          'Include a headshot, portfolio link, or banner image to give recipients a visual taste of your creative work.',
      },
      {
        icon: 'sparkles',
        title: 'Unique Layout Options',
        description:
          'Go beyond traditional stacked layouts with side-by-side, asymmetric, and card-style arrangements.',
      },
      {
        icon: 'pen-tool',
        title: 'Custom Typography',
        description:
          'Pick from a curated set of web-safe fonts that add character without sacrificing email client compatibility.',
      },
      {
        icon: 'wand-2',
        title: 'Animated CTA Banner',
        description:
          'Add a subtle call-to-action banner that draws attention to your latest project or portfolio piece.',
      },
    ],
    featuresTitle: 'Features of the Creative Template',
    sections: [
      {
        type: 'checklist',
        title: "What's Included",
        items: [
          'Bold header with customizable background color',
          'Headshot or avatar with rounded frame',
          'Portfolio or website link with preview',
          'Social media icons in matching colors',
          'Optional promotional banner area',
          'Custom font and color controls',
        ],
      },
      {
        type: 'use-cases-grid',
        title: 'Who This Template Is For',
        cases: [
          {
            title: 'Graphic Designers',
            description:
              'Showcase your design eye with a signature that doubles as a mini portfolio piece.',
          },
          {
            title: 'Photographers',
            description:
              'Feature your best shot as a banner image and link directly to your portfolio.',
          },
          {
            title: 'Content Creators',
            description:
              'Build your personal brand with a memorable, shareable email signature.',
          },
          {
            title: 'Agency Professionals',
            description:
              'Reflect your agency creative culture while keeping essential contact info accessible.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'My clients always comment on how great my email signature looks. It sets the tone before they even see my work.',
      authorName: 'Mia Torres',
      authorTitle: 'Freelance Graphic Designer',
    },
    faqs: [
      {
        question: 'Will the creative design render correctly in all email clients?',
        answer:
          'Yes. While the template uses bold visuals, all elements are built with email-safe HTML and CSS to ensure compatibility across Outlook, Gmail, Apple Mail, and others.',
      },
      {
        question: 'Can I include a link to my portfolio?',
        answer:
          'Absolutely. The creative template has a dedicated area for a clickable portfolio or website link with an optional image preview.',
      },
      {
        question: 'Can I upload a custom banner image?',
        answer:
          'Yes. You can upload a banner image that appears at the top or bottom of your signature to promote your latest project or showcase your work.',
      },
      {
        question: 'How do I keep the file size reasonable with images?',
        answer:
          'Siggly automatically optimizes uploaded images for email, compressing them to reduce load times while preserving visual quality.',
      },
    ],
    cta: {
      title: 'Start with the Creative Template',
      description:
        'Build an email signature that is as bold and original as the work you create.',
    },
  },

  // ─── 4. Modern ────────────────────────────────────────────────────────
  {
    slug: 'modern',
    category: 'templates',
    meta: {
      title: 'Modern Email Signature Template | Siggly',
      description:
        'Build a sleek, contemporary email signature with the modern template. Flat design, clean lines, and smart use of color accents.',
      keywords: [
        'modern email signature',
        'contemporary signature template',
        'sleek email design',
        'flat design signature',
        'modern business signature',
      ],
      canonical: '/email-signature-templates/modern',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Templates', url: '/email-signature-templates' },
      { name: 'Modern', url: '/email-signature-templates/modern' },
    ],
    hero: {
      badge: { icon: 'zap', text: 'Template' },
      title: 'Modern Email Signature Template',
      description:
        'Stay current with a signature that reflects today\'s design standards. The modern template combines flat aesthetics, smart color accents, and balanced typography for a fresh, professional look.',
      variant: 'emerald',
    },
    features: [
      {
        icon: 'layout',
        title: 'Flat Design Aesthetic',
        description:
          'Clean lines and flat UI elements create a contemporary look that feels current without chasing short-lived trends.',
      },
      {
        icon: 'zap',
        title: 'Smart Color Accents',
        description:
          'A single accent color adds visual interest without overwhelming the design, keeping things polished and professional.',
      },
      {
        icon: 'monitor',
        title: 'Responsive Grid Layout',
        description:
          'Information is organized in a logical grid that adapts beautifully from desktop monitors to mobile screens.',
      },
      {
        icon: 'layers',
        title: 'Modular Sections',
        description:
          'Toggle sections on or off to build exactly the signature you need, from compact to comprehensive.',
      },
    ],
    featuresTitle: 'Features of the Modern Template',
    sections: [
      {
        type: 'checklist',
        title: "What's Included",
        items: [
          'Contemporary flat-design layout',
          'Accent color sidebar or top bar',
          'Circular headshot frame',
          'Icon-enhanced contact details',
          'Social media icon strip',
          'One-click CTA button option',
        ],
      },
      {
        type: 'use-cases-grid',
        title: 'Who This Template Is For',
        cases: [
          {
            title: 'Startups & Scale-Ups',
            description:
              'Project a forward-thinking image that appeals to investors, partners, and early adopters.',
          },
          {
            title: 'Product Managers',
            description:
              'Communicate credibility and modernity to stakeholders with a signature that matches your product thinking.',
          },
          {
            title: 'SaaS Companies',
            description:
              'Align your email presence with the sleek interfaces your customers already expect.',
          },
          {
            title: 'Marketing Teams',
            description:
              'Ensure outbound communications look as polished as your campaigns and landing pages.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'The modern template nailed the look we wanted: clean, current, and professional. It took five minutes to set up for our whole team.',
      authorName: 'James Okonkwo',
      authorTitle: 'Co-Founder at Layerstack',
    },
    faqs: [
      {
        question: 'What makes this template "modern"?',
        answer:
          'The modern template uses flat design principles, generous spacing, icon-based contact details, and a single accent color for a clean, contemporary aesthetic.',
      },
      {
        question: 'Can I use a gradient accent instead of a solid color?',
        answer:
          'The template is optimized for solid accent colors to ensure maximum email client compatibility. Gradients can be unreliable in some clients like Outlook.',
      },
      {
        question: 'Does it support a call-to-action button?',
        answer:
          'Yes. You can add a single CTA button below your contact details to drive traffic to a landing page, booking link, or latest content.',
      },
      {
        question: 'Can I add a headshot photo?',
        answer:
          'Yes. The modern template supports a circular headshot placed beside your name and title. You can upload any square image and it will be cropped automatically.',
      },
    ],
    cta: {
      title: 'Start with the Modern Template',
      description:
        'Create a sleek, contemporary email signature that keeps your professional image fresh and current.',
    },
  },

  // ─── 5. Professional ─────────────────────────────────────────────────
  {
    slug: 'professional',
    category: 'templates',
    meta: {
      title: 'Professional Email Signature Template | Siggly',
      description:
        'Create a professional email signature with structured layout, clear contact info, and polished design. Trusted by thousands.',
      keywords: [
        'professional email signature',
        'business signature template',
        'email signature generator',
        'professional signature design',
      ],
      canonical: '/email-signature-templates/professional',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Templates', url: '/email-signature-templates' },
      {
        name: 'Professional',
        url: '/email-signature-templates/professional',
      },
    ],
    hero: {
      badge: { icon: 'award', text: 'Template' },
      title: 'Professional Email Signature Template',
      description:
        'The gold standard for business email signatures. The professional template balances structure and style to deliver a signature that looks great, communicates clearly, and works everywhere.',
      variant: 'indigo',
    },
    features: [
      {
        icon: 'award',
        title: 'Time-Tested Design',
        description:
          'A proven layout that has been refined through thousands of real-world deployments across every industry.',
      },
      {
        icon: 'check-circle',
        title: 'Complete Contact Block',
        description:
          'Display your name, title, company, phone, email, website, and address in a well-organized format.',
      },
      {
        icon: 'settings',
        title: 'Fully Customizable',
        description:
          'Adjust colors, fonts, spacing, and field visibility to match your personal or company brand guidelines.',
      },
      {
        icon: 'mail',
        title: 'Universal Compatibility',
        description:
          'Rigorously tested in Outlook, Gmail, Apple Mail, Yahoo, and dozens of other email clients.',
      },
      {
        icon: 'target',
        title: 'Click-Tracking Ready',
        description:
          'Track engagement on links and social icons to understand how recipients interact with your signature.',
      },
    ],
    featuresTitle: 'Features of the Professional Template',
    sections: [
      {
        type: 'checklist',
        title: "What's Included",
        items: [
          'Full name, job title, and company name',
          'Phone, email, and website fields',
          'Company logo with adjustable placement',
          'Social media icon row',
          'Optional promotional banner',
          'Custom color and font controls',
        ],
      },
      {
        type: 'use-cases-grid',
        title: 'Who This Template Is For',
        cases: [
          {
            title: 'Business Professionals',
            description:
              'The go-to signature for anyone who needs to look polished and credible in professional correspondence.',
          },
          {
            title: 'Small Business Owners',
            description:
              'Present your company professionally without needing a designer or IT support.',
          },
          {
            title: 'Managers & Team Leads',
            description:
              'Set the standard for your team with a consistent, professional email signature.',
          },
          {
            title: 'Client-Facing Roles',
            description:
              'Make a strong first impression with clients and partners through every email interaction.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'I tried several signature generators before finding Siggly. The professional template looks clean in every email client and took just minutes to customize.',
      authorName: 'Rachel Goldberg',
      authorTitle: 'Operations Manager at Fieldstone Group',
    },
    faqs: [
      {
        question: 'Is this template suitable for any industry?',
        answer:
          'Yes. The professional template uses a versatile, industry-neutral design that works for finance, healthcare, technology, legal, education, and any other sector.',
      },
      {
        question: 'Can I add a promotional banner?',
        answer:
          'Yes. You can include an optional banner at the bottom of your signature to promote events, certifications, awards, or seasonal campaigns.',
      },
      {
        question: 'How do I ensure consistent signatures across my team?',
        answer:
          'Siggly lets you create a master template that team members can adopt with their own details while keeping the design, colors, and layout locked in.',
      },
      {
        question: 'Does it support international phone number formats?',
        answer:
          'Yes. Phone fields accept any international format and automatically create clickable tel: links on mobile devices.',
      },
    ],
    cta: {
      title: 'Start with the Professional Template',
      description:
        'Build a polished, versatile email signature that works for every professional context and every email client.',
    },
  },

  // ─── 6. Startup ──────────────────────────────────────────────────────
  {
    slug: 'startup',
    category: 'templates',
    meta: {
      title: 'Startup Email Signature Template | Siggly',
      description:
        'Energize your startup communications with a bold, dynamic email signature template. Modern design for fast-moving teams.',
      keywords: [
        'startup email signature',
        'startup signature template',
        'tech startup email',
        'modern startup branding',
        'team email signature',
      ],
      canonical: '/email-signature-templates/startup',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Templates', url: '/email-signature-templates' },
      { name: 'Startup', url: '/email-signature-templates/startup' },
    ],
    hero: {
      badge: { icon: 'rocket', text: 'Template' },
      title: 'Startup Email Signature Template',
      description:
        'Move fast and look great doing it. The startup template is built for growing teams that need a professional, energetic email presence without slowing down to fuss over design details.',
      variant: 'slate',
    },
    features: [
      {
        icon: 'rocket',
        title: 'Launch-Ready Design',
        description:
          'A bold, energetic layout that communicates ambition and momentum from the very first email.',
      },
      {
        icon: 'trending-up',
        title: 'Growth-Focused CTA',
        description:
          'Built-in call-to-action area perfect for driving demo bookings, product signups, or investor decks.',
      },
      {
        icon: 'users',
        title: 'Easy Team Scaling',
        description:
          'Add new team members in seconds with a template that auto-fills personal details while preserving brand consistency.',
      },
      {
        icon: 'zap',
        title: 'Quick Setup',
        description:
          'Go from zero to deployed in under five minutes. No design skills or developer time required.',
      },
    ],
    featuresTitle: 'Features of the Startup Template',
    sections: [
      {
        type: 'checklist',
        title: "What's Included",
        items: [
          'Startup logo with flexible placement',
          'Name, role, and team designation',
          'Direct contact links with icons',
          'Social media and product links',
          'Promotional CTA banner area',
          'Quick-deploy team management',
        ],
      },
      {
        type: 'use-cases-grid',
        title: 'Who This Template Is For',
        cases: [
          {
            title: 'Seed & Series A Startups',
            description:
              'Look established and credible when reaching out to investors, partners, and first customers.',
          },
          {
            title: 'Founders & Co-Founders',
            description:
              'Put your best foot forward in fundraising and business development emails.',
          },
          {
            title: 'Developer Relations',
            description:
              'Share product links, documentation, and community channels directly from your signature.',
          },
          {
            title: 'Growth Teams',
            description:
              'Turn every outbound email into a growth channel with built-in call-to-action links.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'We went from no signatures to a fully branded team rollout in about ten minutes. The startup template nailed our vibe perfectly.',
      authorName: 'Alex Rivera',
      authorTitle: 'CEO at LaunchPad AI',
    },
    faqs: [
      {
        question: 'Is this template free for early-stage startups?',
        answer:
          'Siggly offers a generous free tier that includes the startup template with full features. As your team grows past 5 users, you can upgrade to Professional for full analytics and unlimited templates.',
      },
      {
        question: 'Can I add a link to our product or demo?',
        answer:
          'Yes. The startup template includes a dedicated CTA area where you can link to your product, a demo booking page, or your latest launch.',
      },
      {
        question: 'How quickly can I onboard new team members?',
        answer:
          'New members can adopt the team template in under a minute. They simply enter their personal details and the signature is generated with your brand design intact.',
      },
      {
        question: 'Can I change the template as our brand evolves?',
        answer:
          'Absolutely. You can update colors, logos, and layout at any time. Changes can be pushed to all team members at once.',
      },
    ],
    cta: {
      title: 'Start with the Startup Template',
      description:
        'Launch a professional email presence for your entire team in minutes, not days.',
    },
  },

  // ─── 7. Executive ────────────────────────────────────────────────────
  {
    slug: 'executive',
    category: 'templates',
    meta: {
      title: 'Executive Email Signature Template | Siggly',
      description:
        'Command respect with an executive email signature template. Refined design for C-suite leaders, VPs, and senior management.',
      keywords: [
        'executive email signature',
        'C-suite signature template',
        'leadership email design',
        'senior management signature',
      ],
      canonical: '/email-signature-templates/executive',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Templates', url: '/email-signature-templates' },
      { name: 'Executive', url: '/email-signature-templates/executive' },
    ],
    hero: {
      badge: { icon: 'award', text: 'Template' },
      title: 'Executive Email Signature Template',
      description:
        'Communicate authority and sophistication in every message. The executive template features refined typography, muted color palettes, and a distinguished layout befitting senior leadership.',
      variant: 'dark',
    },
    features: [
      {
        icon: 'award',
        title: 'Distinguished Styling',
        description:
          'Premium typography and refined spacing convey seniority and gravitas without being ostentatious.',
      },
      {
        icon: 'briefcase',
        title: 'Title Hierarchy Support',
        description:
          'Display complex titles, board memberships, and multiple organizational roles in a clear, elegant format.',
      },
      {
        icon: 'phone',
        title: 'Direct Contact Priority',
        description:
          'Highlight your executive assistant, direct line, or preferred contact method prominently.',
      },
      {
        icon: 'shield',
        title: 'Confidentiality Notices',
        description:
          'Include executive-level confidentiality disclaimers and privilege notices beneath your signature.',
      },
    ],
    featuresTitle: 'Features of the Executive Template',
    sections: [
      {
        type: 'checklist',
        title: "What's Included",
        items: [
          'Premium serif and sans-serif font options',
          'Multi-line title and role display',
          'Executive headshot with refined framing',
          'Priority contact details section',
          'Minimalist social presence links',
          'Confidentiality disclaimer area',
        ],
      },
      {
        type: 'use-cases-grid',
        title: 'Who This Template Is For',
        cases: [
          {
            title: 'CEOs & Managing Directors',
            description:
              'Present the highest level of professionalism in board communications, investor relations, and partner outreach.',
          },
          {
            title: 'Vice Presidents & SVPs',
            description:
              'Reflect your seniority with a signature that differentiates leadership from the broader team.',
          },
          {
            title: 'Board Members',
            description:
              'Include board affiliations and advisory roles in an organized, distinguished format.',
          },
          {
            title: 'Executive Assistants',
            description:
              'Set up polished signatures for executives quickly with role-appropriate styling and contact details.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'The executive template captures exactly the right tone: authoritative but approachable. My board and investor emails have never looked better.',
      authorName: 'Patricia Langford',
      authorTitle: 'CFO at Harrington Financial',
    },
    faqs: [
      {
        question: 'Can I list multiple titles or board positions?',
        answer:
          'Yes. The executive template supports multi-line title displays so you can list your primary role, board memberships, and advisory positions clearly.',
      },
      {
        question: 'Is a headshot recommended for executive signatures?',
        answer:
          'A professional headshot adds a personal touch and helps build trust. The template supports high-quality photos with refined framing options.',
      },
      {
        question: 'Can I include my executive assistant contact info?',
        answer:
          'Yes. The template has a secondary contact area where you can list your assistant name, phone, and email for scheduling inquiries.',
      },
      {
        question: 'How does this differ from the corporate template?',
        answer:
          'The executive template uses more refined typography, supports complex title hierarchies, and has a more distinguished, premium feel suited to senior leadership communications.',
      },
    ],
    cta: {
      title: 'Start with the Executive Template',
      description:
        'Craft an email signature that reflects your leadership position with authority and sophistication.',
    },
  },

  // ─── 8. Sales Representative ─────────────────────────────────────────
  {
    slug: 'sales-representative',
    category: 'templates',
    meta: {
      title: 'Sales Representative Email Signature Template | Siggly',
      description:
        'Close more deals with a sales-focused email signature template. Built-in CTAs, booking links, and social proof elements.',
      keywords: [
        'sales email signature',
        'sales rep signature template',
        'outbound sales email',
        'sales CTA signature',
        'booking link signature',
      ],
      canonical: '/email-signature-templates/sales-representative',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Templates', url: '/email-signature-templates' },
      {
        name: 'Sales Representative',
        url: '/email-signature-templates/sales-representative',
      },
    ],
    hero: {
      badge: { icon: 'target', text: 'Template' },
      title: 'Sales Representative Email Signature Template',
      description:
        'Turn every email into a conversion opportunity. The sales representative template is engineered for outbound success with built-in booking links, social proof, and strategic call-to-action placement.',
      variant: 'light',
    },
    features: [
      {
        icon: 'target',
        title: 'Built-In CTA Button',
        description:
          'A prominent call-to-action button drives prospects to book meetings, request demos, or visit your sales page.',
      },
      {
        icon: 'phone',
        title: 'One-Click Calling',
        description:
          'Your phone number becomes a clickable link on mobile devices, making it effortless for prospects to reach you.',
      },
      {
        icon: 'star',
        title: 'Social Proof Elements',
        description:
          'Display awards, certifications, or customer review scores directly in your signature to build immediate credibility.',
      },
      {
        icon: 'trending-up',
        title: 'Link Tracking',
        description:
          'Monitor which links prospects click to understand engagement and prioritize your follow-up outreach.',
      },
      {
        icon: 'image',
        title: 'Promotional Banner',
        description:
          'Showcase your latest offer, event, or case study with a clickable banner that updates across all team signatures.',
      },
    ],
    featuresTitle: 'Features of the Sales Representative Template',
    sections: [
      {
        type: 'checklist',
        title: "What's Included",
        items: [
          'Prominent name, title, and direct phone number',
          'One-click meeting booking button',
          'Calendly / HubSpot meeting link integration',
          'Social proof badge or award display',
          'Clickable promotional banner area',
          'LinkedIn profile link with icon',
        ],
      },
      {
        type: 'use-cases-grid',
        title: 'Who This Template Is For',
        cases: [
          {
            title: 'Account Executives',
            description:
              'Close deals faster by making it easy for prospects to book time, call you, or learn about your solution.',
          },
          {
            title: 'SDRs & BDRs',
            description:
              'Maximize response rates on cold outreach with a signature that builds credibility and reduces friction.',
          },
          {
            title: 'Sales Managers',
            description:
              'Standardize your team signatures to ensure consistent branding and call-to-action placement across all reps.',
          },
          {
            title: 'Solutions Engineers',
            description:
              'Share technical resources and demo links directly from your signature during the sales process.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'After switching to the sales template, our team saw a 23% increase in meeting bookings directly from email signatures. The built-in CTA pays for itself.',
      authorName: 'Marcus Jenkins',
      authorTitle: 'VP of Sales at CloudReach',
    },
    faqs: [
      {
        question: 'Can I add my Calendly booking link?',
        answer:
          'Yes. The sales template has a dedicated CTA button that can link to Calendly, HubSpot Meetings, or any other scheduling tool you use.',
      },
      {
        question: 'Can I track how many people click my signature links?',
        answer:
          'Yes. Siggly offers link tracking so you can see which prospects engage with your signature links, helping you prioritize follow-ups.',
      },
      {
        question: 'Can I display customer testimonials or awards?',
        answer:
          'Yes. The template includes a social proof area where you can display review badges, certifications, or customer rating scores.',
      },
      {
        question: 'Can different reps have different CTAs?',
        answer:
          'Absolutely. Each rep can customize their CTA button text and link while maintaining the same overall template design and brand consistency.',
      },
      {
        question: 'How often can I update the promotional banner?',
        answer:
          'As often as you like. Updating the banner in Siggly pushes the change to all team signatures instantly, perfect for seasonal promotions or event countdowns.',
      },
    ],
    cta: {
      title: 'Start with the Sales Representative Template',
      description:
        'Equip your sales team with email signatures that drive meetings, build trust, and close deals.',
    },
  },

  // ─── 9. Real Estate Agent ────────────────────────────────────────────
  {
    slug: 'real-estate-agent',
    category: 'templates',
    meta: {
      title: 'Real Estate Agent Email Signature Template | Siggly',
      description:
        'Impress clients with a real estate email signature template. Feature listings, license info, and brokerage branding.',
      keywords: [
        'real estate email signature',
        'realtor signature template',
        'real estate agent branding',
        'property listing signature',
        'brokerage email template',
      ],
      canonical: '/email-signature-templates/real-estate-agent',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Templates', url: '/email-signature-templates' },
      {
        name: 'Real Estate Agent',
        url: '/email-signature-templates/real-estate-agent',
      },
    ],
    hero: {
      badge: { icon: 'building', text: 'Template' },
      title: 'Real Estate Agent Email Signature Template',
      description:
        'Make every email a listing opportunity. The real estate agent template features brokerage branding, license credentials, featured property links, and a design that builds buyer and seller confidence.',
      variant: 'violet',
    },
    features: [
      {
        icon: 'building',
        title: 'Brokerage Branding',
        description:
          'Display your brokerage logo alongside your personal brand for dual recognition and compliance.',
      },
      {
        icon: 'shield',
        title: 'License & Credentials',
        description:
          'Show your real estate license number, designations like CRS or ABR, and MLS affiliations.',
      },
      {
        icon: 'image',
        title: 'Featured Listing Banner',
        description:
          'Showcase your latest listing with a clickable property image that links to the full listing page.',
      },
      {
        icon: 'phone',
        title: 'Direct Contact Priority',
        description:
          'Put your cell phone number front and center so clients can reach you instantly.',
      },
      {
        icon: 'globe',
        title: 'Property Search Link',
        description:
          'Link to your IDX property search page so every email becomes a gateway to available listings.',
      },
    ],
    featuresTitle: 'Features of the Real Estate Agent Template',
    sections: [
      {
        type: 'checklist',
        title: "What's Included",
        items: [
          'Professional headshot with polished framing',
          'Brokerage logo and agent branding',
          'License number and designation badges',
          'Cell phone with click-to-call link',
          'Featured listing banner with link',
          'Zillow, Realtor.com, and social links',
        ],
      },
      {
        type: 'use-cases-grid',
        title: 'Who This Template Is For',
        cases: [
          {
            title: 'Residential Agents',
            description:
              'Build trust with homebuyers and sellers by presenting credentials and listings in every email.',
          },
          {
            title: 'Commercial Brokers',
            description:
              'Communicate professionalism and market expertise to investors and commercial clients.',
          },
          {
            title: 'Real Estate Teams',
            description:
              'Maintain team branding consistency while allowing each agent to feature their own listings and contacts.',
          },
          {
            title: 'New Agents',
            description:
              'Look established and credible from your first day with a polished, brokerage-compliant signature.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Clients always ask how I created such a professional email signature. The featured listing banner has driven multiple inquiries from people who saw it in my emails.',
      authorName: 'Jennifer Nakamura',
      authorTitle: 'Realtor at Keller Williams Realty',
    },
    faqs: [
      {
        question: 'Can I feature a different listing each week?',
        answer:
          'Yes. You can update your featured listing banner at any time through the Siggly editor. Just upload a new image and link to keep your signature fresh.',
      },
      {
        question: 'Can I include my real estate license number?',
        answer:
          'Yes. The template has a dedicated field for your license number and professional designations, which is required by regulation in many states.',
      },
      {
        question: 'Can I use both my personal brand and brokerage logo?',
        answer:
          'Absolutely. The real estate template supports dual branding with separate placements for your personal logo or headshot and your brokerage logo.',
      },
      {
        question: 'Does it support Equal Housing Opportunity logos?',
        answer:
          'Yes. You can add the Equal Housing Opportunity logo and MLS logos to your signature footer for full regulatory compliance.',
      },
    ],
    cta: {
      title: 'Start with the Real Estate Agent Template',
      description:
        'Build an email signature that showcases your listings, credentials, and professionalism in every client interaction.',
    },
  },

  // ─── 10. Lawyer ──────────────────────────────────────────────────────
  {
    slug: 'lawyer',
    category: 'templates',
    meta: {
      title: 'Lawyer Email Signature Template | Siggly',
      description:
        'Project authority with a lawyer email signature template. Includes bar admissions, practice areas, and confidentiality notices.',
      keywords: [
        'lawyer email signature',
        'attorney signature template',
        'law firm email design',
        'legal email signature',
      ],
      canonical: '/email-signature-templates/lawyer',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Templates', url: '/email-signature-templates' },
      { name: 'Lawyer', url: '/email-signature-templates/lawyer' },
    ],
    hero: {
      badge: { icon: 'briefcase', text: 'Template' },
      title: 'Lawyer Email Signature Template',
      description:
        'Communicate trust, authority, and professionalism with a signature designed for legal professionals. The lawyer template supports bar admissions, practice areas, and the confidentiality notices your practice requires.',
      variant: 'emerald',
    },
    features: [
      {
        icon: 'briefcase',
        title: 'Practice Area Display',
        description:
          'List your practice areas and specializations so clients and referral partners immediately understand your expertise.',
      },
      {
        icon: 'shield',
        title: 'Confidentiality Disclaimer',
        description:
          'Include attorney-client privilege notices and confidentiality disclaimers that meet bar association requirements.',
      },
      {
        icon: 'award',
        title: 'Bar Admissions & Credentials',
        description:
          'Display your bar admissions, certifications, and professional memberships in an organized format.',
      },
      {
        icon: 'building',
        title: 'Firm Branding',
        description:
          'Incorporate your firm logo, colors, and branding for a unified look across all attorneys in the practice.',
      },
    ],
    featuresTitle: 'Features of the Lawyer Template',
    sections: [
      {
        type: 'checklist',
        title: "What's Included",
        items: [
          'Attorney name with Esq. or J.D. designation',
          'Practice area and specialization fields',
          'Bar admission list',
          'Firm logo and office address',
          'Confidentiality and privilege disclaimer',
          'Direct phone and scheduling link',
        ],
      },
      {
        type: 'use-cases-grid',
        title: 'Who This Template Is For',
        cases: [
          {
            title: 'Solo Practitioners',
            description:
              'Present a polished, credible image that builds client confidence in your independent practice.',
          },
          {
            title: 'Law Firm Partners',
            description:
              'Reflect your seniority and leadership role with a distinguished signature that represents the firm.',
          },
          {
            title: 'Associates',
            description:
              'Establish your professional identity with a clean signature that highlights your credentials and firm affiliation.',
          },
          {
            title: 'In-House Counsel',
            description:
              'Represent your company legal department with appropriate branding and legal disclaimers.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'The confidentiality disclaimer alone was worth the switch. Having a professional, consistent signature across our 40-attorney firm has elevated our brand significantly.',
      authorName: 'Robert Vasquez',
      authorTitle: 'Managing Partner at Vasquez & Associates',
    },
    faqs: [
      {
        question: 'Does the template include a confidentiality disclaimer?',
        answer:
          'Yes. The lawyer template includes a pre-formatted confidentiality and attorney-client privilege notice that you can customize to meet your jurisdiction requirements.',
      },
      {
        question: 'Can I list multiple bar admissions?',
        answer:
          'Yes. The template supports listing multiple bar admissions and jurisdictions in a clean, organized format.',
      },
      {
        question: 'Can different attorneys at our firm have different practice areas?',
        answer:
          'Yes. Each attorney can customize their practice area listing while maintaining the firm-wide template design, logo, and disclaimer.',
      },
      {
        question: 'Is this template appropriate for a solo practice?',
        answer:
          'Absolutely. The template scales beautifully for solo practitioners and large firms alike, with options to emphasize personal branding or firm identity.',
      },
    ],
    cta: {
      title: 'Start with the Lawyer Template',
      description:
        'Create an email signature that projects legal authority, displays your credentials, and meets professional requirements.',
    },
  },

  // ─── 11. Doctor ──────────────────────────────────────────────────────
  {
    slug: 'doctor',
    category: 'templates',
    meta: {
      title: 'Doctor Email Signature Template | Siggly',
      description:
        'Build trust with a doctor email signature template. Display medical credentials, specialties, and HIPAA-compliant disclaimers.',
      keywords: [
        'doctor email signature',
        'physician signature template',
        'medical email signature',
        'healthcare signature design',
        'HIPAA email disclaimer',
      ],
      canonical: '/email-signature-templates/doctor',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Templates', url: '/email-signature-templates' },
      { name: 'Doctor', url: '/email-signature-templates/doctor' },
    ],
    hero: {
      badge: { icon: 'heart', text: 'Template' },
      title: 'Doctor Email Signature Template',
      description:
        'Inspire patient confidence with a signature that communicates expertise and care. The doctor template displays your medical credentials, specialty, and practice information alongside HIPAA-compliant disclaimer language.',
      variant: 'indigo',
    },
    features: [
      {
        icon: 'heart',
        title: 'Medical Credentials Display',
        description:
          'Show your MD, DO, or other medical degrees along with board certifications and fellowship training.',
      },
      {
        icon: 'shield',
        title: 'HIPAA Disclaimer Support',
        description:
          'Include HIPAA-compliant confidentiality notices to protect patient information in email communications.',
      },
      {
        icon: 'building',
        title: 'Practice & Hospital Branding',
        description:
          'Display your practice logo, hospital affiliation, or health system branding for instant recognition.',
      },
      {
        icon: 'phone',
        title: 'Appointment Scheduling Link',
        description:
          'Include a direct link to your patient portal or online scheduling system for convenient appointment booking.',
      },
      {
        icon: 'globe',
        title: 'Telehealth Ready',
        description:
          'Add a link to your telehealth platform so patients can easily join virtual appointments from your emails.',
      },
    ],
    featuresTitle: 'Features of the Doctor Template',
    sections: [
      {
        type: 'checklist',
        title: "What's Included",
        items: [
          'Name with medical degree and credentials',
          'Medical specialty and sub-specialty fields',
          'Board certification display',
          'Practice logo and hospital affiliation',
          'HIPAA confidentiality disclaimer',
          'Patient portal and scheduling links',
        ],
      },
      {
        type: 'use-cases-grid',
        title: 'Who This Template Is For',
        cases: [
          {
            title: 'Private Practice Physicians',
            description:
              'Build patient trust and streamline appointment scheduling with a polished, informative signature.',
          },
          {
            title: 'Hospital-Based Doctors',
            description:
              'Represent your department and institution professionally in referral and administrative communications.',
          },
          {
            title: 'Medical Specialists',
            description:
              'Highlight your specialty, sub-specialty, and advanced training to referring physicians and patients.',
          },
          {
            title: 'Telehealth Providers',
            description:
              'Make virtual care accessible by including telehealth links directly in your email signature.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Patients and referring doctors notice the professionalism right away. The HIPAA disclaimer gives me peace of mind, and the scheduling link has reduced our front desk call volume.',
      authorName: 'Dr. Anita Patel',
      authorTitle: 'Cardiologist at Lakeview Medical Group',
    },
    faqs: [
      {
        question: 'Does this template include a HIPAA disclaimer?',
        answer:
          'Yes. The doctor template includes a customizable HIPAA-compliant confidentiality notice. You should review the language with your compliance officer to ensure it meets your specific requirements.',
      },
      {
        question: 'Can I display board certifications?',
        answer:
          'Yes. The template has dedicated fields for board certifications, fellowship training, and other medical credentials.',
      },
      {
        question: 'Can I link to my patient portal?',
        answer:
          'Yes. You can include a clickable link to your patient portal, online scheduling system, or telehealth platform directly in your signature.',
      },
      {
        question: 'Is this template suitable for multi-provider practices?',
        answer:
          'Yes. Each provider can personalize their credentials and specialty while maintaining consistent practice branding across the entire group.',
      },
    ],
    cta: {
      title: 'Start with the Doctor Template',
      description:
        'Create an email signature that reflects your medical expertise and makes it easy for patients to connect with your practice.',
    },
  },

  // ─── 12. Consultant ──────────────────────────────────────────────────
  {
    slug: 'consultant',
    category: 'templates',
    meta: {
      title: 'Consultant Email Signature Template | Siggly',
      description:
        'Win client trust with a consultant email signature template. Highlight expertise, certifications, and booking availability.',
      keywords: [
        'consultant email signature',
        'consulting signature template',
        'business consultant email',
        'advisory email signature',
      ],
      canonical: '/email-signature-templates/consultant',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Templates', url: '/email-signature-templates' },
      { name: 'Consultant', url: '/email-signature-templates/consultant' },
    ],
    hero: {
      badge: { icon: 'briefcase', text: 'Template' },
      title: 'Consultant Email Signature Template',
      description:
        'Position yourself as the expert your clients need. The consultant template highlights your areas of expertise, professional certifications, and makes booking your time effortless.',
      variant: 'slate',
    },
    features: [
      {
        icon: 'briefcase',
        title: 'Expertise Showcase',
        description:
          'List your consulting specialties and industry focus areas so prospects immediately understand your value.',
      },
      {
        icon: 'award',
        title: 'Certification Badges',
        description:
          'Display professional certifications like PMP, CPA, SHRM, or Six Sigma to reinforce your credibility.',
      },
      {
        icon: 'target',
        title: 'Booking CTA',
        description:
          'Include a direct booking link so clients can schedule consultations without back-and-forth emails.',
      },
      {
        icon: 'star',
        title: 'Client Testimonial Snippet',
        description:
          'Feature a short client quote or rating directly in your signature to build social proof.',
      },
    ],
    featuresTitle: 'Features of the Consultant Template',
    sections: [
      {
        type: 'checklist',
        title: "What's Included",
        items: [
          'Professional headshot with clean framing',
          'Consulting specialty and focus areas',
          'Certification and credential badges',
          'Direct booking and scheduling link',
          'LinkedIn and professional profile links',
          'Optional client testimonial snippet',
        ],
      },
      {
        type: 'use-cases-grid',
        title: 'Who This Template Is For',
        cases: [
          {
            title: 'Management Consultants',
            description:
              'Establish credibility with C-suite executives and project teams through a polished email presence.',
          },
          {
            title: 'Independent Advisors',
            description:
              'Look every bit as professional as large consulting firms while maintaining your personal brand.',
          },
          {
            title: 'Strategy Consultants',
            description:
              'Communicate your strategic focus and industry expertise from the very first interaction.',
          },
          {
            title: 'HR & Organizational Consultants',
            description:
              'Display relevant certifications and specializations to build trust with people-focused organizations.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'The consultant template helped me look as professional as the Big Four firms I compete with. Clients take me seriously from the very first email.',
      authorName: 'Thomas Erikson',
      authorTitle: 'Independent Strategy Consultant',
    },
    faqs: [
      {
        question: 'Can I list multiple consulting specialties?',
        answer:
          'Yes. The template supports listing multiple specialties or focus areas so prospects understand the full scope of your expertise.',
      },
      {
        question: 'Can I include a link to book consultations?',
        answer:
          'Yes. The consultant template features a prominent booking CTA that links to Calendly, Acuity, or any scheduling tool you prefer.',
      },
      {
        question: 'Can I display professional certifications?',
        answer:
          'Yes. You can add certification badges and acronyms such as PMP, CFA, CPA, or any other relevant credentials alongside your name.',
      },
      {
        question: 'Is this suitable for consulting firms with multiple consultants?',
        answer:
          'Yes. You can create a firm-wide template that maintains consistent branding while allowing each consultant to customize their specialties and credentials.',
      },
    ],
    cta: {
      title: 'Start with the Consultant Template',
      description:
        'Build an email signature that positions you as a trusted expert and makes it easy for clients to engage your services.',
    },
  },

  // ─── 13. Freelancer ──────────────────────────────────────────────────
  {
    slug: 'freelancer',
    category: 'templates',
    meta: {
      title: 'Freelancer Email Signature Template | Siggly',
      description:
        'Level up your freelance business with a professional email signature. Showcase your skills, portfolio, and availability.',
      keywords: [
        'freelancer email signature',
        'freelance signature template',
        'independent contractor email',
        'portfolio email signature',
        'freelancer branding',
      ],
      canonical: '/email-signature-templates/freelancer',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Templates', url: '/email-signature-templates' },
      { name: 'Freelancer', url: '/email-signature-templates/freelancer' },
    ],
    hero: {
      badge: { icon: 'edit-3', text: 'Template' },
      title: 'Freelancer Email Signature Template',
      description:
        'Stand out from the crowd and win more clients. The freelancer template is built for independent professionals who want to project credibility, showcase their skills, and make hiring them effortless.',
      variant: 'dark',
    },
    features: [
      {
        icon: 'edit-3',
        title: 'Skills & Services Highlight',
        description:
          'Display your key skills and service offerings so prospects instantly understand what you bring to the table.',
      },
      {
        icon: 'image',
        title: 'Portfolio Link Integration',
        description:
          'Link directly to your portfolio, Dribbble, Behance, GitHub, or personal website with a clickable CTA.',
      },
      {
        icon: 'check-circle',
        title: 'Availability Indicator',
        description:
          'Let prospects know you are open for new projects with an optional availability status in your signature.',
      },
      {
        icon: 'globe',
        title: 'Multi-Platform Presence',
        description:
          'Connect your profiles across Upwork, Fiverr, LinkedIn, and other platforms where clients find you.',
      },
    ],
    featuresTitle: 'Features of the Freelancer Template',
    sections: [
      {
        type: 'checklist',
        title: "What's Included",
        items: [
          'Professional headshot or personal logo',
          'Tagline and key skills summary',
          'Portfolio and work sample links',
          'Social and platform profile icons',
          'Availability status indicator',
          'Direct contact and booking links',
        ],
      },
      {
        type: 'use-cases-grid',
        title: 'Who This Template Is For',
        cases: [
          {
            title: 'Freelance Designers',
            description:
              'Showcase your creative skills and portfolio with a signature that reflects your design taste.',
          },
          {
            title: 'Freelance Developers',
            description:
              'Link to your GitHub, Stack Overflow, and portfolio to demonstrate technical expertise.',
          },
          {
            title: 'Freelance Writers',
            description:
              'Highlight your published work and content specialties to attract the right clients.',
          },
          {
            title: 'Virtual Assistants',
            description:
              'Present a professional, organized image that builds client confidence in your remote support services.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Since adding a professional signature, I have noticed clients treat me more like a business partner than just a contractor. The availability indicator is a nice touch too.',
      authorName: 'Lisa Johansson',
      authorTitle: 'Freelance Content Strategist',
    },
    faqs: [
      {
        question: 'Can I include a link to my portfolio?',
        answer:
          'Yes. The freelancer template features a prominent portfolio CTA that can link to your personal website, Behance, Dribbble, GitHub, or any portfolio platform.',
      },
      {
        question: 'Can I show my availability status?',
        answer:
          'Yes. The template includes an optional availability indicator that you can toggle to show whether you are currently accepting new projects.',
      },
      {
        question: 'Can I list my key skills or services?',
        answer:
          'Yes. You can add a brief tagline or skills summary beneath your name so clients immediately understand your expertise and offerings.',
      },
      {
        question: 'Do I need a business name to use this template?',
        answer:
          'No. The freelancer template works perfectly with just your personal name and professional title. You can optionally add a business name if you operate under one.',
      },
    ],
    cta: {
      title: 'Start with the Freelancer Template',
      description:
        'Create a professional email signature that wins client confidence and makes hiring you easy.',
    },
  },

  // ─── 14. Marketing Manager ───────────────────────────────────────────
  {
    slug: 'marketing-manager',
    category: 'templates',
    meta: {
      title: 'Marketing Manager Email Signature Template | Siggly',
      description:
        'Amplify your brand with a marketing manager email signature. Drive traffic with CTAs, social links, and campaign banners.',
      keywords: [
        'marketing email signature',
        'marketing manager template',
        'brand email signature',
        'campaign signature design',
        'social media signature',
      ],
      canonical: '/email-signature-templates/marketing-manager',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Templates', url: '/email-signature-templates' },
      {
        name: 'Marketing Manager',
        url: '/email-signature-templates/marketing-manager',
      },
    ],
    hero: {
      badge: { icon: 'trending-up', text: 'Template' },
      title: 'Marketing Manager Email Signature Template',
      description:
        'Every email is a marketing opportunity. The marketing manager template turns your signature into a brand touchpoint with campaign banners, social links, and strategic CTAs that drive measurable results.',
      variant: 'light',
    },
    features: [
      {
        icon: 'trending-up',
        title: 'Campaign Banner Integration',
        description:
          'Promote your latest campaign, event, or content piece with a clickable banner that updates across all signatures instantly.',
      },
      {
        icon: 'globe',
        title: 'Full Social Media Suite',
        description:
          'Link every social channel your brand operates on with matching branded icons for maximum cross-platform visibility.',
      },
      {
        icon: 'target',
        title: 'UTM-Tracked Links',
        description:
          'Add UTM parameters to signature links so you can measure traffic and conversions from email signatures in your analytics.',
      },
      {
        icon: 'layers',
        title: 'Multi-Campaign Support',
        description:
          'Switch between different campaign banners and CTAs without redesigning the entire signature each time.',
      },
      {
        icon: 'eye',
        title: 'Brand Consistency Tools',
        description:
          'Lock colors, fonts, and logos so every marketing team member projects a unified brand image.',
      },
    ],
    featuresTitle: 'Features of the Marketing Manager Template',
    sections: [
      {
        type: 'checklist',
        title: "What's Included",
        items: [
          'Brand-aligned color and typography system',
          'Full social media icon row',
          'Swappable campaign banner with tracking',
          'UTM parameter support on all links',
          'CTA button for lead generation',
          'Team-wide brand lock controls',
        ],
      },
      {
        type: 'use-cases-grid',
        title: 'Who This Template Is For',
        cases: [
          {
            title: 'Marketing Managers',
            description:
              'Turn every team email into a brand impression with consistent, campaign-aligned signatures.',
          },
          {
            title: 'Content Marketers',
            description:
              'Drive traffic to your latest blog posts, whitepapers, and webinars through signature CTAs.',
          },
          {
            title: 'Social Media Managers',
            description:
              'Cross-promote social channels in every email to grow your follower base organically.',
          },
          {
            title: 'Brand Managers',
            description:
              'Ensure every employee email reinforces brand guidelines with locked templates and approved assets.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'We treat our email signatures like a marketing channel now. The campaign banners drive real traffic, and UTM tracking lets us prove it in our analytics dashboards.',
      authorName: 'Priya Sharma',
      authorTitle: 'Head of Marketing at Bloom Digital',
    },
    faqs: [
      {
        question: 'Can I track clicks from my email signature?',
        answer:
          'Yes. The marketing manager template supports UTM parameters on all links, so you can track signature-driven traffic in Google Analytics or any other analytics platform.',
      },
      {
        question: 'Can I change the campaign banner without updating everyone?',
        answer:
          'Yes. When you update the banner in Siggly, the change propagates to all team signatures automatically, ensuring everyone promotes the latest campaign.',
      },
      {
        question: 'How many social media links can I include?',
        answer:
          'The template supports up to 10 social media icons, covering all major platforms including LinkedIn, Twitter, Instagram, YouTube, TikTok, and more.',
      },
      {
        question: 'Can I A/B test different CTAs?',
        answer:
          'Yes. You can create multiple CTA variations and assign them to different team members or time periods to identify which messages drive the most engagement.',
      },
    ],
    cta: {
      title: 'Start with the Marketing Manager Template',
      description:
        'Transform every outgoing email into a brand-building, traffic-driving marketing touchpoint.',
    },
  },

  // ─── 15. IT Professional ─────────────────────────────────────────────
  {
    slug: 'it-professional',
    category: 'templates',
    meta: {
      title: 'IT Professional Email Signature Template | Siggly',
      description:
        'Create a technical email signature for IT professionals. Display certifications, tech stack expertise, and support links.',
      keywords: [
        'IT email signature',
        'tech professional signature',
        'IT support email template',
        'developer email signature',
        'technical signature design',
      ],
      canonical: '/email-signature-templates/it-professional',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Templates', url: '/email-signature-templates' },
      {
        name: 'IT Professional',
        url: '/email-signature-templates/it-professional',
      },
    ],
    hero: {
      badge: { icon: 'monitor', text: 'Template' },
      title: 'IT Professional Email Signature Template',
      description:
        'Communicate technical authority with a signature built for IT professionals. Display your certifications, support channels, and technical expertise in a clean, structured format that tech teams respect.',
      variant: 'violet',
    },
    features: [
      {
        icon: 'monitor',
        title: 'Technical Credential Display',
        description:
          'Showcase IT certifications like AWS, Azure, CISSP, CompTIA, or ITIL in a structured, professional format.',
      },
      {
        icon: 'settings',
        title: 'Support Channel Links',
        description:
          'Include direct links to your help desk, ticketing system, or IT support portal for faster issue resolution.',
      },
      {
        icon: 'shield',
        title: 'Security-Conscious Design',
        description:
          'Clean, minimalist layout that avoids unnecessary images and scripts, reflecting IT security best practices.',
      },
      {
        icon: 'layers',
        title: 'Tech Stack Highlight',
        description:
          'Optionally display your primary technology stack or platform expertise for internal and external credibility.',
      },
    ],
    featuresTitle: 'Features of the IT Professional Template',
    sections: [
      {
        type: 'checklist',
        title: "What's Included",
        items: [
          'Name, title, and department designation',
          'IT certification badges and acronyms',
          'Help desk and ticketing system links',
          'Direct phone and Teams/Slack contact',
          'GitHub or tech community profile links',
          'Security-conscious, lightweight design',
        ],
      },
      {
        type: 'use-cases-grid',
        title: 'Who This Template Is For',
        cases: [
          {
            title: 'System Administrators',
            description:
              'Provide clear contact and support escalation paths in every email to colleagues and end users.',
          },
          {
            title: 'Software Engineers',
            description:
              'Link to your GitHub profile, tech blog, or Stack Overflow to demonstrate your technical contributions.',
          },
          {
            title: 'IT Managers & Directors',
            description:
              'Present a professional, credentialed image when communicating with vendors, leadership, and cross-functional teams.',
          },
          {
            title: 'Cybersecurity Professionals',
            description:
              'Display security certifications and maintain a signature that reflects information security best practices.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'The IT professional template lets me display my AWS and Azure certifications cleanly. End users always know how to reach our help desk thanks to the support links.',
      authorName: 'Kevin Tran',
      authorTitle: 'Senior Systems Administrator at DataVault Inc.',
    },
    faqs: [
      {
        question: 'Can I display IT certifications like AWS or CISSP?',
        answer:
          'Yes. The template has a dedicated certification section where you can list credentials such as AWS Solutions Architect, Azure Administrator, CISSP, CCNA, CompTIA A+, and others.',
      },
      {
        question: 'Can I link to our help desk or ticketing system?',
        answer:
          'Yes. The template includes fields for help desk URLs, ticketing portals, and knowledge base links so recipients can quickly submit or track support requests.',
      },
      {
        question: 'Is the template lightweight enough for security-conscious environments?',
        answer:
          'Yes. The IT professional template uses minimal HTML, avoids external scripts, and keeps images optional to align with strict email security policies.',
      },
      {
        question: 'Can I include my GitHub or Stack Overflow profile?',
        answer:
          'Yes. The template supports links to developer platforms including GitHub, GitLab, Stack Overflow, and personal tech blogs alongside standard social media icons.',
      },
    ],
    cta: {
      title: 'Start with the IT Professional Template',
      description:
        'Build an email signature that reflects your technical expertise and makes IT support channels easy to find.',
    },
  },

  // ─── Nonprofit ─────────────────────────────────────────────────────
  {
    slug: 'nonprofit',
    category: 'templates',
    meta: {
      title: 'Nonprofit Email Signature Template | Siggly',
      description:
        'Create mission-driven email signatures for your nonprofit organization. Feature donation links, volunteer calls-to-action, and impact metrics.',
      keywords: [
        'nonprofit email signature',
        'charity email template',
        'NGO signature design',
        'nonprofit branding',
        'donation link signature',
      ],
      canonical: '/email-signature-templates/nonprofit',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Templates', url: '/email-signature-templates' },
      { name: 'Nonprofit', url: '/email-signature-templates/nonprofit' },
    ],
    hero: {
      badge: { icon: 'heart', text: 'Template' },
      title: 'Nonprofit Email Signature Template',
      description:
        'Amplify your mission with every email. The nonprofit template features donation buttons, volunteer calls-to-action, and impact statistics that turn routine correspondence into fundraising opportunities.',
      variant: 'emerald',
    },
    stats: [
      { value: '25%', label: 'More donation clicks' },
      { value: '500+', label: 'Nonprofits using it' },
      { value: '3 min', label: 'Setup time' },
    ],
    features: [
      {
        icon: 'heart',
        title: 'Donate Button Integration',
        description:
          'A prominent, clickable donation button links directly to your giving page, turning every email into a passive fundraising touchpoint.',
      },
      {
        icon: 'users',
        title: 'Volunteer CTA Banner',
        description:
          'Promote volunteer opportunities, sign-up forms, and upcoming events with a rotating banner area beneath your contact details.',
      },
      {
        icon: 'bar-chart-3',
        title: 'Impact Metrics Display',
        description:
          'Showcase key impact numbers like meals served, trees planted, or families housed directly in your signature to reinforce donor confidence.',
      },
      {
        icon: 'award',
        title: 'Charity Rating Badges',
        description:
          'Display GuideStar, Charity Navigator, or BBB Wise Giving Alliance seals to signal financial transparency and organizational accountability.',
      },
    ],
    featuresTitle: 'Features of the Nonprofit Template',
    sections: [
      {
        type: 'checklist',
        title: "What's Included",
        items: [
          'Organization logo and mission tagline',
          'One-click donation button with customizable URL',
          'Impact statistics row with configurable metrics',
          'Volunteer sign-up banner area',
          'Charity rating badges and seals',
          'Social media icons for community channels',
        ],
      },
      {
        type: 'use-cases-grid',
        title: 'Who This Template Is For',
        cases: [
          {
            title: 'Executive Directors',
            description:
              'Present organizational authority while passively driving donations and volunteer interest with every email sent.',
          },
          {
            title: 'Development Officers',
            description:
              'Include giving links and campaign banners that complement your fundraising outreach efforts.',
          },
          {
            title: 'Program Coordinators',
            description:
              'Feature impact metrics and event sign-up links relevant to the programs you manage.',
          },
          {
            title: 'Board Members',
            description:
              'Represent the organization professionally in external communications with a branded, mission-aligned signature.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'After switching to the Siggly nonprofit template, our year-end giving campaign saw a 30% lift in email-driven donations. The donate button in every signature made all the difference.',
      authorName: 'Patricia Okonkwo',
      authorTitle: 'Development Director at Hope Springs Foundation',
    },
    faqs: [
      {
        question: 'Can I link directly to our donation page?',
        answer:
          'Yes. The template includes a prominent donate button that links to any URL you specify, whether it is a PayPal, Classy, or custom donation page.',
      },
      {
        question: 'Can we update impact metrics regularly?',
        answer:
          'Yes. Siggly lets you update your impact numbers at any time, and changes propagate to all staff signatures instantly.',
      },
      {
        question: 'Is the template free for nonprofits?',
        answer:
          'Siggly offers discounted and free plans for qualifying nonprofit organizations. Contact our team with your 501(c)(3) documentation for details.',
      },
      {
        question: 'Can board members use the template without a company email?',
        answer:
          'Yes. Board members can install the signature manually in their personal email client using the HTML code Siggly generates.',
      },
    ],
    cta: {
      title: 'Amplify Your Mission in Every Email',
      description:
        'Turn routine correspondence into fundraising and volunteer recruitment opportunities with the nonprofit template.',
    },
  },

  // ─── Healthcare Provider ───────────────────────────────────────────
  {
    slug: 'healthcare-provider',
    category: 'templates',
    meta: {
      title: 'Healthcare Provider Email Signature Template | Siggly',
      description:
        'HIPAA-aware email signatures for doctors, nurses, and healthcare staff. Display credentials, patient portal links, and appointment scheduling.',
      keywords: [
        'healthcare email signature',
        'doctor email template',
        'medical signature design',
        'HIPAA email signature',
        'patient portal signature',
      ],
      canonical: '/email-signature-templates/healthcare-provider',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Templates', url: '/email-signature-templates' },
      {
        name: 'Healthcare Provider',
        url: '/email-signature-templates/healthcare-provider',
      },
    ],
    hero: {
      badge: { icon: 'heart', text: 'Template' },
      title: 'Healthcare Provider Email Signature Template',
      description:
        'Communicate trust and professionalism with a signature built for clinical environments. Display medical credentials, appointment scheduling links, and HIPAA-compliant disclaimers in a clean, authoritative layout.',
      variant: 'indigo',
    },
    stats: [
      { value: '700+', label: 'Healthcare providers' },
      { value: '100%', label: 'HIPAA disclaimer rate' },
      { value: '4 min', label: 'Average setup' },
    ],
    features: [
      {
        icon: 'award',
        title: 'Medical Credential Display',
        description:
          'Show MD, DO, NP, PA-C, RN, and board certification details prominently so patients and colleagues can verify your qualifications instantly.',
      },
      {
        icon: 'calendar',
        title: 'Appointment Scheduling Link',
        description:
          'Include a direct link to your patient scheduling portal so recipients can book appointments without leaving their inbox.',
      },
      {
        icon: 'shield',
        title: 'HIPAA Disclaimer Block',
        description:
          'A mandatory, non-removable HIPAA confidentiality notice is appended automatically to every signature to protect patient information.',
      },
      {
        icon: 'link',
        title: 'Patient Portal Access',
        description:
          'Link to your patient portal, telehealth platform, or prescription refill page for convenient one-click access from any email.',
      },
      {
        icon: 'phone',
        title: 'After-Hours Contact',
        description:
          'Display after-hours phone numbers, nurse hotlines, and emergency contact instructions beneath your standard office hours.',
      },
    ],
    featuresTitle: 'Features of the Healthcare Provider Template',
    sections: [
      {
        type: 'checklist',
        title: "What's Included",
        items: [
          'Provider name with medical degree and credentials',
          'Practice or hospital logo placement',
          'Appointment scheduling button',
          'Patient portal and telehealth links',
          'HIPAA confidentiality disclaimer',
          'After-hours and emergency contact details',
        ],
      },
      {
        type: 'use-cases-grid',
        title: 'Who This Template Is For',
        cases: [
          {
            title: 'Physicians & Surgeons',
            description:
              'Display board certifications, specialty focus, and direct scheduling links for referral and patient communication.',
          },
          {
            title: 'Nurse Practitioners',
            description:
              'Feature NP credentials, prescriptive authority details, and clinic contact information.',
          },
          {
            title: 'Practice Administrators',
            description:
              'Present the practice brand professionally while including billing, insurance, and patient service contact details.',
          },
          {
            title: 'Telehealth Providers',
            description:
              'Include video visit links and virtual care platform access alongside your standard credentials.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Can I display board certifications and specialty credentials?',
        answer:
          'Yes. The template includes dedicated fields for medical degrees, board certifications, NPI numbers, and specialty designations.',
      },
      {
        question: 'Is the HIPAA disclaimer customizable?',
        answer:
          'The disclaimer text is fully customizable but can be locked by administrators so individual providers cannot remove or modify it.',
      },
      {
        question: 'Can I link to a telehealth platform?',
        answer:
          'Yes. The template supports links to Doxy.me, Zoom Health, Teladoc, and any other telehealth URL you use for virtual visits.',
      },
    ],
    cta: {
      title: 'Build Your Healthcare Signature Today',
      description:
        'Give patients confidence with a professional, credential-rich email signature built for healthcare providers.',
    },
  },

  // ─── Academic ──────────────────────────────────────────────────────
  {
    slug: 'academic',
    category: 'templates',
    meta: {
      title: 'Academic Email Signature Template | Siggly',
      description:
        'Professional email signatures for professors, researchers, and academic staff. Feature publications, ORCID links, and institutional affiliations.',
      keywords: [
        'academic email signature',
        'professor email template',
        'researcher signature design',
        'university faculty signature',
        'scholarly email branding',
      ],
      canonical: '/email-signature-templates/academic',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Templates', url: '/email-signature-templates' },
      { name: 'Academic', url: '/email-signature-templates/academic' },
    ],
    hero: {
      badge: { icon: 'graduation-cap', text: 'Template' },
      title: 'The Academic Email Signature Template',
      description:
        'Designed for scholars and faculty, this template puts your research credentials front and center. Include ORCID links, publication counts, department affiliations, and office hours in a layout that commands scholarly respect.',
      variant: 'slate',
    },
    stats: [
      { value: '1,000+', label: 'Academics using it' },
      { value: '50+', label: 'Universities represented' },
      { value: '2 min', label: 'Average setup' },
      { value: '4.9/5', label: 'User rating' },
    ],
    features: [
      {
        icon: 'book-open',
        title: 'Publication & Citation Links',
        description:
          'Link to your Google Scholar profile, ResearchGate page, or personal publications list so collaborators can explore your body of work.',
      },
      {
        icon: 'link',
        title: 'ORCID Integration',
        description:
          'Display your ORCID iD badge directly in your signature for unambiguous researcher identification across journals and databases.',
      },
      {
        icon: 'building-2',
        title: 'Institutional Affiliation',
        description:
          'Feature your department, lab, research center, and university branding in a hierarchical layout that reflects academic structure.',
      },
    ],
    featuresTitle: 'Features of the Academic Template',
    sections: [
      {
        type: 'checklist',
        title: "What's Included",
        items: [
          'Name with academic title (Prof., Dr., etc.)',
          'Department and institutional affiliation',
          'ORCID badge with clickable link',
          'Google Scholar and ResearchGate links',
          'Office hours and location details',
          'University logo and brand colors',
        ],
      },
      {
        type: 'use-cases-grid',
        title: 'Who This Template Is For',
        cases: [
          {
            title: 'Tenured Faculty',
            description:
              'Present your scholarly credentials, lab affiliation, and publication record in every email to students, peers, and journal editors.',
          },
          {
            title: 'Postdoctoral Researchers',
            description:
              'Highlight your research focus, ORCID, and current grant affiliations to build your academic reputation.',
          },
          {
            title: 'Graduate Teaching Assistants',
            description:
              'Include office hours, course pages, and department contact info for student-facing communications.',
          },
          {
            title: 'Department Chairs',
            description:
              'Represent your department with a signature that includes administrative contact details alongside your research profile.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'The ORCID badge in my signature has made it so much easier for collaborators to find my papers. I have gotten two co-authorship invitations that I can trace directly to it.',
      authorName: 'Dr. Elena Vasquez',
      authorTitle: 'Associate Professor of Neuroscience, Stanford University',
    },
    faqs: [
      {
        question: 'Can I include my ORCID iD?',
        answer:
          'Yes. The template features a dedicated ORCID badge that displays your 16-digit identifier and links directly to your ORCID profile page.',
      },
      {
        question: 'Can I link to my Google Scholar profile?',
        answer:
          'Yes. The template supports links to Google Scholar, ResearchGate, Academia.edu, Semantic Scholar, and personal publication pages.',
      },
      {
        question: 'Is this template suitable for adjunct faculty?',
        answer:
          'Absolutely. Adjunct instructors can list their institutional affiliation, course information, and office hours just like full-time faculty.',
      },
      {
        question: 'Can I show my h-index or citation count?',
        answer:
          'Yes. You can add custom text fields to display your h-index, total citations, or other scholarly metrics alongside your name and title.',
      },
      {
        question: 'Does the template support multiple affiliations?',
        answer:
          'Yes. If you hold joint appointments or visiting positions, the template accommodates multiple departmental and institutional affiliations.',
      },
    ],
    cta: {
      title: 'Elevate Your Scholarly Correspondence',
      description:
        'Present your research credentials and institutional affiliation with clarity in every email you send.',
    },
  },

  // ─── Government Employee ──────────────────────────────────────────
  {
    slug: 'government-employee',
    category: 'templates',
    meta: {
      title: 'Government Employee Email Signature Template | Siggly',
      description:
        'Official email signatures for government workers at federal, state, and local levels. Clean layouts with agency branding and compliance disclaimers.',
      keywords: [
        'government email signature',
        'federal employee signature',
        'public sector email template',
        'agency email branding',
        'government compliance signature',
      ],
      canonical: '/email-signature-templates/government-employee',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Templates', url: '/email-signature-templates' },
      {
        name: 'Government Employee',
        url: '/email-signature-templates/government-employee',
      },
    ],
    hero: {
      badge: { icon: 'landmark', text: 'Template' },
      title: 'Government Employee Email Signature Template',
      description:
        'Public servants need email signatures that project authority, transparency, and compliance. This template provides clean, accessible layouts with agency seals, official titles, and mandatory disclosure notices.',
      variant: 'dark',
    },
    features: [
      {
        icon: 'landmark',
        title: 'Agency Seal & Branding',
        description:
          'Display your department or agency official seal alongside standardized government branding guidelines for immediate recognition.',
      },
      {
        icon: 'shield-check',
        title: 'Records Act Disclaimer',
        description:
          'Include FOIA notices, public records disclaimers, and retention policy statements that satisfy federal and state record-keeping requirements.',
      },
      {
        icon: 'user-check',
        title: 'Official Title Hierarchy',
        description:
          'Structure your name, GS grade or equivalent, division, bureau, and department in the proper governmental hierarchy.',
      },
      {
        icon: 'eye',
        title: 'Accessibility Compliance',
        description:
          'The template meets Section 508 and WCAG 2.1 AA accessibility standards, ensuring signatures are usable by all constituents.',
      },
    ],
    featuresTitle: 'Features of the Government Template',
    sections: [
      {
        type: 'how-it-works',
        title: 'Deploy Official Signatures in Three Steps',
        steps: [
          {
            step: '01',
            title: 'Upload Agency Assets',
            description:
              'Import your department seal, agency logo, and approved brand guidelines into Siggly. Add required disclaimer text to the compliance library.',
          },
          {
            step: '02',
            title: 'Configure Hierarchy Templates',
            description:
              'Build templates that reflect your agency organizational structure with proper title formatting, GS grades, and division identifiers.',
          },
          {
            step: '03',
            title: 'Deploy Department-Wide',
            description:
              'Roll out accessible, compliant signatures to all staff. New employees receive their signature automatically through directory integration.',
          },
        ],
      },
      {
        type: 'benefits',
        title: 'Why Government Agencies Choose Siggly',
        items: [
          {
            icon: 'shield-check',
            title: 'Regulatory Compliance',
            description:
              'Built-in FOIA notices and records act disclaimers ensure every email meets federal and state record-keeping requirements.',
          },
          {
            icon: 'eye',
            title: 'Section 508 Accessibility',
            description:
              'All signature HTML meets WCAG 2.1 AA standards, ensuring constituents with disabilities can access contact information.',
          },
          {
            icon: 'lock',
            title: 'Centralized Control',
            description:
              'Agency administrators control all signature content centrally, preventing unauthorized modifications to official branding.',
          },
        ],
      },
    ],
    cta: {
      title: 'Serve the Public with Professional Email',
      description:
        'Give every government email the official, accessible, and compliant signature it requires.',
    },
  },

  // ─── Engineering ───────────────────────────────────────────────────
  {
    slug: 'engineering',
    category: 'templates',
    meta: {
      title: 'Engineering Email Signature Template | Siggly',
      description:
        'Professional email signatures for engineers. Display PE licenses, technical certifications, and project portfolio links in a precision-crafted layout.',
      keywords: [
        'engineering email signature',
        'PE license signature',
        'engineer email template',
        'technical signature design',
        'professional engineer branding',
      ],
      canonical: '/email-signature-templates/engineering',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Templates', url: '/email-signature-templates' },
      { name: 'Engineering', url: '/email-signature-templates/engineering' },
    ],
    hero: {
      badge: { icon: 'cog', text: 'Template' },
      title: 'Engineering Email Signature Template',
      description:
        'Precision matters in engineering, and your email signature should reflect that. This template accommodates PE license numbers, discipline-specific certifications, and technical portfolio links in a structured, no-nonsense layout.',
      variant: 'light',
    },
    stats: [
      { value: '800+', label: 'Engineers using it' },
      { value: '15+', label: 'Disciplines covered' },
      { value: '90 sec', label: 'Typical setup' },
    ],
    features: [
      {
        icon: 'award',
        title: 'PE License Display',
        description:
          'Feature your Professional Engineer license number and state of licensure prominently, making it easy for clients to verify your credentials.',
      },
      {
        icon: 'file-check',
        title: 'Certification Showcase',
        description:
          'List PMP, Six Sigma, FE/EIT, LEED, and other technical certifications beneath your name and title for instant credibility.',
      },
      {
        icon: 'code',
        title: 'Technical Portfolio Links',
        description:
          'Include links to your GitHub, GitLab, or personal portfolio for software engineers, or project galleries for civil, mechanical, and structural disciplines.',
      },
      {
        icon: 'building-2',
        title: 'Firm & Discipline Branding',
        description:
          'Display your engineering firm logo, discipline or practice area, and office location in a structured hierarchy.',
      },
      {
        icon: 'layers',
        title: 'Multi-License Support',
        description:
          'Engineers licensed in multiple states can display all active PE numbers with corresponding jurisdictions in a clean, scannable format.',
      },
    ],
    featuresTitle: 'Features of the Engineering Template',
    sections: [
      {
        type: 'checklist',
        title: "What's Included",
        items: [
          'PE license number with state jurisdiction',
          'Engineering discipline and practice area',
          'Technical certification badges',
          'Firm logo and office contact details',
          'Portfolio or project gallery link',
          'Professional organization memberships',
        ],
      },
      {
        type: 'use-cases-grid',
        title: 'Who This Template Is For',
        cases: [
          {
            title: 'Civil Engineers',
            description:
              'Display PE licenses, ASCE memberships, and project portfolio links for infrastructure and municipal communications.',
          },
          {
            title: 'Software Engineers',
            description:
              'Feature GitHub profiles, tech stack expertise, and relevant certifications in a developer-friendly layout.',
          },
          {
            title: 'Mechanical Engineers',
            description:
              'Include ASME memberships, PE credentials, and links to CAD portfolios or published research.',
          },
          {
            title: 'Electrical Engineers',
            description:
              'Showcase IEEE affiliations, PE licenses, and specialty area details for power, controls, or electronics.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Having my PE number and LEED AP credential in my signature eliminated the back-and-forth during proposal submissions. Clients verify my qualifications before we even get on a call.',
      authorName: 'David Moreno, PE, LEED AP',
      authorTitle: 'Principal Engineer at Clearwater Structural',
    },
    faqs: [
      {
        question: 'Can I display PE licenses from multiple states?',
        answer:
          'Yes. The template supports multiple license entries, each with its own state jurisdiction and license number for engineers holding multi-state registration.',
      },
      {
        question: 'Is this template suitable for software engineers?',
        answer:
          'Yes. Software engineers can replace PE fields with GitHub profiles, tech stack details, and relevant certifications like AWS, Azure, or Kubernetes credentials.',
      },
      {
        question: 'Can I include professional society memberships?',
        answer:
          'Yes. The template has fields for ASCE, ASME, IEEE, NSPE, and other professional organization memberships and fellow designations.',
      },
    ],
    cta: {
      title: 'Engineer Your Perfect Email Signature',
      description:
        'Display your credentials with the precision and clarity your engineering discipline demands.',
    },
  },

  // ─── Customer Support ──────────────────────────────────────────────
  {
    slug: 'customer-support',
    category: 'templates',
    meta: {
      title: 'Customer Support Email Signature Template | Siggly',
      description:
        'Friendly, helpful email signatures for support teams. Include ticket links, knowledge base access, satisfaction surveys, and escalation paths.',
      keywords: [
        'customer support email signature',
        'help desk signature template',
        'support agent email design',
        'customer service branding',
        'ticket link email signature',
      ],
      canonical: '/email-signature-templates/customer-support',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Templates', url: '/email-signature-templates' },
      {
        name: 'Customer Support',
        url: '/email-signature-templates/customer-support',
      },
    ],
    hero: {
      badge: { icon: 'headphones', text: 'Template' },
      title: 'Customer Support Email Signature Template',
      description:
        'Every support email is a chance to build loyalty. This template equips your agents with signatures that include ticket tracking links, knowledge base shortcuts, satisfaction survey prompts, and clear escalation paths.',
      variant: 'violet',
    },
    stats: [
      { value: '900+', label: 'Support teams' },
      { value: '40%', label: 'More CSAT responses' },
      { value: '3 min', label: 'Agent onboarding' },
    ],
    features: [
      {
        icon: 'headphones',
        title: 'Ticket & Case Links',
        description:
          'Include dynamic ticket tracking URLs and case reference numbers so customers can check resolution status without contacting support again.',
      },
      {
        icon: 'book-open',
        title: 'Knowledge Base Access',
        description:
          'Link to relevant help articles, FAQs, and troubleshooting guides directly in the signature to deflect common follow-up questions.',
      },
      {
        icon: 'star',
        title: 'CSAT Survey Prompt',
        description:
          'Embed a one-click satisfaction survey link in every agent signature to capture real-time feedback on support interactions.',
      },
      {
        icon: 'life-buoy',
        title: 'Escalation Contact',
        description:
          'Display supervisor contact details and escalation procedures so customers know exactly how to reach the next level of support if needed.',
      },
    ],
    featuresTitle: 'Features of the Customer Support Template',
    sections: [
      {
        type: 'how-it-works',
        title: 'Set Up Your Support Team Signatures',
        steps: [
          {
            step: '01',
            title: 'Configure Help Resources',
            description:
              'Add your knowledge base URL, ticket portal link, and satisfaction survey endpoint to the template resource fields.',
          },
          {
            step: '02',
            title: 'Customize Agent Details',
            description:
              'Each agent gets their name, team, working hours, and language specialties populated from your directory or help desk platform.',
          },
          {
            step: '03',
            title: 'Deploy to Your Team',
            description:
              'Push the template to all agents at once. New hires automatically receive the signature when added to your support roster.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Adding the CSAT survey link to every agent signature increased our feedback response rate by 40%. We now capture satisfaction data on nearly every resolved ticket.',
      authorName: 'Angela Brooks',
      authorTitle: 'VP of Customer Experience at CloudServe',
    },
    faqs: [
      {
        question: 'Can I include a link to our ticketing system?',
        answer:
          'Yes. The template supports links to Zendesk, Freshdesk, Intercom, ServiceNow, and any custom ticket portal via configurable URL fields.',
      },
      {
        question: 'Can different support tiers have different signatures?',
        answer:
          'Yes. You can create distinct templates for Tier 1, Tier 2, and specialized support teams with tier-appropriate resources and escalation contacts.',
      },
      {
        question: 'Is the CSAT survey link customizable?',
        answer:
          'Yes. You can link to any survey platform, including Typeform, SurveyMonkey, Delighted, or a custom internal survey endpoint.',
      },
    ],
    cta: {
      title: 'Upgrade Your Support Team Signatures',
      description:
        'Help customers help themselves with signatures that connect them to the resources they need.',
    },
  },

  // ─── Human Resources ──────────────────────────────────────────────
  {
    slug: 'human-resources',
    category: 'templates',
    meta: {
      title: 'Human Resources Email Signature Template | Siggly',
      description:
        'Professional HR email signatures with benefits portal links, open position listings, and employee resource access. Built for people teams.',
      keywords: [
        'HR email signature',
        'human resources signature template',
        'people team email design',
        'HR branding signature',
        'benefits portal email link',
      ],
      canonical: '/email-signature-templates/human-resources',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Templates', url: '/email-signature-templates' },
      {
        name: 'Human Resources',
        url: '/email-signature-templates/human-resources',
      },
    ],
    hero: {
      badge: { icon: 'users-round', text: 'Template' },
      title: 'Human Resources Email Signature Template',
      description:
        'HR professionals are the face of your company culture. This template provides warm, approachable signatures with quick-access links to benefits portals, career pages, and employee resources that candidates and staff rely on.',
      variant: 'emerald',
    },
    stats: [
      { value: '600+', label: 'HR teams using it' },
      { value: '35%', label: 'More career page clicks' },
      { value: '5 min', label: 'Department setup' },
      { value: '98%', label: 'Adoption rate' },
    ],
    features: [
      {
        icon: 'user-plus',
        title: 'Career Page Promotion',
        description:
          'Feature a clickable banner or link to your careers page in every HR team email, turning routine correspondence into a passive recruiting channel.',
      },
      {
        icon: 'heart',
        title: 'Benefits Portal Access',
        description:
          'Include direct links to your benefits enrollment portal, PTO request system, and employee handbook for one-click access from any email.',
      },
      {
        icon: 'calendar',
        title: 'Open Enrollment Banners',
        description:
          'Promote benefits open enrollment periods, wellness programs, and company events with seasonal banner campaigns in HR signatures.',
      },
    ],
    featuresTitle: 'Features of the Human Resources Template',
    sections: [
      {
        type: 'checklist',
        title: "What's Included",
        items: [
          'HR professional name and title',
          'Company logo and culture tagline',
          'Benefits portal quick-access link',
          'Careers page promotion banner',
          'Employee handbook and policy links',
          'Confidential communication disclaimer',
        ],
      },
      {
        type: 'use-cases-grid',
        title: 'Who This Template Is For',
        cases: [
          {
            title: 'Talent Acquisition',
            description:
              'Include open roles, career page links, and Glassdoor review badges to enhance your employer brand in every recruiter email.',
          },
          {
            title: 'HR Business Partners',
            description:
              'Provide managers and employees with quick links to HR policies, benefits, and employee assistance programs.',
          },
          {
            title: 'Compensation & Benefits',
            description:
              'Feature benefits enrollment links, wellness program details, and open enrollment countdown banners.',
          },
          {
            title: 'HR Leadership',
            description:
              'Present the people function with authority while including culture-forward messaging and leadership contact details.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'The career page link in our recruiter signatures generated 15% of our qualified applicants last quarter. It is the easiest passive recruiting tool we have ever implemented.',
      authorName: 'Jordan Sinclair',
      authorTitle: 'Director of Talent Acquisition at Elevate Partners',
    },
    faqs: [
      {
        question: 'Can I link to our ATS or careers page?',
        answer:
          'Yes. The template supports links to Greenhouse, Lever, Workday, and any custom careers page URL.',
      },
      {
        question: 'Can we promote open enrollment through signatures?',
        answer:
          'Yes. Siggly supports time-limited banner campaigns that you can schedule to appear only during enrollment windows.',
      },
      {
        question: 'Is there a confidentiality disclaimer option?',
        answer:
          'Yes. The template includes an optional confidentiality notice for sensitive HR communications like offer letters, investigations, and compensation discussions.',
      },
      {
        question: 'Can different HR roles have different signatures?',
        answer:
          'Yes. Recruiters, HR business partners, benefits specialists, and HR executives can each have tailored templates with role-specific links and messaging.',
      },
    ],
    cta: {
      title: 'Put Your People Team on Brand',
      description:
        'Give every HR email the warmth, professionalism, and resource access your employees and candidates expect.',
    },
  },

  // ─── Financial Services ────────────────────────────────────────────
  {
    slug: 'financial-services',
    category: 'templates',
    meta: {
      title: 'Financial Services Email Signature Template | Siggly',
      description:
        'Compliant email signatures for financial advisors, bankers, and insurance agents. Display FINRA disclosures, license numbers, and compliance notices.',
      keywords: [
        'financial services email signature',
        'financial advisor signature',
        'FINRA compliant email',
        'banking email template',
        'insurance agent signature',
      ],
      canonical: '/email-signature-templates/financial-services',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Templates', url: '/email-signature-templates' },
      {
        name: 'Financial Services',
        url: '/email-signature-templates/financial-services',
      },
    ],
    hero: {
      badge: { icon: 'landmark', text: 'Template' },
      title: 'Financial Services Email Signature Template',
      description:
        'Financial professionals operate under strict regulatory oversight. This template delivers polished signatures with mandatory FINRA disclosures, SEC registration details, state insurance license numbers, and compliance-approved messaging.',
      variant: 'indigo',
    },
    stats: [
      { value: '450+', label: 'Financial firms' },
      { value: '100%', label: 'Disclosure compliance' },
      { value: '7 min', label: 'Firm-wide rollout' },
      { value: '55%', label: 'Fewer compliance edits' },
    ],
    features: [
      {
        icon: 'shield-check',
        title: 'FINRA & SEC Disclosures',
        description:
          'Include mandatory broker-dealer disclosures, SEC registration numbers, and SIPC membership notices that satisfy regulatory examination requirements.',
      },
      {
        icon: 'file-text',
        title: 'License Number Display',
        description:
          'Show Series 7, Series 66, state insurance license numbers, and CRD numbers in a clean, scannable format beneath your name.',
      },
      {
        icon: 'lock',
        title: 'Compliance-Locked Content',
        description:
          'Administrators can lock disclaimer blocks and disclosure language so individual advisors cannot modify compliance-required content.',
      },
      {
        icon: 'scale',
        title: 'Fair Balance Messaging',
        description:
          'Ensure marketing messages in advisor signatures include required risk disclosures and past-performance disclaimers.',
      },
    ],
    featuresTitle: 'Features of the Financial Services Template',
    sections: [
      {
        type: 'benefits',
        title: 'Why Financial Firms Trust Siggly',
        items: [
          {
            icon: 'shield-check',
            title: 'Examination-Ready Disclosures',
            description:
              'Locked disclaimer blocks ensure FINRA and SEC disclosure language remains intact across every advisor email, even during examinations.',
          },
          {
            icon: 'user-check',
            title: 'Credential Verification',
            description:
              'CRD numbers and license details in every signature make it easy for clients and regulators to verify advisor registration status.',
          },
          {
            icon: 'lock',
            title: 'Compliance Team Control',
            description:
              'Only authorized compliance officers can modify disclosure language, preventing advisors from accidentally removing required content.',
          },
        ],
      },
      {
        type: 'use-cases-grid',
        title: 'Who This Template Is For',
        cases: [
          {
            title: 'Financial Advisors',
            description:
              'Display CFP, CFA, and Series license credentials with mandatory FINRA disclosures in every client communication.',
          },
          {
            title: 'Insurance Agents',
            description:
              'Include state license numbers, carrier appointments, and product-specific disclosures for compliant outreach.',
          },
          {
            title: 'Commercial Bankers',
            description:
              'Present FDIC membership, NMLS numbers, and lending team contact details in a trust-building layout.',
          },
          {
            title: 'Wealth Management Teams',
            description:
              'Feature RIA registration, ADV disclosure links, and client portal access for high-net-worth client communications.',
          },
        ],
      },
    ],
    cta: {
      title: 'Compliance-Ready Financial Signatures',
      description:
        'Meet FINRA, SEC, and state regulatory requirements with email signatures that protect your firm and impress your clients.',
    },
  },

  // ─── Event Planner ────────────────────────────────────────────────
  {
    slug: 'event-planner',
    category: 'templates',
    meta: {
      title: 'Event Planner Email Signature Template | Siggly',
      description:
        'Eye-catching email signatures for event planners and coordinators. Showcase upcoming events, booking links, and venue partnerships beautifully.',
      keywords: [
        'event planner email signature',
        'event coordinator signature',
        'wedding planner email template',
        'event management branding',
        'booking link signature',
      ],
      canonical: '/email-signature-templates/event-planner',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Templates', url: '/email-signature-templates' },
      {
        name: 'Event Planner',
        url: '/email-signature-templates/event-planner',
      },
    ],
    hero: {
      badge: { icon: 'calendar', text: 'Template' },
      title: 'Event Planner Email Signature Template',
      description:
        'First impressions matter in event planning. This template lets you showcase upcoming events, share booking calendars, and display vendor certifications in a signature that is as polished as the events you produce.',
      variant: 'slate',
    },
    features: [
      {
        icon: 'calendar',
        title: 'Booking Calendar Link',
        description:
          'Include a direct link to your Calendly, Acuity, or custom booking page so prospects can schedule consultations without any back-and-forth.',
      },
      {
        icon: 'image',
        title: 'Event Showcase Banner',
        description:
          'Feature a rotating banner with photos from your latest events to give recipients an immediate sense of your work quality and style.',
      },
      {
        icon: 'star',
        title: 'Review & Testimonial Links',
        description:
          'Link to your Google Reviews, The Knot, or WeddingWire profiles so potential clients can read verified feedback from past events.',
      },
      {
        icon: 'award',
        title: 'Certification Badges',
        description:
          'Display CMP, CSEP, or CWEP certification badges and preferred vendor status with popular venues and caterers.',
      },
      {
        icon: 'sparkles',
        title: 'Social Media Showcase',
        description:
          'Link to your Instagram, Pinterest, and TikTok profiles where your event photography and behind-the-scenes content live.',
      },
    ],
    featuresTitle: 'Features of the Event Planner Template',
    sections: [
      {
        type: 'checklist',
        title: "What's Included",
        items: [
          'Planner name and business logo',
          'Booking calendar button',
          'Event showcase banner with photo rotation',
          'Certification and preferred vendor badges',
          'Review platform links',
          'Instagram and Pinterest profile icons',
        ],
      },
      {
        type: 'use-cases-grid',
        title: 'Who This Template Is For',
        cases: [
          {
            title: 'Wedding Planners',
            description:
              'Showcase your portfolio, link to The Knot profile, and make consultation booking effortless for engaged couples.',
          },
          {
            title: 'Corporate Event Managers',
            description:
              'Present your CMP credentials and corporate portfolio to procurement teams and executive assistants.',
          },
          {
            title: 'Festival Organizers',
            description:
              'Promote upcoming festivals, link to ticket sales, and display sponsor partner logos.',
          },
          {
            title: 'Venue Coordinators',
            description:
              'Feature your venue with banner photos, availability calendars, and virtual tour links.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'My consultation bookings increased by 20% after I added the Calendly link and event photos to my signature. Couples tell me they were sold before we even spoke.',
      authorName: 'Danielle Prescott',
      authorTitle: 'Owner, Prescott Events & Design',
    },
    cta: {
      title: 'Make Every Email an Invitation',
      description:
        'Showcase your events and make booking effortless with a signature designed for planners who set the standard.',
    },
  },

  // ─── Photographer ─────────────────────────────────────────────────
  {
    slug: 'photographer-template',
    category: 'templates',
    meta: {
      title: 'Photographer Email Signature Template | Siggly',
      description:
        'Stunning email signatures for photographers. Feature your best work, link to galleries, and drive bookings with a visually rich signature layout.',
      keywords: [
        'photographer email signature',
        'photography signature template',
        'portfolio email design',
        'photographer branding',
        'gallery link signature',
      ],
      canonical: '/email-signature-templates/photographer-template',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Templates', url: '/email-signature-templates' },
      {
        name: 'Photographer',
        url: '/email-signature-templates/photographer-template',
      },
    ],
    hero: {
      badge: { icon: 'image', text: 'Template' },
      title: 'Photographer Email Signature Template',
      description:
        'Let your images do the talking. This template features a hero image area for your best shot, gallery links, and booking integration in a layout that treats your email signature as a mini portfolio.',
      variant: 'dark',
    },
    features: [
      {
        icon: 'image',
        title: 'Hero Image Area',
        description:
          'Feature your signature shot or latest work as a full-width banner that gives recipients an instant preview of your photographic style.',
      },
      {
        icon: 'folder-open',
        title: 'Gallery & Portfolio Links',
        description:
          'Link directly to your SmugMug, Pixieset, or personal website galleries so clients can browse your full portfolio from any email.',
      },
      {
        icon: 'calendar',
        title: 'Session Booking Button',
        description:
          'Include a booking link to your scheduling tool so prospective clients can reserve sessions without additional emails.',
      },
    ],
    featuresTitle: 'Features of the Photographer Template',
    sections: [
      {
        type: 'prose',
        title: 'Why Photographers Need a Great Email Signature',
        paragraphs: [
          'As a photographer, your visual brand is everything. Every email you send to clients, vendors, and collaborators is an opportunity to reinforce your artistic identity and drive bookings.',
          'A generic text signature undermines the visual excellence you promise in your work. The Siggly photographer template transforms your email footer into a mini portfolio piece that showcases your talent before clients even visit your website.',
          'Whether you shoot weddings, portraits, commercial products, or editorial features, this template adapts to your specialty with customizable galleries, booking links, and social media integration.',
        ],
      },
      {
        type: 'use-cases-grid',
        title: 'Who This Template Is For',
        cases: [
          {
            title: 'Wedding Photographers',
            description:
              'Feature your best couple portraits and link to albums that prospective brides and grooms can share with their planning team.',
          },
          {
            title: 'Commercial Photographers',
            description:
              'Showcase product and brand photography with links to client galleries and licensing information.',
          },
          {
            title: 'Portrait Photographers',
            description:
              'Display your headshot style with a hero image and link to your booking page for sessions.',
          },
          {
            title: 'Photojournalists',
            description:
              'Feature published work, press credentials, and media outlet affiliations alongside your portfolio.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'I switched to the Siggly photographer template and immediately got compliments from clients. One bride told me she chose me over three other photographers because my emails looked the most professional.',
      authorName: 'Carlos Rivera',
      authorTitle: 'Owner, Rivera Wedding Photography',
    },
    faqs: [
      {
        question: 'Can I change the hero image regularly?',
        answer:
          'Yes. You can swap your hero banner image at any time through the Siggly dashboard, and the change propagates instantly to all sent emails going forward.',
      },
      {
        question: 'Which gallery platforms are supported?',
        answer:
          'The template links to any URL, so it works with SmugMug, Pixieset, ShootProof, Zenfolio, Adobe Portfolio, Squarespace, and custom websites.',
      },
      {
        question: 'Will large images slow down email loading?',
        answer:
          'No. Siggly automatically compresses and optimizes images for email delivery, keeping file sizes small without sacrificing visual quality.',
      },
    ],
    cta: {
      title: 'Picture-Perfect Email Signatures',
      description:
        'Transform every email into a portfolio showcase. Build your photographer signature with Siggly.',
    },
  },

  // ─── Coach ─────────────────────────────────────────────────────────
  {
    slug: 'coach',
    category: 'templates',
    meta: {
      title: 'Coach Email Signature Template | Siggly',
      description:
        'Engaging email signatures for life coaches, business coaches, and wellness practitioners. Feature session booking, testimonials, and certification badges.',
      keywords: [
        'coach email signature',
        'life coach signature template',
        'business coach email design',
        'coaching certification signature',
        'session booking signature',
      ],
      canonical: '/email-signature-templates/coach',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Templates', url: '/email-signature-templates' },
      { name: 'Coach', url: '/email-signature-templates/coach' },
    ],
    hero: {
      badge: { icon: 'target', text: 'Template' },
      title: 'Coach Email Signature Template',
      description:
        'Your coaching practice thrives on connection and credibility. This template features session booking links, ICF or NBHWC certification badges, client testimonials, and a warm design that invites prospects to take the next step.',
      variant: 'light',
    },
    features: [
      {
        icon: 'target',
        title: 'Session Booking Integration',
        description:
          'A prominent booking button links to your Calendly, Acuity, or Practice Better page so clients can schedule discovery calls or follow-up sessions instantly.',
      },
      {
        icon: 'award',
        title: 'Coaching Certification Badges',
        description:
          'Display ICF (ACC, PCC, MCC), NBHWC, and other coaching credentials with official badge imagery to build trust with prospective clients.',
      },
      {
        icon: 'message-square',
        title: 'Client Testimonial Snippet',
        description:
          'Include a rotating short testimonial quote from past clients beneath your contact details to provide social proof in every email.',
      },
      {
        icon: 'play-circle',
        title: 'Free Resource CTA',
        description:
          'Promote your free discovery call, lead magnet, ebook, or webinar with a call-to-action banner that drives prospects into your funnel.',
      },
    ],
    featuresTitle: 'Features of the Coach Template',
    sections: [
      {
        type: 'checklist',
        title: "What's Included",
        items: [
          'Coach name, headshot, and tagline',
          'ICF or NBHWC certification badge',
          'Session booking button',
          'Client testimonial snippet area',
          'Free resource or lead magnet CTA',
          'Social media and podcast links',
        ],
      },
      {
        type: 'benefits',
        title: 'How the Coach Template Grows Your Practice',
        items: [
          {
            icon: 'trending-up',
            title: 'Passive Lead Generation',
            description:
              'Every email you send becomes a soft pitch. Booking links and free resource CTAs convert casual contacts into paying clients.',
          },
          {
            icon: 'thumbs-up',
            title: 'Social Proof at Scale',
            description:
              'Rotating testimonials in your signature reinforce your reputation without you having to actively share references.',
          },
          {
            icon: 'sparkles',
            title: 'Personal Brand Consistency',
            description:
              'A polished, branded signature across all your emails creates a cohesive experience that matches your website and social profiles.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Three of my last five clients told me they booked a discovery call because the link was right there in my email. The coach template literally pays for itself.',
      authorName: 'Samantha Reed, PCC',
      authorTitle: 'Executive Leadership Coach',
    },
    faqs: [
      {
        question: 'Can I display my ICF credential badge?',
        answer:
          'Yes. The template supports ICF ACC, PCC, and MCC badge images, as well as NBHWC, BCC, and other coaching organization credentials.',
      },
      {
        question: 'Can I include client testimonials in my signature?',
        answer:
          'Yes. The template has a testimonial snippet area where you can feature short client quotes. You can rotate them periodically for variety.',
      },
      {
        question: 'Does the template work for group coaching practices?',
        answer:
          'Yes. Multi-coach practices can use Siggly to manage individual signatures for each coach while maintaining consistent practice branding across the team.',
      },
      {
        question: 'Can I promote a free ebook or webinar?',
        answer:
          'Yes. The CTA banner area supports links to any landing page, whether it is a free ebook download, webinar registration, or assessment tool.',
      },
    ],
    cta: {
      title: 'Coach Your Email into Shape',
      description:
        'Build a signature that reflects your coaching philosophy and turns every email into a client acquisition opportunity.',
    },
  },

  // ─── Podcast Host ──────────────────────────────────────────────────
  {
    slug: 'podcast-host',
    category: 'templates',
    meta: {
      title: 'Podcast Host Email Signature Template | Siggly',
      description:
        'Dynamic email signatures for podcast hosts and producers. Promote episodes, link to listening platforms, and grow your subscriber base from every email.',
      keywords: [
        'podcast email signature',
        'podcast host signature template',
        'podcaster email design',
        'episode promotion signature',
        'listening platform links',
      ],
      canonical: '/email-signature-templates/podcast-host',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Templates', url: '/email-signature-templates' },
      { name: 'Podcast Host', url: '/email-signature-templates/podcast-host' },
    ],
    hero: {
      badge: { icon: 'headphones', text: 'Template' },
      title: 'Podcast Host Email Signature Template',
      description:
        'Every email you send is a chance to gain a new listener. The podcast host template features episode promotion banners, listening platform links, and subscriber CTAs that transform your email footer into a growth engine for your show.',
      variant: 'violet',
    },
    stats: [
      { value: '300+', label: 'Podcasters using it' },
      { value: '18%', label: 'Avg subscriber lift' },
      { value: '2 min', label: 'Setup time' },
    ],
    features: [
      {
        icon: 'headphones',
        title: 'Latest Episode Banner',
        description:
          'Automatically feature your most recent episode with cover art, title, and a direct play link that updates as you publish new episodes.',
      },
      {
        icon: 'play-circle',
        title: 'Listening Platform Links',
        description:
          'Display Apple Podcasts, Spotify, YouTube, and other platform icons so recipients can subscribe on their preferred app with a single click.',
      },
      {
        icon: 'mail',
        title: 'Newsletter Subscribe CTA',
        description:
          'Include a subscribe button for your podcast newsletter or Substack to capture email addresses and build your audience off-platform.',
      },
    ],
    featuresTitle: 'Features of the Podcast Host Template',
    sections: [
      {
        type: 'checklist',
        title: "What's Included",
        items: [
          'Podcast show name and host name',
          'Show artwork or headshot',
          'Latest episode banner with play link',
          'Apple Podcasts, Spotify, and YouTube icons',
          'Newsletter subscribe CTA button',
          'Guest booking or pitch submission link',
        ],
      },
      {
        type: 'use-cases-grid',
        title: 'Who This Template Is For',
        cases: [
          {
            title: 'Independent Podcasters',
            description:
              'Grow your listener base organically by promoting your show in every email you send to guests, sponsors, and collaborators.',
          },
          {
            title: 'Network Show Hosts',
            description:
              'Maintain personal branding while featuring network affiliation, cross-promotion links, and sponsor acknowledgments.',
          },
          {
            title: 'Podcast Producers',
            description:
              'Promote the shows you produce with rotating banners and links to your full production portfolio.',
          },
          {
            title: 'Video Podcasters',
            description:
              'Include YouTube and Rumble links alongside audio platforms to drive subscribers across all your content channels.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Every guest I email now sees my latest episode right in the signature. Two guests told me they listened to three episodes before our interview because the link was right there.',
      authorName: 'Marcus Webb',
      authorTitle: 'Host, The Growth Playbook Podcast',
    },
    cta: {
      title: 'Amplify Your Podcast from Every Email',
      description:
        'Turn your email signature into a listener acquisition channel. Build your podcast host signature with Siggly.',
    },
  },
];
