import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("US-019: Onboarding steps 8-11", () => {
  it("exports new helper functions", async () => {
    const mod = await import(
      "../../app/(fullscreen)/onboarding/page.tsx"
    );
    assert.equal(typeof mod.getStepTitle, "function");
    assert.equal(typeof mod.getMiniBuilderPoses, "function");
    assert.equal(typeof mod.formatDuration, "function");
  });

  describe("getStepTitle covers all 11 steps", () => {
    let getStepTitle: (step: number) => string;

    it("loads getStepTitle", async () => {
      const mod = await import(
        "../../app/(fullscreen)/onboarding/page.tsx"
      );
      getStepTitle = mod.getStepTitle;
    });

    it("returns Processing for step 8", () => {
      assert.equal(getStepTitle(8), "Processing");
    });

    it("returns App Demo for step 9", () => {
      assert.equal(getStepTitle(9), "App Demo");
    });

    it("returns Value Delivery for step 10", () => {
      assert.equal(getStepTitle(10), "Value Delivery");
    });

    it("returns Account Gate for step 11", () => {
      assert.equal(getStepTitle(11), "Account Gate");
    });

    it("returns empty string for step 12 (out of range)", () => {
      assert.equal(getStepTitle(12), "");
    });

    it("all 11 steps have non-empty titles", () => {
      for (let i = 1; i <= 11; i++) {
        assert.ok(getStepTitle(i).length > 0, `step ${i} should have a title`);
      }
    });
  });

  describe("getMiniBuilderPoses", () => {
    let getMiniBuilderPoses: (
      stylePrefs: string[],
      count?: number
    ) => Array<{ id: string; style_id: string; name: string }>;

    it("loads getMiniBuilderPoses", async () => {
      const mod = await import(
        "../../app/(fullscreen)/onboarding/page.tsx"
      );
      getMiniBuilderPoses = mod.getMiniBuilderPoses;
    });

    it("returns 6 poses by default", () => {
      const result = getMiniBuilderPoses(["hatha-vinyasa"]);
      assert.equal(result.length, 6);
    });

    it("returns poses from preferred style", () => {
      const result = getMiniBuilderPoses(["yin"]);
      for (const pose of result) {
        assert.equal(pose.style_id, "yin");
      }
    });

    it("falls back to hatha-vinyasa when no preferences", () => {
      const result = getMiniBuilderPoses([]);
      for (const pose of result) {
        assert.equal(pose.style_id, "hatha-vinyasa");
      }
    });

    it("respects custom count parameter", () => {
      const result = getMiniBuilderPoses(["hatha-vinyasa"], 3);
      assert.equal(result.length, 3);
    });

    it("returns poses with required fields", () => {
      const result = getMiniBuilderPoses(["hatha-vinyasa"]);
      for (const pose of result) {
        assert.ok(pose.id);
        assert.ok(pose.name);
        assert.ok(pose.style_id);
      }
    });
  });

  describe("formatDuration", () => {
    let formatDuration: (seconds: number) => string;

    it("loads formatDuration", async () => {
      const mod = await import(
        "../../app/(fullscreen)/onboarding/page.tsx"
      );
      formatDuration = mod.formatDuration;
    });

    it("formats 30 seconds as 00:30", () => {
      assert.equal(formatDuration(30), "00:30");
    });

    it("formats 90 seconds as 01:30", () => {
      assert.equal(formatDuration(90), "01:30");
    });

    it("formats 0 seconds as 00:00", () => {
      assert.equal(formatDuration(0), "00:00");
    });

    it("formats 300 seconds as 05:00", () => {
      assert.equal(formatDuration(300), "05:00");
    });
  });

  describe("processing messages data", () => {
    it("has at least 3 processing messages", async () => {
      const { processingMessages } = await import("../../data/onboarding.ts");
      assert.ok(processingMessages.length >= 3);
    });

    it("processing messages have text and delay", async () => {
      const { processingMessages } = await import("../../data/onboarding.ts");
      for (const msg of processingMessages) {
        assert.ok(msg.text.length > 0);
        assert.ok(msg.delay_ms > 0);
      }
    });

    it("total processing delay is 2-4 seconds", async () => {
      const { processingMessages } = await import("../../data/onboarding.ts");
      const total = processingMessages.reduce(
        (sum, m) => sum + m.delay_ms,
        0
      );
      assert.ok(total >= 2000, `total delay ${total}ms should be >= 2000ms`);
      assert.ok(total <= 4000, `total delay ${total}ms should be <= 4000ms`);
    });
  });

  describe("orderStylesByPreference (home page)", () => {
    let orderStylesByPreference: (
      allStyles: Array<{ id: string; name: string }>,
      preferredIds: string[]
    ) => Array<{ id: string; name: string }>;

    it("loads orderStylesByPreference", async () => {
      const mod = await import("../../app/(app)/home/page.tsx");
      orderStylesByPreference = mod.orderStylesByPreference;
    });

    it("returns original order when no preferences", () => {
      const allStyles = [
        { id: "a", name: "A" },
        { id: "b", name: "B" },
        { id: "c", name: "C" },
      ];
      const result = orderStylesByPreference(allStyles as never, []);
      assert.deepEqual(
        result.map((s) => s.id),
        ["a", "b", "c"]
      );
    });

    it("puts preferred styles first", () => {
      const allStyles = [
        { id: "a", name: "A" },
        { id: "b", name: "B" },
        { id: "c", name: "C" },
      ];
      const result = orderStylesByPreference(allStyles as never, ["c", "a"]);
      assert.deepEqual(
        result.map((s) => s.id),
        ["c", "a", "b"]
      );
    });

    it("preserves all styles (no duplicates, no losses)", async () => {
      const { styles } = await import("../../data/styles.ts");
      const result = orderStylesByPreference(
        styles as never,
        ["yin", "mudra"]
      );
      assert.equal(result.length, styles.length);
      const ids = new Set(result.map((s) => s.id));
      assert.equal(ids.size, styles.length);
    });
  });

  describe("mini-builder pose selection logic", () => {
    it("each style has at least 6 poses for mini-builder", async () => {
      const { poses } = await import("../../data/poses.ts");
      const { styles } = await import("../../data/styles.ts");
      for (const style of styles) {
        const count = poses.filter((p) => p.style_id === style.id).length;
        assert.ok(
          count >= 6,
          `style ${style.name} has ${count} poses, needs >= 6`
        );
      }
    });
  });
});
