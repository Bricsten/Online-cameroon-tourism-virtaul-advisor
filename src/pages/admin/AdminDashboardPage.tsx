import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Star, LogOut, Trash2, Edit, Plus, MapPin, Upload, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAdmin } from '../../contexts/AdminContext';
import { supabase } from '../../lib/supabase';
import { BookingService } from '../../services/bookingService';
import { Booking } from '../../types/booking';

interface Profile {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string;
  created_at: string;
}

interface Review {
  id: string;
  user_id: string;
  destination_id: string;
  rating: number;
  title: string;
  content: string;
  created_at: string;
  profiles: {
    username: string;
  };
}

interface Destination {
  id: string;
  name: string;
  slug: string;
  location: string;
  description: string;
  category: string;
  image_url: string;
  image_file?: File | null;
  rating: number;
  review_count: number;
  coordinates: { lat: number; lng: number };
  recommended_stay: string;
  budget_range: string;
  best_time_to_visit: {
    period: string;
    description: string;
    recommendedMonths: number[];
  };
  good_for: string[];
  highlights: string[];
  cultural_etiquette: string[];
  amenities: {
    name: string;
    type: string;
    address: string;
    coordinates: { lat: number; lng: number };
    rating: number;
    contact_info: {
      phone?: string;
      email?: string;
      website?: string;
    };
  }[];
}

const AdminDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profiles' | 'reviews' | 'destinations' | 'bookings'>('profiles');
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingDestination, setEditingDestination] = useState<Destination | null>(null);
  const { admin, logout } = useAdmin();
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!admin.isAuthenticated) {
      navigate('/admin');
      return;
    }
    
    fetchData();
  }, [admin.isAuthenticated, navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      if (activeTab === 'destinations') {
        console.log('Fetching destinations...');
        const { data, error } = await supabase
          .from('destinations')
          .select(`
            *,
            destination_highlights(highlight),
            cultural_etiquette(etiquette_tip),
            destination_amenities(*)
          `)
          .order('name', { ascending: true });
        
        if (error) {
          console.error('Error fetching destinations:', error);
          toast.error('Failed to fetch destinations');
          return;
        }

        // Transform the data to match our interface
        const transformedData = data?.map(dest => ({
          ...dest,
          highlights: dest.destination_highlights?.map((h: { highlight: string }) => h.highlight) || [],
          cultural_etiquette: dest.cultural_etiquette?.map((e: { etiquette_tip: string }) => e.etiquette_tip) || [],
          amenities: dest.destination_amenities || []
        })) || [];

        console.log('Fetched destinations:', transformedData);
        setDestinations(transformedData);
      } else if (activeTab === 'profiles') {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setProfiles(data || []);
      } else if (activeTab === 'reviews') {
        const { data, error } = await supabase
          .from('reviews')
          .select('*, profiles(username)')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setReviews(data || []);
      } else if (activeTab === 'bookings') {
        const allBookings = await BookingService.getAllBookings();
        setBookings(allBookings);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from(activeTab)
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success(`${activeTab === 'profiles' ? 'Profile' : activeTab === 'reviews' ? 'Review' : 'Destination'} deleted successfully`);
      fetchData();
    } catch (error) {
      console.error('Error deleting:', error);
      toast.error('Failed to delete');
    }
  };

  const handleEdit = (destination: Destination) => {
    setEditingDestination(destination);
    setIsEditing(true);
  };

  const validateForm = (destination: Destination): boolean => {
    const errors: { [key: string]: string } = {};

    if (!destination.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!destination.location.trim()) {
      errors.location = 'Location is required';
    }
    if (!destination.description.trim()) {
      errors.description = 'Description is required';
    }
    if (!destination.category.trim()) {
      errors.category = 'Category is required';
    }
    if (!destination.image_file && !destination.image_url) {
      errors.image = 'Image is required';
    }
    if (!destination.recommended_stay.trim()) {
      errors.recommended_stay = 'Recommended stay is required';
    }
    if (!destination.budget_range.trim()) {
      errors.budget_range = 'Budget range is required';
    }
    if (!destination.best_time_to_visit.period.trim()) {
      errors.best_time_to_visit = 'Best time to visit is required';
    }
    if (destination.good_for.length === 0) {
      errors.good_for = 'At least one target audience is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveDestination = async (destination: Destination) => {
    if (!validateForm(destination)) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);
    try {
      let imageUrl = destination.image_url;

      // If there's a new image file, upload it
      if (destination.image_file) {
        const fileExt = destination.image_file.name.split('.').pop();
        const fileName = `${destination.slug}-${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('destination-images')
          .upload(filePath, destination.image_file);

        if (uploadError) throw uploadError;

        // Get the public URL
        const { data: { publicUrl } } = supabase.storage
          .from('destination-images')
          .getPublicUrl(filePath);

        imageUrl = publicUrl;
      }

      // Start a Supabase transaction
      const { data: destinationData, error: destinationError } = await supabase
        .from('destinations')
        .upsert({
          id: destination.id || undefined,
          name: destination.name,
          slug: destination.slug,
          location: destination.location,
          description: destination.description,
          category: destination.category,
          image_url: imageUrl,
          rating: destination.rating || 0,
          review_count: destination.review_count || 0,
          coordinates: destination.coordinates ? 
            `POINT(${destination.coordinates.lng} ${destination.coordinates.lat})` : 
            null,
          recommended_stay: destination.recommended_stay,
          budget_range: destination.budget_range,
          best_time_to_visit: destination.best_time_to_visit,
          good_for: destination.good_for
        })
        .select()
        .single();

      if (destinationError) throw destinationError;

      const destinationId = destinationData.id;

      // Handle highlights
      if (destination.highlights.length > 0) {
        const { error: highlightsError } = await supabase
          .from('destination_highlights')
          .delete()
          .eq('destination_id', destinationId);

        if (highlightsError) throw highlightsError;

        const { error: highlightsInsertError } = await supabase
          .from('destination_highlights')
          .insert(
            destination.highlights.map((highlight, index) => ({
              destination_id: destinationId,
              highlight,
              order_index: index
            }))
          );

        if (highlightsInsertError) throw highlightsInsertError;
      }

      // Handle cultural etiquette
      if (destination.cultural_etiquette.length > 0) {
        const { error: etiquetteError } = await supabase
          .from('cultural_etiquette')
          .delete()
          .eq('destination_id', destinationId);

        if (etiquetteError) throw etiquetteError;

        const { error: etiquetteInsertError } = await supabase
          .from('cultural_etiquette')
          .insert(
            destination.cultural_etiquette.map((tip, index) => ({
              destination_id: destinationId,
              etiquette_tip: tip,
              order_index: index
            }))
          );

        if (etiquetteInsertError) throw etiquetteInsertError;
      }

      // Handle amenities
      if (destination.amenities && destination.amenities.length > 0) {
        const { error: amenitiesError } = await supabase
          .from('destination_amenities')
          .delete()
          .eq('destination_id', destinationId);

        if (amenitiesError) throw amenitiesError;

        const { error: amenitiesInsertError } = await supabase
          .from('destination_amenities')
          .insert(
            destination.amenities.map(amenity => ({
              destination_id: destinationId,
              name: amenity.name,
              type: amenity.type,
              address: amenity.address,
              coordinates: amenity.coordinates ? 
                `POINT(${amenity.coordinates.lng} ${amenity.coordinates.lat})` : 
                null,
              rating: amenity.rating,
              contact_info: amenity.contact_info
            }))
          );

        if (amenitiesInsertError) throw amenitiesInsertError;
      }

      toast.success('Destination saved successfully');
      setIsEditing(false);
      setEditingDestination(null);
      fetchData();
    } catch (error) {
      console.error('Error saving destination:', error);
      toast.error('Failed to save destination');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateBookingStatus = async (bookingId: string, status: Booking['status']) => {
    try {
      await BookingService.updateBookingStatus(bookingId, status);
      setBookings(prev => prev.map(b => 
        b.id === bookingId ? { ...b, status } : b
      ));
      toast.success(`Booking ${status} successfully`);
    } catch (error) {
      console.error('Error updating booking status:', error);
      toast.error('Failed to update booking status');
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

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-neutral-600">
                Logged in as <span className="font-medium">{admin.username}</span>
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-outline flex items-center"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>

          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('profiles')}
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeTab === 'profiles'
                  ? 'bg-primary-500 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              <Users className="h-5 w-5 mr-2" />
              User Profiles
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeTab === 'reviews'
                  ? 'bg-primary-500 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              <Star className="h-5 w-5 mr-2" />
              Reviews
            </button>
            <button
              onClick={() => setActiveTab('destinations')}
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeTab === 'destinations'
                  ? 'bg-primary-500 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              <MapPin className="h-5 w-5 mr-2" />
              Destinations
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeTab === 'bookings'
                  ? 'bg-primary-500 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              <Calendar className="h-5 w-5 mr-2" />
              Bookings
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-neutral-600">Loading data...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              {activeTab === 'profiles' ? (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-3 px-4">Username</th>
                      <th className="text-left py-3 px-4">Full Name</th>
                      <th className="text-left py-3 px-4">Created At</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profiles.map((profile) => (
                      <motion.tr
                        key={profile.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="border-b border-neutral-100"
                      >
                        <td className="py-3 px-4">{profile.username}</td>
                        <td className="py-3 px-4">{profile.full_name || '-'}</td>
                        <td className="py-3 px-4">
                          {new Date(profile.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleDelete(profile.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              ) : activeTab === 'reviews' ? (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-3 px-4">User</th>
                      <th className="text-left py-3 px-4">Title</th>
                      <th className="text-left py-3 px-4">Rating</th>
                      <th className="text-left py-3 px-4">Content</th>
                      <th className="text-left py-3 px-4">Created At</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviews.map((review) => (
                      <motion.tr
                        key={review.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="border-b border-neutral-100"
                      >
                        <td className="py-3 px-4">{review.profiles?.username}</td>
                        <td className="py-3 px-4 font-medium">{review.title}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-accent-500 fill-accent-500" />
                            <span className="ml-1">{review.rating}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <p className="truncate max-w-md">{review.content}</p>
                        </td>
                        <td className="py-3 px-4">
                          {new Date(review.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleDelete(review.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              ) : activeTab === 'bookings' ? (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Booking Management</h2>
                    <div className="flex space-x-2 text-sm">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
                        Pending: {bookings.filter(b => b.status === 'pending').length}
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
                        Confirmed: {bookings.filter(b => b.status === 'confirmed').length}
                      </span>
                    </div>
                  </div>

                  {bookings.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg border border-neutral-200">
                      <Calendar className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                      <p className="text-neutral-600">No bookings found</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {bookings.map((booking) => (
                        <motion.div
                          key={booking.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="bg-white p-6 rounded-lg border border-neutral-200 hover:shadow-md transition-shadow"
                        >
                          <div className="flex flex-col lg:flex-row gap-6">
                            <img
                              src={booking.destination_image}
                              alt={booking.destination_name}
                              className="w-full lg:w-32 h-32 object-cover rounded-lg"
                            />
                            <div className="flex-grow">
                              <div className="flex justify-between items-start mb-4">
                                <div>
                                  <h3 className="text-lg font-bold mb-1">{booking.destination_name}</h3>
                                  <p className="text-neutral-600 text-sm">
                                    Booking ID: {booking.id.slice(0, 8)}...
                                  </p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                </span>
                              </div>
                              
                              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                <div>
                                  <p className="text-sm text-neutral-500">Travel Date</p>
                                  <p className="font-medium">{new Date(booking.travel_date).toLocaleDateString()}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-neutral-500">Travelers</p>
                                  <p className="font-medium">{booking.number_of_travelers}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-neutral-500">Contact</p>
                                  <p className="font-medium text-sm">{booking.contact_info.phone}</p>
                                  <p className="text-sm text-neutral-600">{booking.contact_info.email}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-neutral-500">Booked On</p>
                                  <p className="font-medium">{new Date(booking.created_at).toLocaleDateString()}</p>
                                </div>
                              </div>

                              {booking.special_requests && (
                                <div className="mb-4">
                                  <p className="text-sm text-neutral-500 mb-1">Special Requests</p>
                                  <p className="text-sm bg-neutral-50 p-2 rounded">{booking.special_requests}</p>
                                </div>
                              )}

                              <div className="flex justify-end space-x-2">
                                {booking.status === 'pending' && (
                                  <>
                                    <button
                                      onClick={() => handleUpdateBookingStatus(booking.id, 'confirmed')}
                                      className="flex items-center px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 text-sm"
                                    >
                                      <CheckCircle className="h-4 w-4 mr-1" />
                                      Confirm
                                    </button>
                                    <button
                                      onClick={() => handleUpdateBookingStatus(booking.id, 'cancelled')}
                                      className="flex items-center px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm"
                                    >
                                      <XCircle className="h-4 w-4 mr-1" />
                                      Cancel
                                    </button>
                                  </>
                                )}
                                {booking.status === 'confirmed' && (
                                  <button
                                    onClick={() => handleUpdateBookingStatus(booking.id, 'completed')}
                                    className="flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm"
                                  >
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Mark Complete
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Destinations</h2>
                    <button
                      onClick={() => {
                        setEditingDestination({
                          id: '',
                          name: '',
                          slug: '',
                          location: '',
                          description: '',
                          category: '',
                          image_url: '',
                          rating: 0,
                          review_count: 0,
                          coordinates: { lat: 0, lng: 0 },
                          recommended_stay: '',
                          budget_range: '',
                          best_time_to_visit: {
                            period: '',
                            description: '',
                            recommendedMonths: []
                          },
                          good_for: [],
                          highlights: [],
                          cultural_etiquette: [],
                          amenities: []
                        });
                        setIsEditing(true);
                      }}
                      className="btn btn-primary flex items-center"
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      Add Destination
                    </button>
                  </div>

                  {loading ? (
                    <div className="text-center py-12">
                      <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                      <p className="text-neutral-600">Loading destinations...</p>
                    </div>
                  ) : destinations.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg border border-neutral-200">
                      <p className="text-neutral-600 mb-4">No destinations found</p>
                      <button
                        onClick={() => {
                          setEditingDestination({
                            id: '',
                            name: '',
                            slug: '',
                            location: '',
                            description: '',
                            category: '',
                            image_url: '',
                            rating: 0,
                            review_count: 0,
                            coordinates: { lat: 0, lng: 0 },
                            recommended_stay: '',
                            budget_range: '',
                            best_time_to_visit: {
                              period: '',
                              description: '',
                              recommendedMonths: []
                            },
                            good_for: [],
                            highlights: [],
                            cultural_etiquette: [],
                            amenities: []
                          });
                          setIsEditing(true);
                        }}
                        className="btn btn-primary"
                      >
                        Add Your First Destination
                      </button>
                    </div>
                  ) : (
                    <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-neutral-50 border-b border-neutral-200">
                            <th className="text-left py-3 px-4 font-medium text-neutral-600">Name</th>
                            <th className="text-left py-3 px-4 font-medium text-neutral-600">Location</th>
                            <th className="text-left py-3 px-4 font-medium text-neutral-600">Category</th>
                            <th className="text-left py-3 px-4 font-medium text-neutral-600">Rating</th>
                            <th className="text-left py-3 px-4 font-medium text-neutral-600">Reviews</th>
                            <th className="text-right py-3 px-4 font-medium text-neutral-600">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {destinations.map((destination) => (
                            <motion.tr
                              key={destination.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="border-b border-neutral-100 hover:bg-neutral-50"
                            >
                              <td className="py-3 px-4">
                                <div className="flex items-center">
                                  {destination.image_url && (
                                    <img
                                      src={destination.image_url}
                                      alt={destination.name}
                                      className="w-10 h-10 rounded-lg object-cover mr-3"
                                    />
                                  )}
                                  <span className="font-medium">{destination.name}</span>
                                </div>
                              </td>
                              <td className="py-3 px-4">{destination.location}</td>
                              <td className="py-3 px-4">
                                <span className="px-2 py-1 bg-primary-50 text-primary-700 rounded-full text-sm">
                                  {destination.category}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 text-accent-500 fill-accent-500" />
                                  <span className="ml-1">{destination.rating.toFixed(1)}</span>
                                </div>
                              </td>
                              <td className="py-3 px-4">{destination.review_count}</td>
                              <td className="py-3 px-4 text-right">
                                <button
                                  onClick={() => handleEdit(destination)}
                                  className="text-primary-500 hover:text-primary-700 mr-4"
                                  title="Edit destination"
                                >
                                  <Edit className="h-5 w-5" />
                                </button>
                                <button
                                  onClick={() => handleDelete(destination.id)}
                                  className="text-red-500 hover:text-red-700"
                                  title="Delete destination"
                                >
                                  <Trash2 className="h-5 w-5" />
                                </button>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Destination Edit Modal */}
      {isEditing && editingDestination && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {editingDestination.id ? 'Edit Destination' : 'Add Destination'}
              </h2>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditingDestination(null);
                  setFormErrors({});
                }}
                className="text-neutral-500 hover:text-neutral-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSaveDestination(editingDestination);
            }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={editingDestination.name}
                    onChange={(e) => setEditingDestination({
                      ...editingDestination,
                      name: e.target.value,
                      slug: e.target.value.toLowerCase().replace(/\s+/g, '-')
                    })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      formErrors.name ? 'border-red-500' : 'border-neutral-300'
                    } focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                    required
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={editingDestination.location}
                    onChange={(e) => setEditingDestination({
                      ...editingDestination,
                      location: e.target.value
                    })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      formErrors.location ? 'border-red-500' : 'border-neutral-300'
                    } focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                    required
                  />
                  {formErrors.location && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.location}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
                  <textarea
                    value={editingDestination.description}
                    onChange={(e) => setEditingDestination({
                      ...editingDestination,
                      description: e.target.value
                    })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      formErrors.description ? 'border-red-500' : 'border-neutral-300'
                    } focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                    rows={4}
                    required
                  />
                  {formErrors.description && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.description}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Category</label>
                  <select
                    value={editingDestination.category}
                    onChange={(e) => setEditingDestination({
                      ...editingDestination,
                      category: e.target.value
                    })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      formErrors.category ? 'border-red-500' : 'border-neutral-300'
                    } focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="Beaches">Beaches</option>
                    <option value="Nature">Nature</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Urban">Urban</option>
                  </select>
                  {formErrors.category && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.category}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Image <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center space-x-4">
                    {editingDestination.image_url && (
                      <img
                        src={editingDestination.image_url}
                        alt="Preview"
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setEditingDestination({
                              ...editingDestination,
                              image_file: file
                            });
                          }
                        }}
                        className="hidden"
                        id="image-upload"
                        required={!editingDestination.image_url}
                      />
                      <label
                        htmlFor="image-upload"
                        className="flex items-center justify-center px-4 py-2 border border-neutral-300 rounded-lg cursor-pointer hover:bg-neutral-50"
                      >
                        <Upload className="h-5 w-5 mr-2" />
                        {editingDestination.image_file ? 'Change Image' : 'Upload Image'}
                      </label>
                      {editingDestination.image_file && (
                        <p className="mt-1 text-sm text-neutral-500">
                          Selected: {editingDestination.image_file.name}
                        </p>
                      )}
                    </div>
                  </div>
                  {formErrors.image && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.image}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Recommended Stay</label>
                  <input
                    type="text"
                    value={editingDestination.recommended_stay}
                    onChange={(e) => setEditingDestination({
                      ...editingDestination,
                      recommended_stay: e.target.value
                    })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      formErrors.recommended_stay ? 'border-red-500' : 'border-neutral-300'
                    } focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                    placeholder="e.g., 2-3 days"
                    required
                  />
                  {formErrors.recommended_stay && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.recommended_stay}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Budget Range</label>
                  <input
                    type="text"
                    value={editingDestination.budget_range}
                    onChange={(e) => setEditingDestination({
                      ...editingDestination,
                      budget_range: e.target.value
                    })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      formErrors.budget_range ? 'border-red-500' : 'border-neutral-300'
                    } focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                    placeholder="e.g., 25,000 - 50,000 XAF per day"
                    required
                  />
                  {formErrors.budget_range && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.budget_range}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Best Time to Visit</label>
                  <input
                    type="text"
                    value={editingDestination.best_time_to_visit.period}
                    onChange={(e) => setEditingDestination({
                      ...editingDestination,
                      best_time_to_visit: {
                        ...editingDestination.best_time_to_visit,
                        period: e.target.value
                      }
                    })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      formErrors.best_time_to_visit ? 'border-red-500' : 'border-neutral-300'
                    } focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                    placeholder="e.g., November to February"
                    required
                  />
                  {formErrors.best_time_to_visit && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.best_time_to_visit}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Good For</label>
                  <input
                    type="text"
                    value={editingDestination.good_for.join(', ')}
                    onChange={(e) => setEditingDestination({
                      ...editingDestination,
                      good_for: e.target.value.split(',').map(item => item.trim())
                    })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      formErrors.good_for ? 'border-red-500' : 'border-neutral-300'
                    } focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                    placeholder="e.g., Couples, Families, Beach lovers"
                    required
                  />
                  {formErrors.good_for && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.good_for}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Highlights (Optional)
                  </label>
                  <textarea
                    value={editingDestination.highlights.join('\n')}
                    onChange={(e) => setEditingDestination({
                      ...editingDestination,
                      highlights: e.target.value.split('\n').filter(line => line.trim())
                    })}
                    className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    rows={4}
                    placeholder="Enter each highlight on a new line (optional)"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Cultural Etiquette (Optional)
                  </label>
                  <textarea
                    value={editingDestination.cultural_etiquette.join('\n')}
                    onChange={(e) => setEditingDestination({
                      ...editingDestination,
                      cultural_etiquette: e.target.value.split('\n').filter(line => line.trim())
                    })}
                    className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    rows={4}
                    placeholder="Enter each etiquette tip on a new line (optional)"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditingDestination(null);
                    setFormErrors({});
                  }}
                  className="px-6 py-2 rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;