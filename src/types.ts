/**
 * Auvreo International - Core TypeScript Definitions
 */

export type ProgrammeType = 'aippm' | 'uncsw' | 'international-press';

export type RegistrationStatus = 'coming_soon' | 'open' | 'paused' | 'closed';

export interface ProgrammeInfo {
  id: ProgrammeType;
  name: string;
  shortName: string;
  tagline: string;
  badge: string;
  targetSeats: number;
  format: string;
  participantProfile: string;
  experience: string;
  agendaOverview: string;
  topics: string[];
}

export type ParticipationTier = 'indian-delegate' | 'international-delegate';

export type ApplicationStatus = 
  | 'submitted' 
  | 'payment_under_verification' 
  | 'under-review' 
  | 'confirmed' 
  | 'waitlist' 
  | 'rejected'
  | 'info_requested';

export interface DelegateApplication {
  id: string; // e.g. AUV-2026-1042
  createdAt: string;
  tier: ParticipationTier;
  programme: ProgrammeType;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  institution: string;
  age: number;
  bio: string;
  experience: string;
  interests: string;
  motivation: string;
  socialLinks?: string;
  avatarUrl?: string;
  status: ApplicationStatus;
  paymentStatus: 'pending' | 'under_verification' | 'completed' | 'exempt';
  paymentAmount: string;
  currency: 'INR' | 'USD';
  utr?: string;
  paymentDateTime?: string;
  paymentMethod?: string;
  reviewNotes?: string;
  assignedSeat?: string;
}

export type Application = DelegateApplication;

export interface PaymentSubmission {
  id: string;
  applicationId: string;
  applicantName: string;
  email: string;
  programme: ProgrammeType;
  tier: ParticipationTier;
  amount: string;
  currency: 'INR' | 'USD';
  utr: string; // transaction reference
  paymentDateTime: string;
  paymentMethod: 'UPI' | 'Bank Transfer / IMPS' | 'International Wire' | 'Card / Gateway';
  status: 'under_verification' | 'confirmed' | 'rejected' | 'info_requested';
  notes?: string;
  submittedAt: string;
  proofNote?: string;
  adminActionAt?: string;
  adminActionBy?: string;
}

export interface ImpactSubmission {
  id: string;
  applicantName: string;
  email: string;
  organizationOrInstitution: string;
  projectTitle: string;
  focusArea: 'Diplomacy & Peacebuilding' | 'Education & Access' | 'Climate & Sustainable Cities' | 'Digital Rights & Tech Equity' | 'Culture & Heritage' | 'Gender Justice';
  executiveSummary: string;
  problemStatement: string;
  proposedSolution: string;
  targetBeneficiaries: string;
  estimatedTimeline: string;
  status: 'submitted' | 'under_review' | 'shortlisted' | 'accepted' | 'declined';
  submittedAt: string;
  reviewNotes?: string;
}

export interface FellowApplication {
  id: string;
  fullName: string;
  email: string;
  country: string;
  institution: string;
  leadershipTrack: 'Policy & Dialogue' | 'Community Grassroots' | 'Research & Perspectives' | 'Institutional Innovation';
  statementOfIntent: string;
  portfolioOrExperience: string;
  status: 'submitted' | 'under_review' | 'invited_for_interview' | 'accepted' | 'declined';
  submittedAt: string;
}

export interface VolunteerApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  department: 'Delegate Affairs' | 'Social Media' | 'HR & Management' | 'Organising Committee' | 'Logistics';
  availability: string;
  relevantExperience: string;
  statement: string;
  status: 'pending' | 'interview_scheduled' | 'selected' | 'declined';
  submittedAt: string;
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  subject: string;
  category: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  submittedAt: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  adminName: string;
  action: string;
  details: string;
}

export type UserRole = 'super_admin' | 'staff' | 'chair' | 'delegate' | 'guest';

export interface UserAccount {
  id: string; // e.g. AUV-ADMIN-001, admin, AUV-2026-1042, staff-anshika
  username: string; // identifier used for login
  password?: string;
  email: string;
  name: string;
  role: UserRole | 'admin' | 'visitor';
  department?: string;
  institution?: string;
  country?: string;
  requestNote?: string;
  status: 'active' | 'suspended' | 'pending_approval' | 'declined';
  avatarUrl?: string;
  createdAt: string;
  auvreoId?: string;
}

export interface SummitSession {
  id: string;
  day: 'day-1' | 'day-2';
  time: string;
  title: string;
  programme: 'all' | ProgrammeType;
  location: string;
  description: string;
  speaker?: string;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  date: string;
  priority: 'normal' | 'important' | 'urgent';
  audience: 'all' | ProgrammeType;
  status: 'published' | 'draft';
}

export type StoryCategory = 'People' | 'Ideas' | 'Culture' | 'Dialogue' | 'Delhi' | 'Summit';

export type TimelineStatus = 'Upcoming' | 'Open' | 'Closing Soon' | 'Closed' | 'Completed' | 'To Be Announced';

export interface TimelineMilestone {
  id: string;
  stage: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  status: TimelineStatus;
  order: number;
  visible: boolean;
  ctaText?: string;
  ctaUrl?: string;
}

export interface Story {
  id: string;
  slug: string;
  title: string;
  category: StoryCategory;
  excerpt: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  featured?: boolean;
  content: string[];
}

export type StoryItem = Story;

export interface ContributorTrack {
  id: string;
  title: string;
  focus: string;
  description: string;
  deliverables: string;
}

export interface VolunteerRequest {
  id: string;
  role: string;
  department: 'Delegate Affairs' | 'Social Media' | 'HR & Management' | 'Organising Committee' | 'Logistics';
  departmentHead: string;
  responsibilities: string[];
  requirements: string[];
  numberRequired: number;
  status: 'Open' | 'Under Review' | 'Filled';
}

export interface DocumentResource {
  id: string;
  title: string;
  programme: 'all' | ProgrammeType;
  category: string;
  fileSize: string;
  type: string;
  description: string;
}

export type AdminRole = 
  | 'super-admin'
  | 'delegate-affairs'
  | 'hr-management'
  | 'organising-committee'
  | 'social-media'
  | 'logistics';

export interface AdminUser {
  name: string;
  role: AdminRole;
  title: string;
  department: string;
  email: string;
}

export interface CMSContent {
  bannerAlert: {
    enabled: boolean;
    text: string;
    linkText?: string;
    linkUrl?: string;
  };
  summitDate: string;
  summitLocation: string;
  delegateTarget: number;
  pressTarget: number;
  fees: {
    indianStarting: number;
    internationalStarting: number;
    earlyBirdDiscount: number;
  };
  heroHeadline: string;
  heroSubheadline: string;
  paymentSettings: {
    accountName: string;
    upiId: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    swiftCode?: string;
    qrNote: string;
    instructions: string[];
  };
}
