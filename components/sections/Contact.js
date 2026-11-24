"use client";

import { useState } from "react";
import Reveal from "@/components/effects/Reveal";
import Field from "@/components/ui/Field";
import { site } from "@/data/site";

const initialForm = { name: "", email: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const update = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: "" }));
    }
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Please enter your name.";
    if (!form.email.trim()) {
      nextErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!form.message.trim()) nextErrors.message = "Please tell me about your project.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.error || "Unable to send your message.");

      if (result.fallback) {
        const subject = encodeURIComponent(`Project enquiry from ${form.name}`);
        const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`);
        window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
        setStatus("success");
      } else {
        setStatus("success");
        setForm(initialForm);
      }
    } catch (error) {
      setStatus("error");
      setErrors((current) => ({
        ...current,
        submit: error.message,
      }));
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setStatus("copied");
    } catch {
      setStatus("error");
      setErrors((current) => ({ ...current, submit: "Could not copy the email address." }));
    }
  };

  return (
    <section id="contact" className="scroll-mt-[72px] bg-ink py-24 text-card md:py-32">
      <div className="container-shell">
        <Reveal>
          <div className="grid gap-12 border-b border-card/20 pb-10 md:grid-cols-[1fr_390px]">
            <h2 className="font-serif text-[clamp(58px,8vw,112px)] leading-[0.88] tracking-[-0.045em]">
              Let&apos;s cut something <span className="text-[#df766d]">new.</span>
            </h2>
            <div className="md:self-end">
              <p className="eyebrow mb-4 text-card/50">Email</p>
              <a
                href={`mailto:${site.email}`}
                className="text-link break-all font-mono text-[12px] tracking-[0.06em]"
              >
                {site.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="mt-5 block font-mono text-[10px] uppercase tracking-[0.12em] text-card/70 hover:text-card"
              >
                {status === "copied" ? "Copied" : "Copy email"}
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-12 grid gap-12 md:grid-cols-[390px_1fr]">
          <div>
            <p className="eyebrow mb-5 text-card/50">Socials</p>
            <div className="flex flex-col items-start">
              {site.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link mt-3 font-mono text-[11px] uppercase tracking-[0.12em]"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <form onSubmit={submit} noValidate className="grid gap-7">
            <div className="grid gap-7 sm:grid-cols-2">
              <Field
                label="Name"
                name="name"
                value={form.name}
                onChange={update}
                error={errors.name}
              />
              <Field
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={update}
                error={errors.email}
              />
            </div>
            <Field
              label="Project"
              name="message"
              as="textarea"
              value={form.message}
              onChange={update}
              error={errors.message}
            />

            {errors.submit && (
              <p className="text-sm text-[#f0a59f]" role="alert">{errors.submit}</p>
            )}
            {status === "success" && (
              <p className="text-sm text-[#d9efcf]" role="status">
                Thanks. Your message is ready.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="button-slide min-h-12 justify-self-start border border-card px-7 font-mono text-[11px] uppercase tracking-[0.12em] text-card hover:!text-ink disabled:opacity-60"
            >
              {status === "loading" ? "Sending..." : "Send message"}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
