import React, { useState, useCallback } from 'react';
import type { UIStyle } from '../types';
import { CopyIcon } from './Icons';

interface CodeDisplayProps {
  style: UIStyle;
}

type Tab = 'json' | 'prompt' | 'tailwind' | 'css';

const generatePrompt = (style: UIStyle): string => {
  return `Create a UI design system based on the "${style.name}" aesthetic.

Key characteristics:
- **Fonts**: Use "${style.fonts.primary}" for primary headings and "${style.fonts.secondary}" for body text.
- **Color Palette**: The core colors are primary: ${style.colors.primary}, accent: ${style.colors.accent}, dark: ${style.colors.dark}, and light: ${style.colors.light}.
- **Layout**: Emphasize a "${style.layout}" structure.
- **Overall Style**: The design should feel ${style.style}.

Generate components like cards, buttons, and headers reflecting this style.
`;
};

const generateTailwindExample = (style: UIStyle): string => {
  const { previewConfig } = style;
  return `
<!-- Container -->
<div class="p-8 ${previewConfig.containerClasses}" style="background-color: ${previewConfig.palette.bg}; color: ${previewConfig.palette.text};">
  
  <!-- Card -->
  <div class="${previewConfig.cardClasses}">
  
    <!-- Header -->
    <h1 class="${previewConfig.headerClasses} font-primary mb-4">
      Example Header
    </h1>
    
    <!-- Body Text -->
    <p class="font-secondary mb-6">
      This is some sample text for the component.
    </p>
    
    <!-- Button -->
    <button class="${previewConfig.buttonClasses}">
      Click Me
    </button>
    
  </div>
  
</div>
`;
};

const generateCssVariables = (style: UIStyle): string => {
  const { palette } = style.previewConfig;
  return `
:root {
  --font-primary: '${style.fonts.primary}', sans-serif;
  --font-secondary: '${style.fonts.secondary}', sans-serif;
  
  --color-bg: ${palette.bg};
  --color-text: ${palette.text};
  --color-primary: ${palette.primary};
  --color-accent: ${palette.accent};
  --color-neutral: ${palette.neutral};
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-secondary);
}

h1, h2, h3 {
  font-family: var(--font-primary);
}
`;
};

const TabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                active ? 'bg-gray-700 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700/50'
            }`}
        >
            {children}
        </button>
    );
};

const CodeDisplay: React.FC<CodeDisplayProps> = ({ style }) => {
    const [activeTab, setActiveTab] = useState<Tab>('json');
    const [copied, setCopied] = useState(false);

    const contentMap: Record<Tab, { code: string; lang: string }> = {
        json: { code: JSON.stringify(style, null, 2), lang: 'json' },
        prompt: { code: generatePrompt(style), lang: 'text' },
        tailwind: { code: generateTailwindExample(style).trim(), lang: 'html' },
        css: { code: generateCssVariables(style).trim(), lang: 'css' },
    };

    const handleCopy = useCallback(() => {
        const textToCopy = contentMap[activeTab].code;
        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }, [activeTab, contentMap]);
    
    return (
        <div className="bg-gray-800 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between bg-gray-900/50 px-4 pt-2">
                 <div className="flex space-x-1">
                    <TabButton active={activeTab === 'json'} onClick={() => setActiveTab('json')}>JSON</TabButton>
                    <TabButton active={activeTab === 'prompt'} onClick={() => setActiveTab('prompt')}>AI Prompt</TabButton>
                    <TabButton active={activeTab === 'tailwind'} onClick={() => setActiveTab('tailwind')}>Tailwind</TabButton>
                    <TabButton active={activeTab === 'css'} onClick={() => setActiveTab('css')}>Global CSS</TabButton>
                </div>
                <button
                    onClick={handleCopy}
                    className="flex items-center space-x-2 px-3 py-1.5 text-xs bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                >
                    <CopyIcon className="w-4 h-4" />
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
            </div>
            <div className="p-4 bg-gray-700">
                <pre className="text-sm text-gray-300 overflow-x-auto h-64">
                    <code className={`language-${contentMap[activeTab].lang}`}>
                        {contentMap[activeTab].code}
                    </code>
                </pre>
            </div>
        </div>
    );
};

export default CodeDisplay;