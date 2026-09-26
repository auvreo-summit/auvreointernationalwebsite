import React from 'react';
import { useAuvreo } from '../context/AuvreoContext';
import { FOUR_PILLARS } from '../data/mockData';
import { Compass, Users, Sparkles, ArrowRight, Shield, Globe } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { navigateTo } = useAuvreo();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Top Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#e6c887] uppercase">
          ORGANISATIONAL ARCHITECTURE
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-display text-white">
          Connecting People, Cultures & Ideas
        </h1>
        <p className="text-sm sm:text-base text-[#b8adaa] leading-relaxed">
          Auvreo is an independent, youth-led institution dedicated to authentic dialogue, sovereign knowledge, international exchange, and tangible action.
        </p>
      </div>

      {/* Why Auvreo Exists (Section 11) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <span className="text-xs font-mono text-[#e51e2b] font-bold uppercase tracking-wider">
            THE FOUNDING MANDATE
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Why Does Auvreo Exist?
          </h2>
          <p className="text-sm text-[#c9bfbc] leading-relaxed">
            The world does not lack conferences. It lacks forums where young thinkers are treated as substantive intellectual agents rather than decorative spectators in corporate CSR initiatives.
          </p>
          <p className="text-sm text-[#c9bfbc] leading-relaxed">
            Conventional diplomacy is increasingly fragmented across ideological silos, hyper-nationalist rhetoric, and algorithmic echo chambers. Auvreo exists to rebuild trust at the human level—bringing together delegates across regional boundaries to debate substantive constitutional, multilateral, and technological realities.
          </p>
          <div className="pt-2">
            <div className="p-4 rounded-xl bg-[#140306] border border-[#e51e2b]/30 text-xs text-[#e6c887] font-mono">
              Dialogue → Knowledge → People → Action
            </div>
          </div>
        </div>

        <div className="p-8 rounded-2xl bg-[#120306] border border-[#e51e2b]/30 space-y-6">
          <h3 className="text-lg font-bold text-white">Our Commitments</h3>
          
          <div className="space-y-3 text-xs text-[#c9beba]">
            <div className="flex gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e51e2b] mt-1.5 shrink-0" />
              <div>
                <strong className="text-white block">Youth-Led Governance</strong>
                Conceived, curated, and led by students, legal researchers, journalists, and grassroots organizers.
              </div>
            </div>

            <div className="flex gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e51e2b] mt-1.5 shrink-0" />
              <div>
                <strong className="text-white block">Honest Institutional Labeling</strong>
                We do not fabricate UN affiliations, non-existent awards, or inflated statistics. We report planning targets as targets.
              </div>
            </div>

            <div className="flex gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e51e2b] mt-1.5 shrink-0" />
              <div>
                <strong className="text-white block">Action Beyond the Room</strong>
                Every committee resolution feeds directly into the Auvreo Impact Grant pipeline for post-summit execution.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Four Pillars Deep Dive */}
      <div className="space-y-8 pt-8 border-t border-[#e51e2b]/20">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold text-[#e6c887] uppercase tracking-wider">
            THE FOUR PILLARS
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Architecture of Auvreo
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FOUR_PILLARS.map((p, i) => {
            const pillarRoutes = ['dialogues', 'perspectives', 'fellows', 'summit'];
            const targetRoute = pillarRoutes[i] || 'summit';
            return (
              <div 
                key={p.name} 
                onClick={() => navigateTo(targetRoute)}
                className="p-6 rounded-2xl bg-[#140306] border border-[#e51e2b]/25 hover:border-[#e51e2b]/60 transition-all space-y-4 cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#e6c887] font-bold">PILLAR 0{i + 1} • {p.focus}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#e51e2b]/20 text-[#e51e2b]">
                      {p.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#e6c887] transition-colors">{p.name}</h3>
                  <p className="text-xs text-[#c9bfbc] leading-relaxed">{p.description}</p>
                  <div className="pt-2 text-xs text-[#e6c887] italic font-serif">
                    "{p.quote}"
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#e51e2b] font-semibold group-hover:text-[#ff3b4d]">
                  <span>Explore {p.name}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-[#170407] via-[#24060c] to-[#120305] border border-[#e51e2b]/40 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e0509] border border-[#e6c887]/40 text-[#e6c887] text-[10px] font-mono font-bold uppercase tracking-widest">
          ADMISSIONS — OPENING SOON
        </div>
        <h3 className="text-2xl font-bold font-display text-white">Join the India 2026 Cohort</h3>
        <p className="text-xs sm:text-sm text-[#c9bfbc] max-w-lg mx-auto">
          Applications for Auvreo International Youth Summit — India 2026 are not currently open. Registration details will be announced soon.
        </p>
        <div className="pt-2">
          <button
            onClick={() => navigateTo('summit')}
            className="px-6 py-3 rounded-xl bg-[#e51e2b] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#ff263b] shadow-lg shadow-[#e51e2b]/30"
          >
            Explore India 2026 →
          </button>
        </div>
      </div>
    </div>
  );
};
