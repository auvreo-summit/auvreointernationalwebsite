import React, { useState } from 'react';
import { useAuvreo } from '../context/AuvreoContext';
import { DigitalCredential } from '../components/DigitalCredential';
import { PROGRAMMES } from '../data/mockData';
import { Application } from '../types';
import { 
  Calendar, 
  Bell, 
  FileText, 
  Award, 
  User, 
  HelpCircle, 
  LogOut, 
  CheckCircle2, 
  Clock, 
  Download, 
  AlertTriangle,
  Send,
  Sparkles,
  Shield,
  Layers,
  Compass,
  LogIn,
  ArrowRight
} from 'lucide-react';

const GUEST_OBSERVER: Application = {
  id: 'AUV-GUEST-2026',
  fullName: 'Guest Observer',
  email: 'guest@auvreo.org',
  phone: '+91 98765 43210',
  country: 'International Delegate',
  city: 'Global Cohort',
  institution: 'Observer Delegation',
  age: 22,
  bio: 'Accredited international diplomatic observer and researcher.',
  experience: 'International Multilateral Research & Observer',
  interests: 'Diplomatic protocol, consensus synthesis, peace studies',
  motivation: 'Exploring the Auvreo multilateral ecosystem as an accredited guest observer.',
  programme: 'uncsw',
  tier: 'international-delegate',
  status: 'confirmed',
  paymentStatus: 'completed',
  paymentAmount: '35',
  currency: 'USD',
  createdAt: '2026-09-01'
};

export const ParticipantDashboardView: React.FC = () => {
  const { 
    activeParticipant, 
    applications, 
    setActiveParticipant, 
    logoutParticipant, 
    loginAsParticipant,
    announcements, 
    sessions, 
    documents,
    openAuthModal,
    currentUser,
    navigateTo 
  } = useAuvreo();

  const [activeTab, setActiveTab] = useState<'overview' | 'credential' | 'schedule' | 'announcements' | 'resources' | 'certificates' | 'profile' | 'support'>('overview');
  const [selectedDay, setSelectedDay] = useState<'day-1' | 'day-2'>('day-1');
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSent, setSupportSent] = useState(false);
  const [loginInput, setLoginInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  // If not logged in, show Gateway with "Enter as Guest" option
  if (!activeParticipant) {
    return (
      <div className="max-w-lg mx-auto py-16 px-4">
        <div className="bg-[#100305] border border-[#e51e2b]/30 rounded-2xl p-8 text-center shadow-2xl space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-[#2a060b] border border-[#e51e2b]/50 mx-auto flex items-center justify-center text-[#e6c887] font-black text-2xl shadow-lg shadow-[#e51e2b]/20">
            <Sparkles className="w-7 h-7 text-[#e6c887]" />
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#e6c887] block mb-1">
              DIGITAL SUMMIT PLATFORM
            </span>
            <h2 className="text-2xl font-bold font-display text-white">Enter Auvresence</h2>
            <p className="text-xs text-[#a89c99] mt-1.5 max-w-sm mx-auto leading-relaxed">
              Explore the digital summit environment: schedule, committee working papers, council dossiers, and sample delegate credentials.
            </p>
          </div>

          {/* Primary Action: Enter as Guest Mode */}
          <div className="p-4 rounded-xl bg-gradient-to-b from-[#1c060a] to-[#120305] border border-[#e6c887]/40 text-left space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#e6c887] flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#e6c887]" />
                Explore Without Registration
              </span>
              <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-[#e6c887]/20 text-[#e6c887] uppercase">
                Instant Access
              </span>
            </div>
            <p className="text-[11px] text-[#c9bfbc] leading-relaxed">
              Browse the entire Auvresence portal immediately as an accredited Guest Observer without creating an account.
            </p>
            <button
              onClick={() => setActiveParticipant(GUEST_OBSERVER)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#e6c887] to-[#d4b068] hover:from-[#f3dfa2] hover:to-[#e6c887] text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <span>Enter as Guest Observer</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Secondary: Sign in with Google */}
          <div className="pt-2 flex items-center justify-between gap-3 text-xs">
            <div className="h-px bg-white/10 flex-1" />
            <span className="text-[#a89c99] text-[11px] uppercase font-mono">Or Sign In</span>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          <div className="space-y-3">
            <button
              onClick={openAuthModal}
              className="w-full py-2.5 rounded-xl bg-[#180407] hover:bg-[#25050b] border border-[#e51e2b]/40 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <LogIn className="w-4 h-4 text-[#e51e2b]" />
              <span>Sign In with Google</span>
            </button>

            {/* Application ID lookup for registered delegates */}
            <form onSubmit={(e) => {
              e.preventDefault();
              const success = loginAsParticipant(loginInput);
              if (!success) setLoginError(true);
              else setLoginError(false);
            }} className="space-y-2 pt-2 text-left">
              <span className="text-[10px] font-mono text-[#a89c99] block">
                Already registered with an Application ID?
              </span>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={loginInput}
                  onChange={(e) => {
                    setLoginInput(e.target.value);
                    setLoginError(false);
                  }}
                  placeholder="e.g. AUV-2026-1002 or Email"
                  className="flex-1 px-3 py-2 rounded-xl bg-[#180407] border border-white/10 text-white text-xs focus:outline-none focus:border-[#e51e2b]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
                >
                  Verify
                </button>
              </div>
              {loginError && (
                <p className="text-[11px] text-[#ff4d4d]">
                  No dossier matching this identifier was found. You can enter as Guest above.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }

  const isGuest = activeParticipant.id === 'AUV-GUEST-2026';
  const prog = PROGRAMMES.find(p => p.id === activeParticipant.programme) || PROGRAMMES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Guest Exploration Banner if in Guest Mode */}
      {isGuest && (
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-[#221605] via-[#2d1d07] to-[#180f03] border border-[#e6c887]/40 text-[#fcfaf7] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#e6c887]/20 border border-[#e6c887]/50 flex items-center justify-center text-[#e6c887] shrink-0">
              <Sparkles className="w-5 h-5 text-[#e6c887]" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#e6c887] uppercase tracking-wider flex items-center gap-2">
                <span>Guest Exploration Mode Active</span>
                <span className="px-2 py-0.2 rounded-full bg-[#e6c887]/20 text-[9px] text-[#e6c887] font-mono">
                  PREVIEW
                </span>
              </div>
              <p className="text-xs text-[#d8cfcb] mt-0.5">
                You are viewing the interactive Auvresence portal. Explore the summit schedule, committee dossiers, resolution chambers, and credential samples.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={openAuthModal}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#e51e2b] hover:bg-[#ff2438] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-lg shadow-[#e51e2b]/30 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span>Sign In with Google</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Top Welcome Bar */}
      <div className="bg-gradient-to-r from-[#180407] via-[#22060b] to-[#120305] border border-[#e51e2b]/30 rounded-2xl p-6 sm:p-8 mb-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 ${
              isGuest 
                ? 'bg-[#e6c887]/20 text-[#e6c887] border border-[#e6c887]/40' 
                : 'bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30'
            }`}>
              <CheckCircle2 className="w-3 h-3" />
              {isGuest ? 'GUEST OBSERVER PREVIEW' : activeParticipant.status === 'confirmed' ? 'ACCREDITED DELEGATE' : 'UNDER REVIEW'}
            </span>
            <span className="text-[10px] font-mono text-[#e6c887]">{activeParticipant.id}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
            Welcome, {activeParticipant.fullName}
          </h1>
          <p className="text-xs sm:text-sm text-[#b8adaa] mt-1">
            Auvreo International Youth Summit — India 2026 • New Delhi, December 2026
          </p>
        </div>

        {/* Quick actions & Logout */}
        <div className="flex items-center gap-3">
          <button
            onClick={logoutParticipant}
            className="px-3.5 py-2 rounded-xl bg-[#140306] border border-white/10 text-[#a89c99] hover:text-white hover:border-[#e51e2b]/40 text-xs font-medium flex items-center gap-2 transition-colors"
            title="Exit Portal"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Exit Portal</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Tabs & Content, Right Credential Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Tabs (Mobile row, Desktop sidebar/pills) */}
        <div className="lg:col-span-3 space-y-1">
          <div className="bg-[#120306] border border-[#e51e2b]/25 rounded-2xl p-2.5 space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${
                activeTab === 'overview'
                  ? 'bg-[#e51e2b] text-white'
                  : 'text-[#c9beba] hover:bg-white/5 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              Overview & Status
            </button>

            <button
              onClick={() => setActiveTab('credential')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${
                activeTab === 'credential'
                  ? 'bg-[#e51e2b] text-white'
                  : 'text-[#c9beba] hover:bg-white/5 hover:text-white'
              }`}
            >
              <Shield className="w-4 h-4" />
              Digital Credential Pass
            </button>

            <button
              onClick={() => setActiveTab('schedule')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${
                activeTab === 'schedule'
                  ? 'bg-[#e51e2b] text-white'
                  : 'text-[#c9beba] hover:bg-white/5 hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Summit Schedule
            </button>

            <button
              onClick={() => setActiveTab('announcements')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                activeTab === 'announcements'
                  ? 'bg-[#e51e2b] text-white'
                  : 'text-[#c9beba] hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-3">
                <Bell className="w-4 h-4" />
                Live Announcements
              </span>
              <span className="w-2 h-2 rounded-full bg-[#e51e2b] animate-ping" />
            </button>

            <button
              onClick={() => setActiveTab('resources')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${
                activeTab === 'resources'
                  ? 'bg-[#e51e2b] text-white'
                  : 'text-[#c9beba] hover:bg-white/5 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              Study Guides & Documents
            </button>

            <button
              onClick={() => setActiveTab('certificates')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${
                activeTab === 'certificates'
                  ? 'bg-[#e51e2b] text-white'
                  : 'text-[#c9beba] hover:bg-white/5 hover:text-white'
              }`}
            >
              <Award className="w-4 h-4" />
              Issued Certificates
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${
                activeTab === 'profile'
                  ? 'bg-[#e51e2b] text-white'
                  : 'text-[#c9beba] hover:bg-white/5 hover:text-white'
              }`}
            >
              <User className="w-4 h-4" />
              Delegate Profile
            </button>

            <button
              onClick={() => setActiveTab('support')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${
                activeTab === 'support'
                  ? 'bg-[#e51e2b] text-white'
                  : 'text-[#c9beba] hover:bg-white/5 hover:text-white'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              Help & Delegate Desk
            </button>
          </div>

          {/* Quick Council Card */}
          <div className="bg-[#140306] border border-[#e51e2b]/25 rounded-2xl p-4 text-xs space-y-2">
            <span className="text-[10px] font-mono text-[#a89c99] uppercase tracking-wider block">
              Assigned Council
            </span>
            <div className="font-bold text-white text-sm">{prog.name}</div>
            <p className="text-[11px] text-[#b0a4a1] line-clamp-2 leading-relaxed">
              {prog.agendaOverview}
            </p>
            {activeParticipant.assignedSeat && (
              <div className="pt-2 border-t border-white/5 text-[11px]">
                <span className="text-[#a89c99]">Portfolio: </span>
                <span className="font-semibold text-[#e6c887]">{activeParticipant.assignedSeat}</span>
              </div>
            )}
          </div>
        </div>

        {/* Central Content Area */}
        <div className="lg:col-span-9 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Status Summary Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#140306] border border-[#e51e2b]/25">
                  <span className="text-[10px] font-mono text-[#a89c99] uppercase block">Dossier Status</span>
                  <div className="text-lg font-bold text-[#10b981] mt-1 capitalize">{activeParticipant.status}</div>
                  <span className="text-[10px] text-[#a89c99]">Verified for physical accreditation</span>
                </div>

                <div className="p-4 rounded-xl bg-[#140306] border border-[#e51e2b]/25">
                  <span className="text-[10px] font-mono text-[#a89c99] uppercase block">Assigned Council</span>
                  <div className="text-lg font-bold text-white mt-1">{prog.shortName}</div>
                  <span className="text-[10px] text-[#e6c887]">{prog.badge}</span>
                </div>

                <div className="p-4 rounded-xl bg-[#140306] border border-[#e51e2b]/25">
                  <span className="text-[10px] font-mono text-[#a89c99] uppercase block">Host City Protocol</span>
                  <div className="text-lg font-bold text-white mt-1">New Delhi</div>
                  <span className="text-[10px] text-[#a89c99]">December 18–20, 2026</span>
                </div>
              </div>

              {/* Delegate Pre-Summit Checklist */}
              <div className="bg-[#120306] border border-[#e51e2b]/25 rounded-2xl p-6">
                <h3 className="text-sm font-bold text-white font-display mb-4">
                  Delegate Preparation Checklist
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#1c060a] border border-[#10b981]/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                      <span className="text-white font-medium">Application Registered & Fees Cleared</span>
                    </div>
                    <span className="font-mono text-[10px] text-[#10b981]">COMPLETED</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#1c060a] border border-[#e6c887]/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-[#e6c887]" />
                      <span className="text-white font-medium">Download Council Study Guide & Pre-Conference Dossier</span>
                    </div>
                    <button 
                      onClick={() => setActiveTab('resources')} 
                      className="px-2.5 py-1 rounded bg-[#e6c887]/15 text-[#e6c887] font-semibold text-[10px] hover:bg-[#e6c887]/30"
                    >
                      Access Files →
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-[#1c060a] border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-4 h-4 text-[#a89c99]" />
                      <span className="text-white font-medium">Submit Working Position Draft (Due Nov 20)</span>
                    </div>
                    <span className="font-mono text-[10px] text-[#a89c99]">UPCOMING</span>
                  </div>
                </div>
              </div>

              {/* Featured Digital Pass Preview */}
              <div className="bg-[#120306] border border-[#e51e2b]/25 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-white">Your Summit Pass</h3>
                    <p className="text-xs text-[#a89c99]">Flip to inspect your emergency verification hash.</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('credential')}
                    className="text-xs text-[#e6c887] font-semibold hover:underline"
                  >
                    View Full Screen →
                  </button>
                </div>

                <div className="py-2">
                  <DigitalCredential application={activeParticipant} interactive={true} />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CREDENTIAL */}
          {activeTab === 'credential' && (
            <div className="space-y-6">
              <div className="bg-[#120306] border border-[#e51e2b]/25 rounded-2xl p-6 text-center">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#e6c887] block mb-1">
                  OFFICIAL SUMMIT CREDENTIAL
                </span>
                <h3 className="text-xl font-bold text-white font-display">Auvresence Pass</h3>
                <p className="text-xs text-[#a89c99] max-w-md mx-auto mt-1 mb-6">
                  Present this card digitally or print for physical check-in at the official Secretariat venue in New Delhi.
                </p>

                <DigitalCredential application={activeParticipant} interactive={true} />

                <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 rounded-xl bg-[#e51e2b] text-white text-xs font-bold flex items-center gap-2 hover:bg-[#ff263b]"
                  >
                    <Download className="w-4 h-4" />
                    Print / Save Pass (PDF)
                  </button>
                  <button
                    onClick={() => alert(`Auvreo Pass Link: https://auvreo.org/pass/${activeParticipant.id}`)}
                    className="px-4 py-2 rounded-xl bg-[#1c060a] border border-white/15 text-white text-xs font-medium hover:bg-white/5"
                  >
                    Copy Pass Verification Link
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SCHEDULE */}
          {activeTab === 'schedule' && (
            <div className="bg-[#120306] border border-[#e51e2b]/25 rounded-2xl p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-lg font-bold text-white font-display">Summit Itinerary (Tentative)</h3>
                    <span className="px-2 py-0.5 rounded-full bg-[#e51e2b]/20 border border-[#e51e2b]/40 text-[#ff8089] text-[10px] font-mono font-bold uppercase tracking-wider">
                      Provisional
                    </span>
                  </div>
                  <p className="text-xs text-[#a89c99]">Two curated days of unscripted debate, cultural immersion, and action (tentative schedule).</p>
                </div>

                {/* Day selector */}
                <div className="flex items-center gap-2 p-1 rounded-xl bg-[#1c060a] border border-[#e51e2b]/30">
                  <button
                    onClick={() => setSelectedDay('day-1')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      selectedDay === 'day-1' ? 'bg-[#e51e2b] text-white' : 'text-[#a89c99] hover:text-white'
                    }`}
                  >
                    Day 1 (Dec 19)
                  </button>
                  <button
                    onClick={() => setSelectedDay('day-2')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      selectedDay === 'day-2' ? 'bg-[#e51e2b] text-white' : 'text-[#a89c99] hover:text-white'
                    }`}
                  >
                    Day 2 (Dec 20)
                  </button>
                </div>
              </div>

              {/* Sessions Timeline */}
              <div className="space-y-4">
                {sessions.filter(s => s.day === selectedDay).map(s => (
                  <div
                    key={s.id}
                    className="p-4 rounded-xl bg-[#170407] border border-[#e51e2b]/20 hover:border-[#e51e2b]/40 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2 font-mono text-xs text-[#e6c887] font-semibold">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{s.time}</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-[#a89c99] border border-white/5 w-fit">
                        {s.location}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white mt-2">{s.title}</h4>
                    <p className="text-xs text-[#b8adaa] mt-1 leading-relaxed">{s.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ANNOUNCEMENTS */}
          {activeTab === 'announcements' && (
            <div className="bg-[#120306] border border-[#e51e2b]/25 rounded-2xl p-6 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white font-display">Organising Committee Notices</h3>
                <p className="text-xs text-[#a89c99]">Official broadcasts directly from Delegate Affairs and Executive Directors.</p>
              </div>

              <div className="space-y-3">
                {announcements.map(ann => (
                  <div
                    key={ann.id}
                    className={`p-4 rounded-xl border ${
                      ann.priority === 'urgent'
                        ? 'bg-[#2b080d] border-[#e51e2b]'
                        : 'bg-[#180407] border-[#e51e2b]/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#a89c99]">{ann.date}</span>
                      <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded border ${
                        ann.priority === 'urgent'
                          ? 'bg-[#e51e2b] text-white border-[#ff3344]'
                          : 'bg-[#e6c887]/15 text-[#e6c887] border-[#e6c887]/30'
                      }`}>
                        {ann.priority}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white mt-1.5">{ann.title}</h4>
                    <p className="text-xs text-[#c9beba] mt-1 leading-relaxed">{ann.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: RESOURCES */}
          {activeTab === 'resources' && (
            <div className="bg-[#120306] border border-[#e51e2b]/25 rounded-2xl p-6 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white font-display">Dossiers & Study Material</h3>
                <p className="text-xs text-[#a89c99]">Official preparation manuals, committee background guides, and code of conduct.</p>
              </div>

              <div className="space-y-3">
                {documents.map(doc => (
                  <div
                    key={doc.id}
                    className="p-4 rounded-xl bg-[#170407] border border-[#e51e2b]/20 flex items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#e51e2b]/20 text-[#e51e2b] font-bold">
                          {doc.type}
                        </span>
                        <span className="text-xs font-mono text-[#a89c99]">{doc.fileSize}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{doc.title}</h4>
                      <p className="text-xs text-[#a89c99]">{doc.description}</p>
                    </div>

                    <button
                      onClick={() => alert(`Downloading official document: ${doc.title}`)}
                      className="px-3 py-2 rounded-lg bg-[#22060b] border border-[#e51e2b]/40 text-[#e6c887] text-xs font-semibold hover:bg-[#330810] flex items-center gap-1.5 shrink-0"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: CERTIFICATES */}
          {activeTab === 'certificates' && (
            <div className="bg-[#120306] border border-[#e51e2b]/25 rounded-2xl p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#1c060a] border border-[#e6c887]/40 mx-auto flex items-center justify-center text-[#e6c887]">
                <Award className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white font-display">Summit Diplomas & Certificates</h3>
                <p className="text-xs text-[#a89c99] max-w-md mx-auto mt-1">
                  In accordance with Section 22 & 52 regulations: certificates are only issued post-summit following active participation and verified roll-call attendance across committee sessions.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#170407] border border-white/10 max-w-sm mx-auto text-xs text-[#c9bfbc]">
                <div className="flex justify-between py-1">
                  <span className="text-[#a89c99]">Accreditation Type:</span>
                  <span className="font-semibold text-white">Delegate of {prog.shortName}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#a89c99]">Issuance Window:</span>
                  <span className="font-semibold text-[#e6c887]">December 21, 2026</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#a89c99]">Status:</span>
                  <span className="font-mono text-[#a89c99]">PENDING PHYSICAL SUMMIT</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: PROFILE */}
          {activeTab === 'profile' && (
            <div className="bg-[#120306] border border-[#e51e2b]/25 rounded-2xl p-6 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white font-display">Delegate Profile Dossier</h3>
                <p className="text-xs text-[#a89c99]">Manage your contact records and dietary requirements.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-[#180407] border border-white/10">
                  <span className="text-[#a89c99] block mb-1">Full Legal Name</span>
                  <span className="font-semibold text-white text-sm">{activeParticipant.fullName}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#180407] border border-white/10">
                  <span className="text-[#a89c99] block mb-1">Registered Email</span>
                  <span className="font-semibold text-white text-sm">{activeParticipant.email}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#180407] border border-white/10">
                  <span className="text-[#a89c99] block mb-1">Phone Number</span>
                  <span className="font-semibold text-white">{activeParticipant.phone}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#180407] border border-white/10">
                  <span className="text-[#a89c99] block mb-1">Institution / University</span>
                  <span className="font-semibold text-white">{activeParticipant.institution}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#180407] border border-white/10 sm:col-span-2">
                  <span className="text-[#a89c99] block mb-1">Bio</span>
                  <p className="text-[#d5ccc8] italic">{activeParticipant.bio}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: SUPPORT DESK */}
          {activeTab === 'support' && (
            <div className="bg-[#120306] border border-[#e51e2b]/25 rounded-2xl p-6 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white font-display">Delegate Affairs Assistance</h3>
                <p className="text-xs text-[#a89c99]">
                  Direct channel to Anshika (Head of Delegate Affairs) and the New Delhi logistics team.
                </p>
              </div>

              {supportSent ? (
                <div className="p-6 rounded-xl bg-[#180407] border border-[#10b981] text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-[#10b981] mx-auto" />
                  <h4 className="text-sm font-bold text-white">Inquiry Received</h4>
                  <p className="text-xs text-[#a89c99]">
                    The Delegate Affairs desk has received your ticket for Application {activeParticipant.id}. A response will be dispatched to {activeParticipant.email} within 24 hours.
                  </p>
                  <button
                    onClick={() => setSupportSent(false)}
                    className="text-xs text-[#e6c887] font-semibold hover:underline pt-2 block mx-auto"
                  >
                    Submit Another Query
                  </button>
                </div>
              ) : (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (!supportMessage.trim()) return;
                  setSupportSent(true);
                  setSupportMessage('');
                }} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-[#c9bfbc] mb-1">
                      Query Topic
                    </label>
                    <select className="w-full px-3 py-2 rounded-lg bg-[#180407] border border-[#e51e2b]/30 text-white text-xs">
                      <option>Visa Letter & Embassy Documentation</option>
                      <option>Accommodation & Delhi Transfers</option>
                      <option>Dietary Restrictions / Accessibility</option>
                      <option>Committee Preparation Clarification</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#c9bfbc] mb-1">
                      Message Details
                    </label>
                    <textarea
                      rows={4}
                      value={supportMessage}
                      onChange={(e) => setSupportMessage(e.target.value)}
                      placeholder="Describe your question or requirement..."
                      className="w-full px-3 py-2 rounded-lg bg-[#180407] border border-[#e51e2b]/30 text-white text-xs focus:outline-none focus:border-[#e51e2b]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#e51e2b] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#ff263b] flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send to Delegate Desk</span>
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
