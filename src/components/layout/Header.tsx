import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, MessageSquare, Globe, ChevronDown, LogIn, UserCircle, LogOut, Settings, LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location]);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <MapPin className="h-8 w-8 text-secondary-500" />
            <span className="ml-2 font-heading font-bold text-xl">
              <span className="text-primary-500">Cam</span>
              <span className="text-secondary-500">TourVisor</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" label="Home" isScrolled={isScrolled} />
            <NavLink to="/destinations" label="Destinations" isScrolled={isScrolled} />
            <div className="relative group">
              <button className={`flex items-center ${
                isScrolled ? 'text-neutral-800' : 'text-white'
              } hover:text-primary-500 font-medium`}>
                <span>Explore</span>
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="py-1">
                  <Link to="/destinations?category=nature" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-500">
                    Nature & Wildlife
                  </Link>
                  <Link to="/destinations?category=culture" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-500">
                    Culture & Heritage
                  </Link>
                  <Link to="/destinations?category=beaches" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-500">
                    Beaches & Relaxation
                  </Link>
                  <Link to="/destinations?category=adventure" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-500">
                    Adventure & Activities
                  </Link>
                </div>
              </div>
            </div>
            <LanguageSwitcher isScrolled={isScrolled} />
            
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <UserCircle className={`h-6 w-6 ${isScrolled ? 'text-neutral-800' : 'text-white'}`} />
                  <span className={`font-medium ${isScrolled ? 'text-neutral-800' : 'text-white'}`}>
                    {user.email?.split('@')[0]}
                  </span>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-500"
                      >
                        <LayoutDashboard className="inline-block h-4 w-4 mr-2" />
                        Dashboard
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-500"
                      >
                        <LogOut className="inline-block h-4 w-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/auth" className="btn btn-outline">
                  <LogIn className="mr-2 h-5 w-5" />
                  Sign In
                </Link>
              </div>
            )}
            
            <Link to="/chat" className="btn btn-primary flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              Ask Advisor
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className={`h-6 w-6 ${isScrolled ? 'text-neutral-800' : 'text-white'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isScrolled ? 'text-neutral-800' : 'text-white'}`} />
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            className="md:hidden mt-4 bg-white rounded-lg shadow-xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="py-2 px-4 space-y-2">
              <Link to="/" className="block py-2 text-neutral-800 hover:text-primary-500 font-medium">
                Home
              </Link>
              <Link to="/destinations" className="block py-2 text-neutral-800 hover:text-primary-500 font-medium">
                Destinations
              </Link>
              <div className="py-2">
                <div className="font-medium text-neutral-800 mb-1">Explore</div>
                <div className="pl-4 space-y-2">
                  <Link to="/destinations?category=nature" className="block py-1 text-neutral-700 hover:text-primary-500">
                    Nature & Wildlife
                  </Link>
                  <Link to="/destinations?category=culture" className="block py-1 text-neutral-700 hover:text-primary-500">
                    Culture & Heritage
                  </Link>
                  <Link to="/destinations?category=beaches" className="block py-1 text-neutral-700 hover:text-primary-500">
                    Beaches & Relaxation
                  </Link>
                  <Link to="/destinations?category=adventure" className="block py-1 text-neutral-700 hover:text-primary-500">
                    Adventure & Activities
                  </Link>
                </div>
              </div>
              <div className="py-2 flex items-center">
                <Globe className="h-5 w-5 text-neutral-600 mr-2" />
                <select className="bg-transparent text-neutral-800 font-medium focus:outline-none">
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                </select>
              </div>
              
              {user ? (
                <div className="border-t border-neutral-200 mt-2 pt-2">
                  <div className="flex items-center py-2">
                    <UserCircle className="h-6 w-6 text-neutral-600 mr-2" />
                    <span className="font-medium">{user.email?.split('@')[0]}</span>
                  </div>
                  <Link to="/dashboard" className="block py-2 text-neutral-700 hover:text-primary-500">
                    <LayoutDashboard className="inline-block h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left py-2 text-neutral-700 hover:text-primary-500"
                  >
                    <LogOut className="inline-block h-4 w-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link to="/auth" className="block w-full">
                  <button className="btn btn-primary w-full flex items-center justify-center">
                    <LogIn className="mr-2 h-5 w-5" />
                    Sign In
                  </button>
                </Link>
              )}
              
              <Link to="/chat" className="block w-full mt-2">
                <button className="btn btn-primary w-full flex items-center justify-center">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Ask Advisor
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
  isScrolled: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label, isScrolled }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`relative font-medium transition-colors duration-300 ${
        isScrolled ? 'text-neutral-800' : 'text-white'
      } hover:text-primary-500`}
    >
      {label}
      {isActive && (
        <motion.div 
          layoutId="activeNavIndicator"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500"
          transition={{ duration: 0.3 }}
        />
      )}
    </Link>
  );
};

export default Header;