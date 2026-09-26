import React, { useState } from 'react';
import { useAuvreo } from '../context/AuvreoContext';
import { ProgrammeType, ParticipationTier } from '../types';
import { PROGRAMMES } from '../data/mockData';
import { AuvreoLogo } from './AuvreoLogo';
import { 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  AlertCircle,
  CreditCard,
  Building,
  Globe2,
  Calendar,
  X
} from 'lucide-react';

interface RegistrationFlowProps {
  initialProgramme?: ProgrammeType;
  onComplete?: () => void;
  onClose?: () => void;
}

export const RegistrationFlow: React.FC<RegistrationFlowProps> = ({
  initialProgramme,
  onComplete,
  onClose
}) => {
  const { addApplication, navigateTo, cmsContent, submitPayment } = useAuvreo();

  const [step, setStep] = useState<number>(1);
  const [tier, setTier] = useState<ParticipationTier>('indian-delegate');
  const [programme, setProgramme] = useState<ProgrammeType>(initialProgramme || 'aippm');

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('India');
  const [city, setCity] = useState('');
  const [institution, setInstitution] = useState('');
  const [age, setAge] = useState<number>(20);

  const [bio, setBio] = useState('');
  const [experience, setExperience] = useState('');
  const [interests, setInterests] = useState('');
  const [motivation, setMotivation] = useState('');

  // Payment State
  const [paymentProvider, setPaymentProvider] = useState<'razorpay' | 'stripe' | 'wire'>('razorpay');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentMethodSelected, setPaymentMethodSelected] = useState(false);

  // Result
  const [createdApplicationId, setCreatedApplicationId] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateStep3 = () => {
    const errors: Record<string, string> = {};
    if (!fullName.trim()) errors.fullName = 'Full name is required';
    if (!email.trim() || !email.includes('@')) errors.email = 'Valid email is required';
    if (!phone.trim()) errors.phone = 'Contact number is required';
    if (!country.trim()) errors.country = 'Country of residence is required';
    if (!city.trim()) errors.city = 'City is required';
    if (!institution.trim()) errors.institution = 'School / University / Workplace is required';
    if (!age || age < 14 || age > 35) errors.age = 'Eligible youth age is 14 to 35';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep4 = () => {
    const errors: Record<string, string> = {};
    if (!bio.trim()) errors.bio = 'A brief bio is required';
    if (!motivation.trim()) errors.motivation = 'Statement of motivation is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (step === 3 && !validateStep3()) return;
    if (step === 4 && !validateStep4()) return;
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleCompleteSubmission = () => {
    setIsProcessingPayment(true);

    // Simulate real asynchronous gateway transaction
    setTimeout(() => {
      setIsProcessingPayment(false);
      const feeVal = tier === 'indian-delegate' ? cmsContent.fees.indianStarting : cmsContent.fees.internationalStarting;
      const appAmount = tier === 'indian-delegate' 
        ? `₹${feeVal}` 
        : `$${feeVal}`;
      const generatedTxnRef = `TXN-${paymentProvider.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;

      const created = addApplication({
        tier,
        programme,
        fullName,
        email,
        phone,
        country,
        city,
        institution,
        age: Number(age),
        bio,
        experience: experience || 'Independent study / first-time diplomacy delegate',
        interests: interests || 'International affairs, youth governance',
        motivation,
        paymentStatus: 'completed',
        paymentAmount: appAmount,
        currency: tier === 'indian-delegate' ? 'INR' : 'USD',
        utr: generatedTxnRef,
        paymentDateTime: new Date().toISOString(),
        paymentMethod: paymentProvider === 'razorpay' ? 'UPI' : (paymentProvider === 'stripe' ? 'Card / Gateway' : 'International Wire')
      });

      // Submit payment record into Auvreo verification ledger
      submitPayment({
        applicationId: created.id,
        applicantName: fullName,
        email,
        programme,
        tier,
        amount: String(feeVal),
        currency: tier === 'indian-delegate' ? 'INR' : 'USD',
        utr: generatedTxnRef,
        paymentDateTime: new Date().toISOString(),
        paymentMethod: paymentProvider === 'razorpay' ? 'UPI' : (paymentProvider === 'stripe' ? 'Card / Gateway' : 'International Wire')
      });

      setCreatedApplicationId(created.id);
      setStep(7); // Jump to Confirmation
    }, 1200);
  };

  const selectedProg = PROGRAMMES.find(p => p.id === programme) || PROGRAMMES[0];

  return (
    <div className="relative w-full max-w-3xl mx-auto bg-[#0d0305] border border-[#e51e2b]/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-[#e51e2b]/15 text-[#fcfaf7]">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-6 border-b border-[#e51e2b]/20">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#e6c887] uppercase font-bold">
            AUVREO INTERNATIONAL • REGISTRATION
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white mt-0.5">
            {step === 7 ? 'Accreditation Confirmed' : 'Summit Delegate Application'}
          </h2>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#1a0508] border border-[#e51e2b]/30 text-[#a89c99] hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Progress Steps (1 to 7) */}
      {step < 7 && (
        <div className="py-6">
          <div className="flex items-center justify-between text-xs font-mono text-[#a89c99] mb-2">
            <span>Step {step} of 6</span>
            <span className="text-[#e6c887]">
              {step === 1 && 'Participation Category'}
              {step === 2 && 'Council / Programme'}
              {step === 3 && 'Personal Dossier'}
              {step === 4 && 'Experience & Motivation'}
              {step === 5 && 'Application Review'}
              {step === 6 && 'Payment Settlement'}
            </span>
          </div>

          <div className="grid grid-cols-6 gap-1.5 h-1.5 w-full bg-[#180407] rounded-full overflow-hidden">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div 
                key={i} 
                className={`h-full transition-all duration-300 ${
                  step >= i ? 'bg-gradient-to-r from-[#e51e2b] to-[#ff2a3f]' : 'bg-transparent'
                }`} 
              />
            ))}
          </div>
        </div>
      )}

      {/* STEP 1: PARTICIPATION TIER */}
      {step === 1 && (
        <div className="space-y-6 py-4">
          <div>
            <h3 className="text-lg font-bold text-white">Select Your Participation Category</h3>
            <p className="text-xs text-[#a89c99] mt-1">
              Choose based on your nationality and residential standing. All delegate passes include full committee access, credential issuance, and dining.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Indian Delegate */}
            <div
              onClick={() => {
                setTier('indian-delegate');
                setCountry('India');
              }}
              className={`p-5 rounded-xl cursor-pointer border transition-all ${
                tier === 'indian-delegate'
                  ? 'bg-[#22060b] border-[#e51e2b] shadow-lg shadow-[#e51e2b]/20'
                  : 'bg-[#140306] border-[#e51e2b]/20 hover:border-[#e51e2b]/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#e6c887]">
                  National Cohort
                </span>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  tier === 'indian-delegate' ? 'border-[#e51e2b] bg-[#e51e2b]' : 'border-white/20'
                }`}>
                  {tier === 'indian-delegate' && <Check className="w-3 h-3 text-white" />}
                </div>
              </div>

              <div className="mt-4">
                <div className="text-2xl font-black font-display text-white">₹{cmsContent.fees.indianStarting}+</div>
                <div className="text-xs text-[#a89c99]">Starting fee for Indian citizens & students</div>
              </div>

              <ul className="mt-4 space-y-1.5 text-xs text-[#c9bfbc]">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#e51e2b]" />
                  Full 2-Day Committee Access (AIPPM / UNCSW / Press)
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#e51e2b]" />
                  Auvresence Digital Pass & NFC Credential
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#e51e2b]" />
                  Curated Regional Luncheon & High Tea
                </li>
              </ul>
            </div>

            {/* International Delegate */}
            <div
              onClick={() => {
                setTier('international-delegate');
                if (country === 'India') setCountry('');
              }}
              className={`p-5 rounded-xl cursor-pointer border transition-all ${
                tier === 'international-delegate'
                  ? 'bg-[#22060b] border-[#e51e2b] shadow-lg shadow-[#e51e2b]/20'
                  : 'bg-[#140306] border-[#e51e2b]/20 hover:border-[#e51e2b]/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#e6c887]">
                  International Delegation
                </span>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  tier === 'international-delegate' ? 'border-[#e51e2b] bg-[#e51e2b]' : 'border-white/20'
                }`}>
                  {tier === 'international-delegate' && <Check className="w-3 h-3 text-white" />}
                </div>
              </div>

              <div className="mt-4">
                <div className="text-2xl font-black font-display text-white">${cmsContent.fees.internationalStarting}+</div>
                <div className="text-xs text-[#a89c99]">Starting fee for international delegates</div>
              </div>

              <ul className="mt-4 space-y-1.5 text-xs text-[#c9bfbc]">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#e51e2b]" />
                  Official Visa Invitation Letter assistance
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#e51e2b]" />
                  Optional Delhi Bespoke Transit Assistance
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#e51e2b]" />
                  Global Fellow Alumni Network Inclusion
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: PROGRAMME SELECTION */}
      {step === 2 && (
        <div className="space-y-6 py-4">
          <div>
            <h3 className="text-lg font-bold text-white">Select Your Summit Council</h3>
            <p className="text-xs text-[#a89c99] mt-1">
              Choose the chamber best aligned with your research strengths and diplomatic aspirations.
            </p>
          </div>

          <div className="space-y-3">
            {PROGRAMMES.map(p => (
              <div
                key={p.id}
                onClick={() => setProgramme(p.id)}
                className={`p-4 rounded-xl cursor-pointer border transition-all ${
                  programme === p.id
                    ? 'bg-[#22060b] border-[#e51e2b] shadow-lg shadow-[#e51e2b]/20'
                    : 'bg-[#140306] border-[#e51e2b]/20 hover:border-[#e51e2b]/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#e51e2b]/20 text-[#e51e2b] border border-[#e51e2b]/40">
                      {p.shortName}
                    </span>
                    <h4 className="text-sm font-bold text-white">{p.name}</h4>
                  </div>
                  <span className="text-xs font-mono text-[#e6c887] font-semibold">
                    {p.targetSeats} Seats Target
                  </span>
                </div>

                <p className="text-xs text-[#c9bfbc] mt-2 leading-relaxed">
                  {p.tagline}
                </p>

                <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-[#a89c99]">
                  <span>Focus: {p.badge}</span>
                  <span className="text-[#e51e2b] font-medium">Select Council →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3: PERSONAL INFORMATION */}
      {step === 3 && (
        <div className="space-y-4 py-4">
          <div>
            <h3 className="text-lg font-bold text-white">Delegate Dossier & Contact Details</h3>
            <p className="text-xs text-[#a89c99]">
              We only collect information required for credential printing, venue security clearance, and communication.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#c9bfbc] mb-1">
                Full Legal Name *
              </label>
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="Full name as per official identification"
                className="w-full px-3 py-2 rounded-lg bg-[#140306] border border-[#e51e2b]/30 text-white text-sm focus:outline-none focus:border-[#e51e2b]"
              />
              {formErrors.fullName && <p className="text-[10px] text-[#ff4d4d] mt-1">{formErrors.fullName}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-[#c9bfbc] mb-1">
                Email Address *
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full px-3 py-2 rounded-lg bg-[#140306] border border-[#e51e2b]/30 text-white text-sm focus:outline-none focus:border-[#e51e2b]"
              />
              {formErrors.email && <p className="text-[10px] text-[#ff4d4d] mt-1">{formErrors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-[#c9bfbc] mb-1">
                Contact / WhatsApp Number *
              </label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3 py-2 rounded-lg bg-[#140306] border border-[#e51e2b]/30 text-white text-sm focus:outline-none focus:border-[#e51e2b]"
              />
              {formErrors.phone && <p className="text-[10px] text-[#ff4d4d] mt-1">{formErrors.phone}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-[#c9bfbc] mb-1">
                Age (14–35) *
              </label>
              <input
                type="number"
                min="14"
                max="35"
                value={age}
                onChange={e => setAge(parseInt(e.target.value) || 20)}
                className="w-full px-3 py-2 rounded-lg bg-[#140306] border border-[#e51e2b]/30 text-white text-sm focus:outline-none focus:border-[#e51e2b]"
              />
              {formErrors.age && <p className="text-[10px] text-[#ff4d4d] mt-1">{formErrors.age}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-[#c9bfbc] mb-1">
                Country of Residence *
              </label>
              <input
                type="text"
                value={country}
                onChange={e => setCountry(e.target.value)}
                placeholder="e.g. India, Germany, UAE"
                className="w-full px-3 py-2 rounded-lg bg-[#140306] border border-[#e51e2b]/30 text-white text-sm focus:outline-none focus:border-[#e51e2b]"
              />
              {formErrors.country && <p className="text-[10px] text-[#ff4d4d] mt-1">{formErrors.country}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-[#c9bfbc] mb-1">
                City *
              </label>
              <input
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder="e.g. New Delhi, Berlin"
                className="w-full px-3 py-2 rounded-lg bg-[#140306] border border-[#e51e2b]/30 text-white text-sm focus:outline-none focus:border-[#e51e2b]"
              />
              {formErrors.city && <p className="text-[10px] text-[#ff4d4d] mt-1">{formErrors.city}</p>}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-[#c9bfbc] mb-1">
                School, University, or Organization *
              </label>
              <input
                type="text"
                value={institution}
                onChange={e => setInstitution(e.target.value)}
                placeholder="e.g. University of Delhi / Independent Researcher"
                className="w-full px-3 py-2 rounded-lg bg-[#140306] border border-[#e51e2b]/30 text-white text-sm focus:outline-none focus:border-[#e51e2b]"
              />
              {formErrors.institution && <p className="text-[10px] text-[#ff4d4d] mt-1">{formErrors.institution}</p>}
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: PROFILE & MOTIVATION */}
      {step === 4 && (
        <div className="space-y-4 py-4">
          <div>
            <h3 className="text-lg font-bold text-white">Experience & Statement of Purpose</h3>
            <p className="text-xs text-[#a89c99]">
              Help our Executive Board and Delegate Affairs team allocate your portfolio or press beat effectively.
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#c9bfbc] mb-1">
              Short Bio (2–3 sentences) *
            </label>
            <textarea
              rows={2}
              value={bio}
              onChange={e => setBio(e.target.value)}
              placeholder="Tell us about your academic or professional background and key areas of interest..."
              className="w-full px-3 py-2 rounded-lg bg-[#140306] border border-[#e51e2b]/30 text-white text-sm focus:outline-none focus:border-[#e51e2b]"
            />
            {formErrors.bio && <p className="text-[10px] text-[#ff4d4d] mt-1">{formErrors.bio}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-[#c9bfbc] mb-1">
              Previous Diplomacy, Debating, or Journalism Experience (Optional)
            </label>
            <textarea
              rows={2}
              value={experience}
              onChange={e => setExperience(e.target.value)}
              placeholder="e.g. MUN participation, moot court, campus gazette editor, or first-time delegate..."
              className="w-full px-3 py-2 rounded-lg bg-[#140306] border border-[#e51e2b]/30 text-white text-sm focus:outline-none focus:border-[#e51e2b]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#c9bfbc] mb-1">
              Why Auvreo International Youth Summit? *
            </label>
            <textarea
              rows={3}
              value={motivation}
              onChange={e => setMotivation(e.target.value)}
              placeholder="What do you hope to contribute to the discussions and achieve through the summit resolutions?"
              className="w-full px-3 py-2 rounded-lg bg-[#140306] border border-[#e51e2b]/30 text-white text-sm focus:outline-none focus:border-[#e51e2b]"
            />
            {formErrors.motivation && <p className="text-[10px] text-[#ff4d4d] mt-1">{formErrors.motivation}</p>}
          </div>
        </div>
      )}

      {/* STEP 5: APPLICATION REVIEW */}
      {step === 5 && (
        <div className="space-y-5 py-4">
          <div>
            <h3 className="text-lg font-bold text-white">Review Your Application Dossier</h3>
            <p className="text-xs text-[#a89c99]">
              Please verify your information before proceeding to registration fee settlement.
            </p>
          </div>

          <div className="bg-[#150407] rounded-xl border border-[#e51e2b]/30 p-5 space-y-4">
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/10 text-xs">
              <div>
                <span className="text-[#a89c99] block">Council Applied:</span>
                <span className="font-bold text-white text-sm">{selectedProg.name}</span>
                <span className="text-[#e51e2b] font-mono text-[10px] block font-semibold">{selectedProg.badge}</span>
              </div>
              <div>
                <span className="text-[#a89c99] block">Participation Tier:</span>
                <span className="font-bold text-[#e6c887] text-sm">
                  {tier === 'indian-delegate' ? `Indian Delegate (₹${cmsContent.fees.indianStarting}+)` : `International Delegate ($${cmsContent.fees.internationalStarting}+)`}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[#a89c99] block">Delegate Name:</span>
                <span className="font-semibold text-white">{fullName}</span>
              </div>
              <div>
                <span className="text-[#a89c99] block">Email & Phone:</span>
                <span className="text-white">{email} • {phone}</span>
              </div>
              <div>
                <span className="text-[#a89c99] block">Location:</span>
                <span className="text-white">{city}, {country} (Age {age})</span>
              </div>
              <div>
                <span className="text-[#a89c99] block">Institution:</span>
                <span className="text-white">{institution}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 text-xs">
              <span className="text-[#a89c99] block mb-1">Bio Summary:</span>
              <p className="text-[#d5ccc8] italic">{bio}</p>
            </div>
          </div>
        </div>
      )}

      {/* STEP 6: PAYMENT PROVIDER ARCHITECTURE */}
      {step === 6 && (
        <div className="space-y-5 py-4">
          <div>
            <h3 className="text-lg font-bold text-white">Complete Delegate Fee Settlement</h3>
            <p className="text-xs text-[#a89c99]">
              Provider-ready payment gateway architecture. Clean, transparent, and encrypted.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#1a0508] border border-[#e6c887]/40 flex items-center justify-between">
            <div>
              <span className="text-xs text-[#a89c99]">Amount Payable:</span>
              <div className="text-2xl font-black font-display text-[#e6c887]">
                {tier === 'indian-delegate' ? `₹${cmsContent.fees.indianStarting}` : `$${cmsContent.fees.internationalStarting}`}
              </div>
              <div className="text-[10px] text-[#10b981] flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3 h-3" />
                Includes all 2-day sessions, physical dossier, and lunch passes
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono px-2 py-1 rounded bg-black/40 border border-[#e51e2b]/30 text-[#e51e2b]">
                {tier === 'indian-delegate' ? 'INR GATEWAY' : 'GLOBAL GATEWAY'}
              </span>
            </div>
          </div>

          {/* Payment method selector */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-[#c9bfbc] block">Select Payment Channel</span>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                onClick={() => setPaymentProvider('razorpay')}
                className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between ${
                  paymentProvider === 'razorpay' 
                    ? 'bg-[#26070e] border-[#e51e2b]' 
                    : 'bg-[#120306] border-white/10'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-white">UPI / Net Banking / Cards</div>
                  <div className="text-[10px] text-[#a89c99]">Direct Indian Razorpay Gateway</div>
                </div>
                <CreditCard className="w-4 h-4 text-[#e51e2b]" />
              </div>

              <div
                onClick={() => setPaymentProvider('stripe')}
                className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between ${
                  paymentProvider === 'stripe' 
                    ? 'bg-[#26070e] border-[#e51e2b]' 
                    : 'bg-[#120306] border-white/10'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-white">International Credit Card</div>
                  <div className="text-[10px] text-[#a89c99]">Global Stripe Cross-Border</div>
                </div>
                <Globe2 className="w-4 h-4 text-[#e6c887]" />
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#0e0204] border border-white/10 text-[11px] text-[#9f9494] flex items-start gap-2">
            <Lock className="w-3.5 h-3.5 text-[#10b981] mt-0.5 shrink-0" />
            <span>
              Transactions are encrypted with industry-standard TLS protocols. Official receipt and accreditation reference will be dispatched directly to your registered email.
            </span>
          </div>
        </div>
      )}

      {/* STEP 7: CONFIRMATION & JOURNEY BEGINS */}
      {step === 7 && (
        <div className="space-y-6 py-6 text-center">
          <div className="w-16 h-16 rounded-full bg-[#1c060a] border border-[#10b981] mx-auto flex items-center justify-center shadow-lg shadow-[#10b981]/20">
            <Check className="w-8 h-8 text-[#10b981]" />
          </div>

          <div>
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#e6c887] uppercase">
              REGISTRATION ACTIVE
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-display text-white mt-1">
              Your Auvreo journey has begun.
            </h3>
            <p className="text-xs sm:text-sm text-[#c9beba] max-w-md mx-auto mt-2">
              Thank you, <span className="font-bold text-white">{fullName}</span>. Your application for <span className="font-bold text-[#e51e2b]">{selectedProg.name}</span> has been logged into the Auvreo Delegate Registry.
            </p>
          </div>

          <div className="max-w-xs mx-auto p-4 rounded-xl bg-[#170508] border border-[#e51e2b]/40 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[#a89c99]">Application ID:</span>
              <span className="font-mono font-bold text-white">{createdApplicationId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#a89c99]">Status:</span>
              <span className="font-bold text-[#10b981]">Registered & Confirmed</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#a89c99]">Portal Access:</span>
              <span className="text-[#e6c887]">Auvresence Enabled</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                if (onComplete) onComplete();
                navigateTo('dashboard');
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#e51e2b] to-[#a30b19] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#e51e2b]/30 flex items-center justify-center gap-2"
            >
              <span>Enter Auvresence Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                if (onClose) onClose();
                navigateTo('home');
              }}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#140306] border border-white/15 text-white font-medium text-xs hover:bg-white/5"
            >
              Return to Website
            </button>
          </div>
        </div>
      )}

      {/* Bottom Step Actions (Steps 1 to 6) */}
      {step < 7 && (
        <div className="pt-6 border-t border-[#e51e2b]/20 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="px-4 py-2 rounded-xl bg-[#140306] border border-[#e51e2b]/30 text-xs font-semibold text-[#c9bfbc] hover:text-white flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 6 ? (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-[#e51e2b] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#ff263b] transition-colors shadow-md shadow-[#e51e2b]/30 flex items-center gap-2"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleCompleteSubmission}
              disabled={isProcessingPayment}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#e51e2b] to-[#a30b19] text-white text-xs font-bold uppercase tracking-wider hover:from-[#ff263b] hover:to-[#b50d1d] transition-all shadow-lg shadow-[#e51e2b]/40 flex items-center gap-2 disabled:opacity-50"
            >
              {isProcessingPayment ? (
                <span>Processing Transaction...</span>
              ) : (
                <>
                  <span>Complete Registration</span>
                  <Check className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
