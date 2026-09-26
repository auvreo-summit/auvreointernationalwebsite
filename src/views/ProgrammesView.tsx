import React, { useState } from 'react';
import { useAuvreo } from '../context/AuvreoContext';
import { PROGRAMMES } from '../data/mockData';
import { ProgrammeType } from '../types';
import { Check, Download, Users, BookOpen, Sparkles, ArrowRight, Shield, KeyRound } from 'lucide-react';

export const ProgrammesView: React.FC = () => {
  const { openAuthModal, navigateTo } = useAuvreo();
  const [selectedProgId, setSelectedProgId] = useState<ProgrammeType>('aippm');

  const selectedProg = PROGRAMMES.find(p => p.id === selectedProgId) || PROGRAMMES[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#e6c887] uppercase">
          CURATED CHAMBERS OF DEBATE
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-display text-white">
          Three Chambers of Deliberation
        </h1>
        <p className="text-sm sm:text-base text-[#c9bfbc] leading-relaxed">
          Auvreo councils are intentionally capped to foster genuine intellectual synthesis rather than empty grandstanding.
        </p>
      </div>

      {/* Council Selector Pills */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {PROGRAMMES.map(p => (
          <button
            key={p.id}
            onClick={() => setSelectedProgId(p.id)}
            className={`px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
              selectedProgId === p.id
                ? 'bg-[#e51e2b] text-white shadow-lg shadow-[#e51e2b]/35 border border-[#ff3b4e]'
                : 'bg-[#140306] text-[#c9beba] hover:text-white border border-[#e51e2b]/25'
            }`}
          >
            <span>{p.shortName}</span>
            <span className="text-[10px] opacity-75 font-mono">({p.targetSeats} Seats)</span>
          </button>
        ))}
      </div>

      {/* Selected Council Detailed Dossier */}
      <div className="p-8 sm:p-10 rounded-2xl bg-[#120306] border border-[#e51e2b]/30 shadow-2xl space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-[#e51e2b]/20 text-[#e51e2b] border border-[#e51e2b]/30 text-[10px] font-mono font-bold uppercase">
                {selectedProg.badge}
              </span>
              <span className="text-xs font-mono text-[#e6c887]">
                Cap: {selectedProg.targetSeats} Delegates
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
              {selectedProg.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#e6c887] font-medium mt-1">
              {selectedProg.tagline}
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1c0508] border border-[#e6c887]/40 text-[#e6c887] text-xs font-mono font-bold tracking-wider uppercase shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-[#e51e2b]" />
            <span>Excited for the 2026 Cohort</span>
          </div>
        </div>

        {/* Council Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-mono text-[#a89c99] uppercase tracking-wider block mb-1">
                AGENDA & SUBSTANTIVE FOCUS
              </span>
              <p className="text-xs sm:text-sm text-[#ded3cf] leading-relaxed">
                {selectedProg.agendaOverview}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#170407] border border-white/5 space-y-2">
              <span className="text-[10px] font-mono text-[#e6c887] uppercase tracking-wider block">
                CHAMBER FORMAT & RULES
              </span>
              <p className="text-xs text-[#b8adaa] leading-relaxed">
                {selectedProg.format}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-mono text-[#a89c99] uppercase tracking-wider block mb-1">
                IDEAL CANDIDATE PROFILE
              </span>
              <p className="text-xs sm:text-sm text-[#ded3cf] leading-relaxed">
                {selectedProg.participantProfile}
              </p>
            </div>

            {/* Preparation Materials */}
            <div className="p-4 rounded-xl bg-[#170407] border border-white/5 space-y-3">
              <span className="text-[10px] font-mono text-[#10b981] uppercase tracking-wider block font-bold">
                MANDATORY PRE-SUMMIT DOSSIER
              </span>
              <p className="text-xs text-[#a89c99]">
                All accredited delegates in {selectedProg.shortName} receive the 45-page background guide and rules of procedure 30 days prior to the summit.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={() => alert(`Downloading preview syllabus for ${selectedProg.name}`)}
                  className="px-3 py-1.5 rounded-lg bg-[#22060b] border border-[#e51e2b]/40 text-[#e6c887] text-xs font-semibold hover:bg-[#330810] flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Curriculum Outline</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sample Matrix / Portfolios */}
        <div className="pt-6 border-t border-white/10">
          <span className="text-xs font-mono text-[#a89c99] uppercase tracking-wider block mb-3">
            SAMPLE PORTFOLIOS IN THIS COUNCIL
          </span>
          <div className="flex flex-wrap gap-2 text-xs">
            {selectedProg.id === 'aippm' && (
              <>
                <span className="px-3 py-1.5 rounded-lg bg-[#1a0508] border border-white/5 text-white">Ministry of Home Affairs</span>
                <span className="px-3 py-1.5 rounded-lg bg-[#1a0508] border border-white/5 text-white">Leader of Opposition (Lok Sabha)</span>
                <span className="px-3 py-1.5 rounded-lg bg-[#1a0508] border border-white/5 text-white">Ministry of Finance & Corporate Affairs</span>
                <span className="px-3 py-1.5 rounded-lg bg-[#1a0508] border border-white/5 text-white">Representatives from Regional Parties (South, East, North-East)</span>
                <span className="px-3 py-1.5 rounded-lg bg-[#1a0508] border border-white/5 text-white">Independent Constitutional Observers</span>
              </>
            )}
            {selectedProg.id === 'uncsw' && (
              <>
                <span className="px-3 py-1.5 rounded-lg bg-[#1a0508] border border-white/5 text-white">Delegation of Norway</span>
                <span className="px-3 py-1.5 rounded-lg bg-[#1a0508] border border-white/5 text-white">Delegation of India</span>
                <span className="px-3 py-1.5 rounded-lg bg-[#1a0508] border border-white/5 text-white">Delegation of Brazil</span>
                <span className="px-3 py-1.5 rounded-lg bg-[#1a0508] border border-white/5 text-white">Delegation of Rwanda</span>
                <span className="px-3 py-1.5 rounded-lg bg-[#1a0508] border border-white/5 text-white">Civil Society Advisory Group on Digital Justice</span>
              </>
            )}
            {selectedProg.id === 'international-press' && (
              <>
                <span className="px-3 py-1.5 rounded-lg bg-[#1a0508] border border-white/5 text-white">Chief Political Correspondent (Reuters / PTI style)</span>
                <span className="px-3 py-1.5 rounded-lg bg-[#1a0508] border border-white/5 text-white">Investigative Editorial Columnist</span>
                <span className="px-3 py-1.5 rounded-lg bg-[#1a0508] border border-white/5 text-white">Photojournalist & Visual Archivist</span>
                <span className="px-3 py-1.5 rounded-lg bg-[#1a0508] border border-white/5 text-white">Live Crisis Broadcaster</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
