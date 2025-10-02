import React, { useState } from 'react';
import Logo from './Logo';

interface HomepageHeaderProps {
  onNavigateToLibrary?: () => void;
}

const HomepageHeader: React.FC<HomepageHeaderProps> = ({ onNavigateToLibrary }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button className="hover:opacity-80 transition-all duration-300 hover:scale-105">
            <Logo size="md" animated={true} />
          </button>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#"
              className="text-blue-600 font-medium text-sm tracking-wider border-b-2 border-blue-600 pb-1"
            >
              Home
            </a>
            <button
              onClick={onNavigateToLibrary}
              className="text-gray-600 hover:text-gray-900 text-sm tracking-wider transition-colors"
            >
              Style Library
            </button>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 text-sm tracking-wider transition-colors"
            >
              Moodboard Generator
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 text-sm tracking-wider transition-colors"
            >
              Templates
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 text-sm tracking-wider transition-colors"
            >
              Documentation
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 text-sm tracking-wider transition-colors"
            >
              Community
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-600 hover:text-gray-900 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:block text-sm text-gray-500 tracking-wider">
            Design • Generate • Export
          </div>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg text-sm font-medium tracking-wider transition-all duration-300 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Get Started
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200/50 mt-4">
          <nav className="px-6 py-4 space-y-3">
            <a
              href="#"
              className="block text-blue-600 font-medium text-sm tracking-wider"
            >
              Home
            </a>
            <button
              onClick={onNavigateToLibrary}
              className="block text-gray-600 hover:text-gray-900 text-sm tracking-wider transition-colors"
            >
              Style Library
            </button>
            <a
              href="#"
              className="block text-gray-600 hover:text-gray-900 text-sm tracking-wider transition-colors"
            >
              Moodboard Generator
            </a>
            <a
              href="#"
              className="block text-gray-600 hover:text-gray-900 text-sm tracking-wider transition-colors"
            >
              Templates
            </a>
            <a
              href="#"
              className="block text-gray-600 hover:text-gray-900 text-sm tracking-wider transition-colors"
            >
              Documentation
            </a>
            <a
              href="#"
              className="block text-gray-600 hover:text-gray-900 text-sm tracking-wider transition-colors"
            >
              Community
            </a>
            <div className="pt-3 border-t border-gray-200/50">
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg text-sm font-medium tracking-wider transition-colors">
                Get Started
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default HomepageHeader;