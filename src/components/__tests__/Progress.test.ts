import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("US-016: Progress and stats screen", () => {
  it("exports ProgressPage as default and helper functions", async () => {
    const mod = await import("../../app/(app)/progress/page.tsx");
    assert.ok(mod.default, "default export (ProgressPage) should exist");
    assert.equal(typeof mod.computeStats, "function");
    assert.equal(typeof mod.calculateStreak, "function");
    assert.equal(typeof mod.getCalendarDays, "function");
    assert.equal(typeof mod.formatSessionDuration, "function");
    assert.equal(typeof mod.formatSessionDate, "function");
  });

  describe("computeStats", () => {
    let computeStats: typeof import("../../app/(app)/progress/page.tsx").computeStats;

    it("loads computeStats", async () => {
      const mod = await import("../../app/(app)/progress/page.tsx");
      computeStats = mod.computeStats;
    });

    it("returns zeros for empty sessions", () => {
      const stats = computeStats([]);
      assert.equal(stats.totalSessions, 0);
      assert.equal(stats.totalMinutes, 0);
      assert.equal(stats.streak, 0);
      assert.equal(stats.posesPracticed, 0);
    });

    it("computes totalSessions correctly", () => {
      const sessions = [
        { id: "s1", sequence_name: "A", style_id: "x", duration_seconds: 600, date: "2026-04-26", pose_count: 5 },
        { id: "s2", sequence_name: "B", style_id: "x", duration_seconds: 300, date: "2026-04-25", pose_count: 3 },
      ];
      const stats = computeStats(sessions);
      assert.equal(stats.totalSessions, 2);
    });

    it("computes totalMinutes correctly (rounds)", () => {
      const sessions = [
        { id: "s1", sequence_name: "A", style_id: "x", duration_seconds: 90, date: "2026-04-26", pose_count: 5 },
        { id: "s2", sequence_name: "B", style_id: "x", duration_seconds: 90, date: "2026-04-25", pose_count: 3 },
      ];
      const stats = computeStats(sessions);
      assert.equal(stats.totalMinutes, 3);
    });

    it("computes posesPracticed correctly", () => {
      const sessions = [
        { id: "s1", sequence_name: "A", style_id: "x", duration_seconds: 600, date: "2026-04-26", pose_count: 5 },
        { id: "s2", sequence_name: "B", style_id: "x", duration_seconds: 300, date: "2026-04-25", pose_count: 3 },
      ];
      const stats = computeStats(sessions);
      assert.equal(stats.posesPracticed, 8);
    });
  });

  describe("calculateStreak", () => {
    let calculateStreak: typeof import("../../app/(app)/progress/page.tsx").calculateStreak;

    it("loads calculateStreak", async () => {
      const mod = await import("../../app/(app)/progress/page.tsx");
      calculateStreak = mod.calculateStreak;
    });

    it("returns 0 for empty sessions", () => {
      assert.equal(calculateStreak([]), 0);
    });

    it("returns 1 for a single session today", () => {
      const today = new Date().toISOString().slice(0, 10);
      const sessions = [
        { id: "s1", sequence_name: "A", style_id: "x", duration_seconds: 600, date: today, pose_count: 5 },
      ];
      assert.equal(calculateStreak(sessions), 1);
    });

    it("returns consecutive day count", () => {
      const dates = [];
      for (let i = 0; i < 4; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        dates.push(d.toISOString().slice(0, 10));
      }
      const sessions = dates.map((date, i) => ({
        id: `s${i}`, sequence_name: "A", style_id: "x", duration_seconds: 600, date, pose_count: 5,
      }));
      assert.equal(calculateStreak(sessions), 4);
    });

    it("handles duplicate dates", () => {
      const today = new Date().toISOString().slice(0, 10);
      const sessions = [
        { id: "s1", sequence_name: "A", style_id: "x", duration_seconds: 600, date: today, pose_count: 5 },
        { id: "s2", sequence_name: "B", style_id: "x", duration_seconds: 300, date: today, pose_count: 3 },
      ];
      assert.equal(calculateStreak(sessions), 1);
    });

    it("returns 0 when most recent session is 2+ days ago", () => {
      const d = new Date();
      d.setDate(d.getDate() - 3);
      const sessions = [
        { id: "s1", sequence_name: "A", style_id: "x", duration_seconds: 600, date: d.toISOString().slice(0, 10), pose_count: 5 },
      ];
      assert.equal(calculateStreak(sessions), 0);
    });

    it("streak starts from yesterday if no session today", () => {
      const dates = [];
      for (let i = 1; i <= 3; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        dates.push(d.toISOString().slice(0, 10));
      }
      const sessions = dates.map((date, i) => ({
        id: `s${i}`, sequence_name: "A", style_id: "x", duration_seconds: 600, date, pose_count: 5,
      }));
      assert.equal(calculateStreak(sessions), 3);
    });
  });

  describe("getCalendarDays", () => {
    let getCalendarDays: typeof import("../../app/(app)/progress/page.tsx").getCalendarDays;

    it("loads getCalendarDays", async () => {
      const mod = await import("../../app/(app)/progress/page.tsx");
      getCalendarDays = mod.getCalendarDays;
    });

    it("returns correct number of cells for April 2026", () => {
      const days = getCalendarDays(2026, 3); // April = month 3
      // April 2026 starts on Wednesday (3 nulls) + 30 days = 33 cells
      assert.equal(days.filter((d) => d !== null).length, 30);
    });

    it("starts with correct null padding", () => {
      const days = getCalendarDays(2026, 3); // April 2026 starts on Wednesday
      const nullCount = days.filter((d) => d === null).length;
      assert.equal(nullCount, 3); // Wed = index 3
    });

    it("first non-null day is 1", () => {
      const days = getCalendarDays(2026, 3);
      const firstDay = days.find((d) => d !== null);
      assert.equal(firstDay, 1);
    });

    it("last day is correct for February non-leap", () => {
      const days = getCalendarDays(2027, 1); // Feb 2027
      const maxDay = Math.max(...days.filter((d): d is number => d !== null));
      assert.equal(maxDay, 28);
    });
  });

  describe("formatSessionDuration", () => {
    let formatSessionDuration: typeof import("../../app/(app)/progress/page.tsx").formatSessionDuration;

    it("loads formatSessionDuration", async () => {
      const mod = await import("../../app/(app)/progress/page.tsx");
      formatSessionDuration = mod.formatSessionDuration;
    });

    it("formats 0 seconds as 0s", () => {
      assert.equal(formatSessionDuration(0), "0s");
    });

    it("formats 30 seconds as 30s (sub-minute)", () => {
      assert.equal(formatSessionDuration(30), "30s");
    });

    it("formats 600 seconds as 10m", () => {
      assert.equal(formatSessionDuration(600), "10m");
    });

    it("formats 1200 seconds as 20m", () => {
      assert.equal(formatSessionDuration(1200), "20m");
    });
  });

  describe("formatSessionDate", () => {
    let formatSessionDate: typeof import("../../app/(app)/progress/page.tsx").formatSessionDate;

    it("loads formatSessionDate", async () => {
      const mod = await import("../../app/(app)/progress/page.tsx");
      formatSessionDate = mod.formatSessionDate;
    });

    it("formats a date string correctly", () => {
      const result = formatSessionDate("2026-04-15");
      assert.ok(result.includes("Apr"), `Expected 'Apr' in '${result}'`);
      assert.ok(result.includes("15"), `Expected '15' in '${result}'`);
    });
  });

  describe("data integrity", () => {
    it("practice history fixture has valid fields", async () => {
      const { practiceHistory } = await import("../../data/index.ts");
      assert.ok(practiceHistory.length >= 5, "should have at least 5 sessions");
      for (const s of practiceHistory) {
        assert.ok(s.id, "session should have id");
        assert.ok(s.sequence_name, "session should have sequence_name");
        assert.ok(s.style_id, "session should have style_id");
        assert.ok(typeof s.duration_seconds === "number", "duration_seconds should be number");
        assert.ok(s.date, "session should have date");
        assert.ok(typeof s.pose_count === "number", "pose_count should be number");
      }
    });

    it("practice history style_ids are valid", async () => {
      const { practiceHistory, styles } = await import("../../data/index.ts");
      const validIds = new Set(styles.map((s) => s.id));
      for (const s of practiceHistory) {
        assert.ok(validIds.has(s.style_id), `Invalid style_id: ${s.style_id}`);
      }
    });

    it("AppContext exports useAppContext and AppProvider", async () => {
      const mod = await import("../../context/AppContext.tsx");
      assert.equal(typeof mod.useAppContext, "function");
      assert.equal(typeof mod.AppProvider, "function");
    });
  });
});
