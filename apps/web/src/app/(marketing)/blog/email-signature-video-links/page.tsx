import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Adding Video Links to Email Signatures | Siggly',
  description: 'Include video content links in your email signature. Product demos, introductions, and video CTAs that engage recipients.',
  keywords: ['email signature video', 'video link signature', 'signature video CTA'],
};

export default function BlogPost() {
  return (
    <article className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
        </Link>
        <div className="mb-8">
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Video</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Adding Video Links to Email Signatures</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> November 26, 2025</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1200&h=600&fit=crop" alt="Video content" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Video is highly engaging. Adding video links to your signature can significantly increase engagement with your content.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Video Link Ideas</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Personal intro:</strong> Quick video introducing yourself</li>
            <li><strong>Product demo:</strong> Link to product overview</li>
            <li><strong>Testimonials:</strong> Customer success stories</li>
            <li><strong>Company culture:</strong> Team or office video</li>
            <li><strong>How-to content:</strong> Educational videos</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Implementation Options</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Text link: "Watch our 2-minute demo →"</li>
            <li>Thumbnail image with play button overlay</li>
            <li>Animated GIF preview (use sparingly)</li>
            <li>Banner with video CTA</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Best Practices</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Don't embed actual video (won't play in email)</li>
            <li>Use thumbnail that looks like a video</li>
            <li>Keep video short (under 2 minutes ideal)</li>
            <li>Include video length in CTA text</li>
            <li>Track clicks with UTM parameters</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Platform Options</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>YouTube (free, high compatibility)</li>
            <li>Vimeo (professional, clean player)</li>
            <li>Loom (great for personal intros)</li>
            <li>Wistia (marketing analytics)</li>
            <li>Vidyard (sales-focused features)</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Add video CTAs easily</h3>
            <p className="text-gray-600 mb-6">Siggly templates support video thumbnails and links for engaging signatures.</p>
            <Link href="/signup"><Button>Start Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
