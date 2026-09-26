import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, Shield, FileText, AlertCircle } from 'lucide-react';

export const ContactLegalView: React.FC<{ initialTab?: 'contact' | 'legal' }> = ({ initialTab = 'contact' }) => {
  const [activeTab, setActiveTab] = useState<'contact' | 'privacy' | 'terms' | 'conduct' | 'refund'>(
    initialTab === 'legal' ? 'privacy' : 'contact'
  );

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactCategory, setContactCategory] = useState('General Inquiry');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#e6c887] uppercase">
          COMMUNICATION & GOVERNANCE
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-display text-white">
          Contact & Legal Framework
        </h1>
        <p className="text-xs sm:text-sm text-[#b8adaa]">
          Connect directly with our curatorial desk or inspect our participant policies and governance standards.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-white/10 pb-4 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('contact')}
          className={`px-4 py-2 rounded-xl transition-colors ${
            activeTab === 'contact' ? 'bg-[#e51e2b] text-white' : 'bg-[#140306] text-[#a89c99] hover:text-white'
          }`}
        >
          Contact Secretariat
        </button>

        <button
          onClick={() => setActiveTab('privacy')}
          className={`px-4 py-2 rounded-xl transition-colors ${
            activeTab === 'privacy' ? 'bg-[#e51e2b] text-white' : 'bg-[#140306] text-[#a89c99] hover:text-white'
          }`}
        >
          Privacy Policy
        </button>

        <button
          onClick={() => setActiveTab('terms')}
          className={`px-4 py-2 rounded-xl transition-colors ${
            activeTab === 'terms' ? 'bg-[#e51e2b] text-white' : 'bg-[#140306] text-[#a89c99] hover:text-white'
          }`}
        >
          Terms of Participation
        </button>

        <button
          onClick={() => setActiveTab('conduct')}
          className={`px-4 py-2 rounded-xl transition-colors ${
            activeTab === 'conduct' ? 'bg-[#e51e2b] text-white' : 'bg-[#140306] text-[#a89c99] hover:text-white'
          }`}
        >
          Code of Conduct
        </button>

        <button
          onClick={() => setActiveTab('refund')}
          className={`px-4 py-2 rounded-xl transition-colors ${
            activeTab === 'refund' ? 'bg-[#e51e2b] text-white' : 'bg-[#140306] text-[#a89c99] hover:text-white'
          }`}
        >
          Refund & Cancellation Policy
        </button>
      </div>

      {/* TAB: CONTACT SECRETARIAT */}
      {activeTab === 'contact' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-[#120306] border border-[#e51e2b]/30 space-y-4">
              <span className="text-[10px] font-mono text-[#e6c887] uppercase block font-bold">
                PRIMARY INBOX
              </span>
              <a
                href="mailto:auvreo@gmail.com"
                className="text-lg font-bold text-white hover:text-[#e6c887] flex items-center gap-2"
              >
                <Mail className="w-5 h-5 text-[#e51e2b]" />
                <span>auvreo@gmail.com</span>
              </a>
              <p className="text-xs text-[#a89c99] leading-relaxed">
                Our central secretariat monitors this channel continuously. Expect an official response within 24 to 48 hours.
              </p>
            </div>

            {/* Department Directory */}
            <div className="p-6 rounded-2xl bg-[#140306] border border-white/5 space-y-3 text-xs">
              <span className="text-[10px] font-mono text-[#a89c99] uppercase block font-bold">
                DIRECT DEPARTMENT LIAISONS
              </span>
              <div className="space-y-2 text-[#c9beba]">
                <div>
                  <strong className="text-white block">Delegate Affairs & Admissions:</strong>
                  Anshika • anshika@auvreo.org (or routed via auvreo@gmail.com)
                </div>
                <div>
                  <strong className="text-white block">Delhi Logistics & Bespoke Travel:</strong>
                  Abhinav • abhinav@auvreo.org
                </div>
                <div>
                  <strong className="text-white block">Social Media & Press Corps:</strong>
                  Pooja • pooja@auvreo.org
                </div>
                <div>
                  <strong className="text-white block">HR & Volunteer Staffing:</strong>
                  Avni • avni@auvreo.org
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 bg-[#120306] border border-[#e51e2b]/30 rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white font-display mb-1">
              Direct Secretariat Dispatch
            </h3>
            <p className="text-xs text-[#a89c99] mb-6">
              Fill out this form and your ticket will be routed to the respective directorate.
            </p>

            {sentSuccess ? (
              <div className="p-8 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#10b981] mx-auto" />
                <h4 className="text-base font-bold text-white">Inquiry Received</h4>
                <p className="text-xs text-[#c9beba]">
                  Thank you, {contactName}. Your communication has been recorded in the dispatch registry. Our curatorial desk will respond to {contactEmail} shortly.
                </p>
                <button
                  onClick={() => setSentSuccess(false)}
                  className="px-4 py-2 rounded-xl bg-[#e51e2b] text-white text-xs font-bold"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => {
                e.preventDefault();
                if (!contactName || !contactEmail || !contactMessage) return;
                setSentSuccess(true);
              }} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#a89c99] block mb-1">Full Legal Name</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={e => setContactName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#180407] border border-[#e51e2b]/30 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[#a89c99] block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={e => setContactEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#180407] border border-[#e51e2b]/30 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#a89c99] block mb-1">Inquiry Category</label>
                    <select
                      value={contactCategory}
                      onChange={e => setContactCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#180407] border border-[#e51e2b]/30 text-white"
                    >
                      <option>General Inquiry</option>
                      <option>Summit Participation & Portfolios</option>
                      <option>International Delegation / Visa Letter</option>
                      <option>Custom Delhi Logistics & Hotels</option>
                      <option>Press & Media Accreditation</option>
                      <option>Partnerships & Institutional Support</option>
                      <option>Contributor / Volunteer Track</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[#a89c99] block mb-1">Subject</label>
                    <input
                      type="text"
                      required
                      value={contactSubject}
                      onChange={e => setContactSubject(e.target.value)}
                      placeholder="e.g. Visa Support Request"
                      className="w-full px-3 py-2 rounded-lg bg-[#180407] border border-[#e51e2b]/30 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[#a89c99] block mb-1">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={contactMessage}
                    onChange={e => setContactMessage(e.target.value)}
                    placeholder="Provide full details of your request or proposal..."
                    className="w-full px-3 py-2 rounded-lg bg-[#180407] border border-[#e51e2b]/30 text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#e51e2b] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#ff2438] flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send to Secretariat</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* TAB: PRIVACY POLICY */}
      {activeTab === 'privacy' && (
        <div className="p-8 rounded-2xl bg-[#120306] border border-[#e51e2b]/30 space-y-4 text-xs text-[#c9bfbc] leading-relaxed">
          <h2 className="text-xl font-bold text-white font-display">Auvreo International Privacy Policy</h2>
          <span className="text-[10px] font-mono text-[#a89c99] block">Last Updated: January 2026</span>

          <p>
            Auvreo International ("Auvreo", "we", "our") respects the privacy of every delegate, partner, and visitor to our digital platform. This Privacy Policy details how we collect, process, and safeguard your personal information when using our website and the Auvresence digital ecosystem.
          </p>

          <h4 className="text-sm font-bold text-white pt-2">1. Information We Collect</h4>
          <p>
            When registering for our summit, we collect personal identifiers including your full legal name, date of birth, educational institution, contact telephone, email address, passport/national identity numbers (for international visa letters and Delhi security clearance), and dietary or accessibility preferences.
          </p>

          <h4 className="text-sm font-bold text-white pt-2">2. Auvresence Digital Credential Hashes</h4>
          <p>
            Your digital pass contains a cryptographically hashed verification string used solely to authenticate physical presence at the official summit venue. We do not track biometric data.
          </p>

          <h4 className="text-sm font-bold text-white pt-2">3. Zero Data Commercialization</h4>
          <p>
            Auvreo operates under strict non-commercial youth protection standards. We never sell, lease, or monetize participant records to third-party marketing companies, advertisers, or recruitment agencies.
          </p>
        </div>
      )}

      {/* TAB: TERMS */}
      {activeTab === 'terms' && (
        <div className="p-8 rounded-2xl bg-[#120306] border border-[#e51e2b]/30 space-y-4 text-xs text-[#c9bfbc] leading-relaxed">
          <h2 className="text-xl font-bold text-white font-display">Terms of Summit Participation</h2>
          <span className="text-[10px] font-mono text-[#a89c99] block">Summit Regulations • India 2026</span>

          <p>
            By submitting an application to the Auvreo International Youth Summit — India 2026, you agree to abide by these institutional terms and the rulings of the Organising Committee (OC) and Executive Board.
          </p>

          <h4 className="text-sm font-bold text-white pt-2">1. Academic Rigor & Anti-Plagiarism</h4>
          <p>
            All position papers, draft resolutions, and working communiqués must be the original intellectual work of the credited delegates. Verbatim copy-pasting of existing UN treaties or uncredited algorithmic AI generation is grounds for private censure by the Executive Board.
          </p>

          <h4 className="text-sm font-bold text-white pt-2">2. Diplomatic Decorum</h4>
          <p>
            Delegates are expected to maintain formal parliamentary address, mutual respect, and cultural sensitivity toward all participants regardless of nationality, gender, religion, or ideological alignment.
          </p>
        </div>
      )}

      {/* TAB: CODE OF CONDUCT */}
      {activeTab === 'conduct' && (
        <div className="p-8 rounded-2xl bg-[#120306] border border-[#e51e2b]/30 space-y-4 text-xs text-[#c9bfbc] leading-relaxed">
          <h2 className="text-xl font-bold text-white font-display">Code of Conduct & Anti-Harassment</h2>
          <span className="text-[10px] font-mono text-[#a89c99] block">Mandatory Zero-Tolerance Standard</span>

          <p>
            Auvreo International is committed to providing a secure, dignified, and inclusive environment for youth delegates from across the globe.
          </p>

          <h4 className="text-sm font-bold text-white pt-2">Zero Tolerance for Harassment</h4>
          <p>
            Harassment in any form—including verbal degradation, unsolicited physical contact, discriminatory remarks regarding gender identity, sexual orientation, disability, physical appearance, race, caste, or religious belief—will result in immediate credential revocation and expulsion from the venue without refund.
          </p>

          <h4 className="text-sm font-bold text-white pt-2">Confidential Reporting Mechanism</h4>
          <p>
            Any delegate experiencing discomfort or witnessing an infraction may approach our designated Safeguarding Officers or email <span className="text-[#e6c887]">auvreo@gmail.com</span> with the subject line "CONFIDENTIAL: CONDUCT INCIDENT" for immediate, confidential intervention.
          </p>
        </div>
      )}

      {/* TAB: REFUND POLICY */}
      {activeTab === 'refund' && (
        <div className="p-8 rounded-2xl bg-[#120306] border border-[#e51e2b]/30 space-y-4 text-xs text-[#c9bfbc] leading-relaxed">
          <h2 className="text-xl font-bold text-white font-display">Cancellation & Refund Policy</h2>
          <span className="text-[10px] font-mono text-[#a89c99] block">Financial Transparency</span>

          <p>
            Because Auvreo curates an intimate cohort of ~120 delegates with customized credentials, food catering, and venue guarantees reserved months in advance, the following cancellation tiers apply:
          </p>

          <div className="space-y-2 pt-2">
            <div className="p-3 rounded-lg bg-[#180407] border border-white/5">
              <strong className="text-white block">More than 60 days before Summit:</strong>
              75% refund of registration fee (less administrative transaction fees).
            </div>
            <div className="p-3 rounded-lg bg-[#180407] border border-white/5">
              <strong className="text-white block">30 to 60 days before Summit:</strong>
              50% refund or free transfer of registration to a nominated replacement delegate.
            </div>
            <div className="p-3 rounded-lg bg-[#180407] border border-white/5">
              <strong className="text-white block">Less than 30 days before Summit:</strong>
              Non-refundable due to completed catering orders, personalized printing, and logistics booking.
            </div>
            <div className="p-3 rounded-lg bg-[#180407] border border-white/5">
              <strong className="text-white block">Visa Rejection for International Delegates:</strong>
              If an international visa application is rejected by the Indian Embassy, a 90% refund will be disbursed upon submission of the official embassy refusal notice at least 15 days before the event.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
