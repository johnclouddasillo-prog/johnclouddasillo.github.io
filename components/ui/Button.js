export default function Button({
  href,
  children,
  variant = "solid",
  className = "",
}) {
  const styles =
    variant === "solid"
      ? "border border-accent bg-accent text-card hover:text-accent"
      : "border border-ink text-ink before:!bg-ink hover:!text-card";

  return (
    <a
      href={href}
      className={`button-slide inline-flex min-h-12 items-center justify-center px-6 font-mono text-[11px] uppercase tracking-[0.12em] ${styles} ${className}`}
    >
      {children}
    </a>
  );
}
