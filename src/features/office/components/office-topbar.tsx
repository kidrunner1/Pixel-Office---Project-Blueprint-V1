"use client";

import { LogoutButton } from "@/features/auth/components/logout-button";
import { LanguageToggle } from "@/features/i18n/language-toggle";
import { useTranslation } from "@/features/i18n/use-translation";

type OfficeTopbarProps = {
  activeMemberCount: number;
  currentUserName: string;
  isConnected: boolean;
  maxMembers: number;
  onOpenSidebar: () => void;
  roomName?: string;
};

export function OfficeTopbar({
  activeMemberCount,
  currentUserName,
  isConnected,
  maxMembers,
  onOpenSidebar,
  roomName,
}: OfficeTopbarProps) {
  const { t } = useTranslation();

  return (
    <header className="flex h-[52px] shrink-0 items-center justify-between gap-3 border-b border-cyan-950 bg-[#061225] px-2.5 shadow-[0_2px_0_#020617] sm:px-3">
      <div className="flex min-w-0 items-center gap-2.5">
        <button
          aria-label={t("office.openTools")}
          className="grid h-8 w-8 shrink-0 place-items-center border border-cyan-700 bg-slate-950 text-cyan-100 transition hover:border-cyan-400 hover:bg-cyan-950 focus:outline-none focus:ring-2 focus:ring-cyan-300 xl:hidden"
          onClick={onOpenSidebar}
          type="button"
        >
          <span aria-hidden="true" className="grid gap-1">
            <span className="h-0.5 w-4 bg-current" />
            <span className="h-0.5 w-4 bg-current" />
            <span className="h-0.5 w-4 bg-current" />
          </span>
        </button>

        <span className="grid h-[30px] w-[30px] shrink-0 place-items-center border-2 border-cyan-300 bg-cyan-300 text-[10px] font-black text-slate-950 shadow-[2px_2px_0_#155e75]">
          PO
        </span>

        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-slate-50">
          {t("common.pixelOffice")}
          </p>
          <p className="truncate text-[11px] text-cyan-300">
            {roomName ?? t("common.mainOffice")}
          </p>
        </div>
      </div>

      <div className="hidden items-center gap-2 md:flex">
        <span className="border border-slate-700 bg-slate-950/80 px-2 py-1 text-[11px] text-slate-200">
          {t("office.seats", {
            active: activeMemberCount,
            max: maxMembers,
          })}
        </span>
        <span
          className={[
            "inline-flex items-center gap-1.5 border px-2 py-1 text-[11px] font-medium",
            isConnected
              ? "border-emerald-700 bg-emerald-950/60 text-emerald-200"
              : "border-slate-700 bg-slate-950 text-slate-400",
          ].join(" ")}
        >
          <span
            aria-hidden="true"
            className={[
              "h-2 w-2",
              isConnected ? "bg-emerald-300" : "bg-slate-500",
            ].join(" ")}
          />
          {isConnected ? t("common.connected") : t("common.disconnected")}
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <LanguageToggle compact />
        <div className="hidden text-right sm:block">
          <p className="max-w-28 truncate text-xs font-semibold text-slate-100">
            {currentUserName}
          </p>
        </div>
        <LogoutButton compact />
      </div>
    </header>
  );
}
