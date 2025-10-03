"use client";

import { useEffect, useState } from "react";

interface LoadingAnimationProps {
  text?: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

export default function LoadingAnimation({
  text = "Loading",
  speed = 1,
  className = "",
  onComplete,
}: LoadingAnimationProps) {
  const [mounted, setMounted] = useState(false);
  const [zoomIn, setZoomIn] = useState(false);

  useEffect(() => {
    setMounted(true);

    const characters = text.split("").length;
    const revealDuration = (1.2 + characters * 0.05) / speed;
    const holdDuration = 1.5; // 1.5 seconds hold
    const zoomDuration = 0.8; // 0.8 seconds for zoom

    // Start zoom after text reveal + hold
    const zoomTimer = setTimeout(() => {
      setZoomIn(true);
    }, (revealDuration + holdDuration) * 1000);

    // Call onComplete after zoom finishes
    if (onComplete) {
      const completeTimer = setTimeout(() => {
        onComplete();
      }, (revealDuration + holdDuration + zoomDuration) * 1000);
      return () => {
        clearTimeout(zoomTimer);
        clearTimeout(completeTimer);
      };
    }

    return () => clearTimeout(zoomTimer);
  }, [text, speed, onComplete]);

  const characters = text.split("");

  return (
    <div className={`loading-container ${className}`}>
      <div 
        className={`loading-text ${zoomIn ? "zoom-in" : ""}`}
        style={{
          animationDuration: `${0.8 / speed}s`,
        }}
      >
        {characters.map((char, index) => (
          <span
            key={index}
            className={`loading-char ${mounted ? "animate" : ""}`}
            style={{
              animationDelay: `${(index * 0.05) / speed}s`,
              animationDuration: `${1.2 / speed}s`,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
    </div>
  );
}