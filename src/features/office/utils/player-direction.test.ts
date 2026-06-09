import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { getFacingDirectionFromKey } from "./player-direction.ts";

describe("player direction", () => {
  it("maps WASD and arrow keys to facing directions", () => {
    assert.equal(getFacingDirectionFromKey("w"), "up");
    assert.equal(getFacingDirectionFromKey("ArrowDown"), "down");
    assert.equal(getFacingDirectionFromKey("A"), "left");
    assert.equal(getFacingDirectionFromKey("arrowright"), "right");
  });

  it("ignores non-movement keys", () => {
    assert.equal(getFacingDirectionFromKey("Enter"), null);
  });

  it("ignores keyboard events without a key value", () => {
    const getDirection = getFacingDirectionFromKey as (
      key?: string,
    ) => ReturnType<typeof getFacingDirectionFromKey>;

    assert.equal(getDirection(undefined), null);
  });
});
