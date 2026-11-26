import Reveal from "@/components/effects/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import { skills } from "@/data/skills";

export default function Skills() {
  const slots = Array.from({ length: 9 }, (_, index) => skills[index] || "");

  return (
    <section id="skills" className="scroll-mt-[72px] py-24 md:py-32">
      <div className="container-shell">
        <Reveal>
          <SectionTitle
            number="03"
            title="Skills"
            description="Tools and disciplines behind my videos, game projects, concepts and models."
          />
        </Reveal>
        <Reveal className="mt-10 grid grid-cols-3 gap-3 md:grid-cols-9">
          {slots.map((skill, index) => (
            <div
              key={`${skill || "empty"}-${index}`}
              className="aspect-square border border-ink/20 p-3 md:p-4"
            >
              {skill && (
                <span className="flex h-full items-end font-mono text-[9px] uppercase leading-4 tracking-[0.12em]">
                  {skill}
                </span>
              )}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
