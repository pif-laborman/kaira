export interface PremadeFlow {
  id: string;
  name: string;
  description: string;
  style_id: string;
  teacher_name: string;
  duration_minutes: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  pose_ids: string[];
}

export const premadeFlows: PremadeFlow[] = [
  {
    id: "flow-001",
    name: "Morning Sun Flow",
    description:
      "Wake up your body with this energizing vinyasa sequence. Flowing sun salutations build into standing poses, warming every joint and muscle to start your day with clarity and purpose.",
    style_id: "hatha-vinyasa",
    teacher_name: "Maya Chen",
    duration_minutes: 20,
    difficulty: "beginner",
    pose_ids: ["hv-001", "hv-005", "hv-002", "hv-003", "hv-004", "hv-006", "hv-007"],
  },
  {
    id: "flow-002",
    name: "Deep Yin Release",
    description:
      "Slow down and soften. This yin sequence targets the hips and spine with long-held postures that release deep tension. Perfect for evening practice or recovery days.",
    style_id: "yin",
    teacher_name: "Lena Sato",
    duration_minutes: 35,
    difficulty: "beginner",
    pose_ids: ["yin-001", "yin-002", "yin-004", "yin-003", "yin-006", "yin-007", "yin-008", "yin-005"],
  },
  {
    id: "flow-003",
    name: "Office Reset",
    description:
      "A 10-minute chair yoga sequence to undo the damage of desk work. Open your chest, release your hips, and reset your posture without leaving your chair.",
    style_id: "chair",
    teacher_name: "David Park",
    duration_minutes: 10,
    difficulty: "beginner",
    pose_ids: ["ch-001", "ch-002", "ch-004", "ch-007", "ch-006", "ch-003"],
  },
  {
    id: "flow-004",
    name: "Kundalini Energy Boost",
    description:
      "Activate your energy centers with this dynamic Kundalini kriya. Breath-driven movements and holds build heat and focus, leaving you charged and clear.",
    style_id: "kundalini",
    teacher_name: "Amrit Kaur",
    duration_minutes: 25,
    difficulty: "intermediate",
    pose_ids: ["kun-002", "kun-003", "kun-001", "kun-006", "kun-007", "kun-005"],
  },
  {
    id: "flow-005",
    name: "Breath and Balance",
    description:
      "Combine pranayama techniques with gentle mudras for a complete inner practice. No movement required. Sit, breathe, and observe the shifts in energy and awareness.",
    style_id: "pranayama",
    teacher_name: "Sofia Reyes",
    duration_minutes: 15,
    difficulty: "beginner",
    pose_ids: ["pr-007", "pr-002", "pr-004", "pr-005", "mud-001", "mud-004"],
  },
];
