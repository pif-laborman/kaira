import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { styles } from "../styles";
import { chakras } from "../chakras";
import { categories } from "../categories";
import { poses } from "../poses";
import { premadeFlows } from "../premade-flows";
import { practiceHistory } from "../practice-history";
import {
  goalOptions,
  painPoints,
  tinderStatements,
  testimonialsByGoal,
  processingMessages,
} from "../onboarding";

describe("styles", () => {
  it("exports 7 yoga styles", () => {
    assert.equal(styles.length, 7);
  });

  it("each style has required fields", () => {
    for (const s of styles) {
      assert.ok(s.id, `style missing id`);
      assert.ok(s.name, `style ${s.id} missing name`);
      assert.ok(s.color, `style ${s.id} missing color`);
      assert.ok(s.description, `style ${s.id} missing description`);
      assert.match(s.color, /^#[0-9A-Fa-f]{6}$/, `style ${s.id} color is not valid hex`);
    }
  });

  it("has unique ids", () => {
    const ids = styles.map((s) => s.id);
    assert.equal(new Set(ids).size, ids.length);
  });
});

describe("chakras", () => {
  it("exports 7 chakras", () => {
    assert.equal(chakras.length, 7);
  });

  it("each chakra has required fields", () => {
    for (const c of chakras) {
      assert.ok(c.id, `chakra missing id`);
      assert.ok(c.name, `chakra ${c.id} missing name`);
      assert.match(c.color, /^#[0-9A-Fa-f]{6}$/, `chakra ${c.id} color is not valid hex`);
    }
  });

  it("has unique ids", () => {
    const ids = chakras.map((c) => c.id);
    assert.equal(new Set(ids).size, ids.length);
  });
});

describe("categories", () => {
  it("exports 6 categories", () => {
    assert.equal(categories.length, 6);
  });

  it("each category has required fields", () => {
    for (const c of categories) {
      assert.ok(c.id, `category missing id`);
      assert.ok(c.name, `category ${c.id} missing name`);
    }
  });

  it("has unique ids", () => {
    const ids = categories.map((c) => c.id);
    assert.equal(new Set(ids).size, ids.length);
  });
});

describe("poses", () => {
  it("exports at least 50 poses", () => {
    assert.ok(poses.length >= 50, `Expected >= 50 poses, got ${poses.length}`);
  });

  it("each pose has all required fields", () => {
    for (const p of poses) {
      assert.ok(p.id, `pose missing id`);
      assert.ok(typeof p.number === "number", `pose ${p.id} number is not a number`);
      assert.ok(p.name, `pose ${p.id} missing name`);
      assert.ok(p.sanskrit_name, `pose ${p.id} missing sanskrit_name`);
      assert.ok(p.instruction_text, `pose ${p.id} missing instruction_text`);
      assert.ok(p.detailed_instructions, `pose ${p.id} missing detailed_instructions`);
      assert.ok(Array.isArray(p.precautions), `pose ${p.id} precautions is not an array`);
      assert.ok(p.style_id, `pose ${p.id} missing style_id`);
      assert.ok(Array.isArray(p.chakras), `pose ${p.id} chakras is not an array`);
      assert.ok(Array.isArray(p.categories), `pose ${p.id} categories is not an array`);
      assert.ok(typeof p.has_sides === "boolean", `pose ${p.id} has_sides is not boolean`);
      assert.ok(typeof p.default_duration_seconds === "number", `pose ${p.id} duration is not a number`);
    }
  });

  it("has unique ids", () => {
    const ids = poses.map((p) => p.id);
    assert.equal(new Set(ids).size, ids.length);
  });

  it("spans all 7 styles", () => {
    const styleIds = new Set(poses.map((p) => p.style_id));
    for (const s of styles) {
      assert.ok(styleIds.has(s.id), `No poses found for style ${s.id}`);
    }
  });

  it("references valid style ids", () => {
    const validStyleIds = new Set(styles.map((s) => s.id));
    for (const p of poses) {
      assert.ok(validStyleIds.has(p.style_id), `pose ${p.id} references invalid style_id ${p.style_id}`);
    }
  });

  it("references valid chakra ids", () => {
    const validChakraIds = new Set(chakras.map((c) => c.id));
    for (const p of poses) {
      for (const cid of p.chakras) {
        assert.ok(validChakraIds.has(cid), `pose ${p.id} references invalid chakra ${cid}`);
      }
    }
  });

  it("references valid category ids", () => {
    const validCategoryIds = new Set(categories.map((c) => c.id));
    for (const p of poses) {
      for (const cid of p.categories) {
        assert.ok(validCategoryIds.has(cid), `pose ${p.id} references invalid category ${cid}`);
      }
    }
  });
});

describe("premadeFlows", () => {
  it("exports 5 pre-made flows", () => {
    assert.equal(premadeFlows.length, 5);
  });

  it("each flow has required fields", () => {
    for (const f of premadeFlows) {
      assert.ok(f.id, `flow missing id`);
      assert.ok(f.name, `flow ${f.id} missing name`);
      assert.ok(f.description, `flow ${f.id} missing description`);
      assert.ok(f.style_id, `flow ${f.id} missing style_id`);
      assert.ok(f.teacher_name, `flow ${f.id} missing teacher_name`);
      assert.ok(typeof f.duration_minutes === "number", `flow ${f.id} duration is not a number`);
      assert.ok(["beginner", "intermediate", "advanced"].includes(f.difficulty), `flow ${f.id} invalid difficulty`);
      assert.ok(Array.isArray(f.pose_ids) && f.pose_ids.length > 0, `flow ${f.id} has no pose_ids`);
    }
  });

  it("references valid style ids", () => {
    const validStyleIds = new Set(styles.map((s) => s.id));
    for (const f of premadeFlows) {
      assert.ok(validStyleIds.has(f.style_id), `flow ${f.id} references invalid style_id ${f.style_id}`);
    }
  });

  it("references valid pose ids", () => {
    const validPoseIds = new Set(poses.map((p) => p.id));
    for (const f of premadeFlows) {
      for (const pid of f.pose_ids) {
        assert.ok(validPoseIds.has(pid), `flow ${f.id} references invalid pose_id ${pid}`);
      }
    }
  });

  it("has unique ids", () => {
    const ids = premadeFlows.map((f) => f.id);
    assert.equal(new Set(ids).size, ids.length);
  });
});

describe("practiceHistory", () => {
  it("exports approximately 10 sessions", () => {
    assert.ok(practiceHistory.length >= 8 && practiceHistory.length <= 12);
  });

  it("each session has required fields", () => {
    for (const s of practiceHistory) {
      assert.ok(s.id, `session missing id`);
      assert.ok(s.sequence_name, `session ${s.id} missing sequence_name`);
      assert.ok(s.style_id, `session ${s.id} missing style_id`);
      assert.ok(typeof s.duration_seconds === "number", `session ${s.id} duration is not a number`);
      assert.ok(s.date, `session ${s.id} missing date`);
      assert.match(s.date, /^\d{4}-\d{2}-\d{2}$/, `session ${s.id} date is not YYYY-MM-DD`);
      assert.ok(typeof s.pose_count === "number", `session ${s.id} pose_count is not a number`);
    }
  });

  it("dates are within the last 2 weeks", () => {
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
    const twoWeeksAgoStr = twoWeeksAgo.toISOString().slice(0, 10);

    for (const s of practiceHistory) {
      assert.ok(s.date >= twoWeeksAgoStr, `session ${s.id} date ${s.date} is older than 2 weeks`);
    }
  });

  it("references valid style ids", () => {
    const validStyleIds = new Set(styles.map((s) => s.id));
    for (const s of practiceHistory) {
      assert.ok(validStyleIds.has(s.style_id), `session ${s.id} references invalid style_id ${s.style_id}`);
    }
  });
});

describe("onboarding", () => {
  it("exports goal options", () => {
    assert.ok(goalOptions.length >= 3);
    for (const g of goalOptions) {
      assert.ok(g.id);
      assert.ok(g.label);
      assert.ok(g.description);
    }
  });

  it("exports pain points", () => {
    assert.ok(painPoints.length >= 3);
    for (const p of painPoints) {
      assert.ok(p.id);
      assert.ok(p.label);
    }
  });

  it("exports tinder statements", () => {
    assert.ok(tinderStatements.length >= 3);
    for (const t of tinderStatements) {
      assert.ok(t.id);
      assert.ok(t.text);
    }
  });

  it("exports testimonials keyed by each goal", () => {
    for (const g of goalOptions) {
      const testimonial = testimonialsByGoal[g.id];
      assert.ok(testimonial, `Missing testimonial for goal ${g.id}`);
      assert.ok(testimonial.quote);
      assert.ok(testimonial.name);
      assert.ok(testimonial.role);
    }
  });

  it("exports processing messages", () => {
    assert.ok(processingMessages.length >= 2);
    for (const m of processingMessages) {
      assert.ok(m.text);
      assert.ok(typeof m.delay_ms === "number");
    }
  });
});
