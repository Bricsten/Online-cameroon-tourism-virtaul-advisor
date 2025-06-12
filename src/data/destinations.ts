import { Destination } from '../types/destination';

export const popularDestinations: Destination[] = [
  {
    id: 'kribi-beach',
    name: 'Kribi Beach',
    location: 'Kribi, South Region',
    description: 'Kribi is home to Cameroon\'s most beautiful beaches with golden sand, palm trees, and clear blue waters. Enjoy fresh seafood, visit the Lobé Waterfalls where the river meets the ocean, and experience the vibrant local culture.',
    category: 'Beaches',
    image: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg',
    gallery: [
      'https://images.pexels.com/photos/1021073/pexels-photo-1021073.jpeg',
      'https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg',
      'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg',
      'https://images.pexels.com/photos/2499699/pexels-photo-2499699.jpeg'
    ],
    rating: 4.8,
    reviews: 246,
    highlights: [
      'Pristine golden sand beaches stretching for kilometers',
      'Lobé Waterfalls - one of the few places in the world where a waterfall meets the ocean',
      'Fresh seafood restaurants serving the catch of the day',
      'Pygmy village visits for cultural experiences'
    ],
    activities: [
      {
        name: 'Beach Relaxation',
        description: 'Enjoy swimming, sunbathing, and beach sports on the pristine golden sands',
        duration: '1-3 hours',
        price: '0'
      },
      {
        name: 'Lobé Waterfalls Tour',
        description: 'Visit the unique waterfall that flows directly into the Atlantic Ocean',
        duration: '2 hours',
        price: '5,000'
      },
      {
        name: 'Fishing Excursion',
        description: 'Join local fishermen for a traditional fishing experience',
        duration: '4 hours',
        price: '15,000'
      },
      {
        name: 'Pygmy Village Cultural Visit',
        description: 'Experience the unique culture and traditions of the forest people',
        duration: 'Half day',
        price: '20,000'
      }
    ],
    recommendedStay: '2-3 days',
    budget: '25,000 - 50,000 XAF per day',
    goodFor: ['Couples', 'Families', 'Beach lovers', 'Photographers'],
    bestTimeToVisit: {
      period: 'November to February',
      description: 'The dry season offers sunny days with less rainfall, perfect for beach activities and exploring the waterfalls.',
      recommendedMonths: [11, 12, 1, 2]
    },
    localPhrases: [
      {
        english: 'Hello',
        language: 'French',
        phrase: 'Bonjour',
        pronunciation: 'bohn-zhoor'
      },
      {
        english: 'Thank you',
        language: 'French',
        phrase: 'Merci',
        pronunciation: 'mehr-see'
      },
      {
        english: 'How much is this?',
        language: 'French',
        phrase: 'C\'est combien?',
        pronunciation: 'say kom-bee-yan'
      },
      {
        english: 'Beautiful beach',
        language: 'French',
        phrase: 'Belle plage',
        pronunciation: 'bell plahzh'
      }
    ],
    culturalEtiquette: [
      'Always greet people before starting a conversation',
      'Ask permission before taking photos of locals',
      'Bargaining is expected at markets, but do it respectfully',
      'Dress modestly when visiting local communities',
      'Remove shoes when invited into someone\'s home'
    ],
    itineraries: [
      {
        title: 'Kribi Beach Weekend Getaway',
        description: 'A perfect 2-day escape to experience the best of Kribi\'s coastal beauty and culture.',
        days: [
          {
            title: 'Beach Relaxation & Waterfalls',
            description: 'Spend your first day enjoying the beautiful beaches and visiting the famous Lobé Waterfalls.',
            activities: [
              {
                time: '8:00 AM',
                title: 'Breakfast by the beach',
                description: 'Start your day with fresh fruits and local pastries at a beachside café.'
              },
              {
                time: '10:00 AM',
                title: 'Beach time',
                description: 'Relax on the golden sands, swim in the warm Atlantic waters, or try beach sports.'
              },
              {
                time: '1:00 PM',
                title: 'Seafood lunch',
                description: 'Enjoy fresh seafood at one of the many beachside restaurants.'
              },
              {
                time: '3:00 PM',
                title: 'Lobé Waterfalls visit',
                description: 'Take a short trip to see the unique waterfall that flows directly into the ocean.'
              },
              {
                time: '6:00 PM',
                title: 'Sunset drinks',
                description: 'Watch the sunset over the Atlantic with a refreshing cocktail.'
              }
            ]
          },
          {
            title: 'Cultural Experiences',
            description: 'Explore the local culture and natural surroundings of Kribi.',
            activities: [
              {
                time: '9:00 AM',
                title: 'Local market visit',
                description: 'Explore the colorful market to see local produce, crafts, and daily life.'
              },
              {
                time: '11:00 AM',
                title: 'Pygmy village tour',
                description: 'Visit a nearby Pygmy community to learn about their traditional forest lifestyle.'
              },
              {
                time: '2:00 PM',
                title: 'Canoe river trip',
                description: 'Take a traditional canoe up the Lobé River to see wildlife and lush vegetation.'
              },
              {
                time: '5:00 PM',
                title: 'Fresh fish barbecue',
                description: 'Enjoy a traditional fish barbecue prepared by local fishermen on the beach.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'mount-cameroon',
    name: 'Mount Cameroon',
    location: 'Buea, Southwest Region',
    description: 'Also known as "Chariot of the Gods," Mount Cameroon is West Africa\'s highest peak and an active volcano. The mountain offers various trekking routes through diverse ecosystems, from rainforest to alpine grasslands, with stunning views of the Atlantic Ocean.',
    category: 'Nature',
    image: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg',
    rating: 4.9,
    reviews: 189,
    highlights: [
      'West Africa\'s highest peak at 4,040 meters (13,255 feet)',
      'Active volcano with the most recent eruption in 2012',
      'Multiple hiking routes for different fitness levels',
      'Diverse ecosystems from rainforest to savannah to alpine'
    ],
    activities: [
      {
        name: '1-Day Hike to First Hut',
        description: 'A shorter trek to experience the mountain without summiting',
        duration: '6-8 hours',
        price: '30,000'
      },
      {
        name: '2-Day Summit Trek',
        description: 'The classic route to reach the summit with an overnight stay in mountain huts',
        duration: '2 days',
        price: '80,000'
      },
      {
        name: '3-Day Traverse Route',
        description: 'The complete mountain experience crossing from Buea to Idenau',
        duration: '3 days',
        price: '120,000'
      }
    ]
  },
  {
    id: 'limbe-botanical-garden',
    name: 'Limbe Botanical Garden',
    location: 'Limbe, Southwest Region',
    description: 'Founded in 1892, these historic gardens showcase Cameroon\'s incredible plant diversity. Explore lush tropical gardens, medicinal plant collections, and enjoy spectacular views of the Atlantic Ocean with Mount Cameroon as a backdrop.',
    category: 'Nature',
    image: 'https://images.pexels.com/photos/158028/bellingrath-gardens-alabama-landscape-scenic-158028.jpeg',
    rating: 4.6,
    reviews: 157,
    highlights: [
      'One of Africa\'s oldest botanical gardens established in 1892',
      'Over 1,500 plant species including rare medicinal plants',
      'Beautiful ocean views with Mount Cameroon in the background',
      'Monkey sanctuary with several primate species'
    ]
  },
  {
    id: 'waza-national-park',
    name: 'Waza National Park',
    location: 'Far North Region',
    description: 'Cameroon\'s most famous wildlife reserve covers over 1,700 square kilometers of savannah. Spot lions, elephants, giraffes, and numerous bird species in their natural habitat. The park offers an authentic safari experience without the crowds of more commercial destinations.',
    category: 'Nature',
    image: 'https://images.pexels.com/photos/259547/pexels-photo-259547.jpeg',
    rating: 4.7,
    reviews: 123,
    highlights: [
      'Cameroon\'s most prominent national park and UNESCO Biosphere Reserve',
      'Home to lions, elephants, giraffes, antelopes, and over 379 bird species',
      'Authentic safari experience with fewer tourists than East African parks',
      'Traditional villages around the park periphery'
    ]
  },
  {
    id: 'bafut-palace',
    name: 'Bafut Palace',
    location: 'Bafut, Northwest Region',
    description: 'The traditional residence of the Fon (king) of Bafut showcases the rich cultural heritage of Cameroon\'s grassland kingdoms. The palace complex includes traditional buildings, a museum, and is famous for its colorful annual festivals featuring masked dancers.',
    category: 'Culture',
    image: 'https://images.pexels.com/photos/5243606/pexels-photo-5243606.jpeg',
    rating: 4.5,
    reviews: 98,
    highlights: [
      'Traditional seat of the Fon (king) of the Bafut people',
      'UNESCO World Heritage tentative list site',
      'Historic buildings dating back to the 16th century',
      'Museum with royal artifacts and traditional crafts'
    ]
  },
  {
    id: 'yaounde',
    name: 'Yaoundé',
    location: 'Centre Region',
    description: 'Cameroon\'s capital is known as the "city of seven hills," offering a blend of modern African urban life with traditional elements. Visit the National Museum, bustling markets, and enjoy the city\'s vibrant nightlife and culinary scene.',
    category: 'Cities',
    image: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg',
    rating: 4.3,
    reviews: 210,
    highlights: [
      'The "City of Seven Hills" with beautiful viewpoints',
      'National Museum showcasing Cameroon\'s diverse culture',
      'Fascinating markets including Marché Central and Mokolo Market',
      'Diverse cuisine from all regions of Cameroon'
    ]
  },
  {
    id: 'douala',
    name: 'Douala',
    location: 'Littoral Region',
    description: 'Cameroon\'s largest city and economic capital offers visitors a glimpse into modern urban African life. Explore art galleries, enjoy the vibrant nightlife, sample diverse cuisine, and use the city as a gateway to coastal attractions.',
    category: 'Cities',
    image: 'https://images.pexels.com/photos/3876328/pexels-photo-3876328.jpeg',
    rating: 4.1,
    reviews: 175,
    highlights: [
      'Cameroon\'s largest city and economic powerhouse',
      'Vibrant art scene with galleries and public sculptures',
      'Wouri River and maritime history',
      'Gateway to coastal attractions like Kribi and Limbe'
    ]
  },
  {
    id: 'dja-reserve',
    name: 'Dja Faunal Reserve',
    location: 'South Region',
    description: 'This UNESCO World Heritage site protects one of Africa\'s largest and best-preserved rainforests. The reserve is home to over 100 mammal species, including forest elephants, gorillas, chimpanzees, and a remarkable diversity of birds and plants.',
    category: 'Nature',
    image: 'https://images.pexels.com/photos/358457/pexels-photo-358457.jpeg',
    rating: 4.8,
    reviews: 75,
    highlights: [
      'UNESCO World Heritage Site protecting pristine rainforest',
      'Home to endangered species including forest elephants and gorillas',
      'Over 1,500 plant species and incredible biodiversity',
      'Traditional Baka Pygmy communities with unique forest knowledge'
    ]
  }
];

export function getAllDestinations(): Destination[] {
  return popularDestinations;
}

export function getDestinationById(id: string): Destination | null {
  return popularDestinations.find(destination => destination.id === id) || null;
}

export function getDestinationsByCategory(category: string): Destination[] {
  return popularDestinations.filter(
    destination => destination.category.toLowerCase() === category.toLowerCase()
  );
}