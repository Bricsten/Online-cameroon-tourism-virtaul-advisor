import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, Search, Map, List } from 'lucide-react';
import DestinationCard from '../components/destinations/DestinationCard';
import GoogleMap from '../components/maps/GoogleMap';
import { useDestinations, useDestinationsByCategory, useDestinationSearch } from '../hooks/useDestinations';
import { Destination } from '../types/destination';

const CATEGORIES = ['All', 'Nature', 'Culture', 'Beaches', 'Adventure', 'Cities'];

const DestinationsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  
  // Use appropriate hook based on current state
  const { destinations: allDestinations, loading: allLoading } = useDestinations();
  const { destinations: categoryDestinations, loading: categoryLoading } = useDestinationsByCategory(
    activeCategory !== 'All' ? activeCategory : ''
  );
  const { destinations: searchDestinations, loading: searchLoading } = useDestinationSearch(searchTerm);
  
  // Determine which destinations to show
  const getDisplayDestinations = (): Destination[] => {
    if (searchTerm.trim()) {
      return searchDestinations;
    }
    if (activeCategory !== 'All') {
      return categoryDestinations;
    }
    return allDestinations;
  };
  
  const displayDestinations = getDisplayDestinations();
  const loading = searchTerm.trim() ? searchLoading : (activeCategory !== 'All' ? categoryLoading : allLoading);
  
  // Initialize category from URL parameters
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      const formattedCategory = categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1);
      if (CATEGORIES.includes(formattedCategory)) {
        setActiveCategory(formattedCategory);
      }
    }
  }, [searchParams]);
  
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setSearchTerm(''); // Clear search when changing category
    
    // Update URL parameters
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category.toLowerCase());
    }
    setSearchParams(searchParams);
  };
  
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Search is handled by the useDestinationSearch hook
  };

  const getDestinationCoordinates = (destinationName: string): { lat: number; lng: number } | undefined => {
    const coordinates: { [key: string]: { lat: number; lng: number } } = {
      'kribi-beach': { lat: 2.9391, lng: 9.9073 },
      'mount-cameroon': { lat: 4.2034, lng: 9.1706 },
      'limbe-botanical-garden': { lat: 4.0186, lng: 9.2042 },
      'waza-national-park': { lat: 11.3167, lng: 14.6667 },
      'bafut-palace': { lat: 6.1000, lng: 10.1000 },
      'yaoundé': { lat: 3.8480, lng: 11.5021 },
      'douala': { lat: 4.0511, lng: 9.7679 },
      'dja-faunal-reserve': { lat: 3.0000, lng: 12.8000 }
    };

    const key = destinationName.toLowerCase();
    return coordinates[key];
  };
  
  return (
    <div className="pt-24">
      <div className="container mx-auto px-4">
        {/* Hero section */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="mb-4">Explore <span className="text-primary-500">Cameroon</span></h1>
            <p className="text-xl text-neutral-600 max-w-3xl">
              Discover the diverse beauty of Cameroon, from pristine beaches to majestic mountains, 
              vibrant cities to serene wildlife reserves.
            </p>
          </motion.div>
        </section>
        
        {/* Filters and Search */}
        <section className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                    activeCategory === category
                      ? 'bg-primary-500 text-white'
                      : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-neutral-200 rounded-full w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
              </form>
              
              <div className="flex border border-neutral-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${
                    viewMode === 'grid'
                      ? 'bg-primary-500 text-white'
                      : 'bg-white text-neutral-700 hover:bg-neutral-50'
                  }`}
                  aria-label="Grid view"
                >
                  <List className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`p-2 ${
                    viewMode === 'map'
                      ? 'bg-primary-500 text-white'
                      : 'bg-white text-neutral-700 hover:bg-neutral-50'
                  }`}
                  aria-label="Map view"
                >
                  <Map className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <p className="text-neutral-600">
              {loading ? (
                'Loading destinations...'
              ) : (
                <>
                  Showing <span className="font-medium">{displayDestinations.length}</span> destinations
                  {activeCategory !== 'All' && !searchTerm && (
                    <> in <span className="font-medium">{activeCategory}</span></>
                  )}
                  {searchTerm && (
                    <> for "<span className="font-medium">{searchTerm}</span>"</>
                  )}
                </>
              )}
            </p>
            
            <button className="flex items-center text-neutral-700 hover:text-primary-500">
              <Filter className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">More Filters</span>
            </button>
          </div>
        </section>
        
        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-neutral-600">Loading destinations...</p>
          </div>
        )}
        
        {/* Destinations Grid */}
        {!loading && viewMode === 'grid' && (
          <section className="mb-12">
            {displayDestinations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayDestinations.map((destination, index) => (
                  <motion.div
                    key={destination.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <DestinationCard destination={destination} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-bold mb-2">No destinations found</h3>
                <p className="text-neutral-600 mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={() => {
                    setActiveCategory('All');
                    setSearchTerm('');
                    searchParams.delete('category');
                    setSearchParams(searchParams);
                  }}
                  className="btn btn-outline"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </section>
        )}
        
        {/* Map View */}
        {!loading && viewMode === 'map' && (
          <section className="mb-12">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Map */}
              <div className="lg:w-2/3">
                {selectedDestination ? (
                  <GoogleMap 
                    destination={{
                      name: selectedDestination.name,
                      location: selectedDestination.location,
                      coordinates: getDestinationCoordinates(selectedDestination.id)
                    }}
                    className="h-[600px]"
                  />
                ) : (
                  <div className="bg-neutral-100 rounded-xl h-[600px] flex items-center justify-center">
                    <div className="text-center">
                      <Map className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold mb-2">Select a Destination</h3>
                      <p className="text-neutral-600 mb-4">
                        Choose a destination from the list to view it on the map with directions and nearby amenities.
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Destinations List */}
              <div className="lg:w-1/3">
                <h3 className="text-xl font-bold mb-4">Destinations</h3>
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {displayDestinations.map((destination) => (
                    <button
                      key={destination.id}
                      onClick={() => setSelectedDestination(destination)}
                      className={`w-full text-left p-4 rounded-lg border transition-colors ${
                        selectedDestination?.id === destination.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-neutral-200 bg-white hover:bg-neutral-50'
                      }`}
                    >
                      <div className="flex items-start">
                        <img 
                          src={destination.image} 
                          alt={destination.name}
                          className="w-16 h-16 rounded-lg object-cover mr-3 flex-shrink-0"
                        />
                        <div className="flex-grow min-w-0">
                          <h4 className="font-bold text-sm mb-1 truncate">{destination.name}</h4>
                          <p className="text-xs text-neutral-600 mb-2">{destination.location}</p>
                          <div className="flex items-center">
                            <span className="text-xs px-2 py-1 bg-neutral-100 rounded-full">
                              {destination.category}
                            </span>
                            <span className="text-xs text-neutral-500 ml-2">
                              ★ {destination.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default DestinationsPage;