import { useTranslations } from "next-intl";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductsBreadcrumb } from "@/components/products/ProductsBreadcrumb";
import { ProductsCategoryNav } from "@/components/products/ProductsCategoryNav";
import { SubcategoryCard } from "@/components/products/SubcategoryCard";
import { StackersHandbookSection } from "@/components/products/StackersHandbookSection";
import type { CatalogCategory } from "@/lib/products-catalog";

export function ProductCategoryPage({ category }: { category: CatalogCategory }) {
  const t = useTranslations();

  return (
    <>
      <Header />
      <main className="bg-[#f5f5f5]">
        <section className="bg-[#1a1a1a] px-6 pb-14 pt-24 text-white">
          <div className="mx-auto w-full max-w-[1140px]">
            <ProductsBreadcrumb
              items={[{ label: t(`categories.items.${category.id}.title`) }]}
            />
            <p className="mt-6 text-xs font-bold uppercase tracking-wider text-noble-orange">
              {t(`categories.items.${category.id}.tags`)}
            </p>
            <h1 className="mt-2 text-3xl font-extrabold uppercase tracking-wide md:text-4xl">
              {t(`categories.items.${category.id}.title`)}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-300 md:text-lg">
              {t(`categories.items.${category.id}.desc`)}
            </p>
          </div>
        </section>

        <ProductsCategoryNav activeCategory={category} />

        <section className="px-6 py-16">
          <div className="mx-auto w-full max-w-[1140px]">
            <h2 className="text-xl font-bold text-zinc-900 md:text-2xl">
              {t("productsCatalog.category.chooseSubcategory")}
            </h2>
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {category.subcategories.map((subcategory) => (
                <SubcategoryCard
                  key={subcategory.id}
                  category={category}
                  subcategory={subcategory}
                />
              ))}
            </div>

            {category.showStackersHandbook ? <StackersHandbookSection /> : null}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
