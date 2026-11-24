"use client";

import { useRef } from "react";

export default function TiltPanel({ children, className = "" }) {
  const panelRef = useRef(null);

  const handleMove = (event) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const panel = panelRef.current;
    const rect = panel.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    panel.style.transform = `perspective(900px) rotateY(${x * 5}deg) rotateX(${y * -5}deg) scale(1.01)`;
    const grid = panel.querySelector("[data-grid]");
    if (grid) grid.style.transform = `translate(${x * 9}px, ${y * 9}px)`;
    const portrait = panel.querySelector("[data-portrait]");
    if (portrait) portrait.style.transform = `translateX(-50%) translate(${x * 12}px, ${y * 8}px)`;
    const ghostFrame = panel.querySelector("[data-ghost-frame]");
    if (ghostFrame) ghostFrame.style.transform = `translate(${x * -7}px, ${y * -7}px)`;
  };

  const reset = () => {
    const panel = panelRef.current;
    panel.style.transform = "";
    const grid = panel.querySelector("[data-grid]");
    if (grid) grid.style.transform = "";
    const portrait = panel.querySelector("[data-portrait]");
    if (portrait) portrait.style.transform = "";
    const ghostFrame = panel.querySelector("[data-ghost-frame]");
    if (ghostFrame) ghostFrame.style.transform = "";
  };

  return (
    <div
      ref={panelRef}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {children}
    </div>
  );
}
