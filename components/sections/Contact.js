"use client";

import { useState } from "react";
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
    if (errors[name]) setErrors((current) => ({ ...current, [name]: "" }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Please enter your name.";
    if (!form.email.trim()) nextErrors.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!form.message.trim()) nextErrors.message = "Please enter a message.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    setErrors({});
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
      } else {
        setForm(initialForm);
      }
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrors({ submit: error.message });
    }
  };

  return (
    <main className="contact-page">
      <header className="contact-page-header">
        <a href="/" className="contact-back">
          <span aria-hidden="true">←</span> YARDY
        </a>
        <span className="eyebrow">A note to Jerald</span>
      </header>

      <section className="contact-page-content" aria-labelledby="contact-title">
        <div className="contact-page-intro">
          <p className="eyebrow text-accent">Contact / 01</p>
          <h1 id="contact-title">Let&apos;s make<br />something <em>good.</em></h1>
          <p>
            Have a project in mind? Share a few details and I&apos;ll get back to you.
          </p>
          <a className="contact-email-link" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </div>

        <form onSubmit={submit} noValidate className="contact-form">
          <Field label="Your name" name="name" value={form.name} onChange={update} error={errors.name} />
          <Field label="Your email" name="email" type="email" value={form.email} onChange={update} error={errors.email} />
          <Field label="What are you thinking?" name="message" as="textarea" value={form.message} onChange={update} error={errors.message} />
          {errors.submit && <p className="contact-feedback is-error" role="alert">{errors.submit}</p>}
          {status === "success" && (
            <p className="contact-feedback" role="status">Thanks — your message is ready.</p>
          )}
          <button type="submit" className="contact-submit" disabled={status === "loading"}>
            {status === "loading" ? "Sending..." : "Send message"} <span aria-hidden="true">↗</span>
          </button>
        </form>
      </section>

      <footer className="contact-page-footer">
        <span>© 2026 Jerald Dasillo / yardy</span>
        <div>
          {site.socials.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer">
              {social.label}
            </a>
          ))}
        </div>
      </footer>
    </main>
  );
}
