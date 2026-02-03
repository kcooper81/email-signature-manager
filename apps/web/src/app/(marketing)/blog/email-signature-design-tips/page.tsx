import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: '10 Email Signature Design Tips for 2026 | Siggly Blog',
  description: 'Modern design principles to make your email signatures stand out while remaining professional.',
};

export default function BlogPost() {
  return (
    <>
      <article className="py-12">
        <div className="max-w-3xl mx-auto px-6">
          <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
          </Link>

          <div className="mb-8">
            <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium">Design</span>
          </div>

          <h1 className="text-4xl font-bold mb-6">10 Email Signature Design Tips for 2026</h1>

          <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
            <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> January 7, 2026</span>
            <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 7 min read</span>
          </div>

          <Image
            src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=600&fit=crop"
            alt="Modern email signature design"
            width={1200}
            height={600}
            className="rounded-2xl mb-12"
          />

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8">
              Your email signature is a mini-billboard that appears in every email you send. 
              Here are 10 design tips to make it stand out in 2026.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">1. Keep It Simple</h2>
            <p className="text-gray-600 mb-6">
              Less is more. A cluttered signature with too much information overwhelms recipients. 
              Stick to essential details: name, title, company, and one or two contact methods.
            </p>

            <Image
              src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop"
              alt="Clean minimal design"
              width={800}
              height={400}
              className="rounded-xl my-8"
            />

            <h2 className="text-2xl font-bold mt-12 mb-4">2. Use a Professional Photo or Logo</h2>
            <p className="text-gray-600 mb-6">
              A headshot adds a personal touch, while a company logo reinforces brand recognition. 
              Choose one—not both—to keep the design clean. Ensure images are high-resolution but 
              optimized for email (under 50KB).
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">3. Stick to 2-3 Colors Maximum</h2>
            <p className="text-gray-600 mb-6">
              Use your brand colors consistently. Too many colors look unprofessional. 
              A primary color for your name/title and a secondary for links works well.
            </p>

            <div className="grid grid-cols-3 gap-4 my-8">
              <div className="h-20 rounded-lg bg-violet-600 flex items-center justify-center text-white text-sm">Primary</div>
              <div className="h-20 rounded-lg bg-gray-700 flex items-center justify-center text-white text-sm">Text</div>
              <div className="h-20 rounded-lg bg-gray-200 flex items-center justify-center text-gray-700 text-sm">Background</div>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">4. Choose Web-Safe Fonts</h2>
            <p className="text-gray-600 mb-6">
              Email clients don't support custom fonts reliably. Stick to web-safe options like 
              Arial, Helvetica, Georgia, or Verdana. These render consistently across all platforms.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">5. Make It Mobile-Friendly</h2>
            <p className="text-gray-600 mb-6">
              Over 60% of emails are opened on mobile devices. Your signature should:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Be readable without zooming</li>
              <li>Have tappable phone numbers and links</li>
              <li>Not exceed 320px in width</li>
              <li>Use adequate font sizes (14px minimum)</li>
            </ul>

            <Image
              src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop"
              alt="Mobile email on smartphone"
              width={800}
              height={400}
              className="rounded-xl my-8"
            />

            <h2 className="text-2xl font-bold mt-12 mb-4">6. Add Social Icons Sparingly</h2>
            <p className="text-gray-600 mb-6">
              Include only the social profiles that matter for business. LinkedIn is almost always 
              relevant. Twitter/X might be. Instagram and TikTok? Only if they're business accounts.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">7. Include a Clear CTA</h2>
            <p className="text-gray-600 mb-6">
              What do you want recipients to do? Book a meeting? Visit your website? Download a resource? 
              Add one clear call-to-action, not five.
            </p>

            <div className="bg-violet-50 border-l-4 border-violet-500 p-6 my-8">
              <p className="text-violet-900 font-medium">
                Pro tip: Rotate your CTA seasonally to promote different campaigns, events, or content.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">8. Use Proper Hierarchy</h2>
            <p className="text-gray-600 mb-6">
              Guide the eye with visual hierarchy:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li><strong>Largest:</strong> Your name</li>
              <li><strong>Medium:</strong> Job title and company</li>
              <li><strong>Smallest:</strong> Contact details and links</li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-4">9. Test Across Email Clients</h2>
            <p className="text-gray-600 mb-6">
              What looks great in Gmail might break in Outlook. Test your signature in:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Gmail (web and mobile)</li>
              <li>Outlook (desktop and web)</li>
              <li>Apple Mail</li>
              <li>Mobile email apps</li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-4">10. Keep It Under 4 Lines</h2>
            <p className="text-gray-600 mb-6">
              The best signatures are concise. If your signature is longer than the email itself, 
              it's too long. Aim for 3-4 lines of essential information.
            </p>

            <Image
              src="https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&h=400&fit=crop"
              alt="Professional email design"
              width={800}
              height={400}
              className="rounded-xl my-8"
            />

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
              <h3 className="text-xl font-bold mb-4">Create beautiful signatures with Siggly</h3>
              <p className="text-gray-600 mb-6">
                Our visual editor makes it easy to design professional signatures that follow 
                all these best practices. Try it free.
              </p>
              <Link href="/tools/signature-generator">
                <Button>Try Free Generator <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </Link>
            </div>
          </div>
        </div>
      </article>

    </>
  );
}
