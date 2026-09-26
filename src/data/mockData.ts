import { 
  ProgrammeInfo, 
  DelegateApplication, 
  SummitSession, 
  Announcement, 
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
  TimelineMilestone
} from '../types';

export const INITIAL_CMS_CONTENT: CMSContent = {
  bannerAlert: {
    enabled: true,
    text: "Auvreo International • Connecting People, Cultures & Ideas • New Delhi, India",
    linkText: "Explore Auvresence",
    linkUrl: "#auvresence"
  },
  summitDate: "December 2026",
  summitLocation: "New Delhi, India",
  delegateTarget: 120,
  pressTarget: 25,
  fees: {
    indianStarting: 2000,
    internationalStarting: 35,
    earlyBirdDiscount: 15
  },
  heroHeadline: "CONNECTING PEOPLE, CULTURES & IDEAS",
  heroSubheadline: "Diplomacy, reimagined through people, culture, creativity and technology.",
  paymentSettings: {
    accountName: "Auvreo International Secretariat",
    upiId: "auvreo.delegates@icici",
    bankName: "ICICI Bank",
    accountNumber: "002105018920",
    ifscCode: "ICIC0000021",
    swiftCode: "ICICINBBCTS",
    qrNote: "Scan using BHIM, Google Pay, PhonePe, Paytm, or any UPI application.",
    instructions: [
      "Submit your delegate application details accurately prior to payment.",
      "Transfer the exact registration fee for your cohort (Indian Delegate: ₹1,999+ / International: $35+).",
      "Copy your 12-digit UTR / Transaction Reference Number from your payment app.",
      "Submit the transaction reference below to place your application into 'Payment Under Verification'.",
      "The Delegate Affairs desk verifies all banking records directly before accrediting digital credentials."
    ]
  }
};

export const PROGRAMMES: ProgrammeInfo[] = [
  {
    id: 'aippm',
    name: 'All India Political Parties Meeting',
    shortName: 'AIPPM',
    tagline: 'Bridging ideological frontiers through parliamentary precision & constitutional nuance.',
    badge: 'National Governance',
    targetSeats: 60,
    format: 'Unmoderated & moderated cross-party caucuses, dynamic legislative amendments, cross-state consensus drafting.',
    participantProfile: 'Passionate debaters, legal scholars, public policy researchers, and youth passionate about India’s constitutional mechanics.',
    experience: 'Simulating the crucible of Indian national politics, where population-based representation meets federal equilibrium.',
    agendaOverview: 'Discussion on the Constitution (131st Amendment) Bill, 2026 and the Delimitation Bill, 2026, with special reference to the implementation framework for women’s reservation in the Lok Sabha.',
    topics: [
      'Delimitation and population-based representation across states',
      'Implementation framework for women’s reservation in the Lok Sabha',
      'Federal balance and regional state representation safeguards',
      'Transitional and phased legislative implementation mechanics',
      'Demographic shifts and future composition of parliamentary seats'
    ]
  },
  {
    id: 'uncsw',
    name: 'United Nations Commission on the Status of Women',
    shortName: 'UNCSW',
    tagline: 'Multilateral diplomacy addressing legal pluralism, customary systems, and substantive gender equality.',
    badge: 'Multilateral Council',
    targetSeats: 60,
    format: 'Formal diplomatic statements, bilateral treaty drafting, coalition consensus working papers, resolution voting.',
    participantProfile: 'Aspiring international diplomats, human rights advocates, comparative legal researchers, and global policy scholars.',
    experience: 'Rigorous UN multilateral negotiation reconciling international human rights standards with customary traditions.',
    agendaOverview: 'Ensuring and strengthening access to justice for all women and girls through the reconciliation of legal pluralism, customary and religious practices, and international obligations on gender equality.',
    topics: [
      'Equality before law and structural access to judicial institutions',
      'Reconciliation of legal pluralism, customary practices, and statutory law',
      'Marriage, divorce, inheritance, and property rights protection',
      'Safeguarding vulnerable women and girls in diverse legal frameworks',
      'Harmonizing domestic cultural autonomy with universal human rights obligations'
    ]
  },
  {
    id: 'international-press',
    name: 'International Press Corps',
    shortName: 'Press Corps',
    tagline: 'Investigative reporting, live photojournalism, and uncompromising editorial integrity.',
    badge: 'Fourth Estate',
    targetSeats: 25,
    format: 'Live committee press briefings, investigative interviews, daily editorial dispatches, digital photo essays.',
    participantProfile: 'Journalists, photojournalists, opinion columnists, podcast producers, and investigative writers.',
    experience: 'Working under real-time editorial deadlines to hold committee leaders accountable and chronicle the human stories of the summit.',
    agendaOverview: 'Combating disinformation in diplomatic coverage, long-form human interest storytelling, and rapid digital publication.',
    topics: [
      'Editorial ethics in fast-breaking diplomatic negotiations',
      'Photojournalistic documentation of cultural diplomacy in Delhi',
      'Publishing the official daily Auvreo Gazette dispatches'
    ]
  }
];

export const FOUR_PILLARS = [
  {
    name: 'Auvreo Dialogues',
    focus: 'Conversation',
    status: 'Active',
    description: 'High-trust, intergenerational roundtables bringing grassroots thinkers, diplomats, and creative technologists into direct, unscripted discourse.',
    quote: 'Real diplomacy begins when speeches end and authentic conversation starts.'
  },
  {
    name: 'Auvreo Perspectives',
    focus: 'Knowledge',
    status: 'In Progress',
    description: 'A curated repository of policy briefs, independent youth essays, and cultural analyses unfiltered by institutional dogma.',
    quote: 'Knowledge is not memorized doctrine; it is lived insight translated into public clarity.'
  },
  {
    name: 'Auvreo Fellows',
    focus: 'People',
    status: 'Upcoming Cohort',
    description: 'A global network of emerging leaders receiving mentorship, community fellowship, and peer-to-peer collaboration on systemic challenges.',
    quote: 'Institutions fade. The human relationships forged in struggle endure.'
  },
  {
    name: 'Global Futures Summit',
    focus: 'Action',
    status: 'Active Planning',
    description: 'The flagship physical gathering in New Delhi where resolutions, cultural exchanges, and seed grants cross from proposal into execution.',
    quote: 'Connecting ideas to tangible impact across borders.'
  }
];

export const INITIAL_APPLICATIONS: DelegateApplication[] = [];

export const SUMMIT_SESSIONS: SummitSession[] = [
  // Day 1
  {
    id: 's-101',
    day: 'day-1',
    time: '08:30 – 09:30',
    title: 'Auvreo Registration, NFC Credential Issuance & Welcome Tea',
    programme: 'all',
    location: 'Grand Atrium & Foyer',
    description: 'Collection of official delegate credentials, physical dossiers, and informal cultural meet-and-greet.'
  },
  {
    id: 's-102',
    day: 'day-1',
    time: '09:30 – 10:45',
    title: 'Opening Plenary: Something Begins in Delhi',
    programme: 'all',
    location: 'Main Plenary Chamber',
    description: 'Inaugural address on reimagining diplomacy through people, culture, and technology. Keynote dialogue with guest diplomats.'
  },
  {
    id: 's-103',
    day: 'day-1',
    time: '11:00 – 13:30',
    title: 'Session I: Establishing the Working Agenda',
    programme: 'all',
    location: 'Committee Chambers (AIPPM Hall A / UNCSW Hall B / Press Pressroom)',
    description: 'Opening statements, setting speaker lists, initial crisis briefings, and introduction of primary working documents.'
  },
  {
    id: 's-104',
    day: 'day-1',
    time: '13:30 – 14:30',
    title: 'Culinary Diplomacy: Curated Old & New Delhi Luncheon',
    programme: 'all',
    location: 'Courtyard & Dining Pavilion',
    description: 'Informal networking over artisanal regional cuisine highlighting North and South Indian culinary traditions.'
  },
  {
    id: 's-105',
    day: 'day-1',
    time: '14:30 – 17:30',
    title: 'Session II: Unmoderated Caucusing & Bloc Synthesis',
    programme: 'all',
    location: 'Respective Committee Chambers',
    description: 'Intense inter-bloc negotiations, bilateral consultations, draft policy formulation, and Press Corps doorstop interviews.'
  },
  {
    id: 's-106',
    day: 'day-1',
    time: '18:00 – 20:00',
    title: 'Cultural Evening: The Delhi Soundscape & Heritage Showcase',
    programme: 'all',
    location: 'Open Amphitheatre',
    description: 'Live instrumental fusion, traditional storytelling, and an immersive introduction to Delhi’s 800-year living history.'
  },

  // Day 2
  {
    id: 's-201',
    day: 'day-2',
    time: '09:00 – 11:30',
    title: 'Session III: Crisis Directive & Dynamic Amendment Voting',
    programme: 'all',
    location: 'Respective Committee Chambers',
    description: 'Committees respond to breaking real-time scenarios requiring fast coalition adjustments and multilateral compromise.'
  },
  {
    id: 's-202',
    day: 'day-2',
    time: '11:45 – 13:45',
    title: 'Session IV: Final Draft Resolution & Communiqué Presentation',
    programme: 'all',
    location: 'Committee Chambers',
    description: 'Author presentations, clause-by-clause scrutiny, amendments in writing, and final roll-call voting.'
  },
  {
    id: 's-203',
    day: 'day-2',
    time: '14:45 – 16:30',
    title: 'Auvreo Impact Assembly & Grant Pitch Session',
    programme: 'all',
    location: 'Main Plenary Chamber',
    description: 'Delegates pitch grassroots follow-up initiatives stemming from summit resolutions for Auvreo Impact seed mentorship.'
  },
  {
    id: 's-204',
    day: 'day-2',
    time: '16:45 – 18:00',
    title: 'Closing Ceremony: Where Ideas Become Impact',
    programme: 'all',
    location: 'Main Plenary Chamber',
    description: 'Presentation of official dispatches, Auvreo Fellow induction, and valedictory address.'
  }
];

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Background Guides & Rules of Procedure Officially Published',
    message: 'All registered delegates can now download the comprehensive study guides and committee rules from the Auvresence Resource Center.',
    date: 'September 16, 2026',
    priority: 'important',
    audience: 'all',
    status: 'published'
  },
  {
    id: 'ann-2',
    title: 'International Travel & Visa Assistance Desk Live',
    message: 'Overseas delegates requiring formal invitation letters for Indian visa applications can submit flight itineraries via auvreo@gmail.com.',
    date: 'September 14, 2026',
    priority: 'urgent',
    audience: 'all',
    status: 'published'
  },
  {
    id: 'ann-3',
    title: 'Press Corps Accreditation Guidelines Updated',
    message: 'Journalists and photojournalists must submit equipment manifests and sample portfolios by November 15 for security clearance.',
    date: 'September 10, 2026',
    priority: 'normal',
    audience: 'international-press',
    status: 'published'
  }
];

export const STORIES: Story[] = [
  {
    id: 'st-1',
    slug: 'the-diplomacy-of-living-culture',
    title: 'The Diplomacy of Living Culture: Why Delhi Holds the Room',
    category: 'Delhi',
    excerpt: 'Centuries of empires and rebellions taught Delhi that politics is negotiated over food, architecture, and resilient community conversations.',
    author: 'Auvreo Editorial Desk',
    authorRole: 'Curatorial Team',
    date: 'September 2026',
    readTime: '4 min read',
    featured: true,
    content: [
      'In conventional diplomatic summits, proceedings are sanitized inside windowless hotel ballrooms. Delegates debate poverty and peace without smelling the street or hearing the city.',
      'Auvreo International operates on a different premise: the host city is an active participant in the summit. Delhi is not a backdrop; it is an eight-century-old living archive of treaties, trade corridors, and synthesis.',
      'When delegates sit together across party lines in AIPPM or draft multilateral agreements in UNCSW, the context of Delhi reminds us that real compromise is written into the stones of this ancient, vibrant metropolis.'
    ]
  },
  {
    id: 'st-2',
    slug: 'moving-beyond-performative-debate',
    title: 'Moving Beyond the Echo Chamber of Conventional Youth Debating',
    category: 'Dialogue',
    excerpt: 'Why Auvreo rejects scripted procedural point-scoring in favor of actionable, human-centered policy synthesis.',
    author: 'Divyam',
    authorRole: 'Head of Organising Committee',
    date: 'September 2026',
    readTime: '5 min read',
    featured: false,
    content: [
      'For decades, youth conferences have rewarded speed of speech and aggressive procedural objections over thoughtful consensus. Delegates memorize points to win plastic trophies, only for their working papers to end up in recycling bins.',
      'Auvreo’s four pillars—Dialogues, Perspectives, Fellows, and Summit—were architected to disrupt this cycle. We value delegates who listen deeply, find unexpected alignments between opposing ideologies, and build durable coalitions.',
      'At India 2026, the best delegate is not the loudest voice in the room; it is the person who crafts the sentence that unites twenty divided nations.'
    ]
  },
  {
    id: 'st-3',
    slug: 'the-fourth-estate-at-auvreo',
    title: 'Holding Power to Account: The International Press Corps in Action',
    category: 'Ideas',
    excerpt: 'The press corps at Auvreo is not an afterthought—it is the lens that forces transparency into every committee chamber.',
    author: 'Pooja',
    authorRole: 'Head of Social Media & Press Affairs',
    date: 'September 2026',
    readTime: '3 min read',
    featured: false,
    content: [
      'Diplomacy conducted without a free, relentless press quickly descends into comfortable complacency.',
      'The International Press Corps at Auvreo operates with complete editorial autonomy. Reporters break stories, challenge delegates during unscripted press conferences, and photograph the real tension behind closed doors.',
      'Every evening of the summit, the official Auvreo Gazette dispatches reflect reality—not polished PR.'
    ]
  }
];

export const VOLUNTEER_REQUESTS: VolunteerRequest[] = [
  {
    id: 'vol-1',
    role: 'Delegate Affairs Liaison',
    department: 'Delegate Affairs',
    departmentHead: 'Anshika',
    responsibilities: [
      'Oversee check-in and onboarding for assigned delegate cohorts',
      'Manage real-time communication channels and assistance inquiries',
      'Facilitate committee room logistics and speaker queue assistance'
    ],
    requirements: [
      'Strong interpersonal communication in English and Hindi',
      'Prior participation or staffing at youth conferences',
      'Calm demeanor under fast-paced deadline environments'
    ],
    numberRequired: 8,
    status: 'Open'
  },
  {
    id: 'vol-2',
    role: 'Creative Media & Documentary Specialist',
    department: 'Social Media',
    departmentHead: 'Pooja',
    responsibilities: [
      'Real-time photo and video capture across committee sessions',
      'Fast turnaround story editing and social dispatch publishing',
      'Interviewing delegates for post-session video perspectives'
    ],
    requirements: [
      'Hands-on experience with DSLR/mirrorless camera gear or mobile stabilization',
      'Proficiency in Adobe Premiere, Lightroom, or CapCut',
      'Eye for candid human emotion and cultural aesthetic'
    ],
    numberRequired: 4,
    status: 'Open'
  },
  {
    id: 'vol-3',
    role: 'Internal Operations & Volunteer Coordinator',
    department: 'HR & Management',
    departmentHead: 'Avni',
    responsibilities: [
      'Maintain volunteer check-in schedules and hospitality shifts',
      'Coordinate meal distributions and staff rest rotations',
      'Conduct rapid briefing and debriefing sessions at day start and end'
    ],
    requirements: [
      'Exceptional organization and task-tracking abilities',
      'Empathy and leadership in high-energy youth teams',
      'Reliable time management'
    ],
    numberRequired: 5,
    status: 'Open'
  },
  {
    id: 'vol-4',
    role: 'Chamber Protocol & Session Assistant',
    department: 'Organising Committee',
    departmentHead: 'Divyam',
    responsibilities: [
      'Manage working paper printouts, document sharing, and vote tallying',
      'Maintain decorum and assist committee executive boards',
      'Coordinate audiovisual setups and digital projection'
    ],
    requirements: [
      'Familiarity with parliamentary or MUN rules of procedure',
      'Detail-oriented administrative capability',
      'Punctual and proactive'
    ],
    numberRequired: 6,
    status: 'Open'
  },
  {
    id: 'vol-5',
    role: 'Transport, Venue & Hospitality Steward',
    department: 'Logistics',
    departmentHead: 'Abhinav',
    responsibilities: [
      'Coordinate airport/railway reception desk for international delegates',
      'Manage venue ingress signage and directional flow',
      'Oversee catering coordination and emergency first-aid station liaisons'
    ],
    requirements: [
      'Extensive geographic knowledge of New Delhi and NCR transit',
      'Problem-solving skills in physical event logistics',
      'Strong crisis-management mindset'
    ],
    numberRequired: 6,
    status: 'Open'
  }
];

export const DOCUMENTS: DocumentResource[] = [
  {
    id: 'doc-1',
    title: 'AIPPM Study Guide & Committee Mandate',
    programme: 'aippm',
    category: 'Background Guide',
    fileSize: '3.4 MB',
    type: 'PDF',
    description: 'Comprehensive research compilation on legislative reform, party manifests, and constitutional articles.'
  },
  {
    id: 'doc-2',
    title: 'UNCSW Background Dossier & Treaty Precedents',
    programme: 'uncsw',
    category: 'Background Guide',
    fileSize: '4.1 MB',
    type: 'PDF',
    description: 'Historical overview of UN resolutions, regional conventions, and statistical indices on gender equity in STEM.'
  },
  {
    id: 'doc-3',
    title: 'International Press Corps Editorial Manual',
    programme: 'international-press',
    category: 'Stylebook',
    fileSize: '2.2 MB',
    type: 'PDF',
    description: 'Standards of attribution, investigative interviewing, photographic ethics, and dispatch publishing deadlines.'
  },
  {
    id: 'doc-4',
    title: 'Auvreo Code of Conduct & Diplomatic Protocol',
    programme: 'all',
    category: 'General Policy',
    fileSize: '1.2 MB',
    type: 'PDF',
    description: 'Mandatory behavioral guidelines, anti-harassment policy, attendance stipulations, and dress codes.'
  }
];

export const ADMIN_USERS: AdminUser[] = [
  {
    name: 'Super Admin',
    role: 'super-admin',
    title: 'Executive Director',
    department: 'Executive Office',
    email: 'auvreo@gmail.com'
  },
  {
    name: 'Anshika',
    role: 'delegate-affairs',
    title: 'Head of Delegate Affairs',
    department: 'Delegate Affairs',
    email: 'anshika@auvreo.org'
  },
  {
    name: 'Avni',
    role: 'hr-management',
    title: 'Head of HR & Management',
    department: 'HR & Management',
    email: 'avni@auvreo.org'
  },
  {
    name: 'Divyam',
    role: 'organising-committee',
    title: 'Head of Organising Committee',
    department: 'Organising Committee',
    email: 'divyam@auvreo.org'
  },
  {
    name: 'Pooja',
    role: 'social-media',
    title: 'Head of Social Media',
    department: 'Social Media',
    email: 'pooja@auvreo.org'
  },
  {
    name: 'Abhinav',
    role: 'logistics',
    title: 'Head of Logistics',
    department: 'Logistics',
    email: 'abhinav@auvreo.org'
  }
];

export const CONTRIBUTOR_TRACKS = [
  {
    id: 'creator',
    title: 'Creator Track',
    focus: 'Content & Visual Campaigns',
    description: 'Produce authentic short-form videos, documentary reels, and cultural storytelling spotlighting Auvreo principles.',
    deliverables: 'Visual storytelling, video essays, motion design, social coverage.'
  },
  {
    id: 'referral',
    title: 'Referral Track',
    focus: 'Institutional & Delegation Building',
    description: 'Mobilize university delegations, debate societies, and collegiate clubs with verified institutional support.',
    deliverables: 'Institutional delegations, accredited university representation.'
  },
  {
    id: 'outreach',
    title: 'Outreach Track',
    focus: 'Youth Alliances & Civil Society',
    description: 'Build working alliances with non-profit grassroots networks, student unions, and policy think tanks.',
    deliverables: 'Civil society connections, joint community dialogues.'
  },
  {
    id: 'connect',
    title: 'Connect Track',
    focus: 'Institutional & Brand Partnerships',
    description: 'Introduce values-aligned academic institutions, cultural foundations, and enterprise partners.',
    deliverables: 'Strategic brand leads, institutional patron introductions.'
  },
  {
    id: 'storyteller',
    title: 'Storyteller Track',
    focus: 'Editorial Articles & Investigative Writing',
    description: 'Author long-form essays, historical commentary on Delhi, and interviews with grassroots changemakers.',
    deliverables: 'Written dispatches for Auvreo Perspectives & Stories.'
  },
  {
    id: 'builder',
    title: 'Builder Track',
    focus: 'Technology & Digital Architecture',
    description: 'Contribute to Auvresence tools, credential verification systems, and open youth research platforms.',
    deliverables: 'Digital tools, platform features, open source research.'
  }
];

export const INITIAL_PAYMENTS: PaymentSubmission[] = [];

export const INITIAL_IMPACT_SUBMISSIONS: ImpactSubmission[] = [];

export const INITIAL_FELLOW_APPLICATIONS: FellowApplication[] = [];

export const INITIAL_VOLUNTEER_APPLICATIONS: VolunteerApplication[] = [];

export const INITIAL_CONTACT_MESSAGES: ContactMessage[] = [];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [];

export const INITIAL_USERS: UserAccount[] = [
  {
    id: 'auvreo@gmail.com',
    username: 'auvreo@gmail.com',
    password: '22976',
    email: 'auvreo@gmail.com',
    name: 'Auvreo Super Admin',
    role: 'super_admin',
    department: 'Executive Secretariat',
    status: 'active',
    createdAt: '2026-09-01'
  },
  {
    id: 'admin',
    username: 'admin',
    password: '22976',
    email: 'auvreo@gmail.com',
    name: 'Auvreo Executive Directorate',
    role: 'super_admin',
    department: 'Executive Secretariat',
    status: 'active',
    createdAt: '2026-09-01'
  },
  {
    id: 'staff-anshika',
    username: 'staff-anshika',
    password: 'delaffairs2026',
    email: 'anshika@auvreo.org',
    name: 'Anshika Sharma',
    role: 'staff',
    department: 'Delegate Affairs',
    status: 'active',
    createdAt: '2026-09-02'
  },
  {
    id: 'staff-divyam',
    username: 'staff-divyam',
    password: 'orgcomm2026',
    email: 'divyam@auvreo.org',
    name: 'Divyam Verma',
    role: 'staff',
    department: 'Organising Committee',
    status: 'active',
    createdAt: '2026-09-02'
  },
  {
    id: 'staff-avni',
    username: 'staff-avni',
    password: 'hrmanage2026',
    email: 'avni@auvreo.org',
    name: 'Avni Gupta',
    role: 'staff',
    department: 'HR & Management',
    status: 'active',
    createdAt: '2026-09-02'
  },
  {
    id: 'staff-pooja',
    username: 'staff-pooja',
    password: 'socialmedia2026',
    email: 'pooja@auvreo.org',
    name: 'Pooja Nair',
    role: 'staff',
    department: 'Social Media & Communications',
    status: 'active',
    createdAt: '2026-09-02'
  },
  {
    id: 'staff-abhinav',
    username: 'staff-abhinav',
    password: 'logistics2026',
    email: 'abhinav@auvreo.org',
    name: 'Abhinav Sen',
    role: 'staff',
    department: 'Logistics & Venue Operations',
    status: 'active',
    createdAt: '2026-09-02'
  },
  {
    id: 'AUV-2026-1042',
    username: 'AUV-2026-1042',
    password: 'delegate2026',
    email: 'aarav.sharma@example.com',
    name: 'Aarav Sharma',
    role: 'delegate',
    department: 'UNCSW Chamber (Delegate of France)',
    status: 'active',
    createdAt: '2026-09-05'
  },
  {
    id: 'AUV-GUEST-2026',
    username: 'AUV-GUEST-2026',
    password: 'guest2026',
    email: 'guest@auvreo.org',
    name: 'Guest Observer',
    role: 'guest',
    department: 'Observer Delegation',
    status: 'active',
    createdAt: '2026-09-10'
  }
];

export const INITIAL_TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    id: 'milestone-1',
    stage: 'APPLICATIONS',
    title: 'Delegate & Press Applications Opening Soon',
    description: 'Admissions schedule and application dockets for Indian and International delegates, youth researchers, and press correspondents across AIPPM, UNCSW, and International Press will be formally released.',
    date: 'TO BE ANNOUNCED',
    status: 'Upcoming',
    order: 1,
    visible: true
  },
  {
    id: 'milestone-2',
    stage: 'APPLICATION REVIEW',
    title: 'Rolling Secretariat Evaluation',
    description: 'Committee chairs and executive reviewers assess candidate dossiers, policy statements, and intellectual depth on a rolling basis.',
    date: 'ONGOING / ROLLING',
    status: 'Upcoming',
    order: 2,
    visible: true
  },
  {
    id: 'milestone-3',
    stage: 'CONFIRMATION',
    title: 'Cohort Accreditations & Consular Invitations',
    description: 'Confirmed participants receive official provisional seat allocations and official consular visa support dossiers for overseas delegates.',
    date: 'ROLLING ADMISSIONS',
    status: 'Upcoming',
    order: 3,
    visible: true
  },
  {
    id: 'milestone-4',
    stage: 'PRE-SUMMIT PREPARATION',
    title: 'Background Guides & Substantive Dossiers',
    description: 'Release of official committee dossiers, legal working frameworks, and position paper drafting guidelines.',
    date: 'AUTUMN 2026',
    status: 'To Be Announced',
    order: 4,
    visible: true
  },
  {
    id: 'milestone-5',
    stage: 'AUVRESENCE ONBOARDING',
    title: 'Digital Credential Activation & Working Portal',
    description: 'Digital delegate accounts, NFC credential provisioning, real-time caucus rooms, and research archive access.',
    date: 'NOVEMBER 2026',
    status: 'To Be Announced',
    order: 5,
    visible: true
  },
  {
    id: 'milestone-6',
    stage: 'ARRIVAL',
    title: 'Welcoming Delegations to New Delhi',
    description: 'Outstation and international arrivals, bespoke accommodation coordination, and early registration check-in.',
    date: 'DECEMBER 2026',
    status: 'To Be Announced',
    order: 6,
    visible: true
  },
  {
    id: 'milestone-7',
    stage: 'AUVREO INDIA 2026',
    title: 'Inaugural Plenary & 2-Day Summit',
    description: 'Two days of intensive substantive debate, cultural immersion, regional luncheons, and Auvreo Impact Grant presentations.',
    date: 'NEW DELHI • DECEMBER 2026',
    status: 'Upcoming',
    order: 7,
    visible: true,
    ctaText: 'Explore Summit',
    ctaUrl: '#summit'
  }
];

