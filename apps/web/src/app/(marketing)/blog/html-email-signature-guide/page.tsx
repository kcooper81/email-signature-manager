import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'HTML Email Signature: Complete Coding Guide | Siggly',
  description: 'Learn to code HTML email signatures that work across all clients. Includes templates, best practices, and Outlook compatibility tips.',
  keywords: ['html email signature', 'email signature code', 'html signature template'],
};

export default function BlogPost() {
  return (
    <article className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
        </Link>
        <div className="mb-8">
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Technical</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">HTML Email Signature: Complete Coding Guide</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> February 1, 2026</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 12 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop" alt="Code on screen" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Creating HTML email signatures that render consistently across Gmail, Outlook, and Apple Mail requires specific techniques. This guide covers everything you need to know.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Why Email HTML Is Different</h2>
          <p className="text-gray-600 mb-6">Email clients don't support modern CSS. Outlook uses Word's rendering engine, which means you need tables for layout and inline styles for everything.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">The Golden Rules</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Use tables for layout</strong> — The only reliable positioning method</li>
            <li><strong>Inline all CSS</strong> — Style tags get stripped by many clients</li>
            <li><strong>Avoid shorthand</strong> — Write margin-top instead of margin</li>
            <li><strong>Web-safe fonts only</strong> — Arial, Verdana, Georgia, Times New Roman</li>
            <li><strong>Set explicit widths</strong> — Don't rely on auto-sizing</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Basic Template Structure</h2>
          <div className="bg-gray-100 p-4 rounded-lg my-6 text-sm font-mono overflow-x-auto">
            <pre>{`<table cellpadding="0" cellspacing="0" border="0" 
  style="font-family:Arial,sans-serif;font-size:14px;">
  <tr>
    <td style="padding-bottom:8px;">
      <strong>Your Name</strong>
    </td>
  </tr>
  <tr>
    <td>Job Title | Company</td>
  </tr>
  <tr>
    <td style="padding-top:8px;">
      <a href="mailto:email@company.com">email@company.com</a>
    </td>
  </tr>
</table>`}</pre>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Adding Images</h2>
          <p className="text-gray-600 mb-6">Images must be hosted online. Use absolute URLs and always set width/height attributes:</p>
          <div className="bg-gray-100 p-4 rounded-lg my-6 text-sm font-mono">
            <pre>{`<img src="https://yoursite.com/logo.png" 
     width="150" height="50" 
     alt="Company Logo" 
     style="display:block;border:0;" />`}</pre>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Outlook-Specific Fixes</h2>
          <p className="text-gray-600 mb-6">Outlook requires special handling. Use MSO conditional comments for Outlook-specific code:</p>
          <div className="bg-gray-100 p-4 rounded-lg my-6 text-sm font-mono">
            <pre>{`<!--[if mso]>
<table><tr><td width="600">
<![endif]-->
  <!-- Your content here -->
<!--[if mso]>
</td></tr></table>
<![endif]-->`}</pre>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Common Problems & Solutions</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Extra spacing</strong> — Add style="display:block" to images</li>
            <li><strong>Blue links on iOS</strong> — Wrap text in a span with explicit color</li>
            <li><strong>Font changes</strong> — Always specify fallback fonts in font-family</li>
            <li><strong>Broken layout</strong> — Check for unclosed tags and missing table cells</li>
          </ul>

          <div className="bg-violet-50 border-l-4 border-violet-500 p-6 my-8">
            <p className="text-violet-900 font-medium">Pro tip: Test your signature using tools like Litmus or Email on Acid before deploying. Different clients render HTML very differently.</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Skip the coding headaches</h3>
            <p className="text-gray-600 mb-6">Siggly's visual editor creates perfectly-coded HTML signatures that work everywhere — no coding required.</p>
            <Link href="/signup"><Button>Try Free Editor <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
