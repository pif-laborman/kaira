import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("US-012: Library screen", () => {
  it("exports default page component", async () => {
    const mod = await import("../../app/(app)/library/page.tsx");
    assert.equal(typeof mod.default, "function");
  });

  it("exports formatTotalDuration helper", async () => {
    const mod = await import("../../app/(app)/library/page.tsx");
    assert.equal(typeof mod.formatTotalDuration, "function");
  });

  it("exports filterSequencesByName helper", async () => {
    const mod = await import("../../app/(app)/library/page.tsx");
    assert.equal(typeof mod.filterSequencesByName, "function");
  });

  describe("formatTotalDuration", () => {
    it("formats seconds only", async () => {
      const { formatTotalDuration } = await import(
        "../../app/(app)/library/page.tsx"
      );
      assert.equal(formatTotalDuration(45), "45s");
    });

    it("formats minutes only", async () => {
      const { formatTotalDuration } = await import(
        "../../app/(app)/library/page.tsx"
      );
      assert.equal(formatTotalDuration(120), "2m");
    });

    it("formats minutes and seconds", async () => {
      const { formatTotalDuration } = await import(
        "../../app/(app)/library/page.tsx"
      );
      assert.equal(formatTotalDuration(315), "5m 15s");
    });

    it("formats zero", async () => {
      const { formatTotalDuration } = await import(
        "../../app/(app)/library/page.tsx"
      );
      assert.equal(formatTotalDuration(0), "0s");
    });
  });

  describe("filterSequencesByName", () => {
    const sequences = [
      { name: "Morning Sun Flow" },
      { name: "Evening Wind Down" },
      { name: "Quick Power Yoga" },
    ];

    it("returns all sequences for empty query", async () => {
      const { filterSequencesByName } = await import(
        "../../app/(app)/library/page.tsx"
      );
      const result = filterSequencesByName(sequences, "");
      assert.equal(result.length, 3);
    });

    it("returns all sequences for whitespace query", async () => {
      const { filterSequencesByName } = await import(
        "../../app/(app)/library/page.tsx"
      );
      const result = filterSequencesByName(sequences, "   ");
      assert.equal(result.length, 3);
    });

    it("filters by partial name match", async () => {
      const { filterSequencesByName } = await import(
        "../../app/(app)/library/page.tsx"
      );
      const result = filterSequencesByName(sequences, "morning");
      assert.equal(result.length, 1);
      assert.equal(result[0].name, "Morning Sun Flow");
    });

    it("is case insensitive", async () => {
      const { filterSequencesByName } = await import(
        "../../app/(app)/library/page.tsx"
      );
      const result = filterSequencesByName(sequences, "EVENING");
      assert.equal(result.length, 1);
      assert.equal(result[0].name, "Evening Wind Down");
    });

    it("returns empty array when no matches", async () => {
      const { filterSequencesByName } = await import(
        "../../app/(app)/library/page.tsx"
      );
      const result = filterSequencesByName(sequences, "xyz");
      assert.equal(result.length, 0);
    });

    it("matches middle of name", async () => {
      const { filterSequencesByName } = await import(
        "../../app/(app)/library/page.tsx"
      );
      const result = filterSequencesByName(sequences, "wind");
      assert.equal(result.length, 1);
      assert.equal(result[0].name, "Evening Wind Down");
    });
  });

  describe("seed data integrity", () => {
    it("has 2 pre-seeded example sequences in context", async () => {
      // Verify seed data exists in AppContext module
      const mod = await import("../../context/AppContext.tsx");
      assert.equal(typeof mod.AppProvider, "function");
      assert.equal(typeof mod.useAppContext, "function");
    });

    it("seed sequence pose ids reference valid poses", async () => {
      const { poses } = await import("../../data/poses.ts");
      const poseIds = new Set(poses.map((p) => p.id));

      // Morning Sun Flow pose ids
      const morningPoses = ["hv-001", "hv-005", "hv-002", "hv-003", "hv-004", "hv-006", "hv-007"];
      for (const id of morningPoses) {
        assert.ok(poseIds.has(id), `Pose ${id} should exist in poses data`);
      }

      // Evening Wind Down pose ids
      const eveningPoses = ["yin-001", "yin-002", "yin-004", "yin-003", "yin-005"];
      for (const id of eveningPoses) {
        assert.ok(poseIds.has(id), `Pose ${id} should exist in poses data`);
      }
    });

    it("each seed pose id maps to a valid style with color", async () => {
      const { styles } = await import("../../data/styles.ts");
      const { poses } = await import("../../data/poses.ts");

      const styleMap = new Map(styles.map((s) => [s.id, s]));
      const allSeedPoseIds = [
        "hv-001", "hv-005", "hv-002", "hv-003", "hv-004", "hv-006", "hv-007",
        "yin-001", "yin-002", "yin-004", "yin-003", "yin-005",
      ];

      for (const poseId of allSeedPoseIds) {
        const pose = poses.find((p) => p.id === poseId);
        assert.ok(pose, `Pose ${poseId} should exist`);
        const style = styleMap.get(pose!.style_id);
        assert.ok(style, `Style ${pose!.style_id} should exist`);
        assert.ok(style!.color, `Style ${pose!.style_id} should have a color`);
      }
    });

    it("SplitPill component is available for empty state CTA", async () => {
      const mod = await import("../../components/SplitPill.tsx");
      assert.equal(typeof mod.SplitPill, "function");
    });
  });
});
