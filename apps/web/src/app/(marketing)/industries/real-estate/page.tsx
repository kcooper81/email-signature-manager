import Link from 'next/link';
import Image from 'next/image';
import { Home, ArrowRight, Award, CheckCircle, Users, MapPin, Phone, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateMetadata as genMeta } from '@/lib/seo';
import { NewsletterSignupSection } from '@/components/newsletter';

export const metadata = genMeta({
  title: 'Email Signatures for Real Estate Agents & Brokers | Siggly',
  description: 'Professional email signatures for real estate agents, brokers, and agencies. Showcase listings, credentials, and contact info with branded signatures.',
  keywords: ['real estate email signatures', 'realtor email signature', 'real estate agent email', 'broker email signature', 'property listing email'],
  canonical: '/industries/real-estate',
});

const realtorFeatures = [
  {
    icon: Award,
    title: 'Showcase Credentials',
    description: 'Display NAR designations, licenses, awards, and certifications prominently.',
  },
  {
    icon: MapPin,
    title: 'Service Area Info',
    description: 'Highlight your service areas, neighborhoods, and market expertise.',
  },
  {
    icon: Star,
    title: 'Social Proof',
    description: 'Include testimonials, ratings, recent sales, and client reviews.',
  },
];

const signatureElements = [
  { element: 'Professional headshot', benefit: 'Build trust and recognition' },
  { element: 'Built-in compliance blocks with license & DRE numbers', benefit: 'Auto-populate regulatory info' },
  { element: 'MLS/License numbers', benefit: 'Meet state requirements' },
  { element: 'Brokerage logo & info', benefit: 'Brand consistency' },
  { element: 'Service areas', benefit: 'Target local markets' },
  { element: 'Social media links', benefit: 'Grow your following' },
  { element: 'Current listings', benefit: 'Promote properties' },
  { element: 'Call-to-action buttons', benefit: 'Schedule showings' },
  { element: 'Equal Housing logo', benefit: 'Compliance' },
];

const designations = [
  'REALTOR®', 'CRS (Certified Residential Specialist)', 'GRI (Graduate REALTOR Institute)',
  'ABR (Accredited Buyer Representative)', 'SRES (Seniors Real Estate Specialist)',
  'CIPS (Certified International Property Specialist)', 'e-PRO (Digital Marketing)',
];

const agencyTypes = [
  { type: 'Individual Agents', description: 'Personal branding with brokerage compliance' },
  { type: 'Real Estate Teams', description: 'Consistent team branding across all members' },
  { type: 'Brokerages', description: 'Centralized management for 50-500+ agents' },
  { type: 'Property Management', description: 'Professional signatures for PM staff' },
];

export default function RealEstateIndustryPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm mb-6">
                <Home className="h-4 w-4" />
                For Real Estate Professionals
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Professional Email Signatures for Real Estate Agents
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Stand out in clients' inboxes with branded email signatures that showcase your 
                credentials, listings, and expertise. Perfect for agents, brokers, and agencies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                    Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline">
                    View Pricing
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Showcase credentials • Promote listings • Mobile-optimized
              </p>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop"
                alt="Real estate professional"
                width={800}
                height={600}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Realtor Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Built for Real Estate Professionals</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to create professional, branded email signatures that win clients.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {realtorFeatures.map((feature) => (
              <div key={feature.title} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Elements */}
      <section className="py-20 bg-orange-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What to Include in Your Signature</h2>
            <p className="text-gray-600">
              Essential elements that make real estate email signatures effective.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {signatureElements.map((item) => (
              <div key={item.element} className="bg-white border border-orange-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">{item.element}</h3>
                    <p className="text-sm text-gray-600">{item.benefit}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Designations */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Showcase Your Designations</h2>
            <p className="text-gray-600">
              Automatically display your NAR designations and certifications.
            </p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 border border-orange-200">
            <div className="flex flex-wrap gap-3 justify-center">
              {designations.map((designation) => (
                <div key={designation} className="bg-white px-4 py-2 rounded-lg border border-orange-200 font-medium text-sm">
                  {designation}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Agency Types */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">For Every Type of Real Estate Professional</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {agencyTypes.map((item) => (
              <div key={item.type} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{item.type}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Real Estate Use Cases</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold mb-3">New Agents</h3>
              <p className="text-sm text-gray-600 mb-4">
                Make a professional first impression with polished email signatures.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Build credibility fast</li>
                <li>• Showcase training</li>
                <li>• Easy to update</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold mb-3">Top Producers</h3>
              <p className="text-sm text-gray-600 mb-4">
                Highlight your success with awards, sales volume, and testimonials.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Display achievements</li>
                <li>• Promote listings</li>
                <li>• Social proof</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold mb-3">Brokerages</h3>
              <p className="text-sm text-gray-600 mb-4">
                Manage signatures for your entire team with consistent branding.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• 50-500+ agents</li>
                <li>• Brand compliance</li>
                <li>• Centralized control</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-orange-600 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Real Estate Agents Choose Siggly</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">5 min</div>
              <p className="text-orange-100">Setup time for your entire team</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">100%</div>
              <p className="text-orange-100">Mobile-responsive signatures</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">$0.50</div>
              <p className="text-orange-100">Per agent per month</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-6">
          <NewsletterSignupSection
            source="real-estate-industry"
            title="Real Estate Marketing Tips"
            description="Get tips on email marketing, branding, and technology for real estate professionals."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to elevate your email game?
          </h2>
          <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
            Join thousands of real estate professionals using Siggly to create 
            professional email signatures that win clients.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-orange-700 hover:bg-orange-50">
                Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/tools/signature-generator">
              <Button size="lg" className="bg-orange-700 text-white hover:bg-orange-800">
                Try Free Generator
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
