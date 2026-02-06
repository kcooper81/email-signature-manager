import Link from 'next/link';
import Image from 'next/image';
import { Mail, ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NewsletterSignupSection } from '@/components/newsletter';

export const metadata = {
  title: 'Blog | Siggly',
  description: 'Tips, guides, and insights about email signatures and brand consistency',
};

const blogPosts = [
  { slug: 'email-signature-future-trends', title: 'The Future of Email Signatures: 2026 Trends', excerpt: 'Emerging trends in email signatures including AI personalization, dynamic content, and analytics.', date: '2026-01-28', readTime: '6 min', category: 'Trends', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop' },
  { slug: 'brand-consistency-guide', title: 'The Complete Guide to Brand Consistency in Email', excerpt: 'How to ensure every email your team sends reinforces your brand identity and professionalism.', date: '2026-01-27', readTime: '8 min', category: 'Branding', image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&h=400&fit=crop' },
  { slug: 'google-workspace-signature-management', title: 'Managing Email Signatures in Google Workspace', excerpt: 'A step-by-step guide to deploying consistent signatures across your entire Google Workspace organization.', date: '2026-01-26', readTime: '6 min', category: 'Tutorials', image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&h=400&fit=crop' },
  { slug: 'email-signature-design-tips', title: '10 Email Signature Design Tips for 2026', excerpt: 'Modern design principles to make your email signatures stand out while remaining professional.', date: '2026-01-25', readTime: '7 min', category: 'Design', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop' },
  { slug: 'signature-marketing-campaigns', title: 'Using Email Signatures for Marketing Campaigns', excerpt: 'How to leverage your team\'s email signatures as a powerful, free marketing channel.', date: '2026-01-24', readTime: '5 min', category: 'Marketing', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop' },
  { slug: 'legal-requirements-email-signatures', title: 'Legal Requirements for Business Email Signatures', excerpt: 'What your business email signatures legally need to include, by country and industry.', date: '2026-01-23', readTime: '6 min', category: 'Compliance', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop' },
  { slug: 'email-signature-animated-gifs', title: 'Animated GIFs in Email Signatures: Pros & Cons', excerpt: 'Should you use animated GIFs in signatures? Technical considerations and when animation makes sense.', date: '2026-01-22', readTime: '5 min', category: 'Design', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop' },
  { slug: 'email-signature-qr-codes', title: 'QR Codes in Email Signatures: Do They Work?', excerpt: 'Pros, cons, and use cases for QR codes in professional email signatures.', date: '2026-01-21', readTime: '5 min', category: 'Innovation', image: 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?w=600&h=400&fit=crop' },
  { slug: 'email-signature-customer-testimonials', title: 'Using Testimonials in Email Signatures', excerpt: 'Include customer testimonials and reviews in signatures to build trust with every email.', date: '2026-01-20', readTime: '5 min', category: 'Marketing', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop' },
  { slug: 'email-signature-partner-cobranding', title: 'Partner Co-Branding in Email Signatures', excerpt: 'Best practices for including partner logos and co-branding in email signatures.', date: '2026-01-19', readTime: '5 min', category: 'Partnerships', image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop' },
  { slug: 'email-signature-awards-recognition', title: 'Showcasing Awards in Email Signatures', excerpt: 'Display company awards and recognition in signatures to build credibility.', date: '2026-01-18', readTime: '5 min', category: 'Branding', image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600&h=400&fit=crop' },
  { slug: 'email-signature-sustainability', title: 'Sustainability Messaging in Email Signatures', excerpt: 'Include sustainability and environmental messaging authentically in signatures.', date: '2026-01-17', readTime: '5 min', category: 'Sustainability', image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&h=400&fit=crop' },
  { slug: 'email-signature-crisis-communication', title: 'Email Signatures in Crisis Communication', excerpt: 'Update email signatures during a crisis for emergency messaging and status updates.', date: '2026-01-16', readTime: '5 min', category: 'Communication', image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=400&fit=crop' },
  { slug: 'email-signature-employee-advocacy', title: 'Email Signatures for Employee Advocacy Programs', excerpt: 'Leverage signatures for employee advocacy and amplify company content through every email.', date: '2026-01-15', readTime: '5 min', category: 'Marketing', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop' },
  { slug: 'email-signature-newsletter-promotion', title: 'Growing Your Newsletter with Email Signatures', excerpt: 'Use email signatures to grow newsletter subscribers with signup CTAs.', date: '2026-01-14', readTime: '5 min', category: 'Marketing', image: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=600&h=400&fit=crop' },
  { slug: 'email-signature-podcast-promotion', title: 'Promoting Your Podcast Through Email Signatures', excerpt: 'Add podcast links, episode promotions, and subscriber CTAs to signatures.', date: '2026-01-13', readTime: '5 min', category: 'Marketing', image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&h=400&fit=crop' },
  { slug: 'email-signature-vendor-selection', title: 'Choosing an Email Signature Vendor: Buyer Guide', excerpt: 'How to evaluate and select an email signature management vendor for your organization.', date: '2026-01-12', readTime: '7 min', category: 'Buying Guide', image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop' },
  { slug: 'email-signature-team-rollout', title: 'Rolling Out Email Signatures to Your Team', excerpt: 'Step-by-step guide to rolling out new signatures across your organization.', date: '2026-01-11', readTime: '6 min', category: 'Implementation', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop' },
  { slug: 'email-signature-common-mistakes', title: '15 Common Email Signature Mistakes to Avoid', excerpt: 'Design, technical, and content errors that hurt your professional image.', date: '2026-01-10', readTime: '6 min', category: 'Best Practices', image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=400&fit=crop' },
  { slug: 'email-signature-brand-guidelines', title: 'Email Signature Brand Guidelines Template', excerpt: 'Create brand guidelines for logo usage, colors, typography, and required elements.', date: '2026-01-09', readTime: '6 min', category: 'Branding', image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&h=400&fit=crop' },
  { slug: 'email-signature-template-library', title: 'Building an Email Signature Template Library', excerpt: 'Create a library of templates for different roles, departments, and use cases.', date: '2026-01-08', readTime: '6 min', category: 'Templates', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop' },
  { slug: 'email-signature-html-basics', title: 'HTML Email Signature Basics', excerpt: 'Technical guide to HTML layout principles and email client challenges.', date: '2026-01-07', readTime: '7 min', category: 'Technical', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop' },
  { slug: 'email-signature-mobile-optimization', title: 'Mobile-Optimized Email Signatures', excerpt: 'Design principles for signatures that look great on mobile devices.', date: '2026-01-06', readTime: '5 min', category: 'Design', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop' },
  { slug: 'email-signature-accessibility', title: 'Accessible Email Signatures', excerpt: 'Accessibility requirements, alt text examples, and screen reader best practices.', date: '2026-01-05', readTime: '6 min', category: 'Accessibility', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop' },
  { slug: 'email-signature-roi-calculator', title: 'Calculating ROI for Email Signature Management', excerpt: 'ROI components, time savings calculations, and lead generation value.', date: '2026-01-04', readTime: '6 min', category: 'ROI', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop' },
  { slug: 'email-signature-engineering-department', title: 'Engineering Department Email Signatures', excerpt: 'Key elements and tech-friendly design for engineering team signatures.', date: '2026-01-03', readTime: '5 min', category: 'Departments', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop' },
  { slug: 'email-signature-operations-department', title: 'Operations Department Email Signatures', excerpt: 'Key elements and role-specific variations for operations teams.', date: '2026-01-02', readTime: '5 min', category: 'Departments', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop' },
  { slug: 'email-signature-finance-department', title: 'Finance Department Email Signatures', excerpt: 'Security considerations and seasonal updates for finance teams.', date: '2026-01-01', readTime: '5 min', category: 'Departments', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop' },
  { slug: 'email-signature-marketing-department', title: 'Marketing Department Email Signatures', excerpt: 'Campaign rotation and signature elements for marketing teams.', date: '2025-12-31', readTime: '5 min', category: 'Departments', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop' },
  { slug: 'email-signature-hr-department', title: 'HR Department Email Signatures', excerpt: 'Role-based variations and confidentiality considerations for HR.', date: '2025-12-30', readTime: '5 min', category: 'Departments', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop' },
  { slug: 'email-signature-product-launch', title: 'Email Signatures for Product Launch Campaigns', excerpt: 'Launch timeline, banner examples, and team coordination strategies.', date: '2025-12-29', readTime: '5 min', category: 'Marketing', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop' },
  { slug: 'email-signature-ebook-promotion', title: 'Promoting Ebooks Through Email Signatures', excerpt: 'Content types, banner examples, and measuring success for ebook promotions.', date: '2025-12-28', readTime: '5 min', category: 'Marketing', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=400&fit=crop' },
  { slug: 'email-signature-webinar-promotion', title: 'Promoting Webinars Through Email Signatures', excerpt: 'Banner elements, timing strategies, and team deployment for webinars.', date: '2025-12-27', readTime: '5 min', category: 'Marketing', image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&h=400&fit=crop' },
  { slug: 'email-signature-video-links', title: 'Adding Video Links to Email Signatures', excerpt: 'Video ideas, implementation options, and platform best practices.', date: '2025-12-26', readTime: '5 min', category: 'Marketing', image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=600&h=400&fit=crop' },
  { slug: 'email-signature-social-proof', title: 'Adding Social Proof to Email Signatures', excerpt: 'Types of social proof, display options, and best practices for signatures.', date: '2025-12-25', readTime: '5 min', category: 'Marketing', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop' },
  { slug: 'email-signature-multi-language', title: 'Multi-Language Email Signatures', excerpt: 'Approaches for global teams with bilingual examples and best practices.', date: '2025-12-24', readTime: '5 min', category: 'Global', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop' },
  { slug: 'email-signature-mergers-acquisitions', title: 'Email Signatures During Mergers & Acquisitions', excerpt: 'Managing signature transitions during M&A with phases and messaging.', date: '2025-12-23', readTime: '6 min', category: 'Enterprise', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=400&fit=crop' },
  { slug: 'email-signature-professional-services', title: 'Professional Services Email Signatures', excerpt: 'Essential elements and credential display for consultants and advisors.', date: '2025-12-22', readTime: '5 min', category: 'Industries', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop' },
  { slug: 'email-signature-government', title: 'Government Email Signature Compliance', excerpt: 'Required elements, accessibility, and what to avoid for government agencies.', date: '2025-12-21', readTime: '6 min', category: 'Industries', image: 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=600&h=400&fit=crop' },
  { slug: 'email-signature-manufacturing', title: 'Manufacturing Company Email Signatures', excerpt: 'Key elements and role-specific signatures for manufacturing teams.', date: '2025-12-20', readTime: '5 min', category: 'Industries', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop' },
  { slug: 'email-signature-technology-companies', title: 'Tech Company Email Signatures', excerpt: 'Modern design, examples, and enterprise vs startup differences.', date: '2025-12-19', readTime: '5 min', category: 'Industries', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop' },
  { slug: 'email-signature-legal-firm', title: 'Law Firm Email Signature Policies', excerpt: 'Required info, role-based templates, and compliance considerations.', date: '2025-12-18', readTime: '6 min', category: 'Industries', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop' },
  { slug: 'email-signature-photo-guidelines', title: 'Email Signature Photo Guidelines', excerpt: 'Specifications, style guide, and when to include or skip photos.', date: '2025-12-17', readTime: '5 min', category: 'Design', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=400&fit=crop' },
  { slug: 'email-signature-seasonal-updates', title: 'Seasonal Email Signature Updates', excerpt: 'Holiday and event ideas, banner examples, and planning tips.', date: '2025-12-16', readTime: '5 min', category: 'Marketing', image: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=600&h=400&fit=crop' },
  { slug: 'email-signature-hubspot-integration', title: 'Email Signatures with HubSpot Integration', excerpt: 'Benefits, use cases, and implementation steps for HubSpot CRM integration.', date: '2025-12-15', readTime: '6 min', category: 'Integrations', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop' },
  { slug: 'email-signature-customer-support', title: 'Customer Support Email Signatures', excerpt: 'Key elements, helpful links, and what to avoid in support signatures.', date: '2025-12-14', readTime: '5 min', category: 'Departments', image: 'https://images.unsplash.com/photo-1553775927-a071d5a6a39a?w=600&h=400&fit=crop' },
  { slug: 'email-signature-hiring-banners', title: 'Email Signatures for Recruiting', excerpt: 'Banner ideas, implementation tips, and referral integration.', date: '2025-12-13', readTime: '5 min', category: 'Recruiting', image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop' },
  { slug: 'email-signature-software-comparison', title: 'Email Signature Software Comparison', excerpt: 'Features, pricing, evaluation criteria, and vendor questions.', date: '2025-12-12', readTime: '7 min', category: 'Buying Guide', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop' },
  { slug: 'email-signature-dark-mode', title: 'Email Signatures for Dark Mode', excerpt: 'Challenges, solutions for logos, text, images, and testing tips.', date: '2025-12-11', readTime: '5 min', category: 'Design', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop' },
  { slug: 'email-signature-directory-sync', title: 'Email Signatures with Directory Sync', excerpt: 'How directory sync works, attributes, benefits, and best practices.', date: '2025-12-10', readTime: '6 min', category: 'Technical', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop' },
  { slug: 'email-signature-rebranding', title: 'Email Signatures During Company Rebranding', excerpt: 'Planning, typical changes, execution steps, and common challenges.', date: '2025-12-09', readTime: '6 min', category: 'Branding', image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&h=400&fit=crop' },
  { slug: 'email-signature-ab-testing', title: 'A/B Testing Email Signatures', excerpt: 'What to test, how to test, metrics to track, and sample size guidance.', date: '2025-12-08', readTime: '6 min', category: 'Optimization', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop' },
  { slug: 'email-signature-banner-campaigns', title: 'Email Signature Banner Campaigns', excerpt: 'Types of banners, design tips, and campaign management strategies.', date: '2025-12-07', readTime: '6 min', category: 'Marketing', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop' },
  { slug: 'email-signature-calendar-links', title: 'Adding Calendar Links to Email Signatures', excerpt: 'Meeting scheduling tools, implementation, and best practices.', date: '2025-12-06', readTime: '5 min', category: 'Productivity', image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&h=400&fit=crop' },
  { slug: 'email-signature-cta-examples', title: 'Email Signature CTA Examples That Convert', excerpt: '20+ effective call-to-action examples for different goals.', date: '2025-12-05', readTime: '6 min', category: 'Marketing', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop' },
  { slug: 'email-signature-analytics', title: 'Email Signature Analytics Guide', excerpt: 'What to track, how to measure, and optimizing based on data.', date: '2025-12-04', readTime: '6 min', category: 'Analytics', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop' },
  { slug: 'email-signature-social-icons', title: 'Social Media Icons in Email Signatures', excerpt: 'Which platforms to include, icon design, and link strategies.', date: '2025-12-03', readTime: '5 min', category: 'Design', image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=600&h=400&fit=crop' },
  { slug: 'email-signature-best-practices', title: 'Email Signature Best Practices 2026', excerpt: 'Comprehensive guide to creating professional, effective signatures.', date: '2025-12-02', readTime: '8 min', category: 'Best Practices', image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=600&h=400&fit=crop' },
  { slug: 'email-signature-fonts', title: 'Best Fonts for Email Signatures', excerpt: 'Web-safe fonts, fallbacks, and typography best practices.', date: '2025-12-01', readTime: '5 min', category: 'Design', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop' },
  { slug: 'email-signature-colors', title: 'Choosing Colors for Email Signatures', excerpt: 'Brand colors, contrast, and accessibility in signature design.', date: '2025-11-30', readTime: '5 min', category: 'Design', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop' },
  { slug: 'email-signature-branding', title: 'Email Signature Branding Essentials', excerpt: 'How to reinforce your brand through every email signature.', date: '2025-11-29', readTime: '6 min', category: 'Branding', image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&h=400&fit=crop' },
  { slug: 'email-signature-size-guide', title: 'Email Signature Size Guide', excerpt: 'Optimal dimensions for images, logos, and overall signature layout.', date: '2025-11-28', readTime: '5 min', category: 'Technical', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop' },
  { slug: 'email-signature-examples', title: 'Professional Email Signature Examples', excerpt: '50+ examples for different industries, roles, and use cases.', date: '2025-11-27', readTime: '8 min', category: 'Examples', image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=600&h=400&fit=crop' },
  { slug: 'email-signature-image-hosting', title: 'Email Signature Image Hosting', excerpt: 'Where to host signature images and best practices for reliability.', date: '2025-11-26', readTime: '5 min', category: 'Technical', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop' },
  { slug: 'email-signature-disclaimer-guide', title: 'Email Disclaimer Guide', excerpt: 'Legal disclaimers, confidentiality notices, and compliance requirements.', date: '2025-11-25', readTime: '6 min', category: 'Compliance', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop' },
  { slug: 'email-signature-troubleshooting', title: 'Email Signature Troubleshooting Guide', excerpt: 'Common problems and solutions for signature display issues.', date: '2025-11-24', readTime: '7 min', category: 'Technical', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop' },
  { slug: 'email-signature-onboarding', title: 'Email Signature Onboarding for New Employees', excerpt: 'Streamline signature setup for new hires with automated workflows.', date: '2025-11-23', readTime: '5 min', category: 'Implementation', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop' },
  { slug: 'email-signature-update-guide', title: 'How to Update Email Signatures Across Your Organization', excerpt: 'Step-by-step guide for rolling out signature updates efficiently.', date: '2025-11-22', readTime: '6 min', category: 'Implementation', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop' },
  { slug: 'email-signature-security', title: 'Email Signature Security Best Practices', excerpt: 'Protect your organization from signature-based security risks.', date: '2025-11-21', readTime: '6 min', category: 'Security', image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop' },
  { slug: 'email-signature-pronouns', title: 'Adding Pronouns to Email Signatures', excerpt: 'Best practices for inclusive pronoun display in signatures.', date: '2025-11-20', readTime: '4 min', category: 'Inclusion', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop' },
  { slug: 'email-signature-marketing-roi', title: 'Measuring Email Signature Marketing ROI', excerpt: 'Track and measure the return on your signature marketing efforts.', date: '2025-11-19', readTime: '6 min', category: 'Analytics', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop' },
  { slug: 'email-signature-mistakes', title: 'Email Signature Mistakes That Hurt Your Brand', excerpt: 'Common errors that make your organization look unprofessional.', date: '2025-11-18', readTime: '5 min', category: 'Best Practices', image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=400&fit=crop' },
  { slug: 'email-signature-templates-guide', title: 'Email Signature Templates Guide', excerpt: 'How to choose and customize templates for your organization.', date: '2025-11-17', readTime: '6 min', category: 'Templates', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop' },
  { slug: 'email-signature-generator-guide', title: 'Email Signature Generator Guide', excerpt: 'How to use signature generators effectively for professional results.', date: '2025-11-16', readTime: '5 min', category: 'Tools', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop' },
  { slug: 'microsoft-365-signature-management', title: 'Microsoft 365 Email Signature Management', excerpt: 'Deploy and manage signatures across your Microsoft 365 organization.', date: '2025-11-15', readTime: '7 min', category: 'Tutorials', image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&h=400&fit=crop' },
  { slug: 'deploy-signatures-google-workspace', title: 'Deploy Signatures in Google Workspace', excerpt: 'Step-by-step guide for Google Workspace signature deployment.', date: '2025-11-14', readTime: '6 min', category: 'Tutorials', image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&h=400&fit=crop' },
  { slug: 'outlook-signature-setup-guide', title: 'Outlook Signature Setup Guide', excerpt: 'Complete guide to setting up signatures in Microsoft Outlook.', date: '2025-11-13', readTime: '6 min', category: 'Tutorials', image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&h=400&fit=crop' },
  { slug: 'gmail-signature-setup-guide', title: 'Gmail Signature Setup Guide', excerpt: 'Step-by-step guide for creating signatures in Gmail.', date: '2025-11-12', readTime: '5 min', category: 'Tutorials', image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&h=400&fit=crop' },
  { slug: 'apple-mail-signature-setup', title: 'Apple Mail Signature Setup', excerpt: 'Create and manage signatures in Apple Mail on Mac and iOS.', date: '2025-11-11', readTime: '5 min', category: 'Tutorials', image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&h=400&fit=crop' },
  { slug: 'html-email-signature-guide', title: 'HTML Email Signature Guide', excerpt: 'Create HTML signatures that render correctly across all clients.', date: '2025-11-10', readTime: '8 min', category: 'Technical', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop' },
  { slug: 'enterprise-email-signature-management', title: 'Enterprise Email Signature Management', excerpt: 'Scale signature management for large organizations.', date: '2025-11-09', readTime: '7 min', category: 'Enterprise', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=400&fit=crop' },
  { slug: 'it-admin-email-signature-guide', title: 'IT Admin Email Signature Guide', excerpt: 'Everything IT admins need to know about signature management.', date: '2025-11-08', readTime: '8 min', category: 'IT Admin', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop' },
  { slug: 'mobile-email-signature-guide', title: 'Mobile Email Signature Guide', excerpt: 'Signatures that work perfectly on smartphones and tablets.', date: '2025-11-07', readTime: '5 min', category: 'Mobile', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop' },
  { slug: 'remote-team-email-signatures', title: 'Email Signatures for Remote Teams', excerpt: 'Maintain brand consistency with distributed workforces.', date: '2025-11-06', readTime: '5 min', category: 'Remote Work', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop' },
  { slug: 'startup-email-signatures', title: 'Email Signatures for Startups', excerpt: 'Professional signatures that build credibility for new companies.', date: '2025-11-05', readTime: '5 min', category: 'Startups', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop' },
  { slug: 'small-business-email-signature', title: 'Small Business Email Signature Guide', excerpt: 'Affordable signature solutions for small businesses.', date: '2025-11-04', readTime: '5 min', category: 'Small Business', image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&h=400&fit=crop' },
  { slug: 'executive-email-signature', title: 'Executive Email Signature Best Practices', excerpt: 'Professional signatures for C-suite and senior leadership.', date: '2025-11-03', readTime: '5 min', category: 'Leadership', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=400&fit=crop' },
  { slug: 'sales-team-email-signatures', title: 'Sales Team Email Signatures', excerpt: 'Signatures that help your sales team close more deals.', date: '2025-11-02', readTime: '6 min', category: 'Sales', image: 'https://images.unsplash.com/photo-1552581234-26160f608093?w=600&h=400&fit=crop' },
  { slug: 'email-signature-for-freelancers', title: 'Email Signatures for Freelancers', excerpt: 'Stand out professionally as an independent professional.', date: '2025-11-01', readTime: '5 min', category: 'Freelancers', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop' },
  { slug: 'email-signature-for-agencies', title: 'Email Signatures for Agencies', excerpt: 'Signature strategies for creative and marketing agencies.', date: '2025-10-31', readTime: '5 min', category: 'Agencies', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop' },
  { slug: 'real-estate-email-signature', title: 'Real Estate Agent Email Signatures', excerpt: 'Professional signatures that help realtors stand out.', date: '2025-10-30', readTime: '5 min', category: 'Industries', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop' },
  { slug: 'healthcare-email-signature', title: 'Healthcare Email Signatures', excerpt: 'HIPAA-compliant signatures for medical professionals.', date: '2025-10-29', readTime: '6 min', category: 'Industries', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop' },
  { slug: 'law-firm-email-signature', title: 'Law Firm Email Signatures', excerpt: 'Professional signatures for attorneys and legal staff.', date: '2025-10-28', readTime: '6 min', category: 'Industries', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop' },
  { slug: 'financial-advisor-email-signature', title: 'Financial Advisor Email Signatures', excerpt: 'Compliant signatures for financial services professionals.', date: '2025-10-27', readTime: '6 min', category: 'Industries', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop' },
  { slug: 'insurance-email-signature', title: 'Insurance Agent Email Signatures', excerpt: 'Professional signatures for insurance professionals.', date: '2025-10-26', readTime: '5 min', category: 'Industries', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop' },
  { slug: 'consulting-firm-email-signature', title: 'Consulting Firm Email Signatures', excerpt: 'Signatures that convey expertise and professionalism.', date: '2025-10-25', readTime: '5 min', category: 'Industries', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop' },
  { slug: 'accounting-firm-email-signature', title: 'Accounting Firm Email Signatures', excerpt: 'Professional signatures for CPAs and accounting teams.', date: '2025-10-24', readTime: '5 min', category: 'Industries', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop' },
  { slug: 'nonprofit-email-signature', title: 'Nonprofit Email Signatures', excerpt: 'Mission-driven signatures for charitable organizations.', date: '2025-10-23', readTime: '5 min', category: 'Industries', image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&h=400&fit=crop' },
  { slug: 'education-email-signature', title: 'Education Email Signatures', excerpt: 'Signatures for teachers, professors, and administrators.', date: '2025-10-22', readTime: '5 min', category: 'Industries', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop' },
  { slug: 'hospitality-email-signature', title: 'Hospitality Email Signatures', excerpt: 'Welcoming signatures for hotels and travel companies.', date: '2025-10-21', readTime: '5 min', category: 'Industries', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop' },
  { slug: 'retail-email-signature', title: 'Retail Email Signatures', excerpt: 'Signatures that drive store visits and online sales.', date: '2025-10-20', readTime: '5 min', category: 'Industries', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop' },
  { slug: 'construction-email-signature', title: 'Construction Company Email Signatures', excerpt: 'Professional signatures for contractors and builders.', date: '2025-10-19', readTime: '5 min', category: 'Industries', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop' },
  { slug: 'gdpr-email-signature-requirements', title: 'GDPR Email Signature Requirements', excerpt: 'Ensure your signatures comply with GDPR regulations.', date: '2025-10-18', readTime: '6 min', category: 'Compliance', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop' },
  { slug: 'exclaimer-alternative', title: 'Exclaimer Alternative: Why Teams Choose Siggly', excerpt: 'Compare Siggly vs Exclaimer for email signature management.', date: '2025-10-17', readTime: '6 min', category: 'Comparisons', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop' },
  { slug: 'codetwo-alternative', title: 'CodeTwo Alternative: Why Teams Choose Siggly', excerpt: 'Compare Siggly vs CodeTwo for email signature management.', date: '2025-10-16', readTime: '6 min', category: 'Comparisons', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop' },
];

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-violet-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to home
          </Link>
          <h1 className="text-4xl font-bold mb-4">Siggly Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Tips, guides, and insights to help you master email signatures and maintain brand consistency across your organization.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug}>
              <article className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 relative">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="bg-violet-100 text-violet-700 px-2 py-1 rounded text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="font-semibold text-lg mb-2 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="text-violet-600 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all cursor-pointer">
                      Read more <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-6">
          <NewsletterSignupSection
            source="blog"
            title="Subscribe to our newsletter"
            description="Get the latest tips and updates delivered to your inbox."
          />
        </div>
      </section>
    </>
  );
}
