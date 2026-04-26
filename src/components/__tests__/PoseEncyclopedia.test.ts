import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("US-017: Pose Encyclopedia", async () => {
  const { filterPoses, getStyleColor, getStyleName } = await import(
    "../../app/(app)/poses/page.tsx"
  );
  const { poses } = await import("../../data/index.ts");
  const { styles } = await import("../../data/styles.ts");
  const { chakras } = await import("../../data/chakras.ts");
  const { PoseDetailModal } = await import(
    "../../components/PoseDetailModal.tsx"
  );
  const { Pill } = await import("../../components/Pill.tsx");

  describe("Module exports", () => {
    it("exports filterPoses", () => {
      assert.equal(typeof filterPoses, "function");
    });

    it("exports getStyleColor", () => {
      assert.equal(typeof getStyleColor, "function");
    });

    it("exports getStyleName", () => {
      assert.equal(typeof getStyleName, "function");
    });

    it("exports default page component", async () => {
      const mod = await import("../../app/(app)/poses/page.tsx");
      assert.equal(typeof mod.default, "function");
    });

    it("PoseDetailModal is available", () => {
      assert.equal(typeof PoseDetailModal, "function");
    });

    it("Pill component is available", () => {
      assert.equal(typeof Pill, "function");
    });
  });

  describe("filterPoses", () => {
    it("returns all poses when no filters applied", () => {
      const result = filterPoses(poses, "all", "");
      assert.equal(result.length, poses.length);
    });

    it("filters by style", () => {
      const result = filterPoses(poses, "yin", "");
      assert.ok(result.length > 0);
      assert.ok(result.every((p: { style_id: string }) => p.style_id === "yin"));
    });

    it("filters by search query (name)", () => {
      const result = filterPoses(poses, "all", "warrior");
      assert.ok(result.length > 0);
      assert.ok(
        result.every(
          (p: { name: string }) =>
            p.name.toLowerCase().includes("warrior"),
        ),
      );
    });

    it("filters by search query (Sanskrit name)", () => {
      const result = filterPoses(poses, "all", "virabhadrasana");
      assert.ok(result.length > 0);
      assert.ok(
        result.every(
          (p: { sanskrit_name: string }) =>
            p.sanskrit_name.toLowerCase().includes("virabhadrasana"),
        ),
      );
    });

    it("combines style and search filters", () => {
      const result = filterPoses(poses, "hatha-vinyasa", "warrior");
      assert.ok(result.length > 0);
      assert.ok(
        result.every(
          (p: { style_id: string; name: string }) =>
            p.style_id === "hatha-vinyasa" &&
            p.name.toLowerCase().includes("warrior"),
        ),
      );
    });

    it("returns empty for non-matching search", () => {
      const result = filterPoses(poses, "all", "xyznonexistent");
      assert.equal(result.length, 0);
    });

    it("handles whitespace-only search", () => {
      const result = filterPoses(poses, "all", "   ");
      assert.equal(result.length, poses.length);
    });

    it("is case-insensitive for search", () => {
      const lower = filterPoses(poses, "all", "sun");
      const upper = filterPoses(poses, "all", "SUN");
      assert.equal(lower.length, upper.length);
      assert.ok(lower.length > 0);
    });
  });

  describe("getStyleColor", () => {
    it("returns correct color for known style", () => {
      assert.equal(getStyleColor("hatha-vinyasa"), "#C9B99A");
    });

    it("returns fallback for unknown style", () => {
      assert.equal(getStyleColor("nonexistent"), "#C9B99A");
    });
  });

  describe("getStyleName", () => {
    it("returns correct name for known style", () => {
      assert.equal(getStyleName("yin"), "Yin");
    });

    it("returns Unknown for nonexistent style", () => {
      assert.equal(getStyleName("nonexistent"), "Unknown");
    });
  });

  describe("Style filter pills", () => {
    it("has 7 styles plus All = 8 filter options", () => {
      assert.equal(styles.length + 1, 8);
    });

    it("all style ids are unique", () => {
      const ids = styles.map((s: { id: string }) => s.id);
      assert.equal(new Set(ids).size, ids.length);
    });
  });

  describe("Pose data integrity", () => {
    it("every pose has a valid style_id", () => {
      const styleIds = new Set(styles.map((s: { id: string }) => s.id));
      for (const p of poses) {
        assert.ok(styleIds.has(p.style_id), `Pose ${p.id} has invalid style_id: ${p.style_id}`);
      }
    });

    it("every pose chakra references a valid chakra", () => {
      const chakraIds = new Set(chakras.map((c: { id: string }) => c.id));
      for (const p of poses) {
        for (const cid of p.chakras) {
          assert.ok(chakraIds.has(cid), `Pose ${p.id} has invalid chakra: ${cid}`);
        }
      }
    });

    it("every pose has name and sanskrit_name", () => {
      for (const p of poses) {
        assert.ok(p.name.length > 0, `Pose ${p.id} missing name`);
        assert.ok(p.sanskrit_name.length > 0, `Pose ${p.id} missing sanskrit_name`);
      }
    });

    it("total pose count is at least 40", () => {
      assert.ok(poses.length >= 40);
    });
  });

  describe("Filtering per style", () => {
    it("each style has at least one pose", () => {
      for (const s of styles) {
        const count = poses.filter((p: { style_id: string }) => p.style_id === s.id).length;
        assert.ok(count > 0, `Style ${s.name} has no poses`);
      }
    });
  });
});
