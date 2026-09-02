import { NextResponse } from "next/server";
import { submitContactInquiry } from "@/lib/contact-inquiry-api";
import {
  type ContactFormPayload,
  type ContactFormSource,
} from "@/lib/contact-form-email";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SOURCES = new Set<ContactFormSource>(["contact", "service", "dealer"]);

type ContactRequestBody = Partial<ContactFormPayload> & {
  website?: string;
};

function isValidPayload(body: ContactRequestBody): body is ContactFormPayload {
  return (
    typeof body.name === "string" &&
    body.name.trim().length > 0 &&
    typeof body.company === "string" &&
    body.company.trim().length > 0 &&
    typeof body.email === "string" &&
    EMAIL_PATTERN.test(body.email.trim()) &&
    (body.locale === "cz" || body.locale === "en") &&
    typeof body.source === "string" &&
    SOURCES.has(body.source as ContactFormSource)
  );
}

export async function POST(request: Request) {
  let body: ContactRequestBody;

  try {
    body = (await request.json()) as ContactRequestBody;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (body.website?.trim()) {
    return NextResponse.json({ ok: true });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  const payload: ContactFormPayload = {
    name: body.name.trim(),
    company: body.company.trim(),
    email: body.email.trim(),
    phone: body.phone?.trim() || undefined,
    phoneDialCode: body.phoneDialCode?.trim() || undefined,
    country: body.country?.trim() || undefined,
    message: body.message?.trim() || undefined,
    locale: body.locale,
    source: body.source,
  };

  try {
    const result = await submitContactInquiry(payload);

    if (!result.success) {
      console.error("Contact form inquiry rejected:", result.output);
      return NextResponse.json(
        { ok: false, output: result.output },
        { status: 422 },
      );
    }

    return NextResponse.json({ ok: true, output: result.output });
  } catch (error) {
    console.error("Contact form inquiry failed:", error);
    return NextResponse.json({ error: "submission_failed" }, { status: 500 });
  }
}
