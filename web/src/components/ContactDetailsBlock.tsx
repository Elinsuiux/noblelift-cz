import { useTranslations } from "next-intl";
import { PhoneIcon } from "@/components/PhoneIcon";
import { ClockIcon } from "@/components/ClockIcon";
import { BILLING, DEPOT_KEYS, DEPOTS } from "@/lib/contact";

function DetailRow({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 shrink-0 text-noble-orange">{icon}</span>
      <div className="text-sm leading-relaxed text-zinc-700">{children}</div>
    </div>
  );
}

function HomeIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="18"
      height="18"
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

function DepotColumn({ depotKey }: { depotKey: (typeof DEPOT_KEYS)[number] }) {
  const t = useTranslations();
  const depot = DEPOTS[depotKey];

  return (
    <div>
      <h4 className="text-sm font-extrabold uppercase tracking-wide text-zinc-900">
        {t(`contactPage.depots.${depotKey}.name`)}
      </h4>
      <div className="mt-4 space-y-3">
        <DetailRow icon={<HomeIcon />}>
          <div>
            <div>{t(`contactPage.depots.${depotKey}.addressLine1`)}</div>
            <div>{t(`contactPage.depots.${depotKey}.addressLine2`)}</div>
          </div>
        </DetailRow>
        <DetailRow icon={<ClockIcon />}>
          {t(`contactPage.depots.${depotKey}.hours`)}
        </DetailRow>
        <DetailRow icon={<PhoneIcon />}>
          <a href={`tel:${depot.phone}`} className="hover:text-noble-orange">
            {depot.phoneDisplay}
          </a>
        </DetailRow>
        <DetailRow icon={<MailIcon />}>
          <a href={`mailto:${depot.email}`} className="hover:text-noble-orange">
            {depot.email}
          </a>
        </DetailRow>
      </div>
    </div>
  );
}

export function ContactDetailsBlock() {
  const t = useTranslations();

  return (
    <section>
      <h2 className="text-center text-2xl font-extrabold uppercase tracking-wide text-zinc-900 md:text-3xl">
        {t("contactPage.detailsTitle")}
      </h2>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-[#f5f5f5] p-6 md:p-8">
          <h3 className="text-base font-extrabold uppercase tracking-wide text-zinc-900">
            {t("contactPage.depotsHeading")}
          </h3>
          <div className="mt-6 grid gap-8 sm:grid-cols-2">
            {DEPOT_KEYS.map((key) => (
              <DepotColumn key={key} depotKey={key} />
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-[#f5f5f5] p-6 md:p-8">
          <h3 className="text-base font-extrabold uppercase tracking-wide text-zinc-900">
            {t("contactPage.billingHeading")}
          </h3>
          <p className="mt-4 text-sm font-bold uppercase text-zinc-900">
            {BILLING.company}
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="space-y-3 text-sm leading-relaxed text-zinc-700">
              <div>
                <div>{BILLING.addressLine1}</div>
                <div>{BILLING.addressLine2}</div>
              </div>
              <p>
                <span className="font-bold text-zinc-900">{t("contactPage.ico")}:</span>{" "}
                {BILLING.ico}
              </p>
              <p>
                <span className="font-bold text-zinc-900">{t("contactPage.dic")}:</span>{" "}
                {BILLING.dic}
              </p>
              <p>{BILLING.registry}</p>
            </div>
            <div className="space-y-3 text-sm leading-relaxed text-zinc-700">
              <p>
                <span className="font-bold text-zinc-900">
                  {t("contactPage.billingBank")}:
                </span>{" "}
                {BILLING.bank}
              </p>
              <p>
                <span className="font-bold text-zinc-900">
                  {t("contactPage.billingAccount")}:
                </span>{" "}
                {BILLING.account}
              </p>
              <p>
                <span className="font-bold text-zinc-900">
                  {t("contactPage.billingDirector")}:
                </span>{" "}
                {BILLING.director}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
