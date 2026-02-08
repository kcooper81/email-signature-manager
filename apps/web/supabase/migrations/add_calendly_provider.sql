-- Add Calendly to the email_provider enum
-- This allows storing Calendly OAuth connections in provider_connections table

DO $$ 
BEGIN
  -- Check if 'calendly' value doesn't already exist in the enum
  IF NOT EXISTS (
    SELECT 1 
    FROM pg_enum 
    WHERE enumlabel = 'calendly' 
    AND enumtypid = (
      SELECT oid 
      FROM pg_type 
      WHERE typname = 'email_provider'
    )
  ) THEN
    ALTER TYPE email_provider ADD VALUE 'calendly';
  END IF;
END $$;

-- Add metadata column to provider_connections if it doesn't exist
-- This stores Calendly-specific data like event types and scheduling URLs
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'provider_connections' 
    AND column_name = 'metadata'
  ) THEN
    ALTER TABLE provider_connections 
    ADD COLUMN metadata JSONB;
  END IF;
END $$;

-- Add is_active column to provider_connections if it doesn't exist
-- This allows soft-disabling connections without deleting them
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'provider_connections' 
    AND column_name = 'is_active'
  ) THEN
    ALTER TABLE provider_connections 
    ADD COLUMN is_active BOOLEAN DEFAULT true NOT NULL;
  END IF;
END $$;

-- Create index on provider_connections for faster lookups
CREATE INDEX IF NOT EXISTS idx_provider_connections_org_provider 
ON provider_connections(organization_id, provider);

CREATE INDEX IF NOT EXISTS idx_provider_connections_active 
ON provider_connections(organization_id, provider, is_active);

-- Add comment explaining Calendly metadata structure
COMMENT ON COLUMN provider_connections.metadata IS 
'Provider-specific metadata stored as JSONB. For Calendly: 
{
  "calendly_user_uri": "https://api.calendly.com/users/XXXXXX",
  "scheduling_url": "https://calendly.com/username",
  "event_types": [
    {
      "uri": "https://api.calendly.com/event_types/XXXXXX",
      "name": "30 Minute Meeting",
      "slug": "30min",
      "scheduling_url": "https://calendly.com/username/30min",
      "duration": 30,
      "active": true
    }
  ],
  "default_event_type_uri": "https://api.calendly.com/event_types/XXXXXX"
}';
