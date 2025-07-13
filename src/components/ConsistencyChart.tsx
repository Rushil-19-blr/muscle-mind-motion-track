import React from 'react';
import { Target } from 'lucide-react';

interface ConsistencyChartProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export const ConsistencyChart: React.FC<ConsistencyChartProps> = ({ 
  percentage, 
  size = 120, 
  strokeWidth = 8,
  className = ""
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-muted-foreground/20"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-accent transition-all duration-1000 ease-out"
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">
            {percentage}%
          </div>
          <div className="text-xs text-muted-foreground -mt-1">
            Consistency
          </div>
        </div>
      </div>
    </div>
  );
};