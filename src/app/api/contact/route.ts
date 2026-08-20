import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name (min 2 characters).").max(80),
  email: z.string().trim().email("Please enter a valid email address."),
  subject: z.string().trim().min(3, "Subject should be at least 3 characters.").max(120),
  message: z.string().trim().min(10, "Message should be at least 10 characters.").max(2000),
  // simple honeypot
  website: z.string().max(0, "Spam detected.").optional(),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { error: first?.message ?? "Please check the form fields.", field: first?.path[0] },
      { status: 422 }
    );
  }

  const { name, email, subject, message } = parsed.data;

  try {
    await db.message.create({
      data: { name, email, subject, message },
    });
  } catch {
    // DB not available — still acknowledge gracefully so the UX holds
    // but mark as not persisted.
    return NextResponse.json(
      { ok: true, persisted: false, message: "Message received. I'll get back to you soon." },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { ok: true, persisted: true, message: "Thanks for reaching out — I'll reply within 1–2 days." },
    { status: 200 }
  );
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST." },
    { status: 405 }
  );
}
