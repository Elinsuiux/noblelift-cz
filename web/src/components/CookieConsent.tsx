"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ACCEPT_ALL_PREFERENCES,
  COOKIE_CONSENT_EVENT,
  DEFAULT_PREFERENCES,
  OPEN_COOKIE_SETTINGS_EVENT,
  type CookiePreferences,
  readCookiePreferences,
  storeCookiePreferences,
} from "@/lib/cookie-consent";

type CategoryKey = "necessary" | "analytics" | "marketing";

const secondaryButtonClassName =
  "rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-center text-xs font-semibold text-zinc-800 transition hover:border-zinc-400 hover:bg-zinc-50 sm:px-4 sm:text-sm";

const acceptAllButtonClassName =
  "w-full rounded-lg bg-noble-orange px-4 py-2.5 text-sm font-bold text-white transition hover:bg-noble-orange-dark";

function CookieActions({
  onReject,
  onSettings,
  onAcceptAll,
  rejectLabel,
  settingsLabel,
  acceptAllLabel,
  className = "",
}: {
  onReject: () => void;
  onSettings: () => void;
  onAcceptAll: () => void;
  rejectLabel: string;
  settingsLabel: string;
  acceptAllLabel: string;
  className?: string;
}) {
  return (
    <div className={`flex w-full flex-col gap-2 sm:w-72 lg:w-80 ${className}`}>
      <div className="grid grid-cols-2 gap-2">
        <button type="button" onClick={onReject} className={secondaryButtonClassName}>
          {rejectLabel}
        </button>
        <button type="button" onClick={onSettings} className={secondaryButtonClassName}>
          {settingsLabel}
        </button>
      </div>
      <button type="button" onClick={onAcceptAll} className={acceptAllButtonClassName}>
        {acceptAllLabel}
      </button>
    </div>
  );
}

function SettingsActions({
  onEssentialOnly,
  onSave,
  onAcceptAll,
  essentialOnlyLabel,
  saveLabel,
  acceptAllLabel,
}: {
  onEssentialOnly: () => void;
  onSave: () => void;
  onAcceptAll: () => void;
  essentialOnlyLabel: string;
  saveLabel: string;
  acceptAllLabel: string;
}) {
  return (
    <div className="mt-6 flex flex-col gap-2">
      <div className="grid grid-cols-2 gap-2">
        <button type="button" onClick={onEssentialOnly} className={secondaryButtonClassName}>
          {essentialOnlyLabel}
        </button>
        <button type="button" onClick={onSave} className={secondaryButtonClassName}>
          {saveLabel}
        </button>
      </div>
      <button type="button" onClick={onAcceptAll} className={acceptAllButtonClassName}>
        {acceptAllLabel}
      </button>
    </div>
  );
}

function Toggle({
  checked,
  locked,
  onChange,
  label,
  alwaysActiveLabel,
}: {
  checked: boolean;
  locked?: boolean;
  onChange?: (checked: boolean) => void;
  label: string;
  alwaysActiveLabel?: string;
}) {
  if (locked) {
    return (
      <div className="flex shrink-0 flex-col items-end gap-1.5" aria-label={label}>
        <div className="relative inline-flex h-6 w-11 items-center" aria-hidden>
          <span className="h-6 w-11 rounded-full bg-noble-orange" />
          <span className="absolute right-0.5 h-5 w-5 rounded-full bg-white shadow" />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wide text-noble-orange">
          {alwaysActiveLabel}
        </span>
      </div>
    );
  }

  return (
    <label className="flex cursor-pointer items-center gap-3">
      <span className="relative inline-flex h-6 w-11 shrink-0 items-center">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={(event) => onChange?.(event.target.checked)}
          aria-label={label}
        />
        <span className="h-6 w-11 rounded-full bg-zinc-300 transition peer-checked:bg-noble-orange" />
        <span className="absolute left-0.5 h-5 w-5 rounded-full bg-white shadow transition peer-checked:translate-x-5" />
      </span>
    </label>
  );
}

export function CookieConsent() {
  const t = useTranslations("cookieBanner");
  const [bannerVisible, setBannerVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [draft, setDraft] = useState<CookiePreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    const existing = readCookiePreferences();
    setBannerVisible(existing === null);
    if (existing) {
      setDraft(existing);
    }
  }, []);

  useEffect(() => {
    const openSettings = () => {
      const existing = readCookiePreferences() ?? DEFAULT_PREFERENCES;
      setDraft(existing);
      setSettingsOpen(true);
      setBannerVisible(false);
    };

    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
  }, []);

  const savePreferences = (preferences: CookiePreferences) => {
    storeCookiePreferences(preferences);
    setDraft(preferences);
    setBannerVisible(false);
    setSettingsOpen(false);
  };

  const updateCategory = (key: CategoryKey, enabled: boolean) => {
    if (key === "necessary") {
      return;
    }

    setDraft((current) => ({
      ...current,
      [key]: enabled,
    }));
  };

  if (!bannerVisible && !settingsOpen) {
    return null;
  }

  const categories: Array<{
    key: CategoryKey;
    locked?: boolean;
  }> = [
    { key: "necessary", locked: true },
    { key: "analytics" },
    { key: "marketing" },
  ];

  return (
    <>
      {bannerVisible && (
        <div
          className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-200 bg-white p-4 shadow-2xl md:p-6"
          role="dialog"
          aria-labelledby="cookie-banner-title"
          aria-describedby="cookie-banner-desc"
        >
          <div className="mx-auto flex w-full max-w-[1140px] flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h2 id="cookie-banner-title" className="text-sm font-bold text-zinc-900 md:text-base">
                {t("title")}
              </h2>
              <p id="cookie-banner-desc" className="mt-2 text-sm leading-relaxed text-zinc-600">
                {t("description")}{" "}
                <Link href="/cookies" className="font-medium text-noble-orange hover:underline">
                  {t("more")}
                </Link>
              </p>
            </div>
            <CookieActions
              rejectLabel={t("rejectAll")}
              settingsLabel={t("settings")}
              acceptAllLabel={t("acceptAll")}
              onReject={() => savePreferences(DEFAULT_PREFERENCES)}
              onSettings={() => {
                setDraft(readCookiePreferences() ?? DEFAULT_PREFERENCES);
                setSettingsOpen(true);
              }}
              onAcceptAll={() => savePreferences(ACCEPT_ALL_PREFERENCES)}
            />
          </div>
        </div>
      )}

      {settingsOpen && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 p-4 sm:items-center">
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
            role="dialog"
            aria-labelledby="cookie-settings-title"
            aria-modal="true"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="cookie-settings-title" className="text-lg font-bold text-zinc-900">
                  {t("settingsTitle")}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{t("settingsIntro")}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const hasConsent = readCookiePreferences() !== null;
                  setSettingsOpen(false);
                  if (!hasConsent) {
                    setBannerVisible(true);
                  }
                }}
                className="rounded-lg px-2 py-1 text-2xl leading-none text-zinc-400 hover:text-zinc-700"
                aria-label={t("close")}
              >
                ×
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {categories.map(({ key, locked }) => {
                const enabled = key === "necessary" ? true : draft[key];

                return (
                  <div
                    key={key}
                    className="rounded-xl border border-zinc-200 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-sm font-bold text-zinc-900">{t(`categories.${key}.title`)}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-zinc-600">
                          {t(`categories.${key}.description`)}
                        </p>
                      </div>
                      <Toggle
                        checked={enabled}
                        locked={locked}
                        onChange={(value) => updateCategory(key, value)}
                        label={t(`categories.${key}.title`)}
                        alwaysActiveLabel={
                          locked ? t("categories.necessary.alwaysActive") : undefined
                        }
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <SettingsActions
              essentialOnlyLabel={t("essentialOnly")}
              saveLabel={t("save")}
              acceptAllLabel={t("acceptAll")}
              onEssentialOnly={() => savePreferences(DEFAULT_PREFERENCES)}
              onSave={() => savePreferences(draft)}
              onAcceptAll={() => savePreferences(ACCEPT_ALL_PREFERENCES)}
            />

            <p className="mt-4 text-xs text-zinc-500">
              <Link href="/cookies" className="text-noble-orange hover:underline">
                {t("more")}
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export function useCookieConsentListener(onChange: (preferences: CookiePreferences) => void) {
  useEffect(() => {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<CookiePreferences>;
      onChange(customEvent.detail);
    };

    window.addEventListener(COOKIE_CONSENT_EVENT, handler);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, handler);
  }, [onChange]);
}
