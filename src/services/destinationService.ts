import { supabase } from '../lib/supabase';
import { Destination } from '../types/destination';

export interface DatabaseDestination {
  id: string;
  name: string;
  slug: string;
  location: string;
  description: string;
  category: string;
  image_url: string;
  rating: number;
  review_count: number;
  coordinates: any;
  recommended_stay: string;
  budget_range: string;
  best_time_to_visit: any;
  good_for: string[];
  created_at: string;
  updated_at: string;
  destination_highlights: Array<{
    id: string;
    highlight: string;
    order_index: number;
  }>;
  destination_activities: Array<{
    id: string;
    name: string;
    description: string;
    duration: string;
    price_xaf: number;
    category: string;
    difficulty_level: string;
  }>;
  destination_gallery: Array<{
    id: string;
    image_url: string;
    caption: string;
    order_index: number;
  }>;
  local_phrases: Array<{
    id: string;
    english_phrase: string;
    local_phrase: string;
    language: string;
    pronunciation: string;
  }>;
  cultural_etiquette: Array<{
    id: string;
    etiquette_tip: string;
    order_index: number;
  }>;
  itineraries: Array<{
    id: string;
    title: string;
    description: string;
    duration_days: number;
    difficulty_level: string;
    estimated_cost_xaf: number;
    itinerary_days: Array<{
      id: string;
      day_number: number;
      title: string;
      description: string;
      itinerary_activities: Array<{
        id: string;
        time: string;
        title: string;
        description: string;
        order_index: number;
      }>;
    }>;
  }>;
}

export class DestinationService {
  static async getAllDestinations(): Promise<Destination[]> {
    try {
      const { data, error } = await supabase
        .from('destinations')
        .select(`
          *,
          destination_highlights(id, highlight, order_index),
          destination_activities(id, name, description, duration, price_xaf, category, difficulty_level),
          destination_gallery(id, image_url, caption, order_index)
        `)
        .order('name');

      if (error) {
        console.error('Error fetching destinations:', error);
        throw error;
      }

      return data?.map(this.transformDestination) || [];
    } catch (error) {
      console.error('Error in getAllDestinations:', error);
      return [];
    }
  }

  static async getDestinationBySlug(slug: string): Promise<Destination | null> {
    try {
      const { data, error } = await supabase
        .from('destinations')
        .select(`
          *,
          destination_highlights(id, highlight, order_index),
          destination_activities(id, name, description, duration, price_xaf, category, difficulty_level),
          destination_gallery(id, image_url, caption, order_index),
          local_phrases(id, english_phrase, local_phrase, language, pronunciation),
          cultural_etiquette(id, etiquette_tip, order_index),
          itineraries(
            id, title, description, duration_days, difficulty_level, estimated_cost_xaf,
            itinerary_days(
              id, day_number, title, description,
              itinerary_activities(id, time, title, description, order_index)
            )
          )
        `)
        .eq('slug', slug)
        .single();

      if (error) {
        console.error('Error fetching destination:', error);
        return null;
      }

      return data ? this.transformDestinationWithDetails(data) : null;
    } catch (error) {
      console.error('Error in getDestinationBySlug:', error);
      return null;
    }
  }

  static async getDestinationsByCategory(category: string): Promise<Destination[]> {
    try {
      const { data, error } = await supabase
        .from('destinations')
        .select(`
          *,
          destination_highlights(id, highlight, order_index),
          destination_activities(id, name, description, duration, price_xaf, category, difficulty_level),
          destination_gallery(id, image_url, caption, order_index)
        `)
        .eq('category', category)
        .order('name');

      if (error) {
        console.error('Error fetching destinations by category:', error);
        throw error;
      }

      return data?.map(this.transformDestination) || [];
    } catch (error) {
      console.error('Error in getDestinationsByCategory:', error);
      return [];
    }
  }

  static async searchDestinations(searchTerm: string): Promise<Destination[]> {
    try {
      const { data, error } = await supabase
        .from('destinations')
        .select(`
          *,
          destination_highlights(id, highlight, order_index),
          destination_activities(id, name, description, duration, price_xaf, category, difficulty_level),
          destination_gallery(id, image_url, caption, order_index)
        `)
        .or(`name.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
        .order('name');

      if (error) {
        console.error('Error searching destinations:', error);
        throw error;
      }

      return data?.map(this.transformDestination) || [];
    } catch (error) {
      console.error('Error in searchDestinations:', error);
      return [];
    }
  }

  static async getDestinationCoordinates(destinationId: string): Promise<{ lat: number; lng: number } | null> {
    try {
      const { data, error } = await supabase
        .from('destinations')
        .select('coordinates')
        .eq('id', destinationId)
        .single();

      if (error || !data?.coordinates) {
        return null;
      }

      // Parse PostGIS point format
      const coords = data.coordinates;
      if (coords && coords.coordinates) {
        return {
          lng: coords.coordinates[0],
          lat: coords.coordinates[1]
        };
      }

      return null;
    } catch (error) {
      console.error('Error getting destination coordinates:', error);
      return null;
    }
  }

  private static transformDestination(dbDestination: DatabaseDestination): Destination {
    return {
      id: dbDestination.slug, // Use slug as ID for URL compatibility
      name: dbDestination.name,
      location: dbDestination.location,
      description: dbDestination.description,
      category: dbDestination.category,
      image: dbDestination.image_url,
      rating: dbDestination.rating,
      reviews: dbDestination.review_count,
      highlights: dbDestination.destination_highlights
        ?.sort((a, b) => a.order_index - b.order_index)
        ?.map(h => h.highlight) || [],
      activities: dbDestination.destination_activities?.map(a => ({
        name: a.name,
        description: a.description,
        duration: a.duration,
        price: a.price_xaf.toString()
      })) || [],
      gallery: dbDestination.destination_gallery
        ?.sort((a, b) => a.order_index - b.order_index)
        ?.map(g => g.image_url) || [],
      recommendedStay: dbDestination.recommended_stay,
      budget: dbDestination.budget_range,
      goodFor: dbDestination.good_for || [],
      bestTimeToVisit: dbDestination.best_time_to_visit ? {
        period: dbDestination.best_time_to_visit.period,
        description: dbDestination.best_time_to_visit.description,
        recommendedMonths: dbDestination.best_time_to_visit.recommendedMonths
      } : undefined
    };
  }

  private static transformDestinationWithDetails(dbDestination: DatabaseDestination): Destination {
    const baseDestination = this.transformDestination(dbDestination);
    
    return {
      ...baseDestination,
      localPhrases: dbDestination.local_phrases?.map(p => ({
        english: p.english_phrase,
        language: p.language,
        phrase: p.local_phrase,
        pronunciation: p.pronunciation || ''
      })) || [],
      culturalEtiquette: dbDestination.cultural_etiquette
        ?.sort((a, b) => a.order_index - b.order_index)
        ?.map(e => e.etiquette_tip) || [],
      itineraries: dbDestination.itineraries?.map(itinerary => ({
        title: itinerary.title,
        description: itinerary.description,
        days: itinerary.itinerary_days
          ?.sort((a, b) => a.day_number - b.day_number)
          ?.map(day => ({
            title: day.title,
            description: day.description,
            activities: day.itinerary_activities
              ?.sort((a, b) => a.order_index - b.order_index)
              ?.map(activity => ({
                time: activity.time,
                title: activity.title,
                description: activity.description
              })) || []
          })) || []
      })) || []
    };
  }
}