import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Multi-Language Email Signatures for Global Teams | Siggly',
  description: 'Create email signatures for international teams. Multiple languages, localization, and regional variations.',
  keywords: ['multi-language email signature', 'international signature', 'global email signature'],
  alternates: {
    canonical: 'https://siggly.io/blog/email-signature-multi-language',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">International</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Multi-Language Email Signatures for Global Teams</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> November 28, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 6 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1200&h=600&fit=crop" alt="Global team" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Global companies need signatures that work across languages and regions. Here's how to manage multi-language signatures effectively.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Approaches</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Single language:</strong> Use English (or primary language) for everyone</li>
            <li><strong>Regional versions:</strong> Different signatures for different regions</li>
            <li><strong>Bilingual:</strong> Two languages in one signature</li>
            <li><strong>Recipient-based:</strong> Dynamic based on recipient location</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Bilingual Signature Example</h2>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm">
            <p className="font-bold text-lg">Marie Dubois</p>
            <p>Directrice Marketing / Marketing Director</p>
            <p className="mt-2 font-semibold">Acme Global</p>
            <p className="mt-2">📱 +33 1 23 45 67 89</p>
            <p className="text-violet-600">mdubois@acmeglobal.com</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Considerations</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Character encoding (UTF-8 for special characters)</li>
            <li>Right-to-left languages (Arabic, Hebrew)</li>
            <li>Name format variations (family name first vs last)</li>
            <li>Phone number formatting by country</li>
            <li>Regional legal disclaimers</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Best Practices</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Keep core info consistent across languages</li>
            <li>Use professional translation</li>
            <li>Test in various email clients</li>
            <li>Consider time zones in contact info</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Global signature management</h3>
            <p className="text-gray-600 mb-6">Siggly supports multi-language signatures for international organizations.</p>
            <Link href="/signup"><Button>Start Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
