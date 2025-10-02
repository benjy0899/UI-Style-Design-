import React, { useState, useRef } from 'react';
import type { UIStyle } from '../types';

interface QuickCategoriesProps {
  styles: UIStyle[];
}

const QuickCategories: React.FC<QuickCategoriesProps> = ({ styles }) => {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const scrollRefs = useRef<(HTMLDivElement | null)[]>([]);

  const categories = [
    {
      title: 'Trending Now',
      subtitle: 'Most popular this week',
      icon: '🔥',
      styles: styles.slice(0, 6),
      gradient: 'from-red-500 to-orange-500',
      bgGradient: 'from-red-50 to-orange-50'
    },
    {
      title: 'Designer Picks',
      subtitle: 'Curated by experts',
      icon: '⭐',
      styles: styles.slice(6, 12),
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50'
    },
    {
      title: 'Fun & Playful',
      subtitle: 'Creative and vibrant',
      icon: '🎨',
      styles: styles.filter(s => 
        s.name.toLowerCase().includes('playful') || 
        s.name.toLowerCase().includes('comic') ||
        s.name.toLowerCase().includes('toy')
      ).slice(0, 6),
      gradient: 'from-yellow-500 to-pink-500',
      bgGradient: 'from-yellow-50 to-pink-50'
    },
    {
      title: 'Clean SaaS',
      subtitle: 'Professional and modern',
      icon: '💼',
      styles: styles.filter(s => 
        s.name.toLowerCase().includes('minimal') || 
        s.name.toLowerCase().includes('modern') ||
        s.name.toLowerCase().includes('swiss') ||
        s.name.toLowerCase().includes('tech')
      ).slice(0, 6),
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50'
    },
    {
      title: 'Dark Mode',
      subtitle: 'Sleek and sophisticated',
      icon: '🌙',
      styles: styles.filter(s => 
        s.previewConfig.palette.bg.includes('#') && 
        parseInt(s.previewConfig.palette.bg.slice(1), 16) < 0x808080
      ).slice(0, 6),
      gradient: 'from-gray-700 to-gray-900',
      bgGradient: 'from-gray-50 to-gray-100'
    }
  ];

  const scrollLeft = (index: number) => {
    if (scrollRefs.current[index]) {
      scrollRefs.current[index]!.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = (index: number) => {
    if (scrollRefs.current[index]) {
      scrollRefs.current[index]!.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="px-6 py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            Browse by Category
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Quick Categories
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse styles by category to find exactly what you're looking for
          </p>
        </div>

        <div className="space-y-16">
          {categories.map((category, categoryIndex) => (
            <div 
              key={categoryIndex}
              className={`relative rounded-3xl p-8 bg-gradient-to-r ${category.bgGradient} transition-all duration-500 ${
                hoveredCategory === categoryIndex ? 'shadow-2xl scale-[1.02]' : 'shadow-lg'
              }`}
              onMouseEnter={() => setHoveredCategory(categoryIndex)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              {/* Enhanced Category Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-6">
                  <div className={`w-2 h-16 bg-gradient-to-b ${category.gradient} rounded-full shadow-lg`}></div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{category.icon}</span>
                      <h3 className="text-3xl font-bold text-gray-900">{category.title}</h3>
                    </div>
                    <p className="text-gray-600">{category.subtitle}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => scrollLeft(categoryIndex)}
                      className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white"
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => scrollRight(categoryIndex)}
                      className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white"
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  <button className={`bg-gradient-to-r ${category.gradient} text-white px-6 py-2 rounded-full font-medium text-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5`}>
                    View All →
                  </button>
                </div>
              </div>

              {/* Enhanced Horizontal Scroll Container */}
              <div 
                ref={(el) => scrollRefs.current[categoryIndex] = el}
                className="overflow-x-auto pb-4 scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <div className="flex gap-6 w-max">
                  {category.styles.map((style, styleIndex) => (
                    <div 
                      key={style.id}
                      className="w-80 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 cursor-pointer group flex-shrink-0"
                      style={{ animationDelay: `${styleIndex * 100}ms` }}
                    >
                      {/* Enhanced Preview */}
                      <div 
                        className="h-40 p-6 flex items-center justify-center relative overflow-hidden"
                        style={{ backgroundColor: style.previewConfig.palette.bg }}
                      >
                        {/* Animated Background Elements */}
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute top-2 left-2 w-2 h-2 bg-white rounded-full animate-ping"></div>
                          <div className="absolute top-4 right-4 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                          <div className="absolute bottom-3 left-6 w-1.5 h-1.5 bg-white rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                        </div>
                        
                        <div className="flex items-center gap-4 z-10">
                          <button 
                            className={`${style.previewConfig.buttonClasses} text-xs px-4 py-2 pointer-events-none transform transition-transform duration-300 group-hover:scale-110`}
                          >
                            Button
                          </button>
                          <div 
                            className={`${style.previewConfig.cardClasses} w-24 h-20 flex flex-col justify-center pointer-events-none transform transition-transform duration-300 group-hover:scale-105`}
                          >
                            <div className="text-xs opacity-75 mb-1">Card Title</div>
                            <div className="text-xs opacity-60">Sample content</div>
                          </div>
                        </div>

                        {/* Enhanced Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                          <div className="transform transition-transform duration-300 group-hover:scale-110">
                            <button className="bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium shadow-lg hover:bg-gray-100 transition-colors">
                              👁️ Quick Preview
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Info */}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">{style.name}</h4>
                          <div className="flex gap-1">
                            <div className="w-3 h-3 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: style.previewConfig.palette.primary }}></div>
                            <div className="w-3 h-3 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: style.previewConfig.palette.accent }}></div>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-3 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{style.style}</p>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500">
                            <span className="font-medium">{style.fonts.primary}</span>
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${category.gradient} text-white`}>
                            Try Now
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickCategories;