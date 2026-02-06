import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Email Signature Colors: Brand Color Best Practices | Siggly',
  description: 'Choose the right colors for email signatures. Learn about brand colors, contrast, and what works across all email clients.',
  keywords: ['email signature colors', 'signature color scheme', 'brand colors email'],
};

export default function BlogPost() {
  return (
    <article className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
        </Link>
        <div className="mb-8">
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Design</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Email Signature Colors: Brand Color Best Practices</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> December 22, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&h=600&fit=crop" alt="Color palette" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Color reinforces brand recognition. Use your brand colors strategically in email signatures without overwhelming the design.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Color Guidelines</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Limit colors:</strong> 2-3 maximum (plus black/gray for text)</li>
            <li><strong>Primary brand color:</strong> Use for name or accent elements</li>
            <li><strong>Secondary color:</strong> Use sparingly for links or highlights</li>
            <li><strong>Text color:</strong> Keep main text black or dark gray</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Where to Use Color</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Your name (bold in brand color)</li>
            <li>Links (consistent link color)</li>
            <li>Divider lines</li>
            <li>Social icons</li>
            <li>CTA buttons</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Contrast Matters</h2>
          <p className="text-gray-600 mb-6">Ensure text is readable against any background. Test your signature in both light and dark mode email clients.</p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Using Hex Codes</h2>
          <p className="text-gray-600 mb-6">Always use exact hex color codes for consistency:</p>
          <div className="bg-gray-100 p-4 rounded-lg my-6 text-sm font-mono">
            <p>color: #6366f1; /* Exact brand violet */</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Common Mistakes</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Too many colors (looks chaotic)</li>
            <li>Light text on white (hard to read)</li>
            <li>Inconsistent colors across team</li>
            <li>Using colors that don't match brand</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">On-brand colors every time</h3>
            <p className="text-gray-600 mb-6">Siggly locks in your brand colors so every signature matches perfectly.</p>
            <Link href="/signup"><Button>Try It Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
