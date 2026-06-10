"use client";

import { AvatarPreview } from "@/features/avatar/components/avatar-preview";
import { useTranslation } from "@/features/i18n/use-translation";
import { OfficeStatusBadge } from "@/features/office/components/office-status-badge";
import { getMemberPresenceVisual } from "@/features/office/utils/member-presence";
import type { RoomMemberView } from "@/types/room";

type OfficeMemberCardProps = {
  compact?: boolean;
  isCurrentUser?: boolean;
  member: RoomMemberView;
};

const presenceLightClasses = {
  active: "bg-emerald-400",
  focus: "bg-cyan-400",
  meeting: "bg-violet-400",
  break: "bg-amber-400",
  away: "bg-slate-500",
};

export function OfficeMemberCard({
  compact = false,
  isCurrentUser = false,
  member,
}: OfficeMemberCardProps) {
  const { t } = useTranslation();
  const effectiveStatus = member.isOnline ? member.status : "away";
  const presenceVisual = getMemberPresenceVisual(effectiveStatus);
  const displayRole =
    member.user.role.toUpperCase() === "MEMBER"
      ? t("role.member")
      : member.user.role.toUpperCase() === "ADMIN"
        ? t("role.admin")
        : member.user.role;

  return (
    <article
      className={[
        "relative overflow-hidden rounded-[3px] border bg-[#071426]",
        compact
          ? "p-2.5"
          : "p-3 shadow-[3px_3px_0_#020617]",
        isCurrentUser
          ? "border-emerald-300 bg-emerald-950/20 shadow-[0_0_0_1px_rgba(52,211,153,0.14),3px_3px_0_#020617]"
          : "border-slate-800",
      ].join(" ")}
    >
      <div className="flex items-start gap-2.5">
        <div
          className={[
            "relative grid h-[62px] w-[46px] shrink-0 place-items-end overflow-hidden border bg-slate-950/80",
            isCurrentUser
              ? "border-emerald-600"
              : "border-slate-700",
          ].join(" ")}
        >
          <div
            className={
              presenceVisual.isDimmed
                ? "opacity-65 grayscale-[0.45]"
                : ""
            }
          >
            <AvatarPreview
              avatar={member.avatar}
              showCaption={false}
              size="mini"
            />
          </div>
          <span
            aria-hidden="true"
            className={[
              "absolute bottom-1 right-1 h-2.5 w-2.5 border-2 border-slate-950 shadow-[1px_1px_0_rgba(2,6,23,0.8)]",
              presenceLightClasses[presenceVisual.tone],
            ].join(" ")}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-center gap-1.5">
            <h3 className="min-w-0 truncate text-sm font-semibold text-slate-100">
              {member.user.name}
            </h3>
            {isCurrentUser ? (
              <span className="shrink-0 border border-emerald-200 bg-emerald-300 px-1.5 py-0.5 text-[9px] font-black leading-none text-slate-950">
                {t("common.you")}
              </span>
            ) : null}
          </div>

          <p className="mt-0.5 truncate text-[10px] font-medium text-slate-500">
            {displayRole}
          </p>

          <div className="mt-2">
            <OfficeStatusBadge status={effectiveStatus} />
          </div>
        </div>
      </div>

      <div className="mt-2.5 border-t border-slate-800 pt-2">
        <p className="text-[9px] font-semibold text-cyan-400">
          {t("office.todaysFocus")}
        </p>
        <p
          className={[
            "mt-1 line-clamp-2 text-xs leading-[1.1rem]",
            member.todayTask ? "text-slate-300" : "text-slate-500",
          ].join(" ")}
          title={member.todayTask ?? t("office.noFocusSet")}
        >
          {member.todayTask || t("office.noFocusSet")}
        </p>
      </div>
    </article>
  );
}
