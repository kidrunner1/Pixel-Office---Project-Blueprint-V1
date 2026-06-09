"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { LanguageToggle } from "@/features/i18n/language-toggle";
import { useTranslation } from "@/features/i18n/use-translation";

type PublicShellProps = {
  children: ReactNode;
};

export function PublicBrandMark() {
  const { t } = useTranslation();

  return (
    <span className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className="grid h-7 w-7 grid-cols-2 border-2 border-slate-950 bg-amber-300 p-0.5 shadow-[3px_3px_0_#020617]"
      >
        <span className="bg-[#17324a]" />
        <span className="bg-[#ee6f57]" />
        <span className="bg-[#2f8f83]" />
        <span className="bg-[#f4d06f]" />
      </span>
      <span className="text-sm font-black text-white">
        {t("common.pixelOffice")}
      </span>
    </span>
  );
}

export function PublicShell({ children }: PublicShellProps) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#020817] text-white">
      <a
        className="fixed left-4 top-4 z-[100] -translate-y-24 bg-amber-300 px-4 py-2 font-bold text-slate-950 focus:translate-y-0"
        href="#main-content"
      >
        {t("public.skipToContent")}
      </a>

      <header className="absolute inset-x-0 top-0 z-50 border-b border-white/10 bg-[#020817]/80">
        <nav
          aria-label={t("public.navLabel")}
          className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-5 sm:px-8"
        >
          <Link aria-label={t("public.homeLabel")} href="/">
            <PublicBrandMark />
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageToggle compact />
            <Link
              className="hidden px-3 py-2 text-sm font-semibold text-slate-300 hover:text-white sm:inline-flex"
              href="/auth/login"
            >
              {t("common.signIn")}
            </Link>
            <Link
              className="border-2 border-slate-950 bg-amber-300 px-3 py-2 text-xs font-black text-slate-950 shadow-[3px_3px_0_#020617] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-200 motion-reduce:transition-none sm:px-4 sm:text-sm"
              href="/auth/register"
            >
              {t("common.createAccount")}
            </Link>
          </div>
        </nav>
      </header>

      <main id="main-content">{children}</main>

      <footer className="border-t border-slate-800 bg-[#020617]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <PublicBrandMark />
            <p className="mt-3 max-w-sm text-sm text-slate-400">
              {t("public.footerDescription")}
            </p>
          </div>
          <nav
            aria-label={t("public.footerNavLabel")}
            className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-slate-300"
          >
            <Link className="hover:text-amber-200" href="/office">
              {t("common.enterOffice")}
            </Link>
            <Link className="hover:text-amber-200" href="/auth/register">
              {t("common.createAccount")}
            </Link>
            <Link className="hover:text-amber-200" href="/auth/login">
              {t("common.signIn")}
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
