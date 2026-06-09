"use client";

import Link from "next/link";

import { useTranslation } from "@/features/i18n/use-translation";
import { PublicFeatureCard } from "@/features/public/components/public-feature-card";
import { PublicHeroPreview } from "@/features/public/components/public-hero-preview";
import { PublicShell } from "@/features/public/components/public-shell";
import {
  PUBLIC_CTA_LINKS,
  PUBLIC_FEATURES,
  PUBLIC_STEPS,
} from "@/features/public/data/public-content";

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <PublicShell>
      <section className="relative h-[calc(100svh-48px)] min-h-[620px] max-h-[860px] overflow-hidden border-b-4 border-slate-950 pt-16">
        <PublicHeroPreview />
        <div className="absolute inset-0 bg-[#020817]/55" />

        <div className="relative z-10 mx-auto flex h-full w-full max-w-[1440px] items-end px-5 pb-14 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
          <div className="max-w-3xl text-shadow-public">
            <div className="mb-5 flex w-fit items-center gap-3 border border-white/20 bg-[#07111f]/85 px-3 py-2 text-xs font-bold text-slate-100">
              <span className="h-2 w-2 bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
              {t("public.heroBadge")}
            </div>
            <h1 className="text-5xl font-black leading-none text-white sm:text-6xl lg:text-7xl">
              {t("common.pixelOffice")}
            </h1>
            <p className="mt-5 text-xl font-bold text-amber-200 sm:text-2xl">
              {t("public.heroSubtitle")}
            </p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-100 sm:text-lg">
              {t("public.heroDescription")}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {PUBLIC_CTA_LINKS.map((cta) => {
                const className =
                  cta.variant === "primary"
                    ? "border-2 border-slate-950 bg-amber-300 px-5 py-3 font-black text-slate-950 shadow-[4px_4px_0_#020617] hover:-translate-y-0.5"
                    : cta.variant === "secondary"
                      ? "border-2 border-white/60 bg-[#07111f]/80 px-5 py-3 font-black text-white shadow-[4px_4px_0_#020617] hover:-translate-y-0.5 hover:border-white"
                      : "px-4 py-3 font-bold text-white underline decoration-amber-300 decoration-2 underline-offset-4 hover:text-amber-200";

                return (
                  <Link
                    className={`${className} transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-200 motion-reduce:transition-none`}
                    href={cta.href}
                    key={cta.href}
                  >
                    {t(cta.labelKey)}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 right-6 z-10 hidden items-center gap-4 border border-white/15 bg-[#07111f]/85 px-4 py-3 text-xs font-bold text-slate-200 shadow-[4px_4px_0_rgba(2,6,23,0.7)] lg:flex">
          <span>{t("public.heroOneRoom")}</span>
          <span className="h-4 w-px bg-slate-600" />
          <span>{t("public.heroSeats")}</span>
          <span className="h-4 w-px bg-slate-600" />
          <span className="text-emerald-300">{t("public.heroLive")}</span>
        </div>
      </section>

      <section className="border-b border-slate-800 bg-[#07111f] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-black text-amber-300">
                {t("public.sectionPresenceKicker")}
              </p>
              <h2 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl">
                {t("public.sectionPresenceTitle")}
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-400 sm:text-base">
              {t("public.sectionPresenceDescription")}
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {PUBLIC_FEATURES.map((feature, index) => (
              <PublicFeatureCard
                feature={feature}
                index={index}
                key={feature.titleKey}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-4 border-slate-950 bg-[#17324a] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-black text-amber-200">
              {t("public.stepsKicker")}
            </p>
            <h2 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl">
              {t("public.stepsTitle")}
            </h2>
          </div>

          <ol className="mt-12 grid gap-px border-2 border-slate-950 bg-slate-950 lg:grid-cols-3">
            {PUBLIC_STEPS.map((step) => (
              <li
                className="min-h-64 bg-[#12283c] p-7 sm:p-8"
                key={step.number}
              >
                <span className="text-4xl font-black text-amber-300">
                  {step.number}
                </span>
                <h3 className="mt-10 text-xl font-black text-white">
                  {t(step.titleKey)}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-slate-300">
                  {t(step.descriptionKey)}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[#050d19] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div>
            <p className="text-sm font-black text-emerald-300">
              {t("public.productKicker")}
            </p>
            <h2 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl">
              {t("public.productTitle")}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
              {t("public.productDescription")}
            </p>
            <Link
              className="mt-8 inline-flex border-2 border-slate-950 bg-emerald-300 px-5 py-3 font-black text-emerald-950 shadow-[4px_4px_0_#020617] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-200 motion-reduce:transition-none"
              href="/auth/register"
            >
              {t("public.productCta")}
            </Link>
          </div>

          <div className="border-4 border-slate-950 bg-[#0b1727] p-2 shadow-[10px_10px_0_#020617]">
            <div className="flex h-10 items-center justify-between border-b border-slate-700 bg-[#101f31] px-4 text-[11px] font-bold text-slate-300">
              <span>{t("common.mainOffice")}</span>
              <span className="flex items-center gap-2 text-emerald-300">
                <span className="h-2 w-2 bg-emerald-400" />
                {t("public.realtimeConnected")}
              </span>
            </div>
            <div className="grid h-[390px] grid-cols-[48px_minmax(0,1fr)_88px] sm:grid-cols-[120px_minmax(0,1fr)_150px]">
              <div className="border-r border-slate-700 bg-[#0b1727] p-3">
                <div className="h-8 bg-amber-300/20" />
                <div className="mt-3 h-2 w-3/4 bg-slate-700" />
                <div className="mt-2 h-2 w-1/2 bg-slate-800" />
                <div className="mt-8 hidden space-y-2 sm:block">
                  <div className="h-7 border border-slate-700 bg-slate-900" />
                  <div className="h-7 border border-slate-700 bg-slate-900" />
                  <div className="h-7 border border-slate-700 bg-slate-900" />
                </div>
              </div>
              <div className="relative min-w-0 overflow-hidden">
                <PublicHeroPreview variant="product" />
              </div>
              <div className="relative border-l border-slate-700 bg-[#0b1727] p-2 sm:p-3">
                <p className="hidden text-[10px] font-black text-white sm:block">
                  {t("public.officeChat")}
                </p>
                <div className="mt-4 space-y-3">
                  <div className="border border-slate-700 bg-slate-900 p-2">
                    <div className="h-2 w-8 bg-emerald-300" />
                    <div className="mt-2 h-2 w-full bg-slate-700" />
                    <div className="mt-1 h-2 w-2/3 bg-slate-800" />
                  </div>
                  <div className="border border-slate-700 bg-slate-900 p-2">
                    <div className="h-2 w-8 bg-rose-300" />
                    <div className="mt-2 h-2 w-4/5 bg-slate-700" />
                  </div>
                </div>
                <div className="absolute bottom-4 hidden h-9 w-[118px] border border-slate-600 bg-slate-950 sm:block" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
