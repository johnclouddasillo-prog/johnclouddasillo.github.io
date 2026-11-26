import Reveal from "@/components/effects/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import ProjectCard from "@/components/ui/ProjectCard";
import ClipHighlights from "@/components/sections/ClipHighlights";
import { projects } from "@/data/projects";
import { roles } from "@/data/roles";

export default function Work({ activeRole = roles[0].id }) {
  const selectedRole = roles.find((role) => role.id === activeRole) || roles[0];
  const selectedProjects = projects.filter((project) =>
    selectedRole.projectIds.includes(project.id)
  );

  return (
    <section id="work" className="scroll-mt-[72px] py-24 md:py-32">
      <div className="container-shell">
        <Reveal>
          <SectionTitle
            number="01"
            title={selectedRole.label}
            description={`Selected work across ${selectedRole.label.toLowerCase()} projects.`}
          />
        </Reveal>
        <Reveal className="mt-2">
          {selectedRole.id === "clipper" ? (
            <ClipHighlights />
          ) : (
            selectedProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))
          )}
          {selectedProjects.length === 0 && (
            <div className="work-in-progress">
              <span className="eyebrow text-accent">In progress</span>
              <p>More selected work in this practice is being prepared for the portfolio.</p>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
