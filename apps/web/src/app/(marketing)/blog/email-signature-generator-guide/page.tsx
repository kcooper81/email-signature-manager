import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Email Signature Generator: Create Professional Signatures Free | Siggly',
  description: 'Use our free email signature generator to create professional signatures in minutes. No design skills needed. Works with Gmail, Outlook, and more.',
  keywords: ['email signature generator', 'free email signature maker', 'create email signature', 'signature generator online'],
  alternates: {
    canonical: 'https://siggly.io/blog/email-signature-generator-guide',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Tools</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Email Signature Generator: Create Professional Signatures Free</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> January 16, 2026</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop" alt="Signature generator" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">An email signature generator lets you create professional signatures without coding or design skills. Here's how to use one effectively and what features to look for.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">What Is an Email Signature Generator?</h2>
          <p className="text-gray-600 mb-6">A signature generator is a tool that creates HTML email signatures through a visual interface. You enter your information, choose a design, and get ready-to-use code that works in any email client.</p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Key Features to Look For</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Visual editor</strong> — See your signature as you build it</li>
            <li><strong>Template options</strong> — Pre-designed layouts to start from</li>
            <li><strong>Image upload</strong> — Add logos and photos easily</li>
            <li><strong>Social icons</strong> — Built-in professional social media icons</li>
            <li><strong>Color customization</strong> — Match your brand colors</li>
            <li><strong>Mobile preview</strong> — See how it looks on phones</li>
            <li><strong>One-click copy</strong> — Easy export to your email client</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">How to Use a Signature Generator</h2>
          <ol className="list-decimal pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Choose a template</strong> — Start with a design that matches your style</li>
            <li><strong>Enter your information</strong> — Name, title, company, contact details</li>
            <li><strong>Add your logo</strong> — Upload or link to your company logo</li>
            <li><strong>Customize colors</strong> — Match your brand palette</li>
            <li><strong>Add social links</strong> — Select platforms and enter profile URLs</li>
            <li><strong>Preview on mobile</strong> — Check how it looks on small screens</li>
            <li><strong>Copy and paste</strong> — Export to your email client settings</li>
          </ol>

          <div className="bg-violet-50 border-l-4 border-violet-500 p-6 my-8">
            <p className="text-violet-900 font-medium">Pro tip: Always test your generated signature by sending emails to yourself at different email providers (Gmail, Outlook, Yahoo) to ensure it displays correctly everywhere.</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Free vs Paid Generators</h2>
          
          <h3 className="text-xl font-semibold mt-8 mb-3">Free Generators</h3>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Basic templates and customization</li>
            <li>May include branding/watermarks</li>
            <li>Limited to individual use</li>
            <li>No team management features</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3">Paid/Premium Generators</h3>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>More templates and design options</li>
            <li>No watermarks or third-party branding</li>
            <li>Team management and deployment</li>
            <li>Analytics and tracking</li>
            <li>Campaign banners</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Installing Your Generated Signature</h2>
          
          <h3 className="text-xl font-semibold mt-8 mb-3">Gmail</h3>
          <ol className="list-decimal pl-6 text-gray-600 space-y-2 mb-6">
            <li>Copy the signature from the generator</li>
            <li>Go to Gmail Settings → See all settings</li>
            <li>Scroll to Signature section</li>
            <li>Paste into the signature editor</li>
            <li>Save changes</li>
          </ol>

          <h3 className="text-xl font-semibold mt-8 mb-3">Outlook</h3>
          <ol className="list-decimal pl-6 text-gray-600 space-y-2 mb-6">
            <li>Copy the signature HTML</li>
            <li>Go to File → Options → Mail → Signatures</li>
            <li>Create new signature and paste</li>
            <li>Set as default for new messages</li>
          </ol>

          <h2 className="text-2xl font-bold mt-12 mb-4">Limitations of Basic Generators</h2>
          <p className="text-gray-600 mb-6">Free generators work well for individuals but have limitations for organizations:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>No centralized management</li>
            <li>Can't deploy to entire team at once</li>
            <li>No directory integration</li>
            <li>Manual updates required for each person</li>
            <li>No analytics or tracking</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Try our free signature generator</h3>
            <p className="text-gray-600 mb-6">Create a professional email signature in minutes. Free to use, no account required.</p>
            <Link href="/tools/signature-generator"><Button>Create Your Signature <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
