"use client";

import { useEffect, useRef, useState, type ComponentProps } from "react";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Wordmark } from "@/components/Wordmark";
import { PhoneIcon } from "@/components/PhoneIcon";
import { ProductsMegaMenu } from "@/components/ProductsMegaMenu";
import { CONTACT } from "@/lib/contact";
import { getLocalizedProductRouteParams } from "@/lib/products-catalog";

type AppLocale = "cz" | "en";
type LinkHref = ComponentProps<typeof Link>["href"];

const NAV_ITEMS = [
  { key: "service", href: "/service" as const },
  { key: "about", href: "/about" as const },
  { key: "contact", href: "/contact" as const },
] as const;

function isNavActive(pathname: string, href: string): boolean {
  return pathname === href;
}

function isProductsPath(pathname: ReturnType<typeof usePathname>): boolean {
  return pathname === "/products" || pathname.startsWith("/products/");
}

function navLinkClassName(isActive: boolean, variant: "desktop" | "mobile") {
  const base =
    variant === "desktop"
      ? "whitespace-nowrap text-[15px] text-white transition hover:font-bold"
      : "border-b border-white/15 py-4 text-[17px] text-white transition hover:font-bold last:border-b-0";

  return `${base} ${isActive ? "font-bold" : "font-normal"}`;
}

function resolveLanguageHref(
  pathname: ReturnType<typeof usePathname>,
  params: Record<string, string | string[] | undefined>,
  targetLocale: AppLocale,
): LinkHref {
  const category = typeof params.category === "string" ? params.category : undefined;
  const subcategory = typeof params.subcategory === "string" ? params.subcategory : undefined;
  const series = typeof params.series === "string" ? params.series : undefined;
  const model = typeof params.model === "string" ? params.model : undefined;

  if (category && pathname === "/products/[category]") {
    const localizedParams = getLocalizedProductRouteParams({ category }, targetLocale);
    if (localizedParams) {
      return { pathname: "/products/[category]", params: localizedParams };
    }
  }

  if (category && subcategory && pathname === "/products/[category]/[subcategory]") {
    const localizedParams = getLocalizedProductRouteParams(
      { category, subcategory },
      targetLocale,
    );
    if (localizedParams?.subcategory) {
      return {
        pathname: "/products/[category]/[subcategory]",
        params: {
          category: localizedParams.category,
          subcategory: localizedParams.subcategory,
        },
      };
    }
  }

  if (
    category &&
    subcategory &&
    series &&
    pathname === "/products/[category]/[subcategory]/[series]"
  ) {
    const localizedParams = getLocalizedProductRouteParams(
      { category, subcategory, series },
      targetLocale,
    );
    if (localizedParams?.subcategory && localizedParams.series) {
      return {
        pathname: "/products/[category]/[subcategory]/[series]",
        params: {
          category: localizedParams.category,
          subcategory: localizedParams.subcategory,
          series: localizedParams.series,
        },
      };
    }
  }

  if (
    category &&
    subcategory &&
    series &&
    model &&
    pathname === "/products/[category]/[subcategory]/[series]/[model]"
  ) {
    const localizedParams = getLocalizedProductRouteParams(
      { category, subcategory, series, model },
      targetLocale,
    );
    if (localizedParams?.subcategory && localizedParams.series && localizedParams.model) {
      return {
        pathname: "/products/[category]/[subcategory]/[series]/[model]",
        params: {
          category: localizedParams.category,
          subcategory: localizedParams.subcategory,
          series: localizedParams.series,
          model: localizedParams.model,
        },
      };
    }
  }

  return pathname as LinkHref;
}

function LanguageSwitcher({
  pathname,
  className = "",
}: {
  pathname: ReturnType<typeof usePathname>;
  className?: string;
}) {
  const locale = useLocale();
  const params = useParams();
  const paramLocale = typeof params.locale === "string" ? params.locale : null;
  const activeLocale: AppLocale =
    paramLocale === "cz" || paramLocale === "en"
      ? paramLocale
      : locale === "en"
        ? "en"
        : "cz";

  const czClass =
    activeLocale === "cz"
      ? "bg-white text-noble-orange"
      : "text-white hover:bg-white/10";
  const enClass =
    activeLocale === "en"
      ? "bg-white text-noble-orange"
      : "text-white hover:bg-white/10";

  return (
    <div className={`flex overflow-hidden rounded-full border border-white/35 ${className}`}>
      <Link
        href={resolveLanguageHref(pathname, params, "cz")}
        locale="cz"
        className={`px-3 py-1 text-xs font-bold tracking-wide ${czClass}`}
        aria-current={activeLocale === "cz" ? "page" : undefined}
      >
        CZ
      </Link>
      <Link
        href={resolveLanguageHref(pathname, params, "en")}
        locale="en"
        className={`px-3 py-1 text-xs font-bold tracking-wide ${enClass}`}
        aria-current={activeLocale === "en" ? "page" : undefined}
      >
        EN
      </Link>
    </div>
  );
}

export function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const productsCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearProductsCloseTimer = () => {
    if (productsCloseTimer.current) {
      clearTimeout(productsCloseTimer.current);
      productsCloseTimer.current = null;
    }
  };

  const openProductsMenu = () => {
    clearProductsCloseTimer();
    setProductsOpen(true);
  };

  const scheduleCloseProductsMenu = () => {
    clearProductsCloseTimer();
    productsCloseTimer.current = setTimeout(() => setProductsOpen(false), 150);
  };

  useEffect(() => {
    setMenuOpen(false);
    setMobileProductsOpen(false);
    setProductsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setProductsOpen(false);
        setMobileProductsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    return () => clearProductsCloseTimer();
  }, []);

  useEffect(() => {
    if (!productsOpen) {
      return;
    }

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }

      const header = headerRef.current;
      if (header && !header.contains(target)) {
        setProductsOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [productsOpen]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }

      // Ignore the opening tap / toggle button itself (common mobile ghost-event bug).
      if (menuToggleRef.current?.contains(target)) {
        return;
      }

      const header = headerRef.current;
      if (header && !header.contains(target)) {
        setMenuOpen(false);
        setMobileProductsOpen(false);
      }
    };

    // Defer so the same tap that opened the menu cannot immediately close it.
    const timeoutId = window.setTimeout(() => {
      document.addEventListener("pointerdown", onPointerDown);
    }, 50);

    return () => {
      window.clearTimeout(timeoutId);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 bg-noble-orange text-white ${
        productsOpen && !menuOpen ? "overflow-visible" : "overflow-hidden"
      } h-[var(--header-height)]`}
      onMouseLeave={scheduleCloseProductsMenu}
    >
      <div className="mx-auto flex h-[var(--header-height)] w-full max-w-[1280px] items-center justify-between gap-6 px-6 lg:px-10">
        <Link href="/" className="shrink-0" onClick={() => setMenuOpen(false)}>
          <Wordmark variant="header" priority />
        </Link>

        <div className="hidden items-center gap-8 lg:flex xl:gap-10">
          <nav className="flex items-center gap-8 xl:gap-10" aria-label="Primary">
            <div
              className="relative"
              onMouseEnter={openProductsMenu}
              onFocus={openProductsMenu}
            >
              <Link
                href="/products"
                aria-expanded={productsOpen}
                aria-haspopup="true"
                aria-current={isProductsPath(pathname) ? "page" : undefined}
                className={`${navLinkClassName(productsOpen || isProductsPath(pathname), "desktop")} inline-flex items-center gap-1`}
                onMouseEnter={openProductsMenu}
                onFocus={openProductsMenu}
                onClick={(event) => {
                  // Keep mega menu available on click (trackpads / touch laptops).
                  if (!productsOpen) {
                    event.preventDefault();
                    openProductsMenu();
                  }
                }}
              >
                {t("nav.products")}
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden
                  className={`h-3.5 w-3.5 transition-transform ${productsOpen ? "rotate-180" : ""}`}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>

            {NAV_ITEMS.map((item) => {
              const isActive = isNavActive(pathname, item.href);

              return (
                <Link
                  key={item.key}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={navLinkClassName(isActive, "desktop")}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              );
            })}
          </nav>

          <a
            href={`tel:${CONTACT.phone}`}
            className="flex items-center gap-2.5 whitespace-nowrap text-[15px] font-semibold text-white transition hover:text-white/85"
          >
            <PhoneIcon />
            {CONTACT.phoneDisplay}
          </a>

          <LanguageSwitcher pathname={pathname} />
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSwitcher pathname={pathname} />

          <button
            ref={menuToggleRef}
            type="button"
            className="relative z-[60] flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-white/35 text-white transition hover:bg-white/10"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            onClick={(event) => {
              event.stopPropagation();
              setMenuOpen((open) => !open);
            }}
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0 block h-0.5 w-5 bg-current transition-transform duration-200 ${
                  menuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] block h-0.5 w-5 bg-current transition-opacity duration-200 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] block h-0.5 w-5 bg-current transition-transform duration-200 ${
                  menuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {productsOpen && !menuOpen && (
        <div onMouseEnter={openProductsMenu}>
          <ProductsMegaMenu
            variant="desktop"
            onNavigate={() => setProductsOpen(false)}
          />
        </div>
      )}

      {menuOpen ? (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 bottom-0 top-[var(--header-height)] z-50 overflow-y-auto bg-noble-orange lg:hidden"
          aria-hidden={false}
        >
          <nav
            className="mx-auto flex w-full max-w-[1280px] flex-col px-6 py-4 lg:px-10"
            aria-label="Primary"
          >
            <button
              type="button"
              className="flex w-full items-center justify-between border-b border-white/15 py-4 text-left text-[17px] text-white transition hover:font-bold"
              aria-expanded={mobileProductsOpen}
              onClick={() => setMobileProductsOpen((open) => !open)}
            >
              <span className={mobileProductsOpen || isProductsPath(pathname) ? "font-bold" : "font-normal"}>
                {t("nav.products")}
              </span>
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden
                className={`h-5 w-5 shrink-0 transition-transform ${mobileProductsOpen ? "rotate-90" : ""}`}
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L10.94 10 7.23 6.29a.75.75 0 111.06-1.06l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {mobileProductsOpen && (
              <ProductsMegaMenu
                variant="mobile"
                onNavigate={() => {
                  setMenuOpen(false);
                  setMobileProductsOpen(false);
                }}
              />
            )}

            {NAV_ITEMS.map((item) => {
              const isActive = isNavActive(pathname, item.href);

              return (
                <Link
                  key={item.key}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={navLinkClassName(isActive, "mobile")}
                  onClick={() => setMenuOpen(false)}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              );
            })}

            <a
              href={`tel:${CONTACT.phone}`}
              className="mt-2 flex items-center gap-2.5 py-4 text-[17px] font-semibold text-white transition hover:text-white/85"
              onClick={() => setMenuOpen(false)}
            >
              <PhoneIcon />
              {CONTACT.phoneDisplay}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
