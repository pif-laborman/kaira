import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("FlowDetail page", () => {
  it("exports default component and helpers", async () => {
    const mod = await import("../../app/(app)/flow/[id]/page.tsx");
    assert.ok(mod.default, "default export exists");
    assert.equal(typeof mod.formatDuration, "function");
    assert.equal(typeof mod.resolveFlowPoses, "function");
    assert.equal(typeof mod.DEFAULT_DURATION, "number");
    assert.equal(typeof mod.DURATION_STEP, "number");
    assert.equal(typeof mod.MIN_DURATION, "number");
  });
});

describe("formatDuration", () => {
  it("formats 0 seconds", async () => {
    const { formatDuration } = await import("../../app/(app)/flow/[id]/page.tsx");
    assert.equal(formatDuration(0), "00:00");
  });

  it("formats 30 seconds", async () => {
    const { formatDuration } = await import("../../app/(app)/flow/[id]/page.tsx");
    assert.equal(formatDuration(30), "00:30");
  });

  it("formats 90 seconds", async () => {
    const { formatDuration } = await import("../../app/(app)/flow/[id]/page.tsx");
    assert.equal(formatDuration(90), "01:30");
  });

  it("formats 600 seconds", async () => {
    const { formatDuration } = await import("../../app/(app)/flow/[id]/page.tsx");
    assert.equal(formatDuration(600), "10:00");
  });

  it("formats 65 seconds", async () => {
    const { formatDuration } = await import("../../app/(app)/flow/[id]/page.tsx");
    assert.equal(formatDuration(65), "01:05");
  });
});

describe("resolveFlowPoses", () => {
  it("resolves valid pose ids to pose objects", async () => {
    const { resolveFlowPoses } = await import("../../app/(app)/flow/[id]/page.tsx");
    const result = resolveFlowPoses(["hv-001", "hv-002"]);
    assert.equal(result.length, 2);
    assert.equal(result[0].id, "hv-001");
    assert.equal(result[1].id, "hv-002");
  });

  it("filters out invalid pose ids", async () => {
    const { resolveFlowPoses } = await import("../../app/(app)/flow/[id]/page.tsx");
    const result = resolveFlowPoses(["hv-001", "nonexistent", "hv-002"]);
    assert.equal(result.length, 2);
  });

  it("returns empty array for empty input", async () => {
    const { resolveFlowPoses } = await import("../../app/(app)/flow/[id]/page.tsx");
    const result = resolveFlowPoses([]);
    assert.equal(result.length, 0);
  });

  it("preserves order from input ids", async () => {
    const { resolveFlowPoses } = await import("../../app/(app)/flow/[id]/page.tsx");
    const result = resolveFlowPoses(["hv-003", "hv-001"]);
    assert.equal(result[0].id, "hv-003");
    assert.equal(result[1].id, "hv-001");
  });
});

describe("premade flow data integrity", () => {
  it("all premade flows have valid style_ids", async () => {
    const { premadeFlows } = await import("../../data/premade-flows.ts");
    const { styles } = await import("../../data/styles.ts");
    const styleIds = new Set(styles.map((s) => s.id));
    for (const flow of premadeFlows) {
      assert.ok(styleIds.has(flow.style_id), `flow ${flow.id} has invalid style_id: ${flow.style_id}`);
    }
  });

  it("all premade flows have valid pose_ids", async () => {
    const { premadeFlows } = await import("../../data/premade-flows.ts");
    const { poses } = await import("../../data/poses.ts");
    const poseIds = new Set(poses.map((p) => p.id));
    for (const flow of premadeFlows) {
      for (const poseId of flow.pose_ids) {
        assert.ok(poseIds.has(poseId), `flow ${flow.id} has invalid pose_id: ${poseId}`);
      }
    }
  });

  it("all premade flows have teacher names", async () => {
    const { premadeFlows } = await import("../../data/premade-flows.ts");
    for (const flow of premadeFlows) {
      assert.ok(flow.teacher_name.length > 0, `flow ${flow.id} has empty teacher_name`);
    }
  });

  it("all premade flows have descriptions", async () => {
    const { premadeFlows } = await import("../../data/premade-flows.ts");
    for (const flow of premadeFlows) {
      assert.ok(flow.description.length > 0, `flow ${flow.id} has empty description`);
    }
  });

  it("all premade flows have valid difficulty", async () => {
    const { premadeFlows } = await import("../../data/premade-flows.ts");
    const valid = new Set(["beginner", "intermediate", "advanced"]);
    for (const flow of premadeFlows) {
      assert.ok(valid.has(flow.difficulty), `flow ${flow.id} has invalid difficulty: ${flow.difficulty}`);
    }
  });

  it("all premade flows have positive duration_minutes", async () => {
    const { premadeFlows } = await import("../../data/premade-flows.ts");
    for (const flow of premadeFlows) {
      assert.ok(flow.duration_minutes > 0, `flow ${flow.id} has non-positive duration`);
    }
  });

  it("all premade flows have unique ids", async () => {
    const { premadeFlows } = await import("../../data/premade-flows.ts");
    const ids = premadeFlows.map((f) => f.id);
    assert.equal(ids.length, new Set(ids).size, "duplicate flow ids found");
  });

  it("resolveFlowPoses returns correct count for each flow", async () => {
    const { resolveFlowPoses } = await import("../../app/(app)/flow/[id]/page.tsx");
    const { premadeFlows } = await import("../../data/premade-flows.ts");
    for (const flow of premadeFlows) {
      const resolved = resolveFlowPoses(flow.pose_ids);
      assert.equal(resolved.length, flow.pose_ids.length, `flow ${flow.id} has unresolved poses`);
    }
  });
});

describe("duration constants", () => {
  it("DEFAULT_DURATION is 30", async () => {
    const { DEFAULT_DURATION } = await import("../../app/(app)/flow/[id]/page.tsx");
    assert.equal(DEFAULT_DURATION, 30);
  });

  it("DURATION_STEP is 5", async () => {
    const { DURATION_STEP } = await import("../../app/(app)/flow/[id]/page.tsx");
    assert.equal(DURATION_STEP, 5);
  });

  it("MIN_DURATION is 5", async () => {
    const { MIN_DURATION } = await import("../../app/(app)/flow/[id]/page.tsx");
    assert.equal(MIN_DURATION, 5);
  });
});
