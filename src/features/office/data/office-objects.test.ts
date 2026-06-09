import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  getBlockingOfficeObject,
  getOfficeObjectZIndex,
  getPlayerCollisionBox,
  getPlayerZIndex,
  OFFICE_OBJECTS,
  OFFICE_TILE_SIZE,
} from "./office-objects.ts";

describe("office objects", () => {
  it("defines placed objects in the office pixel coordinate space", () => {
    assert.equal(OFFICE_TILE_SIZE, 72);
    assert.equal(OFFICE_OBJECTS.some((object) => object.assetId === "desk"), true);
    assert.equal(
      OFFICE_OBJECTS.some((object) => object.assetId === "meeting-table"),
      true,
    );
  });

  it("finds blocking objects from a player tile position", () => {
    assert.equal(getBlockingOfficeObject({ x: 3, y: 2 })?.assetId, "desk");
    assert.equal(getBlockingOfficeObject({ x: 1, y: 3 }), null);
    assert.equal(getBlockingOfficeObject({ x: 9, y: 5 }), null);
  });

  it("uses a smaller player collision box inside the tile footprint", () => {
    assert.deepEqual(getPlayerCollisionBox({ x: 2, y: 2 }), {
      height: 36,
      width: 28,
      x: 166,
      y: 172,
    });
  });

  it("orders objects and players by their floor position", () => {
    const northObject = OFFICE_OBJECTS[0];
    const southObject = OFFICE_OBJECTS[OFFICE_OBJECTS.length - 1];

    assert.equal(
      getOfficeObjectZIndex(southObject) > getOfficeObjectZIndex(northObject),
      true,
    );
    assert.equal(
      getPlayerZIndex({ x: 4, y: 7 }) > getPlayerZIndex({ x: 4, y: 2 }),
      true,
    );
  });

  it("composes distinct asymmetric studio zones", () => {
    const workDesk = OFFICE_OBJECTS.find(
      (object) => object.id === "work-desk-west",
    );
    const meetingTable = OFFICE_OBJECTS.find(
      (object) => object.id === "meeting-table-main",
    );
    const printer = OFFICE_OBJECTS.find(
      (object) => object.id === "admin-printer",
    );
    const sofa = OFFICE_OBJECTS.find(
      (object) => object.id === "coffee-sofa",
    );

    assert.equal(Boolean(workDesk && workDesk.x < 250 && workDesk.y < 120), true);
    assert.equal(
      Boolean(meetingTable && meetingTable.x < 340 && meetingTable.y >= 380),
      true,
    );
    assert.equal(Boolean(printer && printer.x >= 760 && printer.y < 180), true);
    assert.equal(Boolean(sofa && sofa.x >= 760 && sofa.y >= 500), true);
  });
});
