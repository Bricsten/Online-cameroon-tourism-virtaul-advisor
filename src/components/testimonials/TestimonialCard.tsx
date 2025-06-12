import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface TestimonialCardProps {
  name: string;
  origin: string;
  rating: number;
  quote: string;
  image: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, origin, rating, quote, image }) => {
  return (
    <motion.div 
      className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm hover:shadow-lg transition-all duration-300"
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center mb-4">
        <img 
          src={image} 
          alt={name} 
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-bold">{name}</h4>
          <p className="text-sm text-neutral-500">{origin}</p>
        </div>
      </div>
      <div className="flex mb-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star 
            key={index} 
            className={`h-4 w-4 ${index < rating ? 'text-accent-500 fill-accent-500' : 'text-neutral-300'}`} 
          />
        ))}
      </div>
      <p className="text-neutral-700 italic">"{quote}"</p>
    </motion.div>
  );
};

export default TestimonialCard;