import React, { useState } from 'react';
import { VehicleTelemetry } from '../../types';

interface CarViewProps {
  telemetry: VehicleTelemetry;
  onUpdateTelemetry: (updated: Partial<VehicleTelemetry>) => void;
}

export const CarView: React.FC<CarViewProps> = ({
  telemetry,
  onUpdateTelemetry,
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleLock = () => {
    const nextLocked = !telemetry.isLocked;
    onUpdateTelemetry({ isLocked: nextLocked });
    showToast(nextLocked ? 'Vehicle doors secured & perimeter sentinel armed.' : 'Vehicle perimeter unlocked.');
  };

  const handleToggleTrunk = () => {
    const nextTrunk = !telemetry.trunkOpen;
    onUpdateTelemetry({ trunkOpen: nextTrunk });
    showToast(nextTrunk ? 'Rear motorized tailgate released.' : 'Tailgate sealed & latched.');
  };

  const handleToggleMirrors = () => {
    const nextMirrors = !telemetry.mirrorsFolded;
    onUpdateTelemetry({ mirrorsFolded: nextMirrors });
    showToast(nextMirrors ? 'Aero mirrors retracted.' : 'Aero mirrors deployed.');
  };

  const handleToggleSentry = () => {
    const nextSentry = !telemetry.sentryMode;
    onUpdateTelemetry({ sentryMode: nextSentry });
    showToast(nextSentry ? '360° Sentry live surveillance engaged.' : 'Sentry mode standby.');
  };

  const handleToggleKey = () => {
    const nextKey = !telemetry.digitalKeyActive;
    onUpdateTelemetry({ digitalKeyActive: nextKey });
    showToast(nextKey ? 'UWB Digital Key cryptographically synced.' : 'Digital Key link suspended.');
  };

  const handleTempDelta = (delta: number) => {
    const nextTemp = Math.min(29, Math.max(16, telemetry.cabinTemp + delta));
    onUpdateTelemetry({ cabinTemp: nextTemp });
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto min-h-screen pt-14 pb-32 px-4 sm:px-6 select-none relative bg-[#0A0A0A]">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-[#111111]/95 border border-[#C5A059]/40 rounded-full text-xs font-mono-code text-[#E5C583] shadow-[0_0_20px_rgba(197,160,89,0.3)] animate-bounce text-center">
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mt-2 mb-4">
        <div>
          <span className="font-mono-code text-[10px] text-[#C5A059] tracking-[0.25em] uppercase font-bold">
            REMOTE TELEMETRY &amp; HARDWARE INTERLOCK
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif-display font-medium tracking-tight text-white">Vehicle State</h1>
        </div>

        <div className="flex items-center gap-2 bg-[#111111]/80 px-3.5 py-1.5 rounded-full border border-white/10">
          <span className="w-2 h-2 rounded-full bg-[#C5A059] shadow-[0_0_8px_rgba(197,160,89,0.8)]"></span>
          <span className="font-mono-code text-[10px] text-[#E5C583] uppercase tracking-widest font-semibold">ENCRYPTED LINK</span>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {/* Vehicle 3D Visualization Section with Interactive Hotspots */}
        <section className="relative w-full aspect-[16/9] sm:aspect-[21/9] md:aspect-[16/8] rounded-3xl overflow-hidden bg-[#111111]/85 backdrop-blur-xl border border-white/10 flex items-center justify-center p-6 shadow-2xl group">
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#C5A059]/10 via-transparent to-[#E5C583]/10 opacity-60 pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#C5A059]/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen"></div>

          {/* 3D Car Render image */}
          <div className="relative w-full h-full max-w-2xl flex items-center justify-center">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCA4jo4a9BMbXaECl7UNbXCz6tRHr0W_Jx7Qmbfa89MRbv-t5_vW_b2Vp6wHOreZHKTlpNni1pVDv46ZJXdcOvil-ID_r2Muw2QzN7Rc1ybv9N3wKH9PHfoyqPdJUTcUROCKiYw1c7eP6KUPKgfOrn5l1jqyO8gZ0uy6J8lCiTxD0R405Lr_X10-tdcSO811_LrXhiunpGRIhbbzQGE1YH-mH9V85heeXccv_QKuV13hyaEduV0z1N7"
              alt="Obsidian Stealth-Luxe Electric SUV 3D render"
              className="w-full h-auto max-h-[300px] object-contain mix-blend-lighten z-10 drop-shadow-[0_0_35px_rgba(197,160,89,0.3)]"
            />

            {/* Trunk Hotspot */}
            <button
              onClick={handleToggleTrunk}
              aria-label="Toggle Trunk"
              title="Tailgate Trunk"
              className={`absolute top-[18%] right-[18%] z-20 w-10 sm:w-11 h-10 sm:h-11 rounded-full backdrop-blur-md flex items-center justify-center shadow-[0_0_15px_rgba(197,160,89,0.3)] transition-all hover:scale-110 active:scale-95 border ${
                telemetry.trunkOpen
                  ? 'bg-[#C5A059] text-[#0A0A0A] border-white'
                  : 'bg-[#161616]/90 text-[#E5C583] border-[#C5A059]/40'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">luggage</span>
            </button>

            {/* Lock / Unlock Hotspot */}
            <button
              onClick={handleToggleLock}
              aria-label="Toggle Lock"
              title="Lock/Unlock Vehicle"
              className={`absolute top-[28%] left-[48%] -translate-x-1/2 z-20 w-12 sm:w-13 h-12 sm:h-13 rounded-full backdrop-blur-xl flex items-center justify-center shadow-[0_0_25px_rgba(197,160,89,0.4)] transition-all hover:scale-110 active:scale-95 border ${
                telemetry.isLocked
                  ? 'bg-[#161616]/90 text-[#C5A059] border-[#C5A059]/50'
                  : 'bg-[#E58B58] text-[#0A0A0A] border-[#E58B58]'
              }`}
            >
              <span className="absolute inset-0 rounded-full border border-[#C5A059]/30 animate-[spin_6s_linear_infinite]"></span>
              <span className="material-symbols-outlined text-[24px]">
                {telemetry.isLocked ? 'lock' : 'lock_open'}
              </span>
            </button>

            {/* Power Mirrors Hotspot */}
            <button
              onClick={handleToggleMirrors}
              aria-label="Toggle Mirrors"
              title="Fold Mirrors"
              className={`absolute top-[38%] left-[24%] z-20 w-10 sm:w-11 h-10 sm:h-11 rounded-full backdrop-blur-md flex items-center justify-center shadow-[0_0_15px_rgba(197,160,89,0.3)] transition-all hover:scale-110 active:scale-95 border ${
                telemetry.mirrorsFolded
                  ? 'bg-[#C5A059] text-[#0A0A0A] border-white'
                  : 'bg-[#161616]/90 text-[#E5C583] border-[#C5A059]/40'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">flip</span>
            </button>
          </div>

          {/* Vehicle Status HUD Overlay */}
          <div className="absolute bottom-4 left-6 right-6 flex justify-between items-end z-30 pointer-events-none">
            <div className="flex flex-col gap-0.5">
              <span className="font-mono-code text-white/50 text-[10px] tracking-widest uppercase">
                SYSTEM STATUS
              </span>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#C5A059] shadow-[0_0_8px_#C5A059]"></div>
                <span className="font-serif-display font-medium text-white text-base sm:text-lg">Systems Active</span>
              </div>
            </div>

            <div className="text-right">
              <span className="font-mono-code text-white/50 text-[10px] tracking-widest uppercase">
                ENERGY RESERVE
              </span>
              <span className="block text-2xl sm:text-3xl font-extrabold text-[#C5A059] font-mono-code">
                {telemetry.battery}%
              </span>
            </div>
          </div>
        </section>

        {/* Quick Actions Grid (4 buttons) */}
        <section className="grid grid-cols-4 gap-3">
          <button
            onClick={() => showToast('Supercharging session pre-conditioned. Target: 90%')}
            className="flex flex-col items-center justify-center gap-1.5 h-20 rounded-2xl bg-[#111111]/85 border border-white/10 hover:border-[#C5A059]/40 transition-all active:scale-95 text-white/70 hover:text-[#C5A059] group shadow-md"
          >
            <span className="material-symbols-outlined text-[22px] group-hover:scale-110 transition-transform">
              flash_on
            </span>
            <span className="font-mono-code text-[10px] font-semibold tracking-widest">CHARGE</span>
          </button>

          <button
            onClick={() => {
              const nextAuto = !telemetry.isAutoClimate;
              onUpdateTelemetry({ isAutoClimate: nextAuto });
              showToast(nextAuto ? 'Cabin thermal pre-conditioning activated.' : 'Cabin climate in manual.');
            }}
            className={`flex flex-col items-center justify-center gap-1.5 h-20 rounded-2xl border transition-all active:scale-95 shadow-md ${
              telemetry.isAutoClimate
                ? 'bg-[#161616] border-[#C5A059]/50 text-[#C5A059]'
                : 'bg-[#111111]/85 border-white/10 text-white/70'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">ac_unit</span>
            <span className="font-mono-code text-[10px] font-semibold tracking-widest">CLIMATE</span>
          </button>

          <button
            onClick={handleToggleKey}
            className={`flex flex-col items-center justify-center gap-1.5 h-20 rounded-2xl border transition-all active:scale-95 shadow-md ${
              telemetry.digitalKeyActive
                ? 'bg-[#161616] border-[#C5A059]/50 text-[#C5A059]'
                : 'bg-[#111111]/85 border-white/10 text-white/70'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">key</span>
            <span className="font-mono-code text-[10px] font-semibold tracking-widest">DIGITAL KEY</span>
          </button>

          <button
            onClick={handleToggleSentry}
            className={`flex flex-col items-center justify-center gap-1.5 h-20 rounded-2xl border transition-all active:scale-95 shadow-md ${
              telemetry.sentryMode
                ? 'bg-[#4A1A14]/60 border-[#E58B58]/50 text-[#E58B58]'
                : 'bg-[#111111]/85 border-white/10 text-white/70'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">camera_outdoor</span>
            <span className="font-mono-code text-[10px] font-semibold tracking-widest">SENTRY</span>
          </button>
        </section>

        {/* Split Panels: Stats & Climate */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Stats Panel */}
          <section className="flex flex-col justify-between p-6 rounded-3xl bg-[#111111]/85 backdrop-blur-xl border border-white/10 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-mono-code text-[10px] text-[#C5A059] tracking-[0.25em] font-bold uppercase">
                TELEMETRY REGISTRY
              </h2>
              <span className="material-symbols-outlined text-[#C5A059] text-[18px]">query_stats</span>
            </div>

            <div className="flex flex-col gap-4 relative z-10">
              {/* Odometer */}
              <div className="flex justify-between items-center py-2.5 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#161616] flex items-center justify-center text-[#C5A059]">
                    <span className="material-symbols-outlined text-[16px]">speed</span>
                  </div>
                  <span className="text-white font-medium text-sm">Odometer</span>
                </div>
                <span className="text-white font-bold font-mono-code text-base">
                  {telemetry.odometerKm.toLocaleString()} <span className="text-xs text-white/50">km</span>
                </span>
              </div>

              {/* Tyre Pressure */}
              <div className="flex justify-between items-center py-2.5 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#161616] flex items-center justify-center text-[#C5A059] relative">
                    <span className="material-symbols-outlined text-[16px]">tire_repair</span>
                    <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#4ADE80]"></div>
                  </div>
                  <span className="text-white font-medium text-sm">Tyre Pressure</span>
                </div>
                <span className="text-[#C5A059] font-semibold text-sm">
                  {telemetry.tyreStatus}
                </span>
              </div>

              {/* Next Service */}
              <div className="flex justify-between items-center py-2.5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#161616] flex items-center justify-center text-white/50">
                    <span className="material-symbols-outlined text-[16px]">build</span>
                  </div>
                  <span className="text-white font-medium text-sm">Service Interval</span>
                </div>
                <span className="text-white font-bold font-mono-code text-base">
                  in {telemetry.nextServiceKm.toLocaleString()} <span className="text-xs text-white/50">km</span>
                </span>
              </div>
            </div>
          </section>

          {/* Climate Panel */}
          <section className="flex flex-col p-6 rounded-3xl bg-[#111111]/85 backdrop-blur-xl border border-white/10 shadow-xl relative overflow-hidden items-center justify-center min-h-[260px]">
            <div className="w-full flex items-center justify-between mb-4">
              <h2 className="font-mono-code text-[10px] text-[#C5A059] tracking-[0.25em] font-bold uppercase">
                CABIN CLIMATE MATRIX
              </h2>
              <div className="flex items-center gap-1.5 bg-[#161616] py-1 px-3 rounded-full text-xs font-mono-code text-white/80 border border-white/5">
                <span className="material-symbols-outlined text-[#C5A059] text-[14px]">thermostat</span>
                <span>24°C Ext</span>
              </div>
            </div>

            {/* Interactive Dial Gauge */}
            <div className="relative w-44 h-44 flex items-center justify-center my-2">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  className="text-white/10"
                  cx="50"
                  cy="50"
                  fill="none"
                  r="44"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <circle
                  className="text-[#C5A059] transition-all duration-300 drop-shadow-[0_0_8px_rgba(197,160,89,0.7)]"
                  cx="50"
                  cy="50"
                  fill="none"
                  r="44"
                  stroke="currentColor"
                  strokeDasharray="276"
                  strokeDashoffset={276 - (telemetry.cabinTemp / 30) * 200}
                  strokeLinecap="round"
                  strokeWidth="5"
                />
              </svg>

              {/* Center Display */}
              <div className="relative w-32 h-32 rounded-full bg-[#0A0A0A] flex flex-col items-center justify-center border border-white/10 shadow-inner">
                <span className="text-3xl font-extrabold text-white tracking-tight leading-none">
                  {telemetry.cabinTemp}°
                </span>
                <span className="font-mono-code text-[10px] text-[#C5A059] font-bold mt-1 tracking-widest">
                  {telemetry.isAutoClimate ? 'AUTO' : 'MANUAL'}
                </span>
              </div>

              {/* Minus Button */}
              <button
                onClick={() => handleTempDelta(-1)}
                className="absolute -left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#161616] border border-white/15 text-white flex items-center justify-center shadow-lg active:scale-90 hover:bg-[#202020] transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">remove</span>
              </button>

              {/* Plus Button */}
              <button
                onClick={() => handleTempDelta(1)}
                className="absolute -right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#161616] border border-white/15 text-white flex items-center justify-center shadow-lg active:scale-90 hover:bg-[#202020] transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
              </button>
            </div>

            {/* Sync & AC Toggles */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => {
                  onUpdateTelemetry({ isSyncActive: !telemetry.isSyncActive });
                  showToast(telemetry.isSyncActive ? 'Dual-zone uncoupled.' : 'Dual-zone climate synchronised.');
                }}
                className={`px-5 py-1.5 rounded-full font-mono-code text-xs font-semibold border transition-all ${
                  telemetry.isSyncActive
                    ? 'bg-[#C5A059]/20 text-[#E5C583] border-[#C5A059]/40'
                    : 'bg-[#161616] text-white/60 border-white/10'
                }`}
              >
                Sync
              </button>

              <button
                onClick={() => {
                  onUpdateTelemetry({ isAcActive: !telemetry.isAcActive });
                  showToast(telemetry.isAcActive ? 'A/C compressor disabled.' : 'A/C compressor activated.');
                }}
                className={`px-5 py-1.5 rounded-full font-mono-code text-xs font-semibold border transition-all ${
                  telemetry.isAcActive
                    ? 'bg-[#C5A059]/20 text-[#E5C583] border-[#C5A059]/40'
                    : 'bg-[#161616] text-white/60 border-white/10'
                }`}
              >
                A/C
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
