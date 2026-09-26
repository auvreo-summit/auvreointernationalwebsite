import React from 'react';
import { useAuvreo } from '../context/AuvreoContext';
import { AuvreoLogo } from './AuvreoLogo';
import { Mail, MapPin, ArrowUpRight, Shield, Globe, KeyRound } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, openAuthModal } = useAuvreo();

  return (
    <footer className="relative bg-[#050102] border-t border-[#e51e2b]/25 pt-16 pb-12 overflow-hidden text-[#d5ccc8]">
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial from-[#e51e2b]/10 via-[#40060d]/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-[#e51e2b]/20">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <AuvreoLogo variant="header" showSubtitle={true} />
            <p className="text-sm text-[#a89c99] max-w-md leading-relaxed mt-2">
              A youth-led institution connecting people, cultures, and ideas across geopolitical frontiers.
              Diplomacy, reimagined through people, culture, creativity and technology.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-[#c4b8b4]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#e51e2b]" />
                <span>New Delhi, India • Host City 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#e6c887]" />
                <a href="mailto:auvreo@gmail.com" className="hover:text-white transition-colors underline">
                  auvreo@gmail.com
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={openAuthModal}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#e51e2b] to-[#990a18] text-white hover:from-[#ff2438] hover:to-[#b30c1d] transition-colors shadow-md shadow-[#e51e2b]/30"
              >
                <KeyRound className="w-3.5 h-3.5 text-[#e6c887]" />
                <span>Portal Sign In</span>
              </button>
            </div>
          </div>

          {/* Pillars Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#e6c887] mb-4">
              Four Pillars
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => navigateTo('dialogues')} className="hover:text-[#fcfaf7] transition-colors text-left">
                  Auvreo Dialogues
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('perspectives')} className="hover:text-[#fcfaf7] transition-colors text-left">
                  Auvreo Perspectives
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('fellows')} className="hover:text-[#fcfaf7] transition-colors text-left">
                  Auvreo Fellows
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('summit')} className="hover:text-[#fcfaf7] transition-colors text-left">
                  Global Futures Summit
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-[#fcfaf7] transition-colors text-left text-xs text-[#a69895]">
                  Why Auvreo Exists →
                </button>
              </li>
            </ul>
          </div>

          {/* Summit Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#e6c887] mb-4">
              India 2026
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => navigateTo('summit')} className="hover:text-[#fcfaf7] transition-colors text-left">
                  Summit Overview
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('programmes')} className="hover:text-[#fcfaf7] transition-colors text-left">
                  AIPPM & UNCSW
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('programmes')} className="hover:text-[#fcfaf7] transition-colors text-left">
                  International Press Corps
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('delhi')} className="hover:text-[#fcfaf7] transition-colors text-left">
                  Delhi Experience & Transfers
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('fees')} className="hover:text-[#fcfaf7] transition-colors text-left">
                  Participation Fees (₹1,999+ / $35+)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('faq')} className="hover:text-[#fcfaf7] transition-colors text-left">
                  Delegate FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Ecosystem & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#e6c887] mb-4">
              Ecosystem & Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => navigateTo('auvresence')} className="hover:text-[#fcfaf7] transition-colors text-left text-[#e6c887] font-medium">
                  Auvresence Digital Pass
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('impact')} className="hover:text-[#fcfaf7] transition-colors text-left">
                  Auvreo Impact Grant
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('community')} className="hover:text-[#fcfaf7] transition-colors text-left">
                  Contributor Tracks & Volunteers
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('stories')} className="hover:text-[#fcfaf7] transition-colors text-left">
                  Perspectives & Stories
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('legal')} className="hover:text-[#fcfaf7] transition-colors text-left text-xs text-[#a69895]">
                  Delegate Code of Conduct
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('legal')} className="hover:text-[#fcfaf7] transition-colors text-left text-xs text-[#a69895]">
                  Privacy & Terms
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Baseline Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8f8280]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#e51e2b]" />
            <span>© 2026 Auvreo International. Connecting People, Cultures & Ideas.</span>
          </div>

          <div className="flex items-center gap-6">
            <span>New Delhi, India</span>
            <span>•</span>
            <button onClick={() => navigateTo('legal')} className="hover:text-white transition-colors">
              Participant Guidelines
            </button>
            <span>•</span>
            <button onClick={() => navigateTo('admin')} className="hover:text-[#e51e2b] transition-colors font-mono">
              Staff Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
