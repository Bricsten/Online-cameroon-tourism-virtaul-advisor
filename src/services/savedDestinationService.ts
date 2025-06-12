import { supabase } from '../lib/supabase';
import { SavedDestination } from '../types/savedDestination';

export class SavedDestinationService {
  static async saveDestination(destinationId: string, notes?: string): Promise<SavedDestination> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Get destination details
    const { data: destination, error: destError } = await supabase
      .from('destinations')
      .select('name, image_url, location, category')
      .eq('slug', destinationId)
      .single();

    if (destError) {
      console.error('Error fetching destination:', destError);
      throw new Error('Destination not found');
    }

    const { data, error } = await supabase
      .from('saved_destinations')
      .insert([
        {
          user_id: user.id,
          destination_id: destinationId,
          destination_name: destination.name,
          destination_image: destination.image_url,
          destination_location: destination.location,
          destination_category: destination.category,
          notes
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error saving destination:', error);
      if (error.code === '23505') { // Unique constraint violation
        throw new Error('Destination already saved');
      }
      throw new Error('Failed to save destination');
    }
    return data;
  }

  static async unsaveDestination(destinationId: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('saved_destinations')
      .delete()
      .eq('user_id', user.id)
      .eq('destination_id', destinationId);

    if (error) {
      console.error('Error unsaving destination:', error);
      throw new Error('Failed to remove saved destination');
    }
  }

  static async getUserSavedDestinations(userId: string): Promise<SavedDestination[]> {
    const { data, error } = await supabase
      .from('saved_destinations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching saved destinations:', error);
      throw new Error('Failed to fetch saved destinations');
    }
    return data || [];
  }

  static async isDestinationSaved(destinationId: string): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { data, error } = await supabase
      .from('saved_destinations')
      .select('id')
      .eq('user_id', user.id)
      .eq('destination_id', destinationId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" error
      console.error('Error checking saved status:', error);
    }

    return !error && !!data;
  }
}