import React, { useState, useCallback } from 'react';
import type { UIStyle } from './types';
import { UI_STYLES } from './constants/styles';
import StyleCard from './components/StyleCard';
import StylePreview from './components/StylePreview';
import StyleEditor from './components/StyleEditor';
import ComponentShowcase from './components/ComponentShowcase';
import ExportPanel from './components/ExportPanel';
import CodeDisplay from './components/CodeDisplay';
import Logo from './components/Logo';
import Homepage from './components/Homepage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'library'>('home');
  const [selectedStyle, setSelectedStyle] = useState<UIStyle>(UI_STYLES[0]);
  const [customStyle, setCustomStyle] = useState<UIStyle | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSelectStyle = useCallback((style: UIStyle) => {
    setSelectedStyle(style);
    setCustomStyle(null);
    setIsEditing(false);
    setCurrentPage('library');
  }, []);

  const handleStyleChange = useCallback((updatedStyle: UIStyle) => {
    setCustomStyle(updatedStyle);
  }, []);

  const handleStartEditing = useCallback(() => {
    setCustomStyle(selectedStyle);
    setIsEditing(true);
  }, [selectedStyle]);

  const currentStyle = customStyle || selectedStyle;

  // Show homepage
  if (currentPage === 'home') {
    return <Homepage onNavigateToLibrary={() => setCurrentPage('library')} />;
  }

  // Show style library
  return (
    <div className="flex flex-col h-screen font-secondary bg-gray-900 text-gray-200 relative">
      {/* Header */}
      <header className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700/50 px-6 py-4 relative overflow-hidden">
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setCurrentPage('home')}
              className="hover:opacity-80 transition-all duration-300 hover:scale-105"
            >
              <Logo size="md" animated={true} />
            </button>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => setCurrentPage('home')}
                className="text-gray-400 hover:text-white font-secondary text-sm tracking-wider transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => setCurrentPage('library')}
                className="text-blue-400 font-medium font-secondary text-sm tracking-wider border-b-2 border-blue-400 pb-1"
              >
                Style Library
              </button>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white font-secondary text-sm tracking-wider transition-colors"
              >
                Templates
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white font-secondary text-sm tracking-wider transition-colors"
              >
                Documentation
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white font-secondary text-sm tracking-wider transition-colors"
              >
                Community
              </a>
            </nav>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-gray-400 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden lg:block text-sm text-gray-400 font-secondary tracking-wider">
              Design • Generate • Export
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium font-secondary tracking-wider transition-colors">
              Get Started
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700/50">
            <nav className="px-6 py-4 space-y-3">
              <button 
                onClick={() => setCurrentPage('home')}
                className="block text-gray-400 hover:text-white font-secondary text-sm tracking-wider transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => setCurrentPage('library')}
                className="block text-blue-400 font-medium font-secondary text-sm tracking-wider"
              >
                Style Library
              </button>
              <a 
                href="#" 
                className="block text-gray-400 hover:text-white font-secondary text-sm tracking-wider transition-colors"
              >
                Templates
              </a>
              <a 
                href="#" 
                className="block text-gray-400 hover:text-white font-secondary text-sm tracking-wider transition-colors"
              >
                Documentation
              </a>
              <a 
                href="#" 
                className="block text-gray-400 hover:text-white font-secondary text-sm tracking-wider transition-colors"
              >
                Community
              </a>
              <div className="pt-3 border-t border-gray-700/50">
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium font-secondary tracking-wider transition-colors">
                  Get Started
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5 bg-gray-800/60 backdrop-blur-sm border-r border-gray-700/50 flex-shrink-0">
          <div className="p-4 border-b border-gray-700/50">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <h2 className="text-lg font-primary font-bold text-white tracking-wide">Browse Styles</h2>
            </div>
            <p className="text-sm text-gray-400 font-secondary">Choose from {UI_STYLES.length} curated UI styles</p>
            <button
              onClick={handleStartEditing}
              className="mt-3 w-full py-3 px-4 rounded-lg font-primary font-medium tracking-wider transition-all duration-300 bg-blue-500 text-white hover:bg-blue-600"
            >
              {isEditing ? 'EDITING STYLE' : 'CUSTOMIZE STYLE'}
            </button>
          </div>
        
        <nav className="overflow-y-auto h-[calc(100vh-120px)] p-3">
          <ul className="space-y-2">
            {UI_STYLES.map((style) => (
              <li key={style.id}>
                <StyleCard
                  style={style}
                  isSelected={selectedStyle.id === style.id}
                  onSelect={handleSelectStyle}
                />
              </li>
            ))}
          </ul>
        </nav>
        </aside>
        <main className="flex-1 overflow-y-auto bg-gray-900">
        <div className="p-4 sm:p-6 lg:p-10">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 text-sm text-gray-400 font-secondary mb-2">
                <span>UIvana</span>
                <span>/</span>
                <span className="text-blue-400">Style Library</span>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-4xl font-bold text-white font-primary tracking-wider mb-2">
                    Style Library
                  </h1>
                  <p className="text-gray-400 font-secondary text-lg">
                    Explore and customize our collection of professionally designed UI styles. 
                    From minimalist to bold, find the perfect aesthetic for your project.
                  </p>
                </div>
                
                {/* Stats */}
                <div className="flex gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400 font-primary">{UI_STYLES.length}</div>
                    <div className="text-sm text-gray-400 font-secondary">Styles</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400 font-primary">∞</div>
                    <div className="text-sm text-gray-400 font-secondary">Customizable</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400 font-primary">5</div>
                    <div className="text-sm text-gray-400 font-secondary">Export Formats</div>
                  </div>
                </div>
              </div>
              
              {/* Current Selection Info */}
              {currentStyle && (
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                      <span className="font-secondary text-white">
                        Currently viewing: <span className="font-semibold text-blue-400">{currentStyle.name}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400 font-secondary">
                      <span>{currentStyle.fonts.primary}</span>
                      <span>•</span>
                      <span>{currentStyle.fonts.secondary}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {currentStyle && (
                <>
                    {isEditing && customStyle && (
                        <StyleEditor 
                            style={customStyle} 
                            onStyleChange={handleStyleChange} 
                        />
                    )}
                    <StylePreview style={currentStyle} />
                    <ComponentShowcase style={currentStyle} />
                    <ExportPanel style={currentStyle} />
                    <CodeDisplay style={currentStyle} />
                </>
            )}
        </div>
        </main>
      </div>
    </div>
  );
};

export default App;