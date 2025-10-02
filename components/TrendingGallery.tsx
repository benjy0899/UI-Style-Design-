import React, { useState } from 'react';
import type { UIStyle } from '../types';

interface TrendingGalleryProps {
  styles: UIStyle[];
  onStyleSelect: (style: UIStyle) => void;
}

const TrendingGallery: React.FC<TrendingGalleryProps> = ({ styles, onStyleSelect }) => {
  const [hoveredStyle, setHoveredStyle] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('All');
  
  const getStyleCategory = (style: UIStyle): string => {
    const name = style.name.toLowerCase();
    if (name.includes('minimal') || name.includes('clean')) return 'Minimal';
    if (name.includes('playful') || name.includes('toy') || name.includes('comic')) return 'Playful';
    if (name.includes('cyber') || name.includes('sci-fi') || name.includes('tech') || name.includes('hacker')) return 'Futuristic';
    if (name.includes('saas') || name.includes('modern') || name.includes('swiss')) return 'SaaS';
    return 'Creative';
  };

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'Minimal': return 'bg-gray-100 text-gray-700';
      case 'Playful': return 'bg-pink-100 text-pink-700';
      case 'Futuristic': return 'bg-blue-100 text-blue-700';
      case 'SaaS': return 'bg-green-100 text-green-700';
      default: return 'bg-purple-100 text-purple-700';
    }
  };

  const categories = ['All', 'Minimal', 'Playful', 'Futuristic', 'SaaS', 'Creative'];
  const filteredStyles = filter === 'All' ? styles : styles.filter(style => getStyleCategory(style) === filter);

  return (
    <section className="px-6 py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Trending Now
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Popular Styles
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Discover the most popular UI styles, handpicked by our community of designers
          </p>
          
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {filteredStyles.map((style, index) => {
            const category = getStyleCategory(style);
            const categoryColor = getCategoryColor(category);
            const isHovered = hoveredStyle === style.id;
            
            return (
              <div 
                key={style.id}
                className="break-inside-avoid group cursor-pointer"
                onClick={() => onStyleSelect(style)}
                onMouseEnter={() => setHoveredStyle(style.id)}
                onMouseLeave={() => setHoveredStyle(null)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-500 transform ${
                  isHovered ? 'shadow-2xl -translate-y-3 scale-105' : 'hover:shadow-xl hover:-translate-y-2'
                }`}>
                  {/* Preview Area */}
                  <div 
                    className="p-6 h-48 flex flex-col justify-center items-center relative overflow-hidden"
                    style={{ backgroundColor: style.previewConfig.palette.bg }}
                  >
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-2 left-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <div className="absolute top-4 right-4 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                      <div className="absolute bottom-3 left-6 w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                    </div>
                    
                    {/* Sample Button */}
                    <button 
                      className={`${style.previewConfig.buttonClasses} mb-4 pointer-events-none transform transition-transform duration-300 ${
                        isHovered ? 'scale-110' : ''
                      }`}
                      style={{ color: style.previewConfig.palette.text }}
                    >
                      Sample Button
                    </button>
                    
                    {/* Sample Card */}
                    <div 
                      className={`${style.previewConfig.cardClasses} w-full max-w-32 pointer-events-none transform transition-transform duration-300 ${
                        isHovered ? 'scale-105' : ''
                      }`}
                    >
                      <div className="text-xs opacity-75 mb-1">Card Title</div>
                      <div className="text-xs opacity-60">Sample content</div>
                    </div>

                    {/* Enhanced Hover Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-500 flex items-center justify-center ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <div className="flex flex-col gap-3 transform transition-transform duration-300" style={{ transform: isHovered ? 'translateY(0)' : 'translateY(20px)' }}>
                        <button className="bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors shadow-lg">
                          👁️ Live Preview
                        </button>
                        <div className="flex gap-2">
                          <button className="bg-blue-600 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors">
                            🎨 Remix
                          </button>
                          <button className="bg-purple-600 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-purple-700 transition-colors">
                            ✨ Similar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Card Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">{style.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColor} transition-all duration-300 ${
                        isHovered ? 'scale-110' : ''
                      }`}>
                        {category}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{style.style}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{style.fonts.primary}</span>
                        <span>•</span>
                        <span>{style.fonts.secondary}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: style.previewConfig.palette.primary }}></div>
                        <div className="w-3 h-3 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: style.previewConfig.palette.accent }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Explore All Styles
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrendingGallery;