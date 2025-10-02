import React, { useState, useCallback, useRef } from 'react';
import UploadZone from './moodboard/UploadZone';
import KeywordPicker from './moodboard/KeywordPicker';
import GeneratedMoodboard from './moodboard/GeneratedMoodboard';
import MatchingStyleKit from './moodboard/MatchingStyleKit';
import ExportOptions from './moodboard/ExportOptions';
import EngagementExtras from './moodboard/EngagementExtras';

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

const MoodboardGenerator: React.FC = () => {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [moodboardData, setMoodboardData] = useState<MoodboardData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleImagesUpload = useCallback((files: File[]) => {
    const newImages: UploadedImage[] = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      url: URL.createObjectURL(file),
      name: file.name
    }));
    setUploadedImages(prev => [...prev, ...newImages]);
  }, []);

  const handleKeywordAdd = useCallback((keyword: string) => {
    if (!keywords.includes(keyword)) {
      setKeywords(prev => [...prev, keyword]);
    }
  }, [keywords]);

  const handleKeywordRemove = useCallback((keyword: string) => {
    setKeywords(prev => prev.filter(k => k !== keyword));
  }, []);

  const generateMoodboard = useCallback(async () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate mock moodboard data
    const mockMoodboard: MoodboardData = {
      images: uploadedImages,
      keywords,
      colorPalette: {
        primary: '#6366F1',
        secondary: '#8B5CF6',
        accent: '#EC4899',
        neutral: '#6B7280',
        background: '#F9FAFB'
      },
      typography: {
        headline: 'Inter',
        body: 'Source Sans Pro'
      },
      inspirationalImages: [
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400',
        'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=400',
        'https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=400',
        'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400'
      ]
    };
    
    setMoodboardData(mockMoodboard);
    setIsGenerating(false);
  }, [uploadedImages, keywords]);

  const handleSurpriseMe = useCallback(() => {
    const surpriseKeywords = ['minimalist', 'vibrant', 'modern', 'organic', 'bold'];
    const randomKeywords = surpriseKeywords.sort(() => 0.5 - Math.random()).slice(0, 3);
    setKeywords(randomKeywords);
    
    // Auto-generate after setting keywords
    setTimeout(() => {
      generateMoodboard();
    }, 500);
  }, [generateMoodboard]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Header */}
      <div className="px-6 py-12 text-center">
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
          AI-Powered Moodboard Generator
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
          Create Stunning{' '}
          <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Moodboards
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Upload your inspiration images, add keywords, and let AI generate beautiful moodboards with matching UI style kits
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column */}
          <div className="space-y-8">
            <UploadZone 
              onImagesUpload={handleImagesUpload}
              uploadedImages={uploadedImages}
              onImageRemove={(id) => setUploadedImages(prev => prev.filter(img => img.id !== id))}
            />
            
            <KeywordPicker
              keywords={keywords}
              onKeywordAdd={handleKeywordAdd}
              onKeywordRemove={handleKeywordRemove}
            />
            
            <EngagementExtras
              onSurpriseMe={handleSurpriseMe}
              onRemix={() => generateMoodboard()}
              onPin={() => {/* Handle pin */}}
              disabled={isGenerating}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {moodboardData ? (
              <>
                <GeneratedMoodboard 
                  moodboardData={moodboardData}
                  isGenerating={isGenerating}
                />
                
                <MatchingStyleKit
                  colorPalette={moodboardData.colorPalette}
                  typography={moodboardData.typography}
                  isDarkMode={isDarkMode}
                  onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                />
                
                <ExportOptions
                  moodboardData={moodboardData}
                  isDarkMode={isDarkMode}
                />
              </>
            ) : (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 text-center border border-gray-200/50 shadow-xl">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Generate!</h3>
                <p className="text-gray-600 mb-8">Upload some images and add keywords to create your AI-powered moodboard</p>
                <button
                  onClick={generateMoodboard}
                  disabled={uploadedImages.length === 0 || isGenerating}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isGenerating ? (
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0V9a8 8 0 1115.356 2m-15.356 0H9" />
                      </svg>
                      Generating Moodboard...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Generate Moodboard
                    </span>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodboardGenerator;