
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
    : 'bg-gray-700/30 border-transparent hover:bg-gray-700/60 hover:border-gray-500';

  return (
    <button
      onClick={() => onSelect(style)}
      className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${activeClasses}`}
    >
      <div className="flex justify-between items-center">
        <span className="font-semibold text-white">{name}</span>
        <div className="flex space-x-1.5">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: palette.bg, border: `1px solid ${palette.text}` }}></div>
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: palette.primary }}></div>
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: palette.accent }}></div>
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: palette.text }}></div>
        </div>
      </div>
    </button>
  );
};

export default React.memo(StyleCard);
