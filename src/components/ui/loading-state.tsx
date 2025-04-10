
import React from 'react';
import { BeeLoading, BeeSpinner } from './bee-spinner';
import { Skeleton } from './skeleton';

interface LoadingStateProps {
  variant?: 'spinner' | 'dots' | 'skeleton';
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  count?: number;
  className?: string;
}

export function LoadingState({ 
  variant = 'spinner',
  text = 'Loading...',
  size = 'md',
  count = 3,
  className
}: LoadingStateProps) {
  if (variant === 'spinner') {
    return <BeeLoading message={text} size={size} className={className} />;
  }
  
  if (variant === 'dots') {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="flex space-x-1">
          {[...Array(count)].map((_, i) => (
            <div 
              key={i}
              className={`bg-primary rounded-full animate-pulse ${
                size === 'sm' ? 'h-1.5 w-1.5' : size === 'md' ? 'h-2 w-2' : 'h-3 w-3'
              }`}
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
        {text && <span className="text-muted-foreground text-sm">{text}</span>}
      </div>
    );
  }
  
  if (variant === 'skeleton') {
    return (
      <div className={`space-y-2 ${className}`}>
        {[...Array(count)].map((_, i) => (
          <Skeleton 
            key={i}
            className={size === 'sm' ? 'h-4 w-24' : size === 'md' ? 'h-5 w-32' : 'h-6 w-40'} 
          />
        ))}
      </div>
    );
  }
  
  return null;
}
