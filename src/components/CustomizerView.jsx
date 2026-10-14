import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, Sparkles, Sliders, Activity, Cpu, Wind } from "lucide-react";
import { playSound } from "../utils/sounds";

export default function CustomizerView({ car, onAddToCart, onNavigate }) {
  const [selectedColor, setSelectedColor] = useState(car.colors[0]);
  const [activeTab, setActiveTab] = useState("exterior");
  const [isAdded, setIsAdded] = useState(false);

  const totalPrice = car.basePrice + selectedColor.price;

  const handleAddToCart = () => {
    onAddToCart({ ...car, selectedColor, configuredPrice: totalPrice });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2500);
  };

  const tintStyle = {
    backgroundColor: selectedColor.hex,
    maskImage: `url(${car.image})`,
    WebkitMaskImage: `url(${car.image})`,
    maskSize: "contain", WebkitMaskSize: "contain",
    maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat",
    maskPosition: "center", WebkitMaskPosition: "center",
    mixBlendMode: selectedColor.hex === "#111827" ? "color-burn" : "color",
    opacity: selectedColor.hex === "#d1d5db" ? 0 : selectedColor.hex === "#111827" ? 0.9 : 0.72,
    pointerEvents: "none",
    transform: car.baseImageStyle?.transform || "none",
  };

  const baseStyle = {
    filter: [car.baseImageStyle?.filter, selectedColor.hex === "#111827" ? "brightness(0.35) contrast(1.15)" : ""].filter(Boolean).join(" ") || "none",
    transform: car.baseImageStyle?.transform || "none",
    transition: "filter 0.4s ease",
  };

  const skeletonStyle = {
    filter: "invert(1) sepia(1) saturate(6) hue-rotate(120deg) brightness(1.3) contrast(1.4)",
    transform: `${car.baseImageStyle?.transform || ""} scaleX(-1)`.trim(),
  };

  return (
    <section className="relative flex-1 flex flex-col px-4 md:px-6 pb-8 pt-2 w-full">
      <style>{`
        @keyframes scanline-anim { 0% { top: -10%; } 100% { top: 110%; } }
        @keyframes hud-slide-in { from { opacity:0; transform:translateX(-10px); } to { opacity:1; transform:translateX(0); } }
      `}</style>

      {/* Ambient grid */}
      <div className="pointer-events-none fixed inset-0 z-0 hud-grid-bg opacity-20" />

      {/* Header */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex items-center justify-between mb-4 shrink-0">
        <button onClick={() => onNavigate("showcase")}
          className="flex items-center gap-2 text-white/40 hover:text-cyan-400 transition-colors bg-transparent border-none cursor-pointer font-hud text-[10px] tracking-widest focus:outline-none"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> ← BACK
        </button>
        <div className="text-right">
          <div className="font-hud text-[8px] tracking-[0.3em] text-cyan-400/60 uppercase">VEHICLE CONFIGURATOR</div>
          <h2 className="font-hud text-base font-bold text-white tracking-wider">{car.name.toUpperCase()}</h2>
        </div>
      </div>

      {/* Main layout */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex-1 flex flex-col lg:flex-row gap-5">

        {/* LEFT: Visualizer + stats */}
        <div className="w-full lg:w-[62%] flex flex-col gap-4">

          {/* Visualizer panel */}
          <div className="relative rounded overflow-hidden border border-white/8"
            style={{ background: "linear-gradient(160deg, #020409, #030814)" }}>
            <div className="hud-grid-bg opacity-30" />

            {/* Top HUD bar */}
            <div className="relative z-10 flex items-center justify-between px-4 py-2 border-b border-white/5">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" style={{ animation: "pulse-dot 2s ease-in-out infinite" }} />
                <span className="font-hud text-[8px] text-cyan-400/60 tracking-wider">
                  {activeTab === "exterior" ? "EXT · " + selectedColor.name.toUpperCase() : activeTab === "interior" ? "INT · CABIN VIEW" : "SYS · WIRE SENSOR ACTIVE"}
                </span>
              </div>
              {/* Tab switcher */}
              <div className="flex items-center gap-1">
                {["exterior","interior","skeleton"].map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className="px-2.5 py-1 font-hud text-[7px] tracking-widest transition-all cursor-pointer border-none rounded-sm"
                    style={{
                      background: activeTab === tab ? "rgba(0,240,255,0.12)" : "transparent",
                      color: activeTab === tab ? "#00f0ff" : "rgba(255,255,255,0.3)",
                      border: activeTab === tab ? "1px solid rgba(0,240,255,0.3)" : "1px solid transparent",
                    }}
                  >
                    {tab === "exterior" ? "EXT" : tab === "interior" ? "INT" : "WIRE"}
                  </button>
                ))}
              </div>
            </div>

            {/* Image area */}
            <div className="relative h-[240px] md:h-[300px] flex items-center justify-center overflow-hidden">
              {/* Glow halo under car */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-10 blur-2xl rounded-full opacity-50"
                style={{ background: selectedColor.hex !== "#d1d5db" ? selectedColor.hex : car.glowColor }} />

              <AnimatePresence mode="wait">
                {activeTab === "exterior" && (
                  <motion.div key="ext"
                    initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:20 }}
                    transition={{ duration: 0.35 }}
                    className="relative w-4/5 h-4/5 flex items-center justify-center"
                  >
                    <img src={car.image} alt={car.name} style={baseStyle}
                      className="absolute max-w-full max-h-full object-contain" />
                    <div className="absolute inset-0" style={tintStyle} />
                  </motion.div>
                )}
                {activeTab === "interior" && (
                  <motion.div key="int"
                    initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:20 }}
                    transition={{ duration: 0.35 }}
                    className="w-full h-full p-3"
                  >
                    <img src={car.imageInterior} alt="Interior"
                      className="w-full h-full object-cover rounded opacity-80 contrast-105" />
                  </motion.div>
                )}
                {activeTab === "skeleton" && (
                  <motion.div key="skel"
                    initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:20 }}
                    transition={{ duration: 0.35 }}
                    className="relative w-4/5 h-4/5 flex items-center justify-center"
                  >
                    {/* Scanline */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
                      <div style={{
                        position:"absolute", left:0, right:0, height:"3px",
                        background:"linear-gradient(90deg, transparent, rgba(0,240,255,0.8), transparent)",
                        boxShadow:"0 0 12px rgba(0,240,255,0.9)",
                        animation:"scanline-anim 2.5s linear infinite",
                      }} />
                    </div>
                    <img src={car.image} alt="Wireframe" style={skeletonStyle}
                      className="absolute max-w-full max-h-full object-contain" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom HUD bar */}
            <div className="relative z-10 flex items-center justify-between px-4 py-2 border-t border-white/5">
              <span className="font-hud text-[7px] text-white/20 tracking-widest">RENDER ENGINE v4.2</span>
              <span className="font-hud text-[7px] text-white/20 tracking-widest">{car.id.toUpperCase()}</span>
            </div>
          </div>

          {/* Diagnostics panel */}
          <div className="rounded border border-white/8 p-4"
            style={{ background: "linear-gradient(160deg, #020409, #030814)" }}>
            <div className="hud-grid-bg opacity-20 rounded" />
            <div className="relative z-10 flex flex-col gap-3">
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-3.5 h-3.5 text-cyan-400/60" />
                <span className="font-hud text-[8px] text-white/30 tracking-[0.3em] uppercase">Performance Diagnostics</span>
              </div>
              {[
                { icon: <Cpu className="w-3 h-3" />, label: "BATTERY · RANGE DENSITY", val: car.specs.batteryScore, from: "#10b981", to: "#06b6d4" },
                { icon: <Wind className="w-3 h-3" />, label: "AERO · DRAG COEFFICIENT", val: car.specs.aeroScore, from: "#6366f1", to: "#8b5cf6" },
                { icon: <Sparkles className="w-3 h-3" />, label: "AI COPILOT · NEURAL POWER", val: car.specs.aiScore, from: "#a855f7", to: "#ec4899" },
              ].map(({ icon, label, val, from, to }) => (
                <div key={label} className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5 text-white/30">
                      {icon}
                      <span className="font-hud text-[7px] tracking-wider">{label}</span>
                    </div>
                    <span className="font-hud text-[9px] font-bold" style={{ color: from }}>{val}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${val}%` }}
                      transition={{ duration: 1.4, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${from}, ${to})`, boxShadow: `0 0 8px ${from}80` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Config panel */}
        <div className="w-full lg:w-[38%] flex flex-col gap-4">

          {/* Price summary */}
          <div className="rounded border border-white/8 p-4"
            style={{ background: "linear-gradient(160deg, #020409, #030814)" }}>
            <div className="font-hud text-[8px] text-white/25 tracking-[0.3em] mb-3">CONFIG SUMMARY</div>
            <div className="flex flex-col gap-2">
              {[
                ["BASE MSRP", `$${car.basePrice.toLocaleString()}`],
                ["PAINT OPTION", selectedColor.price === 0 ? "INCLUDED" : `+$${selectedColor.price.toLocaleString()}`],
              ].map(([k,v]) => (
                <div key={k} className="flex justify-between items-center text-xs">
                  <span className="font-hud text-[8px] text-white/30 tracking-wider">{k}</span>
                  <span className="font-hud text-[10px] font-semibold text-white/70">{v}</span>
                </div>
              ))}
              <div className="h-px my-1" style={{ background: `linear-gradient(90deg, transparent, ${car.glowColor.replace("0.5","0.4")}, transparent)` }} />
              <div className="flex justify-between items-baseline">
                <span className="font-hud text-[8px] text-white/30 tracking-wider">TOTAL</span>
                <span className="font-hud text-lg font-bold text-white">${totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Color selection */}
          <div className="rounded border border-white/8 p-4"
            style={{ background: "linear-gradient(160deg, #020409, #030814)" }}>
            <div className="font-hud text-[8px] text-white/25 tracking-[0.3em] mb-3">SELECT EXTERIOR PAINT</div>
            <div className="flex gap-3 items-center mb-3">
              {car.colors.map(color => {
                const isActive = selectedColor.name === color.name;
                return (
                  <button key={color.name}
                    onClick={() => { setSelectedColor(color); setActiveTab("exterior"); }}
                    style={{ backgroundColor: color.hex }}
                    className={`w-9 h-9 rounded cursor-pointer relative transition-all duration-300 focus:outline-none border-none ${
                      isActive ? "scale-110" : "opacity-60 hover:opacity-90 hover:scale-105"
                    }`}
                    title={color.name}
                  >
                    {isActive && (
                      <div className="absolute inset-0 rounded border-2 border-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                    )}
                    {isActive && <Check className={`w-3.5 h-3.5 absolute inset-0 m-auto ${color.hex === "#d1d5db" || color.hex === "#f1f5f9" || color.hex === "#f3f4f6" ? "text-black" : "text-white"}`} />}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-sm" style={{ background: selectedColor.hex, border: "1px solid rgba(255,255,255,0.2)" }} />
              <span className="font-hud text-[9px] text-white/40 tracking-widest">{selectedColor.name.toUpperCase()}</span>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col gap-3 mt-auto">
            <AnimatePresence mode="wait">
              {!isAdded ? (
                <motion.button key="add"
                  initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.95 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddToCart}
                  className="w-full py-3.5 px-6 rounded font-hud text-[10px] font-bold tracking-[0.2em] cursor-pointer border-none flex items-center justify-center gap-2 transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${car.glowColor.replace("0.5","0.2")}, rgba(168,85,247,0.2))`,
                    border: `1px solid ${car.glowColor.replace("0.5","0.4")}`,
                    color: car.glowColor.replace("0.5","1"),
                    boxShadow: `0 0 20px ${car.glowColor.replace("0.5","0.15")}`,
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  ADD TO RESERVATION
                </motion.button>
              ) : (
                <motion.div key="added"
                  initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.95 }}
                  className="w-full py-3.5 rounded font-hud text-[10px] font-bold tracking-[0.2em] flex items-center justify-center gap-2"
                  style={{ background:"rgba(16,185,129,0.15)", border:"1px solid rgba(16,185,129,0.5)", color:"#34d399" }}
                >
                  <Check className="w-4 h-4" /> ADDED TO QUEUE
                </motion.div>
              )}
            </AnimatePresence>
            <button onClick={() => onNavigate("cart")}
              className="w-full py-3 rounded font-hud text-[9px] tracking-[0.2em] font-semibold cursor-pointer border-none transition-all duration-300"
              style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", color:"rgba(255,255,255,0.4)" }}
            >
              PROCEED TO CHECKOUT →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
