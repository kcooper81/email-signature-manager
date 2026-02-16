import type { SEOLandingPageData } from '../types';

export const checklistsPages: SEOLandingPageData[] = [
  // ─── 1. Signature Deployment ───

  {
    slug: 'signature-deployment',
    category: 'checklists',
    meta: {
      title: 'Email Signature Deployment Checklist | Siggly',
      description:
        'Step-by-step email signature deployment checklist. Ensure every employee gets the right signature with zero errors across all platforms.',
      keywords: [
        'email signature deployment',
        'signature rollout checklist',
        'deploy email signatures',
        'signature deployment plan',
      ],
      canonical: '/checklists/signature-deployment',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Checklists', url: '/checklists' },
      { name: 'Signature Deployment', url: '/checklists/signature-deployment' },
    ],
    hero: {
      badge: { icon: 'check-square', text: 'Checklist' },
      title: 'Email Signature Deployment Checklist',
      description:
        'A practical, step-by-step checklist to deploy email signatures across your entire organization without missing a single mailbox or breaking existing configurations.',
      variant: 'emerald',
    },
    stats: [
      { value: '14 Steps', label: 'To a complete deployment' },
      { value: '45 min', label: 'Average time to complete' },
      { value: '92%', label: 'Fewer deployment errors' },
    ],
    features: [
      {
        icon: 'rocket',
        title: 'Pre-Deployment Preparation',
        description:
          'Audit your current signatures, gather stakeholder approvals, and prepare templates before rollout.',
      },
      {
        icon: 'users',
        title: 'User Segmentation',
        description:
          'Ensure each department and role receives the correct signature variant with accurate contact details.',
      },
      {
        icon: 'monitor',
        title: 'Cross-Platform Verification',
        description:
          'Validate signature rendering in Gmail, Outlook, Apple Mail, and mobile clients before going live.',
      },
      {
        icon: 'check-circle',
        title: 'Post-Deployment Validation',
        description:
          'Confirm deployment success with test emails, user feedback loops, and automated compliance checks.',
      },
    ],
    featuresTitle: 'What This Checklist Covers',
    sections: [
      {
        type: 'checklist',
        title: 'Deployment Checklist',
        items: [
          'Audit all existing email signatures across the organization and document current state',
          'Obtain final approval on signature template designs from marketing and leadership',
          'Export a current employee directory with names, titles, departments, and contact details',
          'Verify all employee profile photos meet resolution and format requirements (minimum 100x100px, JPEG or PNG)',
          'Map signature template variants to departments, roles, and office locations',
          'Configure dynamic field placeholders for name, title, phone, and department',
          'Test signature rendering in Gmail web, Outlook desktop, Outlook web, Apple Mail, and Thunderbird',
          'Send test emails to external accounts (Gmail, Yahoo, Outlook.com) to verify external rendering',
          'Test signature display on iOS Mail, Android Gmail, and Samsung Email',
          'Deploy signatures to a pilot group of 5-10 users and collect feedback for 48 hours',
          'Address any rendering issues or data accuracy problems found during the pilot',
          'Schedule the full rollout during low-email-volume hours (early morning or weekend)',
          'Execute organization-wide deployment and monitor error logs in real time',
          'Send a confirmation email to all employees with instructions on verifying their new signature',
        ],
      },
      {
        type: 'how-it-works',
        title: 'Deployment Process Overview',
        steps: [
          {
            step: '01',
            title: 'Prepare & Audit',
            description:
              'Catalog current signatures, gather employee data, finalize template designs, and get stakeholder sign-off.',
          },
          {
            step: '02',
            title: 'Configure & Test',
            description:
              'Map templates to user segments, configure dynamic fields, and test across all major email clients and devices.',
          },
          {
            step: '03',
            title: 'Pilot & Refine',
            description:
              'Deploy to a small test group, collect feedback, fix any issues, and validate rendering one more time.',
          },
          {
            step: '04',
            title: 'Roll Out & Verify',
            description:
              'Execute the full deployment, monitor for errors, confirm with employees, and document the completed rollout.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'This deployment checklist saved us from what could have been a chaotic rollout. We deployed to 800 mailboxes in one afternoon with zero support tickets.',
      authorName: 'Elena Vasquez',
      authorTitle: 'IT Director, Meridian Health Systems',
    },
    faqs: [
      {
        question: 'How long does a full signature deployment take?',
        answer:
          'For a mid-size organization (200-500 employees), plan for 1-2 weeks including template design, testing, piloting, and full rollout. The actual deployment can happen in minutes with centralized tools like Siggly.',
      },
      {
        question: 'Should I deploy all at once or in phases?',
        answer:
          'Phased deployment is recommended. Start with a pilot group of 5-10 users, validate for 48 hours, then roll out department by department. This catches rendering issues before they affect the entire organization.',
      },
      {
        question: 'What if an employee has a custom signature they want to keep?',
        answer:
          'Establish a clear policy before deployment. Most organizations enforce standardized signatures for brand consistency. Communicate the change in advance and provide a timeline for when custom signatures will be replaced.',
      },
      {
        question: 'How do I handle employees who use multiple email clients?',
        answer:
          'Test your signature across all clients in use. With server-side deployment tools, the signature is applied at the mail server level, so it works regardless of which client the employee uses.',
      },
      {
        question: 'What should I do if signatures break after deployment?',
        answer:
          'Have a rollback plan ready. Keep the previous signature version available so you can revert quickly. Use test emails to diagnose the issue, fix the template, and redeploy.',
      },
    ],
    cta: {
      title: 'Automate Your Checklist',
      description:
        'Siggly handles most of these steps automatically. Start free.',
    },
  },

  // ─── 2. Company Rebranding ───

  {
    slug: 'company-rebranding',
    category: 'checklists',
    meta: {
      title: 'Email Signature Rebranding Checklist | Siggly',
      description:
        'Complete checklist for updating email signatures during a company rebrand. Cover logos, colors, legal names, and rollout timing.',
      keywords: [
        'email signature rebrand',
        'rebranding email checklist',
        'update company signature',
        'rebrand email signatures',
      ],
      canonical: '/checklists/company-rebranding',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Checklists', url: '/checklists' },
      { name: 'Company Rebranding', url: '/checklists/company-rebranding' },
    ],
    hero: {
      badge: { icon: 'check-square', text: 'Checklist' },
      title: 'Email Signature Rebranding Checklist',
      description:
        'Everything you need to update every employee email signature when your company rebrands — from new logos to legal entity name changes to coordinated launch day.',
      variant: 'slate',
    },
    stats: [
      { value: '12 Steps', label: 'To a seamless rebrand' },
      { value: '2 weeks', label: 'Recommended lead time' },
      { value: '85%', label: 'Faster with centralized management' },
    ],
    features: [
      {
        icon: 'palette',
        title: 'Brand Asset Updates',
        description:
          'Ensure new logos, colors, and fonts are properly formatted and optimized for email clients.',
      },
      {
        icon: 'file-text',
        title: 'Legal Name Changes',
        description:
          'Update legal entity names, disclaimers, and registration numbers across all signature templates.',
      },
      {
        icon: 'calendar',
        title: 'Coordinated Launch',
        description:
          'Synchronize signature updates with your broader rebrand launch date across all communication channels.',
      },
    ],
    featuresTitle: 'What This Checklist Covers',
    sections: [
      {
        type: 'checklist',
        title: 'Rebranding Checklist',
        items: [
          'Collect all final brand assets: new logo (PNG and SVG), brand colors (hex codes), and approved fonts',
          'Resize logo to email-safe dimensions (max 300px wide, under 50KB) and export in PNG format with transparent background',
          'Update the company name in all signature templates, including any legal entity or trade name changes',
          'Revise the company website URL if the domain has changed',
          'Update all social media profile links to reflect new brand handles or URLs',
          'Rewrite legal disclaimers to reference the new company name and any updated registration details',
          'Update email banner campaigns to use new brand imagery and messaging',
          'Create a before-and-after comparison document for stakeholder approval',
          'Test the new signature in dark mode across Gmail, Outlook, and Apple Mail',
          'Coordinate the signature switch date with your marketing team to align with the public rebrand announcement',
          'Prepare an internal communication explaining the change and what employees should expect',
          'Execute the switch across all mailboxes simultaneously on launch day',
          'Verify that old branding no longer appears in any employee signatures within 24 hours',
          'Archive previous signature templates for compliance and historical records',
        ],
      },
      {
        type: 'prose',
        title: 'Why Rebranding Signatures Matters',
        paragraphs: [
          'Email signatures are among the most visible touchpoints of your brand. When a company rebrands, outdated signatures can undermine the entire effort — sending mixed signals to clients, partners, and prospects who receive emails with the old logo or company name.',
          'A well-coordinated signature rebrand ensures that every outgoing email reinforces the new brand identity from day one. This is especially important for client-facing teams in sales, support, and executive leadership, where brand perception directly impacts trust and revenue.',
          'The most common mistakes during signature rebrands include forgetting to update legal disclaimers, using low-resolution logos that appear blurry, and failing to test in dark mode. This checklist addresses each of these pitfalls so nothing falls through the cracks.',
        ],
      },
    ],
    testimonial: {
      quote:
        'We rebranded across 1,200 employees in a single morning. Having this checklist meant our signatures matched our new website the moment it went live.',
      authorName: 'David Okafor',
      authorTitle: 'Brand Director, Luminary Group',
    },
    faqs: [
      {
        question: 'How far in advance should I prepare for a signature rebrand?',
        answer:
          'Start at least 2 weeks before the public rebrand date. This gives time for asset collection, template design, stakeholder approval, testing, and a pilot rollout.',
      },
      {
        question: 'Should I update signatures before or on the rebrand launch date?',
        answer:
          'Update on launch day, ideally in the early morning before business hours. Premature signature changes can leak the rebrand before the official announcement.',
      },
      {
        question: 'What about signatures in sent emails that already have the old brand?',
        answer:
          'Previously sent emails will retain the old signature. This is normal and expected. Focus on ensuring all future emails carry the new branding.',
      },
      {
        question: 'How do I handle employees who are on leave during the rebrand?',
        answer:
          'With centralized signature management, signatures update automatically regardless of whether the employee is active. For out-of-office auto-replies, update those templates separately.',
      },
    ],
    cta: {
      title: 'Automate Your Checklist',
      description:
        'Siggly handles most of these steps automatically. Start free.',
    },
  },

  // ─── 3. GDPR Compliance ───

  {
    slug: 'gdpr-compliance',
    category: 'checklists',
    meta: {
      title: 'GDPR Email Signature Compliance Checklist | Siggly',
      description:
        'Ensure your email signatures comply with GDPR requirements. Covers lawful basis, data minimization, consent, and right-to-erasure obligations.',
      keywords: [
        'GDPR email signature',
        'GDPR compliance checklist',
        'email signature data protection',
        'GDPR email requirements',
      ],
      canonical: '/checklists/gdpr-compliance',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Checklists', url: '/checklists' },
      { name: 'GDPR Compliance', url: '/checklists/gdpr-compliance' },
    ],
    hero: {
      badge: { icon: 'check-square', text: 'Checklist' },
      title: 'GDPR Email Signature Compliance Checklist',
      description:
        'A practical checklist to ensure your organization\'s email signatures comply with the EU General Data Protection Regulation — covering data minimization, lawful basis, consent, and data subject rights.',
      variant: 'violet',
    },
    stats: [
      { value: '13 Steps', label: 'To full GDPR compliance' },
      { value: '35 min', label: 'Average completion time' },
      { value: '€20M', label: 'Maximum GDPR fine (or 4% of revenue)' },
    ],
    features: [
      {
        icon: 'shield',
        title: 'Lawful Basis Assessment',
        description:
          'Identify whether you rely on legitimate interest, consent, or contractual necessity for personal data in signatures.',
      },
      {
        icon: 'minimize-2',
        title: 'Data Minimization',
        description:
          'Ensure signatures only include personal data that is necessary and proportionate under GDPR Article 5(1)(c).',
      },
      {
        icon: 'eye',
        title: 'Transparency Requirements',
        description:
          'Verify that employees and recipients understand how personal data in signatures is processed.',
      },
      {
        icon: 'trash-2',
        title: 'Right to Erasure',
        description:
          'Establish processes to remove an employee\'s personal data from signatures when they exercise GDPR Article 17 rights.',
      },
    ],
    featuresTitle: 'What This Checklist Covers',
    sections: [
      {
        type: 'checklist',
        title: 'GDPR Compliance Checklist',
        items: [
          'Document the lawful basis (GDPR Article 6) for processing personal data in email signatures — typically legitimate interest or contractual necessity',
          'Conduct a Legitimate Interest Assessment (LIA) if relying on Article 6(1)(f) for including employee data in signatures',
          'Review each data field in your signature template and remove any personal data not strictly necessary (data minimization per Article 5(1)(c))',
          'Verify that employee profile photos in signatures have explicit employee consent, as photos are biometric-adjacent data',
          'Include a privacy notice link in signature templates or ensure employees are informed about signature data processing in their privacy notice',
          'Confirm that your Record of Processing Activities (ROPA) under Article 30 includes email signature data processing',
          'Establish a documented process to update or remove an employee\'s signature data within 30 days of a DSAR (Data Subject Access Request)',
          'Verify that signature data stored in third-party tools (like Siggly) has a valid Data Processing Agreement (DPA) per Article 28',
          'Confirm that employee signature data is not transferred outside the EEA without adequate safeguards (Article 46) or an adequacy decision (Article 45)',
          'Set retention policies for former employee signature data — remove personal data from templates within 30 days of departure',
          'Ensure marketing banners in signatures do not use tracking pixels without proper consent under ePrivacy rules',
          'Document your GDPR compliance measures for email signatures in your internal compliance register',
          'Schedule an annual review of signature data processing practices to align with any GDPR regulatory updates',
        ],
      },
      {
        type: 'benefits',
        title: 'Why GDPR Compliance Matters for Signatures',
        items: [
          {
            icon: 'shield-check',
            title: 'Avoid Fines Up to €20 Million',
            description:
              'GDPR violations can result in fines of up to €20 million or 4% of annual global turnover, whichever is higher. Email signatures that expose unnecessary personal data are a common audit finding.',
          },
          {
            icon: 'heart',
            title: 'Build Employee Trust',
            description:
              'Employees trust employers who handle their personal data responsibly. Transparent signature policies show you take their privacy seriously.',
          },
          {
            icon: 'globe',
            title: 'Enable Cross-Border Communication',
            description:
              'GDPR-compliant signatures ensure your organization can communicate freely with EU-based contacts without regulatory risk.',
          },
          {
            icon: 'file-check',
            title: 'Simplify Audits',
            description:
              'Documented compliance measures make it straightforward to demonstrate GDPR adherence during internal audits or regulator inquiries.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'After a near-miss during a data protection audit, we used this checklist to overhaul every signature in the company. We passed the follow-up review with zero findings.',
      authorName: 'Katrin Hoffmann',
      authorTitle: 'Data Protection Officer, Zephyr Logistics GmbH',
    },
    faqs: [
      {
        question: 'Do email signatures fall under GDPR?',
        answer:
          'Yes. Email signatures contain personal data (name, phone, email, photo) and are subject to GDPR when processing data of EU residents. You need a lawful basis under Article 6 for including this data.',
      },
      {
        question: 'Do I need employee consent for their data in signatures?',
        answer:
          'Not necessarily. Most organizations rely on legitimate interest (Article 6(1)(f)) or contractual necessity (Article 6(1)(b)) rather than consent. However, photos may require explicit consent depending on your DPA interpretation.',
      },
      {
        question: 'What happens if an employee requests their data be removed from signatures?',
        answer:
          'Under Article 17 (right to erasure), you must assess the request. If no overriding legitimate interest exists, remove their personal data from all active signature templates within your stated response timeframe, typically 30 days.',
      },
      {
        question: 'Are tracking pixels in email signatures a GDPR concern?',
        answer:
          'Yes. Tracking pixels in banners or images can constitute processing of personal data (IP addresses, open times). Under ePrivacy and GDPR, you may need consent for non-essential tracking in email signatures.',
      },
      {
        question: 'Does using a third-party signature tool affect GDPR compliance?',
        answer:
          'Yes. Any third-party processor handling employee data must have a Data Processing Agreement (DPA) per Article 28. Verify where data is stored, who has access, and what sub-processors are involved.',
      },
    ],
    cta: {
      title: 'Automate Your Checklist',
      description:
        'Siggly handles most of these steps automatically. Start free.',
    },
  },

  // ─── 4. HIPAA Compliance ───

  {
    slug: 'hipaa-compliance',
    category: 'checklists',
    meta: {
      title: 'HIPAA Email Signature Compliance Checklist | Siggly',
      description:
        'Ensure email signatures at healthcare organizations comply with HIPAA. Covers PHI safeguards, Business Associate Agreements, and required disclaimers.',
      keywords: [
        'HIPAA email signature',
        'HIPAA compliance checklist',
        'healthcare email signature',
        'HIPAA email requirements',
      ],
      canonical: '/checklists/hipaa-compliance',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Checklists', url: '/checklists' },
      { name: 'HIPAA Compliance', url: '/checklists/hipaa-compliance' },
    ],
    hero: {
      badge: { icon: 'check-square', text: 'Checklist' },
      title: 'HIPAA Email Signature Compliance Checklist',
      description:
        'A step-by-step checklist for healthcare organizations to ensure email signatures comply with HIPAA Privacy and Security Rules — including PHI safeguards, BAAs, and mandatory disclaimers.',
      variant: 'indigo',
    },
    stats: [
      { value: '12 Steps', label: 'To HIPAA-compliant signatures' },
      { value: '30 min', label: 'Average completion time' },
      { value: '$1.5M', label: 'Average HIPAA violation penalty' },
    ],
    features: [
      {
        icon: 'lock',
        title: 'PHI Safeguards',
        description:
          'Ensure no Protected Health Information is inadvertently exposed through email signatures or auto-generated content.',
      },
      {
        icon: 'file-text',
        title: 'Required Disclaimers',
        description:
          'Include HIPAA-compliant confidentiality notices on every outgoing email as required by your organization\'s policies.',
      },
      {
        icon: 'briefcase',
        title: 'Business Associate Compliance',
        description:
          'Verify that third-party signature tools have signed Business Associate Agreements (BAAs) per HIPAA requirements.',
      },
    ],
    featuresTitle: 'What This Checklist Covers',
    sections: [
      {
        type: 'checklist',
        title: 'HIPAA Compliance Checklist',
        items: [
          'Verify that email signatures do not contain any Protected Health Information (PHI) — including patient names, medical record numbers, or treatment details',
          'Include a HIPAA-compliant confidentiality disclaimer in every email signature (e.g., "This message may contain confidential health information protected by HIPAA...")',
          'Confirm that your email signature management platform has signed a Business Associate Agreement (BAA) as required under 45 CFR §164.502(e)',
          'Ensure signature data is encrypted in transit (TLS 1.2+) and at rest as required by the HIPAA Security Rule (45 CFR §164.312(a)(2)(iv))',
          'Restrict administrative access to signature templates to authorized personnel only, following the Minimum Necessary Standard (45 CFR §164.502(b))',
          'Configure audit logging for all signature template changes to support HIPAA audit trail requirements (45 CFR §164.312(b))',
          'Verify that employee credentials used for signature management are not shared and use multi-factor authentication',
          'Remove signatures of terminated employees within 24 hours to prevent unauthorized use of organizational credentials',
          'Confirm that any cloud-hosted signature data resides in SOC 2-compliant or HITRUST-certified data centers',
          'Test that confidentiality disclaimers render correctly in all email clients used by your organization',
          'Document your email signature policies in your HIPAA compliance manual and associate them with relevant HIPAA standards',
          'Schedule semi-annual reviews of email signature compliance as part of your broader HIPAA risk assessment process',
        ],
      },
      {
        type: 'how-it-works',
        title: 'HIPAA Signature Compliance Process',
        steps: [
          {
            step: '01',
            title: 'Assess Current State',
            description:
              'Review all existing email signatures for PHI exposure, missing disclaimers, and non-compliant third-party integrations.',
          },
          {
            step: '02',
            title: 'Implement Safeguards',
            description:
              'Add required disclaimers, secure BAAs with vendors, enable encryption, and configure access controls and audit logging.',
          },
          {
            step: '03',
            title: 'Train & Document',
            description:
              'Educate staff on HIPAA email requirements, document all compliance measures, and integrate into your HIPAA compliance program.',
          },
          {
            step: '04',
            title: 'Monitor & Review',
            description:
              'Conduct semi-annual compliance checks, review audit logs, and update signatures when regulations or organizational policies change.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Our compliance officer flagged email signatures as a risk area. This checklist helped us remediate in a week and we sailed through our next OCR audit.',
      authorName: 'Dr. Amara Johnson',
      authorTitle: 'HIPAA Compliance Lead, Coastal Medical Partners',
    },
    faqs: [
      {
        question: 'Are email signatures subject to HIPAA?',
        answer:
          'Email signatures themselves are not PHI, but they are part of emails that may contain PHI. HIPAA requires that all email communications from covered entities include appropriate safeguards and disclaimers.',
      },
      {
        question: 'What should a HIPAA email disclaimer include?',
        answer:
          'A typical HIPAA disclaimer states that the email may contain confidential health information, is intended only for the named recipient, and instructs unintended recipients to delete the message and notify the sender.',
      },
      {
        question: 'Do I need a BAA with my signature management vendor?',
        answer:
          'Yes, if the vendor has access to any data that could be associated with patients or if the vendor processes data on behalf of a covered entity. Under 45 CFR §164.502(e), a BAA is required for any business associate handling PHI-adjacent systems.',
      },
      {
        question: 'Can I include a provider\'s medical credentials in their signature?',
        answer:
          'Yes. Professional credentials (MD, RN, NP) and titles are not PHI. Including them is standard practice and helps establish professional authority in communications.',
      },
      {
        question: 'How often should I review HIPAA signature compliance?',
        answer:
          'At minimum semi-annually, aligned with your broader HIPAA risk assessment cycle. Also review whenever there are regulatory updates, organizational changes, or new email platforms adopted.',
      },
    ],
    cta: {
      title: 'Automate Your Checklist',
      description:
        'Siggly handles most of these steps automatically. Start free.',
    },
  },

  // ─── 5. Signature Design ───

  {
    slug: 'signature-design',
    category: 'checklists',
    meta: {
      title: 'Email Signature Design Checklist | Siggly',
      description:
        'Design professional email signatures with this checklist. Covers layout, typography, color, images, and responsive design best practices.',
      keywords: [
        'email signature design',
        'signature design checklist',
        'professional email signature',
        'email signature best practices',
      ],
      canonical: '/checklists/signature-design',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Checklists', url: '/checklists' },
      { name: 'Signature Design', url: '/checklists/signature-design' },
    ],
    hero: {
      badge: { icon: 'check-square', text: 'Checklist' },
      title: 'Email Signature Design Checklist',
      description:
        'Create polished, professional email signatures by following this design checklist — covering layout structure, typography, color choices, image optimization, and responsive rendering.',
      variant: 'light',
    },
    stats: [
      { value: '15 Steps', label: 'To a pixel-perfect signature' },
      { value: '25 min', label: 'Average completion time' },
      { value: '3x', label: 'Higher engagement with good design' },
    ],
    features: [
      {
        icon: 'layout',
        title: 'Layout & Hierarchy',
        description:
          'Structure your signature with clear visual hierarchy so recipients find contact info instantly.',
      },
      {
        icon: 'type',
        title: 'Typography & Readability',
        description:
          'Choose email-safe fonts and sizes that render consistently across all major email clients.',
      },
      {
        icon: 'image',
        title: 'Image Optimization',
        description:
          'Properly size and compress logos and photos for fast loading without sacrificing quality.',
      },
      {
        icon: 'smartphone',
        title: 'Responsive Design',
        description:
          'Ensure your signature looks great on desktop and mobile with adaptive layout techniques.',
      },
    ],
    featuresTitle: 'What This Checklist Covers',
    sections: [
      {
        type: 'checklist',
        title: 'Design Checklist',
        items: [
          'Limit the signature to 4-6 lines of text to avoid visual clutter and email client clipping',
          'Use a table-based HTML layout (not div-based) for maximum email client compatibility',
          'Set font family to email-safe stacks: Arial, Helvetica, sans-serif or Georgia, Times New Roman, serif',
          'Use font sizes between 12-14px for body text and 10-11px for secondary information like disclaimers',
          'Limit your color palette to 2-3 brand colors and ensure sufficient contrast (WCAG AA ratio of 4.5:1)',
          'Resize your company logo to a maximum of 200px wide and keep file size under 30KB',
          'Compress employee headshot photos to under 20KB and use dimensions of 80x80px to 100x100px',
          'Use absolute URLs (https://) for all images — never embed base64 images in signatures',
          'Add inline CSS styles rather than external stylesheets, which are stripped by most email clients',
          'Include alt text on all images so information is accessible when images are blocked',
          'Set a fixed-width container (max 600px) to prevent the signature from stretching on wide screens',
          'Test the signature with images blocked to ensure contact information remains readable',
          'Limit social media icons to 5 or fewer platforms and use consistent icon dimensions (20x20px)',
          'Add a visual separator (thin line or space) between the email body and the signature',
          'Preview the final signature in both light mode and dark mode across at least 3 email clients',
        ],
      },
      {
        type: 'prose',
        title: 'Design Principles for Email Signatures',
        paragraphs: [
          'Email signature design is more constrained than web design. Email clients strip most CSS, ignore JavaScript entirely, and handle images differently. The best email signatures use simple, table-based HTML with inline styles to ensure consistent rendering.',
          'Visual hierarchy matters. Recipients should be able to identify the sender\'s name, title, and primary contact method in under two seconds. Use font weight, size, and color strategically to create this hierarchy without relying on complex layouts.',
          'Remember that more than 60% of emails are opened on mobile devices. A signature that looks great on a desktop monitor may be unreadable on a phone. Test at viewport widths as narrow as 320px and ensure tap targets (phone numbers, links) are at least 44x44px.',
        ],
      },
    ],
    testimonial: {
      quote:
        'Our old signatures were all over the place — different fonts, different sizes, some with huge logos. This checklist helped us create a clean, unified design in one afternoon.',
      authorName: 'Maya Lindström',
      authorTitle: 'Creative Director, Apex Digital Studio',
    },
    faqs: [
      {
        question: 'What is the ideal size for an email signature?',
        answer:
          'Keep signatures under 600px wide and 150px tall. Total file size (HTML + images) should stay under 100KB. Most recipients see signatures in a narrow preview pane, so compact designs perform best.',
      },
      {
        question: 'Should I use web fonts in email signatures?',
        answer:
          'No. Most email clients do not support web fonts. Stick to email-safe font stacks like Arial, Helvetica, Verdana, or Georgia. These render consistently across all platforms.',
      },
      {
        question: 'How many social media icons should I include?',
        answer:
          'Limit to 3-5 of your most active platforms. Too many icons create visual clutter and reduce click-through rates. Prioritize platforms where your audience is most active.',
      },
      {
        question: 'Can I use animated GIFs in email signatures?',
        answer:
          'Technically yes, but it is not recommended. Animated GIFs increase file size, can look unprofessional, and some email clients (notably Outlook desktop) only show the first frame.',
      },
    ],
    cta: {
      title: 'Automate Your Checklist',
      description:
        'Siggly handles most of these steps automatically. Start free.',
    },
  },

  // ─── 6. Accessibility ───

  {
    slug: 'accessibility',
    category: 'checklists',
    meta: {
      title: 'Email Signature Accessibility Checklist | Siggly',
      description:
        'Make your email signatures accessible to everyone. Covers screen reader support, color contrast, alt text, semantic HTML, and keyboard navigation.',
      keywords: [
        'email signature accessibility',
        'accessible email signature',
        'WCAG email signature',
        'screen reader email signature',
      ],
      canonical: '/checklists/accessibility',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Checklists', url: '/checklists' },
      { name: 'Accessibility', url: '/checklists/accessibility' },
    ],
    hero: {
      badge: { icon: 'check-square', text: 'Checklist' },
      title: 'Email Signature Accessibility Checklist',
      description:
        'Ensure your email signatures are usable by everyone, including people who use screen readers, have low vision, or navigate with keyboards. Follow WCAG guidelines for inclusive design.',
      variant: 'emerald',
    },
    stats: [
      { value: '11 Steps', label: 'To accessible signatures' },
      { value: '20 min', label: 'Average completion time' },
      { value: '15%', label: 'Of users rely on assistive technology' },
    ],
    features: [
      {
        icon: 'eye',
        title: 'Visual Accessibility',
        description:
          'Ensure sufficient color contrast, readable font sizes, and clear visual hierarchy for users with low vision.',
      },
      {
        icon: 'volume-2',
        title: 'Screen Reader Support',
        description:
          'Structure signatures with semantic HTML and descriptive alt text so screen readers convey information accurately.',
      },
      {
        icon: 'type',
        title: 'Text Alternatives',
        description:
          'Provide meaningful text alternatives for all images, icons, and visual elements in the signature.',
      },
    ],
    featuresTitle: 'What This Checklist Covers',
    sections: [
      {
        type: 'checklist',
        title: 'Accessibility Checklist',
        items: [
          'Add descriptive alt text to all images (logo: "Company Name logo", headshot: "Photo of [Name], [Title]")',
          'Verify that all text meets WCAG AA contrast ratio: 4.5:1 for normal text, 3:1 for large text (18px+ or 14px+ bold)',
          'Avoid using color alone to convey information — pair colors with text labels or icons',
          'Use semantic HTML elements (role attributes and proper table structure) to help screen readers parse the signature',
          'Set link text that is descriptive rather than generic ("Visit our website" instead of "Click here")',
          'Ensure all clickable elements (links, phone numbers) have sufficient tap target size of at least 44x44 CSS pixels',
          'Use a minimum font size of 12px for body text and 10px for disclaimers to ensure readability',
          'Test the signature with a screen reader (NVDA, VoiceOver, or JAWS) to verify the reading order is logical',
          'Verify that the signature degrades gracefully when images are blocked — all essential info should remain as text',
          'Avoid using tables for visual layout tricks that would confuse screen readers — keep table structure simple and linear',
          'Add lang attributes to signature HTML when the signature contains text in multiple languages',
        ],
      },
      {
        type: 'benefits',
        title: 'Why Accessible Signatures Matter',
        items: [
          {
            icon: 'users',
            title: 'Reach Every Recipient',
            description:
              'Approximately 1.3 billion people worldwide live with some form of disability. Accessible signatures ensure your message reaches everyone.',
          },
          {
            icon: 'scale',
            title: 'Legal Compliance',
            description:
              'Many jurisdictions require digital accessibility under laws like the ADA, Section 508, and the European Accessibility Act. Accessible emails help you stay compliant.',
          },
          {
            icon: 'heart',
            title: 'Inclusive Brand Image',
            description:
              'Accessibility demonstrates your organization values inclusion, which strengthens your brand reputation with customers and partners.',
          },
          {
            icon: 'zap',
            title: 'Better Usability for Everyone',
            description:
              'Accessibility improvements like clear contrast, readable fonts, and descriptive links benefit all recipients, not just those using assistive technology.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'We had no idea our signatures were unreadable for screen reader users until we ran through this checklist. The fixes were simple but made a huge difference.',
      authorName: 'Tomás Reyes',
      authorTitle: 'Accessibility Lead, Evergreen Financial Services',
    },
    faqs: [
      {
        question: 'Do email signatures need to be WCAG compliant?',
        answer:
          'While WCAG is primarily a web standard, accessibility best practices apply to any digital content. Organizations subject to ADA, Section 508, or the European Accessibility Act should make signatures accessible.',
      },
      {
        question: 'How do I test my signature with a screen reader?',
        answer:
          'Send a test email to yourself and open it with a screen reader enabled. On Mac, use VoiceOver (Cmd+F5). On Windows, use NVDA (free) or JAWS. Listen to how the signature reads and fix any confusing or missing information.',
      },
      {
        question: 'What alt text should I use for a company logo?',
        answer:
          'Use the company name followed by "logo" — for example, "Siggly logo". Avoid generic alt text like "image" or "logo" without the company name.',
      },
      {
        question: 'Should I remove decorative images from signatures for accessibility?',
        answer:
          'You do not need to remove them, but set their alt text to an empty string (alt="") so screen readers skip them. This prevents screen readers from reading out file names or "image" for decorative elements.',
      },
    ],
    cta: {
      title: 'Automate Your Checklist',
      description:
        'Siggly handles most of these steps automatically. Start free.',
    },
  },

  // ─── 7. Security Audit ───

  {
    slug: 'security-audit',
    category: 'checklists',
    meta: {
      title: 'Email Signature Security Audit Checklist | Siggly',
      description:
        'Audit your email signatures for security vulnerabilities. Covers link validation, image hosting, SPF/DKIM alignment, and phishing prevention.',
      keywords: [
        'email signature security audit',
        'signature security checklist',
        'email signature vulnerabilities',
        'secure email signatures',
      ],
      canonical: '/checklists/security-audit',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Checklists', url: '/checklists' },
      { name: 'Security Audit', url: '/checklists/security-audit' },
    ],
    hero: {
      badge: { icon: 'check-square', text: 'Checklist' },
      title: 'Email Signature Security Audit Checklist',
      description:
        'Identify and eliminate security vulnerabilities in your organization\'s email signatures. Covers link integrity, image hosting, authentication alignment, and anti-phishing measures.',
      variant: 'slate',
    },
    stats: [
      { value: '13 Steps', label: 'For a thorough security audit' },
      { value: '40 min', label: 'Average audit duration' },
      { value: '76%', label: 'Of phishing uses forged sender identity' },
    ],
    features: [
      {
        icon: 'link',
        title: 'Link Integrity',
        description:
          'Verify every link in your signatures points to legitimate, HTTPS-secured destinations with no redirects to suspicious domains.',
      },
      {
        icon: 'server',
        title: 'Image Hosting Security',
        description:
          'Ensure signature images are hosted on secure, organization-controlled domains — not third-party services that could be compromised.',
      },
      {
        icon: 'shield',
        title: 'Authentication Alignment',
        description:
          'Confirm SPF, DKIM, and DMARC records align with your signature deployment to prevent spoofing.',
      },
    ],
    featuresTitle: 'What This Checklist Covers',
    sections: [
      {
        type: 'checklist',
        title: 'Security Audit Checklist',
        items: [
          'Verify all URLs in signatures use HTTPS — flag any HTTP links for immediate replacement',
          'Check that every link destination matches its displayed text (no misleading anchor text)',
          'Confirm all image hosting domains are owned or controlled by your organization',
          'Validate that image hosting servers have valid SSL certificates with no expiration warnings',
          'Test all links for redirect chains that could be exploited by attackers to swap destinations',
          'Verify SPF records include the IP addresses used by your signature deployment platform',
          'Confirm DKIM signing is active and aligned with the From domain for all outgoing emails',
          'Check that DMARC policy is set to at least "quarantine" (ideally "reject") for your domain',
          'Audit who has administrative access to your signature management platform and remove unnecessary accounts',
          'Verify that admin accounts use multi-factor authentication (MFA) and strong unique passwords',
          'Check for any hard-coded employee personal email addresses or personal phone numbers that could be exploited',
          'Test signature HTML for hidden elements or invisible tracking that was not intentionally added',
          'Document all findings, assign remediation owners, and schedule follow-up verification within 14 days',
        ],
      },
      {
        type: 'how-it-works',
        title: 'Security Audit Process',
        steps: [
          {
            step: '01',
            title: 'Inventory & Scope',
            description:
              'Catalog all active signature templates, identify all embedded links and images, and define the audit scope.',
          },
          {
            step: '02',
            title: 'Link & Image Analysis',
            description:
              'Test every URL for HTTPS compliance, redirect chains, and domain ownership. Verify image hosting security.',
          },
          {
            step: '03',
            title: 'Authentication Review',
            description:
              'Validate SPF, DKIM, and DMARC configuration to ensure sent emails with your signature pass authentication checks.',
          },
          {
            step: '04',
            title: 'Access Control Audit',
            description:
              'Review admin permissions, enforce MFA, remove stale accounts, and document findings with remediation timelines.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'We found three expired SSL certificates and two redirect vulnerabilities in our signatures. This audit checklist helped us fix them before they became real incidents.',
      authorName: 'Raj Patel',
      authorTitle: 'CISO, Vanguard Manufacturing',
    },
    faqs: [
      {
        question: 'How often should I audit email signature security?',
        answer:
          'Conduct a full security audit quarterly and a quick link/image check monthly. Also audit immediately after any infrastructure changes, domain migrations, or security incidents.',
      },
      {
        question: 'Can email signatures be used in phishing attacks?',
        answer:
          'Yes. Attackers can spoof signatures to impersonate employees. They can also exploit compromised image hosting to swap legitimate images with malicious content. Regular audits help detect these risks.',
      },
      {
        question: 'Should signature images be self-hosted or use a CDN?',
        answer:
          'Use your organization\'s controlled CDN or web server. Avoid free third-party image hosting services where you have no control over content integrity or uptime.',
      },
      {
        question: 'What SPF/DKIM/DMARC settings affect signatures?',
        answer:
          'These authentication protocols verify that emails are legitimately from your domain. If your signature deployment tool sends emails from a different IP, that IP must be included in your SPF record to avoid delivery failures.',
      },
    ],
    cta: {
      title: 'Automate Your Checklist',
      description:
        'Siggly handles most of these steps automatically. Start free.',
    },
  },

  // ─── 8. Google Workspace Setup ───

  {
    slug: 'google-workspace-setup',
    category: 'checklists',
    meta: {
      title: 'Google Workspace Signature Setup Checklist | Siggly',
      description:
        'Step-by-step checklist for setting up email signatures in Google Workspace. Covers Admin Console, Gmail settings, organizational units, and routing rules.',
      keywords: [
        'Google Workspace email signature',
        'Gmail signature setup',
        'Google Admin Console signature',
        'Google Workspace signature management',
      ],
      canonical: '/checklists/google-workspace-setup',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Checklists', url: '/checklists' },
      { name: 'Google Workspace Setup', url: '/checklists/google-workspace-setup' },
    ],
    hero: {
      badge: { icon: 'check-square', text: 'Checklist' },
      title: 'Google Workspace Signature Setup Checklist',
      description:
        'Configure and deploy professional email signatures across your Google Workspace organization. Covers Admin Console settings, organizational units, Gmail append signatures, and third-party integration options.',
      variant: 'violet',
    },
    stats: [
      { value: '12 Steps', label: 'To fully configured signatures' },
      { value: '30 min', label: 'Average setup time' },
      { value: '100%', label: 'Coverage across all users' },
    ],
    features: [
      {
        icon: 'settings',
        title: 'Admin Console Configuration',
        description:
          'Use Google Admin Console\'s "Append footer" feature to set organization-wide signatures without relying on individual user settings.',
      },
      {
        icon: 'git-branch',
        title: 'Organizational Unit Mapping',
        description:
          'Assign different signature templates to different OUs so each department gets the right signature automatically.',
      },
      {
        icon: 'mail',
        title: 'Gmail Integration',
        description:
          'Understand how Admin Console signatures interact with user-set Gmail signatures and how to manage both.',
      },
    ],
    featuresTitle: 'What This Checklist Covers',
    sections: [
      {
        type: 'checklist',
        title: 'Google Workspace Setup Checklist',
        items: [
          'Log into Google Admin Console (admin.google.com) with a Super Admin or Groups Admin account',
          'Navigate to Apps > Google Workspace > Gmail > Compliance and locate the "Append footer" setting',
          'Create organizational units (OUs) in Admin Console > Directory > Organizational Units for each department or signature variant',
          'Assign users to the correct organizational units based on their department and signature template needs',
          'Design your HTML signature template using inline CSS only — Google strips external stylesheets and most CSS classes',
          'Test that your HTML uses only Google-supported CSS properties: color, font-family, font-size, font-weight, text-decoration, and basic table styling',
          'Upload signature images to a publicly accessible HTTPS URL (Google Drive shared images often get blocked — use a proper hosting solution)',
          'Configure the "Append footer" setting for each OU with the appropriate HTML signature template',
          'Verify that the "Append footer" checkbox "Append the footer to messages from users in my organization only" is configured correctly for internal vs. external emails',
          'Send test emails from accounts in each OU to both internal and external recipients to verify signature rendering',
          'Check that user-level Gmail signatures (Settings > Signature) do not conflict with Admin Console appended signatures',
          'Document the setup, including OU mappings and template versions, and share with your IT team for ongoing maintenance',
        ],
      },
      {
        type: 'prose',
        title: 'Understanding Google Workspace Signatures',
        paragraphs: [
          'Google Workspace offers two ways to manage email signatures: user-level signatures set in Gmail settings, and organization-level signatures configured via the Admin Console\'s "Append footer" feature. For centralized management, the Admin Console approach is recommended because it enforces consistency without relying on individual users.',
          'One important limitation: Google\'s "Append footer" feature adds the signature as a plain footer appended below the user\'s Gmail signature. This means if users also have a personal Gmail signature enabled, both will appear. Most organizations either disable user-level signatures via a policy or use a third-party tool like Siggly that injects signatures server-side before sending.',
          'Image hosting is a common pain point with Google Workspace signatures. Images hosted on Google Drive using sharing links are frequently blocked by external email clients. Always host signature images on a proper web server or CDN with a direct HTTPS URL.',
        ],
      },
    ],
    testimonial: {
      quote:
        'We struggled with Google Workspace signatures for months — images not loading, footers duplicating. This checklist solved every issue in a single afternoon.',
      authorName: 'Sarah Chen',
      authorTitle: 'IT Manager, Pinnacle Education Group',
    },
    faqs: [
      {
        question: 'Can Google Admin Console set different signatures per department?',
        answer:
          'Yes. Use organizational units (OUs) to group users by department, then assign different "Append footer" templates to each OU. Each OU can have its own signature HTML.',
      },
      {
        question: 'Why are my signature images not showing for external recipients?',
        answer:
          'This usually happens when images are hosted on Google Drive with share links. External email clients often block these URLs. Host images on a dedicated web server or CDN with direct HTTPS URLs instead.',
      },
      {
        question: 'Does the Admin Console signature override the user\'s Gmail signature?',
        answer:
          'No. The "Append footer" adds a separate footer below the user\'s Gmail signature. If users have their own signature set, both will display. Disable user-level signatures or use a tool that replaces them entirely.',
      },
      {
        question: 'Can I use dynamic fields like employee name in Google Admin signatures?',
        answer:
          'Google\'s built-in "Append footer" does not support dynamic user fields. To insert per-user data (name, title, phone), you need a third-party signature management tool that integrates with Google Workspace directory.',
      },
      {
        question: 'How do Google Workspace signatures work on mobile?',
        answer:
          'Admin Console "Append footer" signatures are added server-side, so they appear in all emails regardless of the device. However, the user-level Gmail mobile app signature is separate and must be configured independently.',
      },
    ],
    cta: {
      title: 'Automate Your Checklist',
      description:
        'Siggly handles most of these steps automatically. Start free.',
    },
  },

  // ─── 9. Microsoft 365 Setup ───

  {
    slug: 'microsoft-365-setup',
    category: 'checklists',
    meta: {
      title: 'Microsoft 365 Signature Setup Checklist | Siggly',
      description:
        'Step-by-step checklist for configuring email signatures in Microsoft 365. Covers Exchange Online transport rules, OWA settings, and Outlook client deployment.',
      keywords: [
        'Microsoft 365 email signature',
        'Exchange Online signature',
        'Outlook signature setup',
        'M365 signature management',
      ],
      canonical: '/checklists/microsoft-365-setup',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Checklists', url: '/checklists' },
      { name: 'Microsoft 365 Setup', url: '/checklists/microsoft-365-setup' },
    ],
    hero: {
      badge: { icon: 'check-square', text: 'Checklist' },
      title: 'Microsoft 365 Signature Setup Checklist',
      description:
        'Deploy email signatures across your Microsoft 365 tenant using Exchange Online transport rules, Outlook client settings, and Entra ID integration for dynamic user data.',
      variant: 'indigo',
    },
    stats: [
      { value: '14 Steps', label: 'To complete M365 setup' },
      { value: '40 min', label: 'Average configuration time' },
      { value: '100%', label: 'Coverage across Outlook and OWA' },
    ],
    features: [
      {
        icon: 'server',
        title: 'Exchange Online Transport Rules',
        description:
          'Use mail flow rules (transport rules) in Exchange Admin Center to append signatures server-side to all outgoing emails.',
      },
      {
        icon: 'user',
        title: 'Entra ID Integration',
        description:
          'Pull user attributes (name, title, department, phone) from Microsoft Entra ID to populate dynamic signature fields.',
      },
      {
        icon: 'monitor',
        title: 'Outlook & OWA Deployment',
        description:
          'Configure signatures that work across Outlook desktop, Outlook mobile, Outlook for Mac, and Outlook Web Access.',
      },
    ],
    featuresTitle: 'What This Checklist Covers',
    sections: [
      {
        type: 'checklist',
        title: 'Microsoft 365 Setup Checklist',
        items: [
          'Log into the Exchange Admin Center (admin.exchange.microsoft.com) with Exchange Administrator or Global Admin credentials',
          'Navigate to Mail flow > Rules and create a new transport rule for email signature injection',
          'Set the rule condition to "Apply to messages sent to: Outside the organization" for external email signatures',
          'Use the "Apply a disclaimer" action with "Append" to add your HTML signature template',
          'Insert Active Directory attributes (%%DisplayName%%, %%Title%%, %%Department%%, %%PhoneNumber%%) for dynamic user data',
          'Verify Entra ID (formerly Azure AD) user profiles have complete and accurate attribute data for all employees',
          'Configure the fallback action to "Wrap" rather than "Ignore" so signatures are applied even when encryption is active',
          'Create separate transport rules for different user groups using distribution lists or dynamic groups as conditions',
          'Test the transport rule by sending emails from multiple users to external addresses and verifying signature content',
          'Configure Outlook Web Access (OWA) signature settings in Exchange Admin Center under Settings > Mail > Compose and reply',
          'Deploy Outlook desktop signatures via Group Policy or Microsoft Intune for managed devices',
          'Disable user-level signature editing in Outlook if you want to enforce centralized signatures only',
          'Test signature rendering in Outlook desktop (Windows), Outlook for Mac, Outlook mobile (iOS/Android), and OWA',
          'Document transport rule configurations, Entra ID attribute mappings, and deployment scope for IT handoff',
        ],
      },
      {
        type: 'how-it-works',
        title: 'Microsoft 365 Signature Architecture',
        steps: [
          {
            step: '01',
            title: 'Directory Sync',
            description:
              'Ensure Entra ID user profiles contain accurate name, title, department, and phone attributes. These fields populate your signature templates dynamically.',
          },
          {
            step: '02',
            title: 'Transport Rule Setup',
            description:
              'Create mail flow rules in Exchange Admin Center that append HTML signatures to outgoing emails, using AD attributes for personalization.',
          },
          {
            step: '03',
            title: 'Client Configuration',
            description:
              'Configure Outlook desktop via Group Policy or Intune, OWA via Exchange settings, and test across Outlook mobile apps.',
          },
          {
            step: '04',
            title: 'Governance & Testing',
            description:
              'Disable unauthorized user edits, test signatures from multiple users across all clients, and document the full configuration.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Exchange transport rules seemed daunting at first, but this checklist broke it down into manageable steps. Our M365 signatures were live across 2,000 users within a day.',
      authorName: 'Michael Brennan',
      authorTitle: 'Cloud Infrastructure Lead, Sterling & Associates',
    },
    faqs: [
      {
        question: 'Can Exchange Online transport rules add per-user signatures?',
        answer:
          'Yes. Transport rules support Active Directory attribute placeholders like %%DisplayName%% and %%Title%%, which pull each user\'s data from Entra ID to create personalized signatures.',
      },
      {
        question: 'Do transport rule signatures appear in the Outlook compose window?',
        answer:
          'No. Transport rules apply signatures server-side after the email is sent, so users do not see the signature while composing. This can confuse users. Consider using a client-side tool alongside transport rules for compose-time preview.',
      },
      {
        question: 'How do I handle different signatures for internal vs. external emails?',
        answer:
          'Create two transport rules: one scoped to "messages sent outside the organization" with a full signature, and one for "messages sent inside the organization" with a simpler internal signature or no signature.',
      },
      {
        question: 'What happens if Entra ID attributes are missing for a user?',
        answer:
          'If an attribute placeholder (e.g., %%Title%%) is empty in Entra ID, the transport rule will insert a blank space. Clean up your directory data before deploying signatures to avoid empty fields.',
      },
      {
        question: 'Can I deploy signatures to Outlook mobile apps via transport rules?',
        answer:
          'Yes. Transport rules are applied server-side, so they work for all clients including Outlook mobile. However, Outlook mobile also has its own signature setting, which may duplicate the signature. Disable the Outlook mobile signature via Intune to prevent this.',
      },
    ],
    cta: {
      title: 'Automate Your Checklist',
      description:
        'Siggly handles most of these steps automatically. Start free.',
    },
  },

  // ─── 10. New Employee Onboarding ───

  {
    slug: 'new-employee-onboarding',
    category: 'checklists',
    meta: {
      title: 'New Employee Signature Onboarding Checklist | Siggly',
      description:
        'Onboard new employees with the correct email signature from day one. Covers directory setup, template assignment, verification, and training.',
      keywords: [
        'new employee email signature',
        'onboarding signature checklist',
        'employee signature setup',
        'new hire email signature',
      ],
      canonical: '/checklists/new-employee-onboarding',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Checklists', url: '/checklists' },
      { name: 'New Employee Onboarding', url: '/checklists/new-employee-onboarding' },
    ],
    hero: {
      badge: { icon: 'check-square', text: 'Checklist' },
      title: 'New Employee Signature Onboarding Checklist',
      description:
        'Ensure every new hire has a professional, brand-compliant email signature configured and tested before they send their first email. From HR data entry to signature verification.',
      variant: 'light',
    },
    stats: [
      { value: '10 Steps', label: 'Per new employee' },
      { value: '15 min', label: 'Average setup time per hire' },
      { value: '100%', label: 'Day-one signature compliance' },
    ],
    features: [
      {
        icon: 'user-plus',
        title: 'Profile Setup',
        description:
          'Collect and verify employee details — name, title, department, phone, and photo — before creating their signature.',
      },
      {
        icon: 'git-branch',
        title: 'Template Assignment',
        description:
          'Map the new employee to the correct signature template based on their department, role, and location.',
      },
      {
        icon: 'check-circle',
        title: 'Verification & Training',
        description:
          'Test the signature, confirm rendering across clients, and brief the employee on signature policies.',
      },
    ],
    featuresTitle: 'What This Checklist Covers',
    sections: [
      {
        type: 'checklist',
        title: 'New Employee Onboarding Checklist',
        items: [
          'Confirm the employee\'s official display name, job title, department, direct phone number, and office location with HR',
          'Verify spelling of the employee\'s name, including any diacritical marks, preferred name, and pronouns if company policy includes them',
          'Obtain a professional headshot photo that meets signature standards (minimum 100x100px, JPEG/PNG, under 20KB)',
          'Add the employee to the correct organizational unit or group in your directory (Entra ID, Google Workspace, or LDAP)',
          'Assign the department-appropriate signature template in your signature management tool',
          'Populate all dynamic fields and verify the preview matches expected output',
          'Send a test email from the new employee\'s account to an internal address and an external address',
          'Verify the signature renders correctly in the email clients the employee will use (Outlook, Gmail, mobile)',
          'Provide the employee with a brief overview of your email signature policy (what they can and cannot customize)',
          'Add the employee to the signature update distribution list so they receive future change notifications',
        ],
      },
      {
        type: 'benefits',
        title: 'Why Day-One Signatures Matter',
        items: [
          {
            icon: 'zap',
            title: 'Professional First Impressions',
            description:
              'A new employee\'s first emails set the tone. A polished, branded signature shows clients and partners they are dealing with a professional organization.',
          },
          {
            icon: 'shield',
            title: 'Immediate Brand Compliance',
            description:
              'Without a process, new hires often create ad-hoc signatures with wrong logos, incorrect titles, or missing disclaimers. A checklist prevents this entirely.',
          },
          {
            icon: 'clock',
            title: 'Reduced IT Burden',
            description:
              'A standardized onboarding process means IT spends 15 minutes per hire instead of fielding support tickets for weeks after start dates.',
          },
          {
            icon: 'refresh-cw',
            title: 'Consistent Process at Scale',
            description:
              'Whether you hire 5 or 50 people per month, the same checklist ensures every new employee gets the same quality setup.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Before this checklist, new hires would go weeks with a blank signature or a sloppy one they made themselves. Now every new employee is set up before their first meeting.',
      authorName: 'Lisa Fontaine',
      authorTitle: 'People Operations Manager, Horizon SaaS Inc.',
    },
    faqs: [
      {
        question: 'When should the signature be set up — before or after the employee starts?',
        answer:
          'Set up the signature before the employee\'s first day so it is ready when they send their first email. Include signature setup in your IT onboarding checklist alongside account provisioning.',
      },
      {
        question: 'What if the employee\'s headshot is not ready on day one?',
        answer:
          'Deploy the signature without a photo initially and add it within the first week. Most signature tools allow you to update individual user photos without redeploying the entire signature.',
      },
      {
        question: 'Should new employees be able to edit their own signature?',
        answer:
          'Most organizations enforce centralized signatures to maintain brand consistency. If you allow limited customization (such as adding pronouns), communicate what is and is not editable during onboarding.',
      },
      {
        question: 'How do I handle contractors or temporary employees?',
        answer:
          'Create a separate signature template for contractors that indicates their role (e.g., "Contractor" or "Consultant"). Set an expiration reminder to remove their signature when the contract ends.',
      },
    ],
    cta: {
      title: 'Automate Your Checklist',
      description:
        'Siggly handles most of these steps automatically. Start free.',
    },
  },

  // ─── 11. Quarterly Signature Audit ───

  {
    slug: 'quarterly-signature-audit',
    category: 'checklists',
    meta: {
      title: 'Quarterly Email Signature Audit Checklist | Siggly',
      description:
        'Run a quarterly email signature audit with this checklist. Covers data accuracy, brand consistency, link validation, compliance, and stale accounts.',
      keywords: [
        'email signature audit',
        'quarterly signature review',
        'signature compliance audit',
        'email signature maintenance',
      ],
      canonical: '/checklists/quarterly-signature-audit',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Checklists', url: '/checklists' },
      { name: 'Quarterly Audit', url: '/checklists/quarterly-signature-audit' },
    ],
    hero: {
      badge: { icon: 'check-square', text: 'Checklist' },
      title: 'Quarterly Email Signature Audit Checklist',
      description:
        'A systematic checklist to review and validate every email signature in your organization each quarter. Catch outdated information, broken links, and compliance drift before they become problems.',
      variant: 'emerald',
    },
    stats: [
      { value: '12 Steps', label: 'Per quarterly audit' },
      { value: '60 min', label: 'Average audit duration' },
      { value: '34%', label: 'Of signatures have errors after 90 days' },
    ],
    features: [
      {
        icon: 'search',
        title: 'Data Accuracy Review',
        description:
          'Check that employee names, titles, phone numbers, and departments are current after role changes and promotions.',
      },
      {
        icon: 'palette',
        title: 'Brand Consistency Check',
        description:
          'Verify that all signatures match current brand guidelines, including any updates made since the last audit.',
      },
      {
        icon: 'link-2',
        title: 'Link & Asset Validation',
        description:
          'Test every link, image URL, and social profile to confirm they are live, correct, and secure.',
      },
    ],
    featuresTitle: 'What This Checklist Covers',
    sections: [
      {
        type: 'checklist',
        title: 'Quarterly Audit Checklist',
        items: [
          'Pull a current employee roster from HR and compare it against active signature accounts — flag any mismatches',
          'Identify employees who changed titles, departments, or contact details since the last audit and update their signatures',
          'Remove or deactivate signatures for employees who have left the organization since the last audit',
          'Verify that the company logo in all signatures matches the current approved version (check file hash or URL)',
          'Test all website URLs in signatures to confirm they resolve correctly with no 404 errors or unexpected redirects',
          'Verify all social media profile links point to active, current company profiles',
          'Check that legal disclaimers are up to date with any regulatory changes from the past quarter',
          'Test signature rendering in the latest versions of Gmail, Outlook, and Apple Mail (clients update frequently)',
          'Review banner campaigns and remove or update any that reference expired promotions or past events',
          'Validate that signature images load correctly and have not been broken by hosting changes',
          'Spot-check 10 random employee signatures by requesting a test email to verify real-world accuracy',
          'Document audit findings, create remediation tickets for any issues, and record completion date for compliance records',
        ],
      },
      {
        type: 'how-it-works',
        title: 'Audit Process Flow',
        steps: [
          {
            step: '01',
            title: 'Data Sync',
            description:
              'Compare your HR system\'s current employee data with the signature management platform to identify discrepancies in names, titles, and contact info.',
          },
          {
            step: '02',
            title: 'Visual & Link Review',
            description:
              'Inspect logos, images, and links across all templates. Test rendering in current email client versions and flag any visual or functional issues.',
          },
          {
            step: '03',
            title: 'Compliance & Campaign Check',
            description:
              'Verify legal disclaimers reflect current regulations and marketing banners promote active campaigns only.',
          },
          {
            step: '04',
            title: 'Document & Remediate',
            description:
              'Record all findings, assign fix owners, set a 14-day remediation deadline, and log the audit for compliance documentation.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Our first quarterly audit found 23% of signatures had outdated titles and 8 broken social links. We now catch these issues every quarter before clients notice.',
      authorName: 'Jordan Kessler',
      authorTitle: 'Operations Director, Atlas Consulting Group',
    },
    faqs: [
      {
        question: 'Why quarterly and not annually?',
        answer:
          'Organizations experience significant employee turnover, role changes, and brand updates each quarter. Annual audits leave too large a window for outdated or non-compliant signatures to circulate.',
      },
      {
        question: 'How many signatures should I spot-check?',
        answer:
          'Check at least 10% of your signatures or a minimum of 10, whichever is larger. Focus on recently changed employees, new hires from the past quarter, and executives whose signatures are most visible.',
      },
      {
        question: 'Can this audit be automated?',
        answer:
          'Partially. Tools like Siggly can automatically sync directory data and validate links. However, visual rendering checks and compliance reviews benefit from human judgment.',
      },
      {
        question: 'Who should own the quarterly audit?',
        answer:
          'Typically IT or Marketing, depending on your organization. The owner should have access to the employee directory, signature management platform, and brand guidelines.',
      },
    ],
    cta: {
      title: 'Automate Your Checklist',
      description:
        'Siggly handles most of these steps automatically. Start free.',
    },
  },

  // ─── 12. Banner Campaign Launch ───

  {
    slug: 'banner-campaign-launch',
    category: 'checklists',
    meta: {
      title: 'Email Banner Campaign Launch Checklist | Siggly',
      description:
        'Launch email signature banner campaigns with this checklist. Covers design specs, targeting, scheduling, tracking, and performance measurement.',
      keywords: [
        'email banner campaign',
        'signature banner checklist',
        'email signature marketing',
        'banner campaign launch',
      ],
      canonical: '/checklists/banner-campaign-launch',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Checklists', url: '/checklists' },
      { name: 'Banner Campaign Launch', url: '/checklists/banner-campaign-launch' },
    ],
    hero: {
      badge: { icon: 'check-square', text: 'Checklist' },
      title: 'Email Banner Campaign Launch Checklist',
      description:
        'Plan, design, deploy, and measure email signature banner campaigns with this comprehensive checklist. From creative specs to UTM tracking to post-campaign analysis.',
      variant: 'slate',
    },
    stats: [
      { value: '13 Steps', label: 'To launch a banner campaign' },
      { value: '35 min', label: 'Average preparation time' },
      { value: '2-5%', label: 'Typical banner click-through rate' },
    ],
    features: [
      {
        icon: 'image',
        title: 'Creative Specifications',
        description:
          'Ensure banner images meet size, format, and brand requirements for consistent rendering across email clients.',
      },
      {
        icon: 'target',
        title: 'Audience Targeting',
        description:
          'Select which employee groups display the banner based on department, region, or customer-facing status.',
      },
      {
        icon: 'bar-chart-2',
        title: 'Performance Tracking',
        description:
          'Set up UTM parameters, click tracking, and dashboards to measure campaign effectiveness in real time.',
      },
    ],
    featuresTitle: 'What This Checklist Covers',
    sections: [
      {
        type: 'checklist',
        title: 'Banner Campaign Launch Checklist',
        items: [
          'Define the campaign objective: event promotion, content download, product launch, webinar registration, or general branding',
          'Design the banner image at 600px wide by 100-150px tall in PNG or JPG format, keeping file size under 40KB',
          'Include a clear call-to-action on the banner: "Register Now", "Download the Report", "Learn More", or similar',
          'Create a dedicated landing page for the campaign that matches the banner\'s messaging and visual style',
          'Add UTM parameters to the banner link: utm_source=email_signature, utm_medium=banner, utm_campaign=[campaign-name]',
          'Set up click tracking in your analytics platform (Google Analytics, HubSpot, etc.) and verify the tracking fires correctly',
          'Select the target employee groups who will display the banner (e.g., sales team only, all customer-facing staff, entire organization)',
          'Set campaign start and end dates in your signature management tool to automate banner activation and removal',
          'Test the banner in Gmail, Outlook desktop, Outlook web, and Apple Mail to verify rendering and link functionality',
          'Test the banner on mobile email clients (iOS Mail, Android Gmail) to confirm it is readable at small screen widths',
          'Get final approval from marketing and legal teams on banner creative and landing page content',
          'Deploy the banner to the selected employee group and verify it appears in live emails within 1 hour',
          'Schedule a post-campaign review for 48 hours after launch to check click-through rates and resolve any issues',
        ],
      },
      {
        type: 'prose',
        title: 'Maximizing Banner Campaign ROI',
        paragraphs: [
          'Email signature banners are one of the most cost-effective marketing channels available. With an average organization sending thousands of emails per day, each one becomes a micro-impression for your campaign. Unlike paid ads, there is no per-click cost — you are leveraging existing email volume.',
          'The most successful banner campaigns share three traits: a compelling visual, a single clear CTA, and a relevant landing page. Avoid cramming too much information into the banner. One message, one action, one destination.',
          'Timing matters. Rotate banners every 2-4 weeks to prevent banner blindness. If you run the same banner for months, click-through rates will plummet. Keep a campaign calendar and plan banner rotations in advance.',
        ],
      },
    ],
    testimonial: {
      quote:
        'Our signature banner campaign for a product launch drove 340 clicks in the first week — more than our paid social ads. This checklist made the setup painless.',
      authorName: 'Nadia Osei',
      authorTitle: 'Growth Marketing Manager, Veritas Analytics',
    },
    faqs: [
      {
        question: 'What is the ideal banner size for email signatures?',
        answer:
          'The standard is 600px wide by 100-150px tall. Keep file size under 40KB for fast loading. Use PNG for graphics with text and JPEG for photographic images.',
      },
      {
        question: 'How often should I rotate signature banners?',
        answer:
          'Every 2-4 weeks for active campaigns. If you have an always-on brand banner, refresh the creative quarterly. Banner blindness sets in quickly with the same image.',
      },
      {
        question: 'Can I A/B test different banners?',
        answer:
          'Yes. Assign different banners to different employee groups and compare click-through rates. Some tools, including Siggly, support automatic A/B testing with randomized banner selection.',
      },
      {
        question: 'Should banners appear on internal emails too?',
        answer:
          'It depends on your goals. For company-wide initiatives (open enrollment, internal events), include banners on internal emails. For marketing campaigns, restrict banners to external emails only.',
      },
      {
        question: 'How do I measure banner campaign success?',
        answer:
          'Track clicks using UTM parameters in your analytics platform. Key metrics: click-through rate (CTR), landing page conversion rate, and total attributed conversions. Aim for a 2-5% CTR.',
      },
    ],
    cta: {
      title: 'Automate Your Checklist',
      description:
        'Siggly handles most of these steps automatically. Start free.',
    },
  },

  // ─── 13. Mobile Optimization ───

  {
    slug: 'mobile-optimization',
    category: 'checklists',
    meta: {
      title: 'Email Signature Mobile Optimization Checklist | Siggly',
      description:
        'Optimize email signatures for mobile devices. Covers responsive layout, touch targets, image scaling, font sizing, and cross-device testing.',
      keywords: [
        'mobile email signature',
        'responsive email signature',
        'mobile signature optimization',
        'email signature mobile checklist',
      ],
      canonical: '/checklists/mobile-optimization',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Checklists', url: '/checklists' },
      { name: 'Mobile Optimization', url: '/checklists/mobile-optimization' },
    ],
    hero: {
      badge: { icon: 'check-square', text: 'Checklist' },
      title: 'Email Signature Mobile Optimization Checklist',
      description:
        'Over 60% of emails are read on mobile devices. This checklist ensures your signatures look professional and function correctly on every smartphone and tablet.',
      variant: 'violet',
    },
    stats: [
      { value: '11 Steps', label: 'To mobile-optimized signatures' },
      { value: '20 min', label: 'Average optimization time' },
      { value: '61%', label: 'Of emails opened on mobile' },
    ],
    features: [
      {
        icon: 'smartphone',
        title: 'Responsive Layout',
        description:
          'Structure your signature HTML to stack gracefully on narrow viewports without horizontal scrolling.',
      },
      {
        icon: 'maximize-2',
        title: 'Touch-Friendly Targets',
        description:
          'Size links and buttons so they are easy to tap with a finger — no accidental clicks or frustrating tiny links.',
      },
      {
        icon: 'image',
        title: 'Image Scaling',
        description:
          'Ensure logos and photos scale proportionally and remain sharp on high-DPI mobile screens.',
      },
    ],
    featuresTitle: 'What This Checklist Covers',
    sections: [
      {
        type: 'checklist',
        title: 'Mobile Optimization Checklist',
        items: [
          'Set a maximum width of 600px on the signature container and use width="100%" for responsiveness within that bound',
          'Use a single-column layout that stacks naturally on narrow screens — avoid multi-column side-by-side layouts',
          'Set all phone numbers as clickable tel: links so mobile users can tap to call directly',
          'Make email addresses clickable mailto: links for easy one-tap emailing from mobile devices',
          'Ensure all tap targets (links, phone numbers, social icons) have a minimum touch area of 44x44 CSS pixels',
          'Add spacing of at least 8px between adjacent tap targets to prevent accidental taps on the wrong link',
          'Set logo images with a max-width of 150px on mobile to prevent them from dominating the small screen',
          'Use @2x resolution images (200x200px displayed at 100x100px) for sharp rendering on Retina and high-DPI displays',
          'Test the signature at viewport widths of 320px, 375px, and 414px to cover iPhone SE, standard, and Plus/Max sizes',
          'Verify that text does not require pinch-to-zoom — minimum 12px font size for body text on mobile',
          'Send test emails to iOS Mail, Android Gmail, Samsung Email, and Outlook Mobile to verify real-device rendering',
        ],
      },
      {
        type: 'benefits',
        title: 'Why Mobile Optimization Matters',
        items: [
          {
            icon: 'trending-up',
            title: '61% of Email Opens Are Mobile',
            description:
              'The majority of your recipients will see your signature on a phone first. If it is broken on mobile, it is broken for most of your audience.',
          },
          {
            icon: 'phone',
            title: 'Tap-to-Call Conversions',
            description:
              'A clickable phone number on mobile can generate direct calls — the highest-intent action a prospect can take. Non-clickable numbers lose this opportunity.',
          },
          {
            icon: 'eye',
            title: 'Professional Perception',
            description:
              'A signature that renders cleanly on mobile signals attention to detail and technical competence. A broken one suggests the opposite.',
          },
          {
            icon: 'zap',
            title: 'Faster Engagement',
            description:
              'Mobile-optimized signatures with tap-friendly links reduce friction. Recipients can call, email, or visit your website with a single tap.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'We discovered our signatures were nearly unreadable on phones — tiny text, overlapping images. After running through this checklist, our sales team saw a 28% increase in tap-to-call from email.',
      authorName: 'Kenji Yamamoto',
      authorTitle: 'Sales Operations Lead, NovaBridge Technologies',
    },
    faqs: [
      {
        question: 'How do I test my signature on mobile without a phone?',
        answer:
          'Use email testing tools like Litmus or Email on Acid which show previews across mobile clients. You can also resize your browser window to 375px wide for a rough mobile preview, but real device testing is ideal.',
      },
      {
        question: 'Should I create a separate mobile signature?',
        answer:
          'No. Design one responsive signature that adapts to all screen sizes. Maintaining separate desktop and mobile signatures doubles the management effort and creates consistency risks.',
      },
      {
        question: 'Why does my signature look different on iOS and Android?',
        answer:
          'iOS Mail and Android Gmail use different rendering engines. iOS Mail supports more CSS, while Android Gmail strips many styles. Test on both and use the lowest common denominator for styling.',
      },
      {
        question: 'Do mobile email apps support HTML signatures?',
        answer:
          'Yes, but with limitations. iOS Mail renders HTML well. Android Gmail supports basic HTML. Outlook Mobile has good HTML support. Stick to simple table-based layouts with inline styles for best results.',
      },
    ],
    cta: {
      title: 'Automate Your Checklist',
      description:
        'Siggly handles most of these steps automatically. Start free.',
    },
  },

  // ─── 14. Brand Guidelines ───

  {
    slug: 'brand-guidelines',
    category: 'checklists',
    meta: {
      title: 'Email Signature Brand Guidelines Checklist | Siggly',
      description:
        'Create and enforce email signature brand guidelines. Covers logo usage, color standards, typography rules, layout specs, and approval workflows.',
      keywords: [
        'email signature brand guidelines',
        'signature brand standards',
        'email branding checklist',
        'brand compliance email signature',
      ],
      canonical: '/checklists/brand-guidelines',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Checklists', url: '/checklists' },
      { name: 'Brand Guidelines', url: '/checklists/brand-guidelines' },
    ],
    hero: {
      badge: { icon: 'check-square', text: 'Checklist' },
      title: 'Email Signature Brand Guidelines Checklist',
      description:
        'Build a complete set of brand guidelines for your organization\'s email signatures. Define logo usage, color standards, typography, layout rules, and enforcement processes.',
      variant: 'indigo',
    },
    stats: [
      { value: '13 Steps', label: 'To complete brand guidelines' },
      { value: '45 min', label: 'To document guidelines' },
      { value: '94%', label: 'Consistency with enforced guidelines' },
    ],
    features: [
      {
        icon: 'pen-tool',
        title: 'Logo & Visual Standards',
        description:
          'Define exactly how your logo should appear in email signatures — size, placement, clear space, and acceptable variations.',
      },
      {
        icon: 'droplet',
        title: 'Color & Typography Rules',
        description:
          'Specify approved brand colors (hex codes), font stacks, and text sizing for every signature element.',
      },
      {
        icon: 'clipboard',
        title: 'Approval & Enforcement',
        description:
          'Establish approval workflows and enforcement mechanisms to prevent unauthorized signature modifications.',
      },
    ],
    featuresTitle: 'What This Checklist Covers',
    sections: [
      {
        type: 'checklist',
        title: 'Brand Guidelines Checklist',
        items: [
          'Define the approved logo version for email signatures (primary, monochrome, or icon-only) and specify minimum size requirements',
          'Document clear space rules around the logo — specify minimum padding in pixels to prevent visual crowding',
          'Specify exact brand colors in hex format for each signature element: name, title, links, dividers, and icons',
          'Define the primary and fallback font stacks (e.g., "Proxima Nova, Arial, Helvetica, sans-serif") for email client compatibility',
          'Set font sizes for each text element: name (14-16px), title (12-13px), contact details (12px), disclaimer (10-11px)',
          'Create a required fields list: which information must appear in every signature (name, title, phone, email, website)',
          'Create an optional fields list: which elements may be included at the employee\'s or department\'s discretion (pronouns, certifications, photo)',
          'Define the signature layout structure: vertical stack, horizontal two-column, or L-shaped with logo placement',
          'Specify rules for employee headshot photos: background color, cropping style, minimum resolution, and file format',
          'Document social media icon requirements: which platforms to include, icon style (outline, filled, branded colors or monochrome), and dimensions',
          'Create "do and don\'t" visual examples showing correct and incorrect signature implementations',
          'Establish an approval workflow: who reviews new templates, who approves exceptions, and how requests are submitted',
          'Distribute the brand guidelines document to all department heads and include it in your employee handbook or intranet',
        ],
      },
      {
        type: 'prose',
        title: 'Building Effective Brand Guidelines',
        paragraphs: [
          'Brand guidelines for email signatures serve a dual purpose: they give designers clear specifications to work from and give administrators a reference point for enforcement. Without documented guidelines, brand consistency erodes as individual employees and departments make their own styling decisions.',
          'The best brand guidelines are specific enough to eliminate ambiguity but flexible enough to accommodate different roles and departments. For example, a salesperson might include a booking link that an engineer would not, but both should use the same logo, colors, and layout.',
          'Enforcement is as important as documentation. If employees can freely edit their signatures, guidelines become suggestions. Centralized signature management tools like Siggly enforce guidelines at the platform level, removing the possibility of off-brand customizations.',
        ],
      },
    ],
    testimonial: {
      quote:
        'We had 15 different signature "styles" across the company. After documenting our brand guidelines with this checklist and locking templates in Siggly, we finally look like one company.',
      authorName: 'Charlotte Dupont',
      authorTitle: 'Head of Brand, Stratosphere Media',
    },
    faqs: [
      {
        question: 'Who should create the email signature brand guidelines?',
        answer:
          'Marketing or Brand teams should lead, with input from IT (for technical constraints), Legal (for compliance requirements), and HR (for employee data standards). Final approval should come from a Brand or Marketing Director.',
      },
      {
        question: 'How detailed should the guidelines be?',
        answer:
          'Detailed enough that someone could recreate the signature from the document alone. Specify exact hex codes, pixel dimensions, font stacks, and field order. Include visual examples of correct and incorrect implementations.',
      },
      {
        question: 'Should I allow any employee customization?',
        answer:
          'It depends on your culture. Most organizations allow limited customization (pronouns, certifications, booking links) while locking core elements (logo, colors, layout). Define clearly what is and is not customizable.',
      },
      {
        question: 'How often should brand guidelines be updated?',
        answer:
          'Review annually or whenever there is a brand refresh, merger, or significant organizational change. Minor updates (adding a new social platform, updating a disclaimer) can be made ad hoc.',
      },
    ],
    cta: {
      title: 'Automate Your Checklist',
      description:
        'Siggly handles most of these steps automatically. Start free.',
    },
  },

  // ─── 15. Analytics Setup ───

  {
    slug: 'analytics-setup',
    category: 'checklists',
    meta: {
      title: 'Email Signature Analytics Setup Checklist | Siggly',
      description:
        'Set up tracking and analytics for email signatures. Covers UTM parameters, click tracking, dashboards, KPIs, and reporting workflows.',
      keywords: [
        'email signature analytics',
        'signature tracking setup',
        'email signature metrics',
        'signature performance tracking',
      ],
      canonical: '/checklists/analytics-setup',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Checklists', url: '/checklists' },
      { name: 'Analytics Setup', url: '/checklists/analytics-setup' },
    ],
    hero: {
      badge: { icon: 'check-square', text: 'Checklist' },
      title: 'Email Signature Analytics Setup Checklist',
      description:
        'Turn your email signatures into a measurable marketing channel. Set up click tracking, define KPIs, build dashboards, and establish reporting cadences for data-driven signature management.',
      variant: 'light',
    },
    stats: [
      { value: '12 Steps', label: 'To full analytics coverage' },
      { value: '30 min', label: 'Average setup time' },
      { value: '10x', label: 'More insight than untracked signatures' },
    ],
    features: [
      {
        icon: 'bar-chart',
        title: 'Click & Engagement Tracking',
        description:
          'Configure UTM parameters and click tracking on every link in your signatures to measure engagement.',
      },
      {
        icon: 'pie-chart',
        title: 'Dashboard & Reporting',
        description:
          'Build dashboards that visualize signature performance metrics and share them with stakeholders.',
      },
      {
        icon: 'target',
        title: 'KPI Definition',
        description:
          'Define the key metrics that matter for your organization and set benchmarks for signature channel performance.',
      },
    ],
    featuresTitle: 'What This Checklist Covers',
    sections: [
      {
        type: 'checklist',
        title: 'Analytics Setup Checklist',
        items: [
          'Define your primary KPIs: click-through rate (CTR), total clicks, clicks by link type (website, social, banner, phone), and conversion rate',
          'Add UTM parameters to all signature links: utm_source=email_signature, utm_medium=[link-type], utm_campaign=[campaign-name]',
          'Use a consistent UTM naming convention document shared with your marketing team to prevent data fragmentation',
          'Set up a dedicated Google Analytics (or equivalent) segment to filter email signature traffic from other sources',
          'Configure click tracking in your signature management platform and verify clicks are recording accurately',
          'Create a dashboard in your analytics tool showing signature clicks by link, by department, and over time',
          'Establish a monthly reporting cadence: pull signature metrics on the first business day of each month',
          'Set benchmark targets based on your first 30 days of data (typical CTR: 2-5% for banners, 0.5-1% for social icons)',
          'Configure alerts for anomalies: sudden drops in clicks (broken links) or spikes (viral content) that need attention',
          'Track banner campaign performance separately with unique utm_campaign values for each banner creative',
          'Integrate signature analytics with your CRM (Salesforce, HubSpot) to attribute signature clicks to pipeline and revenue',
          'Share a quarterly signature analytics report with marketing, sales, and leadership to demonstrate channel value',
        ],
      },
      {
        type: 'how-it-works',
        title: 'Analytics Implementation Flow',
        steps: [
          {
            step: '01',
            title: 'Instrument Links',
            description:
              'Add UTM parameters and click tracking to every link in your signature templates. Use a consistent naming convention to keep data clean.',
          },
          {
            step: '02',
            title: 'Configure Analytics',
            description:
              'Set up segments, dashboards, and goals in your analytics platform to isolate and visualize email signature traffic.',
          },
          {
            step: '03',
            title: 'Establish Baselines',
            description:
              'Collect 30 days of data, calculate baseline CTR and click volumes, and set performance targets for future campaigns.',
          },
          {
            step: '04',
            title: 'Report & Optimize',
            description:
              'Share monthly reports with stakeholders, identify top-performing links and banners, and use insights to optimize future signature content.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'We had no idea our email signatures were driving 400+ website visits per month until we set up tracking with this checklist. Now signatures are a key part of our marketing mix.',
      authorName: 'Aisha Rahman',
      authorTitle: 'Marketing Analytics Director, ClearView Solutions',
    },
    faqs: [
      {
        question: 'What metrics should I track for email signatures?',
        answer:
          'Start with click-through rate (CTR), total clicks, and clicks by link type (website, social, banner, phone). Advanced metrics include conversion rate, CRM-attributed pipeline, and revenue influenced by signature clicks.',
      },
      {
        question: 'Do I need a special tool for signature analytics?',
        answer:
          'Basic tracking can be done with UTM parameters and Google Analytics. For advanced features like per-user tracking, A/B testing, and real-time dashboards, a dedicated signature platform like Siggly provides built-in analytics.',
      },
      {
        question: 'Will adding tracking parameters make my links look ugly?',
        answer:
          'UTM parameters are appended to the URL and are not visible in the signature itself — they only appear in the browser address bar when clicked. Most recipients will not notice them.',
      },
      {
        question: 'How do I attribute signature clicks to revenue?',
        answer:
          'Integrate your analytics with your CRM. When a contact clicks a signature link and later converts, the UTM source (email_signature) appears in their attribution path, allowing you to calculate influenced revenue.',
      },
      {
        question: 'Is tracking email signature clicks GDPR compliant?',
        answer:
          'Click tracking via UTM parameters in analytics platforms is generally compliant as it uses first-party cookies and aggregated data. However, pixel-based open tracking may require consent. Consult your DPO for your specific setup.',
      },
    ],
    cta: {
      title: 'Automate Your Checklist',
      description:
        'Siggly handles most of these steps automatically. Start free.',
    },
  },
];
