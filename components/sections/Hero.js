import Button from "@/components/ui/Button";
import TiltPanel from "@/components/effects/TiltPanel";
import { site } from "@/data/site";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      className="mt-[72px] flex h-[calc(100vh-72px)] min-h-[620px] items-center overflow-hidden"
      aria-labelledby="hero-title"
    >
      <div className="container-shell grid h-full items-center gap-6 md:grid-cols-[74px_minmax(0,1fr)_minmax(300px,36%)]">
        <div className="hidden h-[min(68vh,660px)] flex-col items-center pt-2 md:flex">
          <p className="eyebrow whitespace-nowrap [writing-mode:vertical-rl]">Portfolio / 2026</p>
          <span className="mt-5 h-16 w-px bg-ink/45" />
        </div>

        <div className="max-w-[660px]">
          <p className="eyebrow text-accent">{site.tagline}</p>
          <h1 id="hero-title" className="hero-headline">
            {site.headline.map((line, index) => (
              <span className="headline-mask" key={line}>
                <span className={index === 2 ? "text-accent" : ""}>{line}</span>
              </span>
            ))}
          </h1>
          <p className="max-w-[560px] text-[15px] leading-7 text-muted">{site.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#work" variant="solid">View my work</Button>
            <Button href="#contact" variant="outline">Contact me</Button>
          </div>
        </div>

        <TiltPanel className="hero-panel">
          <div data-grid className="hero-panel-grid" />
          <div className="hero-scan" aria-hidden="true" />
          <div data-ghost-frame className="hero-ghost-frame" aria-hidden="true" />
          <div className="hero-crosshair hero-crosshair-x" aria-hidden="true" />
          <div className="hero-crosshair hero-crosshair-y" aria-hidden="true" />
          <div className="hero-frame-index" aria-hidden="true">FRAME / 01</div>
          <div className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.16em] text-card">Clipper</div>
          <div className="absolute right-5 top-5 font-mono text-[10px] uppercase tracking-[0.16em] text-card">2026</div>
          <div className="absolute bottom-5 left-5 font-mono text-[10px] text-card">yardy</div>
          <div className="absolute bottom-5 right-5 flex items-center gap-2 font-mono text-[10px] text-card">
            <span className="h-1.5 w-1.5 rounded-full bg-card" />
            Clips
            <span className="h-1.5 w-1.5 rounded-full bg-card" />
          </div>
          <div data-portrait className="hero-portrait">
            <Image
              src="/images/me.png"
              alt="Jerald Dasillo"
              fill
              priority
              sizes="(max-width: 640px) 260px, 360px"
              className="object-contain object-bottom"
            />
          </div>
        </TiltPanel>
      </div>
    </section>
  );
}
