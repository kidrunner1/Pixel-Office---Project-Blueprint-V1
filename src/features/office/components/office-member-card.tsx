"use client";

import { useTranslation } from "@/features/i18n/use-translation";
import type { RoomMemberView } from "@/types/room";

type OfficeMemberCardProps = {
  compact?: boolean;
  isCurrentUser?: boolean;
  member: RoomMemberView;
};

const statusClasses: Record<RoomMemberView["status"], string> = {
  online: "bg-emerald-500/15 text-emerald-200 ring-emerald-400/30",
  focus: "bg-blue-500/15 text-blue-200 ring-blue-400/30",
  meeting: "bg-violet-500/15 text-violet-200 ring-violet-400/30",
  break: "bg-amber-500/15 text-amber-200 ring-amber-400/30",
};

export function OfficeMemberCard({
  compact = false,
  isCurrentUser = false,
  member,
}: OfficeMemberCardProps) {
  const { t } = useTranslation();
  const displayRole =
    member.user.role.toUpperCase() === "MEMBER"
      ? t("role.member")
      : member.user.role.toUpperCase() === "ADMIN"
        ? t("role.admin")
        : member.user.role;

  return (
    <article
      className={[
        "rounded border bg-slate-950/60",
        compact ? "p-2.5" : "border-2 p-3 shadow-[3px_3px_0_#020617]",
        isCurrentUser
          ? "border-emerald-300"
          : "border-slate-800",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-medium text-slate-100">{member.user.name}</h3>
            {isCurrentUser ? (
              <span className="rounded bg-emerald-300 px-1.5 py-0.5 text-[10px] font-bold text-slate-950">
                {t("common.you")}
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-xs text-slate-400">{displayRole}</p>
        </div>
        <span
          className={[
            "rounded px-2 py-1 text-xs font-medium ring-1",
            statusClasses[member.status],
          ].join(" ")}
        >
          {t(`status.${member.status}`)}
        </span>
      </div>

      <p
        className={[
          "text-slate-300",
          compact
            ? "mt-2 truncate text-xs"
            : "mt-4 text-sm leading-6",
        ].join(" ")}
      >
        {member.todayTask || t("office.noTask")}
      </p>
    </article>
  );
}
