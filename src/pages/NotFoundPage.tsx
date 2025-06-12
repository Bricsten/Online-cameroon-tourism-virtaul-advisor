import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, MessageSquare } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="pt-24 min-h-[calc(100vh-80px)] flex items-center">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-8xl font-bold text-neutral-200 mb-4">404</h1>
          <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
          <p className="text-xl text-neutral-600 max-w-xl mx-auto mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/" className="btn btn-primary flex items-center">
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
            <Link to="/destinations" className="btn btn-outline flex items-center">
              <Search className="mr-2 h-5 w-5" />
              Explore Destinations
            </Link>
            <Link to="/chat" className="btn bg-neutral-800 text-white hover:bg-neutral-700 flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              Ask Advisor
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;