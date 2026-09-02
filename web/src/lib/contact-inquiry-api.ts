import type { ContactFormPayload } from "@/lib/contact-form-email";

const DEFAULT_INQUIRY_URL =
  "https://rest.vzv.cz/v2/dlGFm98ANq/noblelift-cz/inquiry";

type VzvInquiryResponse = {
  status?: string;
  result?: string;
};

type VzvInquiryResult = {
  vystup?: string;
};

export type ContactInquiryResult = {
  output: string;
  success: boolean;
};

function getInquiryUrl(): string {
  return process.env.VZV_INQUIRY_API_URL?.trim() || DEFAULT_INQUIRY_URL;
}

function formatPhone(payload: ContactFormPayload): string | undefined {
  const phone = payload.phone?.trim();
  if (!phone) {
    return undefined;
  }
  const dialCode = payload.phoneDialCode?.trim();
  return dialCode ? `${dialCode} ${phone}` : phone;
}

function parseVzvOutput(data: VzvInquiryResponse): string {
  if (!data.result) {
    return "";
  }

  try {
    const parsed = JSON.parse(data.result) as VzvInquiryResult;
    return typeof parsed.vystup === "string" ? parsed.vystup.trim() : "";
  } catch {
    return data.result.trim();
  }
}

export async function submitContactInquiry(
  payload: ContactFormPayload,
): Promise<ContactInquiryResult> {
  const body = {
    name: payload.name,
    company: payload.company,
    email: payload.email,
    phone: formatPhone(payload) ?? "",
    country: payload.country ?? "",
    message: payload.message ?? "",
    locale: payload.locale,
    source: payload.source,
  };

  const response = await fetch(getInquiryUrl(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`VZV inquiry API failed (${response.status}): ${text}`);
  }

  const data = (await response.json()) as VzvInquiryResponse;
  const output = parseVzvOutput(data);

  return {
    output,
    success: output === "OK",
  };
}
