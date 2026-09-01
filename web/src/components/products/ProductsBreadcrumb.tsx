"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type Crumb = {
  label: string;
  href?:
    | { pathname: "/products" }
    | { pathname: "/products/[category]"; params: { category: string } }
    | {
        pathname: "/products/[category]/[subcategory]";
        params: { category: string; subcategory: string };
      }
    | {
        pathname: "/products/[category]/[subcategory]/[series]";
        params: { category: string; subcategory: string; series: string };
      };
};

export function ProductsBreadcrumb({ items }: { items: Crumb[] }) {
  const t = useTranslations("productsCatalog.breadcrumb");

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-zinc-400">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/" className="transition hover:text-white">
            {t("home")}
          </Link>
        </li>
        <li aria-hidden className="text-zinc-600">
          /
        </li>
        <li>
          <Link href="/products" className="transition hover:text-white">
            {t("products")}
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
            <span aria-hidden className="text-zinc-600">
              /
            </span>
            {item.href ? (
              <Link href={item.href} className="transition hover:text-white">
                {item.label}
              </Link>
            ) : (
              <span className="text-white">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
