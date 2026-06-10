"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import { useTranslation } from "@/features/i18n/use-translation";
import {
  getStatusPresentation,
  type StatusTone,
} from "@/features/office/utils/status-label";
import { syncSocketPresence } from "@/features/office/utils/sync-socket-presence";
import { roomMemberStatusOptions } from "@/lib/validations/room";
import { useRoomStore } from "@/stores/room-store";
import type { RoomMemberStatus, RoomMemberView } from "@/types/room";

type OfficeStatusPanelProps = {
  compact?: boolean;
  currentUserId: string;
  currentUserName: string;
  member: RoomMemberView;
  onManualStatusChange: (status: RoomMemberStatus) => void;
};

const selectedStatusClasses: Record<StatusTone, string> = {
  active: "border-emerald-300 bg-emerald-400/15 text-emerald-100",
  focus: "border-cyan-300 bg-cyan-400/15 text-cyan-100",
  meeting: "border-violet-300 bg-violet-400/15 text-violet-100",
  break: "border-amber-300 bg-amber-400/15 text-amber-100",
  away: "border-slate-400 bg-slate-700/70 text-slate-100",
};

export function OfficeStatusPanel({
  compact = false,
  currentUserId,
  currentUserName,
  member,
  onManualStatusChange,
}: OfficeStatusPanelProps) {
  const { t } = useTranslation();
  const updateMyMember = useRoomStore((state) => state.updateMyMember);
  const isLoading = useRoomStore((state) => state.isLoading);
  const [statusDraft, setStatusDraft] = useState<{
    sourceStatus: RoomMemberStatus;
    value: RoomMemberStatus;
  }>({
    sourceStatus: member.status,
    value: member.status,
  });
  const [todayTask, setTodayTask] = useState(member.todayTask ?? "");
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const status =
    statusDraft.value !== statusDraft.sourceStatus
      ? statusDraft.value
      : member.status;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setErrorMessage(null);

    try {
      await updateMyMember(currentUserId, {
        positionX: member.positionX,
        positionY: member.positionY,
        status,
        todayTask,
      });
      const savedMember = useRoomStore.getState().myMember;

      if (savedMember) {
        syncSocketPresence(currentUserName, savedMember);
      }

      onManualStatusChange(status);
      setStatusDraft({
        sourceStatus: status,
        value: status,
      });
      setMessage(t("office.statusSaved"));
    } catch {
      setErrorMessage(t("office.statusUpdateError"));
    }
  }

  return (
    <section
      className={
        compact
          ? ""
          : "rounded-md border-2 border-emerald-900/80 bg-[#0c1f2c] p-4 shadow-[4px_4px_0_#030712]"
      }
    >
      <h2
        className={
          compact
            ? "text-base font-semibold text-emerald-100"
            : "text-lg font-semibold text-emerald-100"
        }
      >
        {t("office.todayTodo")}
      </h2>
      <form
        className={compact ? "mt-3 space-y-3" : "mt-4 space-y-4"}
        onSubmit={handleSubmit}
      >
        <fieldset disabled={isLoading}>
          <legend className="text-sm font-medium text-emerald-200">
            {t("office.status")}
          </legend>
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            {roomMemberStatusOptions.map((option) => {
              const presentation = getStatusPresentation(option);
              const isSelected = option === status;

              return (
                <button
                  aria-pressed={isSelected}
                  className={[
                    "flex min-h-10 items-center gap-2 border px-2.5 py-2 text-left text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-emerald-300 disabled:cursor-not-allowed disabled:opacity-60",
                    option === "away" ? "col-span-2" : "",
                    isSelected
                      ? selectedStatusClasses[presentation.tone]
                      : "border-slate-700 bg-slate-950/70 text-slate-400 hover:border-slate-500 hover:text-slate-200",
                  ].join(" ")}
                  key={option}
                  onClick={() =>
                    setStatusDraft({
                      sourceStatus: member.status,
                      value: option,
                    })
                  }
                  type="button"
                >
                  <span aria-hidden="true" className="text-sm">
                    {presentation.icon}
                  </span>
                  <span className="truncate">
                    {t(presentation.labelKey)}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-[10px] leading-4 text-slate-500">
            {t("office.autoAwayHint")}
          </p>
        </fieldset>

        <label className="space-y-2" htmlFor="today-task">
          <span className="block text-sm font-medium text-emerald-200">
            {t("office.todaysTask")}
          </span>
          <textarea
            className={[
              "w-full resize-none rounded border-2 border-emerald-900 bg-slate-950 px-3 py-2 text-sm leading-5 text-slate-100 outline-none transition placeholder:text-slate-400 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-400/20",
              compact ? "min-h-20" : "min-h-28",
            ].join(" ")}
            disabled={isLoading}
            id="today-task"
            maxLength={120}
            onChange={(event) => setTodayTask(event.target.value)}
            placeholder={t("office.taskPlaceholder")}
            value={todayTask}
          />
          <span className="block text-right text-xs text-slate-500">
            {todayTask.length}/120
          </span>
        </label>

        {errorMessage ? (
          <p className="rounded-md border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {errorMessage}
          </p>
        ) : null}

        {message ? (
          <p className="rounded-md border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
            {message}
          </p>
        ) : null}

        <button
          className="w-full rounded border-2 border-emerald-200 bg-emerald-400 px-4 py-2 text-sm font-bold text-slate-950 shadow-[3px_3px_0_#064e3b] transition hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:border-slate-600 disabled:bg-slate-700 disabled:text-slate-400 disabled:shadow-none"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? t("common.saving") : t("office.saveStatus")}
        </button>
      </form>
    </section>
  );
}
