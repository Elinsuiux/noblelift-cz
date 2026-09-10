export const GTM_ID = "GTM-MDRSKVHN";
export const GA_MEASUREMENT_ID = "G-GDQC80ZFTD";

export type ConsentModeState = {
  analytics_storage: "granted" | "denied";
  ad_storage: "granted" | "denied";
  ad_user_data: "granted" | "denied";
  ad_personalization: "granted" | "denied";
};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function preferencesToConsentMode(prefs: {
  analytics: boolean;
  marketing: boolean;
}): ConsentModeState {
  const analytics = prefs.analytics ? "granted" : "denied";
  const marketing = prefs.marketing ? "granted" : "denied";
  return {
    analytics_storage: analytics,
    ad_storage: marketing,
    ad_user_data: marketing,
    ad_personalization: marketing,
  };
}

/** Push Consent Mode update (and keep dataLayer in sync for GTM). */
export function updateGoogleConsent(prefs: {
  analytics: boolean;
  marketing: boolean;
}) {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  const consent = preferencesToConsentMode(prefs);

  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", consent);
  } else {
    window.dataLayer.push(["consent", "update", consent]);
  }

  window.dataLayer.push({
    event: "consent_update",
    ...consent,
  });
}
