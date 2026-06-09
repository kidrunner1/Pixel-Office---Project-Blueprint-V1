"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useTranslation } from "@/features/i18n/use-translation";
import { useAuthStore } from "@/stores/auth-store";

type LogoutButtonProps = {
  compact?: boolean;
};

export function LogoutButton({ compact = false }: LogoutButtonProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const logout = useAuthStore((state) => state.logout);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      await logout();
      router.push("/auth/login");
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <button
      className={
        compact
          ? "border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-cyan-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-300 disabled:cursor-not-allowed disabled:text-slate-500"
          : "rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:text-slate-400"
      }
      disabled={isLoggingOut}
      onClick={handleLogout}
      type="button"
    >
      {isLoggingOut ? t("auth.loggingOut") : t("auth.logOut")}
    </button>
  );
}
