"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { styles } from "@/data/styles";
import { SplitPill } from "@/components/SplitPill";
import { GhostButton } from "@/components/GhostButton";

/* ---- Pure helpers (exported for testing) ---- */

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function calculateStreak(dates: string[]): number {
  if (dates.length === 0) return 0;
  const unique = [...new Set(dates)].sort((a, b) => (a > b ? -1 : 1));
  const today = new Date().toISOString().slice(0, 10);
  // Streak must include today or yesterday to be active
  if (unique[0] !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().slice(0, 10);
    if (unique[0] !== yesterdayStr) return 0;
  }
  let streak = 1;
  for (let i = 0; i < unique.length - 1; i++) {
    const current = new Date(unique[i]);
    const prev = new Date(unique[i + 1]);
    const diffMs = current.getTime() - prev.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

/* ---- Complete Page ---- */

export default function CompletePage() {
  const router = useRouter();
  const {
    selectedPoses,
    practiceHistory,
    savedSequences,
    setSavedSequences,
  } = useAppContext();

  const styleMap = useMemo(() => {
    const map: Record<string, string> = {};
    for (const s of styles) map[s.id] = s.name;
    return map;
  }, []);

  // Get the most recent session (just recorded by player)
  const lastSession = practiceHistory[0];
  const totalDuration = lastSession?.duration_seconds ?? 0;
  const poseCount = lastSession?.pose_count ?? selectedPoses.length;
  const styleName = lastSession
    ? (styleMap[lastSession.style_id] ?? "Yoga")
    : "Yoga";

  // Calculate streak from all practice dates
  const streak = useMemo(() => {
    const dates = practiceHistory.map((s) => s.date);
    return calculateStreak(dates);
  }, [practiceHistory]);

  // Check if current sequence is already saved
  const isAlreadySaved = useMemo(() => {
    if (selectedPoses.length === 0) return true;
    const currentIds = selectedPoses.map((p) => p.id).join(",");
    return savedSequences.some(
      (seq) => seq.poseIds.join(",") === currentIds,
    );
  }, [selectedPoses, savedSequences]);

  const handleSave = () => {
    if (isAlreadySaved || selectedPoses.length === 0) return;
    setSavedSequences((prev) => [
      ...prev,
      {
        id: `saved-${Date.now()}`,
        name: `${styleName} Flow`,
        poseIds: selectedPoses.map((p) => p.id),
        durations: Object.fromEntries(
          selectedPoses.map((p) => [p.id, p.default_duration_seconds || 30]),
        ),
        styleId: selectedPoses[0]?.style_id,
        totalDuration,
        createdAt: new Date().toISOString().slice(0, 10),
      },
    ]);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--bg)",
      }}
    >
      {/* Top section - white bg */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 32px 48px",
          textAlign: "center",
        }}
      >
        {/* Checkmark icon */}
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 999,
            background: "var(--blush)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 32,
          }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 24L20 32L36 16"
              stroke="var(--ink)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Heading */}
        <h1
          className="display-lg"
          style={{ color: "var(--ink)", marginBottom: 8 }}
        >
          Practice Complete
        </h1>
        <p className="body-text" style={{ color: "var(--ink-3)" }}>
          Great session. You showed up.
        </p>
      </div>

      {/* Stats section - bg-2 */}
      <div
        style={{
          background: "var(--bg-2)",
          padding: "40px 32px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 40,
            marginBottom: 32,
          }}
        >
          {/* Duration */}
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                fontSize: 28,
                fontWeight: 500,
                color: "var(--ink)",
                lineHeight: 1,
                letterSpacing: "0.02em",
              }}
            >
              {formatDuration(totalDuration)}
            </p>
            <p
              className="eyebrow"
              style={{ marginTop: 8, color: "var(--ink-3)" }}
            >
              Duration
            </p>
          </div>

          {/* Poses */}
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                fontSize: 28,
                fontWeight: 500,
                color: "var(--ink)",
                lineHeight: 1,
                letterSpacing: "0.02em",
              }}
            >
              {poseCount}
            </p>
            <p
              className="eyebrow"
              style={{ marginTop: 8, color: "var(--ink-3)" }}
            >
              Poses
            </p>
          </div>

          {/* Style */}
          <div style={{ textAlign: "center" }}>
            <p
              className="display-sm"
              style={{
                color: "var(--ink)",
                lineHeight: 1,
                fontSize: 24,
              }}
            >
              {styleName}
            </p>
            <p
              className="eyebrow"
              style={{ marginTop: 8, color: "var(--ink-3)" }}
            >
              Style
            </p>
          </div>
        </div>

        {/* Streak */}
        {streak > 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "20px 0",
              borderTop: "1px solid var(--rule)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              {/* Flame dots visualization */}
              <div style={{ display: "flex", gap: 4 }}>
                {Array.from({ length: Math.min(streak, 7) }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 999,
                      background: "var(--blush-2)",
                    }}
                  />
                ))}
              </div>
              <p
                className="body-text"
                style={{ color: "var(--ink)", fontWeight: 600 }}
              >
                {streak}-day streak
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Actions section */}
      <div
        style={{
          padding: "40px 32px 60px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        {!isAlreadySaved && (
          <SplitPill label="Save to Library" onClick={handleSave} />
        )}
        <GhostButton
          label="Practice Again"
          onClick={() => router.push("/player")}
        />
        <GhostButton
          label="Back to Home"
          onClick={() => router.push("/home")}
        />
      </div>
    </div>
  );
}
