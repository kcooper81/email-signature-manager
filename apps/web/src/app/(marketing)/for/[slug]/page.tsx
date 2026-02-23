import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';
import { SEOLandingPage } from '@/lib/seo-pages/renderer';
import { solutionsPages } from '@/lib/seo-pages/data/solutions';
import { getPageWithOverrides, getGeneratedPage, getMetaOverrides } from '@/lib/seo/overrides';

export const dynamicParams = true;
export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return solutionsPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let page = solutionsPages.find((p) => p.slug === slug);
  if (!page) {
    page = await getGeneratedPage('for', slug) ?? undefined;
  }
  if (!page) return {};
  const overrides = await getMetaOverrides(page.meta.canonical);
  return genMeta({
    title: overrides?.title || page.meta.title,
    description: overrides?.description || page.meta.description,
    keywords: overrides?.keywords || page.meta.keywords,
    canonical: page.meta.canonical,
  });
}

export default async function SolutionPage({ params }: PageProps) {
  const { slug } = await params;
  let page = solutionsPages.find((p) => p.slug === slug);
  if (!page) {
    page = await getGeneratedPage('for', slug) ?? undefined;
  }
  if (!page) notFound();

  const merged = await getPageWithOverrides(page);

  const schemas: Record<string, unknown>[] = [generateBreadcrumbSchema(merged.breadcrumbs)];
  if (merged.faqs && merged.faqs.length > 0) {
    schemas.push(generateFAQSchema(merged.faqs));
  }

  return (
    <>
      <JsonLd data={schemas} />
      <SEOLandingPage data={merged} />
    </>
  );
}
