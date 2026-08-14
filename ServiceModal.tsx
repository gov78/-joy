import React from 'react';
import { ServiceCenter } from '../types';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRoute: (center: ServiceCenter) => void;
}

const verifiedCenters: ServiceCenter[] = [
  {
    id: '1',
    name: 'Apex Supercharging & EV Diagnostic Hub',
    distance: '3.2 km',
    eta: '6 mins',
    rating: 4.9,
    address: 'Sector 4, Outer Ring Road, Tech Corridor',
    isOpen: true,
  },
  {
    id: '2',
    name: 'Cybernetic Powertrain Authorized Center',
    distance: '7.8 km',
    eta: '14 mins',
    rating: 4.8,
    address: 'High-Tech City Phase II, Avenue 12',
    isOpen: true,
  },
  {
    id: '3',
    name: 'VoltCare Rapid Cooling & Thermal Specialist',
    distance: '12.4 km',
    eta: '22 mins',
    rating: 4.7,
    address: 'Aerospace Park Highway Exit 9',
    isOpen: true,
  },
];

export const ServiceModal: React.FC<ServiceModalProps> = ({
  isOpen,
  onClose,
  onSelectRoute,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#0F0F0F] border border-[#C5A059]/40 rounded-3xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.95)] relative">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059]">
              <span className="material-symbols-outlined text-[22px]">build</span>
            </div>
            <div>
              <h3 className="text-lg font-serif-display font-medium text-white">Verified Service Ateliers</h3>
              <p className="font-mono-code text-[11px] text-[#C5A059]">
                3 Certified Fast-Turnaround Hubs Available
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

        {/* List of service centers */}
        <div className="space-y-3 my-4">
          {verifiedCenters.map((center) => (
            <div
              key={center.id}
              className="p-4 rounded-2xl bg-[#161616] border border-white/5 hover:border-[#C5A059]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-serif-display font-medium text-white group-hover:text-[#E5C583] transition-colors truncate">
                    {center.name}
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-[#4ADE80]/15 text-[#4ADE80] font-mono-code text-[10px] font-bold shrink-0">
                    OPERATIONAL
                  </span>
                </div>
                <p className="text-xs text-white/50 truncate mb-1">{center.address}</p>
                <div className="flex items-center gap-3 text-xs font-mono-code text-white/70">
                  <span className="text-[#C5A059] font-semibold">{center.distance}</span>
                  <span>•</span>
                  <span>ETA {center.eta}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-[#E5C583]">
                    <span className="material-symbols-outlined text-[14px]">star</span>
                    {center.rating}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  onSelectRoute(center);
                  onClose();
                }}
                className="h-10 px-4 rounded-full bg-[#C5A059] hover:bg-[#E5C583] text-[#0A0A0A] font-mono-code text-xs font-bold transition-all shadow-[0_0_12px_rgba(197,160,89,0.3)] active:scale-95 flex items-center justify-center gap-1.5 shrink-0"
              >
                <span className="material-symbols-outlined text-[16px]">navigation</span>
                ROUTE NOW
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/15 text-xs text-white/80 font-semibold transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
