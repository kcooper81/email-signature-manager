import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Nonprofit Email Signatures: Boost Donations & Awareness | Siggly',
  description: 'Create impactful email signatures for nonprofits. Include donation links, mission statements, and build supporter engagement.',
  keywords: ['nonprofit email signature', 'charity email signature', 'ngo email signature'],
};

export default function BlogPost() {
  return (
    <article className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
        </Link>
        <div className="mb-8">
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Nonprofit</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Nonprofit Email Signatures: Boost Donations & Awareness</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> December 31, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&h=600&fit=crop" alt="Nonprofit team" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Every email your nonprofit sends is a chance to spread your mission. Strategic signatures can drive donations, volunteer signups, and awareness.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Elements to Include</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Organization name and logo</li>
            <li>Your role/title</li>
            <li>Contact information</li>
            <li>Mission tagline (brief)</li>
            <li>Donation link or CTA</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Donation Integration</h2>
          <p className="text-gray-600 mb-6">Consider adding:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Direct donation link</li>
            <li>Current campaign banner</li>
            <li>Matching gift reminder</li>
            <li>Tax-deductible notice</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Example Signature</h2>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm">
            <p className="font-bold text-lg">Jennifer Adams</p>
            <p>Development Director</p>
            <p className="mt-2 font-semibold text-green-700">Hope Foundation</p>
            <p className="italic text-gray-600">Building futures, one child at a time</p>
            <p className="mt-2">(555) 123-4567</p>
            <p className="text-violet-600">jadams@hopefoundation.org</p>
            <p className="mt-3 p-2 bg-green-100 rounded text-center text-green-700 font-medium">💚 Support our mission</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Campaign Banners</h2>
          <p className="text-gray-600 mb-6">Rotate banners for different campaigns: year-end giving, Giving Tuesday, specific programs, volunteer recruitment.</p>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Affordable for nonprofits</h3>
            <p className="text-gray-600 mb-6">Siggly offers nonprofit pricing. Contact us to learn more about our mission-driven discount.</p>
            <Link href="/contact"><Button>Contact Us <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
