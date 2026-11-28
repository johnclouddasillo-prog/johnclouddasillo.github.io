"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { clips } from "@/data/clips";

function ClipCard({ clip, repeated = false }) {
  return (
    <a
      className={`clip-card${clip.featured ? " clip-card-featured" : ""}`}
      style={{
        "--clip-card-width": clip.cardWidth,
        "--clip-card-offset": clip.verticalOffset,
        "--clip-float-duration": clip.floatDuration,
        "--clip-float-delay": clip.floatDelay,
        "--clip-image-ratio": clip.imageRatio,
        "--clip-image-position": clip.imagePosition,
      }}
      href={clip.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${clip.platform} clip, ${clip.views} views`}
      tabIndex={repeated ? -1 : undefined}
    >
      <div className="clip-card-image">
        {clip.image ? (
          <Image
            src={clip.image}
            alt={`${clip.platform} clip thumbnail`}
            fill
            sizes="(max-width: 640px) 220px, 250px"
          />
        ) : (
          <div className={`clip-placeholder clip-placeholder-${clip.platform.toLowerCase()}`}>
            <span className="eyebrow">{clip.platform}</span>
            <span className="clip-placeholder-title">Clip<br />preview</span>
            <span className="clip-placeholder-note">Thumbnail coming soon</span>
          </div>
        )}
        <span className="clip-platform-badge">
          {clip.platformIcon ? (
            <Image src={clip.platformIcon} alt="" width={18} height={18} />
          ) : (
            <span className="clip-platform-initial" aria-hidden="true">
              {clip.platform === "Instagram" ? "IG" : "TT"}
            </span>
          )}
          {clip.platform}
        </span>
        <span className="clip-open-mark" aria-hidden="true">↗</span>
      </div>
      <div className="clip-card-caption">
        <span>{clip.title}</span>
        <span className="clip-views">{clip.views} views</span>
      </div>
    </a>
  );
}

export default function ClipHighlights() {
  const galleryRef = useRef(null);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (
      !gallery ||
      window.matchMedia("(hover: none), (pointer: coarse), (prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const cards = gallery.querySelectorAll(".clip-card");
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const resetParallax = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      gallery.style.setProperty("--clip-pointer-opacity", "0");
      cards.forEach((card) => {
        card.style.setProperty("--clip-mouse-x", "0px");
        card.style.setProperty("--clip-mouse-y", "0px");
      });
    };

    const updateParallax = (event) => {
      if (event.pointerType !== "mouse") return;

      const bounds = gallery.getBoundingClientRect();
      pointerX = (event.clientX - bounds.left) / bounds.width - 0.5;
      pointerY = (event.clientY - bounds.top) / bounds.height - 0.5;

      if (frame) return;
      frame = requestAnimationFrame(() => {
        gallery.style.setProperty("--clip-pointer-x", `${(pointerX + 0.5) * 100}%`);
        gallery.style.setProperty("--clip-pointer-y", `${(pointerY + 0.5) * 100}%`);
        gallery.style.setProperty("--clip-pointer-opacity", "1");
        cards.forEach((card, index) => {
          const depth = 0.65 + (index % clips.length) * 0.16;
          card.style.setProperty("--clip-mouse-x", `${pointerX * depth * 32}px`);
          card.style.setProperty("--clip-mouse-y", `${pointerY * depth * 22}px`);
        });
        frame = 0;
      });
    };

    gallery.addEventListener("pointermove", updateParallax, { passive: true });
    gallery.addEventListener("pointerleave", resetParallax);
    return () => {
      gallery.removeEventListener("pointermove", updateParallax);
      gallery.removeEventListener("pointerleave", resetParallax);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={galleryRef} className="clip-highlights">
      <p className="clip-gallery-watermark" aria-hidden="true">
        Clips keep<br />moving.
      </p>
      <div className="clip-marquee-viewport">
        <div className="clip-marquee-track">
          <div className="clip-marquee-group">
            {clips.map((clip) => <ClipCard key={clip.id} clip={clip} />)}
          </div>
          <div className="clip-marquee-group" aria-hidden="true">
            {clips.map((clip) => (
              <ClipCard key={`${clip.id}-repeat`} clip={clip} repeated />
            ))}
          </div>
        </div>
      </div>
      <p className="clip-marquee-note eyebrow">Selected clips / moving archive</p>
    </div>
  );
}
