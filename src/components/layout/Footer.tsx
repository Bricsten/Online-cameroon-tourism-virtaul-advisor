import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Column */}
          <div>
            <div className="flex items-center mb-4">
              <MapPin className="h-6 w-6 text-primary-500" />
              <span className="ml-2 font-heading font-bold text-xl">
                <span className="text-primary-500">Cam</span>
                <span className="text-secondary-500">TourVisor</span>
              </span>
            </div>
            <p className="text-neutral-300 mb-4">
              Discover Cameroon's breathtaking landscapes, rich cultural heritage, and unforgettable experiences with our AI-powered tourism advisor.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-300 hover:text-primary-500 transition-colors duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-300 hover:text-primary-500 transition-colors duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-300 hover:text-primary-500 transition-colors duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-300 hover:text-primary-500 transition-colors duration-300">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-heading font-bold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-300 hover:text-primary-500 transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="text-neutral-300 hover:text-primary-500 transition-colors duration-300">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/chat" className="text-neutral-300 hover:text-primary-500 transition-colors duration-300">
                  CamTourVisor
                </Link>
              </li>
              <li>
                <a href="#" className="text-neutral-300 hover:text-primary-500 transition-colors duration-300">
                  Travel Tips
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-300 hover:text-primary-500 transition-colors duration-300">
                  About Us
                </a>
              </li>
            </ul>
          </div>
          
          {/* Top Destinations */}
          <div>
            <h4 className="text-xl font-heading font-bold mb-4 text-white">Top Destinations</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/destinations/kribi" className="text-neutral-300 hover:text-primary-500 transition-colors duration-300">
                  Kribi Beach
                </Link>
              </li>
              <li>
                <Link to="/destinations/mount-cameroon" className="text-neutral-300 hover:text-primary-500 transition-colors duration-300">
                  Mount Cameroon
                </Link>
              </li>
              <li>
                <Link to="/destinations/waza-national-park" className="text-neutral-300 hover:text-primary-500 transition-colors duration-300">
                  Waza National Park
                </Link>
              </li>
              <li>
                <Link to="/destinations/limbe" className="text-neutral-300 hover:text-primary-500 transition-colors duration-300">
                  Limbe Botanical Garden
                </Link>
              </li>
              <li>
                <Link to="/destinations/bafut-palace" className="text-neutral-300 hover:text-primary-500 transition-colors duration-300">
                  Bafut Palace
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h4 className="text-xl font-heading font-bold mb-4 text-white">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-primary-500 mt-1 mr-3" />
                <p className="text-neutral-300">CamTourVisor HQ, Yaoundé, Cameroon</p>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-primary-500 mr-3" />
                <p className="text-neutral-300">+237 222 222 222</p>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-primary-500 mr-3" />
                <p className="text-neutral-300">info@camtourvisor.cm</p>
              </div>
            </div>
          </div>
        </div>
        
        <hr className="border-neutral-700 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} CamTourVisor. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-neutral-400 text-sm hover:text-primary-500 transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-neutral-400 text-sm hover:text-primary-500 transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-neutral-400 text-sm hover:text-primary-500 transition-colors duration-300">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;