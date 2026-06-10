import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { getStatusPresentation } from "./status-label.ts";

describe("member status presentation", () => {
  it("maps active room statuses to readable labels and icons", () => {
    assert.deepEqual(getStatusPresentation("online"), {
      icon: "\u{1F7E2}",
      labelKey: "status.active",
      tone: "active",
    });
    assert.deepEqual(getStatusPresentation("focus"), {
      icon: "\u{1F4BB}",
      labelKey: "status.focus",
      tone: "focus",
    });
    assert.deepEqual(getStatusPresentation("meeting"), {
      icon: "\u{1F5E3}",
      labelKey: "status.meeting",
      tone: "meeting",
    });
    assert.deepEqual(getStatusPresentation("break"), {
      icon: "\u2615",
      labelKey: "status.break",
      tone: "break",
    });
  });

  it("maps the supported away status", () => {
    assert.deepEqual(getStatusPresentation("away"), {
      icon: "\u{1F319}",
      labelKey: "status.away",
      tone: "away",
    });
  });
});
