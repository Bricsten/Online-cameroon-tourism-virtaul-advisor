/*
  # Fix reviews table schema

  1. Updates to reviews table
    - Ensure all required columns exist for review functionality
    - Add title, travel_date, travel_type, helpful_count columns if missing
    - Update existing reviews to have default values for new columns

  2. Security
    - Maintain existing RLS policies
*/

-- Add missing columns to reviews table if they don't exist
DO $$
BEGIN
  -- Add title column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'reviews' AND column_name = 'title'
  ) THEN
    ALTER TABLE reviews ADD COLUMN title text;
    -- Update existing reviews to have a default title
    UPDATE reviews SET title = 'Review' WHERE title IS NULL;
    -- Make title NOT NULL after setting defaults
    ALTER TABLE reviews ALTER COLUMN title SET NOT NULL;
  END IF;

  -- Add travel_date column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'reviews' AND column_name = 'travel_date'
  ) THEN
    ALTER TABLE reviews ADD COLUMN travel_date text;
  END IF;

  -- Add travel_type column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'reviews' AND column_name = 'travel_type'
  ) THEN
    ALTER TABLE reviews ADD COLUMN travel_type text;
  END IF;

  -- Add helpful_count column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'reviews' AND column_name = 'helpful_count'
  ) THEN
    ALTER TABLE reviews ADD COLUMN helpful_count integer DEFAULT 0;
  END IF;
END $$;

-- Create or replace function to increment helpful count
CREATE OR REPLACE FUNCTION increment_helpful_count(review_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE reviews 
  SET helpful_count = helpful_count + 1 
  WHERE id = review_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Ensure indexes exist for better performance
CREATE INDEX IF NOT EXISTS idx_reviews_destination_id ON reviews(destination_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);