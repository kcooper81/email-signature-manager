import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight, AlertTriangle, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Legal Requirements for Business Email Signatures | Siggly Blog',
  description: 'What your business email signatures legally need to include, by country and industry.',
  alternates: {
    canonical: 'https://siggly.io/blog/legal-requirements-email-signatures',
  },
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
            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">Compliance</span>
          </div>

          <h1 className="text-4xl font-bold mb-6">Legal Requirements for Business Email Signatures</h1>

          <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
            <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> December 21, 2025</span>
            <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 6 min read</span>
          </div>

          <Image
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=600&fit=crop"
            alt="Legal documents and compliance"
            width={1200}
            height={600}
            className="rounded-2xl mb-12"
          />

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8">
              Email signatures aren't just about branding—in many jurisdictions and industries, 
              they're a legal requirement. Here's what you need to know to stay compliant.
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 my-8">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-800">Disclaimer</h4>
                  <p className="text-yellow-700 text-sm">This article is for informational purposes only and does not constitute legal advice. Consult with a legal professional for guidance specific to your situation.</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">Requirements by Region</h2>

            <h3 className="text-xl font-semibold mt-8 mb-3 flex items-center gap-2">
              <Globe className="h-5 w-5" /> European Union
            </h3>
            <p className="text-gray-600 mb-4">
              EU regulations require business emails to include specific company information:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Company name and legal form (Ltd, GmbH, etc.)</li>
              <li>Registered office address</li>
              <li>Registration number</li>
              <li>VAT identification number (if applicable)</li>
              <li>Directors' names (in some countries)</li>
            </ul>

            <Image
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=400&fit=crop"
              alt="Business professionals reviewing documents"
              width={800}
              height={400}
              className="rounded-xl my-8"
            />

            <h3 className="text-xl font-semibold mt-8 mb-3 flex items-center gap-2">
              <Globe className="h-5 w-5" /> United Kingdom
            </h3>
            <p className="text-gray-600 mb-4">
              Under the Companies Act 2006, UK businesses must include:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Full company name</li>
              <li>Company registration number</li>
              <li>Place of registration (England and Wales, Scotland, etc.)</li>
              <li>Registered office address</li>
              <li>VAT number (if VAT registered)</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-3 flex items-center gap-2">
              <Globe className="h-5 w-5" /> Germany
            </h3>
            <p className="text-gray-600 mb-4">
              German law (§ 37a HGB) has strict requirements for business emails:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Company name as registered</li>
              <li>Legal form (GmbH, AG, etc.)</li>
              <li>Registered office location</li>
              <li>Court of registration and registration number</li>
              <li>Names of all managing directors</li>
              <li>For AG: Chairman of the supervisory board</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-3 flex items-center gap-2">
              <Globe className="h-5 w-5" /> United States
            </h3>
            <p className="text-gray-600 mb-6">
              The US has fewer federal requirements, but industry-specific regulations apply:
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">Industry-Specific Requirements</h2>

            <div className="space-y-6 my-8">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold mb-2">Healthcare (HIPAA)</h4>
                <p className="text-gray-600 text-sm">Healthcare organizations must include confidentiality notices warning that emails may contain protected health information (PHI).</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold mb-2">Financial Services</h4>
                <p className="text-gray-600 text-sm">SEC and FINRA regulations require specific disclosures about investment advice and the nature of communications.</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold mb-2">Legal Profession</h4>
                <p className="text-gray-600 text-sm">Law firms typically include attorney-client privilege notices and disclaimers about the nature of legal advice.</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold mb-2">Real Estate</h4>
                <p className="text-gray-600 text-sm">Many states require real estate professionals to include license numbers and brokerage information.</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">Common Disclaimer Types</h2>

            <h3 className="text-xl font-semibold mt-8 mb-3">Confidentiality Notice</h3>
            <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-600 my-4 font-mono">
              "This email and any attachments are confidential and intended solely for the addressee. If you have received this email in error, please notify the sender immediately and delete it from your system."
            </div>

            <h3 className="text-xl font-semibold mt-8 mb-3">No Liability Disclaimer</h3>
            <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-600 my-4 font-mono">
              "The information in this email is provided for informational purposes only and does not constitute professional advice. [Company] accepts no liability for any errors or omissions."
            </div>

            <h3 className="text-xl font-semibold mt-8 mb-3">Environmental Notice</h3>
            <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-600 my-4 font-mono">
              "Please consider the environment before printing this email."
            </div>

            <Image
              src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop"
              alt="Business contract signing"
              width={800}
              height={400}
              className="rounded-xl my-8"
            />

            <h2 className="text-2xl font-bold mt-12 mb-4">Best Practices for Compliance</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
              <li><strong>Centralize control:</strong> Use a signature management tool to ensure all employees have compliant signatures</li>
              <li><strong>Regular audits:</strong> Review signatures quarterly to ensure information is current</li>
              <li><strong>Template by region:</strong> Create different templates for employees in different jurisdictions</li>
              <li><strong>Legal review:</strong> Have your legal team approve signature templates before deployment</li>
              <li><strong>Automatic updates:</strong> When regulations change, update all signatures simultaneously</li>
            </ul>

            <div className="bg-violet-50 border border-violet-200 rounded-xl p-8 my-12">
              <h3 className="text-xl font-bold mb-4">Stay compliant with Siggly</h3>
              <p className="text-gray-600 mb-6">
                Siggly makes it easy to add required legal disclaimers to all your team's signatures. 
                Create region-specific templates and deploy them instantly.
              </p>
              <Link href="/signup">
                <Button>Get Started Free <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </Link>
            </div>
          </div>
        </div>
      </article>

    </>
  );
}
