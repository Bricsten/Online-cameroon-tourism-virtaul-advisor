export interface Booking {
  id: string;
  user_id: string;
  destination_id: string;
  destination_name: string;
  destination_image: string;
  travel_date: string;
  number_of_travelers: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  special_requests?: string;
  contact_info: {
    phone: string;
    email: string;
  };
  created_at: string;
  updated_at: string;
}

export interface BookingFormData {
  destination_id: string;
  travel_date: string;
  number_of_travelers: number;
  special_requests?: string;
  contact_info: {
    phone: string;
    email: string;
  };
}