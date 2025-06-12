import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Destination } from '../../types/destination';

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  const { id, name, location, image, rating, category, description } = destination;
  
  return (
    <motion.div 
      className="card h-full group"
      whileHover={{ y: -5 }}
    >
      <Link to={`/destinations/${id}`}>
        <div className="relative overflow-hidden h-60">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-medium text-primary-600 flex items-center">
            <Star className="h-4 w-4 text-accent-500 mr-1" />
            {rating}
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-24 opacity-70"></div>
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold mb-1">{name}</h3>
              <div className="flex items-center text-neutral-500 mb-3">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{location}</span>
              </div>
            </div>
            <span className="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
              {category}
            </span>
          </div>
          <p className="text-neutral-600 line-clamp-3 mb-4">{description}</p>
          <div className="flex justify-between items-center">
            <span className="text-primary-500 font-medium">View Details</span>
            <span className="w-8 h-8 rounded-full border border-primary-500 flex items-center justify-center group-hover:bg-primary-500 transition-colors duration-300">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, 45] }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 text-primary-500 group-hover:text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </motion.div>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default DestinationCard;