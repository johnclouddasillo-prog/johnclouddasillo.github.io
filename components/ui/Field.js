export default function Field({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  as = "input",
}) {
  const Element = as;
  const props =
    as === "textarea"
      ? { rows: 5 }
      : { type };

  return (
    <label className="block">
      <span className="eyebrow block pb-2 text-card/70">{label}</span>
      <Element
        name={name}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className="w-full border-0 border-b border-card/40 bg-transparent px-0 py-3 text-base text-card outline-none transition-colors focus:border-card"
        {...props}
      />
      {error && (
        <span id={`${name}-error`} className="mt-2 block text-sm text-[#f0a59f]" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}
