import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Wordmark } from "@/components/Wordmark";
import { CookieSettingsLink } from "@/components/CookieSettingsLink";
import { CONTACT, BILLING } from "@/lib/contact";
import { PRODUCT_CATALOG, getCategorySlug } from "@/lib/products-catalog";

export function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const year = new Date().getFullYear();

  const legalLinks = [
    { href: "/privacy" as const, label: t("footer.privacy") },
    { href: "/cookies" as const, label: t("footer.cookies") },
    { href: "/company" as const, label: t("footer.company") },
  ];

  return (
    <footer className="bg-[#1a1a1a] px-6 py-12 text-white">
      <div className="mx-auto grid w-full max-w-[1140px] gap-8 md:grid-cols-5">
        <div className="md:col-span-2">
          <Wordmark variant="footer" />
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">{t("footer.sub")}</p>
          <p className="mt-4 text-sm text-zinc-500">{CONTACT.company}</p>
          <p className="mt-1 text-sm text-zinc-500">
            {BILLING.addressLine1}, {BILLING.addressLine2}, {BILLING.addressLine3}
          </p>
          <p className="mt-1 text-sm text-zinc-500">
            IČO {CONTACT.ico} · DIČ {CONTACT.dic}
          </p>
        </div>
        <div>
          <div className="mb-3 text-sm font-bold uppercase tracking-wide text-white">
            {t("footer.nav")}
          </div>
          <Link
            href="/products"
            className="block py-1.5 text-sm text-zinc-400 hover:text-noble-orange"
          >
            {t("nav.products")}
          </Link>
          <Link
            href="/service"
            className="block py-1.5 text-sm text-zinc-400 hover:text-noble-orange"
          >
            {t("nav.service")}
          </Link>
          <Link
            href="/about"
            className="block py-1.5 text-sm text-zinc-400 hover:text-noble-orange"
          >
            {t("nav.about")}
          </Link>
          <Link
            href="/contact"
            className="block py-1.5 text-sm text-zinc-400 hover:text-noble-orange"
          >
            {t("nav.contact")}
          </Link>
        </div>
        <div>
          <div className="mb-3 text-sm font-bold uppercase tracking-wide text-white">
            {t("footer.cats")}
          </div>
          {PRODUCT_CATALOG.map((category) => (
            <Link
              key={category.id}
              href={{
                pathname: "/products/[category]",
                params: { category: getCategorySlug(category, locale) },
              }}
              className="block py-1.5 text-sm text-zinc-400 transition hover:text-noble-orange"
            >
              {t(`categories.items.${category.id}.title`)}
            </Link>
          ))}
        </div>
        <div>
          <div className="mb-3 text-sm font-bold uppercase tracking-wide text-white">
            {t("footer.contact")}
          </div>
          <div className="space-y-2 text-sm text-zinc-400">
            <a href={`tel:${CONTACT.phone}`} className="block hover:text-noble-orange">
              {CONTACT.phoneDisplay}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="block hover:text-noble-orange">
              {CONTACT.email}
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-8 flex w-full max-w-[1140px] flex-wrap items-center justify-between gap-3 border-t border-zinc-800 pt-6 text-xs text-zinc-500">
        <div>
          © {year} {CONTACT.company} · IČO {CONTACT.ico}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {legalLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-noble-orange">
              {link.label}
            </Link>
          ))}
          <CookieSettingsLink className="hover:text-noble-orange" />
        </div>
      </div>
    </footer>
  );
}