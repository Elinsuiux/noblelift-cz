import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

async function loadModule(url) {
  const response = await fetch(url);
  const source = await response.text();
  const transformed = `${source.replace("export default countryTranslations;", "")}
return countryTranslations;`;
  // eslint-disable-next-line no-new-func
  return new Function(transformed)();
}

const NAME_OVERRIDES = {
  AC: { cs: "Ascension", en: "Ascension Island" },
  CZ: { cs: "Česká republika", en: "Czech Republic" },
  SK: { cs: "Slovenská republika", en: "Slovakia" },
  XK: { cs: "Kosovo", en: "Kosovo" },
};

function parseRawCountryData(source) {
  const blocks = source.match(/\[\s*"([a-z]{2})"[\s\S]*?\],/g) ?? [];
  return blocks
    .map((block) => {
      const values = [...block.matchAll(/"([^"]+)"/g)].map((match) => match[1]);
      if (values.length < 2 || !/^\d+$/.test(values[1])) {
        return null;
      }
      return {
        code: values[0].toUpperCase(),
        dialCode: `+${values[1]}`,
      };
    })
    .filter(Boolean);
}

async function main() {
  const [csNames, enNames, dataResponse] = await Promise.all([
    loadModule("https://unpkg.com/intl-tel-input@25.3.1/build/js/i18n/cs/countries.js"),
    loadModule("https://unpkg.com/intl-tel-input@25.3.1/build/js/i18n/en/countries.js"),
    fetch("https://unpkg.com/intl-tel-input@25.3.1/build/js/data.js"),
  ]);

  const dataSource = await dataResponse.text();
  const dialEntries = parseRawCountryData(dataSource);

  const countries = dialEntries.map(({ code, dialCode }) => {
    const key = code.toLowerCase();
    const override = NAME_OVERRIDES[code];
    const cs = override?.cs ?? csNames[key] ?? enNames[key] ?? code;
    const en = override?.en ?? enNames[key] ?? cs;
    return { code, dialCode, names: { cs, en } };
  });

  const unique = new Map();
  for (const country of countries) {
    if (!unique.has(country.code)) {
      unique.set(country.code, country);
    }
  }

  const sorted = [...unique.values()].sort((a, b) => a.code.localeCompare(b.code));

  const prettierOutput = `export type Country = {
  code: string;
  dialCode: string;
  names: {
    cs: string;
    en: string;
  };
};

export const COUNTRIES: Country[] = [
${sorted
  .map(
    (country) =>
      `  { code: ${JSON.stringify(country.code)}, dialCode: ${JSON.stringify(country.dialCode)}, names: { cs: ${JSON.stringify(country.names.cs)}, en: ${JSON.stringify(country.names.en)} } },`,
  )
  .join("\n")}
];

export type LocaleKey = "cs" | "en";

export function flagEmoji(code: string) {
  return code
    .toUpperCase()
    .split("")
    .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join("");
}

export function getCountryName(country: Country, locale: LocaleKey) {
  return country.names[locale];
}

export function sortCountries(locale: LocaleKey) {
  return [...COUNTRIES].sort((a, b) =>
    getCountryName(a, locale).localeCompare(getCountryName(b, locale), locale),
  );
}

export function getCountryByCode(code: string) {
  return COUNTRIES.find((country) => country.code === code);
}

export const DEFAULT_COUNTRY_CODE = "CZ";
`;

  fs.writeFileSync(path.join(root, "src", "lib", "countries.ts"), prettierOutput, "utf8");
  console.log(`Generated ${sorted.length} countries`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
