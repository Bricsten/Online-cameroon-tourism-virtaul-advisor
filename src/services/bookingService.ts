import { supabase } from '../lib/supabase';
import { Booking, BookingFormData } from '../types/booking';

export class BookingService {
  static async createBooking(bookingData: BookingFormData): Promise<Booking> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Get destination details
    const { data: destination, error: destError } = await supabase
      .from('destinations')
      .select('name, image_url')
      .eq('slug', bookingData.destination_id)
      .single();

    if (destError) {
      console.error('Error fetching destination:', destError);
      throw new Error('Destination not found');
    }

    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          user_id: user.id,
          destination_id: bookingData.destination_id,
          destination_name: destination.name,
          destination_image: destination.image_url,
          travel_date: bookingData.travel_date,
          number_of_travelers: bookingData.number_of_travelers,
          special_requests: bookingData.special_requests,
          contact_info: bookingData.contact_info,
          status: 'pending'
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating booking:', error);
      throw new Error('Failed to create booking');
    }
    return data;
  }

  static async getUserBookings(userId: string): Promise<Booking[]> {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user bookings:', error);
      throw new Error('Failed to fetch bookings');
    }
    return data || [];
  }

  static async updateBookingStatus(bookingId: string, status: Booking['status']): Promise<void> {
    const { error } = await supabase
      .from('bookings')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', bookingId);

    if (error) {
      console.error('Error updating booking status:', error);
      throw new Error('Failed to update booking status');
    }
  }

  static async cancelBooking(bookingId: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('bookings')
      .update({ status: 'cancelled', updated_at: new Date().toISOString() })
      .eq('id', bookingId)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error cancelling booking:', error);
      throw new Error('Failed to cancel booking');
    }
  }

  static async getAllBookings(): Promise<Booking[]> {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        profiles(username)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all bookings:', error);
      throw new Error('Failed to fetch bookings');
    }
    return data || [];
  }
}