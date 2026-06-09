import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  PUBLIC_CTA_LINKS,
  PUBLIC_FEATURES,
  PUBLIC_STEPS,
} from "./public-content.ts";

describe("public page content", () => {
  it("keeps the primary entry paths clear and ordered", () => {
    assert.deepEqual(
      PUBLIC_CTA_LINKS.map(({ href, labelKey }) => ({ href, labelKey })),
      [
        { href: "/office", labelKey: "common.enterOffice" },
        { href: "/auth/register", labelKey: "common.createAccount" },
        { href: "/auth/login", labelKey: "common.signIn" },
      ],
    );
  });

  it("communicates the four core product experiences", () => {
    assert.deepEqual(
      PUBLIC_FEATURES.map(({ titleKey }) => titleKey),
      [
        "public.featureMovementTitle",
        "public.featureChatTitle",
        "public.featureAvatarTitle",
        "public.featurePresenceTitle",
      ],
    );
  });

  it("explains the workspace flow in three steps", () => {
    assert.deepEqual(
      PUBLIC_STEPS.map(({ titleKey }) => titleKey),
      [
        "public.stepAvatarTitle",
        "public.stepJoinTitle",
        "public.stepTogetherTitle",
      ],
    );
  });
});
