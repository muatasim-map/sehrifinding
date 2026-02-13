
import React, { useState } from 'react';
import { Menu, X, Moon, Share2, Info, Flag } from 'lucide-react';
import { IslamicPattern } from './Pattern';

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-primary shadow-lg h-16 relative overflow-hidden">
        {/* Pattern Background - Reduced opacity to 0.18 */}
        <IslamicPattern opacity={0.18} className="text-gold-bright" />
        
        <div className="container mx-auto px-4 h-full flex items-center justify-between relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Moon className="w-6 h-6 text-white fill-current" />
            <h1 className="font-brand text-2xl tracking-wide select-none">
              <span className="text-white">SEHRI</span>
              <span className="text-gold-bright font-bold drop-shadow-sm">FINDER</span>
            </h1>
          </div>

          {/* Menu Button */}
          <button 
            onClick={() => setMenuOpen(true)}
            className="p-2 text-gold-bright hover:bg-white/10 rounded-full transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Slide-out Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          
          {/* Menu Content */}
          <div className="relative w-72 bg-cream h-full shadow-2xl p-6 flex flex-col">
            <button 
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 right-4 p-2 text-primary hover:bg-gray-100 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="mt-8 mb-8">
               <h2 className="font-brand text-2xl mb-1">
                <span className="text-primary">SEHRI</span>
                <span className="text-gold">FINDER</span>
              </h2>
              <p className="text-sm text-muted-foreground italic font-serif">Connecting the community</p>
            </div>

            <nav className="flex-1 space-y-2">
              <MenuItem icon={<Info size={20} />} label="About This Service" />
              <MenuItem icon={<Flag size={20} />} label="Report an Issue" />
              <MenuItem icon={<Share2 size={20} />} label="Share App" />
            </nav>

            <div className="mt-auto pt-6 border-t border-gray-200">
               <p className="text-xs text-center text-gray-500">
                 Designed for Ramadan 2026 <br/>
                 Chennai Edition
               </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const MenuItem = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <button className="flex items-center gap-4 w-full p-3 rounded-lg text-primary hover:bg-gray-100 transition-colors text-left font-medium">
    {icon}
    <span>{label}</span>
  </button>
);
