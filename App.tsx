import React, { useState } from 'react';
import { ScreenView, DeviceLayout, VehicleTelemetry, ChatMessage, ServiceCenter } from './types';
import { TopStatusBar } from './components/TopStatusBar';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './components/views/HomeView';
import { DiagnosticsView } from './components/views/DiagnosticsView';
import { MapView } from './components/views/MapView';
import { CarView } from './components/views/CarView';
import { MemoryView } from './components/views/MemoryView';
import { AiAssistantView } from './components/views/AiAssistantView';
import { ServiceModal } from './components/ServiceModal';
import { ExplainModal } from './components/ExplainModal';

const initialTelemetry: VehicleTelemetry = {
  battery: 87,
  rangeKm: 318,
  engineTemp: 114,
  tempAnomalyPercent: 14,
  coolantStatus: 'NOMINAL',
  engineLoad: 82,
  tripDurationMin: 42,
  cabinTemp: 21,
  isAutoClimate: true,
  isAcActive: true,
  isSyncActive: true,
  isLocked: true,
  trunkOpen: false,
  mirrorsFolded: false,
  sentryMode: false,
  digitalKeyActive: true,
  odometerKm: 14285,
  tyreStatus: 'All Normal (36 PSI)',
  nextServiceKm: 4200,
  suspensionStiffness: 'COMFORT',
  regenBraking: 'AGGRESSIVE',
  steeringWeight: 'ADAPTIVE',
};

const initialChatMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'ai',
    text: "Good afternoon, Alex. Neural vehicle subsystems are synchronized. I'm actively monitoring your route to Hyderabad and thermal telemetry.",
    timestamp: '14:20',
  },
];

export default function App() {
  const [currentView, setCurrentView] = useState<ScreenView>('home');
  const [layout, setLayout] = useState<DeviceLayout>('cockpit');
  const [telemetry, setTelemetry] = useState<VehicleTelemetry>(initialTelemetry);
  const [messages, setMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isExplainModalOpen, setIsExplainModalOpen] = useState(false);

  const handleToggleLayout = () => {
    setLayout((prev) => (prev === 'cockpit' ? 'companion' : 'cockpit'));
  };

  const handleUpdateTelemetry = (updated: Partial<VehicleTelemetry>) => {
    setTelemetry((prev) => ({ ...prev, ...updated }));
  };

  const handleSendAiMessage = async (text: string) => {
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsAiLoading(true);

    try {
      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          vehicleState: {
            battery: telemetry.battery,
            range: telemetry.rangeKm,
            climate: telemetry.cabinTemp,
            status: 'Diagnostics Active, Sensor 04 Warning',
            activeAlert: `Engine thermal warning: ${telemetry.engineTemp}°C (+${telemetry.tempAnomalyPercent}%)`,
          },
        }),
      });

      const data = await res.json();
      const replyText = data.reply || "Subsystems updated and verified.";

      // Determine if a special card should attach
      let cardType: ChatMessage['cardType'] = undefined;
      const lower = text.toLowerCase();
      if (lower.includes('battery') || lower.includes('charge') || lower.includes('range')) {
        cardType = 'battery_stat';
      } else if (lower.includes('engine') || lower.includes('temp') || lower.includes('diagnostic') || lower.includes('warn') || lower.includes('problem')) {
        cardType = 'service_alert';
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        cardType,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      const fallbackMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: "Neural telemetry verified. Powertrain output has been dynamically calibrated to maintain cooling equilibrium.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleAskGemini = async (prompt: string): Promise<string> => {
    try {
      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: prompt,
          vehicleState: {
            battery: telemetry.battery,
            range: telemetry.rangeKm,
            climate: telemetry.cabinTemp,
            status: 'Diagnostic Analysis Mode',
          },
        }),
      });
      const data = await res.json();
      return data.reply || "Analysis complete: Sensor 04 indicates high localized stator coil resistance. Safe to drive at reduced speeds.";
    } catch (err) {
      return "Localized stator thermal rise detected. Coolant circulation is nominal. Recommended action: reduce cruising power below 35 kW and navigate to Apex Diagnostic Hub (3.2 km).";
    }
  };

  const handleSelectServiceRoute = (center: ServiceCenter) => {
    setCurrentView('map');
  };

  return (
    <div className="min-h-screen bg-[#050607] text-[#e3e2e4] font-sans antialiased selection:bg-[#34d7fd] selection:text-[#003641] flex flex-col relative overflow-x-hidden">
      {/* Top Status Bar */}
      <TopStatusBar
        layout={layout}
        onToggleLayout={handleToggleLayout}
        ambientTemp={22}
        onOpenAssistant={() => setCurrentView('ai')}
      />

      {/* Main View Router */}
      <main className="flex-1 flex flex-col w-full">
        {currentView === 'home' && (
          <HomeView
            telemetry={telemetry}
            layout={layout}
            onNavigate={(view) => setCurrentView(view)}
            onSendVoicePrompt={handleSendAiMessage}
            onToggleLock={() =>
              handleUpdateTelemetry({ isLocked: !telemetry.isLocked })
            }
            onToggleClimate={() =>
              handleUpdateTelemetry({ isAutoClimate: !telemetry.isAutoClimate })
            }
            onFlashHorn={() => {}}
          />
        )}

        {currentView === 'diagnostics' && (
          <DiagnosticsView
            telemetry={telemetry}
            onNavigate={(view) => setCurrentView(view)}
            onOpenServiceModal={() => setIsServiceModalOpen(true)}
            onOpenExplainModal={() => setIsExplainModalOpen(true)}
          />
        )}

        {currentView === 'map' && (
          <MapView
            telemetry={telemetry}
            layout={layout}
            onNavigate={(view) => setCurrentView(view)}
          />
        )}

        {currentView === 'car' && (
          <CarView
            telemetry={telemetry}
            onUpdateTelemetry={handleUpdateTelemetry}
          />
        )}

        {currentView === 'memory' && (
          <MemoryView
            telemetry={telemetry}
            onUpdateTelemetry={handleUpdateTelemetry}
            onNavigate={(view) => setCurrentView(view)}
          />
        )}

        {currentView === 'ai' && (
          <AiAssistantView
            telemetry={telemetry}
            messages={messages}
            onSendMessage={handleSendAiMessage}
            isLoading={isAiLoading}
            onNavigate={(view) => setCurrentView(view)}
            onUpdateTelemetry={handleUpdateTelemetry}
          />
        )}
      </main>

      {/* Bottom Navigation Dock */}
      <BottomNav
        currentView={currentView}
        onSelectView={(view) => setCurrentView(view)}
        layout={layout}
      />

      {/* Service Modal */}
      <ServiceModal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        onSelectRoute={handleSelectServiceRoute}
      />

      {/* Explain Problem Modal */}
      <ExplainModal
        isOpen={isExplainModalOpen}
        onClose={() => setIsExplainModalOpen(false)}
        telemetry={telemetry}
        onAskGemini={handleAskGemini}
      />
    </div>
  );
}
