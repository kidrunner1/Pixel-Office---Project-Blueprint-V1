import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  getMainOfficeTile,
  isMainOfficeTileBlocked,
  MAIN_OFFICE_HEIGHT,
  MAIN_OFFICE_TILES,
  MAIN_OFFICE_WIDTH,
} from "./main-office-map.ts";

describe("main office map", () => {
  it("defines a complete 16 x 10 room layout", () => {
    assert.equal(MAIN_OFFICE_WIDTH, 16);
    assert.equal(MAIN_OFFICE_HEIGHT, 10);
    assert.equal(MAIN_OFFICE_TILES.length, MAIN_OFFICE_HEIGHT);

    for (const row of MAIN_OFFICE_TILES) {
      assert.equal(row.length, MAIN_OFFICE_WIDTH);
    }
  });

  it("keeps furniture out of the tile collision layer", () => {
    assert.equal(getMainOfficeTile({ x: 0, y: 0 })?.type, "wall");
    assert.equal(isMainOfficeTileBlocked({ x: 0, y: 0 }), true);
    assert.equal(getMainOfficeTile({ x: 3, y: 2 })?.type, "floor");
    assert.equal(isMainOfficeTileBlocked({ x: 3, y: 2 }), false);
    assert.equal(getMainOfficeTile({ x: 5, y: 2 })?.type, "floor");
    assert.equal(isMainOfficeTileBlocked({ x: 5, y: 2 }), false);
    assert.equal(isMainOfficeTileBlocked({ x: 14, y: 1 }), false);
    assert.equal(isMainOfficeTileBlocked({ x: 2, y: 2 }), false);
    assert.equal(isMainOfficeTileBlocked({ x: 7, y: 7 }), false);
  });
});
