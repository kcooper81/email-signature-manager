import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Email Signature Size Guide: Dimensions & File Sizes | Siggly',
  description: 'The complete guide to email signature dimensions. Learn optimal image sizes, logo dimensions, and file size limits for all email clients.',
  keywords: ['email signature size', 'email signature dimensions', 'email signature image size', 'logo size email signature'],
};

export default function BlogPost() {
  return (
    <article className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
        </Link>
        <div className="mb-8">
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Technical</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Email Signature Size Guide: Dimensions & File Sizes</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> January 30, 2026</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 6 min read</span>
        </div>
        <Image src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=600&fit=crop" alt="Design dimensions" width={1200} height={600} className="rounded-2xl mb-12" />
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">Getting email signature dimensions right ensures your signature looks professional across all devices and email clients. Here are the recommended sizes.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Recommended Dimensions</h2>
          
          <div className="overflow-x-auto my-8">
            <table className="w-full border-collapse border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-200 px-4 py-2 text-left">Element</th>
                  <th className="border border-gray-200 px-4 py-2 text-left">Width</th>
                  <th className="border border-gray-200 px-4 py-2 text-left">Height</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-4 py-2">Overall signature</td>
                  <td className="border border-gray-200 px-4 py-2">300-600px</td>
                  <td className="border border-gray-200 px-4 py-2">150-200px max</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-2">Company logo</td>
                  <td className="border border-gray-200 px-4 py-2">150-250px</td>
                  <td className="border border-gray-200 px-4 py-2">50-80px</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-2">Profile photo</td>
                  <td className="border border-gray-200 px-4 py-2">80-100px</td>
                  <td className="border border-gray-200 px-4 py-2">80-100px</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-2">Social icons</td>
                  <td className="border border-gray-200 px-4 py-2">20-24px</td>
                  <td className="border border-gray-200 px-4 py-2">20-24px</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-2">Banner/CTA</td>
                  <td className="border border-gray-200 px-4 py-2">400-600px</td>
                  <td className="border border-gray-200 px-4 py-2">70-100px</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">File Size Limits</h2>
          <p className="text-gray-600 mb-6">Large images slow down email loading and may be blocked. Follow these guidelines:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li><strong>Total signature:</strong> Under 50KB combined</li>
            <li><strong>Individual images:</strong> Under 20KB each</li>
            <li><strong>Logo:</strong> 5-15KB optimal</li>
            <li><strong>Profile photo:</strong> 10-20KB</li>
          </ul>

          <div className="bg-violet-50 border-l-4 border-violet-500 p-6 my-8">
            <p className="text-violet-900 font-medium">Use PNG for logos with transparency, JPEG for photos. Consider WebP for modern clients, but provide fallbacks.</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Mobile Considerations</h2>
          <p className="text-gray-600 mb-6">Over 60% of emails are read on mobile. Your signature should:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Be readable without zooming (min 12px font)</li>
            <li>Have tappable phone numbers and links</li>
            <li>Not exceed screen width (max 600px)</li>
            <li>Use single-column layout</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Retina Display Support</h2>
          <p className="text-gray-600 mb-6">For crisp images on high-DPI screens, create images at 2x the display size:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>200px display width → 400px actual image</li>
            <li>Set width attribute to display size (200px)</li>
            <li>The browser will scale down for sharpness</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Image Format Comparison</h2>
          <div className="overflow-x-auto my-8">
            <table className="w-full border-collapse border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-200 px-4 py-2 text-left">Format</th>
                  <th className="border border-gray-200 px-4 py-2 text-left">Best For</th>
                  <th className="border border-gray-200 px-4 py-2 text-left">Support</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-4 py-2">PNG</td>
                  <td className="border border-gray-200 px-4 py-2">Logos, icons, transparency</td>
                  <td className="border border-gray-200 px-4 py-2">Universal</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-2">JPEG</td>
                  <td className="border border-gray-200 px-4 py-2">Photos, complex images</td>
                  <td className="border border-gray-200 px-4 py-2">Universal</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-2">GIF</td>
                  <td className="border border-gray-200 px-4 py-2">Simple animations</td>
                  <td className="border border-gray-200 px-4 py-2">Most clients</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-2">SVG</td>
                  <td className="border border-gray-200 px-4 py-2">Vector logos</td>
                  <td className="border border-gray-200 px-4 py-2">Limited (avoid)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Perfect dimensions every time</h3>
            <p className="text-gray-600 mb-6">Siggly automatically optimizes your images for email and ensures signatures look great on every device.</p>
            <Link href="/signup"><Button>Try It Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
