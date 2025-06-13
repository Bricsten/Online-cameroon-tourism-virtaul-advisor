/*
  # Create saved_destinations table

  1. New Tables
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

  2. Security
    - Enable RLS on saved_destinations table
    - Add policies for authenticated users to manage their own saved destinations
*/

-- Drop table if it exists to recreate with proper structure
DROP TABLE IF EXISTS saved_destinations;

-- Create saved destinations table
CREATE TABLE saved_destinations (
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

-- Enable RLS
ALTER TABLE saved_destinations ENABLE ROW LEVEL SECURITY;

-- Create policies for saved destinations
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

CREATE POLICY "Users can update their saved destinations"
  ON saved_destinations
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_saved_destinations_user_id ON saved_destinations(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_destinations_destination_id ON saved_destinations(destination_id);
CREATE INDEX IF NOT EXISTS idx_saved_destinations_created_at ON saved_destinations(created_at);

-- Grant necessary permissions
GRANT ALL ON saved_destinations TO authenticated;
GRANT ALL ON saved_destinations TO service_role;