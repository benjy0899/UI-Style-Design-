
import React, { useState, useCallback } from 'react';
import type { UIStyle } from './types';
import { UI_STYLES } from './constants/styles';
import StyleCard from './components/StyleCard';
import StylePreview from './components/StylePreview';
import StyleEditor from './components/StyleEditor';
import ComponentShowcase from './components/ComponentShowcase';
import ExportPanel from './components/ExportPanel';
import CodeDisplay from './components/CodeDisplay';

const App: React.FC = () => {
  const [selectedStyle, setSelectedStyle] = useState<UIStyle>(UI_STYLES[0]);
  const [customStyle, setCustomStyle] = useState<UIStyle | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSelectStyle = useCallback((style: UIStyle) => {
    setSelectedStyle(style);
    setCustomStyle(null);
    setIsEditing(false);
  }, []);

  const handleStyleChange = useCallback((updatedStyle: UIStyle) => {
    setCustomStyle(updatedStyle);
  }, []);

  const handleStartEditing = useCallback(() => {
    setCustomStyle(selectedStyle);
    setIsEditing(true);
  }, [selectedStyle]);

  const currentStyle = customStyle || selectedStyle;

  return (
    <div className="flex flex-col md:flex-row h-screen font-sans bg-gray-900 text-gray-200">
      <aside className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5 bg-gray-800/50 border-r border-gray-700/50 flex-shrink-0">
        <div className="p-4 border-b border-gray-700/50">
          <h1 className="text-xl font-bold text-white">UI Style Generator</h1>
          <p className="text-sm text-gray-400">Select a style to preview</p>
          <button
            onClick={handleStartEditing}
            className="mt-2 w-full bg-blue-500 text-white text-sm font-medium py-2 px-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            {isEditing ? 'Editing Style' : 'Customize Style'}
          </button>
        </div>
        <nav className="overflow-y-auto h-[calc(100vh-81px)] p-2">
          <ul className="space-y-1">
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
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-6 lg:p-10">
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
  );
};

export default App;
