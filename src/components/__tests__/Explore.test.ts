import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("Explore page", () => {
  it("exports default component", async () => {
    const mod = await import("../../app/(app)/explore/page.tsx");
    assert.ok(typeof mod.default === "function", "default export should be a function");
  });

  it("exports exploreCategories with 5 categories", async () => {
    const { exploreCategories } = await import("../../app/(app)/explore/page.tsx");
    assert.equal(exploreCategories.length, 5);
  });

  it("has expected explore category names", async () => {
    const { exploreCategories } = await import("../../app/(app)/explore/page.tsx");
    const names = exploreCategories.map((c: { name: string }) => c.name);
    assert.deepStrictEqual(names, [
      "Energy Boost",
      "Emotional Release",
      "Posture",
      "Detoxing",
      "Intuition",
    ]);
  });

  it("each explore category has unique id", async () => {
    const { exploreCategories } = await import("../../app/(app)/explore/page.tsx");
    const ids = exploreCategories.map((c: { id: string }) => c.id);
    assert.equal(new Set(ids).size, ids.length);
  });

  it("each explore category has at least one flow", async () => {
    const { exploreCategories } = await import("../../app/(app)/explore/page.tsx");
    for (const cat of exploreCategories) {
      assert.ok(cat.flowIds.length >= 1, `${cat.name} should have at least 1 flow`);
    }
  });

  it("all category flowIds reference valid premade flows", async () => {
    const { exploreCategories } = await import("../../app/(app)/explore/page.tsx");
    const { premadeFlows } = await import("../../data/index.ts");
    const validIds = new Set(premadeFlows.map((f: { id: string }) => f.id));
    for (const cat of exploreCategories) {
      for (const fid of cat.flowIds) {
        assert.ok(validIds.has(fid), `Flow id ${fid} in category ${cat.name} should exist`);
      }
    }
  });
});

describe("getFlowsForCategory", () => {
  it("returns flows matching category flowIds", async () => {
    const { getFlowsForCategory, exploreCategories } = await import(
      "../../app/(app)/explore/page.tsx"
    );
    const cat = exploreCategories[0];
    const flows = getFlowsForCategory(cat.id);
    assert.equal(flows.length, cat.flowIds.length);
    for (let i = 0; i < flows.length; i++) {
      assert.equal(flows[i].id, cat.flowIds[i]);
    }
  });

  it("returns empty array for unknown category", async () => {
    const { getFlowsForCategory } = await import("../../app/(app)/explore/page.tsx");
    const flows = getFlowsForCategory("nonexistent");
    assert.deepStrictEqual(flows, []);
  });

  it("preserves order of flowIds", async () => {
    const { getFlowsForCategory, exploreCategories } = await import(
      "../../app/(app)/explore/page.tsx"
    );
    for (const cat of exploreCategories) {
      const flows = getFlowsForCategory(cat.id);
      const ids = flows.map((f: { id: string }) => f.id);
      assert.deepStrictEqual(ids, cat.flowIds);
    }
  });
});

describe("getFlowCountForStyle", () => {
  it("returns correct count for styles with flows", async () => {
    const { getFlowCountForStyle } = await import("../../app/(app)/explore/page.tsx");
    const { premadeFlows } = await import("../../data/index.ts");
    // hatha-vinyasa has flow-001
    const hvCount = premadeFlows.filter(
      (f: { style_id: string }) => f.style_id === "hatha-vinyasa",
    ).length;
    assert.equal(getFlowCountForStyle("hatha-vinyasa"), hvCount);
  });

  it("returns 0 for styles with no flows", async () => {
    const { getFlowCountForStyle } = await import("../../app/(app)/explore/page.tsx");
    // mudra has no premade flows
    assert.equal(getFlowCountForStyle("mudra"), 0);
  });

  it("returns 0 for unknown style", async () => {
    const { getFlowCountForStyle } = await import("../../app/(app)/explore/page.tsx");
    assert.equal(getFlowCountForStyle("nonexistent"), 0);
  });

  it("all styles return non-negative count", async () => {
    const { getFlowCountForStyle } = await import("../../app/(app)/explore/page.tsx");
    const { styles } = await import("../../data/index.ts");
    for (const s of styles) {
      assert.ok(getFlowCountForStyle(s.id) >= 0, `${s.name} should have non-negative count`);
    }
  });
});

describe("data integrity for explore", () => {
  it("7 styles available", async () => {
    const { styles } = await import("../../data/index.ts");
    assert.equal(styles.length, 7);
  });

  it("5 premade flows available", async () => {
    const { premadeFlows } = await import("../../data/index.ts");
    assert.equal(premadeFlows.length, 5);
  });

  it("CarouselCounter exports", async () => {
    const mod = await import("../../components/CarouselCounter.tsx");
    assert.ok(typeof mod.CarouselCounter === "function");
  });

  it("RegistrationMark exports", async () => {
    const mod = await import("../../components/RegistrationMark.tsx");
    assert.ok(typeof mod.RegistrationMark === "function");
  });
});
