import Image from "next/image";

export default function ProjectCard({ project }) {
  return (
    <article className="project-row grid gap-7 py-10 md:grid-cols-[minmax(280px,0.9fr)_minmax(320px,1.1fr)] md:items-center">
      <div className="relative mx-auto aspect-[9/16] w-full max-w-[360px] overflow-hidden border border-ink/15 bg-ink md:mx-0">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="project-image object-cover"
          />
        ) : (
          <div className="project-image absolute inset-0 flex items-center justify-center bg-[#ded5c5]">
            <span className="eyebrow text-muted/70">Image placeholder</span>
          </div>
        )}
      </div>

      <div>
        <p className="eyebrow mb-4 text-accent">{project.tag}</p>
        <h3 className="font-serif text-[clamp(44px,5vw,68px)] leading-none tracking-[-0.03em]">
          {project.title}
        </h3>
        <p className="mt-5 max-w-xl text-sm leading-7 text-muted">{project.desc}</p>
        {project.links?.length > 0 && (
          <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  link.highlighted
                    ? "inline-flex min-h-10 items-center border border-accent bg-accent px-4 font-mono text-[10px] uppercase tracking-[0.12em] text-card transition-colors hover:bg-transparent hover:text-accent"
                    : "text-link font-mono text-[10px] uppercase tracking-[0.12em]"
                }
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
