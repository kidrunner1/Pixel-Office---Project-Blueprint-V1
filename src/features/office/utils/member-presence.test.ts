import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  getMemberPresenceVisual,
  getStatusRank,
  sortMembersByPresence,
  summarizeMembersByStatus,
} from "./member-presence.ts";
import type {
  RoomMemberStatus,
  RoomMemberView,
} from "@/types/room";

function createMember(
  userId: string,
  status: RoomMemberStatus,
  isOnline = true,
): RoomMemberView {
  return {
    id: `member-${userId}`,
    userId,
    roomId: "room-1",
    positionX: 1,
    positionY: 1,
    status,
    todayTask: null,
    isOnline,
    avatar: null,
    user: {
      id: userId,
      name: userId,
      email: `${userId}@example.com`,
      role: "MEMBER",
      createdAt: new Date("2026-06-10T00:00:00.000Z"),
    },
  };
}

describe("member presence", () => {
  it("ranks statuses from active through away", () => {
    assert.deepEqual(
      ["online", "focus", "meeting", "break", "away"].map((status) =>
        getStatusRank(status as RoomMemberStatus),
      ),
      [0, 1, 2, 3, 4],
    );
  });

  it("sorts the current user first and keeps equal statuses stable", () => {
    const members = [
      createMember("break-user", "break"),
      createMember("focus-one", "focus"),
      createMember("current-user", "away"),
      createMember("active-user", "online"),
      createMember("focus-two", "focus"),
      createMember("meeting-user", "meeting"),
    ];

    assert.deepEqual(
      sortMembersByPresence(members, "current-user").map(
        (member) => member.userId,
      ),
      [
        "current-user",
        "active-user",
        "focus-one",
        "focus-two",
        "meeting-user",
        "break-user",
      ],
    );
  });

  it("summarizes only non-zero statuses in presence order", () => {
    const members = [
      createMember("active-one", "online"),
      createMember("active-two", "online"),
      createMember("focus-user", "focus"),
      createMember("away-user", "away"),
    ];

    assert.deepEqual(summarizeMembersByStatus(members), [
      { status: "online", count: 2 },
      { status: "focus", count: 1 },
      { status: "away", count: 1 },
    ]);
  });

  it("treats disconnected members as away in summaries", () => {
    const members = [
      createMember("active-user", "online"),
      createMember("disconnected-user", "focus", false),
    ];

    assert.deepEqual(summarizeMembersByStatus(members), [
      { status: "online", count: 1 },
      { status: "away", count: 1 },
    ]);
  });

  it("dims away members without dimming active statuses", () => {
    assert.deepEqual(getMemberPresenceVisual("away"), {
      tone: "away",
      isDimmed: true,
    });
    assert.deepEqual(getMemberPresenceVisual("focus"), {
      tone: "focus",
      isDimmed: false,
    });
  });
});
