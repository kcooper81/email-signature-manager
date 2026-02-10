-- Create the signature-assets storage bucket for banner images and other assets
-- This bucket is public so images can be accessed via URL in email signatures

-- Note: Supabase storage buckets are typically created via the dashboard or API
-- This migration documents the required bucket configuration

-- Required bucket: signature-assets
-- Settings:
--   - Public: true (images need to be accessible via URL)
--   - File size limit: 5MB
--   - Allowed MIME types: image/png, image/jpeg, image/gif, image/webp, image/svg+xml

-- To create via Supabase Dashboard:
-- 1. Go to Storage in the left sidebar
-- 2. Click "New bucket"
-- 3. Name: signature-assets
-- 4. Check "Public bucket"
-- 5. Save

-- Storage policies for the bucket (run these after creating the bucket):

-- Allow authenticated users to upload files
INSERT INTO storage.buckets (id, name, public)
VALUES ('signature-assets', 'signature-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Policy: Allow authenticated users to upload
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'signature-assets');

-- Policy: Allow authenticated users to update their uploads
CREATE POLICY "Allow authenticated updates"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'signature-assets');

-- Policy: Allow authenticated users to delete their uploads
CREATE POLICY "Allow authenticated deletes"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'signature-assets');

-- Policy: Allow public read access (needed for email signatures)
CREATE POLICY "Allow public read"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'signature-assets');
