import React, { useState } from 'react';
import type { UIStyle } from '../types';

interface ExportPanelProps {
  style: UIStyle;
}

const ExportPanel: React.FC<ExportPanelProps> = ({ style }) => {
  const [exportFormat, setExportFormat] = useState<'css' | 'tailwind' | 'json' | 'scss'>('css');
  const [copied, setCopied] = useState(false);

  const generateCSS = () => {
    const { palette } = style.previewConfig;
    return `:root {
  --color-primary: ${palette.primary};
  --color-accent: ${palette.accent};
  --color-background: ${palette.bg};
  --color-text: ${palette.text};
  --color-neutral: ${palette.neutral};
  --font-primary: "${style.fonts.primary}", sans-serif;
  --font-secondary: "${style.fonts.secondary}", sans-serif;
}

.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-background);
  font-family: var(--font-primary);
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.card {
  background-color: var(--color-neutral);
  color: var(--color-text);
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}`;
  };

  const generateTailwind = () => {
    return `// Tailwind CSS Configuration
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '${style.previewConfig.palette.primary}',
        accent: '${style.previewConfig.palette.accent}',
        background: '${style.previewConfig.palette.bg}',
        text: '${style.previewConfig.palette.text}',
        neutral: '${style.previewConfig.palette.neutral}',
      },
      fontFamily: {
        primary: ['${style.fonts.primary}', 'sans-serif'],
        secondary: ['${style.fonts.secondary}', 'sans-serif'],
      }
    }
  }
}

// Example component classes:
// bg-primary text-background font-primary px-4 py-2 rounded-md hover:opacity-90 transition-all`;
  };

  const generateJSON = () => {
    return JSON.stringify(style, null, 2);
  };

  const generateSCSS = () => {
    const { palette } = style.previewConfig;
    return `// SCSS Variables
$color-primary: ${palette.primary};
$color-accent: ${palette.accent};
$color-background: ${palette.bg};
$color-text: ${palette.text};
$color-neutral: ${palette.neutral};
$font-primary: "${style.fonts.primary}", sans-serif;
$font-secondary: "${style.fonts.secondary}", sans-serif;

// Mixins
@mixin button-primary {
  background-color: $color-primary;
  color: $color-background;
  font-family: $font-primary;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
}

@mixin card {
  background-color: $color-neutral;
  color: $color-text;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}`;
  };

  const getExportContent = () => {
    switch (exportFormat) {
      case 'css': return generateCSS();
      case 'tailwind': return generateTailwind();
      case 'json': return generateJSON();
      case 'scss': return generateSCSS();
      default: return generateCSS();
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getExportContent());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadFile = () => {
    const content = getExportContent();
    const extensions = { css: 'css', tailwind: 'js', json: 'json', scss: 'scss' };
    const filename = `${style.name.toLowerCase().replace(/\s+/g, '-')}.${extensions[exportFormat]}`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 mt-6">
      <h3 className="text-lg font-semibold text-white mb-4">Export Style</h3>
      
      {/* Format Selection */}
      <div className="flex flex-wrap gap-2 mb-4">
        {(['css', 'tailwind', 'json', 'scss'] as const).map((format) => (
          <button
            key={format}
            onClick={() => setExportFormat(format)}
            className={`px-3 py-1 text-sm rounded transition-colors ${
              exportFormat === format
                ? 'bg-blue-500 text-white'
                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
            }`}
          >
            {format.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Code Preview */}
      <div className="bg-gray-900/50 border border-gray-600 rounded p-3 mb-4 max-h-60 overflow-y-auto">
        <pre className="text-xs text-gray-300 whitespace-pre-wrap">
          {getExportContent()}
        </pre>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={copyToClipboard}
          className={`flex-1 font-medium py-2 px-4 rounded transition-colors ${
            copied 
              ? 'bg-green-500 text-white' 
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {copied ? '✓ Copied!' : 'Copy to Clipboard'}
        </button>
        <button
          onClick={downloadFile}
          className="bg-gray-600 text-white font-medium py-2 px-4 rounded hover:bg-gray-700 transition-colors"
        >
          Download File
        </button>
      </div>
    </div>
  );
};

export default ExportPanel;