import React from "react";
import { motion } from "framer-motion";
import { Globe, ShoppingBag } from "lucide-react";
import { playSound } from "../utils/sounds";

export default function Navbar({ currentView, setCurrentView, cartCount, hasSelectedCar }) {
  const navLinks = [
    { id: "showcase", label: "VEHICLES" },
    ...(hasSelectedCar ? [{ id: "customizer", label: "CONFIGURE" }] : []),
    { id: "cart", label: "RESERVE" },
  ];

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-20 px-4 md:px-6 pt-4 pb-2 w-full shrink-0"
    >
      {/* Holographic top line */}
      <div className="holo-border h-[1px] w-full max-w-5xl mx-auto mb-3 rounded-full opacity-60" />

      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <button
          onClick={() => { playSound("click"); setCurrentView("showcase"); }}
          className="flex items-center gap-2.5 cursor-pointer group focus:outline-none bg-transparent border-none shrink-0"
        >
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div className="absolute inset-0 rounded-lg border border-cyan-400/40 group-hover:border-cyan-400/80 transition-colors duration-300" />
            <Globe className="w-4 h-4 text-cyan-400 group-hover:rotate-180 transition-transform duration-700" />
          </div>
          <div className="flex flex-col items-start">
            <span className="font-hud text-white font-bold text-sm tracking-[0.15em] leading-none neon-flicker">
              ALI AUTOS
            </span>
            <span className="text-[8px] text-cyan-400/60 tracking-[0.3em] font-medium leading-none mt-0.5">
              NEXT GEN EV
            </span>
          </div>
        </button>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => { playSound("nav"); setCurrentView(link.id); }}
              className={`relative px-4 py-2 font-hud text-[10px] tracking-[0.2em] cursor-pointer bg-transparent border-none transition-all duration-300 ${
                currentView === link.id
                  ? "text-cyan-400"
                  : "text-white/40 hover:text-white/80"
              }`}
            >
              {currentView === link.id && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 border border-cyan-400/30 rounded"
                  style={{ background: "rgba(0,240,255,0.05)" }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Status indicator */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded border border-white/8 bg-white/[0.02]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ animation: "pulse-dot 2s ease-in-out infinite" }} />
            <span className="font-hud text-[8px] text-white/40 tracking-wider">ONLINE</span>
          </div>

          {/* Cart */}
          <button
            onClick={() => { playSound("click"); setCurrentView("cart"); }}
            className={`relative flex items-center gap-2 px-3 py-2 rounded border cursor-pointer bg-transparent focus:outline-none transition-all duration-300 ${
              currentView === "cart"
                ? "border-cyan-400/50 text-cyan-400"
                : "border-white/10 text-white/50 hover:border-white/30 hover:text-white"
            }`}
            aria-label="Cart"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            {cartCount > 0 && (
              <motion.span
                key={cartCount}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="font-hud text-[9px] font-bold"
                style={{ color: "var(--color, #00f0ff)" }}
              >
                {String(cartCount).padStart(2, "0")}
              </motion.span>
            )}
            {cartCount === 0 && (
              <span className="font-hud text-[9px]">00</span>
            )}
          </button>

          {/* CTA */}
          <button
            onClick={() => { playSound("nav"); setCurrentView(hasSelectedCar ? "customizer" : "showcase"); }}
            className="px-4 py-2 rounded font-hud text-[9px] tracking-[0.15em] font-semibold cursor-pointer border-none transition-all duration-300 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(0,240,255,0.15), rgba(168,85,247,0.15))",
              border: "1px solid rgba(0,240,255,0.3)",
              color: "#00f0ff",
            }}
          >
            {hasSelectedCar ? "CONFIGURE" : "BEGIN"}
          </button>
        </div>
      </div>

      {/* Bottom holographic line */}
      <div className="holo-border h-[1px] w-full max-w-5xl mx-auto mt-3 rounded-full opacity-30" />
    </motion.nav>
  );
}
