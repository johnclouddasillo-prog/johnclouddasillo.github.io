import Reveal from "@/components/effects/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import { site } from "@/data/site";

const focusPoints = [
  "Short-form video editing and pacing",
  "Game mechanics, concepts and world-building",
  "Early 3D modeling with Blockbench",
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-[72px] py-24 md:py-32">
      <div className="container-shell">
        <Reveal>
          <SectionTitle
            number="02"
            title="About"
            description="A little context on how I work and what I care about."
          />
        </Reveal>
        <Reveal className="mt-12 grid gap-12 md:grid-cols-[1fr_390px]">
          <p className="max-w-[820px] text-justify font-serif text-[clamp(42px,5.5vw,72px)] leading-[1.02] tracking-[-0.035em] [text-wrap:balance]">
            {site.bio}
          </p>
          <div>
            {focusPoints.map((point) => (
              <div
                key={point}
                className="border-t border-ink/20 py-5 text-sm leading-6 first:border-t-0 first:pt-0"
              >
                {point}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
