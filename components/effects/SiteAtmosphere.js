"use client";

import { useEffect, useRef } from "react";

export default function SiteAtmosphere() {
  const atmosphereRef = useRef(null);

  useEffect(() => {
    const atmosphere = atmosphereRef.current;
    if (
      !atmosphere ||
      window.matchMedia("(hover: none), (pointer: coarse), (prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let frame = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const updatePosition = (event) => {
      if (event.pointerType !== "mouse") return;
      x = event.clientX;
      y = event.clientY;

      if (frame) return;
      frame = requestAnimationFrame(() => {
        atmosphere.style.setProperty("--site-pointer-x", `${x}px`);
        atmosphere.style.setProperty("--site-pointer-y", `${y}px`);
        atmosphere.style.setProperty("--site-pointer-opacity", "1");
        frame = 0;
      });
    };

    const hidePointerGlow = (event) => {
      if (event.relatedTarget !== null) return;
      atmosphere.style.setProperty("--site-pointer-opacity", "0");
    };

    document.addEventListener("pointermove", updatePosition, { passive: true });
    document.addEventListener("pointerout", hidePointerGlow);

    return () => {
      document.removeEventListener("pointermove", updatePosition);
      document.removeEventListener("pointerout", hidePointerGlow);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={atmosphereRef} className="site-atmosphere" aria-hidden="true" />;
}
