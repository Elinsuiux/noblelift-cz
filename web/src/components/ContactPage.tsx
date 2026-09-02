"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { ContactInfoHeader, ContactRepCards } from "@/components/ContactInfo";
import { ContactDetailsBlock } from "@/components/ContactDetailsBlock";
import { WarehouseLocations } from "@/components/WarehouseLocations";

export function ContactPage() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const formSectionRef = useRef<HTMLElement>(null);
  const model = searchParams.get("model")?.trim() ?? "";
  const defaultMessage = model
    ? t("contactPage.productInquiryMessage", { model })
    : undefined;

  useEffect(() => {
    if (!model || !formSectionRef.current) {
      return;
    }
    formSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [model]);

  return (
    <>
      <Header />
      <main className="bg-white pt-24">
        <section className="px-6 py-16">
          <div className="mx-auto w-full max-w-[1140px] text-center">
            <h1 className="text-2xl font-extrabold uppercase tracking-wide text-zinc-900 md:text-3xl">
              {t("contactPage.title")}
            </h1>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-noble-orange" />
            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-zinc-600 md:text-lg">
              {t("contactPage.intro")}
            </p>
          </div>
        </section>

        <section className="px-6 pb-16">
          <div className="mx-auto w-full max-w-[1140px]">
            <div className="mb-8">
              <ContactInfoHeader />
            </div>
            <ContactRepCards />
            <section ref={formSectionRef} id="kontaktni-formular" className="scroll-mt-28">
              <h2 className="mb-6 mt-10 text-center text-lg font-extrabold uppercase tracking-wide text-zinc-900 md:mt-12">
                {t("contactPage.formHeading")}
              </h2>
              <div className="rounded-2xl bg-[#f5f5f5] p-6 md:p-8">
                <ContactForm
                  key={defaultMessage ?? "default"}
                  variant="plain"
                  source="contact"
                  messageRows={5}
                  lightFields
                  defaultMessage={defaultMessage}
                  messagePlaceholder={t("contactPage.messagePlaceholder")}
                />
              </div>
            </section>
          </div>
        </section>

        <section className="px-6 pb-16">
          <div className="mx-auto w-full max-w-[1140px]">
            <ContactDetailsBlock />
          </div>
        </section>

        <section className="bg-[#f5f5f5] px-6 py-20">
          <div className="mx-auto w-full max-w-[1140px]">
            <WarehouseLocations />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
