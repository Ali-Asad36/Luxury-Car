import React, { useEffect, useState } from "react";
import { playSound } from "../utils/sounds";
import { Globe, Terminal, Activity } from "lucide-react";

export default function Footer({ currentView, setCurrentView, hasSelectedCar }) {
  const [latency, setLatency] = useState(14);
  const [coreTemp, setCoreTemp] = useState(34.2);

  // Dynamic system telemetry simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => Math.max(8, Math.min(28, +(prev + (Math.random() * 4 - 2)).toFixed(0))));
      setCoreTemp(prev => Math.max(32, Math.min(37, +(prev + (Math.random() * 0.6 - 0.3)).toFixed(1))));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const footerLinks = [
    { id: "showcase", label: "VEHICLES" },
    ...(hasSelectedCar ? [{ id: "customizer", label: "CONFIGURE" }] : []),
    { id: "cart", label: "RESERVATIONS" },
  ];

  return (
    <footer className="relative z-10 w-full mt-auto px-4 md:px-6 pt-4 pb-6 select-none border-t border-white/5 bg-black/60 backdrop-blur-md">
      {/* Holographic divider */}
      <div className="holo-border h-[1px] w-full max-w-5xl mx-auto mb-5 rounded-full opacity-30" />

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        {/* Left Column: Brand */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400/80" />
            <span className="font-hud text-white font-bold text-xs tracking-[0.2em]">
              ALI AUTOS CO.
            </span>
          </div>
          <p className="text-[10px] text-white/40 leading-relaxed font-sans max-w-xs">
            Designing electric mobility platforms utilizing lightweight high-performance architectures, neural autopilot cores, and cinematic design aesthetics.
          </p>
          <div className="font-hud text-[8px] text-white/20 tracking-wider mt-1">
            © 2026 ALI AUTOS · ALL SYSTEMS OPERATIONAL
          </div>
        </div>

        {/* Middle Column: Sci-Fi System Status */}
        <div className="flex flex-col gap-2 border-l border-white/5 md:pl-6">
          <div className="flex items-center gap-1.5 mb-0.5 text-cyan-400/60">
            <Activity className="w-3.5 h-3.5" />
            <span className="font-hud text-[9px] tracking-widest font-semibold uppercase">SYSTEMS TELEMETRY</span>
          </div>
          <div className="grid grid-cols-1 gap-1.5 font-hud text-[8px] text-white/35">
            <div className="flex justify-between items-center bg-white/[0.01] px-2 py-1 rounded border border-white/5">
              <span>LATENCY:</span>
              <span className="text-emerald-400 font-medium">{latency}MS (OPTIMAL)</span>
            </div>
            <div className="flex justify-between items-center bg-white/[0.01] px-2 py-1 rounded border border-white/5">
              <span>CORE TEMPERATURE:</span>
              <span className="text-cyan-400 font-medium">{coreTemp}°C (STABLE)</span>
            </div>
            <div className="flex justify-between items-center bg-white/[0.01] px-2 py-1 rounded border border-white/5">
              <span>ENCRYPTION NODE:</span>
              <span className="text-purple-400 font-medium">AES-256 (GCM)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Platform Navigation */}
        <div className="flex flex-col gap-2 border-l border-white/5 md:pl-6">
          <div className="flex items-center gap-1.5 mb-0.5 text-purple-400/70">
            <Terminal className="w-3.5 h-3.5" />
            <span className="font-hud text-[9px] tracking-widest font-semibold uppercase">PLATFORM LINKS</span>
          </div>
          <div className="flex flex-col gap-1 font-hud text-[9px]">
            {footerLinks.map(link => (
              <button
                key={link.id}
                onClick={() => {
                  playSound("nav");
                  setCurrentView(link.id);
                }}
                onMouseEnter={() => playSound("hover")}
                className={`text-left transition-colors cursor-pointer bg-transparent border-none focus:outline-none py-0.5 ${
                  currentView === link.id
                    ? "text-cyan-400 font-bold"
                    : "text-white/40 hover:text-white"
                }`}
              >
                // {link.label}
              </button>
            ))}
            <a
              href="#terms"
              onClick={(e) => {
                e.preventDefault();
                playSound("click");
              }}
              onMouseEnter={() => playSound("hover")}
              className="text-white/20 hover:text-white/40 transition-colors py-0.5 no-underline"
            >
              // PRIVACY & TERMS
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
