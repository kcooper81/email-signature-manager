import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Linkedin, Twitter } from 'lucide-react';
import { getAllAuthors, getAuthorBySlug } from '@/lib/authors';
import { blogPosts } from '../../blog-data';
import { notFound } from 'next/navigation';

interface AuthorPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllAuthors().map((author) => ({ slug: author.slug }));
}

export function generateMetadata({ params }: AuthorPageProps): Metadata {
  const author = getAuthorBySlug(params.slug);
  if (!author) return { title: 'Author Not Found' };

  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://siggly.io';

  return {
    title: `${author.name} - ${author.title} | Siggly Blog`,
    description: author.authorBio,
    alternates: {
      canonical: `${siteUrl}/blog/author/${author.slug}`,
    },
    openGraph: {
      title: `${author.name} - ${author.title}`,
      description: author.authorBio,
      type: 'profile',
      images: [{ url: author.image, width: 200, height: 200, alt: author.name }],
      url: `${siteUrl}/blog/author/${author.slug}`,
    },
    twitter: {
      card: 'summary',
      title: `${author.name} - ${author.title}`,
      description: author.authorBio,
      images: [author.image],
    },
  };
}

export default function AuthorPage({ params }: AuthorPageProps) {
  const author = getAuthorBySlug(params.slug);
  if (!author) notFound();

  const authorPosts = blogPosts.filter((p) => p.author === author.slug);

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    jobTitle: author.title,
    description: author.bio,
    image: author.image,
    url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://siggly.io'}/blog/author/${author.slug}`,
    sameAs: [author.linkedIn, `https://twitter.com/${author.twitter.replace('@', '')}`],
    worksFor: {
      '@type': 'Organization',
      name: 'Siggly',
      url: 'https://siggly.io',
    },
    knowsAbout: author.expertise,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <section className="py-16 bg-gradient-to-b from-violet-50 to-white">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to blog
          </Link>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <Image
                src={author.image}
                alt={author.name}
                width={120}
                height={120}
                className="rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-1">{author.name}</h1>
                <p className="text-lg text-violet-700 font-medium mb-4">{author.title}</p>
                <p className="text-gray-600 leading-relaxed mb-6">{author.bio}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {author.expertise.map((area) => (
                    <span
                      key={area}
                      className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {area}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <a
                    href={author.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-violet-700 transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                  <a
                    href={`https://twitter.com/${author.twitter.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-violet-700 transition-colors"
                  >
                    <Twitter className="h-4 w-4" />
                    {author.twitter}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8">
            Articles by {author.name}
            {authorPosts.length > 0 && (
              <span className="text-gray-400 font-normal text-lg ml-2">
                ({authorPosts.length})
              </span>
            )}
          </h2>

          {authorPosts.length === 0 ? (
            <p className="text-gray-500">No articles yet. Check back soon!</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {authorPosts.map((post) => {
                const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                });

                return (
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
                        </div>
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{post.title}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formattedDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readTime} read
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
