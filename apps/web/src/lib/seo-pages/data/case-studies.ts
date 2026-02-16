import type { SEOLandingPageData } from '../types';

export const caseStudiesPages: SEOLandingPageData[] = [
  // ─── 1. Law Firm — 200 Attorneys ───

  {
    slug: 'law-firm-200-attorneys',
    category: 'case-studies',
    meta: {
      title: 'How a 200-Attorney Law Firm Standardized Signatures in 1 Day | Siggly',
      description:
        'Learn how Hargrove & Associates LLP deployed brand-compliant email signatures to 200 attorneys in a single day using Siggly, achieving 100% adoption with zero IT tickets.',
      keywords: ['law firm email signatures', 'attorney email branding', 'legal email compliance', 'law firm case study'],
      canonical: '/case-studies/law-firm-200-attorneys',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Case Studies', url: '/case-studies' },
      { name: 'Law Firm — 200 Attorneys', url: '/case-studies/law-firm-200-attorneys' },
    ],
    hero: {
      badge: { icon: 'trophy', text: 'Case Study' },
      title: 'How a 200-Attorney Law Firm Standardized Signatures in 1 Day',
      description:
        'Hargrove & Associates LLP had 200 attorneys each creating their own email signatures, resulting in inconsistent branding and missing legal disclaimers. By deploying Siggly firm-wide, they achieved 100% compliance with bar association requirements and eliminated signature-related IT support tickets entirely.',
      variant: 'dark',
    },
    stats: [
      { value: '1 day', label: 'Full deployment' },
      { value: '100%', label: 'Adoption rate' },
      { value: '0', label: 'IT tickets post-launch' },
    ],
    features: [
      { icon: 'layout-template', title: 'Template Locking', description: 'Attorneys can update personal details but cannot modify the firm\'s approved layout, fonts, or disclaimer text.' },
      { icon: 'shield', title: 'Legal Disclaimer Enforcement', description: 'Mandatory confidentiality notices and bar-required disclosures are appended to every outgoing email automatically.' },
      { icon: 'users', title: 'Directory Integration', description: 'Synced with the firm\'s Active Directory to pull attorney names, titles, practice groups, and office locations.' },
      { icon: 'refresh-cw', title: 'Instant Rollout', description: 'Server-side deployment pushed signatures to all 200 mailboxes simultaneously without requiring attorney action.' },
    ],
    featuresTitle: 'Key Capabilities Used',
    sections: [
      {
        type: 'prose',
        title: 'The Challenge',
        paragraphs: [
          'Hargrove & Associates LLP is a mid-size law firm with 200 attorneys across four offices in Chicago, New York, Dallas, and Washington, D.C. Each attorney had been creating their own email signature for years, leading to a patchwork of fonts, layouts, and branding inconsistencies. Some signatures included the firm logo, others did not. Some listed bar admissions, others omitted them entirely.',
          'The firm\'s general counsel flagged a compliance risk: several attorneys were sending emails without the required confidentiality notice, and a handful were using outdated firm branding from before a 2022 rebranding effort. The IT team had fielded over 40 signature-related support tickets in the previous quarter alone, ranging from formatting issues in Outlook to broken logo images.',
          'Managing Partner Elena Voss directed IT to find a solution that could enforce a single, approved signature template across the entire firm within one week — without disrupting billable work or requiring attorneys to take any action.',
        ],
      },
      {
        type: 'how-it-works',
        title: 'The Solution',
        steps: [
          { step: '1', title: 'Template Design & Approval', description: 'The marketing team designed three approved templates — one per practice group style — using Siggly\'s visual editor. The general counsel reviewed and approved the legal disclaimer language in a single afternoon.' },
          { step: '2', title: 'Active Directory Sync', description: 'Siggly connected to the firm\'s on-premise Active Directory to import all 200 attorney profiles, including name, title, practice group, office location, direct dial, and bar admissions.' },
          { step: '3', title: 'Rule-Based Assignment', description: 'Assignment rules automatically matched each attorney to the correct template based on practice group and office, with the appropriate state bar disclaimer appended.' },
          { step: '4', title: 'Server-Side Deployment', description: 'Signatures were deployed via Exchange transport rules, meaning attorneys saw no disruption. The rollout completed in under 4 hours on a Friday evening.' },
        ],
      },
      {
        type: 'prose',
        title: 'The Results',
        paragraphs: [
          'Within 24 hours of deployment, all 200 attorneys were sending emails with fully compliant, brand-consistent signatures. The firm\'s IT help desk reported zero signature-related tickets in the 90 days following launch — down from 40+ in the prior quarter.',
          'The general counsel confirmed that every outgoing email now includes the required confidentiality notice and bar admission disclosures. The marketing team gained the ability to update signatures firm-wide in minutes, which they used to promote the firm\'s annual client summit, generating 35 event registrations directly from signature banner clicks.',
          'Managing Partner Elena Voss noted that the deployment was "the smoothest IT initiative we\'ve executed in five years — attorneys didn\'t have to lift a finger, and our brand finally looks unified across every client touchpoint."',
        ],
      },
    ],
    testimonial: {
      quote: 'We went from 200 different signatures to one cohesive brand in a single day. No attorney had to change a setting, open a ticket, or even think about it. Siggly just worked.',
      authorName: 'David Okafor',
      authorTitle: 'Director of Information Technology, Hargrove & Associates LLP',
    },
    faqs: [
      { question: 'How long did the entire project take from start to finish?', answer: 'The project took 5 business days total: 2 days for template design and legal review, 1 day for directory sync and testing, and 1 day for deployment. Attorneys experienced no downtime.' },
      { question: 'Did attorneys need to install anything on their computers?', answer: 'No. Signatures were deployed server-side via Exchange transport rules. Attorneys did not need to install software, change settings, or take any action.' },
      { question: 'How does the firm handle attorneys who are admitted in multiple states?', answer: 'Siggly\'s dynamic fields pull bar admission data from Active Directory, so each attorney\'s signature automatically lists all applicable state admissions.' },
      { question: 'Can individual attorneys customize any part of their signature?', answer: 'Attorneys can update their headshot photo and preferred pronouns through a self-service portal, but all other elements — layout, fonts, logos, and disclaimers — are locked by the template.' },
      { question: 'What happens when a new attorney joins the firm?', answer: 'When a new attorney is added to Active Directory, Siggly automatically provisions their signature within minutes using the correct template based on their practice group and office.' },
    ],
    cta: { title: 'Get Similar Results', description: 'See how Siggly can solve your team\'s email signature challenges.' },
  },

  // ─── 2. Healthcare Network — HIPAA Compliance ───

  {
    slug: 'healthcare-network-compliance',
    category: 'case-studies',
    meta: {
      title: 'How a Healthcare Network Achieved HIPAA-Compliant Signatures Across 500 Providers | Siggly',
      description:
        'Pacific Coast Health Network deployed HIPAA-compliant email signatures to 500 providers across 23 clinics using Siggly, eliminating compliance gaps and passing their next audit with zero findings.',
      keywords: ['healthcare email signatures', 'HIPAA email compliance', 'medical provider signatures', 'healthcare case study'],
      canonical: '/case-studies/healthcare-network-compliance',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Case Studies', url: '/case-studies' },
      { name: 'Healthcare Network — HIPAA Compliance', url: '/case-studies/healthcare-network-compliance' },
    ],
    hero: {
      badge: { icon: 'trophy', text: 'Case Study' },
      title: 'How a Healthcare Network Achieved HIPAA-Compliant Signatures Across 500 Providers',
      description:
        'Pacific Coast Health Network needed every provider email to include HIPAA-required disclaimers. With 500 providers across 23 clinics and no centralized control, compliance was inconsistent. Siggly delivered uniform, audit-ready signatures across the entire network in under two weeks.',
      variant: 'violet',
    },
    stats: [
      { value: '500', label: 'Providers compliant' },
      { value: '0', label: 'Audit findings' },
      { value: '23', label: 'Clinics unified' },
    ],
    features: [
      { icon: 'shield-check', title: 'HIPAA Disclaimer Enforcement', description: 'Every outgoing provider email automatically includes the network\'s approved HIPAA confidentiality notice.' },
      { icon: 'building', title: 'Multi-Location Management', description: 'Each clinic\'s address, phone, and fax are dynamically populated based on the provider\'s assigned location.' },
      { icon: 'lock', title: 'Template Locking', description: 'Providers cannot edit or remove compliance-required elements, ensuring 100% adherence to network policies.' },
      { icon: 'clipboard-check', title: 'Audit Trail', description: 'Every signature deployment and change is logged with timestamps for compliance documentation.' },
    ],
    featuresTitle: 'Key Capabilities Used',
    sections: [
      {
        type: 'prose',
        title: 'The Challenge',
        paragraphs: [
          'Pacific Coast Health Network operates 23 outpatient clinics and specialty practices across California and Oregon, employing over 500 physicians, nurse practitioners, and clinical staff. As a covered entity under HIPAA, the network is required to include appropriate confidentiality disclaimers in all electronic communications that may contain protected health information.',
          'An internal compliance audit revealed that 38% of provider emails were being sent without the required HIPAA disclaimer. Some providers had outdated signatures referencing clinics they no longer practiced at, and several had no signature at all. The network\'s compliance officer, facing an upcoming OCR audit, needed a solution that would guarantee 100% adherence with no room for human error.',
          'The existing approach — emailing signature templates to providers and asking them to copy-paste into their email clients — had a compliance rate of just 62%. Many providers cited the complexity of updating signatures in their mobile email apps as the reason they never completed the task.',
        ],
      },
      {
        type: 'how-it-works',
        title: 'The Solution',
        steps: [
          { step: '1', title: 'Compliance Review', description: 'Siggly\'s team worked with Pacific Coast\'s legal and compliance departments to build a signature template with the exact HIPAA disclaimer language approved by their legal counsel, including conditional logic for different provider types.' },
          { step: '2', title: 'EHR Directory Integration', description: 'Provider data was imported from the network\'s HR system, including name, credentials (MD, DO, NP, PA), clinic assignment, specialty, and NPI number — eliminating manual data entry entirely.' },
          { step: '3', title: 'Phased Clinic Rollout', description: 'Signatures were deployed clinic by clinic over 10 business days, starting with three pilot clinics. Each clinic was verified for accuracy before proceeding to the next batch.' },
          { step: '4', title: 'Mobile & Desktop Coverage', description: 'Server-side deployment ensured signatures appeared on emails sent from desktop Outlook, webmail, and mobile devices — covering all the platforms providers use daily.' },
        ],
      },
      {
        type: 'benefits',
        title: 'The Results',
        items: [
          { icon: 'check-circle', title: '100% HIPAA Compliance', description: 'Every provider email now includes the required confidentiality disclaimer. The compliance rate went from 62% to 100% within two weeks of deployment.' },
          { icon: 'search', title: 'Clean Audit', description: 'The network passed its OCR audit with zero findings related to email communications — a first in the organization\'s history.' },
          { icon: 'clock', title: '15 Hours/Month Saved', description: 'IT staff no longer spend time troubleshooting individual provider signatures or manually verifying disclaimer compliance.' },
          { icon: 'heart', title: 'Provider Satisfaction', description: 'Providers reported higher satisfaction since they no longer need to manage their own signatures. The self-service portal for updating headshots received a 91% participation rate.' },
        ],
      },
    ],
    testimonial: {
      quote: 'Before Siggly, I spent every quarter chasing providers to update their signatures. Now I sleep well knowing every single email leaving our network is compliant. We passed our OCR audit without a single finding related to email.',
      authorName: 'Monica Tran',
      authorTitle: 'Chief Compliance Officer, Pacific Coast Health Network',
    },
    faqs: [
      { question: 'How does Siggly ensure HIPAA compliance for email signatures?', answer: 'Siggly enforces mandatory disclaimer blocks that cannot be removed or modified by individual users. Server-side deployment ensures the disclaimer appears regardless of the device or email client used.' },
      { question: 'Can different provider types have different disclaimers?', answer: 'Yes. Siggly supports conditional logic, so physicians, nurse practitioners, and administrative staff can each have tailored signature elements while sharing the same base compliance requirements.' },
      { question: 'What happens when a provider transfers to a different clinic?', answer: 'When the provider\'s clinic assignment is updated in the HR system, Siggly automatically updates their signature with the new clinic address, phone, and fax within the next sync cycle.' },
      { question: 'Does Siggly store or process any patient health information?', answer: 'No. Siggly only processes provider directory information (name, credentials, clinic assignment). It never accesses, stores, or transmits any protected health information.' },
    ],
    cta: { title: 'Get Similar Results', description: 'See how Siggly can solve your team\'s email signature challenges.' },
  },

  // ─── 3. SaaS Startup — Scaling ───

  {
    slug: 'saas-startup-scaling',
    category: 'case-studies',
    meta: {
      title: 'How a SaaS Startup Scaled Brand-Consistent Signatures from 10 to 300 Employees | Siggly',
      description:
        'Discover how Vantage Analytics scaled from 10 to 300 employees while maintaining perfectly consistent email signatures using Siggly, saving their design team 8 hours per week.',
      keywords: ['startup email signatures', 'scaling email branding', 'SaaS company signatures', 'startup case study'],
      canonical: '/case-studies/saas-startup-scaling',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Case Studies', url: '/case-studies' },
      { name: 'SaaS Startup — Scaling', url: '/case-studies/saas-startup-scaling' },
    ],
    hero: {
      badge: { icon: 'trophy', text: 'Case Study' },
      title: 'How a SaaS Startup Scaled Brand-Consistent Signatures from 10 to 300 Employees',
      description:
        'Vantage Analytics grew from 10 to 300 employees in 18 months. Their design team was spending 8 hours per week manually creating signatures for new hires. Siggly automated the entire process, ensuring every new employee had a perfect signature on day one.',
      variant: 'indigo',
    },
    stats: [
      { value: '30x', label: 'Team growth handled' },
      { value: '8 hrs/wk', label: 'Design time saved' },
      { value: 'Day 1', label: 'New hire signature ready' },
    ],
    features: [
      { icon: 'zap', title: 'Auto-Provisioning', description: 'New employees receive a fully branded signature the moment their Google Workspace account is created.' },
      { icon: 'palette', title: 'Brand Kit Integration', description: 'Signatures automatically use the latest brand colors, fonts, and logo — even after a rebrand.' },
      { icon: 'git-branch', title: 'Department Templates', description: 'Engineering, sales, marketing, and support teams each have tailored templates with role-specific CTAs.' },
      { icon: 'bar-chart', title: 'Campaign Banners', description: 'The marketing team can deploy promotional banners across all signatures for product launches and events.' },
    ],
    featuresTitle: 'Key Capabilities Used',
    sections: [
      {
        type: 'prose',
        title: 'The Challenge',
        paragraphs: [
          'Vantage Analytics is a B2B analytics platform that experienced hypergrowth, scaling from 10 employees to over 300 in just 18 months after closing a Series B funding round. During the early days, the co-founder personally created each employee\'s email signature in HTML. As hiring accelerated to 15-20 new employees per month, this approach broke down completely.',
          'The design team inherited the task but found themselves spending roughly 8 hours per week creating individual signatures, troubleshooting formatting issues across Gmail and mobile clients, and fielding requests from employees who wanted to update their titles or add pronouns. When the company underwent a visual rebrand, updating all 180 existing signatures took over two full work weeks.',
          'VP of Marketing Rena Kobayashi realized the company needed an automated solution that could scale with the hiring pace and handle the inevitable future rebrands without consuming design resources.',
        ],
      },
      {
        type: 'how-it-works',
        title: 'The Solution',
        steps: [
          { step: '1', title: 'Google Workspace Integration', description: 'Siggly connected to Vantage\'s Google Workspace directory, pulling employee profiles including name, title, department, pronouns, and profile photo automatically.' },
          { step: '2', title: 'Department-Specific Templates', description: 'Four templates were created: engineering (with GitHub links), sales (with Calendly booking links), marketing (with latest campaign banner), and a default template for all other departments.' },
          { step: '3', title: 'Auto-Provisioning Rules', description: 'A provisioning rule was configured so that any new user added to Google Workspace automatically receives their signature within 15 minutes — no manual intervention required.' },
          { step: '4', title: 'Self-Service Portal', description: 'Employees were given a self-service portal to update their photo and pronouns, while all other branding elements remained locked to the approved template.' },
        ],
      },
      {
        type: 'prose',
        title: 'The Results',
        paragraphs: [
          'Since deploying Siggly, the design team has reclaimed 8 hours per week previously spent on signature creation and troubleshooting. New employees receive their branded signature automatically on their first day — it\'s now part of the standard onboarding checklist, requiring zero manual effort from IT or design.',
          'When Vantage underwent a second rebrand six months after deployment, the marketing team updated all 300 signatures in under 20 minutes by simply updating the template. The company has also used signature banners to promote three product launches, with banner click-through rates averaging 2.3% — generating over 1,200 landing page visits from signature links alone.',
          'VP of Marketing Rena Kobayashi called the platform "one of the highest-ROI tools in our marketing stack" and noted that signature banners now outperform the company\'s LinkedIn ads on a cost-per-click basis.',
        ],
      },
    ],
    testimonial: {
      quote: 'We were growing so fast that signature management became a real bottleneck. Siggly eliminated it entirely. Our second rebrand took 20 minutes instead of two weeks, and new hires get their signatures on day one without anyone lifting a finger.',
      authorName: 'Rena Kobayashi',
      authorTitle: 'VP of Marketing, Vantage Analytics',
    },
    faqs: [
      { question: 'How quickly are signatures provisioned for new hires?', answer: 'Within 15 minutes of a new user being added to Google Workspace, Siggly automatically creates and deploys their signature using the appropriate department template.' },
      { question: 'Can employees update their own signature details?', answer: 'Employees can update their profile photo and pronouns through a self-service portal. All other elements are controlled by the centralized template.' },
      { question: 'How does Siggly handle a company rebrand?', answer: 'Templates can be updated in the Siggly dashboard, and changes are pushed to all employees simultaneously. Vantage\'s rebrand of 300 signatures took less than 20 minutes.' },
      { question: 'What kind of ROI did signature banners deliver?', answer: 'Signature banners achieved a 2.3% click-through rate across three product launches, generating over 1,200 landing page visits — outperforming the company\'s paid LinkedIn ads on a cost-per-click basis.' },
      { question: 'Does Siggly work with Google Workspace mobile apps?', answer: 'Yes. Server-side deployment ensures signatures appear consistently across Gmail web, desktop, and mobile — including the Gmail app on iOS and Android.' },
    ],
    cta: { title: 'Get Similar Results', description: 'See how Siggly can solve your team\'s email signature challenges.' },
  },

  // ─── 4. Financial Services — SEC Compliance ───

  {
    slug: 'financial-services-compliance',
    category: 'case-studies',
    meta: {
      title: 'How a Financial Advisory Firm Met SEC Compliance with Centralized Signatures | Siggly',
      description:
        'Meridian Wealth Partners used Siggly to ensure all 85 financial advisors include SEC-required disclosures in every email, passing FINRA examination with zero deficiencies.',
      keywords: ['financial advisor email signatures', 'SEC email compliance', 'FINRA compliant signatures', 'financial services case study'],
      canonical: '/case-studies/financial-services-compliance',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Case Studies', url: '/case-studies' },
      { name: 'Financial Services — SEC Compliance', url: '/case-studies/financial-services-compliance' },
    ],
    hero: {
      badge: { icon: 'trophy', text: 'Case Study' },
      title: 'How a Financial Advisory Firm Met SEC Compliance with Centralized Signatures',
      description:
        'Meridian Wealth Partners had 85 financial advisors sending emails with inconsistent disclosures. After a FINRA examination flagged missing disclaimers, the firm deployed Siggly to enforce SEC-required language in every outgoing email, eliminating compliance risk entirely.',
      variant: 'emerald',
    },
    stats: [
      { value: '85', label: 'Advisors compliant' },
      { value: '0', label: 'FINRA deficiencies' },
      { value: '3 days', label: 'Deployment time' },
    ],
    features: [
      { icon: 'file-text', title: 'Regulatory Disclaimer Management', description: 'SEC and FINRA-required disclosures are embedded in every signature and cannot be modified or removed by individual advisors.' },
      { icon: 'lock', title: 'Tamper-Proof Templates', description: 'Advisors can view but not edit signature content, ensuring compliance language remains intact.' },
      { icon: 'history', title: 'Version History', description: 'Every signature change is logged with timestamps, providing a complete audit trail for regulatory examinations.' },
      { icon: 'users', title: 'CRD Number Integration', description: 'Each advisor\'s CRD number and registration details are automatically pulled from the firm\'s compliance database.' },
    ],
    featuresTitle: 'Key Capabilities Used',
    sections: [
      {
        type: 'prose',
        title: 'The Challenge',
        paragraphs: [
          'Meridian Wealth Partners is a registered investment advisory firm with 85 financial advisors across six offices in the southeastern United States. During a routine FINRA examination, examiners flagged that several advisor emails were missing required SEC disclosure language, including the firm\'s ADV brochure offer and the required statement about securities not being FDIC insured.',
          'The firm\'s Chief Compliance Officer, Angela Reyes, discovered that only 71% of advisors had the correct disclaimer in their signatures. Some had outdated language from a previous compliance policy, others had inadvertently deleted the disclaimer when reformatting their signatures, and a few had no signature at all. The examination resulted in a formal deficiency letter requiring corrective action within 30 days.',
          'Reyes needed a solution that would guarantee every advisor email included the exact approved disclaimer language — with no possibility of individual modification — and provide an audit trail to demonstrate ongoing compliance to regulators.',
        ],
      },
      {
        type: 'how-it-works',
        title: 'The Solution',
        steps: [
          { step: '1', title: 'Compliance Template Design', description: 'Siggly worked with Meridian\'s compliance team to create a signature template that included all SEC and FINRA-required disclosures, formatted exactly as approved by outside counsel.' },
          { step: '2', title: 'Advisor Data Import', description: 'Advisor profiles were imported from the firm\'s CRM, including name, title, CRD number, licenses held (Series 7, Series 66), and office location.' },
          { step: '3', title: 'Server-Side Enforcement', description: 'Signatures were deployed via Microsoft 365 transport rules, ensuring the disclaimer appears on every outgoing email regardless of device or client — including mobile phones advisors use when meeting clients.' },
          { step: '4', title: 'Audit Documentation', description: 'Siggly\'s audit log was configured to export compliance reports showing deployment timestamps, template versions, and advisor coverage for regulatory examination readiness.' },
        ],
      },
      {
        type: 'prose',
        title: 'The Results',
        paragraphs: [
          'Meridian deployed compliant signatures to all 85 advisors within 3 business days of purchasing Siggly. The firm submitted its corrective action response to FINRA within the 30-day window, including Siggly audit reports demonstrating 100% advisor coverage and tamper-proof enforcement.',
          'In the 12 months following deployment, Meridian passed two subsequent FINRA spot checks with zero deficiencies related to email communications. The compliance team estimated they save approximately 6 hours per month previously spent manually auditing advisor signatures.',
          'When the SEC updated its marketing rule requirements, the compliance team updated all 85 signatures with the revised disclaimer language in under 10 minutes — a process that previously took two weeks of manual follow-up with individual advisors.',
        ],
      },
    ],
    testimonial: {
      quote: 'After the FINRA deficiency letter, I needed a guarantee that every advisor email would be compliant — not a best effort, a guarantee. Siggly gave us that. We haven\'t had a single compliance finding related to email signatures since.',
      authorName: 'Angela Reyes',
      authorTitle: 'Chief Compliance Officer, Meridian Wealth Partners',
    },
    faqs: [
      { question: 'What SEC disclosures are required in financial advisor emails?', answer: 'Requirements vary by firm type, but typically include the ADV brochure offer, a statement that securities are not FDIC insured, and the firm\'s registered name. Siggly supports custom disclaimer blocks to match your firm\'s specific requirements.' },
      { question: 'Can Siggly provide documentation for regulatory examinations?', answer: 'Yes. Siggly maintains a complete audit trail of all signature deployments, template changes, and advisor coverage. Reports can be exported for FINRA, SEC, or state regulator examinations.' },
      { question: 'What happens if an advisor tries to modify their signature?', answer: 'Signatures are deployed server-side, so even if an advisor edits their local signature settings, the compliant signature is applied at the server level before the email is delivered.' },
      { question: 'How does Siggly handle advisors who leave or join the firm?', answer: 'Departing advisors\' signatures are automatically deactivated when their email account is disabled. New advisors receive compliant signatures automatically when provisioned in the directory.' },
    ],
    cta: { title: 'Get Similar Results', description: 'See how Siggly can solve your team\'s email signature challenges.' },
  },

  // ─── 5. Real Estate Brokerage — Listing Inquiries ───

  {
    slug: 'real-estate-brokerage',
    category: 'case-studies',
    meta: {
      title: 'How a Real Estate Brokerage Increased Listing Inquiries 40% with Signature Banners | Siggly',
      description:
        'Summit Realty Group used Siggly signature banners to promote featured listings in every agent email, driving a 40% increase in listing inquiries and 12 additional closings per quarter.',
      keywords: ['real estate email signatures', 'realtor signature banners', 'listing promotion email', 'real estate case study'],
      canonical: '/case-studies/real-estate-brokerage',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Case Studies', url: '/case-studies' },
      { name: 'Real Estate Brokerage — Listing Inquiries', url: '/case-studies/real-estate-brokerage' },
    ],
    hero: {
      badge: { icon: 'trophy', text: 'Case Study' },
      title: 'How a Real Estate Brokerage Increased Listing Inquiries 40% with Signature Banners',
      description:
        'Summit Realty Group equipped 75 agents with Siggly-powered signature banners showcasing featured listings. The result: a 40% increase in listing inquiry calls, 12 additional closings per quarter, and over $2.8M in attributable transaction volume.',
      variant: 'slate',
    },
    stats: [
      { value: '40%', label: 'More listing inquiries' },
      { value: '12', label: 'Additional closings/quarter' },
      { value: '$2.8M', label: 'Attributable volume' },
    ],
    features: [
      { icon: 'image', title: 'Rotating Banner Campaigns', description: 'Featured listing banners rotate weekly across all agent signatures, keeping content fresh and promoting inventory evenly.' },
      { icon: 'bar-chart', title: 'Click Analytics', description: 'Every banner click is tracked, showing which listings generate the most interest and which agents drive the most engagement.' },
      { icon: 'map-pin', title: 'Geo-Targeted Banners', description: 'Agents in different markets see banners relevant to their local listings, ensuring relevance for each office.' },
      { icon: 'smartphone', title: 'Mobile-Optimized', description: 'Banners render perfectly on mobile devices, where 68% of real estate email is read.' },
    ],
    featuresTitle: 'Key Capabilities Used',
    sections: [
      {
        type: 'prose',
        title: 'The Challenge',
        paragraphs: [
          'Summit Realty Group is a residential brokerage with 75 agents across three offices in the Denver metro area. The brokerage sends an estimated 4,500 emails per day across all agents — to clients, prospects, lenders, title companies, and other agents. Despite this massive email volume, none of it was being leveraged as a marketing channel.',
          'Broker/Owner Carlos Medina had tried asking agents to include featured listing links in their signatures manually, but adoption was below 20%. Most agents didn\'t know how to update their signatures, and those who did rarely remembered to swap in new listings. Meanwhile, the brokerage was spending $8,000 per month on digital advertising to promote listings.',
          'Medina wanted a solution that would turn every outgoing agent email into a listing promotion opportunity — without requiring any effort from agents and with measurable ROI to justify reducing the digital ad budget.',
        ],
      },
      {
        type: 'how-it-works',
        title: 'The Solution',
        steps: [
          { step: '1', title: 'Agent Onboarding', description: 'All 75 agents were onboarded to Siggly in a single afternoon. Agent profiles were imported from the brokerage\'s CRM, including headshots, license numbers, and office assignments.' },
          { step: '2', title: 'Listing Banner System', description: 'The marketing coordinator was given access to Siggly\'s banner management dashboard. Each week, she uploads 3-4 featured listing banners with links to the listing detail pages on the brokerage\'s website.' },
          { step: '3', title: 'Automated Rotation', description: 'Banners rotate automatically across agent signatures, ensuring even exposure for all featured properties. Geo-targeting rules ensure Denver agents see Denver listings and suburban agents see suburban listings.' },
          { step: '4', title: 'Performance Tracking', description: 'Click analytics track which listings generate the most interest, informing the marketing team\'s decisions about which properties to feature next.' },
        ],
      },
      {
        type: 'benefits',
        title: 'The Results',
        items: [
          { icon: 'trending-up', title: '40% More Listing Inquiries', description: 'Featured listings promoted via signature banners received 40% more inquiry calls compared to the same period in the prior year.' },
          { icon: 'home', title: '12 Additional Closings Per Quarter', description: 'The brokerage attributed 12 additional closings per quarter directly to leads generated from signature banner clicks.' },
          { icon: 'dollar-sign', title: '$2.8M in Transaction Volume', description: 'Over the first year, signature-attributed leads resulted in $2.8M in closed transaction volume.' },
          { icon: 'piggy-bank', title: '35% Ad Spend Reduction', description: 'The brokerage reduced its digital advertising budget by 35% ($2,800/month) by reallocating to signature-based promotion.' },
        ],
      },
    ],
    testimonial: {
      quote: 'Every email our agents send is now a listing ad — and it doesn\'t cost us a dime per impression. We\'ve cut our digital ad spend by 35% and are getting better results. The ROI is honestly hard to believe.',
      authorName: 'Carlos Medina',
      authorTitle: 'Broker/Owner, Summit Realty Group',
    },
    faqs: [
      { question: 'How often can listing banners be updated?', answer: 'Banners can be updated as frequently as needed. Summit Realty updates theirs weekly, but some brokerages update daily for time-sensitive listings or open houses.' },
      { question: 'Do agents need to do anything to update their banners?', answer: 'No. The marketing coordinator manages all banners centrally. Agents\' signatures update automatically without any action on their part.' },
      { question: 'How are clicks tracked and attributed?', answer: 'Each banner includes a unique tracked link. Siggly\'s analytics dashboard shows total clicks, clicks by agent, clicks by listing, and click-through rates over time.' },
      { question: 'Can individual agents promote their own listings?', answer: 'Yes. Siggly supports agent-specific banners alongside brokerage-wide banners. Agents can request their own listings be featured through the marketing coordinator.' },
      { question: 'What image sizes work best for signature banners?', answer: 'Siggly recommends 600x100 pixels for signature banners. The platform automatically optimizes images for fast loading across all email clients.' },
    ],
    cta: { title: 'Get Similar Results', description: 'See how Siggly can solve your team\'s email signature challenges.' },
  },

  // ─── 6. Marketing Agency — Client Brands ───

  {
    slug: 'marketing-agency-clients',
    category: 'case-studies',
    meta: {
      title: 'How a Marketing Agency Manages Signatures Across 50 Client Brands | Siggly',
      description:
        'Ember & Oak Creative uses Siggly to manage email signatures for 50 client brands and 120 employees, switching brand contexts instantly and maintaining perfect brand consistency.',
      keywords: ['marketing agency email signatures', 'multi-brand signatures', 'agency client branding', 'marketing agency case study'],
      canonical: '/case-studies/marketing-agency-clients',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Case Studies', url: '/case-studies' },
      { name: 'Marketing Agency — Client Brands', url: '/case-studies/marketing-agency-clients' },
    ],
    hero: {
      badge: { icon: 'trophy', text: 'Case Study' },
      title: 'How a Marketing Agency Manages Signatures Across 50 Client Brands',
      description:
        'Ember & Oak Creative manages marketing for 50 client brands. Their 120 employees frequently send emails on behalf of clients, requiring brand-appropriate signatures. Siggly\'s multi-brand workspace eliminated the chaos of managing 50 different signature sets manually.',
      variant: 'dark',
    },
    stats: [
      { value: '50', label: 'Client brands managed' },
      { value: '120', label: 'Employees equipped' },
      { value: '95%', label: 'Less time on signatures' },
    ],
    features: [
      { icon: 'layers', title: 'Multi-Brand Workspaces', description: 'Each client brand has its own workspace with dedicated templates, logos, color schemes, and compliance requirements.' },
      { icon: 'repeat', title: 'Brand Switching', description: 'Account managers can switch between client brand signatures instantly when context-switching between accounts.' },
      { icon: 'palette', title: 'Client Brand Kits', description: 'Client brand guidelines are stored in Siggly, ensuring every signature matches the client\'s exact brand standards.' },
      { icon: 'user-check', title: 'Role-Based Access', description: 'Only employees assigned to a client account can access that client\'s signature templates, maintaining confidentiality.' },
    ],
    featuresTitle: 'Key Capabilities Used',
    sections: [
      {
        type: 'prose',
        title: 'The Challenge',
        paragraphs: [
          'Ember & Oak Creative is a full-service marketing agency with 120 employees serving 50 client brands across industries including hospitality, retail, healthcare, and technology. Account managers, designers, and strategists frequently send emails to vendors, media contacts, and partners on behalf of their client brands.',
          'The agency had no consistent system for managing client-specific email signatures. Account managers would manually copy-paste different signature blocks when switching between client accounts, often resulting in errors — including one incident where an account manager sent a pitch to a media outlet using the wrong client\'s signature, creating a client relations crisis.',
          'Creative Director Simone Achebe estimated that employees spent an average of 15 minutes per day managing signature switching, and the design team spent 4 hours per week creating and updating client signature templates. With the agency growing rapidly and onboarding 3-4 new clients per month, the process was unsustainable.',
        ],
      },
      {
        type: 'how-it-works',
        title: 'The Solution',
        steps: [
          { step: '1', title: 'Client Workspace Setup', description: 'Each of the 50 client brands was configured as a separate workspace in Siggly, with unique templates matching each client\'s brand guidelines — including logos, fonts, colors, and required legal text.' },
          { step: '2', title: 'Employee-Client Mapping', description: 'Employees were assigned to client workspaces based on their account assignments. An account manager handling 5 clients can access all 5 brand signatures from a single interface.' },
          { step: '3', title: 'Quick-Switch Integration', description: 'Siggly\'s browser extension allows employees to switch their active signature with two clicks, selecting the appropriate client brand before sending an email.' },
          { step: '4', title: 'New Client Onboarding Template', description: 'A standardized onboarding process was created: when a new client is won, the design team builds the signature template once in Siggly, and all assigned employees gain access immediately.' },
        ],
      },
      {
        type: 'prose',
        title: 'The Results',
        paragraphs: [
          'Since deploying Siggly, the agency has eliminated signature-related brand mix-ups entirely. The design team\'s weekly time spent on signature management dropped from 4 hours to approximately 12 minutes — a 95% reduction. New client signature onboarding now takes 30 minutes instead of a full day.',
          'Employee satisfaction surveys showed a measurable improvement in workflow efficiency, with 89% of account managers rating the brand-switching feature as "significantly easier" than the previous manual process. The average time spent on daily signature management dropped from 15 minutes to under 1 minute per employee.',
          'The agency has also started offering "signature management" as an add-on service to clients, using Siggly to manage end-client employee signatures. This new service line has generated an additional $4,200 per month in recurring revenue across 8 clients who opted in.',
        ],
      },
    ],
    testimonial: {
      quote: 'Managing 50 brand signatures was a nightmare before Siggly. We had brand mix-ups, wasted design hours, and frustrated account managers. Now it takes two clicks to switch brands, and we\'ve even turned it into a revenue stream for the agency.',
      authorName: 'Simone Achebe',
      authorTitle: 'Creative Director, Ember & Oak Creative',
    },
    faqs: [
      { question: 'How many client brands can Siggly support?', answer: 'Siggly has no hard limit on the number of brand workspaces. Ember & Oak manages 50 brands and the platform handles it seamlessly.' },
      { question: 'Can employees switch between client signatures quickly?', answer: 'Yes. The browser extension allows employees to switch their active signature in two clicks. They select the client brand and the signature is applied instantly.' },
      { question: 'How do you onboard a new client brand?', answer: 'The design team creates the signature template in Siggly using the client\'s brand guidelines. Assigned employees gain access immediately — the whole process takes about 30 minutes.' },
      { question: 'Is there a risk of using the wrong client\'s signature?', answer: 'Siggly\'s interface clearly displays the active brand name, and employees receive a visual confirmation when switching. Since deployment, Ember & Oak has had zero brand mix-up incidents.' },
    ],
    cta: { title: 'Get Similar Results', description: 'See how Siggly can solve your team\'s email signature challenges.' },
  },

  // ─── 7. University — Faculty Signatures ───

  {
    slug: 'university-faculty',
    category: 'case-studies',
    meta: {
      title: 'How a University Standardized 2,000 Faculty Signatures with Directory Sync | Siggly',
      description:
        'Lakeshore State University deployed standardized email signatures to 2,000 faculty and staff using Siggly\'s directory sync, achieving 99.8% adoption and saving IT 20 hours per week.',
      keywords: ['university email signatures', 'faculty email branding', 'education email signatures', 'university case study'],
      canonical: '/case-studies/university-faculty',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Case Studies', url: '/case-studies' },
      { name: 'University — Faculty Signatures', url: '/case-studies/university-faculty' },
    ],
    hero: {
      badge: { icon: 'trophy', text: 'Case Study' },
      title: 'How a University Standardized 2,000 Faculty Signatures with Directory Sync',
      description:
        'Lakeshore State University had 2,000 faculty and staff each creating their own email signatures, with no consistency in branding. By integrating Siggly with their campus directory, they achieved 99.8% adoption and gave the university a unified digital identity for the first time.',
      variant: 'violet',
    },
    stats: [
      { value: '2,000', label: 'Users standardized' },
      { value: '99.8%', label: 'Adoption rate' },
      { value: '20 hrs/wk', label: 'IT time saved' },
    ],
    features: [
      { icon: 'database', title: 'Campus Directory Sync', description: 'Faculty profiles are pulled from the university\'s LDAP directory, including department, title, office location, and campus phone extension.' },
      { icon: 'graduation-cap', title: 'Department Templates', description: 'Each college and department has a tailored template with the appropriate sub-brand logo and color accent.' },
      { icon: 'refresh-cw', title: 'Automatic Updates', description: 'When faculty change departments, receive promotions, or update their office location, signatures update automatically.' },
      { icon: 'globe', title: 'Accessibility Compliant', description: 'All signature templates meet WCAG 2.1 AA standards, ensuring accessibility for recipients with disabilities.' },
    ],
    featuresTitle: 'Key Capabilities Used',
    sections: [
      {
        type: 'prose',
        title: 'The Challenge',
        paragraphs: [
          'Lakeshore State University is a public research university with 2,000 faculty and staff across 8 colleges, 45 departments, and 3 campuses. The university had never implemented a standardized email signature policy, resulting in a chaotic mix of signatures that ranged from professionally designed to plain text to completely absent.',
          'The university\'s brand audit revealed that fewer than 12% of employee emails included the official university logo, and faculty in the same department often used completely different formats. The provost and the VP of University Relations jointly commissioned a branding initiative that included standardizing email signatures as a priority.',
          'The IT department faced a daunting challenge: deploying signatures to 2,000 users across a decentralized Google Workspace environment where each college had its own organizational unit. Previous attempts to distribute signature templates via email had resulted in only 8% adoption after 60 days.',
        ],
      },
      {
        type: 'how-it-works',
        title: 'The Solution',
        steps: [
          { step: '1', title: 'LDAP Directory Integration', description: 'Siggly connected to the university\'s LDAP directory to import all 2,000 faculty and staff profiles, including college, department, title, office building, room number, and campus phone extension.' },
          { step: '2', title: 'College-Specific Templates', description: 'Eight templates were designed — one for each college — featuring the university masterbrand logo alongside each college\'s sub-brand mark and accent color. Administrative staff received a separate general template.' },
          { step: '3', title: 'Phased Deployment', description: 'Signatures were deployed college by college over 3 weeks, with the College of Engineering serving as the pilot. Each phase included a verification step where department admins confirmed accuracy.' },
          { step: '4', title: 'Faculty Self-Service Portal', description: 'Faculty were given a portal to upload headshots and add optional elements like office hours, lab website URLs, and research group affiliations.' },
        ],
      },
      {
        type: 'prose',
        title: 'The Results',
        paragraphs: [
          'Lakeshore State achieved 99.8% adoption — only 4 out of 2,000 users required manual intervention (due to legacy email configurations). The IT help desk, which had been fielding approximately 20 signature-related tickets per week, saw that number drop to fewer than 2 per week.',
          'The university\'s brand audit score for email communications improved from 12% to 99.8% compliance. Faculty feedback was overwhelmingly positive, with 82% rating the new signatures as "professional and easy to use" in a post-deployment survey. The self-service portal for headshot uploads saw 67% participation within the first month.',
          'VP of University Relations Terrence Blackwell noted that the standardized signatures had an unexpected benefit: alumni donors commented positively on the university\'s "polished, unified appearance," and the annual fund team reported a 15% increase in email response rates during the fall fundraising campaign.',
        ],
      },
    ],
    testimonial: {
      quote: 'We tried to standardize signatures twice before and failed both times because we relied on faculty to do it themselves. Siggly made it invisible — signatures just appeared, correctly, for everyone. Our brand has never looked this consistent.',
      authorName: 'Terrence Blackwell',
      authorTitle: 'VP of University Relations, Lakeshore State University',
    },
    faqs: [
      { question: 'How does Siggly handle the complexity of a large university directory?', answer: 'Siggly syncs with LDAP or Google Workspace directories and uses organizational unit mappings to automatically assign the correct template based on college, department, and role.' },
      { question: 'Can faculty add their own research or lab information?', answer: 'Yes. The self-service portal allows faculty to add optional elements like lab URLs, office hours, and research group names, while core branding elements remain locked.' },
      { question: 'What happens when a faculty member moves to a different department?', answer: 'When the directory is updated, Siggly automatically assigns the new department\'s template and updates all relevant information in the signature.' },
      { question: 'Are the signatures accessible for recipients using screen readers?', answer: 'Yes. All templates are designed to meet WCAG 2.1 AA standards, with proper alt text on images, semantic HTML structure, and sufficient color contrast ratios.' },
      { question: 'How long did the full deployment take?', answer: 'The phased deployment across all 8 colleges took 3 weeks, including a 1-week pilot with the College of Engineering. Most individual colleges were completed within 2-3 days.' },
    ],
    cta: { title: 'Get Similar Results', description: 'See how Siggly can solve your team\'s email signature challenges.' },
  },

  // ─── 8. Manufacturing — Multi-Site ───

  {
    slug: 'manufacturing-multi-site',
    category: 'case-studies',
    meta: {
      title: 'How a Multi-Site Manufacturer Deployed Signatures Across 12 Locations | Siggly',
      description:
        'Ridgeline Manufacturing Corp used Siggly to standardize email signatures across 12 plants and 850 employees, unifying branding after acquiring three regional manufacturers.',
      keywords: ['manufacturing email signatures', 'multi-site email branding', 'industrial company signatures', 'manufacturing case study'],
      canonical: '/case-studies/manufacturing-multi-site',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Case Studies', url: '/case-studies' },
      { name: 'Manufacturing — Multi-Site', url: '/case-studies/manufacturing-multi-site' },
    ],
    hero: {
      badge: { icon: 'trophy', text: 'Case Study' },
      title: 'How a Multi-Site Manufacturer Deployed Signatures Across 12 Locations',
      description:
        'Ridgeline Manufacturing Corp had acquired three regional manufacturers, inheriting four different email systems and zero brand consistency. Siggly unified 850 employees across 12 plants under one cohesive brand identity, completing the integration in just 6 weeks.',
      variant: 'indigo',
    },
    stats: [
      { value: '12', label: 'Plants unified' },
      { value: '850', label: 'Employees branded' },
      { value: '6 weeks', label: 'Full integration' },
    ],
    features: [
      { icon: 'building', title: 'Multi-Location Support', description: 'Each plant\'s address, phone, and safety certifications are dynamically populated based on the employee\'s assigned facility.' },
      { icon: 'merge', title: 'Post-Acquisition Integration', description: 'Legacy brand elements from acquired companies were replaced with unified Ridgeline branding across all locations.' },
      { icon: 'hard-hat', title: 'Safety Certification Display', description: 'ISO, OSHA, and industry-specific certifications are displayed in signatures for employees at certified facilities.' },
      { icon: 'mail', title: 'Multi-Platform Deployment', description: 'Signatures were deployed across Microsoft 365, legacy Exchange servers, and one facility still using Lotus Notes.' },
    ],
    featuresTitle: 'Key Capabilities Used',
    sections: [
      {
        type: 'prose',
        title: 'The Challenge',
        paragraphs: [
          'Ridgeline Manufacturing Corp is a precision metal fabrication company with 12 manufacturing plants across the Midwest and Southeast. Over the previous three years, Ridgeline had acquired three smaller regional manufacturers — each with its own email system, branding, and signature conventions. The result was a fragmented brand identity: customers dealing with multiple Ridgeline facilities might encounter three or four different signature styles.',
          'CTO Robert Anglin faced a complex integration challenge. The company operated Microsoft 365 at headquarters and 7 plants, legacy Exchange 2016 at 3 acquired plants, and one facility still running Lotus Notes. Many plant floor supervisors and quality engineers accessed email only from shared workstations, adding another layer of complexity.',
          'The CEO had set a 90-day deadline to complete the brand integration across all locations. Email signatures — the most visible daily touchpoint with customers and suppliers — were the top priority.',
        ],
      },
      {
        type: 'how-it-works',
        title: 'The Solution',
        steps: [
          { step: '1', title: 'Multi-Platform Assessment', description: 'Siggly\'s team conducted a technical assessment of all three email platforms and designed a deployment strategy that would work across Microsoft 365, Exchange 2016, and Lotus Notes simultaneously.' },
          { step: '2', title: 'Unified Template with Location Variables', description: 'A single master template was created with dynamic fields for plant name, address, phone, and applicable certifications (ISO 9001, AS9100, ITAR). Each plant\'s unique details populate automatically.' },
          { step: '3', title: 'Phased Plant Rollout', description: 'Deployment proceeded in three phases: headquarters and M365 plants first (week 1-2), Exchange 2016 plants second (week 3-4), and the Lotus Notes facility last (week 5-6). Each phase included testing with plant managers.' },
          { step: '4', title: 'Shared Workstation Configuration', description: 'For shared workstations on the plant floor, Siggly was configured to apply signatures based on the logged-in user\'s credentials, ensuring the correct name and title appear even on shared machines.' },
        ],
      },
      {
        type: 'prose',
        title: 'The Results',
        paragraphs: [
          'Ridgeline completed the brand integration across all 12 plants in 6 weeks — well ahead of the CEO\'s 90-day deadline. All 850 employees now send emails with a unified Ridgeline signature, regardless of which legacy email platform their facility uses.',
          'Customer feedback was immediately positive. Three key accounts specifically commented on the "professional, unified appearance," and the sales team reported that the consistent branding helped reinforce the message that the acquired companies were now fully integrated into the Ridgeline family.',
          'The project also resolved a compliance issue: two defense-contract facilities required ITAR compliance notices in their email signatures, which had been inconsistently applied. With Siggly, the ITAR disclaimer is automatically applied to all employees at those facilities, satisfying the facility security officer\'s requirements.',
        ],
      },
    ],
    testimonial: {
      quote: 'We had four different email systems and three legacy brands to unify. I honestly expected this to take six months. Siggly got us to one unified brand across all 12 plants in six weeks. The shared workstation support was the clincher for us.',
      authorName: 'Robert Anglin',
      authorTitle: 'Chief Technology Officer, Ridgeline Manufacturing Corp',
    },
    faqs: [
      { question: 'Can Siggly work with legacy email systems like Exchange 2016 or Lotus Notes?', answer: 'Yes. Siggly supports deployment across Microsoft 365, Exchange on-premise (2013+), Google Workspace, and can accommodate legacy systems through hybrid deployment strategies.' },
      { question: 'How are signatures handled on shared workstations?', answer: 'Siggly applies signatures based on the authenticated user\'s identity, so shared workstations display the correct signature for whoever is currently logged in.' },
      { question: 'Can different locations show different certifications?', answer: 'Yes. Dynamic fields can be configured per location, so each facility\'s signatures display only the certifications that facility holds (ISO 9001, AS9100, ITAR, etc.).' },
      { question: 'How does Siggly handle employees who transfer between plants?', answer: 'When an employee\'s location assignment is updated in the directory, their signature automatically updates with the new facility\'s address, phone, and certifications.' },
    ],
    cta: { title: 'Get Similar Results', description: 'See how Siggly can solve your team\'s email signature challenges.' },
  },

  // ─── 9. Insurance Network — Agent Compliance ───

  {
    slug: 'insurance-network',
    category: 'case-studies',
    meta: {
      title: 'How an Insurance Network Maintains Compliance Across 300 Independent Agents | Siggly',
      description:
        'Pinnacle Insurance Group uses Siggly to enforce state-mandated disclosure requirements across 300 independent agents in 14 states, achieving 100% compliance and reducing E&O risk.',
      keywords: ['insurance email signatures', 'agent compliance signatures', 'insurance disclaimer email', 'insurance case study'],
      canonical: '/case-studies/insurance-network',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Case Studies', url: '/case-studies' },
      { name: 'Insurance Network — Agent Compliance', url: '/case-studies/insurance-network' },
    ],
    hero: {
      badge: { icon: 'trophy', text: 'Case Study' },
      title: 'How an Insurance Network Maintains Compliance Across 300 Independent Agents',
      description:
        'Pinnacle Insurance Group\'s 300 independent agents operate in 14 states, each with different email disclosure requirements. Siggly\'s rule-based engine automatically applies the correct state-specific disclaimers to each agent\'s signature, achieving 100% compliance and significantly reducing E&O exposure.',
      variant: 'emerald',
    },
    stats: [
      { value: '300', label: 'Agents compliant' },
      { value: '14', label: 'State regulations covered' },
      { value: '100%', label: 'Disclosure compliance' },
    ],
    features: [
      { icon: 'map', title: 'State-Specific Disclaimers', description: 'Each agent\'s signature includes the exact disclosure language required by their state\'s Department of Insurance.' },
      { icon: 'shield', title: 'License Number Display', description: 'Agent license numbers and carrier appointments are automatically included and updated when renewals are processed.' },
      { icon: 'git-branch', title: 'Rule-Based Assignment', description: 'Agents are automatically assigned the correct template and disclaimer set based on their state, license type, and carrier appointments.' },
      { icon: 'file-check', title: 'Compliance Reporting', description: 'Monthly compliance reports show agent coverage, disclaimer accuracy, and any exceptions for the compliance team.' },
    ],
    featuresTitle: 'Key Capabilities Used',
    sections: [
      {
        type: 'prose',
        title: 'The Challenge',
        paragraphs: [
          'Pinnacle Insurance Group is a national insurance marketing organization (IMO) that supports 300 independent agents selling life, health, and annuity products across 14 states. Each state has different requirements for email disclosures — some require the agent\'s license number, others mandate specific language about the agent\'s relationship with carriers, and several require disclaimers about insurance products not being bank deposits.',
          'Pinnacle\'s compliance team had been manually reviewing agent email signatures quarterly, but the process took over 60 hours per review cycle. In the most recent review, they found that 23% of agents had non-compliant signatures — missing license numbers, outdated carrier information, or absent state-mandated disclosures. The errors and omissions (E&O) insurance carrier had flagged email compliance as a concern during the last policy renewal.',
          'Head of Compliance Natasha Volkov needed a system that could automatically enforce the correct disclaimer for each agent based on their state and license type, with zero reliance on the agents themselves to maintain accuracy.',
        ],
      },
      {
        type: 'how-it-works',
        title: 'The Solution',
        steps: [
          { step: '1', title: 'Regulatory Mapping', description: 'Siggly\'s team worked with Pinnacle\'s compliance department to map the specific email disclosure requirements for all 14 states, creating a regulatory matrix that drives template assignment.' },
          { step: '2', title: 'Agent Database Integration', description: 'Agent profiles were imported from Pinnacle\'s agency management system, including name, state of licensure, license numbers, carrier appointments, and lines of authority.' },
          { step: '3', title: 'Rule Engine Configuration', description: 'Assignment rules were configured so that each agent receives the correct state-specific disclaimer, license display format, and carrier disclosure based on their profile data.' },
          { step: '4', title: 'Automated Compliance Monitoring', description: 'Monthly automated reports verify that every agent\'s signature matches current regulatory requirements. When state regulations change, the compliance team updates the template once and it propagates to all affected agents.' },
        ],
      },
      {
        type: 'benefits',
        title: 'The Results',
        items: [
          { icon: 'check-circle', title: '100% Agent Compliance', description: 'All 300 agents now have fully compliant signatures with correct state-specific disclosures. The compliance rate improved from 77% to 100%.' },
          { icon: 'clock', title: '55 Hours Saved Per Quarter', description: 'The quarterly compliance review that previously took 60 hours now takes 5 hours, as Siggly\'s reports provide instant verification.' },
          { icon: 'shield', title: 'Reduced E&O Risk', description: 'The E&O carrier acknowledged the improvement at the next policy renewal and reduced the compliance risk surcharge by 12%.' },
          { icon: 'refresh-cw', title: 'Instant Regulatory Updates', description: 'When California updated its disclosure requirements, the compliance team updated all 47 California agents\' signatures in under 5 minutes.' },
        ],
      },
    ],
    testimonial: {
      quote: 'Keeping 300 agents compliant across 14 different state regulations was my biggest headache. Siggly turned a 60-hour quarterly ordeal into a 5-hour review. Our E&O carrier even reduced our surcharge because of the improvement.',
      authorName: 'Natasha Volkov',
      authorTitle: 'Head of Compliance, Pinnacle Insurance Group',
    },
    faqs: [
      { question: 'How does Siggly handle different state disclosure requirements?', answer: 'Siggly\'s rule engine maps state-specific requirements to agent profiles. Each agent automatically receives the correct disclaimer language based on their state of licensure and lines of authority.' },
      { question: 'What happens when a state changes its disclosure requirements?', answer: 'The compliance team updates the template for that state in Siggly, and the change automatically propagates to all agents licensed in that state — typically in under 5 minutes.' },
      { question: 'Can agents modify their compliance disclaimers?', answer: 'No. All regulatory elements are locked in the template. Agents can update their photo and personal contact preferences, but compliance language cannot be modified.' },
      { question: 'How does licensing data stay current?', answer: 'Siggly syncs with Pinnacle\'s agency management system. When license renewals are processed or carrier appointments change, signatures update automatically.' },
      { question: 'Does Siggly work for agents who use personal email accounts?', answer: 'Siggly works best with managed email environments. For agents using personal email, Siggly provides a signature installer tool that applies the correct compliant signature to their email client.' },
    ],
    cta: { title: 'Get Similar Results', description: 'See how Siggly can solve your team\'s email signature challenges.' },
  },

  // ─── 10. Nonprofit — Donor Engagement ───

  {
    slug: 'nonprofit-donor-engagement',
    category: 'case-studies',
    meta: {
      title: 'How a Nonprofit Boosted Donor Engagement 25% with Signature Campaigns | Siggly',
      description:
        'Horizons Youth Alliance used Siggly signature banners to promote fundraising campaigns across all staff emails, increasing donor engagement by 25% and raising $340,000 in attributable donations.',
      keywords: ['nonprofit email signatures', 'donor engagement email', 'fundraising email signatures', 'nonprofit case study'],
      canonical: '/case-studies/nonprofit-donor-engagement',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Case Studies', url: '/case-studies' },
      { name: 'Nonprofit — Donor Engagement', url: '/case-studies/nonprofit-donor-engagement' },
    ],
    hero: {
      badge: { icon: 'trophy', text: 'Case Study' },
      title: 'How a Nonprofit Boosted Donor Engagement 25% with Signature Campaigns',
      description:
        'Horizons Youth Alliance, a 65-person nonprofit, turned every staff email into a fundraising touchpoint using Siggly signature banners. Over 12 months, signature-driven campaigns contributed to a 25% increase in donor engagement and $340,000 in directly attributable donations.',
      variant: 'slate',
    },
    stats: [
      { value: '25%', label: 'Donor engagement increase' },
      { value: '$340K', label: 'Attributable donations' },
      { value: '65', label: 'Staff mobilized' },
    ],
    features: [
      { icon: 'heart', title: 'Campaign Banners', description: 'Seasonal fundraising campaigns are promoted through signature banners with direct links to donation pages.' },
      { icon: 'calendar', title: 'Scheduled Campaigns', description: 'Banners auto-rotate based on the fundraising calendar — year-end giving, spring gala, back-to-school, and Giving Tuesday.' },
      { icon: 'bar-chart', title: 'Donation Attribution', description: 'UTM-tagged links in signature banners track donations back to the email channel, proving ROI to the board.' },
      { icon: 'users', title: 'Staff Advocacy', description: 'Every staff email becomes a fundraising touchpoint, extending the development team\'s reach exponentially.' },
    ],
    featuresTitle: 'Key Capabilities Used',
    sections: [
      {
        type: 'prose',
        title: 'The Challenge',
        paragraphs: [
          'Horizons Youth Alliance is a nonprofit organization with 65 staff members that provides after-school enrichment programs to underserved youth in metropolitan Atlanta. The development team of 4 people was responsible for all fundraising communications, but their email marketing open rates had declined from 32% to 18% over two years as donor fatigue set in.',
          'The organization\'s staff collectively sent over 1,200 emails per day to partners, school administrators, parents, vendors, and community contacts — but none of those emails included any fundraising messaging. Development Director Keisha Rawlings recognized this as an untapped channel: every email was a potential touchpoint with someone who might donate or share the campaign.',
          'With a limited marketing budget and no dedicated design resources, Rawlings needed a low-cost, low-effort way to turn routine staff communications into passive fundraising opportunities without overwhelming recipients or distracting from the primary purpose of each email.',
        ],
      },
      {
        type: 'how-it-works',
        title: 'The Solution',
        steps: [
          { step: '1', title: 'Fundraising Calendar Integration', description: 'Siggly was configured with the organization\'s annual fundraising calendar. Signature banners automatically rotate to match the active campaign: year-end giving (Nov-Dec), spring gala (March), back-to-school (August), and Giving Tuesday.' },
          { step: '2', title: 'Banner Design & UTM Tagging', description: 'The development team created simple, compelling banner images for each campaign with direct links to the donation page. Each link includes UTM parameters so donations can be attributed to the email signature channel.' },
          { step: '3', title: 'All-Staff Deployment', description: 'Signatures were deployed to all 65 staff members via Google Workspace. Staff did not need to take any action — banners appear automatically in their signatures based on the active campaign.' },
          { step: '4', title: 'Board Reporting Dashboard', description: 'Monthly reports showing banner impressions, click-through rates, and attributed donations were shared with the board to demonstrate the ROI of the initiative.' },
        ],
      },
      {
        type: 'prose',
        title: 'The Results',
        paragraphs: [
          'Over the first 12 months, signature-driven campaigns generated $340,000 in directly attributable donations — representing a significant new channel for the organization. The year-end giving campaign was the strongest performer, generating $185,000 in December alone from signature banner clicks.',
          'Donor engagement metrics improved by 25% overall. The development team attributed this partly to the "ambient awareness" created by signature banners: donors and prospects were seeing the campaign messaging in routine emails from program staff, not just formal fundraising appeals. This softer touchpoint felt less transactional and generated higher response rates.',
          'The board was particularly impressed by the cost efficiency. The total cost of the Siggly platform was a fraction of the organization\'s email marketing tool budget, yet signature banners outperformed dedicated fundraising emails in total attributed donations. Development Director Keisha Rawlings presented the results at a regional nonprofit conference, generating interest from 12 peer organizations.',
        ],
      },
    ],
    testimonial: {
      quote: 'Our 65 staff members send over 1,200 emails a day. Before Siggly, none of those emails said a word about our fundraising campaigns. Now every email is a subtle ask, and it generated $340,000 in donations last year. The board couldn\'t believe the ROI.',
      authorName: 'Keisha Rawlings',
      authorTitle: 'Development Director, Horizons Youth Alliance',
    },
    faqs: [
      { question: 'How much does Siggly cost for nonprofits?', answer: 'Siggly offers discounted pricing for registered 501(c)(3) organizations. Contact the sales team with your organization\'s EIN for a custom quote.' },
      { question: 'Can signature banners link directly to donation pages?', answer: 'Yes. Banners can link to any URL, including online donation pages, event registration forms, or volunteer sign-up pages. UTM parameters enable attribution tracking.' },
      { question: 'Do staff members need to update banners manually?', answer: 'No. Banners rotate automatically based on the fundraising calendar configured by the development team. Staff see the current campaign banner without taking any action.' },
      { question: 'How do you measure ROI on signature campaigns?', answer: 'UTM-tagged links in signature banners allow you to track clicks and attribute donations to the email signature channel in your analytics platform (Google Analytics, etc.).' },
    ],
    cta: { title: 'Get Similar Results', description: 'See how Siggly can solve your team\'s email signature challenges.' },
  },

  // ─── 11. Consulting Firm — Rebrand ───

  {
    slug: 'consulting-firm-rebrand',
    category: 'case-studies',
    meta: {
      title: 'How a Consulting Firm Rebranded 400 Signatures Overnight | Siggly',
      description:
        'Whitmore & Associates rebranded to Alder Consulting Group and used Siggly to update 400 employee signatures overnight, achieving 100% adoption by the Monday morning announcement.',
      keywords: ['rebrand email signatures', 'company rebrand signatures', 'consulting firm signatures', 'rebrand case study'],
      canonical: '/case-studies/consulting-firm-rebrand',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Case Studies', url: '/case-studies' },
      { name: 'Consulting Firm — Rebrand', url: '/case-studies/consulting-firm-rebrand' },
    ],
    hero: {
      badge: { icon: 'trophy', text: 'Case Study' },
      title: 'How a Consulting Firm Rebranded 400 Signatures Overnight',
      description:
        'When Whitmore & Associates rebranded to Alder Consulting Group, they needed 400 employee signatures updated before the Monday morning public announcement. Siggly deployed the new brand to every mailbox overnight, ensuring zero employees sent emails with the old branding after launch day.',
      variant: 'dark',
    },
    stats: [
      { value: '400', label: 'Signatures updated' },
      { value: '1 night', label: 'Deployment time' },
      { value: '0', label: 'Old-brand emails sent' },
    ],
    features: [
      { icon: 'refresh-cw', title: 'Instant Mass Update', description: 'All 400 signatures were updated simultaneously through a single template change, deployed server-side overnight.' },
      { icon: 'clock', title: 'Scheduled Deployment', description: 'The rebrand was scheduled for 2 AM Sunday, ensuring all signatures were active before employees logged in Monday morning.' },
      { icon: 'eye-off', title: 'Pre-Launch Secrecy', description: 'The new brand template was prepared in advance and held in draft mode until the scheduled deployment time, maintaining rebrand confidentiality.' },
      { icon: 'check-circle', title: 'Verification Dashboard', description: 'A real-time dashboard confirmed deployment status for all 400 mailboxes, giving the project team confidence before the public announcement.' },
    ],
    featuresTitle: 'Key Capabilities Used',
    sections: [
      {
        type: 'prose',
        title: 'The Challenge',
        paragraphs: [
          'Whitmore & Associates was a management consulting firm with 400 employees across offices in Boston, San Francisco, and London. After a strategic merger with another consultancy, the combined entity was rebranding as Alder Consulting Group — a name change that came with a new logo, color palette, website, and visual identity.',
          'The rebrand was being handled with strict confidentiality: the new name and identity would be revealed simultaneously to employees, clients, and the press on a Monday morning. This meant that no employee could send an email with the old Whitmore branding after the announcement — and no email with the new Alder branding could be sent before it.',
          'CMO Josephine Hartwell had coordinated the website, social media, and press kit launches, but realized with 10 days to go that email signatures had not been addressed. With 400 employees across three time zones, manually updating signatures before Monday was impossible. She needed a solution that could execute the switch over a single weekend.',
        ],
      },
      {
        type: 'how-it-works',
        title: 'The Solution',
        steps: [
          { step: '1', title: 'Rapid Onboarding', description: 'Siggly was deployed and connected to the firm\'s Microsoft 365 tenant within 48 hours. All 400 employee profiles were imported from Azure AD.' },
          { step: '2', title: 'Dual Template Preparation', description: 'Two templates were prepared: the current Whitmore brand (to maintain continuity) and the new Alder brand (held in draft mode). Both were fully tested with sample mailboxes.' },
          { step: '3', title: 'Scheduled Cutover', description: 'The template switch was scheduled for 2:00 AM ET on Sunday — 18 hours before employees would log in Monday morning. This timing ensured all three office time zones were covered.' },
          { step: '4', title: 'Verification & Confirmation', description: 'The IT team monitored Siggly\'s deployment dashboard Sunday morning, confirming all 400 mailboxes had received the new signature. Three mailboxes required manual retry due to licensing issues, which were resolved within 30 minutes.' },
        ],
      },
      {
        type: 'prose',
        title: 'The Results',
        paragraphs: [
          'When employees logged in Monday morning, every single person had the new Alder Consulting Group signature. Zero emails were sent with the old Whitmore branding after the announcement. The CMO called it "the most seamless element of the entire rebrand."',
          'The IT team estimated that manually updating 400 signatures would have taken 80-120 hours of effort and would have required revealing the new brand to employees in advance — breaking the confidentiality requirement. Siggly accomplished the same result in under 8 hours of total project time, including setup, testing, and deployment.',
          'The firm has since used Siggly for ongoing signature management, deploying quarterly campaign banners promoting thought leadership content. The marketing team reports that signature banner clicks now drive 18% of traffic to the firm\'s insights blog — a channel that didn\'t exist before the rebrand.',
        ],
      },
    ],
    testimonial: {
      quote: 'We had 400 signatures to rebrand and zero room for error — the new name couldn\'t leak before Monday. Siggly let us prepare everything in advance and execute a flawless overnight switch. Every employee logged in to the new brand. It was the smoothest part of the entire rebrand.',
      authorName: 'Josephine Hartwell',
      authorTitle: 'Chief Marketing Officer, Alder Consulting Group',
    },
    faqs: [
      { question: 'How quickly can Siggly be deployed for an urgent rebrand?', answer: 'Siggly can be fully operational within 48-72 hours for organizations using Microsoft 365 or Google Workspace. The Alder Consulting Group deployment was completed in 48 hours.' },
      { question: 'Can the deployment be scheduled for a specific date and time?', answer: 'Yes. Template changes can be scheduled for a precise deployment time, which is ideal for rebrands, mergers, or coordinated launches that require simultaneous execution.' },
      { question: 'What if some mailboxes fail to update during the deployment?', answer: 'Siggly\'s dashboard provides real-time deployment status for every mailbox. Failed deployments can be retried individually or in bulk. In this case, 3 out of 400 required manual retry.' },
      { question: 'Can old brand templates be preserved for reference?', answer: 'Yes. Previous template versions are stored in Siggly\'s version history, allowing the team to reference or roll back to previous designs if needed.' },
    ],
    cta: { title: 'Get Similar Results', description: 'See how Siggly can solve your team\'s email signature challenges.' },
  },

  // ─── 12. Retail Chain — Seasonal Campaigns ───

  {
    slug: 'retail-chain-campaigns',
    category: 'case-studies',
    meta: {
      title: 'How a Retail Chain Drives Seasonal Promotions Through Email Signatures | Siggly',
      description:
        'Crestwood Home & Garden uses Siggly to rotate seasonal promotional banners across 180 employees\' signatures, driving 28% of in-store coupon redemptions and $520,000 in attributable revenue.',
      keywords: ['retail email signatures', 'seasonal campaign signatures', 'retail promotion email', 'retail case study'],
      canonical: '/case-studies/retail-chain-campaigns',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Case Studies', url: '/case-studies' },
      { name: 'Retail Chain — Seasonal Campaigns', url: '/case-studies/retail-chain-campaigns' },
    ],
    hero: {
      badge: { icon: 'trophy', text: 'Case Study' },
      title: 'How a Retail Chain Drives Seasonal Promotions Through Email Signatures',
      description:
        'Crestwood Home & Garden, a 22-store retail chain with 180 corporate and store-level employees, uses Siggly to run rotating seasonal promotions through email signature banners. In the first year, signature-driven promotions contributed to $520,000 in attributable revenue and a 28% coupon redemption rate.',
      variant: 'violet',
    },
    stats: [
      { value: '$520K', label: 'Attributable revenue' },
      { value: '28%', label: 'Coupon redemption rate' },
      { value: '180', label: 'Employees activated' },
    ],
    features: [
      { icon: 'calendar', title: 'Seasonal Banner Rotation', description: 'Banners automatically rotate to match the retail calendar: spring planting, summer BBQ, fall harvest, and holiday gifting seasons.' },
      { icon: 'tag', title: 'Coupon Code Integration', description: 'Signature banners include unique coupon codes that track redemptions back to the email signature channel.' },
      { icon: 'store', title: 'Store-Specific Promotions', description: 'Store managers\' signatures feature location-specific events and promotions relevant to their local market.' },
      { icon: 'trending-up', title: 'Performance Analytics', description: 'Real-time dashboards show banner click rates, coupon redemptions, and revenue attribution by campaign and store.' },
    ],
    featuresTitle: 'Key Capabilities Used',
    sections: [
      {
        type: 'prose',
        title: 'The Challenge',
        paragraphs: [
          'Crestwood Home & Garden is a family-owned retail chain with 22 stores across the Pacific Northwest, employing 180 people in corporate, distribution, and store management roles. The marketing team runs 8-10 promotional campaigns per year tied to seasonal gardening and home improvement trends, but struggled to extend campaign reach beyond their email newsletter list of 45,000 subscribers.',
          'Marketing Director Yuki Tanaka noticed that corporate buyers, store managers, and the sales team collectively sent thousands of emails per week to vendors, contractors, commercial accounts, and local community contacts — audiences that were not on the marketing email list. These were high-value contacts who could drive significant in-store traffic if exposed to seasonal promotions.',
          'The marketing team had tried adding promotional messages to employees\' email signatures manually, but the process was inconsistent. By the time all 180 employees updated their signatures for a new campaign, the promotion was often half over. Tanaka needed an automated system that could deploy campaign-specific banners instantly across all employees.',
        ],
      },
      {
        type: 'how-it-works',
        title: 'The Solution',
        steps: [
          { step: '1', title: 'Retail Calendar Configuration', description: 'The annual promotional calendar was loaded into Siggly with start and end dates for each campaign. Banners automatically activate and deactivate based on the schedule.' },
          { step: '2', title: 'Coupon-Enabled Banners', description: 'Each campaign banner includes a unique coupon code and a link to the relevant landing page. Coupon codes are tracked through the POS system to measure in-store redemptions.' },
          { step: '3', title: 'Role-Based Banner Assignment', description: 'Corporate employees receive chain-wide promotions. Store managers receive location-specific banners featuring local events, workshops, and promotions.' },
          { step: '4', title: 'Real-Time Performance Tracking', description: 'Click analytics and POS coupon data are combined in monthly reports showing revenue directly attributable to signature-driven promotions.' },
        ],
      },
      {
        type: 'benefits',
        title: 'The Results',
        items: [
          { icon: 'dollar-sign', title: '$520,000 Attributable Revenue', description: 'Signature-driven coupon codes were redeemed for $520,000 in purchases during the first year, with the holiday season accounting for 42% of the total.' },
          { icon: 'percent', title: '28% Coupon Redemption Rate', description: 'Signature-delivered coupons had a 28% redemption rate — 4x higher than the email newsletter\'s 7% rate — because recipients were already engaged in a business conversation.' },
          { icon: 'users', title: 'New Customer Acquisition', description: '34% of coupon redeemers were first-time customers who had received the promotion through a vendor or contractor email, expanding the customer base.' },
          { icon: 'repeat', title: 'Automated Campaign Execution', description: 'The marketing team no longer spends time coordinating manual signature updates. Campaigns deploy automatically, saving approximately 12 hours per campaign cycle.' },
        ],
      },
    ],
    testimonial: {
      quote: 'Our email signature banners outperform our newsletter by 4x on coupon redemption. The best part is that 34% of redeemers are new customers we\'ve never reached through our regular marketing channels. It\'s become our highest-ROI promotional channel.',
      authorName: 'Yuki Tanaka',
      authorTitle: 'Marketing Director, Crestwood Home & Garden',
    },
    faqs: [
      { question: 'How do signature coupon codes compare to other channels?', answer: 'Crestwood\'s signature-delivered coupons achieved a 28% redemption rate, compared to 7% for email newsletters and 3% for social media promotions.' },
      { question: 'Can banners be scheduled in advance for the entire year?', answer: 'Yes. The entire promotional calendar can be loaded into Siggly at the beginning of the year, with banners automatically activating and deactivating on the specified dates.' },
      { question: 'How do you track in-store redemptions from signature banners?', answer: 'Unique coupon codes in signature banners are tracked through the POS system when customers redeem them in-store, allowing attribution back to the email signature channel.' },
      { question: 'Can different stores have different promotions?', answer: 'Yes. Store-specific banners can be assigned to store managers and local staff, while corporate employees receive chain-wide promotions.' },
    ],
    cta: { title: 'Get Similar Results', description: 'See how Siggly can solve your team\'s email signature challenges.' },
  },

  // ─── 13. Tech Company — Remote Workforce ───

  {
    slug: 'tech-company-remote',
    category: 'case-studies',
    meta: {
      title: 'How a Fully Remote Tech Company Maintains Brand Consistency Across 5 Countries | Siggly',
      description:
        'Nomad Systems, a 220-person fully remote company spanning 5 countries, uses Siggly to maintain perfect brand consistency and handle multi-timezone, multi-language email signatures.',
      keywords: ['remote company email signatures', 'distributed team branding', 'international email signatures', 'remote work case study'],
      canonical: '/case-studies/tech-company-remote',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Case Studies', url: '/case-studies' },
      { name: 'Tech Company — Remote Workforce', url: '/case-studies/tech-company-remote' },
    ],
    hero: {
      badge: { icon: 'trophy', text: 'Case Study' },
      title: 'How a Fully Remote Tech Company Maintains Brand Consistency Across 5 Countries',
      description:
        'Nomad Systems has 220 employees working remotely across the US, UK, Germany, India, and Australia. Without a physical office to reinforce brand culture, email signatures became a critical brand touchpoint. Siggly ensures every employee — regardless of location — presents a unified, professional identity.',
      variant: 'indigo',
    },
    stats: [
      { value: '5', label: 'Countries unified' },
      { value: '220', label: 'Remote employees' },
      { value: '99.5%', label: 'Brand compliance' },
    ],
    features: [
      { icon: 'globe', title: 'Multi-Language Support', description: 'Signatures automatically display in the recipient\'s expected language, with localized job titles and company descriptions.' },
      { icon: 'clock', title: 'Timezone-Aware Details', description: 'Each employee\'s signature shows their local timezone and working hours, helping recipients schedule across time zones.' },
      { icon: 'flag', title: 'Regional Compliance', description: 'GDPR disclaimers are added for EU-based employees, while other regions receive the appropriate local compliance language.' },
      { icon: 'wifi', title: 'Device-Agnostic Deployment', description: 'Server-side deployment ensures signatures appear on all devices — critical for remote workers who switch between laptops, phones, and tablets.' },
    ],
    featuresTitle: 'Key Capabilities Used',
    sections: [
      {
        type: 'prose',
        title: 'The Challenge',
        paragraphs: [
          'Nomad Systems is a fully remote B2B software company with 220 employees distributed across the United States (90), United Kingdom (45), Germany (35), India (30), and Australia (20). As a remote-first company with no physical offices, email is the primary medium for client communication, making email signatures one of the most visible brand touchpoints.',
          'Head of People Operations Priyanka Deshmukh discovered that brand consistency had eroded significantly as the company scaled. A brand audit of 100 random employee emails revealed 23 different signature variations. Some employees had created their own HTML signatures, others used plain text, and a few had no signature at all. The German team had informally started adding their own GDPR disclaimers in inconsistent formats.',
          'The challenge was compounded by the company\'s tech stack diversity: most employees used Gmail, but some in the UK and Australia used Apple Mail, and the engineering team preferred Thunderbird. Any solution needed to work across all clients and devices without requiring employees to install software or follow complex instructions — a non-starter for a distributed team.',
        ],
      },
      {
        type: 'how-it-works',
        title: 'The Solution',
        steps: [
          { step: '1', title: 'Google Workspace Integration', description: 'Siggly connected to the company\'s Google Workspace directory, importing all 220 employee profiles including name, title, department, country, timezone, and preferred pronouns.' },
          { step: '2', title: 'Region-Specific Templates', description: 'Five regional templates were created, sharing the same core layout but with localized elements: timezone display, country-specific phone format, and GDPR disclaimers for EU employees.' },
          { step: '3', title: 'Server-Side Deployment', description: 'Google Workspace routing rules ensured signatures were applied server-side, appearing consistently on Gmail web, mobile, and all third-party email clients (Apple Mail, Thunderbird, etc.).' },
          { step: '4', title: 'Self-Service Localization', description: 'Employees were given a self-service portal to set their working hours, timezone, and preferred pronouns. All other branding elements remained locked.' },
        ],
      },
      {
        type: 'prose',
        title: 'The Results',
        paragraphs: [
          'Nomad Systems went from 23 signature variations to 5 consistent regional templates, achieving 99.5% brand compliance. The one outlier was an employee with a legacy email forwarding configuration that was resolved within 48 hours.',
          'Client feedback was overwhelmingly positive. Three enterprise clients specifically commented on the professional, consistent signatures during quarterly business reviews. The timezone and working hours feature was particularly well received — clients reported that it reduced scheduling confusion and made it easier to find the right time to reach team members across the globe.',
          'The GDPR compliance improvement was significant: all 80 EU-based employees now have the approved GDPR notice in their signatures, up from an inconsistent 45% before deployment. The legal team estimated this reduced the company\'s regulatory exposure substantially.',
        ],
      },
    ],
    testimonial: {
      quote: 'When you\'re fully remote, your email signature IS your office lobby. Before Siggly, we had 23 different versions of our lobby. Now we have one beautiful, consistent brand presence across 5 countries and every email client imaginable.',
      authorName: 'Priyanka Deshmukh',
      authorTitle: 'Head of People Operations, Nomad Systems',
    },
    faqs: [
      { question: 'How does Siggly handle employees in different time zones?', answer: 'Each employee\'s signature can dynamically display their local timezone and working hours, which are set through the self-service portal. This helps recipients schedule across time zones.' },
      { question: 'Can signatures show different languages for different regions?', answer: 'Yes. Templates can be configured with region-specific elements including localized job titles, phone formats, and compliance language while maintaining consistent branding.' },
      { question: 'Does Siggly work with email clients other than Gmail and Outlook?', answer: 'Yes. Server-side deployment ensures signatures appear on any email client, including Apple Mail, Thunderbird, and mobile apps. The signature is applied before the email leaves the server.' },
      { question: 'How are GDPR disclaimers handled for EU employees?', answer: 'Siggly\'s rule engine automatically applies GDPR-compliant disclaimer language to signatures for employees based in EU countries, while non-EU employees receive the appropriate regional compliance text.' },
      { question: 'What happens when an employee relocates to a different country?', answer: 'When the employee\'s country is updated in Google Workspace, Siggly automatically applies the correct regional template with appropriate timezone, phone format, and compliance language.' },
    ],
    cta: { title: 'Get Similar Results', description: 'See how Siggly can solve your team\'s email signature challenges.' },
  },

  // ─── 14. Government Agency — Section 508 ───

  {
    slug: 'government-agency',
    category: 'case-studies',
    meta: {
      title: 'How a Government Agency Achieved Section 508 Compliance for Email Signatures | Siggly',
      description:
        'The Metro County Department of Public Services used Siggly to deploy Section 508-compliant email signatures to 1,200 employees, passing a federal accessibility audit with full marks.',
      keywords: ['government email signatures', 'Section 508 email compliance', 'accessible email signatures', 'government case study'],
      canonical: '/case-studies/government-agency',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Case Studies', url: '/case-studies' },
      { name: 'Government Agency — Section 508', url: '/case-studies/government-agency' },
    ],
    hero: {
      badge: { icon: 'trophy', text: 'Case Study' },
      title: 'How a Government Agency Achieved Section 508 Compliance for Email Signatures',
      description:
        'The Metro County Department of Public Services needed all 1,200 employee email signatures to meet Section 508 accessibility standards. Siggly delivered fully accessible signatures with proper alt text, semantic structure, and color contrast — passing a federal accessibility audit on the first attempt.',
      variant: 'emerald',
    },
    stats: [
      { value: '1,200', label: 'Employees compliant' },
      { value: '100%', label: 'Accessibility score' },
      { value: 'First try', label: 'Audit passed' },
    ],
    features: [
      { icon: 'accessibility', title: 'Section 508 Compliance', description: 'All signature HTML meets WCAG 2.1 AA standards with proper semantic structure, alt text, and ARIA attributes.' },
      { icon: 'eye', title: 'Color Contrast Validation', description: 'Template colors are validated against WCAG contrast ratios, ensuring readability for visually impaired recipients.' },
      { icon: 'type', title: 'Screen Reader Optimization', description: 'Signatures are structured so screen readers announce content in a logical order with meaningful descriptions.' },
      { icon: 'file-text', title: 'Plain Text Fallback', description: 'Every HTML signature has a matching plain text version for recipients who cannot render HTML email.' },
    ],
    featuresTitle: 'Key Capabilities Used',
    sections: [
      {
        type: 'prose',
        title: 'The Challenge',
        paragraphs: [
          'The Metro County Department of Public Services is a county government agency with 1,200 employees across 15 divisions, including parks, public works, social services, and emergency management. As a government entity, all digital communications must comply with Section 508 of the Rehabilitation Act, which mandates that electronic content be accessible to people with disabilities.',
          'An accessibility audit by an external consultant found that 92% of employee email signatures failed Section 508 compliance. Common issues included logo images without alt text, insufficient color contrast between text and background, signatures that were entirely image-based (invisible to screen readers), and HTML structures that caused screen readers to announce content in a confusing order.',
          'Deputy CIO Landon Briggs was given a 6-month deadline to achieve full compliance, with the expectation that a follow-up audit would verify the results. The department had tried distributing accessible signature templates via PDF instructions, but compliance remained below 15% after three months of effort.',
        ],
      },
      {
        type: 'how-it-works',
        title: 'The Solution',
        steps: [
          { step: '1', title: 'Accessibility Assessment', description: 'Siggly\'s team conducted an accessibility audit of the existing signatures and designed compliant templates that met WCAG 2.1 AA standards, with input from the county\'s ADA coordinator.' },
          { step: '2', title: 'Semantic HTML Templates', description: 'Templates were built with proper heading hierarchy, alt text for all images, sufficient color contrast (minimum 4.5:1 ratio), and a logical reading order for screen readers.' },
          { step: '3', title: 'Active Directory Deployment', description: 'All 1,200 employee profiles were imported from the county\'s Active Directory. Signatures were deployed server-side through Exchange Online, requiring no action from employees.' },
          { step: '4', title: 'Plain Text Companion', description: 'Every HTML signature was paired with a matching plain text version, ensuring accessibility even for recipients using text-only email clients or assistive technology that cannot render HTML.' },
        ],
      },
      {
        type: 'benefits',
        title: 'The Results',
        items: [
          { icon: 'check-circle', title: 'Full Section 508 Compliance', description: 'All 1,200 employee signatures passed Section 508 compliance checks, with a 100% accessibility score on the follow-up audit.' },
          { icon: 'award', title: 'First-Time Audit Pass', description: 'The external auditor confirmed full compliance on the first re-audit — a result the Deputy CIO described as "unprecedented for a county agency."' },
          { icon: 'clock', title: 'Compliance in 4 Weeks', description: 'The entire deployment was completed in 4 weeks — well ahead of the 6-month deadline — freeing the IT team to address other accessibility initiatives.' },
          { icon: 'heart', title: 'Positive Public Feedback', description: 'Citizens with visual impairments provided positive feedback through the county\'s ADA office, noting that government emails were now fully readable with their screen readers.' },
        ],
      },
    ],
    testimonial: {
      quote: 'We failed the Section 508 audit badly — 92% of our signatures were non-compliant. Six weeks later, after deploying Siggly, we passed the re-audit with a perfect score. Our ADA coordinator said it was the fastest compliance win she\'d seen in county government.',
      authorName: 'Landon Briggs',
      authorTitle: 'Deputy Chief Information Officer, Metro County Department of Public Services',
    },
    faqs: [
      { question: 'What is Section 508 compliance for email signatures?', answer: 'Section 508 requires that electronic communications from federal and many state/local government agencies be accessible to people with disabilities. For email signatures, this means proper alt text, sufficient color contrast, semantic HTML, and screen reader compatibility.' },
      { question: 'How does Siggly ensure WCAG compliance?', answer: 'Siggly templates are built with semantic HTML, alt text on all images, WCAG 2.1 AA color contrast ratios, and logical reading order. Templates are tested with JAWS, NVDA, and VoiceOver screen readers.' },
      { question: 'Do accessible signatures look different from regular signatures?', answer: 'No. Accessible signatures look identical to non-accessible ones visually. The accessibility improvements are in the underlying HTML code and alt text — invisible to sighted users but critical for assistive technology.' },
      { question: 'Can Siggly generate plain text versions of signatures?', answer: 'Yes. Every HTML template has a paired plain text version that includes the same information in a text-only format, ensuring accessibility for all email clients.' },
      { question: 'Does Siggly work with government email systems?', answer: 'Yes. Siggly supports Microsoft 365 (including GCC and GCC High environments), Exchange on-premise, and Google Workspace for Government.' },
    ],
    cta: { title: 'Get Similar Results', description: 'See how Siggly can solve your team\'s email signature challenges.' },
  },

  // ─── 15. Franchise — Brand Consistency ───

  {
    slug: 'franchise-consistency',
    category: 'case-studies',
    meta: {
      title: 'How a 150-Location Franchise Ensures Brand Consistency with Centralized Signatures | Siggly',
      description:
        'TrueClean Pro, a 150-location cleaning franchise, uses Siggly to enforce brand-consistent email signatures across independently owned franchises, achieving 98% compliance and reducing brand violations by 85%.',
      keywords: ['franchise email signatures', 'franchise brand consistency', 'multi-location signatures', 'franchise case study'],
      canonical: '/case-studies/franchise-consistency',
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Case Studies', url: '/case-studies' },
      { name: 'Franchise — Brand Consistency', url: '/case-studies/franchise-consistency' },
    ],
    hero: {
      badge: { icon: 'trophy', text: 'Case Study' },
      title: 'How a 150-Location Franchise Ensures Brand Consistency with Centralized Signatures',
      description:
        'TrueClean Pro is a commercial cleaning franchise with 150 independently owned locations. Each franchisee managed their own email signatures, resulting in widespread brand inconsistency. Siggly\'s centralized management gave the franchisor control over brand presentation while allowing franchisees to customize local details.',
      variant: 'slate',
    },
    stats: [
      { value: '150', label: 'Locations branded' },
      { value: '98%', label: 'Brand compliance' },
      { value: '85%', label: 'Fewer brand violations' },
    ],
    features: [
      { icon: 'layout-template', title: 'Franchisor-Controlled Templates', description: 'The corporate team controls the overall template design, ensuring brand consistency while franchisees customize their local details.' },
      { icon: 'map-pin', title: 'Location-Specific Details', description: 'Each franchise location\'s address, phone, service area, and owner name are dynamically populated based on their profile.' },
      { icon: 'shield', title: 'Brand Asset Protection', description: 'Logos, brand colors, and taglines are locked in the template, preventing franchisees from using outdated or modified brand assets.' },
      { icon: 'bar-chart', title: 'Compliance Dashboard', description: 'The franchisor can monitor brand compliance across all 150 locations from a single dashboard, with alerts for any anomalies.' },
    ],
    featuresTitle: 'Key Capabilities Used',
    sections: [
      {
        type: 'prose',
        title: 'The Challenge',
        paragraphs: [
          'TrueClean Pro is one of the fastest-growing commercial cleaning franchises in the United States, with 150 independently owned and operated locations. As a franchisor, TrueClean Pro licenses its brand, processes, and marketing to franchisees — but email signatures had never been included in the brand standards manual.',
          'A brand audit initiated by VP of Franchise Operations Grace Holloway revealed that only 35% of franchise locations used the current TrueClean Pro logo in their email signatures. 22% were using a logo from three rebrands ago, 18% had created their own variations of the logo, and 25% had no branded signature at all. Several franchisees had added competing service offerings and unauthorized taglines.',
          'Holloway estimated that the brand inconsistency was costing the franchise system credibility. A survey of commercial property managers — TrueClean Pro\'s core customer segment — found that 67% associated "inconsistent branding" with "unreliable service quality." The franchisor needed a solution that respected the independence of franchisees while enforcing non-negotiable brand standards.',
        ],
      },
      {
        type: 'how-it-works',
        title: 'The Solution',
        steps: [
          { step: '1', title: 'Franchise Template System', description: 'Siggly was configured with a master template controlled by the franchisor. The template locks core brand elements — logo, colors, tagline, and legal text — while leaving designated fields for each franchisee\'s local information.' },
          { step: '2', title: 'Franchisee Onboarding Portal', description: 'Each franchise location was given a self-service portal to enter their local details: owner name, location address, phone number, service area, and optional local certifications.' },
          { step: '3', title: 'Phased Location Rollout', description: 'Locations were onboarded in batches of 25 over 6 weeks. The franchise support team assisted each batch with setup, verifying local details and deploying signatures.' },
          { step: '4', title: 'Ongoing Compliance Monitoring', description: 'The franchisor\'s compliance dashboard shows real-time brand adherence across all 150 locations, with automated alerts when a franchisee\'s signature deviates from standards.' },
        ],
      },
      {
        type: 'prose',
        title: 'The Results',
        paragraphs: [
          'Within 8 weeks, 147 of 150 franchise locations were fully onboarded with brand-compliant signatures — a 98% compliance rate, up from 35%. The remaining 3 locations were brought into compliance within 2 additional weeks through targeted support from the franchise operations team.',
          'Brand violations (unauthorized logos, modified taglines, competing service mentions) dropped by 85% in the first quarter after deployment. The compliance dashboard gave the franchisor real-time visibility into brand adherence for the first time in the franchise system\'s history.',
          'Franchisee feedback was positive: 91% of franchisees rated the self-service portal as "easy to use," and several commented that the professional signatures helped them win new commercial contracts. One franchisee in Charlotte reported that a property management company specifically cited the "professional, consistent email communications" as a factor in awarding a $180,000 annual cleaning contract.',
        ],
      },
    ],
    testimonial: {
      quote: 'We had 150 franchise locations and 150 different versions of our brand. Some were using logos from 2016. Siggly let us enforce brand standards without micromanaging our franchisees — they customize their local info, we protect the brand. Compliance went from 35% to 98%.',
      authorName: 'Grace Holloway',
      authorTitle: 'VP of Franchise Operations, TrueClean Pro',
    },
    faqs: [
      { question: 'How does Siggly balance franchisor control with franchisee independence?', answer: 'The franchisor controls the template design, brand assets, and required elements. Franchisees can customize designated fields like their local address, phone, and owner name through a self-service portal.' },
      { question: 'Can the franchisor update all 150 locations\' signatures at once?', answer: 'Yes. Changes to the master template — such as a new logo or updated tagline — are automatically applied to all 150 locations simultaneously.' },
      { question: 'What happens when a new franchise location opens?', answer: 'New franchisees complete the self-service onboarding portal as part of their launch process. Their brand-compliant signature is ready within the same day.' },
      { question: 'Can franchisees see how their signature will look before deployment?', answer: 'Yes. The self-service portal includes a real-time preview showing exactly how the signature will appear with their local details, so franchisees can verify accuracy before deployment.' },
      { question: 'How does the compliance dashboard work?', answer: 'The franchisor dashboard shows the compliance status of all locations, highlights any deviations from brand standards, and provides one-click remediation to bring non-compliant locations back into adherence.' },
    ],
    cta: { title: 'Get Similar Results', description: 'See how Siggly can solve your team\'s email signature challenges.' },
  },
];
