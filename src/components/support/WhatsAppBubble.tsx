import React, { useState, useEffect } from 'react';
import { MessageCircle, X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WhatsAppBubble: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // WhatsApp number (replace with actual support number)
  const whatsappNumber = '237681007219'; // CamTourVisor support number
  
  const defaultMessage = encodeURIComponent(
    "Hello! I'm interested in visiting Cameroon and would like some assistance with planning my trip. Can you help me?"
  );
  
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Try to open WhatsApp app first, then fallback to web
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // For mobile devices, try to open the WhatsApp app
      const whatsappAppUrl = `whatsapp://send?phone=${whatsappNumber}&text=${defaultMessage}`;
      
      // Create a temporary link to test if WhatsApp app is available
      const tempLink = document.createElement('a');
      tempLink.href = whatsappAppUrl;
      tempLink.style.display = 'none';
      document.body.appendChild(tempLink);
      
      try {
        tempLink.click();
        // If WhatsApp app opens, close the expanded bubble
        setIsExpanded(false);
      } catch (error) {
        // If WhatsApp app is not available, open web version
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      } finally {
        document.body.removeChild(tempLink);
      }
    } else {
      // For desktop, open WhatsApp Web
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleWhatsAppWebClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open('https://web.whatsapp.com/', '_blank', 'noopener,noreferrer');
  };

  const handleBubbleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleCloseModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(false);
  };
  
  if (!isMounted) return null;
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Backdrop for mobile */}
            <motion.div 
              className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
            />
            
            {/* Modal content */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-16 right-0 bg-white rounded-xl shadow-xl border border-neutral-200 p-4 w-80 max-w-[calc(100vw-2rem)] z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center mr-3">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Tourism Support</h4>
                    <p className="text-xs text-green-500">Online now</p>
                  </div>
                </div>
                <button 
                  onClick={handleCloseModal}
                  className="text-neutral-400 hover:text-neutral-600 p-1 rounded-full hover:bg-neutral-100 transition-colors"
                  aria-label="Close WhatsApp chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              
              <p className="text-sm text-neutral-600 mb-3">
                Need help planning your Cameroon adventure? Chat with our tourism experts on WhatsApp!
              </p>
              
              <div className="space-y-2">
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Start WhatsApp Chat
                </button>

                <button
                  onClick={handleWhatsAppWebClick}
                  className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open WhatsApp Web
                </button>
              </div>
              
              <p className="text-xs text-neutral-500 mt-2 text-center">
                Available 24/7 for tourism assistance
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Main bubble button */}
      <motion.button
        onClick={handleBubbleClick}
        className="h-14 w-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group relative"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={isExpanded ? { rotate: 180 } : { rotate: 0 }}
        aria-label={isExpanded ? "Close WhatsApp menu" : "Open WhatsApp menu"}
      >
        {isExpanded ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
        
        {/* Pulse animation when not expanded */}
        {!isExpanded && (
          <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
        )}
      </motion.button>
    </div>
  );
};

export default WhatsAppBubble;