"use client";

import { type ReactNode } from "react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  DEFAULT_COUNTRY_CODE,
  flagEmoji,
  getCountryByCode,
  getCountryName,
  sortCountries,
  type Country,
  type LocaleKey,
} from "@/lib/countries";

type FormDropdownProps = {
  name: string;
  value: string;
  onChange: (code: string) => void;
  showDialCode?: boolean;
  placeholder: string;
  lightFields?: boolean;
  required?: boolean;
  ariaLabel: string;
};

function RequiredFieldLabel({ children }: { children: ReactNode }) {
  return (
    <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-zinc-500">
      {children}
      <span className="text-noble-orange" aria-hidden>
        {" "}
        *
      </span>
    </span>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 text-zinc-400 transition ${open ? "rotate-180" : ""}`}
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 text-zinc-400"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function FormCountryDropdown({
  name,
  value,
  onChange,
  showDialCode = false,
  placeholder,
  lightFields = false,
  ariaLabel,
  required = false,
}: FormDropdownProps) {
  const t = useTranslations();
  const locale = useLocale() as LocaleKey;
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const countries = useMemo(() => sortCountries(locale), [locale]);
  const selected = getCountryByCode(value) ?? getCountryByCode(DEFAULT_COUNTRY_CODE)!;

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return countries;
    }
    return countries.filter((country) => {
      const name = getCountryName(country, locale).toLowerCase();
      return (
        name.includes(normalized) ||
        country.code.toLowerCase().includes(normalized) ||
        country.dialCode.includes(normalized)
      );
    });
  }, [countries, locale, query]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  const selectCountry = (country: Country) => {
    onChange(country.code);
    setOpen(false);
    setQuery("");
  };

  const fieldBg = lightFields ? "bg-white" : "bg-zinc-50";

  return (
    <div ref={rootRef} className="relative">
      <input type="hidden" name={name} value={value} required={required || undefined} />
      <button
        type="button"
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((current) => !current)}
        className={`flex w-full items-center justify-between gap-3 rounded-lg border border-zinc-200 px-4 py-3 text-left text-sm outline-none transition focus:border-noble-orange focus:ring-2 focus:ring-noble-orange/20 ${fieldBg}`}
      >
        <span className="flex min-w-0 items-center gap-2.5">
          {value ? (
            <>
              <span className="text-base leading-none" aria-hidden>
                {flagEmoji(selected.code)}
              </span>
              <span className="truncate text-zinc-900">
                {showDialCode
                  ? `${getCountryName(selected, locale)} (${selected.dialCode})`
                  : getCountryName(selected, locale)}
              </span>
            </>
          ) : (
            <span className="text-zinc-400">{placeholder}</span>
          )}
        </span>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div
          id={listId}
          className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg"
        >
          <div className="border-b border-zinc-100 p-3">
            <label className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2">
              <SearchIcon />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t("form.search")}
                className="w-full bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
              />
            </label>
          </div>
          <ul className="max-h-56 overflow-y-auto py-1">
            {!showDialCode && !required && (
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onChange("");
                    setOpen(false);
                    setQuery("");
                  }}
                  className="flex w-full px-4 py-2.5 text-left text-sm text-zinc-400 transition hover:bg-zinc-50"
                >
                  {placeholder}
                </button>
              </li>
            )}
            {filtered.map((country) => (
              <li key={country.code}>
                <button
                  type="button"
                  onClick={() => selectCountry(country)}
                  className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm transition hover:bg-zinc-50 ${
                    country.code === value
                      ? "bg-zinc-50 font-medium text-zinc-900"
                      : "text-zinc-700"
                  }`}
                >
                  <span className="text-base leading-none" aria-hidden>
                    {flagEmoji(country.code)}
                  </span>
                  <span className="min-w-0 flex-1 truncate">
                    {getCountryName(country, locale)}
                  </span>
                  {showDialCode && (
                    <span className="shrink-0 text-zinc-500">{country.dialCode}</span>
                  )}
                </button>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-4 py-3 text-sm text-zinc-500">{t("form.noResults")}</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

type PhoneFieldProps = {
  lightFields?: boolean;
  required?: boolean;
};

export function PhoneField({ lightFields = false, required = false }: PhoneFieldProps) {
  const t = useTranslations();
  const locale = useLocale() as LocaleKey;
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [dialCountryCode, setDialCountryCode] = useState(DEFAULT_COUNTRY_CODE);

  const countries = useMemo(() => sortCountries(locale), [locale]);
  const selected =
    getCountryByCode(dialCountryCode) ?? getCountryByCode(DEFAULT_COUNTRY_CODE)!;

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return countries;
    }
    return countries.filter((country) => {
      const name = getCountryName(country, locale).toLowerCase();
      return (
        name.includes(normalized) ||
        country.code.toLowerCase().includes(normalized) ||
        country.dialCode.includes(normalized)
      );
    });
  }, [countries, locale, query]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  const fieldBg = lightFields ? "bg-white" : "bg-zinc-50";
  const inputClassName = `min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400`;

  return (
    <div>
      {required ? (
        <RequiredFieldLabel>{t("form.phone")}</RequiredFieldLabel>
      ) : (
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-zinc-500">
          {t("form.phone")}
        </span>
      )}
      <div
        ref={rootRef}
        className={`relative flex overflow-visible rounded-lg border border-zinc-200 transition focus-within:border-noble-orange focus-within:ring-2 focus-within:ring-noble-orange/20 ${fieldBg}`}
      >
        <input type="hidden" name="phoneDialCode" value={selected.dialCode} />
        <button
          type="button"
          aria-label={t("form.phoneDialCode")}
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => setOpen((current) => !current)}
          className="flex shrink-0 items-center gap-2 border-r border-zinc-200 px-3 py-3 text-sm text-zinc-900 transition hover:bg-zinc-100/70"
        >
          <span className="text-base leading-none" aria-hidden>
            {flagEmoji(selected.code)}
          </span>
          <span className="font-medium">{selected.dialCode}</span>
          <ChevronIcon open={open} />
        </button>
        <input
          name="phone"
          type="tel"
          autoComplete="tel-national"
          placeholder={t("form.phonePlaceholder")}
          className={inputClassName}
          required={required || undefined}
          suppressHydrationWarning
        />

        {open && (
          <div
            id={listId}
            className="absolute left-0 top-[calc(100%+0.5rem)] z-20 w-full min-w-[280px] overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg sm:w-[360px]"
          >
            <div className="border-b border-zinc-100 p-3">
              <label className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2">
                <SearchIcon />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={t("form.search")}
                  className="w-full bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
                />
              </label>
            </div>
            <ul className="max-h-56 overflow-y-auto py-1">
              {filtered.map((country) => (
                <li key={country.code}>
                  <button
                    type="button"
                    onClick={() => {
                      setDialCountryCode(country.code);
                      setOpen(false);
                      setQuery("");
                    }}
                    className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm transition hover:bg-zinc-50 ${
                      country.code === dialCountryCode
                        ? "bg-zinc-50 font-medium text-zinc-900"
                        : "text-zinc-700"
                    }`}
                  >
                    <span className="text-base leading-none" aria-hidden>
                      {flagEmoji(country.code)}
                    </span>
                    <span className="min-w-0 flex-1 truncate">
                      {getCountryName(country, locale)}
                    </span>
                    <span className="shrink-0 text-zinc-500">{country.dialCode}</span>
                  </button>
                </li>
              ))}
              {filtered.length === 0 && (
                <li className="px-4 py-3 text-sm text-zinc-500">{t("form.noResults")}</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

type CountryFieldProps = {
  lightFields?: boolean;
  defaultValue?: string;
  required?: boolean;
};

export function CountryField({
  lightFields = false,
  defaultValue = DEFAULT_COUNTRY_CODE,
  required = false,
}: CountryFieldProps) {
  const t = useTranslations();
  const [countryCode, setCountryCode] = useState(defaultValue);

  return (
    <div>
      {required ? (
        <RequiredFieldLabel>{t("form.country")}</RequiredFieldLabel>
      ) : (
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-zinc-500">
          {t("form.country")}
        </span>
      )}
      <FormCountryDropdown
        name="country"
        value={countryCode}
        onChange={setCountryCode}
        placeholder={t("form.countryPlaceholder")}
        lightFields={lightFields}
        ariaLabel={t("form.country")}
        required={required}
      />
    </div>
  );
}
