import React, { useState } from 'react';
import { useAuvreo } from '../context/AuvreoContext';
import { AuvreoLogo } from './AuvreoLogo';
import { sound } from '../utils/audio';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  Shield, 
  LogIn,
  LogOut,
  User,
  Compass, 
  ArrowRight,
  Landmark, 
  FileText
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    currentRoute, 
    navigateTo, 
    currentUser,
    openAuthModal,
    logoutUser,
    cmsContent 
  } = useAuvreo();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleNav = (route: string) => {
    sound.playClick();
    navigateTo(route);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#080203]/95 backdrop-blur-xl border-b border-[#e51e2b]/20">
      {/* Top CMS Banner Alert - Single source of announcement banner */}
      {cmsContent.bannerAlert.enabled && (
        <div className="bg-gradient-to-r from-[#2a060b] via-[#4a0810] to-[#2a060b] border-b border-[#e51e2b]/30 py-1.5 px-4 text-center text-xs text-[#fcfaf7] flex items-center justify-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#e51e2b] animate-pulse" />
          <span className="font-medium tracking-wide">{cmsContent.bannerAlert.text}</span>
          {cmsContent.bannerAlert.linkText && (
            <button 
              onClick={() => handleNav('auvresence')} 
              className="text-[#e6c887] font-bold hover:underline flex items-center gap-0.5 ml-1"
            >
              {cmsContent.bannerAlert.linkText}
              <ArrowRight className="w-3 h-3 inline" />
            </button>
          )}
        </div>
      )}

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo in Header */}
        <div onClick={() => handleNav('home')} className="flex items-center cursor-pointer">
          <AuvreoLogo variant="header" showSubtitle={true} />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2 text-sm font-medium text-[#d8cfcb]">
          <button
            onClick={() => handleNav('home')}
            className={`px-3 py-2 rounded-lg transition-colors ${
              currentRoute === 'home' 
                ? 'text-[#fcfaf7] bg-[#e51e2b]/15 font-semibold' 
                : 'hover:text-[#fcfaf7] hover:bg-white/5'
            }`}
          >
            Home
          </button>

          {/* About Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown('about')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => handleNav('about')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1 ${
                currentRoute === 'about' || currentRoute === 'dialogues' || currentRoute === 'perspectives' || currentRoute === 'fellows'
                  ? 'text-[#fcfaf7] bg-[#e51e2b]/15 font-semibold' 
                  : 'hover:text-[#fcfaf7] hover:bg-white/5'
              }`}
            >
              About
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            {activeDropdown === 'about' && (
              <div className="absolute top-full left-0 w-64 pt-2 z-50">
                <div className="bg-[#120407] border border-[#e51e2b]/30 rounded-xl p-2 shadow-2xl shadow-black/80 backdrop-blur-xl">
                  <button
                    onClick={() => handleNav('about')}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-[#e51e2b]/15 text-[#fcfaf7] flex items-center gap-2.5 transition-colors"
                  >
                    <Compass className="w-4 h-4 text-[#e51e2b]" />
                    <div>
                      <div className="font-semibold">Why Auvreo</div>
                      <div className="text-[11px] text-[#a19694]">Philosophy & Youth mandate</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNav('dialogues')}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-[#e51e2b]/15 text-[#fcfaf7] flex items-center gap-2.5 transition-colors"
                  >
                    <Landmark className="w-4 h-4 text-[#e51e2b]" />
                    <div>
                      <div className="font-semibold">Auvreo Dialogues</div>
                      <div className="text-[11px] text-[#a19694]">Intimate diplomatic salons</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNav('perspectives')}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-[#e51e2b]/15 text-[#fcfaf7] flex items-center gap-2.5 transition-colors"
                  >
                    <FileText className="w-4 h-4 text-[#e6c887]" />
                    <div>
                      <div className="font-semibold">Auvreo Perspectives</div>
                      <div className="text-[11px] text-[#a19694]">Essays & policy briefs</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNav('fellows')}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-[#e51e2b]/15 text-[#fcfaf7] flex items-center gap-2.5 transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-[#e6c887]" />
                    <div>
                      <div className="font-semibold">Auvreo Fellows</div>
                      <div className="text-[11px] text-[#a19694]">Selective youth changemakers</div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Summit Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown('summit')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => handleNav('summit')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1 ${
                currentRoute === 'summit' || currentRoute === 'experience' || currentRoute === 'delhi' || currentRoute === 'fees' || currentRoute === 'faq'
                  ? 'text-[#fcfaf7] bg-[#e51e2b]/15 font-semibold' 
                  : 'hover:text-[#fcfaf7] hover:bg-white/5'
              }`}
            >
              Summit
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            {activeDropdown === 'summit' && (
              <div className="absolute top-full left-0 w-64 pt-2 z-50">
                <div className="bg-[#120407] border border-[#e51e2b]/30 rounded-xl p-2 shadow-2xl shadow-black/80 backdrop-blur-xl">
                  <button
                    onClick={() => handleNav('summit')}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-[#e51e2b]/15 text-[#fcfaf7] transition-colors"
                  >
                    <div className="font-semibold text-[#fcfaf7]">India 2026 Overview</div>
                    <div className="text-[11px] text-[#a19694]">Curated cohort in New Delhi</div>
                  </button>
                  <button
                    onClick={() => handleNav('experience')}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-[#e51e2b]/15 text-[#fcfaf7] transition-colors"
                  >
                    <div className="font-semibold text-[#fcfaf7]">The Auvreo Experience</div>
                    <div className="text-[11px] text-[#a19694]">Diplomacy • Culture • Art • Tech</div>
                  </button>
                  <button
                    onClick={() => handleNav('delhi')}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-[#e51e2b]/15 text-[#fcfaf7] transition-colors"
                  >
                    <div className="font-semibold text-[#fcfaf7]">Delhi Experience & Hospitality</div>
                    <div className="text-[11px] text-[#a19694]">Custom transfers & arrangements</div>
                  </button>
                  <button
                    onClick={() => handleNav('fees')}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-[#e51e2b]/15 text-[#fcfaf7] transition-colors"
                  >
                    <div className="font-semibold text-[#fcfaf7]">Participation & Fees</div>
                    <div className="text-[11px] text-[#a19694]">Indian & International Delegate tiers</div>
                  </button>
                  <button
                    onClick={() => handleNav('faq')}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-[#e51e2b]/15 text-[#fcfaf7] transition-colors"
                  >
                    <div className="font-semibold text-[#fcfaf7]">Summit FAQ</div>
                    <div className="text-[11px] text-[#a19694]">Preparation, visas, accommodations</div>
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => handleNav('programmes')}
            className={`px-3 py-2 rounded-lg transition-colors ${
              currentRoute === 'programmes' 
                ? 'text-[#fcfaf7] bg-[#e51e2b]/15 font-semibold' 
                : 'hover:text-[#fcfaf7] hover:bg-white/5'
            }`}
          >
            Programmes
          </button>

          <button
            onClick={() => handleNav('auvresence')}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              currentRoute === 'auvresence' 
                ? 'text-[#e6c887] bg-[#e6c887]/15 font-semibold' 
                : 'hover:text-[#e6c887] hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#e6c887]" />
            Auvresence
          </button>

          <button
            onClick={() => handleNav('impact')}
            className={`px-3 py-2 rounded-lg transition-colors ${
              currentRoute === 'impact' 
                ? 'text-[#fcfaf7] bg-[#e51e2b]/15 font-semibold' 
                : 'hover:text-[#fcfaf7] hover:bg-white/5'
            }`}
          >
            Impact
          </button>

          <button
            onClick={() => handleNav('community')}
            className={`px-3 py-2 rounded-lg transition-colors ${
              currentRoute === 'community' 
                ? 'text-[#fcfaf7] bg-[#e51e2b]/15 font-semibold' 
                : 'hover:text-[#fcfaf7] hover:bg-white/5'
            }`}
          >
            Community
          </button>

          <button
            onClick={() => handleNav('stories')}
            className={`px-3 py-2 rounded-lg transition-colors ${
              currentRoute === 'stories' 
                ? 'text-[#fcfaf7] bg-[#e51e2b]/15 font-semibold' 
                : 'hover:text-[#fcfaf7] hover:bg-white/5'
            }`}
          >
            Stories
          </button>

          <button
            onClick={() => handleNav('contact')}
            className={`px-3 py-2 rounded-lg transition-colors ${
              currentRoute === 'contact' 
                ? 'text-[#fcfaf7] bg-[#e51e2b]/15 font-semibold' 
                : 'hover:text-[#fcfaf7] hover:bg-white/5'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* If Authenticated */}
          {currentUser ? (
            <div className="flex items-center gap-2">
              {currentUser.role === 'super_admin' && (
                <button
                  onClick={() => handleNav('admin')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium border flex items-center gap-1.5 transition-all ${
                    currentRoute === 'admin'
                      ? 'bg-[#e51e2b] text-white border-[#e51e2b] shadow-lg shadow-[#e51e2b]/30'
                      : 'bg-[#180407] text-[#e6c887] border-[#e6c887]/40 hover:border-[#e6c887]'
                  }`}
                  title="Super Admin Platform"
                >
                  <Shield className="w-3.5 h-3.5 text-[#e6c887]" />
                  <span>Admin Portal</span>
                </button>
              )}

              <button
                onClick={() => handleNav('auvresence')}
                className="px-3 py-1.5 rounded-xl text-xs font-medium bg-[#140407] border border-white/10 text-white hover:border-white/25 flex items-center gap-2 transition-colors"
              >
                <User className="w-3.5 h-3.5 text-[#e6c887]" />
                <span className="max-w-[120px] truncate">{currentUser.name || currentUser.email}</span>
              </button>

              <button
                onClick={logoutUser}
                title="Sign out"
                className="p-2 rounded-xl text-xs text-[#a89c99] hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={openAuthModal}
                className="px-3 py-1.5 rounded-xl text-xs font-medium text-[#d8cfcb] hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-1.5 transition-colors"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            </div>
          )}

          {/* Primary CTA: Explore Auvresence */}
          <button
            onClick={() => handleNav('auvresence')}
            className="group px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#e51e2b] to-[#990a18] text-white shadow-lg shadow-[#e51e2b]/30 hover:shadow-[#e51e2b]/60 border border-[#ff3b4b]/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#e6c887]" />
            <span>Explore Auvresence</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => handleNav('auvresence')}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#e51e2b] text-white flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3 text-[#e6c887]" />
            <span>Auvresence</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#180407] text-[#fcfaf7] border border-[#e51e2b]/30"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0204] border-b border-[#e51e2b]/30 px-5 py-6 space-y-4 max-h-[85vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <button
              onClick={() => handleNav('home')}
              className={`p-3 rounded-lg text-left font-medium ${
                currentRoute === 'home' ? 'bg-[#e51e2b]/20 text-white' : 'bg-[#140306] text-[#c9bfbc]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNav('about')}
              className={`p-3 rounded-lg text-left font-medium ${
                currentRoute === 'about' ? 'bg-[#e51e2b]/20 text-white' : 'bg-[#140306] text-[#c9bfbc]'
              }`}
            >
              About Auvreo
            </button>
            <button
              onClick={() => handleNav('summit')}
              className={`p-3 rounded-lg text-left font-medium ${
                currentRoute === 'summit' ? 'bg-[#e51e2b]/20 text-white' : 'bg-[#140306] text-[#c9bfbc]'
              }`}
            >
              India 2026 Summit
            </button>
            <button
              onClick={() => handleNav('experience')}
              className={`p-3 rounded-lg text-left font-medium ${
                currentRoute === 'experience' ? 'bg-[#e51e2b]/20 text-white' : 'bg-[#140306] text-[#c9bfbc]'
              }`}
            >
              Experience
            </button>
            <button
              onClick={() => handleNav('programmes')}
              className={`p-3 rounded-lg text-left font-medium ${
                currentRoute === 'programmes' ? 'bg-[#e51e2b]/20 text-white' : 'bg-[#140306] text-[#c9bfbc]'
              }`}
            >
              Programmes
            </button>
            <button
              onClick={() => handleNav('auvresence')}
              className={`p-3 rounded-lg text-left font-medium text-[#e6c887] ${
                currentRoute === 'auvresence' ? 'bg-[#e6c887]/20 font-bold' : 'bg-[#140306]'
              }`}
            >
              Auvresence Portal
            </button>
            <button
              onClick={() => handleNav('impact')}
              className={`p-3 rounded-lg text-left font-medium ${
                currentRoute === 'impact' ? 'bg-[#e51e2b]/20 text-white' : 'bg-[#140306] text-[#c9bfbc]'
              }`}
            >
              Impact
            </button>
            <button
              onClick={() => handleNav('community')}
              className={`p-3 rounded-lg text-left font-medium ${
                currentRoute === 'community' ? 'bg-[#e51e2b]/20 text-white' : 'bg-[#140306] text-[#c9bfbc]'
              }`}
            >
              Community
            </button>
            <button
              onClick={() => handleNav('stories')}
              className={`p-3 rounded-lg text-left font-medium ${
                currentRoute === 'stories' ? 'bg-[#e51e2b]/20 text-white' : 'bg-[#140306] text-[#c9bfbc]'
              }`}
            >
              Stories
            </button>
            <button
              onClick={() => handleNav('contact')}
              className={`p-3 rounded-lg text-left font-medium ${
                currentRoute === 'contact' ? 'bg-[#e51e2b]/20 text-white' : 'bg-[#140306] text-[#c9bfbc]'
              }`}
            >
              Contact
            </button>
          </div>

          <div className="pt-3 border-t border-[#e51e2b]/20 flex flex-col gap-2.5">
            {currentUser ? (
              <>
                <div className="p-3 rounded-xl bg-[#140306] border border-white/10 text-xs text-[#d8cfcb] flex items-center justify-between">
                  <span className="truncate">{currentUser.name || currentUser.email}</span>
                  <span className="text-[10px] font-mono uppercase bg-[#e51e2b]/20 text-[#e51e2b] px-2 py-0.5 rounded">
                    {currentUser.role}
                  </span>
                </div>
                {currentUser.role === 'super_admin' && (
                  <button
                    onClick={() => handleNav('admin')}
                    className="w-full py-2.5 rounded-xl bg-[#e51e2b] text-white font-bold text-xs text-center flex items-center justify-center gap-2"
                  >
                    <Shield className="w-4 h-4" />
                    Open Admin Portal
                  </button>
                )}
                <button
                  onClick={logoutUser}
                  className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#a89c99] text-xs flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  sound.playClick();
                  setMobileMenuOpen(false);
                  openAuthModal();
                }}
                className="w-full py-3 rounded-xl bg-[#1c060a] hover:bg-[#25080e] border border-[#e51e2b]/40 text-white font-semibold text-xs text-center flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <LogIn className="w-4 h-4 text-[#e51e2b]" />
                <span>Console Sign In / Register</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
