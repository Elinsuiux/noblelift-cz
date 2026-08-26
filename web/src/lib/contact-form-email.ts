import { Resend } from "resend";
import { CONTACT, BILLING } from "@/lib/contact";
import { getCountryByCode, getCountryName, type LocaleKey } from "@/lib/countries";

export type ContactFormSource = "contact" | "service" | "dealer";

export type ContactFormPayload = {
  name: string;
  company: string;
  email: string;
  phone?: string;
  phoneDialCode?: string;
  country?: string;
  message?: string;
  locale: LocaleKey;
  source: ContactFormSource;
};

const ORANGE = "#ee4411";
const DARK = "#1a1a1a";
const MUTED = "#6b7280";
const SURFACE_MUTED = "#f5f5f5";

const COPY = {
  cz: {
    clientSubject: "Děkujeme za vaši poptávku – Noblelift",
    internalSubject: (source: string) => `Nová poptávka: ${source}`,
    title: "Děkujeme — poptávku máme",
    greeting: (name: string) => `Dobrý den, ${name},`,
    body: "děkujeme, že jste nás kontaktovali. Vaši zprávu jsme v pořádku přijali a předali obchodnímu týmu.",
    bodyFollowUp:
      "Ozveme se vám co nejdříve — obvykle do 1 pracovního dne. Pokud je věc urgentní, volejte nás na čísle níže.",
    summaryTitle: "Shrnutí vaší poptávky",
    ctaLabel: "Prohlédnout produkty Noblelift",
    ctaSecondary: "noblelift.cz",
    fields: {
      name: "Jméno a příjmení",
      company: "Společnost",
      email: "E-mail",
      phone: "Telefon",
      country: "Země",
      message: "Zpráva",
      source: "Zdroj",
    },
    footer:
      "Tento e-mail je automatické potvrzení z webu noblelift.cz. Pokud jste formulář neodesílali, zprávu prosím ignorujte.",
    internalIntro: "Byla přijata nová poptávka z webového formuláře.",
    sources: {
      contact: "Kontaktní formulář",
      service: "Servisní poptávka",
      dealer: "Dealerská poptávka",
    },
  },
  en: {
    clientSubject: "Thank you for your inquiry – Noblelift",
    internalSubject: (source: string) => `New inquiry: ${source}`,
    title: "Thank you — we have your request",
    greeting: (name: string) => `Hello ${name},`,
    body: "thank you for contacting us. We have received your message and passed it to our sales team.",
    bodyFollowUp:
      "We will get back to you as soon as possible — usually within 1 business day. For urgent matters, please call the number below.",
    summaryTitle: "Your inquiry summary",
    ctaLabel: "Browse Noblelift products",
    ctaSecondary: "noblelift.cz",
    fields: {
      name: "Name",
      company: "Company",
      email: "Email",
      phone: "Phone",
      country: "Country",
      message: "Message",
      source: "Source",
    },
    footer:
      "This is an automatic confirmation from noblelift.cz. If you did not submit the form, you can ignore this message.",
    internalIntro: "A new inquiry was submitted via the website form.",
    sources: {
      contact: "Contact form",
      service: "Service inquiry",
      dealer: "Dealer inquiry",
    },
  },
} as const;

function siteOrigin(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (explicit) return explicit;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return CONTACT.websiteUrl.replace(/\/$/, "");
}

function logoUrl(): string {
  return `${siteOrigin()}/logo/noblelift-wordmark-white-trim.png`;
}

function productsUrl(locale: LocaleKey): string {
  return locale === "en" ? `${siteOrigin()}/en/products` : `${siteOrigin()}/cz/produkty`;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatPhone(payload: ContactFormPayload): string | undefined {
  const phone = payload.phone?.trim();
  if (!phone) {
    return undefined;
  }
  const dialCode = payload.phoneDialCode?.trim();
  return dialCode ? `${dialCode} ${phone}` : phone;
}

function formatCountry(payload: ContactFormPayload): string | undefined {
  if (!payload.country) {
    return undefined;
  }
  const country = getCountryByCode(payload.country);
  if (!country) {
    return payload.country;
  }
  return getCountryName(country, payload.locale);
}

function buildSummaryRows(payload: ContactFormPayload, includeSource = false): string {
  const copy = COPY[payload.locale];
  const rows: Array<{ label: string; value: string }> = [
    { label: copy.fields.name, value: payload.name },
    { label: copy.fields.company, value: payload.company },
    { label: copy.fields.email, value: payload.email },
  ];

  const phone = formatPhone(payload);
  if (phone) {
    rows.push({ label: copy.fields.phone, value: phone });
  }

  const country = formatCountry(payload);
  if (country) {
    rows.push({ label: copy.fields.country, value: country });
  }

  if (payload.message?.trim()) {
    rows.push({ label: copy.fields.message, value: payload.message.trim() });
  }

  if (includeSource) {
    rows.push({
      label: copy.fields.source,
      value: copy.sources[payload.source],
    });
  }

  return rows
    .map(
      (row) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;color:${MUTED};font-size:13px;vertical-align:top;width:38%;">
            ${escapeHtml(row.label)}
          </td>
          <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;color:${DARK};font-size:14px;vertical-align:top;">
            ${escapeHtml(row.value).replaceAll("\n", "<br />")}
          </td>
        </tr>`,
    )
    .join("");
}

function emailShell(content: string): string {
  return `<!DOCTYPE html>
<html lang="cs">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Noblelift</title>
  </head>
  <body style="margin:0;padding:0;background:${SURFACE_MUTED};font-family:Inter,Arial,sans-serif;color:${DARK};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${SURFACE_MUTED};">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">
            ${content}
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function emailHeader(): string {
  return `
    <tr>
      <td style="background:${DARK};padding:28px 32px 22px;text-align:center;">
        <img
          src="${logoUrl()}"
          alt="Noblelift"
          width="180"
          height="18"
          style="display:block;margin:0 auto;width:180px;height:auto;border:0;"
        />
        <div style="margin-top:10px;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#a1a1aa;">
          VZV GROUP s.r.o.
        </div>
      </td>
    </tr>
    <tr>
      <td style="height:4px;line-height:4px;font-size:0;background:${ORANGE};">&nbsp;</td>
    </tr>`;
}

function emailFooter(locale: LocaleKey): string {
  const copy = COPY[locale];
  return `
    <tr>
      <td style="padding:24px 32px 32px;background:${SURFACE_MUTED};text-align:center;">
        <p style="margin:0 0 12px;font-size:12px;line-height:1.6;color:${MUTED};">${copy.footer}</p>
        <p style="margin:0;font-size:12px;line-height:1.6;color:${MUTED};">
          <strong style="color:${DARK};">${escapeHtml(BILLING.company)}</strong><br />
          ${escapeHtml(BILLING.addressLine1)}, ${escapeHtml(BILLING.addressLine2)}, ${escapeHtml(BILLING.addressLine3)}<br />
          <a href="mailto:${CONTACT.email}" style="color:${ORANGE};text-decoration:none;">${escapeHtml(CONTACT.email)}</a>
          ·
          <a href="tel:${CONTACT.phone}" style="color:${ORANGE};text-decoration:none;">${escapeHtml(CONTACT.phoneDisplay)}</a><br />
          <a href="${CONTACT.websiteUrl}" style="color:${ORANGE};text-decoration:none;">${escapeHtml(CONTACT.website)}</a>
        </p>
      </td>
    </tr>`;
}

export function buildClientConfirmationEmail(payload: ContactFormPayload): {
  subject: string;
  html: string;
  text: string;
} {
  const copy = COPY[payload.locale];
  const firstName = payload.name.trim().split(/\s+/)[0] || payload.name;

  const catalogUrl = productsUrl(payload.locale);

  const html = emailShell(`
    ${emailHeader()}
    <tr>
      <td style="padding:36px 32px 12px;text-align:center;">
        <div style="display:inline-block;width:56px;height:56px;border-radius:9999px;background:${ORANGE};line-height:56px;text-align:center;">
          <span style="color:#ffffff;font-size:26px;font-weight:700;">&#10003;</span>
        </div>
        <h1 style="margin:20px 0 0;font-size:22px;font-weight:800;letter-spacing:0.02em;color:${DARK};">
          ${copy.title}
        </h1>
        <p style="margin:18px 0 0;font-size:15px;line-height:1.7;color:${DARK};">${copy.greeting(firstName)}</p>
        <p style="margin:10px 0 0;font-size:14px;line-height:1.7;color:${MUTED};">${copy.body}</p>
        <p style="margin:8px 0 0;font-size:14px;line-height:1.7;color:${MUTED};">${copy.bodyFollowUp}</p>
      </td>
    </tr>
    <tr>
      <td style="padding:20px 32px 8px;">
        <div style="border-radius:12px;border:1px solid #e5e7eb;background:${SURFACE_MUTED};padding:20px 24px;">
          <h2 style="margin:0 0 12px;font-size:12px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:${ORANGE};">
            ${copy.summaryTitle}
          </h2>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${buildSummaryRows(payload)}
          </table>
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding:24px 32px 8px;text-align:center;">
        <a href="${catalogUrl}"
           style="display:inline-block;background:${ORANGE};color:#ffffff;text-decoration:none;font-size:14px;font-weight:800;padding:14px 28px;border-radius:9999px;">
          ${copy.ctaLabel}
        </a>
        <div style="margin-top:14px;">
          <a href="${CONTACT.websiteUrl}" style="font-size:13px;font-weight:700;color:${ORANGE};text-decoration:none;">
            ${copy.ctaSecondary} →
          </a>
        </div>
      </td>
    </tr>
    ${emailFooter(payload.locale)}
  `);

  const text = [
    copy.title,
    "",
    copy.greeting(firstName),
    copy.body,
    copy.bodyFollowUp,
    "",
    copy.summaryTitle,
    `${copy.fields.name}: ${payload.name}`,
    `${copy.fields.company}: ${payload.company}`,
    `${copy.fields.email}: ${payload.email}`,
    formatPhone(payload) ? `${copy.fields.phone}: ${formatPhone(payload)}` : null,
    formatCountry(payload) ? `${copy.fields.country}: ${formatCountry(payload)}` : null,
    payload.message?.trim() ? `${copy.fields.message}: ${payload.message.trim()}` : null,
    "",
    `${copy.ctaLabel}: ${catalogUrl}`,
    CONTACT.websiteUrl,
    "",
    copy.footer,
  ]
    .filter(Boolean)
    .join("\n");

  return {
    subject: copy.clientSubject,
    html,
    text,
  };
}

export function buildInternalNotificationEmail(payload: ContactFormPayload): {
  subject: string;
  html: string;
  text: string;
} {
  const copy = COPY[payload.locale];
  const sourceLabel = copy.sources[payload.source];

  const html = emailShell(`
    ${emailHeader()}
    <tr>
      <td style="padding:32px;">
        <h1 style="margin:0 0 12px;font-size:18px;font-weight:800;color:${DARK};">${copy.internalSubject(sourceLabel)}</h1>
        <p style="margin:0 0 24px;font-size:14px;line-height:1.7;color:${MUTED};">${copy.internalIntro}</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${buildSummaryRows(payload, true)}
        </table>
      </td>
    </tr>
    ${emailFooter(payload.locale)}
  `);

  const text = [
    copy.internalSubject(sourceLabel),
    "",
    copy.internalIntro,
    "",
    `${copy.fields.name}: ${payload.name}`,
    `${copy.fields.company}: ${payload.company}`,
    `${copy.fields.email}: ${payload.email}`,
    formatPhone(payload) ? `${copy.fields.phone}: ${formatPhone(payload)}` : null,
    formatCountry(payload) ? `${copy.fields.country}: ${formatCountry(payload)}` : null,
    payload.message?.trim() ? `${copy.fields.message}: ${payload.message.trim()}` : null,
    `${copy.fields.source}: ${sourceLabel}`,
  ]
    .filter(Boolean)
    .join("\n");

  return {
    subject: copy.internalSubject(sourceLabel),
    html,
    text,
  };
}

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new Resend(apiKey);
}

function getFromAddress(): string {
  return process.env.CONTACT_EMAIL_FROM ?? `Noblelift <${CONTACT.email}>`;
}

function getInternalRecipient(): string {
  return process.env.CONTACT_EMAIL_TO ?? CONTACT.email;
}

export async function sendContactFormEmails(payload: ContactFormPayload): Promise<void> {
  const resend = getResendClient();
  if (!resend) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[contact-form] RESEND_API_KEY is missing – emails were not sent. Add it to web/.env.local to enable sending.",
      );
      console.info("[contact-form] Submission payload:", payload);
      return;
    }
    throw new Error("RESEND_API_KEY is not configured");
  }

  const from = getFromAddress();
  const clientEmail = buildClientConfirmationEmail(payload);
  const internalEmail = buildInternalNotificationEmail(payload);

  const [clientResult, internalResult] = await Promise.all([
    resend.emails.send({
      from,
      to: payload.email,
      replyTo: CONTACT.email,
      subject: clientEmail.subject,
      html: clientEmail.html,
      text: clientEmail.text,
    }),
    resend.emails.send({
      from,
      to: getInternalRecipient(),
      replyTo: payload.email,
      subject: internalEmail.subject,
      html: internalEmail.html,
      text: internalEmail.text,
    }),
  ]);

  if (clientResult.error) {
    throw new Error(clientResult.error.message);
  }

  if (internalResult.error) {
    throw new Error(internalResult.error.message);
  }
}
