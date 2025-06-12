import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Users, Phone, Mail, MessageSquare } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { BookingService } from '../../services/bookingService';
import { BookingFormData } from '../../types/booking';
import { Destination } from '../../types/destination';

interface BookingModalProps {
  destination: Destination;
  isOpen: boolean;
  onClose: () => void;
  onBookingCreated: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({
  destination,
  isOpen,
  onClose,
  onBookingCreated
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    destination_id: destination.id,
    travel_date: '',
    number_of_travelers: 1,
    special_requests: '',
    contact_info: {
      phone: '',
      email: ''
    }
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await BookingService.createBooking(formData);
      toast.success('Booking request submitted successfully!');
      onBookingCreated();
      onClose();
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to submit booking request');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Book Your Trip</h2>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-6">
          <div className="flex items-center">
            <img
              src={destination.image}
              alt={destination.name}
              className="w-16 h-16 rounded-lg object-cover mr-4"
            />
            <div>
              <h3 className="text-lg font-bold">{destination.name}</h3>
              <p className="text-neutral-600">{destination.location}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                <Calendar className="inline h-4 w-4 mr-1" />
                Travel Date
              </label>
              <input
                type="date"
                value={formData.travel_date}
                onChange={(e) => setFormData({
                  ...formData,
                  travel_date: e.target.value
                })}
                className="input"
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                <Users className="inline h-4 w-4 mr-1" />
                Number of Travelers
              </label>
              <select
                value={formData.number_of_travelers}
                onChange={(e) => setFormData({
                  ...formData,
                  number_of_travelers: parseInt(e.target.value)
                })}
                className="input"
                required
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Traveler' : 'Travelers'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                <Phone className="inline h-4 w-4 mr-1" />
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.contact_info.phone}
                onChange={(e) => setFormData({
                  ...formData,
                  contact_info: {
                    ...formData.contact_info,
                    phone: e.target.value
                  }
                })}
                className="input"
                placeholder="+237 XXX XXX XXX"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                <Mail className="inline h-4 w-4 mr-1" />
                Email Address
              </label>
              <input
                type="email"
                value={formData.contact_info.email}
                onChange={(e) => setFormData({
                  ...formData,
                  contact_info: {
                    ...formData.contact_info,
                    email: e.target.value
                  }
                })}
                className="input"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              <MessageSquare className="inline h-4 w-4 mr-1" />
              Special Requests (Optional)
            </label>
            <textarea
              value={formData.special_requests}
              onChange={(e) => setFormData({
                ...formData,
                special_requests: e.target.value
              })}
              className="input"
              rows={4}
              placeholder="Any special requirements, dietary restrictions, accessibility needs, etc."
            />
          </div>

          <div className="bg-primary-50 p-4 rounded-lg">
            <h4 className="font-bold mb-2">Booking Information</h4>
            <ul className="text-sm text-neutral-700 space-y-1">
              <li>• Your booking request will be reviewed by our team</li>
              <li>• You will receive a confirmation email within 24 hours</li>
              <li>• Payment details will be provided upon confirmation</li>
              <li>• Cancellation policy applies as per terms and conditions</li>
            </ul>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? 'Submitting...' : 'Submit Booking Request'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default BookingModal;