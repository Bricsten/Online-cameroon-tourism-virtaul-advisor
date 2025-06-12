export interface Destination {
  id: string;
  name: string;
  location: string;
  description: string;
  category: string;
  image: string;
  gallery?: string[];
  rating: number;
  reviews: number;
  highlights?: string[];
  activities?: Activity[];
  recommendedStay?: string;
  budget?: string;
  goodFor?: string[];
  bestTimeToVisit?: {
    period: string;
    description: string;
    recommendedMonths: number[]; // 1-12 for Jan-Dec
  };
  localPhrases?: LocalPhrase[];
  culturalEtiquette?: string[];
  itineraries?: Itinerary[];
}

export interface Activity {
  name: string;
  description: string;
  duration: string;
  price: string;
}

export interface LocalPhrase {
  english: string;
  language: string;
  phrase: string;
  pronunciation: string;
}

export interface Itinerary {
  title: string;
  description: string;
  days: Day[];
}

export interface Day {
  title: string;
  description: string;
  activities: DayActivity[];
}

export interface DayActivity {
  time: string;
  title: string;
  description: string;
}