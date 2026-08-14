import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, VehicleTelemetry, ScreenView } from '../../types';

interface AiAssistantViewProps {
  telemetry: VehicleTelemetry;
  messages: ChatMessage[];
  onSendMessage: (text: string) => Promise<void>;
  isLoading: boolean;
  onNavigate: (view: ScreenView) => void;
  onUpdateTelemetry: (updated: Partial<VehicleTelemetry>) => void;
}

export const AiAssistantView: React.FC<AiAssistantViewProps> = ({
  telemetry,
  messages,
  onSendMessage,
  isLoading,
  onNavigate,
  onUpdateTelemetry,
}) => {
  const [inputText, setInputText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeSpeechText, setActiveSpeechText] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    const text = inputText.trim();
    setInputText('');
    await onSendMessage(text);
  };

  const handleQuickPrompt = async (prompt: string) => {
    if (isLoading) return;
    await onSendMessage(prompt);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (isSpeaking && activeSpeechText === text) {
        setIsSpeaking(false);
        setActiveSpeechText(null);
        return;
      }
      const clean = text.replace(/[*_#`]/g, '');
      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      utterance.onend = () => {
        setIsSpeaking(false);
        setActiveSpeechText(null);
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        setActiveSpeechText(null);
      };
      setIsSpeaking(true);
      setActiveSpeechText(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto min-h-screen pt-14 pb-32 px-4 sm:px-6 select-none relative bg-[#0A0A0A]">
      {/* Top Header */}
      <div className="flex items-center justify-between mt-2 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/50 flex items-center justify-center shadow-[0_0_15px_rgba(197,160,89,0.3)]">
            <span className="material-symbols-outlined text-[#C5A059] text-[22px] animate-pulse">
              auto_awesome
            </span>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-serif-display font-medium text-white tracking-tight">
              Neural Assistant
            </h1>
            <p className="font-mono-code text-[10px] text-[#C5A059] uppercase tracking-widest font-semibold">
              GEMINI CO-PILOT
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            if ('speechSynthesis' in window) window.speechSynthesis.cancel();
            setIsSpeaking(false);
          }}
          title="Toggle Audio Feedback"
          className="px-3.5 py-1.5 rounded-full bg-[#111111] border border-white/10 text-xs font-mono-code text-white/70 flex items-center gap-1.5 hover:text-white"
        >
          <span className="material-symbols-outlined text-[16px] text-[#C5A059]">
            {isSpeaking ? 'volume_up' : 'volume_off'}
          </span>
          <span>{isSpeaking ? 'VOCALIZING' : 'AUDIO READY'}</span>
        </button>
      </div>

      {/* Main Chat Container */}
      <div className="flex-1 flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-270px)] pr-1">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === 'user' ? 'items-end' : 'items-start'
            } transition-all`}
          >
            {msg.sender === 'ai' && (
              <div className="flex items-center gap-2 mb-1.5 ml-2 font-mono-code text-[10px] text-[#C5A059] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]"></span>
                NEURAL COGNITION
              </div>
            )}

            <div
              className={`max-w-[88%] sm:max-w-[78%] rounded-3xl p-4 sm:p-5 text-sm leading-relaxed shadow-lg relative ${
                msg.sender === 'user'
                  ? 'bg-[#C5A059]/20 text-white border border-[#C5A059]/40 rounded-br-none backdrop-blur-md'
                  : 'bg-[#111111]/90 text-white/95 border border-white/10 rounded-bl-none backdrop-blur-2xl'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.text}</p>

              {/* Special interactive AI telemetry response cards */}
              {msg.cardType === 'battery_stat' && (
                <div className="mt-4 p-4 rounded-2xl bg-[#0A0A0A] border border-[#C5A059]/30 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#C5A059]/15 flex items-center justify-center text-[#C5A059]">
                      <span className="material-symbols-outlined text-[24px]">battery_charging_80</span>
                    </div>
                    <div>
                      <span className="font-mono-code text-[10px] text-white/50 block">BATTERY HEALTH</span>
                      <span className="font-bold text-white text-base">{telemetry.battery}% ({telemetry.rangeKm} km)</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onNavigate('car');
                    }}
                    className="px-3.5 py-1.5 rounded-full bg-[#C5A059] text-[#0A0A0A] font-mono-code text-[11px] font-bold hover:bg-[#E5C583] transition-colors"
                  >
                    SCHEDULE CHARGE
                  </button>
                </div>
              )}

              {msg.cardType === 'service_alert' && (
                <div className="mt-4 p-4 rounded-2xl bg-[#4A1A14]/40 border border-[#E58B58]/40 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-[#E58B58] font-bold text-xs font-mono-code">
                    <span className="material-symbols-outlined text-[16px]">warning</span>
                    SENSOR 04 ALERT
                  </div>
                  <p className="text-xs text-white/80">
                    Thermal surge +14% detected. Cooling flow nominal.
                  </p>
                  <div className="flex gap-2 mt-1">
                    <button
                      onClick={() => onNavigate('diagnostics')}
                      className="px-3 py-1 rounded-full bg-[#E58B58] text-[#0A0A0A] font-mono-code text-[11px] font-bold"
                    >
                      VIEW DIAGNOSTICS
                    </button>
                  </div>
                </div>
              )}

              {/* TTS Voice Playback Button for AI messages */}
              {msg.sender === 'ai' && (
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5 text-[11px] text-white/50 font-mono-code">
                  <span>{msg.timestamp}</span>
                  <button
                    onClick={() => speakText(msg.text)}
                    className="flex items-center gap-1 hover:text-[#C5A059] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {isSpeaking && activeSpeechText === msg.text ? 'stop_circle' : 'volume_up'}
                    </span>
                    <span>{isSpeaking && activeSpeechText === msg.text ? 'Stop' : 'Listen'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-2">
            <div className="bg-[#111111]/90 border border-[#C5A059]/30 rounded-3xl rounded-bl-none p-4 backdrop-blur-xl flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
              <span className="font-mono-code text-xs text-white/70">Analyzing telemetry &amp; spatial routing...</span>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar pb-2">
        <button
          onClick={() => handleQuickPrompt('Give me a full vehicle diagnostics breakdown.')}
          className="flex-shrink-0 px-3.5 py-1.5 rounded-full bg-[#111111]/85 border border-white/10 hover:border-[#C5A059]/40 text-xs font-mono-code text-[#E5C583] transition-all active:scale-95 flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[14px] text-[#C5A059]">speed</span>
          Full Diagnostics
        </button>

        <button
          onClick={() => handleQuickPrompt('How is my battery range for the trip to Hyderabad?')}
          className="flex-shrink-0 px-3.5 py-1.5 rounded-full bg-[#111111]/85 border border-white/10 hover:border-[#C5A059]/40 text-xs font-mono-code text-[#E5C583] transition-all active:scale-95 flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[14px] text-[#C5A059]">route</span>
          Trip to Hyderabad
        </button>

        <button
          onClick={() => handleQuickPrompt('Set cabin temperature to 21 degrees and enable dual sync.')}
          className="flex-shrink-0 px-3.5 py-1.5 rounded-full bg-[#111111]/85 border border-white/10 hover:border-[#C5A059]/40 text-xs font-mono-code text-[#E5C583] transition-all active:scale-95 flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[14px] text-[#C5A059]">ac_unit</span>
          Set Climate 21°C
        </button>

        <button
          onClick={() => handleQuickPrompt('Optimize my drive dynamics for highway efficiency.')}
          className="flex-shrink-0 px-3.5 py-1.5 rounded-full bg-[#111111]/85 border border-white/10 hover:border-[#C5A059]/40 text-xs font-mono-code text-[#E5C583] transition-all active:scale-95 flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[14px] text-[#C5A059]">auto_fix_high</span>
          Eco Drive Mode
        </button>
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSend} className="relative mt-1 w-full">
        <div className="relative flex items-center bg-[#111111]/95 backdrop-blur-2xl rounded-full border border-[#C5A059]/40 shadow-[0_4px_25px_rgba(0,0,0,0.6)] px-4 py-2 focus-within:border-[#C5A059] focus-within:shadow-[0_0_20px_rgba(197,160,89,0.3)] transition-all">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask neural assistant (e.g. 'check engine', 'reroute', 'cool cabin')..."
            className="flex-1 bg-transparent text-white text-sm placeholder-white/40 focus:outline-none px-2"
          />

          <button
            type="button"
            onClick={() => handleQuickPrompt('What is the root cause of the engine temperature anomaly?')}
            title="Voice / Anomaly Query"
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#C5A059] mr-2 active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-[20px]">mic</span>
          </button>

          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="h-9 px-4 rounded-full bg-[#C5A059] text-[#0A0A0A] font-mono-code text-xs font-bold hover:bg-[#E5C583] disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 active:scale-95 shadow-[0_0_12px_rgba(197,160,89,0.4)]"
          >
            <span>SEND</span>
            <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
          </button>
        </div>
      </form>
    </div>
  );
};
