import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'How to Set Up Gmail Signature: Complete 2026 Guide | Siggly',
  description: 'Learn how to create and set up a professional Gmail signature step-by-step. Includes tips for images, formatting, and mobile optimization.',
  keywords: ['gmail signature', 'gmail signature setup', 'how to add signature in gmail', 'gmail email signature'],
  alternates: {
    canonical: 'https://siggly.io/blog/gmail-signature-setup-guide',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Tutorials</span>
        </div>

        <h1 className="text-4xl font-bold mb-6">How to Set Up Gmail Signature: Complete 2026 Guide</h1>

        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> February 5, 2026</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 8 min read</span>
        </div>

        <Image
          src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&h=600&fit=crop"
          alt="Gmail interface on laptop screen"
          width={1200}
          height={600}
          className="rounded-2xl mb-12"
        />

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            Setting up a Gmail signature takes just a few minutes, but doing it right can make a lasting 
            impression on everyone you email. This guide walks you through creating a professional 
            Gmail signature that works on desktop and mobile.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Step 1: Access Gmail Settings</h2>
          <p className="text-gray-600 mb-6">
            Open Gmail and click the gear icon in the top right corner. Select "See all settings" from the 
            dropdown menu. You'll land on the General tab, which is exactly where you need to be.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Step 2: Find the Signature Section</h2>
          <p className="text-gray-600 mb-6">
            Scroll down until you see the "Signature" section. If you've never created a signature before, 
            you'll see a simple text box. Click "Create new" to start building your first signature.
          </p>

          <Image
            src="https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=800&h=400&fit=crop"
            alt="Email settings configuration"
            width={800}
            height={400}
            className="rounded-xl my-8"
          />

          <h2 className="text-2xl font-bold mt-12 mb-4">Step 3: Build Your Signature</h2>
          <p className="text-gray-600 mb-6">
            A professional email signature should include these key elements:
          </p>
          
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Your full name</strong> — Make it easy to identify who the email is from</li>
            <li><strong>Job title</strong> — Establishes your role and credibility</li>
            <li><strong>Company name</strong> — Reinforces your professional affiliation</li>
            <li><strong>Phone number</strong> — Direct contact method for urgent matters</li>
            <li><strong>Website link</strong> — Drives traffic to your online presence</li>
          </ul>

          <div className="bg-violet-50 border-l-4 border-violet-500 p-6 my-8">
            <p className="text-violet-900 font-medium">
              Pro tip: Keep your signature under 4-5 lines of text. Longer signatures get ignored 
              and can look unprofessional.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Step 4: Add Your Logo or Photo</h2>
          <p className="text-gray-600 mb-6">
            Click the image icon in the signature editor toolbar. You can upload an image or paste 
            a URL. For best results, use an image that's already hosted online. Keep logos under 
            200 pixels wide to ensure they display properly across all devices.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Step 5: Format Your Text</h2>
          <p className="text-gray-600 mb-6">
            Use the formatting toolbar to style your signature. Bold your name to make it stand out. 
            Use a smaller font size for secondary information like phone numbers. Stick to standard 
            web-safe fonts like Arial or Verdana for maximum compatibility.
          </p>

          <Image
            src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop"
            alt="Professional email composition"
            width={800}
            height={400}
            className="rounded-xl my-8"
          />

          <h2 className="text-2xl font-bold mt-12 mb-4">Step 6: Set Signature Defaults</h2>
          <p className="text-gray-600 mb-6">
            Below the signature editor, you'll see dropdown menus for "For new emails use" and 
            "On reply/forward use." Select your signature for both options if you want it to appear 
            automatically. Some people prefer to only include the signature on new emails to reduce 
            clutter in long threads.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Step 7: Save Your Changes</h2>
          <p className="text-gray-600 mb-6">
            Scroll to the bottom of the settings page and click "Save Changes." Your signature is 
            now active. Send yourself a test email to make sure everything looks right.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Common Gmail Signature Issues</h2>
          
          <h3 className="text-xl font-semibold mt-8 mb-3">Images Not Displaying</h3>
          <p className="text-gray-600 mb-6">
            If your logo or image isn't showing up, it's usually because the image URL is broken 
            or the hosting service has restrictions. Try uploading the image to Google Drive and 
            using that link instead, making sure the sharing settings are set to "Anyone with the link."
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3">Formatting Gets Lost</h3>
          <p className="text-gray-600 mb-6">
            When recipients see garbled formatting, it's often because you've copied styled text 
            from Word or another application. Instead, type directly in the Gmail signature editor 
            or paste as plain text first, then apply formatting.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3">Signature Too Long on Mobile</h3>
          <p className="text-gray-600 mb-6">
            Mobile email clients have limited space. If your signature dominates the screen on phones, 
            consider creating a shorter mobile-specific version or removing unnecessary elements.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Gmail Signature Best Practices</h2>
          
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li>Use a clear hierarchy — name first, then title, then contact info</li>
            <li>Include only 2-3 social media links maximum</li>
            <li>Test your signature by sending emails to different providers (Outlook, Yahoo, etc.)</li>
            <li>Update your signature whenever your contact information changes</li>
            <li>Consider seasonal updates for marketing campaigns or company announcements</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Managing Signatures for Teams</h2>
          <p className="text-gray-600 mb-6">
            If you're managing email signatures for an entire organization, doing it manually for 
            each person quickly becomes unmanageable. Tools like <Link href="/google-workspace" className="text-violet-600 hover:underline">Siggly for Google Workspace</Link> let 
            you deploy consistent signatures across your entire team from a single dashboard, 
            ensuring brand consistency and saving hours of IT time.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Need to manage signatures for your whole team?</h3>
            <p className="text-gray-600 mb-6">
              Siggly makes it easy to deploy professional, branded signatures across your 
              entire Google Workspace organization in minutes.
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
