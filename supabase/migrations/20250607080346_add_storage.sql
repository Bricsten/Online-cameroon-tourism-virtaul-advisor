-- Create storage bucket for destination images
INSERT INTO storage.buckets (id, name, public) VALUES ('destination-images', 'destination-images', true);

-- Set up storage policies
CREATE POLICY "Public read access for destination images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'destination-images');

CREATE POLICY "Admin write access for destination images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'destination-images' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Admin update access for destination images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'destination-images' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Admin delete access for destination images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'destination-images' AND
    auth.role() = 'authenticated'
  ); 