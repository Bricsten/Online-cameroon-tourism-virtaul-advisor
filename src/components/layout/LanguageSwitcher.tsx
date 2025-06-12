import React, { useState } from 'react';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  isScrolled: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ isScrolled }) => {
  const [language, setLanguage] = useState('en');
  
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
    // In a real app, you would implement language switching logic here
  };
  
  return (
    <div className="flex items-center">
      <Globe className={`h-5 w-5 mr-2 ${isScrolled ? 'text-neutral-600' : 'text-white'}`} />
      <select 
        value={language}
        onChange={handleLanguageChange}
        className={`bg-transparent ${
          isScrolled ? 'text-neutral-800' : 'text-white'
        } font-medium focus:outline-none cursor-pointer`}
      >
        <option value="en" className="text-neutral-800">English</option>
        <option value="fr" className="text-neutral-800">Français</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;