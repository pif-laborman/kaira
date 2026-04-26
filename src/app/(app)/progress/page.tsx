"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { RegistrationMark } from "@/components/RegistrationMark";
import { styles } from "@/data/styles";
import { poses } from "@/data/poses";
import type { PracticeSession } from "@/data/practice-history";

const styleMap: Record<string, { name: string; color: string }> = {};
for (const s of styles) {
  styleMap[s.id] = { name: s.name, color: s.color };
}

export function computeStats(sessions: PracticeSession[]) {
  const totalSessions = sessions.length;
  const totalMinutes = Math.round(
    sessions.reduce((sum, s) => sum + s.duration_seconds, 0) / 60
  );
  const posesPracticed = sessions.reduce((sum, s) => sum + s.pose_count, 0);
  const streak = calculateStreak(sessions);
  return { totalSessions, totalMinutes, streak, posesPracticed };
}

export function calculateStreak(sessions: PracticeSession[]): number {
  if (sessions.length === 0) return 0;
  const uniqueDates = [
    ...new Set(sessions.map((s) => s.date)),
  ].sort((a, b) => (a > b ? -1 : 1));

  const today = new Date().toISOString().slice(0, 10);
  if (uniqueDates[0] !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yStr = yesterday.toISOString().slice(0, 10);
    if (uniqueDates[0] !== yStr) return 0;
  }

  let count = 1;
  for (let i = 1; i < uniqueDates.length; i++) {
    const prev = new Date(uniqueDates[i - 1]);
    const curr = new Date(uniqueDates[i]);
    const diffMs = prev.getTime() - curr.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      count++;
    } else {
      break;
    }
  }
  return count;
}

export function getCalendarDays(year: number, month: number): (number | null)[] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

export function formatSessionDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  if (m === 0) return `${seconds}s`;
  return `${m}m`;
}

export function formatSessionDate(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

export default function ProgressPage() {
  const { practiceHistory, setSelectedPoses } = useAppContext();
  const router = useRouter();

  const stats = useMemo(() => computeStats(practiceHistory), [practiceHistory]);

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const monthName = now.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const calendarDays = useMemo(() => getCalendarDays(year, month), [year, month]);

  const practicedDates = useMemo(() => {
    const set = new Set<number>();
    for (const s of practiceHistory) {
      const d = new Date(s.date + "T12:00:00");
      if (d.getFullYear() === year && d.getMonth() === month) {
        set.add(d.getDate());
      }
    }
    return set;
  }, [practiceHistory, year, month]);

  const recentSessions = useMemo(
    () =>
      [...practiceHistory]
        .sort((a, b) => (a.date > b.date ? -1 : 1))
        .slice(0, 5),
    [practiceHistory]
  );

  function handleSessionClick(session: PracticeSession) {
    const sessionPoses = poses.filter(
      (p) => p.style_id === session.style_id
    ).slice(0, session.pose_count);
    setSelectedPoses(sessionPoses);
    router.push("/builder/review");
  }

  const statCards = [
    { label: "Total Sessions", value: stats.totalSessions },
    { label: "Total Minutes", value: stats.totalMinutes },
    { label: "Current Streak", value: stats.streak },
    { label: "Poses Practiced", value: stats.posesPracticed },
  ];

  return (
    <div className="page frame" style={{ paddingBottom: 100 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 32,
        }}
      >
        <RegistrationMark />
        <RegistrationMark />
      </div>

      <h1
        className="display-lg"
        style={{ color: "var(--ink)", marginBottom: 32 }}
      >
        Your Practice
      </h1>

      {/* Stat Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          marginBottom: 40,
        }}
      >
        {statCards.map((card) => (
          <div
            key={card.label}
            style={{
              background: "var(--card)",
              border: "1px solid var(--rule)",
              borderRadius: 18,
              padding: "clamp(16px, 2vw, 24px)",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <span
              className="mono eyebrow"
              style={{ fontSize: 10, letterSpacing: "0.12em" }}
            >
              {card.label.toUpperCase()}
            </span>
            <span
              className="display-md"
              style={{ color: "var(--ink)" }}
            >
              {card.value}
            </span>
          </div>
        ))}
      </div>

      {/* Calendar Heatmap */}
      <div style={{ marginBottom: 40 }}>
        <p
          className="eyebrow"
          style={{ marginBottom: 16 }}
        >
          {monthName}
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 4,
            textAlign: "center",
          }}
        >
          {WEEKDAYS.map((day, i) => (
            <span
              key={`weekday-${i}`}
              className="mono"
              style={{
                fontSize: 10,
                color: "var(--ink-3)",
                paddingBottom: 4,
              }}
            >
              {day}
            </span>
          ))}
          {calendarDays.map((day, i) => (
            <div
              key={`cal-${i}`}
              style={{
                aspectRatio: "1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {day !== null && (
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor:
                      practicedDates.has(day)
                        ? "var(--ink)"
                        : "var(--rule)",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Sessions */}
      <div>
        <p className="eyebrow" style={{ marginBottom: 16 }}>
          Recent Sessions
        </p>
        {recentSessions.length === 0 ? (
          <p className="body-lg" style={{ color: "var(--ink-3)" }}>
            No sessions yet. Start a practice to see your history.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {recentSessions.map((session) => {
              const style = styleMap[session.style_id];
              return (
                <button
                  key={session.id}
                  type="button"
                  onClick={() => handleSessionClick(session)}
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--rule)",
                    borderRadius: 18,
                    padding: "clamp(14px, 2vw, 20px)",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    cursor: "pointer",
                    textAlign: "left",
                    fontFamily: "inherit",
                    width: "100%",
                    transition: "background 200ms ease",
                  }}
                >
                  {/* Style color swatch */}
                  <div
                    style={{
                      width: 8,
                      height: 40,
                      borderRadius: 4,
                      backgroundColor: style?.color ?? "var(--tag-bg)",
                      flexShrink: 0,
                    }}
                  />
                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      className="body-lg"
                      style={{
                        color: "var(--ink)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {session.sequence_name}
                    </div>
                    <div
                      className="small"
                      style={{ color: "var(--ink-3)", marginTop: 2 }}
                    >
                      {formatSessionDuration(session.duration_seconds)}
                      {" \u00B7 "}
                      {formatSessionDate(session.date)}
                    </div>
                  </div>
                  {/* Style pill */}
                  {style && (
                    <span
                      className="mono"
                      style={{
                        background: "var(--tag-bg)",
                        padding: "4px 10px",
                        borderRadius: 999,
                        color: "var(--ink-3)",
                        fontSize: 11,
                        flexShrink: 0,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {style.name}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
