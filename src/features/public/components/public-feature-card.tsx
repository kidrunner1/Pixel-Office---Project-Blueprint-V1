"use client";

import { useTranslation } from "@/features/i18n/use-translation";
import type { PublicFeature } from "@/features/public/data/public-content";

type PublicFeatureCardProps = {
  feature: PublicFeature;
  index: number;
};

const accentClasses: Record<PublicFeature["accent"], string> = {
  amber: "bg-amber-300 text-amber-950",
  blue: "bg-sky-300 text-sky-950",
  coral: "bg-rose-300 text-rose-950",
  teal: "bg-emerald-300 text-emerald-950",
};

export function PublicFeatureCard({
  feature,
  index,
}: PublicFeatureCardProps) {
  const { t } = useTranslation();

  return (
    <article className="group min-h-60 border border-slate-700 bg-[#0b1727] p-6 shadow-[6px_6px_0_#020617] transition-transform duration-200 hover:-translate-y-1 motion-reduce:transition-none">
      <div className="flex items-start justify-between gap-4">
        <div
          className={`grid h-10 w-10 place-items-center border-2 border-slate-950 text-sm font-black shadow-[3px_3px_0_#020617] ${accentClasses[feature.accent]}`}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
        <span className="text-xs font-semibold text-slate-500">
          {t(feature.detailKey)}
        </span>
      </div>
      <h3 className="mt-10 text-xl font-black text-white">
        {t(feature.titleKey)}
      </h3>
      <p className="mt-3 max-w-sm text-sm leading-6 text-slate-300">
        {t(feature.descriptionKey)}
      </p>
      <div
        className={`mt-6 h-1 w-12 transition-[width] duration-200 group-hover:w-20 motion-reduce:transition-none ${accentClasses[feature.accent].split(" ")[0]}`}
      />
    </article>
  );
}
