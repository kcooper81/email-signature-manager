import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Email Signature Best Practices: The Complete Guide | Siggly',
  description: 'Master email signature best practices with this comprehensive guide. Learn what to include, what to avoid, and how to make signatures that convert.',
  keywords: ['email signature best practices', 'professional email signature', 'email signature tips', 'email signature guidelines'],
  alternates: {
    canonical: 'https://siggly.io/blog/email-signature-best-practices',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Best Practices</span>
        </div>

        <h1 className="text-4xl font-bold mb-6">Email Signature Best Practices: The Complete Guide</h1>

        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> February 2, 2026</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 10 min read</span>
        </div>

        <Image
          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=600&fit=crop"
          alt="Professional working on email"
          width={1200}
          height={600}
          className="rounded-2xl mb-12"
        />

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            Your email signature appears on every message you send. That's potentially thousands 
            of impressions each month. Following email signature best practices ensures each of 
            those impressions builds trust, reinforces your brand, and makes it easy to connect.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">The Essential Elements</h2>
          <p className="text-gray-600 mb-6">
            Every professional email signature should include these foundational elements:
          </p>

          <div className="grid md:grid-cols-2 gap-4 my-8">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="font-semibold text-green-800 flex items-center gap-2">
                <Check className="h-5 w-5" /> Must Have
              </p>
              <ul className="mt-3 space-y-2 text-sm text-green-700">
                <li>• Full name</li>
                <li>• Job title</li>
                <li>• Company name</li>
                <li>• Primary phone number</li>
                <li>• Professional email address</li>
              </ul>
            </div>
            <div className="bg-violet-50 p-4 rounded-lg">
              <p className="font-semibold text-violet-800 flex items-center gap-2">
                <Check className="h-5 w-5" /> Nice to Have
              </p>
              <ul className="mt-3 space-y-2 text-sm text-violet-700">
                <li>• Company logo</li>
                <li>• Website URL</li>
                <li>• LinkedIn profile</li>
                <li>• Professional headshot</li>
                <li>• Scheduling link</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Keep It Concise</h2>
          <p className="text-gray-600 mb-6">
            The biggest mistake people make is cramming too much into their signature. 
            Remember: your signature is a reference, not a resume. Aim for 3-4 lines 
            of text maximum, with no more than 6-7 lines including logo and spacing.
          </p>

          <div className="bg-violet-50 border-l-4 border-violet-500 p-6 my-8">
            <p className="text-violet-900 font-medium">
              Research shows that email signatures longer than 5 lines are often skipped 
              entirely by recipients. Shorter signatures have higher engagement rates.
            </p>
          </div>

          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop"
            alt="Team reviewing email designs"
            width={800}
            height={400}
            className="rounded-xl my-8"
          />

          <h2 className="text-2xl font-bold mt-12 mb-4">Design for Mobile</h2>
          <p className="text-gray-600 mb-6">
            Over 60% of emails are opened on mobile devices. Your signature needs to look 
            great on a 4-inch screen as well as a 27-inch monitor.
          </p>

          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Use a single-column layout</strong> — Side-by-side elements often break on mobile</li>
            <li><strong>Keep text readable</strong> — Minimum 12px font size for body text</li>
            <li><strong>Make links tap-friendly</strong> — Phone numbers should be clickable to call</li>
            <li><strong>Size images appropriately</strong> — Logos under 200px wide, photos under 80px</li>
            <li><strong>Test on actual devices</strong> — Email preview tools don't always match reality</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Choose the Right Format</h2>
          
          <h3 className="text-xl font-semibold mt-8 mb-3">Plain Text vs. HTML</h3>
          <p className="text-gray-600 mb-6">
            Plain text signatures are universally compatible but offer no formatting. 
            HTML signatures allow for logos, colors, and links but require more careful 
            design to ensure compatibility across email clients.
          </p>

          <p className="text-gray-600 mb-6">
            For most professionals, HTML signatures are worth the extra effort. They 
            look more polished and allow you to include your company logo, which 
            reinforces brand recognition.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3">Image-Based vs. Code-Based</h3>
          <p className="text-gray-600 mb-6">
            Some people create their entire signature as a single image. This guarantees 
            pixel-perfect display but comes with serious drawbacks:
          </p>

          <div className="bg-red-50 p-4 rounded-lg my-6">
            <p className="font-semibold text-red-800 flex items-center gap-2">
              <X className="h-5 w-5" /> Avoid Image-Only Signatures
            </p>
            <ul className="mt-3 space-y-2 text-sm text-red-700">
              <li>• Many email clients block images by default</li>
              <li>• Text isn't copyable (frustrating for recipients)</li>
              <li>• Phone numbers aren't clickable</li>
              <li>• Larger file size slows email loading</li>
              <li>• Search engines and email filters can't read the content</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Color and Typography</h2>
          
          <h3 className="text-xl font-semibold mt-8 mb-3">Stick to Brand Colors</h3>
          <p className="text-gray-600 mb-6">
            Your email signature is an extension of your brand. Use your company's 
            primary and secondary colors, but don't go overboard. One or two accent 
            colors plus black/gray text is plenty.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3">Font Selection</h3>
          <p className="text-gray-600 mb-6">
            Use web-safe fonts to ensure your signature looks the same everywhere. 
            Good choices include:
          </p>

          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Arial</strong> — Clean, professional, universally available</li>
            <li><strong>Helvetica</strong> — Modern classic (falls back to Arial on Windows)</li>
            <li><strong>Georgia</strong> — Professional serif option for traditional industries</li>
            <li><strong>Verdana</strong> — Highly readable at small sizes</li>
          </ul>

          <p className="text-gray-600 mb-6">
            Avoid decorative fonts, scripts, or anything that might not be installed 
            on the recipient's device.
          </p>

          <Image
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
            alt="Professional branding elements"
            width={800}
            height={400}
            className="rounded-xl my-8"
          />

          <h2 className="text-2xl font-bold mt-12 mb-4">Social Media Links: Less Is More</h2>
          <p className="text-gray-600 mb-6">
            It's tempting to include every social profile you have. Resist that urge. 
            Choose 2-3 platforms that are most relevant to your professional life:
          </p>

          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>LinkedIn</strong> — Essential for most professionals</li>
            <li><strong>Twitter/X</strong> — Good for thought leaders, tech, media</li>
            <li><strong>Instagram</strong> — Appropriate for creative industries, real estate</li>
            <li><strong>GitHub</strong> — Relevant for developers</li>
            <li><strong>Company profiles</strong> — Better than personal accounts for some roles</li>
          </ul>

          <p className="text-gray-600 mb-6">
            Use small, recognizable icons rather than full URLs. They take up less space 
            and look more professional.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Legal and Compliance Considerations</h2>
          <p className="text-gray-600 mb-6">
            Depending on your industry and location, certain elements may be legally required:
          </p>

          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>UK businesses</strong> — Must include company registration number and registered address</li>
            <li><strong>US financial services</strong> — Required regulatory disclosures (FINRA, SEC)</li>
            <li><strong>Healthcare</strong> — HIPAA confidentiality notices</li>
            <li><strong>Legal</strong> — Attorney-client privilege disclaimers</li>
            <li><strong>Real estate</strong> — License numbers required in most states</li>
          </ul>

          <p className="text-gray-600 mb-6">
            Check with your compliance team or legal advisor to ensure your signature 
            meets all applicable requirements. See our <Link href="/blog/legal-requirements-email-signatures" className="text-violet-600 hover:underline">legal requirements guide</Link> for details.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">What to Avoid</h2>
          
          <div className="bg-red-50 p-6 rounded-lg my-6">
            <p className="font-semibold text-red-800 mb-3">Common Signature Mistakes</p>
            <ul className="space-y-2 text-sm text-red-700">
              <li>• Inspirational quotes — They're cliché and waste space</li>
              <li>• Multiple phone numbers — Pick your primary contact method</li>
              <li>• Full mailing addresses — Unless legally required</li>
              <li>• Animated GIFs — Distracting and often blocked</li>
              <li>• "Please consider the environment" notices — Dated and ineffective</li>
              <li>• Every social media platform — Be selective</li>
              <li>• Confidentiality notices (when not required) — Legal theater</li>
              <li>• Pronouns unless company policy — Personal choice, not universal</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Maintaining Consistency</h2>
          <p className="text-gray-600 mb-6">
            If you're part of a team, inconsistent signatures undermine your brand. 
            When one employee has a beautiful branded signature and another has plain 
            text with an outdated logo, it looks unprofessional.
          </p>

          <p className="text-gray-600 mb-6">
            Centralized signature management tools like <Link href="/features" className="text-violet-600 hover:underline">Siggly</Link> solve this by deploying 
            standardized templates across your entire organization. Everyone gets the 
            same professional look, and updates roll out instantly.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Testing Your Signature</h2>
          <p className="text-gray-600 mb-6">
            Before rolling out a new signature, test it thoroughly:
          </p>

          <ol className="list-decimal pl-6 text-gray-600 space-y-3 mb-6">
            <li>Send test emails to yourself at different email providers (Gmail, Outlook, Yahoo)</li>
            <li>View the emails on desktop and mobile</li>
            <li>Check that all links work correctly</li>
            <li>Verify images display (and that the email looks okay if images are blocked)</li>
            <li>Have colleagues review for typos and formatting issues</li>
          </ol>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Ready to upgrade your team's signatures?</h3>
            <p className="text-gray-600 mb-6">
              Siggly makes it easy to create, deploy, and maintain professional email 
              signatures across your entire organization.
            </p>
            <Link href="/signup">
              <Button>Get Started Free <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
