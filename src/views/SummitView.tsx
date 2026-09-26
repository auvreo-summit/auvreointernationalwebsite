import React, { useState } from 'react';
import { useAuvreo } from '../context/AuvreoContext';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Check, 
  HelpCircle, 
  Mail, 
  ShieldCheck, 
  Globe2, 
  Plane, 
  Car, 
  Bed, 
  Coffee,
  ArrowRight,
  KeyRound,
  Sparkles,
  Award,
  FileCheck,
  Newspaper,
  HeartHandshake,
  QrCode,
  Download,
  Share2,
  Wifi,
  ExternalLink,
  ChevronRight,
  Info,
  Compass,
  Building2,
  FileText,
  Clock,
  Layers,
  Shield,
  RotateCw,
  Sliders,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const SummitView: React.FC<{ initialSection?: string }> = ({ initialSection }) => {
  const { openApplyModal, navigateTo, cmsContent, timelineMilestones } = useAuvreo();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<1 | 2>(1);
  const [activeAuvresenceTab, setActiveAuvresenceTab] = useState<
    'credential' | 'profile' | 'programme' | 'schedule' | 'announcements' | 'resources' | 'certificates'
  >('credential');
  const [credentialFlipped, setCredentialFlipped] = useState<boolean>(false);

  const day1Schedule = [
    { time: '08:30 – 09:30 IST', title: 'Delegate Check-In & Credential Collection', room: 'Welcome Desk & Auvresence Support' },
    { time: '09:30 – 10:30 IST', title: 'Opening Ceremony & Summit Orientation', room: 'Main Plenary Chamber' },
    { time: '10:45 – 13:00 IST', title: 'Committee Session I (AIPPM & UNCSW / Press Coverage)', room: 'Committee Chambers' },
    { time: '13:00 – 14:00 IST', title: 'Lunch Break & Networking', room: 'Dining Pavilion' },
    { time: '14:00 – 16:30 IST', title: 'Committee Session II (Debate & Negotiation)', room: 'Committee Chambers' },
    { time: '16:30 – 17:00 IST', title: 'Refreshment Break', room: 'Foyer & Lounge' },
    { time: '17:00 – 19:00 IST', title: 'Auvreo Cultural & Social Evening', room: 'Cultural Pavilion' }
  ];

  const day2Schedule = [
    { time: '09:00 – 09:30 IST', title: 'Arrival & Day II Briefing', room: 'Assembly Hall' },
    { time: '09:30 – 12:00 IST', title: 'Committee Session III (Advanced Deliberation & Negotiation)', room: 'Committee Chambers' },
    { time: '12:00 – 13:00 IST', title: 'Lunch Break & Networking', room: 'Dining Pavilion' },
    { time: '13:00 – 15:30 IST', title: 'Committee Session IV (Final Drafting & Outcomes)', room: 'Committee Chambers' },
    { time: '15:30 – 16:00 IST', title: 'Refreshment Break', room: 'Foyer & Lounge' },
    { time: '16:00 – 17:00 IST', title: 'Final Committee Proceedings', room: 'Committee Chambers' },
    { time: '17:15 – 18:30 IST', title: 'Closing Ceremony & Recognition', room: 'Main Plenary Chamber' },
    { time: '18:30 – 19:00 IST', title: 'The Auvreo Exchange', room: 'Grand Foyer' }
  ];

  const faqs = [
    {
      q: 'How do I apply?',
      a: 'Applications for Auvreo International Youth Summit — India 2026 are not currently open. Application details will be announced soon.'
    },
    {
      q: 'Are applications open?',
      a: 'Not currently. Please watch Auvreo\'s official channels for application updates.'
    },
    {
      q: 'How does Auvreo differ from conventional Model United Nations conferences?',
      a: 'Auvreo is not a trophy-hunting commercial conference. We operate with a strict cap of ~120 delegates to preserve debate quality, incorporate Delhi’s living heritage into the agenda, provide physical NFC digital credentials, and fund post-conference community projects through the Auvreo Impact Grant.'
    },
    {
      q: 'Who is eligible to attend India 2026 once applications open?',
      a: 'Students, young professionals, legal scholars, researchers, and aspiring journalists between the ages of 14 and 35. Prior conference experience is valued but not mandatory; our executive board evaluates applications primarily on intellectual depth and motivation.'
    },
    {
      q: 'What is included in the base delegate registration fee?',
      a: 'The starting fee (₹2,000 for Indian Delegates / US$35 for International Delegates) covers 2-day summit participation, confirmed committee allocation, official smart credential, relevant delegate working resources, full Auvresence digital experience, participation certificate according to policy, networking opportunities, and official cultural programming for the category.'
    },
    {
      q: 'Are travel, accommodation, and flights included in the base fee?',
      a: 'No. The standard registration fee covers core summit participation and on-site programming only. Flights, train tickets, lodging, transfers, and visa costs are not included. Optional customised Delhi arrangements (hotel accommodation, airport transfers) may be coordinated separately via our Logistics Desk at auvreo@gmail.com.'
    },
    {
      q: 'How do international delegates obtain consular visa assistance?',
      a: 'Upon confirmation and fee settlement once registration opens, the Secretariat issues an official signed Invitation Letter and Summit Accreditation Dossier for Indian Embassy / Consulate visa submission. Please note international delegates remain responsible for independently verifying all immigration and visa requirements; Auvreo cannot guarantee visa issuance.'
    },
    {
      q: 'What are Custom Delhi Arrangements?',
      a: 'For outstation and overseas delegates requiring dedicated hotel accommodation, airport transfers, or tailored cultural excursions, the Logistics team facilitates optional bespoke packages through auvreo@gmail.com.'
    }
  ];

  const visibleMilestones = (timelineMilestones && timelineMilestones.length > 0 ? timelineMilestones : [])
    .filter(m => m.visible !== false)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
      
      {/* 01. SUMMIT HERO */}
      <section className="text-center max-w-3xl mx-auto space-y-6 pt-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#180508] border border-[#e6c887]/30 shadow-inner">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e51e2b] animate-pulse" />
          <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-[#e6c887] uppercase">
            NEW DELHI • DECEMBER 2026
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display text-white tracking-tight leading-tight">
          Auvreo International <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fdfbf7] via-[#e6c887] to-[#d4b285]">
            Youth Summit — India 2026
          </span>
        </h1>

        <p className="text-base sm:text-lg text-[#c9bfbc] leading-relaxed max-w-2xl mx-auto font-serif italic">
          Diplomacy, reimagined through people, culture, creativity and technology.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs text-[#e6c887]">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#120306] border border-white/10">
            <MapPin className="w-3.5 h-3.5 text-[#e51e2b]" /> Official Secretariat Venue, New Delhi
          </span>
          <span className="hidden sm:inline text-white/20">•</span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#120306] border border-white/10">
            <Users className="w-3.5 h-3.5 text-[#e51e2b]" /> Planning Target: 120 Delegates + 25 Press
          </span>
        </div>

        {/* Admissions Status Indicator */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="px-6 py-3.5 rounded-xl bg-[#180407] border border-[#e6c887]/40 text-[#e6c887] font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#e6c887] animate-pulse" />
            <span>APPLICATIONS — OPENING SOON</span>
          </div>
          
          <a
            href="#inclusions"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#140407] border border-white/10 hover:border-[#e6c887]/60 text-[#c9bfbc] hover:text-white font-semibold text-xs transition-colors text-center"
          >
            View Registration Inclusions
          </a>
        </div>
      </section>

      {/* 02. ARCHITECTURAL & CULTURAL CONTEXT: THE CITY IS PART OF THE SUMMIT */}
      <section className="relative p-8 sm:p-12 rounded-3xl bg-[#120306] border border-[#e51e2b]/30 overflow-hidden shadow-2xl">
        {/* Subtle jaali / architectural geometric background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#e6c887_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative z-10 space-y-8">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-[#e51e2b] uppercase flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#e6c887]" />
              DELHI CULTURAL IMMERSION
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-display text-white">
              The City is Part of the Summit.
            </h2>
            <p className="text-sm text-[#c9beba] leading-relaxed">
              Diplomacy cannot occur in isolation from the geography that shaped it. In Delhi, eight centuries of living history—Sultans, Mughals, colonial institutions, and the vibrant parliamentary democracy of the world’s most populous nation—form our backdrop.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-[#180407]/90 border border-white/5 space-y-2 hover:border-[#e6c887]/30 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-[#2b070e] flex items-center justify-center text-[#e6c887] mb-3">
                <Coffee className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white">Culinary Diplomacy</h4>
              <p className="text-xs text-[#a89c99] leading-relaxed">
                Curated luncheons exploring authentic regional flavors of Chandni Chowk, Awadh, and South India.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#180407]/90 border border-white/5 space-y-2 hover:border-[#e6c887]/30 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-[#2b070e] flex items-center justify-center text-[#e51e2b] mb-3">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white">Delhi Soundscape</h4>
              <p className="text-xs text-[#a89c99] leading-relaxed">
                Cultural evening showcasing traditional Hindustani instrumental fusion and living oral narratives.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#180407]/90 border border-white/5 space-y-2 hover:border-[#e6c887]/30 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-[#2b070e] flex items-center justify-center text-[#e6c887] mb-3">
                <Building2 className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white">Living Architecture</h4>
              <p className="text-xs text-[#a89c99] leading-relaxed">
                Site-specific evening dialogues reflecting on constitutional history and public civic spaces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03. AWARDS & RECOGNITION (Section 03) */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold text-[#e6c887] uppercase tracking-[0.2em] flex items-center justify-center gap-2">
            <Award className="w-4 h-4 text-[#e51e2b]" />
            MERIT & IMPACT FRAMEWORK
          </span>
          <h2 className="text-2xl sm:text-4xl font-black font-display text-white">
            Awards & Recognition
          </h2>
          <p className="text-xs sm:text-sm text-[#b8adaa] leading-relaxed">
            Auvreo elevates rigorous inquiry and tangible public value over commercial trophy culture. Recognition is conferred based on substantive excellence, diplomatic craftsmanship, and real-world impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Committee Recognition */}
          <div className="p-7 rounded-3xl bg-gradient-to-b from-[#180407] to-[#0d0204] border border-[#e51e2b]/30 space-y-4 hover:border-[#e51e2b]/60 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#2e070e] border border-[#e51e2b]/40 flex items-center justify-center text-[#e51e2b]">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-display text-white">
                Committee Recognition
              </h3>
              <p className="text-xs text-[#c9bfbc] leading-relaxed">
                Recognition for outstanding performance within the summit’s committee programmes. Conferred to delegates demonstrating exemplary constitutional nuance, diplomatic negotiation, consensus-building, and procedural mastery across AIPPM and UNCSW.
              </p>
            </div>
            <div className="pt-3 border-t border-white/5 flex items-center gap-2 text-[11px] font-mono text-[#e6c887]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#e51e2b]" />
              <span>Substantive Executive Board Evaluation</span>
            </div>
          </div>

          {/* International Press Recognition */}
          <div className="p-7 rounded-3xl bg-gradient-to-b from-[#180407] to-[#0d0204] border border-[#e6c887]/30 space-y-4 hover:border-[#e6c887]/60 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#2a1b08] border border-[#e6c887]/40 flex items-center justify-center text-[#e6c887]">
                <Newspaper className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-display text-white">
                International Press Recognition
              </h3>
              <p className="text-xs text-[#c9bfbc] leading-relaxed">
                Recognition for exceptional journalism, photography, writing and visual storytelling according to the final award structure. Honoring investigative integrity, live reporting, and photographic dispatches during summit deliberations.
              </p>
            </div>
            <div className="pt-3 border-t border-white/5 flex items-center gap-2 text-[11px] font-mono text-[#e6c887]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#e6c887]" />
              <span>Editorial Board & Press Corps Assessment</span>
            </div>
          </div>

          {/* Official Participation Certificate */}
          <div className="p-7 rounded-3xl bg-gradient-to-b from-[#180407] to-[#0d0204] border border-[#e51e2b]/30 space-y-4 hover:border-[#e51e2b]/60 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#2e070e] border border-[#e51e2b]/40 flex items-center justify-center text-[#e51e2b]">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-display text-white">
                Official Participation Certificate
              </h3>
              <p className="text-xs text-[#c9bfbc] leading-relaxed">
                Recognition of eligible participants according to the final participation/certificate policy. Certified participants receive verifiable, digitally authenticated credentials recognizing their contributions to the multilateral cohort.
              </p>
            </div>
            <div className="pt-3 border-t border-white/5 flex items-center gap-2 text-[11px] font-mono text-[#e6c887]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#e51e2b]" />
              <span>Auvresence Encrypted Digital Transcript</span>
            </div>
          </div>

          {/* Auvreo Impact Grant */}
          <div className="p-7 rounded-3xl bg-gradient-to-b from-[#180407] to-[#0d0204] border border-[#e6c887]/30 space-y-4 hover:border-[#e6c887]/60 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#2a1b08] border border-[#e6c887]/40 flex items-center justify-center text-[#e6c887]">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-display text-white">
                Auvreo Impact Grant
              </h3>
              <p className="text-xs text-[#c9bfbc] leading-relaxed">
                An impact-oriented Auvreo initiative designed to transform debate into real-world community solutions. High-impact policy proposals and grassroots initiatives emerging from summit deliberations are considered for strategic support and post-conference mentorship.
              </p>
            </div>
            <div className="pt-3 border-t border-white/5 flex items-center gap-2 text-[11px] font-mono text-[#e6c887]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#e6c887]" />
              <span>Action Beyond the Room Pipeline</span>
            </div>
          </div>
        </div>

        {/* Mandatory Policy Disclaimer Notice */}
        <div className="p-4 rounded-2xl bg-[#140306] border border-white/10 text-center text-xs text-[#a89c99] max-w-2xl mx-auto">
          <p className="italic">
            Further eligibility, selection and recognition details will be communicated separately.
          </p>
        </div>
      </section>

      {/* 04 & 05. REGISTRATION INCLUSIONS & WHAT IS NOT INCLUDED */}
      <section id="inclusions" className="space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold text-[#e6c887] uppercase tracking-wider">
            TRANSPARENT PARTICIPATION TIERS
          </span>
          <h2 className="text-2xl sm:text-4xl font-black font-display text-white">
            What Your Registration Includes
          </h2>
          <p className="text-xs text-[#a89c99]">
            Subsidized non-profit youth pricing ensuring economic accessibility without compromising substantive summit quality.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Indian Delegates */}
          <div className="relative p-8 sm:p-10 rounded-3xl bg-[#120306] border border-[#e51e2b]/40 space-y-6 flex flex-col justify-between shadow-2xl">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#e6c887]">
                  Indian Delegates
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#e51e2b]/20 border border-[#e51e2b]/40 text-[#ff8089] text-[10px] font-mono font-bold uppercase">
                  National Cohort
                </span>
              </div>

              <div>
                <div className="text-xs text-[#a89c99] uppercase font-mono tracking-wider">Starting From</div>
                <div className="text-4xl sm:text-5xl font-black font-display text-white tracking-tight mt-1">
                  ₹{cmsContent.fees.indianStarting || 2000}
                </div>
                <p className="text-xs text-[#c9beba] mt-2 leading-relaxed">
                  For school, collegiate, and independent researchers holding Indian nationality.
                </p>
              </div>

              {/* Inclusions List */}
              <div className="space-y-3 pt-4 border-t border-white/10 text-xs text-[#d5ccc8]">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#e6c887] block font-bold">
                  Confirmed Inclusions:
                </span>
                <ul className="space-y-2.5">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#e51e2b] shrink-0 mt-0.5" />
                    <span>2-day full summit participation across all sessions</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#e51e2b] shrink-0 mt-0.5" />
                    <span>Confirmed committee / programme seat allocation</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#e51e2b] shrink-0 mt-0.5" />
                    <span>Official physical participant smart credential & dossier</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#e51e2b] shrink-0 mt-0.5" />
                    <span>Relevant substantive delegate research & working resources</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#e51e2b] shrink-0 mt-0.5" />
                    <span>Auvresence participant digital experience & live caucus tools</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#e51e2b] shrink-0 mt-0.5" />
                    <span>Participation certificate according to final summit policy</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#e51e2b] shrink-0 mt-0.5" />
                    <span>Structured networking opportunities & regional luncheons</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#e51e2b] shrink-0 mt-0.5" />
                    <span>Official cultural / social programming included for cohort</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-6">
              <div className="w-full py-3 rounded-xl bg-[#180508] border border-white/10 text-center text-xs font-mono text-[#e6c887] font-semibold uppercase tracking-wider">
                Applications Opening Soon
              </div>
            </div>
          </div>

          {/* International Delegates */}
          <div className="relative p-8 sm:p-10 rounded-3xl bg-[#120306] border border-[#e6c887]/40 space-y-6 flex flex-col justify-between shadow-2xl">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#e6c887]">
                  International Delegates
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#e6c887]/20 border border-[#e6c887]/40 text-[#e6c887] text-[10px] font-mono font-bold uppercase">
                  Global Delegation
                </span>
              </div>

              <div>
                <div className="text-xs text-[#a89c99] uppercase font-mono tracking-wider">Starting From</div>
                <div className="text-4xl sm:text-5xl font-black font-display text-white tracking-tight mt-1">
                  US${cmsContent.fees.internationalStarting || 35}
                </div>
                <p className="text-xs text-[#c9beba] mt-2 leading-relaxed">
                  For delegates residing outside India requiring consular letters and international coordination.
                </p>
              </div>

              {/* Inclusions List */}
              <div className="space-y-3 pt-4 border-t border-white/10 text-xs text-[#d5ccc8]">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#e6c887] block font-bold">
                  Confirmed Inclusions:
                </span>
                <ul className="space-y-2.5">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#e6c887] shrink-0 mt-0.5" />
                    <span>2-day full summit participation across all sessions</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#e6c887] shrink-0 mt-0.5" />
                    <span>Official consular visa invitation dossier for visa submission</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#e6c887] shrink-0 mt-0.5" />
                    <span>Confirmed committee allocation & international liaison support</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#e6c887] shrink-0 mt-0.5" />
                    <span>Official physical smart credential & delegate packet</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#e6c887] shrink-0 mt-0.5" />
                    <span>Auvresence digital profile & global alumni matrix access</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#e6c887] shrink-0 mt-0.5" />
                    <span>Official participation certificate according to policy</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#e6c887] shrink-0 mt-0.5" />
                    <span>All curated summit luncheons, high teas & cultural evening</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#e6c887] shrink-0 mt-0.5" />
                    <span>Dedicated international delegate desk orientation</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-6">
              <div className="w-full py-3 rounded-xl bg-[#180508] border border-[#e6c887]/30 text-center text-xs font-mono text-[#e6c887] font-semibold uppercase tracking-wider">
                Applications Opening Soon
              </div>
            </div>
          </div>
        </div>

        {/* 05. WHAT IS NOT INCLUDED / TRAVEL & STAY */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#140306] border border-[#e6c887]/30 space-y-6 max-w-4xl mx-auto shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/10 pb-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-[11px] font-mono text-[#e51e2b] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                TRANSPARENCY NOTICE
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                Travel & Stay — What Is Not Included
              </h3>
              <p className="text-xs text-[#c9beba] leading-relaxed">
                Unless specifically confirmed for a participant or custom delegation package, the standard base registration fee should <strong className="text-white">NOT automatically be understood to include</strong>:
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#090102] border border-[#e6c887]/30 text-center shrink-0 w-full md:w-auto">
              <span className="text-[10px] font-mono text-[#a89c99] block uppercase">Need Help Planning Delhi?</span>
              <a 
                href="mailto:auvreo@gmail.com" 
                className="text-sm font-bold text-[#e6c887] hover:underline block mt-0.5 font-mono"
              >
                auvreo@gmail.com
              </a>
              <span className="text-[10px] text-[#a89c99] block mt-1">Custom arrangements available separately</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-[#0a0203] border border-white/5 space-y-1">
              <span className="text-[#e51e2b] font-bold font-mono text-[11px] block">✕ Not Included</span>
              <span className="text-[#c9bfbc]">Flights & Train Tickets</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0a0203] border border-white/5 space-y-1">
              <span className="text-[#e51e2b] font-bold font-mono text-[11px] block">✕ Not Included</span>
              <span className="text-[#c9bfbc]">Hotel Accommodation</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0a0203] border border-white/5 space-y-1">
              <span className="text-[#e51e2b] font-bold font-mono text-[11px] block">✕ Not Included</span>
              <span className="text-[#c9bfbc]">Airport / Rail Transfers</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0a0203] border border-white/5 space-y-1">
              <span className="text-[#e51e2b] font-bold font-mono text-[11px] block">✕ Not Included</span>
              <span className="text-[#c9bfbc]">Visa & Personal Expenses</span>
            </div>
          </div>

          <p className="text-[11px] text-[#8e8280] italic leading-relaxed">
            *Note: Customised hotel lodging, airport transit, and local transport arrangements may be coordinated separately via our dedicated Logistics Desk. Reach out to <strong className="text-[#e6c887]">auvreo@gmail.com</strong> for tailored delegation assistance.
          </p>
        </div>
      </section>

      {/* 06 & 07. KEY DATES: THE ROAD TO DELHI (Admin-Manageable Timeline) */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold text-[#e6c887] uppercase tracking-[0.2em] flex items-center justify-center gap-2">
            <Calendar className="w-4 h-4 text-[#e51e2b]" />
            SUMMIT PROGRESSION
          </span>
          <h2 className="text-2xl sm:text-4xl font-black font-display text-white">
            The Road to Delhi
          </h2>
          <p className="text-xs sm:text-sm text-[#b8adaa] leading-relaxed">
            From initial registration review to on-site plenary deliberations in New Delhi.
          </p>
        </div>

        {/* Interactive Responsive Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical connecting line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#e51e2b] via-[#e6c887] to-[#e51e2b]/20 -translate-x-1/2 hidden sm:block" />

          <div className="space-y-6 sm:space-y-8">
            {visibleMilestones.map((milestone, idx) => {
              const isEven = idx % 2 === 0;
              const statusColor = 
                milestone.status === 'Open' ? 'bg-[#10b981]/20 text-[#10b981] border-[#10b981]/40' :
                milestone.status === 'Closing Soon' ? 'bg-[#f59e0b]/20 text-[#f59e0b] border-[#f59e0b]/40' :
                milestone.status === 'Completed' ? 'bg-white/10 text-white border-white/20' :
                milestone.status === 'Closed' ? 'bg-red-500/20 text-red-400 border-red-500/40' :
                'bg-[#e6c887]/20 text-[#e6c887] border-[#e6c887]/40';

              return (
                <div 
                  key={milestone.id}
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-6 ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Card Content */}
                  <div className="w-full sm:w-1/2">
                    <div className={`p-6 rounded-2xl bg-[#120306] border border-white/10 hover:border-[#e6c887]/40 transition-all space-y-3 shadow-xl ${
                      isEven ? 'sm:text-left' : 'sm:text-left'
                    }`}>
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="text-[10px] font-mono font-bold tracking-widest text-[#e6c887] uppercase">
                          {milestone.stage}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full border text-[9px] font-mono font-bold uppercase tracking-wider ${statusColor}`}>
                          {milestone.status}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white font-display">
                        {milestone.title}
                      </h3>

                      <p className="text-xs text-[#a89c99] leading-relaxed">
                        {milestone.description}
                      </p>

                      <div className="pt-2 flex items-center justify-between border-t border-white/5 text-[11px] font-mono">
                        <span className="text-[#e6c887] font-semibold flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-[#e51e2b]" />
                          {milestone.date}
                        </span>

                        <span className="text-[#a89c99] text-[10px] uppercase tracking-wider">
                          Stage 0{idx + 1}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Center Node Badge */}
                  <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-[#1c0509] border-2 border-[#e6c887] text-[#e6c887] font-mono text-xs font-black shadow-lg shadow-[#e51e2b]/30 z-10 shrink-0">
                    {idx + 1}
                  </div>

                  {/* Empty Spacer for alternating layout */}
                  <div className="hidden sm:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 08. INTERNATIONAL DELEGATE SUPPORT */}
      <section className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#180407] via-[#100305] to-[#080203] border border-[#e6c887]/40 shadow-2xl space-y-8 overflow-hidden">
        {/* Rajasthani & Delhi cultural ornamental pattern */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#e6c887]/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-3xl">
          <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#e6c887] uppercase flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-[#e51e2b]" />
            GLOBAL DELEGATIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-white">
            Coming from outside India?
          </h2>
          <p className="text-sm sm:text-base text-[#d5ccc8] leading-relaxed">
            We'll help you understand the journey to Delhi.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
          {/* Before You Arrive */}
          <div className="p-5 rounded-2xl bg-[#120306]/90 border border-white/10 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#2e070e] flex items-center justify-center text-[#e6c887]">
              <Compass className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white">Before You Arrive</h4>
            <p className="text-[#a89c99] leading-relaxed">
              Relevant summit orientation dossiers, background reading material, and preliminary chamber allocations dispatched prior to arrival.
            </p>
          </div>

          {/* Accommodation */}
          <div className="p-5 rounded-2xl bg-[#120306]/90 border border-white/10 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#2e070e] flex items-center justify-center text-[#e6c887]">
              <Bed className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white">Accommodation</h4>
            <p className="text-[#a89c99] leading-relaxed">
              Customised partner hotel arrangements and shared delegation lodging may be coordinated separately through our logistics team.
            </p>
          </div>

          {/* Airport / Rail */}
          <div className="p-5 rounded-2xl bg-[#120306]/90 border border-white/10 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#2e070e] flex items-center justify-center text-[#e6c887]">
              <Plane className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white">Airport / Rail Transit</h4>
            <p className="text-[#a89c99] leading-relaxed">
              Dedicated pickup and transfer arrangements may be coordinated separately where offered for arriving international delegations.
            </p>
          </div>

          {/* Local Transport */}
          <div className="p-5 rounded-2xl bg-[#120306]/90 border border-white/10 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#2e070e] flex items-center justify-center text-[#e6c887]">
              <Car className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white">Local Transport</h4>
            <p className="text-[#a89c99] leading-relaxed">
              Practical summit transit guidance, Delhi Metro airport express orientation, and venue navigation maps provided upon accreditation.
            </p>
          </div>

          {/* Delhi Orientation */}
          <div className="p-5 rounded-2xl bg-[#120306]/90 border border-white/10 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#2e070e] flex items-center justify-center text-[#e6c887]">
              <Building2 className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white">Delhi Orientation</h4>
            <p className="text-[#a89c99] leading-relaxed">
              Essential civic, climatic, and cultural orientation to help you navigate India's historic capital with ease and confidence.
            </p>
          </div>

          {/* Consular Support */}
          <div className="p-5 rounded-2xl bg-[#120306]/90 border border-white/10 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#2e070e] flex items-center justify-center text-[#e6c887]">
              <Mail className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white">Secretariat Support</h4>
            <p className="text-[#a89c99] leading-relaxed">
              Direct inquiries and custom requests may be routed anytime to <a href="mailto:auvreo@gmail.com" className="text-[#e6c887] underline">auvreo@gmail.com</a>.
            </p>
          </div>
        </div>

        {/* Travel Documents Disclaimer Notice */}
        <div className="relative z-10 p-5 rounded-2xl bg-[#090102] border border-white/10 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-[#e6c887] font-bold uppercase font-mono text-[11px]">
            <ShieldCheck className="w-4 h-4 text-[#e51e2b]" />
            <span>Travel Documents & Immigration Policy</span>
          </div>
          <p className="text-[#a89c99] leading-relaxed">
            International participants remain responsible for independently verifying and obtaining all applicable passport, visa, immigration, transit, and entry requirements. Auvreo issues official signed summit invitation letters and accreditation dossiers upon registration confirmation; however, Auvreo cannot promise or guarantee visa issuance or consular approval.
          </p>
        </div>

        {/* Cultural Closing: Padharo */}
        <div className="relative z-10 pt-6 text-center space-y-2 border-t border-white/10">
          <div className="text-4xl sm:text-5xl font-black text-[#e6c887] font-display tracking-widest">
            पधारो.
          </div>
          <p className="text-xs sm:text-sm font-mono tracking-widest text-[#fcfaf7] uppercase">
            The world is invited.
          </p>
        </div>
      </section>

      {/* 09, 10, 11. UPGRADE AUVRESENCE PRESENTATION (Visual & Interactive Interface Preview) */}
      <section id="auvresence-preview" className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold text-[#e6c887] uppercase tracking-[0.25em]">
            CULTURE × IDENTITY × TECHNOLOGY
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-white">
            AUVRESENCE
          </h2>
          <p className="text-sm font-mono text-[#e51e2b] font-bold tracking-widest uppercase">
            THE DIGITAL LAYER OF AUVREO.
          </p>
          <p className="text-xs sm:text-sm text-[#b8adaa] leading-relaxed">
            A seamless bridge between physical diplomacy and digital intelligence. Experience a living preview of the participant portal.
          </p>
        </div>

        {/* Interactive Auvresence Dashboard Preview Container */}
        <div className="p-6 sm:p-10 rounded-3xl bg-[#0f0204] border border-[#e51e2b]/40 shadow-2xl space-y-8">
          
          {/* Interface Concept Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-white/10">
            {[
              { id: 'credential', label: 'Digital Credential', icon: Shield },
              { id: 'profile', label: 'Profile', icon: Users },
              { id: 'programme', label: 'Programme', icon: Layers },
              { id: 'schedule', label: 'Schedule', icon: Clock },
              { id: 'announcements', label: 'Announcements', icon: Sparkles },
              { id: 'resources', label: 'Resources', icon: FileText },
              { id: 'certificates', label: 'Certificates', icon: Award }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeAuvresenceTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveAuvresenceTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#e51e2b] text-white shadow-md shadow-[#e51e2b]/30'
                      : 'bg-[#180407] text-[#a89c99] hover:text-white border border-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Screen Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Interactive Digital Smart Credential Pass */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-sm select-none">
                <div className="flex items-center justify-between mb-3 px-1 text-xs text-[#b8aba7]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                    <span className="font-mono text-[10px] text-[#e6c887]">NFC-READY CREDENTIAL • SAMPLE</span>
                  </div>
                  <div className="text-[10px] font-mono text-[#a89c99]">
                    ONE-SIDED SECURE PASS
                  </div>
                </div>

                {/* One-Sided Card */}
                <div className="relative w-full rounded-3xl bg-gradient-to-b from-[#1c0509] via-[#100305] to-[#060102] border border-[#e51e2b]/50 p-6 shadow-2xl overflow-hidden">
                  {/* Subtle Jaali pattern */}
                  <div className="absolute inset-0 bg-[radial-gradient(#e6c887_1px,transparent_1px)] [background-size:12px_12px] opacity-10 pointer-events-none" />
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#e51e2b]/15 rounded-full blur-2xl pointer-events-none" />

                  <div className="relative z-10 flex items-center justify-between pb-3 border-b border-[#e51e2b]/30">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#2e060c] border border-[#e51e2b]/50 flex items-center justify-center text-white font-black text-xs">
                        A
                      </div>
                      <div className="flex flex-col">
                        <span className="font-black text-xs tracking-wider text-white font-display">
                          AUVREO INTERNATIONAL
                        </span>
                        <span className="text-[9px] font-mono text-[#e6c887] tracking-widest">
                          25–26 DECEMBER 2026 • NEW DELHI
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#200408] border border-[#e51e2b]/30 text-[9px] font-mono text-[#e51e2b]">
                      <Wifi className="w-3 h-3 rotate-90" />
                      <span>NFC-READY</span>
                    </div>
                  </div>

                  <div className="relative z-10 my-3 h-1 w-full rounded-full bg-gradient-to-r from-[#e51e2b] via-[#e6c887] to-[#e51e2b]" />

                  {/* Participant Details */}
                  <div className="relative z-10 py-3 space-y-3">
                    <div className="flex items-center gap-3.5">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-[#2e070e] to-[#120204] border border-[#e51e2b]/40 flex items-center justify-center font-bold text-xl text-[#e6c887] shadow-inner">
                        SP
                      </div>
                      <div>
                        <div className="text-[10px] font-mono uppercase text-[#e6c887] tracking-wider font-bold">
                          SAMPLE PARTICIPANT
                        </div>
                        <h3 className="text-base font-bold text-white font-display">
                          Sample Participant
                        </h3>
                        <span className="text-[11px] text-[#a89c99]">Delegate of India</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-mono">
                      <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                        <span className="text-[#8e8280] block text-[9px] uppercase">Programme</span>
                        <span className="text-white font-bold">AIPPM</span>
                      </div>
                      <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                        <span className="text-[#8e8280] block text-[9px] uppercase">Dates</span>
                        <span className="text-[#e6c887] font-bold text-[10px]">25–26 DEC</span>
                      </div>
                      <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                        <span className="text-[#8e8280] block text-[9px] uppercase">Auvreo ID</span>
                        <span className="text-white font-bold">AUV-DEMO</span>
                      </div>
                      <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                        <span className="text-[#8e8280] block text-[9px] uppercase">Status</span>
                        <span className="text-[#10b981] font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Confirmed
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-[#8a7f7c]">
                    <span>SEC PROTOCOL: AUV-2026-NFC</span>
                    <span className="text-[#10b981]">VERIFIED PASS</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Selected Interface Feature Concept */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-6 rounded-2xl bg-[#140306] border border-white/10 space-y-4">
                
                {activeAuvresenceTab === 'credential' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[#e6c887]">
                      <Shield className="w-4 h-4 text-[#e51e2b]" />
                      <h4 className="text-sm font-bold uppercase font-mono">Digital & Physical Credential</h4>
                    </div>
                    <p className="text-xs text-[#c9beba] leading-relaxed">
                      Every accredited participant receives a sovereign digital pass in Auvresence, paired with an optional physical smart card equipped with encrypted NFC micro-logic for on-site plenary verification.
                    </p>
                    <div className="grid grid-cols-2 gap-2 pt-2 text-[11px]">
                      <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                        <span className="text-[#e6c887] font-bold block">Paperless Check-in</span>
                        <span className="text-[#a89c99]">Direct tap-in at Grand Foyer registration desks.</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                        <span className="text-[#e6c887] font-bold block">Instant Voting Auth</span>
                        <span className="text-[#a89c99]">Cryptographic voting verification in chamber.</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeAuvresenceTab === 'profile' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[#e6c887]">
                      <Users className="w-4 h-4 text-[#e51e2b]" />
                      <h4 className="text-sm font-bold uppercase font-mono">Delegate Profile & Matrix</h4>
                    </div>
                    <p className="text-xs text-[#c9beba] leading-relaxed">
                      Maintain your academic portfolio, committee seat details, research interests, and collaborative bio within the verified Auvreo Global Network.
                    </p>
                    <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] font-mono text-[#d5ccc8]">
                      Sample Participant • AIPPM Council • Verified Delegate Status
                    </div>
                  </div>
                )}

                {activeAuvresenceTab === 'programme' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[#e6c887]">
                      <Layers className="w-4 h-4 text-[#e51e2b]" />
                      <h4 className="text-sm font-bold uppercase font-mono">Chamber & Committee Workspace</h4>
                    </div>
                    <p className="text-xs text-[#c9beba] leading-relaxed">
                      Access real-time working paper drafts, amendment tracking, speaker queue displays, and substantive background dossiers tailored to your council.
                    </p>
                    <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] text-[#a89c99]">
                      Chambers: All India Political Parties Meeting (AIPPM) & UNCSW Plenary.
                    </div>
                  </div>
                )}

                {activeAuvresenceTab === 'schedule' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[#e6c887]">
                      <Clock className="w-4 h-4 text-[#e51e2b]" />
                      <h4 className="text-sm font-bold uppercase font-mono">Live Summit Schedule & Dispatches</h4>
                    </div>
                    <p className="text-xs text-[#c9beba] leading-relaxed">
                      Real-time updates on plenary timing, caucus announcements, room changes, and cultural immersion sessions directly on your mobile device.
                    </p>
                    <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] text-[#a89c99]">
                      Synchronized across IST timezones with instant Secretariat notifications.
                    </div>
                  </div>
                )}

                {activeAuvresenceTab === 'announcements' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[#e6c887]">
                      <Sparkles className="w-4 h-4 text-[#e51e2b]" />
                      <h4 className="text-sm font-bold uppercase font-mono">Secretariat Announcements</h4>
                    </div>
                    <p className="text-xs text-[#c9beba] leading-relaxed">
                      Official dispatches, crisis alerts, and executive communiques published live during debate sessions.
                    </p>
                    <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] text-[#e6c887] font-mono">
                      Priority: Urgent Bulletin • Live Broadcast Module Active
                    </div>
                  </div>
                )}

                {activeAuvresenceTab === 'resources' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[#e6c887]">
                      <FileText className="w-4 h-4 text-[#e51e2b]" />
                      <h4 className="text-sm font-bold uppercase font-mono">Dossier & Research Archive</h4>
                    </div>
                    <p className="text-xs text-[#c9beba] leading-relaxed">
                      Download official committee background guides, legal reference treaties, constitutional amendment briefs, and press release guidelines.
                    </p>
                    <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] text-[#a89c99]">
                      Curated by Secretariat Academic Chairs & Research Fellows.
                    </div>
                  </div>
                )}

                {activeAuvresenceTab === 'certificates' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[#e6c887]">
                      <Award className="w-4 h-4 text-[#e51e2b]" />
                      <h4 className="text-sm font-bold uppercase font-mono">Digital Accreditations & Transcripts</h4>
                    </div>
                    <p className="text-xs text-[#c9beba] leading-relaxed">
                      Secure, cryptographically verifiable certificates and award accreditations available for post-summit download and LinkedIn verification.
                    </p>
                    <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] text-[#10b981] font-mono">
                      Status: Auto-Provisioned upon Summit Completion
                    </div>
                  </div>
                )}
              </div>

              {/* Explanatory Illustrative Disclaimer */}
              <p className="text-[11px] text-[#8e8280] italic leading-relaxed">
                *Illustrative Auvresence interface. Final participant features may vary according to programme and operational implementation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TENTATIVE SUMMIT ITINERARY */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#180407] to-[#0a0204] border border-[#e51e2b]/35 shadow-2xl space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono text-[#e6c887] uppercase font-bold tracking-wider">
                NEW DELHI • 25–26 DECEMBER 2026
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#e51e2b]/20 border border-[#e51e2b]/40 text-[#ff8089] text-[10px] font-mono font-bold uppercase tracking-wider">
                TENTATIVE PROGRAMME
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Summit Itinerary
            </h2>
            <p className="text-xs text-[#a89c99] mt-1 max-w-xl">
              The programme below presents the planned flow of Auvreo International Youth Summit — India 2026. Session timings and individual programme elements remain subject to final operational and Secretariat confirmation.
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
              Day 01 • 25 Dec 2026
            </button>
            <button
              onClick={() => setSelectedDay(2)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedDay === 2
                  ? 'bg-[#e51e2b] text-white shadow-md shadow-[#e51e2b]/30'
                  : 'bg-[#090102] border border-white/10 text-[#a89c99] hover:text-white'
              }`}
            >
              Day 02 • 26 Dec 2026
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

        <p className="text-[11px] text-[#8e8280] leading-relaxed">
          <strong className="text-[#a89c99]">Programme Note:</strong> This itinerary is tentative and may be adjusted according to final venue operations, programme requirements and Secretariat planning. Confirmed participants will receive final schedules and operational updates through official Auvreo communication channels and Auvresence where applicable.
        </p>
      </section>

      {/* 12, 13, 14. MAJOR FINAL CONVERSION SECTION & APPLICATION CTA */}
      <section className="relative p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-[#24060c] via-[#140306] to-[#080203] border-2 border-[#e6c887]/50 shadow-2xl space-y-8 overflow-hidden text-center">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#e51e2b]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#e6c887] uppercase block">
            AUVREO INTERNATIONAL YOUTH SUMMIT • INDIA 2026
          </span>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display text-white tracking-tight leading-tight">
            YOUR PLACE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e6c887] via-[#fdfbf7] to-[#d4b285]">
              IN THE CONVERSATION.
            </span>
          </h2>

          <div className="text-xs font-mono text-[#e6c887] tracking-widest uppercase pt-1">
            NEW DELHI • DECEMBER 2026
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 py-2 text-xs">
            <span className="px-3.5 py-1.5 rounded-full bg-black/50 border border-white/10 text-white">
              Indian Delegates — starting from <strong className="text-[#e6c887]">₹{cmsContent.fees.indianStarting || 2000}</strong>
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-black/50 border border-white/10 text-white">
              International Delegates — starting from <strong className="text-[#e6c887]">US${cmsContent.fees.internationalStarting || 35}</strong>
            </span>
          </div>
        </div>

        {/* Admissions Status Notice */}
        <div className="relative z-10 max-w-xl mx-auto space-y-4 pt-4">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#120306] border border-[#e6c887]/40 space-y-3 text-center shadow-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#24060c] border border-[#e6c887]/50 text-[#e6c887] font-mono text-[10px] font-bold uppercase tracking-widest">
              <Clock className="w-3 h-3 text-[#e6c887] animate-pulse" />
              <span>REGISTRATION — NOT CURRENTLY OPEN</span>
            </div>
            
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              Applications Opening Soon
            </h3>
            
            <p className="text-xs sm:text-sm text-[#c9beba] leading-relaxed max-w-md mx-auto">
              Applications for <strong className="text-white font-semibold">Auvreo International Youth Summit — India 2026</strong> are not currently open. Registration details and official committee allocations will be announced soon.
            </p>
            
            <div className="pt-2">
              <span className="text-[11px] font-mono text-[#e6c887] uppercase tracking-wider font-semibold block">
                Stay tuned for application updates
              </span>
            </div>
          </div>
        </div>

        <p className="relative z-10 text-[11px] text-[#8e8280] max-w-lg mx-auto pt-2">
          Confirmed dates, committee agenda guides, and delegate accreditations will be dispatched via official Auvreo channels upon admissions opening.
        </p>
      </section>

      {/* FAQ SECTION */}
      <section className="space-y-6 max-w-3xl mx-auto">
        <div className="text-center space-y-2">
          <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Summit Inquiries & FAQ
          </h3>
          <p className="text-xs text-[#a89c99]">
            Everything you need to know about preparation, protocol, and attendance.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div
              key={i}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="p-5 rounded-2xl bg-[#120306] border border-[#e51e2b]/20 cursor-pointer hover:border-[#e51e2b]/40 transition-colors"
            >
              <div className="flex items-center justify-between text-sm font-semibold text-white">
                <span>{f.q}</span>
                <span className="text-[#e6c887] text-lg font-mono">{openFaq === i ? '−' : '+'}</span>
              </div>
              {openFaq === i && (
                <p className="text-xs text-[#c9bfbc] mt-2.5 leading-relaxed pt-3 border-t border-white/5">
                  {f.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
