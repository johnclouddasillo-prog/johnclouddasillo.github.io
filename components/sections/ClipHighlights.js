import Image from "next/image";
import { clips } from "@/data/clips";

function ClipCard({ clip, repeated = false }) {
  return (
    <a
      className={`clip-card${clip.featured ? " clip-card-featured" : ""}`}
      style={{
        "--clip-card-width": clip.cardWidth,
        "--clip-card-offset": clip.verticalOffset,
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
  return (
    <div className="clip-highlights">
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
