import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Education Email Signatures: Teachers & Administrators | Siggly',
  description: 'Create professional email signatures for educators, teachers, and school administrators. Include credentials and contact info appropriately.',
  keywords: ['teacher email signature', 'education email signature', 'school administrator signature'],
  alternates: {
    canonical: 'https://siggly.io/blog/education-email-signature',
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
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Education</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Education Email Signatures: Teachers & Administrators</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> December 28, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=600&fit=crop" alt="Education" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Educators communicate with students, parents, and colleagues daily. Professional signatures help maintain appropriate boundaries while sharing necessary contact information.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Teacher Signature Elements</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Name with appropriate title (Mr./Ms./Dr.)</li>
            <li>Subject/Grade level taught</li>
            <li>School name</li>
            <li>School phone (not personal)</li>
            <li>School email</li>
            <li>Office hours (optional)</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Example Teacher Signature</h2>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm">
            <p className="font-bold text-lg">Ms. Sarah Johnson</p>
            <p>7th Grade English Teacher</p>
            <p className="mt-2">Lincoln Middle School</p>
            <p>Office Hours: M/W/F 3:00-4:00 PM</p>
            <p className="mt-2">(555) 123-4567 ext. 234</p>
            <p className="text-violet-600">sjohnson@lincolnschools.edu</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Administrator Signature</h2>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm">
            <p className="font-bold text-lg">Dr. Michael Chen</p>
            <p>Principal</p>
            <p className="mt-2">Lincoln Middle School</p>
            <p>500 Education Way</p>
            <p>City, State 12345</p>
            <p className="mt-2">T: (555) 123-4567</p>
            <p className="text-violet-600">mchen@lincolnschools.edu</p>
            <p className="text-violet-600">www.lincolnschools.edu</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Privacy Considerations</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Use school contact info, not personal</li>
            <li>Consider FERPA when discussing students</li>
            <li>Be mindful of social media links</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Signatures for your school</h3>
            <p className="text-gray-600 mb-6">Siggly helps schools deploy consistent signatures across all faculty and staff.</p>
            <Link href="/signup"><Button>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
