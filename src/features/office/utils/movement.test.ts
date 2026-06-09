import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  clampPosition,
  getNextPosition,
  isBlockedOfficePosition,
} from "./movement.ts";

describe("office movement utilities", () => {
  it("keeps positions inside the 16 x 10 office map", () => {
    assert.deepEqual(clampPosition(-1, -1), { x: 0, y: 0 });
    assert.deepEqual(clampPosition(16, 10), { x: 15, y: 9 });
    assert.deepEqual(clampPosition(8, 5), { x: 8, y: 5 });
  });

  it("moves one tile in the requested direction", () => {
    assert.deepEqual(getNextPosition({ x: 4, y: 2 }, "up"), {
      x: 4,
      y: 1,
    });
    assert.deepEqual(getNextPosition({ x: 4, y: 2 }, "down"), {
      x: 4,
      y: 3,
    });
    assert.deepEqual(getNextPosition({ x: 4, y: 2 }, "left"), {
      x: 3,
      y: 2,
    });
    assert.deepEqual(getNextPosition({ x: 4, y: 2 }, "right"), {
      x: 5,
      y: 2,
    });
  });

  it("does not move beyond office map edges", () => {
    assert.deepEqual(getNextPosition({ x: 0, y: 0 }, "up"), {
      x: 0,
      y: 0,
    });
    assert.deepEqual(getNextPosition({ x: 0, y: 0 }, "left"), {
      x: 0,
      y: 0,
    });
    assert.deepEqual(getNextPosition({ x: 15, y: 9 }, "down"), {
      x: 15,
      y: 9,
    });
    assert.deepEqual(getNextPosition({ x: 15, y: 9 }, "right"), {
      x: 15,
      y: 9,
    });
  });

  it("blocks walls and placed office objects", () => {
    assert.equal(isBlockedOfficePosition({ x: 0, y: 0 }), true);
    assert.equal(isBlockedOfficePosition({ x: 3, y: 2 }), true);
    assert.equal(isBlockedOfficePosition({ x: 1, y: 3 }), false);
    assert.equal(isBlockedOfficePosition({ x: 9, y: 5 }), false);
  });

  it("keeps room join positions clear", () => {
    const joinPositions = [
      { x: 1, y: 1 },
      { x: 3, y: 1 },
      { x: 1, y: 3 },
      { x: 3, y: 3 },
    ];

    for (const position of joinPositions) {
      assert.equal(isBlockedOfficePosition(position), false);
    }
  });

  it("keeps an organic walking bend open through the center", () => {
    const centralPath = [
      { x: 7, y: 5 },
      { x: 8, y: 5 },
      { x: 9, y: 5 },
      { x: 9, y: 6 },
      { x: 10, y: 6 },
      { x: 11, y: 6 },
    ];

    for (const position of centralPath) {
      assert.equal(isBlockedOfficePosition(position), false);
    }
  });
});
