import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'HR Department Email Signatures: Best Practices | Siggly',
  description: 'Email signature guidelines for HR teams. Professional signatures for recruiting, employee communications, and HR branding.',
  keywords: ['hr email signature', 'human resources signature', 'recruiting email'],
  alternates: {
    canonical: 'https://siggly.io/blog/email-signature-hr-department',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">HR</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">HR Department Email Signatures: Best Practices</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> November 22, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=600&fit=crop" alt="HR team" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">HR teams communicate with candidates, employees, and external partners. Signatures should reflect professionalism while supporting department goals.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Key Elements</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Name and HR title</li>
            <li>Company name</li>
            <li>Direct phone and email</li>
            <li>HR-specific certifications (PHR, SHRM)</li>
            <li>Confidentiality notice</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Role-Based Variations</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Recruiters:</strong> Careers page link, open positions</li>
            <li><strong>HR Generalists:</strong> Employee portal link</li>
            <li><strong>Benefits:</strong> Benefits info link, enrollment dates</li>
            <li><strong>HR Leadership:</strong> Company values, employer brand</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Example Signature</h2>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm">
            <p className="font-bold text-lg">Sarah Johnson, PHR</p>
            <p>Senior HR Business Partner</p>
            <p className="mt-2 font-semibold">Acme Corporation</p>
            <p className="mt-2">📱 (555) 123-4567</p>
            <p className="text-violet-600">sjohnson@acme.com</p>
            <p className="text-violet-600">Careers at Acme →</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Confidentiality Considerations</h2>
          <p className="text-gray-600 mb-6">HR emails often contain sensitive information. Include an appropriate confidentiality notice about personal and employment data.</p>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">HR-ready signatures</h3>
            <p className="text-gray-600 mb-6">Siggly helps HR teams maintain professional, compliant signatures.</p>
            <Link href="/signup"><Button>Start Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
