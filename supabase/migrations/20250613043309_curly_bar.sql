/*
  # Add admin write policies for destinations and related tables

  1. New Policies
    - Add INSERT, UPDATE, DELETE policies for authenticated users on all destination-related tables
    - Fix storage policies for proper admin access

  2. Security
    - Allow authenticated users (admins) to perform write operations
    - Maintain public read access for all users
*/

-- Add admin write policies for destinations table
CREATE POLICY "Admin write access for destinations"
  ON destinations FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin update access for destinations"
  ON destinations FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin delete access for destinations"
  ON destinations FOR DELETE
  TO authenticated
  USING (true);

-- Add admin write policies for destination_highlights table
CREATE POLICY "Admin write access for destination_highlights"
  ON destination_highlights FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin update access for destination_highlights"
  ON destination_highlights FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin delete access for destination_highlights"
  ON destination_highlights FOR DELETE
  TO authenticated
  USING (true);

-- Add admin write policies for destination_activities table
CREATE POLICY "Admin write access for destination_activities"
  ON destination_activities FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin update access for destination_activities"
  ON destination_activities FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin delete access for destination_activities"
  ON destination_activities FOR DELETE
  TO authenticated
  USING (true);

-- Add admin write policies for destination_gallery table
CREATE POLICY "Admin write access for destination_gallery"
  ON destination_gallery FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin update access for destination_gallery"
  ON destination_gallery FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin delete access for destination_gallery"
  ON destination_gallery FOR DELETE
  TO authenticated
  USING (true);

-- Add admin write policies for destination_amenities table
CREATE POLICY "Admin write access for destination_amenities"
  ON destination_amenities FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin update access for destination_amenities"
  ON destination_amenities FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin delete access for destination_amenities"
  ON destination_amenities FOR DELETE
  TO authenticated
  USING (true);

-- Add admin write policies for itineraries table
CREATE POLICY "Admin write access for itineraries"
  ON itineraries FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin update access for itineraries"
  ON itineraries FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin delete access for itineraries"
  ON itineraries FOR DELETE
  TO authenticated
  USING (true);

-- Add admin write policies for itinerary_days table
CREATE POLICY "Admin write access for itinerary_days"
  ON itinerary_days FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin update access for itinerary_days"
  ON itinerary_days FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin delete access for itinerary_days"
  ON itinerary_days FOR DELETE
  TO authenticated
  USING (true);

-- Add admin write policies for itinerary_activities table
CREATE POLICY "Admin write access for itinerary_activities"
  ON itinerary_activities FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin update access for itinerary_activities"
  ON itinerary_activities FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin delete access for itinerary_activities"
  ON itinerary_activities FOR DELETE
  TO authenticated
  USING (true);

-- Add admin write policies for local_phrases table
CREATE POLICY "Admin write access for local_phrases"
  ON local_phrases FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin update access for local_phrases"
  ON local_phrases FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin delete access for local_phrases"
  ON local_phrases FOR DELETE
  TO authenticated
  USING (true);

-- Add admin write policies for cultural_etiquette table
CREATE POLICY "Admin write access for cultural_etiquette"
  ON cultural_etiquette FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin update access for cultural_etiquette"
  ON cultural_etiquette FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin delete access for cultural_etiquette"
  ON cultural_etiquette FOR DELETE
  TO authenticated
  USING (true);

-- Fix storage policies by dropping and recreating them with correct permissions
DROP POLICY IF EXISTS "Admin write access for destination images" ON storage.objects;
DROP POLICY IF EXISTS "Admin update access for destination images" ON storage.objects;
DROP POLICY IF EXISTS "Admin delete access for destination images" ON storage.objects;

-- Create proper storage policies for authenticated users
CREATE POLICY "Admin write access for destination images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'destination-images');

CREATE POLICY "Admin update access for destination images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'destination-images')
  WITH CHECK (bucket_id = 'destination-images');

CREATE POLICY "Admin delete access for destination images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'destination-images');