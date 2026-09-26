import React, { useState } from 'react';
import { useAuvreo } from '../context/AuvreoContext';
import { VolunteerApplication } from '../types';
import { 
  Users, 
  HeartHandshake, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Briefcase, 
  GraduationCap 
} from 'lucide-react';

export const CommunityView: React.FC = () => {
  const { addVolunteerApplication } = useAuvreo();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: 'New Delhi',
    department: 'Delegate Affairs' as VolunteerApplication['department'],
    availability: 'Part-time until Dec 2026',
    statement: ''
  });

  const leadershipRoles = [
    {
      title: 'Secretariat & Presidium',
      role: 'Substantive Governance & Agenda Curation',
      desc: 'Formulates study guides, chairs committee proceedings, and governs conference rules of procedure.',
      lead: 'Executive Board Curators'
    },
    {
      title: 'Delegate Affairs & Hospitality',
      role: 'Accreditation, Consular Visa Support & Custom Stays',
      desc: 'Manages international delegate visas, hotel accommodations, dietary logistics, and arrivals in Delhi NCR.',
      lead: 'Lead: Abhinav (Logistics & Hospitality)'
    },
    {
      title: 'Auvreo Press Corps & Perspectives',
      role: 'Independent Media & Analytical Archiving',
      desc: 'Produces daily conference dispatches, investigative interviews, press conferences, and post-summit essays.',
      lead: 'Editorial Collective'
    },
    {
      title: 'Campus Ambassador Network',
      role: 'Cross-University Chapter Coordination',
      desc: 'Represents Auvreo across premier law schools, universities, and secondary institutions across 14+ states.',
      lead: 'Regional Chapter Leads'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addVolunteerApplication({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      department: formData.department,
      availability: `${formData.availability} (Base: ${formData.city})`,
      relevantExperience: 'Youth Organizing & Conference Delegation',
      statement: formData.statement
    });
    setSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#e6c887] uppercase">
          PEOPLE & COLLECTIVE
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-display text-white">
          Auvreo Community
        </h1>
        <p className="text-sm sm:text-base text-[#b8adaa] leading-relaxed">
          An independent, student-led and youth-governed alliance. We believe the future of multilateral dialogue belongs to those with the courage to lead with integrity.
        </p>
      </div>

      {/* Organizational Structure */}
      <div className="p-8 sm:p-10 rounded-2xl bg-[#120306] border border-[#e51e2b]/30 space-y-6">
        <div className="max-w-xl space-y-2">
          <span className="text-[10px] font-mono text-[#e51e2b] font-bold uppercase tracking-wider">
            GOVERNANCE CADRES
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Youth-Led Institutional Departments
          </h2>
          <p className="text-xs text-[#c9beba]">
            Auvreo operates with transparent, decentralized functional desks led by undergraduate scholars, legal researchers, and civic organizers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {leadershipRoles.map((cadre, idx) => (
            <div key={cadre.title} className="p-6 rounded-xl bg-[#090102] border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#e6c887]">TEAM 0{idx + 1}</span>
                <span className="text-[10px] font-mono text-[#a89c99]">{cadre.lead}</span>
              </div>
              <h4 className="text-base font-bold text-white">{cadre.title}</h4>
              <span className="text-xs text-[#e51e2b] block font-medium">{cadre.role}</span>
              <p className="text-xs text-[#a89c99] leading-relaxed">{cadre.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Volunteer / Organizing Corps Application */}
      <div className="p-8 sm:p-10 rounded-2xl bg-[#120306] border border-[#e6c887]/30 max-w-3xl mx-auto space-y-6">
        <div className="space-y-2">
          <span className="text-[10px] font-mono text-[#e6c887] font-bold uppercase tracking-wider">
            JOIN THE ORGANIZING CORPS
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
            Volunteer & Organizing Secretariat Application
          </h3>
          <p className="text-xs text-[#a89c99]">
            Help build the flagship summit in New Delhi. We are recruiting passionate students for logistics, delegate affairs, research, and media.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 rounded-xl bg-[#10b981]/10 border border-[#10b981]/30 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-[#10b981] mx-auto" />
            <h4 className="text-base font-bold text-white">Secretariat Dossier Received</h4>
            <p className="text-xs text-[#c9bfbc] max-w-md mx-auto">
              Your application for <strong>{formData.department}</strong> has been transmitted to the Executive Board. You will be contacted via email regarding video deliberation rounds.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-4 py-2 rounded-lg bg-[#140306] border border-white/20 text-xs text-white"
            >
              Submit Another Application
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#a89c99] mb-1 font-mono uppercase">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Ananya Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090102] border border-white/10 text-white outline-none focus:border-[#e51e2b]"
                />
              </div>

              <div>
                <label className="block text-[#a89c99] mb-1 font-mono uppercase">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ananya.sharma@university.edu"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090102] border border-white/10 text-white outline-none focus:border-[#e51e2b]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[#a89c99] mb-1 font-mono uppercase">Phone / WhatsApp *</label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090102] border border-white/10 text-white outline-none focus:border-[#e51e2b]"
                />
              </div>

              <div>
                <label className="block text-[#a89c99] mb-1 font-mono uppercase">Base City *</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                  placeholder="e.g. New Delhi, Mumbai, Bengaluru"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090102] border border-white/10 text-white outline-none focus:border-[#e51e2b]"
                />
              </div>

              <div>
                <label className="block text-[#a89c99] mb-1 font-mono uppercase">Department of Choice *</label>
                <select
                  value={formData.department}
                  onChange={e => setFormData({ ...formData, department: e.target.value as VolunteerApplication['department'] })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090102] border border-white/10 text-white outline-none focus:border-[#e51e2b]"
                >
                  <option value="Delegate Affairs">Delegate Affairs & Hospitality</option>
                  <option value="Logistics">Logistics & Venue Coordination</option>
                  <option value="Social Media">Media, Press & Social Media</option>
                  <option value="Organising Committee">Organising Committee & Substantive Protocol</option>
                  <option value="HR & Management">HR & Management / Chapter Ambassadors</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[#a89c99] mb-1 font-mono uppercase">Availability *</label>
              <input
                type="text"
                required
                value={formData.availability}
                onChange={e => setFormData({ ...formData, availability: e.target.value })}
                placeholder="e.g. 5-8 hours/week until Dec 2026; on-site in Delhi during summit days"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#090102] border border-white/10 text-white outline-none focus:border-[#e51e2b]"
              />
            </div>

            <div>
              <label className="block text-[#a89c99] mb-1 font-mono uppercase">Why do you wish to join the Auvreo Organizing Corps? *</label>
              <textarea
                required
                rows={3}
                value={formData.statement}
                onChange={e => setFormData({ ...formData, statement: e.target.value })}
                placeholder="Share your prior conference or event management experience, organizational skills, and why Auvreo's unscripted ethos resonates with you."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#090102] border border-white/10 text-white outline-none focus:border-[#e51e2b] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#e51e2b] to-[#990a18] text-white font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#e51e2b]/30"
            >
              Submit Organizing Corps Application
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
