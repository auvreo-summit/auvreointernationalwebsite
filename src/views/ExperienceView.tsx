import React, { useState } from 'react';
import { useAuvreo } from '../context/AuvreoContext';
import { 
  Landmark, 
  Compass, 
  Palette, 
  Cpu, 
  Users, 
  HeartHandshake, 
  Calendar, 
  Clock, 
  MapPin, 
  ArrowRight,
  Sparkles,
  Coffee,
  Check
} from 'lucide-react';

export const ExperienceView: React.FC = () => {
  const { navigateTo } = useAuvreo();
  const [selectedDay, setSelectedDay] = useState<1 | 2>(1);

  const dimensions = [
    {
      title: 'Intellectual Rigour',
      subtitle: 'Beyond Scripted Speeches',
      icon: Landmark,
      color: '#e51e2b',
      paragraphs: [
        'Conventional youth conferences reward pre-written speeches, hyper-aggressive procedural objections, and manufactured point-scoring. Auvreo councils strip away the performative layer.',
        'Our chairs are trained to intervene when debate becomes derivative. We demand empirical grounding, real-world treaty mechanics, and genuine cross-bloc compromises that reflect actual multilateral complexity.'
      ]
    },
    {
      title: 'Living Cultural Immersion',
      subtitle: 'The Host City as Living Context',
      icon: Compass,
      color: '#e6c887',
      paragraphs: [
        'Delhi is not a backdrop; it is an active participant in our deliberations. With eight centuries of layered governance—from the Delhi Sultanate and Mughals to the modern sovereign republic—the city grounds our inquiry in constitutional memory.',
        'Our cultural evening integrates live Hindustani classical instrumentalists, spoken-word oral historians, and artisanal Delhi craftsmen, demonstrating that culture is diplomacy in practice.'
      ]
    },
    {
      title: 'Digital & Physical Identity',
      subtitle: 'Auvresence Smart Ecosystem',
      icon: Cpu,
      color: '#3b82f6',
      paragraphs: [
        'Every delegate receives an official Auvreo physical card embedded with encrypted NFC micro-logic. This connects seamlessly to our paperless working paper drafting suite.',
        'Resolutions are synthesized in real-time, amendments tracked transparently, and voting tallies archived onto an immutable digital transcript accessible through your participant portal.'
      ]
    },
    {
      title: 'Architectural & Culinary Hospitality',
      subtitle: 'Dignified Spaces & Thoughtful Nourishment',
      icon: Coffee,
      color: '#10b981',
      paragraphs: [
        'Deliberation requires sustained mental energy. We have partnered with historic hospitality venues providing spacious, sunlit committee halls rather than cramped basement banquet rooms.',
        'Delegates enjoy curated regional luncheons exploring authentic Awadhi, Mughlai, and South Indian culinary traditions, paired with artisanal single-estate teas from Assam and Darjeeling.'
      ]
    },
    {
      title: 'Action Beyond the Room',
      subtitle: 'Resolutions that Transform into Grants',
      icon: HeartHandshake,
      color: '#f59e0b',
      paragraphs: [
        'The most tragic aspect of standard MUNs is the graveyard of unread resolutions filed away when the conference concludes. Auvreo closes this loop.',
        'The best actionable policy proposals emerging from our councils are entered into the Auvreo Impact Grant pipeline, receiving seed funding and mentorship for community deployment.'
      ]
    },
    {
      title: 'Cross-Regional Human Connection',
      subtitle: 'Alliances that Outlast the Final Gavel',
      icon: Users,
      color: '#a855f7',
      paragraphs: [
        'By capping attendance at ~120 delegates and 25 International Press Corps members, we ensure every participant engages with everyone else in the room.',
        'You do not leave with an empty plastic trophy; you leave with trusted intellectual collaborators across states, countries, and disciplines who remain your allies for years to come.'
      ]
    }
  ];

  const day1Schedule = [
    { time: '08:30 – 09:30 IST', title: 'Accreditation, NFC Card Issuance & Welcome High Tea', room: 'Grand Foyer' },
    { time: '09:30 – 10:45 IST', title: 'Opening Plenary & Secretariat Keynote Address', room: 'Main Plenary Chamber' },
    { time: '11:00 – 13:30 IST', title: 'Committee Session I: Substantive Agenda Introduction', room: 'Chambers A, B & Press Gallery' },
    { time: '13:30 – 14:30 IST', title: 'Curated Regional Luncheon: Awadh & North India', room: 'Dining Pavilion' },
    { time: '14:30 – 17:00 IST', title: 'Committee Session II: Unmoderated Treaty Negotiation', room: 'Chambers A, B & Press Gallery' },
    { time: '17:30 – 19:30 IST', title: 'Cultural Evening: Living Delhi Heritage & Classical Fusion', room: 'Heritage Amphitheatre' },
  ];

  const day2Schedule = [
    { time: '09:00 – 11:30 IST', title: 'Committee Session III: Crisis Escalation & Working Papers', room: 'Chambers A, B & Press Gallery' },
    { time: '11:30 – 12:00 IST', title: 'Mid-Morning Tea & Cross-Bloc Caucus', room: 'Plenary Terraces' },
    { time: '12:00 – 13:45 IST', title: 'Committee Session IV: Formal Amendment Deliberation', room: 'Chambers A, B & Press Gallery' },
    { time: '13:45 – 14:45 IST', title: 'Curated Regional Luncheon: South Indian Coastal Flavors', room: 'Dining Pavilion' },
    { time: '14:45 – 16:30 IST', title: 'Joint Plenary: Final Resolution Voting & Press Briefing', room: 'Main Plenary Chamber' },
    { time: '16:45 – 18:00 IST', title: 'Closing Ceremony, Impact Grant Announcements & Accreditations', room: 'Main Plenary Chamber' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#e6c887] uppercase">
          CURATORIAL ETHOS
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-display text-white">
          The Auvreo Experience
        </h1>
        <p className="text-sm sm:text-base text-[#b8adaa] leading-relaxed">
          Six carefully calibrated dimensions designed to elevate young thinkers from performative speechmakers into substantive geopolitical and civic innovators.
        </p>
      </div>

      {/* The Six Dimensions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {dimensions.map((dim, idx) => {
          const IconComponent = dim.icon;
          return (
            <div
              key={dim.title}
              className="p-8 rounded-2xl bg-[#120306] border border-[#e51e2b]/30 hover:border-[#e51e2b]/60 transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-[#200408] border border-[#e51e2b]/40">
                    <IconComponent className="w-6 h-6" style={{ color: dim.color }} />
                  </div>
                  <span className="text-xs font-mono font-bold text-[#e6c887]">
                    DIMENSION 0{idx + 1}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white font-display">{dim.title}</h3>
                  <span className="text-xs font-mono text-[#e51e2b] block mt-0.5">{dim.subtitle}</span>
                </div>

                <div className="space-y-3 text-xs text-[#c9bfbc] leading-relaxed">
                  {dim.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two-Day Summit Schedule Breakdown */}
      <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-b from-[#180407] to-[#0a0204] border border-[#e51e2b]/35 shadow-2xl space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono text-[#e6c887] uppercase font-bold tracking-wider">
                NEW DELHI • DECEMBER 2026
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#e51e2b]/20 border border-[#e51e2b]/40 text-[#ff8089] text-[10px] font-mono font-bold uppercase tracking-wider">
                Tentative Schedule
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Summit Itinerary (Tentative)
            </h2>
            <p className="text-xs text-[#a89c99] mt-1">
              Note: This itinerary is tentative and indicative. Final session allocations and agenda flows will be formally accredited closer to convening.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedDay(1)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedDay === 1
                  ? 'bg-[#e51e2b] text-white shadow-md shadow-[#e51e2b]/30'
                  : 'bg-[#090102] border border-white/10 text-[#a89c99] hover:text-white'
              }`}
            >
              Day 1: Foundations & Culture
            </button>
            <button
              onClick={() => setSelectedDay(2)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedDay === 2
                  ? 'bg-[#e51e2b] text-white shadow-md shadow-[#e51e2b]/30'
                  : 'bg-[#090102] border border-white/10 text-[#a89c99] hover:text-white'
              }`}
            >
              Day 2: Crisis & Resolutions
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {(selectedDay === 1 ? day1Schedule : day2Schedule).map((item, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-[#0e0204] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[#e6c887] font-semibold shrink-0 min-w-[140px]">
                  {item.time}
                </span>
                <span className="text-white font-medium">{item.title}</span>
              </div>
              <span className="text-[11px] font-mono text-[#a89c99] px-2.5 py-1 rounded bg-[#180306] border border-white/5 shrink-0">
                {item.room}
              </span>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-[#8e8280] italic">
          *Note: This schedule is tentative and subject to final Secretariat adjustments. Room assignments, guest speaker confirmations, and working paper releases will be dispatched via your Auvresence dashboard prior to the summit.
        </p>
      </div>

      {/* CTA Box */}
      <div className="p-8 rounded-2xl bg-[#140306] border border-[#e6c887]/30 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e0509] border border-[#e6c887]/40 text-[#e6c887] text-[10px] font-mono font-bold uppercase tracking-widest">
          APPLICATIONS — OPENING SOON
        </div>
        <h3 className="text-2xl font-bold text-white font-display">Experience Auvreo Firsthand</h3>
        <p className="text-xs text-[#c9bfbc] max-w-lg mx-auto">
          Applications for Auvreo International Youth Summit — India 2026 are not currently open. Registration details will be announced soon.
        </p>
        <div className="pt-2">
          <button
            onClick={() => navigateTo('summit')}
            className="px-6 py-3 rounded-xl bg-[#e51e2b] hover:bg-[#ff2438] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#e51e2b]/30"
          >
            Explore India 2026 Summit Overview →
          </button>
        </div>
      </div>
    </div>
  );
};
