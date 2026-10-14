import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BackgroundVideo from "./components/BackgroundVideo";
import Navbar from "./components/Navbar";
import ShowcaseView from "./components/ShowcaseView";
import CustomizerView from "./components/CustomizerView";
import CartView from "./components/CartView";
import { playSound } from "./utils/sounds";

export default function App() {
  const [currentView, setCurrentView] = useState("showcase"); // "showcase" | "customizer" | "cart"
  const isFirstView = useRef(true);

  useEffect(() => {
    if (isFirstView.current) {
      isFirstView.current = false;
      return;
    }
    playSound("transition");
  }, [currentView]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [cart, setCart] = useState([]);

  const handleAddToCart = (configuredCar) => {
    setCart((prev) => [...prev, configuredCar]);
  };

  const handleRemoveItem = (indexToRemove) => {
    setCart((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const renderView = () => {
    switch (currentView) {
      case "showcase":
        return (
          <ShowcaseView
            onSelectCar={(car) => {
              setSelectedCar(car);
            }}
            onNavigate={setCurrentView}
          />
        );
      case "customizer":
        return selectedCar ? (
          <CustomizerView
            car={selectedCar}
            onAddToCart={handleAddToCart}
            onNavigate={setCurrentView}
          />
        ) : (
          <ShowcaseView
            onSelectCar={(car) => {
              setSelectedCar(car);
            }}
            onNavigate={setCurrentView}
          />
        );
      case "cart":
        return (
          <CartView
            cart={cart}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onNavigate={setCurrentView}
          />
        );
      default:
        return (
          <ShowcaseView
            onSelectCar={(car) => {
              setSelectedCar(car);
            }}
            onNavigate={setCurrentView}
          />
        );
    }
  };

  return (
    <main className="relative bg-black h-screen w-screen flex flex-col overflow-hidden selection:bg-white selection:text-black shrink-0">
      {/* Cinematic HLS Video Background */}
      <BackgroundVideo />

      {/* Glassmorphism Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        cartCount={cart.length}
        hasSelectedCar={!!selectedCar}
      />

      {/* Screen Views Wrapper supporting scroll functionality */}
      <div className="relative flex-1 w-full flex flex-col overflow-y-auto z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col min-h-full justify-between"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
