import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

export default function BackgroundVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const videoSrc = "https://assets.mixkit.co/videos/preview/mixkit-futuristic-driving-simulation-in-a-cyberpunk-city-41586-large.mp4";

    if (Hls.isSupported() && videoSrc.endsWith(".m3u8")) {
      const hls = new Hls({ enableWorker: true, lowLatencyMode: true });
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
      return () => {
        hls.destroy();
      };
    } else {
      video.src = videoSrc;
      video.play().catch(() => {});
    }
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover opacity-25 filter brightness-50 contrast-125"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/95" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-950/20 via-black/60 to-black" />
    </div>
  );
}
