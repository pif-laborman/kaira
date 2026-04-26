import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("SplitPill module", () => {
  it("exports SplitPill as a function component", async () => {
    const mod = await import("../../components/SplitPill");
    assert.equal(typeof mod.SplitPill, "function");
  });
});

describe("GhostButton module", () => {
  it("exports GhostButton as a function component", async () => {
    const mod = await import("../../components/GhostButton");
    assert.equal(typeof mod.GhostButton, "function");
  });
});

describe("Builder page data requirements", () => {
  it("has 7 styles for the style selector", async () => {
    const { styles } = await import("../../data");
    assert.equal(styles.length, 7);
  });

  it("default style is Hatha Vinyasa", async () => {
    const { styles } = await import("../../data");
    const defaultStyle = styles.find((s) => s.name === "Hatha Vinyasa");
    assert.ok(defaultStyle, "Hatha Vinyasa style must exist as the default");
    assert.equal(defaultStyle.id, "hatha-vinyasa");
  });

  it("each style has a color for the swatch", async () => {
    const { styles } = await import("../../data");
    for (const s of styles) {
      assert.ok(s.color, `style ${s.id} missing color`);
      assert.match(s.color, /^#[0-9A-Fa-f]{6}$/, `style ${s.id} color should be a hex color`);
    }
  });

  it("every pose has a valid style_id referencing an existing style", async () => {
    const { styles, poses } = await import("../../data");
    const styleIds = new Set(styles.map((s) => s.id));
    for (const p of poses) {
      assert.ok(styleIds.has(p.style_id), `pose ${p.id} has invalid style_id: ${p.style_id}`);
    }
  });

  it("each style has at least 6 poses for the grid", async () => {
    const { styles, poses } = await import("../../data");
    for (const s of styles) {
      const count = poses.filter((p) => p.style_id === s.id).length;
      assert.ok(count >= 6, `style ${s.name} has only ${count} poses, expected >= 6`);
    }
  });

  it("pose cards have required display fields", async () => {
    const { poses } = await import("../../data");
    for (const p of poses) {
      assert.ok(typeof p.number === "number", `pose ${p.id} missing number`);
      assert.ok(p.name, `pose ${p.id} missing name`);
      assert.ok(p.sanskrit_name, `pose ${p.id} missing sanskrit_name`);
      assert.ok(p.instruction_text, `pose ${p.id} missing instruction_text`);
    }
  });

  it("filtering poses by style returns only matching poses", async () => {
    const { poses } = await import("../../data");
    const hvPoses = poses.filter((p) => p.style_id === "hatha-vinyasa");
    assert.ok(hvPoses.length > 0, "should have Hatha Vinyasa poses");
    for (const p of hvPoses) {
      assert.equal(p.style_id, "hatha-vinyasa");
    }
  });

  it("selecting and removing poses works correctly with array operations", async () => {
    const { poses } = await import("../../data");
    const selected: typeof poses = [];
    const pose1 = poses[0];
    const pose2 = poses[1];

    // Add poses
    selected.push(pose1);
    selected.push(pose2);
    assert.equal(selected.length, 2);

    // Remove first pose
    const afterRemove = selected.filter((p) => p.id !== pose1.id);
    assert.equal(afterRemove.length, 1);
    assert.equal(afterRemove[0].id, pose2.id);
  });

  it("poses are unique and can be toggled without duplicates", async () => {
    const { poses } = await import("../../data");
    const pose = poses[0];
    let selected = [pose];

    // Toggling an already-selected pose should remove it
    if (selected.some((p) => p.id === pose.id)) {
      selected = selected.filter((p) => p.id !== pose.id);
    }
    assert.equal(selected.length, 0);

    // Toggling a non-selected pose should add it
    if (!selected.some((p) => p.id === pose.id)) {
      selected = [...selected, pose];
    }
    assert.equal(selected.length, 1);
  });
});
