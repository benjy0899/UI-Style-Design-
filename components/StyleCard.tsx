
import React from 'react';
import type { UIStyle } from '../types';

interface StyleCardProps {
  style: UIStyle;
  isSelected: boolean;
  onSelect: (style: UIStyle) => void;
}

const StyleCard: React.FC<StyleCardProps> = ({ style, isSelected, onSelect }) => {
  const { name, previewConfig } = style;
  const { palette } = previewConfig;

  const activeClasses = isSelected
    ? 'bg-blue-500/20 border-blue-400'
    : 'bg-gray-700/30 border-gray-600/50 hover:bg-gray-700/60 hover:border-gray-500';

  return (
    <button
      onClick={() => onSelect(style)}
      className={`w-full text-left p-4 rounded-xl border transition-all duration-300 group ${activeClasses} relative`}
    >
      <div className="flex justify-between items-center">
        <span className="font-secondary font-medium text-white group-hover:text-blue-300 transition-colors">
          {name}
        </span>
        <div className="flex space-x-2">
          <div 
            className="w-3 h-3 rounded-full border border-white/20" 
            style={{ backgroundColor: palette.bg }}
          ></div>
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: palette.primary }}
          ></div>
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: palette.accent }}
          ></div>
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: palette.text }}
          ></div>
        </div>
      </div>
    </button>
  );
};

export default React.memo(StyleCard);
