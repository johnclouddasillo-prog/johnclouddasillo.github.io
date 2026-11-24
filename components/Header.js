"use client";

import { useEffect, useState } from "react";
import { sections } from "@/data/sections";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("work");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.05, 0.2, 0.5] }
    );
    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[80] h-[72px] border-b transition-[background-color,backdrop-filter,border-color] ${
        scrolled
          ? "border-ink/15 bg-bg/85 backdrop-blur-md"
          : "border-ink/20 bg-bg"
      }`}
    >
      <div className="container-shell flex h-full items-center">
        <a href="#work" aria-label="Go to Work" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center bg-accent font-serif text-[28px] leading-none text-card">
            Y
          </span>
          <span className="font-mono text-[12px] tracking-[0.32em]">YARDY</span>
        </a>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] lg:flex">
          <span className="h-2 w-2 rounded-full bg-availability" />
          Available for selected projects
        </div>

        <nav className="ml-auto hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`font-mono text-[10px] uppercase tracking-[0.12em] transition-colors ${
                active === section.id ? "text-accent" : "hover:text-accent"
              }`}
            >
              {section.label} <span className="opacity-50">{section.number}</span>
            </a>
          ))}
          <a href="#contact" className="text-link font-mono text-[10px] uppercase tracking-[0.12em]">
            Start a project
          </a>
        </nav>

        <button
          type="button"
          className="ml-auto font-mono text-[11px] uppercase tracking-[0.12em] lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          Menu
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          className="absolute left-0 top-[72px] w-full border-b border-ink/15 bg-bg px-4 py-5 lg:hidden"
          aria-label="Mobile navigation"
        >
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={closeMenu}
              className="flex items-center justify-between border-b border-ink/10 py-4 font-mono text-[12px] uppercase tracking-[0.12em]"
            >
              {section.label} <span>{section.number}</span>
            </a>
          ))}
          <a
            href="#contact"
            onClick={closeMenu}
            className="block pt-5 font-mono text-[12px] uppercase tracking-[0.12em] text-accent"
          >
            Start a project
          </a>
        </nav>
      )}
    </header>
  );
}
