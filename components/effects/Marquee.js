import { skills } from "@/data/skills";

export default function Marquee() {
  const repeated = [...skills, ...skills];
  return (
    <div className="overflow-hidden border-y border-ink/15 bg-card py-4" aria-label="Skills">
      <div className="marquee-track">
        {repeated.map((skill, index) => (
          <div
            key={`${skill}-${index}`}
            className="flex shrink-0 items-center font-mono text-[11px] uppercase tracking-[0.18em]"
          >
            <span className="px-8">{skill}</span>
            <span className="text-accent" aria-hidden="true">●</span>
          </div>
        ))}
      </div>
    </div>
  );
}
