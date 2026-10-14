import React, { useState, useEffect } from "react";
import { Cpu, ShieldCheck, Activity, Wifi, Radio } from "lucide-react";

export default function TelemetryBar() {
  const [timeStr, setTimeStr] = useState("");
  const [coords, setCoords] = useState("37.7749° N, 122.4194° W");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-US", { hour12: false }) +
        "." +
        Math.floor(now.getMilliseconds() / 10).toString().padStart(2, "0")
      );
    };
    update();
    const interval = setInterval(update, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative z-20 w-full bg-black/40 border-b border-cyan-500/10 backdrop-blur-md px-4 py-1.5 flex items-center justify-between text-[8px] font-hud tracking-[0.2em] text-cyan-400/60 select-none overflow-hidden shrink-0">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-cyan-400">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-semibold tracking-widest">NEURAL LINK ACTIVE</span>
        </div>
        <span className="hidden sm:inline text-white/20">|</span>
        <div className="hidden sm:flex items-center gap-1 text-white/40">
          <Cpu className="w-3 h-3 text-cyan-400/80" />
          <span>AI CORE: QUANTUM V8</span>
        </div>
        <span className="hidden md:inline text-white/20">|</span>
        <div className="hidden md:flex items-center gap-1 text-emerald-400/80">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>CYBER SHIELD: 100%</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-amber-400/70">
          <Radio className="w-3 h-3 animate-pulse" />
          <span className="hidden lg:inline">{coords}</span>
        </div>
        <span className="text-white/20">|</span>
        <div className="flex items-center gap-1 text-cyan-300 font-bold">
          <Activity className="w-3 h-3 text-cyan-400" />
          <span>{timeStr || "12:00:00.00"}</span>
        </div>
      </div>
    </div>
  );
}
