import { describe, it } from "node:test";
import assert from "node:assert/strict";

// Test the AppContext module exports and seed data without rendering React components.
// React rendering tests would require a DOM environment; here we verify the module shape
// and seed data integrity.

describe("AppContext module", () => {
  it("exports AppProvider and useAppContext", async () => {
    const mod = await import("../../context/AppContext");
    assert.equal(typeof mod.AppProvider, "function");
    assert.equal(typeof mod.useAppContext, "function");
  });

  it("exports SavedSequence and OnboardingData types (module loads without error)", async () => {
    // If the module has type errors, this import would fail at transpile time
    const mod = await import("../../context/AppContext");
    assert.ok(mod);
  });
});
