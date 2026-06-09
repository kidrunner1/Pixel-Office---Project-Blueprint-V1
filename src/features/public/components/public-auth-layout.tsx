"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { LanguageToggle } from "@/features/i18n/language-toggle";
import { useTranslation } from "@/features/i18n/use-translation";
import { PublicHeroPreview } from "@/features/public/components/public-hero-preview";
import { PublicBrandMark } from "@/features/public/components/public-shell";

type PublicAuthLayoutProps = {
  children: ReactNode;
  variant: "login" | "register";
};

export function PublicAuthLayout({
  children,
  variant,
}: PublicAuthLayoutProps) {
  const { t } = useTranslation();
  const eyebrow =
    variant === "login" ? t("auth.loginEyebrow") : t("auth.registerEyebrow");
  const title =
    variant === "login" ? t("auth.loginTitle") : t("auth.registerTitle");
  const description =
    variant === "login" ? t("auth.loginPitch") : t("auth.registerPitch");

  return (
    <main className="min-h-screen bg-[#020817] text-white lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(420px,0.9fr)]">
      <section className="relative min-h-[390px] overflow-hidden border-b-4 border-slate-950 lg:min-h-screen lg:border-b-0 lg:border-r-4">
        <PublicHeroPreview variant="auth" />
        <div className="absolute inset-0 bg-[#020817]/45" />
        <div className="relative z-10 flex h-full min-h-[390px] flex-col justify-between p-6 sm:p-10 lg:min-h-screen lg:p-12">
          <div className="flex items-center justify-between gap-3">
            <Link
              className="w-fit focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-200"
              href="/"
            >
              <PublicBrandMark />
            </Link>
            <LanguageToggle compact />
          </div>

          <div className="max-w-xl pb-4 text-shadow-public lg:pb-12">
            <p className="text-xs font-black text-amber-200">{eyebrow}</p>
            <h1 className="mt-4 max-w-lg text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-6 text-slate-200 sm:text-base">
              {description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-bold text-slate-100">
              <span className="border border-white/20 bg-slate-950/70 px-3 py-2">
                {t("auth.oneCozyRoom")}
              </span>
              <span className="border border-white/20 bg-slate-950/70 px-3 py-2">
                {t("auth.livePresence")}
              </span>
              <span className="border border-white/20 bg-slate-950/70 px-3 py-2">
                {t("auth.upToFour")}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="flex min-h-[600px] items-center justify-center bg-[#07111f] px-5 py-10 sm:px-10 lg:min-h-screen lg:px-12">
        <div className="w-full max-w-md">
          <Link
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-200"
            href="/"
          >
            <span aria-hidden="true">←</span>
            {t("auth.backToLobby")}
          </Link>
          {children}
        </div>
      </section>
    </main>
  );
}
