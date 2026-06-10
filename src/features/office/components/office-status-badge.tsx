"use client";

import { useTranslation } from "@/features/i18n/use-translation";
import {
  getStatusPresentation,
  type StatusTone,
} from "@/features/office/utils/status-label";
import type { RoomMemberStatus } from "@/types/room";

type OfficeStatusBadgeProps = {
  density?: "card" | "room";
  status: RoomMemberStatus;
};

const toneClasses: Record<StatusTone, string> = {
  active: "border-emerald-500/50 bg-emerald-950/90 text-emerald-100",
  focus: "border-cyan-400/60 bg-cyan-950/90 text-cyan-100",
  meeting: "border-violet-400/60 bg-violet-950/90 text-violet-100",
  break: "border-amber-400/60 bg-amber-950/90 text-amber-100",
  away: "border-slate-500 bg-slate-900/90 text-slate-200",
};

export function OfficeStatusBadge({
  density = "card",
  status,
}: OfficeStatusBadgeProps) {
  const { t } = useTranslation();
  const presentation = getStatusPresentation(status);

  return (
    <span
      className={[
        "inline-flex max-w-full items-center gap-1 overflow-hidden whitespace-nowrap border font-semibold leading-none shadow-[2px_2px_0_rgba(2,6,23,0.72)]",
        density === "room"
          ? "px-1.5 py-1 text-[9px]"
          : "px-1.5 py-1 text-[10px]",
        toneClasses[presentation.tone],
      ].join(" ")}
    >
      <span aria-hidden="true" className="shrink-0 text-[11px]">
        {presentation.icon}
      </span>
      <span className="truncate">{t(presentation.labelKey)}</span>
    </span>
  );
}
