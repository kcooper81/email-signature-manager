-- Add is_active column to provider_connections if it doesn't exist
ALTER TABLE provider_connections ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true;

-- Rename expires_at to token_expires_at if needed (may fail if already renamed)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'provider_connections' AND column_name = 'expires_at') THEN
    ALTER TABLE provider_connections RENAME COLUMN expires_at TO token_expires_at;
  END IF;
END $$;

-- Make token_expires_at nullable (tokens may not always have expiry)
ALTER TABLE provider_connections ALTER COLUMN token_expires_at DROP NOT NULL;

-- Make connected_by nullable (we may not have user record yet during OAuth)
ALTER TABLE provider_connections ALTER COLUMN connected_by DROP NOT NULL;

-- Add unique constraint for upsert if not exists
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'provider_connections_org_provider_unique') THEN
    ALTER TABLE provider_connections ADD CONSTRAINT provider_connections_org_provider_unique UNIQUE (organization_id, provider);
  END IF;
END $$;
