
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Share2, Flag, Phone, Navigation, X } from 'lucide-react';
import { SehriSpot } from '../types';
import { APP_CONFIG } from '../config';

interface ListingCardActionsProps {
  data: SehriSpot;
}

/**
 * Displays the action buttons: Call, Directions, Share, and Report.
 * Redesigned for High ROI: 
 * - Primary row features large, accessible Call/Direction buttons.
 * - Secondary row features subtle Share/Report actions.
 * - Report action now triggers a confirmation modal.
 */
export const ListingCardActions: React.FC<ListingCardActionsProps> = ({ data }) => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  
  const handleReportClick = () => {
    setIsReportModalOpen(true);
  };

  const confirmReport = () => {
    const message = APP_CONFIG.MESSAGES.REPORT_TEMPLATE(data.name, data.area);
    window.open(`${APP_CONFIG.WHATSAPP_BASE_URL}/${APP_CONFIG.ADMIN_PHONE}?text=${encodeURIComponent(message)}`, '_blank');
    setIsReportModalOpen(false);
  };

  const handleShareClick = () => {
    const message = APP_CONFIG.MESSAGES.SHARE_TEMPLATE(data.name, data.area, data.timing);
    window.open(`${APP_CONFIG.WHATSAPP_BASE_URL}/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleDirectionsClick = () => {
    window.open(`${APP_CONFIG.MAPS_BASE_URL}${encodeURIComponent(data.address + ", " + APP_CONFIG.DEFAULT_CITY)}`, '_blank');
  };

  const hasPhone = data.phones && data.phones.length > 0;

  return (
    <div className="flex flex-col gap-4 relative z-10 pt-2 mt-auto">
      
      {/* Primary High-ROI Actions */}
      <div className="flex gap-3 h-12">
        {hasPhone ? (
          <>
            {/* Contact Button - Grey/Secondary */}
            <a 
              href={`tel:${data.phones[0]}`}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200 transition-all duration-200 font-bold text-sm"
              title="Call Venue"
            >
              <Phone size={18} className="text-gray-600" />
              <span>Contact</span>
            </a>
            
            {/* Map Button - Green/Primary */}
            <button 
              onClick={handleDirectionsClick}
              className="flex-[1.2] flex items-center justify-center gap-2 rounded-xl bg-primary text-white hover:bg-primary-dark hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 shadow-md shadow-primary/20 font-bold text-sm"
              title="Get Directions"
            >
              <Navigation size={18} />
              <span>Map</span>
            </button>
          </>
        ) : (
          <button 
             onClick={handleDirectionsClick}
             className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary text-white hover:bg-primary-dark hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 shadow-md shadow-primary/20 font-bold text-sm"
           >
             <Navigation size={18} />
             <span>Get Directions</span>
           </button>
        )}
      </div>

      {/* Secondary Actions */}
      <div className="flex items-center justify-between px-1 border-t border-gray-100 pt-3">
         <button 
           onClick={handleShareClick}
           className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-gold-antique transition-colors group"
         >
           <div className="p-1.5 rounded-full bg-gray-100 group-hover:bg-gold/10 transition-colors">
             <Share2 size={14} className="group-hover:text-gold-antique" />
           </div>
           Share Spot
         </button>

         <button 
           onClick={handleReportClick}
           className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-red-600 transition-colors group"
         >
           <div className="p-1.5 rounded-full bg-gray-100 group-hover:bg-red-50 transition-colors">
              <Flag size={14} className="group-hover:text-red-500" />
           </div>
           Report
         </button>
      </div>

      {/* Report Modal Portal - Renders outside the listing card container to avoid transform issues */}
      {isReportModalOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsReportModalOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full border border-gold/20 animate-in fade-in zoom-in-95 duration-200">
             <button 
               onClick={() => setIsReportModalOpen(false)}
               className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
             >
               <X size={20} />
             </button>
             
             <div className="flex flex-col items-center text-center">
               <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4 border border-red-100">
                 <Flag className="text-red-500 fill-red-500/20" size={24} />
               </div>
               
               <h3 className="font-brand text-xl font-bold text-emerald-midnight mb-2">Report Issue</h3>
               <p className="text-sm text-gray-500 mb-6 font-medium leading-relaxed">
                 You are about to report an issue for <span className="font-bold text-gray-800">{data.name}</span>. This will open WhatsApp to contact our admin.
               </p>
               
               <div className="flex gap-3 w-full">
                 <button 
                   onClick={() => setIsReportModalOpen(false)}
                   className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-colors"
                 >
                   Cancel
                 </button>
                 <button 
                   onClick={confirmReport}
                   className="flex-1 px-4 py-3 rounded-xl bg-red-500 text-white font-bold text-sm hover:bg-red-600 shadow-lg shadow-red-500/20 transition-all transform active:scale-95"
                 >
                   Confirm Report
                 </button>
               </div>
             </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
