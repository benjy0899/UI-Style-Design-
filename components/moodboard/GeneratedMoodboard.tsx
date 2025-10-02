import React, { useState } from 'react';

interface UploadedImage {
  id: string;
  file: File;
  url: string;
  name: string;
}

interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
  background: string;
}

interface TypographyPairing {
  headline: string;
  body: string;
}

interface MoodboardData {
  images: UploadedImage[];
  keywords: string[];
  colorPalette: ColorPalette;
  typography: TypographyPairing;
  inspirationalImages: string[];
}

interface GeneratedMoodboardProps {
  moodboardData: MoodboardData;
  isGenerating: boolean;
}

const GeneratedMoodboard: React.FC<GeneratedMoodboardProps> = ({
  moodboardData,
  isGenerating
}) => {
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  if (isGenerating) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <svg className="w-8 h-8 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0V9a8 8 0 1115.356 2m-15.356 0H9" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Generating Your Moodboard</h3>
          <p className="text-gray-600">AI is analyzing your images and creating the perfect style...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Generated Moodboard</h2>
      </div>

      {/* Image Collage */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Visual Inspiration</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* User uploaded images */}
          {moodboardData.images.slice(0, 2).map((image, index) => (
            <div 
              key={image.id}
              className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={image.url}
                alt={image.name}
                className="w-full h-32 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-2 left-2">
                  <span className="bg-white/90 text-gray-900 px-2 py-1 rounded text-xs font-medium">
                    Your Image
                  </span>
                </div>
              </div>
            </div>
          ))}
          
          {/* AI suggested images */}
          {moodboardData.inspirationalImages.slice(0, 2).map((imageUrl, index) => (
            <div 
              key={imageUrl}
              className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              style={{ animationDelay: `${(index + 2) * 100}ms` }}
            >
              <img
                src={imageUrl}
                alt="AI Inspiration"
                className="w-full h-32 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-2 left-2">
                  <span className="bg-purple-500 text-white px-2 py-1 rounded text-xs font-medium">
                    AI Suggested
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Color Palette */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Color Palette</h3>
        <div className="grid grid-cols-5 gap-3">
          {Object.entries(moodboardData.colorPalette).map(([name, color], index) => (
            <div 
              key={name}
              className="group cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredColor(name)}
              onMouseLeave={() => setHoveredColor(null)}
              onClick={() => copyToClipboard(color)}
            >
              <div 
                className="w-full h-16 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 border-2 border-white"
                style={{ backgroundColor: color }}
              >
                <div className="w-full h-full rounded-xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="mt-2 text-center">
                <p className="text-xs font-medium text-gray-700 capitalize">{name}</p>
                <p className="text-xs text-gray-500 font-mono">{color}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-3 text-center">Click any color to copy HEX code</p>
      </div>

      {/* Typography */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Typography Pairing</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Headline Font</h4>
              <button 
                onClick={() => copyToClipboard(moodboardData.typography.headline)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
            <p 
              className="text-2xl font-bold text-gray-900 mb-2"
              style={{ fontFamily: moodboardData.typography.headline }}
            >
              {moodboardData.typography.headline}
            </p>
            <p 
              className="text-lg text-gray-700"
              style={{ fontFamily: moodboardData.typography.headline }}
            >
              The quick brown fox jumps
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Body Font</h4>
              <button 
                onClick={() => copyToClipboard(moodboardData.typography.body)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
            <p 
              className="text-lg font-semibold text-gray-900 mb-2"
              style={{ fontFamily: moodboardData.typography.body }}
            >
              {moodboardData.typography.body}
            </p>
            <p 
              className="text-sm text-gray-700 leading-relaxed"
              style={{ fontFamily: moodboardData.typography.body }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
            </p>
          </div>
        </div>
      </div>

      {/* Keywords */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Style Keywords</h3>
        <div className="flex flex-wrap gap-2">
          {moodboardData.keywords.map((keyword, index) => (
            <span
              key={keyword}
              className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium border border-purple-200 animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              #{keyword}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GeneratedMoodboard;