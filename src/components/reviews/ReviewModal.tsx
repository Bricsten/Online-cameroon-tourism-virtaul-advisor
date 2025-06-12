import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Star, Calendar, Users } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { ReviewService } from '../../services/reviewService';
import { ReviewFormData } from '../../types/review';
import { Destination } from '../../types/destination';

interface ReviewModalProps {
  destination: Destination;
  isOpen: boolean;
  onClose: () => void;
  onReviewCreated: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  destination,
  isOpen,
  onClose,
  onReviewCreated
}) => {
  const [formData, setFormData] = useState<ReviewFormData>({
    destination_id: destination.id,
    rating: 5,
    title: '',
    content: '',
    travel_date: '',
    travel_type: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await ReviewService.createReview(formData);
      toast.success('Review submitted successfully!');
      onReviewCreated();
      onClose();
    } catch (error) {
      console.error('Review error:', error);
      toast.error('Failed to submit review');
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
          <h2 className="text-2xl font-bold">Write a Review</h2>
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
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Overall Rating
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating })}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-8 w-8 ${
                      rating <= formData.rating
                        ? 'text-accent-500 fill-accent-500'
                        : 'text-neutral-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Review Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input"
              placeholder="Summarize your experience"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Your Review
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="input"
              rows={6}
              placeholder="Share your experience, what you loved, and any tips for future travelers..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                <Calendar className="inline h-4 w-4 mr-1" />
                When did you visit? (Optional)
              </label>
              <input
                type="month"
                value={formData.travel_date}
                onChange={(e) => setFormData({ ...formData, travel_date: e.target.value })}
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                <Users className="inline h-4 w-4 mr-1" />
                Travel Type (Optional)
              </label>
              <select
                value={formData.travel_type}
                onChange={(e) => setFormData({ ...formData, travel_type: e.target.value })}
                className="input"
              >
                <option value="">Select travel type</option>
                <option value="Solo">Solo</option>
                <option value="Couple">Couple</option>
                <option value="Family">Family</option>
                <option value="Friends">Friends</option>
                <option value="Business">Business</option>
              </select>
            </div>
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
              {loading ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ReviewModal;