'use client';

import { JsonLd } from './json-ld';
import { generateBlogPostSchema, generateBlogListSchema } from '@/lib/seo';

interface BlogPostJsonLdProps {
  title: string;
  description: string;
  slug: string;
  image: string;
  datePublished: string;
  readTime?: string;
  category?: string;
}

export function BlogPostJsonLd({
  title,
  description,
  slug,
  image,
  datePublished,
  readTime,
  category,
}: BlogPostJsonLdProps) {
  const schema = generateBlogPostSchema({
    title,
    description,
    url: `/blog/${slug}`,
    image,
    datePublished,
    readTime,
    category,
  });

  return <JsonLd data={schema} />;
}

interface BlogListJsonLdProps {
  page: number;
  totalPages: number;
  posts: { slug: string; title: string; date: string }[];
}

export function BlogListJsonLd({ page, totalPages, posts }: BlogListJsonLdProps) {
  const schema = generateBlogListSchema({
    page,
    totalPages,
    posts: posts.map((post) => ({
      title: post.title,
      url: `/blog/${post.slug}`,
      date: post.date,
    })),
  });

  return <JsonLd data={schema} />;
}
