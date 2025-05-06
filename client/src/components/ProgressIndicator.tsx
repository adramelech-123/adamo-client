import React from 'react';

interface ProgressIndicatorProps {
  progress: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ progress }) => {
  // Calculate the circumference of the circle
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate the dash offset based on progress
  const offset = circumference - (progress / 100) * circumference;
  
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        {/* Background circle */}
        <svg className="w-20 h-20" viewBox="0 0 100 100">
          <circle
            className="text-gray-200"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="50"
            cy="50"
          />
          
          {/* Progress circle */}
          <circle
            className="text-blue-600 transition-all duration-300 ease-in-out"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="50"
            cy="50"
            style={{ 
              transformOrigin: 'center',
              transform: 'rotate(-90deg)'
            }}
          />
        </svg>
        
        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-sm font-semibold">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;