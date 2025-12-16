import React from 'react';

type AikoMood = 'idle' | 'thinking' | 'generating' | 'happy' | 'sad';

interface AikoMascotProps {
  mood?: AikoMood;
  className?: string;
}

const AikoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <filter id="aiko-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g className="transition-transform duration-500 ease-out" filter="url(#aiko-glow)">
        {/* Head */}
        <path d="M 20,40 A 30,35 0,1,1 80,40 L 80,75 A 30,25 0,0,1 20,75 Z" fill="#2e1065" stroke="#fde047" strokeWidth="3" />
        {/* Screen */}
        <rect x="28" y="45" width="44" height="22" rx="5" fill="#110E1B" />
        {/* Eyes */}
        <circle cx="42" cy="56" r="4" fill="#fde047" className="aiko-eye-left" />
        <circle cx="58" cy="56" r="4" fill="#fde047" className="aiko-eye-right" />
        {/* Antenna */}
        <line x1="50" y1="40" x2="50" y2="25" stroke="#fde047" strokeWidth="3" />
        <circle cx="50" cy="22" r="5" fill="#f97316" stroke="#fffbeb" strokeWidth="1.5" />
    </g>
  </svg>
);


const AikoMascot: React.FC<AikoMascotProps> = ({ mood = 'idle', className }) => {
  const animationClass = {
    idle: 'animate-float',
    thinking: 'animate-pulse-subtle',
    generating: 'animate-pulse-subtle',
    happy: 'animate-subtle-bounce',
    sad: '',
  }[mood];

  return (
    <div className={`relative ${className}`}>
      <AikoIcon className={`${animationClass} w-full h-full text-gold-400 drop-shadow-lg`} />
    </div>
  );
};

export default AikoMascot;