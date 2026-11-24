"use client";

import { useEffect, useRef } from "react";

export default function CursorFollower() {
  const dotRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
    const dot = dotRef.current;
    let x = -30;
    let y = -30;
    let targetX = -30;
    let targetY = -30;
    let frame;

    const move = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      dot.style.opacity = "0.72";
      const overInteractive = event.target.closest("a, button, input, textarea");
      dot.classList.toggle("is-active", Boolean(overInteractive));
    };

    const animate = () => {
      x += (targetX - x) * 0.16;
      y += (targetY - y) * 0.16;
      dot.style.transform = `translate3d(${x - dot.offsetWidth / 2}px, ${y - dot.offsetHeight / 2}px, 0)`;
      frame = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", move);
    animate();
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />;
}
