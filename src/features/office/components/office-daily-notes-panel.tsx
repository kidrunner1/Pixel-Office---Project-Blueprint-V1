"use client";

import { useTranslation } from "@/features/i18n/use-translation";
import type { RoomMemberView } from "@/types/room";

type OfficeDailyNotesPanelProps = {
  member: RoomMemberView | null;
};

export function OfficeDailyNotesPanel({
  member,
}: OfficeDailyNotesPanelProps) {
  const { t } = useTranslation();
  const activityLogItems = [
    t("office.activityJoined"),
    t("office.activityStatus"),
    t("office.activityMoved"),
  ];

  return (
    <section className="rounded-md border-2 border-cyan-900/80 bg-[#0b1730] p-4 shadow-[4px_4px_0_#030712]">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-cyan-100">
          {t("office.dailyNotes")}
        </h2>
        <span className="rounded bg-cyan-300 px-2 py-1 text-xs font-semibold text-slate-950">
          {t("common.today")}
        </span>
      </div>

      <div className="mt-4 rounded border border-cyan-800 bg-slate-950/70 p-3">
        <p className="text-xs font-medium text-cyan-300">
          {t("office.currentTask")}
        </p>
        <p className="mt-2 min-h-12 text-sm leading-6 text-slate-100">
          {member?.todayTask || t("office.noTask")}
        </p>
      </div>

      <div className="mt-4">
        <p className="text-xs font-medium text-cyan-300">
          {t("office.activityLog")}
        </p>
        <ul className="mt-2 space-y-2">
          {activityLogItems.map((item) => (
            <li
              className="flex items-center gap-2 rounded border border-slate-800 bg-slate-950/50 px-3 py-2 text-sm text-slate-200"
              key={item}
            >
              <span className="h-2 w-2 shrink-0 bg-emerald-300" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
