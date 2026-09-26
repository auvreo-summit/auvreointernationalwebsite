import React, { useState } from 'react';
import { useAuvreo } from '../../context/AuvreoContext';
import { UserAccount } from '../../types';
import { 
  Users, 
  UserPlus, 
  KeyRound, 
  Shield, 
  Search, 
  Filter, 
  Copy, 
  Check, 
  Eye, 
  EyeOff, 
  Trash2, 
  Edit3, 
  Lock, 
  Unlock, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  UserCheck,
  UserX,
  Clock,
  ThumbsUp,
  ThumbsDown,
  Building,
  Globe2,
  Mail,
  FileText
} from 'lucide-react';
import { sound } from '../../utils/audio';

export const UserManagementPanel: React.FC = () => {
  const { 
    users, 
    createUserAccount, 
    updateUserAccount, 
    deleteUserAccount, 
    approveUserAccount,
    declineUserAccount,
    refreshUsers, 
    currentUser 
  } = useAuvreo();

  const isSuperAdmin = currentUser?.role === 'super_admin' || currentUser?.role === 'admin';

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [revealedPasswords, setRevealedPasswords] = useState<Record<string, boolean>>({});
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  // Edit User Modal state
  const [editingUser, setEditingUser] = useState<UserAccount | null>(null);
  const [editPassword, setEditPassword] = useState('');
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editRole, setEditRole] = useState<any>('staff');
  const [editDept, setEditDept] = useState('');
  const [editInstitution, setEditInstitution] = useState('');
  const [editCountry, setEditCountry] = useState('');
  const [editStatus, setEditStatus] = useState<'active' | 'suspended' | 'pending_approval' | 'declined'>('active');

  // New User Form State
  const [newId, setNewId] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<'super_admin' | 'staff' | 'chair' | 'delegate' | 'guest'>('staff');
  const [newDept, setNewDept] = useState('Secretariat Operations');
  const [newInstitution, setNewInstitution] = useState('');
  const [newCountry, setNewCountry] = useState('India');

  const generateRandomPassword = () => {
    const chars = 'abcdefghjkmnpqrstuvwxyz23456789';
    let res = '';
    for (let i = 0; i < 8; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `${newRole === 'super_admin' ? 'admin' : newRole}${res}`;
  };

  const generateNextId = () => {
    if (newRole === 'delegate') {
      return `AUV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    } else if (newRole === 'staff') {
      const slug = newName ? newName.toLowerCase().replace(/[^a-z]/g, '') : 'member';
      return `staff-${slug || Math.floor(100 + Math.random() * 900)}`;
    } else if (newRole === 'super_admin') {
      return `AUV-ADMIN-${Math.floor(100 + Math.random() * 900)}`;
    } else if (newRole === 'guest') {
      return `AUV-GUEST-${Math.floor(1000 + Math.random() * 9000)}`;
    }
    return `AUV-${Math.floor(1000 + Math.random() * 9000)}`;
  };

  const handleOpenCreateModal = () => {
    sound.playClick();
    const generatedPass = generateRandomPassword();
    setNewPassword(generatedPass);
    setNewId('');
    setNewUsername('');
    setNewName('');
    setNewEmail('');
    setNewRole('staff');
    setNewDept('Delegate Affairs');
    setNewInstitution('');
    setNewCountry('India');
    setFeedbackMsg(null);
    setIsCreateModalOpen(true);
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();

    if (!newName.trim() || !newPassword.trim()) {
      sound.playError();
      setFeedbackMsg({ type: 'error', text: 'Full Name and Password are required.' });
      return;
    }

    const finalId = (newId || newUsername || generateNextId()).trim();
    const finalUsername = (newUsername || finalId).trim();

    setIsSubmitting(true);
    setFeedbackMsg(null);

    try {
      const result = await createUserAccount({
        id: finalId,
        username: finalUsername,
        password: newPassword.trim(),
        name: newName.trim(),
        email: newEmail.trim() || `${finalUsername.toLowerCase()}@auvreo.org`,
        role: newRole,
        department: newDept.trim() || 'Secretariat Operations',
        institution: newInstitution.trim(),
        country: newCountry.trim()
      });

      if (result.success) {
        sound.playSuccess();
        setFeedbackMsg({ 
          type: 'success', 
          text: `Account created & activated successfully! ID: "${finalId}" | Password: "${newPassword.trim()}".` 
        });
        setIsCreateModalOpen(false);
      } else {
        sound.playError();
        setFeedbackMsg({ type: 'error', text: result.error || 'Failed to create user account.' });
      }
    } catch (err: any) {
      sound.playError();
      setFeedbackMsg({ type: 'error', text: err.message || 'Error creating user account.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApprove = async (user: UserAccount) => {
    if (!isSuperAdmin) {
      alert('Only the Super Administrator has authority to approve and activate accounts.');
      return;
    }
    sound.playClick();
    setActionLoadingId(user.id);
    try {
      const res = await approveUserAccount(user.id, user.role, user.department);
      if (res.success) {
        sound.playSuccess();
        setFeedbackMsg({
          type: 'success',
          text: `Account for ${user.name} (${user.id}) has been APPROVED! They can now log in permanently using their credentials.`
        });
      } else {
        sound.playError();
        setFeedbackMsg({ type: 'error', text: res.error || 'Failed to approve account.' });
      }
    } catch (err: any) {
      sound.playError();
      setFeedbackMsg({ type: 'error', text: err.message || 'Error approving account.' });
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDecline = async (user: UserAccount) => {
    if (!isSuperAdmin) {
      alert('Only the Super Administrator has authority to decline accounts.');
      return;
    }
    if (!window.confirm(`Are you sure you want to decline accreditation request for "${user.name}" (${user.id})?`)) {
      return;
    }
    sound.playDecline();
    setActionLoadingId(user.id);
    try {
      const res = await declineUserAccount(user.id);
      if (res.success) {
        setFeedbackMsg({
          type: 'success',
          text: `Account request for ${user.name} (${user.id}) has been marked as declined.`
        });
      } else {
        sound.playError();
        setFeedbackMsg({ type: 'error', text: res.error || 'Failed to decline account.' });
      }
    } catch (err: any) {
      sound.playError();
      setFeedbackMsg({ type: 'error', text: err.message || 'Error declining account.' });
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleStartEdit = (user: UserAccount) => {
    sound.playClick();
    setEditingUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditPassword(user.password || '');
    setEditRole(user.role);
    setEditDept(user.department || 'Secretariat Operations');
    setEditInstitution(user.institution || '');
    setEditCountry(user.country || 'India');
    setEditStatus(user.status || 'active');
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    sound.playClick();

    setIsSubmitting(true);
    try {
      const res = await updateUserAccount(editingUser.id, {
        name: editName.trim(),
        email: editEmail.trim(),
        password: editPassword.trim(),
        role: editRole,
        department: editDept.trim(),
        institution: editInstitution.trim(),
        country: editCountry.trim(),
        status: editStatus
      });

      if (res.success) {
        sound.playSuccess();
        setFeedbackMsg({ type: 'success', text: `Account for ${editName} updated successfully.` });
        setEditingUser(null);
      } else {
        sound.playError();
        setFeedbackMsg({ type: 'error', text: res.error || 'Failed to update account.' });
      }
    } catch (err: any) {
      sound.playError();
      setFeedbackMsg({ type: 'error', text: err.message || 'Error updating account.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!isSuperAdmin) {
      alert('Only the Super Administrator has authority to delete accounts.');
      return;
    }

    if (id.toLowerCase() === 'admin' || id.toLowerCase() === 'auv-admin-001') {
      alert('The primary Super Admin account cannot be removed.');
      return;
    }

    if (!window.confirm(`Are you sure you want to permanently delete credentials for "${name}" (ID: ${id})?`)) {
      return;
    }

    sound.playClick();
    const res = await deleteUserAccount(id);
    if (res.success) {
      sound.playSuccess();
      setFeedbackMsg({ type: 'success', text: `Account ID "${id}" has been deleted.` });
    } else {
      sound.playError();
      setFeedbackMsg({ type: 'error', text: res.error || 'Failed to delete user.' });
    }
  };

  const togglePasswordVisibility = (userId: string) => {
    sound.playClick();
    setRevealedPasswords(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  const copyToClipboard = (text: string, id: string) => {
    sound.playClick();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Separate pending requests from approved accounts
  const pendingUsers = users.filter(u => u.status === 'pending_approval');
  const activeUsers = users.filter(u => u.status === 'active');
  const declinedUsers = users.filter(u => u.status === 'declined');

  // Filter users for the main roster
  const filteredUsers = users.filter(u => {
    const search = searchTerm.toLowerCase();
    const matchesSearch = 
      (u.name || '').toLowerCase().includes(search) ||
      (u.username || '').toLowerCase().includes(search) ||
      (u.id || '').toLowerCase().includes(search) ||
      (u.email || '').toLowerCase().includes(search) ||
      (u.department || '').toLowerCase().includes(search) ||
      (u.institution || '').toLowerCase().includes(search) ||
      (u.country || '').toLowerCase().includes(search);

    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || (u.status || 'active') === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const superAdminCount = users.filter(u => (u.role === 'super_admin' || u.role === 'admin') && u.status === 'active').length;
  const staffCount = users.filter(u => (u.role === 'staff' || u.role === 'chair') && u.status === 'active').length;
  const delegateCount = users.filter(u => (u.role === 'delegate' || u.role === 'guest') && u.status === 'active').length;

  return (
    <div className="space-y-6">
      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {/* Pending Requests Stat Card */}
        <div 
          onClick={() => {
            sound.playClick();
            setStatusFilter('pending_approval');
          }}
          className={`p-4 rounded-2xl cursor-pointer transition-all ${
            pendingUsers.length > 0 
              ? 'bg-[#1a0f05] border border-[#e6c887] shadow-lg shadow-[#e6c887]/10' 
              : 'bg-[#140306] border border-white/10'
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
              pendingUsers.length > 0 ? 'bg-[#e6c887]/20 border border-[#e6c887]/50 text-[#e6c887]' : 'bg-white/5 border border-white/10 text-[#a89c99]'
            }`}>
              <Clock className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="text-2xl font-bold font-display text-[#e6c887]">{pendingUsers.length}</div>
              <div className="text-[11px] text-[#e6c887] uppercase font-mono font-bold">Pending Approvals</div>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#140306] border border-[#e51e2b]/30 flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#e51e2b]/15 border border-[#e51e2b]/30 flex items-center justify-center text-[#e51e2b]">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-bold font-display text-white">{superAdminCount}</div>
            <div className="text-[11px] text-[#a89c99] uppercase font-mono">Super Admins</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#140306] border border-white/10 flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-bold font-display text-white">{staffCount}</div>
            <div className="text-[11px] text-[#a89c99] uppercase font-mono">Secretariat Staff</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#140306] border border-white/10 flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-bold font-display text-white">{delegateCount}</div>
            <div className="text-[11px] text-[#a89c99] uppercase font-mono">Active Delegates</div>
          </div>
        </div>
      </div>

      {/* Role Notice Banner */}
      {!isSuperAdmin && (
        <div className="p-4 rounded-2xl bg-[#e6c887]/10 border border-[#e6c887]/30 flex items-center gap-3 text-xs text-[#e6c887]">
          <Shield className="w-5 h-5 shrink-0 text-[#e6c887]" />
          <div>
            <span className="font-bold">Secretariat Staff Mode (Inspection Only)</span>: You can view account statuses and request dossiers. Account approval, activation, password updates, and deletions are strictly restricted to the Super Admin.
          </div>
        </div>
      )}

      {/* Feedback Banner */}
      {feedbackMsg && (
        <div className={`p-4 rounded-2xl border flex items-center justify-between gap-3 text-xs animate-in fade-in duration-200 ${
          feedbackMsg.type === 'success' 
            ? 'bg-[#10b981]/15 border-[#10b981]/40 text-[#10b981]' 
            : 'bg-[#ff4d4d]/15 border-[#ff4d4d]/40 text-[#ff4d4d]'
        }`}>
          <div className="flex items-center gap-2">
            {feedbackMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
            <span className="font-medium">{feedbackMsg.text}</span>
          </div>
          <button 
            onClick={() => setFeedbackMsg(null)} 
            className="text-[10px] uppercase font-mono tracking-wider opacity-70 hover:opacity-100"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* SECTION 1: PENDING ACCOUNT APPROVALS QUEUE (If any exist) */}
      {pendingUsers.length > 0 && (
        <div className="bg-[#190a07] border-2 border-[#e6c887]/60 rounded-3xl p-5 sm:p-6 shadow-2xl shadow-[#e6c887]/10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e6c887]/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#e6c887]/20 border border-[#e6c887]/40 flex items-center justify-center text-[#e6c887]">
                <Clock className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
              </div>
              <div>
                <h3 className="text-base font-bold font-display text-white flex items-center gap-2">
                  <span>Pending Account Accreditation Requests</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#e6c887] text-black font-bold text-xs">
                    {pendingUsers.length} Pending
                  </span>
                </h3>
                <p className="text-xs text-[#a89c99]">
                  New account requests created via the public portal. Approve to grant permanent login access or decline.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingUsers.map((pUser) => (
              <div 
                key={pUser.id}
                className="p-4 rounded-2xl bg-[#120306] border border-[#e6c887]/40 space-y-3 relative hover:border-[#e6c887] transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white text-sm">{pUser.name}</h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#e6c887]/20 text-[#e6c887] border border-[#e6c887]/40">
                        {pUser.role.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#e6c887] mt-0.5 flex items-center gap-1.5 font-mono">
                      <span>ID: {pUser.id}</span>
                      <span>•</span>
                      <span>Username: {pUser.username}</span>
                    </div>
                  </div>

                  <span className="px-2 py-1 rounded-lg bg-[#e6c887]/15 border border-[#e6c887]/30 text-[10px] font-mono font-bold text-[#e6c887] flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Awaiting Review
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-[#d8cfcb] bg-black/30 p-3 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2 text-[11px]">
                    <Mail className="w-3.5 h-3.5 text-[#a89c99] shrink-0" />
                    <span className="font-mono text-white">{pUser.email}</span>
                  </div>

                  {pUser.institution && (
                    <div className="flex items-center gap-2 text-[11px]">
                      <Building className="w-3.5 h-3.5 text-[#a89c99] shrink-0" />
                      <span>{pUser.institution}</span>
                    </div>
                  )}

                  {pUser.country && (
                    <div className="flex items-center gap-2 text-[11px]">
                      <Globe2 className="w-3.5 h-3.5 text-[#a89c99] shrink-0" />
                      <span>{pUser.country}</span>
                    </div>
                  )}

                  {pUser.requestNote && (
                    <div className="mt-2 pt-2 border-t border-white/5 text-[11px] text-[#a89c99] flex items-start gap-2">
                      <FileText className="w-3.5 h-3.5 text-[#e6c887] shrink-0 mt-0.5" />
                      <span className="italic">"{pUser.requestNote}"</span>
                    </div>
                  )}
                </div>

                {/* Approve / Decline Controls */}
                <div className="pt-1 flex items-center justify-end gap-2">
                  {isSuperAdmin ? (
                    <>
                      <button
                        type="button"
                        disabled={actionLoadingId === pUser.id}
                        onClick={() => handleDecline(pUser)}
                        className="px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 font-semibold text-xs flex items-center gap-1.5 transition-all disabled:opacity-50"
                      >
                        <ThumbsDown className="w-3.5 h-3.5" />
                        <span>Decline</span>
                      </button>

                      <button
                        type="button"
                        disabled={actionLoadingId === pUser.id}
                        onClick={() => handleApprove(pUser)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#34d399] hover:to-[#10b981] text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-[#10b981]/20 transition-all disabled:opacity-50"
                      >
                        {actionLoadingId === pUser.id ? (
                          <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <ThumbsUp className="w-3.5 h-3.5" />
                        )}
                        <span>Approve & Activate Login</span>
                      </button>
                    </>
                  ) : (
                    <span className="text-[11px] text-[#a89c99] italic">
                      Super Admin approval required to activate login.
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: MANAGEMENT TOOLBAR */}
      <div className="bg-[#120306] border border-[#e51e2b]/30 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search & Filters */}
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 text-[#a89c99] absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by ID, username, name, department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#1b0509] border border-white/10 text-white text-xs placeholder:text-[#6e5d61] focus:outline-none focus:border-[#e51e2b]"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#1b0509] border border-white/10 text-white text-xs focus:outline-none focus:border-[#e51e2b]"
            >
              <option value="all">All Roles</option>
              <option value="super_admin">Super Admins</option>
              <option value="staff">Secretariat Staff</option>
              <option value="delegate">Delegates</option>
              <option value="guest">Observers & Guests</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#1b0509] border border-white/10 text-white text-xs focus:outline-none focus:border-[#e51e2b]"
            >
              <option value="all">All Statuses ({users.length})</option>
              <option value="pending_approval">Pending Approval ({pendingUsers.length})</option>
              <option value="active">Active Only ({activeUsers.length})</option>
              <option value="declined">Declined ({declinedUsers.length})</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              sound.playClick();
              refreshUsers();
            }}
            title="Refresh accounts from server"
            className="p-2.5 rounded-xl bg-[#1b0509] border border-white/10 text-[#a89c99] hover:text-white hover:border-white/25 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {isSuperAdmin && (
            <button
              onClick={handleOpenCreateModal}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#e51e2b] to-[#a80e1d] hover:from-[#ff2438] hover:to-[#c41223] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#e51e2b]/30 transition-all"
            >
              <UserPlus className="w-4 h-4" />
              <span>Create ID & Password</span>
            </button>
          )}
        </div>
      </div>

      {/* SECTION 3: USER ACCOUNTS TABLE */}
      <div className="bg-[#120306] border border-[#e51e2b]/30 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#d8cfcb]">
            <thead className="bg-[#1b0509] border-b border-[#e51e2b]/20 text-[10px] font-mono uppercase tracking-wider text-[#e6c887]">
              <tr>
                <th className="py-3.5 px-4">User & Department</th>
                <th className="py-3.5 px-4">Application ID / Username</th>
                <th className="py-3.5 px-4">Security Password</th>
                <th className="py-3.5 px-4">Role & Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-[#a89c99]">
                    <UserX className="w-8 h-8 mx-auto text-[#6e5d61] mb-2" />
                    <p className="text-sm font-medium text-white">No credential accounts found</p>
                    <p className="text-xs text-[#a89c99] mt-0.5">Try clearing search filters or click "Create ID & Password" above.</p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const isRevealed = revealedPasswords[u.id];
                  const passwordDisplay = isRevealed ? (u.password || '••••••••') : '••••••••';
                  const isCopied = copiedId === u.id;
                  const isPrimaryAdmin = u.id.toLowerCase() === 'admin' || u.id.toLowerCase() === 'auv-admin-001';
                  const isPending = u.status === 'pending_approval';

                  return (
                    <tr key={u.id} className={`transition-colors group ${isPending ? 'bg-[#e6c887]/5 hover:bg-[#e6c887]/10' : 'hover:bg-white/[0.02]'}`}>
                      {/* Name & Department */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white text-sm flex items-center gap-2">
                          <span>{u.name}</span>
                          {isPending && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#e6c887]/20 text-[#e6c887] border border-[#e6c887]/40">
                              PENDING
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-[#e6c887]">{u.department || 'Secretariat Operations'}</div>
                        <div className="text-[10px] font-mono text-[#a89c99]">{u.email}</div>
                        {u.institution && (
                          <div className="text-[10px] text-[#a89c99] italic">{u.institution}</div>
                        )}
                      </td>

                      {/* Application ID / Username */}
                      <td className="py-3.5 px-4 font-mono">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-lg bg-[#1b0509] border border-[#e51e2b]/30 text-[#e6c887] font-semibold text-xs">
                            {u.id}
                          </span>
                          <button
                            onClick={() => copyToClipboard(u.id, `id-${u.id}`)}
                            title="Copy Application ID"
                            className="p-1 rounded text-[#a89c99] hover:text-white transition-colors"
                          >
                            {copiedId === `id-${u.id}` ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                        {u.username !== u.id && (
                          <div className="text-[10px] text-[#a89c99] mt-0.5">User: {u.username}</div>
                        )}
                      </td>

                      {/* Password */}
                      <td className="py-3.5 px-4 font-mono">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-lg bg-[#1b0509] border border-white/10 text-white font-semibold text-xs tracking-wider">
                            {passwordDisplay}
                          </span>
                          
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility(u.id)}
                            title={isRevealed ? "Hide password" : "Show password"}
                            className="p-1 rounded text-[#a89c99] hover:text-white transition-colors"
                          >
                            {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>

                          <button
                            type="button"
                            onClick={() => copyToClipboard(u.password || '', `pass-${u.id}`)}
                            title="Copy Password"
                            className="p-1 rounded text-[#a89c99] hover:text-white transition-colors"
                          >
                            {copiedId === `pass-${u.id}` ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </td>

                      {/* Role & Status */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold ${
                            u.role === 'super_admin' ? 'bg-[#e51e2b]/20 border border-[#e51e2b]/40 text-[#e51e2b]' :
                            u.role === 'staff' ? 'bg-[#e6c887]/20 border border-[#e6c887]/40 text-[#e6c887]' :
                            u.role === 'chair' ? 'bg-purple-500/20 border border-purple-500/40 text-purple-300' :
                            'bg-white/10 border border-white/20 text-[#d8cfcb]'
                          }`}>
                            {u.role.replace('_', ' ')}
                          </span>

                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold ${
                            u.status === 'pending_approval' ? 'bg-[#e6c887]/20 text-[#e6c887] border border-[#e6c887]/40' :
                            u.status === 'declined' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                            u.status === 'suspended' ? 'bg-[#ff4d4d]/20 text-[#ff4d4d]' : 
                            'bg-[#10b981]/20 text-[#10b981]'
                          }`}>
                            {u.status || 'active'}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* If Pending, display quick Approve & Decline */}
                          {isPending && isSuperAdmin && (
                            <>
                              <button
                                onClick={() => handleApprove(u)}
                                title="Approve & Unlock Login"
                                className="px-2.5 py-1 rounded-lg bg-[#10b981]/20 hover:bg-[#10b981]/40 border border-[#10b981]/40 text-[#10b981] text-[11px] font-semibold flex items-center gap-1 transition-all"
                              >
                                <ThumbsUp className="w-3 h-3" />
                                <span>Approve</span>
                              </button>

                              <button
                                onClick={() => handleDecline(u)}
                                title="Decline Request"
                                className="px-2 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-[11px] transition-all"
                              >
                                <ThumbsDown className="w-3 h-3" />
                              </button>
                            </>
                          )}

                          <button
                            onClick={() => copyToClipboard(`ID: ${u.id}\nPassword: ${u.password}\nPortal: Auvreo Diplomatic Platform`, u.id)}
                            title="Copy Full Credentials Packet"
                            className="px-2.5 py-1 rounded-lg bg-[#1b0509] border border-white/10 hover:border-[#e6c887]/50 text-[#e6c887] text-[11px] font-mono flex items-center gap-1 transition-colors"
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3 h-3 text-[#10b981]" />
                                <span className="text-[#10b981]">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Packet</span>
                              </>
                            )}
                          </button>

                          {isSuperAdmin && (
                            <>
                              <button
                                onClick={() => handleStartEdit(u)}
                                title="Edit Account Details & Password"
                                className="p-1.5 rounded-lg bg-[#1b0509] border border-white/10 hover:border-white/30 text-[#d8cfcb] hover:text-white transition-colors"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>

                              {!isPrimaryAdmin && (
                                <button
                                  onClick={() => handleDelete(u.id, u.name)}
                                  title="Delete Account"
                                  className="p-1.5 rounded-lg bg-[#1b0509] border border-red-500/20 hover:border-red-500/40 text-red-400 hover:text-red-300 transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: CREATE NEW USER & CREDENTIALS */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-4 sm:p-6 flex items-center justify-center animate-in fade-in duration-200">
          <div 
            className="relative w-full max-w-lg bg-gradient-to-b from-[#160408] via-[#0f0305] to-[#080102] border border-[#e51e2b]/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-[#e51e2b]/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-[#e51e2b]/20">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#e51e2b]/20 border border-[#e51e2b]/40 flex items-center justify-center text-[#e51e2b]">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-display text-white">Create New Credential Account</h3>
                  <p className="text-[11px] text-[#a89c99]">Provision new Application ID & Password for immediate, permanent login.</p>
                </div>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#a89c99] hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#e6c887] mb-1">
                    Account Role *
                  </label>
                  <select
                    value={newRole}
                    onChange={(e) => {
                      const r = e.target.value as any;
                      setNewRole(r);
                      if (r === 'super_admin') setNewDept('Executive Secretariat');
                      else if (r === 'delegate') setNewDept('UNCSW Committee');
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c060a] border border-[#e51e2b]/30 text-white font-medium focus:outline-none focus:border-[#e51e2b]"
                  >
                    <option value="staff">Secretariat Staff / OC</option>
                    <option value="super_admin">Super Administrator</option>
                    <option value="chair">Committee Executive Board / Chair</option>
                    <option value="delegate">Accredited Delegate</option>
                    <option value="guest">Observer / Guest</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#e6c887] mb-1">
                    Department / Portfolio
                  </label>
                  <input
                    type="text"
                    value={newDept}
                    onChange={(e) => setNewDept(e.target.value)}
                    placeholder="e.g. Delegate Affairs, Logistics"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c060a] border border-[#e51e2b]/30 text-white placeholder:text-[#6e5d61] focus:outline-none focus:border-[#e51e2b]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#e6c887] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Rohini Sen, John Doe"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c060a] border border-[#e51e2b]/30 text-white placeholder:text-[#6e5d61] focus:outline-none focus:border-[#e51e2b]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#e6c887]">
                      Application ID / Username *
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        const next = generateNextId();
                        setNewId(next);
                        setNewUsername(next);
                      }}
                      className="text-[10px] text-[#e51e2b] hover:underline font-mono"
                    >
                      Auto-Gen ID
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    value={newId}
                    onChange={(e) => {
                      setNewId(e.target.value);
                      setNewUsername(e.target.value);
                    }}
                    placeholder="e.g. staff-rohini, AUV-2026-8812"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c060a] border border-[#e51e2b]/30 text-white font-mono placeholder:text-[#6e5d61] focus:outline-none focus:border-[#e51e2b]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#e6c887]">
                      Security Password *
                    </label>
                    <button
                      type="button"
                      onClick={() => setNewPassword(generateRandomPassword())}
                      className="text-[10px] text-[#e51e2b] hover:underline font-mono"
                    >
                      Randomize
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter security password"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c060a] border border-[#e51e2b]/30 text-white font-mono placeholder:text-[#6e5d61] focus:outline-none focus:border-[#e51e2b]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#a89c99] mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="e.g. rohini@auvreo.org"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c060a] border border-white/10 text-white placeholder:text-[#6e5d61] focus:outline-none focus:border-[#e51e2b]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#a89c99] mb-1">
                    Institution / University
                  </label>
                  <input
                    type="text"
                    value={newInstitution}
                    onChange={(e) => setNewInstitution(e.target.value)}
                    placeholder="e.g. Sciences Po, DU"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c060a] border border-white/10 text-white placeholder:text-[#6e5d61] focus:outline-none focus:border-[#e51e2b]"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#1b0509] border border-[#e6c887]/30 text-[11px] text-[#a89c99] flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-[#e6c887] shrink-0 mt-0.5" />
                <span>
                  Once created, this account is <strong className="text-[#10b981]">automatically active</strong>. The user can immediately log in from the main Sign In modal on the website.
                </span>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#d8cfcb] hover:text-white font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#e51e2b] to-[#990a18] hover:from-[#ff2438] hover:to-[#b30c1d] text-white font-bold uppercase tracking-wider shadow-lg shadow-[#e51e2b]/30 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Creating...' : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT USER */}
      {editingUser && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-4 sm:p-6 flex items-center justify-center animate-in fade-in duration-200">
          <div 
            className="relative w-full max-w-lg bg-gradient-to-b from-[#160408] via-[#0f0305] to-[#080102] border border-[#e51e2b]/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-[#e51e2b]/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-[#e51e2b]/20">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#e6c887]/20 border border-[#e6c887]/40 flex items-center justify-center text-[#e6c887]">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-display text-white">Edit Account Credentials</h3>
                  <p className="text-[11px] text-[#a89c99]">ID: <span className="text-[#e6c887] font-mono font-bold">{editingUser.id}</span></p>
                </div>
              </div>
              <button
                onClick={() => setEditingUser(null)}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#a89c99] hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#e6c887] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c060a] border border-[#e51e2b]/30 text-white focus:outline-none focus:border-[#e51e2b]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#e6c887] mb-1">
                    Role
                  </label>
                  <select
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c060a] border border-[#e51e2b]/30 text-white focus:outline-none focus:border-[#e51e2b]"
                  >
                    <option value="staff">Secretariat Staff / OC</option>
                    <option value="super_admin">Super Administrator</option>
                    <option value="chair">Committee Chair</option>
                    <option value="delegate">Accredited Delegate</option>
                    <option value="guest">Observer / Guest</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#e6c887] mb-1">
                    Account Status
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c060a] border border-[#e51e2b]/30 text-white focus:outline-none focus:border-[#e51e2b]"
                  >
                    <option value="active">Active (Access Granted)</option>
                    <option value="pending_approval">Pending Approval</option>
                    <option value="suspended">Suspended (Access Revoked)</option>
                    <option value="declined">Declined</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#e6c887] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c060a] border border-[#e51e2b]/30 text-white focus:outline-none focus:border-[#e51e2b]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#e6c887] mb-1">
                    Department / Chamber
                  </label>
                  <input
                    type="text"
                    value={editDept}
                    onChange={(e) => setEditDept(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c060a] border border-[#e51e2b]/30 text-white focus:outline-none focus:border-[#e51e2b]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#e6c887]">
                    Reset / Update Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setEditPassword(generateRandomPassword());
                    }}
                    className="text-[10px] text-[#e51e2b] hover:underline font-mono"
                  >
                    Generate New
                  </button>
                </div>
                <input
                  type="text"
                  required
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c060a] border border-[#e51e2b]/30 text-white font-mono focus:outline-none focus:border-[#e51e2b]"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#d8cfcb] hover:text-white font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#e51e2b] to-[#990a18] hover:from-[#ff2438] hover:to-[#b30c1d] text-white font-bold uppercase tracking-wider shadow-lg shadow-[#e51e2b]/30 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
