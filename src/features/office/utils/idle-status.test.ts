import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  applyIdleTimeout,
  applyManualStatusSelection,
  applyUserActivity,
  createIdleStatusState,
  IDLE_TIMEOUT_MS,
} from "./idle-status.ts";

describe("idle status transitions", () => {
  it("marks an active status away after the idle timeout", () => {
    const initialState = createIdleStatusState("focus");
    const idleState = applyIdleTimeout(initialState);

    assert.equal(IDLE_TIMEOUT_MS, 5 * 60 * 1000);
    assert.deepEqual(idleState, {
      currentStatus: "away",
      previousNonAwayStatus: "focus",
      awayReason: "idle",
    });
  });

  it("does not restore a manually selected away status", () => {
    const activeState = createIdleStatusState("meeting");
    const manualAwayState = applyManualStatusSelection(activeState, "away");

    assert.deepEqual(applyUserActivity(manualAwayState), manualAwayState);
  });

  it("restores the previous status after activity from automatic away", () => {
    const activeState = createIdleStatusState("break");
    const idleState = applyIdleTimeout(activeState);

    assert.deepEqual(applyUserActivity(idleState), {
      currentStatus: "break",
      previousNonAwayStatus: "break",
      awayReason: null,
    });
  });

  it("tracks the latest manually selected non-away status", () => {
    const initialState = createIdleStatusState("online");
    const focusState = applyManualStatusSelection(initialState, "focus");

    assert.deepEqual(focusState, {
      currentStatus: "focus",
      previousNonAwayStatus: "focus",
      awayReason: null,
    });
  });

  it("treats a persisted away status as manual away", () => {
    assert.deepEqual(createIdleStatusState("away"), {
      currentStatus: "away",
      previousNonAwayStatus: "online",
      awayReason: "manual",
    });
  });
});
