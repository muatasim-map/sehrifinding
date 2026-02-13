
import React from 'react';
import { Home, Search, Heart } from 'lucide-react';
import { IslamicPattern } from './Pattern';

export const BottomNav = () => {
  return (
    <div className="sticky bottom-0 bg-white border-t border-gray-200 h-16 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50 overflow-hidden">
      
      <div className="grid grid-cols-3 h-full relative z-10">
        <button className="flex flex-col items-center justify-center gap-1 text-primary">
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-medium">Home</span>
        </button>
        
        <button className="flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-primary transition-colors">
          <Search className="w-6 h-6" />
          <span className="text-[10px] font-medium">Search</span>
        </button>
        
        <button className="relative flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-primary transition-colors">
          <div className="relative">
            <Heart className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white flex items-center justify-center text-[8px] text-white font-bold">
              3
            </span>
          </div>
          <span className="text-[10px] font-medium">Saved</span>
        </button>
      </div>
    </div>
  );
};
