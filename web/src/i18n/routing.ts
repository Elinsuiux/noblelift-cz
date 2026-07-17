import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["cz", "en"],
  defaultLocale: "cz",
  pathnames: {
    "/": "/",
    "/about": "/about",
    "/service": "/service",
    "/contact": "/contact",
    "/privacy": "/privacy",
    "/cookies": "/cookies",
    "/terms": "/terms",
    "/company": "/company",
    "/products": {
      cz: "/produkty",
      en: "/products",
    },
    "/products/[category]": {
      cz: "/produkty/[category]",
      en: "/products/[category]",
    },
    "/products/[category]/[subcategory]": {
      cz: "/produkty/[category]/[subcategory]",
      en: "/products/[category]/[subcategory]",
    },
    "/products/[category]/[subcategory]/[series]": {
      cz: "/produkty/[category]/[subcategory]/[series]",
      en: "/products/[category]/[subcategory]/[series]",
    },
    "/products/[category]/[subcategory]/[series]/[model]": {
      cz: "/produkty/[category]/[subcategory]/[series]/[model]",
      en: "/products/[category]/[subcategory]/[series]/[model]",
    },
  },
});
