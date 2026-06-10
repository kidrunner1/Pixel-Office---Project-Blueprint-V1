import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildSocketPresencePayload } from "./sync-socket-presence.ts";
import type { RoomMemberView } from "@/types/room";

const member: RoomMemberView = {
  id: "member-1",
  userId: "user-1",
  roomId: "room-1",
  positionX: 6,
  positionY: 4,
  status: "focus",
  todayTask: "Polish member presence",
  isOnline: true,
  avatar: null,
  user: {
    id: "user-1",
    name: "Mali",
    email: "mali@example.com",
    role: "MEMBER",
    createdAt: new Date("2026-06-10T00:00:00.000Z"),
  },
};

describe("socket presence sync", () => {
  it("builds the existing join_room payload from the saved member", () => {
    assert.deepEqual(buildSocketPresencePayload("Mali", member), {
      roomId: "room-1",
      userId: "user-1",
      name: "Mali",
      positionX: 6,
      positionY: 4,
      avatar: null,
      status: "focus",
      todayTask: "Polish member presence",
    });
  });
});
