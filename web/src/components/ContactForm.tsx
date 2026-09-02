"use client";

import { type FormEvent, type ReactNode, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PhoneIcon } from "@/components/PhoneIcon";
import { CountryField, PhoneField } from "@/components/FormCountryFields";
import { FormSuccessModal } from "@/components/FormSuccessModal";
import { CONTACT } from "@/lib/contact";
import type { ContactFormSource } from "@/lib/contact-form-email";

const inputBase =
  "w-full rounded-lg border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-noble-orange focus:ring-2 focus:ring-noble-orange/20";

const labelClassName =
  "mb-1.5 block text-xs font-medium uppercase tracking-wide text-zinc-500";

function RequiredLabel({ children }: { children: ReactNode }) {
  return (
    <span className={labelClassName}>
      {children}
      <span className="text-noble-orange" aria-hidden>
        {" "}
        *
      </span>
    </span>
  );
}

type ContactFormProps = {
  variant?: "card" | "plain";
  source?: ContactFormSource;
  messageRows?: number;
  messagePlaceholder?: string;
  defaultMessage?: string;
  showCountry?: boolean;
  showPhone?: boolean;
  showOrCall?: boolean;
  lightFields?: boolean;
};

export function ContactForm({
  variant = "card",
  source = "contact",
  messageRows = 4,
  messagePlaceholder,
  defaultMessage,
  showCountry = true,
  showPhone = true,
  showOrCall = false,
  lightFields = false,
}: ContactFormProps) {
  const t = useTranslations();
  const locale = useLocale();
  const [successOpen, setSuccessOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const fieldClassName = `${inputBase} ${lightFields ? "bg-white" : "bg-zinc-50"}`;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;

    if (!formElement.reportValidity()) {
      return;
    }

    setSubmitError(false);
    setIsSubmitting(true);

    const formData = new FormData(formElement);
    const payload = {
      name: String(formData.get("name") ?? ""),
      company: String(formData.get("company") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      phoneDialCode: String(formData.get("phoneDialCode") ?? ""),
      country: String(formData.get("country") ?? ""),
      message: String(formData.get("message") ?? ""),
      website: String(formData.get("website") ?? ""),
      locale,
      source,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("submit_failed");
      }

      formElement.reset();
      setSuccessOpen(true);
    } catch {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const form = (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />
      <label className="block">
        <RequiredLabel>{t("form.name")}</RequiredLabel>
        <input
          name="name"
          autoComplete="name"
          placeholder={t("form.namePlaceholder")}
          className={fieldClassName}
          required
          suppressHydrationWarning
        />
      </label>
      <label className="block">
        <RequiredLabel>{t("form.company")}</RequiredLabel>
        <input
          name="company"
          autoComplete="organization"
          placeholder={t("form.companyPlaceholder")}
          className={fieldClassName}
          required
          suppressHydrationWarning
        />
      </label>
      <label className="block">
        <RequiredLabel>{t("form.email")}</RequiredLabel>
        <input
          name="email"
          type="email"
          autoComplete="email"
          placeholder={t("form.emailPlaceholder")}
          className={fieldClassName}
          required
          suppressHydrationWarning
        />
      </label>
      {showPhone && <PhoneField lightFields={lightFields} required />}
      {showCountry && <CountryField lightFields={lightFields} required />}
      <label className="block">
        <span className={labelClassName}>{t("form.message")}</span>
        <textarea
          name="message"
          rows={messageRows}
          defaultValue={defaultMessage}
          placeholder={messagePlaceholder ?? t("form.messagePlaceholder")}
          className={`${fieldClassName} resize-y`}
        />
      </label>
      {submitError && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-700" role="alert">
          {t("form.error")}
        </p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-noble-orange py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-noble-orange-dark disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? t("form.sending") : t("form.send")}
      </button>
      {showOrCall && (
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 pt-1 text-sm text-zinc-600">
          <span className="inline-flex items-center gap-2">
            <span className="text-noble-orange">
              <PhoneIcon />
            </span>
            {t("form.orCall")}
          </span>
          <a
            href={`tel:${CONTACT.phone}`}
            className="font-bold text-zinc-900 hover:text-noble-orange"
          >
            {CONTACT.phoneDisplay}
          </a>
        </div>
      )}
      <p className="text-center text-xs text-zinc-500">
        {t.rich("form.fine", {
          privacy: (chunks) => (
            <Link href="/privacy" className="text-noble-orange hover:underline">
              {chunks}
            </Link>
          ),
        })}
      </p>
    </form>
  );

  if (variant === "plain") {
    return (
      <>
        {form}
        <FormSuccessModal open={successOpen} onClose={() => setSuccessOpen(false)} />
      </>
    );
  }

  return (
    <div className="rounded-2xl border border-zinc-100 bg-white p-8 shadow-xl">
      {form}
      <FormSuccessModal open={successOpen} onClose={() => setSuccessOpen(false)} />
    </div>
  );
}
