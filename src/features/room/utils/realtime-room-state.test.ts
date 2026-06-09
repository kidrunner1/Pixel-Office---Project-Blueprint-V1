import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  applyRealtimeMemberToRoom,
  applyRealtimeRoomStateToRoom,
} from "./realtime-room-state.ts";
import type { RoomMemberView, RoomView } from "@/types/room";
import type { SocketRoomMember, SocketRoomState } from "@/types/socket";

const createdAt = new Date("2026-01-01T00:00:00.000Z");

function createRoomMember(
  overrides: Partial<RoomMemberView> & {
    userId: string;
    name: string;
  },
): RoomMemberView {
  const { name, userId, ...roomMemberOverrides } = overrides;

  return {
    id: `member-${userId}`,
    userId,
    roomId: "room-1",
    positionX: 1,
    positionY: 1,
    status: "online",
    todayTask: null,
    isOnline: true,
    avatar: null,
    user: {
      id: userId,
      name,
      email: `${userId}@example.com`,
      role: "MEMBER",
      createdAt,
    },
    ...roomMemberOverrides,
  };
}

function createRoom(): RoomView {
  return {
    id: "room-1",
    name: "Main Office",
    maxMembers: 4,
    roomMembers: [
      createRoomMember({
        userId: "current-user",
        name: "Current User",
        positionX: 1,
        positionY: 1,
      }),
      createRoomMember({
        userId: "remote-user",
        name: "Remote User",
        positionX: 3,
        positionY: 1,
      }),
      createRoomMember({
        userId: "second-remote-user",
        name: "Second Remote User",
        positionX: 5,
        positionY: 1,
      }),
    ],
  };
}

function createSocketMember(
  overrides: Partial<SocketRoomMember> & {
    userId: string;
    name: string;
  },
): SocketRoomMember {
  const { name, userId, ...socketMemberOverrides } = overrides;

  return {
    userId,
    name,
    roomId: "room-1",
    positionX: 4,
    positionY: 4,
    avatar: null,
    status: "focus",
    todayTask: "Pairing",
    ...socketMemberOverrides,
  };
}

describe("realtime room state merge", () => {
  it("updates remote member positions without overwriting current user state", () => {
    const room = createRoom();
    const socketRoomState: SocketRoomState = {
      roomId: "room-1",
      members: [
        createSocketMember({
          userId: "current-user",
          name: "Socket Current",
          positionX: 9,
          positionY: 5,
        }),
        createSocketMember({
          userId: "remote-user",
          name: "Socket Remote",
          positionX: 6,
          positionY: 2,
        }),
      ],
    };

    const updatedRoom = applyRealtimeRoomStateToRoom(
      room,
      "current-user",
      socketRoomState,
    );
    const currentMember = updatedRoom.roomMembers.find(
      (member) => member.userId === "current-user",
    );
    const remoteMember = updatedRoom.roomMembers.find(
      (member) => member.userId === "remote-user",
    );

    assert.equal(currentMember?.positionX, 1);
    assert.equal(currentMember?.positionY, 1);
    assert.equal(currentMember?.user.name, "Current User");
    assert.equal(remoteMember?.positionX, 6);
    assert.equal(remoteMember?.positionY, 2);
    assert.equal(remoteMember?.status, "focus");
    assert.equal(remoteMember?.todayTask, "Pairing");
  });

  it("adds new realtime members once and marks missing remote members offline", () => {
    const room = createRoom();
    const socketRoomState: SocketRoomState = {
      roomId: "room-1",
      members: [
        createSocketMember({
          userId: "current-user",
          name: "Current User",
          positionX: 1,
          positionY: 1,
        }),
        createSocketMember({
          userId: "new-user",
          name: "New User",
          positionX: 7,
          positionY: 4,
        }),
        createSocketMember({
          userId: "new-user",
          name: "New User Duplicate",
          positionX: 8,
          positionY: 5,
        }),
      ],
    };

    const updatedRoom = applyRealtimeRoomStateToRoom(
      room,
      "current-user",
      socketRoomState,
    );
    const newMembers = updatedRoom.roomMembers.filter(
      (member) => member.userId === "new-user",
    );
    const remoteMember = updatedRoom.roomMembers.find(
      (member) => member.userId === "remote-user",
    );

    assert.equal(newMembers.length, 1);
    assert.equal(newMembers[0].id, "realtime:room-1:new-user");
    assert.equal(newMembers[0].positionX, 7);
    assert.equal(newMembers[0].user.name, "New User");
    assert.equal(remoteMember?.isOnline, false);
  });

  it("updates a single moved realtime member", () => {
    const room = createRoom();

    const updatedRoom = applyRealtimeMemberToRoom(room, "current-user", {
      userId: "remote-user",
      name: "Remote User",
      roomId: "room-1",
      positionX: 8,
      positionY: 5,
      avatar: null,
      status: "meeting",
      todayTask: "Demo",
    });
    const remoteMember = updatedRoom.roomMembers.find(
      (member) => member.userId === "remote-user",
    );

    assert.equal(remoteMember?.positionX, 8);
    assert.equal(remoteMember?.positionY, 5);
    assert.equal(remoteMember?.status, "meeting");
    assert.equal(
      updatedRoom.roomMembers.find(
        (member) => member.userId === "second-remote-user",
      )?.isOnline,
      true,
    );
  });
});
