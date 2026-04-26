import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("BottomNav module", () => {
  it("exports BottomNav as a function component", async () => {
    const mod = await import("../../components/BottomNav");
    assert.equal(typeof mod.BottomNav, "function");
  });
});

describe("RegistrationMark module", () => {
  it("exports RegistrationMark as a function component", async () => {
    const mod = await import("../../components/RegistrationMark");
    assert.equal(typeof mod.RegistrationMark, "function");
  });
});
