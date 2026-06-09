"use client";

import { useEffect, useState } from "react";

import { useTranslation } from "@/features/i18n/use-translation";
import {
  getNextPosition,
  isBlockedOfficePosition,
  type Position,
} from "@/features/office/utils/movement";
import {
  getFacingDirectionFromKey,
  type FacingDirection,
} from "@/features/office/utils/player-direction";
import { getSocketClient } from "@/lib/socket/socket-client";
import { useRoomStore } from "@/stores/room-store";
import type { RoomMemberView, RoomView } from "@/types/room";

type UseKeyboardMovementInput = {
  currentUserId: string;
  isUpdatePending: boolean;
  myMember: RoomMemberView | null;
  room: RoomView | null;
};

type UseKeyboardMovementResult = {
  blockedMessage: string | null;
  facingDirection: FacingDirection;
  isMoving: boolean;
};

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  const tagName = target.tagName.toLowerCase();

  return (
    tagName === "input" ||
    tagName === "textarea" ||
    tagName === "select" ||
    target.isContentEditable
  );
}

function isSamePosition(first: Position, second: Position): boolean {
  return first.x === second.x && first.y === second.y;
}

function isOccupiedByAnotherOnlineMember(
  room: RoomView,
  currentUserId: string,
  position: Position,
): boolean {
  return room.roomMembers.some(
    (member) =>
      member.isOnline &&
      member.userId !== currentUserId &&
      member.positionX === position.x &&
      member.positionY === position.y,
  );
}

function emitSocketMovement(member: RoomMemberView, position: Position): void {
  const socket = getSocketClient();

  if (!socket?.connected) {
    return;
  }

  socket.emit("player_move", {
    roomId: member.roomId,
    userId: member.userId,
    positionX: position.x,
    positionY: position.y,
  });
}

export function useKeyboardMovement({
  currentUserId,
  isUpdatePending,
  myMember,
  room,
}: UseKeyboardMovementInput): UseKeyboardMovementResult {
  const { t } = useTranslation();
  const updateMyMember = useRoomStore((state) => state.updateMyMember);
  const [blockedMessage, setBlockedMessage] = useState<string | null>(null);
  const [facingDirection, setFacingDirection] =
    useState<FacingDirection>("down");
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const direction = getFacingDirectionFromKey(event.key);

      if (!direction || isTypingTarget(event.target)) {
        return;
      }

      if (!room || !myMember || isUpdatePending || isMoving) {
        return;
      }

      event.preventDefault();
      setFacingDirection(direction);

      const currentPosition = {
        x: myMember.positionX,
        y: myMember.positionY,
      };
      const nextPosition = getNextPosition(currentPosition, direction);

      if (isSamePosition(currentPosition, nextPosition)) {
        return;
      }

      if (isBlockedOfficePosition(nextPosition)) {
        setBlockedMessage(t("office.pathBlocked"));
        return;
      }

      if (
        isOccupiedByAnotherOnlineMember(room, currentUserId, nextPosition)
      ) {
        setBlockedMessage(t("office.tileOccupied"));
        return;
      }

      setBlockedMessage(null);
      setIsMoving(true);

      void updateMyMember(currentUserId, {
        positionX: nextPosition.x,
        positionY: nextPosition.y,
        status: myMember.status,
        todayTask: myMember.todayTask ?? undefined,
      })
        .then(() => {
          emitSocketMovement(myMember, nextPosition);
        })
        .catch(() => {
          setBlockedMessage(t("office.moveError"));
        })
        .finally(() => {
          setIsMoving(false);
        });
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    currentUserId,
    isMoving,
    isUpdatePending,
    myMember,
    room,
    t,
    updateMyMember,
  ]);

  return {
    blockedMessage,
    facingDirection,
    isMoving,
  };
}
