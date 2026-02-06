import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Email Signature Templates: Free Designs for Every Industry | Siggly',
  description: 'Download free email signature templates for professionals. Includes designs for corporate, creative, legal, healthcare, and real estate industries.',
  keywords: ['email signature template', 'free email signature', 'signature template download', 'professional email template'],
};

export default function BlogPost() {
  return (
    <article className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
        </Link>
        <div className="mb-8">
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Templates</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Email Signature Templates: Designs for Every Industry</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> January 20, 2026</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 6 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=600&fit=crop" alt="Design templates" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Starting with a template makes creating professional email signatures faster and easier. Here are template styles suited to different industries and roles.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Corporate Template</h2>
          <p className="text-gray-600 mb-6">Clean, professional, works for any business environment.</p>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm border-l-4 border-violet-500">
            <p className="font-bold text-lg">First Last</p>
            <p className="text-gray-600">Job Title | Department</p>
            <p className="text-gray-600 mt-2">Company Name</p>
            <p className="mt-2">📞 (555) 123-4567</p>
            <p className="text-violet-600">email@company.com</p>
            <p className="text-violet-600">www.company.com</p>
          </div>
          <p className="text-gray-600 mb-6"><strong>Best for:</strong> Finance, consulting, B2B companies, enterprise</p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Creative Template</h2>
          <p className="text-gray-600 mb-6">More personality for designers, agencies, and startups.</p>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm border-l-4 border-pink-500">
            <p className="font-bold text-lg">First Last</p>
            <p className="text-pink-600">Creative Director</p>
            <p className="mt-3">✨ Agency Name</p>
            <p className="mt-2 text-gray-600">(555) 123-4567 · email@agency.com</p>
            <p className="text-pink-600">portfolio.com</p>
          </div>
          <p className="text-gray-600 mb-6"><strong>Best for:</strong> Agencies, designers, startups, marketing</p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Minimalist Template</h2>
          <p className="text-gray-600 mb-6">Just the essentials — nothing more.</p>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm border-l-4 border-gray-400">
            <p><strong>First Last</strong> · Title · Company</p>
            <p className="text-violet-600">email@company.com</p>
          </div>
          <p className="text-gray-600 mb-6"><strong>Best for:</strong> Engineers, developers, academics, internal communications</p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Legal Template</h2>
          <p className="text-gray-600 mb-6">Includes required compliance elements for attorneys.</p>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm border-l-4 border-green-700">
            <p className="font-bold text-lg">First Last, Esq.</p>
            <p className="text-gray-600">Partner | Practice Area</p>
            <p className="text-gray-600 mt-2">Law Firm LLP</p>
            <p className="text-gray-600">123 Legal Street, Suite 100</p>
            <p className="text-gray-600">City, State ZIP</p>
            <p className="mt-2">T: (555) 123-4567 | F: (555) 123-4568</p>
            <p className="text-violet-600">email@lawfirm.com</p>
            <p className="text-gray-500 text-xs mt-2">Bar# 123456</p>
          </div>
          <p className="text-gray-600 mb-6"><strong>Best for:</strong> Attorneys, law firms, legal professionals</p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Healthcare Template</h2>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm border-l-4 border-blue-500">
            <p className="font-bold text-lg">First Last, MD</p>
            <p className="text-gray-600">Specialty</p>
            <p className="text-gray-600 mt-2">Hospital/Practice Name</p>
            <p className="mt-2">Appointments: (555) 123-4567</p>
            <p className="text-violet-600">email@healthcare.org</p>
          </div>
          <p className="text-gray-600 mb-6"><strong>Best for:</strong> Doctors, nurses, healthcare administrators</p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Real Estate Template</h2>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm border-l-4 border-amber-500">
            <p className="font-bold text-lg">First Last, REALTOR®</p>
            <p className="text-gray-600">Designation | Specialty</p>
            <p className="text-gray-600 mt-2">Brokerage Name</p>
            <p className="mt-2">📱 (555) 123-4567</p>
            <p className="text-violet-600">email@realty.com</p>
            <p className="text-violet-600">www.agenthomes.com</p>
            <p className="text-gray-500 text-xs mt-2">License# DRE12345 | Equal Housing Opportunity</p>
          </div>
          <p className="text-gray-600 mb-6"><strong>Best for:</strong> Real estate agents, brokers, property managers</p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Choosing the Right Template</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Match your industry</strong> — Conservative industries need conservative signatures</li>
            <li><strong>Consider your audience</strong> — Who receives most of your emails?</li>
            <li><strong>Align with brand</strong> — Use your company's colors and style</li>
            <li><strong>Include required elements</strong> — Don't miss compliance requirements</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Access professional templates</h3>
            <p className="text-gray-600 mb-6">Siggly includes dozens of customizable templates designed for every industry. No design skills required.</p>
            <Link href="/tools/signature-templates"><Button>Browse Templates <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
