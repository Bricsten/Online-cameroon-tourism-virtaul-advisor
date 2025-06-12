import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Info, MapPin, Calendar, Clock, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { processChatMessage } from '../utils/chatProcessor';
import { Message } from '../types/chat';
import { Suggestion } from '../types/suggestion';

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    sender: 'bot',
    text: "Hello! I'm your CamTourVisor. I can help you discover the beauty of Cameroon, recommend destinations based on your interests, suggest itineraries, and provide practical travel information. How can I assist you today?",
    timestamp: new Date().toISOString(),
  },
];

const SUGGESTIONS: Suggestion[] = [
  {
    id: '1',
    text: 'What are the best beaches in Cameroon?',
    icon: <MapPin className="h-5 w-5" />,
  },
  {
    id: '2',
    text: 'Tell me about Mount Cameroon trekking',
    icon: <MapPin className="h-5 w-5" />,
  },
  {
    id: '3',
    text: 'What is the best time to visit Cameroon?',
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    id: '4',
    text: 'How many days should I spend in Yaoundé?',
    icon: <Clock className="h-5 w-5" />,
  },
];

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSuggestionClick = (text: string) => {
    sendMessage(text);
  };

  const sendMessage = async (text: string = inputValue) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate AI processing and response
    setTimeout(() => {
      const response = processChatMessage(text);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: response,
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500); // Simulate network delay
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className="pt-24 lg:pt-0">
      <div className="container mx-auto px-4 h-[calc(100vh-80px)] flex flex-col lg:flex-row">
        {/* Info Sidebar (visible on larger screens) */}
        <div className="hidden lg:block lg:w-1/4 bg-primary-50 p-6 border-r border-neutral-200">
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">About the Advisor</h3>
            <p className="text-neutral-600 mb-4">
              I'm your AI-powered CamTourVisor. I can help you plan your trip, 
              discover attractions, and provide practical travel information.
            </p>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <Info className="h-5 w-5 text-primary-500 mr-2" />
                <span className="font-medium">What I can help with:</span>
              </div>
              <ul className="space-y-2 text-neutral-600 ml-7 list-disc">
                <li>Tourist attractions and landmarks</li>
                <li>Personalized travel recommendations</li>
                <li>Itineraries for popular destinations</li>
                <li>Accommodation and transport options</li>
                <li>Estimated costs in XAF</li>
                <li>Local customs and phrases</li>
              </ul>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Popular Destinations</h3>
            <div className="space-y-4">
              <DestinationPill name="Kribi" type="Beach" />
              <DestinationPill name="Mount Cameroon" type="Mountain" />
              <DestinationPill name="Limbe" type="Coastal City" />
              <DestinationPill name="Waza National Park" type="Wildlife" />
              <DestinationPill name="Yaoundé" type="Capital City" />
            </div>
          </div>
        </div>
        
        {/* Chat Area */}
        <div className="flex-grow flex flex-col bg-neutral-50 h-full">
          {/* Chat Header */}
          <div className="bg-white p-4 border-b border-neutral-200 flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                <Bot className="h-5 w-5 text-primary-500" />
              </div>
              <div>
                <h2 className="font-bold">CamTourVisor</h2>
                <p className="text-sm text-neutral-500">Online | Available 24/7</p>
              </div>
            </div>
            <button 
              className="lg:hidden p-2 rounded-full hover:bg-neutral-100"
              onClick={() => setShowGuide(!showGuide)}
            >
              <Info className="h-5 w-5 text-primary-500" />
            </button>
          </div>
          
          {/* Mobile Guide (shows as a modal on small screens) */}
          <AnimatePresence>
            {showGuide && (
              <motion.div 
                className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div 
                  className="bg-white rounded-xl w-full max-w-md max-h-[80vh] overflow-y-auto"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold">About the Advisor</h3>
                      <button 
                        onClick={() => setShowGuide(false)}
                        className="p-2 rounded-full hover:bg-neutral-100"
                      >
                        <X className="h-5 w-5 text-neutral-500" />
                      </button>
                    </div>
                    <p className="text-neutral-600 mb-4">
                      I'm your AI-powered CamTourVisor. I can help you plan your trip, 
                      discover attractions, and provide practical travel information.
                    </p>
                    <div className="bg-neutral-50 p-4 rounded-lg mb-6">
                      <div className="flex items-center mb-2">
                        <Info className="h-5 w-5 text-primary-500 mr-2" />
                        <span className="font-medium">What I can help with:</span>
                      </div>
                      <ul className="space-y-2 text-neutral-600 ml-7 list-disc">
                        <li>Tourist attractions and landmarks</li>
                        <li>Personalized travel recommendations</li>
                        <li>Itineraries for popular destinations</li>
                        <li>Accommodation and transport options</li>
                        <li>Estimated costs in XAF</li>
                        <li>Local customs and phrases</li>
                      </ul>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-4">Popular Destinations</h3>
                    <div className="space-y-3 mb-4">
                      <DestinationPill name="Kribi" type="Beach" />
                      <DestinationPill name="Mount Cameroon" type="Mountain" />
                      <DestinationPill name="Limbe" type="Coastal City" />
                      <DestinationPill name="Waza National Park" type="Wildlife" />
                      <DestinationPill name="Yaoundé" type="Capital City" />
                    </div>
                    
                    <button 
                      className="btn btn-primary w-full"
                      onClick={() => setShowGuide(false)}
                    >
                      Start Chatting
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="flex items-start max-w-[80%]">
                  {message.sender === 'bot' && (
                    <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                      <Bot className="h-4 w-4 text-primary-500" />
                    </div>
                  )}
                  <div
                    className={`p-4 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-primary-500 text-white rounded-tr-none'
                        : 'bg-white border border-neutral-200 rounded-tl-none'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.text}</p>
                    <div
                      className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-primary-100' : 'text-neutral-400'
                      }`}
                    >
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  {message.sender === 'user' && (
                    <div className="h-8 w-8 rounded-full bg-neutral-800 flex items-center justify-center ml-2 mt-1 flex-shrink-0">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start max-w-[80%]">
                  <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center mr-2 mt-1">
                    <Bot className="h-4 w-4 text-primary-500" />
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-neutral-200 rounded-tl-none">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 rounded-full bg-neutral-300 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="h-2 w-2 rounded-full bg-neutral-300 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="h-2 w-2 rounded-full bg-neutral-300 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Suggestions */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 flex flex-wrap gap-2">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion.text)}
                  className="flex items-center py-2 px-4 bg-white border border-neutral-200 rounded-full text-sm hover:bg-neutral-50 transition-colors duration-300"
                >
                  {suggestion.icon}
                  <span className="ml-2">{suggestion.text}</span>
                </button>
              ))}
            </div>
          )}
          
          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-neutral-200 bg-white">
            <div className="flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Ask about Cameroon travel..."
                className="input flex-grow mr-2"
                disabled={isTyping}
              />
              <button
                type="submit"
                className="btn btn-primary !p-3 aspect-square"
                disabled={!inputValue.trim() || isTyping}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            <p className="text-xs text-neutral-500 mt-2">
              I specialize in Cameroon travel. For general queries, please ask travel-related questions.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

interface DestinationPillProps {
  name: string;
  type: string;
}

const DestinationPill: React.FC<DestinationPillProps> = ({ name, type }) => {
  return (
    <div className="flex items-center bg-white rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
        <MapPin className="h-5 w-5 text-primary-500" />
      </div>
      <div>
        <h4 className="font-medium">{name}</h4>
        <p className="text-xs text-neutral-500">{type}</p>
      </div>
    </div>
  );
};

export default ChatPage;