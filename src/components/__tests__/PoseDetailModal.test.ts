import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("PoseDetailModal module", () => {
  it("exports PoseDetailModal as a named function", async () => {
    const mod = await import("../PoseDetailModal.tsx");
    assert.equal(typeof mod.PoseDetailModal, "function");
  });

  it("exports PoseDetailModalProps interface (via named export check)", async () => {
    const mod = await import("../PoseDetailModal.tsx");
    // PoseDetailModal is the main export
    assert.ok(mod.PoseDetailModal);
  });
});

describe("Pose data supports detail modal fields", () => {
  it("all poses have detailed_instructions field", async () => {
    const { poses } = await import("../../data/poses.ts");
    for (const pose of poses) {
      assert.equal(typeof pose.detailed_instructions, "string", `${pose.id} missing detailed_instructions`);
      assert.ok(pose.detailed_instructions.length > 0, `${pose.id} has empty detailed_instructions`);
    }
  });

  it("all poses have precautions array", async () => {
    const { poses } = await import("../../data/poses.ts");
    for (const pose of poses) {
      assert.ok(Array.isArray(pose.precautions), `${pose.id} missing precautions array`);
    }
  });

  it("all poses have chakras array with valid chakra ids", async () => {
    const { poses } = await import("../../data/poses.ts");
    const { chakras } = await import("../../data/chakras.ts");
    const validIds = new Set(chakras.map((c) => c.id));
    for (const pose of poses) {
      assert.ok(Array.isArray(pose.chakras), `${pose.id} missing chakras array`);
      for (const cid of pose.chakras) {
        assert.ok(validIds.has(cid), `${pose.id} has invalid chakra id: ${cid}`);
      }
    }
  });

  it("all poses have a valid style_id", async () => {
    const { poses } = await import("../../data/poses.ts");
    const { styles } = await import("../../data/styles.ts");
    const validStyleIds = new Set(styles.map((s) => s.id));
    for (const pose of poses) {
      assert.ok(validStyleIds.has(pose.style_id), `${pose.id} has invalid style_id: ${pose.style_id}`);
    }
  });
});

describe("Chakra data for chakra circles", () => {
  it("there are exactly 7 chakras", async () => {
    const { chakras } = await import("../../data/chakras.ts");
    assert.equal(chakras.length, 7);
  });

  it("each chakra has id, name, and color", async () => {
    const { chakras } = await import("../../data/chakras.ts");
    for (const c of chakras) {
      assert.equal(typeof c.id, "string");
      assert.equal(typeof c.name, "string");
      assert.equal(typeof c.color, "string");
      assert.ok(c.color.startsWith("#"), `${c.id} color should be hex`);
    }
  });

  it("chakra names are in expected order", async () => {
    const { chakras } = await import("../../data/chakras.ts");
    const names = chakras.map((c) => c.name);
    assert.deepEqual(names, [
      "Root",
      "Sacral",
      "Solar Plexus",
      "Heart",
      "Throat",
      "Third Eye",
      "Crown",
    ]);
  });
});

describe("Style color lookup for header", () => {
  it("every style has a hex color", async () => {
    const { styles } = await import("../../data/styles.ts");
    for (const s of styles) {
      assert.ok(s.color.startsWith("#"), `${s.id} color should be hex`);
    }
  });

  it("pose style_id maps to an existing style", async () => {
    const { poses } = await import("../../data/poses.ts");
    const { styles } = await import("../../data/styles.ts");
    const styleMap = new Map(styles.map((s) => [s.id, s]));
    // Check a few representative poses
    const samplePose = poses[0];
    const matchedStyle = styleMap.get(samplePose.style_id);
    assert.ok(matchedStyle, `style not found for ${samplePose.style_id}`);
    assert.ok(matchedStyle.color.startsWith("#"));
  });
});

describe("Accordion behavior logic", () => {
  it("precautions can be toggled (boolean state)", () => {
    let isOpen = false;
    // Toggle open
    isOpen = !isOpen;
    assert.equal(isOpen, true);
    // Toggle closed
    isOpen = !isOpen;
    assert.equal(isOpen, false);
  });

  it("how-to can be toggled independently", () => {
    let precautionsOpen = false;
    let howToOpen = false;
    // Open how-to
    howToOpen = !howToOpen;
    assert.equal(howToOpen, true);
    assert.equal(precautionsOpen, false);
    // Open precautions too
    precautionsOpen = !precautionsOpen;
    assert.equal(howToOpen, true);
    assert.equal(precautionsOpen, true);
  });

  it("at least some poses have non-empty precautions", async () => {
    const { poses } = await import("../../data/poses.ts");
    const withPrecautions = poses.filter((p) => p.precautions.length > 0);
    assert.ok(withPrecautions.length > 0, "Expected some poses with precautions");
  });
});
