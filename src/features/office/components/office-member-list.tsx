"use client";

import { useTranslation } from "@/features/i18n/use-translation";
import { OfficeMemberCard } from "@/features/office/components/office-member-card";
import type { RoomMemberView } from "@/types/room";

type OfficeMemberListProps = {
  compact?: boolean;
  currentUserId: string;
  maxMembers: number;
  members: RoomMemberView[];
};

export function OfficeMemberList({
  compact = false,
  currentUserId,
  maxMembers,
  members,
}: OfficeMemberListProps) {
  const { t } = useTranslation();

  return (
    <section
      className={
        compact
          ? ""
          : "rounded-md border-2 border-indigo-900/80 bg-[#101538] p-4 shadow-[4px_4px_0_#030712]"
      }
    >
      <div
        className={[
          "flex items-center justify-between gap-3",
          compact ? "mb-3" : "mb-4",
        ].join(" ")}
      >
        <h2
          className={
            compact
              ? "text-base font-semibold text-indigo-100"
              : "text-lg font-semibold text-indigo-100"
          }
        >
          {t("office.onlineMembers")}
        </h2>
        <span className="rounded bg-indigo-300 px-2 py-1 text-xs font-semibold text-slate-950">
          {members.length}/{maxMembers}
        </span>
      </div>

      {members.length > 0 ? (
        <div className="space-y-3">
          {members.map((member) => (
            <OfficeMemberCard
              compact={compact}
              isCurrentUser={member.userId === currentUserId}
              key={member.id}
              member={member}
            />
          ))}
        </div>
      ) : (
        <p className="rounded border border-dashed border-indigo-700 bg-slate-950/50 px-4 py-6 text-center text-sm text-slate-400">
          {t("office.noMembers")}
        </p>
      )}
    </section>
  );
}
