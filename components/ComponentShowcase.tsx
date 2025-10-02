import React from 'react';
import type { UIStyle } from '../types';

interface ComponentShowcaseProps {
  style: UIStyle;
}

const ComponentShowcase: React.FC<ComponentShowcaseProps> = ({ style }) => {
  const { previewConfig } = style;
  const { palette, buttonClasses, cardClasses, inputClasses } = previewConfig;

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-white mb-6 font-primary">Component Showcase</h3>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Buttons */}
        <div className={cardClasses}>
          <h4 className="text-lg font-semibold mb-4 font-primary">Buttons</h4>
          <div className="space-y-3">
            <button className={buttonClasses}>Primary Button</button>
            <button className={`${buttonClasses} opacity-75`}>Secondary Button</button>
            <button className={`${buttonClasses} opacity-50`} disabled>Disabled Button</button>
          </div>
        </div>

        {/* Form Elements */}
        <div className={cardClasses}>
          <h4 className="text-lg font-semibold mb-4 font-primary">Form Elements</h4>
          <div className="space-y-3">
            <input 
              type="text" 
              placeholder="Text Input" 
              className={inputClasses || 'bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white w-full'} 
            />
            <select className={inputClasses || 'bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white w-full'}>
              <option>Select Option</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
            <textarea 
              placeholder="Textarea" 
              className={`${inputClasses || 'bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white w-full'} h-20 resize-none`}
            />
          </div>
        </div>

        {/* Navigation */}
        <div className={cardClasses}>
          <h4 className="text-lg font-semibold mb-4 font-primary">Navigation</h4>
          <nav className="space-y-2">
            <a href="#" className="block py-2 px-3 rounded hover:bg-current/10 transition-colors" style={{ color: palette.primary }}>
              Dashboard
            </a>
            <a href="#" className="block py-2 px-3 rounded hover:bg-current/10 transition-colors opacity-60">
              Analytics
            </a>
            <a href="#" className="block py-2 px-3 rounded hover:bg-current/10 transition-colors opacity-60">
              Settings
            </a>
          </nav>
        </div>

        {/* Cards */}
        <div className={cardClasses}>
          <h4 className="text-lg font-semibold mb-4 font-primary">Card Variations</h4>
          <div className="space-y-3">
            <div className="p-3 rounded border border-current/20">
              <h5 className="font-medium">Simple Card</h5>
              <p className="text-sm opacity-60">Card description</p>
            </div>
            <div className="p-3 rounded" style={{ backgroundColor: palette.primary, color: palette.bg }}>
              <h5 className="font-medium">Primary Card</h5>
              <p className="text-sm opacity-80">Highlighted content</p>
            </div>
          </div>
        </div>

        {/* Badges & Tags */}
        <div className={cardClasses}>
          <h4 className="text-lg font-semibold mb-4 font-primary">Badges & Tags</h4>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 text-xs rounded-full" style={{ backgroundColor: palette.primary, color: palette.bg }}>
              Primary
            </span>
            <span className="px-2 py-1 text-xs rounded-full" style={{ backgroundColor: palette.accent, color: palette.text }}>
              Accent
            </span>
            <span className="px-2 py-1 text-xs rounded-full border border-current/30">
              Outline
            </span>
            <span className="px-2 py-1 text-xs rounded-full bg-green-500 text-white">
              Success
            </span>
            <span className="px-2 py-1 text-xs rounded-full bg-red-500 text-white">
              Error
            </span>
          </div>
        </div>

        {/* Progress & Loading */}
        <div className={cardClasses}>
          <h4 className="text-lg font-semibold mb-4 font-primary">Progress & Loading</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-300" 
                  style={{ backgroundColor: palette.primary, width: '75%' }}
                ></div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full animate-spin border-2 border-current border-t-transparent"
                style={{ borderColor: palette.primary, borderTopColor: 'transparent' }}
              ></div>
              <span className="text-sm">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentShowcase;