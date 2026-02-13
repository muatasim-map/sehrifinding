
import React from 'react';
import { SehriSpot } from '../types';
import { IslamicPattern } from './Pattern';

// Import sub-components
import { ListingCardHeader } from './ListingCardHeader';
import { ListingCardDetails } from './ListingCardDetails';
import { ListingCardActions } from './ListingCardActions';

interface ListingCardProps {
  data: SehriSpot;
}

/**
 * The main Card container.
 * 
 * It handles the outer shell (animations, border colors, background pattern)
 * and composes the Header, Details, and Actions sub-components.
 */
export const ListingCard: React.FC<ListingCardProps> = ({ data }) => {
  const isFree = data.foodType === 'Free';

  return (
    <div className={`
      relative group overflow-hidden h-full flex flex-col
      bg-gradient-to-b from-white to-[#fffdf5] 
      rounded-3xl p-5 border border-gold/60
      shadow-[0_4px_15px_-3px_rgba(0,0,0,0.05),0_0_15px_-2px_rgba(212,175,55,0.1)] 
      hover:border-gold-bright 
      hover:shadow-[0_15px_40px_-10px_rgba(212,175,55,0.3),0_0_25px_0px_rgba(255,215,0,0.2)] 
      hover:scale-[1.01] hover:-translate-y-1 
      transition-all duration-300 
    `}>
      
      {/* Background Pattern - Four-Fold Octagon & Star Grid - Reduced Opacity */}
      <IslamicPattern opacity={0.15} variant="octagon-star-lattice" className="text-gold" />

      {/* Decorative top border */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${isFree ? 'bg-primary' : 'bg-gold'} z-10`} />

      {/* Content Wrapper */}
      <div className="flex-1 relative z-10 flex flex-col">
        
        <ListingCardHeader 
          name={data.name}
          verified={data.verified}
          foodType={data.foodType}
          lastVerified={data.lastVerified}
          isFree={isFree}
        />

        <div className="mt-2 flex-1">
          <ListingCardDetails {...data} />
        </div>

        {/* Action Footer */}
        <ListingCardActions data={data} />
      </div>
    </div>
  );
};
