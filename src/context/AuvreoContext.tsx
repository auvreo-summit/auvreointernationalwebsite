import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  DelegateApplication, 
  ProgrammeType, 
  Announcement, 
  SummitSession, 
  Story, 
  VolunteerRequest, 
  DocumentResource,
  CMSContent,
  AdminUser,
  PaymentSubmission,
  ImpactSubmission,
  FellowApplication,
  VolunteerApplication,
  ContactMessage,
  AuditLog,
  UserAccount,
  TimelineMilestone,
  RegistrationStatus
} from '../types';
import { 
  INITIAL_APPLICATIONS, 
  INITIAL_CMS_CONTENT, 
  ANNOUNCEMENTS, 
  SUMMIT_SESSIONS, 
  STORIES, 
  VOLUNTEER_REQUESTS, 
  DOCUMENTS, 
  ADMIN_USERS,
  INITIAL_PAYMENTS,
  INITIAL_IMPACT_SUBMISSIONS,
  INITIAL_FELLOW_APPLICATIONS,
  INITIAL_VOLUNTEER_APPLICATIONS,
  INITIAL_CONTACT_MESSAGES,
  INITIAL_AUDIT_LOGS,
  INITIAL_USERS,
  INITIAL_TIMELINE_MILESTONES
} from '../data/mockData';

interface AuvreoContextType {
  // Navigation & Routing
  currentRoute: string;
  navigateTo: (route: string) => void;
  
  // Applications
  applications: DelegateApplication[];
  addApplication: (newApp: Omit<DelegateApplication, 'id' | 'createdAt' | 'status'>) => DelegateApplication;
  updateApplicationStatus: (id: string, status: DelegateApplication['status'], reviewNotes?: string, assignedSeat?: string) => void;
  updateApplicationProgramme: (id: string, programme: ProgrammeType) => void;

  // Payments & Verification
  payments: PaymentSubmission[];
  submitPayment: (payment: Omit<PaymentSubmission, 'id' | 'status' | 'submittedAt'>) => PaymentSubmission;
  reviewPayment: (
    paymentId: string, 
    action: 'approve' | 'reject' | 'request_info', 
    note?: string
  ) => void;

  // Impact Submissions
  impactSubmissions: ImpactSubmission[];
  addImpactSubmission: (submission: Omit<ImpactSubmission, 'id' | 'status' | 'submittedAt'>) => ImpactSubmission;
  updateImpactStatus: (id: string, status: ImpactSubmission['status'], reviewNotes?: string) => void;

  // Fellow Applications
  fellowApplications: FellowApplication[];
  addFellowApplication: (application: Omit<FellowApplication, 'id' | 'status' | 'submittedAt'>) => FellowApplication;
  updateFellowStatus: (id: string, status: FellowApplication['status']) => void;

  // Volunteer Applications
  volunteerApplications: VolunteerApplication[];
  addVolunteerApplication: (app: Omit<VolunteerApplication, 'id' | 'status' | 'submittedAt'>) => VolunteerApplication;
  updateVolunteerAppStatus: (id: string, status: VolunteerApplication['status']) => void;

  // Contact Messages
  contactMessages: ContactMessage[];
  addContactMessage: (msg: Omit<ContactMessage, 'id' | 'status' | 'submittedAt'>) => ContactMessage;
  markContactStatus: (id: string, status: ContactMessage['status']) => void;

  // Audit Logs
  auditLogs: AuditLog[];
  addAuditLog: (action: string, details: string) => void;

  // Authentication & Credentials
  currentUser: UserAccount | null;
  users: UserAccount[];
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  loginWithCredentials: (usernameOrId: string, password: string) => Promise<{ success: boolean; error?: string }>;
  registerAccountRequest: (data: { name: string; username: string; email: string; password: string; role?: any; department?: string; institution?: string; country?: string; requestNote?: string }) => Promise<{ success: boolean; message?: string; error?: string; user?: any }>;
  approveUserAccount: (id: string, role?: any, department?: string) => Promise<{ success: boolean; error?: string; user?: UserAccount }>;
  declineUserAccount: (id: string) => Promise<{ success: boolean; error?: string }>;
  createUserAccount: (user: { id?: string; username: string; password: string; name: string; email?: string; role: any; department?: string; institution?: string; country?: string }) => Promise<{ success: boolean; user?: UserAccount; error?: string }>;
  updateUserAccount: (id: string, updates: Partial<UserAccount>) => Promise<{ success: boolean; error?: string }>;
  deleteUserAccount: (id: string) => Promise<{ success: boolean; error?: string }>;
  deleteIntakeRecord: (type: 'contact' | 'impact' | 'fellows' | 'volunteers' | 'stories', id: string) => Promise<{ success: boolean; error?: string }>;
  refreshUsers: () => Promise<void>;
  logoutUser: () => void;

  // Active Authenticated Delegate / Participant
  activeParticipant: DelegateApplication | null;
  setActiveParticipant: (participant: DelegateApplication | null) => void;
  loginAsParticipant: (emailOrId: string) => boolean;
  logoutParticipant: () => void;

  // Active Admin
  currentAdmin: AdminUser;
  setCurrentAdmin: (admin: AdminUser) => void;
  isAdminMode: boolean;
  setIsAdminMode: (active: boolean) => void;

  // CMS & Announcements
  cmsContent: CMSContent;
  updateCMSContent: (newContent: Partial<CMSContent>) => void;
  announcements: Announcement[];
  addAnnouncement: (announcement: Omit<Announcement, 'id'>) => void;
  deleteAnnouncement: (id: string) => void;

  // Timeline / Road to Delhi (Admin-Manageable)
  timelineMilestones: TimelineMilestone[];
  addTimelineMilestone: (milestone: Omit<TimelineMilestone, 'id'>) => void;
  updateTimelineMilestone: (id: string, updates: Partial<TimelineMilestone>) => void;
  deleteTimelineMilestone: (id: string) => void;
  reorderTimelineMilestones: (milestones: TimelineMilestone[]) => void;

  // Schedules
  sessions: SummitSession[];
  addSession: (session: Omit<SummitSession, 'id'>) => void;
  deleteSession: (id: string) => void;

  // Documents
  documents: DocumentResource[];
  addDocument: (doc: Omit<DocumentResource, 'id'>) => void;
  deleteDocument: (id: string) => void;

  // Volunteer Requests (CMS postings)
  volunteerRequests: VolunteerRequest[];
  addVolunteerRequest: (req: Omit<VolunteerRequest, 'id'>) => void;
  updateVolunteerStatus: (id: string, status: VolunteerRequest['status']) => void;

  // Stories
  stories: Story[];
  addStory: (story: Omit<Story, 'id'>) => void;

  // Global Registration Modal / Drawer & Status
  registrationStatus: RegistrationStatus;
  isApplyModalOpen: boolean;
  openApplyModal: (preselectedProgramme?: ProgrammeType) => void;
  closeApplyModal: () => void;
  preselectedProgramme?: ProgrammeType;
}

const AuvreoContext = createContext<AuvreoContextType | undefined>(undefined);

const APPS_STORAGE_KEY = 'auvreo_applications_v3';
const CMS_STORAGE_KEY = 'auvreo_cms_v3';
const PAYMENTS_STORAGE_KEY = 'auvreo_payments_v3';
const IMPACT_STORAGE_KEY = 'auvreo_impact_v3';
const FELLOWS_STORAGE_KEY = 'auvreo_fellows_v3';
const VOL_APPS_STORAGE_KEY = 'auvreo_volapps_v3';
const CONTACT_STORAGE_KEY = 'auvreo_contact_v3';
const AUDIT_STORAGE_KEY = 'auvreo_audit_v3';
const TIMELINE_STORAGE_KEY = 'auvreo_timeline_v1';

const getInitialRoute = (): string => {
  if (typeof window === 'undefined') return 'home';
  const hash = window.location.hash.replace(/^#\/?/, '');
  if (hash) return hash;
  return 'home';
};

export const AuvreoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<string>(getInitialRoute);
  
  // Applications state with local storage
  const [applications, setApplications] = useState<DelegateApplication[]>(() => {
    try {
      const saved = localStorage.getItem(APPS_STORAGE_KEY);
      if (saved) {
        const parsed: DelegateApplication[] = JSON.parse(saved);
        // filter out legacy dummy records if any
        return parsed.filter(a => !a.id.startsWith('AUV-2026-100') && a.fullName !== 'Elena Rostova' && a.fullName !== 'Aryavrat Sharma');
      }
    } catch {
      // ignore
    }
    return INITIAL_APPLICATIONS;
  });

  // CMS state with local storage
  const [cmsContent, setCmsContent] = useState<CMSContent>(() => {
    try {
      const saved = localStorage.getItem(CMS_STORAGE_KEY);
      if (saved) {
        const parsed: CMSContent = JSON.parse(saved);
        if (parsed?.fees?.internationalStarting === 25) {
          parsed.fees.internationalStarting = 35;
        }
        return {
          ...INITIAL_CMS_CONTENT,
          ...parsed,
          fees: {
            ...INITIAL_CMS_CONTENT.fees,
            ...parsed.fees,
            internationalStarting: parsed?.fees?.internationalStarting === 25 ? 35 : (parsed?.fees?.internationalStarting || 35)
          }
        };
      }
    } catch {
      // ignore
    }
    return INITIAL_CMS_CONTENT;
  });

  // Payments verification queue
  const [payments, setPayments] = useState<PaymentSubmission[]>(() => {
    try {
      const saved = localStorage.getItem(PAYMENTS_STORAGE_KEY);
      if (saved) {
        const parsed: PaymentSubmission[] = JSON.parse(saved);
        return parsed.filter(p => !p.id.startsWith('PAY-2026-90'));
      }
    } catch {
      // ignore
    }
    return INITIAL_PAYMENTS;
  });

  // Impact proposals
  const [impactSubmissions, setImpactSubmissions] = useState<ImpactSubmission[]>(() => {
    try {
      const saved = localStorage.getItem(IMPACT_STORAGE_KEY);
      if (saved) {
        const parsed: ImpactSubmission[] = JSON.parse(saved);
        return parsed.filter(i => !i.id.startsWith('IMP-2026-0'));
      }
    } catch {
      // ignore
    }
    return INITIAL_IMPACT_SUBMISSIONS;
  });

  // Fellow applications
  const [fellowApplications, setFellowApplications] = useState<FellowApplication[]>(() => {
    try {
      const saved = localStorage.getItem(FELLOWS_STORAGE_KEY);
      if (saved) {
        const parsed: FellowApplication[] = JSON.parse(saved);
        return parsed.filter(f => !f.id.startsWith('FEL-2026-0'));
      }
    } catch {
      // ignore
    }
    return INITIAL_FELLOW_APPLICATIONS;
  });

  // Volunteer applications
  const [volunteerApplications, setVolunteerApplications] = useState<VolunteerApplication[]>(() => {
    try {
      const saved = localStorage.getItem(VOL_APPS_STORAGE_KEY);
      if (saved) {
        const parsed: VolunteerApplication[] = JSON.parse(saved);
        return parsed.filter(v => !v.id.startsWith('VOL-APP-0'));
      }
    } catch {
      // ignore
    }
    return INITIAL_VOLUNTEER_APPLICATIONS;
  });

  // Contact messages
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => {
    try {
      const saved = localStorage.getItem(CONTACT_STORAGE_KEY);
      if (saved) {
        const parsed: ContactMessage[] = JSON.parse(saved);
        return parsed.filter(m => !m.id.startsWith('MSG-2026-0'));
      }
    } catch {
      // ignore
    }
    return INITIAL_CONTACT_MESSAGES;
  });

  // Audit logs
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    try {
      const saved = localStorage.getItem(AUDIT_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_AUDIT_LOGS;
  });

  // Users & Auth (No fake sessions by default)
  const [users, setUsers] = useState<UserAccount[]>(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);

  // Data collections
  const [announcements, setAnnouncements] = useState<Announcement[]>(ANNOUNCEMENTS);
  const [sessions, setSessions] = useState<SummitSession[]>(SUMMIT_SESSIONS);
  const [documents, setDocuments] = useState<DocumentResource[]>(DOCUMENTS);
  const [volunteerRequests, setVolunteerRequests] = useState<VolunteerRequest[]>(VOLUNTEER_REQUESTS);
  const [stories, setStories] = useState<Story[]>(STORIES);
  const [timelineMilestones, setTimelineMilestones] = useState<TimelineMilestone[]>(() => {
    try {
      const saved = localStorage.getItem(TIMELINE_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_TIMELINE_MILESTONES;
  });

  // Active delegate session (null until real login)
  const [activeParticipant, setActiveParticipant] = useState<DelegateApplication | null>(null);
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser>(ADMIN_USERS[0]);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);

  // Modals & Registration Status
  const [registrationStatus] = useState<RegistrationStatus>('coming_soon');
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [preselectedProgramme, setPreselectedProgramme] = useState<ProgrammeType | undefined>(undefined);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  // Sync browser back/forward buttons and hash/path changes
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (hash && hash !== '') {
        setCurrentRoute(hash);
      } else {
        setCurrentRoute('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Validate server token on initialization
  useEffect(() => {
    try {
      const token = localStorage.getItem('auvreo_auth_token');
      if (token) {
        fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(res => res.json())
          .then(data => {
            if (data.authenticated && data.user) {
              setCurrentUser(data.user);
              if (data.user.role === 'super_admin') {
                setIsAdminMode(true);
              }
              refreshUsers();
            } else {
              localStorage.removeItem('auvreo_auth_token');
              setCurrentUser(null);
              setIsAdminMode(false);
            }
          })
          .catch(() => {
            // offline or dev mode fallback
          });
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist items
  useEffect(() => {
    try {
      localStorage.setItem(APPS_STORAGE_KEY, JSON.stringify(applications));
      localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(cmsContent));
      localStorage.setItem(PAYMENTS_STORAGE_KEY, JSON.stringify(payments));
      localStorage.setItem(IMPACT_STORAGE_KEY, JSON.stringify(impactSubmissions));
      localStorage.setItem(FELLOWS_STORAGE_KEY, JSON.stringify(fellowApplications));
      localStorage.setItem(VOL_APPS_STORAGE_KEY, JSON.stringify(volunteerApplications));
      localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(contactMessages));
      localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(auditLogs));
    } catch {
      // ignore
    }
  }, [applications, cmsContent, payments, impactSubmissions, fellowApplications, volunteerApplications, contactMessages, auditLogs]);

  const addAuditLog = (action: string, details: string) => {
    const newLog: AuditLog = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
      adminName: currentAdmin.name,
      action,
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const navigateTo = (route: string) => {
    setCurrentRoute(route);
    if (typeof window !== 'undefined') {
      if (route === 'home') {
        window.history.pushState(null, '', '/');
      } else {
        window.history.pushState(null, '', `#${route}`);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addApplication = (newApp: Omit<DelegateApplication, 'id' | 'createdAt' | 'status'>): DelegateApplication => {
    if (registrationStatus !== 'open') {
      throw new Error("Applications for Auvreo International Youth Summit — India 2026 are not currently open.");
    }
    const randomId = Math.floor(1000 + Math.random() * 9000);
    const createdApp: DelegateApplication = {
      ...newApp,
      id: `AUV-2026-${randomId}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'payment_under_verification',
      paymentStatus: 'under_verification'
    };

    setApplications(prev => [createdApp, ...prev]);
    setActiveParticipant(createdApp);
    addAuditLog('Application Created', `New registration submitted: ${createdApp.fullName} (${createdApp.id}) for ${createdApp.programme}.`);
    return createdApp;
  };

  const updateApplicationStatus = (
    id: string, 
    status: DelegateApplication['status'], 
    reviewNotes?: string, 
    assignedSeat?: string
  ) => {
    setApplications(prev => prev.map(app => {
      if (app.id === id) {
        return {
          ...app,
          status,
          ...(reviewNotes !== undefined ? { reviewNotes } : {}),
          ...(assignedSeat !== undefined ? { assignedSeat } : {})
        };
      }
      return app;
    }));

    if (activeParticipant?.id === id) {
      setActiveParticipant(prev => prev ? {
        ...prev,
        status,
        ...(reviewNotes !== undefined ? { reviewNotes } : {}),
        ...(assignedSeat !== undefined ? { assignedSeat } : {})
      } : null);
    }

    addAuditLog('Application Status Updated', `Application ${id} status set to ${status}.`);
  };

  const updateApplicationProgramme = (id: string, programme: ProgrammeType) => {
    setApplications(prev => prev.map(app => app.id === id ? { ...app, programme } : app));
    if (activeParticipant?.id === id) {
      setActiveParticipant(prev => prev ? { ...prev, programme } : null);
    }
    addAuditLog('Programme Reassigned', `Application ${id} reassigned to ${programme}.`);
  };

  const submitPayment = (payment: Omit<PaymentSubmission, 'id' | 'status' | 'submittedAt'>): PaymentSubmission => {
    const newPayment: PaymentSubmission = {
      ...payment,
      id: `PAY-${Date.now().toString().slice(-4)}`,
      status: 'under_verification',
      submittedAt: new Date().toISOString().split('T')[0]
    };

    setPayments(prev => [newPayment, ...prev]);

    // Update associated application status to payment_under_verification
    setApplications(prev => prev.map(app => {
      if (app.id === payment.applicationId) {
        return {
          ...app,
          status: 'payment_under_verification',
          paymentStatus: 'under_verification',
          utr: payment.utr,
          paymentDateTime: payment.paymentDateTime,
          paymentMethod: payment.paymentMethod
        };
      }
      return app;
    }));

    if (activeParticipant?.id === payment.applicationId) {
      setActiveParticipant(prev => prev ? {
        ...prev,
        status: 'payment_under_verification',
        paymentStatus: 'under_verification',
        utr: payment.utr,
        paymentDateTime: payment.paymentDateTime,
        paymentMethod: payment.paymentMethod
      } : null);
    }

    addAuditLog('Payment Submitted', `UTR ${payment.utr} logged for ${payment.applicantName} (${payment.applicationId}).`);
    return newPayment;
  };

  const reviewPayment = (
    paymentId: string, 
    action: 'approve' | 'reject' | 'request_info', 
    note?: string
  ) => {
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST';
    
    let targetAppId = '';
    setPayments(prev => prev.map(p => {
      if (p.id === paymentId) {
        targetAppId = p.applicationId;
        const newStatus = action === 'approve' 
          ? 'confirmed' 
          : action === 'reject' 
          ? 'rejected' 
          : 'info_requested';
        return {
          ...p,
          status: newStatus,
          adminActionAt: timestamp,
          adminActionBy: `${currentAdmin.name} (${currentAdmin.department})`,
          notes: note || p.notes
        };
      }
      return p;
    }));

    if (targetAppId) {
      const appStatus = action === 'approve' ? 'confirmed' : action === 'reject' ? 'rejected' : 'info_requested';
      const payStatus = action === 'approve' ? 'completed' : action === 'reject' ? 'pending' : 'under_verification';

      setApplications(prev => prev.map(app => {
        if (app.id === targetAppId) {
          return {
            ...app,
            status: appStatus,
            paymentStatus: payStatus,
            reviewNotes: note || app.reviewNotes
          };
        }
        return app;
      }));

      if (activeParticipant?.id === targetAppId) {
        setActiveParticipant(prev => prev ? {
          ...prev,
          status: appStatus,
          paymentStatus: payStatus,
          reviewNotes: note || prev.reviewNotes
        } : null);
      }
    }

    addAuditLog(
      `Payment Review: ${action.toUpperCase()}`,
      `Payment ${paymentId} (App: ${targetAppId}) was reviewed with action: ${action}. Note: ${note || 'None'}`
    );
  };

  const addImpactSubmission = (submission: Omit<ImpactSubmission, 'id' | 'status' | 'submittedAt'>): ImpactSubmission => {
    const newSub: ImpactSubmission = {
      ...submission,
      id: `IMP-${Date.now().toString().slice(-4)}`,
      status: 'submitted',
      submittedAt: new Date().toISOString().split('T')[0]
    };
    setImpactSubmissions(prev => [newSub, ...prev]);
    // Forward to backend server
    fetch('/api/impact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSub)
    }).catch(() => {});

    addAuditLog('Impact Proposal Received', `Proposal: "${newSub.projectTitle}" by ${newSub.applicantName}.`);
    return newSub;
  };

  const updateImpactStatus = (id: string, status: ImpactSubmission['status'], reviewNotes?: string) => {
    setImpactSubmissions(prev => prev.map(s => s.id === id ? { ...s, status, reviewNotes: reviewNotes || s.reviewNotes } : s));
    const token = localStorage.getItem('auvreo_auth_token');
    fetch(`/api/admin/intakes/impact/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ status })
    }).catch(() => {});
    addAuditLog('Impact Proposal Updated', `Proposal ${id} updated to ${status}.`);
  };

  const addFellowApplication = (application: Omit<FellowApplication, 'id' | 'status' | 'submittedAt'>): FellowApplication => {
    const newFel: FellowApplication = {
      ...application,
      id: `FEL-${Date.now().toString().slice(-4)}`,
      status: 'submitted',
      submittedAt: new Date().toISOString().split('T')[0]
    };
    setFellowApplications(prev => [newFel, ...prev]);
    // Forward to backend server
    fetch('/api/fellows', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newFel)
    }).catch(() => {});

    addAuditLog('Fellow Application Received', `Application by ${newFel.fullName} (${newFel.country}).`);
    return newFel;
  };

  const updateFellowStatus = (id: string, status: FellowApplication['status']) => {
    setFellowApplications(prev => prev.map(f => f.id === id ? { ...f, status } : f));
    const token = localStorage.getItem('auvreo_auth_token');
    fetch(`/api/admin/intakes/fellows/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ status })
    }).catch(() => {});
    addAuditLog('Fellow Application Status Updated', `Fellow ${id} updated to ${status}.`);
  };

  const addVolunteerApplication = (app: Omit<VolunteerApplication, 'id' | 'status' | 'submittedAt'>): VolunteerApplication => {
    const newVol: VolunteerApplication = {
      ...app,
      id: `VOL-${Date.now().toString().slice(-4)}`,
      status: 'pending',
      submittedAt: new Date().toISOString().split('T')[0]
    };
    setVolunteerApplications(prev => [newVol, ...prev]);
    // Forward to backend server
    fetch('/api/volunteers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newVol)
    }).catch(() => {});

    addAuditLog('Volunteer Application Received', `Volunteer applicant: ${newVol.fullName} for ${newVol.department}.`);
    return newVol;
  };

  const updateVolunteerAppStatus = (id: string, status: VolunteerApplication['status']) => {
    setVolunteerApplications(prev => prev.map(v => v.id === id ? { ...v, status } : v));
    const token = localStorage.getItem('auvreo_auth_token');
    fetch(`/api/admin/intakes/volunteers/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ status })
    }).catch(() => {});
    addAuditLog('Volunteer Application Updated', `Applicant ${id} set to ${status}.`);
  };

  const addContactMessage = (msg: Omit<ContactMessage, 'id' | 'status' | 'submittedAt'>): ContactMessage => {
    const newMsg: ContactMessage = {
      ...msg,
      id: `MSG-${Date.now().toString().slice(-4)}`,
      status: 'unread',
      submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST'
    };
    setContactMessages(prev => [newMsg, ...prev]);
    // Forward to backend server
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMsg)
    }).catch(() => {});

    addAuditLog('Secretariat Message Received', `Subject: "${newMsg.subject}" from ${newMsg.fullName}.`);
    return newMsg;
  };

  const markContactStatus = (id: string, status: ContactMessage['status']) => {
    setContactMessages(prev => prev.map(m => m.id === id ? { ...m, status } : m));
    const token = localStorage.getItem('auvreo_auth_token');
    fetch(`/api/admin/intakes/contact/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ status })
    }).catch(() => {});
  };

  // Load users and server intakes from backend
  const refreshUsers = async () => {
    try {
      const token = localStorage.getItem('auvreo_auth_token');
      if (token) {
        const res = await fetch('/api/admin/data', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok && data) {
          if (data.users) setUsers(data.users);
          if (data.impactSubmissions) setImpactSubmissions(data.impactSubmissions);
          if (data.fellowApplications) setFellowApplications(data.fellowApplications);
          if (data.volunteerApplications) setVolunteerApplications(data.volunteerApplications);
          if (data.contactMessages) setContactMessages(data.contactMessages);
          if (data.stories) setStories(data.stories);
          return;
        }
      }
    } catch {
      // ignore
    }
  };

  // Secure Application ID / Username and Password Login (Backed by server /api/auth/login)
  const loginWithCredentials = async (usernameOrId: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: usernameOrId, password })
      });

      const data = await response.json();
      if (response.ok && data.success && data.user) {
        localStorage.setItem('auvreo_auth_token', data.token);
        setCurrentUser(data.user);

        if (data.user.role === 'super_admin' || data.user.role === 'admin' || data.user.role === 'staff') {
          setIsAdminMode(true);
          setCurrentAdmin({
            name: data.user.name,
            role: data.user.role === 'super_admin' ? 'super-admin' : 'delegate-affairs',
            title: data.user.department || 'Secretariat Staff',
            department: data.user.department || 'Secretariat Operations',
            email: data.user.email
          });
          refreshUsers();
          navigateTo('admin');
        } else {
          setIsAdminMode(false);
          // Check if user is a registered delegate application
          const foundApp = applications.find(a => 
            a.id.toLowerCase() === data.user.id.toLowerCase() || 
            a.email.toLowerCase() === data.user.email.toLowerCase()
          );
          if (foundApp) {
            setActiveParticipant(foundApp);
          }
          navigateTo('auvresence');
        }

        addAuditLog('User Authenticated', `User [${data.user.id}] (${data.user.name}) logged in as ${data.user.role}.`);
        return { success: true };
      }

      return { success: false, error: data.error || 'Invalid credentials. Please verify your ID and password.' };
    } catch (err: any) {
      console.error('Login error:', err);
      // Fallback local check if offline
      const searchKey = usernameOrId.trim().toLowerCase();
      const localMatch = users.find(u => 
        (u.id.toLowerCase() === searchKey || u.username.toLowerCase() === searchKey || u.email.toLowerCase() === searchKey) &&
        u.password === password
      );
      if (localMatch) {
        setCurrentUser(localMatch);
        if (localMatch.role === 'super_admin' || localMatch.role === 'staff') {
          setIsAdminMode(true);
          navigateTo('admin');
        } else {
          setIsAdminMode(false);
          navigateTo('auvresence');
        }
        return { success: true };
      }
      return { success: false, error: 'Connection error or invalid credentials.' };
    }
  };

  // Public Registration: Request / Register Temporary Account (Awaiting Super Admin Approval)
  const registerAccountRequest = async (accountData: {
    name: string;
    username: string;
    email: string;
    password: string;
    role?: any;
    department?: string;
    institution?: string;
    country?: string;
    requestNote?: string;
  }): Promise<{ success: boolean; message?: string; error?: string; user?: any }> => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(accountData)
      });

      const data = await response.json();
      if (response.ok && data.success) {
        if (data.user) {
          setUsers(prev => [data.user, ...prev.filter(u => u.id.toLowerCase() !== data.user.id.toLowerCase())]);
        }
        addAuditLog('Accreditation Requested', `New account request for ${accountData.name} (${accountData.email}) registered.`);
        return { success: true, message: data.message, user: data.user };
      }

      return { success: false, error: data.error || 'Failed to submit account request.' };
    } catch (err: any) {
      console.error('Account request error:', err);
      const generatedId = `AUV-REQ-${Math.floor(1000 + Math.random() * 9000)}`;
      const localReqUser: UserAccount = {
        id: generatedId,
        username: accountData.username,
        password: accountData.password,
        name: accountData.name,
        email: accountData.email,
        role: accountData.role || 'delegate',
        department: accountData.department || 'Diplomatic Delegation',
        institution: accountData.institution,
        country: accountData.country,
        requestNote: accountData.requestNote,
        status: 'pending_approval',
        createdAt: new Date().toISOString().split('T')[0]
      };
      setUsers(prev => [localReqUser, ...prev]);
      return { 
        success: true, 
        message: "Account accreditation request submitted successfully! Your credentials have been created in temporary pending status awaiting Super Admin approval.",
        user: localReqUser 
      };
    }
  };

  // Super Admin: Approve Temporary Account Request & Unlock Login
  const approveUserAccount = async (id: string, role?: any, department?: string): Promise<{ success: boolean; error?: string; user?: UserAccount }> => {
    try {
      const token = localStorage.getItem('auvreo_auth_token');
      const response = await fetch(`/api/admin/users/${encodeURIComponent(id)}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ role, department })
      });

      const data = await response.json();
      if (response.ok && data.success && data.user) {
        setUsers(prev => prev.map(u => u.id.toLowerCase() === id.toLowerCase() ? { ...u, ...data.user, status: 'active' } : u));
        addAuditLog('Account Approved', `Approved account ID [${id}] for ${data.user.name}. Login unlocked.`);
        return { success: true, user: data.user };
      }
      return { success: false, error: data.error || 'Failed to approve account.' };
    } catch {
      setUsers(prev => prev.map(u => u.id.toLowerCase() === id.toLowerCase() ? { ...u, status: 'active', ...(role ? { role } : {}), ...(department ? { department } : {}) } : u));
      return { success: true };
    }
  };

  // Super Admin: Decline Temporary Account Request
  const declineUserAccount = async (id: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const token = localStorage.getItem('auvreo_auth_token');
      const response = await fetch(`/api/admin/users/${encodeURIComponent(id)}/decline`, {
        method: 'POST',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setUsers(prev => prev.map(u => u.id.toLowerCase() === id.toLowerCase() ? { ...u, status: 'declined' } : u));
        addAuditLog('Account Request Declined', `Declined registration request for ID [${id}].`);
        return { success: true };
      }
      return { success: false, error: data.error || 'Failed to decline account request.' };
    } catch {
      setUsers(prev => prev.map(u => u.id.toLowerCase() === id.toLowerCase() ? { ...u, status: 'declined' } : u));
      return { success: true };
    }
  };

  // Super Admin: Delete Intake Record
  const deleteIntakeRecord = async (type: 'contact' | 'impact' | 'fellows' | 'volunteers' | 'stories', id: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const token = localStorage.getItem('auvreo_auth_token');
      const response = await fetch(`/api/admin/intakes/${type}/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      });

      const data = await response.json();
      if (response.ok && data.success) {
        if (type === 'contact') setContactMessages(prev => prev.filter(c => c.id !== id));
        else if (type === 'impact') setImpactSubmissions(prev => prev.filter(i => i.id !== id));
        else if (type === 'fellows') setFellowApplications(prev => prev.filter(f => f.id !== id));
        else if (type === 'volunteers') setVolunteerApplications(prev => prev.filter(v => v.id !== id));
        else if (type === 'stories') setStories(prev => prev.filter(s => s.id !== id));

        addAuditLog('Record Deleted', `Deleted ${type} record ID [${id}].`);
        return { success: true };
      }
      return { success: false, error: data.error || 'Failed to delete record.' };
    } catch {
      if (type === 'contact') setContactMessages(prev => prev.filter(c => c.id !== id));
      else if (type === 'impact') setImpactSubmissions(prev => prev.filter(i => i.id !== id));
      else if (type === 'fellows') setFellowApplications(prev => prev.filter(f => f.id !== id));
      else if (type === 'volunteers') setVolunteerApplications(prev => prev.filter(v => v.id !== id));
      else if (type === 'stories') setStories(prev => prev.filter(s => s.id !== id));
      return { success: true };
    }
  };

  // Super Admin: Create new user account with ID and Password
  const createUserAccount = async (userData: { id?: string; username: string; password: string; name: string; email?: string; role: any; department?: string }): Promise<{ success: boolean; user?: UserAccount; error?: string }> => {
    try {
      const token = localStorage.getItem('auvreo_auth_token');
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();
      if (response.ok && data.success && data.user) {
        setUsers(prev => [data.user, ...prev.filter(u => u.id.toLowerCase() !== data.user.id.toLowerCase())]);
        addAuditLog('Account Created', `Created ID [${data.user.id}] for ${data.user.name} (${data.user.role}).`);
        return { success: true, user: data.user };
      }

      return { success: false, error: data.error || 'Failed to create user account.' };
    } catch (err: any) {
      console.error('Create user error:', err);
      const newLocalUser: UserAccount = {
        id: userData.id || userData.username,
        username: userData.username,
        password: userData.password,
        name: userData.name,
        email: userData.email || `${userData.username.toLowerCase()}@auvreo.org`,
        role: userData.role || 'staff',
        department: userData.department || 'Secretariat Operations',
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0]
      };
      setUsers(prev => [newLocalUser, ...prev]);
      return { success: true, user: newLocalUser };
    }
  };

  // Super Admin: Update user account
  const updateUserAccount = async (id: string, updates: Partial<UserAccount>): Promise<{ success: boolean; error?: string }> => {
    try {
      const token = localStorage.getItem('auvreo_auth_token');
      const response = await fetch(`/api/admin/users/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(updates)
      });

      const data = await response.json();
      if (response.ok && data.success && data.user) {
        setUsers(prev => prev.map(u => u.id.toLowerCase() === id.toLowerCase() ? { ...u, ...data.user } : u));
        return { success: true };
      }
      return { success: false, error: data.error || 'Failed to update account.' };
    } catch {
      setUsers(prev => prev.map(u => u.id.toLowerCase() === id.toLowerCase() ? { ...u, ...updates } : u));
      return { success: true };
    }
  };

  // Super Admin: Delete user account
  const deleteUserAccount = async (id: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const token = localStorage.getItem('auvreo_auth_token');
      const response = await fetch(`/api/admin/users/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setUsers(prev => prev.filter(u => u.id.toLowerCase() !== id.toLowerCase()));
        addAuditLog('Account Deleted', `Deleted credential account ID [${id}].`);
        return { success: true };
      }
      return { success: false, error: data.error || 'Failed to delete account.' };
    } catch {
      setUsers(prev => prev.filter(u => u.id.toLowerCase() !== id.toLowerCase()));
      return { success: true };
    }
  };

  const logoutUser = () => {
    const token = localStorage.getItem('auvreo_auth_token');
    if (token) {
      fetch('/api/auth/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      }).catch(() => {});
    }
    localStorage.removeItem('auvreo_auth_token');
    setCurrentUser(null);
    setActiveParticipant(null);
    setIsAdminMode(false);
    navigateTo('home');
  };

  const loginAsParticipant = (emailOrId: string): boolean => {
    const trimmed = emailOrId.trim().toLowerCase();
    const found = applications.find(a => 
      a.id.toLowerCase() === trimmed || a.email.toLowerCase() === trimmed
    );
    if (found) {
      setActiveParticipant(found);
      const user: UserAccount = users.find(u => u.email.toLowerCase() === found.email.toLowerCase()) || {
        id: found.id || `usr-${Date.now()}`,
        username: found.id || found.email,
        email: found.email,
        name: found.fullName,
        role: 'delegate',
        status: 'active',
        createdAt: found.createdAt,
        auvreoId: found.id
      };
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logoutParticipant = () => {
    setActiveParticipant(null);
    setCurrentUser(null);
  };

  const updateCMSContent = (newContent: Partial<CMSContent>) => {
    setCmsContent(prev => ({ ...prev, ...newContent }));
    addAuditLog('CMS Content Modified', 'Institutional settings or fees updated by administrator.');
  };

  const addAnnouncement = (ann: Omit<Announcement, 'id'>) => {
    const newAnn: Announcement = {
      ...ann,
      id: `ann-${Date.now()}`
    };
    setAnnouncements(prev => [newAnn, ...prev]);
    addAuditLog('Announcement Published', `New dispatch: "${newAnn.title}".`);
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  const addSession = (session: Omit<SummitSession, 'id'>) => {
    const newSession: SummitSession = {
      ...session,
      id: `s-${Date.now()}`
    };
    setSessions(prev => [...prev, newSession]);
  };

  const deleteSession = (id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
  };

  const addDocument = (doc: Omit<DocumentResource, 'id'>) => {
    const newDoc: DocumentResource = {
      ...doc,
      id: `doc-${Date.now()}`
    };
    setDocuments(prev => [newDoc, ...prev]);
  };

  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
  };

  const addVolunteerRequest = (req: Omit<VolunteerRequest, 'id'>) => {
    const newReq: VolunteerRequest = {
      ...req,
      id: `vol-${Date.now()}`
    };
    setVolunteerRequests(prev => [newReq, ...prev]);
  };

  const updateVolunteerStatus = (id: string, status: VolunteerRequest['status']) => {
    setVolunteerRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const addStory = (story: Omit<Story, 'id'>) => {
    const newStory: Story = {
      ...story,
      id: `st-${Date.now()}`
    };
    setStories(prev => [newStory, ...prev]);
    fetch('/api/stories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newStory)
    }).catch(() => {});
    addAuditLog('Community Story Submitted', `Title: "${newStory.title}" by ${newStory.author}.`);
  };

  const addTimelineMilestone = (milestone: Omit<TimelineMilestone, 'id'>) => {
    const newMilestone: TimelineMilestone = {
      ...milestone,
      id: `milestone-${Date.now()}`
    };
    setTimelineMilestones(prev => {
      const updated = [...prev, newMilestone].sort((a, b) => a.order - b.order);
      try {
        localStorage.setItem(TIMELINE_STORAGE_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
    addAuditLog('Timeline Milestone Added', `Milestone: ${newMilestone.title} (${newMilestone.stage})`);
  };

  const updateTimelineMilestone = (id: string, updates: Partial<TimelineMilestone>) => {
    setTimelineMilestones(prev => {
      const updated = prev.map(m => m.id === id ? { ...m, ...updates } : m).sort((a, b) => a.order - b.order);
      try {
        localStorage.setItem(TIMELINE_STORAGE_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
    addAuditLog('Timeline Milestone Updated', `Updated milestone [${id}]`);
  };

  const deleteTimelineMilestone = (id: string) => {
    setTimelineMilestones(prev => {
      const updated = prev.filter(m => m.id !== id);
      try {
        localStorage.setItem(TIMELINE_STORAGE_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
    addAuditLog('Timeline Milestone Deleted', `Deleted milestone [${id}]`);
  };

  const reorderTimelineMilestones = (milestones: TimelineMilestone[]) => {
    const updated = milestones.map((m, idx) => ({ ...m, order: idx + 1 }));
    setTimelineMilestones(updated);
    try {
      localStorage.setItem(TIMELINE_STORAGE_KEY, JSON.stringify(updated));
    } catch {}
    addAuditLog('Timeline Reordered', 'Updated order of Road to Delhi timeline');
  };

  const openApplyModal = (prog?: ProgrammeType) => {
    if (registrationStatus !== 'open') {
      navigateTo('apply-status');
      return;
    }
    setPreselectedProgramme(prog);
    setIsApplyModalOpen(true);
  };

  const closeApplyModal = () => {
    setIsApplyModalOpen(false);
    setPreselectedProgramme(undefined);
  };

  return (
    <AuvreoContext.Provider
      value={{
        currentRoute,
        navigateTo,
        applications,
        addApplication,
        updateApplicationStatus,
        updateApplicationProgramme,
        payments,
        submitPayment,
        reviewPayment,
        impactSubmissions,
        addImpactSubmission,
        updateImpactStatus,
        fellowApplications,
        addFellowApplication,
        updateFellowStatus,
        volunteerApplications,
        addVolunteerApplication,
        updateVolunteerAppStatus,
        contactMessages,
        addContactMessage,
        markContactStatus,
        auditLogs,
        addAuditLog,
        currentUser,
        users,
        loginWithCredentials,
        registerAccountRequest,
        approveUserAccount,
        declineUserAccount,
        createUserAccount,
        updateUserAccount,
        deleteUserAccount,
        deleteIntakeRecord,
        refreshUsers,
        logoutUser,
        activeParticipant,
        setActiveParticipant,
        loginAsParticipant,
        logoutParticipant,
        currentAdmin,
        setCurrentAdmin,
        isAdminMode,
        setIsAdminMode,
        cmsContent,
        updateCMSContent,
        announcements,
        addAnnouncement,
        deleteAnnouncement,
        timelineMilestones,
        addTimelineMilestone,
        updateTimelineMilestone,
        deleteTimelineMilestone,
        reorderTimelineMilestones,
        sessions,
        addSession,
        deleteSession,
        documents,
        addDocument,
        deleteDocument,
        volunteerRequests,
        addVolunteerRequest,
        updateVolunteerStatus,
        stories,
        addStory,
        registrationStatus,
        isApplyModalOpen,
        openApplyModal,
        closeApplyModal,
        preselectedProgramme,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuvreoContext.Provider>
  );
};

export const useAuvreo = () => {
  const context = useContext(AuvreoContext);
  if (!context) {
    throw new Error('useAuvreo must be used within an AuvreoProvider');
  }
  return context;
};
