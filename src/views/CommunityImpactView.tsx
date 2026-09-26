import React, { useState } from 'react';
import { useAuvreo } from '../context/AuvreoContext';
import { CONTRIBUTOR_TRACKS } from '../data/mockData';
import { ContributorTrack } from '../types';
import { 
  HeartHandshake, 
  Sparkles, 
  Users, 
  Send, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight,
  Target,
  FileCheck
} from 'lucide-react';

export const CommunityImpactView: React.FC = () => {
  const { volunteerRequests, addVolunteerApplication } = useAuvreo();
  const [selectedTrack, setSelectedTrack] = useState<ContributorTrack | null>(null);
  const [contributorApplied, setContributorApplied] = useState(false);
  const [contributorName, setContributorName] = useState('');
  const [contributorEmail, setContributorEmail] = useState('');
  const [contributorPitch, setContributorPitch] = useState('');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#e6c887] uppercase">
          COMMUNITY & POST-SUMMIT ACTION
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-display text-white">
          A Community that Continues
        </h1>
        <p className="text-sm sm:text-base text-[#c9bfbc] leading-relaxed">
          Diplomacy doesn't end when the gavels drop. Explore our Contributor Tracks, internal volunteer staffing, and the post-summit Impact Grant pipeline.
        </p>
      </div>

      {/* SECTION: CONTRIBUTOR PROGRAMME (6 TRACKS) */}
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono font-bold text-[#e51e2b] uppercase tracking-wider">
              SECTION 37 • CONTRIBUTOR PROGRAMME
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Six Pathways to Shape Auvreo
            </h2>
            <p className="text-xs sm:text-sm text-[#b8adaa]">
              Every track has defined deliverables, dedicated executive mentorship, and official contributor certification.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-[#140306] border border-[#e51e2b]/30 text-xs text-[#e6c887] font-mono">
            Active Year-Round Cohort
          </div>
        </div>

        {/* 6 Tracks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONTRIBUTOR_TRACKS.map(t => (
            <div
              key={t.id}
              className="p-6 rounded-2xl bg-[#120306] border border-[#e51e2b]/25 hover:border-[#e51e2b]/50 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#e51e2b]/20 text-[#e51e2b]">
                  TRACK 0{t.id === 'creator' ? '1' : t.id === 'referral' ? '2' : t.id === 'outreach' ? '3' : t.id === 'connect' ? '4' : t.id === 'storyteller' ? '5' : '6'}
                </span>
                <h3 className="text-lg font-bold text-white">{t.title}</h3>
                <p className="text-xs text-[#c9bfbc] leading-relaxed">{t.description}</p>

                <div className="pt-2 border-t border-white/5 space-y-1 text-xs">
                  <span className="text-[10px] font-mono text-[#a89c99] uppercase block">Deliverables:</span>
                  <p className="text-[#d8cfcb] text-[11px] leading-relaxed">
                    {t.deliverables}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedTrack(t);
                  setContributorApplied(false);
                }}
                className="w-full py-2 rounded-xl bg-[#1c0508] border border-[#e51e2b]/40 text-[#e6c887] text-xs font-semibold hover:bg-[#e51e2b] hover:text-white transition-all flex items-center justify-center gap-1.5"
              >
                <span>Apply for {t.title}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Ethical Conduct Banner (Section 37 requirement) */}
        <div className="p-4 rounded-xl bg-[#180407] border border-[#e51e2b]/40 flex items-start gap-3 text-xs text-[#c9beba]">
          <ShieldAlert className="w-5 h-5 text-[#e51e2b] shrink-0 mt-0.5" />
          <div>
            <strong className="text-white block">Contributor Code of Integrity & Anti-Spam Policy:</strong>
            Referrals and outreach must be genuine, relationship-based recommendations. Spamming social channels, generating false accounts, automated scrapers, or making misleading promotional claims is strictly prohibited and results in immediate permanent expulsion from the Auvreo network.
          </div>
        </div>
      </div>

      {/* SECTION: INTERNAL VOLUNTEERS (HR & DEPARTMENTS) */}
      <div className="space-y-8 pt-8 border-t border-[#e51e2b]/20">
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs font-mono font-bold text-[#e6c887] uppercase tracking-wider">
            INTERNAL STAFFING • HR & MANAGEMENT
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Summit Operations Volunteers
          </h2>
          <p className="text-xs sm:text-sm text-[#b8adaa]">
            Our five departments post real staffing requirements for the December 2026 Delhi summit.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {volunteerRequests.map(v => (
            <div key={v.id} className="p-5 rounded-2xl bg-[#140306] border border-white/10 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#e6c887]">{v.department}</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-[#10b981]/20 text-[#10b981] font-bold">
                  {v.numberRequired} Positions
                </span>
              </div>

              <h4 className="font-bold text-white text-sm">{v.role}</h4>
              <p className="text-[11px] text-[#a89c99]">Supervised by: {v.departmentHead}</p>

              <div className="pt-2 border-t border-white/5">
                <span className="text-[10px] font-mono text-[#a89c99] block mb-1">Key Responsibilities:</span>
                <ul className="text-[#c9beba] text-[11px] space-y-0.5">
                  {v.responsibilities.map((r, i) => (
                    <li key={i}>• {r}</li>
                  ))}
                </ul>
              </div>

              <a
                href="mailto:auvreo@gmail.com?subject=Volunteer%20Application%20for%20"
                className="block text-center w-full py-2 rounded-lg bg-[#20050a] border border-[#e51e2b]/30 text-white font-semibold text-[11px] hover:bg-[#e51e2b]"
              >
                Apply via HR Desk
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION: AUVREO IMPACT GRANT */}
      <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-[#170407] via-[#24060c] to-[#120305] border border-[#e51e2b]/40 space-y-6">
        <span className="text-xs font-mono font-bold tracking-widest text-[#e6c887] uppercase">
          SECTION 38 • THE IMPACT GRANT
        </span>

        <h2 className="text-3xl font-bold font-display text-white">
          From Resolution to Real-World Impact
        </h2>

        <p className="text-sm text-[#ded3cf] max-w-2xl leading-relaxed">
          Every delegate who tables a comprehensive draft in AIPPM or UNCSW can apply for the Auvreo Impact Grant following the summit. We provide micro-grant seed capital, legal guidance, and mentor pairing.
        </p>

        {/* 6 Step Pipeline */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-[#090102] border border-white/10 text-center">
            <span className="text-[10px] font-mono text-[#e51e2b] block">PHASE 01</span>
            <div className="font-bold text-white text-xs mt-1">Idea Formulation</div>
            <span className="text-[10px] text-[#a89c99] mt-1 block">In committee</span>
          </div>

          <div className="p-3 rounded-xl bg-[#090102] border border-white/10 text-center">
            <span className="text-[10px] font-mono text-[#e51e2b] block">PHASE 02</span>
            <div className="font-bold text-white text-xs mt-1">Proposal Submission</div>
            <span className="text-[10px] text-[#a89c99] mt-1 block">Post-conference</span>
          </div>

          <div className="p-3 rounded-xl bg-[#090102] border border-white/10 text-center">
            <span className="text-[10px] font-mono text-[#e51e2b] block">PHASE 03</span>
            <div className="font-bold text-white text-xs mt-1">Board Selection</div>
            <span className="text-[10px] text-[#a89c99] mt-1 block">Rigor check</span>
          </div>

          <div className="p-3 rounded-xl bg-[#090102] border border-white/10 text-center">
            <span className="text-[10px] font-mono text-[#e51e2b] block">PHASE 04</span>
            <div className="font-bold text-white text-xs mt-1">Direct Support</div>
            <span className="text-[10px] text-[#a89c99] mt-1 block">Micro-seed + network</span>
          </div>

          <div className="p-3 rounded-xl bg-[#090102] border border-white/10 text-center">
            <span className="text-[10px] font-mono text-[#10b981] block">PHASE 05</span>
            <div className="font-bold text-white text-xs mt-1">Implementation</div>
            <span className="text-[10px] text-[#a89c99] mt-1 block">Fieldwork</span>
          </div>

          <div className="p-3 rounded-xl bg-[#090102] border border-white/10 text-center">
            <span className="text-[10px] font-mono text-[#e6c887] block">PHASE 06</span>
            <div className="font-bold text-white text-xs mt-1">Accountability</div>
            <span className="text-[10px] text-[#a89c99] mt-1 block">Published outcomes</span>
          </div>
        </div>

        <div className="pt-2 text-xs text-[#a89c99] italic">
          *Notice: In compliance with institutional integrity rules (Section 53), historical outcomes will be populated following the graduation of the 2026 inaugural cohort.
        </div>
      </div>

      {/* Contributor Application Modal */}
      {selectedTrack && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#120306] border border-[#e51e2b]/40 rounded-2xl max-w-lg w-full p-6 space-y-4 text-xs shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono text-[#e6c887] uppercase">CONTRIBUTOR DOSSIER</span>
                <h3 className="text-base font-bold text-white">Join {selectedTrack.title}</h3>
              </div>
              <button onClick={() => setSelectedTrack(null)} className="text-[#a89c99] hover:text-white">✕</button>
            </div>

            {contributorApplied ? (
              <div className="p-6 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#10b981] mx-auto" />
                <h4 className="text-base font-bold text-white">Application Dispatched</h4>
                <p className="text-[#c9beba]">
                  Thank you, {contributorName}. The curatorial team for the {selectedTrack.title} has received your dossier. An email confirmation has been logged to {contributorEmail}.
                </p>
                <button
                  onClick={() => setSelectedTrack(null)}
                  className="px-4 py-2 rounded-xl bg-[#e51e2b] text-white font-bold text-xs"
                >
                  Return to Community
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => {
                e.preventDefault();
                if (!contributorName || !contributorEmail) return;
                addVolunteerApplication({
                  fullName: contributorName,
                  email: contributorEmail,
                  phone: 'N/A',
                  department: 'Delegate Affairs',
                  availability: 'Year-Round Contributor Cohort',
                  relevantExperience: `Contributor Track: ${selectedTrack.title}`,
                  statement: contributorPitch
                });
                setContributorApplied(true);
              }} className="space-y-4">
                <div>
                  <label className="text-[#a89c99] block mb-1">Your Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={contributorName}
                    onChange={e => setContributorName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#180407] border border-[#e51e2b]/30 text-white"
                  />
                </div>

                <div>
                  <label className="text-[#a89c99] block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={contributorEmail}
                    onChange={e => setContributorEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#180407] border border-[#e51e2b]/30 text-white"
                  />
                </div>

                <div>
                  <label className="text-[#a89c99] block mb-1">Why do you want to contribute to this track? (Portfolio links or brief pitch)</label>
                  <textarea
                    required
                    rows={3}
                    value={contributorPitch}
                    onChange={e => setContributorPitch(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#180407] border border-[#e51e2b]/30 text-white"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedTrack(null)}
                    className="px-4 py-2 rounded-xl bg-[#1c060a] border border-white/10 text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-[#e51e2b] text-white font-bold uppercase tracking-wider hover:bg-[#ff2438]"
                  >
                    Submit Contributor Application
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
