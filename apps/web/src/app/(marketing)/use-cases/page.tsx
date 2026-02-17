import Link from 'next/link';
import { Mail, ArrowRight, Building2, Users, Briefcase, GraduationCap, Heart, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MarketingCTA } from '@/components/marketing/cta';

export const metadata = {
  title: 'Use Cases | Siggly - Email Signature Management',
  description: 'See how different industries and teams use Siggly for email signature management. From startups to enterprises.',
};

const colorClasses: Record<string, { bg100: string; text600: string; bg500: string }> = {
  violet: { bg100: 'bg-violet-100', text600: 'text-violet-600', bg500: 'bg-violet-500' },
  blue: { bg100: 'bg-blue-100', text600: 'text-blue-600', bg500: 'bg-blue-500' },
  cyan: { bg100: 'bg-cyan-100', text600: 'text-cyan-600', bg500: 'bg-cyan-500' },
  amber: { bg100: 'bg-amber-100', text600: 'text-amber-600', bg500: 'bg-amber-500' },
  green: { bg100: 'bg-green-100', text600: 'text-green-600', bg500: 'bg-green-500' },
  pink: { bg100: 'bg-pink-100', text600: 'text-pink-600', bg500: 'bg-pink-500' },
};

const useCases = [
  {
    icon: Building2,
    title: 'Enterprise',
    description: 'Manage thousands of signatures across multiple departments and locations with centralized control.',
    benefits: ['Centralized management', 'Department-specific templates', 'Compliance enforcement', 'Audit trails'],
    color: 'violet',
  },
  {
    icon: Briefcase,
    title: 'Small Business',
    description: 'Professional signatures for your growing team without the enterprise complexity or price.',
    benefits: ['Quick setup', 'Affordable pricing', 'Easy to use', 'No IT required'],
    color: 'blue',
  },
  {
    icon: Users,
    title: 'Marketing Teams',
    description: 'Turn every email into a marketing opportunity with branded signatures and promotional banners.',
    benefits: ['Campaign banners', 'Social media links', 'Brand consistency', 'Click tracking'],
    color: 'cyan',
  },
  {
    icon: Scale,
    title: 'Legal & Finance',
    description: 'Ensure compliance with required disclaimers and consistent professional presentation.',
    benefits: ['Legal disclaimers', 'Compliance templates', 'Audit logs', 'Version control'],
    color: 'amber',
  },
  {
    icon: GraduationCap,
    title: 'Education',
    description: 'Unified signatures for faculty, staff, and departments across your institution.',
    benefits: ['Department branding', 'Faculty profiles', 'Event promotions', 'Easy updates'],
    color: 'green',
  },
  {
    icon: Heart,
    title: 'Non-Profits',
    description: 'Spread your mission with every email. Include donation links and campaign information.',
    benefits: ['Donation CTAs', 'Mission messaging', 'Volunteer info', 'Event promotion'],
    color: 'pink',
  },
];

export default function UseCasesPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-violet-50 to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Email signatures for
            <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent"> every team</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how organizations of all sizes use Siggly to manage professional email signatures.
          </p>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase) => (
              <div key={useCase.title} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 rounded-xl ${colorClasses[useCase.color]?.bg100 ?? 'bg-gray-100'} flex items-center justify-center mb-4`}>
                  <useCase.icon className={`h-6 w-6 ${colorClasses[useCase.color]?.text600 ?? 'text-gray-600'}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                <p className="text-gray-600 mb-4">{useCase.description}</p>
                <ul className="space-y-2">
                  {useCase.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className={`w-1.5 h-1.5 rounded-full ${colorClasses[useCase.color]?.bg500 ?? 'bg-gray-500'}`} />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <MarketingCTA variant="default" />

    </>
  );
}
