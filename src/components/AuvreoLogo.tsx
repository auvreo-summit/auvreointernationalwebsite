import React from 'react';

interface AuvreoLogoProps {
  variant?: 'full' | 'header' | 'badge' | 'watermark';
  className?: string;
  showSubtitle?: boolean;
}

export const AuvreoLogo: React.FC<AuvreoLogoProps> = ({
  variant = 'header',
  className = '',
  showSubtitle = true,
}) => {
  if (variant === 'badge') {
    return (
      <div className={`relative inline-flex items-center justify-center ${className}`}>
        <div className="relative w-12 h-12 rounded-xl bg-gradient-to-b from-[#2a050b] via-[#140205] to-[#080102] border border-[#e51e2b]/40 shadow-lg shadow-[#e51e2b]/20 flex items-center justify-center overflow-hidden group">
          <div className="absolute inset-0 bg-radial from-[#e51e2b]/20 to-transparent opacity-60 pointer-events-none" />
          <div className="flex flex-col items-center justify-center z-10 leading-none">
            <span className="font-black text-xs tracking-tighter text-[#fcfaf7] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              AUV
            </span>
            <span className="font-extrabold italic text-[9px] text-[#e51e2b] tracking-wider -mt-0.5">
              INTL
            </span>
            <span className="text-[6px] tracking-widest text-[#e6c887] font-semibold mt-0.5">
              '26
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'header') {
    return (
      <div className={`inline-flex items-center gap-2 select-none group cursor-pointer ${className}`}>
        {/* Wordmark Lockup */}
        <div className="flex flex-col">
          <div className="flex items-baseline gap-2.5 leading-none">
            <span 
              className="font-display font-black tracking-wider text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#fce8ea] to-[#e51e2b]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              AUVREO
            </span>
            <span className="font-display font-black tracking-[0.18em] text-[10px] sm:text-xs text-[#e6c887] uppercase border-l border-[#e51e2b]/40 pl-2.5">
              INTERNATIONAL
            </span>
          </div>
          {showSubtitle && (
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[8px] sm:text-[9px] tracking-[0.22em] font-semibold text-[#a89c99] uppercase font-mono">
                YOUTH SUMMIT’26
              </span>
              <span className="w-1 h-1 rounded-full bg-[#e51e2b]" />
              <span className="text-[8px] sm:text-[9px] tracking-[0.16em] font-medium text-[#e6c887]/85 uppercase">
                NEW DELHI
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'watermark') {
    return (
      <div className={`pointer-events-none select-none opacity-5 absolute inset-0 flex items-center justify-center overflow-hidden ${className}`}>
        <span className="font-display font-black text-[22vw] tracking-tighter text-white leading-none">
          AUVREO
        </span>
      </div>
    );
  }

  // Full High-Craft Emblem Showcase (as in the provided artwork!)
  return (
    <div className={`relative max-w-2xl w-full mx-auto select-none ${className}`}>
      {/* Background radial crimson aura */}
      <div className="absolute inset-0 bg-radial from-[#c41224]/20 via-[#4a060d]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="relative rounded-2xl bg-gradient-to-b from-[#180407]/90 via-[#0f0305]/95 to-[#060102] border border-[#e51e2b]/30 p-8 sm:p-12 shadow-2xl shadow-[#e51e2b]/15 text-center overflow-hidden">
        {/* Subtle grid and lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e51e2b08_1px,transparent_1px),linear-gradient(to_bottom,#e51e2b08_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center">
          {/* Main Giant Condensed AUVREO typography with crimson to black gradient */}
          <div className="relative flex items-center justify-center w-full py-2">
            <h1 
              className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tight leading-none uppercase select-none transition-all duration-300"
              style={{
                fontFamily: "'Space Grotesk', 'Impact', sans-serif",
                background: "linear-gradient(180deg, #d31627 0%, #750a14 55%, #180204 95%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 40px rgba(229, 30, 43, 0.45)",
                filter: "drop-shadow(0px 2px 3px rgba(229, 30, 43, 0.3))"
              }}
            >
              AUVREO
            </h1>

            {/* Overlaid INTERNATIONAL Italic Banner */}
            <div 
              className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center transform -skew-x-12 z-20 pointer-events-none"
            >
              <span 
                className="text-2xl sm:text-4xl md:text-5xl font-black tracking-wider text-[#ff1e32] uppercase italic px-4 py-1 drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]"
                style={{
                  fontFamily: "'Arial Black', 'Space Grotesk', sans-serif",
                  letterSpacing: '0.12em',
                  textShadow: '0 0 20px rgba(255, 30, 50, 0.8), 0 0 40px rgba(180, 10, 20, 0.6)'
                }}
              >
                INTERNATIONAL
              </span>
            </div>
          </div>

          {/* Subtitle baseline row */}
          <div className="w-full max-w-lg mt-6 pt-4 border-t border-[#e51e2b]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#e6c887] animate-ping" />
              <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-[#e6c887] uppercase font-mono">
                YOUTH SUMMIT’26
              </span>
            </div>

            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#e8e2d8]/90 uppercase">
              WHERE IDEAS BECOME IMPACT
            </span>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-[#b09e9e] font-medium">
            <span>NEW DELHI</span>
            <span>•</span>
            <span>DECEMBER 2026</span>
            <span>•</span>
            <span className="text-[#e51e2b] font-semibold">DIPLOMACY REIMAGINED</span>
          </div>
        </div>
      </div>
    </div>
  );
};
