import type { SEOLandingPageData } from '../types';

export const glossaryPages: SEOLandingPageData[] = [
  // ─── Group 1: Core Email Signature Concepts ───

  {
    slug: 'email-signature',
    category: 'glossary',
    meta: {
      title: 'Email Signature - Glossary | Siggly',
      description:
        'What is an email signature? Learn about the block of text and images appended to outgoing emails that provides contact information and branding.',
      keywords: ['email signature', 'email sign-off', 'signature block', 'email contact info'],
      canonical: '/glossary/email-signature',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'Email Signature', url: '/glossary/email-signature' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'Email Signature',
      description:
        'An email signature is a block of text, images, and links automatically appended to the end of an outgoing email message. It typically includes the sender\'s name, job title, company, and contact details. Email signatures serve as digital business cards and reinforce brand identity in every message.',
      variant: 'light',
    },
    features: [
      { icon: 'mail', title: 'Contact Information', description: 'Provides recipients with your name, title, phone number, and other essential details.' },
      { icon: 'layers', title: 'Brand Representation', description: 'Reinforces company branding through logos, colors, and consistent formatting.' },
      { icon: 'globe', title: 'Social Links', description: 'Connects recipients to your social media profiles and website for deeper engagement.' },
      { icon: 'shield', title: 'Legal Compliance', description: 'Can include required legal disclaimers and confidentiality notices.' },
    ],
    featuresTitle: 'Key Aspects',
    sections: [
      {
        type: 'prose',
        title: 'Understanding Email Signatures',
        paragraphs: [
          'An email signature is one of the most ubiquitous yet underutilized tools in professional communication. Every email sent by an employee is an opportunity to convey credibility, share contact details, and promote the organization\'s brand. A well-designed signature creates a consistent, professional impression across all outbound communications.',
          'Modern email signatures go beyond simple text. They can include HTML formatting, company logos, banner images for marketing campaigns, social media icons, and even legal disclaimers required by industry regulations. Organizations that manage signatures centrally ensure every employee presents a unified brand image.',
          'The key elements of an effective email signature include the sender\'s full name, job title, company name, phone number, email address, and website URL. Optional elements such as pronouns, certifications, and promotional banners can be added depending on company policy and communication goals.',
        ],
      },
    ],
    faqs: [
      { question: 'What should an email signature include?', answer: 'At minimum, an email signature should include your full name, job title, company name, phone number, and email address. Many also add a company logo, website link, and social media icons.' },
      { question: 'How long should an email signature be?', answer: 'Best practice is to keep signatures between 3-7 lines of text. Overly long signatures can appear unprofessional and may be clipped by email clients.' },
      { question: 'Should I use an image-based or text-based signature?', answer: 'A combination of HTML text and a small logo image works best. Fully image-based signatures may not display if images are blocked by the recipient\'s email client.' },
      { question: 'Can email signatures be managed centrally for a team?', answer: 'Yes. Platforms like Siggly allow administrators to create, deploy, and update email signatures across an entire organization from a single dashboard.' },
      { question: 'Do email signatures affect email deliverability?', answer: 'Poorly coded HTML signatures with large images can trigger spam filters. Keep images optimized and HTML clean to maintain good deliverability.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  {
    slug: 'html-email-signature',
    category: 'glossary',
    meta: {
      title: 'HTML Email Signature - Glossary | Siggly',
      description:
        'Learn what an HTML email signature is, how it differs from plain text, and why businesses use formatted signatures with logos, colors, and links.',
      keywords: ['html email signature', 'formatted signature', 'rich email signature', 'html signature design'],
      canonical: '/glossary/html-email-signature',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'HTML Email Signature', url: '/glossary/html-email-signature' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'HTML Email Signature',
      description:
        'An HTML email signature uses HyperText Markup Language to create a visually formatted signature block with logos, colors, fonts, and clickable links. Unlike plain text signatures, HTML signatures support rich media and consistent branding across email clients.',
      variant: 'slate',
    },
    features: [
      { icon: 'layers', title: 'Rich Formatting', description: 'Supports custom fonts, colors, images, and layout structures for polished branding.' },
      { icon: 'eye', title: 'Visual Consistency', description: 'Renders consistently across most modern email clients when coded correctly.' },
      { icon: 'target', title: 'Clickable Elements', description: 'Enables hyperlinks on text, images, and social icons for direct engagement.' },
      { icon: 'bar-chart-3', title: 'Trackable Banners', description: 'Marketing banners within HTML signatures can include tracked links for analytics.' },
    ],
    featuresTitle: 'Key Aspects',
    sections: [
      {
        type: 'how-it-works',
        title: 'How HTML Email Signatures Work',
        steps: [
          { step: '1', title: 'Design the Template', description: 'Create a signature layout using HTML tables for maximum email client compatibility.' },
          { step: '2', title: 'Add Brand Assets', description: 'Insert your company logo, brand colors, and any promotional banner images.' },
          { step: '3', title: 'Include Dynamic Fields', description: 'Use placeholders for employee-specific data like name, title, and phone number.' },
          { step: '4', title: 'Deploy to Email Clients', description: 'Install the HTML signature into Gmail, Outlook, or other email clients either manually or via centralized deployment.' },
        ],
      },
    ],
    faqs: [
      { question: 'What is the difference between HTML and plain text email signatures?', answer: 'HTML signatures support formatting, images, and links. Plain text signatures are unformatted text only, which is more universally compatible but less visually engaging.' },
      { question: 'Do all email clients support HTML signatures?', answer: 'Most modern email clients support HTML signatures, but rendering varies. Using table-based layouts and inline CSS ensures the widest compatibility.' },
      { question: 'How do I create an HTML email signature?', answer: 'You can code one manually using HTML tables and inline styles, use a signature generator tool, or use a platform like Siggly that provides a visual template editor.' },
      { question: 'Can HTML signatures cause emails to go to spam?', answer: 'If the HTML is bloated, contains large images, or uses spam-trigger words, it can affect deliverability. Keep the code clean and images small.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  {
    slug: 'plain-text-signature',
    category: 'glossary',
    meta: {
      title: 'Plain Text Signature - Glossary | Siggly',
      description:
        'Learn about plain text email signatures, when to use them, and how they compare to HTML signatures for professional communication.',
      keywords: ['plain text signature', 'text email signature', 'simple email signature', 'no html signature'],
      canonical: '/glossary/plain-text-signature',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'Plain Text Signature', url: '/glossary/plain-text-signature' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'Plain Text Signature',
      description:
        'A plain text email signature is an unformatted text block appended to emails without any HTML, images, or special formatting. It relies solely on characters and line breaks to convey contact information and is universally compatible with all email clients.',
      variant: 'violet',
    },
    features: [
      { icon: 'check-circle', title: 'Universal Compatibility', description: 'Renders identically across every email client and device without rendering issues.' },
      { icon: 'zap', title: 'Lightweight', description: 'Adds virtually no extra size to email messages, ensuring fast delivery.' },
      { icon: 'file-text', title: 'Simplicity', description: 'Easy to create and maintain without any HTML or design knowledge.' },
    ],
    featuresTitle: 'Key Aspects',
    sections: [
      {
        type: 'checklist',
        title: 'Plain Text Signature Best Practices',
        items: [
          'Keep it to 4-6 lines maximum',
          'Use dashes or pipes as visual separators instead of special characters',
          'Include your full name, title, company, and one phone number',
          'Add your website URL as a full link (https://...)',
          'Avoid ASCII art or decorative characters that may render differently across clients',
          'Use a consistent format across your entire team',
          'Test the signature by sending to multiple email providers',
        ],
      },
    ],
    faqs: [
      { question: 'When should I use a plain text signature instead of HTML?', answer: 'Plain text signatures are ideal when emailing security-conscious recipients, when maximum compatibility is needed, or when your organization prefers a minimalist approach.' },
      { question: 'Can plain text signatures include links?', answer: 'You can include full URLs (e.g., https://example.com), but they won\'t be styled as clickable hyperlinks. Most email clients will auto-detect and make them clickable.' },
      { question: 'Are plain text signatures better for deliverability?', answer: 'They have a slight edge because there is no HTML to trigger spam filters. However, well-coded HTML signatures rarely cause deliverability issues.' },
      { question: 'How do I manage plain text signatures for a team?', answer: 'Signature management platforms like Siggly can deploy both HTML and plain text versions of signatures to ensure every format is covered.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  {
    slug: 'email-signature-block',
    category: 'glossary',
    meta: {
      title: 'Email Signature Block - Glossary | Siggly',
      description:
        'Understand what an email signature block is, its components, and how it structures contact information in professional emails.',
      keywords: ['email signature block', 'sig block', 'signature block format', 'email sign-off block'],
      canonical: '/glossary/email-signature-block',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'Email Signature Block', url: '/glossary/email-signature-block' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'Email Signature Block',
      description:
        'An email signature block (or sig block) is the structured section at the bottom of an email that contains the sender\'s identification and contact information. It is separated from the email body by a delimiter, typically "-- " (two dashes and a space).',
      variant: 'indigo',
    },
    features: [
      { icon: 'file-text', title: 'Structured Layout', description: 'Organizes sender details into a clear, scannable format with consistent hierarchy.' },
      { icon: 'users', title: 'Professional Identity', description: 'Establishes the sender\'s role, organization, and authority in professional contexts.' },
      { icon: 'settings', title: 'Configurable', description: 'Can be customized per user, department, or role within an organization.' },
    ],
    featuresTitle: 'Key Aspects',
    sections: [
      {
        type: 'prose',
        title: 'Anatomy of a Signature Block',
        paragraphs: [
          'The email signature block is a convention dating back to early internet communication. RFC 3676 recommends separating the signature block from the message body with a delimiter line containing exactly "-- " (two dashes followed by a space). This allows email clients to automatically identify and sometimes hide or style the signature differently from the main content.',
          'A typical signature block contains the sender\'s name on the first line, followed by their job title, company name, phone number, email, and website. In HTML signatures, this structure is often enhanced with logos, social links, and promotional banners while maintaining the same logical hierarchy.',
        ],
      },
    ],
    faqs: [
      { question: 'What is the standard email signature delimiter?', answer: 'The standard delimiter is "-- " (two dashes and a space on a line by itself). This convention, defined in RFC 3676, helps email clients separate the signature from the message body.' },
      { question: 'How is a signature block different from an email footer?', answer: 'A signature block identifies the sender personally, while an email footer typically contains organizational information like disclaimers, unsubscribe links, or legal notices that apply to all messages.' },
      { question: 'Should reply emails include the signature block?', answer: 'Common practice is to include a full signature on the first email in a thread and a shorter version or none on subsequent replies. Some organizations require full signatures on every message.' },
      { question: 'Can signature blocks be different for internal and external emails?', answer: 'Yes. Many organizations use a full, branded signature block for external communication and a simpler one for internal emails. Siggly supports rule-based signature assignment for this purpose.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  {
    slug: 'email-footer',
    category: 'glossary',
    meta: {
      title: 'Email Footer - Glossary | Siggly',
      description:
        'Learn what an email footer is, how it differs from an email signature, and what legal and branding elements it typically contains.',
      keywords: ['email footer', 'footer vs signature', 'email footer content', 'email legal footer'],
      canonical: '/glossary/email-footer',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'Email Footer', url: '/glossary/email-footer' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'Email Footer',
      description:
        'An email footer is the section at the very bottom of an email that contains organizational information such as legal disclaimers, unsubscribe links, company address, and regulatory notices. It is distinct from the personal email signature and often applies uniformly to all outbound messages.',
      variant: 'light',
    },
    features: [
      { icon: 'shield', title: 'Legal Protection', description: 'Houses required disclaimers and confidentiality statements to protect the organization.' },
      { icon: 'globe', title: 'Company Information', description: 'Includes registered address, company number, and other legally required details.' },
      { icon: 'mail', title: 'Unsubscribe Mechanism', description: 'In marketing emails, footers must contain an unsubscribe link per anti-spam laws.' },
    ],
    featuresTitle: 'Key Aspects',
    sections: [
      {
        type: 'benefits',
        title: 'Benefits of a Well-Designed Email Footer',
        items: [
          { icon: 'shield', title: 'Regulatory Compliance', description: 'Meets legal requirements for business email communication across jurisdictions.' },
          { icon: 'award', title: 'Brand Trust', description: 'A professional footer with proper legal information builds recipient trust and credibility.' },
          { icon: 'users', title: 'Organizational Consistency', description: 'Ensures every employee\'s email carries the same legal and branding elements.' },
          { icon: 'refresh-cw', title: 'Easy Updates', description: 'Centrally managed footers can be updated across the entire organization instantly.' },
        ],
      },
    ],
    faqs: [
      { question: 'What is the difference between an email footer and an email signature?', answer: 'An email signature identifies the individual sender with personal contact details. An email footer contains organizational information like legal disclaimers, company address, and unsubscribe links that apply to all messages from the company.' },
      { question: 'What should an email footer contain?', answer: 'Typically it includes the company name and registered address, legal disclaimers, confidentiality notices, and in marketing emails, an unsubscribe link. Requirements vary by industry and jurisdiction.' },
      { question: 'Are email footers legally required?', answer: 'In many jurisdictions, yes. For example, UK companies must include their registered company name, number, and address. EU regulations require certain disclosures. CAN-SPAM requires a physical address in marketing emails.' },
      { question: 'Can I have both a signature and a footer?', answer: 'Yes, and this is common. The signature identifies the sender personally, while the footer below it contains company-wide legal and compliance information.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  {
    slug: 'email-disclaimer',
    category: 'glossary',
    meta: {
      title: 'Email Disclaimer - Glossary | Siggly',
      description:
        'What is an email disclaimer? Learn about the legal notice appended to business emails, why organizations use them, and what they typically contain.',
      keywords: ['email disclaimer', 'email legal disclaimer', 'disclaimer notice', 'email confidentiality disclaimer'],
      canonical: '/glossary/email-disclaimer',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'Email Disclaimer', url: '/glossary/email-disclaimer' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'Email Disclaimer',
      description:
        'An email disclaimer is a legal notice appended to outbound emails that limits the sender\'s or organization\'s liability. Disclaimers commonly address confidentiality, intended recipients, virus liability, and the non-binding nature of email content.',
      variant: 'slate',
    },
    features: [
      { icon: 'shield', title: 'Liability Limitation', description: 'Helps protect the organization from legal claims arising from email content.' },
      { icon: 'lock', title: 'Confidentiality Notice', description: 'Warns unintended recipients that the email content is privileged or confidential.' },
      { icon: 'file-text', title: 'Regulatory Requirement', description: 'Certain industries mandate specific disclaimer language in all outbound communications.' },
    ],
    featuresTitle: 'What You Need to Know',
    sections: [
      {
        type: 'prose',
        title: 'Email Disclaimers Explained',
        paragraphs: [
          'Email disclaimers are short legal notices that organizations append to outgoing emails. While their legal enforceability varies by jurisdiction, they are considered best practice in most industries and are explicitly required in others. Common disclaimer types include confidentiality notices, virus disclaimers, and statements that the email does not form a binding contract.',
          'The effectiveness of an email disclaimer depends on its placement, wording, and the legal framework of the jurisdiction. Courts in different countries have ruled differently on whether email disclaimers are binding. Regardless of enforceability, they demonstrate due diligence and a commitment to responsible communication.',
        ],
      },
    ],
    faqs: [
      { question: 'Are email disclaimers legally binding?', answer: 'Their enforceability varies by jurisdiction. In many cases, they are not fully binding but demonstrate due diligence. Consult legal counsel for your specific situation and jurisdiction.' },
      { question: 'What should an email disclaimer say?', answer: 'Common elements include a confidentiality notice, a statement that the email is intended only for the named recipient, a virus liability disclaimer, and a note that views expressed are the sender\'s own.' },
      { question: 'Where should the disclaimer appear in the email?', answer: 'Disclaimers are typically placed at the very bottom of the email, below the signature block. Some organizations place them before the signature for greater visibility.' },
      { question: 'Do all businesses need email disclaimers?', answer: 'While not universally required, they are strongly recommended for all businesses and legally mandated in industries such as financial services, healthcare, and legal services.' },
      { question: 'Can Siggly add disclaimers to email signatures?', answer: 'Yes. Siggly allows administrators to append standardized disclaimers to all employee signatures, ensuring consistency and compliance across the organization.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  {
    slug: 'confidentiality-notice',
    category: 'glossary',
    meta: {
      title: 'Confidentiality Notice - Glossary | Siggly',
      description:
        'Learn about email confidentiality notices, why they are used, and best practices for including them in your organization\'s email signatures.',
      keywords: ['confidentiality notice', 'email confidentiality', 'privileged communication notice', 'email privacy notice'],
      canonical: '/glossary/confidentiality-notice',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'Confidentiality Notice', url: '/glossary/confidentiality-notice' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'Confidentiality Notice',
      description:
        'A confidentiality notice is a statement in an email (usually in the footer or signature) informing recipients that the message may contain privileged or confidential information. It requests that unintended recipients delete the message and notify the sender.',
      variant: 'violet',
    },
    features: [
      { icon: 'lock', title: 'Privacy Protection', description: 'Signals that the email contains information intended only for the named recipient.' },
      { icon: 'shield', title: 'Legal Safeguard', description: 'Helps establish that confidential information was not voluntarily disclosed to third parties.' },
      { icon: 'users', title: 'Industry Standard', description: 'Expected in legal, financial, healthcare, and other regulated industries.' },
    ],
    featuresTitle: 'What You Need to Know',
    sections: [
      {
        type: 'checklist',
        title: 'Confidentiality Notice Best Practices',
        items: [
          'State clearly that the email is intended only for the named recipient',
          'Request that unintended recipients notify the sender immediately',
          'Ask unintended recipients to delete the message and any copies',
          'Note that unauthorized use, disclosure, or copying is prohibited',
          'Keep the notice concise — one short paragraph is sufficient',
          'Use plain language rather than overly legalistic wording',
          'Apply the notice consistently to all outbound emails',
          'Review the wording with legal counsel periodically',
        ],
      },
    ],
    faqs: [
      { question: 'Is a confidentiality notice legally enforceable?', answer: 'Enforceability varies by jurisdiction. They are generally considered evidence of intent to maintain confidentiality rather than a binding agreement. However, they can support legal arguments in disputes over information disclosure.' },
      { question: 'Who needs a confidentiality notice?', answer: 'They are most common in legal, financial, medical, and government organizations. Any business that regularly sends sensitive information via email should consider including one.' },
      { question: 'Where should the confidentiality notice be placed?', answer: 'Typically at the bottom of the email, either within or immediately below the signature block. Consistency in placement is important.' },
      { question: 'Can one confidentiality notice apply to all employees?', answer: 'Yes. Organizations commonly use a single standardized notice for all employees, deployed centrally through a signature management tool like Siggly.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  {
    slug: 'email-branding',
    category: 'glossary',
    meta: {
      title: 'Email Branding - Glossary | Siggly',
      description:
        'What is email branding? Learn how organizations use consistent visual identity in email signatures and communications to strengthen brand recognition.',
      keywords: ['email branding', 'brand consistency email', 'email brand identity', 'corporate email branding'],
      canonical: '/glossary/email-branding',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'Email Branding', url: '/glossary/email-branding' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'Email Branding',
      description:
        'Email branding is the practice of applying consistent visual identity elements — logos, colors, fonts, and design — across all email communications. It ensures that every email sent by an organization reinforces brand recognition and professionalism.',
      variant: 'indigo',
    },
    features: [
      { icon: 'award', title: 'Brand Recognition', description: 'Consistent branding across emails increases familiarity and trust with recipients.' },
      { icon: 'eye', title: 'Visual Consistency', description: 'Ensures logos, colors, and fonts match your brand guidelines in every email.' },
      { icon: 'trending-up', title: 'Marketing Impact', description: 'Branded emails with banners and CTAs turn every message into a marketing touchpoint.' },
      { icon: 'users', title: 'Team Alignment', description: 'Ensures every employee\'s email reflects the same professional brand image.' },
    ],
    featuresTitle: 'Key Aspects',
    sections: [
      {
        type: 'use-cases-grid',
        title: 'Email Branding Use Cases',
        cases: [
          { title: 'New Employee Onboarding', description: 'Automatically assign branded signatures to new hires to ensure they represent the brand from day one.' },
          { title: 'Rebranding Rollout', description: 'Update logos, colors, and templates across the entire organization instantly during a rebrand.' },
          { title: 'Campaign Promotions', description: 'Add promotional banners to employee signatures to amplify marketing campaigns through daily email.' },
          { title: 'Multi-Brand Organizations', description: 'Manage distinct brand identities for different subsidiaries or divisions from a single platform.' },
          { title: 'Client-Facing Teams', description: 'Ensure sales and support teams present a polished, consistent brand in every client interaction.' },
          { title: 'Event Announcements', description: 'Temporarily add event banners to signatures to promote conferences, webinars, or product launches.' },
        ],
      },
    ],
    faqs: [
      { question: 'Why is email branding important?', answer: 'Employees send thousands of emails daily. Consistent branding across these messages reinforces brand awareness, builds trust, and creates a professional impression with every interaction.' },
      { question: 'What elements make up email branding?', answer: 'Key elements include company logo, brand colors, typography, layout consistency, social media icons, and optional promotional banners — all applied uniformly across signatures.' },
      { question: 'How do I enforce email branding across my organization?', answer: 'Use a centralized signature management platform like Siggly to create approved templates and deploy them to all users. This prevents employees from creating inconsistent signatures.' },
      { question: 'Can email branding help with marketing?', answer: 'Absolutely. Branded email signatures with promotional banners and calls-to-action can generate significant marketing impressions, as the average employee sends 40+ emails per day.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  {
    slug: 'digital-business-card',
    category: 'glossary',
    meta: {
      title: 'Digital Business Card - Glossary | Siggly',
      description:
        'Learn what a digital business card is, how it relates to email signatures, and how professionals share contact information electronically.',
      keywords: ['digital business card', 'virtual business card', 'electronic business card', 'email business card'],
      canonical: '/glossary/digital-business-card',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'Digital Business Card', url: '/glossary/digital-business-card' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'Digital Business Card',
      description:
        'A digital business card is an electronic version of a traditional paper business card that can be shared via email, QR code, or link. Email signatures often function as digital business cards, providing recipients with contact details in a structured, saveable format.',
      variant: 'light',
    },
    features: [
      { icon: 'globe', title: 'Easy Sharing', description: 'Can be shared instantly via email, text, QR code, or link — no physical exchange needed.' },
      { icon: 'refresh-cw', title: 'Always Up to Date', description: 'Update your details once and everyone with the link sees the latest version.' },
      { icon: 'database', title: 'CRM Integration', description: 'Recipients can save digital cards directly to contacts or CRM systems.' },
      { icon: 'zap', title: 'Interactive', description: 'Can include clickable links, social profiles, and even embedded videos or portfolios.' },
    ],
    featuresTitle: 'Key Aspects',
    sections: [
      {
        type: 'how-it-works',
        title: 'How Digital Business Cards Work',
        steps: [
          { step: '1', title: 'Create Your Card', description: 'Enter your contact details, upload a photo, and add links to your website and social profiles.' },
          { step: '2', title: 'Customize the Design', description: 'Apply your brand colors, logo, and preferred layout to match your company\'s visual identity.' },
          { step: '3', title: 'Share Electronically', description: 'Distribute via a unique URL, QR code, email signature link, or NFC tap on compatible devices.' },
          { step: '4', title: 'Recipients Save Details', description: 'Recipients can add your information to their phone contacts or CRM with one tap using vCard format.' },
        ],
      },
    ],
    faqs: [
      { question: 'How is a digital business card different from an email signature?', answer: 'An email signature is embedded in every email you send and contains basic contact info. A digital business card is a standalone page with richer details that can be shared independently via link or QR code.' },
      { question: 'Can I include a digital business card link in my email signature?', answer: 'Yes. Many professionals add a "View my card" or vCard download link in their email signature so recipients can easily save their full contact details.' },
      { question: 'Are digital business cards environmentally friendly?', answer: 'Yes. They eliminate the need for printed paper cards, reducing paper waste and printing costs while being easier to update and share.' },
      { question: 'What formats do digital business cards use?', answer: 'Common formats include vCard (.vcf) files, web-based card pages, and QR codes. vCard is the most universal format for saving contacts across devices.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  {
    slug: 'vcard',
    category: 'glossary',
    meta: {
      title: 'vCard - Email Signature Glossary | Siggly',
      description:
        'What is a vCard? Learn about the VCF file format standard used to share electronic contact information via email signatures and digital business cards.',
      keywords: ['vcard', 'vcf file', 'electronic contact card', 'vcard format', 'contact file'],
      canonical: '/glossary/vcard',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'vCard', url: '/glossary/vcard' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'vCard',
      description:
        'A vCard (Virtual Contact File, .vcf) is a standard file format for electronic business cards. It stores contact information such as name, address, phone numbers, email, and URLs in a structured format that can be imported into address books, email clients, and CRM systems.',
      variant: 'slate',
    },
    features: [
      { icon: 'database', title: 'Universal Standard', description: 'Defined by RFC 6350, vCard is supported by virtually all contact management systems and email clients.' },
      { icon: 'file-text', title: 'Structured Data', description: 'Stores contact details in a machine-readable format, enabling automatic import into address books.' },
      { icon: 'cloud', title: 'Cross-Platform', description: 'Works across iOS, Android, Windows, macOS, and web-based email and contact applications.' },
    ],
    featuresTitle: 'Key Aspects',
    sections: [
      {
        type: 'prose',
        title: 'Understanding the vCard Format',
        paragraphs: [
          'The vCard format has been the standard for electronic contact exchange since the mid-1990s. Now at version 4.0 (RFC 6350), it supports a wide range of contact fields including name, organization, title, phone numbers, email addresses, physical addresses, URLs, photos, and even social media handles.',
          'In the context of email signatures, vCards are commonly attached as .vcf files or linked for download. When a recipient clicks to download a vCard, their device prompts them to add the contact to their address book. This makes it easy for recipients to save your information accurately without manual entry.',
        ],
      },
    ],
    faqs: [
      { question: 'What is a .vcf file?', answer: 'A .vcf (Virtual Contact File) file is the file extension for vCards. It is a plain text file containing structured contact information that can be opened by any contacts application.' },
      { question: 'How do I add a vCard to my email signature?', answer: 'You can attach a .vcf file to your signature or include a download link. Siggly supports generating and embedding vCard links in signatures automatically.' },
      { question: 'What information can a vCard store?', answer: 'vCards can store name, organization, title, phone numbers, email addresses, physical address, website URLs, photos, social media profiles, birthday, and notes.' },
      { question: 'Is vCard compatible with all devices?', answer: 'Yes. vCard (.vcf) is universally supported across iOS, Android, Windows, macOS, Gmail, Outlook, and virtually all modern email and contact management applications.' },
      { question: 'What is the latest vCard version?', answer: 'vCard 4.0 (RFC 6350) is the latest version. It adds support for additional fields and improved internationalization. However, version 3.0 remains widely used for maximum compatibility.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  // ─── Group 2: Email Authentication & Security ───

  {
    slug: 'dkim',
    category: 'glossary',
    meta: {
      title: 'DKIM - Email Signature Glossary | Siggly',
      description:
        'What is DKIM? Learn about DomainKeys Identified Mail, the email authentication standard that uses cryptographic signatures to verify sender identity.',
      keywords: ['dkim', 'domainkeys identified mail', 'email authentication', 'dkim signature', 'email security'],
      canonical: '/glossary/dkim',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'DKIM', url: '/glossary/dkim' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'DKIM (DomainKeys Identified Mail)',
      description:
        'DKIM is an email authentication method that allows the sending domain to cryptographically sign outgoing messages. Receiving mail servers verify the DKIM signature against a public key published in DNS to confirm the email was not altered in transit and originates from an authorized sender.',
      variant: 'violet',
    },
    features: [
      { icon: 'lock', title: 'Cryptographic Signing', description: 'Uses public-key cryptography to sign email headers and body, proving message integrity.' },
      { icon: 'shield', title: 'Spoofing Prevention', description: 'Helps receiving servers verify that the email genuinely came from the claimed domain.' },
      { icon: 'search', title: 'DNS-Based Verification', description: 'Public keys are published as DNS TXT records, allowing any receiver to verify signatures.' },
      { icon: 'check-circle', title: 'Deliverability Boost', description: 'Emails with valid DKIM signatures are less likely to be flagged as spam.' },
    ],
    featuresTitle: 'Key Aspects',
    sections: [
      {
        type: 'how-it-works',
        title: 'How DKIM Works',
        steps: [
          { step: '1', title: 'Generate Key Pair', description: 'The sending domain generates a public/private key pair. The private key is stored on the mail server; the public key is published in DNS.' },
          { step: '2', title: 'Sign Outgoing Email', description: 'When an email is sent, the mail server creates a hash of specified headers and the body, then encrypts it with the private key to produce the DKIM signature.' },
          { step: '3', title: 'Attach Signature Header', description: 'The DKIM signature is added as a DKIM-Signature header to the email before it leaves the sending server.' },
          { step: '4', title: 'Receiver Verifies', description: 'The receiving mail server retrieves the public key from DNS, decrypts the signature, and compares the hash to verify the email was not tampered with.' },
        ],
      },
    ],
    faqs: [
      { question: 'What happens if DKIM verification fails?', answer: 'A failed DKIM check does not automatically reject the email. However, it increases the likelihood of the message being flagged as spam or rejected, especially when combined with DMARC policies.' },
      { question: 'Does DKIM encrypt email content?', answer: 'No. DKIM signs the email to verify integrity and authenticity, but it does not encrypt the message content. For encryption, you need separate protocols like S/MIME or TLS.' },
      { question: 'Do email signature management tools affect DKIM?', answer: 'Modifying an email after it has been signed can break the DKIM signature. Siggly applies signatures before DKIM signing occurs, preserving authentication integrity.' },
      { question: 'How is DKIM different from SPF?', answer: 'SPF verifies that the sending server is authorized by the domain. DKIM verifies that the email content has not been altered. Together with DMARC, they provide comprehensive email authentication.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  {
    slug: 'spf-record',
    category: 'glossary',
    meta: {
      title: 'SPF Record - Email Glossary | Siggly',
      description:
        'Learn about SPF (Sender Policy Framework) records, how they authorize mail servers, and why they are essential for email deliverability.',
      keywords: ['spf record', 'sender policy framework', 'email spf', 'spf dns record', 'email authorization'],
      canonical: '/glossary/spf-record',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'SPF Record', url: '/glossary/spf-record' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'SPF Record (Sender Policy Framework)',
      description:
        'An SPF record is a DNS TXT record that specifies which mail servers are authorized to send email on behalf of a domain. Receiving servers check this record to verify that incoming mail comes from a permitted source, helping to prevent email spoofing.',
      variant: 'indigo',
    },
    features: [
      { icon: 'shield', title: 'Domain Authorization', description: 'Explicitly lists which IP addresses and servers may send email for your domain.' },
      { icon: 'globe', title: 'DNS-Based', description: 'Published as a TXT record in your domain\'s DNS, making it publicly verifiable by any receiving server.' },
      { icon: 'check-circle', title: 'Spam Reduction', description: 'Helps receiving servers reject emails from unauthorized sources claiming to be from your domain.' },
    ],
    featuresTitle: 'Key Aspects',
    sections: [
      {
        type: 'prose',
        title: 'Understanding SPF Records',
        paragraphs: [
          'Sender Policy Framework (SPF) is one of the foundational email authentication protocols. It works by allowing domain owners to publish a list of authorized sending servers in their DNS records. When a receiving server gets an email, it checks the SPF record of the sender\'s domain to determine whether the sending server is on the authorized list.',
          'An SPF record uses a specific syntax to define authorized senders. For example, "v=spf1 include:_spf.google.com ~all" authorizes Google\'s mail servers and soft-fails all others. Understanding SPF syntax is important for ensuring third-party services like email signature platforms, marketing tools, and CRM systems can send on your behalf.',
        ],
      },
    ],
    faqs: [
      { question: 'What does an SPF record look like?', answer: 'A typical SPF record is a DNS TXT record like: v=spf1 include:_spf.google.com include:sendgrid.net ~all. It lists authorized senders and defines what to do with unauthorized ones.' },
      { question: 'What is the difference between ~all and -all in SPF?', answer: '~all is a soft fail (accept but mark), while -all is a hard fail (reject). Most organizations use ~all during setup and transition to -all once they confirm all legitimate senders are listed.' },
      { question: 'Can I have multiple SPF records for one domain?', answer: 'No. A domain should have only one SPF record. Multiple records can cause validation failures. Use the include mechanism to authorize multiple services within a single record.' },
      { question: 'Do I need to update my SPF record when using Siggly?', answer: 'Siggly applies signatures within your existing email infrastructure (Google Workspace or Microsoft 365), so no SPF changes are typically needed.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  {
    slug: 'dmarc',
    category: 'glossary',
    meta: {
      title: 'DMARC - Email Signature Glossary | Siggly',
      description:
        'What is DMARC? Learn about Domain-based Message Authentication, Reporting and Conformance — the policy layer that ties SPF and DKIM together.',
      keywords: ['dmarc', 'dmarc policy', 'email authentication policy', 'dmarc record', 'domain authentication'],
      canonical: '/glossary/dmarc',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'DMARC', url: '/glossary/dmarc' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'DMARC',
      description:
        'DMARC (Domain-based Message Authentication, Reporting and Conformance) is an email authentication policy protocol that builds on SPF and DKIM. It allows domain owners to specify how receiving servers should handle messages that fail authentication checks, and provides reporting on email authentication results.',
      variant: 'light',
    },
    features: [
      { icon: 'shield', title: 'Policy Enforcement', description: 'Tells receiving servers whether to reject, quarantine, or accept emails that fail SPF/DKIM checks.' },
      { icon: 'bar-chart-3', title: 'Reporting', description: 'Provides aggregate and forensic reports on email authentication results for your domain.' },
      { icon: 'lock', title: 'Phishing Defense', description: 'Prevents attackers from sending emails that appear to come from your domain.' },
      { icon: 'settings', title: 'Gradual Deployment', description: 'Supports a phased rollout from monitoring (p=none) to quarantine to full rejection (p=reject).' },
    ],
    featuresTitle: 'Key Aspects',
    sections: [
      {
        type: 'how-it-works',
        title: 'How DMARC Works',
        steps: [
          { step: '1', title: 'Publish a DMARC Record', description: 'Add a DNS TXT record at _dmarc.yourdomain.com specifying your policy (none, quarantine, or reject) and a reporting email address.' },
          { step: '2', title: 'Receiving Server Checks', description: 'When an email arrives, the receiving server checks SPF and DKIM, then looks up the DMARC record to determine the domain\'s policy.' },
          { step: '3', title: 'Alignment Verification', description: 'DMARC verifies that the domain in the From header aligns with the domains authenticated by SPF and/or DKIM.' },
          { step: '4', title: 'Policy Application & Reporting', description: 'The receiving server applies the DMARC policy (none/quarantine/reject) and sends authentication reports back to the domain owner.' },
        ],
      },
    ],
    faqs: [
      { question: 'What are the three DMARC policy levels?', answer: 'p=none (monitor only, take no action), p=quarantine (move failures to spam/junk), and p=reject (block failures entirely). Organizations typically start at none and progress to reject.' },
      { question: 'Does DMARC require both SPF and DKIM?', answer: 'DMARC requires that at least one of SPF or DKIM passes and aligns with the From domain. Best practice is to implement both for maximum protection.' },
      { question: 'What are DMARC aggregate reports?', answer: 'Aggregate reports (RUA) are XML files sent daily by receiving servers, showing authentication results for all emails sent from your domain. They help identify unauthorized senders and authentication issues.' },
      { question: 'Can email signature tools break DMARC alignment?', answer: 'Tools that modify emails after sending can break DKIM, which may cause DMARC failures. Siggly integrates with your email platform to apply signatures before authentication, maintaining full DMARC compliance.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  {
    slug: 'email-authentication',
    category: 'glossary',
    meta: {
      title: 'Email Authentication - Glossary | Siggly',
      description:
        'Learn about email authentication — the collection of protocols (SPF, DKIM, DMARC) that verify sender identity and protect against spoofing.',
      keywords: ['email authentication', 'email verification', 'sender authentication', 'email security protocols'],
      canonical: '/glossary/email-authentication',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'Email Authentication', url: '/glossary/email-authentication' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'Email Authentication',
      description:
        'Email authentication is the umbrella term for protocols and mechanisms that verify the identity of an email sender. The three primary protocols — SPF, DKIM, and DMARC — work together to confirm that an email genuinely comes from the domain it claims to originate from.',
      variant: 'slate',
    },
    features: [
      { icon: 'shield', title: 'SPF Verification', description: 'Checks that the sending server is authorized by the domain\'s DNS records.' },
      { icon: 'lock', title: 'DKIM Signing', description: 'Cryptographically signs emails to prove they have not been altered in transit.' },
      { icon: 'check-circle', title: 'DMARC Policy', description: 'Defines how receivers should handle emails that fail SPF or DKIM checks.' },
      { icon: 'trending-up', title: 'Deliverability Impact', description: 'Properly authenticated emails are significantly less likely to be flagged as spam.' },
    ],
    featuresTitle: 'What You Need to Know',
    sections: [
      {
        type: 'checklist',
        title: 'Email Authentication Checklist',
        items: [
          'Publish an SPF record listing all authorized sending servers',
          'Generate DKIM keys and enable signing on your mail server',
          'Start with a DMARC policy of p=none for monitoring',
          'Review DMARC aggregate reports to identify authentication failures',
          'Add include directives for third-party services that send on your behalf',
          'Gradually move DMARC policy from none to quarantine to reject',
          'Monitor authentication results after any email infrastructure changes',
          'Ensure email signature tools do not break DKIM signatures',
        ],
      },
    ],
    faqs: [
      { question: 'Why is email authentication important?', answer: 'Without authentication, anyone can send email claiming to be from your domain. Authentication protocols verify sender identity, protect your brand from impersonation, and improve email deliverability.' },
      { question: 'Do I need all three protocols (SPF, DKIM, DMARC)?', answer: 'Yes. SPF and DKIM provide the verification mechanisms, while DMARC ties them together with a policy and reporting framework. All three are needed for comprehensive protection.' },
      { question: 'Will email authentication stop all spam?', answer: 'No. Authentication verifies sender identity but does not evaluate email content. It prevents domain spoofing but not all forms of spam or phishing.' },
      { question: 'Does changing email signatures affect authentication?', answer: 'Modifying emails after DKIM signing can invalidate the signature. Use a signature platform like Siggly that applies changes before authentication occurs.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  {
    slug: 'email-deliverability',
    category: 'glossary',
    meta: {
      title: 'Email Deliverability - Glossary | Siggly',
      description:
        'What is email deliverability? Learn about the factors that determine whether your emails reach the inbox or end up in spam folders.',
      keywords: ['email deliverability', 'inbox placement', 'email spam score', 'deliverability rate'],
      canonical: '/glossary/email-deliverability',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'Email Deliverability', url: '/glossary/email-deliverability' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'Email Deliverability',
      description:
        'Email deliverability refers to the ability of an email to successfully reach the recipient\'s inbox rather than being filtered into spam, quarantined, or rejected. It is influenced by sender reputation, authentication, content quality, and technical configuration.',
      variant: 'violet',
    },
    features: [
      { icon: 'trending-up', title: 'Sender Reputation', description: 'Built over time based on sending volume, bounce rates, spam complaints, and authentication compliance.' },
      { icon: 'shield', title: 'Authentication Status', description: 'Valid SPF, DKIM, and DMARC records significantly improve deliverability.' },
      { icon: 'mail', title: 'Content Quality', description: 'Clean HTML, appropriate text-to-image ratio, and avoiding spam trigger words all affect inbox placement.' },
      { icon: 'database', title: 'List Hygiene', description: 'Sending to valid, engaged recipients reduces bounces and spam complaints.' },
    ],
    featuresTitle: 'Key Aspects',
    sections: [
      {
        type: 'prose',
        title: 'Factors Affecting Email Deliverability',
        paragraphs: [
          'Email deliverability is a complex interplay of technical and behavioral factors. On the technical side, proper SPF, DKIM, and DMARC configuration is essential. Sending from IP addresses and domains with good reputation, using TLS encryption, and maintaining clean DNS records all contribute to better inbox placement.',
          'Content-related factors also play a significant role. Emails with bloated HTML, excessive images, spam trigger words, or misleading subject lines are more likely to be filtered. Email signatures can affect deliverability if they contain large images, broken links, or poorly coded HTML. Keeping signatures clean and optimized is part of maintaining good deliverability.',
        ],
      },
    ],
    faqs: [
      { question: 'What is a good email deliverability rate?', answer: 'A deliverability rate of 95% or higher is considered good. Top senders achieve 98-99%. Rates below 90% indicate significant issues that need attention.' },
      { question: 'How do email signatures affect deliverability?', answer: 'Poorly coded HTML signatures with large images, broken links, or excessive formatting can negatively impact deliverability. Clean, well-optimized signatures have minimal impact.' },
      { question: 'How can I check my email deliverability?', answer: 'Tools like Google Postmaster Tools, MXToolBox, and mail-tester.com can help assess your domain\'s deliverability. Monitoring bounce rates and spam complaints also provides insight.' },
      { question: 'Does email volume affect deliverability?', answer: 'Yes. Sudden spikes in sending volume can trigger spam filters. Gradually increasing volume and maintaining consistent sending patterns helps build and maintain sender reputation.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  {
    slug: 'email-spoofing',
    category: 'glossary',
    meta: {
      title: 'Email Spoofing - Glossary | Siggly',
      description:
        'What is email spoofing? Learn how attackers forge sender addresses, why it is dangerous, and how authentication protocols prevent it.',
      keywords: ['email spoofing', 'forged email', 'sender impersonation', 'email fraud'],
      canonical: '/glossary/email-spoofing',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'Email Spoofing', url: '/glossary/email-spoofing' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'Email Spoofing',
      description:
        'Email spoofing is the forgery of an email\'s sender address to make a message appear as though it came from a trusted source. Attackers use spoofing in phishing attacks, business email compromise, and spam campaigns to deceive recipients into taking harmful actions.',
      variant: 'indigo',
    },
    features: [
      { icon: 'shield', title: 'Authentication Defense', description: 'SPF, DKIM, and DMARC together provide strong protection against domain spoofing.' },
      { icon: 'search', title: 'Header Forgery', description: 'Attackers manipulate the From, Reply-To, and other email headers to impersonate trusted senders.' },
      { icon: 'lock', title: 'Brand Protection', description: 'Preventing spoofing protects your domain\'s reputation and your contacts from fraud.' },
    ],
    featuresTitle: 'What You Need to Know',
    sections: [
      {
        type: 'checklist',
        title: 'Protecting Against Email Spoofing',
        items: [
          'Implement SPF records to authorize legitimate sending servers',
          'Enable DKIM signing on all outbound email',
          'Deploy DMARC with a reject or quarantine policy',
          'Train employees to recognize spoofed emails',
          'Use email clients that display authentication status indicators',
          'Monitor DMARC reports for unauthorized use of your domain',
          'Enable multi-factor authentication on all email accounts',
        ],
      },
    ],
    faqs: [
      { question: 'How does email spoofing work?', answer: 'The SMTP protocol does not inherently verify sender identity. Attackers exploit this by setting the From header to any address they choose. Without SPF, DKIM, and DMARC, receiving servers have no way to verify the claimed sender.' },
      { question: 'Can email spoofing be completely prevented?', answer: 'While SPF, DKIM, and DMARC significantly reduce domain-level spoofing, display name spoofing (using a trusted name with a different address) is harder to prevent and requires user awareness.' },
      { question: 'What is the difference between spoofing and phishing?', answer: 'Spoofing is the technique of forging the sender address. Phishing is the broader attack that uses spoofed emails (or other deceptive methods) to trick recipients into revealing sensitive information or taking harmful actions.' },
      { question: 'How do I know if my domain is being spoofed?', answer: 'Set up DMARC with reporting enabled. The aggregate reports will show you all servers sending email using your domain, including unauthorized ones.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  {
    slug: 'phishing-protection',
    category: 'glossary',
    meta: {
      title: 'Phishing Protection - Glossary | Siggly',
      description:
        'Learn about phishing protection for email, including technical controls, user training, and how consistent email signatures help recipients identify legitimate messages.',
      keywords: ['phishing protection', 'anti-phishing', 'email phishing defense', 'phishing prevention'],
      canonical: '/glossary/phishing-protection',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'Phishing Protection', url: '/glossary/phishing-protection' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'Phishing Protection',
      description:
        'Phishing protection encompasses the technical controls, organizational policies, and user training measures designed to prevent phishing attacks via email. It includes email authentication, content filtering, link scanning, and security awareness programs.',
      variant: 'light',
    },
    features: [
      { icon: 'shield', title: 'Email Authentication', description: 'SPF, DKIM, and DMARC prevent attackers from sending emails that impersonate your domain.' },
      { icon: 'search', title: 'Content Filtering', description: 'Email security gateways scan messages for known phishing patterns, malicious links, and suspicious attachments.' },
      { icon: 'users', title: 'User Awareness', description: 'Training employees to recognize phishing attempts is one of the most effective defense layers.' },
      { icon: 'eye', title: 'Brand Consistency', description: 'Consistent email signatures help recipients distinguish legitimate messages from impersonation attempts.' },
    ],
    featuresTitle: 'Key Aspects',
    sections: [
      {
        type: 'benefits',
        title: 'Benefits of Strong Phishing Protection',
        items: [
          { icon: 'shield', title: 'Data Protection', description: 'Prevents credential theft and unauthorized access to sensitive business and customer data.' },
          { icon: 'lock', title: 'Financial Security', description: 'Blocks business email compromise attacks that trick employees into making fraudulent payments.' },
          { icon: 'award', title: 'Reputation Preservation', description: 'Protects your brand from being used in phishing campaigns targeting your customers and partners.' },
          { icon: 'trending-up', title: 'Regulatory Compliance', description: 'Meets cybersecurity requirements mandated by frameworks like NIST, ISO 27001, and industry regulations.' },
        ],
      },
    ],
    faqs: [
      { question: 'How do consistent email signatures help with phishing protection?', answer: 'When all employees use standardized, professionally designed signatures, recipients learn to recognize the format. Phishing emails attempting to impersonate employees are easier to identify because they lack the correct signature format.' },
      { question: 'What are the most common types of phishing?', answer: 'Common types include spear phishing (targeted at specific individuals), whaling (targeting executives), clone phishing (duplicating legitimate emails), and business email compromise (impersonating internal senders).' },
      { question: 'Can technology alone prevent phishing?', answer: 'No. Technology catches most phishing attempts, but sophisticated attacks can bypass filters. Combining technical controls with regular security awareness training provides the strongest defense.' },
      { question: 'How often should phishing training occur?', answer: 'Security experts recommend formal training at least quarterly, supplemented by ongoing simulated phishing exercises and immediate feedback when employees fall for test scenarios.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  {
    slug: 'email-encryption',
    category: 'glossary',
    meta: {
      title: 'Email Encryption - Glossary | Siggly',
      description:
        'What is email encryption? Learn about TLS, S/MIME, and PGP — the protocols that protect email content from unauthorized reading during transmission and storage.',
      keywords: ['email encryption', 'tls email', 's/mime', 'encrypted email', 'email privacy'],
      canonical: '/glossary/email-encryption',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'Email Encryption', url: '/glossary/email-encryption' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'Email Encryption',
      description:
        'Email encryption is the process of encoding email content so that only authorized recipients can read it. It protects sensitive information from interception during transmission (in-transit encryption) and from unauthorized access when stored on servers (at-rest encryption).',
      variant: 'slate',
    },
    features: [
      { icon: 'lock', title: 'TLS (Transport Layer Security)', description: 'Encrypts the connection between mail servers, protecting emails in transit. Used by most modern providers.' },
      { icon: 'shield', title: 'S/MIME', description: 'Uses digital certificates to encrypt individual messages end-to-end and provide sender verification.' },
      { icon: 'database', title: 'At-Rest Encryption', description: 'Protects stored emails on servers and devices from unauthorized access if the system is compromised.' },
    ],
    featuresTitle: 'Key Aspects',
    sections: [
      {
        type: 'prose',
        title: 'Types of Email Encryption',
        paragraphs: [
          'Transport Layer Security (TLS) is the most common form of email encryption. It secures the connection between sending and receiving mail servers, preventing eavesdropping during transit. Most major email providers enforce TLS by default, but it only protects the connection — not the message itself once it arrives on the destination server.',
          'For stronger protection, end-to-end encryption protocols like S/MIME and PGP (Pretty Good Privacy) encrypt the actual message content. Only the intended recipient, who holds the private decryption key, can read the message. These methods are commonly used in healthcare, legal, and financial industries where message confidentiality is paramount.',
        ],
      },
    ],
    faqs: [
      { question: 'Is my email already encrypted?', answer: 'Most major providers (Gmail, Outlook, etc.) use TLS to encrypt emails in transit by default. However, this only protects the connection between servers, not the email content itself. End-to-end encryption requires S/MIME or PGP.' },
      { question: 'Does email encryption affect signatures?', answer: 'TLS encryption is transparent and does not affect email signatures. S/MIME encryption may affect how HTML signatures are rendered, as the encrypted content is handled differently by email clients.' },
      { question: 'Do I need end-to-end encryption?', answer: 'It depends on your industry and the sensitivity of your communications. Industries handling personal health information, financial data, or legal privileged communication often require it.' },
      { question: 'What is the difference between S/MIME and PGP?', answer: 'Both provide end-to-end encryption, but they use different key management approaches. S/MIME uses centrally issued certificates (common in enterprises). PGP uses a decentralized web of trust model (common among individual users and developers).' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  // ─── Group 3: Email Infrastructure ───

  {
    slug: 'smtp',
    category: 'glossary',
    meta: {
      title: 'SMTP - Email Signature Glossary | Siggly',
      description:
        'What is SMTP? Learn about the Simple Mail Transfer Protocol, the foundational protocol used to send email messages between servers.',
      keywords: ['smtp', 'simple mail transfer protocol', 'email sending protocol', 'smtp server'],
      canonical: '/glossary/smtp',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'SMTP', url: '/glossary/smtp' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'SMTP (Simple Mail Transfer Protocol)',
      description:
        'SMTP is the standard protocol for sending email messages across the internet. Defined in RFC 5321, it handles the transmission of emails from the sender\'s mail client to the outgoing mail server and between mail servers until the message reaches the recipient\'s server.',
      variant: 'violet',
    },
    features: [
      { icon: 'globe', title: 'Internet Standard', description: 'The universal protocol used by virtually all email systems to send and relay messages across the internet.' },
      { icon: 'zap', title: 'Push Protocol', description: 'SMTP pushes email from sender to receiver; it does not retrieve messages (that is handled by IMAP or POP3).' },
      { icon: 'settings', title: 'Port Configuration', description: 'Commonly uses port 25 (server-to-server), port 587 (submission with authentication), and port 465 (implicit TLS).' },
    ],
    featuresTitle: 'Key Aspects',
    sections: [
      {
        type: 'how-it-works',
        title: 'How SMTP Sends Email',
        steps: [
          { step: '1', title: 'Client Submits Message', description: 'Your email client connects to the outgoing SMTP server (usually on port 587) and authenticates with your credentials.' },
          { step: '2', title: 'Server Looks Up Destination', description: 'The sending SMTP server queries DNS for the recipient domain\'s MX (Mail Exchange) record to find the destination server.' },
          { step: '3', title: 'Server-to-Server Transfer', description: 'The sending server connects to the recipient\'s mail server (on port 25) and transfers the message using SMTP commands.' },
          { step: '4', title: 'Message Delivered to Mailbox', description: 'The recipient\'s mail server stores the message, which the recipient can then retrieve using IMAP or POP3.' },
        ],
      },
    ],
    faqs: [
      { question: 'What is the difference between SMTP, IMAP, and POP3?', answer: 'SMTP is for sending email. IMAP and POP3 are for receiving/retrieving email. IMAP syncs messages across devices; POP3 downloads and optionally deletes them from the server.' },
      { question: 'What SMTP port should I use?', answer: 'Use port 587 for sending with authentication (recommended), port 465 for SMTP over implicit TLS, or port 25 for server-to-server relay (not for client submission).' },
      { question: 'Does SMTP support encryption?', answer: 'Yes. STARTTLS upgrades an SMTP connection to TLS on port 587, and port 465 provides implicit TLS. Most modern servers require encrypted connections.' },
      { question: 'How does SMTP relate to email signatures?', answer: 'Email signatures are added to the message body before or during SMTP transmission. Server-side signature injection (used by platforms like Siggly) applies signatures as the message passes through the mail server.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  {
    slug: 'email-client',
    category: 'glossary',
    meta: {
      title: 'Email Client - Glossary | Siggly',
      description:
        'What is an email client? Learn about desktop, mobile, and web-based applications used to compose, send, receive, and manage email messages.',
      keywords: ['email client', 'mail client', 'email application', 'outlook', 'thunderbird', 'apple mail'],
      canonical: '/glossary/email-client',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'Email Client', url: '/glossary/email-client' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'Email Client',
      description:
        'An email client is a software application used to compose, send, receive, and manage email messages. Email clients connect to mail servers using protocols like IMAP, POP3, and SMTP. Examples include Microsoft Outlook, Apple Mail, Thunderbird, and mobile email apps.',
      variant: 'indigo',
    },
    features: [
      { icon: 'mail', title: 'Message Management', description: 'Provides tools for reading, composing, organizing, and searching email messages.' },
      { icon: 'layers', title: 'Multi-Account Support', description: 'Most email clients can connect to multiple email accounts from different providers simultaneously.' },
      { icon: 'settings', title: 'Signature Configuration', description: 'Email clients allow users to set up and manage their email signatures, though centralized control requires additional tools.' },
    ],
    featuresTitle: 'Key Aspects',
    sections: [
      {
        type: 'use-cases-grid',
        title: 'Types of Email Clients',
        cases: [
          { title: 'Desktop Clients', description: 'Installed on a computer. Examples include Microsoft Outlook, Apple Mail, and Thunderbird. They download messages for offline access.' },
          { title: 'Web-Based Clients', description: 'Accessed through a web browser. Examples include Gmail, Outlook.com, and Yahoo Mail. No installation required.' },
          { title: 'Mobile Clients', description: 'Smartphone apps like iOS Mail, Gmail app, and Outlook mobile. Designed for on-the-go email management.' },
          { title: 'Enterprise Clients', description: 'Business-focused clients like Outlook (with Exchange) or Gmail (with Google Workspace) that integrate with organizational tools.' },
        ],
      },
    ],
    faqs: [
      { question: 'Which email client is best for business?', answer: 'Microsoft Outlook and Gmail are the most popular business email clients. The choice usually depends on whether your organization uses Microsoft 365 or Google Workspace.' },
      { question: 'How do email clients handle signatures?', answer: 'Each email client has its own signature settings where users can create and manage signatures. However, individual management leads to inconsistency. Centralized platforms like Siggly deploy uniform signatures across all clients.' },
      { question: 'Do different email clients render HTML signatures differently?', answer: 'Yes. Email clients have varying levels of HTML and CSS support. Outlook uses the Word rendering engine with limited CSS support, while Gmail strips certain styles. Signatures should be tested across major clients.' },
      { question: 'Can I use the same signature across multiple email clients?', answer: 'Manually, you would need to configure each client separately. Siggly automates this by deploying signatures at the server level, ensuring consistency regardless of which client employees use.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  {
    slug: 'webmail',
    category: 'glossary',
    meta: {
      title: 'Webmail - Email Signature Glossary | Siggly',
      description:
        'What is webmail? Learn about browser-based email services like Gmail, Outlook.com, and Yahoo Mail, and how they handle email signatures.',
      keywords: ['webmail', 'web-based email', 'browser email', 'gmail', 'outlook.com'],
      canonical: '/glossary/webmail',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'Webmail', url: '/glossary/webmail' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'Webmail',
      description:
        'Webmail is email accessed through a web browser rather than a dedicated desktop or mobile application. Services like Gmail, Outlook.com, and Yahoo Mail provide webmail interfaces that require no software installation and are accessible from any device with an internet connection.',
      variant: 'light',
    },
    features: [
      { icon: 'globe', title: 'Browser Access', description: 'Access email from any device with a web browser — no software installation or configuration needed.' },
      { icon: 'cloud', title: 'Cloud Storage', description: 'Messages are stored on the provider\'s servers, accessible from anywhere and protected by server-side backups.' },
      { icon: 'refresh-cw', title: 'Automatic Updates', description: 'New features and security patches are applied automatically by the provider with no user action required.' },
    ],
    featuresTitle: 'Key Aspects',
    sections: [
      {
        type: 'prose',
        title: 'Webmail and Email Signatures',
        paragraphs: [
          'Webmail clients handle email signatures differently from desktop applications. Gmail, for instance, has its own signature editor with limited formatting options and manages signatures per account. Outlook.com offers a similar built-in editor. Both support basic HTML formatting but may strip advanced CSS or JavaScript.',
          'For organizations, relying on individual webmail signature settings creates inconsistency. Employees may use different formats, outdated information, or no signature at all. Server-side signature management platforms like Siggly bypass the limitations of webmail signature editors by injecting signatures at the mail server level, ensuring every email has the correct, current signature regardless of how the user accesses their email.',
        ],
      },
    ],
    faqs: [
      { question: 'What is the difference between webmail and an email client?', answer: 'Webmail runs in a browser with no installation needed. An email client is a dedicated application installed on a device. Many services like Gmail and Outlook offer both options.' },
      { question: 'Can I use HTML signatures in webmail?', answer: 'Most webmail services support basic HTML signatures, but the built-in editors have limited formatting options. For advanced signatures, you can paste HTML or use a signature management platform.' },
      { question: 'Is webmail secure?', answer: 'Major webmail providers use TLS encryption, spam filtering, and multi-factor authentication. However, they are accessed over the internet, so network security and account security are important considerations.' },
      { question: 'Why do my signatures look different in webmail vs. desktop clients?', answer: 'Different platforms have different HTML rendering engines and CSS support. Testing signatures across Gmail, Outlook, Yahoo, and Apple Mail is important to ensure consistent appearance.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  {
    slug: 'mail-transfer-agent',
    category: 'glossary',
    meta: {
      title: 'Mail Transfer Agent (MTA) - Glossary | Siggly',
      description:
        'Learn what a Mail Transfer Agent is, how MTAs route email between servers, and their role in the email delivery chain.',
      keywords: ['mail transfer agent', 'mta', 'email relay', 'email routing', 'postfix', 'sendmail'],
      canonical: '/glossary/mail-transfer-agent',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'Mail Transfer Agent', url: '/glossary/mail-transfer-agent' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'Mail Transfer Agent (MTA)',
      description:
        'A Mail Transfer Agent (MTA) is server software responsible for routing and delivering email messages between mail servers using the SMTP protocol. It receives outgoing mail from senders, determines the destination, and relays the message to the recipient\'s mail server.',
      variant: 'slate',
    },
    features: [
      { icon: 'zap', title: 'Message Routing', description: 'Uses DNS MX records to determine where to deliver each email and routes messages accordingly.' },
      { icon: 'database', title: 'Queue Management', description: 'Queues messages when the destination server is unavailable and retries delivery over time.' },
      { icon: 'shield', title: 'Security Filtering', description: 'Modern MTAs include spam filtering, virus scanning, and policy enforcement capabilities.' },
    ],
    featuresTitle: 'What You Need to Know',
    sections: [
      {
        type: 'how-it-works',
        title: 'How a Mail Transfer Agent Works',
        steps: [
          { step: '1', title: 'Receives Email', description: 'The MTA accepts outgoing email from the sender\'s email client or from another MTA relaying the message.' },
          { step: '2', title: 'DNS Lookup', description: 'Queries DNS for the recipient domain\'s MX record to identify the destination mail server.' },
          { step: '3', title: 'Relay or Deliver', description: 'If the MTA is not the final destination, it relays the message to the next MTA in the chain. If it is the destination, it delivers to the local mailbox.' },
          { step: '4', title: 'Handle Failures', description: 'If delivery fails, the MTA queues the message and retries. After exhausting retries, it generates a bounce (non-delivery report) back to the sender.' },
        ],
      },
    ],
    faqs: [
      { question: 'What are common MTA software programs?', answer: 'Common MTAs include Postfix, Sendmail, Microsoft Exchange, Exim, and cloud-based services like Google Workspace and Microsoft 365 which handle MTA functions for their users.' },
      { question: 'How does an MTA differ from an MDA?', answer: 'An MTA (Mail Transfer Agent) routes mail between servers. An MDA (Mail Delivery Agent) delivers the message to the user\'s local mailbox. Some software like Postfix can function as both.' },
      { question: 'Can MTAs modify email content?', answer: 'Yes. MTAs can add headers, apply signatures, append disclaimers, and filter content. Server-side email signature platforms often work at the MTA level to inject signatures into outgoing messages.' },
      { question: 'Do cloud email services use MTAs?', answer: 'Yes. Google Workspace, Microsoft 365, and other cloud email providers operate their own MTAs. The MTA function is managed by the provider, abstracting the complexity from the end user.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  {
    slug: 'exchange-online',
    category: 'glossary',
    meta: {
      title: 'Exchange Online - Glossary | Siggly',
      description:
        'What is Exchange Online? Learn about Microsoft\'s cloud-based email and calendaring service and how it integrates with signature management.',
      keywords: ['exchange online', 'microsoft exchange', 'exchange email', 'cloud exchange', 'microsoft 365 exchange'],
      canonical: '/glossary/exchange-online',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'Exchange Online', url: '/glossary/exchange-online' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'Exchange Online',
      description:
        'Exchange Online is Microsoft\'s cloud-based email, calendar, and contacts service, included in Microsoft 365 (formerly Office 365). It provides enterprise-grade email hosting with built-in security, compliance features, and integration with the Microsoft ecosystem.',
      variant: 'violet',
    },
    features: [
      { icon: 'cloud', title: 'Cloud-Hosted', description: 'Fully managed by Microsoft with no on-premises servers required. Provides 50-100 GB mailboxes per user.' },
      { icon: 'shield', title: 'Built-in Security', description: 'Includes anti-malware, anti-spam, data loss prevention, and encryption capabilities.' },
      { icon: 'settings', title: 'Transport Rules', description: 'Mail flow rules can modify, redirect, or add disclaimers to messages based on configurable conditions.' },
      { icon: 'users', title: 'Active Directory Integration', description: 'Syncs with Azure AD for centralized user management, making it ideal for enterprises.' },
    ],
    featuresTitle: 'Key Aspects',
    sections: [
      {
        type: 'prose',
        title: 'Exchange Online and Email Signatures',
        paragraphs: [
          'Exchange Online provides built-in mail flow rules (transport rules) that can append disclaimers and basic signature text to outgoing emails. However, these native rules are limited in formatting options and do not support rich HTML designs, images, or per-user dynamic content effectively.',
          'Organizations that need visually branded, dynamic email signatures for Exchange Online typically use third-party signature management platforms. Siggly integrates with Exchange Online and Microsoft 365 to deploy professional, HTML-formatted signatures with dynamic fields (name, title, phone) pulled from Azure Active Directory, providing far richer signatures than native transport rules allow.',
        ],
      },
    ],
    faqs: [
      { question: 'Can Exchange Online add email signatures automatically?', answer: 'Exchange Online has basic transport rules that can append text disclaimers, but they lack support for rich HTML formatting, images, and per-user dynamic content. Third-party tools are needed for professional signatures.' },
      { question: 'How does Siggly work with Exchange Online?', answer: 'Siggly integrates with Microsoft 365 and Exchange Online via Microsoft Graph API. It pulls user data from Azure AD and applies branded, dynamic signatures to all outgoing emails.' },
      { question: 'Is Exchange Online the same as Outlook?', answer: 'No. Exchange Online is the server-side email hosting service. Outlook is the email client application used to access Exchange Online mailboxes. Exchange Online can also be accessed via Outlook on the web (OWA).' },
      { question: 'Does Exchange Online support DKIM and DMARC?', answer: 'Yes. Exchange Online supports custom DKIM signing, SPF records, and DMARC policies. Microsoft provides documentation for configuring these authentication protocols for your domain.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  {
    slug: 'google-workspace-email',
    category: 'glossary',
    meta: {
      title: 'Google Workspace Email - Glossary | Siggly',
      description:
        'Learn about Google Workspace email (Gmail for business), its features, and how organizations manage email signatures across their Google Workspace domain.',
      keywords: ['google workspace email', 'gmail for business', 'g suite email', 'google workspace gmail'],
      canonical: '/glossary/google-workspace-email',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'Google Workspace Email', url: '/glossary/google-workspace-email' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'Google Workspace Email',
      description:
        'Google Workspace Email is Gmail for business, providing professional email addresses on your custom domain along with 30 GB to unlimited storage, advanced admin controls, and integration with Google\'s productivity suite (Drive, Calendar, Meet, Docs).',
      variant: 'indigo',
    },
    features: [
      { icon: 'mail', title: 'Custom Domain Email', description: 'Send and receive email from your own domain (you@company.com) powered by Gmail\'s infrastructure.' },
      { icon: 'search', title: 'Powerful Search', description: 'Gmail\'s search capabilities make finding emails fast, even across large mailboxes with years of history.' },
      { icon: 'shield', title: 'Security Features', description: 'Includes phishing protection, spam filtering, two-factor authentication, and data loss prevention.' },
      { icon: 'cloud', title: 'Cloud-Native', description: 'No servers to manage. Google handles uptime (99.9% SLA), updates, and security patches.' },
    ],
    featuresTitle: 'Key Aspects',
    sections: [
      {
        type: 'checklist',
        title: 'Google Workspace Email Signature Best Practices',
        items: [
          'Use the Gmail Admin console to set organization-wide signature defaults',
          'Create HTML signatures that are compatible with Gmail\'s rendering engine',
          'Keep images under 10 KB and use hosted URLs rather than embedded images',
          'Limit signature width to 600 pixels for consistent display',
          'Use a centralized platform like Siggly for dynamic, per-user signatures',
          'Test signatures in both Gmail web and the Gmail mobile app',
          'Include your Google Meet link for easy scheduling',
        ],
      },
    ],
    faqs: [
      { question: 'Can Google Workspace manage email signatures centrally?', answer: 'Google Workspace Admin console allows setting a default append footer, but it has limited formatting. For rich, per-user HTML signatures, a third-party tool like Siggly is recommended.' },
      { question: 'How does Siggly integrate with Google Workspace?', answer: 'Siggly connects via Google Workspace APIs to pull user directory data and deploy personalized HTML signatures to each user\'s Gmail account automatically.' },
      { question: 'Does Gmail support HTML email signatures?', answer: 'Yes. Gmail supports HTML signatures, but the built-in editor has limited options. You can paste HTML directly into the signature settings or use a management tool for richer designs.' },
      { question: 'What is the maximum Gmail signature size?', answer: 'Gmail limits signatures to approximately 10,000 characters of HTML. Images should be hosted externally and referenced by URL rather than embedded, as embedded images count toward this limit.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  {
    slug: 'microsoft-365-email',
    category: 'glossary',
    meta: {
      title: 'Microsoft 365 Email - Glossary | Siggly',
      description:
        'Learn about Microsoft 365 email services, including Exchange Online, Outlook, and how organizations manage email signatures in the Microsoft ecosystem.',
      keywords: ['microsoft 365 email', 'office 365 email', 'outlook 365', 'microsoft business email'],
      canonical: '/glossary/microsoft-365-email',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'Microsoft 365 Email', url: '/glossary/microsoft-365-email' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'Microsoft 365 Email',
      description:
        'Microsoft 365 Email provides professional business email through Exchange Online, accessible via Outlook desktop, Outlook on the web (OWA), and Outlook mobile. It includes enterprise security, compliance tools, and deep integration with the Microsoft 365 productivity suite.',
      variant: 'light',
    },
    features: [
      { icon: 'mail', title: 'Outlook Integration', description: 'Seamlessly connects with Outlook desktop, web, and mobile clients for a consistent experience.' },
      { icon: 'shield', title: 'Enterprise Security', description: 'Advanced Threat Protection, data loss prevention, and compliance tools built into every plan.' },
      { icon: 'users', title: 'Azure AD Integration', description: 'Centralized identity management with single sign-on across all Microsoft 365 services.' },
      { icon: 'layers', title: 'Full Productivity Suite', description: 'Email integrates with Teams, SharePoint, OneDrive, and Office apps for a unified workflow.' },
    ],
    featuresTitle: 'Key Aspects',
    sections: [
      {
        type: 'benefits',
        title: 'Benefits of Microsoft 365 for Email Signatures',
        items: [
          { icon: 'users', title: 'Azure AD User Data', description: 'Signature management tools can pull employee details (name, title, department) directly from Azure AD for dynamic personalization.' },
          { icon: 'settings', title: 'Transport Rules', description: 'Exchange Online transport rules provide a native (though limited) option for appending disclaimers and basic signatures.' },
          { icon: 'layers', title: 'Multi-Client Consistency', description: 'Signatures deployed at the server level appear consistently across Outlook desktop, web, and mobile.' },
          { icon: 'shield', title: 'Compliance Support', description: 'Microsoft 365\'s compliance center helps ensure email communications and signatures meet regulatory requirements.' },
        ],
      },
    ],
    faqs: [
      { question: 'How do I manage email signatures in Microsoft 365?', answer: 'You can set signatures individually in Outlook, use Exchange transport rules for basic disclaimers, or use a centralized platform like Siggly for rich, branded signatures deployed across the organization.' },
      { question: 'Does Outlook support HTML signatures?', answer: 'Yes. Outlook desktop, Outlook on the web, and Outlook mobile all support HTML signatures. However, Outlook desktop uses the Word rendering engine, which has quirks with certain CSS properties.' },
      { question: 'Can I set different signatures for different departments?', answer: 'Not natively with Microsoft 365 alone. Siggly supports rule-based signature assignment, allowing different templates for departments, offices, or roles based on Azure AD attributes.' },
      { question: 'What is the difference between Microsoft 365 and Office 365?', answer: 'Microsoft 365 is the current branding that includes Office 365 services plus additional security and compliance features. Office 365 plans still exist but are being consolidated under the Microsoft 365 brand.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  {
    slug: 'email-header',
    category: 'glossary',
    meta: {
      title: 'Email Header - Glossary | Siggly',
      description:
        'What is an email header? Learn about the metadata fields in every email that contain routing information, authentication results, and message details.',
      keywords: ['email header', 'email metadata', 'message headers', 'email routing information'],
      canonical: '/glossary/email-header',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'Email Header', url: '/glossary/email-header' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'Email Header',
      description:
        'An email header is the section of an email message that contains metadata about the message, including the sender, recipient, subject, date, routing path, and authentication results. Headers are mostly hidden from users but are essential for email delivery, troubleshooting, and security analysis.',
      variant: 'slate',
    },
    features: [
      { icon: 'file-text', title: 'Routing Information', description: 'Contains Received headers showing the path the email took from sender to recipient through various servers.' },
      { icon: 'shield', title: 'Authentication Results', description: 'Records SPF, DKIM, and DMARC check results, providing transparency into authentication status.' },
      { icon: 'search', title: 'Troubleshooting Tool', description: 'Analyzing headers helps diagnose delivery issues, identify spoofing, and trace message routing.' },
    ],
    featuresTitle: 'What You Need to Know',
    sections: [
      {
        type: 'prose',
        title: 'Key Email Header Fields',
        paragraphs: [
          'Every email contains dozens of header fields, most of which are hidden by default in email clients. The most familiar headers are From, To, Subject, and Date. Beyond these, technical headers like Message-ID, Received, Return-Path, and Authentication-Results provide critical information about the message\'s origin and journey.',
          'The Received headers are particularly important for troubleshooting. Each mail server that handles the message adds a Received header, creating a traceable path from sender to recipient. Reading these headers from bottom to top reveals the chronological journey of the email. DKIM-Signature and Authentication-Results headers show whether the email passed security checks.',
        ],
      },
    ],
    faqs: [
      { question: 'How do I view email headers?', answer: 'In Gmail, click the three dots menu and select "Show original." In Outlook, open the message and go to File > Properties > Internet headers. Most email clients have a similar "view source" or "show headers" option.' },
      { question: 'What is the difference between the From and Return-Path headers?', answer: 'The From header shows the display address seen by the recipient. The Return-Path (envelope sender) is the address where bounces are sent. They can differ, which is why DMARC checks alignment between them.' },
      { question: 'Can email headers be forged?', answer: 'The From header can be easily forged, which is why email authentication (SPF, DKIM, DMARC) exists. The Received headers added by your own server and trusted intermediaries are generally reliable.' },
      { question: 'Do email signatures appear in headers?', answer: 'No. Email signatures are part of the message body, not the headers. Headers contain metadata about the message, while the body contains the actual content including any signature.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  // ─── Group 4: Signature Management ───

  {
    slug: 'signature-deployment',
    category: 'glossary',
    meta: {
      title: 'Signature Deployment - Glossary | Siggly',
      description:
        'What is signature deployment? Learn how organizations push email signatures to all employees automatically using centralized management tools.',
      keywords: ['signature deployment', 'deploy email signatures', 'signature rollout', 'automatic signature deployment'],
      canonical: '/glossary/signature-deployment',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'Signature Deployment', url: '/glossary/signature-deployment' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'Signature Deployment',
      description:
        'Signature deployment is the process of pushing email signatures to employees\' email accounts automatically. Rather than relying on individuals to set up their own signatures, centralized deployment ensures every user has the correct, approved signature applied to their outgoing emails.',
      variant: 'violet',
    },
    features: [
      { icon: 'zap', title: 'Automatic Rollout', description: 'Signatures are pushed to all users simultaneously without requiring manual action from each employee.' },
      { icon: 'users', title: 'Organization-Wide', description: 'Deploy to specific departments, offices, or the entire company from a single management console.' },
      { icon: 'refresh-cw', title: 'Instant Updates', description: 'Changes to signature templates propagate to all users immediately without individual reconfiguration.' },
      { icon: 'check-circle', title: 'Compliance Assurance', description: 'Guarantees every employee uses an approved, compliant signature without relying on individual responsibility.' },
    ],
    featuresTitle: 'Key Aspects',
    sections: [
      {
        type: 'how-it-works',
        title: 'How Signature Deployment Works',
        steps: [
          { step: '1', title: 'Design the Template', description: 'Create a branded signature template with dynamic placeholders for employee-specific information.' },
          { step: '2', title: 'Configure Rules', description: 'Define which users, departments, or groups receive which signature template.' },
          { step: '3', title: 'Sync User Data', description: 'Connect to your directory (Azure AD, Google Workspace) to pull each employee\'s name, title, phone, and other fields.' },
          { step: '4', title: 'Deploy Signatures', description: 'Push personalized signatures to all target users. Each person gets a unique signature populated with their own details.' },
        ],
      },
    ],
    faqs: [
      { question: 'What are the methods for deploying email signatures?', answer: 'Methods include server-side injection (applied by the mail server), client-side deployment (pushed to the email client settings), and API-based deployment (using Google Workspace or Microsoft 365 APIs).' },
      { question: 'Can deployment be scheduled?', answer: 'Yes. Platforms like Siggly support scheduled deployments, allowing you to time signature updates for rebrands, campaigns, or compliance deadlines.' },
      { question: 'What happens when a new employee joins?', answer: 'With directory sync enabled, new users are automatically detected and receive the appropriate signature based on their department, role, or other attributes.' },
      { question: 'Does deployment work on mobile email apps?', answer: 'Server-side deployment applies signatures regardless of the email client used, including mobile apps. Client-side deployment may have limitations on mobile devices.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  {
    slug: 'directory-sync',
    category: 'glossary',
    meta: {
      title: 'Directory Sync - Glossary | Siggly',
      description:
        'Learn about directory sync for email signatures — how employee data from Azure AD or Google Directory is used to populate dynamic signature fields.',
      keywords: ['directory sync', 'active directory sync', 'user directory integration', 'ad sync signatures'],
      canonical: '/glossary/directory-sync',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'Directory Sync', url: '/glossary/directory-sync' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'Directory Sync',
      description:
        'Directory sync is the process of automatically importing and synchronizing employee data from a corporate directory (such as Azure Active Directory or Google Workspace Directory) into a signature management platform. This data populates dynamic fields in email signatures.',
      variant: 'indigo',
    },
    features: [
      { icon: 'database', title: 'Automated Data Import', description: 'Pulls employee details like name, title, department, and phone number directly from your directory.' },
      { icon: 'refresh-cw', title: 'Continuous Sync', description: 'Automatically detects changes (new hires, title changes, departures) and updates signatures accordingly.' },
      { icon: 'users', title: 'Single Source of Truth', description: 'Eliminates data entry errors by using the corporate directory as the authoritative source for contact details.' },
    ],
    featuresTitle: 'Key Aspects',
    sections: [
      {
        type: 'prose',
        title: 'How Directory Sync Powers Email Signatures',
        paragraphs: [
          'Maintaining accurate email signatures across an organization is challenging when employee information changes frequently. People get promoted, change phone numbers, move offices, or update their professional certifications. Without directory sync, each change requires manual signature updates — a process that is error-prone and time-consuming.',
          'Directory sync solves this by connecting the signature management platform to the organization\'s user directory. When an employee\'s title changes in Azure AD or Google Workspace, the signature platform detects the change and automatically updates their email signature. This ensures signatures are always current without any manual intervention from IT or the employee.',
        ],
      },
    ],
    faqs: [
      { question: 'What directories does Siggly sync with?', answer: 'Siggly supports synchronization with Google Workspace Directory and Microsoft Azure Active Directory, covering the two most common enterprise email platforms.' },
      { question: 'How often does directory sync update?', answer: 'Sync frequency depends on the platform. Siggly syncs regularly and also supports on-demand sync when you need immediate updates after organizational changes.' },
      { question: 'What fields can be synced from the directory?', answer: 'Common fields include first name, last name, job title, department, phone numbers, office location, profile photo, and custom attributes defined in your directory.' },
      { question: 'What happens if directory data is missing for a user?', answer: 'Signature platforms typically handle missing fields gracefully — either omitting the empty field from the signature or displaying a fallback value. Siggly shows which users have incomplete data so you can address gaps.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  {
    slug: 'centralized-signature-management',
    category: 'glossary',
    meta: {
      title: 'Centralized Signature Management - Glossary | Siggly',
      description:
        'Learn about centralized email signature management — the practice of controlling all employee signatures from a single administrative platform.',
      keywords: ['centralized signature management', 'signature management platform', 'enterprise signature management', 'email signature control'],
      canonical: '/glossary/centralized-signature-management',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'Centralized Signature Management', url: '/glossary/centralized-signature-management' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'Centralized Signature Management',
      description:
        'Centralized signature management is the practice of designing, deploying, and maintaining all employee email signatures from a single administrative platform. It replaces the fragmented approach of individual users creating their own signatures with an organization-wide system.',
      variant: 'light',
    },
    features: [
      { icon: 'settings', title: 'Single Admin Console', description: 'Manage all signatures from one dashboard — design templates, assign to users, and monitor deployment status.' },
      { icon: 'award', title: 'Brand Consistency', description: 'Ensures every employee\'s signature matches approved brand guidelines with no individual deviations.' },
      { icon: 'shield', title: 'Compliance Control', description: 'Guarantees required disclaimers and legal notices are present in every outbound email.' },
      { icon: 'clock', title: 'Time Savings', description: 'Eliminates the need for IT to manually configure signatures for each user, saving hours per employee.' },
    ],
    featuresTitle: 'Key Aspects',
    sections: [
      {
        type: 'checklist',
        title: 'Signs You Need Centralized Signature Management',
        items: [
          'Employees create their own signatures with inconsistent formatting',
          'IT spends significant time setting up signatures for new hires',
          'You have discovered outdated or inaccurate contact information in signatures',
          'Your organization has been through a rebrand and signatures still show old logos',
          'Legal or compliance has flagged missing disclaimers in employee emails',
          'You want to use email signatures for marketing campaigns or announcements',
          'Your company has more than 20 employees using business email',
          'You need to manage signatures across multiple email platforms',
        ],
      },
    ],
    faqs: [
      { question: 'What is the alternative to centralized management?', answer: 'The alternative is decentralized or individual management, where each employee creates and maintains their own signature. This approach leads to inconsistent branding, outdated information, and compliance gaps.' },
      { question: 'Does centralized management work for remote teams?', answer: 'Yes. Cloud-based signature management platforms work regardless of employee location. Signatures are deployed via APIs or server-side injection, so physical location does not matter.' },
      { question: 'Can different departments have different signatures?', answer: 'Yes. Centralized platforms like Siggly support multiple templates assigned by department, role, office, or other criteria while maintaining overall brand consistency.' },
      { question: 'How long does it take to set up centralized signature management?', answer: 'With Siggly, initial setup typically takes less than an hour. Connect your directory, design your template, assign to users, and deploy. Ongoing maintenance is minimal.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  {
    slug: 'signature-template',
    category: 'glossary',
    meta: {
      title: 'Signature Template - Glossary | Siggly',
      description:
        'What is a signature template? Learn about reusable email signature layouts with dynamic placeholders that ensure consistent branding across your team.',
      keywords: ['signature template', 'email signature template', 'signature layout', 'signature design template'],
      canonical: '/glossary/signature-template',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'Signature Template', url: '/glossary/signature-template' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'Signature Template',
      description:
        'A signature template is a reusable email signature layout that defines the visual structure, branding elements, and dynamic field placeholders. Templates allow organizations to create a consistent design once and personalize it for each employee with their specific contact information.',
      variant: 'slate',
    },
    features: [
      { icon: 'layers', title: 'Reusable Design', description: 'Create once, deploy to many. One template serves all users while personalizing individual details.' },
      { icon: 'eye', title: 'Brand Compliance', description: 'Locks in approved logos, colors, and fonts so users cannot deviate from brand guidelines.' },
      { icon: 'zap', title: 'Dynamic Fields', description: 'Placeholders like {{name}}, {{title}}, and {{phone}} are automatically filled from directory data.' },
    ],
    featuresTitle: 'Key Aspects',
    sections: [
      {
        type: 'how-it-works',
        title: 'How Signature Templates Work',
        steps: [
          { step: '1', title: 'Choose a Layout', description: 'Select from pre-built layouts or create a custom design using a visual editor or HTML.' },
          { step: '2', title: 'Add Branding', description: 'Insert your company logo, set brand colors, and choose fonts that match your style guide.' },
          { step: '3', title: 'Insert Dynamic Fields', description: 'Add placeholders for employee-specific data that will be populated from your user directory.' },
          { step: '4', title: 'Assign and Deploy', description: 'Assign the template to users or groups and deploy. Each recipient gets a personalized signature from the shared template.' },
        ],
      },
    ],
    faqs: [
      { question: 'How many templates do I need?', answer: 'Most organizations need 1-3 templates: one primary template for general use, and optionally separate templates for executives or specific departments. Siggly lets you create unlimited templates.' },
      { question: 'Can employees customize their own templates?', answer: 'In centralized management, templates are controlled by administrators. Employees receive their personalized signature automatically. Some platforms allow limited personalization (e.g., choosing a preferred pronouns field).' },
      { question: 'What makes a good signature template?', answer: 'A good template is visually clean, mobile-responsive, under 600 pixels wide, uses web-safe fonts, and includes only essential information. It should render well across all major email clients.' },
      { question: 'Can templates include marketing banners?', answer: 'Yes. Most signature management platforms, including Siggly, support banner slots in templates where administrators can add and rotate promotional images with tracked links.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  {
    slug: 'dynamic-fields',
    category: 'glossary',
    meta: {
      title: 'Dynamic Fields - Glossary | Siggly',
      description:
        'Learn about dynamic fields in email signatures — placeholders that automatically populate with each employee\'s unique contact information.',
      keywords: ['dynamic fields', 'signature placeholders', 'merge fields', 'dynamic signature content', 'personalization fields'],
      canonical: '/glossary/dynamic-fields',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'Dynamic Fields', url: '/glossary/dynamic-fields' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'Dynamic Fields',
      description:
        'Dynamic fields (also called merge fields or placeholders) are variables in email signature templates that are automatically replaced with employee-specific data at deployment time. For example, {{firstName}} becomes "Jane" for one user and "John" for another.',
      variant: 'violet',
    },
    features: [
      { icon: 'users', title: 'Per-User Personalization', description: 'Each employee gets a unique signature generated from the same template using their specific data.' },
      { icon: 'database', title: 'Directory-Driven', description: 'Field values are pulled from Azure AD, Google Workspace, or other user directories automatically.' },
      { icon: 'refresh-cw', title: 'Auto-Updating', description: 'When directory data changes (e.g., a title update), the dynamic field updates the signature automatically.' },
    ],
    featuresTitle: 'Key Aspects',
    sections: [
      {
        type: 'use-cases-grid',
        title: 'Common Dynamic Fields',
        cases: [
          { title: 'Name & Title', description: 'First name, last name, full name, job title, and pronouns pulled directly from the user directory.' },
          { title: 'Contact Details', description: 'Phone number, mobile number, fax, and email address for each individual employee.' },
          { title: 'Department & Location', description: 'Department name, office location, building, floor, and mailing address.' },
          { title: 'Company Information', description: 'Company name, division, subsidiary, and registered address — useful for multi-entity organizations.' },
          { title: 'Social & Web Links', description: 'Personal LinkedIn profile, company social URLs, and individual or team web pages.' },
          { title: 'Custom Attributes', description: 'License numbers, certifications, languages spoken, or any custom field defined in your directory.' },
        ],
      },
    ],
    faqs: [
      { question: 'What happens if a dynamic field is empty for a user?', answer: 'Well-designed signature platforms handle this gracefully by hiding the field and its label entirely, rather than showing an empty placeholder. Siggly supports conditional visibility for fields.' },
      { question: 'Can I create custom dynamic fields?', answer: 'Yes. Beyond standard fields like name and title, Siggly supports custom attributes from your directory. If the data exists in Azure AD or Google Workspace, it can be used as a dynamic field.' },
      { question: 'How are dynamic fields different from mail merge?', answer: 'The concept is similar. Mail merge populates templates with recipient data for mass emails. Dynamic fields in signatures populate templates with sender data for personalized signatures.' },
      { question: 'Can dynamic fields include images?', answer: 'Yes. Profile photos and department-specific logos can be dynamic fields, pulling from directory profile pictures or mapped image URLs based on department or role.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  {
    slug: 'role-based-access-control',
    category: 'glossary',
    meta: {
      title: 'Role-Based Access Control - Glossary | Siggly',
      description:
        'Learn about RBAC for email signature management — how organizations control who can create, edit, approve, and deploy signatures.',
      keywords: ['role-based access control', 'rbac', 'signature permissions', 'admin roles', 'access control'],
      canonical: '/glossary/role-based-access-control',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'Role-Based Access Control', url: '/glossary/role-based-access-control' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'Role-Based Access Control (RBAC)',
      description:
        'Role-Based Access Control is a security approach that restricts system access based on a user\'s assigned role within the organization. In signature management, RBAC determines who can design templates, approve changes, deploy signatures, and view analytics.',
      variant: 'indigo',
    },
    features: [
      { icon: 'lock', title: 'Permission Levels', description: 'Define granular permissions — viewer, editor, approver, deployer, admin — for different team members.' },
      { icon: 'users', title: 'Delegation', description: 'Allow marketing to design templates while IT handles deployment and compliance teams approve content.' },
      { icon: 'shield', title: 'Security', description: 'Prevents unauthorized changes to email signatures that could affect brand consistency or compliance.' },
    ],
    featuresTitle: 'What You Need to Know',
    sections: [
      {
        type: 'benefits',
        title: 'Benefits of RBAC for Signature Management',
        items: [
          { icon: 'shield', title: 'Reduced Risk', description: 'Only authorized personnel can modify and deploy signatures, reducing the risk of unauthorized or incorrect changes.' },
          { icon: 'users', title: 'Team Collaboration', description: 'Multiple teams (marketing, IT, compliance) can collaborate on signatures with clear role boundaries.' },
          { icon: 'check-circle', title: 'Audit Trail', description: 'RBAC combined with logging creates a clear record of who made what changes and when.' },
          { icon: 'settings', title: 'Scalability', description: 'As your organization grows, RBAC makes it easy to onboard new administrators with predefined permission sets.' },
        ],
      },
    ],
    faqs: [
      { question: 'What roles are typically used in signature management?', answer: 'Common roles include Viewer (can see signatures), Designer (can create/edit templates), Approver (can approve changes before deployment), Deployer (can push signatures to users), and Admin (full access).' },
      { question: 'Why is RBAC important for email signatures?', answer: 'Email signatures affect brand image and legal compliance for every outbound email. RBAC ensures that only authorized personnel can make changes, preventing accidental or unauthorized modifications.' },
      { question: 'Can RBAC be scoped to specific departments?', answer: 'Yes. In Siggly, administrators can be granted access to manage signatures for specific departments or groups rather than the entire organization, enabling decentralized management with central oversight.' },
      { question: 'How does RBAC differ from simple admin/user roles?', answer: 'Simple admin/user models offer only two levels. RBAC provides granular, customizable roles with specific permission sets, enabling more nuanced control over who can do what.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  {
    slug: 'signature-versioning',
    category: 'glossary',
    meta: {
      title: 'Signature Versioning - Glossary | Siggly',
      description:
        'What is signature versioning? Learn how organizations track changes to email signature templates over time and roll back when needed.',
      keywords: ['signature versioning', 'signature version control', 'template history', 'signature rollback'],
      canonical: '/glossary/signature-versioning',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'Signature Versioning', url: '/glossary/signature-versioning' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'Signature Versioning',
      description:
        'Signature versioning is the practice of maintaining a history of all changes made to email signature templates. It allows administrators to track what was changed, when, and by whom, and to roll back to a previous version if needed.',
      variant: 'light',
    },
    features: [
      { icon: 'clock', title: 'Change History', description: 'Every edit to a signature template is recorded with a timestamp and the identity of the person who made the change.' },
      { icon: 'refresh-cw', title: 'Rollback Capability', description: 'Quickly revert to any previous version if a new signature has issues or was deployed in error.' },
      { icon: 'search', title: 'Audit Compliance', description: 'Provides a documented trail of signature changes to satisfy audit and compliance requirements.' },
    ],
    featuresTitle: 'Key Aspects',
    sections: [
      {
        type: 'prose',
        title: 'Why Signature Versioning Matters',
        paragraphs: [
          'In organizations where email signatures must meet brand guidelines and regulatory requirements, uncontrolled changes can create serious problems. A marketing team member might update a banner that accidentally removes a required legal disclaimer. A designer might introduce a layout that breaks in certain email clients. Without versioning, diagnosing and fixing these issues is slow and error-prone.',
          'Signature versioning solves this by treating templates like version-controlled documents. Each change creates a new version that can be compared against previous ones. If an issue arises after a deployment, administrators can instantly roll back to the last known good version while they investigate the problem. This capability is especially valuable during rebrands, campaign changes, and compliance updates.',
        ],
      },
    ],
    faqs: [
      { question: 'How many versions of a signature should I keep?', answer: 'Best practice is to retain at least the last 10-20 versions or 90 days of history. Some compliance frameworks require longer retention periods. Siggly maintains a complete version history.' },
      { question: 'Can I compare two versions of a signature?', answer: 'Yes. Version comparison (diffing) shows exactly what changed between two versions, making it easy to identify modifications to text, images, links, or HTML structure.' },
      { question: 'Is versioning the same as having multiple templates?', answer: 'No. Multiple templates are different signature designs used simultaneously by different groups. Versioning tracks the change history of a single template over time.' },
      { question: 'Who should have permission to roll back signatures?', answer: 'Typically, only administrators or designated deployers should have rollback permission. This should be controlled through role-based access control to prevent unauthorized reversions.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  {
    slug: 'bulk-signature-update',
    category: 'glossary',
    meta: {
      title: 'Bulk Signature Update - Glossary | Siggly',
      description:
        'Learn about bulk signature updates — the ability to change email signatures for hundreds or thousands of employees simultaneously.',
      keywords: ['bulk signature update', 'mass signature change', 'batch signature deployment', 'organization-wide update'],
      canonical: '/glossary/bulk-signature-update',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'Bulk Signature Update', url: '/glossary/bulk-signature-update' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'Bulk Signature Update',
      description:
        'A bulk signature update is the process of modifying email signatures for a large number of users simultaneously. This is essential for rebrands, campaign launches, compliance changes, and any scenario where all or many employee signatures need to change at once.',
      variant: 'slate',
    },
    features: [
      { icon: 'zap', title: 'Speed', description: 'Update thousands of signatures in minutes rather than hours or days of manual work.' },
      { icon: 'check-circle', title: 'Consistency', description: 'Guarantees every targeted user receives the same update simultaneously, eliminating transition periods.' },
      { icon: 'clock', title: 'Scheduling', description: 'Schedule bulk updates for a specific date and time, such as a rebrand launch day.' },
    ],
    featuresTitle: 'What You Need to Know',
    sections: [
      {
        type: 'checklist',
        title: 'Bulk Update Best Practices',
        items: [
          'Preview the updated signature for sample users from different departments before deploying',
          'Schedule updates during off-peak hours to minimize disruption',
          'Notify employees about upcoming signature changes in advance',
          'Test the updated signature across major email clients (Gmail, Outlook, Apple Mail)',
          'Keep the previous version available for quick rollback if issues arise',
          'Verify dynamic fields populate correctly for users with varying data completeness',
          'Monitor deployment status to ensure all targeted users receive the update',
        ],
      },
    ],
    faqs: [
      { question: 'How long does a bulk update take?', answer: 'With a platform like Siggly, bulk updates typically complete within minutes for organizations of any size. API rate limits from email providers may add some delay for very large organizations.' },
      { question: 'Can I update only certain users in a bulk update?', answer: 'Yes. Bulk updates can be targeted to specific departments, offices, or user groups. You do not have to update every user in the organization.' },
      { question: 'What triggers the need for a bulk update?', answer: 'Common triggers include company rebrands, new marketing campaigns, updated legal disclaimers, office relocations, phone system changes, and seasonal promotions.' },
      { question: 'Can bulk updates be undone?', answer: 'Yes. With signature versioning, you can roll back a bulk update to restore the previous signatures if needed. Siggly supports one-click rollback to any previous version.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  // ─── Group 5: Marketing & Analytics ───

  {
    slug: 'email-banner-campaign',
    category: 'glossary',
    meta: {
      title: 'Email Banner Campaign - Glossary | Siggly',
      description:
        'What is an email banner campaign? Learn how organizations use promotional banners in email signatures to drive awareness, traffic, and conversions.',
      keywords: ['email banner campaign', 'signature banner', 'email signature marketing', 'promotional email banner'],
      canonical: '/glossary/email-banner-campaign',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'Email Banner Campaign', url: '/glossary/email-banner-campaign' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'Email Banner Campaign',
      description:
        'An email banner campaign uses promotional images embedded in employee email signatures to market products, events, content, or initiatives. Each email sent by an employee becomes a marketing impression, leveraging the high volume of daily business email to reach prospects and clients organically.',
      variant: 'violet',
    },
    features: [
      { icon: 'target', title: 'High Reach', description: 'The average employee sends 40+ emails per day. A banner campaign turns each one into a marketing touchpoint.' },
      { icon: 'bar-chart-3', title: 'Measurable Results', description: 'Track impressions, clicks, and conversions from banner links to measure campaign effectiveness.' },
      { icon: 'clock', title: 'Campaign Scheduling', description: 'Set start and end dates for banners to align with marketing calendars and promotional periods.' },
      { icon: 'refresh-cw', title: 'Easy Rotation', description: 'Swap banners without changing the underlying signature template, keeping content fresh.' },
    ],
    featuresTitle: 'Key Aspects',
    sections: [
      {
        type: 'how-it-works',
        title: 'How Email Banner Campaigns Work',
        steps: [
          { step: '1', title: 'Design the Banner', description: 'Create a visually compelling banner image (typically 600x100 pixels) with a clear call-to-action.' },
          { step: '2', title: 'Set the Target Link', description: 'Define the destination URL with UTM parameters for campaign tracking in your analytics platform.' },
          { step: '3', title: 'Assign to Users', description: 'Deploy the banner to all employees or specific departments through your signature management platform.' },
          { step: '4', title: 'Monitor Performance', description: 'Track clicks and engagement through your analytics dashboard. Iterate on messaging and design based on results.' },
        ],
      },
    ],
    faqs: [
      { question: 'How effective are email banner campaigns?', answer: 'Email signature banners typically achieve 1-5% click-through rates, which compares favorably to display advertising (0.1-0.3%). Because recipients already have a relationship with the sender, engagement tends to be higher.' },
      { question: 'What size should a signature banner be?', answer: 'The recommended size is 600 pixels wide by 80-150 pixels tall. Keep the file size under 100 KB for fast loading. Use PNG or JPEG format for best compatibility.' },
      { question: 'Can I run multiple banner campaigns simultaneously?', answer: 'Yes. You can assign different banners to different departments or rotate multiple banners for the same users. Siggly supports A/B testing of banners to optimize performance.' },
      { question: 'Do banner campaigns affect email deliverability?', answer: 'Properly optimized banners (small file size, hosted externally) have minimal impact on deliverability. Avoid using very large images or too many images in a single signature.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  {
    slug: 'click-through-rate',
    category: 'glossary',
    meta: {
      title: 'Click-Through Rate (CTR) - Glossary | Siggly',
      description:
        'What is click-through rate? Learn how CTR measures email signature engagement and how to optimize it for better marketing results.',
      keywords: ['click-through rate', 'ctr', 'email ctr', 'signature click rate', 'banner click rate'],
      canonical: '/glossary/click-through-rate',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'Click-Through Rate', url: '/glossary/click-through-rate' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'Click-Through Rate (CTR)',
      description:
        'Click-through rate (CTR) is a metric that measures the percentage of people who click on a link or banner after viewing it. In email signature marketing, CTR tracks how many recipients click on signature banners, social links, or call-to-action buttons relative to the total number of emails sent.',
      variant: 'indigo',
    },
    features: [
      { icon: 'bar-chart-3', title: 'Performance Indicator', description: 'CTR is the primary metric for evaluating the effectiveness of links and banners in email signatures.' },
      { icon: 'target', title: 'Engagement Measure', description: 'A higher CTR indicates that your signature content resonates with recipients and motivates action.' },
      { icon: 'trending-up', title: 'Optimization Driver', description: 'Comparing CTR across different banner designs, CTAs, and placements guides iterative improvement.' },
    ],
    featuresTitle: 'Key Aspects',
    sections: [
      {
        type: 'prose',
        title: 'Understanding CTR in Email Signatures',
        paragraphs: [
          'CTR is calculated by dividing the number of clicks by the number of impressions (views) and multiplying by 100. For email signatures, an impression is typically counted each time an email is opened and the signature is rendered. If a banner receives 50 clicks from 2,000 email views, the CTR is 2.5%.',
          'Email signature CTRs tend to be higher than traditional digital advertising because the audience is warm — they already have a business relationship with the sender. Benchmarks vary, but CTRs between 1% and 5% are common for signature banners. Optimizing banner design, messaging, call-to-action text, and targeting by audience segment can significantly improve results.',
        ],
      },
    ],
    faqs: [
      { question: 'What is a good CTR for email signature banners?', answer: 'CTRs between 1-5% are typical for email signature banners. This is significantly higher than display ad benchmarks (0.1-0.3%) because recipients have an existing relationship with the sender.' },
      { question: 'How is CTR tracked in email signatures?', answer: 'Tracking is done through redirect links or UTM parameters appended to banner URLs. When a recipient clicks, the click is logged before redirecting to the destination page.' },
      { question: 'How can I improve my signature CTR?', answer: 'Use compelling visuals, clear call-to-action text, relevant offers for your audience, and A/B test different designs. Ensure the banner is prominently placed in the signature layout.' },
      { question: 'Does CTR account for multiple clicks from the same person?', answer: 'This depends on your tracking setup. Some platforms count unique clicks (one per recipient) and total clicks (all clicks). Unique CTR gives a more accurate picture of reach.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  {
    slug: 'email-signature-analytics',
    category: 'glossary',
    meta: {
      title: 'Email Signature Analytics - Glossary | Siggly',
      description:
        'Learn about email signature analytics — the tools and metrics used to measure the performance and impact of email signature campaigns.',
      keywords: ['email signature analytics', 'signature tracking', 'signature metrics', 'email signature data'],
      canonical: '/glossary/email-signature-analytics',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'Email Signature Analytics', url: '/glossary/email-signature-analytics' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'Email Signature Analytics',
      description:
        'Email signature analytics refers to the collection and analysis of data about how recipients interact with email signatures. Metrics include banner impressions, link clicks, click-through rates, and conversion tracking to measure the marketing impact of email signatures.',
      variant: 'light',
    },
    features: [
      { icon: 'bar-chart-3', title: 'Impression Tracking', description: 'Counts how many times signature banners and images are viewed when emails are opened.' },
      { icon: 'target', title: 'Click Tracking', description: 'Records every click on links, banners, social icons, and call-to-action buttons within signatures.' },
      { icon: 'trending-up', title: 'Conversion Attribution', description: 'Connects signature clicks to downstream actions like form submissions, sign-ups, or purchases.' },
      { icon: 'eye', title: 'Deployment Monitoring', description: 'Shows which users have the latest signature deployed and identifies any deployment failures.' },
    ],
    featuresTitle: 'Key Aspects',
    sections: [
      {
        type: 'benefits',
        title: 'Benefits of Signature Analytics',
        items: [
          { icon: 'bar-chart-3', title: 'Data-Driven Decisions', description: 'Replace guesswork with hard data about which campaigns, banners, and messages resonate with your audience.' },
          { icon: 'trending-up', title: 'ROI Measurement', description: 'Quantify the marketing value generated by email signatures to justify investment in signature management.' },
          { icon: 'target', title: 'Campaign Optimization', description: 'Identify top-performing banners and replicate their success across future campaigns.' },
          { icon: 'users', title: 'Employee Insights', description: 'See which teams and individuals generate the most signature engagement, identifying top advocates.' },
        ],
      },
    ],
    faqs: [
      { question: 'What metrics should I track for email signatures?', answer: 'Key metrics include total impressions, unique clicks, click-through rate, top-clicked links, engagement by department, and conversion rate from signature traffic.' },
      { question: 'How accurate is signature impression tracking?', answer: 'Impression tracking relies on image loading (tracking pixels). It is not 100% accurate because some email clients block images by default. It provides a reliable trend indicator rather than an exact count.' },
      { question: 'Can I see which individual employees generate the most clicks?', answer: 'Yes. Siggly\'s analytics can break down engagement by individual user, department, or campaign, helping you identify which teams drive the most signature interaction.' },
      { question: 'How do I connect signature analytics to my CRM?', answer: 'Use UTM parameters on signature links to track traffic in Google Analytics or similar tools. Some signature platforms also offer direct integrations with CRM systems.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  {
    slug: 'ab-testing-signatures',
    category: 'glossary',
    meta: {
      title: 'A/B Testing Signatures - Glossary | Siggly',
      description:
        'What is A/B testing for email signatures? Learn how to test different signature designs, banners, and CTAs to optimize engagement.',
      keywords: ['ab testing signatures', 'signature split testing', 'email signature optimization', 'banner testing'],
      canonical: '/glossary/ab-testing-signatures',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'A/B Testing Signatures', url: '/glossary/ab-testing-signatures' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'A/B Testing Signatures',
      description:
        'A/B testing (split testing) for email signatures involves deploying two or more signature variations to different user groups and comparing their performance. It helps organizations determine which banner designs, calls-to-action, or layouts generate the most engagement.',
      variant: 'slate',
    },
    features: [
      { icon: 'target', title: 'Data-Driven Optimization', description: 'Test different variables systematically rather than relying on gut instinct for signature design choices.' },
      { icon: 'bar-chart-3', title: 'Measurable Outcomes', description: 'Compare click-through rates, impressions, and conversions between variants to identify the winner.' },
      { icon: 'refresh-cw', title: 'Iterative Improvement', description: 'Each test builds on previous results, continuously improving signature performance over time.' },
    ],
    featuresTitle: 'What You Need to Know',
    sections: [
      {
        type: 'how-it-works',
        title: 'How A/B Testing Works for Signatures',
        steps: [
          { step: '1', title: 'Define the Variable', description: 'Choose what to test: banner image, CTA text, banner placement, color scheme, or signature layout.' },
          { step: '2', title: 'Create Variants', description: 'Design two versions (A and B) that differ only in the variable being tested. Keep everything else identical.' },
          { step: '3', title: 'Split Your Audience', description: 'Deploy variant A to one group and variant B to another. Groups should be similar in size and characteristics.' },
          { step: '4', title: 'Analyze and Apply', description: 'After a sufficient sample period, compare metrics. Deploy the winning variant to all users and begin the next test.' },
        ],
      },
    ],
    faqs: [
      { question: 'What should I A/B test in email signatures?', answer: 'Common test variables include banner images, call-to-action text, button colors, banner placement (above vs. below contact info), and promotional offers. Test one variable at a time for clear results.' },
      { question: 'How long should an A/B test run?', answer: 'Run tests for at least 1-2 weeks to gather statistically significant data. The exact duration depends on your email volume — higher volume organizations can reach significance faster.' },
      { question: 'What sample size do I need for meaningful results?', answer: 'As a general guideline, aim for at least 1,000 impressions per variant before drawing conclusions. Signature analytics platforms can indicate when results are statistically significant.' },
      { question: 'Can I test more than two variants at once?', answer: 'Yes. Multivariate testing compares three or more variants, but requires larger sample sizes and longer test periods. Starting with simple A/B tests is recommended before advancing to multivariate.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  {
    slug: 'call-to-action-email',
    category: 'glossary',
    meta: {
      title: 'Call to Action (CTA) in Email - Glossary | Siggly',
      description:
        'Learn about calls-to-action in email signatures — the buttons, links, and prompts that encourage recipients to take a specific action.',
      keywords: ['call to action email', 'email cta', 'signature cta', 'email call to action button'],
      canonical: '/glossary/call-to-action-email',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'Call to Action in Email', url: '/glossary/call-to-action-email' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'Call to Action (CTA) in Email',
      description:
        'A call to action (CTA) in email is a prompt — typically a button, link, or banner — that encourages the recipient to take a specific action such as visiting a website, scheduling a demo, downloading a resource, or registering for an event. CTAs in email signatures turn routine correspondence into conversion opportunities.',
      variant: 'violet',
    },
    features: [
      { icon: 'target', title: 'Conversion Driver', description: 'CTAs guide recipients toward desired actions, turning passive email reading into active engagement.' },
      { icon: 'eye', title: 'Visibility', description: 'Well-designed CTAs with contrasting colors and clear text stand out in the signature layout.' },
      { icon: 'bar-chart-3', title: 'Trackable', description: 'Each CTA can include tracking parameters to measure clicks and attribute conversions.' },
    ],
    featuresTitle: 'Key Aspects',
    sections: [
      {
        type: 'use-cases-grid',
        title: 'Effective Email Signature CTAs',
        cases: [
          { title: 'Schedule a Demo', description: 'Link to your calendar tool so prospects can book a product demo directly from the signature.' },
          { title: 'Download a Resource', description: 'Offer a whitepaper, case study, or guide download to provide value and capture leads.' },
          { title: 'Register for an Event', description: 'Promote upcoming webinars, conferences, or product launches with a registration link.' },
          { title: 'Read Our Latest Blog', description: 'Drive traffic to your content marketing by linking to the most recent or most relevant blog post.' },
          { title: 'Get a Free Trial', description: 'Direct recipients to your product sign-up page to convert interested contacts into users.' },
          { title: 'Leave a Review', description: 'Encourage satisfied customers to leave reviews on platforms like G2, Capterra, or Google.' },
        ],
      },
    ],
    faqs: [
      { question: 'How many CTAs should an email signature have?', answer: 'One primary CTA is ideal. Adding too many CTAs dilutes attention and reduces click-through rates. If you must include multiple, make one visually dominant.' },
      { question: 'Should the CTA be a button or a text link?', answer: 'Buttons generally perform better because they are visually prominent. However, some email clients do not render buttons consistently. A well-designed banner image with a CTA is the most reliable approach.' },
      { question: 'How often should I change the CTA?', answer: 'Update CTAs every 4-8 weeks or when marketing campaigns change. Stale CTAs lose effectiveness as regular recipients stop noticing them.' },
      { question: 'Can different employees have different CTAs?', answer: 'Yes. Sales teams might have a "Schedule a Demo" CTA, while support teams might link to a satisfaction survey. Siggly supports rule-based CTA assignment by department or role.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  {
    slug: 'employee-advocacy-email',
    category: 'glossary',
    meta: {
      title: 'Employee Advocacy via Email - Glossary | Siggly',
      description:
        'Learn about employee advocacy through email signatures — how organizations empower employees to amplify brand messages in their daily communications.',
      keywords: ['employee advocacy email', 'email advocacy', 'brand ambassadors email', 'employee brand promotion'],
      canonical: '/glossary/employee-advocacy-email',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'Employee Advocacy via Email', url: '/glossary/employee-advocacy-email' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'Employee Advocacy via Email',
      description:
        'Employee advocacy via email is the strategy of leveraging employees\' daily email communications to promote the company\'s brand, content, and campaigns. By embedding promotional banners and CTAs in email signatures, every employee becomes a brand ambassador in their routine correspondence.',
      variant: 'indigo',
    },
    features: [
      { icon: 'users', title: 'Amplified Reach', description: 'Employees collectively send thousands of emails daily, each one reaching contacts who trust the individual sender.' },
      { icon: 'award', title: 'Authentic Engagement', description: 'Messages from individuals are perceived as more trustworthy than corporate marketing communications.' },
      { icon: 'trending-up', title: 'Organic Distribution', description: 'Promotion happens naturally within existing email conversations without extra effort from employees.' },
    ],
    featuresTitle: 'Key Aspects',
    sections: [
      {
        type: 'prose',
        title: 'The Power of Employee Advocacy in Email',
        paragraphs: [
          'Employee advocacy leverages the fact that people trust communications from individuals more than from brands. When an employee\'s email signature includes a banner promoting a company event or blog post, the recipient is more likely to engage because they already have a relationship with the sender. This makes email signatures one of the most effective and cost-efficient advocacy channels.',
          'Unlike social media advocacy programs that require employees to actively share content, email signature advocacy is passive. Once the signature is deployed, every email automatically carries the promotional message. This makes it particularly effective because it requires zero additional effort from employees while generating significant impressions and engagement.',
        ],
      },
    ],
    faqs: [
      { question: 'How is email advocacy different from email marketing?', answer: 'Email marketing sends dedicated promotional emails to a mailing list. Email advocacy embeds promotions in the signatures of routine business emails, reaching contacts who already have a relationship with the sender.' },
      { question: 'Do employees need to do anything for email advocacy?', answer: 'No. With centralized signature management, the promotional content is deployed automatically. Employees simply send emails as usual, and the advocacy message is included in every signature.' },
      { question: 'How do I measure the impact of email advocacy?', answer: 'Track banner impressions, clicks, and conversions through signature analytics. Compare the cost-per-click and conversion rate to other marketing channels to assess relative value.' },
      { question: 'Will employees object to promotional content in their signatures?', answer: 'Most employees support advocacy when the content is professional and aligned with company values. Keep banners relevant and professional, and communicate the program\'s purpose to the team.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  {
    slug: 'campaign-tracking-email',
    category: 'glossary',
    meta: {
      title: 'Campaign Tracking in Email - Glossary | Siggly',
      description:
        'Learn about campaign tracking for email signatures — how UTM parameters and analytics measure the effectiveness of signature-based marketing.',
      keywords: ['campaign tracking email', 'utm parameters email', 'email campaign analytics', 'signature campaign tracking'],
      canonical: '/glossary/campaign-tracking-email',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'Campaign Tracking in Email', url: '/glossary/campaign-tracking-email' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'Campaign Tracking in Email',
      description:
        'Campaign tracking in email refers to the methods used to measure the performance of marketing campaigns embedded in email signatures. It typically involves UTM parameters on links, tracking pixels for impressions, and click-redirect URLs to capture engagement data in analytics platforms.',
      variant: 'light',
    },
    features: [
      { icon: 'bar-chart-3', title: 'UTM Parameters', description: 'Tags appended to URLs that identify the campaign source, medium, name, and content in analytics tools.' },
      { icon: 'eye', title: 'Tracking Pixels', description: 'Tiny invisible images that record when an email is opened and the signature is rendered.' },
      { icon: 'target', title: 'Click Redirects', description: 'Intermediary URLs that log each click before redirecting to the final destination.' },
    ],
    featuresTitle: 'What You Need to Know',
    sections: [
      {
        type: 'checklist',
        title: 'Campaign Tracking Setup Checklist',
        items: [
          'Define UTM parameters for each campaign: source, medium, campaign name, and content',
          'Use consistent naming conventions for UTM values across all channels',
          'Append UTM parameters to all clickable links in signature banners and CTAs',
          'Set up goals in Google Analytics (or equivalent) to track conversions from signature traffic',
          'Enable impression tracking through your signature management platform',
          'Create a dashboard to monitor signature campaign performance alongside other channels',
          'Review and update tracking parameters when campaigns change',
        ],
      },
    ],
    faqs: [
      { question: 'What are UTM parameters?', answer: 'UTM (Urchin Tracking Module) parameters are tags added to URLs (e.g., ?utm_source=signature&utm_medium=email&utm_campaign=q1_promo) that allow analytics tools like Google Analytics to attribute traffic to specific campaigns.' },
      { question: 'Can I track individual employee performance?', answer: 'Yes. By adding employee-specific UTM content tags or using a signature analytics platform, you can see which individuals generate the most clicks and conversions.' },
      { question: 'Is tracking pixel-based impression data accurate?', answer: 'It provides a reliable trend indicator but not an exact count. Some email clients block images by default, which prevents the tracking pixel from loading. Typical detection rates range from 60-80%.' },
      { question: 'How do I attribute revenue to signature campaigns?', answer: 'Set up conversion goals in your analytics platform and use UTM parameters to identify signature-originated traffic. Multi-touch attribution models can credit signatures as part of the customer journey.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  {
    slug: 'email-marketing-roi',
    category: 'glossary',
    meta: {
      title: 'Email Marketing ROI - Glossary | Siggly',
      description:
        'What is email marketing ROI? Learn how to measure the return on investment from email signature marketing campaigns and benchmarks.',
      keywords: ['email marketing roi', 'email signature roi', 'marketing return on investment', 'email campaign roi'],
      canonical: '/glossary/email-marketing-roi',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'Email Marketing ROI', url: '/glossary/email-marketing-roi' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'Email Marketing ROI',
      description:
        'Email marketing ROI measures the financial return generated by email marketing efforts relative to their cost. For email signature marketing specifically, ROI considers the revenue or value generated from signature banner clicks and conversions against the cost of the signature management platform and campaign creation.',
      variant: 'slate',
    },
    features: [
      { icon: 'trending-up', title: 'High Returns', description: 'Email marketing consistently delivers among the highest ROI of any marketing channel, averaging $36-42 per dollar spent.' },
      { icon: 'bar-chart-3', title: 'Measurable', description: 'ROI can be calculated precisely by tracking click-to-conversion paths from signature links to revenue events.' },
      { icon: 'zap', title: 'Low Cost', description: 'Signature-based marketing has minimal incremental cost since the emails are already being sent for business purposes.' },
    ],
    featuresTitle: 'Key Aspects',
    sections: [
      {
        type: 'prose',
        title: 'Calculating Email Signature Marketing ROI',
        paragraphs: [
          'Email signature marketing ROI is calculated as: (Revenue from signature traffic - Cost of signature platform) / Cost of signature platform x 100. For example, if your signature management platform costs $200/month and signature banner clicks generate $2,000 in attributable revenue, your ROI is 900%.',
          'The ROI of email signature marketing is typically very high because the marginal cost is low. Employees are already sending emails as part of their jobs — the signature marketing simply adds a promotional element to those existing communications. The primary costs are the signature management platform subscription and the time to design banners and manage campaigns.',
        ],
      },
    ],
    faqs: [
      { question: 'What is a good email marketing ROI?', answer: 'The industry average for email marketing ROI is approximately $36-42 for every $1 spent. Email signature marketing often exceeds this because the email volume is organic (no list building or send costs).' },
      { question: 'How do I calculate signature-specific ROI?', answer: 'Track revenue attributable to signature banner clicks (using UTM parameters and conversion tracking), then subtract the cost of your signature platform. Divide the net return by the cost to get your ROI percentage.' },
      { question: 'What costs should I include in the calculation?', answer: 'Include the signature management platform subscription, designer time for creating banners, and any marketing team time spent managing campaigns. Do not include general email costs, as those exist regardless.' },
      { question: 'Can email signatures really drive measurable revenue?', answer: 'Yes. Organizations report generating significant website traffic, lead form submissions, event registrations, and direct sales from signature banner campaigns. The key is consistent tracking and compelling CTAs.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  // ─── Group 6: Compliance & Standards ───

  {
    slug: 'gdpr-email-compliance',
    category: 'glossary',
    meta: {
      title: 'GDPR Email Compliance - Glossary | Siggly',
      description:
        'Learn about GDPR requirements for email communications, including data processing, consent, privacy notices, and how email signatures are affected.',
      keywords: ['gdpr email compliance', 'gdpr email requirements', 'gdpr signature', 'email data protection'],
      canonical: '/glossary/gdpr-email-compliance',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'GDPR Email Compliance', url: '/glossary/gdpr-email-compliance' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'GDPR Email Compliance',
      description:
        'GDPR (General Data Protection Regulation) email compliance refers to meeting the European Union\'s data protection requirements in email communications. This includes lawful processing of personal data, providing privacy notices, honoring data subject rights, and ensuring email signatures contain required disclosures.',
      variant: 'violet',
    },
    features: [
      { icon: 'shield', title: 'Data Protection', description: 'Requires lawful basis for processing personal data contained in and collected through email communications.' },
      { icon: 'file-text', title: 'Privacy Notices', description: 'Organizations may need to include or link to privacy notices in email footers or signatures.' },
      { icon: 'lock', title: 'Consent Management', description: 'Marketing emails require explicit consent. Tracking pixels and links may also require disclosure.' },
      { icon: 'users', title: 'Data Subject Rights', description: 'Recipients have the right to access, rectify, and delete their personal data held by the organization.' },
    ],
    featuresTitle: 'Key Aspects',
    sections: [
      {
        type: 'checklist',
        title: 'GDPR Email Compliance Checklist',
        items: [
          'Include a link to your privacy policy in email footers or signatures',
          'Ensure marketing emails have proper opt-in consent records',
          'Disclose the use of tracking pixels if applicable',
          'Include your company registration details as required by local law',
          'Provide a mechanism for recipients to exercise their data rights',
          'Review email retention policies to comply with data minimization principles',
          'Ensure third-party email tools (including signature platforms) are GDPR-compliant',
          'Train employees on GDPR requirements for email communication',
        ],
      },
    ],
    faqs: [
      { question: 'Does GDPR apply to all emails from EU companies?', answer: 'GDPR applies to any organization that processes personal data of individuals in the EU, regardless of where the organization is based. This includes email communications where personal data is collected or processed.' },
      { question: 'Do email signatures need GDPR disclaimers?', answer: 'GDPR does not specifically mandate email disclaimers, but including a link to your privacy policy in the signature or footer is considered best practice and may be required by other regulations.' },
      { question: 'Are email tracking pixels GDPR-compliant?', answer: 'Tracking pixels process personal data (IP address, open time) and may require disclosure or consent under GDPR. The legal basis depends on your specific use case — consult with your data protection officer.' },
      { question: 'What are the penalties for GDPR email violations?', answer: 'GDPR violations can result in fines up to 20 million euros or 4% of annual global turnover, whichever is higher. Even minor infractions can result in significant penalties.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  {
    slug: 'hipaa-email-requirements',
    category: 'glossary',
    meta: {
      title: 'HIPAA Email Requirements - Glossary | Siggly',
      description:
        'Learn about HIPAA requirements for email in healthcare, including encryption, disclaimers, and how email signatures support compliance.',
      keywords: ['hipaa email requirements', 'hipaa compliant email', 'healthcare email compliance', 'phi email protection'],
      canonical: '/glossary/hipaa-email-requirements',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'HIPAA Email Requirements', url: '/glossary/hipaa-email-requirements' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'HIPAA Email Requirements',
      description:
        'HIPAA (Health Insurance Portability and Accountability Act) imposes strict requirements on email communications that contain Protected Health Information (PHI). Healthcare organizations must implement safeguards including encryption, access controls, and audit trails for email containing patient data.',
      variant: 'indigo',
    },
    features: [
      { icon: 'lock', title: 'Encryption Required', description: 'Emails containing PHI must be encrypted in transit and at rest to prevent unauthorized access.' },
      { icon: 'shield', title: 'Access Controls', description: 'Only authorized personnel should have access to emails containing PHI, enforced through authentication and authorization.' },
      { icon: 'file-text', title: 'Confidentiality Notices', description: 'Emails should include HIPAA-specific confidentiality notices warning against unauthorized disclosure of PHI.' },
    ],
    featuresTitle: 'What You Need to Know',
    sections: [
      {
        type: 'prose',
        title: 'Email Signatures and HIPAA Compliance',
        paragraphs: [
          'HIPAA does not explicitly mandate email signatures, but it requires administrative safeguards for all email communications involving PHI. A properly configured email signature with a HIPAA-specific confidentiality notice serves as one layer of these safeguards. The notice should inform unintended recipients that the email may contain PHI and instruct them to delete the message and notify the sender.',
          'Beyond signatures, HIPAA-compliant email requires end-to-end encryption, a signed Business Associate Agreement (BAA) with your email provider, employee training on PHI handling, and audit logs of email access. Centralized signature management helps healthcare organizations ensure every employee\'s email includes the required confidentiality language consistently.',
        ],
      },
    ],
    faqs: [
      { question: 'Can I send PHI via regular email?', answer: 'Sending PHI via unencrypted email violates HIPAA. You must use encrypted email services that have signed a BAA. Even with encryption, minimize the PHI included in emails.' },
      { question: 'What should a HIPAA email disclaimer say?', answer: 'It should state that the email may contain confidential PHI, is intended only for the named recipient, and that unauthorized use, disclosure, or copying is prohibited. It should instruct unintended recipients to delete the message and notify the sender.' },
      { question: 'Do all healthcare emails need HIPAA disclaimers?', answer: 'It is best practice to include a HIPAA disclaimer on all outgoing emails from healthcare organizations, not just those known to contain PHI. This provides consistent protection against accidental PHI disclosure.' },
      { question: 'Is Gmail HIPAA-compliant?', answer: 'Google Workspace (paid plans) can be configured for HIPAA compliance, and Google will sign a BAA. Free personal Gmail accounts are not HIPAA-compliant and should never be used for PHI.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  {
    slug: 'can-spam-act',
    category: 'glossary',
    meta: {
      title: 'CAN-SPAM Act - Glossary | Siggly',
      description:
        'Learn about the CAN-SPAM Act, the US law governing commercial email, and its requirements for email content, unsubscribe mechanisms, and sender identification.',
      keywords: ['can-spam act', 'can spam compliance', 'commercial email law', 'anti spam legislation'],
      canonical: '/glossary/can-spam-act',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'CAN-SPAM Act', url: '/glossary/can-spam-act' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'CAN-SPAM Act',
      description:
        'The CAN-SPAM Act (Controlling the Assault of Non-Solicited Pornography And Marketing Act) is a US federal law enacted in 2003 that sets rules for commercial email messages. It requires accurate sender identification, honest subject lines, a physical postal address, and a clear unsubscribe mechanism.',
      variant: 'light',
    },
    features: [
      { icon: 'file-text', title: 'Sender Identification', description: 'Requires accurate From headers and a valid physical postal address in the email.' },
      { icon: 'mail', title: 'Unsubscribe Requirement', description: 'Every commercial email must include a clear, conspicuous way for recipients to opt out.' },
      { icon: 'shield', title: 'Content Requirements', description: 'Prohibits deceptive subject lines and requires identification of the message as an advertisement.' },
    ],
    featuresTitle: 'Key Aspects',
    sections: [
      {
        type: 'how-it-works',
        title: 'CAN-SPAM Compliance Requirements',
        steps: [
          { step: '1', title: 'Accurate Header Information', description: 'The From, To, Reply-To, and routing information must accurately identify the sender. No false or misleading header information.' },
          { step: '2', title: 'Non-Deceptive Subject Lines', description: 'Subject lines must accurately reflect the content of the email. Misleading subject lines are prohibited.' },
          { step: '3', title: 'Include Physical Address', description: 'Every commercial email must include the sender\'s valid physical postal address (street, P.O. box, or registered mail box).' },
          { step: '4', title: 'Provide Opt-Out Mechanism', description: 'Include a clear, conspicuous mechanism for recipients to unsubscribe. Honor opt-out requests within 10 business days.' },
        ],
      },
    ],
    faqs: [
      { question: 'Does the CAN-SPAM Act apply to all business emails?', answer: 'CAN-SPAM primarily regulates commercial email (marketing, promotions). Transactional emails (order confirmations, account notifications) are largely exempt but must still have accurate sender information.' },
      { question: 'Do email signatures need to comply with CAN-SPAM?', answer: 'Email signatures themselves are not regulated by CAN-SPAM. However, if a signature contains promotional content, the email may be classified as commercial and subject to CAN-SPAM requirements.' },
      { question: 'What are the penalties for CAN-SPAM violations?', answer: 'Each non-compliant email can result in penalties up to $51,744. The FTC, state attorneys general, and ISPs can all bring enforcement actions.' },
      { question: 'Does CAN-SPAM require opt-in consent?', answer: 'No. Unlike GDPR, CAN-SPAM uses an opt-out model. You can send commercial email without prior consent, but you must honor unsubscribe requests promptly.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  {
    slug: 'email-retention-policy',
    category: 'glossary',
    meta: {
      title: 'Email Retention Policy - Glossary | Siggly',
      description:
        'What is an email retention policy? Learn how organizations define how long emails are stored, when they are deleted, and why retention matters for compliance.',
      keywords: ['email retention policy', 'email archiving policy', 'data retention email', 'email storage policy'],
      canonical: '/glossary/email-retention-policy',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'Email Retention Policy', url: '/glossary/email-retention-policy' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'Email Retention Policy',
      description:
        'An email retention policy defines how long an organization stores email messages before they are deleted or archived. It balances legal and regulatory requirements to preserve certain records against the need to minimize data storage and reduce exposure to litigation or data breaches.',
      variant: 'slate',
    },
    features: [
      { icon: 'clock', title: 'Defined Timeframes', description: 'Specifies retention periods for different email categories (e.g., 3 years for financial, 7 years for tax-related).' },
      { icon: 'shield', title: 'Legal Compliance', description: 'Ensures the organization meets statutory requirements for preserving business records.' },
      { icon: 'database', title: 'Storage Management', description: 'Controls email storage growth by systematically removing messages that are past their retention period.' },
    ],
    featuresTitle: 'Key Aspects',
    sections: [
      {
        type: 'benefits',
        title: 'Benefits of an Email Retention Policy',
        items: [
          { icon: 'shield', title: 'Legal Protection', description: 'Demonstrates good faith data management practices and ensures legally required records are preserved.' },
          { icon: 'database', title: 'Reduced Storage Costs', description: 'Systematically deleting expired emails reduces storage consumption and associated costs.' },
          { icon: 'lock', title: 'Reduced Risk', description: 'Minimizes exposure in litigation by not retaining emails longer than necessary.' },
          { icon: 'search', title: 'Faster eDiscovery', description: 'A well-organized retention system makes it easier to find relevant emails during legal discovery.' },
        ],
      },
    ],
    faqs: [
      { question: 'How long should emails be retained?', answer: 'Retention periods depend on your industry and jurisdiction. Common periods range from 3 to 7 years for business records. Financial services, healthcare, and government may have longer requirements. Consult legal counsel for your specific obligations.' },
      { question: 'Do email signatures affect retention requirements?', answer: 'Email signatures are part of the email message and are retained along with the message body. If signatures contain legal disclaimers or compliance information, they may be relevant in legal proceedings.' },
      { question: 'What happens when the retention period expires?', answer: 'Emails past their retention period should be automatically deleted or permanently archived according to the policy. Automated enforcement is preferred over manual deletion to ensure consistency.' },
      { question: 'Can employees override the retention policy?', answer: 'Generally, no. Retention policies should be enforced centrally through email platform settings. Exceptions may be made for legal holds, where emails must be preserved for pending or anticipated litigation.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  {
    slug: 'email-archiving',
    category: 'glossary',
    meta: {
      title: 'Email Archiving - Glossary | Siggly',
      description:
        'Learn about email archiving — the practice of preserving email messages in a searchable, tamper-proof repository for compliance and legal purposes.',
      keywords: ['email archiving', 'email archive', 'message archiving', 'email preservation'],
      canonical: '/glossary/email-archiving',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'Email Archiving', url: '/glossary/email-archiving' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'Email Archiving',
      description:
        'Email archiving is the systematic preservation of email messages in a dedicated, searchable, and typically immutable repository. Archived emails are stored separately from active mailboxes and are retained for compliance, legal discovery, and historical reference purposes.',
      variant: 'violet',
    },
    features: [
      { icon: 'database', title: 'Immutable Storage', description: 'Archived emails are stored in a tamper-proof format, ensuring they cannot be altered or deleted.' },
      { icon: 'search', title: 'Full-Text Search', description: 'Archives provide powerful search capabilities across all stored messages for legal and compliance queries.' },
      { icon: 'shield', title: 'Compliance Support', description: 'Meets regulatory requirements for email preservation in industries like finance, healthcare, and government.' },
    ],
    featuresTitle: 'Key Aspects',
    sections: [
      {
        type: 'prose',
        title: 'Email Archiving vs. Email Backup',
        paragraphs: [
          'Email archiving and email backup serve different purposes and should not be confused. Backups create copies of email data for disaster recovery — they protect against data loss from hardware failure, accidental deletion, or cyberattacks. Archives preserve emails in an indexed, searchable, immutable format for long-term compliance and legal needs.',
          'Archives are designed for retrieval and search. When a legal team needs to produce emails for a court case (eDiscovery), the archive provides fast, targeted search across millions of messages. Backups, by contrast, are designed for bulk restoration and lack the granular search capabilities needed for compliance and legal work.',
        ],
      },
    ],
    faqs: [
      { question: 'Which industries require email archiving?', answer: 'Financial services (SEC, FINRA), healthcare (HIPAA), government (FOIA), and publicly traded companies (SOX) commonly have email archiving requirements. Many other industries archive as a best practice.' },
      { question: 'Does email archiving include signatures and attachments?', answer: 'Yes. Archives preserve the complete email message including the body, signature, headers, and all attachments. The entire message is archived as it was sent or received.' },
      { question: 'How long should archived emails be kept?', answer: 'Retention depends on regulatory requirements. SEC rules require broker-dealers to retain email for 3-6 years. HIPAA requires 6 years. SOX requires 7 years. Some organizations retain indefinitely.' },
      { question: 'Can archived emails be deleted?', answer: 'In most compliance-grade archives, emails cannot be deleted during the retention period. After the retention period expires, the policy may allow automatic purging. Legal holds can prevent deletion regardless of retention rules.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  {
    slug: 'sox-compliance-email',
    category: 'glossary',
    meta: {
      title: 'SOX Compliance for Email - Glossary | Siggly',
      description:
        'Learn about Sarbanes-Oxley (SOX) compliance requirements for email, including record retention, internal controls, and audit trail obligations.',
      keywords: ['sox compliance email', 'sarbanes-oxley email', 'sox email retention', 'sox audit email'],
      canonical: '/glossary/sox-compliance-email',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'SOX Compliance for Email', url: '/glossary/sox-compliance-email' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'SOX Compliance for Email',
      description:
        'SOX (Sarbanes-Oxley Act) compliance for email refers to the requirements placed on publicly traded companies to maintain internal controls over financial reporting communications. This includes retaining financial emails for at least 7 years, maintaining audit trails, and preventing the destruction of records relevant to investigations.',
      variant: 'indigo',
    },
    features: [
      { icon: 'clock', title: '7-Year Retention', description: 'SOX Section 802 requires retention of audit-related records, including emails, for a minimum of 7 years.' },
      { icon: 'shield', title: 'Internal Controls', description: 'Requires documented controls over financial communication processes, including email.' },
      { icon: 'search', title: 'Audit Trail', description: 'All changes to financial records and related communications must be tracked and auditable.' },
    ],
    featuresTitle: 'What You Need to Know',
    sections: [
      {
        type: 'checklist',
        title: 'SOX Email Compliance Requirements',
        items: [
          'Retain all emails related to financial reporting and audits for at least 7 years',
          'Implement email archiving with immutable storage to prevent record tampering',
          'Maintain audit trails showing who accessed or modified financial communications',
          'Establish internal controls over email systems that handle financial data',
          'Document email retention policies and ensure they are consistently enforced',
          'Train employees on their obligations regarding financial email preservation',
          'Ensure email signatures on financial communications include required disclosures',
          'Implement legal hold procedures to preserve emails relevant to investigations',
        ],
      },
    ],
    faqs: [
      { question: 'Does SOX apply to all company emails?', answer: 'SOX primarily applies to emails related to financial reporting, audits, and internal controls. However, many organizations apply archiving broadly because it can be difficult to pre-identify which emails may be relevant.' },
      { question: 'What happens if financial emails are destroyed?', answer: 'SOX Section 802 makes it a criminal offense to knowingly destroy, alter, or conceal records to obstruct federal investigations. Penalties include fines and up to 20 years imprisonment.' },
      { question: 'How do email signatures relate to SOX compliance?', answer: 'Email signatures on financial communications should include appropriate disclosures. Consistent, centrally managed signatures help demonstrate the internal controls that SOX requires.' },
      { question: 'Do small companies need to comply with SOX?', answer: 'SOX applies to all publicly traded companies in the US, regardless of size. Private companies may also be affected if they are preparing for an IPO or are subsidiaries of public companies.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  {
    slug: 'brand-consistency-email',
    category: 'glossary',
    meta: {
      title: 'Brand Consistency in Email - Glossary | Siggly',
      description:
        'Learn about brand consistency in email — maintaining uniform visual identity, messaging, and professional standards across all organizational email communications.',
      keywords: ['brand consistency email', 'email brand standards', 'consistent email branding', 'corporate email identity'],
      canonical: '/glossary/brand-consistency-email',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'Brand Consistency in Email', url: '/glossary/brand-consistency-email' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'Brand Consistency in Email',
      description:
        'Brand consistency in email means ensuring that all email communications from an organization use the same visual identity, tone, and professional standards. This includes uniform email signatures, standardized templates, consistent logo usage, and approved color schemes across every employee and department.',
      variant: 'light',
    },
    features: [
      { icon: 'award', title: 'Brand Recognition', description: 'Consistent visual elements across all emails build familiarity and strengthen brand recall with recipients.' },
      { icon: 'users', title: 'Professional Image', description: 'Uniform signatures and formatting project a cohesive, professional organization to external contacts.' },
      { icon: 'shield', title: 'Trust Building', description: 'Consistent branding signals reliability and attention to detail, building trust with clients and partners.' },
      { icon: 'eye', title: 'Competitive Differentiation', description: 'Well-branded emails stand out from competitors whose communications appear disorganized or inconsistent.' },
    ],
    featuresTitle: 'Key Aspects',
    sections: [
      {
        type: 'use-cases-grid',
        title: 'Brand Consistency Challenges',
        cases: [
          { title: 'Multiple Offices', description: 'Employees in different locations may use different logos, outdated branding, or local variations that dilute the master brand.' },
          { title: 'Acquisitions & Mergers', description: 'Integrating acquired companies requires transitioning their email branding to match the parent organization.' },
          { title: 'Remote Workforce', description: 'Remote employees have less visibility into brand updates and may continue using outdated signature designs.' },
          { title: 'Department Silos', description: 'Marketing, sales, and engineering may each develop their own email formats without central coordination.' },
          { title: 'Employee Turnover', description: 'New hires may create their own signatures rather than using the approved company template.' },
          { title: 'Rebranding Transitions', description: 'During a rebrand, some employees may update immediately while others continue using old branding for weeks or months.' },
        ],
      },
    ],
    faqs: [
      { question: 'Why does brand consistency in email matter?', answer: 'The average organization sends thousands of emails daily. Inconsistent branding makes the company appear disorganized, while consistent branding builds trust, recognition, and professionalism with every message.' },
      { question: 'How do I enforce brand consistency across email?', answer: 'Centralized signature management is the most effective approach. Platforms like Siggly create approved templates and deploy them to all users, eliminating individual deviations from brand guidelines.' },
      { question: 'What are the most common brand consistency issues in email?', answer: 'Common issues include mismatched logos, incorrect brand colors, inconsistent fonts, outdated contact information, missing disclaimers, and employees using personal signature styles.' },
      { question: 'How do I measure brand consistency across my organization?', answer: 'Conduct periodic signature audits, use deployment monitoring dashboards (available in Siggly), and survey recipients for their perception of your organization\'s professionalism.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },

  {
    slug: 'responsive-email-design',
    category: 'glossary',
    meta: {
      title: 'Responsive Email Design - Glossary | Siggly',
      description:
        'What is responsive email design? Learn how emails and signatures adapt their layout to different screen sizes for optimal reading on desktop and mobile.',
      keywords: ['responsive email design', 'mobile email design', 'adaptive email', 'email mobile optimization'],
      canonical: '/glossary/responsive-email-design',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Glossary', url: '/glossary' },
      { name: 'Responsive Email Design', url: '/glossary/responsive-email-design' },
    ],
    hero: {
      badge: { icon: 'book-open', text: 'Glossary' },
      title: 'Responsive Email Design',
      description:
        'Responsive email design is an approach to email layout that adapts the content and structure to fit the recipient\'s screen size. Using fluid layouts, scalable images, and CSS media queries, responsive emails provide an optimal reading experience on desktops, tablets, and smartphones.',
      variant: 'slate',
    },
    features: [
      { icon: 'globe', title: 'Cross-Device Compatibility', description: 'Emails render well on screens of all sizes, from large desktop monitors to small smartphone displays.' },
      { icon: 'eye', title: 'Improved Readability', description: 'Text sizes, image proportions, and layout adjust to remain easily readable on any device.' },
      { icon: 'trending-up', title: 'Higher Engagement', description: 'Responsive emails see higher click-through and conversion rates because content is easy to interact with on mobile.' },
    ],
    featuresTitle: 'Key Aspects',
    sections: [
      {
        type: 'how-it-works',
        title: 'How Responsive Email Design Works',
        steps: [
          { step: '1', title: 'Fluid Layout', description: 'Use percentage-based widths instead of fixed pixel widths so content flows to fill the available screen space.' },
          { step: '2', title: 'Scalable Images', description: 'Set images to max-width: 100% so they scale down on smaller screens without overflowing the layout.' },
          { step: '3', title: 'Media Queries', description: 'CSS media queries detect screen size and apply alternative styles — such as stacking columns or increasing font size — for mobile devices.' },
          { step: '4', title: 'Touch-Friendly Targets', description: 'Ensure buttons and links are large enough to tap on mobile (minimum 44x44 pixels) with adequate spacing between them.' },
        ],
      },
    ],
    faqs: [
      { question: 'Do all email clients support responsive design?', answer: 'Most modern email clients support responsive design, but some (notably older Outlook versions using the Word rendering engine) have limited CSS support. Testing across major clients is essential.' },
      { question: 'Should email signatures be responsive?', answer: 'Yes. Over 60% of emails are now opened on mobile devices. A responsive signature ensures your branding, contact info, and CTAs are legible and tappable on any screen size.' },
      { question: 'How do I make an email signature responsive?', answer: 'Use fluid widths, scalable images, and test across devices. Siggly\'s template editor generates responsive signatures automatically, handling the technical complexity for you.' },
      { question: 'What is the difference between responsive and adaptive design?', answer: 'Responsive design uses fluid layouts that continuously adjust to screen size. Adaptive design uses fixed layout breakpoints that switch between predefined sizes. Responsive is generally preferred for email.' },
      { question: 'What is the most common mobile email screen width?', answer: 'Most smartphones display email at 320-414 pixels wide. Design signatures with a maximum width of 600 pixels for desktop that scales down gracefully to mobile widths.' },
    ],
    cta: { title: 'Try Siggly Free', description: 'Start managing your team\'s email signatures today.' },
  },
];
