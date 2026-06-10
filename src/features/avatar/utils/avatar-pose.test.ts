import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { getAvatarPose } from "./avatar-pose.ts";

describe("avatar pose", () => {
  it("shows the face only from the front and side", () => {
    assert.equal(getAvatarPose("down", "short").showFace, true);
    assert.equal(getAvatarPose("left", "short").showFace, true);
    assert.equal(getAvatarPose("right", "short").showFace, true);
    assert.equal(getAvatarPose("up", "short").showFace, false);
  });

  it("mirrors the right-facing base profile only when facing left", () => {
    const leftPose = getAvatarPose("left", "bob");
    const rightPose = getAvatarPose("right", "bob");

    assert.equal(leftPose.view, "side");
    assert.equal(leftPose.mirror, true);
    assert.equal(rightPose.view, "side");
    assert.equal(rightPose.mirror, false);
    assert.equal(leftPose.hairSilhouette, rightPose.hairSilhouette);
  });

  it("uses distinct silhouettes for short, bob, and spiky hair", () => {
    const silhouettes = new Set([
      getAvatarPose("down", "short").hairSilhouette,
      getAvatarPose("down", "bob").hairSilhouette,
      getAvatarPose("down", "spiky").hairSilhouette,
    ]);

    assert.equal(silhouettes.size, 3);
  });

  it("uses direction-specific silhouettes for the back and side views", () => {
    const front = getAvatarPose("down", "spiky").hairSilhouette;
    const back = getAvatarPose("up", "spiky").hairSilhouette;
    const side = getAvatarPose("left", "spiky").hairSilhouette;

    assert.notEqual(front, back);
    assert.notEqual(front, side);
    assert.notEqual(back, side);
  });
});
