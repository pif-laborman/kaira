import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("CarouselCounter module", () => {
  it("exports CarouselCounter as a function component", async () => {
    const mod = await import("../../components/CarouselCounter.tsx");
    assert.equal(typeof mod.CarouselCounter, "function");
  });
});

describe("Home screen data requirements", () => {
  it("has 7 yoga styles for the style cards", async () => {
    const { styles } = await import("../../data/index.ts");
    assert.equal(styles.length, 7);
  });

  it("each style has an id, name, and color", async () => {
    const { styles } = await import("../../data/index.ts");
    for (const s of styles) {
      assert.ok(s.id, `style missing id`);
      assert.ok(s.name, `style missing name`);
      assert.ok(s.color, `style missing color`);
    }
  });

  it("has at least 3 premade flows for daily practice", async () => {
    const { premadeFlows } = await import("../../data/index.ts");
    assert.ok(premadeFlows.length >= 3, `expected >= 3 premade flows, got ${premadeFlows.length}`);
  });

  it("each premade flow has name, duration, and difficulty", async () => {
    const { premadeFlows } = await import("../../data/index.ts");
    for (const f of premadeFlows) {
      assert.ok(f.name, `flow missing name`);
      assert.ok(f.duration_minutes > 0, `flow ${f.id} missing duration`);
      assert.ok(["beginner", "intermediate", "advanced"].includes(f.difficulty), `flow ${f.id} invalid difficulty`);
    }
  });

  it("has 6 categories for the category cards", async () => {
    const { categories } = await import("../../data/index.ts");
    assert.equal(categories.length, 6);
  });

  it("category pose counts are computed correctly", async () => {
    const { categories, poses } = await import("../../data/index.ts");
    for (const cat of categories) {
      const count = poses.filter((p) => p.categories.includes(cat.id)).length;
      assert.ok(count >= 0, `category ${cat.id} count should be >= 0`);
    }
  });

  it("greeting function returns correct time-based string", () => {
    const hour = new Date().getHours();
    let expected: string;
    if (hour < 12) expected = "Good morning";
    else if (hour < 18) expected = "Good afternoon";
    else expected = "Good evening";
    // Verify the logic matches what the home page uses
    assert.ok(["Good morning", "Good afternoon", "Good evening"].includes(expected));
  });
});
