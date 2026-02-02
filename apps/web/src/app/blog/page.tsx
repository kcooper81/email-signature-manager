import Link from 'next/link';
import { Mail, ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Blog | Siggly',
  description: 'Tips, guides, and insights about email signatures and brand consistency',
};

const blogPosts = [
  {
    slug: 'why-email-signatures-matter',
    title: 'Why Email Signatures Matter More Than You Think',
    excerpt: 'Your email signature is seen hundreds of times a day. Learn why it\'s one of the most underutilized marketing tools.',
    date: '2026-01-28',
    readTime: '5 min read',
    category: 'Best Practices',
  },
  {
    slug: 'brand-consistency-guide',
    title: 'The Complete Guide to Brand Consistency in Email',
    excerpt: 'How to ensure every email your team sends reinforces your brand identity and professionalism.',
    date: '2026-01-21',
    readTime: '8 min read',
    category: 'Branding',
  },
  {
    slug: 'google-workspace-signature-management',
    title: 'Managing Email Signatures in Google Workspace',
    excerpt: 'A step-by-step guide to deploying consistent signatures across your entire Google Workspace organization.',
    date: '2026-01-14',
    readTime: '6 min read',
    category: 'Tutorials',
  },
  {
    slug: 'email-signature-design-tips',
    title: '10 Email Signature Design Tips for 2026',
    excerpt: 'Modern design principles to make your email signatures stand out while remaining professional.',
    date: '2026-01-07',
    readTime: '7 min read',
    category: 'Design',
  },
  {
    slug: 'signature-marketing-campaigns',
    title: 'Using Email Signatures for Marketing Campaigns',
    excerpt: 'How to leverage your team\'s email signatures as a powerful, free marketing channel.',
    date: '2025-12-28',
    readTime: '5 min read',
    category: 'Marketing',
  },
  {
    slug: 'legal-requirements-email-signatures',
    title: 'Legal Requirements for Business Email Signatures',
    excerpt: 'What your business email signatures legally need to include, by country and industry.',
    date: '2025-12-21',
    readTime: '6 min read',
    category: 'Compliance',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-600 via-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
              <Mail className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg">Siggly</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-violet-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to home
          </Link>
          <h1 className="text-4xl font-bold mb-4">Siggly Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Tips, guides, and insights to help you master email signatures and maintain brand consistency across your organization.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.slug} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-violet-100 to-blue-100 flex items-center justify-center">
                  <Mail className="h-16 w-16 text-violet-300" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="bg-violet-100 text-violet-700 px-2 py-1 rounded text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="font-semibold text-lg mb-2 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="text-violet-600 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all cursor-pointer">
                      Read more <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Subscribe to our newsletter</h2>
          <p className="text-gray-600 mb-6">
            Get the latest tips and updates delivered to your inbox.
          </p>
          <form className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Siggly. All rights reserved.
            </p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-900">Privacy</Link>
              <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-900">Terms</Link>
              <Link href="/contact" className="text-sm text-gray-500 hover:text-gray-900">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
