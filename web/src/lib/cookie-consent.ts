export const CONSENT_STORAGE_KEY = "noblelift-cookie-consent";
export const CONSENT_VERSION = 1;

export type CookieCategory = "analytics" | "marketing";

export type CookiePreferences = {
  version: number;
  analytics: boolean;
  marketing: boolean;
};

export const DEFAULT_PREFERENCES: CookiePreferences = {
  version: CONSENT_VERSION,
  analytics: false,
  marketing: false,
};

export const ACCEPT_ALL_PREFERENCES: CookiePreferences = {
  version: CONSENT_VERSION,
  analytics: true,
  marketing: true,
};

export const OPEN_COOKIE_SETTINGS_EVENT = "noblelift-open-cookie-settings";
export const COOKIE_CONSENT_EVENT = "noblelift-cookie-consent";

function parseLegacyConsent(value: string): CookiePreferences | null {
  if (value === "all") {
    return ACCEPT_ALL_PREFERENCES;
  }

  if (value === "essential") {
    return DEFAULT_PREFERENCES;
  }

  return null;
}

export function readCookiePreferences(): CookiePreferences | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  const legacy = parseLegacyConsent(raw);
  if (legacy) {
    return legacy;
  }

  try {
    const parsed = JSON.parse(raw) as CookiePreferences;
    if (typeof parsed.analytics === "boolean" && typeof parsed.marketing === "boolean") {
      return parsed;
    }
  } catch {
    return null;
  }

  return null;
}

export function storeCookiePreferences(preferences: CookiePreferences) {
  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(preferences));
  window.dispatchEvent(
    new CustomEvent(COOKIE_CONSENT_EVENT, {
      detail: preferences,
    }),
  );
}

export function openCookieSettings() {
  window.dispatchEvent(new CustomEvent(OPEN_COOKIE_SETTINGS_EVENT));
}

export function hasAnalyticsConsent(preferences: CookiePreferences | null = readCookiePreferences()) {
  return preferences?.analytics === true;
}

export function hasMarketingConsent(preferences: CookiePreferences | null = readCookiePreferences()) {
  return preferences?.marketing === true;
}
