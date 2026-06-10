"use client";

import type { CSSProperties } from "react";

import { AvatarPreview } from "@/features/avatar/components/avatar-preview";
import { OfficeStatusBadge } from "@/features/office/components/office-status-badge";
import {
  OFFICE_TILE_SIZE,
  getPlayerZIndex,
} from "@/features/office/data/office-objects";
import { getMemberPresenceVisual } from "@/features/office/utils/member-presence";
import { formatSpeechBubbleMessage } from "@/features/office/utils/speech-bubble";
import type { StatusTone } from "@/features/office/utils/status-label";
import type { FacingDirection } from "@/features/office/utils/player-direction";
import { useSpeechBubbleStore } from "@/stores/speech-bubble-store";
import type { RoomMemberView } from "@/types/room";

type OfficePlayerProps = {
  direction: FacingDirection;
  isCurrentUser: boolean;
  isWalking?: boolean;
  member: RoomMemberView;
};

const PLAYER_BOX_HEIGHT = 114;
const PLAYER_BOX_WIDTH = 80;
const PLAYER_OFFSET_Y = 36;

const presenceGlowClasses: Record<StatusTone, string> = {
  active: "bg-transparent",
  focus: "bg-cyan-300/25",
  meeting: "bg-violet-400/25",
  break: "bg-amber-300/25",
  away: "bg-slate-300/10",
};

function getPlayerPositionStyle(member: RoomMemberView): CSSProperties {
  return {
    transform: `translate3d(${member.positionX * OFFICE_TILE_SIZE}px, ${
      member.positionY * OFFICE_TILE_SIZE - PLAYER_OFFSET_Y
    }px, 0)`,
  };
}

export function OfficePlayer({
  direction,
  isCurrentUser,
  isWalking = false,
  member,
}: OfficePlayerProps) {
  const bubble = useSpeechBubbleStore(
    (state) => state.bubblesByUserId[member.userId],
  );
  const positionStyle = getPlayerPositionStyle(member);
  const playerZIndex = getPlayerZIndex({
    x: member.positionX,
    y: member.positionY,
  });
  const effectiveStatus = member.isOnline ? member.status : "away";
  const presenceVisual = getMemberPresenceVisual(effectiveStatus);

  return (
    <>
      <div
        className="pointer-events-none absolute left-0 top-0 flex h-[114px] w-20 will-change-transform transition-transform duration-[160ms] ease-out motion-reduce:transition-none"
        style={{
          ...positionStyle,
          height: PLAYER_BOX_HEIGHT,
          width: PLAYER_BOX_WIDTH,
          zIndex: playerZIndex,
        }}
      >
        <div
          aria-hidden="true"
          className={[
            "absolute bottom-0.5 left-1/2 h-3 w-11 -translate-x-1/2 rounded-[50%] bg-slate-950/55 blur-[1px]",
            isCurrentUser
              ? "shadow-[0_0_11px_2px_rgba(52,211,153,0.46)]"
              : "",
          ].join(" ")}
        />
        <div
          aria-hidden="true"
          className={[
            "absolute bottom-0 left-1/2 h-4 w-14 -translate-x-1/2 rounded-[50%] blur-[5px]",
            presenceGlowClasses[presenceVisual.tone],
          ].join(" ")}
        />
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2">
          <div
            className={[
              "transition-[filter,opacity] duration-200 motion-reduce:transition-none",
              presenceVisual.isDimmed
                ? "opacity-60 grayscale-[0.45]"
                : "",
            ].join(" ")}
          >
            <div
              className={
                isWalking
                  ? "office-player-walking motion-reduce:animate-none"
                  : ""
              }
            >
              <AvatarPreview
                avatar={member.avatar}
                direction={direction}
                showCaption={false}
                size="small"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute left-0 top-0 h-[114px] w-20 will-change-transform transition-transform duration-[160ms] ease-out motion-reduce:transition-none"
        style={{
          ...positionStyle,
          height: PLAYER_BOX_HEIGHT,
          width: PLAYER_BOX_WIDTH,
          zIndex: 3000 + member.positionY,
        }}
      >
        {bubble ? (
          <div
            aria-label={bubble.message}
            aria-live="polite"
            className="absolute bottom-[158px] left-1/2 z-50 w-max max-w-[160px] -translate-x-1/2"
            role="status"
          >
            <div
              className="office-speech-bubble relative max-w-[160px] border-2 border-[#101827] bg-[#fff3bf] px-3 py-2 text-[11px] font-bold leading-none text-[#172033] shadow-[inset_0_0_0_2px_#e4c45f,3px_3px_0_rgba(2,6,23,0.82)]"
              key={bubble.expiresAt}
            >
              <span
                aria-hidden="true"
                className="block overflow-hidden text-ellipsis whitespace-nowrap"
              >
                {formatSpeechBubbleMessage(bubble.message)}
              </span>
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-full h-2 w-3 -translate-x-1/2 bg-[#101827]"
              />
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-full h-1 w-1 -translate-x-1/2 bg-[#fff3bf]"
              />
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-[calc(100%+8px)] h-1 w-1 -translate-x-1/2 bg-[#101827]"
              />
            </div>
          </div>
        ) : null}

        <div className="absolute -top-[27px] left-1/2 z-40 -translate-x-1/2">
          <span
            className={[
              "block max-w-24 truncate border px-1.5 py-0.5 text-[10px] font-bold shadow-[2px_2px_0_#020617]",
              isCurrentUser
                ? "border-emerald-100 bg-emerald-300 text-slate-950"
                : "border-slate-500 bg-slate-950/90 text-slate-100",
            ].join(" ")}
          >
            {member.user.name}
          </span>
        </div>

        <div className="absolute -top-[9px] left-1/2 z-30 max-w-[112px] -translate-x-1/2">
          <OfficeStatusBadge
            density="room"
            status={effectiveStatus}
          />
        </div>
      </div>
    </>
  );
}
