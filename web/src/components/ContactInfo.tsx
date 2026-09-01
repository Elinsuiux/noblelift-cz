"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { PhoneIcon } from "@/components/PhoneIcon";
import { SALES_REPS } from "@/lib/contact";

function MailIcon() {
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
      aria-hidden
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function SalesRepCard({
  name,
  phone,
  phoneDisplay,
  email,
  photo,
  photoWidth,
  photoHeight,
}: {
  name: string;
  phone: string;
  phoneDisplay: string;
  email: string;
  photo: string;
  photoWidth: number;
  photoHeight: number;
}) {
  return (
    <article className="flex flex-col items-center text-center">
      <div className="aspect-square w-full max-w-[520px] overflow-hidden rounded-2xl">
        <Image
          src={photo}
          alt={name}
          width={photoWidth}
          height={photoHeight}
          className="h-full w-full object-cover object-center"
          sizes="(min-width: 640px) 520px, 100vw"
        />
      </div>
      <h3 className="mt-4 text-lg font-bold text-zinc-900 md:mt-5 md:text-xl">{name}</h3>
      <div className="mt-3 w-full space-y-2 md:mt-4 md:space-y-3">
        <a
          href={`tel:${phone}`}
          className="flex items-center justify-center gap-2 text-base text-zinc-700 transition hover:text-noble-orange"
        >
          <span className="text-noble-orange">
            <PhoneIcon />
          </span>
          <span className="font-medium">{phoneDisplay}</span>
        </a>
        <a
          href={`mailto:${email}`}
          className="flex items-center justify-center gap-2 text-sm text-zinc-700 transition hover:text-noble-orange md:text-base"
        >
          <span className="text-noble-orange">
            <MailIcon />
          </span>
          <span className="font-medium">{email}</span>
        </a>
      </div>
    </article>
  );
}

export function ContactInfoHeader() {
  const t = useTranslations();

  return (
    <div className="text-center">
      <h2 className="text-lg font-extrabold uppercase tracking-wide text-zinc-900">
        {t("contactPage.contactHeading")}
      </h2>
      <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-zinc-500">
        {t("contactPage.repsLabel")}
      </p>
    </div>
  );
}

export function ContactRepCards() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-8 lg:gap-12">
      {SALES_REPS.map((rep) => (
        <SalesRepCard
          key={rep.id}
          name={rep.name}
          phone={rep.phone}
          phoneDisplay={rep.phoneDisplay}
          email={rep.email}
          photo={rep.photo}
          photoWidth={rep.photoWidth}
          photoHeight={rep.photoHeight}
        />
      ))}
    </div>
  );
}

export function ContactInfo() {
  return (
    <div>
      <ContactInfoHeader />
      <div className="mt-8">
        <ContactRepCards />
      </div>
    </div>
  );
}
