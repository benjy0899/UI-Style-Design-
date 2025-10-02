import React from 'react';
import type { UIStyle } from '../types';

interface ComponentShowcaseProps {
  style: UIStyle;
}

const ComponentShowcase: React.FC<ComponentShowcaseProps> = ({ style }) => {
  const { previewConfig, fonts } = style;
  const { palette, buttonClasses, cardClasses, inputClasses, tagClasses } = previewConfig;

  const dynamicStyles = {
    '--font-primary': `"${fonts.primary}", sans-serif`,
    '--font-secondary': `"${fonts.secondary}", sans-serif`,
  } as React.CSSProperties;

  return (
    <div className="mt-12" style={dynamicStyles}>
      <h2 className="text-3xl font-bold mb-8 font-primary tracking-wider" style={{ color: palette.primary }}>
        Component Showcase
      </h2>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Typography Showcase */}
        <div className={`${cardClasses} p-6`}>
          <h4 className="text-lg font-semibold mb-6 font-primary" style={{ color: palette.primary }}>Typography</h4>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-secondary mb-1" style={{ color: palette.text, opacity: 0.7 }}>Primary Font: {fonts.primary}</p>
              <h3 className="text-2xl font-bold font-primary" style={{ color: palette.primary }}>
                The Quick Brown Fox
              </h3>
            </div>
            <div>
              <p className="text-xs font-secondary mb-1" style={{ color: palette.text, opacity: 0.7 }}>Secondary Font: {fonts.secondary}</p>
              <p className="text-base font-secondary" style={{ color: palette.text }}>
                Jumps over the lazy dog. This demonstrates the secondary font family in use.
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Style Buttons */}
        <div className={`${cardClasses} p-6`}>
          <h4 className="text-lg font-semibold mb-6 font-primary" style={{ color: palette.primary }}>Buttons</h4>
          <div className="space-y-4">
            <button className={`${buttonClasses} w-full`}>Primary Button</button>
            <button className={`${buttonClasses} w-full opacity-75`}>Secondary Button</button>
            <button 
              className="w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 border font-primary"
              style={{ 
                backgroundColor: 'transparent',
                color: palette.accent,
                borderColor: palette.accent
              }}
            >
              Accent Button
            </button>
            <button className={`${buttonClasses} w-full opacity-50`} disabled>Disabled Button</button>
          </div>
        </div>

        {/* Dynamic Form Elements */}
        <div className={`${cardClasses} p-6`}>
          <h4 className="text-lg font-semibold mb-6 font-primary" style={{ color: palette.primary }}>Form Elements</h4>
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Text Input" 
              className={inputClasses || `w-full py-3 px-4 rounded-lg border font-secondary`}
              style={{ 
                backgroundColor: palette.neutral,
                color: palette.text,
                borderColor: palette.primary + '50'
              }}
            />
            <select 
              className={inputClasses || `w-full py-3 px-4 rounded-lg border font-secondary`}
              style={{ 
                backgroundColor: palette.neutral,
                color: palette.text,
                borderColor: palette.primary + '50'
              }}
            >
              <option>Select Option</option>
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
            <textarea 
              placeholder="Textarea" 
              className={`${inputClasses || `w-full py-3 px-4 rounded-lg border font-secondary`} h-20 resize-none`}
              style={{ 
                backgroundColor: palette.neutral,
                color: palette.text,
                borderColor: palette.primary + '50'
              }}
            />
          </div>
        </div>

        {/* Dynamic Navigation & Badges */}
        <div className={`${cardClasses} p-6`}>
          <h4 className="text-lg font-semibold mb-6 font-primary" style={{ color: palette.primary }}>Navigation & Badges</h4>
          <nav className="space-y-3 mb-6">
            <a 
              href="#" 
              className="block py-3 px-4 rounded-lg transition-all duration-300 font-secondary"
              style={{ 
                backgroundColor: palette.primary + '20',
                color: palette.primary,
                border: `1px solid ${palette.primary}50`
              }}
            >
              📊 Dashboard
            </a>
            <a 
              href="#" 
              className="block py-3 px-4 rounded-lg transition-all duration-300 font-secondary opacity-70 hover:opacity-100"
              style={{ color: palette.text }}
            >
              📈 Analytics
            </a>
            <a 
              href="#" 
              className="block py-3 px-4 rounded-lg transition-all duration-300 font-secondary opacity-70 hover:opacity-100"
              style={{ color: palette.text }}
            >
              ⚙️ Settings
            </a>
          </nav>
          
          <div className="space-y-3">
            <span className={tagClasses || `inline-block px-3 py-1 text-xs font-medium rounded-full`} style={{ backgroundColor: palette.primary, color: palette.bg }}>
              Primary
            </span>
            <span className={tagClasses || `inline-block px-3 py-1 text-xs font-medium rounded-full`} style={{ backgroundColor: palette.accent, color: palette.text }}>
              Accent
            </span>
            <span className={tagClasses || `inline-block px-3 py-1 text-xs font-medium rounded-full border`} style={{ borderColor: palette.primary, color: palette.primary }}>
              Outline
            </span>
          </div>
        </div>

        {/* Dynamic Card Variations */}
        <div className={`${cardClasses} p-6 md:col-span-2`}>
          <h4 className="text-lg font-semibold mb-6 font-primary" style={{ color: palette.primary }}>Card Variations</h4>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 rounded-lg border" style={{ borderColor: palette.primary + '30', backgroundColor: palette.neutral }}>
              <h5 className="font-primary font-semibold mb-2" style={{ color: palette.primary }}>Simple Card</h5>
              <p className="font-secondary text-sm opacity-80" style={{ color: palette.text }}>Basic card with border styling</p>
            </div>
            <div className="p-4 rounded-lg" style={{ backgroundColor: palette.accent, color: palette.bg }}>
              <h5 className="font-primary font-semibold mb-2">Accent Card</h5>
              <p className="font-secondary text-sm opacity-90">Highlighted content card</p>
            </div>
          </div>
        </div>

        {/* Dynamic Progress & Loading */}
        <div className={`${cardClasses} p-6`}>
          <h4 className="text-lg font-semibold mb-6 font-primary" style={{ color: palette.primary }}>Progress & Loading</h4>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2 font-secondary">
                <span style={{ color: palette.text }}>Progress</span>
                <span style={{ color: palette.primary }}>75%</span>
              </div>
              <div className="w-full rounded-full h-3 overflow-hidden" style={{ backgroundColor: palette.neutral }}>
                <div 
                  className="h-full rounded-full transition-all duration-500" 
                  style={{ 
                    backgroundColor: palette.primary,
                    width: '75%'
                  }}
                ></div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div 
                className="w-5 h-5 rounded-full animate-spin border-2 border-t-transparent"
                style={{ borderColor: palette.primary, borderTopColor: 'transparent' }}
              ></div>
              <span className="text-sm font-secondary" style={{ color: palette.text }}>Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentShowcase;