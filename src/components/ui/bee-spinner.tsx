
import React from 'react';
import { cn } from "@/lib/utils";

interface BeeSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function BeeSpinner({ size = 'md', className }: BeeSpinnerProps) {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={cn("relative", sizeClasses[size], className)}>
        {/* Bee body */}
        <div className="absolute inset-0 bg-yellow-400 rounded-full animate-pulse"></div>
        
        {/* Bee stripes */}
        <div className="absolute inset-y-[30%] inset-x-0 bg-black h-[15%] rotate-0"></div>
        <div className="absolute inset-y-[55%] inset-x-0 bg-black h-[15%] rotate-0"></div>
        
        {/* Bee wings - animated */}
        <div className="absolute left-[-30%] top-[15%] w-[40%] h-[30%] bg-white rounded-full opacity-80 animate-[wing-flap_0.5s_ease-in-out_infinite]"></div>
        <div className="absolute right-[-30%] top-[15%] w-[40%] h-[30%] bg-white rounded-full opacity-80 animate-[wing-flap_0.5s_ease-in-out_infinite_0.1s]"></div>
      </div>
      <style>
        {`
          @keyframes wing-flap {
            0%, 100% { transform: rotate(-20deg) scaleY(1); }
            50% { transform: rotate(20deg) scaleY(0.8); }
          }
        `}
      </style>
    </div>
  );
}

export function BeeLoading({ message = "Loading...", size = 'md', className }: { message?: string; size?: 'sm' | 'md' | 'lg'; className?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-3">
      <BeeSpinner size={size} className={className} />
      <p className="text-foreground font-medium">{message}</p>
    </div>
  );
}
