
import React from 'react';

export type PatternVariant = 
  | 'geometric'        // Header/Hero (Simple Squares/Diamonds)
  | 'arabesque'        // Bottom Nav (Floral Vine)
  | 'hexagonal'        // App Background (Honeycomb Interlace)
  | 'octagon-star-lattice'; // Listing Card

interface IslamicPatternProps {
  opacity?: number;
  className?: string;
  variant?: PatternVariant;
}

/**
 * COMPONENT NOTE:
 * This component renders complex SVG patterns using path data ('d' attributes).
 * These paths are mathematically precise coordinates. 
 * 
 * ⚠️ DO NOT EDIT PATH DATA MANUALLY. 
 * If you need to change a pattern, generate the SVG code in a design tool (Figma/Illustrator)
 * and paste the new <path> element here.
 */
export const IslamicPattern = ({ 
  opacity = 0.045, 
  className = "", 
  variant = 'geometric' 
}: IslamicPatternProps) => {
  const patternId = `islamic-pattern-${variant}`;

  // Define dimensions based on variant
  let size = 60;
  if (variant === 'arabesque') size = 50;
  if (variant === 'hexagonal') size = 40;
  if (variant === 'octagon-star-lattice') size = 40;

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} style={{ opacity }}>
      <svg width="100%" height="100%">
        <defs>
          <pattern id={patternId} x="0" y="0" width={size} height={size} patternUnits="userSpaceOnUse">
            {variant === 'geometric' && (
              <g>
                {/* Header/Hero: Classic Geometric Grid - Thicker lines */}
                <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
                <rect x="25" y="25" width="10" height="10" transform="rotate(45 30 30)" fill="currentColor" opacity="0.4" />
                <circle cx="30" cy="30" r="2.5" fill="currentColor" />
                <circle cx="0" cy="30" r="2.5" fill="currentColor" opacity="0.6"/>
                <circle cx="60" cy="30" r="2.5" fill="currentColor" opacity="0.6"/>
                <circle cx="30" cy="0" r="2.5" fill="currentColor" opacity="0.6"/>
                <circle cx="30" cy="60" r="2.5" fill="currentColor" opacity="0.6"/>
              </g>
            )}

            {variant === 'octagon-star-lattice' && (
              <g>
                {/* 
                  Four-Fold Islamic Star Pattern (Octagon & Star)
                  Recreated from sketch: 4-pointed stars on grid intersections, connected by short bridges.
                */}
                
                {/* Construction Grid (Graph paper style from sketch) */}
                <path d="M20 0 L20 40 M0 20 L40 20" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
                
                {/* The Star (Sharper tips, pinched body) */}
                <path 
                  d="M 20 5 L 14 14 L 5 20 L 14 26 L 20 35 L 26 26 L 35 20 L 26 14 Z" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.2" 
                />
                
                {/* Bridges connecting stars (Creating the 'Octagon' voids) */}
                <path d="M 20 0 L 20 5 M 40 20 L 35 20 M 20 40 L 20 35 M 0 20 L 5 20" stroke="currentColor" strokeWidth="1.2" />

                {/* Central Dot */}
                <circle cx="20" cy="20" r="1.5" fill="currentColor" opacity="0.8" />
              </g>
            )}

            {variant === 'arabesque' && (
              <g>
                 <path d="M0 50 Q 12.5 37.5, 25 25 T 50 0" fill="none" stroke="currentColor" strokeWidth="1.5" />
                 <path d="M50 50 Q 37.5 37.5, 25 25 T 0 0" fill="none" stroke="currentColor" strokeWidth="1.5" />
                 <path d="M25 25 Q 30 15, 35 25 Q 30 35, 25 25" fill="currentColor" opacity="0.3" />
                 <path d="M25 25 Q 15 30, 25 35 Q 35 30, 25 25" fill="currentColor" opacity="0.3" />
                 <circle cx="25" cy="25" r="3" fill="currentColor" />
              </g>
            )}
            
            {variant === 'hexagonal' && (
              <g>
                <path d="M20 0 L40 11.5 L40 34.5 L20 46 L0 34.5 L0 11.5 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                <path d="M20 10 L30 16 L30 30 L20 36 L10 30 L10 16 Z" fill="currentColor" opacity="0.08" />
                <circle cx="20" cy="23" r="2" fill="currentColor" opacity="0.5" />
              </g>
            )}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} className="text-current"/>
      </svg>
    </div>
  );
};
