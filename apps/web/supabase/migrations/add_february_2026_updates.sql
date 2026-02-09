-- Add February 8, 2026 feature updates to releases
-- This adds the dynamic help articles system and help center improvements

DO $$
DECLARE
  release_uuid UUID;
BEGIN
  -- Check if release already exists
  SELECT id INTO release_uuid FROM feature_releases WHERE version = '2.0.0';
  
  -- If release exists, add new items
  IF release_uuid IS NOT NULL THEN
    INSERT INTO feature_release_items (release_id, title, description, category, icon, link_url, link_text, sort_order) VALUES
    (release_uuid, 'Dynamic Help Articles System', 'Help center now features a complete article management system with step-by-step guides, FAQs, and tutorials. Articles are stored in the database and can be managed through the admin panel.', 'feature', 'FileText', '/help', 'Browse Help Center', 9),
    (release_uuid, 'Unified Support & Help Pages', 'Both /help and /support URLs now provide the same comprehensive help content. All help articles are accessible via clean URLs like /help/google-workspace-setup.', 'improvement', 'Sparkles', '/help', 'View Help', 10),
    (release_uuid, 'Calendly Integration Help Docs', 'Added 5 comprehensive help articles covering Calendly integration: connection setup, adding links to signatures, managing event types, troubleshooting, and best practices.', 'improvement', 'FileText', '/help/connect-calendly-integration', 'Read Guide', 11);
  END IF;
END $$;
