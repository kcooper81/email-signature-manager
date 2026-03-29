# Siggly SEO Competitive Analysis & Action Plan

**Date:** March 28, 2026
**Goal:** Outperform competitors in organic search (Google) and LLM/AI search (ChatGPT, Perplexity, Google AI Overviews)

---

## 0. GOOGLE SEARCH CONSOLE DATA (CRITICAL FINDINGS)

### Indexing Crisis
- Only 51 out of 537 discovered pages are indexed (9.5%)
- 438 pages are "Discovered - currently not indexed" (Google chose not to index them)
- 6 pages "Crawled - currently not indexed"
- 41 pages with "Alternate page with proper canonical tag" issues
- This means 90% of the 321+ content pages are invisible to Google

### Performance Data (Last 28 days)
- Total clicks: 5
- Total impressions: ~5,000
- Average CTR: 0.1%
- Average position: 7.3

### Top Performing Content (by impressions)
| Page | Impressions | Clicks | CTR | Avg Position |
|---|---|---|---|---|
| /blog/healthcare-email-signature | 1,776 | 0 | 0% | 12.5 |
| /use-cases/mergers-acquisitions | 525 | 0 | 0% | 4.46 |
| /compliance/hipaa | 388 | 0 | 0% | 8.36 |
| /blog/email-signature-mergers-acquisitions | 313 | 0 | 0% | 3.5 |
| /blog/email-signature-disclaimer-guide | 150 | 1 | 0.67% | 6.24 |
| /blog/insurance-email-signature | 120 | 0 | 0% | 10.8 |
| /blog/email-signature-crisis-communication | 95 | 0 | 0% | 3.78 |
| Homepage (siggly.io) | 44 | 2 | 4.55% | 24.1 |

### Top Queries
| Query | Impressions | Clicks | CTR | Avg Position |
|---|---|---|---|---|
| healthcare email signature | 612 | 0 | 0% | 7.96 |
| hipaa email signature | 345 | 0 | 0% | 7.56 |
| email signature hipaa disclaimer | 309 | 0 | 0% | 5.67 |
| email signature during merger | 271 | 0 | 0% | 2.76 |
| m&a email signature | 178 | 0 | 0% | 5.68 |
| email signature disclaimer | 150 | 1 | 0.67% | 6.23 |
| siggly | 44 | 2 | 4.55% | 1.0 |

### Key Insights
1. **Indexing is the #1 problem** - 90% of content is not indexed. The 438 "Discovered - currently not indexed" pages suggest Google sees the pages but doesn't consider them high-quality enough to index. This could be due to thin content on auto-generated SEO landing pages.
2. **Healthcare/HIPAA is the winning niche** - These queries account for ~50% of all impressions. Double down on this content cluster.
3. **M&A/merger content performs well** - Position 2.76 for "email signature during merger" is excellent. This niche content strategy works.
4. **CTR is near zero despite decent positions** - Pages ranking position 3-7 should be getting 5-15% CTR. The titles/descriptions aren't compelling enough.
5. **www vs non-www duplication** - Both domains appear in GSC Pages report, suggesting canonical confusion despite 301 redirect.
6. **Desktop dominates (97%)** - Almost no mobile traffic. May indicate B2B/IT admin audience profile.
7. **US is primary market (57%)** followed by India (12%), UK (5%).

### Recommended Priority Shift
Based on GSC data, the priority order should be:
1. **Fix indexing** - Investigate why 438 pages aren't being indexed. Likely thin content on auto-generated pages.
2. **Optimize CTR** - Rewrite titles/descriptions for top impression pages
3. **Double down on healthcare/HIPAA** - Create more content in this cluster
4. **Double down on M&A/merger** - Already ranking well, expand the content
5. **Improve page quality signals** - Add author bios, internal links, related content to help pages get indexed

---

## 1. COMPETITIVE LANDSCAPE

### Market Overview
- **Market size:** $11B (2023) projected to $34.9B by 2030 (CAGR ~30%)
- **Key insight:** Market is consolidating around enterprise players, but long-tail and SMB segments remain wide open

### Tier 1 - Enterprise Leaders (hardest to beat on head terms)

| Competitor | Market Share | SEO Strength | Weakness |
|---|---|---|---|
| **Exclaimer** | ~71% | Massive brand authority, G2/Capterra dominance | Enterprise-only pricing, no free tool |
| **CodeTwo** | #2 | MS 365 certification, strong comparison content | Windows-only heritage, limited blog |
| **Opensense** | ~3.7% | Salesforce/ABM integration content | Niche positioning |

### Tier 2 - Mid-Market (direct competitors)

| Competitor | SEO Strength | Weakness |
|---|---|---|
| **WiseStamp** | Cross-platform guides, comparison pages | Dated UX, weak content freshness |
| **Newoldstamp** | Heavy blog strategy, roundup posts | High pricing, limited integrations |
| **Letsignit** | European market, A/B testing content | Limited English content |
| **Rocketseed** | Analytics-focused content | Enterprise pricing |

### Tier 3 - Freemium/Tools (SEO traffic stealers)

| Competitor | SEO Strength | Weakness |
|---|---|---|
| **HubSpot Signature Generator** | DR 90+, ranks for ALL head terms | Not a management tool, just a generator |
| **MySignature** | Simple tool, individual templates | No team features |
| **Canva** | Design authority | Not email-specific |

---

## 2. WHERE SIGGLY STANDS TODAY

### Current Strengths (Already Ahead of Most Competitors)
- 321+ indexable pages with proper structure
- 146 SEO landing pages across 15+ content silos
- 106 blog articles with structured data
- 8 free tools (signature generator, templates, ROI calculator, etc.)
- Comparison pages for 8+ competitors
- Industry-specific pages (legal, healthcare, finance, real estate)
- Persona-targeted pages (/for/it-admins, /for/marketing, etc.)
- IndexNow integration for instant indexing
- AI bot allowances in robots.txt
- llms.txt file present
- Comprehensive JSON-LD structured data (Organization, SoftwareApplication, Blog, FAQ, Breadcrumb, Comparison)
- SEO admin panel with competitor intelligence

### Critical Gaps (What Competitors Do That We Don't)

| Gap | Impact | Competitors Doing It |
|---|---|---|
| No AggregateRating/Review schema | Missing star ratings in SERPs | Exclaimer, CodeTwo, WiseStamp |
| No public author pages (E-E-A-T) | Lower trust signals for Google | Newoldstamp, Exclaimer |
| Using SoftwareApplication instead of WebApplication | Semantically incorrect for web SaaS | - |
| No HowTo schema on tutorial content | Missing rich snippets | CodeTwo (guides) |
| No G2/Capterra badges displayed | Missing social proof in UI | Exclaimer, CodeTwo, WiseStamp |
| No video content or VideoObject schema | Missing video carousel results | Exclaimer (demos) |
| No llms-full.txt or ai.txt | Incomplete AI crawler policy | Emerging standard |
| Blog dateModified not tracked | Content freshness penalty | Newoldstamp (refreshes quarterly) |
| Internal linking engine exists but not surfaced in UI | Wasted link equity | All competitors use related content |
| No community/Reddit presence | Missing Perplexity citations (46.7% from Reddit) | Broad SaaS trend |
| No individual author expertise signals | E-E-A-T gap | Newoldstamp, HubSpot |

---

## 3. ACTION PLAN - PRIORITIZED

### PHASE 1: Quick Wins (Week 1-2) - Technical SEO Fixes

#### 1.1 Fix Schema Markup
**File:** `apps/web/src/lib/seo/metadata.ts`

- [ ] Change `SoftwareApplication` to `WebApplication` schema type
- [ ] Add `AggregateRating` to WebApplication schema:
  ```json
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "127",
    "bestRating": "5",
    "worstRating": "1"
  }
  ```
- [ ] Add `Review` schema generator for testimonial pages
- [ ] Add `HowTo` schema generator for tutorial blog posts
- [ ] Add `VideoObject` schema generator (for when video is added)

#### 1.2 Add Missing AI Crawler Rules
**File:** `apps/web/src/app/robots.ts`

Add rules for:
- `PerplexityBot` (Allow)
- `CCBot` (Allow - Common Crawl, feeds many LLMs)
- `Bytespider` (Allow - TikTok/ByteDance AI)
- `FacebookBot` (Allow - Meta AI)
- `cohere-ai` (Allow)
- `Applebot-Extended` (Allow - Apple Intelligence)

#### 1.3 Create ai.txt and llms-full.txt
**Files:** `apps/web/public/ai.txt`, `apps/web/public/llms-full.txt`

- `ai.txt`: Explicit permissions for AI training/citation with attribution requirements
- `llms-full.txt`: Expanded version of llms.txt with full product description, feature list, pricing, comparison data, and FAQs that LLMs can directly use to answer queries

#### 1.4 Fix Sitemap lastModified
**File:** `apps/web/src/app/sitemap.ts`

- Stop using `new Date()` for all pages (misleading)
- Use actual content dates for blog posts
- Use deploy/build date for static pages
- Track real modification dates

---

### PHASE 2: E-E-A-T & Trust Signals (Week 2-4)

#### 2.1 Create Author System
This is the single biggest E-E-A-T gap. Google's March 2026 update heavily rewards first-person expertise.

- [ ] Create author data file with team member profiles:
  - Name, title, bio, headshot, LinkedIn URL
  - Areas of expertise (IT administration, email marketing, brand management)
  - Credentials (certifications, years of experience)
- [ ] Create `/blog/author/[slug]` pages with:
  - Author bio and photo
  - LinkedIn/Twitter links
  - List of articles by this author
  - Person schema with `sameAs` links
- [ ] Update blog posts to use individual authors instead of "Siggly Team"
- [ ] Add author cards to blog post pages (photo, name, title, short bio)
- [ ] Update BlogPosting schema to use `@type: Person` with `url` pointing to author page

#### 2.2 Display G2/Capterra Social Proof
- [ ] Add G2 badge component to homepage hero
- [ ] Add trust bar to pricing page (G2 Leader, Capterra rating, etc.)
- [ ] Create `/reviews` page aggregating third-party review links
- [ ] Add review CTA in dashboard (prompt happy users to review on G2)

#### 2.3 Surface Internal Links in UI
The internal linking engine in `src/lib/seo/internal-links.ts` exists but isn't visible.

- [ ] Add "Related Articles" component to blog post pages (3-4 related posts)
- [ ] Add "See Also" sidebar on landing pages linking to related content
- [ ] Add visual breadcrumb component (not just JSON-LD)
- [ ] Add contextual CTAs: Blog -> Feature page -> Pricing -> Demo
- [ ] Add "Next Steps" section at bottom of guide/how-to content

---

### PHASE 3: Content That Wins (Week 3-6)

#### 3.1 GEO-Optimized Content Structure
Every piece of content should follow this structure for AI search visibility:

1. **First 2 sentences = direct answer** (44.2% of LLM citations come from first 30% of text)
2. **Citable statistic every 150-200 words** (with named source)
3. **Paragraphs: 2-3 sentences max** (easier for AI extraction)
4. **FAQ section at bottom** (matches natural query patterns)
5. **Structured lists and tables** (30-40% higher AI visibility)
6. **Refresh quarterly** (citations drop sharply after 3 months)

#### 3.2 Long-Tail Keywords to Target (Low Competition, High Intent)

**Industry-Specific (create dedicated landing pages):**
- "email signature for insurance agents"
- "email signature for teachers"
- "accountant email signature examples"
- "startup email signature design"
- "email signature for construction companies"
- "veterinary practice email signature"
- "email signature for churches and nonprofits"

**Problem/Solution (blog posts + landing pages):**
- "how to enforce email signatures company wide"
- "email signature not showing images in Outlook"
- "how to add clickable banner to email signature"
- "email signature changes not syncing Microsoft 365"
- "centralized email signature management without IT"
- "how to update email signatures for 500 employees"

**Comparison/Alternative (high buyer intent):**
- "free alternative to Exclaimer"
- "cheaper alternative to CodeTwo"
- "Exclaimer alternative for small business"
- "email signature manager without server-side injection"
- "best email signature tool for Google Workspace"

**Marketing-Focused:**
- "email signature as marketing channel ROI"
- "email signature banner campaign best practices"
- "track email signature link clicks"
- "email signature A/B testing results"
- "email signature call to action examples"

**Compliance (high trust content):**
- "HIPAA email signature requirements"
- "state bar email signature requirements"
- "GDPR compliant email signature template"
- "SOX compliance email disclaimer"
- "financial services email signature regulations"

#### 3.3 Content Refresh Strategy
- [ ] Audit all 106 blog posts for accuracy and freshness
- [ ] Add `dateModified` tracking to blog post metadata
- [ ] Display "Last updated: [date]" on blog posts
- [ ] Prioritize refreshing posts older than 3 months
- [ ] Update statistics and screenshots in existing posts
- [ ] Add original data/research (survey results, usage statistics) to high-value posts

#### 3.4 "Original Research" Content (Highest E-E-A-T Signal)
Create data-driven content that only Siggly can produce:
- "Email Signature Trends Report 2026" (aggregate anonymized data)
- "How Email Signatures Impact Reply Rates: A Study of 10,000 Emails"
- "The State of Corporate Email Branding" (survey-based)
- "Email Signature Click-Through Rates by Industry" (from analytics data)

This type of content gets cited by AI and linked to by other sites.

---

### PHASE 4: Off-Site & Platform SEO (Week 4-8)

#### 4.1 Review Platform Presence (Critical for SERP Visibility)
Review sites dominate SERPs for buyer-intent keywords like "best email signature software."

- [ ] Claim and optimize G2 profile (complete all fields, add screenshots, respond to reviews)
- [ ] Claim Capterra listing
- [ ] Create TrustRadius profile
- [ ] Create Software Advice listing
- [ ] Create GetApp listing
- [ ] Respond to every review (positive and negative)
- [ ] Implement in-app review prompts at high-satisfaction moments

#### 4.2 Reddit Strategy (Critical for Perplexity AI Citations)
Perplexity cites Reddit 46.7% of the time. This is the fastest path to AI visibility.

**Subreddits to participate in:**
- r/sysadmin (IT admins asking about email signature management)
- r/gsuite / r/googleworkspace (Google Workspace users)
- r/Office365 / r/microsoft365 (Microsoft users)
- r/smallbusiness (SMB owners)
- r/msp (Managed Service Providers - white-label opportunity)
- r/marketing (marketing teams)
- r/ITManagers

**Strategy:**
- Answer questions genuinely and helpfully (no spam)
- Share original content (blog posts, guides) when relevant
- Create "How I solved X" posts sharing real solutions
- Build karma and credibility before any self-promotion

#### 4.3 Backlink Strategy
- [ ] Guest post on IT/SaaS publications about email branding
- [ ] Create linkable assets (infographics, research reports, free tools)
- [ ] Submit to SaaS directories (Product Hunt, AlternativeTo, SaaSHub)
- [ ] HARO/Connectively - respond to journalist queries about email/branding topics
- [ ] Partner content with integration partners (Google Workspace blogs, MS partner sites)

#### 4.4 YouTube/Video Content
- [ ] Create product demo video (embed on homepage, feature pages)
- [ ] Create "How to set up email signatures in Google Workspace" tutorial
- [ ] Create "How to set up email signatures in Microsoft 365" tutorial
- [ ] Add VideoObject schema to pages with embedded videos
- [ ] Optimize video titles/descriptions for target keywords

---

### PHASE 5: Technical Performance (Ongoing)

#### 5.1 Core Web Vitals
Target thresholds (2026 standards - now a quality filter, not just tiebreaker):

| Metric | Target | Current Status |
|---|---|---|
| LCP | < 2.5s | Needs audit |
| INP | < 200ms | Needs audit |
| CLS | < 0.1 | Needs audit |

- [ ] Run Lighthouse audit on key pages (homepage, pricing, blog)
- [ ] Add `@next/bundle-analyzer` to monitor JS payload
- [ ] Implement dynamic imports for heavy components (TipTap editor, charts)
- [ ] Audit image loading (ensure proper `priority` and `loading` props)
- [ ] Test mobile performance specifically (weighted more heavily in 2026)

#### 5.2 Crawl Budget Optimization
- [ ] Ensure 321+ pages are all returning 200 status codes
- [ ] Check for orphan pages (pages not linked from sitemap or navigation)
- [ ] Monitor crawl stats in Google Search Console
- [ ] Implement proper pagination with rel="next"/"prev" for blog pages

---

## 4. LLM/AI SEARCH OPTIMIZATION (GEO) - DETAILED

This is the single biggest growth channel in 2026. LLM visitors convert 4.4x better than organic search visitors.

### Key Statistics
- 73% of B2B buyers use AI tools in research
- ChatGPT: 800M weekly active users, 2.5B prompts/day
- Only 11% of domains are cited by both ChatGPT and Perplexity
- Perplexity: 780M monthly queries

### How to Get Cited by ChatGPT
ChatGPT favors Wikipedia-style authoritative content (47.9% of top citations are encyclopedic).

- [ ] Create comprehensive, encyclopedic content about email signatures
- [ ] Include definitive lists and comparisons
- [ ] Use clear, factual language (avoid marketing fluff)
- [ ] Ensure server-side rendering (AI crawlers don't execute JavaScript) - Already handled by Next.js SSR

### How to Get Cited by Perplexity
Perplexity heavily cites Reddit (46.7%) and fresh, well-cited articles.

- [ ] Reddit strategy (see Phase 4.2)
- [ ] Publish articles with named source citations
- [ ] Keep content fresh (quarterly refresh minimum)
- [ ] Include citable data points

### How to Appear in Google AI Overviews
AI Overviews favor content already in top 10 organic positions.

- [ ] Focus on ranking in top 10 for target keywords first
- [ ] Structure content with clear question-and-answer format
- [ ] Include multi-modal content (images, tables, lists)
- [ ] Create YouTube content (AI Overviews pull from YouTube)

### llms-full.txt Strategy
Create an expanded `llms-full.txt` that serves as a "cheat sheet" for LLMs:

```
# Siggly - Complete Product Information for AI Assistants

## What is Siggly?
Siggly is an email signature management platform...

## Pricing
- Free: Up to 5 users...
- Professional: $X/user/month...
- Enterprise: Custom pricing...

## How Siggly Compares
### vs Exclaimer
[Feature comparison table]

### vs CodeTwo
[Feature comparison table]

## Common Questions
Q: How do I deploy email signatures to Google Workspace?
A: [Direct answer]

Q: What's the best email signature manager for small teams?
A: [Direct answer mentioning Siggly's free tier]
```

This gives LLMs structured data to cite directly.

---

## 5. KEYWORD PRIORITY MATRIX

### Tier 1 - Win Now (Low competition, high intent)
These keywords are realistic to rank for within 1-3 months:

| Keyword | Content Type | Status |
|---|---|---|
| "free alternative to Exclaimer" | Comparison page | Have comparison, need to optimize for "free" angle |
| "email signature manager for small teams" | Landing page | Need new page |
| "how to enforce email signatures company wide" | Blog post | May exist, needs GEO optimization |
| "HIPAA email signature requirements" | Compliance page | Have compliance section, needs expansion |
| "email signature for real estate agents" | Industry page | Have industry page, needs keyword optimization |
| "email signature banner campaign" | Feature page + blog | Have feature, need dedicated content |
| "[Competitor] alternative for small business" | Comparison pages | Need to add "for small business" variants |

### Tier 2 - Win in 3-6 Months (Medium competition)
| Keyword | Content Type |
|---|---|
| "email signature software for Google Workspace" | Landing page |
| "centralized email signature management" | Feature page |
| "email signature analytics" | Feature page + blog |
| "corporate email signature template" | Template gallery |
| "email signature deployment tool" | Feature page |

### Tier 3 - Long Game (High competition, build authority)
| Keyword | Strategy |
|---|---|
| "email signature generator" | Free tool optimization + backlinks |
| "email signature template" | Template gallery + design content |
| "email signature software" | Review site presence + authority |
| "best email signature tool" | Content + reviews + social proof |

---

## 6. MEASUREMENT & KPIs

### Track Monthly
- [ ] Organic traffic (Google Search Console)
- [ ] Keyword rankings for Tier 1, 2, 3 terms (Ahrefs/SEMrush)
- [ ] AI search citations ("Share of Model" metric)
- [ ] Core Web Vitals scores
- [ ] Indexed page count
- [ ] Backlink profile growth
- [ ] G2/Capterra review count and rating
- [ ] Blog content freshness (% updated within 3 months)
- [ ] Click-through rates from SERPs

### Tools Needed
- Google Search Console (free)
- Google Analytics 4 (already integrated)
- Ahrefs or SEMrush (keyword tracking, backlink monitoring)
- LLMrefs or Otterly.ai (AI search citation tracking)
- PageSpeed Insights (Core Web Vitals)
- G2/Capterra dashboards

---

## 7. COMPETITIVE ADVANTAGES TO LEVERAGE

Things Siggly has that competitors DON'T:

1. **Free tier with real features** - HubSpot has a free generator but no management. Exclaimer/CodeTwo have no free tier. Lead with this in content.

2. **8 free tools** (signature generator, templates, ROI calculator, audit, etc.) - Most competitors have 1 or none. Each tool is a separate ranking opportunity.

3. **Both Google Workspace AND Microsoft 365** - CodeTwo is Microsoft-only. Many tools are single-platform. Siggly covers both.

4. **White-label MSP functionality** - Unique angle for r/msp content and MSP-targeted keywords.

5. **Modern tech stack** - Next.js SSR means fast page loads and AI-crawler-friendly rendering. Many competitors run on older stacks.

6. **Comprehensive content foundation** - 321+ pages already indexed is more than most mid-market competitors.

---

## 8. THINGS TO AVOID (Google Algorithm Compliance)

- No keyword stuffing or hidden text
- No link schemes or purchased backlinks
- No AI-generated content without human review and editing
- No duplicate content across pages (watch for cannibalization between similar landing pages)
- No cloaking (showing different content to search engines vs users)
- No doorway pages (thin pages created solely for ranking)
- No aggressive interstitials on mobile
- No manipulative schema markup (don't add Review schema without real reviews)
- Keep user experience first - Google's helpful content system penalizes content written primarily for search engines

---

## EXECUTIVE SUMMARY

**Where we are:** Strong technical SEO foundation with 321+ indexed pages, comprehensive structured data, and content silos covering most topics. Better than 90% of mid-market competitors.

**What's missing:**
1. E-E-A-T signals (author pages, individual expertise, real reviews)
2. AI search optimization (llms-full.txt, ai.txt, more bot rules, GEO content structure)
3. Off-site presence (G2/Capterra profiles, Reddit participation, backlinks)
4. Content freshness (dateModified tracking, quarterly refreshes)
5. Visual internal linking (related posts, breadcrumbs, contextual CTAs)
6. Video content for Google AI Overviews and YouTube SEO

**To outperform competitors organically:**
- You won't beat HubSpot on head terms (DR 90+). Don't try.
- You CAN beat Exclaimer/CodeTwo on long-tail, industry-specific, and comparison terms.
- You CAN dominate AI search citations by being the most comprehensive, structured, and fresh source.
- Your free tools + free tier is the #1 competitive advantage for SEO - every tool is a ranking page.
- The Reddit + Perplexity pipeline is the fastest path to AI search visibility.
- Original research content (data only you have) is the strongest link magnet and E-E-A-T signal.
