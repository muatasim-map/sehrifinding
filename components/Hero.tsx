
import React from 'react';
import { Search, MapPin, Filter, AlertCircle } from 'lucide-react';
import { IslamicPattern } from './Pattern';

interface HeroProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  searchTerm, 
  onSearchChange
}) => {
  return (
    <div className="relative bg-gradient-to-b from-primary to-primary-dark text-white pb-10 pt-12 px-4 overflow-hidden">
      {/* Distinct Geometric pattern for Hero - Reduced Opacity to 0.13 */}
      <IslamicPattern opacity={0.13} variant="geometric" className="text-gold-bright" />
      
      <div className="relative z-10 container mx-auto text-center">
        {/* Header Text */}
        <div className="mb-8">
           <div className="flex items-center justify-center gap-3 mb-1 opacity-90">
             <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold-bright"></span>
             <span className="text-gold-bright text-4xl md:text-5xl font-script leading-none pt-2 drop-shadow-md">Ramadan Kareem</span>
             <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold-bright"></span>
           </div>
           <h2 className="font-serif text-5xl md:text-7xl text-white leading-none drop-shadow-sm font-semibold mt-2">
             Find Your <span className="bg-gradient-to-r from-gold-bright via-gold-highlight to-gold-bright bg-clip-text text-transparent italic drop-shadow-sm">Sehri</span> <br/> 
             <span className="text-3xl md:text-5xl block mt-3 font-normal">Distribution Point</span>
           </h2>
        </div>

        {/* Disclaimer Banner */}
        <div className="max-w-xl mx-auto mb-6 bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20 flex items-start gap-3 text-left shadow-lg">
           <AlertCircle className="shrink-0 text-gold-bright mt-0.5" size={18} />
           <p className="text-xs text-white/90 leading-relaxed">
             <strong>Community Data Disclaimer:</strong> This list is compiled from community sources. Please confirm availability and timing before visiting, as details may change during Ramadan.
           </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative group">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by area, place name, or features..."
              className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/80 rounded-2xl py-5 pl-14 pr-4 focus:outline-none focus:ring-2 focus:ring-gold-bright focus:bg-white/20 transition-all text-lg shadow-xl"
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gold-bright w-6 h-6 group-focus-within:text-white transition-colors" />
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3 text-sm font-medium">
          <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-full border border-white/10 backdrop-blur-sm transition-all hover:scale-105 active:scale-95 group">
            <MapPin size={16} className="text-gold-bright group-hover:text-gold-highlight transition-colors" />
            Near Me
          </button>
          
          <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-full border border-white/10 backdrop-blur-sm transition-all hover:scale-105 active:scale-95 group">
            <Filter size={16} className="text-gold-bright group-hover:text-gold-highlight transition-colors" />
            Filters
          </button>
        </div>
      </div>
    </div>
  );
};
