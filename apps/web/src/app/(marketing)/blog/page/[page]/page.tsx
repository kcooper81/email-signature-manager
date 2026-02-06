import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NewsletterSignupSection } from '@/components/newsletter';
import { BlogListJsonLd } from '@/components/seo';
import { generateBlogIndexMetadata } from '@/lib/seo';
import { blogPosts, getPostsForPage, getTotalPages } from '../../blog-data';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const totalPages = getTotalPages();
  return Array.from({ length: totalPages }, (_, i) => ({
    page: String(i + 1),
  }));
}

export async function generateMetadata({ params }: { params: { page: string } }) {
  const page = parseInt(params.page, 10);
  const totalPages = getTotalPages();
  return generateBlogIndexMetadata(page, totalPages);
}

export default function BlogPaginatedPage({ params }: { params: { page: string } }) {
  const page = parseInt(params.page, 10);
  const totalPages = getTotalPages();

  if (isNaN(page) || page < 1 || page > totalPages) {
    notFound();
  }

  const posts = getPostsForPage(page);
  const hasPrevious = page > 1;
  const hasNext = page < totalPages;

  return (
    <>
      <BlogListJsonLd page={page} totalPages={totalPages} posts={posts} />
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
            {hasPrevious ? (
              <Link href={page === 2 ? '/blog' : `/blog/page/${page - 1}`}>
                <Button variant="outline" size="sm" className="gap-1">
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
              </Link>
            ) : (
              <Button variant="outline" size="sm" className="gap-1" disabled>
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
            )}

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                const isCurrent = p === page;
                const showPage = p === 1 || p === totalPages || (p >= page - 1 && p <= page + 1);
                const showEllipsisBefore = p === page - 1 && page > 3;
                const showEllipsisAfter = p === page + 1 && page < totalPages - 2;

                if (!showPage && p !== 1 && p !== totalPages) {
                  if (p === 2 && page > 3) return <span key={p} className="px-2 text-gray-400">...</span>;
                  if (p === totalPages - 1 && page < totalPages - 2) return <span key={p} className="px-2 text-gray-400">...</span>;
                  return null;
                }

                return (
                  <Link key={p} href={p === 1 ? '/blog' : `/blog/page/${p}`}>
                    <Button
                      variant={isCurrent ? 'default' : 'outline'}
                      size="sm"
                      className="w-10"
                    >
                      {p}
                    </Button>
                  </Link>
                );
              })}
            </div>

            {hasNext ? (
              <Link href={`/blog/page/${page + 1}`}>
                <Button variant="outline" size="sm" className="gap-1">
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <Button variant="outline" size="sm" className="gap-1" disabled>
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>

          <p className="text-center text-sm text-gray-500 mt-4">
            Page {page} of {totalPages} · {blogPosts.length} articles
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
