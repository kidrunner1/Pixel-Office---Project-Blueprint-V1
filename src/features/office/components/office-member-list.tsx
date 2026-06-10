"use client";

import { useTranslation } from "@/features/i18n/use-translation";
import { OfficeMemberCard } from "@/features/office/components/office-member-card";
import {
  sortMembersByPresence,
  summarizeMembersByStatus,
} from "@/features/office/utils/member-presence";
import { getStatusPresentation } from "@/features/office/utils/status-label";
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
  const sortedMembers = sortMembersByPresence(members, currentUserId);
  const presenceSummary = summarizeMembersByStatus(members);

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
          compact ? "mb-2.5" : "mb-4",
        ].join(" ")}
      >
        <div>
          <h2
            className={
              compact
                ? "text-sm font-semibold text-indigo-100"
                : "text-lg font-semibold text-indigo-100"
            }
          >
            {t("office.onlineMembers")}
          </h2>
          {compact ? (
            <p className="mt-0.5 text-[10px] text-slate-500">
              {t("office.seatsOccupied", {
                active: members.length,
                max: maxMembers,
              })}
            </p>
          ) : null}
        </div>
        <span className="border border-indigo-200 bg-indigo-300 px-2 py-1 text-[10px] font-black text-slate-950 shadow-[2px_2px_0_#312e81]">
          {members.length}/{maxMembers}
        </span>
      </div>

      {presenceSummary.length > 0 ? (
        <div className="mb-2.5 flex flex-wrap gap-1.5">
          {presenceSummary.map(({ count, status }) => {
            const presentation = getStatusPresentation(status);

            return (
              <span
                className="inline-flex items-center gap-1 border border-slate-700 bg-slate-950/65 px-1.5 py-1 text-[9px] font-semibold leading-none text-slate-300"
                key={status}
              >
                <span aria-hidden="true">{presentation.icon}</span>
                <span>
                  {count} {t(presentation.labelKey)}
                </span>
              </span>
            );
          })}
        </div>
      ) : null}

      {members.length > 0 ? (
        <div className={compact ? "space-y-2" : "space-y-3"}>
          {sortedMembers.map((member) => (
            <OfficeMemberCard
              compact={compact}
              isCurrentUser={member.userId === currentUserId}
              key={member.id}
              member={member}
            />
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-indigo-700 bg-slate-950/50 px-4 py-6 text-center">
          <span
            aria-hidden="true"
            className="mx-auto grid h-9 w-9 grid-cols-2 gap-1 border border-indigo-800 bg-indigo-950/70 p-1.5"
          >
            <span className="bg-indigo-400/45" />
            <span className="bg-indigo-400/25" />
            <span className="bg-indigo-400/25" />
            <span className="bg-indigo-400/45" />
          </span>
          <p className="mt-3 text-xs leading-5 text-slate-400">
            {t("office.noMembers")}
          </p>
        </div>
      )}
    </section>
  );
}
