import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createBlogMetadata, generateBlogPostSchema } from '@/lib/seo';
import { AuthorCard } from '@/components/blog/author-card';
import { RelatedPosts } from '@/components/blog/related-posts';

export const metadata = createBlogMetadata(
  'email-signature-size-guide',
  'Email Signature Size Guide: Exact Dimensions (2026)',
  'The exact pixel dimensions and file sizes for every part of an email signature — overall width, logo, banner, headshot, and social icons — plus Gmail, Outlook, and mobile specs.',
  [
    'email signature size',
    'email signature dimensions',
    'email signature image size',
    'logo size for email signatures',
    'email signature banner size',
    'size for email signature',
    'email header size',
    'email signature width',
  ]
);

const OVERALL = [
  ['Total width', '600 px', '320–650 px', 'Matches the body width of most email clients. Never exceed ~650 px or it scrolls on desktop.'],
  ['Total height', '90–150 px', 'up to 200 px', 'Keep it compact — a signature taller than the message looks like spam.'],
  ['Mobile width', '≤ 320 px', '—', 'The narrowest common phone viewport. Design so it still reads at 320 px wide.'],
];

const ELEMENTS = [
  ['Logo', '150 × 50 px', '300 × 100 px', '< 20 KB', 'Transparent PNG. Width-led — height follows your aspect ratio.'],
  ['Headshot / photo', '80 × 80 px', '160 × 160 px', '< 20 KB', 'Square. JPEG for photos; circular crop reads well.'],
  ['Banner / email header', '600 × 150 px', '1200 × 300 px', '< 50 KB', 'Full-width promo strip. 4:1 ratio is the safest.'],
  ['Social icons', '24 × 24 px', '48 × 48 px', '< 5 KB each', 'Keep every icon the same box size so the row stays even.'],
  ['QR code', '80 × 80 px', '160 × 160 px', '< 15 KB', 'Below 80 px it gets hard for phones to scan.'],
];

const CLIENTS = [
  ['Gmail (web + app)', 'Scales images to their displayed width. Set an explicit display size — do not rely on the native file size.'],
  ['Outlook (Windows)', 'Uses the Word rendering engine. Set width/height in HTML attributes, not only CSS, or images render at full size.'],
  ['Apple Mail / iOS', 'Retina display — serve images at 2× the displayed size so they stay sharp.'],
  ['Mobile clients', 'Assume a 320 px column. Stack or shrink wide banners so nothing is cut off.'],
];

function Th({ children }: { children: React.ReactNode }) {
  return <th className="text-left font-semibold text-gray-900 px-4 py-3 border-b border-gray-200 text-sm">{children}</th>;
}
function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-3 border-b border-gray-100 text-sm text-gray-600 align-top">{children}</td>;
}

export default function BlogPost() {
  const blogSchema = generateBlogPostSchema({
    title: 'Email Signature Size Guide: Exact Dimensions (2026)',
    description:
      'The exact pixel dimensions and file sizes for every part of an email signature — overall width, logo, banner, headshot, and social icons — plus Gmail, Outlook, and mobile specs.',
    url: '/blog/email-signature-size-guide',
    image: '/blog-images/photo-1507003211169-0a1dd7228f2d.jpg',
    datePublished: '2026-11-08',
    author: 'Marcus Rodriguez',
    readTime: '7 min',
    category: 'Design',
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <article className="py-12">
        <div className="max-w-3xl mx-auto px-6">
          <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
          </Link>
          <div className="mb-8">
            <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Design</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-6">Email Signature Size Guide: Exact Dimensions</h1>
          <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
            <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> November 8, 2026</span>
            <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 7 min read</span>
          </div>
          <AuthorCard authorSlug="marcus-rodriguez" />

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8">
              An email signature that&apos;s sized wrong looks broken: logos balloon to full screen, banners get cut off
              on phones, and heavy images get clipped by Gmail. Here are the exact dimensions and file sizes for every
              part of a signature, so it looks sharp everywhere.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">Quick reference</h2>
            <div className="not-prose overflow-x-auto rounded-xl border border-gray-200 mb-6">
              <table className="w-full border-collapse">
                <thead className="bg-gray-50">
                  <tr><Th>Element</Th><Th>Display size</Th><Th>File (@2x)</Th><Th>Max weight</Th><Th>Notes</Th></tr>
                </thead>
                <tbody>
                  {ELEMENTS.map((r) => (
                    <tr key={r[0]}><Td><strong className="text-gray-900">{r[0]}</strong></Td><Td>{r[1]}</Td><Td>{r[2]}</Td><Td>{r[3]}</Td><Td>{r[4]}</Td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-500 mb-10">
              &ldquo;Display size&rdquo; is how big the image appears in the email. &ldquo;File (@2x)&rdquo; is the
              resolution you actually export so it stays crisp on retina screens — always set the display size in your
              HTML.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">Overall signature dimensions</h2>
            <p className="text-gray-600 mb-6">
              The whole signature should fit inside the email body column. Six hundred pixels wide is the long-standing
              safe maximum — it matches the width most email clients render at, and it degrades cleanly to mobile.
            </p>
            <div className="not-prose overflow-x-auto rounded-xl border border-gray-200 mb-10">
              <table className="w-full border-collapse">
                <thead className="bg-gray-50">
                  <tr><Th>Measurement</Th><Th>Recommended</Th><Th>Acceptable range</Th><Th>Why</Th></tr>
                </thead>
                <tbody>
                  {OVERALL.map((r) => (
                    <tr key={r[0]}><Td><strong className="text-gray-900">{r[0]}</strong></Td><Td>{r[1]}</Td><Td>{r[2]}</Td><Td>{r[3]}</Td></tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">Logo size</h2>
            <p className="text-gray-600 mb-6">
              Lead with width, not height. A logo around <strong>150&nbsp;px wide</strong> (displayed) sits comfortably
              next to your contact details; let the height follow your logo&apos;s natural aspect ratio rather than
              forcing a square. Export at 300&nbsp;px wide for retina, keep it under 20&nbsp;KB, and use a transparent
              PNG so it works on light and dark backgrounds.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">Headshot / photo size</h2>
            <p className="text-gray-600 mb-6">
              Keep photos square at roughly <strong>80&nbsp;×&nbsp;80&nbsp;px</strong> displayed (160&nbsp;×&nbsp;160&nbsp;px
              exported). Larger than that and the photo competes with your logo; smaller and the face is hard to read. Our{' '}
              <Link href="/blog/email-signature-photo-guidelines" className="text-violet-600 hover:underline">
                email signature photo guide
              </Link>{' '}
              covers cropping, lighting, and when to include a headshot at all.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">Banner / email header size</h2>
            <p className="text-gray-600 mb-6">
              A promotional banner (sometimes called an email header) runs the full width of the signature:{' '}
              <strong>600&nbsp;×&nbsp;150&nbsp;px</strong> displayed, a 4:1 ratio. Export at 1200&nbsp;×&nbsp;300&nbsp;px for
              sharpness and keep it under 50&nbsp;KB — banners are the most common cause of a clipped, slow-loading
              signature. You can build one at the right size with our free{' '}
              <Link href="/tools/banner-maker" className="text-violet-600 hover:underline">email header &amp; banner maker</Link>.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">Social icon size</h2>
            <p className="text-gray-600 mb-6">
              Social icons look best at <strong>24&nbsp;×&nbsp;24&nbsp;px</strong> displayed (up to 48&nbsp;×&nbsp;48&nbsp;px).
              The single most important rule: give every icon the <em>same</em> box size so the row stays visually even,
              even when the glyphs inside differ.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">File size and format</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li><strong>Keep the whole signature under ~100&nbsp;KB.</strong> Heavy images trigger Gmail&apos;s message clipping and slow loads.</li>
              <li><strong>PNG</strong> for logos and anything with transparency or sharp edges.</li>
              <li><strong>JPEG</strong> for photographs — much smaller at the same quality.</li>
              <li><strong>Host images on a reliable HTTPS URL.</strong> Avoid embedding, which bloats every email and is often blocked.</li>
              <li><strong>Always set width and height</strong> in the HTML, not just CSS — Outlook ignores CSS sizing.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-4">How each email client handles sizing</h2>
            <div className="not-prose overflow-x-auto rounded-xl border border-gray-200 mb-10">
              <table className="w-full border-collapse">
                <thead className="bg-gray-50">
                  <tr><Th>Client</Th><Th>What to know</Th></tr>
                </thead>
                <tbody>
                  {CLIENTS.map((r) => (
                    <tr key={r[0]}><Td><strong className="text-gray-900">{r[0]}</strong></Td><Td>{r[1]}</Td></tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">Common sizing mistakes</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li><strong>No explicit dimensions</strong> — the image renders at its full file size and overwhelms the email.</li>
              <li><strong>Exporting at 1×</strong> — looks blurry on every modern phone and laptop.</li>
              <li><strong>A banner wider than 600&nbsp;px</strong> — horizontal scroll on desktop, clipped edges on mobile.</li>
              <li><strong>Uneven social icons</strong> — different box sizes make the row look misaligned.</li>
              <li><strong>Uncompressed images</strong> — a 500&nbsp;KB logo is the fastest way to get your email clipped.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-4">Get the sizing right automatically</h2>
            <p className="text-gray-600 mb-6">
              If you&apos;d rather not hand-tune pixels, Siggly renders every signature at the correct dimensions and
              optimizes each image for email automatically — so logos, banners, and photos stay sharp in Gmail, Outlook,
              and on mobile across your whole team. Already have HTML? Paste it into our{' '}
              <Link href="/tools/html-signature-converter" className="text-violet-600 hover:underline">HTML to email signature converter</Link>{' '}
              or start from a{' '}
              <Link href="/email-signature-templates" className="text-violet-600 hover:underline">ready-sized template</Link>.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
              <h3 className="text-xl font-bold mb-4">Signatures sized right, every time</h3>
              <p className="text-gray-600 mb-6">
                Siggly handles dimensions, file sizes, and client quirks for you — deploy consistent signatures across
                Gmail and Microsoft 365 in minutes.
              </p>
              <Link href="/signup"><Button>Try It Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
            </div>
          </div>
        </div>
      </article>
      <RelatedPosts currentUrl="/blog/email-signature-size-guide" count={3} />
    </>
  );
}
