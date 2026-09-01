import czMessages from "../../messages/cz.json";
import enMessages from "../../messages/en.json";

type Messages = typeof czMessages;

const messagesByLocale: Record<string, Messages> = {
  cz: czMessages,
  en: enMessages,
};

export function getStaticMessages(locale: string): Messages {
  return messagesByLocale[locale] ?? czMessages;
}

export function getStaticMessage(locale: string, key: string): string {
  const parts = key.split(".");
  let value: unknown = getStaticMessages(locale);

  for (const part of parts) {
    if (value && typeof value === "object" && part in value) {
      value = (value as Record<string, unknown>)[part];
    } else {
      return key;
    }
  }

  return typeof value === "string" ? value : key;
}

export function formatStaticMessage(
  locale: string,
  key: string,
  values: Record<string, string>,
): string {
  let text = getStaticMessage(locale, key);
  for (const [name, value] of Object.entries(values)) {
    text = text.replaceAll(`{${name}}`, value);
  }
  return text;
}
