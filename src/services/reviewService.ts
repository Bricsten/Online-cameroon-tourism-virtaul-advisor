import { supabase } from '../lib/supabase';
import { Review, ReviewFormData } from '../types/review';

export class ReviewService {
  static async createReview(reviewData: ReviewFormData): Promise<Review> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('reviews')
      .insert([
        {
          user_id: user.id,
          destination_id: reviewData.destination_id,
          rating: reviewData.rating,
          title: reviewData.title,
          content: reviewData.content,
          travel_date: reviewData.travel_date,
          travel_type: reviewData.travel_type
        }
      ])
      .select(`
        *,
        profiles(username, avatar_url)
      `)
      .single();

    if (error) throw error;
    return data;
  }

  static async getDestinationReviews(destinationId: string): Promise<Review[]> {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        profiles(username, avatar_url)
      `)
      .eq('destination_id', destinationId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async getUserReviews(userId: string): Promise<Review[]> {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        destinations(name, image_url)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async updateReview(reviewId: string, reviewData: Partial<ReviewFormData>): Promise<Review> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('reviews')
      .update({
        ...reviewData,
        updated_at: new Date().toISOString()
      })
      .eq('id', reviewId)
      .eq('user_id', user.id)
      .select(`
        *,
        profiles(username, avatar_url)
      `)
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteReview(reviewId: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', reviewId)
      .eq('user_id', user.id);

    if (error) throw error;
  }

  static async markReviewHelpful(reviewId: string): Promise<void> {
    const { error } = await supabase.rpc('increment_helpful_count', {
      review_id: reviewId
    });

    if (error) throw error;
  }
}