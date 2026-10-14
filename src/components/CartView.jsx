import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2, ArrowRight, Check, ShoppingBag, ArrowLeft,
  Sparkles, Key, Lock, Shield, BadgeCheck
} from "lucide-react";
import { playSound } from "../utils/sounds";

/* ── Typewriter placeholder CTA ── */
function TypewriterEmailCTA({ onSubmitReservation }) {
  const [mode, setMode] = useState("button");
  const [email, setEmail] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const IDLE_TEXT = "Enter Your Email Here For Early Access";
  const OK_TEXT   = "Redirecting to Secure Payment Gateway…";

  useEffect(() => {
    if (mode !== "form") { setPlaceholder(""); return; }
    const text = submitted ? OK_TEXT : IDLE_TEXT;
    setPlaceholder("");
    let i = 0;
    const iv = setInterval(() => {
      setPlaceholder(p => p + text[i]);
      i++;
      if (i >= text.length) clearInterval(iv);
    }, 45);
    return () => clearInterval(iv);
  }, [mode, submitted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    playSound("click");
    setSubmitted(true);
    setTimeout(() => {
      playSound("transition");
      onSubmitReservation(email);
      setSubmitted(false);
      setMode("button");
      setEmail("");
    }, 1800);
  };

  return (
    <AnimatePresence mode="wait">
      {mode === "button" ? (
        <motion.button
          key="btn"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={() => { playSound("click"); setMode("form"); }}
          onMouseEnter={() => playSound("hover")}
          className="px-10 py-3 text-[13px] font-medium border border-white/10 rounded-full hover:border-white/30 hover:bg-white/[0.02] transition-all duration-300 text-white/90 backdrop-blur-sm cursor-pointer w-full"
        >
          Get Early Access →
        </motion.button>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onSubmit={handleSubmit}
          className="flex items-center gap-2 pl-4 pr-1.5 py-1.5 border border-white/20 rounded-full bg-white/[0.02] backdrop-blur-sm w-full focus-within:border-white/40 transition-colors duration-300"
        >
          <input
            type="email" value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder={placeholder}
            disabled={submitted} autoFocus required
            className="bg-transparent text-white placeholder-white/40 border-none outline-none flex-1 text-xs font-sans min-w-0"
          />
          <button type="submit" disabled={submitted}
            onMouseEnter={() => playSound("hover")}
            className="p-2 rounded-full bg-white text-black flex items-center justify-center hover:opacity-90 active:scale-95 transition-all cursor-pointer border-none shrink-0"
          >
            {submitted
              ? <Check className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              : <ArrowRight className="w-3.5 h-3.5" />}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

/* ── Cart item card ── */
function CartItem({ item, index, onRemove }) {
  const tint = {
    backgroundColor: item.selectedColor.hex,
    maskImage: `url(${item.image})`,
    WebkitMaskImage: `url(${item.image})`,
    maskSize: "contain", WebkitMaskSize: "contain",
    maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat",
    maskPosition: "center", WebkitMaskPosition: "center",
    mixBlendMode: item.selectedColor.hex === "#111827" ? "color-burn" : "color",
    opacity: item.selectedColor.hex === "#d1d5db" ? 0 : item.selectedColor.hex === "#111827" ? 0.9 : 0.75,
    pointerEvents: "none",
  };
  const imgFilter = {
    filter: item.selectedColor.hex === "#111827"
      ? `${item.baseImageStyle?.filter || ""} brightness(0.35) contrast(1.15)`.trim()
      : item.baseImageStyle?.filter || "none",
    transform: item.baseImageStyle?.transform || "none",
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, height: 0 }}
      className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/5"
    >
      <div className="relative w-20 h-14 rounded-xl bg-white/[0.01] border border-white/5 flex items-center justify-center p-1 shrink-0 overflow-hidden">
        <img src={item.image} alt={item.name} style={imgFilter} className="max-w-full max-h-full object-contain" />
        <div className="absolute inset-0" style={tint} />
      </div>
      <div className="flex-1 min-w-0 text-left">
        <h4 className="text-sm font-semibold text-white truncate">{item.name}</h4>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="w-2 h-2 rounded-full border border-white/10" style={{ backgroundColor: item.selectedColor.hex }} />
          <span className="text-[11px] text-white/45 truncate">{item.selectedColor.name}</span>
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-sm font-bold text-white">${item.configuredPrice.toLocaleString()}</span>
        <button onClick={() => { playSound("remove"); onRemove(index); }}
          onMouseEnter={() => playSound("hover")}
          className="p-1.5 rounded-full hover:bg-white/10 text-white/40 hover:text-red-400 transition-all cursor-pointer bg-transparent border-none"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}

/* ── Main CartView ── */
export default function CartView({ cart, onRemoveItem, onClearCart, onNavigate }) {
  const [step, setStep]           = useState("cart");    // "cart" | "payment" | "processing" | "success"
  const [userEmail, setUserEmail] = useState("");
  const [txId, setTxId]           = useState("");
  const [cardName, setCardName]   = useState("Ali Autos Patron");
  const [cardNum, setCardNum]     = useState("4200 8820 2026 0718");
  const [cardExp, setCardExp]     = useState("12/30");
  const [cardCvv, setCardCvv]     = useState("026");

  const total = cart.reduce((s, i) => s + i.configuredPrice, 0);

  const processPayment = (e) => {
    e.preventDefault();
    playSound("confirm");
    setStep("processing");
    setTimeout(() => {
      playSound("success");
      setTxId(`ALI-TX-${(100000 + Math.floor(Math.random() * 900000))}`);
      setStep("success");
    }, 3000);
  };

  const finishSuccess = () => {
    playSound("click");
    onClearCart();
    setStep("cart");
    onNavigate("showcase");
  };

  return (
    <section className="relative flex-1 flex flex-col items-center px-4 md:px-6 pb-8 pt-4 w-full">

      {/* Header */}
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between mt-2 mb-4 shrink-0">
        <button
          onClick={() => {
            playSound("click");
            if (step === "payment") {
              setStep("cart");
            } else {
              onNavigate("showcase");
            }
          }}
          onMouseEnter={() => playSound("hover")}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors bg-transparent border-none cursor-pointer text-sm font-medium focus:outline-none"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{step === "payment" ? "Back to Cart" : "Back to Showcase"}</span>
        </button>
        <div className="text-right">
          <span className="text-[9px] tracking-[0.2em] font-semibold text-white/40 uppercase">
            {step === "cart" ? "RESERVATIONS" : step === "payment" || step === "processing" ? "SECURE CHECKOUT" : "CONFIRMED"}
          </span>
          <h2 className="text-lg font-bold text-white tracking-tight">
            {step === "cart" ? "Your Configurations" : step === "success" ? "Booking Confirmed 🎉" : "Payment Details"}
          </h2>
        </div>
      </div>

      {/* ── STEP 1: Cart ── */}
      <AnimatePresence mode="wait">
        {step === "cart" && (
          <motion.div key="cart-view"
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }} transition={{ duration: 0.45, ease: [0.16,1,0.3,1] }}
            className="w-full max-w-5xl mx-auto flex-1 flex flex-col lg:flex-row gap-6"
          >
            {/* Items */}
            <div className="w-full lg:w-[58%] rounded-3xl liquid-glass border border-white/5 p-5 flex flex-col gap-3 overflow-y-auto max-h-[420px] lg:max-h-[380px]">
              <div className="flex items-center gap-2 mb-1 shrink-0">
                <ShoppingBag className="w-4 h-4 text-white/60" />
                <h3 className="text-sm font-semibold text-white">
                  Selected Vehicles ({cart.length})
                </h3>
              </div>
              <AnimatePresence mode="popLayout">
                {cart.length === 0 ? (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex-1 flex flex-col items-center justify-center py-10 gap-3 text-center"
                  >
                    <div className="w-12 h-12 rounded-full liquid-glass flex items-center justify-center text-white/30">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <p className="text-sm text-white/40">No vehicles configured yet.</p>
                    <button onClick={() => { playSound("nav"); onNavigate("showcase"); }}
                      onMouseEnter={() => playSound("hover")}
                      className="px-6 py-2 rounded-full bg-white text-black text-xs font-bold hover:bg-white/90 transition-all border-none cursor-pointer"
                    >
                      Browse Vehicles
                    </button>
                  </motion.div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {cart.map((item, i) => (
                      <CartItem key={`${item.id}-${i}`} item={item} index={i} onRemove={onRemoveItem} />
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Summary + CTA */}
            <div className="w-full lg:w-[42%] flex flex-col justify-between rounded-3xl liquid-glass border border-white/5 p-5">
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold text-white mb-1">Order Summary</h3>
                <div className="flex flex-col gap-2.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/50">Vehicles ({cart.length})</span>
                    <span className="text-white">${total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Early Booking Deposit</span>
                    <span className="text-emerald-400 font-semibold">$100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Processing Fee</span>
                    <span className="text-white/70">Waived ✓</span>
                  </div>
                  <div className="h-px bg-white/8" />
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-semibold text-white/70">Due Today</span>
                    <span className="text-xl font-bold text-white">$100.00</span>
                  </div>
                  <p className="text-[10px] text-white/35 leading-relaxed">
                    Full vehicle amount due at delivery. Deposit is fully refundable within 30 days.
                  </p>
                </div>
              </div>

              {cart.length > 0 ? (
                <div className="mt-5 flex flex-col gap-2">
                  <TypewriterEmailCTA onSubmitReservation={(email) => {
                    setUserEmail(email);
                    setStep("payment");
                  }} />
                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-white/30">
                    <Lock className="w-3 h-3" /> <span>256-bit SSL encrypted</span>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-white/30 italic mt-4 text-center">
                  Add a vehicle configuration to proceed.
                </p>
              )}
            </div>
          </motion.div>
        )}

        {/* ── STEP 2: Payment ── */}
        {(step === "payment" || step === "processing") && (
          <motion.div key="payment-view"
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }} transition={{ duration: 0.45, ease: [0.16,1,0.3,1] }}
            className="w-full max-w-4xl mx-auto flex-1 flex flex-col md:flex-row items-center justify-center gap-6"
          >
            {/* Mock Credit Card */}
            <div className="w-full md:w-[45%] flex justify-center">
              <motion.div
                whileHover={{ rotateY: 8, rotateX: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-full max-w-[320px] aspect-[1.586] rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)",
                  boxShadow: "0 25px 60px rgba(0,0,0,0.6), 0 0 40px rgba(96,165,250,0.15)",
                  border: "1px solid rgba(255,255,255,0.1)"
                }}
              >
                {/* Shimmer overlay */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)" }} />

                {/* Top row */}
                <div className="flex justify-between items-start relative z-10">
                  <div className="w-10 h-7 rounded-md relative overflow-hidden"
                    style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)", border: "1px solid rgba(255,255,255,0.2)" }}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-sm border border-amber-300/40 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-sm bg-amber-400/50" />
                      </div>
                    </div>
                    <div className="absolute w-full h-px bg-amber-300/30 top-1/2" />
                  </div>
                  <div className="text-right">
                    <div className="text-[8px] text-white/40 uppercase tracking-widest">ALI AUTOS</div>
                    <Sparkles className="w-4 h-4 text-blue-300/60 mt-0.5 ml-auto" />
                  </div>
                </div>

                {/* Card number */}
                <div className="relative z-10 font-mono text-white/90 tracking-[0.22em] text-sm pt-3">
                  {cardNum || "4200 8820 2026 0718"}
                </div>

                {/* Bottom info */}
                <div className="flex justify-between items-end relative z-10">
                  <div>
                    <div className="text-[7px] text-white/35 uppercase tracking-wider mb-0.5">Cardholder</div>
                    <div className="text-[11px] font-semibold text-white/80 uppercase tracking-wide">
                      {cardName || "ALI AUTOS PATRON"}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[7px] text-white/35 uppercase tracking-wider mb-0.5">Expires</div>
                    <div className="text-[11px] font-mono text-white/80">{cardExp || "12/30"}</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Payment Form */}
            <form onSubmit={processPayment}
              className="w-full md:w-[55%] rounded-3xl liquid-glass border border-white/8 p-5 text-left flex flex-col gap-3.5"
            >
              <div className="flex items-center gap-2 pb-3 border-b border-white/8">
                <Shield className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-semibold text-white">Secured Escrow Payment</h3>
                <span className="ml-auto text-[9px] text-emerald-400 font-semibold bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
                  SSL SECURED
                </span>
              </div>

              <div className="text-xs text-white/50 bg-white/[0.02] rounded-xl p-3 border border-white/5">
                Reserving for: <span className="text-white font-medium">{userEmail}</span>
                &nbsp;·&nbsp; {cart.length} vehicle{cart.length > 1 ? "s" : ""}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] text-white/35 uppercase tracking-wider font-semibold">Cardholder Name</label>
                <input type="text" value={cardName} onChange={e => setCardName(e.target.value)} required
                  className="px-3 py-2 rounded-xl bg-white/5 border border-white/8 text-white text-xs outline-none focus:border-white/30 transition-all font-sans" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] text-white/35 uppercase tracking-wider font-semibold">Card Number</label>
                <input type="text" value={cardNum} onChange={e => setCardNum(e.target.value)} required maxLength={19}
                  className="px-3 py-2 rounded-xl bg-white/5 border border-white/8 text-white font-mono text-xs outline-none focus:border-white/30 transition-all" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] text-white/35 uppercase tracking-wider font-semibold">Expiry Date</label>
                  <input type="text" value={cardExp} onChange={e => setCardExp(e.target.value)} placeholder="MM/YY" required maxLength={5}
                    className="px-3 py-2 rounded-xl bg-white/5 border border-white/8 text-white font-mono text-xs outline-none focus:border-white/30 transition-all text-center" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] text-white/35 uppercase tracking-wider font-semibold">CVV</label>
                  <input type="text" value={cardCvv} onChange={e => setCardCvv(e.target.value)} placeholder="•••" required maxLength={4}
                    className="px-3 py-2 rounded-xl bg-white/5 border border-white/8 text-white font-mono text-xs outline-none focus:border-white/30 transition-all text-center" />
                </div>
              </div>

              <div className="h-px bg-white/8" />

              <div className="flex justify-between items-center text-xs">
                <span className="text-white/50">Deposit amount (refundable)</span>
                <span className="text-lg font-bold text-white">$100.00</span>
              </div>

              <button type="submit" disabled={step === "processing"}
                onMouseEnter={() => playSound("hover")}
                className="w-full py-3 px-6 rounded-full bg-white text-black font-bold text-xs hover:bg-white/90 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 border-none shadow-lg mt-1 disabled:opacity-70"
              >
                {step === "processing" ? (
                  <>
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin shrink-0" />
                    <span>Authorizing Secure Payment…</span>
                  </>
                ) : (
                  <>
                    <Key className="w-3.5 h-3.5" />
                    <span>Confirm Reservation — Pay $100</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        )}

        {/* ── STEP 3: Success ── */}
        {step === "success" && (
          <motion.div key="success-view"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: "backOut" }}
            className="w-full max-w-md mx-auto flex-1 flex flex-col items-center justify-center text-center p-8 rounded-3xl liquid-glass border border-white/8"
          >
            {/* Success icon */}
            <motion.div
              initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, duration: 0.5, ease: "backOut" }}
              className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
              style={{
                background: "rgba(16,185,129,0.15)",
                border: "1px solid rgba(16,185,129,0.4)",
                boxShadow: "0 0 30px rgba(16,185,129,0.3)"
              }}
            >
              <BadgeCheck className="w-10 h-10 text-emerald-400" />
            </motion.div>

            <motion.h3 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              className="text-2xl font-bold text-white tracking-tight mb-2">
              Booking Confirmed!
            </motion.h3>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
              className="text-xs text-white/50 leading-relaxed max-w-xs mb-6">
              Your Ali Autos early-access reservation is secured. A confirmation will be emailed to you shortly.
            </motion.p>

            {/* Receipt */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
              className="w-full rounded-2xl bg-white/[0.03] border border-white/8 p-4 text-left flex flex-col gap-2.5 text-xs mb-6"
            >
              {[
                ["Transaction ID", txId, "font-mono text-white/70"],
                ["Email", userEmail, "text-white/70 truncate"],
                ["Vehicles Reserved", `${cart.length} vehicle${cart.length > 1 ? "s" : ""}`, "text-white/70"],
                ["Deposit Paid", "$100.00", "text-emerald-400 font-semibold"],
              ].map(([label, value, cls]) => (
                <div key={label} className="flex justify-between items-center gap-2">
                  <span className="text-white/35 shrink-0">{label}</span>
                  <span className={`${cls} text-right`}>{value}</span>
                </div>
              ))}
              <div className="h-px bg-white/5 my-1" />
              <p className="text-[10px] text-white/25 text-center italic">
                Deposit is fully refundable within 30 days of booking.
              </p>
            </motion.div>

            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
              onMouseEnter={() => playSound("hover")}
              onClick={finishSuccess}
              className="w-full py-3 rounded-full bg-white text-black font-bold text-sm hover:bg-white/90 transition-all border-none cursor-pointer"
            >
              Back to Showcase
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
