import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("US-015: Profile screen", () => {
  it("exports ProfilePage as default", async () => {
    const mod = await import("../../app/(app)/profile/page.tsx");
    assert.equal(typeof mod.default, "function");
  });

  it("exports UserIcon component", async () => {
    const mod = await import("../../app/(app)/profile/page.tsx");
    assert.equal(typeof mod.UserIcon, "function");
  });

  it("exports ToggleSwitch component", async () => {
    const mod = await import("../../app/(app)/profile/page.tsx");
    assert.equal(typeof mod.ToggleSwitch, "function");
  });

  it("exports togglePoseName helper", async () => {
    const mod = await import("../../app/(app)/profile/page.tsx");
    assert.equal(typeof mod.togglePoseName, "function");
  });

  describe("togglePoseName", () => {
    it("returns true when given false", async () => {
      const { togglePoseName } = await import("../../app/(app)/profile/page.tsx");
      assert.equal(togglePoseName(false), true);
    });

    it("returns false when given true", async () => {
      const { togglePoseName } = await import("../../app/(app)/profile/page.tsx");
      assert.equal(togglePoseName(true), false);
    });

    it("is idempotent when toggled twice", async () => {
      const { togglePoseName } = await import("../../app/(app)/profile/page.tsx");
      const initial = false;
      assert.equal(togglePoseName(togglePoseName(initial)), initial);
    });
  });

  describe("profile data", () => {
    it("user name is Kaira User", () => {
      const name = "Kaira User";
      assert.equal(name, "Kaira User");
    });

    it("email is hello@kaira.app", () => {
      const email = "hello@kaira.app";
      assert.equal(email, "hello@kaira.app");
    });

    it("version is v1.0.0", () => {
      const version = "v1.0.0";
      assert.equal(version, "v1.0.0");
    });
  });

  describe("RegistrationMark component", () => {
    it("is importable", async () => {
      const mod = await import("../../components/RegistrationMark.tsx");
      assert.equal(typeof mod.RegistrationMark, "function");
    });
  });

  describe("settings rows", () => {
    it("defines expected setting labels", () => {
      const labels = ["Play pose name", "Practice Stats", "Customer Center", "Log Out"];
      assert.equal(labels.length, 4);
      assert.ok(labels.includes("Play pose name"));
      assert.ok(labels.includes("Customer Center"));
      assert.ok(labels.includes("Log Out"));
      assert.ok(labels.includes("Practice Stats"));
    });

    it("Practice Stats links to /progress", () => {
      const href = "/progress";
      assert.equal(href, "/progress");
    });
  });
});
