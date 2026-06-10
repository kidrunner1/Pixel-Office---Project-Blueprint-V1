import {
  getStatusPresentation,
  type StatusTone,
} from "@/features/office/utils/status-label";
import type {
  RoomMemberStatus,
  RoomMemberView,
} from "@/types/room";

const presenceOrder = [
  "online",
  "focus",
  "meeting",
  "break",
  "away",
] as const satisfies readonly RoomMemberStatus[];

export type MemberPresenceSummary = {
  status: RoomMemberStatus;
  count: number;
};

export type MemberPresenceVisual = {
  tone: StatusTone;
  isDimmed: boolean;
};

function getEffectiveStatus(
  member: RoomMemberView,
): RoomMemberStatus {
  return member.isOnline ? member.status : "away";
}

export function getStatusRank(status: RoomMemberStatus): number {
  return presenceOrder.indexOf(status);
}

export function sortMembersByPresence(
  members: RoomMemberView[],
  currentUserId: string,
): RoomMemberView[] {
  return members
    .map((member, index) => ({ member, index }))
    .sort((first, second) => {
      const firstIsCurrent = first.member.userId === currentUserId;
      const secondIsCurrent = second.member.userId === currentUserId;

      if (firstIsCurrent !== secondIsCurrent) {
        return firstIsCurrent ? -1 : 1;
      }

      const rankDifference =
        getStatusRank(getEffectiveStatus(first.member)) -
        getStatusRank(getEffectiveStatus(second.member));

      return rankDifference || first.index - second.index;
    })
    .map(({ member }) => member);
}

export function summarizeMembersByStatus(
  members: RoomMemberView[],
): MemberPresenceSummary[] {
  const counts = new Map<RoomMemberStatus, number>();

  for (const member of members) {
    const status = getEffectiveStatus(member);
    counts.set(status, (counts.get(status) ?? 0) + 1);
  }

  return presenceOrder.flatMap((status) => {
    const count = counts.get(status) ?? 0;

    return count > 0 ? [{ status, count }] : [];
  });
}

export function getMemberPresenceVisual(
  status: RoomMemberStatus,
): MemberPresenceVisual {
  return {
    tone: getStatusPresentation(status).tone,
    isDimmed: status === "away",
  };
}
