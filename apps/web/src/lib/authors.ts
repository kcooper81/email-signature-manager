export interface Author {
  slug: string;
  name: string;
  title: string;
  bio: string;
  authorBio: string;
  image: string;
  linkedIn: string;
  twitter: string;
  expertise: string[];
}

const authors: Author[] = [
  {
    slug: 'kade-crawford',
    name: 'Kade Crawford',
    title: 'Founder & CEO at Siggly',
    bio: "I founded Siggly after spending over a decade helping enterprises tame the chaos of email signature management. My background in Google Workspace administration and brand strategy showed me how much time organizations waste on something that should be simple. I'm passionate about turning email signatures into a seamless, centrally managed brand asset.",
    authorBio: 'Founder & CEO at Siggly with over a decade of experience in enterprise email signature management and Google Workspace administration.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    linkedIn: 'https://www.linkedin.com/in/kadecrawford',
    twitter: '@kadecrawford',
    expertise: [
      'Email Signature Management',
      'Google Workspace',
      'Brand Strategy',
      'Enterprise IT',
      'Team Deployment',
    ],
  },
  {
    slug: 'sarah-chen',
    name: 'Sarah Chen',
    title: 'Head of Compliance at Siggly',
    bio: "I spent eight years as a regulatory compliance consultant before joining Siggly, advising healthcare systems, financial institutions, and government agencies on email communication policies. My work centers on making sure every signature your organization sends meets HIPAA, GDPR, SOX, and industry-specific requirements. I translate complex regulations into practical, actionable guidance that IT and legal teams can implement immediately.",
    authorBio: 'Head of Compliance at Siggly with a regulatory consulting background spanning HIPAA, GDPR, and SOX compliance for email communications.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=face',
    linkedIn: 'https://www.linkedin.com/in/sarahchen-compliance',
    twitter: '@sarahchen_comply',
    expertise: [
      'HIPAA Compliance',
      'GDPR',
      'SOX Compliance',
      'Email Regulations',
      'Legal Disclaimers',
      'Data Privacy',
    ],
  },
  {
    slug: 'marcus-rodriguez',
    name: 'Marcus Rodriguez',
    title: 'Head of Product & Engineering at Siggly',
    bio: "Before leading engineering at Siggly, I built email infrastructure and integration platforms at two Fortune 500 companies. I've debugged more HTML email rendering issues than I can count, and I know firsthand why signatures break across Outlook, Gmail, and Apple Mail. My focus is on building bulletproof integrations with Microsoft 365, Google Workspace, and the tools teams rely on every day.",
    authorBio: 'Head of Product & Engineering at Siggly with deep expertise in Microsoft 365 integrations, email deliverability, and HTML email rendering.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    linkedIn: 'https://www.linkedin.com/in/marcusrodriguez-eng',
    twitter: '@marcus_r_dev',
    expertise: [
      'Microsoft 365',
      'Email Deliverability',
      'HTML Email',
      'API Integrations',
      'Technical Architecture',
      'Troubleshooting',
    ],
  },
  {
    slug: 'emily-nakamura',
    name: 'Emily Nakamura',
    title: 'Marketing Director at Siggly',
    bio: "I've spent over seven years in digital marketing, leading campaigns that turn everyday touchpoints into measurable business results. At Siggly, I focus on helping organizations see email signatures as a high-impact marketing channel rather than an afterthought. My background in analytics and campaign strategy means I bring a data-driven approach to every recommendation I make.",
    authorBio: 'Marketing Director at Siggly with seven years of digital marketing experience specializing in email signature campaigns, branding, and ROI analytics.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face',
    linkedIn: 'https://www.linkedin.com/in/emilynakamura-marketing',
    twitter: '@emilynakamura',
    expertise: [
      'Email Signature Marketing',
      'Brand Strategy',
      'Campaign Analytics',
      'ROI Measurement',
      'A/B Testing',
      'Content Marketing',
    ],
  },
];

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug);
}

export function getAllAuthors(): Author[] {
  return authors;
}
