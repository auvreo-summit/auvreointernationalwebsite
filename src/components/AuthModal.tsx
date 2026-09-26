import React, { useState, useEffect } from 'react';
import { useAuvreo } from '../context/AuvreoContext';
import { 
  X, 
  Lock, 
  Eye, 
  EyeOff, 
  KeyRound, 
  AlertCircle, 
  ArrowRight, 
  ShieldCheck, 
  UserPlus, 
  CheckCircle2, 
  Clock, 
  Building, 
  Globe2, 
  User, 
  Mail,
  HelpCircle
} from 'lucide-react';
import { AuvreoLogo } from './AuvreoLogo';
import { sound } from '../utils/audio';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, loginWithCredentials, registerAccountRequest } = useAuvreo();
  
  const [activeTab, setActiveTab] = useState<'signin' | 'request'>('signin');
  
  // Sign In fields
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Request Account fields
  const [reqName, setReqName] = useState('');
  const [reqUsername, setReqUsername] = useState('');
  const [reqEmail, setReqEmail] = useState('');
  const [reqPassword, setReqPassword] = useState('');
  const [showReqPassword, setShowReqPassword] = useState(false);
  const [reqRole, setReqRole] = useState<'delegate' | 'staff' | 'volunteer' | 'chair' | 'guest'>('delegate');
  const [reqInstitution, setReqInstitution] = useState('');
  const [reqCountry, setReqCountry] = useState('India');
  const [reqNote, setReqNote] = useState('');
  
  // Status states
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [requestSuccessData, setRequestSuccessData] = useState<{ id: string; name: string; username: string } | null>(null);

  useEffect(() => {
    if (isAuthModalOpen) {
      sound.playModalOpen();
      setAuthError(null);
      setRequestSuccessData(null);
    }
  }, [isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    sound.playClick();

    if (!identifier.trim() || !password.trim()) {
      setAuthError('Please enter your Application ID / Username and Password.');
      sound.playError();
      return;
    }

    setIsLoading(true);
    setAuthError(null);

    try {
      const res = await loginWithCredentials(identifier.trim(), password.trim());
      if (res.success) {
        sound.playSuccess();
        closeAuthModal();
        setIdentifier('');
        setPassword('');
      } else {
        sound.playError();
        setAuthError(res.error || 'Invalid Application ID / Username or Password.');
      }
    } catch (err: any) {
      sound.playError();
      setAuthError(err.message || 'Authentication error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterRequest = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    sound.playClick();

    if (!reqName.trim() || !reqUsername.trim() || !reqEmail.trim() || !reqPassword.trim()) {
      setAuthError('Please complete all required fields (Name, Username, Email, and Password).');
      sound.playError();
      return;
    }

    setIsLoading(true);
    setAuthError(null);

    try {
      const res = await registerAccountRequest({
        name: reqName.trim(),
        username: reqUsername.trim().toLowerCase().replace(/\s+/g, '.'),
        email: reqEmail.trim(),
        password: reqPassword.trim(),
        role: reqRole,
        department: reqRole === 'staff' ? 'Secretariat Operations' : 'Diplomatic Delegation',
        institution: reqInstitution.trim() || 'Academic Institution',
        country: reqCountry.trim() || 'India',
        requestNote: reqNote.trim() || 'Account accreditation requested.'
      });

      if (res.success) {
        sound.playSuccess();
        setRequestSuccessData({
          id: res.user?.id || 'AUV-REQ-PENDING',
          name: reqName,
          username: reqUsername.trim().toLowerCase().replace(/\s+/g, '.')
        });
        // Clear form
        setReqName('');
        setReqUsername('');
        setReqEmail('');
        setReqPassword('');
        setReqInstitution('');
        setReqNote('');
      } else {
        sound.playError();
        setAuthError(res.error || 'Could not submit account request. Please try again.');
      }
    } catch (err: any) {
      sound.playError();
      setAuthError(err.message || 'Error creating account request.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      id="auth-modal-overlay" 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-4 sm:p-6 flex items-center justify-center animate-in fade-in duration-200"
    >
      <div 
        id="auth-modal-dialog"
        className="relative w-full max-w-lg bg-gradient-to-b from-[#140306] via-[#0d0204] to-[#080102] border border-[#e51e2b]/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-[#e51e2b]/20 text-center my-8 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="btn-close-auth-modal"
          onClick={() => {
            sound.playClick();
            closeAuthModal();
          }}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-[#a89c99] hover:text-white flex items-center justify-center transition-colors border border-white/5"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Institution Brand */}
        <div className="flex justify-center mb-4">
          <AuvreoLogo variant="header" />
        </div>

        <h2 className="text-2xl font-bold font-display text-white tracking-tight">
          Diplomatic Console Access
        </h2>
        <p className="text-xs text-[#a89c99] mt-1 mb-5 leading-relaxed">
          Accredited credentials verification for Summit delegates, Secretariat staff, and Executive Super Admins.
        </p>

        {/* Tab Navigation */}
        <div className="flex items-center rounded-xl bg-[#1b0509] p-1 border border-white/10 mb-6">
          <button
            id="tab-btn-signin"
            type="button"
            onClick={() => {
              sound.playClick();
              setActiveTab('signin');
              setAuthError(null);
              setRequestSuccessData(null);
            }}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'signin'
                ? 'bg-gradient-to-r from-[#e51e2b] to-[#990a18] text-white shadow-md'
                : 'text-[#a89c99] hover:text-white'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
          
          <button
            id="tab-btn-request-account"
            type="button"
            onClick={() => {
              sound.playClick();
              setActiveTab('request');
              setAuthError(null);
              setRequestSuccessData(null);
            }}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'request'
                ? 'bg-gradient-to-r from-[#e51e2b] to-[#990a18] text-white shadow-md'
                : 'text-[#a89c99] hover:text-white'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Request Account</span>
          </button>
        </div>

        {/* TAB 1: SIGN IN FORM */}
        {activeTab === 'signin' && (
          <form id="form-auth-login" onSubmit={handleLogin} className="space-y-4 text-left animate-in fade-in duration-150">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#e6c887] mb-1.5">
                Application ID / Username *
              </label>
              <div className="relative">
                <input
                  id="input-login-identifier"
                  type="text"
                  required
                  autoFocus
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    setAuthError(null);
                  }}
                  placeholder="e.g. admin, AUV-ADMIN-001, or your username"
                  className="w-full px-4 py-3 rounded-xl bg-[#1b0509] border border-[#e51e2b]/30 text-white text-xs placeholder:text-[#5a484c] focus:outline-none focus:border-[#e51e2b] transition-colors pr-10"
                />
                <KeyRound className="w-4 h-4 text-[#e6c887]/50 absolute right-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#e6c887]">
                  Security Password *
                </label>
              </div>
              <div className="relative">
                <input
                  id="input-login-password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setAuthError(null);
                  }}
                  placeholder="Enter your security password"
                  className="w-full px-4 py-3 rounded-xl bg-[#1b0509] border border-[#e51e2b]/30 text-white text-xs placeholder:text-[#5a484c] focus:outline-none focus:border-[#e51e2b] transition-colors pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 p-1 rounded text-[#a89c99] hover:text-white transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {authError && (
              <div className="p-3.5 rounded-xl bg-[#ff4d4d]/10 border border-[#ff4d4d]/30 text-xs text-[#ff6666] flex items-start gap-2.5 text-left leading-relaxed">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#ff4d4d]" />
                <span>{authError}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              id="btn-submit-login"
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#e51e2b] to-[#990a18] hover:from-[#ff2438] hover:to-[#b30c1d] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-[#e51e2b]/30 flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating Credentials...
                </span>
              ) : (
                <>
                  <span>Sign In to Console</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>

            <div className="text-center pt-2">
              <p className="text-[11px] text-[#a89c99]">
                Don't have an accredited account yet?{' '}
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('request');
                  }}
                  className="text-[#e6c887] font-semibold hover:underline"
                >
                  Request one here
                </button>
              </p>
            </div>
          </form>
        )}

        {/* TAB 2: REQUEST ACCOUNT FORM */}
        {activeTab === 'request' && (
          <div className="animate-in fade-in duration-150">
            {requestSuccessData ? (
              /* Success confirmation state */
              <div className="p-6 rounded-2xl bg-[#1b0509] border border-[#e6c887]/30 text-left space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#e6c887]/15 border border-[#e6c887]/40 flex items-center justify-center mx-auto text-[#e6c887]">
                  <Clock className="w-6 h-6 animate-pulse" />
                </div>
                
                <div className="text-center">
                  <h3 className="text-base font-bold text-white">
                    Accreditation Request Submitted!
                  </h3>
                  <p className="text-xs text-[#a89c99] mt-1">
                    Your credentials have been registered in <span className="text-[#e6c887] font-semibold">Temporary Pending Status</span>.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-[#a89c99]">
                    <span>Request Tracking ID:</span>
                    <span className="font-mono text-[#e6c887] font-bold">{requestSuccessData.id}</span>
                  </div>
                  <div className="flex justify-between items-center text-[#a89c99]">
                    <span>Registered Username:</span>
                    <span className="font-mono text-white">{requestSuccessData.username}</span>
                  </div>
                  <div className="flex justify-between items-center text-[#a89c99]">
                    <span>Current Status:</span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#e6c887]/20 text-[#e6c887] border border-[#e6c887]/40">
                      <Clock className="w-2.5 h-2.5" /> Pending Super Admin Approval
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 text-[11px] text-[#a89c99] leading-relaxed">
                  <strong className="text-white">How it works:</strong> The Executive Secretariat / Super Admin will inspect your request in the Admin Panel. Once approved, you can return here and sign in with your username and password anytime.
                </div>

                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('signin');
                    setIdentifier(requestSuccessData.username);
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#e51e2b] to-[#990a18] hover:from-[#ff2438] hover:to-[#b30c1d] text-white font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Return to Sign In
                </button>
              </div>
            ) : (
              /* Request Account Form */
              <form id="form-auth-request" onSubmit={handleRegisterRequest} className="space-y-3.5 text-left">
                <div className="p-3 rounded-xl bg-[#e6c887]/10 border border-[#e6c887]/20 text-[11px] text-[#e6c887] flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    New account requests are created in temporary status and submitted to the <strong>Super Admin Console</strong> for institutional verification before permanent login is enabled.
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#e6c887] mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={reqName}
                        onChange={(e) => setReqName(e.target.value)}
                        placeholder="e.g. Elena Rostova"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b0509] border border-[#e51e2b]/30 text-white text-xs placeholder:text-[#5a484c] focus:outline-none focus:border-[#e51e2b]"
                      />
                      <User className="w-3.5 h-3.5 text-[#e6c887]/50 absolute right-3 top-3" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#e6c887] mb-1">
                      Desired Username / ID *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={reqUsername}
                        onChange={(e) => setReqUsername(e.target.value.toLowerCase().replace(/\s+/g, '.'))}
                        placeholder="e.g. elena.rostova"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b0509] border border-[#e51e2b]/30 text-white text-xs placeholder:text-[#5a484c] focus:outline-none focus:border-[#e51e2b]"
                      />
                      <KeyRound className="w-3.5 h-3.5 text-[#e6c887]/50 absolute right-3 top-3" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#e6c887] mb-1">
                      Official Email *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={reqEmail}
                        onChange={(e) => setReqEmail(e.target.value)}
                        placeholder="name@institution.org"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b0509] border border-[#e51e2b]/30 text-white text-xs placeholder:text-[#5a484c] focus:outline-none focus:border-[#e51e2b]"
                      />
                      <Mail className="w-3.5 h-3.5 text-[#e6c887]/50 absolute right-3 top-3" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#e6c887] mb-1">
                      Security Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showReqPassword ? "text" : "password"}
                        required
                        value={reqPassword}
                        onChange={(e) => setReqPassword(e.target.value)}
                        placeholder="Create strong password"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b0509] border border-[#e51e2b]/30 text-white text-xs placeholder:text-[#5a484c] focus:outline-none focus:border-[#e51e2b] pr-9"
                      />
                      <button
                        type="button"
                        onClick={() => setShowReqPassword(!showReqPassword)}
                        className="absolute right-2.5 top-2.5 p-0.5 text-[#a89c99] hover:text-white"
                        tabIndex={-1}
                      >
                        {showReqPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#e6c887] mb-1">
                      Requested Role
                    </label>
                    <select
                      value={reqRole}
                      onChange={(e) => setReqRole(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b0509] border border-[#e51e2b]/30 text-white text-xs focus:outline-none focus:border-[#e51e2b]"
                    >
                      <option value="delegate">Summit Delegate</option>
                      <option value="staff">Secretariat Staff / Organiser</option>
                      <option value="volunteer">Youth Volunteer / Rapporteur</option>
                      <option value="chair">Executive Board / Chair</option>
                      <option value="guest">Observer / Press Delegate</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#e6c887] mb-1">
                      Country / Delegation
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={reqCountry}
                        onChange={(e) => setReqCountry(e.target.value)}
                        placeholder="e.g. India, France, UAE"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b0509] border border-[#e51e2b]/30 text-white text-xs focus:outline-none focus:border-[#e51e2b]"
                      />
                      <Globe2 className="w-3.5 h-3.5 text-[#e6c887]/50 absolute right-3 top-3" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#e6c887] mb-1">
                    Institution / University / Organisation
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={reqInstitution}
                      onChange={(e) => setReqInstitution(e.target.value)}
                      placeholder="e.g. University of Delhi, Sciences Po, IIT Roorkee"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b0509] border border-[#e51e2b]/30 text-white text-xs focus:outline-none focus:border-[#e51e2b]"
                    />
                    <Building className="w-3.5 h-3.5 text-[#e6c887]/50 absolute right-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#e6c887] mb-1">
                    Accreditation Note / Purpose
                  </label>
                  <textarea
                    rows={2}
                    value={reqNote}
                    onChange={(e) => setReqNote(e.target.value)}
                    placeholder="Briefly state your committee delegation or purpose for account request..."
                    className="w-full px-3.5 py-2 rounded-xl bg-[#1b0509] border border-[#e51e2b]/30 text-white text-xs placeholder:text-[#5a484c] focus:outline-none focus:border-[#e51e2b] resize-none"
                  />
                </div>

                {authError && (
                  <div className="p-3 rounded-xl bg-[#ff4d4d]/10 border border-[#ff4d4d]/30 text-xs text-[#ff6666] flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-[#ff4d4d]" />
                    <span>{authError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#e51e2b] to-[#990a18] hover:from-[#ff2438] hover:to-[#b30c1d] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#e51e2b]/30 flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting Accreditation Request...
                    </span>
                  ) : (
                    <>
                      <span>Submit Account Request</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        )}

        {/* Security & Assistance Note */}
        <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-[#a89c99]">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#e6c887]" />
            <span>Encrypted Institutional Authentication</span>
          </div>
          <a 
            href="mailto:auvreo@gmail.com" 
            className="text-[#e6c887] hover:underline"
          >
            Secretariat Help Desk
          </a>
        </div>
      </div>
    </div>
  );
};
