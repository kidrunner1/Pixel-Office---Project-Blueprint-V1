"use client";

import { useCallback, useEffect, useRef } from "react";

import {
  applyIdleTimeout,
  applyManualStatusSelection,
  applyUserActivity,
  createIdleStatusState,
  IDLE_TIMEOUT_MS,
  type IdleStatusState,
} from "@/features/office/utils/idle-status";
import { syncSocketPresence } from "@/features/office/utils/sync-socket-presence";
import { useRoomStore } from "@/stores/room-store";
import type { RoomMemberStatus, RoomMemberView } from "@/types/room";

type UseIdleStatusInput = {
  currentUserId: string;
  currentUserName: string;
  isEnabled: boolean;
  member: RoomMemberView | null;
};

type UseIdleStatusResult = {
  recordManualStatus: (status: RoomMemberStatus) => void;
};

const activityEvents = [
  "keydown",
  "pointermove",
  "pointerdown",
  "input",
] as const;

export function useIdleStatus({
  currentUserId,
  currentUserName,
  isEnabled,
  member,
}: UseIdleStatusInput): UseIdleStatusResult {
  const updateMyMember = useRoomStore((state) => state.updateMyMember);
  const memberRef = useRef<RoomMemberView | null>(member);
  const memberIdRef = useRef<string | null>(member?.id ?? null);
  const statusStateRef = useRef<IdleStatusState>(
    createIdleStatusState(member?.status ?? "online"),
  );
  const isUpdatingRef = useRef(false);
  const resetIdleTimerRef = useRef<() => void>(() => undefined);
  const memberId = member?.id ?? null;
  const memberStatus = member?.status ?? null;

  useEffect(() => {
    memberRef.current = member;
  }, [member]);

  useEffect(() => {
    if (memberId !== memberIdRef.current) {
      memberIdRef.current = memberId;
      statusStateRef.current = createIdleStatusState(
        memberStatus ?? "online",
      );
      resetIdleTimerRef.current();
      return;
    }

    if (
      memberStatus &&
      memberStatus !== statusStateRef.current.currentStatus
    ) {
      statusStateRef.current = applyManualStatusSelection(
        statusStateRef.current,
        memberStatus,
      );
      resetIdleTimerRef.current();
    }
  }, [memberId, memberStatus]);

  useEffect(() => {
    if (!isEnabled || !memberRef.current) {
      resetIdleTimerRef.current = () => undefined;
      return;
    }

    let idleTimer: ReturnType<typeof setTimeout> | null = null;
    let isDisposed = false;

    function clearIdleTimer() {
      if (idleTimer) {
        clearTimeout(idleTimer);
        idleTimer = null;
      }
    }

    function scheduleIdleTimer() {
      clearIdleTimer();

      if (
        isDisposed ||
        statusStateRef.current.currentStatus === "away"
      ) {
        return;
      }

      idleTimer = setTimeout(handleIdleTimeout, IDLE_TIMEOUT_MS);
    }

    async function saveStatusTransition(
      previousState: IdleStatusState,
      nextState: IdleStatusState,
    ) {
      const currentMember = memberRef.current;

      if (!currentMember || isUpdatingRef.current) {
        return;
      }

      isUpdatingRef.current = true;
      statusStateRef.current = nextState;

      try {
        await updateMyMember(currentUserId, {
          positionX: currentMember.positionX,
          positionY: currentMember.positionY,
          status: nextState.currentStatus,
          todayTask: currentMember.todayTask ?? undefined,
        });

        const savedMember = useRoomStore.getState().myMember;

        if (savedMember) {
          memberRef.current = savedMember;
          syncSocketPresence(currentUserName, savedMember);
        }
      } catch {
        statusStateRef.current = previousState;
      } finally {
        isUpdatingRef.current = false;
        scheduleIdleTimer();
      }
    }

    function handleIdleTimeout() {
      const previousState = statusStateRef.current;
      const nextState = applyIdleTimeout(previousState);

      if (nextState === previousState) {
        return;
      }

      void saveStatusTransition(previousState, nextState);
    }

    function handleActivity() {
      const previousState = statusStateRef.current;
      const nextState = applyUserActivity(previousState);

      if (nextState !== previousState) {
        void saveStatusTransition(previousState, nextState);
        return;
      }

      scheduleIdleTimer();
    }

    resetIdleTimerRef.current = scheduleIdleTimer;

    for (const eventName of activityEvents) {
      window.addEventListener(eventName, handleActivity);
    }

    scheduleIdleTimer();

    return () => {
      isDisposed = true;
      clearIdleTimer();
      resetIdleTimerRef.current = () => undefined;

      for (const eventName of activityEvents) {
        window.removeEventListener(eventName, handleActivity);
      }
    };
  }, [
    currentUserId,
    currentUserName,
    isEnabled,
    memberId,
    updateMyMember,
  ]);

  const recordManualStatus = useCallback(
    (status: RoomMemberStatus) => {
      statusStateRef.current = applyManualStatusSelection(
        statusStateRef.current,
        status,
      );
      resetIdleTimerRef.current();
    },
    [],
  );

  return {
    recordManualStatus,
  };
}
