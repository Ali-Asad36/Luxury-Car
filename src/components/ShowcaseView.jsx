import React from "react";
import { motion } from "framer-motion";
import { CARS_DATA } from "../data/cars";
import { Compass, Zap, Gauge } from "lucide-react";
import { playSound } from "../utils/sounds";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function ShowcaseView({ onSelectCar, onNavigate }) {
  return (
    <section className="relative w-full flex flex-col items-center px-4 md:px-6 pb-10 pt-2">

      {/* Ambient particle grid background */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="hud-grid-bg opacity-30" />
        {/* Horizontal scan lines */}
        <div className="absolute inset-0"
          style={{
            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.012) 2px, rgba(0,240,255,0.012) 4px)"
          }}
        />
      </div>

      {/* Hero Header */}
      <div className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center gap-3 mt-2 mb-6 shrink-0">

        {/* System status bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 px-4 py-1.5 rounded border border-cyan-400/20 bg-cyan-400/5 mb-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" style={{ animation: "pulse-dot 2s ease-in-out infinite" }} />
          <span className="font-hud text-[9px] text-cyan-400/70 tracking-[0.25em]">SYSTEM ONLINE · ALI AUTOS EV PLATFORM v4.2</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" style={{ animation: "pulse-dot 2s ease-in-out infinite 1s" }} />
        </motion.div>

        <motion.h1
          style={{ fontFamily: "'Syncopate', sans-serif" }}
          className="text-2xl md:text-[38px] font-bold leading-[1.3] max-w-5xl tracking-[0.16em] uppercase glitch-text flex flex-wrap justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <span className="flex flex-wrap justify-center w-full mb-1 bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-transparent gap-x-[0.3em]">
            {"The future of electric".split(" ").map((word, i) => (
              <motion.span key={i} variants={wordVariants} className="inline-block">
                {word}
              </motion.span>
            ))}
          </span>
          <span className="flex flex-wrap justify-center w-full bg-gradient-to-r from-cyan-300 via-white to-purple-300 bg-clip-text text-transparent gap-x-[0.3em]">
            {"mobility is here".split(" ").map((word, i) => (
              <motion.span key={i} variants={wordVariants} className="inline-block">
                {word}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-hud text-[9px] tracking-[0.3em] text-white/30 uppercase"
        >
          SELECT A VEHICLE BELOW TO CONFIGURE
        </motion.p>
      </div>

      {/* Cars Grid */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-2">
        {CARS_DATA.map((car, idx) => {
          const hasFlip = car.baseImageStyle?.transform?.includes("scaleX(-1)");

          return (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.07 }}
              onMouseEnter={() => playSound("hover")}
              onClick={() => { playSound("select"); onSelectCar(car); onNavigate("customizer"); }}
              className="hud-card"
              style={{ "--card-glow": car.glowColor }}
            >
              {/* Rotating light beam border */}
              <div className="beam-ring" />

              {/* Corner brackets */}
              <div className="corner-tl" />
              <div className="corner-tr" />
              <div className="corner-bl" />
              <div className="corner-br" />

              {/* Hover scanline */}
              <div className="scan-line" />

              {/* Card content */}
              <div className="relative z-10 m-[1.5px] rounded-[calc(0.75rem-1.5px)] overflow-hidden"
                style={{ background: "linear-gradient(160deg, #020409 0%, #030611 50%, #020409 100%)" }}>

                {/* Scrolling grid bg */}
                <div className="hud-grid-bg opacity-40" />

                {/* Radial glow */}
                <div className="absolute inset-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-50"
                  style={{ background: `radial-gradient(ellipse at 50% 70%, ${car.glowColor.replace("0.5", "0.12")}, transparent 65%)` }} />

                <div className="relative z-10 p-4 flex flex-col gap-3">

                  {/* Header row */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: car.glowColor, animation: "pulse-dot 2.5s ease-in-out infinite" }} />
                        <span className="font-hud text-[7px] tracking-[0.3em] text-white/30 uppercase">
                          {car.tagline}
                        </span>
                      </div>
                      <h3 className="font-hud text-sm font-bold text-white tracking-wider">
                        {car.name}
                      </h3>
                    </div>
                    <span
                      className="font-hud text-[8px] font-semibold px-2 py-1 rounded border shrink-0"
                      style={{
                        borderColor: car.glowColor.replace("0.5", "0.3"),
                        color: car.glowColor.replace("0.5", "1"),
                        background: car.glowColor.replace("0.5", "0.08"),
                      }}
                    >
                      {car.badge}
                    </span>
                  </div>

                  {/* Car image with glow halo */}
                  <div className="relative w-full h-[160px] flex items-center justify-center">
                    {/* Glow under image */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-8 blur-xl rounded-full opacity-45"
                      style={{ background: car.glowColor }} />
                    <img
                      src={car.image}
                      alt={car.name}
                      className="relative max-w-full max-h-full object-contain transition-all duration-500 hover:scale-105"
                      style={{
                        filter: car.baseImageStyle?.filter
                          ? `${car.baseImageStyle.filter} drop-shadow(0 4px 16px ${car.glowColor.replace("0.5","0.6")})`
                          : `drop-shadow(0 4px 16px ${car.glowColor.replace("0.5","0.4")})`,
                        transform: hasFlip ? "scaleX(-1)" : "none",
                      }}
                    />
                  </div>

                  {/* Divider */}
                  <div className="h-px" style={{ background: `linear-gradient(90deg, transparent, ${car.glowColor.replace("0.5","0.4")}, transparent)` }} />

                  {/* Specs — HUD style */}
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { icon: <Zap className="w-2.5 h-2.5" />, label: "0-60", val: car.specs.acceleration },
                      { icon: <Compass className="w-2.5 h-2.5" />, label: "RANGE", val: car.specs.range },
                      { icon: <Gauge className="w-2.5 h-2.5" />, label: "V-MAX", val: car.specs.topSpeed },
                    ].map(({ icon, label, val }) => (
                      <div key={label} className="flex flex-col items-center py-1.5 px-1 rounded"
                        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                        <span className="text-white/25 mb-0.5">{icon}</span>
                        <span className="font-hud text-[7px] text-white/25 tracking-wider">{label}</span>
                        <span className="font-hud text-[10px] font-bold text-white mt-0.5" style={{ animation: "data-tick 3s ease-in-out infinite" }}>
                          {val}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <div className="font-hud text-[7px] text-white/25 tracking-widest">MSRP FROM</div>
                      <div className="font-hud text-sm font-bold text-white">${car.basePrice.toLocaleString()}</div>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      className="px-4 py-2 rounded font-hud text-[9px] font-bold tracking-[0.15em] cursor-pointer border-none transition-all duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${car.glowColor.replace("0.5","0.15")}, transparent)`,
                        border: `1px solid ${car.glowColor.replace("0.5","0.4")}`,
                        color: car.glowColor.replace("0.5","1"),
                        boxShadow: `0 0 12px ${car.glowColor.replace("0.5","0.2")}`,
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = car.glowColor.replace("0.5","0.25");
                        e.currentTarget.style.boxShadow = `0 0 24px ${car.glowColor.replace("0.5","0.5")}`;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = `linear-gradient(135deg, ${car.glowColor.replace("0.5","0.15")}, transparent)`;
                        e.currentTarget.style.boxShadow = `0 0 12px ${car.glowColor.replace("0.5","0.2")}`;
                      }}
                    >
                      CONFIG →
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer status bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="relative z-10 flex items-center gap-6 mt-4 font-hud text-[8px] text-white/20 tracking-[0.25em]"
      >
        <span>SYS:ACTIVE</span>
        <span className="holo-border h-px w-16 rounded" />
        <span>9 MODELS AVAILABLE</span>
        <span className="holo-border h-px w-16 rounded" />
        <span>EV PLATFORM v4.2</span>
      </motion.div>
    </section>
  );
}
