import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Heart, 
  Calendar, 
  Star, 
  MapPin, 
  Clock,
  Trash2,
  Edit,
  Eye
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { SavedDestinationService } from '../services/savedDestinationService';
import { BookingService } from '../services/bookingService';
import { ReviewService } from '../services/reviewService';
import { SavedDestination } from '../types/savedDestination';
import { Booking } from '../types/booking';
import { Review } from '../types/review';
import UserProfile from '../components/user/UserProfile';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const UserDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'saved' | 'bookings' | 'reviews'>('profile');
  const [savedDestinations, setSavedDestinations] = useState<SavedDestination[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user, activeTab]);

  const fetchUserData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      if (activeTab === 'saved') {
        const saved = await SavedDestinationService.getUserSavedDestinations(user.id);
        setSavedDestinations(saved);
      } else if (activeTab === 'bookings') {
        const userBookings = await BookingService.getUserBookings(user.id);
        setBookings(userBookings);
      } else if (activeTab === 'reviews') {
        const userReviews = await ReviewService.getUserReviews(user.id);
        setReviews(userReviews);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleUnsaveDestination = async (destinationId: string) => {
    try {
      await SavedDestinationService.unsaveDestination(destinationId);
      setSavedDestinations(prev => prev.filter(d => d.destination_id !== destinationId));
      toast.success('Destination removed from saved list');
    } catch (error) {
      console.error('Error unsaving destination:', error);
      toast.error('Failed to remove destination');
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await BookingService.cancelBooking(bookingId);
      setBookings(prev => prev.map(b => 
        b.id === bookingId ? { ...b, status: 'cancelled' } : b
      ));
      toast.success('Booking cancelled successfully');
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast.error('Failed to cancel booking');
    }
  };

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      default: return 'text-neutral-600 bg-neutral-100';
    }
  };

  if (!user) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please Sign In</h2>
          <p className="text-neutral-600 mb-6">You need to be signed in to access your dashboard.</p>
          <Link to="/auth" className="btn btn-primary">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
          <p className="text-neutral-600">
            Welcome back, {user.email?.split('@')[0]}! Manage your travel preferences and bookings.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="flex overflow-x-auto">
            <TabButton
              icon={<User className="h-5 w-5" />}
              label="Profile"
              active={activeTab === 'profile'}
              onClick={() => setActiveTab('profile')}
            />
            <TabButton
              icon={<Heart className="h-5 w-5" />}
              label="Saved Destinations"
              active={activeTab === 'saved'}
              onClick={() => setActiveTab('saved')}
              count={savedDestinations.length}
            />
            <TabButton
              icon={<Calendar className="h-5 w-5" />}
              label="My Bookings"
              active={activeTab === 'bookings'}
              onClick={() => setActiveTab('bookings')}
              count={bookings.length}
            />
            <TabButton
              icon={<Star className="h-5 w-5" />}
              label="My Reviews"
              active={activeTab === 'reviews'}
              onClick={() => setActiveTab('reviews')}
              count={reviews.length}
            />
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'profile' && <UserProfile />}

          {activeTab === 'saved' && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Saved Destinations</h2>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-neutral-600">Loading saved destinations...</p>
                </div>
              ) : savedDestinations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedDestinations.map((saved) => (
                    <motion.div
                      key={saved.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border border-neutral-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <img
                        src={saved.destination_image}
                        alt={saved.destination_name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-bold mb-1">{saved.destination_name}</h3>
                        <p className="text-sm text-neutral-600 mb-2 flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {saved.destination_location}
                        </p>
                        <span className="inline-block px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full mb-3">
                          {saved.destination_category}
                        </span>
                        {saved.notes && (
                          <p className="text-sm text-neutral-600 mb-3">{saved.notes}</p>
                        )}
                        <div className="flex justify-between items-center">
                          <Link
                            to={`/destinations/${saved.destination_id}`}
                            className="text-primary-500 hover:text-primary-600 text-sm font-medium flex items-center"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Link>
                          <button
                            onClick={() => handleUnsaveDestination(saved.destination_id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Heart className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">No Saved Destinations</h3>
                  <p className="text-neutral-600 mb-6">
                    Start exploring and save destinations you'd like to visit!
                  </p>
                  <Link to="/destinations" className="btn btn-primary">
                    Explore Destinations
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">My Bookings</h2>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-neutral-600">Loading bookings...</p>
                </div>
              ) : bookings.length > 0 ? (
                <div className="space-y-6">
                  {bookings.map((booking) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border border-neutral-200 rounded-lg p-6"
                    >
                      <div className="flex flex-col md:flex-row gap-6">
                        <img
                          src={booking.destination_image}
                          alt={booking.destination_name}
                          className="w-full md:w-32 h-32 object-cover rounded-lg"
                        />
                        <div className="flex-grow">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-bold mb-1">{booking.destination_name}</h3>
                              <p className="text-neutral-600 mb-2">
                                Booking ID: {booking.id.slice(0, 8)}...
                              </p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-neutral-500">Travel Date</p>
                              <p className="font-medium">{new Date(booking.travel_date).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-neutral-500">Travelers</p>
                              <p className="font-medium">{booking.number_of_travelers}</p>
                            </div>
                            <div>
                              <p className="text-sm text-neutral-500">Booked On</p>
                              <p className="font-medium">{new Date(booking.created_at).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-neutral-500">Contact</p>
                              <p className="font-medium">{booking.contact_info.phone}</p>
                            </div>
                          </div>

                          {booking.special_requests && (
                            <div className="mb-4">
                              <p className="text-sm text-neutral-500 mb-1">Special Requests</p>
                              <p className="text-sm">{booking.special_requests}</p>
                            </div>
                          )}

                          <div className="flex justify-between items-center">
                            <Link
                              to={`/destinations/${booking.destination_id}`}
                              className="text-primary-500 hover:text-primary-600 text-sm font-medium"
                            >
                              View Destination
                            </Link>
                            {booking.status === 'pending' && (
                              <button
                                onClick={() => handleCancelBooking(booking.id)}
                                className="text-red-500 hover:text-red-600 text-sm font-medium"
                              >
                                Cancel Booking
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">No Bookings Yet</h3>
                  <p className="text-neutral-600 mb-6">
                    Book your first adventure to beautiful Cameroon!
                  </p>
                  <Link to="/destinations" className="btn btn-primary">
                    Browse Destinations
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">My Reviews</h2>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-neutral-600">Loading reviews...</p>
                </div>
              ) : reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border border-neutral-200 rounded-lg p-6"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold mb-1">{review.title}</h3>
                          <div className="flex items-center mb-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? 'text-accent-500 fill-accent-500'
                                    : 'text-neutral-300'
                                }`}
                              />
                            ))}
                            <span className="ml-2 text-sm text-neutral-600">
                              {new Date(review.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-primary-500 hover:text-primary-600">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-red-500 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-neutral-700 mb-4">{review.content}</p>
                      
                      <div className="flex justify-between items-center text-sm text-neutral-500">
                        <div className="flex items-center space-x-4">
                          {review.travel_date && (
                            <span>Visited: {new Date(review.travel_date).toLocaleDateString()}</span>
                          )}
                          {review.travel_type && (
                            <span>Travel type: {review.travel_type}</span>
                          )}
                        </div>
                        <span>{review.helpful_count} people found this helpful</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Star className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">No Reviews Yet</h3>
                  <p className="text-neutral-600 mb-6">
                    Share your travel experiences by writing reviews!
                  </p>
                  <Link to="/destinations" className="btn btn-primary">
                    Find Destinations to Review
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface TabButtonProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  count?: number;
}

const TabButton: React.FC<TabButtonProps> = ({ icon, label, active, onClick, count }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
        active
          ? 'text-primary-500 border-primary-500 bg-primary-50'
          : 'text-neutral-600 border-transparent hover:text-neutral-800 hover:bg-neutral-50'
      }`}
    >
      {icon}
      <span className="ml-2">{label}</span>
      {count !== undefined && count > 0 && (
        <span className="ml-2 px-2 py-1 bg-primary-100 text-primary-600 text-xs rounded-full">
          {count}
        </span>
      )}
    </button>
  );
};

export default UserDashboardPage;