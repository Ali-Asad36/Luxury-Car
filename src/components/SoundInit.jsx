import { useEffect } from "react";
import { unlockAudio, playSound } from "../utils/sounds";

export default function SoundInit() {
  useEffect(() => {
    const unlock = () => {
      unlockAudio();
      playSound("pulse");
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, []);

  return null;
}
