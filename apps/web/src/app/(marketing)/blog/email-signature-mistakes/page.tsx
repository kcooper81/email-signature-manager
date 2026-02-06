import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: '15 Email Signature Mistakes That Hurt Your Brand | Siggly',
  description: 'Avoid these common email signature mistakes that make you look unprofessional. From broken images to quote overload, learn what to fix.',
  keywords: ['email signature mistakes', 'bad email signature', 'email signature problems', 'email signature dont'],
};

export default function BlogPost() {
  return (
    <article className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
        </Link>
        <div className="mb-8">
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Best Practices</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">15 Email Signature Mistakes That Hurt Your Brand</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> January 23, 2026</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 8 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=600&fit=crop" alt="Professional working" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Your email signature appears on every message you send. These common mistakes can undermine your professionalism and damage your brand.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Design Mistakes</h2>
          
          <h3 className="text-xl font-semibold mt-8 mb-3 flex items-center gap-2"><X className="h-5 w-5 text-red-500" /> 1. Too Many Colors</h3>
          <p className="text-gray-600 mb-6">Using every color in your brand palette creates visual chaos. Stick to 2-3 colors maximum: your primary brand color, black/gray for text, and one accent.</p>

          <h3 className="text-xl font-semibold mt-8 mb-3 flex items-center gap-2"><X className="h-5 w-5 text-red-500" /> 2. Unreadable Fonts</h3>
          <p className="text-gray-600 mb-6">Script fonts, decorative typefaces, or fonts below 10px are hard to read. Use web-safe fonts like Arial or Verdana at 12-14px.</p>

          <h3 className="text-xl font-semibold mt-8 mb-3 flex items-center gap-2"><X className="h-5 w-5 text-red-500" /> 3. Giant Logos</h3>
          <p className="text-gray-600 mb-6">A logo that dominates your signature looks aggressive. Keep logos under 200px wide and proportional to your text.</p>

          <h3 className="text-xl font-semibold mt-8 mb-3 flex items-center gap-2"><X className="h-5 w-5 text-red-500" /> 4. Image-Only Signatures</h3>
          <p className="text-gray-600 mb-6">Creating your entire signature as one image means recipients can't copy your contact info, phone numbers aren't clickable, and images may be blocked.</p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Content Mistakes</h2>

          <h3 className="text-xl font-semibold mt-8 mb-3 flex items-center gap-2"><X className="h-5 w-5 text-red-500" /> 5. Inspirational Quotes</h3>
          <p className="text-gray-600 mb-6">"Be the change you wish to see in the world" doesn't belong in business email. Quotes waste space and often come across as unprofessional.</p>

          <h3 className="text-xl font-semibold mt-8 mb-3 flex items-center gap-2"><X className="h-5 w-5 text-red-500" /> 6. Every Social Platform</h3>
          <p className="text-gray-600 mb-6">Including LinkedIn, Twitter, Facebook, Instagram, TikTok, YouTube, and Pinterest creates clutter. Choose 2-3 relevant platforms.</p>

          <h3 className="text-xl font-semibold mt-8 mb-3 flex items-center gap-2"><X className="h-5 w-5 text-red-500" /> 7. Multiple Phone Numbers</h3>
          <p className="text-gray-600 mb-6">Office, mobile, fax, home, pager... pick your primary contact method. Recipients don't need four ways to call you.</p>

          <h3 className="text-xl font-semibold mt-8 mb-3 flex items-center gap-2"><X className="h-5 w-5 text-red-500" /> 8. Outdated Information</h3>
          <p className="text-gray-600 mb-6">Old job titles, defunct phone numbers, or expired certifications destroy credibility. Review your signature quarterly.</p>

          <Image src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop" alt="Clean workspace" width={800} height={400} className="rounded-xl my-8" />

          <h2 className="text-2xl font-bold mt-12 mb-4">Technical Mistakes</h2>

          <h3 className="text-xl font-semibold mt-8 mb-3 flex items-center gap-2"><X className="h-5 w-5 text-red-500" /> 9. Broken Images</h3>
          <p className="text-gray-600 mb-6">Images hosted on your computer or broken URLs show as empty boxes or red Xs. Always use publicly accessible, permanent image URLs.</p>

          <h3 className="text-xl font-semibold mt-8 mb-3 flex items-center gap-2"><X className="h-5 w-5 text-red-500" /> 10. Non-Clickable Links</h3>
          <p className="text-gray-600 mb-6">Phone numbers and email addresses should be hyperlinked. "tel:" links let mobile users call with one tap.</p>

          <h3 className="text-xl font-semibold mt-8 mb-3 flex items-center gap-2"><X className="h-5 w-5 text-red-500" /> 11. Inconsistent Formatting</h3>
          <p className="text-gray-600 mb-6">Mixed fonts, random bolding, and inconsistent spacing look sloppy. Maintain visual consistency throughout.</p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Strategic Mistakes</h2>

          <h3 className="text-xl font-semibold mt-8 mb-3 flex items-center gap-2"><X className="h-5 w-5 text-red-500" /> 12. No Mobile Consideration</h3>
          <p className="text-gray-600 mb-6">Signatures that look great on desktop may be unreadable on phones. Test on mobile devices before deploying.</p>

          <h3 className="text-xl font-semibold mt-8 mb-3 flex items-center gap-2"><X className="h-5 w-5 text-red-500" /> 13. "Sent from iPhone"</h3>
          <p className="text-gray-600 mb-6">The default mobile signature adds no value and looks lazy. Replace it with your actual signature or remove it entirely.</p>

          <h3 className="text-xl font-semibold mt-8 mb-3 flex items-center gap-2"><X className="h-5 w-5 text-red-500" /> 14. Meaningless Disclaimers</h3>
          <p className="text-gray-600 mb-6">Unless legally required for your industry, lengthy confidentiality notices are mostly ignored and add unnecessary length.</p>

          <h3 className="text-xl font-semibold mt-8 mb-3 flex items-center gap-2"><X className="h-5 w-5 text-red-500" /> 15. Team Inconsistency</h3>
          <p className="text-gray-600 mb-6">When every employee has a different signature style, your brand looks disorganized. Standardize across your organization.</p>

          <div className="bg-violet-50 border-l-4 border-violet-500 p-6 my-8">
            <p className="text-violet-900 font-medium">Quick fix: Review your current signature against this list. Fix the obvious problems first, then work on optimization.</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Create mistake-free signatures</h3>
            <p className="text-gray-600 mb-6">Siggly's templates are designed by professionals to avoid common mistakes and look great everywhere.</p>
            <Link href="/signup"><Button>Get Started Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
