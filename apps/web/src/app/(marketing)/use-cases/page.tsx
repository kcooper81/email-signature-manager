import Link from 'next/link';
import { Mail, ArrowRight, Building2, Users, Briefcase, GraduationCap, Heart, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Use Cases | Siggly - Email Signature Management',
  description: 'See how different industries and teams use Siggly for email signature management. From startups to enterprises.',
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
                <div className={`w-12 h-12 rounded-xl bg-${useCase.color}-100 flex items-center justify-center mb-4`}>
                  <useCase.icon className={`h-6 w-6 text-${useCase.color}-600`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                <p className="text-gray-600 mb-4">{useCase.description}</p>
                <ul className="space-y-2">
                  {useCase.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className={`w-1.5 h-1.5 rounded-full bg-${useCase.color}-500`} />
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-gray-600 mb-8">
            Join thousands of teams who trust Siggly for their email signatures.
          </p>
          <Link href="/signup">
            <Button size="lg">
              Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

    </>
  );
}
