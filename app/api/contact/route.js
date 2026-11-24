import { Resend } from "resend";
import { site } from "@/data/site";

export async function POST(request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !message) {
      return Response.json(
        { error: "Name, email and project message are required." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return Response.json({ fallback: true });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const result = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [site.email],
      replyTo: email,
      subject: `Project enquiry from ${name}`,
      text: `${message}\n\nFrom: ${name}\nEmail: ${email}`,
    });

    if (result.error) {
      return Response.json(
        { error: "The email service could not send your message." },
        { status: 502 }
      );
    }

    return Response.json({ success: true });
  } catch {
    return Response.json(
      { error: "Unable to process your message." },
      { status: 500 }
    );
  }
}
