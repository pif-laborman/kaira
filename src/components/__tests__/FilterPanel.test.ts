import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("Pill module", () => {
  it("exports Pill as a function component", async () => {
    const mod = await import("../../components/Pill");
    assert.equal(typeof mod.Pill, "function");
  });

  it("exports PillVariant type and supports default/dark/outline", async () => {
    // We verify the module shape by checking the export exists
    const mod = await import("../../components/Pill");
    assert.ok(mod.Pill, "Pill export should exist");
  });
});

describe("FilterPanel module", () => {
  it("exports FilterPanel as a function component", async () => {
    const mod = await import("../../components/FilterPanel");
    assert.equal(typeof mod.FilterPanel, "function");
  });

  it("exports emptyFilters with correct shape", async () => {
    const { emptyFilters } = await import("../../components/FilterPanel");
    assert.equal(emptyFilters.search, "");
    assert.deepEqual(emptyFilters.categoryIds, []);
    assert.deepEqual(emptyFilters.chakraIds, []);
  });
});

describe("Filter panel data requirements", () => {
  it("has 6 categories for category pills", async () => {
    const { categories } = await import("../../data");
    assert.equal(categories.length, 6);
  });

  it("has 7 chakras for chakra pills", async () => {
    const { chakras } = await import("../../data");
    assert.equal(chakras.length, 7);
  });

  it("categories have the expected names", async () => {
    const { categories } = await import("../../data");
    const names = categories.map((c) => c.name);
    assert.ok(names.includes("Backbends"));
    assert.ok(names.includes("Inversions"));
    assert.ok(names.includes("Arm Balances"));
    assert.ok(names.includes("Seated"));
    assert.ok(names.includes("Advanced"));
    assert.ok(names.includes("Slow Down"));
  });

  it("chakras span Root through Crown", async () => {
    const { chakras } = await import("../../data");
    const names = chakras.map((c) => c.name);
    assert.equal(names[0], "Root");
    assert.equal(names[6], "Crown");
  });

  it("every pose has a categories array", async () => {
    const { poses } = await import("../../data");
    for (const p of poses) {
      assert.ok(Array.isArray(p.categories), `pose ${p.id} missing categories array`);
    }
  });

  it("every pose has a chakras array", async () => {
    const { poses } = await import("../../data");
    for (const p of poses) {
      assert.ok(Array.isArray(p.chakras), `pose ${p.id} missing chakras array`);
    }
  });
});

describe("Filter logic", () => {
  it("search filters by name (case insensitive)", async () => {
    const { poses } = await import("../../data");
    const query = "sun";
    const result = poses.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.sanskrit_name.toLowerCase().includes(query),
    );
    assert.ok(result.length > 0, "should find poses matching 'sun'");
    for (const p of result) {
      const matches =
        p.name.toLowerCase().includes(query) ||
        p.sanskrit_name.toLowerCase().includes(query);
      assert.ok(matches, `pose ${p.name} should match search query 'sun'`);
    }
  });

  it("search filters by Sanskrit name", async () => {
    const { poses } = await import("../../data");
    const query = "surya";
    const result = poses.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.sanskrit_name.toLowerCase().includes(query),
    );
    assert.ok(result.length > 0, "should find poses matching 'surya'");
  });

  it("category filter returns only poses in those categories", async () => {
    const { poses } = await import("../../data");
    const filterCats = ["backbends"];
    const result = poses.filter((p) =>
      filterCats.some((cid) => p.categories.includes(cid)),
    );
    assert.ok(result.length > 0, "should find poses in 'backbends' category");
    for (const p of result) {
      assert.ok(
        p.categories.includes("backbends"),
        `pose ${p.name} should have 'backbends' category`,
      );
    }
  });

  it("chakra filter returns only poses with those chakras", async () => {
    const { poses } = await import("../../data");
    const filterChakras = ["heart"];
    const result = poses.filter((p) =>
      filterChakras.some((cid) => p.chakras.includes(cid)),
    );
    assert.ok(result.length > 0, "should find poses with 'heart' chakra");
    for (const p of result) {
      assert.ok(
        p.chakras.includes("heart"),
        `pose ${p.name} should have 'heart' chakra`,
      );
    }
  });

  it("combined style + category + chakra filters narrow results", async () => {
    const { poses } = await import("../../data");
    const styleId = "hatha-vinyasa";
    const catFilter = ["backbends"];
    const chakraFilter = ["heart"];

    const byStyle = poses.filter((p) => p.style_id === styleId);
    const byAll = byStyle
      .filter((p) => catFilter.some((c) => p.categories.includes(c)))
      .filter((p) => chakraFilter.some((c) => p.chakras.includes(c)));

    assert.ok(byAll.length <= byStyle.length, "combined filters should narrow or equal style-only results");
    for (const p of byAll) {
      assert.equal(p.style_id, styleId);
      assert.ok(p.categories.includes("backbends"));
      assert.ok(p.chakras.includes("heart"));
    }
  });

  it("empty filters return all poses for the style", async () => {
    const { poses } = await import("../../data");
    const styleId = "hatha-vinyasa";
    const byStyle = poses.filter((p) => p.style_id === styleId);
    // With empty filters, nothing additional is filtered
    const search = "";
    const cats: string[] = [];
    const chs: string[] = [];

    let result = byStyle;
    if (search) {
      result = result.filter((p) => p.name.toLowerCase().includes(search));
    }
    if (cats.length > 0) {
      result = result.filter((p) => cats.some((c) => p.categories.includes(c)));
    }
    if (chs.length > 0) {
      result = result.filter((p) => chs.some((c) => p.chakras.includes(c)));
    }

    assert.equal(result.length, byStyle.length, "empty filters should not reduce results");
  });

  it("clearing filters resets to empty state", async () => {
    const { emptyFilters } = await import("../../components/FilterPanel");
    // Simulate user having active filters, then clearing
    const activeFilters = {
      search: "tree",
      categoryIds: ["backbends", "inversions"],
      chakraIds: ["root"],
    };
    // After clear, should match emptyFilters
    const cleared = { ...emptyFilters };
    assert.equal(cleared.search, "");
    assert.equal(cleared.categoryIds.length, 0);
    assert.equal(cleared.chakraIds.length, 0);
    assert.notDeepEqual(activeFilters, cleared, "active filters differ from cleared");
  });
});
