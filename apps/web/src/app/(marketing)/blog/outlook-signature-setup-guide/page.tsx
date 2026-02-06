import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'How to Set Up Outlook Signature: Step-by-Step Guide 2026 | Siggly',
  description: 'Create a professional Outlook email signature with this complete guide. Covers Outlook desktop, web, and mobile signature setup.',
  keywords: ['outlook signature', 'outlook signature setup', 'how to change outlook signature', 'microsoft outlook email signature'],
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

        <h1 className="text-4xl font-bold mb-6">How to Set Up Outlook Signature: Step-by-Step Guide</h1>

        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> February 4, 2026</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 9 min read</span>
        </div>

        <Image
          src="https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=1200&h=600&fit=crop"
          alt="Microsoft Outlook on computer screen"
          width={1200}
          height={600}
          className="rounded-2xl mb-12"
        />

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            Microsoft Outlook remains the most popular email client for businesses worldwide. 
            Setting up a professional signature in Outlook differs slightly depending on whether 
            you're using the desktop app, web version, or mobile app. This guide covers all three.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Outlook Desktop (Windows) Signature Setup</h2>
          
          <h3 className="text-xl font-semibold mt-8 mb-3">Step 1: Open Signature Settings</h3>
          <p className="text-gray-600 mb-6">
            In Outlook for Windows, click File → Options → Mail. Look for the "Signatures" button 
            and click it. This opens the Signatures and Stationery dialog box.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3">Step 2: Create a New Signature</h3>
          <p className="text-gray-600 mb-6">
            Click "New" and give your signature a name (like "Work" or "Professional"). This name 
            is just for your reference — recipients won't see it. You can create multiple signatures 
            for different purposes.
          </p>

          <Image
            src="https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=800&h=400&fit=crop"
            alt="Office workspace with computer"
            width={800}
            height={400}
            className="rounded-xl my-8"
          />

          <h3 className="text-xl font-semibold mt-8 mb-3">Step 3: Design Your Signature</h3>
          <p className="text-gray-600 mb-6">
            The signature editor in Outlook desktop is more powerful than most people realize. 
            You can change fonts, add tables for layout, insert images, and even add hyperlinks. 
            A typical professional signature includes:
          </p>

          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Full name</strong> in a slightly larger or bold font</li>
            <li><strong>Job title</strong> and department</li>
            <li><strong>Company name</strong> with optional logo</li>
            <li><strong>Contact information</strong> — phone, email, address if relevant</li>
            <li><strong>Website URL</strong> and selected social profiles</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3">Step 4: Set Default Signature Behavior</h3>
          <p className="text-gray-600 mb-6">
            At the top of the signature window, you'll see dropdown menus for each email account. 
            Choose which signature to use for new messages and which to use for replies/forwards. 
            Many professionals use their full signature for new emails and a shorter version for replies.
          </p>

          <div className="bg-violet-50 border-l-4 border-violet-500 p-6 my-8">
            <p className="text-violet-900 font-medium">
              Pro tip: In Outlook, you can switch signatures on the fly when composing an email. 
              Just click Insert → Signature and select the one you want to use.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Outlook on the Web (OWA) Signature Setup</h2>
          <p className="text-gray-600 mb-6">
            If you access Outlook through a web browser, the process is slightly different:
          </p>

          <ol className="list-decimal pl-6 text-gray-600 space-y-3 mb-6">
            <li>Click the gear icon in the top right corner</li>
            <li>Select "View all Outlook settings" at the bottom</li>
            <li>Go to Mail → Compose and reply</li>
            <li>Scroll to the Email signature section</li>
            <li>Create your signature using the editor</li>
            <li>Choose whether to include it automatically on new emails and replies</li>
            <li>Click Save</li>
          </ol>

          <Image
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=400&fit=crop"
            alt="Working on laptop with coffee"
            width={800}
            height={400}
            className="rounded-xl my-8"
          />

          <h2 className="text-2xl font-bold mt-12 mb-4">Outlook Mobile App Signature Setup</h2>
          <p className="text-gray-600 mb-6">
            The Outlook mobile app has a separate signature that only appears when you send emails 
            from your phone or tablet:
          </p>

          <ol className="list-decimal pl-6 text-gray-600 space-y-3 mb-6">
            <li>Open the Outlook app and tap your profile picture</li>
            <li>Tap the gear icon to open Settings</li>
            <li>Scroll down and tap "Signature"</li>
            <li>Toggle "Per Account Signature" if you want different signatures for each account</li>
            <li>Edit your signature text</li>
          </ol>

          <p className="text-gray-600 mb-6">
            Note that the mobile app only supports plain text signatures. If you need images or 
            formatting on mobile, you'll need a signature management solution that handles this 
            server-side.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Common Outlook Signature Problems</h2>

          <h3 className="text-xl font-semibold mt-8 mb-3">Signature Disappears on Reply</h3>
          <p className="text-gray-600 mb-6">
            Check your default signature settings. You need to explicitly set a signature for 
            "Replies/forwards" — it doesn't automatically use the same one as new messages.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3">Images Show as Attachments</h3>
          <p className="text-gray-600 mb-6">
            This happens when images are embedded rather than linked. To fix this, host your 
            images online and insert them using their URL instead of pasting from your clipboard.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3">Formatting Looks Different to Recipients</h3>
          <p className="text-gray-600 mb-6">
            Email clients render HTML differently. Stick to simple formatting, use web-safe fonts, 
            and test by sending emails to yourself at different email providers.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Advanced: HTML Signatures in Outlook</h2>
          <p className="text-gray-600 mb-6">
            For pixel-perfect signatures, you can create HTML code externally and paste it into 
            Outlook. However, Outlook's HTML rendering engine is notoriously quirky. Key tips:
          </p>

          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li>Use tables for layout instead of divs or flexbox</li>
            <li>Inline all CSS styles — Outlook strips out most style tags</li>
            <li>Avoid background images — Outlook often doesn't display them</li>
            <li>Test extensively in Outlook specifically, not just other email clients</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Deploying Signatures Across Your Organization</h2>
          <p className="text-gray-600 mb-6">
            Managing Outlook signatures for an entire company is challenging. Employees forget 
            to update their signatures, formatting varies wildly, and IT spends hours on support 
            tickets. That's why many organizations use centralized signature management tools 
            that integrate directly with <Link href="/integrations/microsoft-365" className="text-violet-600 hover:underline">Microsoft 365</Link>.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Manage Outlook signatures for your whole team</h3>
            <p className="text-gray-600 mb-6">
              Siggly integrates with Microsoft 365 to deploy consistent, professional signatures 
              across your entire organization — no manual setup required.
            </p>
            <Link href="/signup">
              <Button>Start Free Trial <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
