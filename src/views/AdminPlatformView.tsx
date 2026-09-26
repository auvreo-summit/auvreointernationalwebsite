import React, { useState, useEffect } from 'react';
import { useAuvreo } from '../context/AuvreoContext';
import { PROGRAMMES } from '../data/mockData';
import { ProgrammeType, TimelineMilestone, TimelineStatus } from '../types';
import { UserManagementPanel } from '../components/admin/UserManagementPanel';
import { sound } from '../utils/audio';
import { 
  Users, 
  CheckCircle, 
  Clock, 
  Globe, 
  DollarSign, 
  HeartHandshake, 
  Search, 
  Filter, 
  Plus, 
  Trash2, 
  Edit3, 
  Shield, 
  Sparkles, 
  Calendar, 
  Bell, 
  FileText,
  Check,
  X,
  Eye,
  Send,
  Lock,
  Layers,
  Settings,
  RefreshCw,
  Mail,
  Activity,
  AlertCircle,
  KeyRound,
  UserCheck,
  Award,
  BookOpen,
  Briefcase,
  Lightbulb,
  ExternalLink,
  ShieldCheck,
  Ban,
  QrCode
} from 'lucide-react';

export const AdminPlatformView: React.FC = () => {
  const { 
    applications: contextApps, 
    updateApplicationStatus, 
    updateApplicationProgramme,
    cmsContent, 
    updateCMSContent,
    announcements, 
    addAnnouncement,
    deleteAnnouncement,
    timelineMilestones,
    addTimelineMilestone,
    updateTimelineMilestone,
    deleteTimelineMilestone,
    sessions, 
    addSession, 
    deleteSession,
    volunteerRequests,
    addVolunteerRequest,
    updateVolunteerStatus,
    currentUser,
    openAuthModal,
    logoutUser,
    contactMessages,
    markContactStatus,
    impactSubmissions,
    updateImpactStatus,
    fellowApplications,
    updateFellowStatus,
    volunteerApplications,
    updateVolunteerAppStatus,
    stories,
    deleteIntakeRecord,
    auditLogs
  } = useAuvreo();

  const [currentModule, setCurrentModule] = useState<
    'overview' | 'users' | 'intakes' | 'applications' | 'logs' | 'programmes' | 'schedule' | 'timeline' | 'announcements' | 'cms'
  >('overview');

  const [intakeSubTab, setIntakeSubTab] = useState<'contact' | 'impact' | 'fellows' | 'volunteers' | 'stories'>('contact');

  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Search & Filters for Applications
  const [searchTerm, setSearchTerm] = useState('');
  const [programmeFilter, setProgrammeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedAppDossier, setSelectedAppDossier] = useState<string | null>(null);

  // New Announcement Form
  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnMessage, setNewAnnMessage] = useState('');
  const [newAnnPriority, setNewAnnPriority] = useState<'normal' | 'important' | 'urgent'>('normal');

  // New Schedule Session Form
  const [newSessionTitle, setNewSessionTitle] = useState('');
  const [newSessionTime, setNewSessionTime] = useState('');
  const [newSessionDay, setNewSessionDay] = useState<'day-1' | 'day-2'>('day-1');
  const [newSessionLoc, setNewSessionLoc] = useState('');
  const [newSessionDesc, setNewSessionDesc] = useState('');

  // New Timeline Milestone Form
  const [newMileStage, setNewMileStage] = useState('');
  const [newMileTitle, setNewMileTitle] = useState('');
  const [newMileDesc, setNewMileDesc] = useState('');
  const [newMileDate, setNewMileDate] = useState('TO BE ANNOUNCED');
  const [newMileStatus, setNewMileStatus] = useState<TimelineStatus>('Upcoming');
  const [newMileCtaText, setNewMileCtaText] = useState('');
  const [newMileCtaUrl, setNewMileCtaUrl] = useState('');

  // CMS Editor State
  const [cmsBannerText, setCmsBannerText] = useState(cmsContent.bannerAlert.text);
  const [cmsBannerEnabled, setCmsBannerEnabled] = useState(cmsContent.bannerAlert.enabled);
  const [cmsIndianFee, setCmsIndianFee] = useState(cmsContent.fees.indianStarting);
  const [cmsIntlFee, setCmsIntlFee] = useState(cmsContent.fees.internationalStarting);

  const isSuperAdmin = currentUser?.role === 'super_admin' || currentUser?.role === 'admin';
  const isStaff = currentUser?.role === 'staff' || currentUser?.role === 'chair';
  const isAuthorized = isSuperAdmin || isStaff;

  const totalApps = contextApps.length;
  const confirmedApps = contextApps.filter((a) => a.status === 'confirmed').length;
  const pendingApps = contextApps.filter((a) => a.status === 'under-review' || a.status === 'submitted').length;

  // Filtered Applications
  const filteredApps = contextApps.filter((app) => {
    const matchesSearch = 
      (app.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.country || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesProg = programmeFilter === 'all' || app.programme === programmeFilter;
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;

    return matchesSearch && matchesProg && matchesStatus;
  });

  const dossierApp = contextApps.find((a) => a.id === selectedAppDossier);

  const handleModuleChange = (mod: any) => {
    sound.playClick();
    setCurrentModule(mod);
  };

  const handleIntakeDelete = async (type: 'contact' | 'impact' | 'fellows' | 'volunteers' | 'stories', id: string) => {
    if (!isSuperAdmin) {
      alert('Permission denied. Only Super Admin can delete records.');
      return;
    }
    if (!window.confirm(`Are you sure you want to permanently delete this ${type} record?`)) {
      return;
    }
    sound.playClick();
    const res = await deleteIntakeRecord(type, id);
    if (res.success) {
      sound.playSuccess();
      setFeedbackMsg({ type: 'success', text: `Record [${id}] deleted successfully.` });
    } else {
      setFeedbackMsg({ type: 'error', text: res.error || 'Failed to delete record.' });
    }
  };

  const handleSaveCMS = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSuperAdmin) {
      alert('Only Super Admin can publish CMS updates.');
      return;
    }
    sound.playClick();
    updateCMSContent({
      bannerAlert: {
        text: cmsBannerText,
        enabled: cmsBannerEnabled
      },
      fees: {
        ...cmsContent.fees,
        indianStarting: cmsIndianFee,
        internationalStarting: cmsIntlFee
      }
    });
    sound.playSuccess();
    setFeedbackMsg({ type: 'success', text: 'Website CMS configurations published live.' });
  };

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSuperAdmin) {
      alert('Only Super Admin can publish announcements.');
      return;
    }
    if (!newAnnTitle.trim() || !newAnnMessage.trim()) return;
    sound.playClick();
    addAnnouncement({
      title: newAnnTitle.trim(),
      message: newAnnMessage.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      priority: newAnnPriority,
      audience: 'all',
      status: 'published'
    });
    sound.playSuccess();
    setNewAnnTitle('');
    setNewAnnMessage('');
    setFeedbackMsg({ type: 'success', text: 'Live announcement published across the platform.' });
  };

  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSuperAdmin) {
      alert('Only Super Admin can add schedule items.');
      return;
    }
    if (!newSessionTitle.trim() || !newSessionTime.trim()) return;
    sound.playClick();
    addSession({
      title: newSessionTitle.trim(),
      time: newSessionTime.trim(),
      day: newSessionDay,
      location: newSessionLoc.trim() || 'Main Plenary Hall',
      description: newSessionDesc.trim() || 'Diplomatic session',
      programme: 'all'
    });
    sound.playSuccess();
    setNewSessionTitle('');
    setNewSessionTime('');
    setNewSessionLoc('');
    setNewSessionDesc('');
    setFeedbackMsg({ type: 'success', text: 'Summit schedule session added.' });
  };

  const handleCreateMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSuperAdmin) {
      alert('Only Super Admin can add timeline milestones.');
      return;
    }
    if (!newMileStage.trim() || !newMileTitle.trim()) return;
    sound.playClick();
    addTimelineMilestone({
      stage: newMileStage.trim().toUpperCase(),
      title: newMileTitle.trim(),
      description: newMileDesc.trim() || 'Milestone description',
      date: newMileDate.trim() || 'TO BE ANNOUNCED',
      status: newMileStatus,
      order: (timelineMilestones?.length || 0) + 1,
      visible: true,
      ctaText: newMileCtaText.trim() || undefined,
      ctaUrl: newMileCtaUrl.trim() || undefined
    });
    sound.playSuccess();
    setNewMileStage('');
    setNewMileTitle('');
    setNewMileDesc('');
    setNewMileDate('TO BE ANNOUNCED');
    setNewMileStatus('Upcoming');
    setNewMileCtaText('');
    setNewMileCtaUrl('');
    setFeedbackMsg({ type: 'success', text: 'Road to Delhi milestone added.' });
  };

  // If not authenticated
  if (!isAuthorized) {
    return (
      <div className="max-w-lg mx-auto py-20 px-4">
        <div className="bg-[#120306] border border-[#e51e2b]/40 rounded-3xl p-8 text-center shadow-2xl space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#220409] border border-[#e51e2b]/50 mx-auto flex items-center justify-center text-[#e51e2b] shadow-xl">
            <Shield className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-[#e51e2b]/20 border border-[#e51e2b]/40 text-[#e6c887] text-[10px] font-mono uppercase tracking-widest">
              EXECUTIVE SECRETARIAT CONSOLE
            </span>
            <h2 className="text-2xl font-bold font-display text-white">
              Console Sign In Required
            </h2>
            <p className="text-xs text-[#b8adaa] leading-relaxed max-w-sm mx-auto">
              Please sign in with your <span className="text-[#e6c887] font-semibold">Application ID / Username</span> or <span className="text-[#e6c887] font-semibold">Google Account</span> to access the administration console.
            </p>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              openAuthModal();
            }}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#e51e2b] to-[#990a18] hover:from-[#ff2438] hover:to-[#b30c1d] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-xl shadow-[#e51e2b]/30 flex items-center justify-center gap-2"
          >
            <KeyRound className="w-4 h-4" />
            <span>Open Authentication Console</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Admin Navigation & Status */}
      <div className="bg-[#120306] border border-[#e51e2b]/30 rounded-2xl p-6 mb-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="px-2 py-0.5 rounded bg-[#e51e2b]/20 border border-[#e51e2b]/40 text-[#e51e2b] text-[10px] font-mono font-bold uppercase">
              AUVREO MANAGEMENT CONSOLE
            </span>
            <span className="text-[10px] font-mono text-[#10b981] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
              CONNECTED & VERIFIED
            </span>
            {isSuperAdmin && (
              <span className="px-2 py-0.5 rounded bg-[#e6c887]/20 border border-[#e6c887]/40 text-[#e6c887] text-[10px] font-mono font-bold uppercase">
                SUPER ADMIN PRIVILEGES
              </span>
            )}
            {isStaff && (
              <span className="px-2 py-0.5 rounded bg-blue-500/20 border border-blue-500/40 text-blue-300 text-[10px] font-mono font-bold uppercase">
                SECRETARIAT STAFF (READ-ONLY)
              </span>
            )}
          </div>
          <h1 className="text-2xl font-bold font-display text-white">
            Executive Secretariat Platform
          </h1>
          <p className="text-xs text-[#a89c99] mt-1">
            Signed in as: <span className="text-white font-semibold">{currentUser?.name}</span> ({currentUser?.email || currentUser?.username}) • Role: <span className="text-[#e6c887] font-semibold">{currentUser?.role}</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              logoutUser();
            }}
            className="px-3.5 py-2 rounded-xl bg-[#140306] border border-white/10 text-xs text-[#a89c99] hover:text-white transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Staff Read-Only Banner */}
      {isStaff && !isSuperAdmin && (
        <div className="mb-6 p-4 rounded-2xl bg-[#e6c887]/10 border border-[#e6c887]/30 flex items-center gap-3 text-xs text-[#e6c887]">
          <Shield className="w-5 h-5 shrink-0 text-[#e6c887]" />
          <div>
            <span className="font-bold">Secretariat Staff View (Read-Only Mode)</span>: You have full real-time visibility to monitor all incoming delegate applications, inquiries, impact seed grant submissions, volunteer requests, and schedule items. Adding, editing, status changes, and record deletion are strictly restricted to the Super Admin.
          </div>
        </div>
      )}

      {/* Feedback Alert */}
      {feedbackMsg && (
        <div className={`mb-6 p-4 rounded-2xl border flex items-center justify-between gap-3 text-xs animate-in fade-in duration-200 ${
          feedbackMsg.type === 'success' 
            ? 'bg-[#10b981]/15 border-[#10b981]/40 text-[#10b981]' 
            : 'bg-[#ff4d4d]/15 border-[#ff4d4d]/40 text-[#ff4d4d]'
        }`}>
          <div className="flex items-center gap-2">
            {feedbackMsg.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span className="font-medium">{feedbackMsg.text}</span>
          </div>
          <button 
            onClick={() => setFeedbackMsg(null)} 
            className="text-[10px] uppercase font-mono opacity-70 hover:opacity-100"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Module Selector Bar */}
      <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-white/10 text-xs font-semibold">
        <button
          onClick={() => handleModuleChange('overview')}
          className={`px-3.5 py-2 rounded-xl transition-colors ${
            currentModule === 'overview' ? 'bg-[#e51e2b] text-white' : 'bg-[#140306] text-[#c9bfbc] hover:text-white'
          }`}
        >
          Overview & Metrics
        </button>

        <button
          onClick={() => handleModuleChange('users')}
          className={`px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 ${
            currentModule === 'users' ? 'bg-[#e51e2b] text-white shadow-lg shadow-[#e51e2b]/30' : 'bg-[#140306] text-[#e6c887] border border-[#e6c887]/30 hover:bg-[#20050a]'
          }`}
        >
          <KeyRound className="w-3.5 h-3.5" />
          <span>User IDs & Passwords</span>
        </button>

        <button
          onClick={() => handleModuleChange('intakes')}
          className={`px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 ${
            currentModule === 'intakes' ? 'bg-[#e51e2b] text-white' : 'bg-[#140306] text-[#c9bfbc] hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Form Submissions & Intakes</span>
          <span className="px-1.5 py-0.2 rounded-full bg-[#e6c887] text-black text-[10px] font-bold">
            {contactMessages.length + impactSubmissions.length + fellowApplications.length + volunteerApplications.length}
          </span>
        </button>

        <button
          onClick={() => handleModuleChange('applications')}
          className={`px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 ${
            currentModule === 'applications' ? 'bg-[#e51e2b] text-white' : 'bg-[#140306] text-[#c9bfbc] hover:text-white'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Delegates Dossier</span>
          <span className="px-1.5 py-0.2 rounded-full bg-black/40 text-[10px]">{totalApps}</span>
        </button>

        <button
          onClick={() => handleModuleChange('logs')}
          className={`px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 ${
            currentModule === 'logs' ? 'bg-[#e51e2b] text-white' : 'bg-[#140306] text-[#c9bfbc] hover:text-white'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Server Audit Logs</span>
        </button>

        <button
          onClick={() => handleModuleChange('programmes')}
          className={`px-3.5 py-2 rounded-xl transition-colors ${
            currentModule === 'programmes' ? 'bg-[#e51e2b] text-white' : 'bg-[#140306] text-[#c9bfbc] hover:text-white'
          }`}
        >
          Chambers & Seats
        </button>

        <button
          onClick={() => handleModuleChange('schedule')}
          className={`px-3.5 py-2 rounded-xl transition-colors ${
            currentModule === 'schedule' ? 'bg-[#e51e2b] text-white' : 'bg-[#140306] text-[#c9bfbc] hover:text-white'
          }`}
        >
          Schedule CMS
        </button>

        <button
          onClick={() => handleModuleChange('timeline')}
          className={`px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 ${
            currentModule === 'timeline' ? 'bg-[#e51e2b] text-white' : 'bg-[#140306] text-[#c9bfbc] hover:text-white'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Road to Delhi (Timeline)</span>
        </button>

        <button
          onClick={() => handleModuleChange('announcements')}
          className={`px-3.5 py-2 rounded-xl transition-colors ${
            currentModule === 'announcements' ? 'bg-[#e51e2b] text-white' : 'bg-[#140306] text-[#c9bfbc] hover:text-white'
          }`}
        >
          Live Announcements
        </button>

        <button
          onClick={() => handleModuleChange('cms')}
          className={`px-3.5 py-2 rounded-xl transition-colors text-[#e6c887] ${
            currentModule === 'cms' ? 'bg-[#e6c887]/20 border border-[#e6c887]/40' : 'bg-[#140306] hover:text-white'
          }`}
        >
          Website CMS
        </button>
      </div>

      {/* MODULE: USERS MANAGEMENT */}
      {currentModule === 'users' && (
        <UserManagementPanel />
      )}

      {/* MODULE: OVERVIEW */}
      {currentModule === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="p-4 rounded-xl bg-[#140306] border border-[#e51e2b]/25">
              <span className="text-[10px] font-mono text-[#a89c99] uppercase block">Total Applications</span>
              <div className="text-2xl font-bold font-display text-white mt-1">{totalApps}</div>
              <span className="text-[10px] text-[#e6c887]">Live registry</span>
            </div>

            <div className="p-4 rounded-xl bg-[#140306] border border-[#10b981]/30">
              <span className="text-[10px] font-mono text-[#a89c99] uppercase block">Confirmed</span>
              <div className="text-2xl font-bold font-display text-[#10b981] mt-1">{confirmedApps}</div>
              <span className="text-[10px] text-[#a89c99]">Dossiers cleared</span>
            </div>

            <div className="p-4 rounded-xl bg-[#140306] border border-[#e6c887]/30">
              <span className="text-[10px] font-mono text-[#a89c99] uppercase block">Pending Review</span>
              <div className="text-2xl font-bold font-display text-[#e6c887] mt-1">{pendingApps}</div>
              <span className="text-[10px] text-[#a89c99]">Awaiting board</span>
            </div>

            <div className="p-4 rounded-xl bg-[#140306] border border-[#e51e2b]/25">
              <span className="text-[10px] font-mono text-[#a89c99] uppercase block">Contact Inquiries</span>
              <div className="text-2xl font-bold font-display text-white mt-1">{contactMessages.length}</div>
              <span className="text-[10px] text-[#a89c99]">Direct messages</span>
            </div>

            <div className="p-4 rounded-xl bg-[#140306] border border-[#e51e2b]/25">
              <span className="text-[10px] font-mono text-[#a89c99] uppercase block">Impact Grants</span>
              <div className="text-2xl font-bold font-display text-white mt-1">{impactSubmissions.length}</div>
              <span className="text-[10px] text-[#a89c99]">Project proposals</span>
            </div>

            <div className="p-4 rounded-xl bg-[#140306] border border-[#e51e2b]/25">
              <span className="text-[10px] font-mono text-[#a89c99] uppercase block">Fellows & Volunteers</span>
              <div className="text-2xl font-bold font-display text-[#e51e2b] mt-1">{fellowApplications.length + volunteerApplications.length}</div>
              <span className="text-[10px] text-[#a89c99]">Applications</span>
            </div>
          </div>

          {/* Department Leadership Summary */}
          <div className="bg-[#120306] border border-[#e51e2b]/25 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-white font-display mb-4">
              Executive Secretariat Department Structure
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#170407] border border-white/5">
                <span className="text-[10px] text-[#a89c99] block font-mono">Head of Delegate Affairs</span>
                <span className="font-bold text-white text-sm">Anshika</span>
                <p className="text-[11px] text-[#a89c99] mt-1">Applications vetting & participant services</p>
              </div>

              <div className="p-3 rounded-xl bg-[#170407] border border-white/5">
                <span className="text-[10px] text-[#a89c99] block font-mono">Head of HR & Management</span>
                <span className="font-bold text-white text-sm">Avni</span>
                <p className="text-[11px] text-[#a89c99] mt-1">Staffing, volunteer vetting & duties</p>
              </div>

              <div className="p-3 rounded-xl bg-[#170407] border border-white/5">
                <span className="text-[10px] text-[#a89c99] block font-mono">Head of Organising Comm.</span>
                <span className="font-bold text-white text-sm">Divyam</span>
                <p className="text-[11px] text-[#a89c99] mt-1">Rules of procedure & plenary agenda</p>
              </div>

              <div className="p-3 rounded-xl bg-[#170407] border border-white/5">
                <span className="text-[10px] text-[#a89c99] block font-mono">Head of Social Media</span>
                <span className="font-bold text-white text-sm">Pooja</span>
                <p className="text-[11px] text-[#a89c99] mt-1">Press corps oversight & dispatches</p>
              </div>

              <div className="p-3 rounded-xl bg-[#170407] border border-white/5">
                <span className="text-[10px] text-[#a89c99] block font-mono">Head of Logistics</span>
                <span className="font-bold text-white text-sm">Abhinav</span>
                <p className="text-[11px] text-[#a89c99] mt-1">New Delhi venue & diplomatic hospitality</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE: INTAKES HUB */}
      {currentModule === 'intakes' && (
        <div className="space-y-6">
          {/* Sub-Tabs */}
          <div className="flex flex-wrap gap-2 pb-3 border-b border-white/10 text-xs">
            <button
              onClick={() => {
                sound.playClick();
                setIntakeSubTab('contact');
              }}
              className={`px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 transition-colors ${
                intakeSubTab === 'contact' ? 'bg-[#e51e2b] text-white' : 'bg-[#140306] text-[#a89c99] hover:text-white'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact Messages ({contactMessages.length})</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setIntakeSubTab('impact');
              }}
              className={`px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 transition-colors ${
                intakeSubTab === 'impact' ? 'bg-[#e51e2b] text-white' : 'bg-[#140306] text-[#a89c99] hover:text-white'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Impact Seed Grants ({impactSubmissions.length})</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setIntakeSubTab('fellows');
              }}
              className={`px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 transition-colors ${
                intakeSubTab === 'fellows' ? 'bg-[#e51e2b] text-white' : 'bg-[#140306] text-[#a89c99] hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Diplomatic Fellows ({fellowApplications.length})</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setIntakeSubTab('volunteers');
              }}
              className={`px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 transition-colors ${
                intakeSubTab === 'volunteers' ? 'bg-[#e51e2b] text-white' : 'bg-[#140306] text-[#a89c99] hover:text-white'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Youth Volunteers ({volunteerApplications.length})</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setIntakeSubTab('stories');
              }}
              className={`px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 transition-colors ${
                intakeSubTab === 'stories' ? 'bg-[#e51e2b] text-white' : 'bg-[#140306] text-[#a89c99] hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Perspectives & Stories ({stories.length})</span>
            </button>
          </div>

          {/* CONTACT INQUIRIES SUB-TAB */}
          {intakeSubTab === 'contact' && (
            <div className="bg-[#120306] border border-[#e51e2b]/30 rounded-2xl p-6">
              <h3 className="text-base font-bold text-white font-display mb-1">Inbound Contact Inquiries</h3>
              <p className="text-xs text-[#a89c99] mb-5">Submissions via the Contact & Secretariat Help Desk channel.</p>

              {contactMessages.length === 0 ? (
                <div className="p-8 text-center text-[#a89c99] text-xs">No contact inquiries recorded yet.</div>
              ) : (
                <div className="space-y-4">
                  {contactMessages.map((msg) => (
                    <div key={msg.id} className="p-5 rounded-xl bg-[#180407] border border-white/10 space-y-3 text-xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{msg.fullName}</span>
                          <span className="text-[#e6c887] font-mono text-[11px]">&lt;{msg.email}&gt;</span>
                          <span className="px-2 py-0.5 rounded bg-white/5 text-[#a89c99] font-mono text-[10px]">
                            {msg.category || 'General'}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-[#a89c99]">{msg.submittedAt}</span>
                      </div>

                      <div className="font-semibold text-white">
                        Subject: <span className="text-[#e6c887]">{msg.subject}</span>
                      </div>

                      <p className="text-[#d8cfcb] whitespace-pre-wrap bg-black/40 p-3.5 rounded-xl border border-white/5 leading-relaxed">
                        {msg.message}
                      </p>

                      <div className="pt-3 flex items-center justify-between border-t border-white/5 flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold ${
                            msg.status === 'read' ? 'bg-[#10b981]/20 text-[#10b981]' : 'bg-[#e6c887]/20 text-[#e6c887]'
                          }`}>
                            Status: {msg.status}
                          </span>

                          {isSuperAdmin && (
                            <button
                              onClick={() => {
                                sound.playClick();
                                markContactStatus(msg.id, msg.status === 'read' ? 'unread' : 'read');
                              }}
                              className="text-[11px] text-[#a89c99] hover:text-white underline"
                            >
                              Toggle {msg.status === 'read' ? 'Unread' : 'Read'}
                            </button>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Auvreo Diplomatic Platform')}`}
                            className="px-3 py-1 rounded-lg bg-[#e51e2b] text-white font-bold text-[11px] hover:bg-[#ff2438] transition-colors"
                          >
                            Reply via Email →
                          </a>

                          {isSuperAdmin && (
                            <button
                              onClick={() => handleIntakeDelete('contact', msg.id)}
                              title="Delete inquiry"
                              className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* IMPACT SEED GRANTS SUB-TAB */}
          {intakeSubTab === 'impact' && (
            <div className="bg-[#120306] border border-[#e51e2b]/30 rounded-2xl p-6">
              <h3 className="text-base font-bold text-white font-display mb-1">Impact Seed Grant Proposals</h3>
              <p className="text-xs text-[#a89c99] mb-5">Proposals submitted for the Auvreo Youth Innovation & Diplomatic Seed Fund.</p>

              {impactSubmissions.length === 0 ? (
                <div className="p-8 text-center text-[#a89c99] text-xs">No impact seed grant proposals submitted.</div>
              ) : (
                <div className="space-y-4">
                  {impactSubmissions.map((imp) => (
                    <div key={imp.id} className="p-5 rounded-xl bg-[#180407] border border-white/10 space-y-3 text-xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <span className="font-bold text-white text-sm">{imp.projectTitle}</span>
                          <div className="text-[11px] text-[#e6c887] mt-0.5">
                            Applicant: {imp.applicantName} ({imp.email}) • {imp.organizationOrInstitution || 'Independent'}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-lg bg-[#e51e2b]/20 text-[#e6c887] font-mono text-xs font-bold">
                            Focus: {imp.focusArea}
                          </span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-[#d8cfcb] leading-relaxed">
                        <span className="font-mono text-[10px] text-[#a89c99] uppercase block mb-1">Executive Summary</span>
                        {imp.executiveSummary}
                      </div>

                      <div className="pt-3 flex items-center justify-between border-t border-white/5 flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase font-bold ${
                            imp.status === 'accepted' ? 'bg-[#10b981]/20 text-[#10b981]' :
                            imp.status === 'declined' ? 'bg-red-500/20 text-red-400' :
                            'bg-[#e6c887]/20 text-[#e6c887]'
                          }`}>
                            Status: {imp.status}
                          </span>

                          {isSuperAdmin && (
                            <div className="flex items-center gap-1.5 ml-2">
                              <button
                                onClick={() => {
                                  sound.playSuccess();
                                  updateImpactStatus(imp.id, 'accepted');
                                }}
                                className="px-2 py-0.5 rounded bg-[#10b981]/20 hover:bg-[#10b981]/30 text-[#10b981] text-[10px] font-bold"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => {
                                  sound.playClick();
                                  updateImpactStatus(imp.id, 'under_review');
                                }}
                                className="px-2 py-0.5 rounded bg-[#e6c887]/20 hover:bg-[#e6c887]/30 text-[#e6c887] text-[10px] font-bold"
                              >
                                Review
                              </button>
                              <button
                                onClick={() => {
                                  sound.playClick();
                                  updateImpactStatus(imp.id, 'declined');
                                }}
                                className="px-2 py-0.5 rounded bg-red-500/20 hover:bg-red-500/30 text-red-400 text-[10px] font-bold"
                              >
                                Decline
                              </button>
                            </div>
                          )}
                        </div>

                        {isSuperAdmin && (
                          <button
                            onClick={() => handleIntakeDelete('impact', imp.id)}
                            title="Delete proposal"
                            className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* DIPLOMATIC FELLOWS SUB-TAB */}
          {intakeSubTab === 'fellows' && (
            <div className="bg-[#120306] border border-[#e51e2b]/30 rounded-2xl p-6">
              <h3 className="text-base font-bold text-white font-display mb-1">Diplomatic Research Fellows Applications</h3>
              <p className="text-xs text-[#a89c99] mb-5">Applications for the 2026 Academic Fellowship cohort.</p>

              {fellowApplications.length === 0 ? (
                <div className="p-8 text-center text-[#a89c99] text-xs">No fellowship applications registered.</div>
              ) : (
                <div className="space-y-4">
                  {fellowApplications.map((fel) => (
                    <div key={fel.id} className="p-5 rounded-xl bg-[#180407] border border-white/10 space-y-3 text-xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <span className="font-bold text-white text-sm">{fel.fullName}</span>
                          <span className="text-[#e6c887] font-mono text-[11px] ml-2">({fel.email})</span>
                          <div className="text-[11px] text-[#a89c99] mt-0.5">{fel.institution} • {fel.country}</div>
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-white/5 text-white font-mono text-[10px]">
                          Track: {fel.leadershipTrack}
                        </span>
                      </div>

                      <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-[#d8cfcb] leading-relaxed">
                        <span className="font-mono text-[10px] text-[#a89c99] uppercase block mb-1">Statement of Intent</span>
                        {fel.statementOfIntent}
                      </div>

                      <div className="pt-3 flex items-center justify-between border-t border-white/5 flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase font-bold ${
                            fel.status === 'accepted' ? 'bg-[#10b981]/20 text-[#10b981]' :
                            fel.status === 'declined' ? 'bg-red-500/20 text-red-400' :
                            'bg-[#e6c887]/20 text-[#e6c887]'
                          }`}>
                            Status: {fel.status}
                          </span>

                          {isSuperAdmin && (
                            <div className="flex items-center gap-1.5 ml-2">
                              <button
                                onClick={() => {
                                  sound.playSuccess();
                                  updateFellowStatus(fel.id, 'accepted');
                                }}
                                className="px-2 py-0.5 rounded bg-[#10b981]/20 text-[#10b981] text-[10px] font-bold"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => {
                                  sound.playClick();
                                  updateFellowStatus(fel.id, 'under_review');
                                }}
                                className="px-2 py-0.5 rounded bg-[#e6c887]/20 text-[#e6c887] text-[10px] font-bold"
                              >
                                Review
                              </button>
                              <button
                                onClick={() => {
                                  sound.playClick();
                                  updateFellowStatus(fel.id, 'declined');
                                }}
                                className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 text-[10px] font-bold"
                              >
                                Decline
                              </button>
                            </div>
                          )}
                        </div>

                        {isSuperAdmin && (
                          <button
                            onClick={() => handleIntakeDelete('fellows', fel.id)}
                            title="Delete fellow"
                            className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* YOUTH VOLUNTEERS SUB-TAB */}
          {intakeSubTab === 'volunteers' && (
            <div className="bg-[#120306] border border-[#e51e2b]/30 rounded-2xl p-6">
              <h3 className="text-base font-bold text-white font-display mb-1">Youth Volunteers Submissions</h3>
              <p className="text-xs text-[#a89c99] mb-5">Applications from university students across India and abroad for Secretariat staffing.</p>

              {volunteerApplications.length === 0 ? (
                <div className="p-8 text-center text-[#a89c99] text-xs">No volunteer applications recorded.</div>
              ) : (
                <div className="space-y-4">
                  {volunteerApplications.map((vol) => (
                    <div key={vol.id} className="p-5 rounded-xl bg-[#180407] border border-white/10 space-y-3 text-xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <span className="font-bold text-white text-sm">{vol.fullName}</span>
                          <span className="text-[#e6c887] font-mono text-[11px] ml-2">&lt;{vol.email}&gt;</span>
                          <div className="text-[11px] text-[#a89c99] mt-0.5">Phone: {vol.phone || 'N/A'} • Preferred: <span className="text-white font-semibold">{vol.department}</span></div>
                        </div>
                        <span className="text-[10px] font-mono text-[#a89c99]">{vol.submittedAt}</span>
                      </div>

                      <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-[#d8cfcb] leading-relaxed">
                        <span className="font-mono text-[10px] text-[#a89c99] uppercase block mb-1">Prior Experience & Skill Profile</span>
                        {vol.relevantExperience}
                      </div>

                      <div className="pt-3 flex items-center justify-between border-t border-white/5 flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase font-bold ${
                            vol.status === 'selected' ? 'bg-[#10b981]/20 text-[#10b981]' :
                            vol.status === 'declined' ? 'bg-red-500/20 text-red-400' :
                            'bg-[#e6c887]/20 text-[#e6c887]'
                          }`}>
                            Status: {vol.status}
                          </span>

                          {isSuperAdmin && (
                            <div className="flex items-center gap-1.5 ml-2">
                              <button
                                onClick={() => {
                                  sound.playSuccess();
                                  updateVolunteerAppStatus(vol.id, 'selected');
                                }}
                                className="px-2 py-0.5 rounded bg-[#10b981]/20 text-[#10b981] text-[10px] font-bold"
                              >
                                Select
                              </button>
                              <button
                                onClick={() => {
                                  sound.playClick();
                                  updateVolunteerAppStatus(vol.id, 'declined');
                                }}
                                className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 text-[10px] font-bold"
                              >
                                Decline
                              </button>
                            </div>
                          )}
                        </div>

                        {isSuperAdmin && (
                          <button
                            onClick={() => handleIntakeDelete('volunteers', vol.id)}
                            title="Delete volunteer"
                            className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* PERSPECTIVES & STORIES SUB-TAB */}
          {intakeSubTab === 'stories' && (
            <div className="bg-[#120306] border border-[#e51e2b]/30 rounded-2xl p-6">
              <h3 className="text-base font-bold text-white font-display mb-1">Community Perspectives & Dispatches</h3>
              <p className="text-xs text-[#a89c99] mb-5">Youth thought leadership submissions published to the Auvreo Perspectives archive.</p>

              {stories.length === 0 ? (
                <div className="p-8 text-center text-[#a89c99] text-xs">No community stories submitted yet.</div>
              ) : (
                <div className="space-y-4">
                  {stories.map((st) => (
                    <div key={st.id} className="p-5 rounded-xl bg-[#180407] border border-white/10 space-y-3 text-xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <span className="font-bold text-white text-sm">{st.title}</span>
                          <div className="text-[11px] text-[#e6c887] mt-0.5">Author: {st.author} • {st.category}</div>
                        </div>
                        <span className="text-[10px] font-mono text-[#a89c99]">{st.date}</span>
                      </div>

                      <p className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-[#d8cfcb] leading-relaxed line-clamp-3">
                        {st.excerpt}
                      </p>

                      {isSuperAdmin && (
                        <div className="pt-3 flex items-center justify-end border-t border-white/5">
                          <button
                            onClick={() => handleIntakeDelete('stories', st.id)}
                            title="Delete story"
                            className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* MODULE: AUDIT LOGS */}
      {currentModule === 'logs' && (
        <div className="bg-[#120306] border border-[#e51e2b]/30 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white font-display">System Audit Logs</h3>
              <p className="text-xs text-[#a89c99]">Real server security operations and event trail.</p>
            </div>
            <span className="text-xs font-mono text-[#e6c887]">{auditLogs.length} Events</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#180407] text-[#a89c99] uppercase tracking-wider text-[10px] font-mono border-b border-white/5">
                <tr>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Action</th>
                  <th className="p-3">Admin / Identity</th>
                  <th className="p-3">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {auditLogs.map((log: any) => (
                  <tr key={log.id} className="hover:bg-white/5">
                    <td className="p-3 font-mono text-[#a89c99] text-[11px] whitespace-nowrap">
                      {log.timestamp}
                    </td>
                    <td className="p-3 font-bold text-[#e6c887]">{log.action}</td>
                    <td className="p-3 text-white font-mono text-[11px]">{log.adminName || log.user}</td>
                    <td className="p-3 text-[#b8adaa] font-mono text-[11px]">
                      {typeof log.details === 'object' ? JSON.stringify(log.details) : log.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODULE: APPLICATIONS DOSSIER */}
      {currentModule === 'applications' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#a89c99] absolute left-3 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search by delegate name, email, ID, or country..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#140306] border border-[#e51e2b]/30 text-white text-xs focus:outline-none focus:border-[#e51e2b]"
              />
            </div>

            <select
              value={programmeFilter}
              onChange={e => setProgrammeFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#140306] border border-[#e51e2b]/30 text-white text-xs focus:outline-none"
            >
              <option value="all">All Councils</option>
              <option value="aippm">AIPPM</option>
              <option value="uncsw">UNCSW</option>
              <option value="international-press">Press Corps</option>
            </select>

            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#140306] border border-[#e51e2b]/30 text-white text-xs focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="submitted">Submitted</option>
              <option value="under-review">Under Review</option>
              <option value="confirmed">Confirmed</option>
              <option value="waitlist">Waitlist</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="bg-[#120306] border border-[#e51e2b]/25 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#180407] text-[#a89c99] uppercase tracking-wider text-[10px] font-mono border-b border-white/5">
                  <tr>
                    <th className="p-3.5">Delegate ID</th>
                    <th className="p-3.5">Candidate Name</th>
                    <th className="p-3.5">Assigned Council</th>
                    <th className="p-3.5">Portfolio / Seat</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredApps.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-[#a89c99]">
                        No matching delegate applications found.
                      </td>
                    </tr>
                  ) : (
                    filteredApps.map((app) => (
                      <tr key={app.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-3.5 font-mono text-[#e6c887] font-bold">{app.id}</td>
                        <td className="p-3.5">
                          <div className="font-bold text-white">{app.fullName}</div>
                          <div className="text-[10px] text-[#a89c99]">{app.email}</div>
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 uppercase font-mono text-[10px]">
                            {app.programme}
                          </span>
                        </td>
                        <td className="p-3.5 text-[#ded3cf]">
                          {app.assignedSeat || 'General Matrix'}
                        </td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold ${
                            app.status === 'confirmed' ? 'bg-[#10b981]/20 text-[#10b981]' :
                            app.status === 'under-review' ? 'bg-[#e6c887]/20 text-[#e6c887]' :
                            app.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                            'bg-white/10 text-white'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => {
                              sound.playClearance();
                              setSelectedAppDossier(app.id);
                            }}
                            className="px-2.5 py-1 rounded bg-[#1f0509] border border-[#e51e2b]/30 text-white hover:bg-[#e51e2b] text-[11px] font-medium transition-colors"
                          >
                            Inspect Dossier
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODULE: PROGRAMMES & SEATS */}
      {currentModule === 'programmes' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROGRAMMES.map(p => (
            <div key={p.id} className="p-6 rounded-2xl bg-[#140306] border border-[#e51e2b]/30 space-y-4">
              <span className="px-2.5 py-1 rounded bg-[#e51e2b]/20 text-[#e51e2b] font-mono text-xs font-bold uppercase">
                {p.shortName}
              </span>
              <h3 className="text-lg font-bold font-display text-white">{p.name}</h3>
              <p className="text-xs text-[#a89c99] leading-relaxed">{p.agendaOverview}</p>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-[#a89c99]">Seats Capacity:</span>
                <span className="text-[#e6c887] font-bold">{p.targetSeats} Delegates</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODULE: SCHEDULE CMS */}
      {currentModule === 'schedule' && (
        <div className="space-y-6">
          {isSuperAdmin && (
            <div className="bg-[#120306] border border-[#e51e2b]/30 rounded-2xl p-6">
              <h3 className="text-base font-bold text-white font-display mb-4">Add Summit Schedule Event</h3>
              <form onSubmit={handleCreateSession} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Session Title (e.g. Inaugural Plenary)"
                  value={newSessionTitle}
                  onChange={e => setNewSessionTitle(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-[#1b0509] border border-white/10 text-white text-xs"
                />
                <input
                  type="text"
                  required
                  placeholder="Time (e.g. 09:30 AM - 11:00 AM)"
                  value={newSessionTime}
                  onChange={e => setNewSessionTime(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-[#1b0509] border border-white/10 text-white text-xs"
                />
                <select
                  value={newSessionDay}
                  onChange={e => setNewSessionDay(e.target.value as any)}
                  className="px-4 py-2.5 rounded-xl bg-[#1b0509] border border-white/10 text-white text-xs"
                >
                  <option value="day-1">Day 1: Dec 19, 2026</option>
                  <option value="day-2">Day 2: Dec 20, 2026</option>
                </select>
                <input
                  type="text"
                  placeholder="Location / Room"
                  value={newSessionLoc}
                  onChange={e => setNewSessionLoc(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-[#1b0509] border border-white/10 text-white text-xs"
                />
                <button
                  type="submit"
                  className="col-span-full py-2.5 px-4 rounded-xl bg-[#e51e2b] hover:bg-[#ff2438] text-white font-bold text-xs uppercase"
                >
                  Add Event to Schedule
                </button>
              </form>
            </div>
          )}

          <div className="space-y-3">
            {sessions.map(s => (
              <div key={s.id} className="p-4 rounded-xl bg-[#140306] border border-white/10 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white text-sm">{s.title}</div>
                  <div className="text-[11px] text-[#e6c887]">{s.time} • {s.location} • {s.day.toUpperCase()}</div>
                </div>
                {isSuperAdmin && (
                  <button
                    onClick={() => {
                      sound.playClick();
                      deleteSession(s.id);
                    }}
                    className="p-1.5 rounded text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE: ROAD TO DELHI TIMELINE CMS */}
      {currentModule === 'timeline' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#120306] border border-[#e51e2b]/30 rounded-2xl p-6">
            <div>
              <h3 className="text-base font-bold text-white font-display">Road to Delhi — Summit Milestones CMS</h3>
              <p className="text-xs text-[#a89c99] mt-0.5">
                Manage timeline progression stages, public statuses, date communications, and CTAs displayed on the public India 2026 Summit Page.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#e6c887]/20 border border-[#e6c887]/40 text-[#e6c887] text-xs font-mono font-bold shrink-0">
              {timelineMilestones?.length || 0} Stages Configured
            </span>
          </div>

          {isSuperAdmin && (
            <div className="bg-[#120306] border border-[#e51e2b]/30 rounded-2xl p-6 space-y-4">
              <h4 className="text-sm font-bold text-white font-display">Add New Progression Milestone</h4>
              <form onSubmit={handleCreateMilestone} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-[#e6c887] uppercase mb-1">Stage Code / Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. APPLICATIONS or ARRIVAL"
                      value={newMileStage}
                      onChange={e => setNewMileStage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b0509] border border-white/10 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-[#e6c887] uppercase mb-1">Milestone Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Delegate & Press Applications Open"
                      value={newMileTitle}
                      onChange={e => setNewMileTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b0509] border border-white/10 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-[#e6c887] uppercase mb-1">Date / Period Display</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. OPEN NOW or DECEMBER 2026"
                      value={newMileDate}
                      onChange={e => setNewMileDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b0509] border border-white/10 text-white text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-[#e6c887] uppercase mb-1">Milestone Description</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Brief description of what occurs during this phase..."
                    value={newMileDesc}
                    onChange={e => setNewMileDesc(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#1b0509] border border-white/10 text-white text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                  <div>
                    <label className="block text-[10px] font-mono text-[#e6c887] uppercase mb-1">Status Badge</label>
                    <select
                      value={newMileStatus}
                      onChange={e => setNewMileStatus(e.target.value as TimelineStatus)}
                      className="w-full px-3 py-2 rounded-xl bg-[#1b0509] border border-white/10 text-white text-xs"
                    >
                      <option value="Upcoming">Upcoming</option>
                      <option value="Open">Open</option>
                      <option value="Closing Soon">Closing Soon</option>
                      <option value="Closed">Closed</option>
                      <option value="Completed">Completed</option>
                      <option value="To Be Announced">To Be Announced</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-[#e6c887] uppercase mb-1">Optional CTA Button Text</label>
                    <input
                      type="text"
                      placeholder="e.g. Apply Now"
                      value={newMileCtaText}
                      onChange={e => setNewMileCtaText(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#1b0509] border border-white/10 text-white text-xs"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 rounded-xl bg-[#e51e2b] hover:bg-[#ff2438] text-white font-bold text-xs uppercase tracking-wider"
                    >
                      Add Timeline Milestone
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Timeline Milestones Table / List */}
          <div className="space-y-3">
            {(timelineMilestones || []).map((m, idx) => (
              <div 
                key={m.id} 
                className={`p-5 rounded-2xl bg-[#140306] border transition-all text-xs space-y-3 ${
                  m.visible !== false ? 'border-white/10' : 'border-white/5 opacity-60'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#1e0509] border border-[#e51e2b]/40 text-[#e6c887] font-mono font-bold flex items-center justify-center text-[10px]">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] uppercase font-bold text-[#e6c887]">{m.stage}</span>
                        <span className="text-white font-bold text-sm">{m.title}</span>
                      </div>
                      <p className="text-[#a89c99] mt-0.5">{m.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 flex-wrap">
                    <span className="font-mono text-[11px] text-[#e6c887] px-2.5 py-1 rounded bg-[#1e0408] border border-white/5">
                      {m.date}
                    </span>

                    {isSuperAdmin ? (
                      <select
                        value={m.status}
                        onChange={e => {
                          sound.playClick();
                          updateTimelineMilestone(m.id, { status: e.target.value as TimelineStatus });
                        }}
                        className="px-2.5 py-1 rounded-lg bg-[#1b0509] border border-white/20 text-white font-mono text-[10px] font-bold"
                      >
                        <option value="Upcoming">Upcoming</option>
                        <option value="Open">Open</option>
                        <option value="Closing Soon">Closing Soon</option>
                        <option value="Closed">Closed</option>
                        <option value="Completed">Completed</option>
                        <option value="To Be Announced">To Be Announced</option>
                      </select>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase font-bold bg-[#e6c887]/20 text-[#e6c887]">
                        {m.status}
                      </span>
                    )}

                    {isSuperAdmin && (
                      <button
                        onClick={() => {
                          sound.playClick();
                          updateTimelineMilestone(m.id, { visible: m.visible === false ? true : false });
                        }}
                        title={m.visible !== false ? "Hide on public summit page" : "Show on public summit page"}
                        className={`p-1.5 rounded-lg border text-[10px] font-mono ${
                          m.visible !== false ? 'bg-[#10b981]/15 text-[#10b981] border-[#10b981]/30' : 'bg-white/5 text-[#a89c99] border-white/10'
                        }`}
                      >
                        {m.visible !== false ? 'Live' : 'Hidden'}
                      </button>
                    )}

                    {isSuperAdmin && (
                      <button
                        onClick={() => {
                          sound.playClick();
                          deleteTimelineMilestone(m.id);
                        }}
                        title="Delete milestone"
                        className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE: ANNOUNCEMENTS */}
      {currentModule === 'announcements' && (
        <div className="space-y-6">
          {isSuperAdmin && (
            <div className="bg-[#120306] border border-[#e51e2b]/30 rounded-2xl p-6">
              <h3 className="text-base font-bold text-white font-display mb-4">Publish Real-Time Dispatch</h3>
              <form onSubmit={handleCreateAnnouncement} className="space-y-4">
                <input
                  type="text"
                  required
                  placeholder="Announcement Title"
                  value={newAnnTitle}
                  onChange={e => setNewAnnTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#1b0509] border border-white/10 text-white text-xs"
                />
                <textarea
                  required
                  rows={3}
                  placeholder="Official Secretariat communique details..."
                  value={newAnnMessage}
                  onChange={e => setNewAnnMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#1b0509] border border-white/10 text-white text-xs"
                />
                <div className="flex items-center justify-between">
                  <select
                    value={newAnnPriority}
                    onChange={e => setNewAnnPriority(e.target.value as any)}
                    className="px-3 py-2 rounded-xl bg-[#1b0509] border border-white/10 text-white text-xs"
                  >
                    <option value="normal">Standard Priority</option>
                    <option value="important">Important Bulletin</option>
                    <option value="urgent">Urgent Secretariat Notice</option>
                  </select>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#e51e2b] hover:bg-[#ff2438] text-white font-bold text-xs uppercase tracking-wider"
                  >
                    Broadcast Announcement
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="space-y-3">
            {announcements.map(ann => (
              <div key={ann.id} className="p-4 rounded-xl bg-[#140306] border border-white/10 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white text-sm">{ann.title}</div>
                  <p className="text-[#a89c99] mt-0.5">{ann.message}</p>
                  <span className="text-[10px] font-mono text-[#e6c887] mt-1 block">{ann.date}</span>
                </div>
                {isSuperAdmin && (
                  <button
                    onClick={() => {
                      sound.playClick();
                      deleteAnnouncement(ann.id);
                    }}
                    className="p-1.5 rounded text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE: CMS */}
      {currentModule === 'cms' && (
        <div className="bg-[#120306] border border-[#e51e2b]/30 rounded-2xl p-6">
          <h3 className="text-base font-bold text-white font-display mb-1">Global Website CMS Controls</h3>
          <p className="text-xs text-[#a89c99] mb-6">Modify platform alerts, delegate fee structures, and institutional copy.</p>

          <form onSubmit={handleSaveCMS} className="space-y-6 max-w-xl text-xs">
            <div>
              <label className="block text-[#e6c887] font-mono uppercase text-[11px] mb-2">
                Emergency Top Banner Alert
              </label>
              <input
                type="text"
                disabled={!isSuperAdmin}
                value={cmsBannerText}
                onChange={e => setCmsBannerText(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#1b0509] border border-white/10 text-white text-xs disabled:opacity-50"
              />
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  id="enableBanner"
                  disabled={!isSuperAdmin}
                  checked={cmsBannerEnabled}
                  onChange={e => setCmsBannerEnabled(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="enableBanner" className="text-[#a89c99]">Display banner alert on all public pages</label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[#e6c887] font-mono uppercase text-[11px] mb-2">
                  Indian Delegate Delegate Fee
                </label>
                <input
                  type="number"
                  disabled={!isSuperAdmin}
                  value={cmsIndianFee}
                  onChange={e => setCmsIndianFee(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#1b0509] border border-white/10 text-white text-xs disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-[#e6c887] font-mono uppercase text-[11px] mb-2">
                  International Delegate Fee (USD)
                </label>
                <input
                  type="number"
                  disabled={!isSuperAdmin}
                  value={cmsIntlFee}
                  onChange={e => setCmsIntlFee(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#1b0509] border border-white/10 text-white text-xs disabled:opacity-50"
                />
              </div>
            </div>

            {isSuperAdmin ? (
              <button
                type="submit"
                className="py-3 px-6 rounded-xl bg-[#e51e2b] hover:bg-[#ff2438] text-white font-bold uppercase tracking-wider text-xs shadow-lg shadow-[#e51e2b]/30"
              >
                Publish CMS Updates Live
              </button>
            ) : (
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[#a89c99] text-xs">
                CMS editing is locked for Secretariat Staff. Contact Super Admin to publish content modifications.
              </div>
            )}
          </form>
        </div>
      )}

      {/* DOSSIER MODAL */}
      {dossierApp && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-4 sm:p-6 flex items-center justify-center animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#140306] border border-[#e51e2b]/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-xs space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="font-mono text-[#e6c887] text-[10px] uppercase block">DELEGATE DOSSIER INSPECTOR</span>
                <h3 className="text-xl font-bold font-display text-white">{dossierApp.fullName}</h3>
                <span className="text-xs text-[#a89c99]">{dossierApp.id} • {dossierApp.email}</span>
              </div>
              <button
                onClick={() => setSelectedAppDossier(null)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-[#a89c99] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-[10px] font-mono text-[#a89c99] block uppercase">Country</span>
                <span className="font-bold text-white">{dossierApp.country}</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-[10px] font-mono text-[#a89c99] block uppercase">Council</span>
                <span className="font-bold text-white uppercase">{dossierApp.programme}</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-[10px] font-mono text-[#a89c99] block uppercase">Institution</span>
                <span className="font-bold text-white">{dossierApp.institution}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
              <span className="text-[10px] font-mono text-[#e6c887] uppercase block">Delegate Motivation & Experience</span>
              <div className="text-[#ded3cf] leading-relaxed">{dossierApp.motivation || dossierApp.experience || 'Standard diplomatic profile.'}</div>
            </div>

            {/* Status Modification Controls (Super Admin Only) */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[#a89c99]">Current Status:</span>
                <span className={`px-2.5 py-0.5 rounded-full font-mono font-bold uppercase text-[10px] ${
                  dossierApp.status === 'confirmed' ? 'bg-[#10b981]/20 text-[#10b981]' :
                  dossierApp.status === 'under-review' ? 'bg-[#e6c887]/20 text-[#e6c887]' :
                  'bg-white/10 text-white'
                }`}>
                  {dossierApp.status}
                </span>
              </div>

              {isSuperAdmin ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      sound.playSuccess();
                      updateApplicationStatus(dossierApp.id, 'confirmed');
                      setSelectedAppDossier(null);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#10b981] hover:bg-[#15c58c] text-white font-bold text-xs"
                  >
                    Confirm Delegate
                  </button>
                  <button
                    onClick={() => {
                      sound.playClick();
                      updateApplicationStatus(dossierApp.id, 'under-review');
                      setSelectedAppDossier(null);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#e6c887] hover:bg-[#f0d69f] text-black font-bold text-xs"
                  >
                    Set Under Review
                  </button>
                  <button
                    onClick={() => {
                      sound.playClick();
                      updateApplicationStatus(dossierApp.id, 'rejected');
                      setSelectedAppDossier(null);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs"
                  >
                    Reject
                  </button>
                </div>
              ) : (
                <span className="text-[11px] text-[#a89c99] italic">
                  Status changes restricted to Super Admin
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
