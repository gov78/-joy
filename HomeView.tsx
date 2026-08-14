import React, { useState } from 'react';
import { ShaderSphere } from '../ShaderSphere';
import { VehicleTelemetry, ScreenView, DeviceLayout } from '../../types';

interface HomeViewProps {
  telemetry: VehicleTelemetry;
  layout: DeviceLayout;
  onNavigate: (view: ScreenView) => void;
  onSendVoicePrompt: (prompt: string) => void;
  onToggleLock: () => void;
  onToggleClimate: () => void;
  onFlashHorn: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  telemetry,
  layout,
  onNavigate,
  onSendVoicePrompt,
  onToggleLock,
  onToggleClimate,
  onFlashHorn,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [flashNotification, setFlashNotification] = useState<string | null>(null);

  const handleVoiceTrigger = () => {
    setIsListening(prev => !prev);
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        onSendVoicePrompt('Check vehicle health and powertrain status');
        onNavigate('ai');
      }, 2000);
    }
  };

  const handleFlash = () => {
    onFlashHorn();
    setFlashNotification('Lights flashed and acoustic signal sent to vehicle.');
    setTimeout(() => setFlashNotification(null), 3500);
  };

  if (layout === 'companion') {
    return (
      <div className="flex flex-col w-full max-w-md mx-auto min-h-screen pt-16 pb-32 px-5 select-none relative">
        {flashNotification && (
          <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-[#111111]/95 border border-[#C5A059]/40 rounded-full text-xs font-mono-code text-[#E5C583] shadow-[0_0_25px_rgba(197,160,89,0.35)] animate-bounce">
            {flashNotification}
          </div>
        )}

        {/* Greeting & Summary */}
        <section className="flex flex-col gap-1 pt-2">
          <span className="font-mono-code text-[10px] tracking-[0.25em] text-[#C5A059] uppercase font-semibold">
            AURELIAN GRAND TOURING
          </span>
          <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            Good evening, Alex
          </h2>
          <div className="flex items-center gap-3 text-white/60 text-xs font-mono-code mt-1">
            <div className="flex items-center gap-1.5 text-[#C5A059]">
              <span className="material-symbols-outlined text-[16px]">battery_charging_80</span>
              <span>{telemetry.battery}% Charge ({telemetry.rangeKm} km)</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/20"></div>
            <button
              onClick={onToggleLock}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-[16px] text-[#E5C583]">
                {telemetry.isLocked ? 'lock' : 'lock_open'}
              </span>
              <span>{telemetry.isLocked ? 'Secure' : 'Unsecured'}</span>
            </button>
          </div>
        </section>

        {/* AI Neural Core (Breathing/Minimized) */}
        <section className="relative w-full h-[210px] flex items-center justify-center overflow-hidden shrink-0 mt-1">
          {/* Ambient Gold Glow */}
          <div className="absolute inset-0 bg-[#C5A059]/10 blur-[60px] rounded-full mx-8 scale-y-60 opacity-60"></div>

          {/* AI Core Container */}
          <div className="relative w-[150px] h-[150px] rounded-full bg-[#111111]/80 backdrop-blur-xl border border-[#C5A059]/30 flex items-center justify-center shadow-[0_0_45px_-10px_rgba(197,160,89,0.3)]">
            {/* Decorative animated rings */}
            <svg className="absolute inset-0 w-full h-full text-[#C5A059]/35 animate-[spin_22s_linear_infinite]" viewBox="0 0 160 160">
              <circle cx="80" cy="80" fill="none" r="76" stroke="currentColor" strokeDasharray="4 8" strokeWidth="1.5" />
              <circle className="opacity-40" cx="80" cy="80" fill="none" r="66" stroke="currentColor" strokeDasharray="1 4" strokeWidth="0.75" />
            </svg>
            <svg className="absolute inset-0 w-full h-full text-[#E5C583]/45 animate-[spin_16s_linear_reverse_infinite]" viewBox="0 0 160 160">
              <path d="M80,10 A70,70 0 0,1 150,80" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
              <path d="M80,150 A70,70 0 0,1 10,80" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
            </svg>

            {/* Central Node */}
            <button
              onClick={() => onNavigate('ai')}
              className="w-[76px] h-[76px] rounded-full bg-gradient-to-br from-[#E5C583] via-[#C5A059] to-[#8C6D33] shadow-[0_0_25px_rgba(197,160,89,0.6)] flex items-center justify-center relative z-10 transition-transform active:scale-95 group"
            >
              <span className="material-symbols-outlined text-[30px] text-[#0A0A0A] group-hover:scale-110 transition-transform">
                graphic_eq
              </span>
            </button>
          </div>
        </section>

        {/* Quick Actions Grid */}
        <section className="flex flex-col gap-3 z-10 relative">
          <div className="flex items-center justify-between">
            <h3 className="font-serif-display font-medium text-sm tracking-wider uppercase text-white/90">
              Quick Controls
            </h3>
            <span className="font-mono-code text-[10px] text-[#C5A059] tracking-widest">READY</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {/* Pre-condition Cabin */}
            <button
              onClick={onToggleClimate}
              className={`flex flex-col justify-between items-start p-4 h-[105px] rounded-2xl backdrop-blur-md border transition-all active:scale-95 text-left ${
                telemetry.isAutoClimate
                  ? 'bg-[#161616] border-[#C5A059]/50 shadow-[0_0_20px_rgba(197,160,89,0.2)]'
                  : 'bg-[#111111]/80 border-white/10 hover:border-white/20'
              }`}
            >
              <div className="w-9 h-9 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#C5A059] border border-white/5">
                <span className="material-symbols-outlined text-[20px]">ac_unit</span>
              </div>
              <div>
                <span className="font-mono-code text-[10px] text-white/50 uppercase block">Climate</span>
                <span className="font-medium text-white text-xs leading-snug">
                  Cabin {telemetry.cabinTemp}°C
                </span>
              </div>
            </button>

            {/* Send Destination */}
            <button
              onClick={() => onNavigate('map')}
              className="flex flex-col justify-between items-start p-4 h-[105px] rounded-2xl bg-[#111111]/80 backdrop-blur-md border border-white/10 hover:border-[#C5A059]/40 transition-all active:scale-95 text-left"
            >
              <div className="w-9 h-9 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#E5C583] border border-white/5">
                <span className="material-symbols-outlined text-[20px]">near_me</span>
              </div>
              <div>
                <span className="font-mono-code text-[10px] text-white/50 uppercase block">Navigation</span>
                <span className="font-medium text-white text-xs leading-snug">
                  Send Dest to HUD
                </span>
              </div>
            </button>

            {/* Flash Lights & Horn */}
            <button
              onClick={handleFlash}
              className="flex items-center gap-4 p-4 h-[75px] rounded-2xl bg-[#111111]/80 backdrop-blur-md border border-white/10 hover:border-[#C5A059]/30 transition-all active:scale-95 col-span-2 text-left"
            >
              <div className="w-9 h-9 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#C5A059] border border-white/5 shrink-0">
                <span className="material-symbols-outlined text-[20px]">flashlight_on</span>
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="font-medium text-white text-sm">Locate &amp; Signal Vehicle</span>
                <span className="font-mono-code text-[#C5A059] text-[10px] uppercase tracking-wider">CHIRP + STROBE</span>
              </div>
              <span className="material-symbols-outlined text-white/40">arrow_forward</span>
            </button>
          </div>
        </section>

        {/* Recent Journeys */}
        <section className="flex flex-col gap-3 mt-5">
          <div className="flex items-center justify-between">
            <h3 className="font-serif-display font-medium text-sm tracking-wider uppercase text-white/90">
              Recent Journeys
            </h3>
            <button
              onClick={() => onNavigate('map')}
              className="font-mono-code text-[10px] text-[#C5A059] hover:underline uppercase tracking-widest font-semibold"
            >
              EXPLORE LOGS
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {/* Trip 1 */}
            <div
              onClick={() => onNavigate('map')}
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#111111]/90 border border-white/10 hover:border-[#C5A059]/40 transition-all cursor-pointer group"
            >
              <div className="w-[68px] h-[68px] rounded-xl overflow-hidden shrink-0 relative bg-[#1A1A1A]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUU-LiXcJq1w3dvgoGfqIUi0GPYTTZlJDAJuGxLnOYTzUGlyZjXbDGaaaVV4FC-Jf4FJDXuwC_0WdG8XGqlPb3vik5WPP1fwB2VhAMED4U5B1hfQA1sVb0PQC8LJg1Q8LNlq0BCN9osD15t4wNLoVhAEIxh56Tvp-Mvi_Y7v-VjcMR8qmImVPWAR6poxkMd6wSdZN4kvMtgC4RHYeFc53fmVJlps13p0hki_j9RB22M9K515n4tfGD"
                  alt="Office to Residence map"
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 to-transparent"></div>
                <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-[#0A0A0A]/80 backdrop-blur-md flex items-center justify-center border border-[#C5A059]/50">
                  <span className="material-symbols-outlined text-[12px] text-[#C5A059]">place</span>
                </div>
              </div>
              <div className="flex flex-col justify-center flex-1 min-w-0">
                <h4 className="font-serif-display font-medium text-white text-sm truncate group-hover:text-[#C5A059] transition-colors">
                  Office to Residence
                </h4>
                <div className="flex items-center gap-2 mt-1 font-mono-code text-[10px] text-white/50">
                  <span>TODAY, 5:45 PM</span>
                  <span className="w-1 h-1 rounded-full bg-white/20"></span>
                  <span>12.4 MI</span>
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#C5A059] font-mono-code">
                  <span className="material-symbols-outlined text-[13px]">bolt</span>
                  <span>2.1 kWh • 98.4% Efficiency</span>
                </div>
              </div>
            </div>

            {/* Trip 2 */}
            <div
              onClick={() => onNavigate('map')}
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#111111]/90 border border-white/10 hover:border-[#C5A059]/40 transition-all cursor-pointer group"
            >
              <div className="w-[68px] h-[68px] rounded-xl overflow-hidden shrink-0 relative bg-[#1A1A1A]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAB-c7Yc_dFg3xbJ8yD8YUNLhviCauBjaYV4SEe_3DkQyWVMfaMeBqgvewnvpQGjqKvhUqSeAasud2VZMItJLVSqKH18mPwB7oLcqF37J1WRTWoESZnh0xekin2uVYUiE0Ihec_lHAjdgCVoCU7Dtt1Y-jY7LyPBuhjbo1a1wjF_mG1uk7ZyOI0Rj9ub-LdkrUzjLjzHmjQf-6khOtGgmIWn-qoHm-4yuB2PSInW8COg1nnKiZ0PwfY"
                  alt="Residence to Tech Campus map"
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 to-transparent"></div>
                <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-[#0A0A0A]/80 backdrop-blur-md flex items-center justify-center border border-[#C5A059]/50">
                  <span className="material-symbols-outlined text-[12px] text-[#C5A059]">place</span>
                </div>
              </div>
              <div className="flex flex-col justify-center flex-1 min-w-0">
                <h4 className="font-serif-display font-medium text-white text-sm truncate group-hover:text-[#C5A059] transition-colors">
                  Residence to Tech Campus
                </h4>
                <div className="flex items-center gap-2 mt-1 font-mono-code text-[10px] text-white/50">
                  <span>YESTERDAY, 8:30 AM</span>
                  <span className="w-1 h-1 rounded-full bg-white/20"></span>
                  <span>24.8 MI</span>
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#C5A059] font-mono-code">
                  <span className="material-symbols-outlined text-[13px]">bolt</span>
                  <span>4.5 kWh • 99.1% Efficiency</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Cockpit Widescreen Layout
  return (
    <div className="flex flex-col w-full min-h-screen pt-16 pb-32 items-center justify-center select-none relative overflow-hidden bg-[#0A0A0A]">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-[5%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-[#C5A059]/5 blur-[160px]"></div>
        <div className="absolute bottom-[5%] right-[20%] w-[50vw] h-[50vw] rounded-full bg-[#8C6D33]/5 blur-[180px]"></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-5xl px-6 relative z-10 my-auto">
        {/* Large Neural WebGL Sphere Shader */}
        <div className="relative w-[340px] sm:w-[420px] h-[340px] sm:h-[420px] flex items-center justify-center mb-6">
          <div className="absolute inset-0 w-full h-full rounded-full opacity-95 transition-opacity duration-1000">
            <ShaderSphere size="100%" interactive={true} />
          </div>
          <div className="absolute inset-0 rounded-full border border-[#C5A059]/25 backdrop-blur-[2px] shadow-[0_0_80px_rgba(197,160,89,0.15)] animate-pulse pointer-events-none"></div>
        </div>

        {/* Headings */}
        <div className="flex flex-col items-center text-center space-y-2 mb-8">
          <span className="font-mono-code text-[11px] text-[#C5A059] uppercase tracking-[0.3em] font-semibold">
            NEURAL VEHICLE INTELLIGENCE
          </span>
          <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl text-white/70 font-light tracking-wide">
            Good afternoon, Alex.
          </h2>
          <h1 className="font-serif-display text-4xl sm:text-5xl md:text-6xl text-white font-medium tracking-tight">
            How may I assist your drive?
          </h1>
        </div>

        {/* Voice Trigger Button */}
        <button
          onClick={handleVoiceTrigger}
          id="voice-trigger"
          className={`relative group w-20 sm:w-24 h-20 sm:h-24 rounded-full flex items-center justify-center border shadow-[0_0_50px_rgba(197,160,89,0.3)] transition-all duration-500 hover:scale-105 active:scale-95 z-20 mb-10 ${
            isListening
              ? 'bg-[#E5C583] border-[#E5C583] ring-4 ring-[#C5A059]/40 text-[#0A0A0A]'
              : 'bg-[#111111]/90 border-[#C5A059]/40 hover:border-[#C5A059] text-[#C5A059]'
          }`}
        >
          <div className="absolute inset-0 rounded-full bg-[#C5A059]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-md"></div>
          <span
            className={`material-symbols-outlined text-[36px] sm:text-[40px] relative z-10 drop-shadow-[0_0_15px_rgba(197,160,89,0.7)] transition-all ${
              isListening ? 'text-[#0A0A0A] scale-110 animate-bounce' : 'text-[#C5A059]'
            }`}
          >
            mic
          </span>
          {isListening && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full h-full rounded-full border border-[#C5A059]/70 animate-[ping_1.6s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
            </div>
          )}
        </button>

        {/* Action Suggestion Pills */}
        <div className="flex flex-wrap justify-center gap-3.5 w-full max-w-3xl pb-6">
          <button
            onClick={() => onNavigate('diagnostics')}
            className="px-6 py-3.5 rounded-full bg-[#111111]/80 backdrop-blur-xl border border-white/10 text-white text-sm sm:text-base font-medium hover:bg-[#1A1A1A] hover:border-[#C5A059]/50 transition-all duration-300 flex items-center gap-2.5 shadow-lg active:scale-95 group"
          >
            <span className="material-symbols-outlined text-[#C5A059] transition-colors text-[20px]">
              directions_car
            </span>
            System Diagnostics
          </button>

          <button
            onClick={() => onNavigate('map')}
            className="px-6 py-3.5 rounded-full bg-[#111111]/80 backdrop-blur-xl border border-white/10 text-white text-sm sm:text-base font-medium hover:bg-[#1A1A1A] hover:border-[#C5A059]/50 transition-all duration-300 flex items-center gap-2.5 shadow-lg active:scale-95 group"
          >
            <span className="material-symbols-outlined text-[#C5A059] transition-colors text-[20px]">
              ev_station
            </span>
            Locate Fast Charger
          </button>

          <button
            onClick={() => onNavigate('map')}
            className="px-6 py-3.5 rounded-full bg-[#111111]/80 backdrop-blur-xl border border-white/10 text-white text-sm sm:text-base font-medium hover:bg-[#1A1A1A] hover:border-[#C5A059]/50 transition-all duration-300 flex items-center gap-2.5 shadow-lg active:scale-95 group"
          >
            <span className="material-symbols-outlined text-[#C5A059] transition-colors text-[20px]">
              route
            </span>
            Plan Route Ahead
          </button>

          <button
            onClick={() => onNavigate('diagnostics')}
            className="px-6 py-3.5 rounded-full bg-[#111111]/80 backdrop-blur-xl border border-white/10 text-white text-sm sm:text-base font-medium hover:bg-[#1A1A1A] hover:border-[#C5A059]/50 transition-all duration-300 flex items-center gap-2.5 shadow-lg active:scale-95 group"
          >
            <span className="material-symbols-outlined text-[#C5A059] transition-colors text-[20px]">
              analytics
            </span>
            Powertrain Report
          </button>
        </div>
      </div>
    </div>
  );
};
