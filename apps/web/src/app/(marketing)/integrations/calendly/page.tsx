import Link from 'next/link';
import { Calendar, Check, ArrowRight, Zap, Clock, Users, Shield, Link2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateMetadata as genMeta } from '@/lib/seo';

export const metadata = genMeta({
  title: 'Calendly Integration | Add Meeting Scheduling Links to Email Signatures',
  description: 'Seamlessly integrate Calendly with your email signatures. Add one-click meeting scheduling links that make it easy for recipients to book time with your team.',
  keywords: ['Calendly integration', 'Calendly email signature', 'meeting scheduling links', 'booking links', 'Calendly signatures', 'schedule meetings'],
  canonical: '/integrations/calendly',
});

const features = [
  {
    icon: Link2,
    title: 'One-Click Scheduling',
    description: 'Recipients can book meetings instantly with a single click from your email signature.',
  },
  {
    icon: Calendar,
    title: 'Event Type Support',
    description: 'Link to specific event types like "30 min call", "Discovery call", or your default booking page.',
  },
  {
    icon: Zap,
    title: 'Automatic Sync',
    description: 'Your Calendly event types sync automatically. Changes in Calendly reflect instantly.',
  },
  {
    icon: Shield,
    title: 'Secure OAuth',
    description: 'OAuth 2.0 authentication with Calendly. Your credentials stay secure and private.',
  },
];

const howItWorks = [
  {
    step: '1',
    title: 'Connect Calendly',
    description: 'Authenticate with your Calendly account using secure OAuth 2.0 in seconds.',
  },
  {
    step: '2',
    title: 'Sync Event Types',
    description: 'Your Calendly event types are automatically imported and kept in sync.',
  },
  {
    step: '3',
    title: 'Add to Signatures',
    description: 'Use {{calendly_link}} in your signature templates to insert your scheduling link.',
  },
  {
    step: '4',
    title: 'Deploy & Book',
    description: 'Deploy signatures and let recipients book meetings with one click.',
  },
];

const useCases = [
  {
    title: 'Sales Teams',
    description: 'Make it effortless for prospects to schedule discovery calls and demos directly from your emails.',
    icon: Users,
  },
  {
    title: 'Customer Success',
    description: 'Let customers book onboarding sessions, check-ins, and support calls without back-and-forth emails.',
    icon: Sparkles,
  },
  {
    title: 'Consultants & Freelancers',
    description: 'Streamline client intake by adding consultation booking links to every email you send.',
    icon: Clock,
  },
];

const placeholderExamples = [
  {
    placeholder: '{{calendly_link}}',
    description: 'Your main Calendly scheduling URL',
    example: 'https://calendly.com/yourname',
  },
  {
    placeholder: '{{calendly_event:30min}}',
    description: 'Link to a specific event type by slug',
    example: 'https://calendly.com/yourname/30min',
  },
  {
    placeholder: '{{calendly_default}}',
    description: 'Your default event type link',
    example: 'https://calendly.com/yourname/discovery-call',
  },
];

export default function CalendlyIntegrationPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm mb-6">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
                  <path d="M12 6c-3.309 0-6 2.691-6 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z"/>
                  <circle cx="12" cy="12" r="2"/>
                </svg>
                Calendly Integration
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Turn Every Email Into a
                <span className="text-blue-600"> Booking Opportunity</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Add Calendly scheduling links to your email signatures. Make it effortless for prospects, 
                customers, and partners to book time with you—no more back-and-forth emails.
              </p>
              <div className="flex items-center gap-4">
                <Link href="/signup">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline">View Pricing</Button>
                </Link>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Free plan available • No credit card required • 2-minute setup
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                  <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">30 Minute Meeting</div>
                    <div className="text-xs text-gray-500">calendly.com/yourname/30min</div>
                  </div>
                  <Check className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                  <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Zap className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">Discovery Call</div>
                    <div className="text-xs text-gray-500">calendly.com/yourname/discovery</div>
                  </div>
                  <Check className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                  <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">Quick Chat</div>
                    <div className="text-xs text-gray-500">calendly.com/yourname/15min</div>
                  </div>
                  <Check className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Powerful Calendly Integration Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600">
              Connect Calendly to Siggly in minutes and start adding scheduling links to signatures
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {howItWorks.map((item) => (
              <div key={item.step} className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Placeholders */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Dynamic Calendly Placeholders</h2>
            <p className="text-gray-600">
              Use these placeholders in your signature templates to insert Calendly links
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {placeholderExamples.map((item) => (
              <div key={item.placeholder} className="bg-white border border-gray-200 rounded-xl p-6">
                <code className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded font-mono">
                  {item.placeholder}
                </code>
                <p className="text-sm text-gray-600 mt-3 mb-2">{item.description}</p>
                <p className="text-xs text-gray-400 font-mono break-all">{item.example}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-semibold text-blue-900 mb-2">Example Signature Template</h3>
            <div className="bg-white rounded-lg p-4 font-mono text-sm">
              <p className="text-gray-700">Best regards,</p>
              <p className="text-gray-700">{'{{full_name}}'}</p>
              <p className="text-gray-700">{'{{job_title}}'}</p>
              <p className="text-blue-600 mt-2">📅 Schedule a meeting: {'{{calendly_link}}'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Perfect For</h2>
            <p className="text-gray-600">
              Calendly integration works great for any team that schedules meetings
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase) => (
              <div key={useCase.title} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <useCase.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{useCase.title}</h3>
                <p className="text-gray-600 text-sm">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Add Calendly to Email Signatures?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Reduce Email Back-and-Forth</h3>
                    <p className="text-gray-600 text-sm">
                      Stop the "when are you available?" emails. Recipients book time instantly.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Increase Meeting Bookings</h3>
                    <p className="text-gray-600 text-sm">
                      Make it frictionless to schedule. More visibility = more meetings booked.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Professional Appearance</h3>
                    <p className="text-gray-600 text-sm">
                      Show you value their time with easy, modern scheduling options.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Consistent Team Branding</h3>
                    <p className="text-gray-600 text-sm">
                      Every team member's signature includes the right Calendly link automatically.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="text-sm text-gray-600 mb-4">Sample Email Signature:</div>
                <div className="space-y-2 border-t pt-4">
                  <p className="font-semibold text-gray-900">Sarah Johnson</p>
                  <p className="text-sm text-gray-600">Senior Account Executive</p>
                  <p className="text-sm text-gray-600">Acme Corporation</p>
                  <div className="pt-2 mt-2 border-t">
                    <a href="#" className="text-blue-600 text-sm hover:underline flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Schedule a 30-minute call
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Add Calendly to Your Signatures?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Connect Calendly in 2 minutes and start booking more meetings from every email
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
