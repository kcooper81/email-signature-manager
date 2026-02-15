import type { SEOLandingPageData } from '../types';

export const platformsPages: SEOLandingPageData[] = [
  // ---------------------------------------------------------------------------
  // 1. Outlook
  // ---------------------------------------------------------------------------
  {
    slug: 'outlook',
    category: 'platforms',
    meta: {
      title: 'Email Signatures for Outlook - Setup & Deployment | Siggly',
      description:
        'Deploy professional email signatures to Outlook desktop, web, and mobile. Use transport rules, registry settings, or Siggly to manage signatures centrally.',
      keywords: [
        'Outlook email signatures',
        'Outlook signature deployment',
        'Microsoft 365 signatures',
        'Outlook transport rules signatures',
      ],
      canonical: '/platforms/outlook',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Platforms', url: '/platforms' },
      { name: 'Outlook', url: '/platforms/outlook' },
    ],
    hero: {
      badge: { icon: 'mail', text: 'Outlook' },
      title: 'Effortless Email Signatures for Microsoft Outlook',
      description:
        'Whether your team uses Outlook desktop, Outlook on the web, or Outlook mobile, Siggly ensures every email goes out with a consistent, professional signature. Deploy through transport rules, registry policies, or our native integration.',
      variant: 'indigo',
    },
    stats: [
      { value: '400M+', label: 'Outlook users worldwide' },
      { value: '3 min', label: 'Average deployment time' },
      { value: '100%', label: 'Outlook version compatibility' },
    ],
    featuresTitle: 'How Siggly Works with Outlook',
    features: [
      {
        icon: 'server',
        title: 'Transport Rule Deployment',
        description:
          'Append signatures server-side using Exchange transport rules. Every outgoing email gets the correct signature regardless of which Outlook client the user opens.',
      },
      {
        icon: 'settings',
        title: 'Registry & Group Policy',
        description:
          'Push signature files to Windows desktops through Group Policy or registry settings for organizations that prefer client-side deployment.',
      },
      {
        icon: 'globe',
        title: 'Outlook on the Web Support',
        description:
          'Siggly deploys signatures to Outlook on the web (OWA) through the Microsoft 365 admin API, covering browser-based users seamlessly.',
      },
      {
        icon: 'smartphone',
        title: 'Outlook Mobile Compatibility',
        description:
          'Signatures render correctly on Outlook for iOS and Android. Combine with Intune policies for managed device deployment.',
      },
      {
        icon: 'plug',
        title: 'COM Add-In Option',
        description:
          'For organizations requiring client-side signature insertion with dynamic content, Siggly supports COM add-in deployment on Outlook desktop.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'Deploying Signatures to Outlook',
        steps: [
          {
            step: '1',
            title: 'Connect Microsoft 365',
            description:
              'Authenticate your Microsoft 365 tenant and grant Siggly the necessary permissions to manage signatures on behalf of your users.',
          },
          {
            step: '2',
            title: 'Design Your Template',
            description:
              'Use the visual editor to create an Outlook-optimized signature with proper table layouts, VML backgrounds, and conditional comments for rendering consistency.',
          },
          {
            step: '3',
            title: 'Choose a Deployment Method',
            description:
              'Select server-side transport rules for universal coverage, client-side registry deployment for Outlook desktop, or both for maximum compatibility.',
          },
          {
            step: '4',
            title: 'Monitor and Update',
            description:
              'Track signature performance in the analytics dashboard and push updates to all users instantly when your design or branding changes.',
          },
        ],
      },
      {
        type: 'checklist',
        title: 'Outlook Signature Best Practices',
        items: [
          'Use table-based layouts for consistent rendering across Outlook versions',
          'Avoid CSS floats and flexbox — Outlook uses the Word rendering engine',
          'Include VML markup for background images in Outlook desktop',
          'Keep total signature width under 600px for optimal display',
          'Test signatures in Outlook 2016, 2019, 2021, and the new Outlook',
          'Set up transport rules to cover new replies and forwards',
        ],
      },
    ],
    testimonial: {
      quote:
        'Deploying signatures across 2,000 Outlook users used to take our IT team a full week. With Siggly and transport rules, it takes five minutes and zero helpdesk tickets.',
      authorName: 'Michael Grant',
      authorTitle: 'IT Infrastructure Lead, Harmon Financial Group',
    },
    faqs: [
      {
        question: 'Does Siggly work with the new Outlook for Windows?',
        answer:
          'Yes. Siggly supports the classic Outlook desktop client, the new Outlook for Windows, Outlook on the web, and Outlook mobile apps on iOS and Android.',
      },
      {
        question: 'Can I use transport rules and client-side deployment together?',
        answer:
          'Absolutely. Many organizations use transport rules as a fallback to ensure every email has a signature, while client-side deployment gives users a preview in their compose window.',
      },
      {
        question: 'Will signatures appear in replies and forwards?',
        answer:
          'With server-side transport rules, signatures are appended to all outgoing messages including replies and forwards. Client-side deployment depends on Outlook settings.',
      },
      {
        question: 'How do I handle shared mailboxes?',
        answer:
          'Siggly can assign specific signature templates to shared mailboxes. Transport rules apply based on the sending address, so shared mailbox emails get the correct signature automatically.',
      },
      {
        question: 'What about Outlook on Mac?',
        answer:
          'Outlook for Mac supports HTML signatures through the preferences panel. Siggly generates Mac-compatible signature files and can deploy them through Microsoft 365 admin APIs.',
      },
    ],
    cta: {
      title: 'Deploy Outlook Signatures in Minutes',
      description:
        'Connect your Microsoft 365 tenant and push branded signatures to every Outlook user today. Start free.',
    },
  },

  // ---------------------------------------------------------------------------
  // 2. Gmail
  // ---------------------------------------------------------------------------
  {
    slug: 'gmail',
    category: 'platforms',
    meta: {
      title: 'Email Signatures for Gmail & Google Workspace | Siggly',
      description:
        'Manage Gmail email signatures across your Google Workspace organization. Deploy through admin console, Apps Script, or Siggly for centralized control.',
      keywords: [
        'Gmail email signatures',
        'Google Workspace signatures',
        'Gmail signature management',
        'Google admin console signatures',
      ],
      canonical: '/platforms/gmail',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Platforms', url: '/platforms' },
      { name: 'Gmail', url: '/platforms/gmail' },
    ],
    hero: {
      badge: { icon: 'inbox', text: 'Gmail' },
      title: 'Centralized Gmail Signatures for Every Team Member',
      description:
        'Google Workspace gives admins limited control over email signatures. Siggly fills the gap with a dedicated management layer that designs, deploys, and tracks signatures across your entire Gmail organization — no Apps Script hacking required.',
      variant: 'light',
    },
    stats: [
      { value: '1.8B', label: 'Gmail accounts globally' },
      { value: '2 min', label: 'Deploy to entire org' },
      { value: '50+', label: 'Gmail-optimized templates' },
    ],
    featuresTitle: 'Siggly + Gmail: A Perfect Match',
    features: [
      {
        icon: 'cloud',
        title: 'Google Workspace Admin API',
        description:
          'Siggly uses the official Gmail API to set signatures programmatically for every user in your organization, no browser extensions needed.',
      },
      {
        icon: 'users',
        title: 'Org-Unit Targeting',
        description:
          'Assign different signature templates to different organizational units in your Google Workspace directory.',
      },
      {
        icon: 'refresh-cw',
        title: 'Auto-Sync from Directory',
        description:
          'Pull names, titles, phone numbers, and profile photos directly from Google Workspace so signatures are always up to date.',
      },
      {
        icon: 'image',
        title: 'Banner Campaigns in Gmail',
        description:
          'Attach promotional banners that display below signatures in every outgoing Gmail message. Schedule, target, and track performance.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'Setting Up Gmail Signatures with Siggly',
        steps: [
          {
            step: '1',
            title: 'Authorize Google Workspace',
            description:
              'Grant Siggly domain-wide delegation through the Google Admin Console. This allows Siggly to manage signatures on behalf of your users.',
          },
          {
            step: '2',
            title: 'Map Directory Fields',
            description:
              'Select which Google Workspace directory attributes map to signature placeholders like name, title, department, and phone number.',
          },
          {
            step: '3',
            title: 'Deploy to Users',
            description:
              'Push signatures to all users or specific organizational units. Each user sees the updated signature the next time they compose an email.',
          },
        ],
      },
      {
        type: 'benefits',
        title: 'Advantages Over Manual Gmail Signature Management',
        items: [
          {
            icon: 'shield-check',
            title: 'Brand Enforcement',
            description:
              'Prevent employees from modifying their own signatures with non-standard fonts, colors, or unauthorized content.',
          },
          {
            icon: 'clock',
            title: 'Instant Updates',
            description:
              'Update one template and every Gmail user gets the new signature within minutes, no individual action required.',
          },
          {
            icon: 'database',
            title: 'Accurate Contact Data',
            description:
              'Directory sync ensures that when someone gets a new title or phone number, their signature reflects the change automatically.',
          },
          {
            icon: 'bar-chart-3',
            title: 'Engagement Tracking',
            description:
              'Measure clicks on signature links and banners to understand which content resonates with your email recipients.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Managing Gmail signatures for 300 Google Workspace users was a nightmare until Siggly. Now I update one template and the whole company is on-brand within minutes.',
      authorName: 'Priya Sharma',
      authorTitle: 'IT Admin, Greenfield Ventures',
    },
    faqs: [
      {
        question: 'Does Siggly require a Google Workspace admin account?',
        answer:
          'Yes. To deploy signatures across your organization, Siggly needs domain-wide delegation configured by a Google Workspace super admin.',
      },
      {
        question: 'Can individual users still edit their Gmail signature?',
        answer:
          'By default, users can modify their own signatures in Gmail settings. However, Siggly can periodically re-sync to restore the managed signature if changes are detected.',
      },
      {
        question: 'Does it work with free Gmail accounts?',
        answer:
          'Siggly is designed for Google Workspace organizations. Individual Gmail users can use the signature generator, but automated deployment requires a Workspace subscription.',
      },
      {
        question: 'Are profile photos pulled from Google Workspace?',
        answer:
          'Yes. Siggly can include each user\'s Google Workspace profile photo in their signature, automatically resized and optimized for email clients.',
      },
    ],
    cta: {
      title: 'Take Control of Gmail Signatures Across Your Org',
      description:
        'Connect Google Workspace and deploy professional signatures to every team member. Get started free.',
      variant: 'emerald',
    },
  },

  // ---------------------------------------------------------------------------
  // 3. Apple Mail
  // ---------------------------------------------------------------------------
  {
    slug: 'apple-mail',
    category: 'platforms',
    meta: {
      title: 'Email Signatures for Apple Mail on Mac & iOS | Siggly',
      description:
        'Create and install rich HTML email signatures in Apple Mail on macOS and iOS. Learn about signature folder paths, HTML setup, and Siggly deployment options.',
      keywords: [
        'Apple Mail email signatures',
        'macOS email signature',
        'Apple Mail HTML signature',
        'iOS email signature setup',
      ],
      canonical: '/platforms/apple-mail',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Platforms', url: '/platforms' },
      { name: 'Apple Mail', url: '/platforms/apple-mail' },
    ],
    hero: {
      title: 'Beautiful Email Signatures for Apple Mail',
      description:
        'Apple Mail supports rich HTML signatures, but installing them requires navigating hidden folders and editing plist files. Siggly simplifies the process with a visual editor and step-by-step installation guides for macOS and iOS.',
      variant: 'dark',
    },
    stats: [
      { value: '1B+', label: 'Active Apple devices worldwide' },
      { value: '5 min', label: 'Signature installation time' },
      { value: '100%', label: 'Retina-ready templates' },
    ],
    featuresTitle: 'How Siggly Helps Apple Mail Users',
    features: [
      {
        icon: 'laptop',
        title: 'macOS Signature Installation',
        description:
          'Siggly generates Apple Mail-compatible HTML and guides you through installing it in the correct Library/Mail signature folder on your Mac.',
      },
      {
        icon: 'smartphone',
        title: 'iOS Signature Support',
        description:
          'While iOS limits signatures to plain text in the Settings app, Siggly provides workaround instructions for installing rich signatures via Mail.app profiles.',
      },
      {
        icon: 'palette',
        title: 'Apple-Optimized Templates',
        description:
          'Our templates account for Apple Mail rendering quirks including WebKit-specific CSS, Retina image handling, and dark mode adaptation.',
      },
      {
        icon: 'eye',
        title: 'Dark Mode Compatible',
        description:
          'Siggly signatures look great in Apple Mail dark mode. We handle background colors, text contrast, and image transparency automatically.',
      },
      {
        icon: 'link',
        title: 'iCloud Sync Awareness',
        description:
          'Understand how iCloud syncs signatures between devices and how to prevent Apple Mail from overwriting your custom HTML signature.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'Installing a Signature in Apple Mail (macOS)',
        steps: [
          {
            step: '1',
            title: 'Create a Placeholder Signature',
            description:
              'Open Apple Mail preferences, go to Signatures, and create a new blank signature. This generates the signature file Apple Mail expects.',
          },
          {
            step: '2',
            title: 'Locate the Signature Folder',
            description:
              'Navigate to ~/Library/Mail/V10/MailData/Signatures/ and find the .mailsignature file that matches your new placeholder.',
          },
          {
            step: '3',
            title: 'Replace the HTML Content',
            description:
              'Open the .mailsignature file in a text editor, replace the body content with the HTML generated by Siggly, and save the file.',
          },
          {
            step: '4',
            title: 'Lock the File',
            description:
              'Lock the .mailsignature file using Finder\'s Get Info panel to prevent Apple Mail from overwriting your custom HTML on next launch.',
          },
        ],
      },
      {
        type: 'checklist',
        title: 'Apple Mail Signature Tips',
        items: [
          'Lock the .mailsignature file after editing to prevent overwrites',
          'Use WebKit-compatible CSS for consistent macOS rendering',
          'Include @2x images for crisp display on Retina screens',
          'Test dark mode appearance — Apple Mail inverts some colors automatically',
          'Disable iCloud signature sync if managing signatures manually',
        ],
      },
    ],
    faqs: [
      {
        question: 'Why does Apple Mail keep resetting my custom signature?',
        answer:
          'Apple Mail overwrites signature files on launch unless you lock the .mailsignature file. Use Finder\'s Get Info to check the Locked checkbox after making changes.',
      },
      {
        question: 'Can I use HTML signatures on iPhone?',
        answer:
          'iOS does not natively support HTML signatures through Settings. However, you can install a configuration profile or use a third-party mail app that supports HTML signatures.',
      },
      {
        question: 'Does Siggly support centralized deployment for Apple Mail?',
        answer:
          'Apple Mail does not offer admin-level signature APIs like Gmail or Outlook. Siggly provides the optimized HTML and installation instructions, but deployment is per-device on macOS.',
      },
    ],
    cta: {
      title: 'Create a Stunning Apple Mail Signature',
      description:
        'Design your signature in Siggly and install it in Apple Mail in under five minutes. Try it free.',
    },
  },

  // ---------------------------------------------------------------------------
  // 4. Thunderbird
  // ---------------------------------------------------------------------------
  {
    slug: 'thunderbird',
    category: 'platforms',
    meta: {
      title: 'Email Signatures for Mozilla Thunderbird | Siggly',
      description:
        'Set up professional HTML email signatures in Thunderbird. Learn about HTML file signatures, profile folder configuration, and extension-based deployment.',
      keywords: [
        'Thunderbird email signatures',
        'Thunderbird HTML signature',
        'Mozilla Thunderbird signature setup',
        'Thunderbird signature extension',
      ],
      canonical: '/platforms/thunderbird',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Platforms', url: '/platforms' },
      { name: 'Thunderbird', url: '/platforms/thunderbird' },
    ],
    hero: {
      badge: { icon: 'mail', text: 'Thunderbird' },
      title: 'Professional Signatures for Thunderbird Users',
      description:
        'Thunderbird supports HTML signatures natively through file references or inline editing. Siggly takes it further by generating optimized HTML and providing clear setup instructions for Thunderbird on Windows, macOS, and Linux.',
      variant: 'emerald',
    },
    stats: [
      { value: '25M+', label: 'Thunderbird users worldwide' },
      { value: '3', label: 'Platforms supported (Win/Mac/Linux)' },
      { value: 'HTML', label: 'Native rich signature support' },
    ],
    featuresTitle: 'Siggly + Thunderbird',
    features: [
      {
        icon: 'file-text',
        title: 'HTML File Signatures',
        description:
          'Thunderbird can load signatures from an external HTML file. Siggly generates a ready-to-use .html file you simply point Thunderbird to in Account Settings.',
      },
      {
        icon: 'edit-3',
        title: 'Inline HTML Editing',
        description:
          'Prefer pasting HTML directly? Siggly provides clean, validated HTML you can paste into Thunderbird\'s built-in signature editor.',
      },
      {
        icon: 'folder-open',
        title: 'Profile Folder Guidance',
        description:
          'Siggly documents exactly where Thunderbird stores signature references in your profile folder, making troubleshooting straightforward.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'Setting Up a Signature in Thunderbird',
        steps: [
          {
            step: '1',
            title: 'Design in Siggly',
            description:
              'Use the visual editor to create your signature and export it as an HTML file optimized for Thunderbird rendering.',
          },
          {
            step: '2',
            title: 'Save the HTML File',
            description:
              'Download the .html file and save it to a permanent location on your computer — this is the file Thunderbird will reference.',
          },
          {
            step: '3',
            title: 'Configure Thunderbird',
            description:
              'Open Account Settings, check "Use HTML" and "Attach the signature from a file", then browse to the saved HTML file.',
          },
        ],
      },
      {
        type: 'use-cases-grid',
        title: 'Common Thunderbird Signature Scenarios',
        cases: [
          {
            title: 'Multi-Account Signatures',
            description:
              'Thunderbird supports different signatures per email account. Use Siggly to generate a unique HTML file for each identity.',
          },
          {
            title: 'Linux Desktop Teams',
            description:
              'Thunderbird is the default mail client on many Linux distributions. Siggly ensures signatures render consistently across GTK and Qt environments.',
          },
          {
            title: 'Shared Workstations',
            description:
              'Store signature HTML files on a network share so every user on a shared workstation references the same up-to-date signatures.',
          },
          {
            title: 'Extension-Based Management',
            description:
              'Combine Siggly-generated HTML with Thunderbird extensions like Signature Switch for advanced per-recipient or per-account signature rules.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Does Thunderbird support rich HTML signatures?',
        answer:
          'Yes. Thunderbird has native HTML signature support either through pasting HTML directly into the signature field or referencing an external HTML file.',
      },
      {
        question: 'Can Siggly deploy signatures to Thunderbird automatically?',
        answer:
          'Thunderbird does not expose admin APIs for remote signature deployment. Siggly generates the HTML file and provides clear installation instructions. For multi-user setups, you can distribute files via network shares or scripts.',
      },
      {
        question: 'What about Thunderbird on Linux?',
        answer:
          'Siggly generates cross-platform HTML that works identically on Thunderbird for Windows, macOS, and all major Linux distributions.',
      },
    ],
    cta: {
      title: 'Build a Thunderbird Signature That Stands Out',
      description:
        'Design in Siggly, export as HTML, and set it up in Thunderbird in three easy steps. Free to start.',
      variant: 'dark',
    },
  },

  // ---------------------------------------------------------------------------
  // 5. Yahoo Mail
  // ---------------------------------------------------------------------------
  {
    slug: 'yahoo-mail',
    category: 'platforms',
    meta: {
      title: 'Email Signatures for Yahoo Mail - Setup Guide | Siggly',
      description:
        'Create and set up professional email signatures in Yahoo Mail. Learn about HTML limitations, paste-based setup, and mobile app signature differences.',
      keywords: [
        'Yahoo Mail email signature',
        'Yahoo Mail signature setup',
        'Yahoo email signature HTML',
        'Yahoo Mail mobile signature',
      ],
      canonical: '/platforms/yahoo-mail',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Platforms', url: '/platforms' },
      { name: 'Yahoo Mail', url: '/platforms/yahoo-mail' },
    ],
    hero: {
      badge: { icon: 'mail', text: 'Yahoo Mail' },
      title: 'Professional Signatures in Yahoo Mail',
      description:
        'Yahoo Mail supports rich text signatures but has unique limitations around HTML rendering and mobile behavior. Siggly generates Yahoo-compatible signatures and walks you through the paste-based setup process.',
      variant: 'violet',
    },
    featuresTitle: 'Making Yahoo Mail Signatures Work',
    features: [
      {
        icon: 'edit-3',
        title: 'Paste-Ready Formatting',
        description:
          'Siggly generates signatures formatted specifically for Yahoo Mail\'s rich text editor. Copy from our preview and paste directly into Yahoo settings.',
      },
      {
        icon: 'monitor',
        title: 'Yahoo HTML Rendering',
        description:
          'Yahoo Mail strips certain HTML tags and styles. Siggly pre-processes signatures to avoid stripped elements and ensure consistent rendering.',
      },
      {
        icon: 'smartphone',
        title: 'Mobile App Differences',
        description:
          'The Yahoo Mail mobile app handles signatures differently from the web version. Siggly provides separate setup instructions for each.',
      },
      {
        icon: 'image',
        title: 'Image Hosting Included',
        description:
          'Yahoo Mail requires externally hosted images for signatures. Siggly hosts your logo and social icons on our CDN with guaranteed uptime.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'Setting Up Your Yahoo Mail Signature',
        steps: [
          {
            step: '1',
            title: 'Design Your Signature',
            description:
              'Create your signature in Siggly\'s editor using one of our Yahoo-optimized templates that avoid incompatible HTML elements.',
          },
          {
            step: '2',
            title: 'Copy the Formatted Output',
            description:
              'Use Siggly\'s "Copy for Yahoo Mail" button to copy the signature in a format that Yahoo\'s rich text editor preserves correctly.',
          },
          {
            step: '3',
            title: 'Paste into Yahoo Settings',
            description:
              'Open Yahoo Mail Settings, navigate to the signature section under Writing email, and paste the signature into the rich text field.',
          },
        ],
      },
      {
        type: 'checklist',
        title: 'Yahoo Mail Signature Limitations to Know',
        items: [
          'Yahoo strips background-color on some elements — use simple layouts',
          'Inline styles are required; Yahoo removes style blocks from signatures',
          'The mobile app uses a separate signature setting from the web client',
          'Image dimensions should be specified in HTML attributes, not just CSS',
          'Maximum recommended signature width is 550px for Yahoo Mail',
        ],
      },
    ],
    testimonial: {
      quote:
        'Yahoo Mail kept stripping our signature formatting until we used Siggly. Their Yahoo-specific output finally gave us a signature that survives the paste every time.',
      authorName: 'Sandra Olsen',
      authorTitle: 'Office Manager, Greenway Realty',
    },
    cta: {
      title: 'Create a Yahoo Mail Signature That Actually Works',
      description:
        'Avoid Yahoo\'s formatting pitfalls. Design in Siggly and paste a perfectly formatted signature in seconds.',
    },
  },

  // ---------------------------------------------------------------------------
  // 6. Outlook Mobile
  // ---------------------------------------------------------------------------
  {
    slug: 'outlook-mobile',
    category: 'platforms',
    meta: {
      title: 'Email Signatures for Outlook Mobile (iOS & Android) | Siggly',
      description:
        'Deploy professional email signatures to Outlook on iOS and Android. Learn about Intune policies, mobile device management, and Siggly signature sync options.',
      keywords: [
        'Outlook mobile email signature',
        'Outlook iOS signature',
        'Outlook Android signature',
        'Intune email signature deployment',
      ],
      canonical: '/platforms/outlook-mobile',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Platforms', url: '/platforms' },
      { name: 'Outlook Mobile', url: '/platforms/outlook-mobile' },
    ],
    hero: {
      badge: { icon: 'smartphone', text: 'Mobile' },
      title: 'Consistent Signatures on Outlook Mobile',
      description:
        'Outlook mobile apps on iOS and Android have their own signature settings that do not sync with Outlook desktop. Siggly helps you manage mobile signatures through Intune policies, MDM configuration, and direct in-app setup guidance.',
      variant: 'slate',
    },
    stats: [
      { value: '100M+', label: 'Outlook mobile installs' },
      { value: '60%', label: 'Of business emails opened on mobile' },
      { value: '5 min', label: 'Intune policy deployment' },
    ],
    featuresTitle: 'Mobile Signature Management with Siggly',
    features: [
      {
        icon: 'shield',
        title: 'Intune Policy Deployment',
        description:
          'Push signature configurations to managed devices through Microsoft Intune app protection policies. No user action required.',
      },
      {
        icon: 'settings',
        title: 'MDM Configuration Profiles',
        description:
          'For non-Intune MDM solutions, Siggly generates configuration profiles that set Outlook mobile signatures on enrolled devices.',
      },
      {
        icon: 'refresh-cw',
        title: 'Signature Sync Workarounds',
        description:
          'Outlook mobile does not sync signatures from desktop. Siggly provides automated deployment paths that keep mobile signatures current.',
      },
      {
        icon: 'layout',
        title: 'Mobile-Optimized Templates',
        description:
          'Our templates are designed for small screens first. Single-column layouts, appropriately sized fonts, and tap-friendly links are standard.',
      },
    ],
    sections: [
      {
        type: 'prose',
        title: 'The Outlook Mobile Signature Challenge',
        paragraphs: [
          'Unlike Outlook desktop, the Outlook mobile apps on iOS and Android maintain their own signature settings. A signature configured in Outlook 365 on a desktop does not automatically appear on the mobile app, creating inconsistency for organizations that rely on branded signatures.',
          'This disconnect means employees who respond to emails from their phones often send messages with a generic "Sent from Outlook" footer or a manually typed signature that does not match corporate branding standards.',
          'Siggly addresses this gap by providing multiple deployment paths: Intune app configuration policies for managed devices, MDM profiles for broader device management scenarios, and clear manual setup instructions for BYOD environments.',
        ],
      },
      {
        type: 'benefits',
        title: 'Why Mobile Signature Management Matters',
        items: [
          {
            icon: 'eye',
            title: 'Brand Consistency Everywhere',
            description:
              'More than half of business emails are read on mobile. Every reply from a phone should carry the same professional signature.',
          },
          {
            icon: 'shield-check',
            title: 'Compliance on Every Device',
            description:
              'Legal disclaimers and regulatory notices must appear in mobile emails too. Automated deployment ensures nothing is missed.',
          },
          {
            icon: 'users',
            title: 'Zero Employee Effort',
            description:
              'Intune and MDM policies set signatures silently. Employees never need to copy, paste, or configure anything manually.',
          },
        ],
      },
    ],
    testimonial: {
      quote:
        'Half our sales team answers emails from their phones. Before Siggly and Intune, every mobile reply had a different signature. Now they all match our brand perfectly.',
      authorName: 'Rebecca Lawson',
      authorTitle: 'Sales Operations Manager, Apex Dynamics',
    },
    faqs: [
      {
        question: 'Why does my Outlook desktop signature not appear on mobile?',
        answer:
          'Outlook mobile maintains separate signature settings from Outlook desktop and Outlook on the web. Each platform must be configured independently, which is why centralized management tools like Siggly are valuable.',
      },
      {
        question: 'Can I push signatures to unmanaged (BYOD) devices?',
        answer:
          'For unmanaged devices, Siggly provides a self-service link where employees can copy their pre-formatted signature and paste it into Outlook mobile settings in under a minute.',
      },
      {
        question: 'Does Intune deployment support HTML signatures?',
        answer:
          'Intune app configuration policies support plain text signatures by default. For rich HTML signatures on mobile, server-side transport rules are the most reliable approach.',
      },
    ],
    cta: {
      title: 'Extend Your Signature Standards to Every Device',
      description:
        'Bring mobile email signatures under control with Siggly and Microsoft Intune. Start your free trial.',
      variant: 'indigo',
    },
  },

  // ---------------------------------------------------------------------------
  // 7. Samsung Email
  // ---------------------------------------------------------------------------
  {
    slug: 'samsung-email',
    category: 'platforms',
    meta: {
      title: 'Email Signatures for Samsung Email App | Siggly',
      description:
        'Set up professional email signatures in the Samsung Email app on Galaxy devices. Understand HTML rendering quirks, Knox integration, and signature best practices.',
      keywords: [
        'Samsung Email signature',
        'Samsung Galaxy email signature',
        'Samsung Knox email signatures',
        'Android email signature setup',
      ],
      canonical: '/platforms/samsung-email',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Platforms', url: '/platforms' },
      { name: 'Samsung Email', url: '/platforms/samsung-email' },
    ],
    hero: {
      title: 'Email Signatures That Work on Samsung Email',
      description:
        'Samsung Email is the default mail client on Galaxy smartphones and tablets. It supports HTML signatures, but rendering quirks require careful template design. Siggly generates Samsung-tested signatures and offers Knox-based deployment for enterprise fleets.',
      variant: 'light',
    },
    featuresTitle: 'Samsung Email Signature Solutions',
    features: [
      {
        icon: 'smartphone',
        title: 'Samsung-Tested Templates',
        description:
          'Every Siggly template is tested on Samsung Email to account for its unique HTML rendering engine and ensure your signature looks right.',
      },
      {
        icon: 'shield',
        title: 'Knox Enterprise Deployment',
        description:
          'For organizations managing Samsung Galaxy fleets through Knox, Siggly provides configuration profiles that set email signatures on managed devices.',
      },
      {
        icon: 'settings',
        title: 'Per-Account Signatures',
        description:
          'Samsung Email supports different signatures per email account. Siggly generates separate signature HTML for each account as needed.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'Setting Up Signatures on Samsung Email',
        steps: [
          {
            step: '1',
            title: 'Generate Samsung-Optimized HTML',
            description:
              'Design your signature in Siggly and select the Samsung Email output format, which accounts for rendering differences from standard Android WebView.',
          },
          {
            step: '2',
            title: 'Copy the Signature',
            description:
              'Copy the optimized HTML signature from Siggly. Our Samsung-specific output avoids elements known to break in the Samsung Email renderer.',
          },
          {
            step: '3',
            title: 'Paste into Samsung Email Settings',
            description:
              'Open Samsung Email, go to Settings, select your account, tap Signature, and paste the formatted signature into the editor.',
          },
        ],
      },
      {
        type: 'checklist',
        title: 'Samsung Email Rendering Notes',
        items: [
          'Samsung Email uses its own HTML renderer, not Chrome WebView',
          'Avoid CSS shorthand properties — write them out in full for reliability',
          'Table cell padding is more reliable than margin for spacing',
          'Image width and height should be set in HTML attributes, not just CSS',
          'Background images may not render — use solid background colors instead',
          'Test on both Samsung One UI 5 and One UI 6 for best coverage',
        ],
      },
    ],
    testimonial: {
      quote:
        'Our field sales team all use Samsung Galaxy phones. Siggly was the only tool that generated signatures that actually looked correct in the Samsung Email app.',
      authorName: 'David Tan',
      authorTitle: 'Mobile IT Manager, Horizon Logistics',
    },
    cta: {
      title: 'Get Samsung Email Signatures Right the First Time',
      description:
        'Design once in Siggly, deploy to every Galaxy device in your fleet. Start free today.',
    },
  },

  // ---------------------------------------------------------------------------
  // 8. ProtonMail
  // ---------------------------------------------------------------------------
  {
    slug: 'protonmail',
    category: 'platforms',
    meta: {
      title: 'Email Signatures for ProtonMail & Proton Bridge | Siggly',
      description:
        'Create rich email signatures for ProtonMail. Learn about HTML signature support, Proton Bridge setup, and end-to-end encryption considerations for signatures.',
      keywords: [
        'ProtonMail email signature',
        'Proton Mail HTML signature',
        'ProtonMail signature setup',
        'Proton Bridge email signature',
      ],
      canonical: '/platforms/protonmail',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Platforms', url: '/platforms' },
      { name: 'ProtonMail', url: '/platforms/protonmail' },
    ],
    hero: {
      badge: { icon: 'lock', text: 'ProtonMail' },
      title: 'Rich Email Signatures Meet End-to-End Encryption',
      description:
        'ProtonMail prioritizes privacy and security, but that does not mean your signatures have to be plain text. Siggly helps you create professional HTML signatures that work within ProtonMail\'s web client and through Proton Bridge for desktop clients.',
      variant: 'dark',
    },
    stats: [
      { value: '100M+', label: 'Proton accounts worldwide' },
      { value: 'E2EE', label: 'End-to-end encryption preserved' },
      { value: 'HTML', label: 'Rich signature support included' },
    ],
    featuresTitle: 'Siggly + ProtonMail',
    features: [
      {
        icon: 'lock',
        title: 'Encryption-Aware Signatures',
        description:
          'Siggly signatures work within ProtonMail\'s encryption model. Images are hosted externally with privacy-conscious CDN settings.',
      },
      {
        icon: 'code',
        title: 'ProtonMail HTML Editor Support',
        description:
          'ProtonMail\'s web client supports HTML signatures natively. Paste Siggly-generated HTML directly into the signature settings panel.',
      },
      {
        icon: 'link',
        title: 'Proton Bridge Integration',
        description:
          'Using Proton Bridge with Outlook or Thunderbird? Siggly signatures work seamlessly through Bridge-connected desktop clients.',
      },
      {
        icon: 'eye',
        title: 'Privacy-First Image Hosting',
        description:
          'Signature images are served from our CDN without tracking pixels that would conflict with ProtonMail\'s privacy-focused approach.',
      },
    ],
    sections: [
      {
        type: 'how-it-works',
        title: 'Adding a Signature to ProtonMail',
        steps: [
          {
            step: '1',
            title: 'Design in Siggly',
            description:
              'Create your signature using the visual editor. Select a template optimized for ProtonMail\'s supported HTML subset.',
          },
          {
            step: '2',
            title: 'Copy the HTML',
            description:
              'Export the signature as HTML. Siggly strips unsupported elements to ensure compatibility with ProtonMail\'s composer.',
          },
          {
            step: '3',
            title: 'Paste into ProtonMail Settings',
            description:
              'Go to ProtonMail Settings, select the signature section, switch to the HTML editor, and paste your Siggly-generated signature.',
          },
        ],
      },
      {
        type: 'prose',
        title: 'Encryption and Email Signatures',
        paragraphs: [
          'When you send an encrypted email through ProtonMail, the signature is included in the encrypted message body. This means recipients using ProtonMail see the full rich signature after decryption, maintaining both security and professionalism.',
          'For emails sent to non-ProtonMail recipients, the signature appears as standard HTML in the message. External image references in the signature load normally for these recipients, while ProtonMail users see a prompt to load remote content per their privacy preferences.',
          'Siggly respects this model by avoiding tracking pixels and providing clean image URLs. If your organization requires maximum privacy, you can opt to embed images as base64 data URIs, though this increases message size.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Does ProtonMail support HTML email signatures?',
        answer:
          'Yes. ProtonMail\'s web client has a built-in HTML signature editor. You can paste rich HTML generated by Siggly directly into the settings panel.',
      },
      {
        question: 'Will my signature be encrypted with the email?',
        answer:
          'When sending encrypted emails to other ProtonMail users, the signature is part of the encrypted message body. For unencrypted emails to external recipients, the signature is sent as standard HTML.',
      },
      {
        question: 'Can I use Siggly signatures through Proton Bridge?',
        answer:
          'Yes. Proton Bridge connects ProtonMail to desktop clients like Outlook and Thunderbird. Signatures configured in those clients through Siggly work normally via Bridge.',
      },
      {
        question: 'Are signature images blocked by ProtonMail privacy settings?',
        answer:
          'ProtonMail blocks remote images by default for incoming mail. Your own signature images display normally in your sent messages. Recipients on ProtonMail will see them after choosing to load remote content.',
      },
      {
        question: 'Does Siggly add tracking pixels to signatures?',
        answer:
          'No. Siggly analytics are opt-in and use link-level tracking, not hidden pixels. For ProtonMail users who prioritize privacy, you can disable all tracking features entirely.',
      },
    ],
    testimonial: {
      quote:
        'We moved to ProtonMail for privacy and thought we would have to give up professional signatures. Siggly proved us wrong — our signatures look great and respect our encryption-first philosophy.',
      authorName: 'Erik Lindqvist',
      authorTitle: 'Security Engineer, NordVault Solutions',
    },
    cta: {
      title: 'Bring Professional Signatures to ProtonMail',
      description:
        'Privacy and professionalism are not mutually exclusive. Design your ProtonMail signature with Siggly today.',
      variant: 'violet',
    },
  },
];
