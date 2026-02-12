import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Real Estate Email Signatures: Stand Out to Clients | Siggly',
  description: 'Create professional real estate email signatures with property listings, virtual tour links, and trust-building elements for agents and brokers.',
  keywords: ['real estate email signature', 'realtor email signature', 'real estate agent signature', 'broker email signature'],
  alternates: {
    canonical: 'https://siggly.io/blog/real-estate-email-signature',
  },
};

export default function BlogPost() {
  return (
    <article className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
        </Link>
        <div className="mb-8">
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Real Estate</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Real Estate Email Signatures: Agent & Broker Guide</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> January 27, 2026</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 7 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=600&fit=crop" alt="Real estate" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Real estate professionals need signatures that build trust, meet licensing requirements, and showcase their brand. Here's how to create effective agent and broker signatures.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Required Information</h2>
          <p className="text-gray-600 mb-6">Most states require these elements in real estate communications:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Full legal name</strong> as licensed</li>
            <li><strong>License number</strong> (format varies by state)</li>
            <li><strong>Brokerage name</strong> — Required in most states</li>
            <li><strong>Office address</strong></li>
            <li><strong>Phone number</strong></li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Professional Designations</h2>
          <p className="text-gray-600 mb-6">Common real estate designations to include:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li><strong>REALTOR®</strong> — NAR member (note trademark symbol)</li>
            <li><strong>GRI</strong> — Graduate, REALTOR® Institute</li>
            <li><strong>CRS</strong> — Certified Residential Specialist</li>
            <li><strong>ABR</strong> — Accredited Buyer's Representative</li>
            <li><strong>SRES</strong> — Seniors Real Estate Specialist</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Equal Housing Logo</h2>
          <p className="text-gray-600 mb-6">The Fair Housing Act requires real estate professionals to display the Equal Housing Opportunity logo. Include it in your signature to demonstrate compliance and commitment to fair housing.</p>

          <div className="bg-violet-50 border-l-4 border-violet-500 p-6 my-8">
            <p className="text-violet-900 font-medium">The Equal Housing logo should be visible but not dominant. A small icon (20-30px) at the end of your signature is standard practice.</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">State License Requirements</h2>
          <p className="text-gray-600 mb-6">License display formats vary by state:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li><strong>California:</strong> DRE# followed by number</li>
            <li><strong>Texas:</strong> TREC# format</li>
            <li><strong>Florida:</strong> License# with state designation</li>
            <li><strong>New York:</strong> DOS license number</li>
          </ul>
          <p className="text-gray-600 mb-6">Always check your state's real estate commission for current requirements.</p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Example Signatures</h2>
          
          <h3 className="text-xl font-semibold mt-8 mb-3">Residential Agent</h3>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm">
            <p className="font-bold text-lg">Jennifer Martinez, REALTOR®</p>
            <p>Luxury Home Specialist | ABR, GRI</p>
            <p className="mt-2">Keller Williams Realty</p>
            <p>1234 Main Street, Suite 100</p>
            <p>Los Angeles, CA 90001</p>
            <p className="mt-2">📱 (310) 555-1234</p>
            <p className="text-violet-600">jennifer@kwla.com</p>
            <p className="text-violet-600">www.jennifermartinezhomes.com</p>
            <p className="mt-2 text-gray-500 text-xs">DRE# 01234567</p>
            <p className="text-xs text-gray-400 mt-2">🏠 Equal Housing Opportunity</p>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-3">Broker/Team Lead</h3>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm">
            <p className="font-bold text-lg">David Thompson</p>
            <p>Broker/Owner | CRS, GRI</p>
            <p className="mt-2">Thompson Real Estate Group</p>
            <p>T: (555) 987-6543 | F: (555) 987-6544</p>
            <p className="text-violet-600">david@thompsonregroup.com</p>
            <p className="mt-2 text-gray-500 text-xs">Texas License# 0567890</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Marketing Elements</h2>
          <p className="text-gray-600 mb-6">Real estate signatures can include tasteful marketing:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Professional headshot (builds recognition)</li>
            <li>Link to current listings or website</li>
            <li>Zillow/Realtor.com profile link</li>
            <li>Recent awards or recognition</li>
            <li>Market update or featured property banner</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">What to Avoid</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Unlicensed or outdated license numbers</li>
            <li>Missing brokerage affiliation</li>
            <li>Incorrect use of REALTOR® trademark</li>
            <li>Overly promotional language</li>
            <li>Too many social media links</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Professional signatures for your brokerage</h3>
            <p className="text-gray-600 mb-6">Siggly helps real estate teams deploy consistent, compliant signatures with Equal Housing logos and license numbers.</p>
            <Link href="/industries/real-estate"><Button>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
