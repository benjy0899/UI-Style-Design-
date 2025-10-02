import React, { useState } from 'react';
import type { UIStyle } from '../types';
import { UI_STYLES } from '../constants/styles';
import HeroSection from './HeroSection';
import TrendingGallery from './TrendingGallery';
import QuickCategories from './QuickCategories';
import RemixChallenge from './RemixChallenge';
import HomepageFooter from './HomepageFooter';
import HomepageHeader from './HomepageHeader';

interface HomepageProps {
  onNavigateToLibrary?: () => void;
}

const Homepage: React.FC<HomepageProps> = ({ onNavigateToLibrary }) => {
  const [selectedStyle, setSelectedStyle] = useState<UIStyle | null>(null);

  const handleStyleSelect = (style: UIStyle) => {
    setSelectedStyle(style);
    if (onNavigateToLibrary) {
      onNavigateToLibrary();
    }
  };

  const handleGenerate = (prompt: string) => {
    // TODO: Implement style generation logic
    console.log('Generating style for:', prompt);
  };

  const handleLuckyGenerate = () => {
    // Pick a random style
    const randomStyle = UI_STYLES[Math.floor(Math.random() * UI_STYLES.length)];
    setSelectedStyle(randomStyle);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <HomepageHeader onNavigateToLibrary={onNavigateToLibrary} />
      <HeroSection 
        onGenerate={handleGenerate}
        onLuckyGenerate={handleLuckyGenerate}
        selectedStyle={selectedStyle}
      />
      <TrendingGallery 
        styles={UI_STYLES.slice(0, 12)}
        onStyleSelect={handleStyleSelect}
      />
      <QuickCategories styles={UI_STYLES} />
      <RemixChallenge />
      <HomepageFooter />
    </div>
  );
};

export default Homepage;