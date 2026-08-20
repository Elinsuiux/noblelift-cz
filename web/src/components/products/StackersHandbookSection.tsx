"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  STACKERS_HANDBOOK,
  type StackersHandbookSection,
} from "@/lib/stackers-handbook";

function BulletList({ keys }: { keys: readonly string[] }) {
  const t = useTranslations();
  return (
    <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-zinc-600">
      {keys.map((key) => (
        <li key={key} className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-noble-orange" />
          <span>{t(key)}</span>
        </li>
      ))}
    </ul>
  );
}

function HandbookSectionBlock({ section }: { section: StackersHandbookSection }) {
  const t = useTranslations();

  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
        {section.image ? (
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
            <Image
              src={section.image}
              alt={t(section.titleKey)}
              fill
              sizes="320px"
              className="object-contain"
              unoptimized
            />
          </div>
        ) : null}
        <div>
          <h3 className="text-xl font-extrabold uppercase tracking-wide text-zinc-900">
            {t(section.titleKey)}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 md:text-base">
            {t(section.introKey)}
          </p>

          {section.specKeys && section.specKeys.length > 0 ? (
            <div className="mt-6 overflow-hidden rounded-xl border border-zinc-200">
              <div className="grid grid-cols-1 divide-y divide-zinc-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                {section.specKeys.map((spec) => (
                  <div key={spec.labelKey} className="px-4 py-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                      {t(spec.labelKey)}
                    </p>
                    <p className="mt-1 text-sm font-bold text-zinc-900">{t(spec.valueKey)}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {(section.audienceKeys?.length || section.advantagesKeys?.length) && (
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {section.audienceKeys && section.audienceKeys.length > 0 ? (
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
              {section.audienceTitleKey ? (
                <h4 className="text-sm font-extrabold uppercase tracking-wide text-zinc-900">
                  {t(section.audienceTitleKey)}
                </h4>
              ) : null}
              <BulletList keys={section.audienceKeys} />
            </div>
          ) : null}
          {section.advantagesKeys && section.advantagesKeys.length > 0 ? (
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
              {section.advantagesTitleKey ? (
                <h4 className="text-sm font-extrabold uppercase tracking-wide text-zinc-900">
                  {t(section.advantagesTitleKey)}
                </h4>
              ) : null}
              <BulletList keys={section.advantagesKeys} />
            </div>
          ) : null}
        </div>
      )}

      {section.compareRows && section.compareRows.length > 0 ? (
        <div className="mt-8 overflow-x-auto rounded-xl border border-zinc-200">
          {section.compareTitleKey ? (
            <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-3">
              <h4 className="text-sm font-extrabold uppercase tracking-wide text-zinc-900">
                {t(section.compareTitleKey)}
              </h4>
            </div>
          ) : null}
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className="border-b border-zinc-200 bg-white">
                <th className="w-[28%] px-4 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-500" />
                <th className="w-[36%] border-l border-zinc-200 px-4 py-3">
                  <div className="flex flex-col items-start gap-3">
                    {section.compareLeftImage ? (
                      <div className="relative h-24 w-full max-w-[180px]">
                        <Image
                          src={section.compareLeftImage}
                          alt={section.compareLeftTitleKey ? t(section.compareLeftTitleKey) : ""}
                          fill
                          sizes="180px"
                          className="object-contain object-left"
                          unoptimized
                        />
                      </div>
                    ) : null}
                    <span className="inline-flex rounded-full bg-noble-orange/10 px-3 py-1 text-sm font-bold text-noble-orange">
                      {section.compareLeftTitleKey ? t(section.compareLeftTitleKey) : null}
                    </span>
                  </div>
                </th>
                <th className="w-[36%] border-l border-zinc-200 px-4 py-3">
                  <div className="flex flex-col items-start gap-3">
                    {section.compareRightImage ? (
                      <div className="relative h-24 w-full max-w-[180px]">
                        <Image
                          src={section.compareRightImage}
                          alt={section.compareRightTitleKey ? t(section.compareRightTitleKey) : ""}
                          fill
                          sizes="180px"
                          className="object-contain object-left"
                          unoptimized
                        />
                      </div>
                    ) : null}
                    <span className="inline-flex rounded-full bg-noble-orange/10 px-3 py-1 text-sm font-bold text-noble-orange">
                      {section.compareRightTitleKey ? t(section.compareRightTitleKey) : null}
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {section.compareRows.map((row, index) => (
                <tr
                  key={row.labelKey}
                  className={`border-b border-zinc-200 last:border-b-0 ${
                    index % 2 === 0 ? "bg-white" : "bg-zinc-50/80"
                  }`}
                >
                  <th className="px-4 py-3 align-top text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    {t(row.labelKey)}
                  </th>
                  <td className="border-l border-zinc-200 px-4 py-3 align-top text-sm leading-relaxed text-zinc-700">
                    {t(row.leftKey)}
                  </td>
                  <td className="border-l border-zinc-200 px-4 py-3 align-top text-sm leading-relaxed text-zinc-700">
                    {t(row.rightKey)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {section.extraKeys && section.extraKeys.length > 0 ? (
        <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          {section.extraTitleKey ? (
            <h4 className="text-sm font-extrabold uppercase tracking-wide text-zinc-900">
              {t(section.extraTitleKey)}
            </h4>
          ) : null}
          <BulletList keys={section.extraKeys} />
        </div>
      ) : null}

      {section.recommendTableRows && section.recommendTableRows.length > 0 ? (
        <div className="mt-8 overflow-x-auto rounded-xl border border-zinc-200">
          {section.recommendTableTitleKey ? (
            <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-3">
              <h4 className="text-sm font-extrabold uppercase tracking-wide text-zinc-900">
                {t(section.recommendTableTitleKey)}
              </h4>
            </div>
          ) : null}
          <table className="w-full min-w-[480px] border-collapse text-left">
            <tbody>
              {section.recommendTableRows.map((row, index) => (
                <tr
                  key={row.modelKey}
                  className={`border-b border-zinc-200 last:border-b-0 ${
                    index % 2 === 0 ? "bg-white" : "bg-zinc-50/80"
                  }`}
                >
                  <th className="w-[34%] px-4 py-3 align-top text-sm font-bold text-zinc-900">
                    {t(row.modelKey)}
                  </th>
                  <td className="border-l border-zinc-200 px-4 py-3 align-top text-sm leading-relaxed text-zinc-700">
                    {t(row.valueKey)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {section.legendKeys && section.legendKeys.length > 0 ? (
        <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          {section.legendTitleKey ? (
            <h4 className="text-sm font-extrabold uppercase tracking-wide text-zinc-900">
              {t(section.legendTitleKey)}
            </h4>
          ) : null}
          <BulletList keys={section.legendKeys} />
        </div>
      ) : null}

      {section.argumentKey ? (
        <blockquote className="mt-6 rounded-xl border border-noble-orange/25 bg-noble-orange/5 p-5 text-sm leading-relaxed text-zinc-700 md:text-base">
          {t(section.argumentKey)}
        </blockquote>
      ) : null}
    </article>
  );
}

export function StackersHandbookSection() {
  const t = useTranslations();
  const handbook = STACKERS_HANDBOOK;

  return (
    <section className="mt-16 space-y-10">
      <div>
        <h2 className="text-xl font-bold text-zinc-900 md:text-2xl">{t(handbook.overviewTitleKey)}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-600 md:text-base">
          {t(handbook.overviewLeadKey)}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {handbook.overviewSeries.map((series) => (
          <div key={series.id} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="relative mx-auto mb-4 h-40 w-full max-w-[220px]">
              <Image
                src={series.image}
                alt={t(series.titleKey)}
                fill
                sizes="220px"
                className="object-contain"
                unoptimized
              />
            </div>
            <h3 className="text-sm font-extrabold uppercase tracking-wide text-zinc-900">
              {t(series.titleKey)}
            </h3>
            <BulletList keys={series.bulletKeys} />
          </div>
        ))}
      </div>

      <div className="space-y-8">
        {handbook.sections.map((section) => (
          <HandbookSectionBlock key={section.id} section={section} />
        ))}
      </div>
    </section>
  );
}
