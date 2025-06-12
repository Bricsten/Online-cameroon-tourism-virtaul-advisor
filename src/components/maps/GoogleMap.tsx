import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, Hotel, Utensils, Building2, Heart, Dumbbell, Car } from 'lucide-react';

interface GoogleMapProps {
  destination: {
    name: string;
    location: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  className?: string;
}

interface NearbyPlace {
  place_id: string;
  name: string;
  vicinity: string;
  rating?: number;
  types: string[];
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

const GoogleMap: React.FC<GoogleMapProps> = ({ destination, className = '' }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [userLocation, setUserLocation] = useState<google.maps.LatLng | null>(null);
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  const [placesService, setPlacesService] = useState<google.maps.places.PlacesService | null>(null);
  const [nearbyPlaces, setNearbyPlaces] = useState<NearbyPlace[]>([]);
  const [selectedAmenity, setSelectedAmenity] = useState<string>('lodging');
  const [isLoadingDirections, setIsLoadingDirections] = useState(false);
  const [isLoadingPlaces, setIsLoadingPlaces] = useState(false);

  // Default coordinates for Cameroon destinations (you can expand this)
  const destinationCoordinates = destination.coordinates || getDefaultCoordinates(destination.name);

  useEffect(() => {
    if (!window.google) {
      loadGoogleMapsScript();
      return;
    }
    initializeMap();
  }, []);

  useEffect(() => {
    if (map && placesService) {
      searchNearbyPlaces(selectedAmenity);
    }
  }, [selectedAmenity, map, placesService]);

  const loadGoogleMapsScript = () => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places,geometry`;
    script.async = true;
    script.defer = true;
    script.onload = initializeMap;
    document.head.appendChild(script);
  };

  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;

    const mapInstance = new google.maps.Map(mapRef.current, {
      center: destinationCoordinates,
      zoom: 13,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'on' }]
        }
      ]
    });

    // Add destination marker
    new google.maps.Marker({
      position: destinationCoordinates,
      map: mapInstance,
      title: destination.name,
      icon: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="18" fill="#00b200" stroke="white" stroke-width="4"/>
            <path d="M20 10L20 30M10 20L30 20" stroke="white" stroke-width="3" stroke-linecap="round"/>
          </svg>
        `),
        scaledSize: new google.maps.Size(40, 40),
        anchor: new google.maps.Point(20, 20)
      }
    });

    const directionsServiceInstance = new google.maps.DirectionsService();
    const directionsRendererInstance = new google.maps.DirectionsRenderer({
      suppressMarkers: false,
      polylineOptions: {
        strokeColor: '#00b200',
        strokeWeight: 4
      }
    });
    
    directionsRendererInstance.setMap(mapInstance);

    const placesServiceInstance = new google.maps.places.PlacesService(mapInstance);

    setMap(mapInstance);
    setDirectionsService(directionsServiceInstance);
    setDirectionsRenderer(directionsRendererInstance);
    setPlacesService(placesServiceInstance);

    // Get user location
    getUserLocation();
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );
          setUserLocation(userPos);
          
          if (map) {
            new google.maps.Marker({
              position: userPos,
              map: map,
              title: 'Your Location',
              icon: {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="15" cy="15" r="13" fill="#eb0000" stroke="white" stroke-width="4"/>
                    <circle cx="15" cy="15" r="6" fill="white"/>
                  </svg>
                `),
                scaledSize: new google.maps.Size(30, 30),
                anchor: new google.maps.Point(15, 15)
              }
            });
          }
        },
        (error) => {
          console.warn('Error getting user location:', error);
        }
      );
    }
  };

  const getDirections = () => {
    if (!directionsService || !directionsRenderer || !userLocation) {
      alert('Unable to get directions. Please ensure location access is enabled.');
      return;
    }

    setIsLoadingDirections(true);

    directionsService.route(
      {
        origin: userLocation,
        destination: destinationCoordinates,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        setIsLoadingDirections(false);
        if (status === 'OK' && result) {
          directionsRenderer.setDirections(result);
        } else {
          alert('Could not get directions. Please try again.');
        }
      }
    );
  };

  const searchNearbyPlaces = (type: string) => {
    if (!placesService || !map) return;

    setIsLoadingPlaces(true);
    setNearbyPlaces([]);

    const request = {
      location: destinationCoordinates,
      radius: 5000, // 5km radius
      type: type as any
    };

    placesService.nearbySearch(request, (results, status) => {
      setIsLoadingPlaces(false);
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        const places = results.slice(0, 10).map(place => ({
          place_id: place.place_id!,
          name: place.name!,
          vicinity: place.vicinity!,
          rating: place.rating,
          types: place.types!,
          geometry: {
            location: {
              lat: place.geometry!.location!.lat(),
              lng: place.geometry!.location!.lng()
            }
          }
        }));
        
        setNearbyPlaces(places);

        // Clear existing markers for amenities
        // Add new markers for found places
        places.forEach(place => {
          new google.maps.Marker({
            position: place.geometry.location,
            map: map,
            title: place.name,
            icon: {
              url: getMarkerIcon(type),
              scaledSize: new google.maps.Size(25, 25),
              anchor: new google.maps.Point(12.5, 12.5)
            }
          });
        });
      }
    });
  };

  const getMarkerIcon = (type: string): string => {
    const iconColor = getAmenityColor(type);
    return `data:image/svg+xml;charset=UTF-8,` + encodeURIComponent(`
      <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12.5" cy="12.5" r="11" fill="${iconColor}" stroke="white" stroke-width="2"/>
        <circle cx="12.5" cy="12.5" r="4" fill="white"/>
      </svg>
    `);
  };

  const getAmenityColor = (type: string): string => {
    const colors: { [key: string]: string } = {
      lodging: '#ffc300',
      restaurant: '#ff6b35',
      hospital: '#eb0000',
      bank: '#4a90e2',
      gym: '#7b68ee',
      gas_station: '#32cd32'
    };
    return colors[type] || '#666666';
  };

  const getAmenityIcon = (type: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      lodging: <Hotel className="h-4 w-4" />,
      restaurant: <Utensils className="h-4 w-4" />,
      hospital: <Heart className="h-4 w-4" />,
      bank: <Building2 className="h-4 w-4" />,
      gym: <Dumbbell className="h-4 w-4" />,
      gas_station: <Car className="h-4 w-4" />
    };
    return icons[type] || <MapPin className="h-4 w-4" />;
  };

  const amenityTypes = [
    { key: 'lodging', label: 'Hotels & Lodging' },
    { key: 'restaurant', label: 'Restaurants' },
    { key: 'hospital', label: 'Hospitals' },
    { key: 'bank', label: 'Banks' },
    { key: 'gym', label: 'Gyms' },
    { key: 'gas_station', label: 'Gas Stations' }
  ];

  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>
      <div className="p-4 border-b border-neutral-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-lg font-bold mb-1">{destination.name}</h3>
            <p className="text-sm text-neutral-600">{destination.location}</p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={getDirections}
              disabled={!userLocation || isLoadingDirections}
              className="btn btn-primary flex items-center text-sm px-3 py-2"
            >
              <Navigation className="h-4 w-4 mr-1" />
              {isLoadingDirections ? 'Loading...' : 'Get Directions'}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Map */}
        <div className="lg:w-2/3">
          <div ref={mapRef} className="h-96 lg:h-[500px] w-full" />
        </div>

        {/* Amenities Panel */}
        <div className="lg:w-1/3 p-4 bg-neutral-50">
          <h4 className="font-bold mb-3">Nearby Amenities</h4>
          
          {/* Amenity Type Selector */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {amenityTypes.map(amenity => (
              <button
                key={amenity.key}
                onClick={() => setSelectedAmenity(amenity.key)}
                className={`flex items-center justify-center p-2 rounded-lg text-xs font-medium transition-colors ${
                  selectedAmenity === amenity.key
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                <span className="mr-1">{getAmenityIcon(amenity.key)}</span>
                {amenity.label}
              </button>
            ))}
          </div>

          {/* Places List */}
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {isLoadingPlaces ? (
              <div className="text-center py-4">
                <div className="animate-spin h-6 w-6 border-2 border-primary-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                <p className="text-sm text-neutral-600">Finding nearby places...</p>
              </div>
            ) : nearbyPlaces.length > 0 ? (
              nearbyPlaces.map(place => (
                <div key={place.place_id} className="bg-white p-3 rounded-lg border border-neutral-200">
                  <h5 className="font-medium text-sm mb-1">{place.name}</h5>
                  <p className="text-xs text-neutral-600 mb-1">{place.vicinity}</p>
                  {place.rating && (
                    <div className="flex items-center">
                      <span className="text-xs text-accent-600 font-medium">★ {place.rating}</span>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm text-neutral-600 text-center py-4">
                No {amenityTypes.find(a => a.key === selectedAmenity)?.label.toLowerCase()} found nearby
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get default coordinates for destinations
function getDefaultCoordinates(destinationName: string): google.maps.LatLng {
  const coordinates: { [key: string]: { lat: number; lng: number } } = {
    'kribi': { lat: 2.9391, lng: 9.9073 },
    'mount cameroon': { lat: 4.2034, lng: 9.1706 },
    'limbe': { lat: 4.0186, lng: 9.2042 },
    'waza national park': { lat: 11.3167, lng: 14.6667 },
    'bafut': { lat: 6.1000, lng: 10.1000 },
    'yaoundé': { lat: 3.8480, lng: 11.5021 },
    'douala': { lat: 4.0511, lng: 9.7679 },
    'dja reserve': { lat: 3.0000, lng: 12.8000 }
  };

  const key = destinationName.toLowerCase();
  const coords = coordinates[key] || coordinates['yaoundé']; // Default to Yaoundé
  
  return new google.maps.LatLng(coords.lat, coords.lng);
}

export default GoogleMap;