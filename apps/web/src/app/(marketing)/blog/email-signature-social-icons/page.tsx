import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Social Media Icons in Email Signatures: Best Practices | Siggly',
  description: 'Add social media icons to your email signature the right way. Learn which platforms to include, icon sizing, and linking best practices.',
  keywords: ['email signature social icons', 'social media email signature', 'linkedin email signature', 'email signature icons'],
};

export default function BlogPost() {
  return (
    <article className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
        </Link>
        <div className="mb-8">
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Design</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Social Media Icons in Email Signatures: Best Practices</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> January 19, 2026</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=600&fit=crop" alt="Social media icons" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Social media icons can enhance your email signature by connecting recipients to your professional profiles. But adding too many or the wrong ones can hurt more than help.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Which Platforms to Include</h2>
          <p className="text-gray-600 mb-6">Choose platforms based on your profession and audience:</p>
          
          <h3 className="text-xl font-semibold mt-8 mb-3">Almost Always Include</h3>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li><strong>LinkedIn</strong> — Professional standard for almost every industry</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3">Industry-Specific</h3>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li><strong>Twitter/X</strong> — Tech, media, thought leadership, journalism</li>
            <li><strong>Instagram</strong> — Creative, real estate, retail, hospitality</li>
            <li><strong>GitHub</strong> — Developers, engineering teams</li>
            <li><strong>Dribbble/Behance</strong> — Designers, creatives</li>
            <li><strong>YouTube</strong> — Content creators, education, training</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3">Usually Avoid</h3>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li><strong>Facebook</strong> — Often too personal for business email</li>
            <li><strong>TikTok</strong> — Unless directly relevant to your work</li>
            <li><strong>Snapchat</strong> — Rarely appropriate for professional contexts</li>
          </ul>

          <div className="bg-violet-50 border-l-4 border-violet-500 p-6 my-8">
            <p className="text-violet-900 font-medium">Rule of thumb: Include 2-3 platforms maximum. More than that creates clutter and dilutes the impact.</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Icon Sizing Guidelines</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Size:</strong> 20-24 pixels square</li>
            <li><strong>Spacing:</strong> 8-12 pixels between icons</li>
            <li><strong>Style:</strong> Consistent — all filled or all outlined</li>
            <li><strong>Color:</strong> Match your brand or use platform colors</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Icon Style Options</h2>
          <p className="text-gray-600 mb-6">Choose a consistent style for all icons:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Brand colors</strong> — LinkedIn blue, Twitter blue, etc. (most recognizable)</li>
            <li><strong>Monochrome</strong> — All gray or all your brand color (cleaner look)</li>
            <li><strong>Circular</strong> — Icons in colored circles (bold statement)</li>
            <li><strong>Outlined</strong> — Line-style icons (modern, minimal)</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Placement Options</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>After contact info</strong> — Most common, flows naturally</li>
            <li><strong>Next to name</strong> — Keeps signature compact</li>
            <li><strong>Vertical stack</strong> — Works well with photos/logos on side</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Technical Considerations</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li>Host icons on a reliable server (not your local computer)</li>
            <li>Use PNG format with transparency</li>
            <li>Link directly to your profile, not just the platform homepage</li>
            <li>Set alt text for accessibility ("LinkedIn profile")</li>
            <li>Test that links open in a new tab/window</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Company vs Personal Profiles</h2>
          <p className="text-gray-600 mb-6">Decide whether to link to personal or company profiles:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li><strong>Sales/Client-facing:</strong> Personal profiles build relationships</li>
            <li><strong>Customer support:</strong> Company profiles for consistency</li>
            <li><strong>Marketing:</strong> Mix of both, depending on role</li>
            <li><strong>Executive:</strong> Personal profiles establish thought leadership</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Add polished social icons instantly</h3>
            <p className="text-gray-600 mb-6">Siggly includes professional social media icons that match your signature style. Just paste your profile URLs.</p>
            <Link href="/signup"><Button>Try It Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
