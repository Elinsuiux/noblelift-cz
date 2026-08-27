export const CONTACT = {
  phone: "+420773997314",
  phoneDisplay: "+420 773 997 314",
  email: "info@noblelift.cz",
  website: "noblelift.cz",
  websiteUrl: "https://www.noblelift.cz",
  company: "VZV GROUP s.r.o.",
  ico: "27469662",
  dic: "CZ27469662",
} as const;

export const SALES_REPS = [
  {
    id: "hubert",
    name: "Hubert Rajtr",
    phone: "+420773997314",
    phoneDisplay: "+420 773 997 314",
    email: "info@noblelift.cz",
    photo: "/images/contact/hubert-rajtr-v8.jpg",
    photoWidth: 1024,
    photoHeight: 1024,
    photoPosition: "object-center",
  },
  {
    id: "vanousek",
    name: "Adam Vanoušek",
    phone: "+420777719163",
    phoneDisplay: "+420 777 719 163",
    email: "info@noblelift.cz",
    photo: "/images/contact/adam-vanousek-v3.jpg",
    photoWidth: 512,
    photoHeight: 505,
    photoPosition: "object-center",
  },
] as const;

export const DEPOTS = {
  cervenaVoda: {
    phone: "+420773997314",
    phoneDisplay: "+420 773 997 314",
    email: "info@noblelift.cz",
  },
  prague: {
    phone: "+420773997314",
    phoneDisplay: "+420 773 997 314",
    email: "info@noblelift.cz",
  },
} as const;

export const DEPOT_KEYS = ["cervenaVoda", "prague"] as const;

export const BILLING = {
  company: "VZV GROUP s.r.o.",
  addressLine1: "Okružní 1144",
  addressLine2: "500 03 Hradec Králové",
  addressLine3: "Česká republika",
  ico: "27469662",
  dic: "CZ27469662",
  registry:
    "Registrační číslo 20857 v obchodním rejstříku Krajského soudu v Hradci Králové.",
  bank: "Komerční banka a.s.",
  account: "35-8106190267/0100 CZK",
  director: "Milan Černohous",
} as const;

export const WAREHOUSES = {
  cervenaVoda: {
    image: "/images/contact/warehouse-cervena-voda-v2.jpg",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=561+61+%C4%8Cerven%C3%A1+Voda+535",
  },
  prague: {
    image: "/images/contact/warehouse-prague-v3.jpg",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Do+%C4%8Certous+2717%2F5,+193+00+Praha+20",
  },
} as const;

export const WAREHOUSE_KEYS = ["cervenaVoda", "prague"] as const;
