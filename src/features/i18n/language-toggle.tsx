"use client";

import { useTranslation } from "@/features/i18n/use-translation";

type LanguageToggleProps = {
  compact?: boolean;
  className?: string;
};

export function LanguageToggle({
  compact = false,
  className,
}: LanguageToggleProps) {
  const { locale, setLocale, t } = useTranslation();

  return (
    <div
      aria-label={`${t("language.thai")} / ${t("language.english")}`}
      className={[
        "inline-flex shrink-0 border border-slate-600 bg-[#07111f] p-0.5 shadow-[2px_2px_0_rgba(2,6,23,0.55)]",
        className ?? "",
      ].join(" ")}
      role="group"
    >
      <button
        aria-label={t("language.switchToThai")}
        aria-pressed={locale === "th"}
        className={[
          "grid place-items-center font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200",
          compact ? "h-7 min-w-9 px-1 text-[10px]" : "h-8 min-w-11 px-2 text-xs",
          locale === "th"
            ? "bg-amber-300 text-slate-950"
            : "text-slate-300 hover:bg-slate-800 hover:text-white",
        ].join(" ")}
        onClick={() => setLocale("th")}
        type="button"
      >
        ไทย
      </button>
      <button
        aria-label={t("language.switchToEnglish")}
        aria-pressed={locale === "en"}
        className={[
          "grid place-items-center font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200",
          compact ? "h-7 min-w-9 px-1 text-[10px]" : "h-8 min-w-11 px-2 text-xs",
          locale === "en"
            ? "bg-amber-300 text-slate-950"
            : "text-slate-300 hover:bg-slate-800 hover:text-white",
        ].join(" ")}
        onClick={() => setLocale("en")}
        type="button"
      >
        EN
      </button>
    </div>
  );
}
