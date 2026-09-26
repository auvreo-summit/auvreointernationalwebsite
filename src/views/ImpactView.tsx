import React, { useState } from 'react';
import { useAuvreo } from '../context/AuvreoContext';
import { ImpactSubmission } from '../types';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Coins, 
  Target, 
  Users, 
  Calendar, 
  FileText, 
  Compass, 
  AlertCircle 
} from 'lucide-react';

export const ImpactView: React.FC = () => {
  const { impactSubmissions, addImpactSubmission } = useAuvreo();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    applicantName: '',
    email: '',
    organizationOrInstitution: '',
    projectTitle: '',
    focusArea: 'Education & Access' as ImpactSubmission['focusArea'],
    executiveSummary: '',
    problemStatement: '',
    proposedSolution: '',
    targetBeneficiaries: '',
    estimatedTimeline: '6 months post-summit'
  });

  const stages = [
    { step: '01', name: 'Idea Conception', desc: 'Identified during committee debates and working paper drafting.' },
    { step: '02', name: 'Proposal Formulation', desc: 'Refined into structured pilot models with local institutional partners.' },
    { step: '03', name: 'Advisory Selection', desc: 'Vetted by Auvreo senior practitioners for feasibility, ethics, and scale.' },
    { step: '04', name: 'Seed Grant & Support', desc: 'Micro-grants disbursed with continuous technical & policy mentorship.' },
    { step: '05', name: 'Ground Execution', desc: 'Hyperlocal 3 to 6-month implementation across educational or civic settings.' },
    { step: '06', name: 'Outcomes & Archiving', desc: 'Empirical data and community testimonials published transparently.' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addImpactSubmission({
      applicantName: formData.applicantName,
      email: formData.email,
      organizationOrInstitution: formData.organizationOrInstitution,
      projectTitle: formData.projectTitle,
      focusArea: formData.focusArea,
      executiveSummary: formData.executiveSummary,
      problemStatement: formData.problemStatement,
      proposedSolution: formData.proposedSolution,
      targetBeneficiaries: formData.targetBeneficiaries,
      estimatedTimeline: formData.estimatedTimeline
    });
    setSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#e6c887] uppercase">
          TANGIBLE YOUTH ACTION
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-display text-white">
          Auvreo Impact Grant
        </h1>
        <p className="text-sm sm:text-base text-[#b8adaa] leading-relaxed">
          The summit ends. The work begins. A structured seed pipeline converting committee resolutions into funded, audited community interventions.
        </p>

        {/* Honest Positioning Disclaimer */}
        <div className="inline-flex items-center gap-2 p-2.5 px-4 rounded-xl bg-[#140306] border border-[#e6c887]/30 text-xs text-[#e6c887]">
          <AlertCircle className="w-3.5 h-3.5 text-[#e51e2b] shrink-0" />
          <span>Applications and grant allocations are subject to the active Auvreo summit programme cycle.</span>
        </div>
      </div>

      {/* 6-Stage Lifecycle */}
      <div className="p-8 sm:p-10 rounded-2xl bg-[#120306] border border-[#e51e2b]/30 space-y-8">
        <div className="max-w-xl space-y-2">
          <span className="text-[10px] font-mono text-[#e51e2b] font-bold uppercase tracking-wider">
            LIFECYCLE METHODOLOGY
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
            From Deliberation to Deployment
          </h2>
          <p className="text-xs text-[#c9beba]">
            We follow a rigorous 6-stage lifecycle to guarantee every grant yields verifiable ground impact.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stages.map(s => (
            <div key={s.step} className="p-5 rounded-xl bg-[#090102] border border-white/5 space-y-2">
              <span className="text-xs font-mono font-bold text-[#e6c887]">STAGE {s.step}</span>
              <h4 className="text-sm font-bold text-white">{s.name}</h4>
              <p className="text-xs text-[#a89c99] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Current Seed Pipeline & Proposals Archive */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#e51e2b]/20 pb-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">Vetted Pilot Proposals</h3>
            <p className="text-xs text-[#a89c99]">Active initiatives moving through review and seed grant disbursement.</p>
          </div>
          <span className="text-xs font-mono text-[#e6c887]">{impactSubmissions.length} Registered Proposals</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {impactSubmissions.map(sub => (
            <div
              key={sub.id}
              className="p-6 rounded-2xl bg-[#120306] border border-[#e51e2b]/25 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#e6c887] font-semibold">{sub.focusArea}</span>
                  <span className={`px-2 py-0.5 rounded uppercase font-bold text-[9px] ${
                    sub.status === 'shortlisted' || sub.status === 'accepted'
                      ? 'bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/40'
                      : 'bg-[#e51e2b]/15 text-[#e51e2b] border border-[#e51e2b]/30'
                  }`}>
                    {sub.status}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white leading-snug">{sub.projectTitle}</h4>

                <p className="text-xs text-[#c9bfbc] leading-relaxed">
                  {sub.executiveSummary}
                </p>

                <div className="pt-2 border-t border-white/5 space-y-1 text-xs text-[#a89c99]">
                  <div><strong className="text-white">Lead:</strong> {sub.applicantName} ({sub.organizationOrInstitution})</div>
                  <div><strong className="text-white">Beneficiaries:</strong> {sub.targetBeneficiaries}</div>
                  <div><strong className="text-white">Timeline:</strong> {sub.estimatedTimeline}</div>
                </div>
              </div>

              {sub.reviewNotes && (
                <div className="p-3 rounded-lg bg-[#090102] border border-[#e6c887]/20 text-[11px] text-[#e6c887] italic">
                  Advisory Note: {sub.reviewNotes}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Proposal Submission Form */}
      <div className="p-8 sm:p-10 rounded-2xl bg-[#120306] border border-[#e6c887]/30 max-w-3xl mx-auto space-y-6">
        <div className="space-y-2">
          <span className="text-[10px] font-mono text-[#e6c887] font-bold uppercase tracking-wider">
            PROPOSAL DOSSIER
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
            Submit a Community Impact Proposal
          </h3>
          <p className="text-xs text-[#a89c99]">
            Proposals must directly translate summit debate themes into measurable ground solutions.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 rounded-xl bg-[#10b981]/10 border border-[#10b981]/30 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-[#10b981] mx-auto" />
            <h4 className="text-base font-bold text-white">Impact Proposal Transmitted</h4>
            <p className="text-xs text-[#c9bfbc] max-w-md mx-auto">
              Your proposal "{formData.projectTitle}" has been logged in the Auvreo Advisory Queue. Our grant committee evaluates proposals following the India 2026 summit.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-4 py-2 rounded-lg bg-[#140306] border border-white/20 text-xs text-white"
            >
              Submit Another Proposal
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#a89c99] mb-1 font-mono uppercase">Lead Applicant Name *</label>
                <input
                  type="text"
                  required
                  value={formData.applicantName}
                  onChange={e => setFormData({ ...formData, applicantName: e.target.value })}
                  placeholder="e.g. Maya Sen"
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
                  placeholder="maya.sen@ecocities.in"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090102] border border-white/10 text-white outline-none focus:border-[#e51e2b]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#a89c99] mb-1 font-mono uppercase">Organization / Institution *</label>
                <input
                  type="text"
                  required
                  value={formData.organizationOrInstitution}
                  onChange={e => setFormData({ ...formData, organizationOrInstitution: e.target.value })}
                  placeholder="e.g. Yamuna Conservation Collective / Delhi University"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090102] border border-white/10 text-white outline-none focus:border-[#e51e2b]"
                />
              </div>

              <div>
                <label className="block text-[#a89c99] mb-1 font-mono uppercase">Focus Area *</label>
                <select
                  value={formData.focusArea}
                  onChange={e => setFormData({ ...formData, focusArea: e.target.value as ImpactSubmission['focusArea'] })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090102] border border-white/10 text-white outline-none focus:border-[#e51e2b]"
                >
                  <option value="Education & Access">Education & Access</option>
                  <option value="Climate & Sustainable Cities">Climate & Sustainable Cities</option>
                  <option value="Diplomacy & Peacebuilding">Diplomacy & Peacebuilding</option>
                  <option value="Digital Rights & Tech Equity">Digital Rights & Tech Equity</option>
                  <option value="Culture & Heritage">Culture & Heritage</option>
                  <option value="Gender Justice">Gender Justice</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[#a89c99] mb-1 font-mono uppercase">Project Title *</label>
              <input
                type="text"
                required
                value={formData.projectTitle}
                onChange={e => setFormData({ ...formData, projectTitle: e.target.value })}
                placeholder="e.g. Yamuna Floodplain Living Ecological Map & Sensor Network"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#090102] border border-white/10 text-white outline-none focus:border-[#e51e2b]"
              />
            </div>

            <div>
              <label className="block text-[#a89c99] mb-1 font-mono uppercase">Executive Summary (2-3 sentences) *</label>
              <textarea
                required
                rows={2}
                value={formData.executiveSummary}
                onChange={e => setFormData({ ...formData, executiveSummary: e.target.value })}
                placeholder="A concise summary of what this project will achieve and how..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#090102] border border-white/10 text-white outline-none focus:border-[#e51e2b] resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#a89c99] mb-1 font-mono uppercase">Problem Statement *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.problemStatement}
                  onChange={e => setFormData({ ...formData, problemStatement: e.target.value })}
                  placeholder="What specific ground challenge does this project solve?"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090102] border border-white/10 text-white outline-none focus:border-[#e51e2b] resize-none"
                />
              </div>

              <div>
                <label className="block text-[#a89c99] mb-1 font-mono uppercase">Proposed Solution *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.proposedSolution}
                  onChange={e => setFormData({ ...formData, proposedSolution: e.target.value })}
                  placeholder="What actions, workshops, or installations will be implemented?"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090102] border border-white/10 text-white outline-none focus:border-[#e51e2b] resize-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#a89c99] mb-1 font-mono uppercase">Target Beneficiaries *</label>
                <input
                  type="text"
                  required
                  value={formData.targetBeneficiaries}
                  onChange={e => setFormData({ ...formData, targetBeneficiaries: e.target.value })}
                  placeholder="e.g. 5,000 state secondary students in East Delhi"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090102] border border-white/10 text-white outline-none focus:border-[#e51e2b]"
                />
              </div>

              <div>
                <label className="block text-[#a89c99] mb-1 font-mono uppercase">Estimated Timeline *</label>
                <input
                  type="text"
                  required
                  value={formData.estimatedTimeline}
                  onChange={e => setFormData({ ...formData, estimatedTimeline: e.target.value })}
                  placeholder="e.g. 6 months post-summit"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090102] border border-white/10 text-white outline-none focus:border-[#e51e2b]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#e51e2b] to-[#990a18] text-white font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#e51e2b]/30"
            >
              Submit Grant Dossier for Evaluation
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
