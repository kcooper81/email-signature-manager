-- SEO Auto-Optimization Engine Tables
-- These tables power the internal SEO engine for content optimization,
-- competitor intelligence, and automated content generation.

-- 1. Engine settings (super admin configurable)
CREATE TABLE IF NOT EXISTS seo_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  claude_api_enabled boolean NOT NULL DEFAULT false,
  auto_run_enabled boolean NOT NULL DEFAULT false,
  auto_run_min_confidence numeric NOT NULL DEFAULT 0.85,
  serper_api_key_set boolean NOT NULL DEFAULT false,
  competitors jsonb NOT NULL DEFAULT '[]'::jsonb,
  daily_serp_query_limit int NOT NULL DEFAULT 50,
  auto_run_types text[] NOT NULL DEFAULT ARRAY['meta_title', 'meta_description']::text[],
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Insert default settings row
INSERT INTO seo_settings (id) VALUES (gen_random_uuid())
ON CONFLICT DO NOTHING;

-- 2. Daily page metrics from Search Console + GA4
CREATE TABLE IF NOT EXISTS seo_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  snapshot_date date NOT NULL,
  page_url text NOT NULL,
  clicks int NOT NULL DEFAULT 0,
  impressions int NOT NULL DEFAULT 0,
  ctr numeric NOT NULL DEFAULT 0,
  position numeric NOT NULL DEFAULT 0,
  top_queries jsonb DEFAULT '[]'::jsonb,
  sessions int NOT NULL DEFAULT 0,
  bounce_rate numeric NOT NULL DEFAULT 0,
  avg_engagement_time numeric NOT NULL DEFAULT 0,
  meta_title text,
  meta_description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(snapshot_date, page_url)
);

CREATE INDEX IF NOT EXISTS idx_seo_snapshots_page_url ON seo_snapshots(page_url);
CREATE INDEX IF NOT EXISTS idx_seo_snapshots_date ON seo_snapshots(snapshot_date DESC);

-- 3. Competitor SERP rankings
CREATE TABLE IF NOT EXISTS competitor_rankings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  keyword text NOT NULL,
  our_position int,
  our_url text,
  competitors jsonb NOT NULL DEFAULT '[]'::jsonb,
  serp_features jsonb DEFAULT '{}'::jsonb,
  search_volume_bucket text DEFAULT 'low',
  captured_at timestamptz NOT NULL DEFAULT now(),
  captured_date date NOT NULL DEFAULT CURRENT_DATE,
  UNIQUE(keyword, captured_date)
);
CREATE INDEX IF NOT EXISTS idx_competitor_rankings_keyword ON competitor_rankings(keyword);
CREATE INDEX IF NOT EXISTS idx_competitor_rankings_captured ON competitor_rankings(captured_at DESC);

-- 4. Detected SEO problems
CREATE TABLE IF NOT EXISTS seo_issues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_url text NOT NULL,
  issue_type text NOT NULL,
  severity text NOT NULL CHECK (severity IN ('critical', 'high', 'medium', 'low')),
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'resolved', 'dismissed')),
  details jsonb DEFAULT '{}'::jsonb,
  first_detected_at timestamptz NOT NULL DEFAULT now(),
  last_detected_at timestamptz NOT NULL DEFAULT now(),
  resolved_at timestamptz
);

CREATE INDEX IF NOT EXISTS idx_seo_issues_status ON seo_issues(status);
CREATE INDEX IF NOT EXISTS idx_seo_issues_severity ON seo_issues(severity);
CREATE INDEX IF NOT EXISTS idx_seo_issues_page ON seo_issues(page_url);

-- 5. Suggested changes (the action queue)
CREATE TABLE IF NOT EXISTS seo_recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_url text,
  recommendation_type text NOT NULL,
  current_value jsonb,
  suggested_value jsonb,
  ai_enhanced_value jsonb,
  rationale text,
  confidence numeric NOT NULL DEFAULT 0.5,
  data_basis jsonb DEFAULT '{}'::jsonb,
  admin_notes text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'applied', 'dismissed', 'rolled_back')),
  applied_by text,
  created_at timestamptz NOT NULL DEFAULT now(),
  applied_at timestamptz
);

CREATE INDEX IF NOT EXISTS idx_seo_recommendations_status ON seo_recommendations(status);
CREATE INDEX IF NOT EXISTS idx_seo_recommendations_type ON seo_recommendations(recommendation_type);
CREATE INDEX IF NOT EXISTS idx_seo_recommendations_page ON seo_recommendations(page_url);

-- 6. Active content overrides (applied recommendations)
CREATE TABLE IF NOT EXISTS seo_content_overrides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_url text NOT NULL UNIQUE,
  meta_title text,
  meta_description text,
  meta_keywords text[],
  additional_faqs jsonb,
  additional_sections jsonb,
  internal_links jsonb,
  override_hero jsonb,
  override_features jsonb,
  is_active boolean NOT NULL DEFAULT true,
  recommendation_id uuid REFERENCES seo_recommendations(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_seo_content_overrides_url ON seo_content_overrides(page_url);
CREATE INDEX IF NOT EXISTS idx_seo_content_overrides_active ON seo_content_overrides(is_active) WHERE is_active = true;

-- 7. Auto-generated new pages
CREATE TABLE IF NOT EXISTS seo_generated_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  slug text NOT NULL,
  page_data jsonb NOT NULL,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  source_keywords text[],
  recommendation_id uuid REFERENCES seo_recommendations(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  published_at timestamptz,
  UNIQUE(category, slug)
);

CREATE INDEX IF NOT EXISTS idx_seo_generated_pages_status ON seo_generated_pages(status);
CREATE INDEX IF NOT EXISTS idx_seo_generated_pages_category ON seo_generated_pages(category);

-- 8. Full audit trail
CREATE TABLE IF NOT EXISTS seo_change_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  action text NOT NULL,
  page_url text,
  before_value jsonb,
  after_value jsonb,
  recommendation_id uuid,
  performed_by text NOT NULL DEFAULT 'system',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_seo_change_log_action ON seo_change_log(action);
CREATE INDEX IF NOT EXISTS idx_seo_change_log_page ON seo_change_log(page_url);
CREATE INDEX IF NOT EXISTS idx_seo_change_log_created ON seo_change_log(created_at DESC);

-- RLS: These tables are super-admin only, accessed via service client.
-- No RLS policies needed since all access goes through service role.
-- Enable RLS but with no policies = no access via anon/authenticated roles.
ALTER TABLE seo_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitor_rankings ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_content_overrides ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_generated_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_change_log ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read content overrides and generated pages
-- (needed for rendering on the public site)
CREATE POLICY "Anyone can read active content overrides"
  ON seo_content_overrides FOR SELECT
  USING (is_active = true);

CREATE POLICY "Anyone can read published generated pages"
  ON seo_generated_pages FOR SELECT
  USING (status = 'published');
