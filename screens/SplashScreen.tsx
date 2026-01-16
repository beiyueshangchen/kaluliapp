
import React, { useState, useEffect } from 'react';

const SplashScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev < 100 ? prev + 1 : 100));
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-background-light flex flex-col items-center justify-between py-20 z-50">
      <div className="flex-grow flex items-center justify-center relative w-full px-8">
        <div className="absolute w-64 h-64 bg-accent-cream rounded-full opacity-60 blur-3xl animate-pulse"></div>
        <div className="relative flex items-center justify-center">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="absolute w-full h-full text-primary fill-current" viewBox="0 0 100 100">
              <path d="M50 10 C 20 10, 10 40, 10 70 C 10 90, 30 90, 50 90 C 70 90, 90 90, 90 70 C 90 40, 80 10, 50 10" opacity="0.15" />
              <path d="M50 15 C 25 15, 15 45, 15 70 C 15 85, 30 85, 50 85" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" />
              <path d="M50 15 C 75 15, 85 45, 85 70 C 85 85, 70 85, 50 85" fill="none" strokeDasharray="4 8" strokeLinecap="round" strokeWidth="2.5" />
            </svg>
            <div className="z-10 bg-white p-4 rounded-full shadow-sm border border-primary/20">
              <span className="material-symbols-outlined text-primary text-5xl">center_focus_weak</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full max-w-xs flex flex-col items-center gap-8 px-6">
        <div className="text-center">
          <h1 className="text-[#333333] text-3xl font-bold tracking-[0.1em] uppercase">
            Calorie<span className="text-primary">Sense</span>
          </h1>
          <p className="text-primary/70 text-sm font-medium tracking-widest mt-1">NATURE MEETS INTELLIGENCE</p>
        </div>
        
        <div className="w-full flex flex-col gap-2">
          <div className="w-full h-[3px] bg-primary/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center px-1">
            <span className="text-[10px] font-bold text-primary/60 tracking-tighter uppercase">Initializing AI</span>
            <span className="text-[10px] font-bold text-primary/60 tracking-tighter uppercase">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
