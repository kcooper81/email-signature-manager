---
description: How to create and manage blog posts for SEO
---

# Blog Post Workflow

## Creating a New Blog Post

### 1. Create the blog post page
Create a new directory under `apps/web/src/app/(marketing)/blog/[slug]/page.tsx`

### 2. Use the SEO metadata utility
```tsx
import { generateMetadata as genMeta, generateBlogPostSchema } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';

export const metadata = genMeta({
  title: 'Your Blog Post Title',
  description: 'A compelling 150-160 character description with primary keyword',
  keywords: ['keyword1', 'keyword2', 'keyword3'],
  canonical: '/blog/your-slug',
  ogType: 'article',
  article: {
    publishedTime: '2026-01-28',
    authors: ['Author Name'],
    tags: ['Tag1', 'Tag2'],
  },
});
```

### 3. Add JSON-LD structured data in the component
```tsx
<JsonLd data={generateBlogPostSchema({
  title: 'Your Blog Post Title',
  description: 'Description',
  url: '/blog/your-slug',
  image: 'https://images.unsplash.com/...',
  datePublished: '2026-01-28',
  author: 'Author Name',
})} />
```

### 4. Update the blog index
Add the new post to the `blogPosts` array in `apps/web/src/app/(marketing)/blog/page.tsx`

### 5. Update the sitemap
Add the new post to the `blogPosts` array in `apps/web/src/app/sitemap.ts`

## Blog Post SEO Checklist

- [ ] Primary keyword in title (H1)
- [ ] Primary keyword in meta description
- [ ] Primary keyword in first 100 words
- [ ] Secondary keywords in H2 headings
- [ ] Internal links to 2-3 related pages
- [ ] External link to 1 authoritative source
- [ ] Featured image with descriptive alt text
- [ ] Reading time estimate
- [ ] Author attribution
- [ ] Publish date
- [ ] Category/tags
- [ ] CTA to signup/demo

## URL Structure
Blog posts use flat URLs: `/blog/[slug]`
- Good: `/blog/email-signature-best-practices`
- Bad: `/blog/2026/01/email-signature-best-practices`

## Content Guidelines

### Ideal Length
- How-to guides: 1500-2500 words
- Best practices: 1000-1500 words
- News/updates: 500-800 words

### Structure
1. Hook/intro (address the problem)
2. Main content with H2/H3 headings
3. Actionable takeaways
4. CTA to product

### Internal Linking
Every blog post should link to:
- 1-2 related blog posts
- 1 product/feature page
- Pricing or signup page