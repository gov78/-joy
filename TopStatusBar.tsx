import React, { useState, useEffect } from 'react';
import { DeviceLayout } from '../types';

interface TopStatusBarProps {
  layout: DeviceLayout;
  onToggleLayout: () => void;
  ambientTemp?: number;
  onOpenAssistant: () => void;
}

export const TopStatusBar: React.FC<TopStatusBarProps> = ({
  layout,
  onToggleLayout,
  ambientTemp = 22,
  onOpenAssistant,
}) => {
  const [timeStr, setTimeStr] = useState('14:20');

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      const h = d.getHours().toString().padStart(2, '0');
      const m = d.getMinutes().toString().padStart(2, '0');
      setTimeStr(`${h}:${m}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-[#0A0A0A]/95 via-[#0A0A0A]/85 to-transparent backdrop-blur-md border-b border-white/10 select-none transition-all duration-300">
      <div className="h-12 w-full max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between font-mono-code text-[12px] tracking-wider text-white/60">
        {/* Left: Time & Temperature */}
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="text-white font-medium">{timeStr}</span>
          <div className="flex items-center gap-1.5 text-white/80">
            <span className="material-symbols-outlined text-[16px] text-[#C5A059]">thermostat</span>
            <span>{ambientTemp}°C</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-white/10 text-[10px] tracking-[0.2em] text-[#C5A059] font-medium uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse"></span>
            <span>NEURAL SYNC ACTIVE</span>
          </div>
        </div>

        {/* Right: Connectivity, Layout Toggle & Profile */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Display Mode Toggle */}
          <button
            onClick={onToggleLayout}
            title={layout === 'cockpit' ? 'Switch to Mobile Companion View' : 'Switch to Cockpit Dashboard View'}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111111] hover:bg-[#1A1A1A] border border-white/10 text-[10px] tracking-widest text-white/90 transition-colors uppercase"
          >
            <span className="material-symbols-outlined text-[15px] text-[#C5A059]">
              {layout === 'cockpit' ? 'tv' : 'smartphone'}
            </span>
            <span className="hidden md:inline font-mono-code">
              {layout === 'cockpit' ? 'Cockpit' : 'Companion'}
            </span>
          </button>

          <span className="material-symbols-outlined text-[17px] text-white/40">5g</span>
          <span className="material-symbols-outlined text-[17px] text-white/40">signal_cellular_4_bar</span>
          <span className="material-symbols-outlined text-[17px] text-white/40">bluetooth_connected</span>

          {/* User Profile Avatar */}
          <button
            onClick={onOpenAssistant}
            className="w-8 h-8 rounded-full bg-[#C5A059] hover:bg-[#E5C583] flex items-center justify-center text-[#0A0A0A] transition-all shadow-[0_0_15px_rgba(197,160,89,0.35)] ml-1 active:scale-95"
            title="Alex (Driver Profile)"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
