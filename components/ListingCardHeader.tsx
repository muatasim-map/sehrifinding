
import React from 'react';
import { CheckCircle2, AlertTriangle, CalendarDays } from 'lucide-react';

interface ListingCardHeaderProps {
  name: string;
  verified: boolean;
  foodType: string;
  lastVerified: string;
  isFree: boolean;
}

/**
 * Displays the top section of the card: Name, Verified Badge, and Food Type.
 */
export const ListingCardHeader: React.FC<ListingCardHeaderProps> = ({ 
  name, verified, foodType, lastVerified, isFree 
}) => {
  return (
    <div className="flex justify-between items-start mb-3 mt-2">
      <div className="flex-1 pr-3">
        <h3 className="text-xl font-brand font-bold text-primary-dark uppercase tracking-wide leading-tight">
          {name}
        </h3>
      </div>
      
      <div className="flex flex-col items-end gap-1.5">
         {/* Verification Badge */}
         {verified ? (
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wider shadow-sm border border-green-100">
            <CheckCircle2 size={12} className="stroke-[3]" />
            Verified
          </div>
        ) : (
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-700 text-[10px] font-bold uppercase tracking-wider shadow-sm border border-orange-100">
            <AlertTriangle size={12} className="stroke-[3]" />
            Unverified
          </div>
        )}

        {/* Food Type Badge */}
        <div className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm border ${isFree ? 'bg-primary/5 text-primary border-primary/20' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
           {foodType}
        </div>

        {/* Last Verified Date */}
        <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-stone-400">
          <CalendarDays size={10} className="text-stone-300" />
          <span>Verified {lastVerified}</span>
        </div>
      </div>
    </div>
  );
};
