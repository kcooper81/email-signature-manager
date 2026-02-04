import Link from 'next/link';
import { Rocket, Heart, Users, Zap, Globe, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateMetadata as genMeta } from '@/lib/seo';

export const metadata = genMeta({
  title: 'Careers - Join the Siggly Team',
  description: 'Join Siggly and help us revolutionize email signature management. Explore career opportunities and company culture.',
  keywords: ['careers', 'jobs', 'hiring', 'work at siggly', 'company culture'],
  canonical: '/careers',
});

const values = [
  {
    icon: Rocket,
    title: 'Move Fast',
    description: 'We ship quickly, iterate constantly, and learn from our users.',
  },
  {
    icon: Heart,
    title: 'Customer First',
    description: 'Every decision starts with "How does this help our customers?"',
  },
  {
    icon: Users,
    title: 'Team Player',
    description: 'We win together, support each other, and celebrate successes.',
  },
  {
    icon: Zap,
    title: 'Own It',
    description: 'Take ownership, make decisions, and drive results.',
  },
  {
    icon: Globe,
    title: 'Remote-First',
    description: 'Work from anywhere. We value output over office hours.',
  },
  {
    icon: TrendingUp,
    title: 'Always Learning',
    description: 'Grow your skills, try new things, and push boundaries.',
  },
];

const benefits = [
  'Competitive salary and equity',
  'Health, dental, and vision insurance',
  'Flexible work hours and remote-first culture',
  'Unlimited PTO policy',
  'Home office stipend',
  'Professional development budget',
  'Latest tech and tools',
  'Team retreats and events',
];

export default function CareersPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-violet-50 to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-violet-100 mb-6">
            <Rocket className="h-8 w-8 text-violet-600" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Join the Siggly Team</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Help us revolutionize how teams manage email signatures. We're building something special, and we'd love for you to be part of it.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-br from-blue-50 to-violet-50 border border-blue-200 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-4 text-center">Our Mission</h2>
            <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto">
              We're on a mission to make professional email signatures accessible to every team, 
              regardless of size or technical expertise. We believe that every email is an opportunity 
              to make a great impression, and we're building the tools to make that effortless.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="h-12 w-12 bg-violet-100 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-violet-600" />
                </div>
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Benefits & Perks</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-4">
                <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-6">Open Positions</h2>
          <p className="text-center text-gray-600 mb-12">
            We're a growing startup and always looking for talented people. Check back soon for open roles!
          </p>
          
          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">Don't see a perfect fit?</h3>
            <p className="text-gray-600 mb-6">
              We're always interested in meeting talented people. Send us your resume and tell us what you're passionate about.
            </p>
            <a href="mailto:careers@siggly.io">
              <Button size="lg">
                Send Us Your Resume
              </Button>
            </a>
            <p className="text-sm text-gray-500 mt-4">
              Email: careers@siggly.io
            </p>
          </div>
        </div>
      </section>

      {/* Team Culture */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Life at Siggly</h2>
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold mb-3">🌍 Remote-First Culture</h3>
              <p className="text-gray-600">
                Work from anywhere in the world. We have team members across multiple time zones and embrace asynchronous communication.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold mb-3">🚀 Fast-Paced Environment</h3>
              <p className="text-gray-600">
                We move quickly and ship often. You'll have the autonomy to make decisions and see your work impact thousands of users.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold mb-3">📚 Learning & Growth</h3>
              <p className="text-gray-600">
                We invest in our team's growth with professional development budgets, conference attendance, and mentorship opportunities.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold mb-3">🎉 Team Connection</h3>
              <p className="text-gray-600">
                Regular virtual hangouts, annual team retreats, and a supportive, collaborative environment where everyone's voice matters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-violet-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Us?</h2>
          <p className="text-violet-100 mb-8 text-lg">
            Let's build something amazing together.
          </p>
          <a href="mailto:careers@siggly.io">
            <Button size="lg" className="bg-white text-violet-700 hover:bg-gray-100">
              Get in Touch
            </Button>
          </a>
        </div>
      </section>
    </>
  );
}
