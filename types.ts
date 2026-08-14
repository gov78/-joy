export type ScreenView = 'home' | 'diagnostics' | 'ai' | 'map' | 'car' | 'memory';

export type DeviceLayout = 'cockpit' | 'companion';

export interface VehicleTelemetry {
  battery: number; // percentage (e.g. 87)
  rangeKm: number; // km (e.g. 318)
  engineTemp: number; // celsius (e.g. 114)
  tempAnomalyPercent: number; // e.g. +14%
  coolantStatus: 'NOMINAL' | 'ELEVATED' | 'CRITICAL';
  engineLoad: number; // percentage (e.g. 82)
  tripDurationMin: number; // minutes (e.g. 42)
  cabinTemp: number; // celsius (e.g. 21)
  isAutoClimate: boolean;
  isAcActive: boolean;
  isSyncActive: boolean;
  isLocked: boolean;
  trunkOpen: boolean;
  mirrorsFolded: boolean;
  sentryMode: boolean;
  digitalKeyActive: boolean;
  odometerKm: number;
  tyreStatus: string;
  nextServiceKm: number;
  suspensionStiffness: 'COMFORT' | 'BALANCED' | 'SPORT';
  regenBraking: 'LOW' | 'STANDARD' | 'AGGRESSIVE';
  steeringWeight: 'COMFORT' | 'ADAPTIVE' | 'SPORT';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  cardType?: 'battery_stat' | 'route_recommend' | 'climate_confirm' | 'service_alert';
  actionLabel?: string;
  actionPayload?: string;
}

export interface TripItem {
  id: string;
  title: string;
  subtitle: string;
  distance: string;
  energyUsed: string;
  imageUrl: string;
  location: string;
}

export interface ServiceCenter {
  id: string;
  name: string;
  distance: string;
  eta: string;
  rating: number;
  address: string;
  isOpen: boolean;
}
