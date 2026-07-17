import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductsBreadcrumb } from "@/components/products/ProductsBreadcrumb";
import { CategoryCard } from "@/components/products/CategoryCard";
import { PRODUCT_CATALOG } from "@/lib/products-catalog";

export function ProductsHubPage() {
  const t = useTranslations();

  return (
    <>
      <Header />
      <main className="bg-[#f5f5f5]">
        <section className="bg-[#1a1a1a] px-6 pb-14 pt-24 text-white">
          <div className="mx-auto w-full max-w-[1140px]">
            <ProductsBreadcrumb items={[]} />
            <h1 className="mt-6 text-3xl font-extrabold uppercase tracking-wide md:text-4xl">
              {t("productsCatalog.hub.titlePrefix")}{" "}
              <span className="text-noble-orange">{t("productsCatalog.hub.titleBrand")}</span>{" "}
              {t("productsCatalog.hub.titleSuffix")}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-300 md:text-lg">
              {t("productsCatalog.hub.lead")}
            </p>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto w-full max-w-[1140px]">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {PRODUCT_CATALOG.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-noble-orange px-8 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-noble-orange-dark"
              >
                {t("productsCatalog.hub.contactCta")}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
