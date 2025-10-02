import React, { useState, useEffect } from 'react';
import type { UIStyle } from '../types';

interface HeroSectionProps {
  onGenerate: (prompt: string) => void;
  onLuckyGenerate: () => void;
  selectedStyle: UIStyle | null;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  onGenerate, 
  onLuckyGenerate, 
  selectedStyle 
}) => {
  const [prompt, setPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  
  const placeholders = [
    "Try: Glassmorphism SaaS dashboard with neon buttons",
    "Try: Minimalist blog with serif typography",
    "Try: Dark cyberpunk gaming interface",
    "Try: Pastel e-commerce with rounded corners",
    "Try: Corporate finance dashboard with charts"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate(prompt);
    }
  };

  return (
    <section className="relative px-6 py-20 lg:py-32 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-pink-400/5 to-yellow-400/5 rounded-full blur-3xl animate-spin" style={{ animationDuration: '20s' }}></div>
      
      {/* Floating Elements */}
      <div className="absolute top-32 right-20 w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute top-48 left-32 w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute bottom-32 left-20 w-5 h-5 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative max-w-6xl mx-auto text-center">
        {/* Enhanced Main Heading */}
        <div className="mb-6">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-2 tracking-tight">
            Design Styles,{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
              Reimagined.
            </span>
          </h1>
          <div className="flex justify-center items-center gap-4 mt-4">
            <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
            <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          </div>
        </div>
        
        {/* Enhanced Subtext */}
        <div className="mb-12">
          <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed">
            Generate, remix, and explore beautiful UI styles instantly.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-500">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">✨ AI-Powered</span>
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">🎨 20+ Styles</span>
            <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full">⚡ Instant Export</span>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">🔧 Fully Customizable</span>
          </div>
        </div>
        
        {/* Enhanced Input Section */}
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto mb-16">
          <div className="relative">
            <div className="relative group">
              <input
                type="text"
                value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value);
                  setIsTyping(e.target.value.length > 0);
                }}
                placeholder={placeholders[currentPlaceholder]}
                className="w-full px-8 py-6 text-lg rounded-2xl border-2 border-gray-200 bg-white/90 backdrop-blur-sm focus:border-blue-500 focus:outline-none shadow-xl hover:shadow-2xl transition-all duration-300 placeholder:text-gray-400 group-hover:bg-white"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="flex items-center gap-2">
                  {isTyping && (
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  )}
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
              <button
                type="submit"
                disabled={!prompt.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generate Style
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button
                type="button"
                onClick={onLuckyGenerate}
                className="bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group relative overflow-hidden"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 group-hover:animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0V9a8 8 0 1115.356 2m-15.356 0H9" />
                  </svg>
                  I'm Feeling Lucky
                </span>
              </button>
            </div>
            
            {/* Quick Suggestions */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <span className="text-sm text-gray-500 mr-2">Quick ideas:</span>
              {["Glassmorphism", "Neumorphism", "Dark Mode", "Minimalist", "Retro"].map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => setPrompt(`${suggestion} UI design`)}
                  className="text-xs bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-700 px-3 py-1 rounded-full transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </form>
        
        {/* Enhanced Live Preview Strip */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-sm text-gray-500 mb-2 uppercase tracking-wider font-medium flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Live Preview
            </p>
            <p className="text-xs text-gray-400">See your styles come to life instantly</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
            {/* Sample Button */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-300 group">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Button</p>
              </div>
              <button className={selectedStyle?.previewConfig.buttonClasses || "bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors w-full"}>
                Get Started
              </button>
            </div>
            
            {/* Sample Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-300 group">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Card</p>
              </div>
              <div className={selectedStyle?.previewConfig.cardClasses || "bg-white border border-gray-200 rounded-lg p-4 shadow-sm"}>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Sample Card</h3>
                <p className="text-gray-600 text-xs">Beautiful design elements</p>
              </div>
            </div>
            
            {/* Sample Form */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-300 group">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Input</p>
              </div>
              <input 
                type="text" 
                placeholder="Enter text..."
                className={selectedStyle?.previewConfig.inputClasses || "border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:border-blue-500 focus:outline-none"}
              />
            </div>
            
            {/* Sample Navigation */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-300 group">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Navigation</p>
              </div>
              <div className="flex gap-2">
                <div className="w-6 h-6 bg-gray-200 rounded"></div>
                <div className="flex-1 space-y-1">
                  <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Style Indicator */}
          {selectedStyle && (
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-gray-200/50">
                <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: selectedStyle.previewConfig.palette.primary }}></div>
                <span className="text-sm font-medium text-gray-700">Currently showing: {selectedStyle.name}</span>
                <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: selectedStyle.previewConfig.palette.accent }}></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;