import React, { useState } from 'react';
import { useAuvreo } from '../context/AuvreoContext';
import { FellowApplication } from '../types';
import { 
  Award, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  BookOpen, 
  Globe2, 
  Compass 
} from 'lucide-react';

export const FellowsView: React.FC = () => {
  const { addFellowApplication } = useAuvreo();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    country: 'India',
    institution: '',
    leadershipTrack: 'Policy & Dialogue' as FellowApplication['leadershipTrack'],
    statementOfIntent: '',
    portfolioOrExperience: ''
  });

  const tracks = [
    {
      id: 'policy',
      title: 'Policy & Dialogue Track',
      icon: Compass,
      focus: 'Legislative drafting, parliamentary procedure, and constitutional research.',
      description: 'Fellows work on empirical model legislation, legislative briefs for independent lawmakers, and multilateral consensus frameworks.'
    },
    {
      id: 'research',
      title: 'Research & Perspectives Track',
      icon: BookOpen,
      focus: 'Comparative regional governance, digital sovereignty, and geopolitics.',
      description: 'Fellows author rigorous dispatches and policy papers under the editorial review of Auvreo Perspectives.'
    },
    {
      id: 'impact',
      title: 'Grassroots Community Action Track',
      icon: Sparkles,
      focus: 'Translating summit resolutions into local municipal and educational interventions.',
      description: 'Fellows lead vetted grassroots pilots funded by Auvreo seed grants in underserved educational or civic environments.'
    },
    {
      id: 'digital',
      title: 'Digital Architecture Track',
      icon: ShieldCheck,
      focus: 'Civic technology, verifiable credentials, and decentralized consensus tools.',
      description: 'Fellows research and develop open-source tools empowering youth deliberative democracy and credential transparency.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addFellowApplication({
      fullName: formData.fullName,
      email: formData.email,
      country: formData.country,
      institution: formData.institution,
      leadershipTrack: formData.leadershipTrack,
      statementOfIntent: formData.statementOfIntent,
      portfolioOrExperience: formData.portfolioOrExperience
    });
    setSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#e6c887] uppercase">
          PILLAR 03 • THE FELLOWSHIP
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-display text-white">
          Auvreo Fellows
        </h1>
        <p className="text-sm sm:text-base text-[#b8adaa] leading-relaxed">
          An ongoing, highly selective fellowship convening exceptional delegates, legal researchers, and civic innovators into an enduring intellectual brotherhood.
        </p>

        <div className="flex items-center justify-center gap-4 text-xs text-[#e6c887] pt-2">
          <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-[#e51e2b]" /> Cohort Size: 15–20 Fellows</span>
          <span>•</span>
          <span className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-[#e51e2b]" /> Annual Term with Seed Grants</span>
          <span>•</span>
          <span className="flex items-center gap-1.5"><Globe2 className="w-3.5 h-3.5 text-[#e51e2b]" /> International Cohort</span>
        </div>
      </div>

      {/* What Fellows Receive */}
      <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-b from-[#180407] to-[#0d0204] border border-[#e51e2b]/35 shadow-2xl space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-mono text-[#e6c887] uppercase font-bold tracking-wider">
            FELLOWSHIP ENDOWMENT & SUPPORT
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
            What Does an Auvreo Fellow Receive?
          </h2>
          <p className="text-xs sm:text-sm text-[#c9bfbc] leading-relaxed">
            The fellowship is non-monolithic. It adapts to the fellow’s substantive career path—whether in constitutional litigation, diplomatic research, or grassroots community organizing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-5 rounded-xl bg-[#090102] border border-white/5 space-y-2">
            <span className="text-xl font-bold text-[#e6c887] font-mono">01</span>
            <h4 className="text-sm font-bold text-white">Seed Micro-Grants</h4>
            <p className="text-xs text-[#a89c99]">
              Direct seed funding for approved grassroots education, environmental, and civic projects.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#090102] border border-white/5 space-y-2">
            <span className="text-xl font-bold text-[#e51e2b] font-mono">02</span>
            <h4 className="text-sm font-bold text-white">Senior Mentorship</h4>
            <p className="text-xs text-[#a89c99]">
              Monthly advisory sessions with senior counsel, diplomats, journalists, and policy directors.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#090102] border border-white/5 space-y-2">
            <span className="text-xl font-bold text-[#10b981] font-mono">03</span>
            <h4 className="text-sm font-bold text-white">Editorial Priority</h4>
            <p className="text-xs text-[#a89c99]">
              Priority publication of research memos and essays on Auvreo Perspectives.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#090102] border border-white/5 space-y-2">
            <span className="text-xl font-bold text-[#3b82f6] font-mono">04</span>
            <h4 className="text-sm font-bold text-white">Lifetime Pass</h4>
            <p className="text-xs text-[#a89c99]">
              Ex-officio accreditation across all future international editions of the summit.
            </p>
          </div>
        </div>
      </div>

      {/* Leadership Tracks */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold text-[#e6c887] uppercase tracking-wider">
            SPECIALIZED CADRES
          </span>
          <h3 className="text-2xl font-bold font-display text-white">Fellowship Leadership Tracks</h3>
          <p className="text-xs text-[#a89c99]">Select the track aligning with your intellectual temperament and community work.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tracks.map(track => {
            const IconC = track.icon;
            return (
              <div 
                key={track.id}
                className="p-6 rounded-2xl bg-[#120306] border border-[#e51e2b]/25 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#22050a] border border-[#e51e2b]/40 text-[#e6c887]">
                    <IconC className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">{track.title}</h4>
                    <span className="text-[10px] font-mono text-[#e51e2b] block">{track.focus}</span>
                  </div>
                </div>

                <p className="text-xs text-[#c9bfbc] leading-relaxed pt-2">
                  {track.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Fellowship Application */}
      <div className="p-8 sm:p-10 rounded-2xl bg-[#120306] border border-[#e6c887]/30 max-w-3xl mx-auto space-y-6">
        <div className="space-y-2">
          <span className="text-[10px] font-mono text-[#e6c887] font-bold uppercase tracking-wider">
            COHORT 2026–2027 APPLICATION DOSSIER
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
            Apply to the Auvreo Fellowship
          </h3>
          <p className="text-xs text-[#a89c99]">
            Open to all registered summit delegates, university debate captains, and young policy practitioners.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 rounded-xl bg-[#10b981]/10 border border-[#10b981]/30 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-[#10b981] mx-auto" />
            <h4 className="text-base font-bold text-white">Fellowship Dossier Registered</h4>
            <p className="text-xs text-[#c9bfbc] max-w-md mx-auto">
              Your application for the <strong>{formData.leadershipTrack}</strong> has been logged in the Secretariat Admissions queue. Shortlisted candidates are invited for oral deliberations.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-4 py-2 rounded-lg bg-[#140306] border border-white/20 text-xs text-white"
            >
              Submit Another Dossier
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#a89c99] mb-1 font-mono uppercase">Full Legal Name *</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Siddharth Varma"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090102] border border-white/10 text-white outline-none focus:border-[#e51e2b]"
                />
              </div>

              <div>
                <label className="block text-[#a89c99] mb-1 font-mono uppercase">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="siddharth.v@nls.ac.in"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090102] border border-white/10 text-white outline-none focus:border-[#e51e2b]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#a89c99] mb-1 font-mono uppercase">Country of Citizenship *</label>
                <input
                  type="text"
                  required
                  value={formData.country}
                  onChange={e => setFormData({ ...formData, country: e.target.value })}
                  placeholder="e.g. India, Egypt, UK..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090102] border border-white/10 text-white outline-none focus:border-[#e51e2b]"
                />
              </div>

              <div>
                <label className="block text-[#a89c99] mb-1 font-mono uppercase">Institution / University *</label>
                <input
                  type="text"
                  required
                  value={formData.institution}
                  onChange={e => setFormData({ ...formData, institution: e.target.value })}
                  placeholder="e.g. National Law School of India University"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090102] border border-white/10 text-white outline-none focus:border-[#e51e2b]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#a89c99] mb-1 font-mono uppercase">Selected Leadership Track *</label>
              <select
                value={formData.leadershipTrack}
                onChange={e => setFormData({ ...formData, leadershipTrack: e.target.value as FellowApplication['leadershipTrack'] })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#090102] border border-white/10 text-white outline-none focus:border-[#e51e2b]"
              >
                <option value="Policy & Dialogue">Policy & Dialogue Track</option>
                <option value="Research & Perspectives">Research & Perspectives Track</option>
                <option value="Community Grassroots">Community Grassroots Track</option>
                <option value="Institutional Innovation">Institutional Innovation & Digital Architecture Track</option>
              </select>
            </div>

            <div>
              <label className="block text-[#a89c99] mb-1 font-mono uppercase">Statement of Intent & Problem Focus (250-400 words) *</label>
              <textarea
                required
                rows={4}
                value={formData.statementOfIntent}
                onChange={e => setFormData({ ...formData, statementOfIntent: e.target.value })}
                placeholder="What systemic challenge do you intend to focus on during your fellowship year? Describe the specific intervention or research deliverable you will produce."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#090102] border border-white/10 text-white outline-none focus:border-[#e51e2b] resize-none"
              />
            </div>

            <div>
              <label className="block text-[#a89c99] mb-1 font-mono uppercase">Relevant Experience & Evidence of Initiative *</label>
              <textarea
                required
                rows={3}
                value={formData.portfolioOrExperience}
                onChange={e => setFormData({ ...formData, portfolioOrExperience: e.target.value })}
                placeholder="Publications, leadership roles, legislative internships, community projects, or debate achievements."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#090102] border border-white/10 text-white outline-none focus:border-[#e51e2b] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#e51e2b] to-[#990a18] text-white font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#e51e2b]/30"
            >
              Submit Fellowship Dossier
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
