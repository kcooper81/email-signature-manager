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
          'Siggly offers a generous free tier that includes the startup template. As your team grows, you can upgrade for advanced features like analytics and centralized management.',
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
];
