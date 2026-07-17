export const HOME_CATEGORY_KEYS = ["1", "2", "3", "4", "5", "6"] as const;

export type HomeCategoryKey = (typeof HOME_CATEGORY_KEYS)[number];

export type ProductCategoryId = "all" | HomeCategoryKey;

export const PRODUCT_CATEGORIES: readonly {
  id: ProductCategoryId;
  labelKey: `categories.items.${HomeCategoryKey}.title` | "productsMenu.categories.all";
}[] = [
  { id: "all", labelKey: "productsMenu.categories.all" },
  ...HOME_CATEGORY_KEYS.map((key) => ({
    id: key as ProductCategoryId,
    labelKey: `categories.items.${key}.title` as const,
  })),
];

export const HOME_PRODUCTS: readonly {
  id: HomeCategoryKey;
  image: string;
  titleKey: `categories.items.${HomeCategoryKey}.title`;
}[] = HOME_CATEGORY_KEYS.map((key) => ({
  id: key,
  image: `/images/home/categories/${key}.jpg`,
  titleKey: `categories.items.${key}.title`,
}));

export function filterProductsByCategory(categoryId: ProductCategoryId) {
  if (categoryId === "all") {
    return HOME_PRODUCTS;
  }

  return HOME_PRODUCTS.filter((product) => product.id === categoryId);
}
