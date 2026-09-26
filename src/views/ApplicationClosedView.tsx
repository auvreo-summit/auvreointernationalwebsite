import React from 'react';
import { useAuvreo } from '../context/AuvreoContext';
import { sound } from '../utils/audio';
import { 
  Calendar, 
  MapPin, 
  ArrowRight, 
  ShieldAlert, 
  Info, 
  Mail, 
  Sparkles, 
  BookOpen, 
  Globe2, 
  Clock 
} from 'lucide-react';

export const ApplicationClosedView: React.FC = () => {
  const { navigateTo, cmsContent } = useAuvreo();

  const handleNav = (route: string) => {
    sound.playClick();
    navigateTo(route);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-12">
      {/* Main Status Container */}
      <div className="relative p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-[#180407] via-[#120305] to-[#080203] border-2 border-[#e6c887]/40 shadow-2xl text-center space-y-8 overflow-hidden">
        {/* Subtle architectural background texture */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#e6c887_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#e51e2b]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-5 max-w-2xl mx-auto">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#24060c] border border-[#e6c887]/50 shadow-inner">
            <Clock className="w-3.5 h-3.5 text-[#e6c887] animate-pulse" />
            <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-[#e6c887] uppercase">
              ADMISSIONS NOTICE • INDIA 2026
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight leading-tight">
            APPLICATIONS ARE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e6c887] via-[#fcfaf7] to-[#d4b285]">
              NOT CURRENTLY OPEN
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[#d8cfcb] leading-relaxed max-w-xl mx-auto">
            Applications for <strong className="text-white font-semibold">Auvreo International Youth Summit — India 2026</strong> will open soon. Registration details, committee allocations, and application dockets will be formally announced across our official channels.
          </p>
        </div>

        {/* Informational Cards */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto text-left text-xs">
          <div className="p-5 rounded-2xl bg-[#140306] border border-white/10 space-y-2">
            <span className="text-[10px] font-mono text-[#e6c887] uppercase font-bold tracking-wider block">
              Host City & Date
            </span>
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <MapPin className="w-4 h-4 text-[#e51e2b]" />
              <span>New Delhi, India</span>
            </div>
            <p className="text-[#a89c99] text-[11px]">
              December 2026 • Curated 2-Day International Youth Summit
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#140306] border border-white/10 space-y-2">
            <span className="text-[10px] font-mono text-[#e6c887] uppercase font-bold tracking-wider block">
              Indicative Starting Tiers
            </span>
            <div className="text-white font-semibold text-sm">
              ₹{cmsContent.fees.indianStarting || 2000} <span className="text-[#a89c99] text-xs font-normal">Indian</span> / US${cmsContent.fees.internationalStarting || 35} <span className="text-[#a89c99] text-xs font-normal">Intl</span>
            </div>
            <p className="text-[#a89c99] text-[11px]">
              Includes 2-day summit, meals, digital pass, materials & certificate
            </p>
          </div>
        </div>

        {/* Safe Navigation Options */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => handleNav('summit')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#e51e2b] hover:bg-[#ff2438] text-white font-bold text-xs uppercase tracking-widest transition-all shadow-xl shadow-[#e51e2b]/30 flex items-center justify-center gap-2 group"
          >
            <span>Explore India 2026</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => handleNav('programmes')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#140407] border border-[#e6c887]/30 hover:border-[#e6c887]/60 text-[#e6c887] font-semibold text-xs transition-colors text-center"
          >
            Explore Summit Programmes
          </button>
        </div>

        {/* Footer Support Info */}
        <div className="relative z-10 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#a89c99]">
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-[#e6c887]" />
            <span>Institutional & Delegation Inquiries:</span>
            <a href="mailto:auvreo@gmail.com" className="text-white underline hover:text-[#e6c887] transition-colors">
              auvreo@gmail.com
            </a>
          </div>

          <div className="font-mono text-[10px] uppercase text-[#e6c887]">
            Stay tuned for application updates
          </div>
        </div>
      </div>
    </div>
  );
};
