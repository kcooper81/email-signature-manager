import Link from 'next/link';
import { Mail, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | Siggly',
  description: 'Privacy Policy for Siggly email signature management platform',
};

export default function PrivacyPage() {
  return (
    <>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </Link>

        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <div className="prose prose-gray max-w-none">
          <h2>1. Introduction</h2>
          <p>
            Siggly ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our email signature management service.
          </p>

          <h2>2. Information We Collect</h2>
          <h3>2.1 Information You Provide</h3>
          <ul>
            <li><strong>Account Information:</strong> When you create an account, we collect your name, email address, and password.</li>
            <li><strong>Organization Information:</strong> Company name, domain, and team member details.</li>
            <li><strong>Signature Content:</strong> Text, images, and other content you include in your email signatures.</li>
            <li><strong>Payment Information:</strong> Billing details processed securely through our payment provider.</li>
          </ul>

          <h3>2.2 Information from Google Workspace Integration</h3>
          <p>When you connect your Google Workspace account, we access:</p>
          <ul>
            <li><strong>User Directory:</strong> Names, email addresses, job titles, departments, and profile photos of users in your organization (with Admin SDK Directory API).</li>
            <li><strong>Gmail Settings:</strong> We use the Gmail API to deploy email signatures to user accounts.</li>
          </ul>
          <p>
            <strong>Important:</strong> We only access the minimum data necessary to provide our service. We do not read, store, or access the content of your emails.
          </p>

          <h3>2.3 Automatically Collected Information</h3>
          <ul>
            <li>Device and browser information</li>
            <li>IP address and location data</li>
            <li>Usage patterns and analytics</li>
            <li>Cookies and similar technologies</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use the collected information to:</p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Deploy email signatures to your team's Gmail accounts</li>
            <li>Sync user information from your Google Workspace directory</li>
            <li>Send service-related communications</li>
            <li>Provide customer support</li>
            <li>Analyze usage to improve our product</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>4. Google API Services User Data Policy</h2>
          <p>
            Siggly's use and transfer of information received from Google APIs adheres to the{' '}
            <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer">
              Google API Services User Data Policy
            </a>
            , including the Limited Use requirements.
          </p>
          <p>Specifically:</p>
          <ul>
            <li>We only request access to the data necessary to provide our email signature management service.</li>
            <li>We do not use Google user data for advertising purposes.</li>
            <li>We do not sell Google user data to third parties.</li>
            <li>We do not use Google user data to determine creditworthiness or for lending purposes.</li>
            <li>Data obtained through Google APIs is only used to provide and improve our email signature service.</li>
          </ul>

          <h2>5. Data Sharing and Disclosure</h2>
          <p>We do not sell your personal information. We may share your information with:</p>
          <ul>
            <li><strong>Service Providers:</strong> Third-party vendors who assist in operating our service (hosting, analytics, payment processing).</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights.</li>
            <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
          </ul>

          <h2>6. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your data, including:
          </p>
          <ul>
            <li>Encryption of data in transit (TLS/SSL) and at rest</li>
            <li>Secure authentication and access controls</li>
            <li>Regular security audits and monitoring</li>
            <li>OAuth 2.0 for Google Workspace integration (we never store your Google password)</li>
          </ul>

          <h2>7. Data Retention</h2>
          <p>
            We retain your data for as long as your account is active or as needed to provide services. You can request deletion of your data at any time by contacting us or deleting your account.
          </p>

          <h2>8. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Delete your data</li>
            <li>Export your data</li>
            <li>Revoke Google Workspace access at any time</li>
            <li>Opt out of marketing communications</li>
          </ul>

          <h2>9. Cookies</h2>
          <p>
            We use cookies and similar technologies to maintain your session, remember your preferences, and analyze usage. You can control cookies through your browser settings.
          </p>

          <h2>10. Children's Privacy</h2>
          <p>
            Our service is not intended for children under 13. We do not knowingly collect information from children under 13.
          </p>

          <h2>11. International Data Transfers</h2>
          <p>
            Your data may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers.
          </p>

          <h2>12. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date.
          </p>

          <h2>13. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or our data practices, please contact us at:
          </p>
          <ul>
            <li>Email: privacy@siggly.io</li>
            <li>Address: [Your Business Address]</li>
          </ul>
        </div>
      </div>
    </>
  );
}
