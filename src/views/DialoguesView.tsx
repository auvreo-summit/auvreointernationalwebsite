import React, { useState } from 'react';
import { useAuvreo } from '../context/AuvreoContext';
import { 
  MessageSquare, 
  ShieldCheck, 
  Users, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  Lock, 
  FileText, 
  CheckCircle2,
  Sparkles,
  Compass
} from 'lucide-react';

export const DialoguesView: React.FC = () => {
  const { addContactMessage, navigateTo } = useAuvreo();
  const [salonRequested, setSalonRequested] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    institution: '',
    topicInterest: 'Sovereign AI & Digital Geopolitics in the Global South',
    backgroundNote: ''
  });

  const salons = [
    {
      id: 'salon-1',
      title: 'Sovereign AI & Digital Geopolitics in the Global South',
      date: 'November 18, 2026',
      city: 'New Delhi',
      venue: 'Official Secretariat Dialogue Chamber',
      seats: '16 Seats (By Invitation / Application)',
      status: 'Curating Cohort',
      theme: 'Data sovereignty, open-weight foundational models, and non-aligned computing infrastructure across South Asia and Africa.',
      chairs: 'Invited Research Fellows & Youth Policy Analysts'
    },
    {
      id: 'salon-2',
      title: 'Transboundary River Treaties & Climate Adaptability',
      date: 'December 4, 2026 (Pre-Summit Salon)',
      city: 'New Delhi',
      venue: 'Secretariat Plenary Library Chamber',
      seats: '14 Seats',
      status: 'Open for Nominations',
      theme: 'Rethinking 20th-century riparian treaties in the face of glacial retreat in the Himalayas and municipal water stress.',
      chairs: 'Environmental Law Scholars & Grassroots Water Advocates'
    },
    {
      id: 'salon-3',
      title: 'Constitutional Resilience in Polarised Republics',
      date: 'January 22, 2027',
      city: 'New Delhi & Cairo Dual Chamber',
      venue: 'Diplomatic Host Chambers',
      seats: '18 Seats',
      status: 'Upcoming Cycle',
      theme: 'Comparative analysis of legislative deliberative health, judicial independence, and democratic youth voter enfranchisement.',
      chairs: 'Comparative Constitutionalists & Independent Editors'
    }
  ];

  const handleApplySalon = (e: React.FormEvent) => {
    e.preventDefault();
    addContactMessage({
      fullName: formData.fullName,
      email: formData.email,
      category: 'Auvreo Dialogues Salon',
      subject: `Salon Request: ${formData.topicInterest} - ${formData.fullName}`,
      message: `Institution: ${formData.institution}\nSalon Interest: ${formData.topicInterest}\nBackground: ${formData.backgroundNote}`
    });
    setSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#e6c887] uppercase">
          PILLAR 01 • UNMODERATED TRUTH
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-display text-white">
          Auvreo Dialogues
        </h1>
        <p className="text-sm sm:text-base text-[#b8adaa] leading-relaxed">
          Intimate, off-the-record roundtables and closed-door diplomatic salons where youth leaders, policy researchers, and civil society actors dismantle performative rhetoric.
        </p>
        <div className="flex items-center justify-center gap-4 text-xs text-[#e6c887] pt-2">
          <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-[#e51e2b]" /> Chatham House Rule</span>
          <span>•</span>
          <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-[#e51e2b]" /> Strictly 14–18 Participants</span>
          <span>•</span>
          <span className="flex items-center gap-1.5"><Compass className="w-3.5 h-3.5 text-[#e51e2b]" /> Non-Partisan & Unscripted</span>
        </div>
      </div>

      {/* Protocol Framing */}
      <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-b from-[#180407] to-[#0c0204] border border-[#e51e2b]/30 shadow-2xl space-y-6">
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-mono text-[#e51e2b] uppercase font-bold tracking-wider">
            SALON ETHOS & OPERATING PRINCIPLE
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
            "Diplomacy does not begin with an audience. It begins with truth."
          </h2>
          <p className="text-xs sm:text-sm text-[#c9bfbc] leading-relaxed">
            Conventional conferences force delegates into soundbites and hyper-aggressive posturing to impress judges. Auvreo Dialogues removes the stage, the microphones, and the audience. What remains is honest intellectual friction.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="p-4 rounded-xl bg-[#090102] border border-white/5 space-y-2">
            <div className="text-white font-bold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#e51e2b]" />
              Non-Attribution
            </div>
            <p className="text-[#a89c99]">
              Participants are free to use the information received, but neither the identity nor the affiliation of the speaker may be disclosed.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#090102] border border-white/5 space-y-2">
            <div className="text-white font-bold flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#e6c887]" />
              Living Working Brief
            </div>
            <p className="text-[#a89c99]">
              Each salon begins with a 5-page empirical brief authored by Auvreo Fellows, focusing discussion directly on core legislative or technical dilemmas.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#090102] border border-white/5 space-y-2">
            <div className="text-white font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#10b981]" />
              Synthetic Communiqué
            </div>
            <p className="text-[#a89c99]">
              A non-binding, consensus-driven synthesis is formulated post-salon and submitted directly into the Auvreo Perspectives archive.
            </p>
          </div>
        </div>
      </div>

      {/* Salons Schedule */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#e51e2b]/20 pb-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">Curated Diplomatic Salons</h3>
            <p className="text-xs text-[#a89c99]">Limited seating. Participants are selected on substantive subject expertise.</p>
          </div>
          <span className="text-xs font-mono text-[#e6c887]">Cycle 2026–2027</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {salons.map(salon => (
            <div 
              key={salon.id}
              className="p-6 rounded-2xl bg-[#120306] border border-[#e51e2b]/25 hover:border-[#e51e2b]/50 transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-[#e51e2b]/15 text-[#e51e2b] border border-[#e51e2b]/30">
                    {salon.status}
                  </span>
                  <span className="text-[#e6c887]">{salon.seats}</span>
                </div>

                <h4 className="text-lg font-bold text-white leading-snug">{salon.title}</h4>

                <div className="space-y-1.5 text-xs text-[#a89c99]">
                  <div className="flex items-center gap-1.5 text-[#d8cfcb]">
                    <Calendar className="w-3.5 h-3.5 text-[#e51e2b]" />
                    <span>{salon.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#d8cfcb]">
                    <MapPin className="w-3.5 h-3.5 text-[#e6c887]" />
                    <span>{salon.venue}, {salon.city}</span>
                  </div>
                </div>

                <p className="text-xs text-[#c9bfbc] leading-relaxed pt-2 border-t border-white/5">
                  {salon.theme}
                </p>
              </div>

              <div>
                <button
                  onClick={() => {
                    setSalonRequested(salon.title);
                    setFormData(prev => ({ ...prev, topicInterest: salon.title }));
                    window.scrollTo({ top: 800, behavior: 'smooth' });
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#20050a] border border-[#e51e2b]/40 hover:bg-[#e51e2b] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Request Seat</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Salon Nomination / Request Form */}
      <div className="p-8 sm:p-10 rounded-2xl bg-[#120306] border border-[#e6c887]/30 space-y-6 max-w-3xl mx-auto">
        <div className="space-y-2">
          <span className="text-[10px] font-mono text-[#e6c887] font-bold uppercase tracking-wider">
            BY INVITATION & CURATED APPLICATION
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
            Request an Invitation to an Auvreo Salon
          </h3>
          <p className="text-xs text-[#a89c99]">
            Salons are reserved for dedicated young thinkers, legal researchers, civic founders, and accredited delegates.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-xl bg-[#10b981]/10 border border-[#10b981]/30 text-center space-y-3">
            <CheckCircle2 className="w-8 h-8 text-[#10b981] mx-auto" />
            <h4 className="text-base font-bold text-white">Nomination Dossier Received</h4>
            <p className="text-xs text-[#c9bfbc] max-w-md mx-auto">
              Your request for "{formData.topicInterest}" has been transmitted to the Curatorial Board. If shortlisted, a formalized invitation with Chatham House Rule briefing materials will be dispatched.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-4 py-2 rounded-lg bg-[#140306] border border-white/20 text-xs text-white hover:bg-white/5"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleApplySalon} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono text-[#a89c99] uppercase mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Adv. Rhea Mukherjee"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090102] border border-white/10 text-white text-xs focus:border-[#e51e2b] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#a89c99] uppercase mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="rhea.m@institution.org"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090102] border border-white/10 text-white text-xs focus:border-[#e51e2b] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono text-[#a89c99] uppercase mb-1">University / Organization *</label>
                <input
                  type="text"
                  required
                  value={formData.institution}
                  onChange={e => setFormData({ ...formData, institution: e.target.value })}
                  placeholder="e.g. National Law University / Policy Thinktank"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090102] border border-white/10 text-white text-xs focus:border-[#e51e2b] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#a89c99] uppercase mb-1">Selected Salon *</label>
                <select
                  value={formData.topicInterest}
                  onChange={e => setFormData({ ...formData, topicInterest: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090102] border border-white/10 text-white text-xs focus:border-[#e51e2b] outline-none"
                >
                  {salons.map(s => (
                    <option key={s.id} value={s.title}>{s.title}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-[#a89c99] uppercase mb-1">Brief Substantive Contribution *</label>
              <textarea
                required
                rows={3}
                value={formData.backgroundNote}
                onChange={e => setFormData({ ...formData, backgroundNote: e.target.value })}
                placeholder="What unique empirical research, field perspective, or regional analysis do you bring to this closed dialogue?"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#090102] border border-white/10 text-white text-xs focus:border-[#e51e2b] outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#e51e2b] to-[#990a18] text-white font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg shadow-[#e51e2b]/30"
            >
              Submit Salon Nomination Dossier
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
