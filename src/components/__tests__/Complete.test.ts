import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("US-011: Workout Complete screen", () => {
  it("exports CompletePage as default and helper functions", async () => {
    const mod = await import("../../app/(fullscreen)/complete/page.tsx");
    assert.ok(mod.default, "default export (CompletePage) should exist");
    assert.equal(typeof mod.formatDuration, "function");
    assert.equal(typeof mod.calculateStreak, "function");
  });

  describe("formatDuration", () => {
    let formatDuration: (seconds: number) => string;

    it("loads formatDuration", async () => {
      const mod = await import("../../app/(fullscreen)/complete/page.tsx");
      formatDuration = mod.formatDuration;
    });

    it("formats 0 seconds as 00:00", () => {
      assert.equal(formatDuration(0), "00:00");
    });

    it("formats 65 seconds as 01:05", () => {
      assert.equal(formatDuration(65), "01:05");
    });

    it("formats 600 seconds as 10:00", () => {
      assert.equal(formatDuration(600), "10:00");
    });

    it("formats 1200 seconds as 20:00", () => {
      assert.equal(formatDuration(1200), "20:00");
    });

    it("formats 3661 seconds as 61:01", () => {
      assert.equal(formatDuration(3661), "61:01");
    });
  });

  describe("calculateStreak", () => {
    let calculateStreak: (dates: string[]) => number;

    function daysAgo(n: number): string {
      const d = new Date();
      d.setDate(d.getDate() - n);
      return d.toISOString().slice(0, 10);
    }

    it("loads calculateStreak", async () => {
      const mod = await import("../../app/(fullscreen)/complete/page.tsx");
      calculateStreak = mod.calculateStreak;
    });

    it("returns 0 for empty array", () => {
      assert.equal(calculateStreak([]), 0);
    });

    it("returns 1 for today only", () => {
      assert.equal(calculateStreak([daysAgo(0)]), 1);
    });

    it("returns consecutive day count from today", () => {
      assert.equal(
        calculateStreak([daysAgo(0), daysAgo(1), daysAgo(2)]),
        3,
      );
    });

    it("handles duplicate dates", () => {
      assert.equal(
        calculateStreak([daysAgo(0), daysAgo(0), daysAgo(1)]),
        2,
      );
    });

    it("breaks streak on gap", () => {
      assert.equal(
        calculateStreak([daysAgo(0), daysAgo(1), daysAgo(3)]),
        2,
      );
    });

    it("returns 0 if most recent is more than 1 day ago", () => {
      assert.equal(calculateStreak([daysAgo(2), daysAgo(3)]), 0);
    });

    it("counts streak starting from yesterday", () => {
      assert.equal(
        calculateStreak([daysAgo(1), daysAgo(2), daysAgo(3)]),
        3,
      );
    });

    it("handles unordered dates", () => {
      assert.equal(
        calculateStreak([daysAgo(2), daysAgo(0), daysAgo(1)]),
        3,
      );
    });
  });

  describe("data integrity for complete screen", () => {
    it("styles have id and name for style lookup", async () => {
      const { styles } = await import("../../data/index.ts");
      for (const s of styles) {
        assert.ok(s.id, `style should have id`);
        assert.ok(s.name, `style ${s.id} should have name`);
      }
    });

    it("practice sessions have required fields", async () => {
      const { practiceHistory } = await import("../../data/index.ts");
      for (const s of practiceHistory) {
        assert.ok(s.id);
        assert.ok(s.date);
        assert.ok(s.style_id);
        assert.ok(typeof s.duration_seconds === "number");
        assert.ok(typeof s.pose_count === "number");
      }
    });

    it("SplitPill component exports correctly", async () => {
      const mod = await import("../../components/SplitPill.tsx");
      assert.ok(mod.SplitPill, "SplitPill should be a named export");
    });

    it("GhostButton component exports correctly", async () => {
      const mod = await import("../../components/GhostButton.tsx");
      assert.ok(mod.GhostButton, "GhostButton should be a named export");
    });
  });
});
