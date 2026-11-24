export default function SectionTitle({ number, title, description }) {
  return (
    <div className="border-b border-ink/20 pb-7">
      <div className="grid gap-6 md:grid-cols-[1fr_280px] md:items-end">
        <div>
          <p className="eyebrow mb-4 text-accent">{number}</p>
          <h2 className="font-serif text-[clamp(58px,7vw,96px)] leading-[0.88] tracking-[-0.04em]">
            {title}
          </h2>
        </div>
        <p className="max-w-[280px] text-sm leading-6 text-muted">{description}</p>
      </div>
    </div>
  );
}
