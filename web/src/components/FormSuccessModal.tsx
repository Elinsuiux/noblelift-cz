"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

export function FormSuccessModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("form.success");

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label={t("close")}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="form-success-title"
        className="relative w-full max-w-md rounded-2xl bg-white px-8 py-10 text-center shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-400 transition hover:text-zinc-700"
          aria-label={t("close")}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
            <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-noble-orange">
          <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8 text-white" aria-hidden>
            <path
              d="M20 6 9 17l-5-5"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h2
          id="form-success-title"
          className="mt-6 text-lg font-bold uppercase tracking-wide text-zinc-900 md:text-xl"
        >
          {t("title")}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-zinc-600">{t("body")}</p>
        <p className="mt-1 text-sm leading-relaxed text-zinc-600">{t("bodyFollowUp")}</p>
      </div>
    </div>
  );
}
