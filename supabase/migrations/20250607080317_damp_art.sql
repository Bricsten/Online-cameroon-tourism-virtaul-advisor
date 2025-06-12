/*
  # Create comprehensive destinations and tourism database schema

  1. New Tables
    - `destinations`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `slug` (text, unique for URLs)
      - `location` (text)
      - `description` (text)
      - `category` (text)
      - `image_url` (text)
      - `rating` (decimal)
      - `review_count` (integer)
      - `coordinates` (point - PostGIS)
      - `recommended_stay` (text)
      - `budget_range` (text)
      - `best_time_to_visit` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `destination_highlights`
      - `id` (uuid, primary key)
      - `destination_id` (uuid, references destinations)
      - `highlight` (text)
      - `order_index` (integer)
    
    - `destination_activities`
      - `id` (uuid, primary key)
      - `destination_id` (uuid, references destinations)
      - `name` (text)
      - `description` (text)
      - `duration` (text)
      - `price_xaf` (integer)
      - `category` (text)
      - `difficulty_level` (text)
    
    - `destination_gallery`
      - `id` (uuid, primary key)
      - `destination_id` (uuid, references destinations)
      - `image_url` (text)
      - `caption` (text)
      - `order_index` (integer)
    
    - `destination_amenities`
      - `id` (uuid, primary key)
      - `destination_id` (uuid, references destinations)
      - `name` (text)
      - `type` (text) -- hotel, restaurant, hospital, bank, etc.
      - `address` (text)
      - `coordinates` (point)
      - `rating` (decimal)
      - `contact_info` (jsonb)
    
    - `itineraries`
      - `id` (uuid, primary key)
      - `destination_id` (uuid, references destinations)
      - `title` (text)
      - `description` (text)
      - `duration_days` (integer)
      - `difficulty_level` (text)
      - `estimated_cost_xaf` (integer)
    
    - `itinerary_days`
      - `id` (uuid, primary key)
      - `itinerary_id` (uuid, references itineraries)
      - `day_number` (integer)
      - `title` (text)
      - `description` (text)
    
    - `itinerary_activities`
      - `id` (uuid, primary key)
      - `itinerary_day_id` (uuid, references itinerary_days)
      - `time` (text)
      - `title` (text)
      - `description` (text)
      - `order_index` (integer)
    
    - `local_phrases`
      - `id` (uuid, primary key)
      - `destination_id` (uuid, references destinations)
      - `english_phrase` (text)
      - `local_phrase` (text)
      - `language` (text)
      - `pronunciation` (text)
    
    - `cultural_etiquette`
      - `id` (uuid, primary key)
      - `destination_id` (uuid, references destinations)
      - `etiquette_tip` (text)
      - `order_index` (integer)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated admin write access
*/

-- Enable PostGIS extension for geographic data
CREATE EXTENSION IF NOT EXISTS postgis;

-- Create destinations table
CREATE TABLE IF NOT EXISTS destinations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  location text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  image_url text NOT NULL,
  rating decimal(3,2) DEFAULT 0.0,
  review_count integer DEFAULT 0,
  coordinates geography(POINT, 4326),
  recommended_stay text,
  budget_range text,
  best_time_to_visit jsonb,
  good_for text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create destination highlights table
CREATE TABLE IF NOT EXISTS destination_highlights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id uuid REFERENCES destinations ON DELETE CASCADE NOT NULL,
  highlight text NOT NULL,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create destination activities table
CREATE TABLE IF NOT EXISTS destination_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id uuid REFERENCES destinations ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text NOT NULL,
  duration text NOT NULL,
  price_xaf integer DEFAULT 0,
  category text,
  difficulty_level text,
  created_at timestamptz DEFAULT now()
);

-- Create destination gallery table
CREATE TABLE IF NOT EXISTS destination_gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id uuid REFERENCES destinations ON DELETE CASCADE NOT NULL,
  image_url text NOT NULL,
  caption text,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create destination amenities table
CREATE TABLE IF NOT EXISTS destination_amenities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id uuid REFERENCES destinations ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  type text NOT NULL,
  address text,
  coordinates geography(POINT, 4326),
  rating decimal(3,2),
  contact_info jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create itineraries table
CREATE TABLE IF NOT EXISTS itineraries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id uuid REFERENCES destinations ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  duration_days integer NOT NULL,
  difficulty_level text,
  estimated_cost_xaf integer,
  created_at timestamptz DEFAULT now()
);

-- Create itinerary days table
CREATE TABLE IF NOT EXISTS itinerary_days (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  itinerary_id uuid REFERENCES itineraries ON DELETE CASCADE NOT NULL,
  day_number integer NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create itinerary activities table
CREATE TABLE IF NOT EXISTS itinerary_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  itinerary_day_id uuid REFERENCES itinerary_days ON DELETE CASCADE NOT NULL,
  time text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create local phrases table
CREATE TABLE IF NOT EXISTS local_phrases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id uuid REFERENCES destinations ON DELETE CASCADE NOT NULL,
  english_phrase text NOT NULL,
  local_phrase text NOT NULL,
  language text NOT NULL,
  pronunciation text,
  created_at timestamptz DEFAULT now()
);

-- Create cultural etiquette table
CREATE TABLE IF NOT EXISTS cultural_etiquette (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id uuid REFERENCES destinations ON DELETE CASCADE NOT NULL,
  etiquette_tip text NOT NULL,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE destination_highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE destination_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE destination_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE destination_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE itineraries ENABLE ROW LEVEL SECURITY;
ALTER TABLE itinerary_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE itinerary_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE local_phrases ENABLE ROW LEVEL SECURITY;
ALTER TABLE cultural_etiquette ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access for destinations"
  ON destinations FOR SELECT USING (true);

CREATE POLICY "Public read access for destination_highlights"
  ON destination_highlights FOR SELECT USING (true);

CREATE POLICY "Public read access for destination_activities"
  ON destination_activities FOR SELECT USING (true);

CREATE POLICY "Public read access for destination_gallery"
  ON destination_gallery FOR SELECT USING (true);

CREATE POLICY "Public read access for destination_amenities"
  ON destination_amenities FOR SELECT USING (true);

CREATE POLICY "Public read access for itineraries"
  ON itineraries FOR SELECT USING (true);

CREATE POLICY "Public read access for itinerary_days"
  ON itinerary_days FOR SELECT USING (true);

CREATE POLICY "Public read access for itinerary_activities"
  ON itinerary_activities FOR SELECT USING (true);

CREATE POLICY "Public read access for local_phrases"
  ON local_phrases FOR SELECT USING (true);

CREATE POLICY "Public read access for cultural_etiquette"
  ON cultural_etiquette FOR SELECT USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_destinations_slug ON destinations(slug);
CREATE INDEX IF NOT EXISTS idx_destinations_category ON destinations(category);
CREATE INDEX IF NOT EXISTS idx_destinations_coordinates ON destinations USING GIST(coordinates);
CREATE INDEX IF NOT EXISTS idx_destination_highlights_destination_id ON destination_highlights(destination_id);
CREATE INDEX IF NOT EXISTS idx_destination_activities_destination_id ON destination_activities(destination_id);
CREATE INDEX IF NOT EXISTS idx_destination_gallery_destination_id ON destination_gallery(destination_id);
CREATE INDEX IF NOT EXISTS idx_destination_amenities_destination_id ON destination_amenities(destination_id);
CREATE INDEX IF NOT EXISTS idx_itineraries_destination_id ON itineraries(destination_id);
CREATE INDEX IF NOT EXISTS idx_itinerary_days_itinerary_id ON itinerary_days(itinerary_id);
CREATE INDEX IF NOT EXISTS idx_itinerary_activities_day_id ON itinerary_activities(itinerary_day_id);
CREATE INDEX IF NOT EXISTS idx_local_phrases_destination_id ON local_phrases(destination_id);
CREATE INDEX IF NOT EXISTS idx_cultural_etiquette_destination_id ON cultural_etiquette(destination_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_destinations_updated_at BEFORE UPDATE ON destinations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();