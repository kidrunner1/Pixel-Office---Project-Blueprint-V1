"use client";

import type { CSSProperties } from "react";

import { AvatarPreview } from "@/features/avatar/components/avatar-preview";
import {
  OFFICE_TILE_SIZE,
  getPlayerZIndex,
} from "@/features/office/data/office-objects";
import type { FacingDirection } from "@/features/office/utils/player-direction";
import { useSpeechBubbleStore } from "@/stores/speech-bubble-store";
import type { RoomMemberView } from "@/types/room";

type OfficePlayerProps = {
  direction: FacingDirection;
  isCurrentUser: boolean;
  isWalking?: boolean;
  member: RoomMemberView;
};

const PLAYER_OFFSET_Y = 26;

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

  return (
    <>
      <div
        className="pointer-events-none absolute left-0 top-0 flex h-[104px] w-[72px] will-change-transform transition-transform duration-[160ms] ease-out motion-reduce:transition-none"
        style={{
          ...positionStyle,
          zIndex: playerZIndex,
        }}
      >
        <div
          aria-hidden="true"
          className={[
            "absolute bottom-1 left-1/2 h-2.5 w-9 -translate-x-1/2 rounded-[50%] bg-slate-950/50 blur-[1px]",
            isCurrentUser
              ? "shadow-[0_0_10px_2px_rgba(52,211,153,0.42)]"
              : "",
          ].join(" ")}
        />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
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

      <div
        className="pointer-events-none absolute left-0 top-0 h-[104px] w-[72px] will-change-transform transition-transform duration-[160ms] ease-out motion-reduce:transition-none"
        style={{
          ...positionStyle,
          zIndex: 3000 + member.positionY,
        }}
      >
        {bubble ? (
          <div
            aria-live="polite"
            className="absolute bottom-[106px] left-1/2 max-h-12 w-max max-w-[168px] -translate-x-1/2 overflow-hidden border-2 border-slate-950 bg-[#fff7d6] px-2.5 py-1.5 text-[11px] font-semibold leading-4 text-slate-900 shadow-[3px_3px_0_rgba(2,6,23,0.75)]"
          >
            <span className="break-words">{bubble.message}</span>
            <span
              aria-hidden="true"
              className="absolute -bottom-2 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-slate-950 bg-[#fff7d6]"
            />
          </div>
        ) : null}

        <div className="absolute -top-1 left-1/2 -translate-x-1/2">
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
      </div>
    </>
  );
}
