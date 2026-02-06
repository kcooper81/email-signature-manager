import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Accounting Firm Email Signatures: CPA Credential Guide | Siggly',
  description: 'Create professional email signatures for CPAs and accounting firms. Include credentials, firm info, and compliance elements.',
  keywords: ['cpa email signature', 'accounting firm signature', 'accountant email signature'],
};

export default function BlogPost() {
  return (
    <article className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
        </Link>
        <div className="mb-8">
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Accounting</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Accounting Firm Email Signatures: CPA Credential Guide</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> December 30, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=600&fit=crop" alt="Accounting office" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">CPAs and accounting professionals need signatures that convey expertise and trustworthiness while properly displaying credentials.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Essential Elements</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Full name with CPA designation</li>
            <li>Additional credentials (CMA, CFE, etc.)</li>
            <li>Firm name and your role</li>
            <li>Direct phone and email</li>
            <li>Office address (may be required)</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Credential Order</h2>
          <p className="text-gray-600 mb-6">Follow standard credential ordering:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>CPA first (most recognized)</li>
            <li>Then other professional certifications</li>
            <li>Academic degrees last (if included)</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Example Signature</h2>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm">
            <p className="font-bold text-lg">Robert Martinez, CPA, CMA</p>
            <p>Partner | Tax Services</p>
            <p className="mt-2">Martinez & Associates CPAs</p>
            <p>100 Financial Plaza, Suite 300</p>
            <p>City, State 12345</p>
            <p className="mt-2">T: (555) 123-4567 | F: (555) 123-4568</p>
            <p className="text-violet-600">rmartinez@martinezpas.com</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Seasonal Considerations</h2>
          <p className="text-gray-600 mb-6">During tax season, consider adding banners for filing deadlines, extended hours, or document submission portals.</p>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Professional signatures for your firm</h3>
            <p className="text-gray-600 mb-6">Siggly helps accounting firms maintain consistent, professional signatures across all staff.</p>
            <Link href="/signup"><Button>Start Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
