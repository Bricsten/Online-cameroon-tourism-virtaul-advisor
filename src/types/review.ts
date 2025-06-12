export interface Review {
  id: string;
  user_id: string;
  destination_id: string;
  rating: number;
  title: string;
  content: string;
  travel_date?: string;
  travel_type?: string;
  helpful_count: number;
  created_at: string;
  updated_at: string;
  user?: {
    username: string;
    avatar_url?: string;
  };
}

export interface ReviewFormData {
  destination_id: string;
  rating: number;
  title: string;
  content: string;
  travel_date?: string;
  travel_type?: string;
}