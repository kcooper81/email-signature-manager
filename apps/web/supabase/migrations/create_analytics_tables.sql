-- Create analytics tables for click tracking and campaign performance

-- Signature clicks table
CREATE TABLE IF NOT EXISTS signature_clicks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  template_id UUID REFERENCES signature_templates(id) ON DELETE SET NULL,
  
  -- Click details
  link_url TEXT NOT NULL,
  link_type TEXT, -- 'calendly', 'linkedin', 'banner', 'button', 'custom'
  
  -- Campaign tracking
  campaign_name TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  
  -- Metadata
  user_agent TEXT,
  ip_address INET,
  referrer TEXT,
  
  clicked_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  
  -- Indexes for performance
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_signature_clicks_org ON signature_clicks(organization_id);
CREATE INDEX IF NOT EXISTS idx_signature_clicks_user ON signature_clicks(user_id);
CREATE INDEX IF NOT EXISTS idx_signature_clicks_template ON signature_clicks(template_id);
CREATE INDEX IF NOT EXISTS idx_signature_clicks_date ON signature_clicks(clicked_at);
CREATE INDEX IF NOT EXISTS idx_signature_clicks_campaign ON signature_clicks(campaign_name) WHERE campaign_name IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_signature_clicks_link_type ON signature_clicks(link_type);

-- Signature impressions table (optional - for email open tracking)
CREATE TABLE IF NOT EXISTS signature_impressions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  template_id UUID REFERENCES signature_templates(id) ON DELETE SET NULL,
  
  -- Metadata
  user_agent TEXT,
  ip_address INET,
  
  viewed_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_signature_impressions_org ON signature_impressions(organization_id);
CREATE INDEX IF NOT EXISTS idx_signature_impressions_user ON signature_impressions(user_id);
CREATE INDEX IF NOT EXISTS idx_signature_impressions_template ON signature_impressions(template_id);
CREATE INDEX IF NOT EXISTS idx_signature_impressions_date ON signature_impressions(viewed_at);

-- Add comments
COMMENT ON TABLE signature_clicks IS 'Tracks clicks on links in email signatures for analytics and ROI measurement';
COMMENT ON TABLE signature_impressions IS 'Tracks signature views/impressions for engagement metrics';

COMMENT ON COLUMN signature_clicks.link_type IS 'Type of link clicked: calendly, linkedin, banner, button, custom';
COMMENT ON COLUMN signature_clicks.campaign_name IS 'Campaign name from signature rules or banner campaigns';
COMMENT ON COLUMN signature_clicks.utm_source IS 'UTM source parameter for Google Analytics integration';
