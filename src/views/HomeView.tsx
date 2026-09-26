import React, { useState } from 'react';
import { useAuvreo } from '../context/AuvreoContext';
import { AuvreoLogo } from '../components/AuvreoLogo';
import { Globe3D } from '../components/Globe3D';
import { FOUR_PILLARS, PROGRAMMES, CONTRIBUTOR_TRACKS } from '../data/mockData';
import { 
  ArrowRight, 
  Sparkles, 
  MapPin, 
  Calendar, 
  Users, 
  Globe2, 
  Compass, 
  Shield, 
  ArrowUpRight,
  Landmark,
  Layers,
  Palette,
  Cpu,
  HeartHandshake,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { navigateTo, cmsContent } = useAuvreo();
  const [activeExperience, setActiveExperience] = useState<number>(0);

  const experiencePillars = [
    {
      title: 'Diplomacy',
      icon: Landmark,
      color: '#e51e2b',
      tagline: 'Beyond procedural points; into authentic consensus.',
      description: 'Move away from scripted speeches and hyper-aggressive objections. Auvreo councils focus on cross-bloc negotiations and durable policy synthesis that reflect real geopolitical realities.'
    },
    {
      title: 'Culture',
      icon: Compass,
      color: '#e6c887',
      tagline: 'The host city is an active participant in the room.',
      description: 'Delhi’s 800-year living heritage serves as our context. We integrate culinary diplomacy, living soundscapes, and site-specific deliberations into the schedule.'
    },
    {
      title: 'Art',
      icon: Palette,
      color: '#f43f5e',
      tagline: 'Creative expression as diplomatic medium.',
      description: 'Visual exhibits, documentary photojournalism, and cultural storytelling spotlighting the human narratives underlying multilateral policy disputes.'
    },
    {
      title: 'Technology',
      icon: Cpu,
      color: '#3b82f6',
      tagline: 'Digital sovereignty and the Auvresence ecosystem.',
      description: 'Physical NFC credentials, real-time paperless resolution synthesis, and critical debates on AI governance and digital equity in global trade.'
    },
    {
      title: 'People',
      icon: Users,
      color: '#10b981',
      tagline: 'Relationships that outlast the final gavel.',
      description: 'A curated cohort of 120 thinkers and 25 journalists from across India and the globe, building lifelong intellectual alliances.'
    },
    {
      title: 'Action',
      icon: HeartHandshake,
      color: '#f59e0b',
      tagline: 'The summit ends. The work doesn’t.',
      description: 'Through the Auvreo Impact Grant, vetted summit resolutions transition into funded youth-led community interventions and policy advocacy.'
    }
  ];

  return (
    <div className="relative w-full overflow-hidden">
      {/* ============================================================ */}
      {/* CINEMATIC HERO SECTION WITH INTERACTIVE 3D GLOBE */}
      {/* ============================================================ */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-8 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden auvreo-hero-glow">
        {/* Subtle geometric line background & deep atmospheric lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(#e51e2b0a_1px,transparent_1px)] [background-size:36px_36px] pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-radial from-[#e51e2b]/15 via-[#2b040a]/5 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Hero Narrative & Brand Typography */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Metadata Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1c0508] border border-[#e51e2b]/40 text-[#e6c887] text-[11px] font-mono tracking-wider uppercase shadow-inner">
              <span className="w-2 h-2 rounded-full bg-[#e51e2b] animate-ping" />
              <span>AUVREO INTERNATIONAL YOUTH SUMMIT '26</span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-display text-white tracking-tight leading-[1.08]">
                Something begins <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e51e2b] via-[#ff3b4e] to-[#e6c887]">
                  in Delhi.
                </span>
              </h1>
              <p className="text-xl sm:text-2xl font-light text-[#ded3cf] font-display">
                Connecting People, Cultures & Ideas.
              </p>
            </div>

            {/* Core Narrative */}
            <p className="text-sm sm:text-base text-[#b8adaa] font-normal leading-relaxed max-w-xl">
              A youth-led international institution convening 120 curated delegates and 25 International Press Corps members to challenge conventional diplomatic debate through culture, art, technology, and unscripted dialogue.
            </p>

            {/* Clean Authentic Metadata */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-2 max-w-xl">
              <div className="p-3 rounded-xl bg-[#120306] border border-[#e51e2b]/20">
                <div className="flex items-center gap-1.5 text-[#e51e2b] text-xs mb-1 font-mono">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>LOCATION</span>
                </div>
                <div className="text-white font-bold text-xs sm:text-sm">New Delhi, India</div>
                <span className="text-[10px] text-[#a89c99]">Dec 19–20, 2026</span>
              </div>

              <div className="p-3 rounded-xl bg-[#120306] border border-[#e6c887]/20">
                <div className="flex items-center gap-1.5 text-[#e6c887] text-xs mb-1 font-mono">
                  <Users className="w-3.5 h-3.5" />
                  <span>COHORT SIZE</span>
                </div>
                <div className="text-white font-bold text-xs sm:text-sm">120 Delegates</div>
                <span className="text-[10px] text-[#a89c99]">25 Press Corps</span>
              </div>

              <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-[#120306] border border-white/10">
                <div className="flex items-center gap-1.5 text-[#10b981] text-xs mb-1 font-mono">
                  <Shield className="w-3.5 h-3.5" />
                  <span>FOUNDING STATUS</span>
                </div>
                <div className="text-white font-bold text-xs sm:text-sm">Independent</div>
                <span className="text-[10px] text-[#a89c99]">Youth-Architected</span>
              </div>
            </div>

            {/* Purposeful CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => navigateTo('summit')}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#e51e2b] via-[#d01021] to-[#940a16] text-white font-bold text-xs uppercase tracking-wider shadow-xl shadow-[#e51e2b]/40 hover:shadow-[#e51e2b]/70 border border-[#ff3b4b]/60 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <span>Discover the Summit</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateTo('auvresence')}
                className="px-5 py-3.5 rounded-xl bg-[#170407] hover:bg-[#26060c] border border-[#e6c887]/40 text-[#fcfaf7] font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <span>Explore Auvresence</span>
                <Sparkles className="w-3.5 h-3.5 text-[#e6c887]" />
              </button>

              <button
                onClick={() => navigateTo('auvresence')}
                className="px-4 py-3.5 rounded-xl bg-[#0e0204] hover:bg-white/5 border border-white/15 text-[#c9bfbc] hover:text-white font-mono text-[11px] uppercase tracking-wider transition-all flex items-center gap-1.5"
              >
                <Compass className="w-3.5 h-3.5 text-[#e6c887]" />
                <span>Enter as Guest</span>
              </button>
            </div>
          </div>

          {/* Right Column: 3D Interactive Convergence Globe */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="w-full aspect-square max-w-[480px] relative rounded-3xl p-2 bg-radial from-[#1e0408]/60 to-transparent border border-[#e51e2b]/20 shadow-2xl">
              <Globe3D className="w-full h-full" />
            </div>

            <div className="mt-3 text-center">
              <span className="text-[10px] font-mono text-[#a89c99] tracking-wider uppercase">
                Interactive Diplomatic Node • 17 Global Regions Converging
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 01: SOMETHING BEGINS IN DELHI */}
      {/* ============================================================ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-[#e51e2b]/20 bg-[#060102]">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-xl space-y-4">
              <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#e6c887] uppercase">
                THE FOUNDATIONAL MANDATE
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-white">
                Something begins in Delhi.
              </h2>
              <p className="text-sm text-[#b8adaa] leading-relaxed">
                For years, youth summits have settled into comfortable mimicry—pre-written talking points, manufactured antagonisms, and resolutions filed away the moment the final gavel falls.
              </p>
              <p className="text-sm text-[#b8adaa] leading-relaxed">
                Auvreo was founded to dismantle that convention. Rooted in New Delhi, our mandate is simple: gather thinkers who are prepared to abandon performative rhetoric and engage in the messy, high-trust work of building consensus.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#120306] border border-[#e51e2b]/30 space-y-4 max-w-sm w-full">
              <span className="text-[10px] font-mono text-[#e6c887] uppercase tracking-wider block">
                CORE PHILOSOPHY
              </span>
              <h3 className="text-lg font-bold text-white">
                Connecting People, Cultures & Ideas
              </h3>
              <p className="text-xs text-[#a89c99] leading-relaxed">
                We are an independent youth institution. We do not manufacture fake government partnerships or inflated credentials. We measure success by the durability of the ideas born here.
              </p>
              <div className="pt-2 border-t border-white/10 flex items-center gap-2 text-xs text-[#e6c887]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Honest, youth-led, international.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 02: AUVREO IS BIGGER THAN ONE SUMMIT */}
      {/* ============================================================ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-[#e51e2b]/20 bg-[#0a0204]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#e6c887] uppercase">
              INSTITUTIONAL ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white">
              Auvreo is bigger than one summit.
            </h2>
            <p className="text-xs sm:text-sm text-[#b8adaa]">
              The summit in December 2026 is our flagship convening, but Auvreo is an enduring institutional ecosystem built upon four distinct pillars:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FOUR_PILLARS.map((pillar, idx) => (
              <div 
                key={pillar.name}
                className="p-6 rounded-2xl bg-[#120306] border border-[#e51e2b]/25 hover:border-[#e51e2b]/50 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#e6c887]">
                      0{idx + 1}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold ${
                      pillar.status === 'Active' 
                        ? 'bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/40' 
                        : 'bg-[#e51e2b]/15 text-[#e51e2b] border border-[#e51e2b]/30'
                    }`}>
                      {pillar.status}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-[#a89c99] uppercase tracking-wider block">
                      Focus: {pillar.focus}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#e6c887] transition-colors mt-0.5">
                      {pillar.name}
                    </h3>
                  </div>

                  <p className="text-xs text-[#c9beba] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-[#e6c887] italic">
                  "{pillar.quote}"
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => navigateTo('pillars')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#e6c887] hover:text-white transition-colors"
            >
              <span>Explore our Institutional Architecture</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 03: THE AUVREO EXPERIENCE */}
      {/* ============================================================ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-[#e51e2b]/20 bg-[#060102]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#e6c887] uppercase">
              DELHI EXPERIENCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white">
              The Auvreo Experience
            </h2>
            <p className="text-xs sm:text-sm text-[#b8adaa]">
              Diplomacy • Culture • Art • Technology • People • Action. Click each dimension to see how we weave them into the New Delhi summit.
            </p>
          </div>

          {/* Interactive Experience Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
            {experiencePillars.map((exp, i) => {
              const IconComp = exp.icon;
              const isActive = activeExperience === i;
              return (
                <button
                  key={exp.title}
                  onClick={() => setActiveExperience(i)}
                  className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center gap-2 ${
                    isActive
                      ? 'bg-[#25060b] border-[#e51e2b] shadow-lg shadow-[#e51e2b]/25 scale-102'
                      : 'bg-[#120306] border-white/5 hover:border-white/20 text-[#a89c99]'
                  }`}
                >
                  <IconComp className="w-5 h-5" style={{ color: isActive ? exp.color : undefined }} />
                  <span className={`text-xs font-bold ${isActive ? 'text-white' : 'text-[#c9beba]'}`}>
                    {exp.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Detail Showcase */}
          <div className="p-8 rounded-2xl bg-gradient-to-r from-[#170407] via-[#20060a] to-[#120305] border border-[#e51e2b]/35 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#e6c887]">
                  DIMENSION 0{activeExperience + 1}
                </span>
                <span className="w-1 h-1 rounded-full bg-[#e51e2b]" />
                <span className="text-xs font-semibold text-white">
                  {experiencePillars[activeExperience].title}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                {experiencePillars[activeExperience].tagline}
              </h3>
              <p className="text-xs sm:text-sm text-[#b8adaa] leading-relaxed">
                {experiencePillars[activeExperience].description}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#080203] border border-white/10 text-xs space-y-2 shrink-0 max-w-xs w-full">
              <span className="text-[10px] font-mono text-[#a89c99] uppercase block">
                DELHI 2026 IMPLEMENTATION
              </span>
              <div className="text-white font-semibold">Curated Session Protocols</div>
              <p className="text-[11px] text-[#a89c99]">
                Structured directly into Day 1 & Day 2 plenary schedules, breakout caucuses, and the cultural evening.
              </p>
              <button 
                onClick={() => navigateTo('experience')} 
                className="text-[11px] text-[#e6c887] font-bold hover:underline block pt-1"
              >
                Learn more about the Experience →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 04: INDIA 2026 OVERVIEW */}
      {/* ============================================================ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-[#e51e2b]/20 bg-[#080203]">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-b from-[#1c0509] to-[#0d0204] border border-[#e51e2b]/40 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-radial from-[#e51e2b]/15 to-transparent blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#e51e2b] animate-ping" />
                <span className="text-xs font-mono font-bold tracking-widest text-[#e6c887] uppercase">
                  CURRENT FEATURED EVENT
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-white">
                Auvreo International Youth Summit — India 2026
              </h2>

              <p className="text-sm sm:text-base text-[#d8cfcb] leading-relaxed">
                New Delhi • December 2026. A 2-day curated youth summit bringing together a tight cohort of 120 delegates and 25 International Press Corps members.
              </p>

              {/* What it is / What it is NOT (Section 12 positioning) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#090102] border border-[#10b981]/30 text-xs space-y-1.5">
                  <span className="text-[10px] font-mono text-[#10b981] font-bold uppercase block">
                    What The Summit IS
                  </span>
                  <p className="text-[#c9bfbc]">
                    An intimate, high-rigor forum focused on unmoderated dialogue, crisis diplomacy, cultural exploration, and seed-funded youth impact.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#090102] border border-[#e51e2b]/30 text-xs space-y-1.5">
                  <span className="text-[10px] font-mono text-[#e51e2b] font-bold uppercase block">
                    What It Is NOT
                  </span>
                  <p className="text-[#c9bfbc]">
                    Not a massive, commercial 1000-person MUN hall filled with recycled point-scoring and ceremonial trophies.
                  </p>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => navigateTo('summit')}
                  className="px-6 py-3 rounded-xl bg-[#e51e2b] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#ff2438] transition-colors shadow-lg shadow-[#e51e2b]/30"
                >
                  Explore India 2026 Summit
                </button>
                <button
                  onClick={() => navigateTo('programmes')}
                  className="px-6 py-3 rounded-xl bg-[#170407] border border-white/15 text-white text-xs font-semibold hover:bg-white/5 transition-colors"
                >
                  Summit Dossier & Chambers →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 05: THREE WAYS TO PARTICIPATE */}
      {/* ============================================================ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-[#e51e2b]/20 bg-[#060102]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#e6c887] uppercase">
              SUMMIT PROGRAMMES
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white">
              Three ways to participate.
            </h2>
            <p className="text-xs sm:text-sm text-[#b8adaa]">
              Three distinct councils carefully curated for distinct intellectual temperaments:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROGRAMMES.map(p => (
              <div
                key={p.id}
                className="p-6 rounded-2xl bg-[#120306] border border-[#e51e2b]/25 hover:border-[#e51e2b]/50 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#e51e2b]/20 text-[#e51e2b] border border-[#e51e2b]/40">
                      {p.shortName}
                    </span>
                    <span className="text-xs font-mono text-[#e6c887] font-semibold">
                      {p.targetSeats} Seats Target
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white">{p.name}</h3>
                    <span className="text-[10px] font-mono text-[#a89c99] block mt-0.5">{p.badge}</span>
                  </div>

                  <p className="text-xs text-[#c9beba] leading-relaxed">
                    {p.tagline}
                  </p>

                  <div className="pt-2 border-t border-white/5 space-y-1.5 text-xs text-[#a89c99]">
                    <div>
                      <strong className="text-white">Profile: </strong>
                      {p.participantProfile}
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => navigateTo('programmes')}
                    className="w-full py-2.5 rounded-xl bg-[#20050a] border border-[#e51e2b]/40 hover:bg-[#e51e2b] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>View {p.shortName} Chamber</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => navigateTo('programmes')}
              className="text-xs text-[#e6c887] font-semibold hover:underline"
            >
              View detailed agendas, rules of procedure & preparation guides →
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 06: ENTER AUVRESENCE */}
      {/* ============================================================ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-[#e51e2b]/20 bg-[#090204]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#e6c887]" />
                <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#e6c887] uppercase">
                  DIGITAL ECOSYSTEM
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black font-display text-white">
                Enter Auvresence.
              </h2>

              <p className="text-sm text-[#c9beba] leading-relaxed">
                Auvreo’s exclusive digital architecture. Not a generic event app, but an integrated participant passport guiding you through the journey:
              </p>

              {/* Journey Stepper */}
              <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono font-bold text-[#e6c887] py-2">
                <span>REGISTER</span>
                <span>→</span>
                <span>PROFILE</span>
                <span>→</span>
                <span>DASHBOARD</span>
                <span>→</span>
                <span>DIGITAL CREDENTIAL</span>
                <span>→</span>
                <span>EVENT</span>
                <span>→</span>
                <span>IMPACT</span>
              </div>

              <p className="text-xs text-[#a89c99] leading-relaxed">
                Featuring interactive 3D digital credentials, real-time schedule synchronization, paperless working paper drafting, and verified alumni identification.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => navigateTo('auvresence')}
                  className="px-6 py-3 rounded-xl bg-[#e6c887] hover:bg-[#f3dfa2] text-black font-bold text-xs uppercase tracking-wider shadow-lg transition-colors flex items-center gap-2"
                >
                  <span>Explore Auvresence Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Micro Credential Preview */}
            <div className="w-full max-w-sm">
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#1c0509] to-[#080102] border border-[#e51e2b]/40 shadow-2xl text-center space-y-4">
                <div className="flex items-center justify-between text-[9px] font-mono text-[#e6c887]">
                  <span>AUVRESENCE PREVIEW</span>
                  <span>NFC READY</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#2e060c] border border-[#e51e2b]/50 mx-auto flex items-center justify-center font-bold text-white text-lg">
                  A
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Digital Pass System</h4>
                  <p className="text-xs text-[#a89c99] mt-0.5">Instant live credential upon registration</p>
                </div>
                <button
                  onClick={() => navigateTo('dashboard')}
                  className="w-full py-2 rounded-lg bg-[#e51e2b]/20 border border-[#e51e2b]/40 text-[#fcfaf7] text-xs font-semibold hover:bg-[#e51e2b]"
                >
                  View Sample Delegate Pass →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 07: A COMMUNITY THAT CONTINUES */}
      {/* ============================================================ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-[#e51e2b]/20 bg-[#060102]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#e6c887] uppercase">
              BEYOND THE ROOM
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white">
              A community that continues.
            </h2>
            <p className="text-xs sm:text-sm text-[#b8adaa]">
              Fellows, Contributors, Volunteers, and Ambassadors. Clear distinction between active cohorts and upcoming initiatives:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#120306] border border-white/10 space-y-3">
              <span className="text-[10px] font-mono font-bold text-[#10b981] uppercase">UPCOMING COHORT</span>
              <h3 className="text-lg font-bold text-white">Auvreo Fellows</h3>
              <p className="text-xs text-[#a89c99] leading-relaxed">
                Selected summit delegates invited into an ongoing peer mentorship circle tackling systemic regional challenges.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#120306] border border-[#e51e2b]/30 space-y-3">
              <span className="text-[10px] font-mono font-bold text-[#e6c887] uppercase">ACTIVE PROGRAMME</span>
              <h3 className="text-lg font-bold text-white">Contributors</h3>
              <p className="text-xs text-[#a89c99] leading-relaxed">
                6 specialized tracks: Creator, Referral, Outreach, Connect, Storyteller, and Builder with strict ethical codes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#120306] border border-white/10 space-y-3">
              <span className="text-[10px] font-mono font-bold text-[#e51e2b] uppercase">INTERNAL STAFFING</span>
              <h3 className="text-lg font-bold text-white">Volunteers</h3>
              <p className="text-xs text-[#a89c99] leading-relaxed">
                Direct staffing under Delegate Affairs, Social Media, HR, OC, and Logistics to orchestrate the summit.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#120306] border border-white/10 space-y-3">
              <span className="text-[10px] font-mono font-bold text-[#3b82f6] uppercase">EXPANDING</span>
              <h3 className="text-lg font-bold text-white">Ambassadors</h3>
              <p className="text-xs text-[#a89c99] leading-relaxed">
                University and regional representatives anchoring Auvreo dialogues in campuses across South Asia and abroad.
              </p>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => navigateTo('community')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#e6c887] hover:text-white"
            >
              <span>Explore Contributor Tracks & Volunteer Roles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 08: THE WORK DOESN'T END AT THE SUMMIT */}
      {/* ============================================================ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-[#e51e2b]/20 bg-[#090204]">
        <div className="max-w-5xl mx-auto">
          <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-[#170407] via-[#24060c] to-[#120305] border border-[#e51e2b]/40 shadow-2xl space-y-6">
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#e6c887] uppercase">
              IMPACT & OUTCOMES
            </span>

            <h2 className="text-3xl sm:text-4xl font-black font-display text-white">
              The work doesn’t end at the summit.
            </h2>

            <p className="text-sm text-[#b8adaa] max-w-2xl leading-relaxed">
              We reject the empty conclusion of standard conferences. Following India 2026, the Auvreo Impact Grant opens a pipeline turning resolutions into funded local action.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-[10px] font-mono font-semibold py-3 border-y border-white/10">
              <div className="p-2 rounded bg-black/40 text-white">1. IDEA</div>
              <div className="p-2 rounded bg-black/40 text-[#e51e2b]">2. PROPOSAL</div>
              <div className="p-2 rounded bg-black/40 text-[#e6c887]">3. SELECTION</div>
              <div className="p-2 rounded bg-black/40 text-white">4. SUPPORT</div>
              <div className="p-2 rounded bg-black/40 text-[#10b981]">5. IMPLEMENT</div>
              <div className="p-2 rounded bg-black/40 text-[#a89c99]">6. FOLLOW-UP</div>
            </div>

            <p className="text-xs text-[#a89c99] italic">
              Grant applications and project milestones will be published transparently as our cohorts execute their work in communities across South Asia and beyond.
            </p>

            <div>
              <button
                onClick={() => navigateTo('impact')}
                className="px-6 py-2.5 rounded-xl bg-[#20050a] border border-[#e51e2b]/40 text-white text-xs font-bold uppercase tracking-wider hover:bg-[#e51e2b] transition-all"
              >
                Learn About the Impact Grant →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FINAL NARRATIVE CALL TO ACTION */}
      {/* ============================================================ */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 border-t border-[#e51e2b]/25 bg-[#050102] text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-radial from-[#e51e2b]/20 via-[#3d060d]/10 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#e6c887] uppercase">
            NEW DELHI • DECEMBER 2026
          </span>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-display text-white tracking-tight">
            Something begins in Delhi.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e51e2b] via-[#ff3b4e] to-[#e6c887]">
              Join Auvreo.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#c9beba] max-w-xl mx-auto leading-relaxed">
            Be one of 120 curated delegates or 25 International Press Corps members defining the first cohort of Auvreo International.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigateTo('summit')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#e51e2b] to-[#990a18] text-white font-bold text-xs uppercase tracking-wider shadow-2xl shadow-[#e51e2b]/50 hover:shadow-[#e51e2b]/80 border border-[#ff3b4b]/60 transition-all transform hover:-translate-y-0.5"
            >
              Discover Summit Agenda
            </button>

            <button
              onClick={() => navigateTo('auvresence')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#140306] border border-[#e6c887]/40 text-[#e6c887] font-semibold text-xs uppercase tracking-wider hover:bg-[#e6c887]/10"
            >
              Explore Auvresence Portal
            </button>

            <button
              onClick={() => navigateTo('contact')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#140306] border border-white/15 text-white font-semibold text-xs uppercase tracking-wider hover:bg-white/5"
            >
              Contact Curatorial Desk
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
