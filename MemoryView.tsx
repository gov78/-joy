import React, { useState } from 'react';
import { VehicleTelemetry, ScreenView } from '../../types';

interface MemoryViewProps {
  telemetry: VehicleTelemetry;
  onUpdateTelemetry: (updated: Partial<VehicleTelemetry>) => void;
  onNavigate: (view: ScreenView) => void;
}

export const MemoryView: React.FC<MemoryViewProps> = ({
  telemetry,
  onUpdateTelemetry,
  onNavigate,
}) => {
  const [toast, setToast] = useState<string | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showPurgeConfirm, setShowPurgeConfirm] = useState(false);

  const showToastMsg = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handlePurge = () => {
    setShowPurgeConfirm(false);
    showToastMsg('Neural memory log purged and synthesized vectors reset.');
  };

  return (
    <div className="flex flex-col w-full min-h-screen pt-14 pb-32 px-4 sm:px-6 lg:px-10 select-none relative overflow-hidden bg-[#0A0A0A]">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-[#111111]/95 border border-[#C5A059]/40 rounded-full text-xs font-mono-code text-[#E5C583] shadow-[0_0_20px_rgba(197,160,89,0.3)] animate-bounce text-center">
          {toast}
        </div>
      )}

      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="w-[700px] h-[700px] rounded-full bg-[#C5A059]/10 blur-[140px] absolute top-10 left-1/4"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <header className="flex flex-wrap justify-between items-end gap-4 mt-2">
          <div>
            <p className="font-mono-code text-[10px] text-[#C5A059] tracking-[0.25em] uppercase font-bold mb-1">
              NEURAL ARCHIVE &amp; COGNITION
            </p>
            <h1 className="text-3xl sm:text-4xl font-serif-display font-medium tracking-tight text-white">
              Memory &amp; Identity
            </h1>
          </div>

          <button
            onClick={() => setShowProfileModal(true)}
            className="h-11 px-5 rounded-full border border-[#C5A059]/30 text-[#E5C583] font-mono-code text-xs tracking-wider hover:bg-[#C5A059]/10 hover:border-[#C5A059]/60 transition-all flex items-center gap-2 group active:scale-95 bg-[#111111]"
          >
            <span className="material-symbols-outlined text-[18px] text-[#C5A059]">manage_accounts</span>
            Manage Profile
          </button>
        </header>

        {/* Main Content Layout (Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Synthesized Persona & Privacy Actions (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            {/* AI Identity Card */}
            <div className="bg-[#111111]/85 backdrop-blur-2xl rounded-3xl p-6 sm:p-7 border border-[#C5A059]/20 shadow-2xl relative overflow-hidden group hover:border-[#C5A059]/40 transition-all duration-500">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#C5A059]/10 blur-3xl rounded-full pointer-events-none"></div>

              {/* Persona Profile Header */}
              <div className="flex items-start gap-4 mb-6 relative z-10">
                <div className="w-14 h-14 rounded-full bg-[#161616] border border-[#C5A059]/40 flex items-center justify-center relative shadow-[0_0_20px_rgba(197,160,89,0.2)]">
                  <div className="absolute inset-0 rounded-full border border-[#C5A059]/40 border-dashed animate-[spin_10s_linear_infinite]"></div>
                  <span className="material-symbols-outlined text-[#C5A059] text-[28px]">
                    psychology
                  </span>
                </div>
                <div>
                  <h2 className="text-lg font-serif-display font-medium text-white mb-0.5">Synthesized Persona</h2>
                  <p className="font-mono-code text-[11px] text-white/50">Last sync: 2 min ago</p>
                </div>
              </div>

              {/* Persona Learned Insight Items */}
              <div className="space-y-3 relative z-10">
                {/* Item 1 */}
                <div className="flex gap-3.5 items-start p-3.5 bg-[#161616]/80 rounded-2xl border border-white/5 hover:bg-[#1c1c1c] transition-colors">
                  <span className="material-symbols-outlined text-[#C5A059] text-[20px] mt-0.5">ac_unit</span>
                  <div>
                    <p className="text-sm font-medium text-white">Cabin stabilized at 22°C</p>
                    <p className="font-mono-code text-[10px] text-white/50 mt-0.5">
                      Calibrated for morning transit schedules
                    </p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex gap-3.5 items-start p-3.5 bg-[#161616]/80 rounded-2xl border border-white/5 hover:bg-[#1c1c1c] transition-colors">
                  <span className="material-symbols-outlined text-[#C5A059] text-[20px] mt-0.5">route</span>
                  <div>
                    <p className="text-sm font-medium text-white">Bypassing coarse aggregate roads</p>
                    <p className="font-mono-code text-[10px] text-white/50 mt-0.5">
                      Adaptive damping profile engaged
                    </p>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="flex gap-3.5 items-start p-3.5 bg-[#161616]/80 rounded-2xl border border-white/5 hover:bg-[#1c1c1c] transition-colors">
                  <span className="material-symbols-outlined text-[#C5A059] text-[20px] mt-0.5">ev_station</span>
                  <div>
                    <p className="text-sm font-medium text-white">Target charge capped at 80%</p>
                    <p className="font-mono-code text-[10px] text-white/50 mt-0.5">
                      Extending cell cathode longevity
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Action buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setShowPrivacyModal(true)}
                className="w-full text-left p-4 sm:p-5 rounded-2xl bg-[#111111]/85 border border-white/10 text-white font-medium text-sm hover:border-[#C5A059]/40 hover:bg-[#161616] transition-all flex justify-between items-center group shadow-md"
              >
                <span>Privacy &amp; Vector Constraints</span>
                <span className="material-symbols-outlined text-white/50 group-hover:text-[#C5A059] transition-colors">
                  shield_lock
                </span>
              </button>

              <button
                onClick={() => setShowPurgeConfirm(true)}
                className="w-full text-left p-4 sm:p-5 rounded-2xl bg-[#111111]/85 border border-white/10 text-[#E58B58]/80 font-medium text-sm hover:text-[#E58B58] hover:bg-[#4A1A14]/30 hover:border-[#E58B58]/30 transition-all flex justify-between items-center group shadow-md"
              >
                <span>Purge Neural Cache</span>
                <span className="material-symbols-outlined text-[#E58B58] group-hover:scale-110 transition-transform">
                  delete_sweep
                </span>
              </button>
            </div>
          </div>

          {/* Right Column: Bento Grid for Dynamics & Vectors (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Thermal Dynamics Node */}
              <div className="bg-[#111111]/85 backdrop-blur-2xl rounded-3xl p-6 border border-white/10 shadow-xl flex flex-col justify-between relative overflow-hidden group">
                <div className="flex justify-between items-center mb-4 relative z-10">
                  <span className="font-mono-code text-[10px] text-[#C5A059] tracking-[0.2em] font-bold uppercase">
                    THERMAL DYNAMICS
                  </span>
                  <span className="material-symbols-outlined text-[#C5A059]">thermostat</span>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center my-4 relative z-10">
                  <div
                    onClick={() => {
                      const next = telemetry.cabinTemp >= 24 ? 20 : telemetry.cabinTemp + 1;
                      onUpdateTelemetry({ cabinTemp: next });
                      showToastMsg(`Thermal target shifted to ${next}°C AUTO`);
                    }}
                    className="w-44 h-44 rounded-full border-4 border-[#161616] relative flex items-center justify-center cursor-pointer hover:border-[#C5A059]/40 transition-colors group/dial"
                  >
                    <div className="absolute w-full h-full rounded-full border-4 border-[#C5A059] border-t-transparent border-l-transparent rotate-45 group-hover/dial:rotate-90 transition-transform duration-500"></div>
                    <div className="text-center">
                      <span className="text-4xl font-extrabold text-[#C5A059] block font-mono-code">
                        {telemetry.cabinTemp}°
                      </span>
                      <span className="font-mono-code text-[10px] text-white/60 tracking-widest font-bold">
                        AUTO / SYNC
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Drive Dynamics Node */}
              <div className="bg-[#111111]/85 backdrop-blur-2xl rounded-3xl p-6 border border-white/10 shadow-xl flex flex-col relative overflow-hidden">
                <div className="flex justify-between items-center mb-6 relative z-10">
                  <span className="font-mono-code text-[10px] text-[#C5A059] tracking-[0.2em] font-bold uppercase">
                    DRIVE MATRIX
                  </span>
                  <span className="material-symbols-outlined text-[#C5A059]">sports_motorsports</span>
                </div>

                <div className="space-y-5 relative z-10">
                  {/* Parameter 1: Suspension */}
                  <div>
                    <div className="flex justify-between items-center mb-2 text-xs">
                      <span className="text-white font-medium">Suspension Damping</span>
                      <button
                        onClick={() => {
                          const modes: Array<'COMFORT' | 'BALANCED' | 'SPORT'> = ['COMFORT', 'BALANCED', 'SPORT'];
                          const next = modes[(modes.indexOf(telemetry.suspensionStiffness) + 1) % modes.length];
                          onUpdateTelemetry({ suspensionStiffness: next });
                          showToastMsg(`Suspension damping set to ${next}`);
                        }}
                        className="font-mono-code text-[#C5A059] font-bold uppercase hover:underline"
                      >
                        {telemetry.suspensionStiffness}
                      </button>
                    </div>
                    <div className="h-2 bg-[#161616] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#C5A059] rounded-full shadow-[0_0_10px_rgba(197,160,89,0.8)] transition-all duration-300"
                        style={{
                          width:
                            telemetry.suspensionStiffness === 'COMFORT'
                              ? '35%'
                              : telemetry.suspensionStiffness === 'BALANCED'
                              ? '65%'
                              : '100%',
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Parameter 2: Regenerative Braking */}
                  <div>
                    <div className="flex justify-between items-center mb-2 text-xs">
                      <span className="text-white font-medium">Regenerative Recovery</span>
                      <button
                        onClick={() => {
                          const modes: Array<'LOW' | 'STANDARD' | 'AGGRESSIVE'> = ['LOW', 'STANDARD', 'AGGRESSIVE'];
                          const next = modes[(modes.indexOf(telemetry.regenBraking) + 1) % modes.length];
                          onUpdateTelemetry({ regenBraking: next });
                          showToastMsg(`Regen Recovery: ${next}`);
                        }}
                        className="font-mono-code text-[#C5A059] font-bold uppercase hover:underline"
                      >
                        {telemetry.regenBraking}
                      </button>
                    </div>
                    <div className="h-2 bg-[#161616] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#C5A059] rounded-full shadow-[0_0_10px_rgba(197,160,89,0.8)] transition-all duration-300"
                        style={{
                          width:
                            telemetry.regenBraking === 'LOW'
                              ? '30%'
                              : telemetry.regenBraking === 'STANDARD'
                              ? '60%'
                              : '88%',
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Parameter 3: Steering Weight */}
                  <div>
                    <div className="flex justify-between items-center mb-2 text-xs">
                      <span className="text-white font-medium">Steering Resistance</span>
                      <button
                        onClick={() => {
                          const modes: Array<'COMFORT' | 'ADAPTIVE' | 'SPORT'> = ['COMFORT', 'ADAPTIVE', 'SPORT'];
                          const next = modes[(modes.indexOf(telemetry.steeringWeight) + 1) % modes.length];
                          onUpdateTelemetry({ steeringWeight: next });
                          showToastMsg(`Steering profile: ${next}`);
                        }}
                        className="font-mono-code text-[#C5A059] font-bold uppercase hover:underline"
                      >
                        {telemetry.steeringWeight}
                      </button>
                    </div>
                    <div className="h-2 bg-[#161616] rounded-full overflow-hidden flex">
                      <div
                        className="h-full bg-[#C5A059] rounded-l-full shadow-[0_0_10px_rgba(197,160,89,0.8)] transition-all duration-300"
                        style={{
                          width:
                            telemetry.steeringWeight === 'COMFORT'
                              ? '40%'
                              : telemetry.steeringWeight === 'ADAPTIVE'
                              ? '70%'
                              : '95%',
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Spatial Node: Frequent Vectors Map Card (Full 2 Columns on bottom) */}
              <div className="md:col-span-2 bg-[#111111]/85 backdrop-blur-2xl rounded-3xl p-0 border border-white/10 shadow-xl relative overflow-hidden group min-h-[220px]">
                <div className="absolute top-5 left-5 z-20 pointer-events-none">
                  <div className="bg-[#111111]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#C5A059]/30">
                    <span className="font-mono-code text-[10px] text-[#C5A059] tracking-widest font-bold uppercase">
                      FREQUENT SPATIAL VECTORS
                    </span>
                  </div>
                </div>

                {/* Map image overlay */}
                <div
                  className="absolute inset-0 w-full h-full bg-cover bg-center opacity-40 mix-blend-luminosity group-hover:opacity-60 transition-opacity duration-700"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDh_0joloiE89avFQi40HXw8i59YY2AnrYW0u10K5FIyhFlOXBPSFoU_4aiex_a1A_AnnKhtYVGqihZ8LDCA4SwilpBs8_oLHhRtfrQG8ugNZgegG-NcIxhLeUB4rGoqLOUuYZ_ro1Qr66slgE5gT--xzj91mUtVjCd4jVt05_mGnqHYfCcJi8nZ9odfkuWkUKRqqHpX0MV4CKEBP8zasi__doKpklUhZ6dHB4wh-FTN5q-IPe6LIZh')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent"></div>

                {/* Overlay Route Buttons */}
                <div className="absolute bottom-5 left-5 right-5 z-20 flex flex-wrap sm:flex-nowrap gap-3">
                  <button
                    onClick={() => {
                      showToastMsg('Routing to Executive Sanctuary (Bypassing heavy arteries).');
                      onNavigate('map');
                    }}
                    className="bg-[#111111]/95 backdrop-blur-md border border-[#C5A059]/30 rounded-2xl p-3.5 flex-1 flex items-center justify-between hover:bg-[#161616] hover:border-[#C5A059]/60 transition-all active:scale-95 text-left"
                  >
                    <div>
                      <span className="text-white font-serif-display text-sm block">Office Atelier</span>
                      <span className="font-mono-code text-[9px] text-[#C5A059] tracking-wider font-bold">
                        SURFACE ARTERY ROUTING
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-[#C5A059]">turn_right</span>
                  </button>

                  <button
                    onClick={() => {
                      showToastMsg('Engaging Alpine Villa Route with Scenic Priority.');
                      onNavigate('map');
                    }}
                    className="bg-[#111111]/95 backdrop-blur-md border border-white/10 rounded-2xl p-3.5 flex-1 flex items-center justify-between hover:bg-[#161616] hover:border-white/25 transition-all active:scale-95 text-left"
                  >
                    <div>
                      <span className="text-white font-serif-display text-sm block">Alpine Retreat</span>
                      <span className="font-mono-code text-[9px] text-white/50 tracking-wider font-bold">
                        SCENIC ELEVATION
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-white/50">landscape</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Management Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#111111] border border-[#C5A059]/30 rounded-3xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-serif-display font-medium text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-[#C5A059]">person</span>
                Driver Profile Registry
              </h3>
              <button
                onClick={() => setShowProfileModal(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="space-y-3 text-sm text-white/80">
              <div className="p-3 bg-[#161616] rounded-xl flex items-center justify-between border border-white/5">
                <span className="text-white/60">Designated Driver</span>
                <span className="text-white font-serif-display font-medium">Alex Mercer</span>
              </div>
              <div className="p-3 bg-[#161616] rounded-xl flex items-center justify-between border border-white/5">
                <span className="text-white/60">Cryptographic Key ID</span>
                <span className="font-mono-code text-[#C5A059] text-xs">UWB-9821-X</span>
              </div>
              <div className="p-3 bg-[#161616] rounded-xl flex items-center justify-between border border-white/5">
                <span className="text-white/60">Autonomy Authorization</span>
                <span className="text-white font-medium">Level 3+ Co-Pilot</span>
              </div>
              <div className="p-3 bg-[#161616] rounded-xl flex items-center justify-between border border-white/5">
                <span className="text-white/60">Biometric Seat Contour</span>
                <span className="text-[#C5A059] font-bold">Calibrated (182cm)</span>
              </div>
            </div>
            <button
              onClick={() => {
                setShowProfileModal(false);
                showToastMsg('Driver biometric profile recalibrated.');
              }}
              className="mt-5 w-full h-11 bg-[#C5A059] hover:bg-[#E5C583] text-[#0A0A0A] font-bold font-mono-code text-xs tracking-wider rounded-full transition-all"
            >
              SAVE SETTINGS
            </button>
          </div>
        </div>
      )}

      {/* Privacy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#111111] border border-[#C5A059]/30 rounded-3xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-serif-display font-medium text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-[#C5A059]">shield_lock</span>
                Privacy &amp; Security Constraints
              </h3>
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <p className="text-xs text-white/60 leading-relaxed mb-4">
              All neural telemetry and spatial vectors are encrypted on-device with AES-256. Remote cloud syncing only transmits zero-knowledge anonymized telemetry.
            </p>
            <div className="space-y-2 text-xs">
              <label className="flex items-center gap-3 p-2.5 bg-[#161616] rounded-xl cursor-pointer border border-white/5">
                <input type="checkbox" defaultChecked className="rounded text-[#C5A059] focus:ring-0" />
                <span className="text-white">Allow On-Device Learned Commute Predictions</span>
              </label>
              <label className="flex items-center gap-3 p-2.5 bg-[#161616] rounded-xl cursor-pointer border border-white/5">
                <input type="checkbox" defaultChecked className="rounded text-[#C5A059] focus:ring-0" />
                <span className="text-white">Anonymized Road Surface &amp; Friction Telemetry</span>
              </label>
              <label className="flex items-center gap-3 p-2.5 bg-[#161616] rounded-xl cursor-pointer border border-white/5">
                <input type="checkbox" className="rounded text-[#C5A059] focus:ring-0" />
                <span className="text-white">Share Cabin Voice Dictations for Model Fine-Tuning</span>
              </label>
            </div>
            <button
              onClick={() => {
                setShowPrivacyModal(false);
                showToastMsg('Privacy rules updated.');
              }}
              className="mt-5 w-full h-11 bg-[#C5A059] hover:bg-[#E5C583] text-[#0A0A0A] font-bold font-mono-code text-xs tracking-wider rounded-full transition-all"
            >
              CONFIRM PREFERENCES
            </button>
          </div>
        </div>
      )}

      {/* Purge Confirm Modal */}
      {showPurgeConfirm && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#111111] border border-[#E58B58]/40 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-lg font-serif-display font-medium text-[#E58B58] mb-2">Purge Learned Vectors?</h3>
            <p className="text-xs text-white/60 mb-5">
              This will clear learned climate preferences, commute vectors, and suspension adjustments from local flash storage.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowPurgeConfirm(false)}
                className="flex-1 h-10 rounded-full bg-white/10 text-white text-xs font-semibold hover:bg-white/15"
              >
                Cancel
              </button>
              <button
                onClick={handlePurge}
                className="flex-1 h-10 rounded-full bg-[#E58B58] text-[#0A0A0A] font-bold text-xs hover:bg-[#f1a478]"
              >
                Purge All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
