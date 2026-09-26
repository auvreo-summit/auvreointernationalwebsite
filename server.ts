import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory + file-backed persistent state for production-ready full-stack persistence
const DATA_FILE = path.join(process.cwd(), "server-data.json");

export interface StoredUser {
  id: string; // identifier/username or Application ID e.g. admin, AUV-ADMIN-001, AUV-2026-1042
  username: string;
  password?: string;
  name: string;
  email: string;
  role: 'super_admin' | 'staff' | 'chair' | 'delegate' | 'guest' | 'admin';
  department: string;
  institution?: string;
  country?: string;
  requestNote?: string;
  status: 'active' | 'suspended' | 'pending_approval' | 'declined';
  createdAt: string;
}

interface ServerStore {
  users: Record<string, StoredUser>;
  sessions: Record<string, { id: string; username: string; email: string; name: string; role: string; department?: string; createdAt: string }>;
  contactMessages: any[];
  impactSubmissions: any[];
  fellowApplications: any[];
  volunteerApplications: any[];
  stories: any[];
  applications: any[];
  payments: any[];
  auditLogs: any[];
}

const DEFAULT_USERS: StoredUser[] = [
  {
    id: "auvreo@gmail.com",
    username: "auvreo@gmail.com",
    password: "22976",
    email: "auvreo@gmail.com",
    name: "Auvreo Super Admin",
    role: "super_admin",
    department: "Executive Secretariat",
    status: "active",
    createdAt: "2026-09-01"
  },
  {
    id: "admin",
    username: "admin",
    password: "22976",
    email: "auvreo@gmail.com",
    name: "Auvreo Executive Directorate",
    role: "super_admin",
    department: "Executive Secretariat",
    status: "active",
    createdAt: "2026-09-01"
  },
  {
    id: "AUV-ADMIN-001",
    username: "AUV-ADMIN-001",
    password: "auvreo2026",
    email: "secretariat@auvreo.org",
    name: "Auvreo Super Admin",
    role: "super_admin",
    department: "Executive Secretariat",
    status: "active",
    createdAt: "2026-09-01"
  },
  {
    id: "staff-anshika",
    username: "staff-anshika",
    password: "delaffairs2026",
    email: "anshika@auvreo.org",
    name: "Anshika Sharma",
    role: "staff",
    department: "Delegate Affairs",
    status: "active",
    createdAt: "2026-09-02"
  },
  {
    id: "staff-divyam",
    username: "staff-divyam",
    password: "orgcomm2026",
    email: "divyam@auvreo.org",
    name: "Divyam Verma",
    role: "staff",
    department: "Organising Committee",
    status: "active",
    createdAt: "2026-09-02"
  },
  {
    id: "staff-avni",
    username: "staff-avni",
    password: "hrmanage2026",
    email: "avni@auvreo.org",
    name: "Avni Gupta",
    role: "staff",
    department: "HR & Management",
    status: "active",
    createdAt: "2026-09-02"
  },
  {
    id: "staff-pooja",
    username: "staff-pooja",
    password: "socialmedia2026",
    email: "pooja@auvreo.org",
    name: "Pooja Nair",
    role: "staff",
    department: "Social Media & Communications",
    status: "active",
    createdAt: "2026-09-02"
  },
  {
    id: "staff-abhinav",
    username: "staff-abhinav",
    password: "logistics2026",
    email: "abhinav@auvreo.org",
    name: "Abhinav Sen",
    role: "staff",
    department: "Logistics & Venue Operations",
    status: "active",
    createdAt: "2026-09-02"
  },
  {
    id: "AUV-2026-1042",
    username: "AUV-2026-1042",
    password: "delegate2026",
    email: "aarav.sharma@example.com",
    name: "Aarav Sharma",
    role: "delegate",
    department: "UNCSW Chamber (Delegate of France)",
    status: "active",
    createdAt: "2026-09-05"
  },
  {
    id: "AUV-REQ-8821",
    username: "rohit.delegation",
    password: "delegatePass123",
    email: "rohit.m@iitd.ac.in",
    name: "Rohit Malhotra",
    role: "delegate",
    department: "AIPPM Council (Head Delegate)",
    institution: "IIT Delhi",
    country: "India",
    requestNote: "Leading a curated 8-member university delegation for AI & Tech Governance track.",
    status: "pending_approval",
    createdAt: "2026-09-18"
  },
  {
    id: "AUV-REQ-8822",
    username: "fatima.zahra",
    password: "secretariatStaff26",
    email: "fatima.z@kcl.ac.uk",
    name: "Fatima Al-Zahra",
    role: "staff",
    department: "Delegate Affairs & Protocols",
    institution: "King's College London",
    country: "United Kingdom",
    requestNote: "Appointed rapporteur & international logistics volunteer coordinator.",
    status: "pending_approval",
    createdAt: "2026-09-19"
  },
  {
    id: "AUV-GUEST-2026",
    username: "AUV-GUEST-2026",
    password: "guest2026",
    email: "guest@auvreo.org",
    name: "Guest Observer",
    role: "guest",
    department: "Observer Delegation",
    status: "active",
    createdAt: "2026-09-10"
  }
];

function loadStore(): ServerStore {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (!parsed.users) {
        parsed.users = {};
      }
      // Ensure super admin and default users are present with correct credentials
      DEFAULT_USERS.forEach((u) => {
        if (!parsed.users[u.id.toLowerCase()] || u.id === "auvreo@gmail.com" || u.id === "admin") {
          parsed.users[u.id.toLowerCase()] = u;
        }
      });
      return parsed;
    }
  } catch (err) {
    console.error("Error reading server store:", err);
  }

  const initialUsers: Record<string, StoredUser> = {};
  DEFAULT_USERS.forEach((u) => {
    initialUsers[u.id.toLowerCase()] = u;
  });

  return {
    users: initialUsers,
    sessions: {},
    contactMessages: [
      {
        id: "MSG-1001",
        fullName: "Dr. K. R. Nambiar",
        email: "kr.nambiar@delhi-univ.ac.in",
        subject: "Institutional Delegation Partnership — University of Delhi",
        category: "Institutional Partnerships & Delegations",
        message: "We are interested in sending a curated 12-member delegation of postgraduate international relations scholars to the AIPPM and UNCSW tracks.",
        status: "read",
        submittedAt: "2026-09-10, 11:30 AM IST"
      },
      {
        id: "MSG-1002",
        fullName: "Elena Rostova",
        email: "elena.rostova@sciencespo.fr",
        subject: "Consular Letter & Visa Processing for France Delegation",
        category: "Summit Delegate Inquiries & Visas",
        message: "Requesting guidance regarding consular official invitation letters for French delegates arriving in New Delhi for the December 2026 Summit.",
        status: "unread",
        submittedAt: "2026-09-14, 04:15 PM IST"
      }
    ],
    impactSubmissions: [
      {
        id: "IMP-2001",
        applicantName: "Samarjit Roy",
        email: "samarjit.roy@youthclimate.in",
        projectTitle: "Project Meghdoot: AI-Grounded Himalayan Glacial Monitoring",
        abstract: "A student-led telemetry and participatory sensing platform to predict flash floods and provide early warnings to indigenous mountain communities.",
        domain: "Ecological Resilience & Climate Tech",
        fundingNeeded: "₹1,50,000",
        institution: "IIT Roorkee",
        status: "approved",
        submittedAt: "2026-09-08"
      },
      {
        id: "IMP-2002",
        applicantName: "Amina Al-Mansoor",
        email: "amina.mansoor@uaeu.ac.ae",
        projectTitle: "Cross-Border Youth Peace Archive",
        abstract: "Digital oral history archive preserving collaborative stories of young peacebuilders across South Asia and the GCC.",
        domain: "Diplomatic Literacy & Peace Studies",
        fundingNeeded: "$2,500",
        institution: "UAE University",
        status: "under_review",
        submittedAt: "2026-09-12"
      }
    ],
    fellowApplications: [
      {
        id: "FEL-3001",
        fullName: "Tenzin Norbu",
        email: "tenzin.norbu@oxford.edu",
        institution: "University of Oxford",
        fieldOfResearch: "Trans-Himalayan River Basin Diplomacy & Water Treaties",
        statement: "Dedicated to advancing youth-led hydro-diplomatic frameworks across South Asia.",
        cohortTrack: "Hydro-Diplomacy Track 2026",
        status: "accepted",
        submittedAt: "2026-09-05"
      },
      {
        id: "FEL-3002",
        fullName: "Siddharth Menon",
        email: "siddharth.m@nls.ac.in",
        institution: "NLSIU Bangalore",
        fieldOfResearch: "International Cyber Law & Sovereign Data Enclaves",
        statement: "Researching regulatory parity between Global South tech startups and multinational digital treaties.",
        cohortTrack: "Tech Governance Track 2026",
        status: "under-review",
        submittedAt: "2026-09-15"
      }
    ],
    volunteerApplications: [
      {
        id: "VOL-4001",
        fullName: "Rohan Kapoor",
        email: "rohan.kapoor@du.ac.in",
        phone: "+91 98112 34567",
        preferredDepartment: "Delegate Affairs & Protocols",
        experience: "3 years MUN Secretariat experience, fluent in English, Hindi, and French.",
        status: "approved",
        submittedAt: "2026-09-06"
      },
      {
        id: "VOL-4002",
        fullName: "Meera Sen",
        email: "meera.sen@ashoka.edu.in",
        phone: "+91 97110 98765",
        preferredDepartment: "Media & Press Operations",
        experience: "Editor-in-chief of university journal, professional photography and live dispatch writing.",
        status: "under-review",
        submittedAt: "2026-09-16"
      }
    ],
    stories: [],
    applications: [],
    payments: [],
    auditLogs: [
      {
        id: "AUD-001",
        timestamp: "2026-09-01, 10:00 AM IST",
        adminName: "Executive Secretariat",
        action: "System Initialized",
        details: "Auvreo Diplomatic Platform database initialized and verified."
      }
    ]
  };
}

function saveStore(store: ServerStore) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving server store:", err);
  }
}

const db = loadStore();

// Helper: Authorize User from Bearer token
function getAuthenticatedUser(req: express.Request) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  const token = authHeader.substring(7).trim();
  const session = db.sessions[token];
  if (!session) return null;
  return { token, ...session };
}

// -----------------------------------------------------------------------------
// API ROUTES
// -----------------------------------------------------------------------------

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Auth: Request / Register Temporary Account
app.post("/api/auth/register", (req, res) => {
  try {
    const { name, username, id, email, password, role, department, institution, country, requestNote } = req.body;
    const finalName = (name || "").toString().trim();
    const finalUsername = (username || id || "").toString().trim();
    const finalEmail = (email || "").toString().trim().toLowerCase();
    const finalPassword = (password || "").toString().trim();

    if (!finalName || !finalUsername || !finalEmail || !finalPassword) {
      return res.status(400).json({ error: "Full Name, Desired Username, Email, and Security Password are required." });
    }

    const searchKey = finalUsername.toLowerCase();
    if (
      db.users[searchKey] ||
      Object.values(db.users).some((u) => u.email.toLowerCase() === finalEmail || u.username.toLowerCase() === searchKey || u.id.toLowerCase() === searchKey)
    ) {
      return res.status(400).json({
        error: `An account or accreditation request with Username "${finalUsername}" or Email "${finalEmail}" already exists. Please choose a unique identifier or sign in.`
      });
    }

    const generatedId = `AUV-REQ-${Math.floor(1000 + Math.random() * 9000)}`;
    const newAccount: StoredUser = {
      id: generatedId,
      username: finalUsername,
      password: finalPassword,
      email: finalEmail,
      name: finalName,
      role: role || "delegate",
      department: department || "Diplomatic Delegation & Summit Delegate",
      institution: institution || "Academic / Civil Institution",
      country: country || "India",
      requestNote: requestNote || "Awaiting Secretariat Super Admin accreditation.",
      status: "pending_approval",
      createdAt: new Date().toISOString().split("T")[0]
    };

    // Store by generated ID and lowercase username
    db.users[generatedId.toLowerCase()] = newAccount;
    db.users[searchKey] = newAccount;

    db.auditLogs.unshift({
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST",
      adminName: "Public Accreditation Intake",
      action: "New Account Request Submitted",
      details: `Account request [${generatedId}] for ${finalName} (${finalEmail}) is awaiting Super Admin approval.`
    });

    saveStore(db);

    return res.json({
      success: true,
      message: "Account accreditation request submitted successfully! Your credentials have been created in temporary pending status. The Super Admin will review and approve your account for permanent access.",
      user: {
        id: newAccount.id,
        username: newAccount.username,
        email: newAccount.email,
        name: newAccount.name,
        role: newAccount.role,
        department: newAccount.department,
        institution: newAccount.institution,
        status: newAccount.status,
        createdAt: newAccount.createdAt
      }
    });
  } catch (err: any) {
    console.error("Register account error:", err);
    return res.status(500).json({ error: "Account registration request failed on server." });
  }
});

// Auth: Application ID / Username and Password Login
app.post("/api/auth/login", (req, res) => {
  try {
    const identifier = (req.body.identifier || req.body.username || req.body.id || req.body.email || "").toString().trim();
    const password = (req.body.password || "").toString().trim();

    if (!identifier || !password) {
      return res.status(400).json({ error: "Application ID / Username and Password are required." });
    }

    const searchKey = identifier.toLowerCase();
    
    // Match by id, username, or email
    let userRecord: StoredUser | undefined = db.users[searchKey];
    if (!userRecord) {
      userRecord = Object.values(db.users).find(
        (u) => u.username.toLowerCase() === searchKey || u.email.toLowerCase() === searchKey || u.id.toLowerCase() === searchKey
      );
    }

    if (!userRecord) {
      return res.status(401).json({ error: "Invalid Application ID / Username or Password." });
    }

    if (userRecord.password !== password) {
      return res.status(401).json({ error: "Invalid Application ID / Username or Password." });
    }

    // Check account approval status
    if (userRecord.status === "pending_approval") {
      return res.status(403).json({
        error: `Your account accreditation request [ID: ${userRecord.id}] is currently pending approval by the Super Admin. You will be able to log in as soon as it is approved.`
      });
    }

    if (userRecord.status === "declined") {
      return res.status(403).json({
        error: `This account registration request was reviewed and declined by the Secretariat.`
      });
    }

    if (userRecord.status === "suspended") {
      return res.status(403).json({
        error: "This credential account has been suspended by the Secretariat."
      });
    }

    // Generate secure session token
    const token = `auv_sess_${Buffer.from(`${userRecord.id}:${Date.now()}:${Math.random()}`).toString("base64").replace(/[^a-zA-Z0-9]/g, "").slice(0, 48)}`;

    const sessionData = {
      id: userRecord.id,
      username: userRecord.username,
      email: userRecord.email,
      name: userRecord.name,
      role: userRecord.role,
      department: userRecord.department,
      institution: userRecord.institution,
      country: userRecord.country,
      status: userRecord.status,
      createdAt: userRecord.createdAt
    };

    db.sessions[token] = sessionData;

    // Log authentication in audit trail
    db.auditLogs.unshift({
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST",
      adminName: userRecord.name,
      action: "Credential Login Authenticated",
      details: `User ID [${userRecord.id}] (${userRecord.role}) signed in successfully.`
    });

    saveStore(db);

    return res.json({
      success: true,
      token,
      user: sessionData
    });
  } catch (err: any) {
    console.error("Login endpoint error:", err);
    return res.status(500).json({ error: "Authentication system error. Please try again." });
  }
});

// Auth: Current Session Verification
app.get("/api/auth/me", (req, res) => {
  const user = getAuthenticatedUser(req);
  if (!user) {
    return res.status(401).json({ authenticated: false, user: null });
  }
  return res.json({ authenticated: true, user });
});

// Auth: Logout
app.post("/api/auth/logout", (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7).trim();
    delete db.sessions[token];
    saveStore(db);
  }
  return res.json({ success: true, message: "Logged out successfully" });
});

// Protected: Super Admin - Retrieve All User Accounts & Credentials
app.get("/api/admin/users", (req, res) => {
  const user = getAuthenticatedUser(req);
  if (!user || (user.role !== "super_admin" && user.role !== "admin" && user.role !== "staff")) {
    return res.status(403).json({ error: "Access denied. Super Admin authorization required." });
  }

  const userList = Object.values(db.users).map((u) => ({
    id: u.id,
    username: u.username,
    password: user.role === "super_admin" ? u.password : "••••••••",
    name: u.name,
    email: u.email,
    role: u.role,
    department: u.department,
    institution: u.institution,
    country: u.country,
    requestNote: u.requestNote,
    status: u.status,
    createdAt: u.createdAt
  }));

  return res.json({ success: true, users: userList });
});

// Protected: Super Admin - Approve Temporary Account Request
app.post("/api/admin/users/:id/approve", (req, res) => {
  const authUser = getAuthenticatedUser(req);
  if (!authUser || authUser.role !== "super_admin") {
    return res.status(403).json({ error: "Access denied. Super Admin authorization required to approve accounts." });
  }

  const { id } = req.params;
  const key = id.toLowerCase();
  const targetUser = db.users[key] || Object.values(db.users).find((u) => u.id.toLowerCase() === key || u.username.toLowerCase() === key);

  if (!targetUser) {
    return res.status(404).json({ error: `User with ID "${id}" not found.` });
  }

  const { role, department } = req.body;
  if (role) targetUser.role = role;
  if (department) targetUser.department = department.toString().trim();
  targetUser.status = "active";

  db.auditLogs.unshift({
    id: `AUD-${Date.now().toString().slice(-4)}`,
    timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST",
    adminName: authUser.name,
    action: "Account Request Approved & Activated",
    details: `Super Admin approved account [${targetUser.id}] for ${targetUser.name} (${targetUser.email}) with role "${targetUser.role}". Login unlocked.`
  });

  saveStore(db);
  return res.json({ success: true, message: `Account ${targetUser.id} approved successfully. User can now sign in.`, user: targetUser });
});

// Protected: Super Admin - Decline Temporary Account Request
app.post("/api/admin/users/:id/decline", (req, res) => {
  const authUser = getAuthenticatedUser(req);
  if (!authUser || authUser.role !== "super_admin") {
    return res.status(403).json({ error: "Access denied. Super Admin authorization required to decline requests." });
  }

  const { id } = req.params;
  const key = id.toLowerCase();
  const targetUser = db.users[key] || Object.values(db.users).find((u) => u.id.toLowerCase() === key || u.username.toLowerCase() === key);

  if (!targetUser) {
    return res.status(404).json({ error: `User with ID "${id}" not found.` });
  }

  targetUser.status = "declined";

  db.auditLogs.unshift({
    id: `AUD-${Date.now().toString().slice(-4)}`,
    timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST",
    adminName: authUser.name,
    action: "Account Request Declined",
    details: `Super Admin declined account request [${targetUser.id}] for ${targetUser.name}.`
  });

  saveStore(db);
  return res.json({ success: true, message: `Account request ${targetUser.id} declined.`, user: targetUser });
});

// Protected: Super Admin - Create New ID & Password Account
app.post("/api/admin/users", (req, res) => {
  const user = getAuthenticatedUser(req);
  if (!user || user.role !== "super_admin") {
    return res.status(403).json({ error: "Access denied. Super Admin authorization required to create accounts." });
  }

  const { id, username, password, name, email, role, department, institution, country } = req.body;

  const finalId = (id || username || "").toString().trim();
  const finalUsername = (username || id || "").toString().trim();
  const finalPassword = (password || "").toString().trim();
  const finalName = (name || "").toString().trim();
  const finalEmail = (email || "").toString().trim();

  if (!finalId || !finalPassword || !finalName) {
    return res.status(400).json({ error: "Application ID/Username, Password, and Full Name are required." });
  }

  const searchKey = finalId.toLowerCase();
  if (db.users[searchKey]) {
    return res.status(400).json({ error: `An account with ID / Username "${finalId}" already exists.` });
  }

  const newUser: StoredUser = {
    id: finalId,
    username: finalUsername,
    password: finalPassword,
    name: finalName,
    email: finalEmail || `${finalUsername.toLowerCase()}@auvreo.org`,
    role: role || "staff",
    department: department || "Secretariat Operations",
    institution: institution || "Auvreo International",
    country: country || "India",
    status: "active",
    createdAt: new Date().toISOString().split("T")[0]
  };

  db.users[searchKey] = newUser;

  db.auditLogs.unshift({
    id: `AUD-${Date.now().toString().slice(-4)}`,
    timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST",
    adminName: user.name,
    action: "New Credential Account Created",
    details: `Created account [${newUser.id}] for ${newUser.name} with role "${newUser.role}".`
  });

  saveStore(db);

  return res.json({ success: true, user: newUser });
});

// Protected: Super Admin - Update User Account (password, status, role, department)
app.put("/api/admin/users/:id", (req, res) => {
  const authUser = getAuthenticatedUser(req);
  if (!authUser || authUser.role !== "super_admin") {
    return res.status(403).json({ error: "Access denied. Super Admin authorization required." });
  }

  const { id } = req.params;
  const key = id.toLowerCase();
  const targetUser = db.users[key] || Object.values(db.users).find((u) => u.id.toLowerCase() === key);

  if (!targetUser) {
    return res.status(404).json({ error: `User with ID "${id}" not found.` });
  }

  const { password, name, email, role, department, status } = req.body;

  if (password) targetUser.password = password.toString().trim();
  if (name) targetUser.name = name.toString().trim();
  if (email) targetUser.email = email.toString().trim();
  if (role) targetUser.role = role;
  if (department) targetUser.department = department.toString().trim();
  if (status) targetUser.status = status;

  db.auditLogs.unshift({
    id: `AUD-${Date.now().toString().slice(-4)}`,
    timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST",
    adminName: authUser.name,
    action: "Credential Account Updated",
    details: `Updated account [${targetUser.id}] (${targetUser.name}).`
  });

  saveStore(db);

  return res.json({ success: true, user: targetUser });
});

// Protected: Super Admin - Delete User Account
app.delete("/api/admin/users/:id", (req, res) => {
  const authUser = getAuthenticatedUser(req);
  if (!authUser || authUser.role !== "super_admin") {
    return res.status(403).json({ error: "Access denied. Super Admin authorization required." });
  }

  const { id } = req.params;
  const key = id.toLowerCase();

  if (key === "admin" || key === "auv-admin-001") {
    return res.status(400).json({ error: "The primary Super Admin account cannot be deleted." });
  }

  if (db.users[key]) {
    const deletedName = db.users[key].name;
    delete db.users[key];

    db.auditLogs.unshift({
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST",
      adminName: authUser.name,
      action: "Credential Account Deleted",
      details: `Deleted account ID [${id}] (${deletedName}).`
    });

    saveStore(db);
    return res.json({ success: true, message: `Account ${id} deleted.` });
  }

  return res.status(404).json({ error: `User with ID "${id}" not found.` });
});

// Protected: Admin live database retrieval
app.get("/api/admin/data", (req, res) => {
  const user = getAuthenticatedUser(req);
  if (!user || (user.role !== "super_admin" && user.role !== "admin" && user.role !== "staff")) {
    return res.status(403).json({ error: "Access denied. Super Admin authorization required." });
  }

  return res.json({
    users: Object.values(db.users),
    applications: db.applications,
    payments: db.payments,
    contactMessages: db.contactMessages,
    impactSubmissions: db.impactSubmissions,
    fellowApplications: db.fellowApplications,
    volunteerApplications: db.volunteerApplications,
    stories: db.stories,
    auditLogs: db.auditLogs,
    sessionsCount: Object.keys(db.sessions).length
  });
});

// Public: Registration status & Summit application endpoint (Enforces closed status)
const REGISTRATION_STATUS: string = 'coming_soon';

app.get("/api/registration-status", (req, res) => {
  return res.json({ 
    status: REGISTRATION_STATUS, 
    message: "Applications for Auvreo International Youth Summit — India 2026 are not currently open. Registration details will be announced soon." 
  });
});

app.post("/api/applications", (req, res) => {
  if (REGISTRATION_STATUS !== 'open') {
    return res.status(403).json({
      error: "Applications for Auvreo International Youth Summit — India 2026 are not currently open. Registration details will be announced soon.",
      status: REGISTRATION_STATUS
    });
  }
  return res.status(400).json({ error: "Invalid application submission payload." });
});

// Public: Contact inquiry submission
app.post("/api/contact", (req, res) => {
  const { fullName, email, subject, category, message } = req.body;
  if (!fullName || !email || !message) {
    return res.status(400).json({ error: "Missing required contact fields." });
  }

  const newContact = {
    id: `MSG-${Date.now().toString().slice(-4)}`,
    fullName,
    email,
    subject: subject || "General Inquiry",
    category: category || "General & Institutional Information",
    message,
    status: "unread",
    submittedAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST"
  };

  db.contactMessages.unshift(newContact);
  saveStore(db);

  return res.json({ success: true, contact: newContact });
});

// Public: Impact idea submission
app.post("/api/impact", (req, res) => {
  const sub = req.body;
  if (!sub.applicantName || !sub.email || !sub.projectTitle) {
    return res.status(400).json({ error: "Missing required impact submission fields." });
  }

  const newImpact = {
    ...sub,
    id: `IMP-${Date.now().toString().slice(-4)}`,
    status: "submitted",
    submittedAt: new Date().toISOString().split("T")[0]
  };

  db.impactSubmissions.unshift(newImpact);
  saveStore(db);

  return res.json({ success: true, impact: newImpact });
});

// Public: Fellow application
app.post("/api/fellows", (req, res) => {
  const appData = req.body;
  if (!appData.fullName || !appData.email) {
    return res.status(400).json({ error: "Missing required fellow application fields." });
  }

  const newFellow = {
    ...appData,
    id: `FEL-${Date.now().toString().slice(-4)}`,
    status: "under-review",
    submittedAt: new Date().toISOString().split("T")[0]
  };

  db.fellowApplications.unshift(newFellow);
  saveStore(db);

  return res.json({ success: true, fellow: newFellow });
});

// Public: Volunteer application
app.post("/api/volunteers", (req, res) => {
  const volData = req.body;
  if (!volData.fullName || !volData.email) {
    return res.status(400).json({ error: "Missing required volunteer fields." });
  }

  const newVol = {
    ...volData,
    id: `VOL-${Date.now().toString().slice(-4)}`,
    status: "submitted",
    submittedAt: new Date().toISOString().split("T")[0]
  };

  db.volunteerApplications.unshift(newVol);
  saveStore(db);

  return res.json({ success: true, volunteer: newVol });
});

// Public: Story contribution
app.post("/api/stories", (req, res) => {
  const storyData = req.body;
  if (!storyData.title || !storyData.author) {
    return res.status(400).json({ error: "Missing story title or author." });
  }

  const newStory = {
    ...storyData,
    id: `st-${Date.now().toString().slice(-4)}`,
    date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })
  };

  db.stories.unshift(newStory);
  saveStore(db);

  return res.json({ success: true, story: newStory });
});

// Protected: Admin generic intake status updater (contact, impact, fellows, volunteers, stories)
app.put("/api/admin/intakes/:type/:id", (req, res) => {
  const user = getAuthenticatedUser(req);
  if (!user || user.role !== "super_admin") {
    return res.status(403).json({ error: "Access denied. Only Super Admin can modify intake statuses." });
  }

  const { type, id } = req.params;
  const { status } = req.body;

  let targetList: any[] | null = null;
  if (type === "contact") targetList = db.contactMessages;
  else if (type === "impact") targetList = db.impactSubmissions;
  else if (type === "fellows") targetList = db.fellowApplications;
  else if (type === "volunteers") targetList = db.volunteerApplications;
  else if (type === "stories") targetList = db.stories;

  if (!targetList) {
    return res.status(400).json({ error: `Invalid intake type "${type}".` });
  }

  const item = targetList.find((x) => x.id === id);
  if (!item) {
    return res.status(404).json({ error: `Item with ID "${id}" not found.` });
  }

  item.status = status;
  db.auditLogs.unshift({
    id: `AUD-${Date.now().toString().slice(-4)}`,
    timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST",
    adminName: user.name,
    action: `Intake [${type}] Status Updated`,
    details: `Updated ${type} item ID [${id}] status to "${status}".`
  });

  saveStore(db);
  return res.json({ success: true, item });
});

// Protected: Super Admin generic intake deleter
app.delete("/api/admin/intakes/:type/:id", (req, res) => {
  const user = getAuthenticatedUser(req);
  if (!user || user.role !== "super_admin") {
    return res.status(403).json({ error: "Access denied. Only Super Admin can delete records." });
  }

  const { type, id } = req.params;

  let targetList: any[] | null = null;
  if (type === "contact") targetList = db.contactMessages;
  else if (type === "impact") targetList = db.impactSubmissions;
  else if (type === "fellows") targetList = db.fellowApplications;
  else if (type === "volunteers") targetList = db.volunteerApplications;
  else if (type === "stories") targetList = db.stories;

  if (!targetList) {
    return res.status(400).json({ error: `Invalid intake type "${type}".` });
  }

  const index = targetList.findIndex((x) => x.id === id);
  if (index === -1) {
    return res.status(404).json({ error: `Item with ID "${id}" not found.` });
  }

  const removed = targetList.splice(index, 1)[0];
  db.auditLogs.unshift({
    id: `AUD-${Date.now().toString().slice(-4)}`,
    timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST",
    adminName: user.name,
    action: `Intake [${type}] Record Deleted`,
    details: `Deleted ${type} record ID [${id}].`
  });

  saveStore(db);
  return res.json({ success: true, removed });
});

// -----------------------------------------------------------------------------
// VITE MIDDLEWARE & STATIC SERVING
// -----------------------------------------------------------------------------
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Auvreo Server] Active and listening on http://0.0.0.0:${PORT}`);
  });
}

start();
