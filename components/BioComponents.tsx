import React from 'react';

// Bioluminescent Button Component
interface BioButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'coral' | 'violet';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export const BioButton: React.FC<BioButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  disabled = false 
}) => {
  const baseClasses = 'bio-button font-primary font-medium tracking-wider transition-all duration-300 relative overflow-hidden';
  
  const variantClasses = {
    primary: 'border-bio-teal/50 text-bio-teal hover:border-bio-teal hover:text-white',
    secondary: 'border-bio-violet/50 text-bio-violet hover:border-bio-violet hover:text-white',
    coral: 'border-bio-coral/50 text-bio-coral hover:border-bio-coral hover:text-white',
    violet: 'border-bio-violet/50 text-bio-violet hover:border-bio-violet hover:text-white'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-xs rounded-md',
    md: 'px-4 py-3 text-sm rounded-lg',
    lg: 'px-6 py-4 text-base rounded-xl'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {children}
    </button>
  );
};

// Bioluminescent Card Component
interface BioCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'teal' | 'coral' | 'violet';
  animated?: boolean;
}

export const BioCard: React.FC<BioCardProps> = ({ 
  children, 
  className = '', 
  glowColor = 'teal',
  animated = false 
}) => {
  const glowClasses = {
    teal: 'hover:bio-glow-teal',
    coral: 'hover:bio-glow-coral',
    violet: 'hover:bio-glow-violet'
  };

  return (
    <div className={`bio-card rounded-xl p-6 ${glowClasses[glowColor]} ${animated ? 'animate-float' : ''} ${className}`}>
      {children}
    </div>
  );
};

// Bioluminescent Input Component
interface BioInputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const BioInput: React.FC<BioInputProps> = ({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  className = '' 
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`
        bg-bio-deep/60 border border-bio-teal/30 rounded-lg px-4 py-3 
        text-bio-teal placeholder-bio-teal/50 font-secondary
        focus:border-bio-teal focus:outline-none focus:ring-2 focus:ring-bio-teal/20
        transition-all duration-300
        ${className}
      `}
    />
  );
};

// Bioluminescent Header Component
interface BioHeaderProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4;
  className?: string;
  glowing?: boolean;
}

export const BioHeader: React.FC<BioHeaderProps> = ({ 
  children, 
  level = 1, 
  className = '',
  glowing = false 
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  const levelClasses = {
    1: 'text-4xl md:text-5xl lg:text-6xl',
    2: 'text-2xl md:text-3xl lg:text-4xl',
    3: 'text-xl md:text-2xl lg:text-3xl',
    4: 'text-lg md:text-xl lg:text-2xl'
  };

  return (
    <Tag className={`
      font-primary font-bold text-bio-teal tracking-wider
      ${levelClasses[level]}
      ${glowing ? 'bio-glow-teal animate-pulse-glow' : ''}
      ${className}
    `}>
      {children}
    </Tag>
  );
};

// Bioluminescent Badge Component
interface BioBadgeProps {
  children: React.ReactNode;
  variant?: 'teal' | 'coral' | 'violet';
  className?: string;
}

export const BioBadge: React.FC<BioBadgeProps> = ({ 
  children, 
  variant = 'teal', 
  className = '' 
}) => {
  const variantClasses = {
    teal: 'bg-bio-teal/20 text-bio-teal border-bio-teal/50',
    coral: 'bg-bio-coral/20 text-bio-coral border-bio-coral/50',
    violet: 'bg-bio-violet/20 text-bio-violet border-bio-violet/50'
  };

  return (
    <span className={`
      inline-flex items-center px-3 py-1 rounded-full text-xs font-secondary font-medium
      border backdrop-blur-sm animate-pulse-glow
      ${variantClasses[variant]} ${className}
    `}>
      {children}
    </span>
  );
};

// Bioluminescent Progress Bar
interface BioProgressProps {
  value: number;
  max?: number;
  className?: string;
  color?: 'teal' | 'coral' | 'violet';
}

export const BioProgress: React.FC<BioProgressProps> = ({ 
  value, 
  max = 100, 
  className = '',
  color = 'teal' 
}) => {
  const percentage = (value / max) * 100;
  
  const colorClasses = {
    teal: 'bg-bio-teal',
    coral: 'bg-bio-coral',
    violet: 'bg-bio-violet'
  };

  return (
    <div className={`w-full bg-bio-deep/60 rounded-full h-2 overflow-hidden ${className}`}>
      <div 
        className={`h-full ${colorClasses[color]} transition-all duration-500 animate-pulse-glow`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

// Floating Particles Background Effect
export const BioParticles: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-bio-teal rounded-full animate-float opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        />
      ))}
      {[...Array(15)].map((_, i) => (
        <div
          key={`coral-${i}`}
          className="absolute w-0.5 h-0.5 bg-bio-coral rounded-full animate-float opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${4 + Math.random() * 2}s`
          }}
        />
      ))}
      {[...Array(10)].map((_, i) => (
        <div
          key={`violet-${i}`}
          className="absolute w-0.5 h-0.5 bg-bio-violet rounded-full animate-float opacity-25"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );
};