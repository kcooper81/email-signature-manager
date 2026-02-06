import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BlogPostJsonLd } from '@/components/seo';

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

interface BlogPostLayoutProps {
  meta: BlogPostMeta;
  children: React.ReactNode;
}

export function BlogPostLayout({ meta, children }: BlogPostLayoutProps) {
  const formattedDate = new Date(meta.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <BlogPostJsonLd
        title={meta.title}
        description={meta.excerpt}
        slug={meta.slug}
        image={meta.image}
        datePublished={meta.date}
        readTime={meta.readTime}
        category={meta.category}
      />
      
      <article className="py-12">
        <div className="max-w-3xl mx-auto px-6">
          <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
          </Link>

          <div className="mb-8">
            <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">
              {meta.category}
            </span>
          </div>

          <h1 className="text-4xl font-bold mb-6">{meta.title}</h1>

          <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" /> {formattedDate}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" /> {meta.readTime} read
            </span>
          </div>

          <Image
            src={meta.image}
            alt={meta.title}
            width={1200}
            height={600}
            className="rounded-2xl mb-12"
          />

          <div className="prose prose-lg max-w-none">
            {children}
          </div>

          {/* CTA Section */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Ready to streamline your email signatures?</h3>
            <p className="text-gray-600 mb-6">
              Deploy consistent, on-brand email signatures to your entire team in minutes.
              Free for up to 5 users.
            </p>
            <Link href="/signup">
              <Button>Get Started Free <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}

export function createBlogPostMetadata(meta: BlogPostMeta) {
  return {
    title: `${meta.title} | Siggly Blog`,
    description: meta.excerpt,
    openGraph: {
      title: meta.title,
      description: meta.excerpt,
      type: 'article',
      publishedTime: meta.date,
      images: [{ url: meta.image, width: 1200, height: 630, alt: meta.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.excerpt,
      images: [meta.image],
    },
    alternates: {
      canonical: `https://siggly.io/blog/${meta.slug}`,
    },
  };
}
