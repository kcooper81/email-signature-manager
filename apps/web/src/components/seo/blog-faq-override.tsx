import { headers } from 'next/headers';
import { getContentOverrides } from '@/lib/seo/overrides';
import { FAQSection } from './faq-section';

/**
 * Server component that fetches FAQ overrides for the current blog page
 * and renders them if present. Drop into the blog layout to automatically
 * apply SEO engine FAQ recommendations to all blog posts.
 */
export async function BlogFAQOverride() {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';

  if (!pathname || !pathname.startsWith('/blog/')) return null;

  // getContentOverrides indexes by both full URL and pathname
  const overrides = await getContentOverrides(pathname);

  if (!overrides?.additional_faqs || overrides.additional_faqs.length === 0) {
    return null;
  }

  return <FAQSection faqs={overrides.additional_faqs} />;
}
