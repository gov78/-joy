import React from 'react';
import { ScreenView, DeviceLayout } from '../types';

interface BottomNavProps {
  currentView: ScreenView;
  onSelectView: (view: ScreenView) => void;
  layout: DeviceLayout;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentView,
  onSelectView,
  layout,
}) => {
  if (layout === 'companion') {
    // Mobile Companion Bottom Bar style
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-50 pb-safe bg-[#0A0A0A]/95 backdrop-blur-2xl border-t border-white/10 select-none">
        <div className="h-20 w-full max-w-md mx-auto flex items-center justify-around px-3">
          <button
            onClick={() => onSelectView('home')}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ${
              currentView === 'home'
                ? 'text-[#C5A059] drop-shadow-[0_0_10px_rgba(197,160,89,0.6)]'
                : 'text-white/40 hover:text-white/80'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">home</span>
            <span className="font-mono-code text-[9px] tracking-[0.2em] font-semibold">HOME</span>
          </button>

          <button
            onClick={() => onSelectView('map')}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ${
              currentView === 'map'
                ? 'text-[#C5A059] drop-shadow-[0_0_10px_rgba(197,160,89,0.6)]'
                : 'text-white/40 hover:text-white/80'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">explore</span>
            <span className="font-mono-code text-[9px] tracking-[0.2em] font-semibold">MAP</span>
          </button>

          {/* Elevated Floating Center AI Assistant Trigger */}
          <div className="relative -mt-10 flex items-center justify-center">
            <button
              onClick={() => onSelectView('ai')}
              className={`w-16 h-16 rounded-full flex items-center justify-center border-4 border-[#0A0A0A] transition-all duration-300 active:scale-90 ${
                currentView === 'ai'
                  ? 'bg-[#E5C583] text-[#0A0A0A] shadow-[0_0_30px_rgba(197,160,89,0.8)] scale-105 ring-2 ring-[#C5A059]'
                  : 'bg-[#C5A059] text-[#0A0A0A] shadow-[0_0_20px_rgba(197,160,89,0.5)] hover:scale-105'
              }`}
            >
              <span className="material-symbols-outlined text-[30px] animate-pulse">mic</span>
            </button>
          </div>

          <button
            onClick={() => onSelectView('car')}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ${
              currentView === 'car'
                ? 'text-[#C5A059] drop-shadow-[0_0_10px_rgba(197,160,89,0.6)]'
                : 'text-white/40 hover:text-white/80'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">directions_car</span>
            <span className="font-mono-code text-[9px] tracking-[0.2em] font-semibold">CAR</span>
          </button>

          <button
            onClick={() => onSelectView('memory')}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ${
              currentView === 'memory'
                ? 'text-[#C5A059] drop-shadow-[0_0_10px_rgba(197,160,89,0.6)]'
                : 'text-white/40 hover:text-white/80'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">settings_remote</span>
            <span className="font-mono-code text-[9px] tracking-[0.2em] font-semibold">CORE</span>
          </button>
        </div>
      </nav>
    );
  }

  // Cockpit Widescreen Floating Dock
  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-4xl z-50 h-20 md:h-22 bg-[#111111]/80 backdrop-blur-3xl rounded-full border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex items-center justify-between px-4 md:px-8 select-none transition-all duration-300">
      {/* HOME */}
      <button
        onClick={() => onSelectView('home')}
        className={`flex flex-col items-center justify-center min-w-[56px] h-14 px-4 sm:px-6 rounded-full transition-all duration-300 ${
          currentView === 'home'
            ? 'bg-[#C5A059] text-[#0A0A0A] shadow-[0_0_20px_rgba(197,160,89,0.45)] font-bold'
            : 'text-white/60 hover:text-white hover:bg-white/5'
        }`}
      >
        <span className="material-symbols-outlined text-[22px] mb-0.5">home</span>
        <span className="font-mono-code text-[10px] tracking-[0.2em] font-semibold">HOME</span>
      </button>

      {/* DRIVE / DIAGNOSTICS */}
      <button
        onClick={() => onSelectView('diagnostics')}
        className={`flex flex-col items-center justify-center min-w-[56px] h-14 px-4 sm:px-6 rounded-full transition-all duration-300 ${
          currentView === 'diagnostics'
            ? 'bg-[#C5A059] text-[#0A0A0A] shadow-[0_0_20px_rgba(197,160,89,0.45)] font-bold'
            : 'text-white/60 hover:text-white hover:bg-white/5'
        }`}
      >
        <span className="material-symbols-outlined text-[22px] mb-0.5">speed</span>
        <span className="font-mono-code text-[10px] tracking-[0.2em] font-semibold">DRIVE</span>
      </button>

      {/* CENTER AI ORBITAL TRIGGER */}
      <div className="relative -top-5 flex items-center justify-center">
        <button
          onClick={() => onSelectView('ai')}
          className={`w-18 h-18 md:w-20 md:h-20 rounded-full flex flex-col items-center justify-center border-2 transition-all duration-300 active:scale-95 ${
            currentView === 'ai'
              ? 'bg-gradient-to-tr from-[#C5A059] to-[#E5C583] text-[#0A0A0A] border-[#E5C583] shadow-[0_0_35px_rgba(197,160,89,0.7)] scale-105'
              : 'bg-[#C5A059]/90 text-[#0A0A0A] border-[#E5C583]/80 shadow-[0_0_25px_rgba(197,160,89,0.5)] hover:scale-105'
          }`}
        >
          <span className="material-symbols-outlined text-[30px] md:text-[34px] animate-pulse">auto_awesome</span>
          <span className="font-mono-code text-[9px] md:text-[10px] font-bold mt-0.5 tracking-wider">AI</span>
        </button>
      </div>

      {/* MAP */}
      <button
        onClick={() => onSelectView('map')}
        className={`flex flex-col items-center justify-center min-w-[56px] h-14 px-4 sm:px-6 rounded-full transition-all duration-300 ${
          currentView === 'map'
            ? 'bg-[#C5A059] text-[#0A0A0A] shadow-[0_0_20px_rgba(197,160,89,0.45)] font-bold'
            : 'text-white/60 hover:text-white hover:bg-white/5'
        }`}
      >
        <span className="material-symbols-outlined text-[22px] mb-0.5">explore</span>
        <span className="font-mono-code text-[10px] tracking-[0.2em] font-semibold">MAP</span>
      </button>

      {/* CAR / NEURAL */}
      <button
        onClick={() => onSelectView('car')}
        className={`flex flex-col items-center justify-center min-w-[56px] h-14 px-4 sm:px-6 rounded-full transition-all duration-300 ${
          currentView === 'car'
            ? 'bg-[#C5A059] text-[#0A0A0A] shadow-[0_0_20px_rgba(197,160,89,0.45)] font-bold'
            : 'text-white/60 hover:text-white hover:bg-white/5'
        }`}
      >
        <span className="material-symbols-outlined text-[22px] mb-0.5">directions_car</span>
        <span className="font-mono-code text-[10px] tracking-[0.2em] font-semibold">CAR</span>
      </button>
    </nav>
  );
};
