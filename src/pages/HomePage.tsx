import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Coffee, Users, ChevronRight, MessageSquare } from 'lucide-react';
import DestinationCard from '../components/destinations/DestinationCard';
import TestimonialCard from '../components/testimonials/TestimonialCard';
import { useDestinations } from '../hooks/useDestinations';

const HomePage: React.FC = () => {
  const { destinations, loading } = useDestinations();
  
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 bg-[url('/images/Cameroon-2_0.jpg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <h1 className="mb-4">
              Experience Cameroon's <span className="text-accent-500">Authentic Beauty</span>
            </h1>
            <p className="text-xl mb-8">
              Discover Africa's cultural mosaic with pristine beaches, majestic mountains, 
              and vibrant traditions. Let CamTourVisor guide your perfect Cameroonian adventure.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/chat" className="btn btn-primary">
                <MessageSquare className="mr-2 h-5 w-5" />
                Ask Our Advisor
              </Link>
              <Link to="/destinations" className="btn btn-outline border-white text-white hover:bg-white hover:bg-opacity-20">
                Explore Destinations
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <a 
              href="#discover" 
              className="text-white flex flex-col items-center"
              aria-label="Scroll down"
            >
              <span className="mb-2 text-sm font-medium">Discover More</span>
              <ChevronRight className="h-6 w-6 transform rotate-90" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="discover" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-4">Why Visit <span className="text-primary-500">Cameroon</span>?</h2>
              <p className="max-w-2xl mx-auto text-neutral-600">
                Known as "Africa in Miniature," Cameroon offers a unique blend of landscapes, cultures, 
                and experiences that make it a must-visit destination.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<MapPin className="h-8 w-8 text-primary-500" />}
              title="Diverse Landscapes"
              description="From pristine beaches to volcanic mountains, lush rainforests to vast savannas."
            />
            <FeatureCard 
              icon={<Calendar className="h-8 w-8 text-primary-500" />}
              title="Year-round Destination"
              description="Pleasant climate throughout the year with distinct dry and rainy seasons."
            />
            <FeatureCard 
              icon={<Coffee className="h-8 w-8 text-primary-500" />}
              title="Rich Cultural Heritage"
              description="Home to over 250 ethnic groups, each with unique traditions and festivals."
            />
            <FeatureCard 
              icon={<Users className="h-8 w-8 text-primary-500" />}
              title="Warm Hospitality"
              description="Experience the legendary friendliness and hospitality of Cameroonian people."
            />
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-6 md:mb-0"
            >
              <h2 className="mb-4">Popular Destinations</h2>
              <p className="max-w-xl text-neutral-600">
                Explore Cameroon's most beloved destinations, from coastal paradises to 
                mountain retreats and wildlife sanctuaries.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link to="/destinations" className="btn btn-outline">
                View All Destinations
              </Link>
            </motion.div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-neutral-600">Loading destinations...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {destinations.slice(0, 6).map((destination, index) => (
                <motion.div
                  key={destination.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <DestinationCard destination={destination} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* AI Advisor CTA */}
      <section className="py-20 bg-primary-500 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8 lg:mb-0 lg:w-1/2"
            >
              <h2 className="mb-4">Your Personal CamTourVisor</h2>
              <p className="text-lg mb-6 max-w-xl">
                Get personalized recommendations, travel tips, and answers to all your 
                Cameroon travel questions with our AI-powered tourism advisor.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-white text-primary-500 flex items-center justify-center mr-3">✓</span>
                  <span>Custom itineraries based on your interests</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-white text-primary-500 flex items-center justify-center mr-3">✓</span>
                  <span>Local travel tips and cultural insights</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-white text-primary-500 flex items-center justify-center mr-3">✓</span>
                  <span>Accommodation and transportation recommendations</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-white text-primary-500 flex items-center justify-center mr-3">✓</span>
                  <span>Available in English and French</span>
                </li>
              </ul>
              <Link to="/chat" className="btn bg-white text-primary-500 hover:bg-neutral-100">
                <MessageSquare className="mr-2 h-5 w-5" />
                Chat with Advisor
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:w-5/12"
            >
              <div className="bg-white rounded-xl shadow-xl p-6 text-neutral-800">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                    <MessageSquare className="h-5 w-5 text-primary-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">CamTourVisor</h4>
                    <p className="text-sm text-neutral-500">Available 24/7</p>
                  </div>
                </div>
                <div className="space-y-4 mb-4">
                  <div className="chat-bubble-bot">
                    <p className="text-sm">Hello! I'm your CamTourVisor. How can I help you plan your perfect trip to Cameroon?</p>
                  </div>
                  <div className="chat-bubble-user">
                    <p className="text-sm">I'm interested in visiting Cameroon for 7 days. I love nature and culture. What would you recommend?</p>
                  </div>
                  <div className="chat-bubble-bot">
                    <p className="text-sm">Great choice! For nature and culture lovers, I recommend spending:</p>
                    <ul className="text-sm list-disc pl-5 mt-2">
                      <li>2 days in Limbe (beach, botanical garden)</li>
                      <li>2 days exploring Mount Cameroon in Buea</li>
                      <li>3 days in Yaoundé for cultural sites and museums</li>
                    </ul>
                    <p className="text-sm mt-2">Would you like more specific details about any of these destinations?</p>
                  </div>
                </div>
                <div className="flex">
                  <input 
                    type="text" 
                    placeholder="Ask me anything about Cameroon..."
                    className="input flex-grow mr-2 py-2"
                  />
                  <button className="btn btn-primary py-2">
                    <MessageSquare className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="mb-4">What Travelers Say</h2>
            <p className="max-w-2xl mx-auto text-neutral-600">
              Hear from visitors who have experienced the beauty and hospitality of Cameroon 
              with the help of our tourism advisor.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard 
              name="Sophie Martinez"
              origin="France"
              rating={5}
              quote="The AI advisor helped me discover hidden gems in Cameroon that weren't in any guidebook. My trip to the Western Highlands was magical!"
              image="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
            />
            <TestimonialCard 
              name="David Chen"
              origin="Canada"
              rating={5}
              quote="As a wildlife enthusiast, the advisor created the perfect itinerary for me to see Cameroon's incredible biodiversity in Waza and Korup National Parks."
              image="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
            />
            <TestimonialCard 
              name="Amina Osei"
              origin="Ghana"
              rating={4}
              quote="The cultural insights and local phrases provided by the advisor made my experience in Cameroon so much richer. I felt welcomed everywhere I went!"
              image="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
            />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="mb-4">Stay Updated on Cameroon Tourism</h2>
            <p className="mb-8 text-neutral-300">
              Subscribe to our newsletter for travel tips, destination guides, and special offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="input flex-grow py-3 bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400"
              />
              <button className="btn btn-accent py-3">
                Subscribe
              </button>
            </div>
            <p className="mt-4 text-sm text-neutral-400">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <motion.div 
      className="bg-white p-6 rounded-xl border border-neutral-200 hover:shadow-lg transition-all duration-300"
      whileHover={{ y: -5 }}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-neutral-600">{description}</p>
    </motion.div>
  );
};

export default HomePage;