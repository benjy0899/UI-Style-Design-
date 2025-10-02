import React, { useState } from 'react';
import type { UIStyle, CustomizationOptions } from '../types';

interface StyleEditorProps {
  style: UIStyle;
  onStyleChange: (updatedStyle: UIStyle) => void;
}

const StyleEditor: React.FC<StyleEditorProps> = ({ style, onStyleChange }) => {
  const [activeTab, setActiveTab] = useState<'colors' | 'fonts' | 'layout' | 'advanced'>('colors');
  const [customization, setCustomization] = useState<CustomizationOptions>({
    borderRadius: 'md',
    spacing: 'normal',
    shadows: 'medium',
    animations: 'normal'
  });

  const updateStyle = (updates: Partial<UIStyle>) => {
    onStyleChange({ ...style, ...updates });
  };

  const updatePalette = (colorKey: string, value: string) => {
    const updatedStyle = {
      ...style,
      previewConfig: {
        ...style.previewConfig,
        palette: {
          ...style.previewConfig.palette,
          [colorKey]: value
        }
      }
    };
    onStyleChange(updatedStyle);
  };

  const updateFonts = (fontType: 'primary' | 'secondary', value: string) => {
    const updatedStyle = {
      ...style,
      fonts: {
        ...style.fonts,
        [fontType]: value
      }
    };
    onStyleChange(updatedStyle);
  };

  const updateColors = (colorType: string, value: string) => {
    const updatedStyle = {
      ...style,
      colors: {
        ...style.colors,
        [colorType]: value
      }
    };
    onStyleChange(updatedStyle);
  };

  const tabs = [
    { id: 'colors', label: 'Colors', icon: '🎨' },
    { id: 'fonts', label: 'Fonts', icon: '📝' },
    { id: 'layout', label: 'Layout', icon: '📐' },
    { id: 'advanced', label: 'Advanced', icon: '⚙️' }
  ] as const;

  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold text-white mb-4">Customize Style</h3>
      
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-4 bg-gray-700/30 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-500 text-white'
                : 'text-gray-300 hover:text-white hover:bg-gray-600/50'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === 'colors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-3">Palette Colors</h4>
              <div className="space-y-3">
                {Object.entries(style.previewConfig.palette).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-3">
                    <label className="text-xs text-gray-400 w-16 capitalize">{key}</label>
                    <input
                      type="color"
                      value={value}
                      onChange={(e) => updatePalette(key, e.target.value)}
                      className="w-8 h-8 rounded border border-gray-600 bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => updatePalette(key, e.target.value)}
                      className="flex-1 bg-gray-700/50 border border-gray-600 rounded px-2 py-1 text-xs text-white"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-3">Theme Colors</h4>
              <div className="space-y-3">
                {Object.entries(style.colors).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-3">
                    <label className="text-xs text-gray-400 w-16 capitalize">{key}</label>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => updateColors(key, e.target.value)}
                      className="flex-1 bg-gray-700/50 border border-gray-600 rounded px-2 py-1 text-xs text-white"
                      placeholder="Color description"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'fonts' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Primary Font</label>
              <select
                value={style.fonts.primary}
                onChange={(e) => updateFonts('primary', e.target.value)}
                className="w-full bg-gray-700/50 border border-gray-600 rounded px-3 py-2 text-white"
              >
                <option value="Inter">Inter</option>
                <option value="Roboto">Roboto</option>
                <option value="Poppins">Poppins</option>
                <option value="Playfair Display">Playfair Display</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Open Sans">Open Sans</option>
                <option value="Lato">Lato</option>
                <option value="Source Sans Pro">Source Sans Pro</option>
                <option value="Nunito">Nunito</option>
                <option value="Raleway">Raleway</option>
                <option value="JetBrains Mono">JetBrains Mono</option>
                <option value="Fira Code">Fira Code</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Secondary Font</label>
              <select
                value={style.fonts.secondary}
                onChange={(e) => updateFonts('secondary', e.target.value)}
                className="w-full bg-gray-700/50 border border-gray-600 rounded px-3 py-2 text-white"
              >
                <option value="Inter">Inter</option>
                <option value="Roboto">Roboto</option>
                <option value="Poppins">Poppins</option>
                <option value="Playfair Display">Playfair Display</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Open Sans">Open Sans</option>
                <option value="Lato">Lato</option>
                <option value="Source Sans Pro">Source Sans Pro</option>
                <option value="Nunito">Nunito</option>
                <option value="Raleway">Raleway</option>
                <option value="Space Mono">Space Mono</option>
                <option value="IBM Plex Mono">IBM Plex Mono</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === 'layout' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Layout Description</label>
              <textarea
                value={style.layout}
                onChange={(e) => updateStyle({ layout: e.target.value })}
                className="w-full bg-gray-700/50 border border-gray-600 rounded px-3 py-2 text-white h-20 resize-none"
                placeholder="Describe the layout style..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Style Description</label>
              <textarea
                value={style.style}
                onChange={(e) => updateStyle({ style: e.target.value })}
                className="w-full bg-gray-700/50 border border-gray-600 rounded px-3 py-2 text-white h-20 resize-none"
                placeholder="Describe the visual style..."
              />
            </div>
          </div>
        )}

        {activeTab === 'advanced' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-3">Border Radius</h4>
              <div className="grid grid-cols-3 gap-2">
                {(['none', 'sm', 'md', 'lg', 'xl', 'full'] as const).map((radius) => (
                  <button
                    key={radius}
                    onClick={() => setCustomization(prev => ({ ...prev, borderRadius: radius }))}
                    className={`p-2 text-xs rounded border transition-colors ${
                      customization.borderRadius === radius
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-gray-700/50 text-gray-300 border-gray-600 hover:bg-gray-600/50'
                    }`}
                  >
                    {radius}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-3">Spacing</h4>
              <div className="grid grid-cols-2 gap-2">
                {(['tight', 'normal', 'relaxed', 'loose'] as const).map((spacing) => (
                  <button
                    key={spacing}
                    onClick={() => setCustomization(prev => ({ ...prev, spacing }))}
                    className={`p-2 text-xs rounded border transition-colors ${
                      customization.spacing === spacing
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-gray-700/50 text-gray-300 border-gray-600 hover:bg-gray-600/50'
                    }`}
                  >
                    {spacing}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-3">Shadows</h4>
              <div className="grid grid-cols-2 gap-2">
                {(['none', 'subtle', 'medium', 'strong'] as const).map((shadow) => (
                  <button
                    key={shadow}
                    onClick={() => setCustomization(prev => ({ ...prev, shadows: shadow }))}
                    className={`p-2 text-xs rounded border transition-colors ${
                      customization.shadows === shadow
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-gray-700/50 text-gray-300 border-gray-600 hover:bg-gray-600/50'
                    }`}
                  >
                    {shadow}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-3">Animations</h4>
              <div className="grid grid-cols-2 gap-2">
                {(['none', 'subtle', 'normal', 'playful'] as const).map((animation) => (
                  <button
                    key={animation}
                    onClick={() => setCustomization(prev => ({ ...prev, animations: animation }))}
                    className={`p-2 text-xs rounded border transition-colors ${
                      customization.animations === animation
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-gray-700/50 text-gray-300 border-gray-600 hover:bg-gray-600/50'
                    }`}
                  >
                    {animation}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-600">
              <button
                onClick={() => {
                  // Apply customization settings to the style
                  console.log('Applying customization:', customization);
                }}
                className="w-full bg-green-500 text-white font-medium py-2 px-4 rounded hover:bg-green-600 transition-colors"
              >
                Apply Advanced Settings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StyleEditor;