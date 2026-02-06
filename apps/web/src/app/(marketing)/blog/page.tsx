import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NewsletterSignupSection } from '@/components/newsletter';
import { BlogListJsonLd } from '@/components/seo';
import { generateBlogIndexMetadata } from '@/lib/seo';
import { blogPosts, getPostsForPage, getTotalPages } from './blog-data';

export const metadata = generateBlogIndexMetadata(1, getTotalPages());

export default function BlogPage() {
  const totalPages = getTotalPages();
  const posts = getPostsForPage(1);

  return (
    <>
      <BlogListJsonLd page={1} totalPages={totalPages} posts={posts} />
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
            {posts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug}>
                <article className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow h-full">
                  <div className="h-48 relative">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
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
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex items-center justify-center gap-2">
            <Button variant="outline" size="sm" className="gap-1" disabled>
              Previous
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, getTotalPages()) }, (_, i) => i + 1).map((p) => (
                <Link key={p} href={p === 1 ? '/blog' : `/blog/page/${p}`}>
                  <Button
                    variant={p === 1 ? 'default' : 'outline'}
                    size="sm"
                    className="w-10"
                  >
                    {p}
                  </Button>
                </Link>
              ))}
              {getTotalPages() > 5 && (
                <>
                  <span className="px-2 text-gray-400">...</span>
                  <Link href={`/blog/page/${getTotalPages()}`}>
                    <Button variant="outline" size="sm" className="w-10">
                      {getTotalPages()}
                    </Button>
                  </Link>
                </>
              )}
            </div>

            <Link href="/blog/page/2">
              <Button variant="outline" size="sm" className="gap-1">
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <p className="text-center text-sm text-gray-500 mt-4">
            Page 1 of {getTotalPages()} · {blogPosts.length} articles
          </p>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-6">
          <NewsletterSignupSection
            source="blog"
            title="Subscribe to our newsletter"
            description="Get the latest tips and updates delivered to your inbox."
          />
        </div>
      </section>
    </>
  );
}
