import type { SEOLandingPageData } from '../types';

// Short, direct "answer" pages optimized for featured snippets and AI Overviews.
// Each hero.description leads with a concise, citable direct answer.
export const answersPages: SEOLandingPageData[] = [
  {
    slug: 'different-signatures-per-department',
    category: 'answers',
    meta: {
      title: 'Different Email Signatures Per Department | Siggly',
      description:
        'Yes — you can assign different email signatures to each department. Here is how to set department-based signatures across Google Workspace and Microsoft 365.',
      keywords: [
        'different email signatures per department',
        'department based email signatures',
        'department signature rules',
        'team email signatures by department',
      ],
      canonical: '/answers/different-signatures-per-department',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Answers', url: '/answers' },
      { name: 'Different Signatures Per Department', url: '/answers/different-signatures-per-department' },
    ],
    hero: {
      badge: { icon: 'help-circle', text: 'Answer' },
      title: 'Can you have different email signatures for different departments?',
      description:
        'Yes. With Siggly you can assign a distinct signature template to each department — sales, support, legal, HR — and it deploys automatically to the right people across Google Workspace and Microsoft 365. Native Gmail and Outlook settings only allow one org-wide footer, so department-specific signatures require a management tool like Siggly.',
      variant: 'violet',
    },
    stats: [
      { value: '1 click', label: 'Deploy per department' },
      { value: 'Unlimited', label: 'Templates' },
      { value: 'Auto', label: 'Assignment by rules' },
    ],
    featuresTitle: 'How Department-Based Signatures Work in Siggly',
    features: [
      {
        icon: 'users',
        title: 'Assign Templates by Department',
        description:
          'Map each department to its own signature template. Employees are matched automatically from your directory or HR system.',
      },
      {
        icon: 'settings',
        title: 'Visual Rule Builder',
        description:
          'Create rules by department, job title, location, or any custom attribute — no scripting or transport rules required.',
      },
      {
        icon: 'refresh-cw',
        title: 'Automatic Updates',
        description:
          'When someone changes departments, their signature updates automatically on the next sync. No manual re-assignment.',
      },
      {
        icon: 'shield',
        title: 'Consistent Branding',
        description:
          'Every department stays on-brand — shared logo, colors, and disclaimer, with only the relevant details changing per team.',
      },
    ],
    sections: [
      {
        type: 'prose',
        title: 'Why native email tools can\'t do this well',
        paragraphs: [
          'Google Workspace lets admins append a single organization-wide footer, and Microsoft 365 relies on Exchange transport rules that are cumbersome to maintain per department. Neither gives marketing or IT an easy way to manage many department-specific designs.',
          'Siggly solves this by treating each department as a target group. You design a template once, assign it to a department, and Siggly deploys the correct signature server-side to every matching mailbox — including replies and new messages.',
        ],
      },
      {
        type: 'checklist',
        title: 'Set up department signatures in minutes',
        items: [
          'Connect Google Workspace or Microsoft 365',
          'Import users (department field syncs automatically)',
          'Create a template for each department',
          'Assign templates using department rules',
          'Deploy to everyone in one click',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can Google Workspace set different signatures for each department?',
        answer:
          'Not natively — Google Workspace only supports one org-wide append footer. To assign different signatures per department you need a management tool like Siggly that deploys department-specific templates via the Gmail API.',
      },
      {
        question: 'How does Siggly know which department someone is in?',
        answer:
          'Siggly syncs the department field from your Google Workspace or Microsoft 365 directory, or from an HR system like Gusto or BambooHR, and assigns the matching template automatically.',
      },
      {
        question: 'Can I use different signatures by location or job title too?',
        answer:
          'Yes. Siggly\'s rule builder supports department, location, job title, and any custom attribute, so you can target signatures however your organization is structured.',
      },
      {
        question: 'Do department signatures apply to replies and forwards?',
        answer:
          'Yes. Signatures deployed by Siggly appear on new emails, replies, and forwards for every mailbox in the targeted department.',
      },
    ],
    cta: {
      title: 'Give every department the right signature',
      description: 'Deploy department-based email signatures across your whole organization in minutes.',
      variant: 'default',
    },
  },
  {
    slug: 'update-all-employee-signatures',
    category: 'answers',
    meta: {
      title: 'Update Everyone\'s Email Signature at Once | Siggly',
      description:
        'The fastest way to update every employee\'s email signature at once is a central tool that deploys server-side. Here is how to change all signatures in one click.',
      keywords: [
        'update all employee email signatures',
        'change everyone email signature at once',
        'bulk update email signatures',
        'company wide email signature update',
      ],
      canonical: '/answers/update-all-employee-signatures',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Answers', url: '/answers' },
      { name: 'Update Everyone\'s Signature at Once', url: '/answers/update-all-employee-signatures' },
    ],
    hero: {
      badge: { icon: 'help-circle', text: 'Answer' },
      title: 'How do I update everyone\'s email signature at once?',
      description:
        'To update every employee\'s email signature at once, use a centralized signature manager that deploys server-side. With Siggly you edit one template and push the change to all mailboxes across Google Workspace and Microsoft 365 in a single click — no per-user edits, no IT tickets, no employee action needed.',
      variant: 'violet',
    },
    stats: [
      { value: '1 click', label: 'Update everyone' },
      { value: '< 60s', label: 'To deploy org-wide' },
      { value: '0', label: 'End-user actions' },
    ],
    featuresTitle: 'Update Every Signature From One Dashboard',
    features: [
      {
        icon: 'zap',
        title: 'Edit Once, Deploy to All',
        description:
          'Change the template and every employee\'s signature updates automatically. Perfect for rebrands, new campaigns, or a phone-number change.',
      },
      {
        icon: 'clock',
        title: 'Instant Rollout',
        description:
          'Deploy to hundreds or thousands of mailboxes in under a minute using batched API calls — no waiting on employees.',
      },
      {
        icon: 'lock',
        title: 'Enforced, Not Optional',
        description:
          'Signatures are applied server-side, so the update reaches everyone even if they never touch their email settings.',
      },
      {
        icon: 'calendar',
        title: 'Schedule Changes',
        description:
          'Queue updates and promotional banners to go live on a specific date — ideal for launches and seasonal campaigns.',
      },
    ],
    sections: [
      {
        type: 'prose',
        title: 'Why manual updates don\'t scale',
        paragraphs: [
          'Asking every employee to paste new signature HTML into Gmail or Outlook is slow, error-prone, and impossible to enforce. Some people never do it, others break the formatting, and your branding drifts out of sync.',
          'A centralized manager removes the human step entirely. Siggly stores the approved template and applies it directly to each mailbox through the Gmail and Microsoft Graph APIs, so one edit updates the entire company consistently.',
        ],
      },
      {
        type: 'checklist',
        title: 'Change all signatures in 3 steps',
        items: [
          'Edit your master signature template in Siggly',
          'Review the live preview',
          'Click deploy — all mailboxes update automatically',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can I update all Gmail signatures at once?',
        answer:
          'Yes. Siggly connects to Google Workspace via the Gmail API and pushes a signature update to all users (or selected departments) in one click, applied server-side.',
      },
      {
        question: 'Will employees need to do anything when I update the signature?',
        answer:
          'No. Because Siggly deploys signatures server-side, updates reach every mailbox automatically — employees don\'t need to copy, paste, or change any settings.',
      },
      {
        question: 'How long does an org-wide update take?',
        answer:
          'Most organizations deploy in under a minute. Siggly uses batched API calls to update hundreds or thousands of mailboxes quickly.',
      },
      {
        question: 'Can I schedule a signature change for a future date?',
        answer:
          'Yes. You can schedule template changes and promotional banners to activate on a specific date, which is useful for product launches and campaigns.',
      },
    ],
    cta: {
      title: 'Update every signature in one click',
      description: 'Edit one template and roll the change out to your entire team instantly.',
      variant: 'default',
    },
  },
  {
    slug: 'stop-employees-changing-email-signature',
    category: 'answers',
    meta: {
      title: 'Stop Employees Changing Email Signatures | Siggly',
      description:
        'To stop employees editing or removing their email signature, deploy it server-side and enforce it. Here is how to lock company email signatures with Siggly.',
      keywords: [
        'stop employees changing email signature',
        'enforce email signature',
        'lock email signature',
        'prevent signature changes',
      ],
      canonical: '/answers/stop-employees-changing-email-signature',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Answers', url: '/answers' },
      { name: 'Stop Employees Changing Signatures', url: '/answers/stop-employees-changing-email-signature' },
    ],
    hero: {
      badge: { icon: 'help-circle', text: 'Answer' },
      title: 'How do I stop employees from changing their email signature?',
      description:
        'To stop employees editing or removing their email signature, deploy it server-side and re-apply it on a schedule so any manual change is overwritten. Siggly enforces approved signatures across Google Workspace and Microsoft 365, so every email leaves with the correct, on-brand, compliant signature.',
      variant: 'violet',
    },
    stats: [
      { value: '100%', label: 'Enforcement' },
      { value: 'Server-side', label: 'Deployment' },
      { value: 'Auto', label: 'Re-apply on drift' },
    ],
    featuresTitle: 'Enforce Signatures Employees Can\'t Break',
    features: [
      {
        icon: 'lock',
        title: 'Server-Side Enforcement',
        description:
          'Signatures are applied through the Gmail and Microsoft Graph APIs, not left to employees to configure — so they can\'t be skipped.',
      },
      {
        icon: 'refresh-cw',
        title: 'Overwrite Manual Changes',
        description:
          'If someone edits or deletes their signature, Siggly restores the approved version on the next sync automatically.',
      },
      {
        icon: 'shield',
        title: 'Lock Brand Elements',
        description:
          'Keep logo, colors, disclaimer, and layout fixed while still auto-filling each person\'s name, title, and contact details.',
      },
      {
        icon: 'clipboard-list',
        title: 'Audit Every Change',
        description:
          'A full audit log records signature changes and deployments — useful for compliance and security reviews.',
      },
    ],
    sections: [
      {
        type: 'prose',
        title: 'Why "please use this signature" never works',
        paragraphs: [
          'Relying on employees to set their own signature guarantees inconsistency: outdated titles, missing disclaimers, rogue fonts, and removed banners. Native Gmail and Outlook let each person edit their signature freely, so there is no way to enforce a standard.',
          'Siggly makes signatures a managed asset. Admins control the template centrally, deployment happens server-side, and enforcement re-applies the approved signature whenever someone drifts — so compliance and branding hold across the whole organization.',
        ],
      },
      {
        type: 'checklist',
        title: 'Lock down signatures with Siggly',
        items: [
          'Create an approved template with locked brand elements',
          'Deploy server-side to Google Workspace or Microsoft 365',
          'Enable enforcement to overwrite manual edits',
          'Review the audit log anytime',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can you prevent employees from editing their Gmail signature?',
        answer:
          'You can\'t fully lock the Gmail settings UI, but Siggly makes edits pointless: it re-applies the approved signature server-side on every sync, so any manual change is automatically overwritten.',
      },
      {
        question: 'What happens if an employee deletes their signature?',
        answer:
          'Siggly detects the drift and restores the approved signature automatically on the next deployment cycle, so mailboxes never stay out of compliance.',
      },
      {
        question: 'Can employees still update their own details?',
        answer:
          'Yes, if you allow it. Personal fields like phone or pronouns can be self-served while brand elements (logo, colors, disclaimer) stay locked.',
      },
      {
        question: 'Is signature enforcement useful for compliance?',
        answer:
          'Very. Enforced signatures guarantee required legal disclaimers (HIPAA, GDPR, FINRA) appear on every email, and the audit log documents it.',
      },
    ],
    cta: {
      title: 'Make your email signatures tamper-proof',
      description: 'Enforce approved, compliant signatures across every mailbox with Siggly.',
      variant: 'default',
    },
  },
];
