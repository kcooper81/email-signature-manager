# Marketing Pages Architecture

## Route Group Layout

All marketing pages are under the `(marketing)` route group, which automatically provides:
- **MarketingHeader** - Shared navigation header
- **MarketingFooter** - Shared footer with links
- **JSON-LD structured data** - Organization and SoftwareApplication schemas

## Page Structure

Each page should follow this pattern:

```tsx
import { generateMetadata as genMeta } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';

export const metadata = genMeta({
  title: 'Page Title',
  description: 'Page description for SEO',
  keywords: ['keyword1', 'keyword2'],
  canonical: '/page-path',
});

export default function PageName() {
  return (
    <>
      {/* Optional: Page-specific JSON-LD */}
      <JsonLd data={...} />
      
      {/* Page content - NO header or footer needed */}
      <section>...</section>
    </>
  );
}
```

## SEO Utilities

Located in `@/lib/seo`:

- `generateMetadata()` - Creates Next.js Metadata object with OpenGraph, Twitter, etc.
- `generateBreadcrumbSchema()` - Creates breadcrumb JSON-LD
- `generateBlogPostSchema()` - Creates article JSON-LD for blog posts
- `generateFAQSchema()` - Creates FAQ JSON-LD for pages with FAQs
- `generateComparisonSchema()` - Creates comparison JSON-LD for vs pages
- `generateProductSchema()` - Creates product JSON-LD

## Shared Components

Located in `@/components/marketing`:

- `MarketingHero` - Configurable hero section with variants
- `MarketingCTA` - Call-to-action section with color variants
- `MarketingStatsBar` - Stats display bar
- `MarketingFeatureGrid` - Feature cards grid
- `MarketingTestimonial` - Testimonial section

## MDX Support

Blog posts can use `.mdx` files with custom components from `@/components/blog/mdx-components.tsx`:

- Custom styled headings, paragraphs, lists
- `BlogCallout` - Info/warning/tip callouts
- `BlogImage` - Images with captions

## Pages Needing Header/Footer Removal

The following pages still have inline headers/footers that should be removed since the layout provides them:

- `about/page.tsx`
- `blog/*.tsx` (all blog pages)
- `compare/codetwo/page.tsx`
- `compare/wisestamp/page.tsx`
- `contact/page.tsx`
- `demo/page.tsx`
- `features/page.tsx`
- `google-workspace/page.tsx`
- `pricing/page.tsx`
- `privacy/page.tsx`
- `terms/page.tsx`
- `tools/signature-generator/page.tsx`
- `use-cases/page.tsx`

### How to fix each page:

1. Remove the `<header>...</header>` block
2. Remove the `<footer>...</footer>` block
3. Change the outer `<div className="min-h-screen bg-white">` to `<>`
4. Change the closing `</div>` to `</>`
5. Update metadata to use `generateMetadata()` from `@/lib/seo`
