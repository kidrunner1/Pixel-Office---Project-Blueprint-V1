import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { createSocketRoomState } from "./socket-room-state.ts";

function joinInput(index: number) {
  return {
    socketId: `socket-${index}`,
    roomId: "main-office",
    userId: `user-${index}`,
    name: `User ${index}`,
    positionX: index + 1,
    positionY: 6,
    status: "online" as const,
    todayTask: null,
  };
}

describe("socket room state", () => {
  it("limits a room to four active users", () => {
    const roomState = createSocketRoomState();

    assert.equal(roomState.joinRoom(joinInput(1)).ok, true);
    assert.equal(roomState.joinRoom(joinInput(2)).ok, true);
    assert.equal(roomState.joinRoom(joinInput(3)).ok, true);
    assert.equal(roomState.joinRoom(joinInput(4)).ok, true);

    const fifthJoin = roomState.joinRoom(joinInput(5));

    assert.equal(fifthJoin.ok, false);
    assert.equal(fifthJoin.reason, "room_full");
    assert.equal(roomState.getRoomState("main-office").members.length, 4);
  });

  it("rejects movement outside the 16 x 10 room bounds", () => {
    const roomState = createSocketRoomState();
    roomState.joinRoom(joinInput(1));

    const result = roomState.movePlayer({
      roomId: "main-office",
      userId: "user-1",
      positionX: 16,
      positionY: 1,
    });

    assert.equal(result.ok, false);
    assert.equal(result.reason, "invalid_position");
    const member = roomState.getRoomState("main-office").members[0];
    assert.equal(member.positionX, 2);
    assert.equal(member.positionY, 6);
  });

  it("rejects movement into blocked office objects", () => {
    const roomState = createSocketRoomState();
    roomState.joinRoom(joinInput(1));

    const result = roomState.movePlayer({
      roomId: "main-office",
      userId: "user-1",
      positionX: 3,
      positionY: 2,
    });

    assert.equal(result.ok, false);
    assert.equal(result.reason, "blocked_tile");
  });

  it("rejects movement onto another online user's tile", () => {
    const roomState = createSocketRoomState();
    roomState.joinRoom(joinInput(1));
    roomState.joinRoom(joinInput(2));

    const result = roomState.movePlayer({
      roomId: "main-office",
      userId: "user-1",
      positionX: 3,
      positionY: 6,
    });

    assert.equal(result.ok, false);
    assert.equal(result.reason, "position_occupied");
  });

  it("updates position for a valid movement", () => {
    const roomState = createSocketRoomState();
    roomState.joinRoom(joinInput(1));

    const result = roomState.movePlayer({
      roomId: "main-office",
      userId: "user-1",
      positionX: 9,
      positionY: 5,
    });

    assert.equal(result.ok, true);
    assert.equal(result.member.positionX, 9);
    assert.equal(result.member.positionY, 5);
  });

  it("validates chat messages before creating room messages", () => {
    const roomState = createSocketRoomState();
    roomState.joinRoom(joinInput(1));

    const emptyMessage = roomState.createMessage({
      roomId: "main-office",
      userId: "user-1",
      userName: "User 1",
      content: "   ",
    });
    const validMessage = roomState.createMessage({
      roomId: "main-office",
      userId: "user-1",
      userName: "User 1",
      content: " Hello team ",
    });
    const longMessage = roomState.createMessage({
      roomId: "main-office",
      userId: "user-1",
      userName: "User 1",
      content: "a".repeat(501),
    });

    assert.equal(emptyMessage.ok, false);
    assert.equal(emptyMessage.reason, "invalid_message");
    assert.equal(longMessage.ok, false);
    assert.equal(longMessage.reason, "invalid_message");
    assert.equal(validMessage.ok, true);
    assert.equal(validMessage.message.userName, "User 1");
    assert.equal(validMessage.message.content, "Hello team");
  });

  it("removes a disconnected socket user from its room", () => {
    const roomState = createSocketRoomState();
    roomState.joinRoom(joinInput(1));
    roomState.joinRoom(joinInput(2));

    const affectedRoomStates = roomState.removeSocket("socket-1");

    assert.equal(affectedRoomStates.length, 1);
    assert.deepEqual(
      affectedRoomStates[0].members.map((member) => member.userId),
      ["user-2"],
    );
  });
});
