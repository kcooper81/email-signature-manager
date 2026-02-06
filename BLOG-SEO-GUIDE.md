# Blog SEO Guide & Content Strategy

## Overview

This guide outlines the blog content strategy for siggly.io, designed to capture organic search traffic, establish authority in the email signature management space, and convert readers to users.

---

## Target Keywords by Category

### High-Intent (Bottom of Funnel) - Priority 1
These keywords indicate users actively looking for a solution.

| Keyword | Monthly Volume | Difficulty | Target Post |
|---------|---------------|------------|-------------|
| email signature software | 2,400 | Medium | Comparison guides |
| email signature management | 1,600 | Medium | Feature deep-dives |
| gmail signature manager | 1,000 | Low | Google Workspace guides |
| outlook signature manager | 880 | Medium | Microsoft 365 guides |
| email signature tool | 720 | Low | Product-focused posts |
| centralized email signatures | 480 | Low | Enterprise guides |

### Comparison Keywords - Priority 2
Users comparing solutions - high conversion potential.

| Keyword | Monthly Volume | Target Post |
|---------|---------------|-------------|
| exclaimer alternative | 590 | Direct comparison |
| exclaimer vs codetwo | 320 | Head-to-head comparison |
| codetwo alternative | 260 | Direct comparison |
| wisestamp alternative | 210 | Direct comparison |
| best email signature software | 1,900 | Roundup post |
| email signature software comparison | 480 | Detailed comparison |

### Informational Keywords - Priority 3
Top-of-funnel content for authority building.

| Keyword | Monthly Volume | Target Post |
|---------|---------------|-------------|
| how to create email signature | 8,100 | Tutorial |
| email signature examples | 6,600 | Gallery/inspiration |
| professional email signature | 5,400 | Best practices |
| email signature template | 4,400 | Templates gallery |
| email signature design | 2,900 | Design guide |
| email signature best practices | 1,300 | Comprehensive guide |
| html email signature | 2,400 | Technical tutorial |
| email signature generator | 3,600 | Tool page + blog |

### Industry-Specific Keywords - Priority 4
Niche keywords with high conversion rates.

| Keyword | Monthly Volume | Target Post |
|---------|---------------|-------------|
| law firm email signature | 390 | Legal industry guide |
| healthcare email signature | 260 | HIPAA compliance guide |
| real estate email signature | 480 | Real estate guide |
| financial advisor email signature | 210 | Finance compliance guide |
| attorney email signature | 320 | Legal requirements |
| doctor email signature | 170 | Medical professional guide |

### Long-Tail Keywords - Priority 5
Lower volume but very specific intent.

| Keyword | Target Post |
|---------|-------------|
| how to add signature in gmail | Tutorial |
| how to change outlook signature | Tutorial |
| email signature size dimensions | Technical guide |
| email signature image size | Technical guide |
| email signature legal disclaimer | Compliance guide |
| gdpr email signature requirements | EU compliance |
| email signature mobile responsive | Technical guide |

---

## Content Pillars

### Pillar 1: Email Signature Management
Core product-focused content.

**Topics:**
- Complete guide to email signature management
- Google Workspace signature deployment
- Microsoft 365 signature management
- Centralized vs individual signatures
- Signature automation and deployment
- Managing signatures for remote teams

### Pillar 2: Design & Branding
Visual and brand consistency content.

**Topics:**
- Email signature design principles
- Brand consistency in email
- Logo and image optimization
- Mobile-responsive signatures
- Color and typography in signatures
- Signature templates and inspiration

### Pillar 3: Compliance & Legal
Trust-building authoritative content.

**Topics:**
- Legal requirements by country
- Industry-specific compliance (HIPAA, FINRA, etc.)
- GDPR and privacy requirements
- Disclaimer templates
- Attorney-client privilege notices
- Financial disclosure requirements

### Pillar 4: Marketing & ROI
Business value content.

**Topics:**
- Email signature marketing campaigns
- Banner promotions in signatures
- Click tracking and analytics
- ROI measurement
- A/B testing signatures
- Event and product promotions

### Pillar 5: Technical How-Tos
Tutorial and setup content.

**Topics:**
- Gmail signature setup
- Outlook signature configuration
- HTML signature coding
- Image hosting for signatures
- Troubleshooting common issues
- API integration guides

---

## Blog Post Structure Template

### URL Format
`/blog/[keyword-rich-slug]`
- Use hyphens, not underscores
- Keep under 60 characters
- Include primary keyword

### Required Elements

```tsx
// 1. Metadata (SEO)
export const metadata = {
  title: '[Primary Keyword] - [Benefit/Hook] | Siggly Blog',  // 50-60 chars
  description: '[Action verb] [benefit]. [What they'll learn]. [CTA hint].',  // 150-160 chars
  keywords: ['primary keyword', 'secondary keyword', 'related term'],
};

// 2. Structured Data (in component)
<JsonLd data={generateBlogPostSchema({
  title: '',
  description: '',
  url: '/blog/slug',
  image: 'https://images.unsplash.com/...',
  datePublished: 'YYYY-MM-DD',
  author: 'Siggly Team',
})} />
```

### Content Structure

1. **Hero Section**
   - Category badge
   - H1 with primary keyword
   - Date and read time
   - Featured image (1200x600)

2. **Introduction** (100-150 words)
   - Hook the reader
   - State the problem
   - Promise the solution
   - Include primary keyword in first 100 words

3. **Body Content** (1000-2000 words)
   - H2 headings with secondary keywords
   - H3 for subsections
   - Bullet points for scanability
   - Images every 300-400 words
   - Blockquotes for statistics/quotes
   - Internal links to related content

4. **Conclusion**
   - Summary of key points
   - Actionable takeaway

5. **CTA Box**
   - Clear value proposition
   - Link to signup/demo

### Image Guidelines

- **Featured image:** 1200x600px, Unsplash
- **In-content images:** 800x400px
- **Alt text:** Descriptive, include keyword naturally
- **Format:** WebP preferred, JPEG fallback

---

## Competitor SEO Analysis

### Exclaimer Blog Strategy
- Focus: Enterprise features, case studies
- Weakness: Limited how-to content
- Opportunity: More tutorials, SMB-focused content

### CodeTwo Blog Strategy
- Focus: Technical documentation, Microsoft-heavy
- Weakness: Dry, technical tone
- Opportunity: More accessible, visual content

### WiseStamp Blog Strategy
- Focus: Individual users, design tips
- Weakness: Limited enterprise content
- Opportunity: Team/organization content gap

### Our Differentiation
1. **More accessible tone** - Not overly corporate
2. **Visual-first approach** - More images, examples
3. **Broader coverage** - Both individual and enterprise
4. **Practical focus** - Actionable how-tos
5. **Modern design** - Better UX than competitors

---

## Content Calendar Framework

### Weekly Publishing Schedule
- **Monday:** How-to tutorials
- **Wednesday:** Best practices / tips
- **Friday:** Industry news / trends

### Monthly Themes
- **Week 1:** Google Workspace focus
- **Week 2:** Microsoft 365 focus
- **Week 3:** Design and branding
- **Week 4:** Compliance and legal

### Seasonal Content
- **January:** "New Year, New Brand" refresh
- **Q1:** Tax season compliance reminders
- **Q2:** Spring cleaning / audit guides
- **Q3:** Back-to-school / new hire onboarding
- **Q4:** Year-end reviews, holiday campaigns

---

## Internal Linking Strategy

Every blog post should include:

1. **2-3 related blog posts** - Keep readers on site
2. **1 product/feature page** - Drive to product
3. **Pricing or signup** - Enable conversion

### Link Anchor Text Guidelines
- Use descriptive text, not "click here"
- Include keywords naturally
- Vary anchor text for same destination

---

## SEO Checklist for Each Post

### Before Publishing
- [ ] Primary keyword in title (H1)
- [ ] Primary keyword in meta description
- [ ] Primary keyword in first 100 words
- [ ] Primary keyword in URL slug
- [ ] Secondary keywords in H2 headings
- [ ] Alt text on all images
- [ ] Internal links (2-3 minimum)
- [ ] External link to authoritative source
- [ ] Mobile preview checked
- [ ] Read time calculated
- [ ] Category assigned

### After Publishing
- [ ] Added to blog index page (`blogPosts` array)
- [ ] Added to sitemap (`blogPosts` array in sitemap.ts)
- [ ] Social sharing tested
- [ ] Google Search Console indexed

---

## Performance Metrics

Track these for each post:

| Metric | Target | Tool |
|--------|--------|------|
| Organic traffic | 100+ visits/month after 3 months | GA4 |
| Average time on page | 3+ minutes | GA4 |
| Bounce rate | Under 60% | GA4 |
| Keyword rankings | Top 20 for primary keyword | Search Console |
| Backlinks | 1+ external links | Ahrefs/Search Console |
| Conversions | 2%+ signup rate | GA4 |

---

## Writing Style Guidelines

### Tone
- Professional but approachable
- Confident, not salesy
- Helpful, not preachy
- Concise, not verbose

### Formatting
- Short paragraphs (2-3 sentences max)
- Bullet points for lists
- Bold for emphasis (sparingly)
- Headers every 200-300 words

### Avoid
- Jargon without explanation
- Walls of text
- Generic stock phrases
- Overly promotional language
- Repetitive keyword stuffing

---

## Quick Reference: File Locations

| Purpose | Location |
|---------|----------|
| Blog posts | `apps/web/src/app/(marketing)/blog/[slug]/page.tsx` |
| Blog index | `apps/web/src/app/(marketing)/blog/page.tsx` |
| Sitemap | `apps/web/src/app/sitemap.ts` |
| SEO utilities | `apps/web/src/lib/seo.ts` |
| JSON-LD component | `apps/web/src/components/seo/json-ld.tsx` |

---

*Last Updated: February 2026*
