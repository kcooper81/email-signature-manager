import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';
import { SEOLandingPage } from '@/lib/seo-pages/renderer';
import { comparisonsPages } from '@/lib/seo-pages/data/comparisons';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return comparisonsPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = comparisonsPages.find((p) => p.slug === slug);
  if (!page) return {};
  return genMeta({
    title: page.meta.title,
    description: page.meta.description,
    keywords: page.meta.keywords,
    canonical: page.meta.canonical,
  });
}

export default async function ComparisonPage({ params }: PageProps) {
  const { slug } = await params;
  const page = comparisonsPages.find((p) => p.slug === slug);
  if (!page) notFound();

  const schemas: Record<string, unknown>[] = [generateBreadcrumbSchema(page.breadcrumbs)];
  if (page.faqs && page.faqs.length > 0) {
    schemas.push(generateFAQSchema(page.faqs));
  }

  return (
    <>
      <JsonLd data={schemas} />
      <SEOLandingPage data={page} />
    </>
  );
}
