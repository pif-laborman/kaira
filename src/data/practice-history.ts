export interface PracticeSession {
  id: string;
  sequence_name: string;
  style_id: string;
  duration_seconds: number;
  date: string;
  pose_count: number;
}

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

export const practiceHistory: PracticeSession[] = [
  {
    id: "sess-001",
    sequence_name: "Morning Sun Flow",
    style_id: "hatha-vinyasa",
    duration_seconds: 1200,
    date: daysAgo(0),
    pose_count: 7,
  },
  {
    id: "sess-002",
    sequence_name: "Deep Yin Release",
    style_id: "yin",
    duration_seconds: 2100,
    date: daysAgo(1),
    pose_count: 8,
  },
  {
    id: "sess-003",
    sequence_name: "Office Reset",
    style_id: "chair",
    duration_seconds: 600,
    date: daysAgo(2),
    pose_count: 6,
  },
  {
    id: "sess-004",
    sequence_name: "Morning Sun Flow",
    style_id: "hatha-vinyasa",
    duration_seconds: 1200,
    date: daysAgo(3),
    pose_count: 7,
  },
  {
    id: "sess-005",
    sequence_name: "Breath and Balance",
    style_id: "pranayama",
    duration_seconds: 900,
    date: daysAgo(5),
    pose_count: 6,
  },
  {
    id: "sess-006",
    sequence_name: "Kundalini Energy Boost",
    style_id: "kundalini",
    duration_seconds: 1500,
    date: daysAgo(6),
    pose_count: 6,
  },
  {
    id: "sess-007",
    sequence_name: "Deep Yin Release",
    style_id: "yin",
    duration_seconds: 2100,
    date: daysAgo(8),
    pose_count: 8,
  },
  {
    id: "sess-008",
    sequence_name: "Morning Sun Flow",
    style_id: "hatha-vinyasa",
    duration_seconds: 1200,
    date: daysAgo(9),
    pose_count: 7,
  },
  {
    id: "sess-009",
    sequence_name: "Office Reset",
    style_id: "chair",
    duration_seconds: 600,
    date: daysAgo(11),
    pose_count: 6,
  },
  {
    id: "sess-010",
    sequence_name: "Breath and Balance",
    style_id: "pranayama",
    duration_seconds: 900,
    date: daysAgo(13),
    pose_count: 6,
  },
];
