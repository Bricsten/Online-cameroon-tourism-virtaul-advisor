/*
  # Add user functionality tables

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `destination_id` (text, references destinations slug)
      - `destination_name` (text)
      - `destination_image` (text)
      - `travel_date` (date)
      - `number_of_travelers` (integer)
      - `special_requests` (text)
      - `contact_info` (jsonb)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `saved_destinations`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `destination_id` (text, references destinations slug)
      - `destination_name` (text)
      - `destination_image` (text)
      - `destination_location` (text)
      - `destination_category` (text)
      - `notes` (text)
      - `created_at` (timestamp)

  2. Updates to existing tables
    - Add missing columns to `reviews` table
    - Add helpful_count column and function

  3. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  destination_id text NOT NULL,
  destination_name text NOT NULL,
  destination_image text NOT NULL,
  travel_date date NOT NULL,
  number_of_travelers integer NOT NULL DEFAULT 1,
  special_requests text,
  contact_info jsonb NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create saved destinations table
CREATE TABLE IF NOT EXISTS saved_destinations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  destination_id text NOT NULL,
  destination_name text NOT NULL,
  destination_image text NOT NULL,
  destination_location text NOT NULL,
  destination_category text NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, destination_id)
);

-- Add missing columns to reviews table if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'reviews' AND column_name = 'title'
  ) THEN
    ALTER TABLE reviews ADD COLUMN title text NOT NULL DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'reviews' AND column_name = 'travel_date'
  ) THEN
    ALTER TABLE reviews ADD COLUMN travel_date text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'reviews' AND column_name = 'travel_type'
  ) THEN
    ALTER TABLE reviews ADD COLUMN travel_type text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'reviews' AND column_name = 'helpful_count'
  ) THEN
    ALTER TABLE reviews ADD COLUMN helpful_count integer DEFAULT 0;
  END IF;
END $$;

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_destinations ENABLE ROW LEVEL SECURITY;

-- Bookings policies
CREATE POLICY "Users can view their own bookings"
  ON bookings
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings"
  ON bookings
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can update all bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (true);

-- Saved destinations policies
CREATE POLICY "Users can view their own saved destinations"
  ON saved_destinations
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can save destinations"
  ON saved_destinations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their saved destinations"
  ON saved_destinations
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to increment helpful count
CREATE OR REPLACE FUNCTION increment_helpful_count(review_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE reviews 
  SET helpful_count = helpful_count + 1 
  WHERE id = review_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_destination_id ON bookings(destination_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_saved_destinations_user_id ON saved_destinations(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_destinations_destination_id ON saved_destinations(destination_id);
CREATE INDEX IF NOT EXISTS idx_reviews_destination_id ON reviews(destination_id);

-- Create triggers for updated_at
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();