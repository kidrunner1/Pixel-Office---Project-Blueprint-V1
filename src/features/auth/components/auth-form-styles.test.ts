import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { AUTH_FORM_STYLES } from "./auth-form-styles.ts";

describe("auth form styles", () => {
  it("uses one emerald interaction theme for both auth forms", () => {
    const accentStyles = [
      AUTH_FORM_STYLES.eyebrow,
      AUTH_FORM_STYLES.input,
      AUTH_FORM_STYLES.submitButton,
      AUTH_FORM_STYLES.link,
    ].join(" ");

    assert.match(accentStyles, /emerald-300/);
    assert.doesNotMatch(accentStyles, /amber-/);
  });
});
