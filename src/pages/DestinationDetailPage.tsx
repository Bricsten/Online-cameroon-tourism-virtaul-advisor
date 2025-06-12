import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, Calendar, DollarSign, Users, Star, ArrowLeft, Share, Heart, MessageSquare } from 'lucide-react';
import { useDestination } from '../hooks/useDestinations';
import { Destination } from '../types/destination';
import GoogleMap from '../components/maps/GoogleMap';
import NotFoundPage from './NotFoundPage';

const DestinationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { destination, loading, error } = useDestination(id || '');
  const [activeTab, setActiveTab] = useState<'overview' | 'map' | 'itinerary' | 'tips' | 'reviews'>('overview');
  const [isFavorite, setIsFavorite] = useState(false);
  
  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading destination details...</p>
        </div>
      </div>
    );
  }
  
  if (error || !destination) {
    return <NotFoundPage />;
  }
  
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh]">
        <div className="absolute inset-0">
          <img 
            src={destination.image} 
            alt={destination.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
        </div>
        
        <div className="absolute top-4 left-4 z-10">
          <Link to="/destinations" className="flex items-center text-white bg-black bg-opacity-30 hover:bg-opacity-50 px-4 py-2 rounded-full transition-colors duration-300">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Back</span>
          </Link>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center mb-2">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{destination.location}</span>
            </div>
            <h1 className="mb-2">{destination.name}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <span className="px-3 py-1 bg-primary-500 text-white text-sm font-medium rounded-full">
                {destination.category}
              </span>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-accent-500 fill-accent-500 mr-1" />
                <span>{destination.rating} ({destination.reviews} reviews)</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Action Buttons */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex space-x-4">
                <button 
                  className="flex items-center text-neutral-700 hover:text-primary-500"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart className={`h-5 w-5 mr-2 ${isFavorite ? 'fill-secondary-500 text-secondary-500' : ''}`} />
                  <span>Save</span>
                </button>
                <button className="flex items-center text-neutral-700 hover:text-primary-500">
                  <Share className="h-5 w-5 mr-2" />
                  <span>Share</span>
                </button>
                <Link to="/chat" className="flex items-center text-neutral-700 hover:text-primary-500">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  <span>Ask Advisor</span>
                </Link>
              </div>
              <button className="btn btn-primary">Book Now</button>
            </div>
            
            {/* Tabs */}
            <div className="border-b border-neutral-200 mb-8">
              <div className="flex overflow-x-auto">
                <TabButton 
                  label="Overview" 
                  active={activeTab === 'overview'} 
                  onClick={() => setActiveTab('overview')} 
                />
                <TabButton 
                  label="Map & Directions" 
                  active={activeTab === 'map'} 
                  onClick={() => setActiveTab('map')} 
                />
                <TabButton 
                  label="Itinerary" 
                  active={activeTab === 'itinerary'} 
                  onClick={() => setActiveTab('itinerary')} 
                />
                <TabButton 
                  label="Travel Tips" 
                  active={activeTab === 'tips'} 
                  onClick={() => setActiveTab('tips')} 
                />
                <TabButton 
                  label="Reviews" 
                  active={activeTab === 'reviews'} 
                  onClick={() => setActiveTab('reviews')} 
                />
              </div>
            </div>
            
            {/* Tab Content */}
            <div className="mb-12">
              {activeTab === 'overview' && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">About {destination.name}</h2>
                  <p className="text-neutral-700 mb-6">{destination.description}</p>
                  
                  {/* Highlights */}
                  {destination.highlights && destination.highlights.length > 0 && (
                    <>
                      <h3 className="text-xl font-bold mb-4">Highlights</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {destination.highlights.map((highlight, index) => (
                          <div key={index} className="flex items-start">
                            <div className="h-6 w-6 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center mr-3 mt-0.5">
                              <span className="text-sm font-bold">{index + 1}</span>
                            </div>
                            <p>{highlight}</p>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  
                  {/* Activities */}
                  {destination.activities && destination.activities.length > 0 && (
                    <>
                      <h3 className="text-xl font-bold mb-4">Activities & Attractions</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {destination.activities.map((activity, index) => (
                          <div key={index} className="bg-white p-4 rounded-lg border border-neutral-200 hover:shadow-md transition-shadow duration-300">
                            <h4 className="font-bold mb-2">{activity.name}</h4>
                            <p className="text-neutral-600 text-sm mb-2">{activity.description}</p>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-primary-500 font-medium">
                                {activity.duration}
                              </span>
                              <span className="text-sm font-medium">
                                {activity.price === '0' ? 'Free' : `From ${activity.price} XAF`}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  
                  {/* Gallery */}
                  {destination.gallery && destination.gallery.length > 0 && (
                    <>
                      <h3 className="text-xl font-bold mb-4">Gallery</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        {destination.gallery.map((image, index) => (
                          <div key={index} className="aspect-square rounded-lg overflow-hidden">
                            <img 
                              src={image} 
                              alt={`${destination.name} gallery ${index + 1}`} 
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              {activeTab === 'map' && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Location & Directions</h2>
                  <p className="text-neutral-700 mb-6">
                    Get directions to {destination.name} and discover nearby amenities including hotels, restaurants, hospitals, and more.
                  </p>
                  
                  <GoogleMap 
                    destination={{
                      name: destination.name,
                      location: destination.location,
                      coordinates: getDestinationCoordinates(destination.name)
                    }}
                    className="mb-6"
                  />
                  
                  <div className="bg-primary-50 p-4 rounded-lg">
                    <h4 className="font-bold mb-2">Getting There</h4>
                    <p className="text-sm text-neutral-700">
                      Click "Get Directions" on the map above to see the best route from your current location to {destination.name}. 
                      The map also shows nearby amenities to help you plan your visit.
                    </p>
                  </div>
                </div>
              )}
              
              {activeTab === 'itinerary' && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Suggested Itineraries</h2>
                  <p className="text-neutral-700 mb-6">
                    Make the most of your visit to {destination.name} with these carefully crafted itineraries.
                  </p>
                  
                  {destination.itineraries && destination.itineraries.length > 0 ? (
                    destination.itineraries.map((itinerary, index) => (
                      <div key={index} className="mb-8">
                        <h3 className="text-xl font-bold mb-3">{itinerary.title}</h3>
                        <p className="text-neutral-600 mb-4">{itinerary.description}</p>
                        
                        <div className="space-y-6">
                          {itinerary.days.map((day, dayIndex) => (
                            <div key={dayIndex} className="relative pl-8 border-l-2 border-primary-200">
                              <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-primary-500"></div>
                              <h4 className="text-lg font-bold mb-2">Day {dayIndex + 1}: {day.title}</h4>
                              <p className="text-neutral-600 mb-3">{day.description}</p>
                              
                              <div className="space-y-3">
                                {day.activities.map((activity, actIndex) => (
                                  <div key={actIndex} className="flex items-start">
                                    <div className="h-6 w-6 rounded-full bg-neutral-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                                      <Clock className="h-3 w-3 text-neutral-500" />
                                    </div>
                                    <div>
                                      <p className="font-medium">{activity.time} - {activity.title}</p>
                                      <p className="text-sm text-neutral-600">{activity.description}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-neutral-600 mb-4">No itineraries available for this destination yet.</p>
                      <Link to="/chat" className="btn btn-primary">
                        <MessageSquare className="h-5 w-5 mr-2" />
                        Ask Advisor for Custom Itinerary
                      </Link>
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'tips' && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Travel Tips for {destination.name}</h2>
                  <p className="text-neutral-700 mb-6">
                    Enhance your visit with these practical tips and cultural insights.
                  </p>
                  
                  {/* Best Time to Visit */}
                  {destination.bestTimeToVisit && (
                    <div className="mb-8">
                      <h3 className="text-xl font-bold mb-3">Best Time to Visit</h3>
                      <div className="bg-white p-5 rounded-lg border border-neutral-200">
                        <div className="flex items-start mb-4">
                          <Calendar className="h-6 w-6 text-primary-500 mr-3 mt-1 flex-shrink-0" />
                          <div>
                            <p className="font-medium mb-1">{destination.bestTimeToVisit.period}</p>
                            <p className="text-neutral-600">{destination.bestTimeToVisit.description}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-4 gap-2">
                          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
                            <div 
                              key={index} 
                              className={`py-2 text-center rounded-md text-sm ${
                                destination.bestTimeToVisit?.recommendedMonths.includes(index + 1)
                                  ? 'bg-primary-100 text-primary-700 font-medium'
                                  : 'bg-neutral-50 text-neutral-500'
                              }`}
                            >
                              {month}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Local Phrases */}
                  {destination.localPhrases && destination.localPhrases.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-bold mb-3">Useful Local Phrases</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {destination.localPhrases.map((phrase, index) => (
                          <div key={index} className="bg-white p-4 rounded-lg border border-neutral-200">
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">{phrase.english}</span>
                              <span className="text-xs px-2 py-1 bg-neutral-100 rounded-full">{phrase.language}</span>
                            </div>
                            <p className="text-accent-600 font-medium">{phrase.phrase}</p>
                            <p className="text-xs text-neutral-500 italic">Pronunciation: {phrase.pronunciation}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Cultural Etiquette */}
                  {destination.culturalEtiquette && destination.culturalEtiquette.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-bold mb-3">Cultural Etiquette</h3>
                      <div className="bg-white p-5 rounded-lg border border-neutral-200">
                        <ul className="space-y-3">
                          {destination.culturalEtiquette.map((tip, index) => (
                            <li key={index} className="flex items-start">
                              <div className="h-6 w-6 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                                <span className="text-sm font-bold">✓</span>
                              </div>
                              <p>{tip}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Traveler Reviews</h2>
                    <button className="btn btn-outline">Write a Review</button>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg border border-neutral-200 mb-8">
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="md:w-1/3 text-center">
                        <div className="text-5xl font-bold text-primary-500 mb-2">{destination.rating}</div>
                        <div className="flex justify-center mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-5 w-5 ${
                                i < Math.floor(destination.rating) 
                                  ? 'text-accent-500 fill-accent-500' 
                                  : i < destination.rating 
                                    ? 'text-accent-500 fill-accent-500 opacity-50' 
                                    : 'text-neutral-300'
                              }`} 
                            />
                          ))}
                        </div>
                        <p className="text-neutral-500">{destination.reviews} reviews</p>
                      </div>
                      
                      <div className="md:w-2/3">
                        <div className="space-y-2">
                          {['5', '4', '3', '2', '1'].map(rating => (
                            <div key={rating} className="flex items-center">
                              <span className="w-8 text-sm text-neutral-600">{rating} ★</span>
                              <div className="flex-grow h-2 mx-3 bg-neutral-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-accent-500 rounded-full"
                                  style={{ 
                                    width: `${Math.random() * 100}%`, 
                                  }}
                                ></div>
                              </div>
                              <span className="text-sm text-neutral-600">{Math.floor(Math.random() * 100)}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="bg-white p-6 rounded-lg border border-neutral-200">
                        <div className="flex justify-between mb-4">
                          <div className="flex items-center">
                            <div className="h-12 w-12 rounded-full bg-neutral-200 mr-4"></div>
                            <div>
                              <h4 className="font-bold">Traveler {index + 1}</h4>
                              <p className="text-sm text-neutral-500">Visited {new Date().toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${
                                  i < 5 - index % 2 ? 'text-accent-500 fill-accent-500' : 'text-neutral-300'
                                }`} 
                              />
                            ))}
                          </div>
                        </div>
                        <h5 className="font-bold mb-2">
                          {["Amazing experience!", "Worth visiting!", "Incredible destination"][index % 3]}
                        </h5>
                        <p className="text-neutral-600 mb-4">
                          {["I had a wonderful time exploring this destination. The natural beauty was breathtaking and the local people were very friendly. Highly recommend for nature lovers!",
                            "Great place to visit with family. There's something for everyone here. The activities were fun and educational.",
                            "A perfect getaway from the busy city life. The scenery is absolutely stunning and there are plenty of things to do."][index % 3]}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-neutral-500">
                            {["3 days, couple", "5 days, family", "2 days, solo"][index % 3]}
                          </div>
                          <button className="text-primary-500 text-sm font-medium">Helpful</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* Quick Facts */}
            <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4">Quick Facts</h3>
              <div className="space-y-4">
                <QuickFact 
                  icon={<MapPin className="h-5 w-5 text-primary-500" />}
                  label="Location"
                  value={destination.location}
                />
                <QuickFact 
                  icon={<Clock className="h-5 w-5 text-primary-500" />}
                  label="Recommended Stay"
                  value={destination.recommendedStay || "2-3 days"}
                />
                <QuickFact 
                  icon={<Calendar className="h-5 w-5 text-primary-500" />}
                  label="Best Time to Visit"
                  value={destination.bestTimeToVisit?.period || "November to February"}
                />
                <QuickFact 
                  icon={<DollarSign className="h-5 w-5 text-primary-500" />}
                  label="Budget (per day)"
                  value={destination.budget || "25,000 - 50,000 XAF"}
                />
                <QuickFact 
                  icon={<Users className="h-5 w-5 text-primary-500" />}
                  label="Good For"
                  value={destination.goodFor?.join(", ") || "Couples, Families, Solo travelers"}
                />
              </div>
            </div>
            
            {/* Weather */}
            <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4">Weather</h3>
              <p className="text-neutral-600 mb-4">
                Current average temperatures for {new Date().toLocaleString('default', { month: 'long' })}:
              </p>
              <div className="flex justify-between items-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-500">{Math.floor(Math.random() * 10) + 20}°C</div>
                  <div className="text-sm text-neutral-500">Average Low</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary-500">{Math.floor(Math.random() * 10) + 25}°C</div>
                  <div className="text-sm text-neutral-500">Average High</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-neutral-500">{Math.floor(Math.random() * 20) + 5} days</div>
                  <div className="text-sm text-neutral-500">Rainfall</div>
                </div>
              </div>
            </div>
            
            {/* Ask the Advisor */}
            <div className="bg-primary-50 p-6 rounded-xl border border-primary-100 mb-8">
              <h3 className="text-xl font-bold mb-4">Need More Information?</h3>
              <p className="text-neutral-700 mb-4">
                Our AI Tourism Advisor can help you plan your perfect trip to {destination.name}.
              </p>
              <Link to="/chat" className="btn btn-primary w-full flex items-center justify-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Chat with Advisor
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface TabButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${
        active
          ? 'text-primary-500 border-b-2 border-primary-500'
          : 'text-neutral-500 hover:text-neutral-800'
      }`}
    >
      {label}
    </button>
  );
};

interface QuickFactProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const QuickFact: React.FC<QuickFactProps> = ({ icon, label, value }) => {
  return (
    <div className="flex items-start">
      <div className="mr-3 mt-1">{icon}</div>
      <div>
        <p className="text-sm text-neutral-500">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
};

// Helper function to get coordinates for destinations
function getDestinationCoordinates(destinationName: string): { lat: number; lng: number } | undefined {
  const coordinates: { [key: string]: { lat: number; lng: number } } = {
    'kribi beach': { lat: 2.9391, lng: 9.9073 },
    'mount cameroon': { lat: 4.2034, lng: 9.1706 },
    'limbe botanical garden': { lat: 4.0186, lng: 9.2042 },
    'waza national park': { lat: 11.3167, lng: 14.6667 },
    'bafut palace': { lat: 6.1000, lng: 10.1000 },
    'yaoundé': { lat: 3.8480, lng: 11.5021 },
    'douala': { lat: 4.0511, lng: 9.7679 },
    'dja faunal reserve': { lat: 3.0000, lng: 12.8000 }
  };

  const key = destinationName.toLowerCase();
  return coordinates[key];
}

export default DestinationDetailPage;