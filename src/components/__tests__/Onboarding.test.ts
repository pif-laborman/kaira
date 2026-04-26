import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("US-018: Onboarding flow steps 1-7", () => {
  it("exports OnboardingPage as default and helper functions", async () => {
    const mod = await import(
      "../../app/(fullscreen)/onboarding/page.tsx"
    );
    assert.ok(mod.default, "default export (OnboardingPage) should exist");
    assert.equal(typeof mod.getStepTitle, "function");
    assert.equal(typeof mod.mapPainPointsToFeatures, "function");
  });

  describe("getStepTitle", () => {
    let getStepTitle: (step: number) => string;

    it("loads getStepTitle", async () => {
      const mod = await import(
        "../../app/(fullscreen)/onboarding/page.tsx"
      );
      getStepTitle = mod.getStepTitle;
    });

    it("returns Welcome for step 1", () => {
      assert.equal(getStepTitle(1), "Welcome");
    });

    it("returns Goal for step 2", () => {
      assert.equal(getStepTitle(2), "Goal");
    });

    it("returns Pain Points for step 3", () => {
      assert.equal(getStepTitle(3), "Pain Points");
    });

    it("returns Social Proof for step 4", () => {
      assert.equal(getStepTitle(4), "Social Proof");
    });

    it("returns Tinder Cards for step 5", () => {
      assert.equal(getStepTitle(5), "Tinder Cards");
    });

    it("returns Personalized Solution for step 6", () => {
      assert.equal(getStepTitle(6), "Personalized Solution");
    });

    it("returns Preferences for step 7", () => {
      assert.equal(getStepTitle(7), "Preferences");
    });

    it("returns empty string for out-of-range step", () => {
      assert.equal(getStepTitle(0), "");
      assert.equal(getStepTitle(8), "");
    });
  });

  describe("mapPainPointsToFeatures", () => {
    let mapPainPointsToFeatures: (
      ids: string[]
    ) => Array<{ painPoint: string; feature: string }>;

    it("loads mapPainPointsToFeatures", async () => {
      const mod = await import(
        "../../app/(fullscreen)/onboarding/page.tsx"
      );
      mapPainPointsToFeatures = mod.mapPainPointsToFeatures;
    });

    it("maps prep-time to sequence building feature", () => {
      const result = mapPainPointsToFeatures(["prep-time"]);
      assert.equal(result.length, 1);
      assert.ok(result[0].painPoint.includes("Class prep"));
      assert.ok(result[0].feature.includes("5 minutes"));
    });

    it("maps multiple pain points", () => {
      const result = mapPainPointsToFeatures([
        "prep-time",
        "generic",
        "consistency",
      ]);
      assert.equal(result.length, 3);
    });

    it("returns empty array for no pain points", () => {
      const result = mapPainPointsToFeatures([]);
      assert.equal(result.length, 0);
    });

    it("filters out unknown pain point ids", () => {
      const result = mapPainPointsToFeatures(["unknown-id"]);
      assert.equal(result.length, 0);
    });

    it("maps all 4 known pain points", () => {
      const result = mapPainPointsToFeatures([
        "prep-time",
        "generic",
        "combining",
        "consistency",
      ]);
      assert.equal(result.length, 4);
      // Each has both painPoint and feature
      for (const m of result) {
        assert.ok(m.painPoint.length > 0);
        assert.ok(m.feature.length > 0);
      }
    });
  });

  describe("onboarding data fixtures", () => {
    it("has 4 goal options", async () => {
      const { goalOptions } = await import("../../data/onboarding.ts");
      assert.equal(goalOptions.length, 4);
    });

    it("goal options have id, label, description", async () => {
      const { goalOptions } = await import("../../data/onboarding.ts");
      for (const g of goalOptions) {
        assert.ok(g.id);
        assert.ok(g.label);
        assert.ok(g.description);
      }
    });

    it("has 4 pain points", async () => {
      const { painPoints } = await import("../../data/onboarding.ts");
      assert.equal(painPoints.length, 4);
    });

    it("has 4 tinder statements", async () => {
      const { tinderStatements } = await import("../../data/onboarding.ts");
      assert.equal(tinderStatements.length, 4);
    });

    it("has testimonials for each goal", async () => {
      const { goalOptions, testimonialsByGoal } = await import(
        "../../data/onboarding.ts"
      );
      for (const goal of goalOptions) {
        assert.ok(
          testimonialsByGoal[goal.id],
          `testimonial for ${goal.id} should exist`
        );
        assert.ok(testimonialsByGoal[goal.id].quote);
        assert.ok(testimonialsByGoal[goal.id].name);
      }
    });

    it("has processing messages", async () => {
      const { processingMessages } = await import("../../data/onboarding.ts");
      assert.ok(processingMessages.length >= 3);
    });
  });

  describe("style preferences data", () => {
    it("has 7 styles available for preference selection", async () => {
      const { styles } = await import("../../data/styles.ts");
      assert.equal(styles.length, 7);
    });
  });
});
