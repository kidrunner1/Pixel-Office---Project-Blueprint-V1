import type { RoomMemberStatus } from "@/types/room";

export const IDLE_TIMEOUT_MS = 5 * 60 * 1000;

export type NonAwayRoomMemberStatus = Exclude<RoomMemberStatus, "away">;
export type AwayReason = "idle" | "manual" | null;

export type IdleStatusState = {
  currentStatus: RoomMemberStatus;
  previousNonAwayStatus: NonAwayRoomMemberStatus;
  awayReason: AwayReason;
};

export function createIdleStatusState(
  status: RoomMemberStatus,
): IdleStatusState {
  if (status === "away") {
    return {
      currentStatus: "away",
      previousNonAwayStatus: "online",
      awayReason: "manual",
    };
  }

  return {
    currentStatus: status,
    previousNonAwayStatus: status,
    awayReason: null,
  };
}

export function applyManualStatusSelection(
  state: IdleStatusState,
  status: RoomMemberStatus,
): IdleStatusState {
  if (status === "away") {
    return {
      ...state,
      currentStatus: "away",
      awayReason: "manual",
    };
  }

  return {
    currentStatus: status,
    previousNonAwayStatus: status,
    awayReason: null,
  };
}

export function applyIdleTimeout(
  state: IdleStatusState,
): IdleStatusState {
  if (state.currentStatus === "away") {
    return state;
  }

  return {
    currentStatus: "away",
    previousNonAwayStatus: state.currentStatus,
    awayReason: "idle",
  };
}

export function applyUserActivity(
  state: IdleStatusState,
): IdleStatusState {
  if (state.currentStatus !== "away" || state.awayReason !== "idle") {
    return state;
  }

  return {
    currentStatus: state.previousNonAwayStatus,
    previousNonAwayStatus: state.previousNonAwayStatus,
    awayReason: null,
  };
}
