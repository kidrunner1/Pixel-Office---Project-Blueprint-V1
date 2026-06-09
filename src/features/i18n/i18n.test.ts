import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  resolveInitialLocale,
  translate,
} from "./i18n.ts";
import { translations } from "./translations.ts";

describe("Pixel Office localization", () => {
  it("prefers a saved locale over the browser language", () => {
    assert.equal(resolveInitialLocale("en", "th-TH"), "en");
    assert.equal(resolveInitialLocale("th", "en-US"), "th");
  });

  it("detects Thai browsers and falls back to English", () => {
    assert.equal(resolveInitialLocale(null, "th-TH"), "th");
    assert.equal(resolveInitialLocale(null, "en-US"), "en");
    assert.equal(resolveInitialLocale(null, undefined), "en");
  });

  it("keeps English and Thai dictionaries in parity", () => {
    assert.deepEqual(
      Object.keys(translations.th).sort(),
      Object.keys(translations.en).sort(),
    );
  });

  it("translates representative interface text", () => {
    assert.equal(translate("en", "common.signIn"), "Sign In");
    assert.equal(translate("th", "common.signIn"), "เข้าสู่ระบบ");
  });

  it("interpolates translated values", () => {
    assert.equal(
      translate("en", "office.seats", { active: 2, max: 4 }),
      "2/4 seats",
    );
    assert.equal(
      translate("th", "office.seats", { active: 2, max: 4 }),
      "ที่นั่ง 2/4",
    );
  });
});
