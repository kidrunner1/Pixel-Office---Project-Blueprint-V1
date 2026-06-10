import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  roomMemberStatusOptions,
  roomMemberStatusSchema,
} from "./room.ts";

describe("room member status validation", () => {
  it("accepts every supported presence status including away", () => {
    assert.deepEqual(roomMemberStatusOptions, [
      "online",
      "focus",
      "meeting",
      "break",
      "away",
    ]);

    for (const status of roomMemberStatusOptions) {
      assert.equal(roomMemberStatusSchema.safeParse(status).success, true);
    }
  });

  it("rejects unsupported presence statuses", () => {
    assert.equal(roomMemberStatusSchema.safeParse("offline").success, false);
  });
});
