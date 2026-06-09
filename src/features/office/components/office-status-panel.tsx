"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import { useTranslation } from "@/features/i18n/use-translation";
import { roomMemberStatusOptions } from "@/lib/validations/room";
import { useRoomStore } from "@/stores/room-store";
import type { RoomMemberStatus, RoomMemberView } from "@/types/room";

type OfficeStatusPanelProps = {
  compact?: boolean;
  currentUserId: string;
  member: RoomMemberView;
};

function isRoomMemberStatus(value: string): value is RoomMemberStatus {
  return roomMemberStatusOptions.some((status) => status === value);
}

export function OfficeStatusPanel({
  compact = false,
  currentUserId,
  member,
}: OfficeStatusPanelProps) {
  const { t } = useTranslation();
  const updateMyMember = useRoomStore((state) => state.updateMyMember);
  const isLoading = useRoomStore((state) => state.isLoading);
  const [status, setStatus] = useState<RoomMemberStatus>(member.status);
  const [todayTask, setTodayTask] = useState(member.todayTask ?? "");
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
        <label className="space-y-2" htmlFor="room-status">
          <span className="block text-sm font-medium text-emerald-200">
            {t("office.status")}
          </span>
          <select
            className="w-full rounded border-2 border-emerald-900 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-400/20"
            disabled={isLoading}
            id="room-status"
            onChange={(event) => {
              if (isRoomMemberStatus(event.target.value)) {
                setStatus(event.target.value);
              }
            }}
            value={status}
          >
            {roomMemberStatusOptions.map((option) => (
              <option key={option} value={option}>
                {t(`status.${option}`)}
              </option>
            ))}
          </select>
        </label>

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
