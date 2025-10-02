import React, { useState } from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
  animated?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true, className = '', animated = true }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl'
  };

  return (
    <div 
      className={`flex items-center gap-3 ${className} transition-all duration-300 ${isHovered ? 'scale-105' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Enhanced Modern Logo Icon */}
      <div className={`${sizeClasses[size]} relative flex-shrink-0 ${animated ? 'animate-pulse' : ''}`}>
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-lg"
        >
          {/* Outer Ring with Gradient */}
          <circle
            cx="20"
            cy="20"
            r="18"
            fill="url(#outerGradient)"
            stroke="url(#borderGradient)"
            strokeWidth="2"
            className={`${animated ? 'animate-spin' : ''}`}
            style={{ animationDuration: '20s' }}
          />
          
          {/* Inner Design Elements */}
          <g className={`${isHovered ? 'animate-pulse' : ''}`}>
            {/* Central UI Grid Pattern */}
            <rect x="12" y="12" width="16" height="16" rx="2" fill="url(#gridGradient)" opacity="0.8" />
            
            {/* UI Component Representations */}
            <rect x="14" y="14" width="12" height="2" rx="1" fill="#60A5FA" opacity="0.9">
              {animated && <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />}
            </rect>
            <rect x="14" y="17" width="8" height="2" rx="1" fill="#A78BFA" opacity="0.8">
              {animated && <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.5s" repeatCount="indefinite" />}
            </rect>
            <rect x="14" y="20" width="10" height="2" rx="1" fill="#34D399" opacity="0.7">
              {animated && <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />}
            </rect>
            
            {/* Button Elements */}
            <rect x="14" y="24" width="4" height="2" rx="1" fill="#F59E0B" opacity="0.9">
              {animated && <animate attributeName="opacity" values="0.6;1;0.6" dur="1.8s" repeatCount="indefinite" />}
            </rect>
            <rect x="20" y="24" width="4" height="2" rx="1" fill="#EF4444" opacity="0.8">
              {animated && <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2.2s" repeatCount="indefinite" />}
            </rect>
          </g>
          
          {/* Floating Style Particles */}
          <g className={`${animated ? 'animate-bounce' : ''}`} style={{ animationDuration: '3s' }}>
            <circle cx="8" cy="12" r="1.5" fill="#60A5FA" opacity="0.7">
              {animated && <animate attributeName="cy" values="12;8;12" dur="4s" repeatCount="indefinite" />}
            </circle>
            <circle cx="32" cy="16" r="1" fill="#A78BFA" opacity="0.6">
              {animated && <animate attributeName="cx" values="32;28;32" dur="3.5s" repeatCount="indefinite" />}
            </circle>
            <circle cx="6" cy="28" r="1.2" fill="#34D399" opacity="0.8">
              {animated && <animate attributeName="cy" values="28;24;28" dur="4.5s" repeatCount="indefinite" />}
            </circle>
            <circle cx="34" cy="28" r="0.8" fill="#F59E0B" opacity="0.7">
              {animated && <animate attributeName="cx" values="34;30;34" dur="3.8s" repeatCount="indefinite" />}
            </circle>
          </g>
          
          {/* Central Glow Effect */}
          <circle cx="20" cy="20" r="6" fill="url(#centralGlow)" opacity={isHovered ? "0.6" : "0.3"} className="transition-opacity duration-300" />
          
          {/* Rotating Accent Ring */}
          <circle
            cx="20"
            cy="20"
            r="15"
            fill="none"
            stroke="url(#accentGradient)"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.5"
            className={`${animated ? 'animate-spin' : ''}`}
            style={{ animationDuration: '15s', animationDirection: 'reverse' }}
          />
          
          <defs>
            <linearGradient id="outerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="50%" stopColor="#334155" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            
            <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="25%" stopColor="#A78BFA" />
              <stop offset="50%" stopColor="#34D399" />
              <stop offset="75%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>
            
            <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
            
            <radialGradient id="centralGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="30%" stopColor="#A78BFA" />
              <stop offset="60%" stopColor="#34D399" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            
            <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="50%" stopColor="#A78BFA" />
              <stop offset="100%" stopColor="#60A5FA" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Enhanced Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold ${textSizeClasses[size]} tracking-wider leading-none`} style={{ fontFamily: 'Inter, sans-serif' }}>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              UI
            </span>
            <span className="text-gray-900 dark:text-white">
              vana
            </span>
          </span>
          {size === 'lg' && (
            <span className="text-xs text-gray-500 tracking-widest uppercase font-medium mt-1">
              Style Generator
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;

// Alternative Logo Variants
export const LogoIcon: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="20" cy="20" r="18" fill="url(#iconGradient)" stroke="url(#iconBorder)" strokeWidth="2" />
        <rect x="12" y="12" width="16" height="16" rx="2" fill="url(#iconInner)" opacity="0.8" />
        <rect x="14" y="14" width="12" height="2" rx="1" fill="#60A5FA" />
        <rect x="14" y="17" width="8" height="2" rx="1" fill="#A78BFA" />
        <rect x="14" y="20" width="10" height="2" rx="1" fill="#34D399" />
        <rect x="14" y="24" width="4" height="2" rx="1" fill="#F59E0B" />
        <rect x="20" y="24" width="4" height="2" rx="1" fill="#EF4444" />
        
        <defs>
          <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="iconBorder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="50%" stopColor="#A78BFA" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
          <linearGradient id="iconInner" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export const LogoText: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl'
  };

  return (
    <span className={`font-bold ${textSizeClasses[size]} tracking-wider ${className}`} style={{ fontFamily: 'Inter, sans-serif' }}>
      <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
        UI
      </span>
      <span className="text-gray-900 dark:text-white">
        vana
      </span>
    </span>
  );
};