import React from 'react';
import { DelegateApplication } from '../types';
import { PROGRAMMES } from '../data/mockData';
import { Shield, Sparkles, QrCode, Wifi, CheckCircle2 } from 'lucide-react';

interface DigitalCredentialProps {
  application: DelegateApplication;
  interactive?: boolean;
}

export const DigitalCredential: React.FC<DigitalCredentialProps> = ({ 
  application,
  interactive = true 
}) => {
  const progInfo = PROGRAMMES.find(p => p.id === application.programme) || PROGRAMMES[0];

  return (
    <div className="relative max-w-sm w-full mx-auto select-none">
      {/* Top Status Indicator */}
      {interactive && (
        <div className="flex items-center justify-between mb-3 px-1 text-xs text-[#b8aba7]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span className="font-mono font-medium">AUVRESENCE PASS v2.6</span>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#1c060a] border border-[#e51e2b]/30 text-[#e6c887] font-mono text-[10px]">
            <span>NFC-READY CREDENTIAL</span>
          </div>
        </div>
      )}

      {/* Main One-Sided Card Container */}
      <div className="relative w-full rounded-2xl bg-gradient-to-b from-[#1c0509] via-[#100305] to-[#060102] border border-[#e51e2b]/45 p-6 shadow-2xl shadow-[#e51e2b]/20 overflow-hidden">
        {/* Holographic metallic background lines */}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(229,30,43,0.08)_0%,transparent_50%,rgba(230,200,135,0.06)_100%)] pointer-events-none" />
        <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-[#e51e2b]/15 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-[#e6c887]/10 blur-2xl pointer-events-none" />

        {/* Top Row: Institution + NFC Protocol status */}
        <div className="relative z-10 flex items-center justify-between pb-4 border-b border-[#e51e2b]/20">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#2e060c] border border-[#e51e2b]/50 flex items-center justify-center text-white font-black text-xs">
              A
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xs tracking-wider text-[#fcfaf7] font-display">
                AUVREO INTERNATIONAL
              </span>
              <span className="text-[9px] font-mono text-[#e6c887] tracking-widest">
                25–26 DECEMBER 2026 • NEW DELHI
              </span>
            </div>
          </div>

          {/* NFC Architecture Indicator */}
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#200408] border border-[#e51e2b]/30 text-[9px] font-mono text-[#e51e2b]" title="NFC Architecture Protocol: Ready for onsite physical tap">
            <Wifi className="w-3 h-3 rotate-90" />
            <span>NFC-READY</span>
          </div>
        </div>

        {/* Holographic Security Strip */}
        <div className="relative z-10 my-3 h-1.5 w-full rounded-full bg-gradient-to-r from-[#e51e2b] via-[#e6c887] to-[#e51e2b] opacity-75 shadow-sm shadow-[#e51e2b]/50" />

        {/* Middle: Delegate Identity */}
        <div className="relative z-10 py-2 flex items-start gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-b from-[#2e070e] to-[#120204] border border-[#e51e2b]/50 flex items-center justify-center font-bold text-xl text-[#fcfaf7] shadow-inner overflow-hidden">
              {application.avatarUrl ? (
                <img src={application.avatarUrl} alt={application.fullName} className="w-full h-full object-cover" />
              ) : (
                <span>{application.fullName.charAt(0)}</span>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-[#080203] border border-[#10b981]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#e6c887]">
              {application.tier === 'indian-delegate' ? 'National Cohort' : 'International Delegation'}
            </div>
            <h3 className="text-lg font-bold text-[#fcfaf7] truncate mt-0.5">
              {application.fullName}
            </h3>
            <p className="text-xs text-[#a89c99] truncate">
              {application.institution}
            </p>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#e8deda]">
              <span className="font-semibold text-[#fcfaf7]">{application.country}</span>
              <span>•</span>
              <span className="text-[#a89c99]">{application.city}</span>
            </div>
          </div>
        </div>

        {/* Assigned Programme Badge */}
        <div className="relative z-10 mt-3 p-2.5 rounded-xl bg-[#140306]/80 border border-[#e51e2b]/30 flex items-center justify-between">
          <div>
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#a89c99] block">
              Assigned Council
            </span>
            <span className="text-xs font-bold text-[#fcfaf7]">
              {progInfo.name}
            </span>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#e51e2b]/20 text-[#e51e2b] border border-[#e51e2b]/40">
            {progInfo.shortName}
          </span>
        </div>

        {/* Seat / Role if assigned */}
        {application.assignedSeat && (
          <div className="relative z-10 mt-2 px-3 py-1.5 rounded-lg bg-[#20060a] border border-[#e6c887]/30 text-[11px] flex items-center justify-between">
            <span className="text-[#a89c99]">Portfolio:</span>
            <span className="font-bold text-[#e6c887]">{application.assignedSeat}</span>
          </div>
        )}

        {/* Bottom QR Code & Auvreo ID */}
        <div className="relative z-10 mt-4 pt-3 border-t border-[#e51e2b]/20 flex items-center justify-between">
          <div>
            <span className="text-[9px] font-mono text-[#a89c99] block">SECURITY ID & DATES</span>
            <span className="text-xs font-mono font-bold text-[#fcfaf7] tracking-wider block">
              {application.id}
            </span>
            <span className="text-[10px] font-mono text-[#e6c887] mt-0.5 block">
              25–26 DECEMBER 2026
            </span>
            <span className="text-[9px] font-medium text-[#10b981] flex items-center gap-1 mt-0.5">
              <Shield className="w-2.5 h-2.5" />
              VERIFIED CREDENTIAL
            </span>
          </div>

          {/* Realistic QR Mockup */}
          <div className="p-1.5 rounded-lg bg-white shadow-md">
            <QrCode className="w-10 h-10 text-black" />
          </div>
        </div>
      </div>
    </div>
  );
};
