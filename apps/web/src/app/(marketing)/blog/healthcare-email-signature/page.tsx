import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Healthcare Email Signatures: HIPAA Compliant Guide | Siggly',
  description: 'Create HIPAA-compliant email signatures for healthcare professionals. Includes confidentiality notices, NPI numbers, and credential formatting.',
  keywords: ['healthcare email signature', 'HIPAA email signature', 'medical email signature', 'doctor email signature'],
};

export default function BlogPost() {
  return (
    <article className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
        </Link>
        <div className="mb-8">
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Healthcare</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Healthcare Email Signatures: HIPAA Compliant Guide</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> January 28, 2026</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 7 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=600&fit=crop" alt="Healthcare professional" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Healthcare email signatures require special attention to HIPAA compliance and professional credential display. This guide covers requirements for medical professionals.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Essential Elements</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Full name with credentials</strong> (MD, DO, RN, NP, PA, etc.)</li>
            <li><strong>Medical specialty</strong> or department</li>
            <li><strong>Practice or hospital name</strong></li>
            <li><strong>NPI number</strong> (National Provider Identifier)</li>
            <li><strong>State license number</strong> (some states require)</li>
            <li><strong>Contact information</strong></li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">HIPAA Confidentiality Notice</h2>
          <p className="text-gray-600 mb-6">All healthcare organizations should include a HIPAA disclaimer:</p>
          <div className="bg-blue-50 p-4 rounded-lg my-6 text-sm border-l-4 border-blue-500">
            <p className="italic">CONFIDENTIALITY NOTICE: This email may contain Protected Health Information (PHI) subject to the Health Insurance Portability and Accountability Act (HIPAA). If you are not the intended recipient, you are prohibited from reading, copying, or distributing this information. Please notify the sender immediately and delete all copies.</p>
          </div>

          <div className="bg-violet-50 border-l-4 border-violet-500 p-6 my-8">
            <p className="text-violet-900 font-medium">Important: A disclaimer alone doesn't make email HIPAA-compliant. PHI should only be sent via encrypted channels. The disclaimer serves as notice if information is accidentally misdirected.</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Credential Formatting</h2>
          <p className="text-gray-600 mb-6">Follow your professional organization's guidelines for credential order. Generally:</p>
          <ol className="list-decimal pl-6 text-gray-600 space-y-2 mb-6">
            <li>Highest earned degree (MD, DO, PhD, DNP)</li>
            <li>Licensure (RN, LPN, APRN)</li>
            <li>State certifications</li>
            <li>National certifications (FACP, FACS)</li>
            <li>Other recognitions</li>
          </ol>
          <p className="text-gray-600 mb-6">Example: Jane Smith, MD, FACP or Robert Jones, DNP, RN, FNP-BC</p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Example Healthcare Signatures</h2>
          
          <h3 className="text-xl font-semibold mt-8 mb-3">Physician</h3>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm">
            <p className="font-bold text-lg">Michael Chen, MD, FACC</p>
            <p>Interventional Cardiologist</p>
            <p className="mt-2">Valley Heart Center</p>
            <p>500 Medical Plaza, Suite 200</p>
            <p>San Jose, CA 95128</p>
            <p className="mt-2">T: (408) 555-0200</p>
            <p className="text-violet-600">mchen@valleyheart.org</p>
            <p className="mt-2 text-gray-500 text-xs">NPI: 1234567890</p>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-3">Nurse Practitioner</h3>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm">
            <p className="font-bold text-lg">Lisa Patel, DNP, APRN, FNP-C</p>
            <p>Family Nurse Practitioner</p>
            <p className="mt-2">Community Health Clinic</p>
            <p>T: (555) 123-4567</p>
            <p className="text-violet-600">lpatel@communityhc.org</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">What to Avoid</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li>Listing credentials you haven't earned or maintained</li>
            <li>Including patient scheduling links in the signature itself</li>
            <li>Marketing language that could be seen as solicitation</li>
            <li>Social media links (may not align with practice policies)</li>
            <li>Personal photos in clinical settings</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Organization-Wide Compliance</h2>
          <p className="text-gray-600 mb-6">Healthcare organizations should standardize signatures across all staff to ensure consistent HIPAA disclaimer inclusion and professional presentation.</p>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">HIPAA-ready signatures for your organization</h3>
            <p className="text-gray-600 mb-6">Siggly helps healthcare organizations deploy compliant signatures with automatic HIPAA disclaimers across all staff.</p>
            <Link href="/industries/healthcare"><Button>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
