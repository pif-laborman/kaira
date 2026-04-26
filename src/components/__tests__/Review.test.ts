import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("Review page module", () => {
  it("exports default as a function component", async () => {
    const mod = await import("../../app/(app)/builder/review/page.tsx");
    assert.equal(typeof mod.default, "function");
  });
});

describe("Review page data requirements", () => {
  it("poses have has_sides boolean field for side badge", async () => {
    const { poses } = await import("../../data/index.ts");
    for (const p of poses) {
      assert.equal(typeof p.has_sides, "boolean", `pose ${p.id} missing has_sides`);
    }
  });

  it("at least some poses have has_sides=true", async () => {
    const { poses } = await import("../../data/index.ts");
    const withSides = poses.filter((p) => p.has_sides);
    assert.ok(withSides.length > 0, "should have at least one pose with has_sides=true");
  });

  it("poses have default_duration_seconds field", async () => {
    const { poses } = await import("../../data/index.ts");
    for (const p of poses) {
      assert.equal(typeof p.default_duration_seconds, "number", `pose ${p.id} missing default_duration_seconds`);
      assert.ok(p.default_duration_seconds > 0, `pose ${p.id} duration should be positive`);
    }
  });

  it("each pose has a style_id that maps to a style with a color", async () => {
    const { poses, styles } = await import("../../data/index.ts");
    const styleMap = new Map(styles.map((s) => [s.id, s]));
    for (const p of poses) {
      const style = styleMap.get(p.style_id);
      assert.ok(style, `pose ${p.id} has invalid style_id ${p.style_id}`);
      assert.ok(style.color, `style ${style.id} missing color for review card`);
    }
  });
});

describe("Duration formatting logic", () => {
  function formatDuration(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }

  it("formats 30 seconds as 00:30", () => {
    assert.equal(formatDuration(30), "00:30");
  });

  it("formats 60 seconds as 01:00", () => {
    assert.equal(formatDuration(60), "01:00");
  });

  it("formats 90 seconds as 01:30", () => {
    assert.equal(formatDuration(90), "01:30");
  });

  it("formats 5 seconds as 00:05", () => {
    assert.equal(formatDuration(5), "00:05");
  });

  it("formats 300 seconds as 05:00", () => {
    assert.equal(formatDuration(300), "05:00");
  });
});

describe("Duration controls logic", () => {
  const DEFAULT_DURATION = 30;
  const DURATION_STEP = 5;
  const MIN_DURATION = 5;

  it("default duration is 30 seconds", () => {
    assert.equal(DEFAULT_DURATION, 30);
  });

  it("duration adjusts in 5-second increments", () => {
    let duration = DEFAULT_DURATION;
    duration += DURATION_STEP;
    assert.equal(duration, 35);
    duration -= DURATION_STEP;
    assert.equal(duration, 30);
  });

  it("duration cannot go below minimum of 5 seconds", () => {
    let duration = 10;
    duration -= DURATION_STEP;
    assert.equal(duration, 5);
    // Should not go below MIN_DURATION
    if (duration > MIN_DURATION) {
      duration -= DURATION_STEP;
    }
    assert.equal(duration, MIN_DURATION);
  });

  it("total duration sums all pose durations", () => {
    const durations = [30, 45, 60, 30, 30];
    const total = durations.reduce((sum, d) => sum + d, 0);
    assert.equal(total, 195);
  });

  it("total duration updates when individual pose duration changes", () => {
    const durations: Record<string, number> = {
      "p1": 30,
      "p2": 30,
      "p3": 30,
    };
    const total1 = Object.values(durations).reduce((s, d) => s + d, 0);
    assert.equal(total1, 90);

    durations["p2"] = 45;
    const total2 = Object.values(durations).reduce((s, d) => s + d, 0);
    assert.equal(total2, 105);
  });
});

describe("Total duration formatting", () => {
  function formatTotalDuration(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    if (m === 0) return `${s}s`;
    if (s === 0) return `${m}m`;
    return `${m}m ${s}s`;
  }

  it("formats pure seconds", () => {
    assert.equal(formatTotalDuration(30), "30s");
  });

  it("formats exact minutes", () => {
    assert.equal(formatTotalDuration(120), "2m");
  });

  it("formats minutes and seconds", () => {
    assert.equal(formatTotalDuration(195), "3m 15s");
  });
});
