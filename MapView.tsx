import React, { useState } from 'react';
import { VehicleTelemetry, DeviceLayout, ScreenView } from '../../types';

interface MapViewProps {
  telemetry: VehicleTelemetry;
  layout: DeviceLayout;
  onNavigate: (view: ScreenView) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  telemetry,
  layout,
  onNavigate,
}) => {
  const [activeRoute, setActiveRoute] = useState<'current' | 'alternate'>('current');
  const [isNavigating, setIsNavigating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const handleTakeRoute = () => {
    setActiveRoute('alternate');
    setNotification('Alternate eco-route applied: -8% energy expenditure with optimal highway cruising.');
    setTimeout(() => setNotification(null), 4000);
  };

  const handleKeepCurrent = () => {
    setActiveRoute('current');
    setNotification('Maintaining current route itinerary via Expressway.');
    setTimeout(() => setNotification(null), 3000);
  };

  const handleStartNav = () => {
    setIsNavigating(prev => !prev);
    setNotification(!isNavigating ? 'Autonomous navigation engaged. Heading to Destination.' : 'Navigation paused.');
    setTimeout(() => setNotification(null), 3500);
  };

  // Companion Mobile Mode
  if (layout === 'companion') {
    return (
      <div className="flex flex-col w-full max-w-md mx-auto min-h-screen pt-14 pb-32 px-4 select-none relative bg-[#0A0A0A]">
        {/* Toast alert */}
        {notification && (
          <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-[#111111]/95 border border-[#C5A059]/40 rounded-full text-xs font-mono-code text-[#E5C583] shadow-[0_0_20px_rgba(197,160,89,0.3)] animate-bounce text-center max-w-[90%]">
            {notification}
          </div>
        )}

        {/* Full Map Container with background */}
        <div className="fixed inset-0 z-0 bg-[#0A0A0A]">
          <div
            className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBtxKSmzhA13k82mt-5xttyDJbRrI_Z5Ia-2nVdQTO1TPWjxDAQhi7mv96dEiix-hBYmTOAPxjW9SCGDBl5ZsQ1vTgnjpjAf-gvdYh_vKHNWlMyvr9MgWeDEAd_RD3Zf-RGhMHL5FXqbP2UjKia-Zlt3hZZspe70xVcx_CkrqsLdwsEtRriTUknuCENNUl5IJGOHpuoy-2xmbtov7o8Rc7KF5Afz2WWLxdGAZN5diHhTIQ7JMH4cTzA')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-[#0A0A0A]/60 pointer-events-none"></div>
        </div>

        {/* Top Search Area */}
        <div className="relative z-10 pt-3 flex flex-col gap-3 w-full">
          {/* Search Bar */}
          <div className="relative w-full h-13 bg-[#111111]/85 backdrop-blur-xl rounded-full border border-[#C5A059]/30 shadow-lg flex items-center px-4 transition-all focus-within:border-[#C5A059] focus-within:shadow-[0_0_20px_rgba(197,160,89,0.25)]">
            <span className="material-symbols-outlined text-white/50 mr-2.5 text-[20px]">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search destination, waypoint, or estate..."
              className="bg-transparent text-white font-medium placeholder-white/40 focus:outline-none w-full text-sm font-light"
            />
            <button
              onClick={() => {
                setSearchQuery('Aurelian Grand Atrium');
              }}
              className="ml-2 w-8 h-8 rounded-full bg-[#161616] flex items-center justify-center border border-white/10 active:scale-95 text-[#C5A059]"
            >
              <span className="material-symbols-outlined text-[18px]">mic</span>
            </button>
          </div>

          {/* Quick Filter Chips */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            <button
              onClick={() => setSelectedFilter(selectedFilter === 'chargers' ? null : 'chargers')}
              className={`flex-shrink-0 h-9 px-3.5 rounded-full backdrop-blur-md border text-xs font-medium flex items-center gap-1.5 transition-all active:scale-95 ${
                selectedFilter === 'chargers'
                  ? 'bg-[#C5A059]/20 border-[#C5A059] text-[#E5C583]'
                  : 'bg-[#111111]/80 border-white/10 text-white/80'
              }`}
            >
              <span className="material-symbols-outlined text-[16px] text-[#C5A059]">ev_station</span>
              Superchargers
            </button>

            <button
              onClick={() => setSelectedFilter(selectedFilter === 'saved' ? null : 'saved')}
              className={`flex-shrink-0 h-9 px-3.5 rounded-full backdrop-blur-md border text-xs font-medium flex items-center gap-1.5 transition-all active:scale-95 ${
                selectedFilter === 'saved'
                  ? 'bg-[#C5A059]/20 border-[#C5A059] text-[#E5C583]'
                  : 'bg-[#111111]/80 border-white/10 text-white/80'
              }`}
            >
              <span className="material-symbols-outlined text-[16px] text-[#C5A059]">favorite</span>
              Saved Havens
            </button>

            <button
              onClick={() => setSelectedFilter(selectedFilter === 'food' ? null : 'food')}
              className={`flex-shrink-0 h-9 px-3.5 rounded-full backdrop-blur-md border text-xs font-medium flex items-center gap-1.5 transition-all active:scale-95 ${
                selectedFilter === 'food'
                  ? 'bg-[#C5A059]/20 border-[#C5A059] text-[#E5C583]'
                  : 'bg-[#111111]/80 border-white/10 text-white/80'
              }`}
            >
              <span className="material-symbols-outlined text-[16px] text-[#E5C583]">restaurant</span>
              Fine Dining
            </button>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1 min-h-[140px]"></div>

        {/* Bottom Cluster: Trip Plan & AI Insight */}
        <div className="relative z-10 w-full flex flex-col gap-3 pb-2">
          {/* AI Insight Chip */}
          <div className="self-end flex items-center gap-2.5 bg-[#111111]/95 backdrop-blur-xl px-4 py-2.5 rounded-full border border-[#C5A059]/30 shadow-[0_4px_25px_rgba(0,0,0,0.8)]">
            <div className="w-5 h-5 rounded-full bg-[#C5A059]/20 flex items-center justify-center relative">
              <span className="material-symbols-outlined text-[13px] text-[#C5A059]">auto_awesome</span>
            </div>
            <p className="text-white/90 text-xs font-light">Traffic clear. Optimized route synchronized to HUD.</p>
          </div>

          {/* Trip Plan Card */}
          <div className="w-full bg-[#111111]/90 backdrop-blur-2xl rounded-3xl border border-white/10 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.8)] relative overflow-hidden">
            {/* Top decorative gradient line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059]/60 to-transparent"></div>

            <div className="flex justify-between items-start mb-5">
              <div className="flex flex-col">
                <span className="font-mono-code text-[#C5A059] text-[9px] uppercase tracking-[0.25em] mb-0.5">
                  DESTINATION WAYPOINT
                </span>
                <h2 className="text-xl font-serif-display font-medium text-white">Hyderabad</h2>
                <p className="text-xs text-white/60 mt-0.5 flex items-center gap-1 font-mono-code">
                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                  {activeRoute === 'alternate' ? '4h 16m' : '4h 12m'}
                  <span className="text-white/20 mx-1">|</span>
                  {activeRoute === 'alternate' ? '290 km' : '284 km'}
                </p>
              </div>

              {/* Arrival Battery Indicator */}
              <div className="flex flex-col items-end">
                <span className="font-mono-code text-white/50 text-[9px] uppercase tracking-[0.2em] mb-0.5">
                  RESERVE AT ARRIVAL
                </span>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-lg font-bold text-[#C5A059]">
                    {activeRoute === 'alternate' ? '26%' : '18%'}
                  </h3>
                  <span className="material-symbols-outlined text-[#C5A059] text-[18px]">
                    battery_2_bar
                  </span>
                </div>
              </div>
            </div>

            {/* Route Timeline */}
            <div className="relative pl-6 mb-5">
              {/* Vertical line */}
              <div className="absolute left-[9px] top-2 bottom-2 w-[2px] bg-white/15 rounded-full"></div>

              {/* Start */}
              <div className="relative flex items-center mb-3">
                <div className="absolute -left-[23px] w-3 h-3 rounded-full bg-white/40 border-2 border-[#111111] z-10"></div>
                <p className="text-xs text-white/60 font-light">Origin: Current Coordinate</p>
              </div>

              {/* Suggested Supercharger stop */}
              <div className="relative flex items-center mb-3 bg-[#161616]/80 rounded-xl p-2.5 -ml-2 border border-[#C5A059]/20">
                <div className="absolute -left-[15px] w-3 h-3 rounded-full bg-[#C5A059] border-2 border-[#111111] z-10 shadow-[0_0_8px_rgba(197,160,89,0.8)]"></div>
                <div className="flex-1 flex justify-between items-center ml-2">
                  <div className="flex flex-col">
                    <span className="font-mono-code text-[9px] text-[#C5A059] font-bold tracking-widest">SUGGESTED FAST CHARGE</span>
                    <p className="text-xs text-white font-medium">Aurelian Supercharger Hub</p>
                  </div>
                  <div className="bg-[#C5A059]/15 text-[#E5C583] px-2 py-0.5 rounded font-mono-code text-[9px] font-bold">
                    +45 MIN (80%)
                  </div>
                </div>
              </div>

              {/* End Point */}
              <div className="relative flex items-center">
                <div className="absolute -left-[23px] w-3 h-3 rounded-full bg-[#C5A059] border-2 border-[#111111] z-10 shadow-[0_0_6px_rgba(197,160,89,0.8)]"></div>
                <p className="text-xs text-white font-serif-display font-medium">Hyderabad Metropolis</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2.5">
              <button
                onClick={handleStartNav}
                className={`flex-1 h-12 rounded-full font-bold text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(197,160,89,0.3)] active:scale-95 transition-all flex items-center justify-center gap-2 ${
                  isNavigating
                    ? 'bg-[#4ADE80] text-[#0A0A0A]'
                    : 'bg-[#C5A059] text-[#0A0A0A] hover:bg-[#E5C583]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isNavigating ? 'pause' : 'navigation'}
                </span>
                {isNavigating ? 'Navigation Active' : 'Engage Nav'}
              </button>

              <button
                onClick={() => onNavigate('diagnostics')}
                title="Vehicle Diagnostics"
                className="w-12 h-12 rounded-full bg-[#161616] border border-white/10 text-white active:scale-95 transition-transform flex items-center justify-center hover:bg-white/10"
              >
                <span className="material-symbols-outlined text-[20px] text-[#C5A059]">speed</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Cockpit Widescreen Mode
  return (
    <div className="flex flex-col w-full min-h-screen pt-14 pb-32 select-none relative overflow-hidden bg-[#0A0A0A]">
      {/* Toast alert */}
      {notification && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 bg-[#111111]/95 border border-[#C5A059]/40 rounded-full text-xs font-mono-code text-[#E5C583] shadow-[0_0_25px_rgba(197,160,89,0.35)] animate-bounce text-center">
          {notification}
        </div>
      )}

      {/* Map Background */}
      <div className="absolute inset-0 w-full h-full object-cover z-0 opacity-70 mix-blend-luminosity bg-cover bg-center"
        style={{
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD2uerWzhAMKZ4TLHN27oo5ZTBJ4l4k_YzPLlpo9Er72HOdzpgR7LRHMEAngGZflkUoJG2URPBVgOfgWsjxkZLbGddmnQWJlotKyzDKjr0WmL74-GvRpKuuT-32OlFSWK_rDrBtOsIfpBrRD_G3IFOtiE61-1WsGx4Mw7M1VXijHIN_j6aGhyJUSUQQ9LJHrlqT9VfgDgiMjWaMrNv1PX9maQuhf2IldWR_2ubk7RQjFR_eI_mbCI3b')`,
        }}
      />

      {/* Luminous Edge Vignette */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        style={{
          background: 'radial-gradient(circle at center, transparent 25%, rgba(10,10,10,0.8) 75%, #0A0A0A 100%)',
        }}
      />

      {/* Top Status Bar & Orbital */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pt-4 flex justify-between items-start pointer-events-none">
        {/* AI Orbital mini visualizer */}
        <div className="relative w-20 h-20 flex items-center justify-center pointer-events-auto">
          <div className="absolute inset-0 rounded-full border border-[#C5A059] opacity-25 animate-[spin_4s_linear_infinite]"></div>
          <div className="absolute inset-2 rounded-full border border-[#E5C583] opacity-40 animate-[spin_3s_linear_reverse_infinite]"></div>
          <div className="w-10 h-10 bg-[#C5A059]/20 rounded-full backdrop-blur-md flex items-center justify-center shadow-[0_0_20px_rgba(197,160,89,0.35)]">
            <span className="material-symbols-outlined text-[#C5A059] text-[20px]">graphic_eq</span>
          </div>
        </div>

        {/* Live Metrics Box HUD */}
        <div className="bg-[#111111]/85 backdrop-blur-2xl rounded-full px-7 py-3 border border-[#C5A059]/30 flex gap-6 sm:gap-8 items-center shadow-2xl pointer-events-auto">
          <div className="flex flex-col">
            <span className="font-mono-code text-[10px] text-white/50 tracking-widest uppercase">Battery</span>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#C5A059] text-[18px]">battery_charging_full</span>
              <span className="font-bold text-white text-base sm:text-lg font-mono-code">{telemetry.battery}%</span>
            </div>
          </div>

          <div className="w-px h-7 bg-white/10"></div>

          <div className="flex flex-col">
            <span className="font-mono-code text-[10px] text-white/50 tracking-widest uppercase">Range</span>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#C5A059] text-[18px]">electric_car</span>
              <span className="font-bold text-white text-base sm:text-lg font-mono-code">{telemetry.rangeKm} km</span>
            </div>
          </div>

          <div className="w-px h-7 bg-white/10"></div>

          <div className="flex flex-col">
            <span className="font-mono-code text-[10px] text-white/50 tracking-widest uppercase">Autonomy</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#4ADE80] shadow-[0_0_8px_rgba(74,222,128,0.8)]"></div>
              <span className="font-medium text-white text-base sm:text-lg font-serif-display">Nominal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Bottom Grid HUD Layout */}
      <div className="relative z-20 flex-1 flex flex-col justify-end max-w-7xl mx-auto w-full px-6 mt-auto pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          {/* Left Side: Route Status (5 Cols) */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
            <div className="bg-[#111111]/85 backdrop-blur-2xl rounded-3xl p-6 sm:p-7 border border-white/10 shadow-2xl relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div>
                  <span className="font-mono-code text-[10px] text-[#C5A059] tracking-[0.25em] block mb-1 uppercase">
                    ACTIVE DESTINATION
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-serif-display font-medium text-white leading-none">
                    Hyderabad
                  </h2>
                </div>
                <div className="text-right">
                  <span className="font-mono-code text-[10px] text-white/50 tracking-widest block mb-1 uppercase">
                    ETA
                  </span>
                  <div className="text-2xl font-bold text-[#E5C583] font-mono-code">
                    {activeRoute === 'alternate' ? '2h 22m' : '2h 18m'}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative w-full h-2 bg-[#1A1A1A] rounded-full mt-6 overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-[#C5A059] w-[65%] rounded-full shadow-[0_0_12px_rgba(197,160,89,0.6)]"></div>
              </div>

              <div className="flex justify-between mt-2.5 font-mono-code text-[10px] text-white/50 tracking-widest font-semibold">
                <span>145 KM TRAVERSED</span>
                <span>80 KM TO DESTINATION</span>
              </div>
            </div>
          </div>

          {/* Right Side: AI Intervention Card (6 Cols) */}
          <div className="col-span-12 lg:col-span-6 lg:col-start-7 flex flex-col justify-end">
            <div className="bg-[#111111]/90 backdrop-blur-3xl rounded-3xl p-6 sm:p-8 border border-[#C5A059]/35 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
              {/* Glow effect */}
              <div className="absolute -top-10 -right-10 w-44 h-44 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex items-start gap-4 mb-5 relative z-10">
                <div className="min-w-[44px] h-11 bg-[#C5A059] rounded-full flex items-center justify-center text-[#0A0A0A] shadow-[0_0_15px_rgba(197,160,89,0.4)]">
                  <span className="material-symbols-outlined text-[24px]">traffic</span>
                </div>
                <div>
                  <span className="font-mono-code text-[10px] text-[#C5A059] tracking-[0.25em] uppercase flex items-center gap-2 mb-1 font-bold">
                    <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full animate-pulse"></span>
                    NEURAL ROUTE ADVISOR
                  </span>
                  <h3 className="font-serif-display text-lg sm:text-xl font-medium text-white leading-snug">
                    Dense congestion detected ahead. Alternate luxury cruise path calculated.
                  </h3>
                </div>
              </div>

              <div className="flex gap-6 mb-6 sm:ml-15 relative z-10 font-mono-code text-sm">
                <div className="flex items-center gap-1.5 text-white/60">
                  <span className="material-symbols-outlined text-[18px]">schedule</span>
                  <span>+4 min travel time</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#C5A059] font-bold">
                  <span className="material-symbols-outlined text-[18px]">bolt</span>
                  <span>-8% energy expenditure</span>
                </div>
              </div>

              <div className="flex flex-wrap sm:flex-nowrap gap-3 sm:ml-15 relative z-10">
                <button
                  onClick={handleTakeRoute}
                  className={`flex-1 h-13 rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 ${
                    activeRoute === 'alternate'
                      ? 'bg-[#4ADE80] text-[#0A0A0A] shadow-[0_0_20px_rgba(74,222,128,0.5)]'
                      : 'bg-[#C5A059] text-[#0A0A0A] hover:bg-[#E5C583] shadow-[0_0_20px_rgba(197,160,89,0.35)]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">route</span>
                  {activeRoute === 'alternate' ? 'Route Engaged' : 'Adopt Route'}
                </button>

                <button
                  onClick={handleKeepCurrent}
                  className="flex-1 h-13 bg-[#161616] text-white/90 font-medium text-xs uppercase tracking-widest rounded-full border border-white/15 flex items-center justify-center gap-2 hover:bg-[#202020] transition-all active:scale-95"
                >
                  Retain Existing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
