import carAetherOne from "../assets/car_aether_one.png";
import carAetherGhost from "../assets/car_aether_ghost.png";
import carAetherHorizon from "../assets/car_aether_horizon.png";
import carAliOneInterior from "../assets/car_ali_one_interior.png";
import carAliGhostInterior from "../assets/car_ali_ghost_interior.png";
import carAliHorizonInterior from "../assets/car_ali_horizon_interior.png";

// Physical car image files for Hypercar (Ali One, Ali GT, Ali Storm)
import carRed from "../assets/car_red.png";
import carBlack from "../assets/car_black.png";
import carGreen from "../assets/car_green.png";
import carSilver from "../assets/car_silver.png";

// Physical car image files for Sedan (Ali Ghost, Ali Pulse, Ali Nova)
import ghostSilver from "../assets/ghost_silver.png";
import ghostBlack from "../assets/ghost_black.png";
import ghostRed from "../assets/ghost_red.png";
import ghostGreen from "../assets/ghost_green.png";

// Physical car image files for SUV & Heavy Duty (Ali Horizon, Ali Cyber, Ali Titan)
import horizonSilver from "../assets/horizon_silver.png";
import horizonBlack from "../assets/horizon_black.png";
import horizonRed from "../assets/horizon_red.png";
import horizonGreen from "../assets/horizon_green.png";

export const CARS_DATA = [
  {
    id: "ali-one",
    name: "Ali One",
    tagline: "THE ULTIMATE HYPERCAR",
    description: "An electric speed masterpiece with dual-motor vectoring and track-tuned suspension.",
    basePrice: 185000,
    glowColor: "rgba(255,255,255,0.5)",
    badge: "🏆 FLAGSHIP",
    specs: {
      acceleration: "1.85s", range: "450 mi", power: "1,200 hp", topSpeed: "250 mph",
      batteryScore: 94, aeroScore: 98, aiScore: 92
    },
    image: carAetherOne,
    imageInterior: carAliOneInterior,
    baseImageStyle: {},
    colors: [
      { name: "Liquid Silver", hex: "#d1d5db", price: 0, image: carSilver },
      { name: "Midnight Shadow", hex: "#111827", price: 1500, image: carBlack },
      { name: "Crimson Sunset", hex: "#ef4444", price: 3000, image: carRed },
      { name: "Aurora Emerald", hex: "#10b981", price: 2500, image: carGreen }
    ]
  },
  {
    id: "ali-ghost",
    name: "Ali Ghost",
    tagline: "MINIMALIST LUXURY SEDAN",
    description: "Pure comfort and quiet power, designed for seamless cross-country travel.",
    basePrice: 95000,
    glowColor: "rgba(147,197,253,0.5)",
    badge: "✨ BEST SELLER",
    specs: {
      acceleration: "3.1s", range: "410 mi", power: "680 hp", topSpeed: "155 mph",
      batteryScore: 89, aeroScore: 95, aiScore: 96
    },
    image: ghostSilver,
    imageInterior: carAliGhostInterior,
    baseImageStyle: {},
    colors: [
      { name: "Liquid Silver", hex: "#d1d5db", price: 0, image: ghostSilver },
      { name: "Midnight Shadow", hex: "#111827", price: 1500, image: ghostBlack },
      { name: "Crimson Sunset", hex: "#ef4444", price: 3000, image: ghostRed },
      { name: "Aurora Emerald", hex: "#10b981", price: 2500, image: ghostGreen }
    ]
  },
  {
    id: "ali-horizon",
    name: "Ali Horizon",
    tagline: "HIGH-PERFORMANCE SUV",
    description: "Uncompromised off-road capability combined with luxurious interior space.",
    basePrice: 120000,
    glowColor: "rgba(110,231,183,0.5)",
    badge: "🌍 ALL TERRAIN",
    specs: {
      acceleration: "2.9s", range: "380 mi", power: "820 hp", topSpeed: "170 mph",
      batteryScore: 92, aeroScore: 88, aiScore: 90
    },
    image: horizonSilver,
    imageInterior: carAliHorizonInterior,
    baseImageStyle: {},
    colors: [
      { name: "Liquid Silver", hex: "#d1d5db", price: 0, image: horizonSilver },
      { name: "Midnight Shadow", hex: "#111827", price: 1500, image: horizonBlack },
      { name: "Crimson Sunset", hex: "#ef4444", price: 3000, image: horizonRed },
      { name: "Aurora Emerald", hex: "#10b981", price: 2500, image: horizonGreen }
    ]
  },
  {
    id: "ali-gt",
    name: "Ali GT",
    tagline: "GRAND TOURER COUPE",
    description: "Premium long-distance cruiser balancing high-end luxury with aggressive curves.",
    basePrice: 135000,
    glowColor: "rgba(96,165,250,0.5)",
    badge: "💎 LIMITED",
    specs: {
      acceleration: "2.4s", range: "430 mi", power: "920 hp", topSpeed: "210 mph",
      batteryScore: 91, aeroScore: 96, aiScore: 91
    },
    image: carSilver,
    imageInterior: carAliOneInterior,
    baseImageStyle: {},
    colors: [
      { name: "Liquid Silver", hex: "#d1d5db", price: 0, image: carSilver },
      { name: "Midnight Shadow", hex: "#111827", price: 1500, image: carBlack },
      { name: "Crimson Sunset", hex: "#ef4444", price: 3500, image: carRed },
      { name: "Aurora Emerald", hex: "#10b981", price: 2500, image: carGreen }
    ]
  },
  {
    id: "ali-cyber",
    name: "Ali Cyber",
    tagline: "TACTICAL UTILITY VEHICLE",
    description: "Military-grade chassis engineered for the harshest terrains and heavy towing.",
    basePrice: 110000,
    glowColor: "rgba(251,191,36,0.5)",
    badge: "⚔️ TACTICAL",
    specs: {
      acceleration: "3.4s", range: "350 mi", power: "950 hp", topSpeed: "140 mph",
      batteryScore: 95, aeroScore: 81, aiScore: 88
    },
    image: horizonSilver,
    imageInterior: carAliHorizonInterior,
    baseImageStyle: {},
    colors: [
      { name: "Liquid Silver", hex: "#d1d5db", price: 0, image: horizonSilver },
      { name: "Midnight Shadow", hex: "#111827", price: 1500, image: horizonBlack },
      { name: "Crimson Sunset", hex: "#ef4444", price: 3000, image: horizonRed },
      { name: "Aurora Emerald", hex: "#10b981", price: 2000, image: horizonGreen }
    ]
  },
  {
    id: "ali-pulse",
    name: "Ali Pulse",
    tagline: "URBAN COMPACT EV",
    description: "Sleek, lightweight hot hatchback optimized for agile city driving and parking.",
    basePrice: 45000,
    glowColor: "rgba(249,115,22,0.5)",
    badge: "🔥 HOT HATCH",
    specs: {
      acceleration: "4.8s", range: "300 mi", power: "320 hp", topSpeed: "120 mph",
      batteryScore: 86, aeroScore: 92, aiScore: 95
    },
    image: ghostSilver,
    imageInterior: carAliGhostInterior,
    baseImageStyle: {},
    colors: [
      { name: "Liquid Silver", hex: "#d1d5db", price: 0, image: ghostSilver },
      { name: "Midnight Shadow", hex: "#111827", price: 1500, image: ghostBlack },
      { name: "Crimson Sunset", hex: "#ef4444", price: 3000, image: ghostRed },
      { name: "Aurora Emerald", hex: "#10b981", price: 2000, image: ghostGreen }
    ]
  },
  {
    id: "ali-storm",
    name: "Ali Storm",
    tagline: "ELECTRIC TRACK WEAPON",
    description: "Zero-compromise track machine with active aero, drift mode, and 1400hp output.",
    basePrice: 225000,
    glowColor: "rgba(239,68,68,0.6)",
    badge: "⚡ TRACK ONLY",
    specs: {
      acceleration: "1.5s", range: "280 mi", power: "1,400 hp", topSpeed: "270 mph",
      batteryScore: 99, aeroScore: 100, aiScore: 97
    },
    image: carRed,
    imageInterior: carAliOneInterior,
    baseImageStyle: {},
    colors: [
      { name: "Crimson Sunset", hex: "#ef4444", price: 0, image: carRed },
      { name: "Midnight Shadow", hex: "#111827", price: 1500, image: carBlack },
      { name: "Liquid Silver", hex: "#d1d5db", price: 3000, image: carSilver },
      { name: "Aurora Emerald", hex: "#10b981", price: 2800, image: carGreen }
    ]
  },
  {
    id: "ali-nova",
    name: "Ali Nova",
    tagline: "AUTONOMOUS LUXURY CRUISER",
    description: "Level 5 self-driving sanctuary on wheels with massage seats and cinema roof.",
    basePrice: 165000,
    glowColor: "rgba(167,139,250,0.5)",
    badge: "🤖 SELF-DRIVE",
    specs: {
      acceleration: "3.8s", range: "520 mi", power: "580 hp", topSpeed: "130 mph",
      batteryScore: 98, aeroScore: 90, aiScore: 100
    },
    image: ghostSilver,
    imageInterior: carAliGhostInterior,
    baseImageStyle: {},
    colors: [
      { name: "Liquid Silver", hex: "#d1d5db", price: 0, image: ghostSilver },
      { name: "Midnight Shadow", hex: "#111827", price: 1500, image: ghostBlack },
      { name: "Crimson Sunset", hex: "#ef4444", price: 2500, image: ghostRed },
      { name: "Aurora Emerald", hex: "#10b981", price: 2000, image: ghostGreen }
    ]
  },
  {
    id: "ali-titan",
    name: "Ali Titan",
    tagline: "HEAVY DUTY ELECTRIC TRUCK",
    description: "8-seat configuration electric truck with 50,000 lbs towing and solar roof.",
    basePrice: 89000,
    glowColor: "rgba(163,163,163,0.5)",
    badge: "🚛 HEAVY DUTY",
    specs: {
      acceleration: "4.2s", range: "400 mi", power: "750 hp", topSpeed: "115 mph",
      batteryScore: 97, aeroScore: 78, aiScore: 89
    },
    image: horizonSilver,
    imageInterior: carAliHorizonInterior,
    baseImageStyle: {},
    colors: [
      { name: "Liquid Silver", hex: "#d1d5db", price: 0, image: horizonSilver },
      { name: "Midnight Shadow", hex: "#111827", price: 1500, image: horizonBlack },
      { name: "Crimson Sunset", hex: "#ef4444", price: 3000, image: horizonRed },
      { name: "Aurora Emerald", hex: "#10b981", price: 2500, image: horizonGreen }
    ]
  }
];
