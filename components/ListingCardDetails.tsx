
import React from 'react';
import { MapPin, Navigation, Building2, Clock, UserCircle, Compass } from 'lucide-react';
import { SehriSpot } from '../types';

/**
 * Displays the main content of the card: Location, Timing, Audience tags, and Notes.
 * Adapted to handle Bangalore-specific fields (Zone, Contact Person).
 */
export const ListingCardDetails: React.FC<SehriSpot> = ({
  area, distance, venueType, timing, targetAudience, specialNotes, zone, contactPerson
}) => {
  return (
    <>
      {/* Location & Venue Type */}
      <div className="flex flex-col gap-1.5 mb-5">
         <div className="flex items-start justify-between gap-2">
           <div className="flex items-start text-gray-500 gap-2 overflow-hidden">
            <MapPin size={16} className="text-gold mt-0.5 shrink-0" />
            <div className="flex flex-col">
              <span className="text-base font-bold text-gray-800 leading-tight truncate">{area}</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs font-medium text-stone-400 flex items-center gap-1">
                  <Navigation size={10} /> {distance} away
                </span>
                <span className="w-1 h-1 rounded-full bg-stone-300"></span>
                <div className="flex items-center text-stone-400 gap-1">
                  <Building2 size={10} />
                  <span className="text-xs font-medium uppercase tracking-wide">{venueType}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Zone Badge for Bangalore */}
          {zone && (
            <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-100 shrink-0">
              <Compass size={10} className="fill-blue-700/20" />
              <span className="text-[9px] font-bold uppercase tracking-wider">{zone}</span>
            </div>
          )}
         </div>
      </div>

      {/* Timing Box - High Visibility */}
      <div className="bg-[#faf8f3] rounded-xl p-4 flex items-center gap-4 border border-gold/20 mb-5 relative overflow-hidden group hover:border-gold/40 transition-colors">
        <div className="w-10 h-10 rounded-full bg-white border border-gold/20 flex items-center justify-center shrink-0 shadow-sm text-primary group-hover:scale-110 transition-transform duration-300">
            <Clock size={18} className="stroke-[2.5]" />
        </div>
        <div className="flex flex-col relative z-10">
          <span className="text-[10px] text-stone-400 uppercase tracking-widest font-bold mb-0.5">Distribution Time</span>
          <span className="text-lg font-bold text-primary-dark leading-none">{timing}</span>
        </div>
      </div>
      
      {/* Contact Person */}
      {contactPerson && (
        <div className="mb-4 flex items-center gap-2 bg-white p-2 rounded-lg border border-stone-100 shadow-sm">
          <UserCircle size={16} className="text-gold-antique" />
          <span className="text-xs text-gray-600 font-medium">Contact: <span className="text-primary-dark font-bold">{contactPerson}</span></span>
        </div>
      )}

      {/* Target Audience Tags */}
      {targetAudience && targetAudience.length > 0 && (
        <div className="mb-4">
           <div className="flex flex-wrap gap-1.5">
             {targetAudience.map((aud, idx) => (
               <span key={idx} className="bg-stone-50 text-stone-500 text-[10px] font-bold px-2 py-1 rounded border border-stone-200">
                 {aud}
               </span>
             ))}
           </div>
        </div>
      )}

      {/* Notes - Highlighted as per request */}
      {specialNotes && (
        <div className="mb-2">
           <div className="inline-flex items-start gap-2 bg-amber-50/50 pr-3 rounded-lg border border-amber-100/50 w-full p-2">
             <span className="bg-[#FFD700] text-black font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded-[4px] text-[10px] shrink-0 mt-px shadow-sm">
               NOTE
             </span>
             <span className="text-xs text-stone-600 leading-snug">{specialNotes}</span>
           </div>
        </div>
      )}
    </>
  );
};
