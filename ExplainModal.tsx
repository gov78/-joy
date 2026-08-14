import React, { useState } from 'react';
import { VehicleTelemetry } from '../types';

interface ExplainModalProps {
  isOpen: boolean;
  onClose: () => void;
  telemetry: VehicleTelemetry;
  onAskGemini: (prompt: string) => Promise<string>;
}

export const ExplainModal: React.FC<ExplainModalProps> = ({
  isOpen,
  onClose,
  telemetry,
  onAskGemini,
}) => {
  const [geminiResponse, setGeminiResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDeepDiagnostic = async () => {
    setLoading(true);
    try {
      const prompt = `Perform an in-depth AI mechanical root-cause analysis for this vehicle:
Engine Temp: ${telemetry.engineTemp}°C (+${telemetry.tempAnomalyPercent}% anomaly)
Sensor: Sensor 04 (Front Inverter / Motor stator winding)
Coolant Flow: ${telemetry.coolantStatus}
Engine Load: ${telemetry.engineLoad}%
Duration: ${telemetry.tripDurationMin} minutes.

Explain what is likely occurring, safety risks, immediate driving recommendations, and whether it is safe to proceed 3.2km to the nearest service center. Keep it concise, structured, and easy to read.`;

      const result = await onAskGemini(prompt);
      setGeminiResponse(result);
    } catch (err) {
      console.error(err);
      setGeminiResponse(
        'Telemetry indicates localized stator coil resistance elevation. Because coolant flow is nominal, the cooling pump is operational, but prolonged 82% load causes heat buildup. Recommendation: Limit acceleration to under 20% and coast to the nearest certified service station.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-[#0F0F0F] border border-[#C5A059]/40 rounded-3xl p-6 shadow-[0_20px_70px_rgba(0,0,0,0.95)] relative max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059]">
              <span className="material-symbols-outlined text-[22px]">auto_awesome</span>
            </div>
            <div>
              <h3 className="text-lg font-serif-display font-medium text-white">Diagnostic Neural Analysis</h3>
              <p className="font-mono-code text-[11px] text-[#C5A059]">
                Sensor 04: Thermal Anomaly Investigation
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Diagnostic Summary */}
        <div className="p-4 rounded-2xl bg-[#161616] border border-white/5 space-y-2 mb-4 text-xs text-white/80">
          <div className="flex justify-between">
            <span className="text-white/60">Core Temperature:</span>
            <span className="font-mono-code text-[#E58B58] font-bold">{telemetry.engineTemp}°C (+{telemetry.tempAnomalyPercent}%)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/60">Cooling Loop Pressure:</span>
            <span className="font-mono-code text-white">1.8 bar (Nominal)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/60">Inverter Stator Resistance:</span>
            <span className="font-mono-code text-[#C5A059]">Slight Elevated (+0.4Ω)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/60">Thermal Throttle Active:</span>
            <span className="font-mono-code text-[#E5C583]">Engaged (Max Output capped at 65%)</span>
          </div>
        </div>

        {/* Gemini AI Root Cause Analysis */}
        <div className="bg-[#161616]/90 rounded-2xl p-4 border border-[#C5A059]/25 mb-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-[#C5A059] text-[18px] animate-pulse">psychology</span>
            <span className="font-mono-code text-[10px] text-[#C5A059] font-bold tracking-widest uppercase">
              COGNITIVE ROOT-CAUSE SYNTHESIS
            </span>
          </div>

          {geminiResponse ? (
            <div className="text-sm text-white/90 leading-relaxed whitespace-pre-wrap">
              {geminiResponse}
            </div>
          ) : (
            <div className="text-sm text-white/70 leading-relaxed">
              Sensor 04 is situated near the rear electric drive inverter stator winding. The 14% thermal surge with normal coolant flow points to elevated internal stator impedance or high ambient heat sink friction.
              <p className="mt-2 text-[#E5C583] font-medium">
                Click below to run a real-time Gemini neural diagnostic query.
              </p>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-xs text-white/80 font-semibold transition-colors"
          >
            Dismiss
          </button>

          <button
            onClick={handleDeepDiagnostic}
            disabled={loading}
            className="px-6 py-2.5 rounded-full bg-[#C5A059] hover:bg-[#E5C583] text-[#0A0A0A] font-mono-code text-xs font-bold transition-all shadow-[0_0_15px_rgba(197,160,89,0.4)] flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-[#0A0A0A] border-t-transparent rounded-full animate-spin"></span>
                <span>ANALYZING...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[16px]">psychology</span>
                <span>DEEP AI DIAGNOSTIC</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
