import Reveal from "@/components/effects/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";

export default function Work() {
  return (
    <section id="work" className="scroll-mt-[72px] py-24 md:py-32">
      <div className="container-shell">
        <Reveal>
          <SectionTitle
            number="01"
            title="Selected work"
            description="Editing, clips and side projects built around strong moments."
          />
        </Reveal>
        <Reveal className="mt-2">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
