"use client";

import { useEffect, useRef } from "react";

export default function Reveal({ children, className = "", as: Element = "div" }) {
  const ref = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const element = ref.current;
    if (!element) return;
    if (reduceMotion) {
      element.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-visible");
          observer.unobserve(element);
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Element ref={ref} className={`reveal ${className}`}>
      {children}
    </Element>
  );
}
