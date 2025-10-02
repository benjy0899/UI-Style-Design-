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

interface ExportOptionsProps {
  moodboardData: MoodboardData;
  isDarkMode: boolean;
}

const ExportOptions: React.FC<ExportOptionsProps> = ({
  moodboardData,
  isDarkMode
}) => {
  const [isExporting, setIsExporting] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  const exportOptions = [
    {
      id: 'moodboard-png',
      title: 'Moodboard PNG',
      description: 'High-quality image of your moodboard',
      icon: '🖼️',
      format: 'PNG',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'moodboard-pdf',
      title: 'Moodboard PDF',
      description: 'Print-ready PDF with all details',
      icon: '📄',
      format: 'PDF',
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 'design-tokens',
      title: 'Design Tokens',
      description: 'JSON file with colors and typography',
      icon: '🎨',
      format: 'JSON',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      id: 'react-code',
      title: 'React Components',
      description: 'Ready-to-use React/Tailwind code',
      icon: '⚛️',
      format: 'JSX',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'figma-plugin',
      title: 'Figma Plugin',
      description: 'Import directly into Figma',
      icon: '🎯',
      format: 'Figma',
      color: 'from-orange-500 to-yellow-500'
    }
  ];

  const handleExport = async (optionId: string) => {
    setIsExporting(optionId);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate mock export based on type
    switch (optionId) {
      case 'moodboard-png':
      case 'moodboard-pdf':
        // In a real app, you'd generate and download the file
        console.log(`Exporting ${optionId}...`);
        break;
      case 'design-tokens':
        const tokens = {
          colors: moodboardData.colorPalette,
          typography: moodboardData.typography,
          keywords: moodboardData.keywords
        };
        const blob = new Blob([JSON.stringify(tokens, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'design-tokens.json';
        a.click();
        URL.revokeObjectURL(url);
        break;
      case 'react-code':
        const reactCode = generateReactCode(moodboardData);
        const reactBlob = new Blob([reactCode], { type: 'text/plain' });
        const reactUrl = URL.createObjectURL(reactBlob);
        const reactA = document.createElement('a');
        reactA.href = reactUrl;
        reactA.download = 'components.jsx';
        reactA.click();
        URL.revokeObjectURL(reactUrl);
        break;
      case 'figma-plugin':
        // In a real app, this would integrate with Figma's API
        console.log('Opening Figma plugin...');
        break;
    }
    
    setIsExporting(null);
  };

  const generateShareUrl = async () => {
    setIsExporting('share');
    
    // Simulate generating share URL
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockUrl = `https://uivana.com/moodboard/${Math.random().toString(36).substr(2, 9)}`;
    setShareUrl(mockUrl);
    setIsExporting(null);
    
    // Copy to clipboard
    navigator.clipboard.writeText(mockUrl);
  };

  const generateReactCode = (data: MoodboardData) => {
    return `// Generated React Components with Tailwind CSS
import React from 'react';

// Color Palette
const colors = ${JSON.stringify(data.colorPalette, null, 2)};

// Typography
const fonts = ${JSON.stringify(data.typography, null, 2)};

// Button Component
export const Button = ({ children, variant = 'primary', ...props }) => {
  const baseClasses = "px-6 py-3 rounded-lg font-semibold transition-all duration-300";
  const variants = {
    primary: "bg-[${data.colorPalette.primary}] text-white hover:shadow-lg",
    secondary: "border-2 border-[${data.colorPalette.primary}] text-[${data.colorPalette.primary}] hover:bg-[${data.colorPalette.primary}] hover:text-white",
    accent: "bg-[${data.colorPalette.accent}] text-white hover:shadow-lg"
  };
  
  return (
    <button 
      className={\`\${baseClasses} \${variants[variant]}\`}
      style={{ fontFamily: fonts.body }}
      {...props}
    >
      {children}
    </button>
  );
};

// Card Component
export const Card = ({ title, children, ...props }) => {
  return (
    <div 
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
      style={{ fontFamily: fonts.body }}
      {...props}
    >
      {title && (
        <h3 
          className="text-xl font-bold mb-4"
          style={{ fontFamily: fonts.headline }}
        >
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};

// Usage Example
export const Example = () => {
  return (
    <div className="p-8" style={{ backgroundColor: colors.background }}>
      <Card title="Sample Card">
        <p className="text-gray-600 mb-4">
          This is a sample card using your generated color palette and typography.
        </p>
        <div className="flex gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
        </div>
      </Card>
    </div>
  );
};`;
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Export Options</h2>
      </div>

      {/* Export Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {exportOptions.map((option, index) => (
          <button
            key={option.id}
            onClick={() => handleExport(option.id)}
            disabled={isExporting === option.id}
            className="group relative bg-white rounded-2xl p-6 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-left disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${option.color} rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                {isExporting === option.id ? (
                  <svg className="w-6 h-6 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0V9a8 8 0 1115.356 2m-15.356 0H9" />
                  </svg>
                ) : (
                  option.icon
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {option.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{option.description}</p>
                <span className={`inline-block px-2 py-1 rounded text-xs font-medium bg-gradient-to-r ${option.color} text-white`}>
                  {option.format}
                </span>
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {/* Share Section */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Share & Collaborate</h3>
        
        {shareUrl ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="font-semibold text-green-800">Share URL Generated!</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-4 py-2 bg-white border border-green-300 rounded-lg text-sm font-mono"
              />
              <button
                onClick={() => navigator.clipboard.writeText(shareUrl)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
              >
                Copy
              </button>
            </div>
            <p className="text-sm text-green-700 mt-2">
              Link copied to clipboard! Share this URL with your team for collaboration.
            </p>
          </div>
        ) : (
          <button
            onClick={generateShareUrl}
            disabled={isExporting === 'share'}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-2xl font-semibold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isExporting === 'share' ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0V9a8 8 0 1115.356 2m-15.356 0H9" />
                </svg>
                Generating Share Link...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                Generate Share Link
              </span>
            )}
          </button>
        )}
      </div>

      {/* Pro Tips */}
      <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-sm text-blue-800 font-medium mb-1">Export Tips</p>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• PNG/PDF exports include all visual elements and color swatches</li>
              <li>• Design tokens work with popular design systems and tools</li>
              <li>• React code is production-ready with Tailwind CSS classes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportOptions;