import React, { useState } from 'react';
import { Globe, Heart, Users, Leaf, Sparkles } from 'lucide-react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', animated = true }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Size mappings
  const sizeClasses = {
    small: {
      container: 'text-2xl',
      icons: 'w-5 h-5',
      text: 'text-xl font-bold',
    },
    medium: {
      container: 'text-3xl',
      icons: 'w-6 h-6',
      text: 'text-2xl font-bold',
    },
    large: {
      container: 'text-4xl',
      icons: 'w-8 h-8',
      text: 'text-3xl font-bold',
    },
  };

  const currentSize = sizeClasses[size];

  return (
    <div 
      className={`inline-flex items-center gap-2 ${currentSize.container}`}
      onMouseEnter={() => animated && setIsHovered(true)}
      onMouseLeave={() => animated && setIsHovered(false)}
    >
      <div className="relative">
        <div className={`
          flex items-center justify-center rounded-full p-3
          bg-gradient-to-br from-blue-600 to-green-500
          transition-all duration-500 ease-in-out
          ${isHovered ? 'shadow-lg rotate-3 scale-105' : 'shadow-md'}
        `}>
          <Globe 
            className={`
              ${currentSize.icons} text-white absolute
              transition-all duration-500 ease-in-out
              ${isHovered ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}
            `} 
          />
          <Heart 
            className={`
              ${currentSize.icons} text-white absolute
              transition-all duration-500 ease-in-out
              ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
            `} 
          />
          <div className="opacity-0">
            <Users className={currentSize.icons} />
          </div>
        </div>
        <Leaf 
          className={`
            absolute -bottom-1 -right-1 text-green-400
            transition-all duration-500 ease-in-out
            ${currentSize.icons}
            ${isHovered ? 'rotate-45 scale-110' : ''}
          `} 
        />
        <Sparkles 
          className={`
            absolute -top-1 -left-1 text-yellow-300
            transition-all duration-500 ease-in-out
            ${currentSize.icons}
            ${isHovered ? 'rotate-12 scale-110' : ''}
          `} 
        />
      </div>
      <div className={`flex flex-col leading-tight`}>
        <span 
          className={`
            ${currentSize.text} tracking-tight text-slate-900
            transition-all duration-300
            ${isHovered ? 'tracking-wider' : ''}
          `}
        >
          CSVMMF
        </span>
        {/* <span 
          className={`
            text-sm text-slate-600 font-medium
            transition-all duration-300
            ${isHovered ? 'tracking-wide' : ''}
          `}
        >
          Foundation
        </span> */}
      </div>
    </div>
  );
};

export default Logo;