
import React, { useState } from 'react';
import { ArrowUpDown, ChevronDown, Check, MapPin, Building2 } from 'lucide-react';

const CITIES = ["Chennai", "Bangalore", "Hyderabad", "Mumbai"];

interface FilterBarProps {
  selectedArea: string | null;
  onSelectArea: (area: string | null) => void;
  selectedCity: string;
  onSelectCity: (city: string) => void;
  totalSpots: number;
  areas: string[]; // Receives available areas based on selected city
}

export const FilterBar: React.FC<FilterBarProps> = ({ 
  selectedArea, 
  onSelectArea,
  selectedCity,
  onSelectCity,
  totalSpots,
  areas
}) => {
  const [isAreaOpen, setIsAreaOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);

  return (
    <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 py-3">
        {/* Changed lg:flex-row to md:flex-row to allow single line on tablet devices too */}
        <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between">
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* City Selector Dropdown */}
            <div className="relative w-full sm:w-56 z-50">
              <button 
                onClick={() => { setIsCityOpen(!isCityOpen); setIsAreaOpen(false); }}
                className="w-full flex items-center justify-between bg-white border border-stone-200 text-stone-700 py-3 px-4 rounded-xl shadow-sm hover:border-gold/50 hover:shadow-md transition-all group active:scale-[0.99]"
              >
                 <div className="flex items-center gap-3 overflow-hidden">
                   <div className="p-1.5 rounded-full bg-cream group-hover:bg-gold/10 transition-colors">
                     <Building2 size={16} className="text-gold-bright" />
                   </div>
                   <div className="flex flex-col items-start truncate">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Select City</span>
                      <span className="truncate font-serif font-bold text-lg leading-none text-primary-dark">
                        {selectedCity}
                      </span>
                   </div>
                 </div>
                 <ChevronDown size={18} className={`text-gold-bright transition-transform duration-300 ${isCityOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* City Dropdown Menu */}
              {isCityOpen && (
                <>
                  <div className="fixed inset-0 z-[-1]" onClick={() => setIsCityOpen(false)}></div>
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-stone-100 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-1.5 space-y-0.5">
                      {CITIES.map((city) => (
                        <button
                          key={city}
                          onClick={() => { onSelectCity(city); setIsCityOpen(false); }}
                          className={`w-full text-left px-3 py-3 rounded-lg text-sm flex items-center justify-between transition-colors ${selectedCity === city ? 'bg-cream text-primary-dark font-bold' : 'text-gray-600 hover:bg-stone-50'}`}
                        >
                          <span className="font-medium">{city}</span>
                          {selectedCity === city && <Check size={16} className="text-gold-bright" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Area Selector Dropdown */}
            <div className="relative w-full sm:w-72 z-40">
              <button 
                onClick={() => { setIsAreaOpen(!isAreaOpen); setIsCityOpen(false); }}
                className="w-full flex items-center justify-between bg-white border border-stone-200 text-stone-700 py-3 px-4 rounded-xl shadow-sm hover:border-gold/50 hover:shadow-md transition-all group active:scale-[0.99]"
              >
                 <div className="flex items-center gap-3 overflow-hidden">
                   <div className="p-1.5 rounded-full bg-cream group-hover:bg-gold/10 transition-colors">
                     <MapPin size={16} className="text-gold-bright" />
                   </div>
                   <div className="flex flex-col items-start truncate">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Select Area</span>
                      <span className={`truncate font-serif font-bold text-lg leading-none ${selectedArea ? 'text-primary-dark' : 'text-gray-600'}`}>
                        {selectedArea || "All Areas"}
                      </span>
                   </div>
                 </div>
                 <ChevronDown size={18} className={`text-gold-bright transition-transform duration-300 ${isAreaOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Area Dropdown Menu */}
              {isAreaOpen && (
                <>
                  <div className="fixed inset-0 z-[-1]" onClick={() => setIsAreaOpen(false)}></div>
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-stone-100 shadow-2xl max-h-[60vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-1.5 space-y-0.5">
                      <button
                          onClick={() => { onSelectArea(null); setIsAreaOpen(false); }}
                          className={`w-full text-left px-3 py-3 rounded-lg text-sm flex items-center justify-between transition-colors ${!selectedArea ? 'bg-cream text-primary-dark font-bold' : 'text-gray-600 hover:bg-stone-50'}`}
                        >
                          <span className="font-medium">All Areas</span>
                          {!selectedArea && <Check size={16} className="text-gold-bright" />}
                        </button>
                      
                      {areas.map((area) => (
                        <button
                          key={area}
                          onClick={() => { onSelectArea(area); setIsAreaOpen(false); }}
                          className={`w-full text-left px-3 py-3 rounded-lg text-sm flex items-center justify-between transition-colors ${selectedArea === area ? 'bg-cream text-primary-dark font-bold' : 'text-gray-600 hover:bg-stone-50'}`}
                        >
                          <span className="font-medium">{area}</span>
                          {selectedArea === area && <Check size={16} className="text-gold-bright" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Stats & Sort - Moved to inline on MD screens */}
          <div className="flex items-center justify-between md:justify-end gap-4 text-sm text-gray-500 border-t md:border-0 border-gray-100 pt-3 md:pt-0">
             <span className="font-medium bg-stone-50 px-4 py-2 rounded-full border border-stone-100 text-stone-600 whitespace-nowrap">
               {totalSpots} spots found
             </span>
             <button className="flex items-center gap-2 hover:text-primary-dark transition-colors font-medium px-2 py-1">
               <ArrowUpDown size={16} className="text-gold-bright" />
               <span className="font-bold">Sort</span>
             </button>
          </div>

        </div>
      </div>
    </div>
  );
};
