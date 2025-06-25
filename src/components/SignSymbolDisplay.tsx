
import React from 'react';

interface SignSymbolDisplayProps {
  letter: string;
  className?: string;
}

export const SignSymbolDisplay: React.FC<SignSymbolDisplayProps> = ({ letter, className }) => {
  // SVG paths for each letter based on ASL alphabet
  const signPaths: { [key: string]: string } = {
    'A': 'M50 20 Q45 15 40 20 L40 60 Q40 70 50 70 L60 70 Q70 70 70 60 L70 20 Q65 15 60 20 L55 25 L50 20 Z M45 25 L65 25',
    'B': 'M30 20 L30 70 L40 70 L40 30 L60 30 L60 50 L70 50 L70 70 L40 70 L40 60 L60 60 L60 40 L40 40',
    'C': 'M60 20 Q70 20 70 30 L70 60 Q70 70 60 70 L40 70 Q30 70 30 60 L30 30 Q30 20 40 20',
    'D': 'M45 20 L45 70 L35 70 L35 20 Z M50 25 L50 65 L60 65 Q65 65 65 60 L65 30 Q65 25 60 25 Z',
    'E': 'M45 25 Q40 20 35 25 L35 35 Q35 40 40 40 L60 40 Q65 40 65 35 L65 25 Q60 20 55 25 L50 30 L45 25 Z',
    'F': 'M40 20 L40 30 L45 30 L45 25 L50 25 L50 30 L45 30 L45 70 L40 70 L40 60 L50 60 L50 70 L45 70',
    'G': 'M30 30 L30 35 L70 35 L70 30 Z M45 20 L45 50 L55 50 L55 20 Z',
    'H': 'M30 30 L30 35 L70 35 L70 30 Z M40 20 L40 50 L45 50 L45 20 Z M55 20 L55 50 L60 50 L60 20 Z',
    'I': 'M50 20 L50 70 L45 70 L45 25 L40 25 L40 20 L60 20 L60 25 L55 25 L55 70 L50 70',
    'J': 'M50 20 L50 60 Q50 70 40 70 L35 70 Q25 70 25 60 L25 55 L30 55 L30 60 Q30 65 35 65 L40 65 Q45 65 45 60 L45 20 Z',
    'K': 'M40 20 L40 70 L35 70 L35 20 Z M50 30 L65 20 L70 25 L55 35 L70 45 L65 50 L50 40 L45 35 L50 30',
    'L': 'M40 20 L40 65 L65 65 L65 70 L35 70 L35 20 Z M50 25 L50 30 L60 30 L60 25 Z',
    'M': 'M35 20 L35 70 L40 70 L40 25 L45 35 L50 25 L55 35 L60 25 L60 70 L65 70 L65 20 L60 20 L50 35 L40 20 Z',
    'N': 'M35 20 L35 70 L40 70 L40 30 L55 60 L60 60 L60 20 L55 20 L55 50 L40 20 Z',
    'O': 'M50 20 Q40 20 40 30 L40 60 Q40 70 50 70 Q60 70 60 60 L60 30 Q60 20 50 20 Z',
    'P': 'M35 20 L35 70 L40 70 L40 45 L55 45 Q65 45 65 35 L65 25 Q65 15 55 15 L35 15 L35 20 Z M40 20 L55 20 Q60 20 60 25 L60 35 Q60 40 55 40 L40 40',
    'Q': 'M50 20 Q40 20 40 30 L40 60 Q40 70 50 70 Q60 70 60 60 L60 30 Q60 20 50 20 Z M55 55 L65 65',
    'R': 'M35 20 L35 70 L40 70 L40 45 L50 70 L55 70 L45 45 L55 45 Q65 45 65 35 L65 25 Q65 15 55 15 L35 15 L35 20 Z M40 20 L55 20 Q60 20 60 25 L60 35 Q60 40 55 40 L40 40',
    'S': 'M50 20 Q40 20 40 30 Q40 40 50 40 Q60 40 60 50 Q60 60 50 60 Q40 60 40 70 L60 70 Q70 70 70 60 Q70 50 60 50 Q50 50 50 40 Q50 30 60 30 Q70 30 70 20',
    'T': 'M30 20 L30 25 L45 25 L45 70 L55 70 L55 25 L70 25 L70 20 Z',
    'U': 'M35 20 L35 60 Q35 70 45 70 L55 70 Q65 70 65 60 L65 20 L60 20 L60 60 Q60 65 55 65 L45 65 Q40 65 40 60 L40 20 Z',
    'V': 'M35 20 L50 70 L55 70 L70 20 L65 20 L52.5 60 L47.5 60 L35 20 Z',
    'W': 'M30 20 L40 70 L45 70 L50 40 L55 70 L60 70 L70 20 L65 20 L57.5 60 L52.5 40 L47.5 60 L42.5 40 L35 20 Z',
    'X': 'M35 20 L65 70 L70 65 L45 25 L70 25 L65 20 L35 50 L35 20 Z M65 20 L35 70 L40 75 L65 45 L40 45 L35 50',
    'Y': 'M35 20 L50 40 L50 70 L55 70 L55 40 L70 20 L65 25 L52.5 35 L47.5 35 L35 25 Z',
    'Z': 'M30 20 L70 20 L70 25 L40 60 L70 60 L70 65 L30 65 L30 60 L60 25 L30 25 Z'
  };

  const getSignPath = (letter: string): string => {
    return signPaths[letter] || signPaths['A']; // fallback to 'A' if letter not found
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg 
        width="120" 
        height="120" 
        viewBox="0 0 100 90" 
        className="border-2 border-teal-200 rounded-lg bg-white shadow-sm"
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
      >
        {/* Hand outline */}
        <path
          d={getSignPath(letter)}
          fill="#fef7ed"
          stroke="#0891b2"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        
        {/* Letter label */}
        <text
          x="50"
          y="85"
          textAnchor="middle"
          fontSize="12"
          fontWeight="bold"
          fill="#0891b2"
        >
          {letter}
        </text>
      </svg>
    </div>
  );
};
