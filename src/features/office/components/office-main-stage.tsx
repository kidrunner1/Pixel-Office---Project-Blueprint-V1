"use client";

import { useTranslation } from "@/features/i18n/use-translation";
import { OfficeMap } from "@/features/office/components/office-map";
import type { FacingDirection } from "@/features/office/utils/player-direction";
import type { RoomView } from "@/types/room";

type OfficeMainStageProps = {
  blockedMessage: string | null;
  currentUserDirection: FacingDirection;
  currentUserId: string;
  error: string | null;
  hasJoined: boolean;
  isFull: boolean;
  isLoading: boolean;
  isMoving: boolean;
  onJoin: () => void;
  onLeave: () => void;
  realtimeError: string | null;
  room: RoomView | null;
};

export function OfficeMainStage({
  blockedMessage,
  currentUserDirection,
  currentUserId,
  error,
  hasJoined,
  isFull,
  isLoading,
  isMoving,
  onJoin,
  onLeave,
  realtimeError,
  room,
}: OfficeMainStageProps) {
  const { t } = useTranslation();
  const notice =
    realtimeError ??
    blockedMessage ??
    (isFull ? t("office.full") : error ? t("office.requestError") : null);

  return (
    <main className="flex min-h-0 min-w-0 flex-1 flex-col bg-[#040c18]">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-[#081526] px-3 py-2">
        <div className="flex min-w-0 items-center gap-3">
          <div>
            <h1 className="text-sm font-semibold text-slate-100">
              {room?.name === "Main Office" || !room?.name
                ? t("common.mainOffice")
                : room.name}
            </h1>
            <p className="mt-0.5 text-xs text-slate-500">
              {hasJoined
                ? isMoving
                  ? t("office.moving")
                  : t("office.moveHint")
                : t("office.joinRoomHint")}
            </p>
          </div>
          {notice ? (
            <p className="hidden max-w-72 truncate border border-amber-800 bg-amber-950/50 px-2 py-1 text-xs text-amber-200 lg:block">
              {notice}
            </p>
          ) : null}
        </div>

        {hasJoined ? (
          <button
            className="border border-rose-700 bg-rose-950/60 px-3 py-2 text-xs font-semibold text-rose-200 transition hover:border-rose-400 hover:bg-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-300 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isLoading}
            onClick={onLeave}
            type="button"
          >
            {isLoading ? t("office.leaving") : t("office.leave")}
          </button>
        ) : (
          <button
            className="border border-emerald-300 bg-emerald-300 px-3 py-2 text-xs font-bold text-slate-950 shadow-[2px_2px_0_#065f46] transition hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:border-slate-700 disabled:bg-slate-800 disabled:text-slate-500 disabled:shadow-none"
            disabled={isLoading}
            onClick={onJoin}
            type="button"
          >
            {isLoading ? t("office.joining") : t("office.join")}
          </button>
        )}
      </div>

      {notice ? (
        <p className="shrink-0 border-b border-amber-900/60 bg-amber-950/30 px-3 py-2 text-xs text-amber-200 lg:hidden">
          {notice}
        </p>
      ) : null}

      <div className="min-h-0 flex-1 overflow-auto p-1.5 sm:p-2">
        {room && hasJoined ? (
          <OfficeMap
            currentUserDirection={currentUserDirection}
            currentUserId={currentUserId}
            currentUserIsMoving={isMoving}
            room={room}
          />
        ) : (
          <section className="grid h-full min-h-80 place-items-center border-2 border-dashed border-cyan-900 bg-[#071426] p-6 text-center">
            <div>
              <span className="mx-auto grid h-12 w-12 place-items-center border-2 border-cyan-700 bg-cyan-950 text-sm font-black text-cyan-200">
                PO
              </span>
              <h2 className="mt-4 text-lg font-semibold text-cyan-100">
                {t("common.mainOffice")}
              </h2>
              <p className="mt-2 text-sm text-cyan-300">
                {t("office.joinSharedRoom")}
              </p>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
