"use client";

import { useTranslations } from "next-intl";
import type { ProductModelSpecRow } from "@/lib/products-catalog";

export function ProductModelSpecTable({ specRows }: { specRows: readonly ProductModelSpecRow[] }) {
  const t = useTranslations();

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
      <table className="w-full text-left text-sm">
        <tbody>
          {specRows.map((row) => (
            <tr key={row.labelKey} className="border-b border-zinc-100 last:border-b-0">
              <th className="w-2/5 bg-zinc-50 px-5 py-3.5 font-semibold text-zinc-700">
                {t(row.labelKey)}
              </th>
              <td className="px-5 py-3.5 font-medium text-zinc-900">{t(row.valueKey)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
