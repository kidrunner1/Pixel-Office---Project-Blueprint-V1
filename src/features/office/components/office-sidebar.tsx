"use client";

import { useState } from "react";

import { AvatarCustomizer } from "@/features/avatar/components/avatar-customizer";
import { useTranslation } from "@/features/i18n/use-translation";
import { OfficeMemberList } from "@/features/office/components/office-member-list";
import { OfficeStatusPanel } from "@/features/office/components/office-status-panel";
import { getStatusPresentation } from "@/features/office/utils/status-label";
import type { RoomMemberStatus } from "@/types/room";
import type { RoomMemberView } from "@/types/room";

type OfficeSidebarProps = {
  currentUserId: string;
  currentUserName: string;
  currentUserRole: string;
  isOpen: boolean;
  maxMembers: number;
  members: RoomMemberView[];
  myMember: RoomMemberView | null;
  onClose: () => void;
  onManualStatusChange: (status: RoomMemberStatus) => void;
};

type SidebarTab = "profile" | "today" | "members" | "customize";

const sidebarTabs = ["profile", "today", "members", "customize"] as const;

function SidebarTabIcon({ tab }: { tab: SidebarTab }) {
  if (tab === "profile") {
    return (
      <span
        aria-hidden="true"
        className="relative block h-4 w-4 rounded-full border border-current before:absolute before:left-1/2 before:top-[3px] before:h-1 before:w-1 before:-translate-x-1/2 before:rounded-full before:bg-current after:absolute after:bottom-[2px] after:left-1/2 after:h-1.5 after:w-2 after:-translate-x-1/2 after:rounded-t-full after:bg-current"
      />
    );
  }

  if (tab === "today") {
    return (
      <span
        aria-hidden="true"
        className="relative block h-4 w-4 border border-current before:absolute before:left-[3px] before:top-[7px] before:h-1 before:w-2 before:-rotate-45 before:border-b before:border-l before:border-current"
      />
    );
  }

  if (tab === "members") {
    return (
      <span aria-hidden="true" className="relative block h-4 w-5">
        <span className="absolute left-0 top-1 h-1.5 w-1.5 rounded-full bg-current" />
        <span className="absolute right-0 top-1 h-1.5 w-1.5 rounded-full bg-current" />
        <span className="absolute bottom-0 left-0 h-1.5 w-2 border border-current" />
        <span className="absolute bottom-0 right-0 h-1.5 w-2 border border-current" />
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className="grid h-4 w-4 grid-cols-2 gap-0.5"
    >
      <span className="bg-current" />
      <span className="bg-current" />
      <span className="bg-current" />
      <span className="bg-current" />
    </span>
  );
}

export function OfficeSidebar({
  currentUserId,
  currentUserName,
  currentUserRole,
  isOpen,
  maxMembers,
  members,
  myMember,
  onClose,
  onManualStatusChange,
}: OfficeSidebarProps) {
  const [activeTab, setActiveTab] = useState<SidebarTab>("profile");
  const { t } = useTranslation();
  const tabLabels: Record<SidebarTab, string> = {
    profile: t("office.profile"),
    today: t("office.today"),
    members: t("office.members"),
    customize: t("office.avatar"),
  };
  const statusPresentation = myMember
    ? getStatusPresentation(myMember.status)
    : null;
  const displayRole =
    currentUserRole.toUpperCase() === "MEMBER"
      ? t("role.member")
      : currentUserRole.toUpperCase() === "ADMIN"
        ? t("role.admin")
        : currentUserRole;

  return (
    <>
      {isOpen ? (
        <button
          aria-label={t("office.closeTools")}
          className="fixed inset-0 z-[3900] bg-slate-950/60 xl:hidden"
          onClick={onClose}
          type="button"
        />
      ) : null}

      <aside
        className={[
          "fixed inset-y-0 left-0 z-[4000] flex w-[min(86vw,288px)] flex-col border-r border-cyan-950 bg-[#08162a] shadow-[8px_0_24px_rgba(2,6,23,0.5)] transition-transform duration-200 ease-out motion-reduce:transition-none xl:static xl:z-auto xl:w-[252px] xl:translate-x-0 xl:shadow-none",
          isOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="flex h-[52px] shrink-0 items-center justify-between border-b border-slate-800 px-3 xl:hidden">
          <p className="font-semibold text-slate-100">
            {t("office.workspaceTools")}
          </p>
          <button
            aria-label={t("office.closeTools")}
            className="grid h-9 w-9 place-items-center border border-slate-700 bg-slate-950 text-lg text-slate-200 hover:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300"
            onClick={onClose}
            type="button"
          >
            x
          </button>
        </div>

        <nav
          aria-label={t("office.workspaceTools")}
          className="grid shrink-0 grid-cols-4 gap-1 border-b border-slate-800 p-1.5"
        >
          {sidebarTabs.map((tab) => (
            <button
              aria-pressed={activeTab === tab}
              className={[
                "flex min-h-11 flex-col items-center justify-center gap-1 border px-1 py-1.5 text-[10px] font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-300",
                activeTab === tab
                  ? "border-cyan-500 bg-cyan-950 text-cyan-100 shadow-[inset_0_-2px_0_#22d3ee]"
                  : "border-transparent bg-transparent text-slate-500 hover:border-slate-700 hover:bg-slate-950/60 hover:text-slate-200",
              ].join(" ")}
              key={tab}
              onClick={() => setActiveTab(tab)}
              type="button"
            >
              <SidebarTabIcon tab={tab} />
              {tabLabels[tab]}
            </button>
          ))}
        </nav>

        <div className="min-h-0 flex-1 overflow-y-auto p-2.5">
          {activeTab === "profile" ? (
            <section aria-labelledby="profile-heading" className="space-y-2.5">
              <div className="border border-slate-800 bg-slate-950/55 p-3">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center border border-cyan-700 bg-cyan-950 text-sm font-bold text-cyan-200">
                    {currentUserName.slice(0, 1).toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <h2
                      className="truncate text-sm font-semibold text-slate-100"
                      id="profile-heading"
                    >
                      {currentUserName}
                    </h2>
                    <p className="mt-0.5 truncate text-[11px] text-slate-500">
                      {displayRole}
                    </p>
                  </div>
                </div>

                <dl className="mt-3 grid grid-cols-2 gap-px bg-slate-800">
                  <div className="bg-[#091426] px-2 py-2">
                    <dt className="text-[10px] text-slate-500">
                      {t("office.status")}
                    </dt>
                    <dd className="mt-0.5 truncate text-xs font-medium text-emerald-200">
                      {myMember
                        ? t(statusPresentation?.labelKey ?? "status.active")
                        : t("office.notJoined")}
                    </dd>
                  </div>
                  <div className="bg-[#091426] px-2 py-2">
                    <dt className="text-[10px] text-slate-500">
                      {t("office.position")}
                    </dt>
                    <dd className="mt-0.5 text-xs font-medium text-slate-100">
                      {myMember
                        ? `${myMember.positionX}, ${myMember.positionY}`
                        : t("office.outside")}
                    </dd>
                  </div>
                  <div className="col-span-2 flex items-center justify-between bg-[#091426] px-2 py-2">
                    <dt className="text-[10px] text-slate-500">
                      {t("office.officeState")}
                    </dt>
                    <dd className="text-xs font-medium text-slate-100">
                      {myMember
                        ? t("office.checkedIn")
                        : t("office.notJoined")}
                    </dd>
                  </div>
                </dl>
                <p className="mt-2 text-[10px] leading-4 text-slate-500">
                  {t("office.autoAwayHint")}
                </p>
              </div>

              <div className="border border-slate-800 bg-[#0b1d2c] p-3">
                <p className="text-xs font-medium text-cyan-300">
                  {t("office.todaysFocus")}
                </p>
                <p className="mt-1.5 text-xs leading-5 text-slate-200">
                  {myMember?.todayTask || t("office.noTask")}
                </p>
              </div>
            </section>
          ) : null}

          {activeTab === "today" ? (
            myMember ? (
              <OfficeStatusPanel
                compact
                currentUserId={currentUserId}
                currentUserName={currentUserName}
                member={myMember}
                onManualStatusChange={onManualStatusChange}
              />
            ) : (
              <p className="border border-dashed border-slate-700 bg-slate-950/40 px-3 py-8 text-center text-sm text-slate-400">
                {t("office.joinToUpdate")}
              </p>
            )
          ) : null}

          {activeTab === "members" ? (
            <OfficeMemberList
              compact
              currentUserId={currentUserId}
              maxMembers={maxMembers}
              members={members}
            />
          ) : null}

          {activeTab === "customize" ? <AvatarCustomizer compact /> : null}
        </div>
      </aside>
    </>
  );
}
