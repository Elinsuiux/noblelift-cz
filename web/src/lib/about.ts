export const ABOUT_GALLERY = [
  {
    id: "warehouse",
    src: "/images/contact/warehouse-cervena-voda.jpg",
  },
  {
    id: "forklift",
    src: "/images/about/gallery-forklift-v1.jpg",
  },
  {
    id: "logistics",
    src: "/images/home/logistics.jpg",
  },
  {
    id: "prague",
    src: "/images/contact/warehouse-prague-v3.jpg",
  },
] as const;

export const STRENGTH_KEYS = [
  "warehouse",
  "trust",
  "serviceParts",
  "rental",
  "delivery",
  "consulting",
] as const;

export type StrengthKey = (typeof STRENGTH_KEYS)[number];
export const PILLAR_KEYS = ["quality", "reliability", "innovation"] as const;
export const STAT_KEYS = ["warehouses", "territory", "delivery", "parts"] as const;
