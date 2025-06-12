/*
  # Seed destinations database with sample data

  This migration populates the destinations database with comprehensive data
  for Cameroon tourism destinations including all related information.
*/

-- Insert destinations
INSERT INTO destinations (id, name, slug, location, description, category, image_url, rating, review_count, coordinates, recommended_stay, budget_range, best_time_to_visit, good_for) VALUES
(
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'Kribi Beach',
  'kribi-beach-001',
  'Kribi, South Region',
  'Kribi is home to Cameroon''s most beautiful beaches with golden sand, palm trees, and clear blue waters. Enjoy fresh seafood, visit the Lobé Waterfalls where the river meets the ocean, and experience the vibrant local culture.',
  'Beaches',
  'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg',
  4.8,
  246,
  ST_GeogFromText('POINT(9.9073 2.9391)'),
  '2-3 days',
  '25,000 - 50,000 XAF per day',
  '{"period": "November to February", "description": "The dry season offers sunny days with less rainfall, perfect for beach activities and exploring the waterfalls.", "recommendedMonths": [11, 12, 1, 2]}',
  ARRAY['Couples', 'Families', 'Beach lovers', 'Photographers']
),
(
  'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
  'Mount Cameroon',
  'mount-cameroon-001',
  'Buea, Southwest Region',
  'Also known as "Chariot of the Gods," Mount Cameroon is West Africa''s highest peak and an active volcano. The mountain offers various trekking routes through diverse ecosystems, from rainforest to alpine grasslands, with stunning views of the Atlantic Ocean.',
  'Nature',
  'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg',
  4.9,
  189,
  ST_GeogFromText('POINT(9.1706 4.2034)'),
  '2-4 days',
  '40,000 - 80,000 XAF per day',
  '{"period": "November to February, June to August", "description": "Dry seasons provide the best climbing conditions with clear views and less rainfall.", "recommendedMonths": [11, 12, 1, 2, 6, 7, 8]}',
  ARRAY['Adventure seekers', 'Hikers', 'Nature lovers', 'Photographers']
),
(
  'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
  'Limbe Botanical Garden',
  'limbe-botanical-garden-001',
  'Limbe, Southwest Region',
  'Founded in 1892, these historic gardens showcase Cameroon''s incredible plant diversity. Explore lush tropical gardens, medicinal plant collections, and enjoy spectacular views of the Atlantic Ocean with Mount Cameroon as a backdrop.',
  'Nature',
  'https://images.pexels.com/photos/158028/bellingrath-gardens-alabama-landscape-scenic-158028.jpeg',
  4.6,
  157,
  ST_GeogFromText('POINT(9.2042 4.0186)'),
  '1-2 days',
  '20,000 - 40,000 XAF per day',
  '{"period": "Year-round", "description": "The gardens can be visited throughout the year, with the dry season offering the most comfortable walking conditions.", "recommendedMonths": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}',
  ARRAY['Families', 'Nature lovers', 'Students', 'Researchers']
);

-- Insert highlights for Kribi Beach
INSERT INTO destination_highlights (destination_id, highlight, order_index) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Pristine golden sand beaches stretching for kilometers', 1),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Lobé Waterfalls - one of the few places in the world where a waterfall meets the ocean', 2),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Fresh seafood restaurants serving the catch of the day', 3),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Pygmy village visits for cultural experiences', 4);

-- Insert highlights for Mount Cameroon
INSERT INTO destination_highlights (destination_id, highlight, order_index) VALUES
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'West Africa''s highest peak at 4,040 meters (13,255 feet)', 1),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Active volcano with the most recent eruption in 2012', 2),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Multiple hiking routes for different fitness levels', 3),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Diverse ecosystems from rainforest to savannah to alpine', 4);

-- Insert highlights for Limbe Botanical Garden
INSERT INTO destination_highlights (destination_id, highlight, order_index) VALUES
('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'One of Africa''s oldest botanical gardens established in 1892', 1),
('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'Over 1,500 plant species including rare medicinal plants', 2),
('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'Beautiful ocean views with Mount Cameroon in the background', 3),
('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'Monkey sanctuary with several primate species', 4);

-- Insert activities for Kribi Beach
INSERT INTO destination_activities (destination_id, name, description, duration, price_xaf, category, difficulty_level) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Beach Relaxation', 'Enjoy swimming, sunbathing, and beach sports on the pristine golden sands', '1-3 hours', 0, 'Leisure', 'Easy'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Lobé Waterfalls Tour', 'Visit the unique waterfall that flows directly into the Atlantic Ocean', '2 hours', 5000, 'Sightseeing', 'Easy'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Fishing Excursion', 'Join local fishermen for a traditional fishing experience', '4 hours', 15000, 'Cultural', 'Moderate'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Pygmy Village Cultural Visit', 'Experience the unique culture and traditions of the forest people', 'Half day', 20000, 'Cultural', 'Easy');

-- Insert activities for Mount Cameroon
INSERT INTO destination_activities (destination_id, name, description, duration, price_xaf, category, difficulty_level) VALUES
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', '1-Day Hike to First Hut', 'A shorter trek to experience the mountain without summiting', '6-8 hours', 30000, 'Adventure', 'Moderate'),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', '2-Day Summit Trek', 'The classic route to reach the summit with an overnight stay in mountain huts', '2 days', 80000, 'Adventure', 'Challenging'),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', '3-Day Traverse Route', 'The complete mountain experience crossing from Buea to Idenau', '3 days', 120000, 'Adventure', 'Expert');

-- Insert activities for Limbe Botanical Garden
INSERT INTO destination_activities (destination_id, name, description, duration, price_xaf, category, difficulty_level) VALUES
('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'Guided Garden Tour', 'Comprehensive tour of the botanical collections with expert guide', '2 hours', 8000, 'Educational', 'Easy'),
('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'Medicinal Plants Workshop', 'Learn about traditional medicinal plants and their uses', '3 hours', 12000, 'Educational', 'Easy'),
('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'Photography Session', 'Professional photography tour of the most scenic spots', '2 hours', 15000, 'Photography', 'Easy');

-- Insert gallery images for Kribi Beach
INSERT INTO destination_gallery (destination_id, image_url, caption, order_index) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'https://images.pexels.com/photos/1021073/pexels-photo-1021073.jpeg', 'Golden sand beach at sunset', 1),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg', 'Lobé Waterfalls meeting the ocean', 2),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg', 'Traditional fishing boats', 3),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'https://images.pexels.com/photos/2499699/pexels-photo-2499699.jpeg', 'Fresh seafood at local restaurant', 4);

-- Insert local phrases for Kribi Beach
INSERT INTO local_phrases (destination_id, english_phrase, local_phrase, language, pronunciation) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Hello', 'Bonjour', 'French', 'bohn-zhoor'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Thank you', 'Merci', 'French', 'mehr-see'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'How much is this?', 'C''est combien?', 'French', 'say kom-bee-yan'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Beautiful beach', 'Belle plage', 'French', 'bell plahzh');

-- Insert cultural etiquette for Kribi Beach
INSERT INTO cultural_etiquette (destination_id, etiquette_tip, order_index) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Always greet people before starting a conversation', 1),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Ask permission before taking photos of locals', 2),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Bargaining is expected at markets, but do it respectfully', 3),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Dress modestly when visiting local communities', 4),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Remove shoes when invited into someone''s home', 5);

-- Insert sample itinerary for Kribi Beach
INSERT INTO itineraries (id, destination_id, title, description, duration_days, difficulty_level, estimated_cost_xaf) VALUES
('d3eebc99-9c0b-4ef8-bb6d-6bb9bd380a21', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Kribi Beach Weekend Getaway', 'A perfect 2-day escape to experience the best of Kribi''s coastal beauty and culture.', 2, 'Easy', 100000);

-- Insert itinerary days
INSERT INTO itinerary_days (id, itinerary_id, day_number, title, description) VALUES
('e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a21', 1, 'Beach Relaxation & Waterfalls', 'Spend your first day enjoying the beautiful beaches and visiting the famous Lobé Waterfalls.'),
('f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a23', 'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a21', 2, 'Cultural Experiences', 'Explore the local culture and natural surroundings of Kribi.');

-- Insert itinerary activities for day 1
INSERT INTO itinerary_activities (itinerary_day_id, time, title, description, order_index) VALUES
('e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', '8:00 AM', 'Breakfast by the beach', 'Start your day with fresh fruits and local pastries at a beachside café.', 1),
('e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', '10:00 AM', 'Beach time', 'Relax on the golden sands, swim in the warm Atlantic waters, or try beach sports.', 2),
('e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', '1:00 PM', 'Seafood lunch', 'Enjoy fresh seafood at one of the many beachside restaurants.', 3),
('e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', '3:00 PM', 'Lobé Waterfalls visit', 'Take a short trip to see the unique waterfall that flows directly into the ocean.', 4),
('e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', '6:00 PM', 'Sunset drinks', 'Watch the sunset over the Atlantic with a refreshing cocktail.', 5);

-- Insert itinerary activities for day 2
INSERT INTO itinerary_activities (itinerary_day_id, time, title, description, order_index) VALUES
('f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a23', '9:00 AM', 'Local market visit', 'Explore the colorful market to see local produce, crafts, and daily life.', 1),
('f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a23', '11:00 AM', 'Pygmy village tour', 'Visit a nearby Pygmy community to learn about their traditional forest lifestyle.', 2),
('f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a23', '2:00 PM', 'Canoe river trip', 'Take a traditional canoe up the Lobé River to see wildlife and lush vegetation.', 3),
('f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a23', '5:00 PM', 'Fresh fish barbecue', 'Enjoy a traditional fish barbecue prepared by local fishermen on the beach.', 4);

-- Insert sample amenities for Kribi Beach
INSERT INTO destination_amenities (destination_id, name, type, address, coordinates, rating, contact_info) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Hotel Ilomba', 'hotel', 'Kribi Beach Road, Kribi', ST_GeogFromText('POINT(9.9100 2.9400)'), 4.2, '{"phone": "+237 243 461 234", "email": "info@hotelilomba.cm"}'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Restaurant La Plage', 'restaurant', 'Kribi Beach Front, Kribi', ST_GeogFromText('POINT(9.9080 2.9380)'), 4.5, '{"phone": "+237 243 461 567", "speciality": "Fresh seafood"}'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Kribi District Hospital', 'hospital', 'Central Kribi, Kribi', ST_GeogFromText('POINT(9.9050 2.9350)'), 3.8, '{"phone": "+237 243 461 890", "emergency": "24/7"}'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Afriland First Bank', 'bank', 'Main Street, Kribi', ST_GeogFromText('POINT(9.9060 2.9360)'), 4.0, '{"phone": "+237 243 461 345", "atm": "Available"}');