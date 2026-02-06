import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Law Firm Email Signature Policies: Best Practices | Siggly',
  description: 'Develop email signature policies for law firms. Standardize attorney signatures while meeting compliance requirements.',
  keywords: ['law firm signature policy', 'attorney email standards', 'legal firm email'],
};

export default function BlogPost() {
  return (
    <article className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
        </Link>
        <div className="mb-8">
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Legal</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Law Firm Email Signature Policies</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> December 4, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 6 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=600&fit=crop" alt="Law firm" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Law firms need signature policies that ensure compliance while maintaining professional consistency across all attorneys and staff.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Policy Components</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Required information (name, bar number, etc.)</li>
            <li>Approved signature formats</li>
            <li>Confidentiality notice requirements</li>
            <li>Brand guidelines</li>
            <li>Update procedures</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Role-Based Templates</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li><strong>Partners:</strong> Full credentials, firm leadership</li>
            <li><strong>Associates:</strong> Bar info, practice area</li>
            <li><strong>Paralegals:</strong> Title, supervising attorney</li>
            <li><strong>Staff:</strong> Role, department</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Enforcement</h2>
          <p className="text-gray-600 mb-6">Centralized management ensures policy compliance:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>IT controls signature deployment</li>
            <li>Marketing approves design changes</li>
            <li>Compliance reviews disclaimers</li>
            <li>Regular audits verify adherence</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Enforce firm-wide policies</h3>
            <p className="text-gray-600 mb-6">Siggly helps law firms maintain compliant, consistent signatures across all attorneys.</p>
            <Link href="/industries/legal"><Button>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
