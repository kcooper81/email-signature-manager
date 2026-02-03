import Link from 'next/link';
import { Mail, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | Siggly',
  description: 'Terms of Service for Siggly email signature management platform',
};

export default function TermsPage() {
  return (
    <>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </Link>

        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <div className="prose prose-gray max-w-none">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using Siggly ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use the Service.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            Siggly is an email signature management platform that allows organizations to create, manage, and deploy consistent email signatures across their team. The Service integrates with Google Workspace to deploy signatures to Gmail accounts.
          </p>

          <h2>3. Account Registration</h2>
          <p>To use the Service, you must:</p>
          <ul>
            <li>Create an account with accurate and complete information</li>
            <li>Be at least 18 years old or have parental consent</li>
            <li>Have authority to bind your organization to these Terms</li>
            <li>Keep your account credentials secure</li>
          </ul>
          <p>
            You are responsible for all activities that occur under your account.
          </p>

          <h2>4. Google Workspace Integration</h2>
          <p>
            To deploy signatures, you must connect your Google Workspace account and grant necessary permissions. By doing so, you:
          </p>
          <ul>
            <li>Authorize Siggly to access your Google Workspace directory and Gmail settings</li>
            <li>Confirm you have administrative authority to grant such access</li>
            <li>Understand that Siggly will modify Gmail signature settings for users in your organization</li>
          </ul>
          <p>
            You can revoke access at any time through your Google Workspace admin console or Siggly settings.
          </p>

          <h2>5. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the Service for any illegal purpose</li>
            <li>Include malicious content, malware, or phishing links in signatures</li>
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe on intellectual property rights</li>
            <li>Attempt to gain unauthorized access to the Service</li>
            <li>Interfere with or disrupt the Service</li>
            <li>Resell or redistribute the Service without authorization</li>
          </ul>

          <h2>6. Content Ownership</h2>
          <h3>6.1 Your Content</h3>
          <p>
            You retain ownership of all content you create or upload to the Service, including signature templates, images, and text. By using the Service, you grant Siggly a limited license to store, process, and display your content as necessary to provide the Service.
          </p>

          <h3>6.2 Our Content</h3>
          <p>
            Siggly and its licensors own all rights to the Service, including software, design, and documentation. You may not copy, modify, or reverse engineer any part of the Service.
          </p>

          <h2>7. Subscription and Payment</h2>
          <h3>7.1 Plans and Pricing</h3>
          <p>
            The Service offers various subscription plans. Pricing is available on our website and may change with notice.
          </p>

          <h3>7.2 Billing</h3>
          <p>
            Subscriptions are billed in advance on a monthly or annual basis. You authorize us to charge your payment method for all fees.
          </p>

          <h3>7.3 Refunds</h3>
          <p>
            Refunds are provided at our discretion. Contact support for refund requests.
          </p>

          <h3>7.4 Cancellation</h3>
          <p>
            You may cancel your subscription at any time. Access continues until the end of your billing period.
          </p>

          <h2>8. Service Availability</h2>
          <p>
            We strive to maintain high availability but do not guarantee uninterrupted service. We may perform maintenance or updates that temporarily affect availability.
          </p>

          <h2>9. Data Protection</h2>
          <p>
            We handle your data in accordance with our <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>. You are responsible for ensuring your use of the Service complies with applicable data protection laws.
          </p>

          <h2>10. Disclaimer of Warranties</h2>
          <p>
            THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE ERROR-FREE, SECURE, OR UNINTERRUPTED.
          </p>

          <h2>11. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, SIGGLY SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES.
          </p>
          <p>
            OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE TWELVE MONTHS PRECEDING THE CLAIM.
          </p>

          <h2>12. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless Siggly from any claims, damages, or expenses arising from your use of the Service or violation of these Terms.
          </p>

          <h2>13. Termination</h2>
          <p>
            We may suspend or terminate your account if you violate these Terms. Upon termination, your right to use the Service ceases immediately. You may export your data before termination.
          </p>

          <h2>14. Changes to Terms</h2>
          <p>
            We may modify these Terms at any time. We will notify you of material changes via email or through the Service. Continued use after changes constitutes acceptance.
          </p>

          <h2>15. Governing Law</h2>
          <p>
            These Terms are governed by the laws of [Your Jurisdiction]. Any disputes shall be resolved in the courts of [Your Jurisdiction].
          </p>

          <h2>16. Severability</h2>
          <p>
            If any provision of these Terms is found unenforceable, the remaining provisions will continue in effect.
          </p>

          <h2>17. Entire Agreement</h2>
          <p>
            These Terms, along with our Privacy Policy, constitute the entire agreement between you and Siggly regarding the Service.
          </p>

          <h2>18. Contact</h2>
          <p>
            For questions about these Terms, contact us at:
          </p>
          <ul>
            <li>Email: legal@siggly.io</li>
            <li>Address: [Your Business Address]</li>
          </ul>
        </div>
      </div>
    </>
  );
}
