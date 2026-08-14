import React, { useState, useEffect } from 'react';
import { VehicleTelemetry, ScreenView } from '../../types';

interface DiagnosticsViewProps {
  telemetry: VehicleTelemetry;
  onNavigate: (view: ScreenView) => void;
  onOpenServiceModal: () => void;
  onOpenExplainModal: () => void;
}

export const DiagnosticsView: React.FC<DiagnosticsViewProps> = ({
  telemetry,
  onNavigate,
  onOpenServiceModal,
  onOpenExplainModal,
}) => {
  const [seconds, setSeconds] = useState(18);
  const [minutes, setMinutes] = useState(telemetry.tripDurationMin || 42);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => {
        if (prev >= 59) {
          setMinutes(m => m + 1);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen pt-14 pb-32 px-4 sm:px-6 lg:px-10 select-none relative overflow-hidden bg-[#0A0A0A]">
      {/* Background ambient gradient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[60%] bg-[#E58B58]/8 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#C5A059]/6 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-6">
        {/* Header Section */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-2 mb-2">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#4A1A14]/60 border border-[#E58B58]/50 flex items-center justify-center animate-pulse shadow-[0_0_25px_rgba(229,139,88,0.3)]">
              <span className="material-symbols-outlined text-[#E58B58] text-[26px]">warning</span>
            </div>
            <div>
              <span className="text-[10px] font-mono-code text-[#C5A059] tracking-[0.3em] uppercase block font-semibold">
                SYSTEM TELEMETRY &amp; HARDWARE AUDIT
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif-display font-medium tracking-tight text-white">
                Vehicle Diagnostics
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#111111]/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E58B58] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E58B58]"></span>
            </span>
            <span className="font-mono-code text-[10px] text-white/70 tracking-[0.2em] font-semibold uppercase">
              SCAN ACTIVE • TELEMETRY NOMINAL
            </span>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: 3D Wireframe & Issue Overview (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Diagnostic Visualization Area */}
            <div className="relative w-full h-[360px] sm:h-[400px] bg-[#111111]/80 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between p-5 sm:p-6 shadow-2xl group">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#C5A059]/60 rounded-tl-2xl pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#C5A059]/60 rounded-tr-2xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#C5A059]/60 rounded-bl-2xl pointer-events-none"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#C5A059]/60 rounded-br-2xl pointer-events-none"></div>

              {/* Header inside mesh */}
              <div className="flex justify-between items-start z-10 relative">
                <div className="font-mono-code text-[11px] text-[#C5A059] tracking-widest font-semibold">
                  POWERTRAIN CAD SCHEMATIC
                </div>
                <div className="text-xs font-mono-code text-white/40">
                  COORDS: -4.2 / 8.1 / 1.0
                </div>
              </div>

              {/* SVG Car Wireframe with animated sensor hotspot */}
              <div className="absolute inset-0 flex items-center justify-center opacity-85 z-0">
                <svg className="w-full h-full max-w-[620px] absolute" viewBox="0 0 800 400">
                  <defs>
                    <pattern id="diag-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                    </pattern>
                    <linearGradient id="diag-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(229, 139, 88, 0)" />
                      <stop offset="50%" stopColor="rgba(229, 139, 88, 0.8)" />
                      <stop offset="100%" stopColor="rgba(229, 139, 88, 0)" />
                    </linearGradient>
                  </defs>

                  <rect width="100%" height="100%" fill="url(#diag-grid)" />

                  {/* Car Body Lines */}
                  <path
                    className="animate-dash-flow"
                    d="M 150 220 Q 180 180 250 160 L 400 150 L 550 160 Q 650 180 680 220 C 700 250 680 280 650 280 L 180 280 C 150 280 130 250 150 220 Z"
                    fill="none"
                    stroke="rgba(197, 160, 89, 0.3)"
                    strokeDasharray="4 4"
                    strokeWidth="1.75"
                  />
                  <path
                    d="M 280 160 L 350 100 L 480 100 L 530 160"
                    fill="none"
                    stroke="rgba(197, 160, 89, 0.45)"
                    strokeWidth="2"
                  />

                  {/* Front & Rear Wheels */}
                  <circle cx="260" cy="280" r="35" fill="none" stroke="rgba(197, 160, 89, 0.4)" strokeWidth="2" />
                  <circle cx="260" cy="280" r="25" fill="none" stroke="rgba(197, 160, 89, 0.2)" strokeDasharray="2 4" strokeWidth="1" />
                  <circle cx="580" cy="280" r="35" fill="none" stroke="rgba(197, 160, 89, 0.4)" strokeWidth="2" />
                  <circle cx="580" cy="280" r="25" fill="none" stroke="rgba(197, 160, 89, 0.2)" strokeDasharray="2 4" strokeWidth="1" />

                  {/* Engine Block / Warning Area Hotspot */}
                  <g transform="translate(200, 190)">
                    <rect
                      x="0"
                      y="0"
                      width="80"
                      height="60"
                      fill="rgba(229, 139, 88, 0.15)"
                      stroke="rgba(229, 139, 88, 0.7)"
                      strokeWidth="1.5"
                      className="animate-pulse"
                    />
                    <path
                      d="M -15 -10 L 95 -10 L 95 70 L -15 70 Z"
                      fill="none"
                      stroke="url(#diag-glow)"
                      strokeWidth="2"
                      className="animate-pulse"
                    />
                    {/* Radiating error rings */}
                    <circle cx="40" cy="30" r="14" fill="rgba(229, 139, 88, 0.8)" className="animate-ping" />
                    <circle cx="40" cy="30" r="5" fill="#E58B58" />
                  </g>

                  {/* Data Callout Line */}
                  <path d="M 240 190 L 120 120 L 70 120" fill="none" stroke="rgba(229, 139, 88, 0.7)" strokeWidth="1.5" />
                  <circle cx="240" cy="190" r="3.5" fill="#E58B58" />
                </svg>
              </div>

              {/* Callout Tag */}
              <div className="z-10 relative mt-auto">
                <div className="bg-[#0A0A0A]/90 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-[#E58B58]/40 inline-flex items-center gap-2 shadow-[0_0_20px_rgba(229,139,88,0.25)]">
                  <span className="w-2 h-2 rounded-full bg-[#E58B58] animate-ping"></span>
                  <span className="font-mono-code text-[11px] text-[#E58B58] font-bold tracking-wider">
                    SENSOR 04: STATOR THERMAL ELEVATION ({telemetry.engineTemp}°C)
                  </span>
                </div>
              </div>
            </div>

            {/* Problem Analysis Alert Box */}
            <div className="w-full bg-[#111111]/90 backdrop-blur-2xl rounded-2xl p-5 sm:p-6 border-l-4 border-[#E58B58] border-t border-r border-b border-white/10 shadow-2xl">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-[#E58B58] text-[30px] mt-0.5 shrink-0">
                  error
                </span>
                <div className="flex-1 min-w-0">
                  <h2 className="font-serif-display text-lg sm:text-xl font-semibold text-white mb-2">
                    ANOMALY DETECTED: Inverter Winding Temperature Elevated
                  </h2>
                  <p className="text-sm text-white/70 leading-relaxed mb-5 max-w-2xl">
                    Thermal telemetry registers a localized +14% elevation in stator winding impedance across the last 12 minutes. Coolant circulation is nominal (1.8 bar), suggesting high continuous stator load. Safe cruising speed advised.
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={onOpenServiceModal}
                      className="h-[46px] px-6 rounded-full bg-[#C5A059] text-[#0A0A0A] font-mono-code font-bold text-[11px] tracking-widest flex items-center gap-2 hover:bg-[#E5C583] transition-all shadow-[0_0_20px_rgba(197,160,89,0.35)] active:scale-95 uppercase"
                    >
                      <span className="material-symbols-outlined text-[18px]">build</span>
                      Service Hubs
                    </button>

                    <button
                      onClick={() => onNavigate('map')}
                      className="h-[46px] px-6 rounded-full bg-[#161616] border border-[#C5A059]/40 text-[#E5C583] font-mono-code font-semibold text-[11px] tracking-widest flex items-center gap-2 hover:bg-[#1A1A1A] transition-all active:scale-95 uppercase"
                    >
                      <span className="material-symbols-outlined text-[18px]">navigation</span>
                      HUD Route
                    </button>

                    <button
                      onClick={onOpenExplainModal}
                      className="h-[46px] px-5 rounded-full bg-[#161616] border border-white/15 text-white/90 font-mono-code font-semibold text-[11px] tracking-widest flex items-center gap-2 hover:bg-white/10 transition-all active:scale-95 sm:ml-auto uppercase"
                    >
                      <span className="material-symbols-outlined text-[18px] text-[#C5A059]">auto_awesome</span>
                      AI Breakdown
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Data Cards & AI Recommendation (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* AI Orbital Recommendation Container */}
            <div className="w-full bg-[#111111]/80 backdrop-blur-2xl rounded-2xl border border-[#C5A059]/25 p-6 shadow-2xl relative overflow-hidden group">
              {/* Glowing orb background */}
              <div className="absolute -right-8 -top-8 w-36 h-36 bg-[#C5A059]/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000 pointer-events-none"></div>

              <div className="flex items-center gap-2.5 mb-3.5 relative z-10">
                <span className="material-symbols-outlined text-[#C5A059] text-[22px] animate-pulse">auto_awesome</span>
                <span className="font-mono-code text-[10px] text-[#C5A059] tracking-[0.25em] font-bold uppercase">
                  NEURAL CO-PILOT ANALYSIS
                </span>
              </div>

              <p className="text-sm sm:text-base text-white/90 leading-relaxed relative z-10 font-light">
                "Recommend throttling torque demand by 20% to allow thermal dissipation. Continuous high-load driving may trigger protective speed limits. A certified diagnostic station is positioned <span className="text-[#C5A059] font-semibold">3.2 km ahead</span> along your route."
              </p>

              {/* Dynamic Voice Visualizer Bars */}
              <div className="flex items-end gap-1.5 h-6 mt-6 opacity-75">
                <div className="w-1 bg-[#C5A059]/40 rounded-t-sm animate-[pulse_1s_infinite]" style={{ height: '40%' }}></div>
                <div className="w-1 bg-[#C5A059]/60 rounded-t-sm animate-[pulse_0.8s_infinite_0.1s]" style={{ height: '70%' }}></div>
                <div className="w-1 bg-[#C5A059] rounded-t-sm animate-[pulse_1.2s_infinite_0.2s]" style={{ height: '100%' }}></div>
                <div className="w-1 bg-[#C5A059]/60 rounded-t-sm animate-[pulse_0.9s_infinite_0.3s]" style={{ height: '60%' }}></div>
                <div className="w-1 bg-[#C5A059]/40 rounded-t-sm animate-[pulse_1.1s_infinite_0.4s]" style={{ height: '30%' }}></div>
                <div className="w-1 bg-[#E5C583] rounded-t-sm animate-[pulse_0.7s_infinite_0.15s]" style={{ height: '85%' }}></div>
                <div className="w-1 bg-[#C5A059]/50 rounded-t-sm animate-[pulse_1.3s_infinite_0.25s]" style={{ height: '50%' }}></div>
              </div>
            </div>

            {/* Telemetry Data Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Temperature Card (Error State) */}
              <div className="bg-[#111111]/80 backdrop-blur-2xl border border-[#E58B58]/30 rounded-2xl p-5 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#E58B58]/60"></div>
                <div className="flex justify-between items-start mb-3">
                  <span className="font-mono-code text-[10px] text-[#E58B58] font-bold tracking-widest uppercase">STATOR TEMP</span>
                  <span className="material-symbols-outlined text-[#E58B58] text-[18px]">thermostat</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#E58B58] tracking-tight">{telemetry.engineTemp}°</span>
                  <span className="text-xs sm:text-sm font-semibold text-[#E58B58]/80 font-mono-code">+{telemetry.tempAnomalyPercent}%</span>
                </div>
                <div className="w-full bg-[#1A1A1A] h-1.5 rounded-full mt-3.5 overflow-hidden">
                  <div className="bg-[#E58B58] h-full rounded-full w-[85%] relative shadow-[0_0_8px_rgba(229,139,88,0.6)]">
                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Coolant Flow Card (Normal State) */}
              <div className="bg-[#111111]/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 shadow-lg">
                <div className="flex justify-between items-start mb-3">
                  <span className="font-mono-code text-[10px] text-white/60 font-bold tracking-widest uppercase">COOLANT LOOP</span>
                  <span className="material-symbols-outlined text-white/50 text-[18px]">water_drop</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">1.8</span>
                  <span className="text-xs text-white/50 font-mono-code">bar</span>
                </div>
                <div className="mt-3.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#4ADE80] shadow-[0_0_8px_rgba(74,222,128,0.7)]"></span>
                  <span className="text-[10px] text-white/70 uppercase tracking-widest font-mono-code">Flow Nominal</span>
                </div>
              </div>

              {/* Engine Load Card */}
              <div className="bg-[#111111]/80 backdrop-blur-2xl border border-[#C5A059]/30 rounded-2xl p-5 shadow-lg">
                <div className="flex justify-between items-start mb-3">
                  <span className="font-mono-code text-[10px] text-[#C5A059] font-bold tracking-widest uppercase">POWERTRAIN LOAD</span>
                  <span className="material-symbols-outlined text-[#C5A059] text-[18px]">speed</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#E5C583] tracking-tight">{telemetry.engineLoad}%</span>
                  <span className="text-xs text-white/50 font-mono-code">Elevated</span>
                </div>
                {/* Mini sparkline */}
                <div className="h-6 mt-3 w-full flex items-end gap-1 opacity-80">
                  <div className="flex-1 bg-white/10 rounded-t-sm h-[30%]"></div>
                  <div className="flex-1 bg-white/10 rounded-t-sm h-[40%]"></div>
                  <div className="flex-1 bg-white/10 rounded-t-sm h-[45%]"></div>
                  <div className="flex-1 bg-[#C5A059]/40 rounded-t-sm h-[60%]"></div>
                  <div className="flex-1 bg-[#C5A059]/70 rounded-t-sm h-[75%]"></div>
                  <div className="flex-1 bg-[#C5A059] rounded-t-sm h-[82%] shadow-[0_0_8px_rgba(197,160,89,0.5)]"></div>
                </div>
              </div>

              {/* Duration Card */}
              <div className="bg-[#111111]/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 shadow-lg">
                <div className="flex justify-between items-start mb-3">
                  <span className="font-mono-code text-[10px] text-white/60 font-bold tracking-widest uppercase">IGNITION RUN</span>
                  <span className="material-symbols-outlined text-white/50 text-[18px]">timer</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{minutes}</span>
                  <span className="text-xs text-white/50 font-mono-code">min</span>
                </div>
                <div className="mt-3.5 border-t border-white/10 pt-2 flex justify-between items-center text-xs">
                  <span className="text-white/50">Timestamp</span>
                  <span className="font-mono-code text-[#C5A059] text-[11px]">
                    00:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
