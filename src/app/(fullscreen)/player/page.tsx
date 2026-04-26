"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { styles } from "@/data/styles";
import type { Pose } from "@/data/poses";
import type { PracticeSession } from "@/data/practice-history";

/* ---- Pure helpers (exported for testing) ---- */

export const DEFAULT_DURATION = 30;

export function formatTimer(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function getProgressPercent(currentIndex: number, totalPoses: number): number {
  if (totalPoses <= 0) return 0;
  return Math.round(((currentIndex + 1) / totalPoses) * 100);
}

export type PlayerPhase = "countdown" | "pose" | "complete";

export interface PlayerState {
  phase: PlayerPhase;
  poseIndex: number;
  countdownValue: number;
  timeRemaining: number;
  paused: boolean;
}

export function createInitialState(duration: number): PlayerState {
  return {
    phase: "countdown",
    poseIndex: 0,
    countdownValue: 3,
    timeRemaining: duration,
    paused: false,
  };
}

export function tickCountdown(state: PlayerState): PlayerState {
  if (state.phase !== "countdown" || state.paused) return state;
  if (state.countdownValue > 1) {
    return { ...state, countdownValue: state.countdownValue - 1 };
  }
  return { ...state, phase: "pose", countdownValue: 0 };
}

export function tickPoseTimer(
  state: PlayerState,
  totalPoses: number,
  getDuration: (index: number) => number,
): PlayerState {
  if (state.phase !== "pose" || state.paused) return state;
  if (state.timeRemaining > 1) {
    return { ...state, timeRemaining: state.timeRemaining - 1 };
  }
  // Timer hit zero - advance to next pose or complete
  const nextIndex = state.poseIndex + 1;
  if (nextIndex >= totalPoses) {
    return { ...state, phase: "complete", timeRemaining: 0 };
  }
  return {
    ...state,
    phase: "countdown",
    poseIndex: nextIndex,
    countdownValue: 3,
    timeRemaining: getDuration(nextIndex),
  };
}

export function skipForward(
  state: PlayerState,
  totalPoses: number,
  getDuration: (index: number) => number,
): PlayerState {
  const nextIndex = state.poseIndex + 1;
  if (nextIndex >= totalPoses) {
    return { ...state, phase: "complete", timeRemaining: 0 };
  }
  return {
    ...state,
    phase: "countdown",
    poseIndex: nextIndex,
    countdownValue: 3,
    timeRemaining: getDuration(nextIndex),
  };
}

export function skipBack(
  state: PlayerState,
  getDuration: (index: number) => number,
): PlayerState {
  const prevIndex = Math.max(0, state.poseIndex - 1);
  return {
    ...state,
    phase: "countdown",
    poseIndex: prevIndex,
    countdownValue: 3,
    timeRemaining: getDuration(prevIndex),
  };
}

export function togglePause(state: PlayerState): PlayerState {
  return { ...state, paused: !state.paused };
}

/* ---- Icon Button ---- */
function IconButton({
  children,
  onClick,
  ariaLabel,
  filled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  ariaLabel: string;
  filled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      style={{
        width: 44,
        height: 44,
        borderRadius: 999,
        border: filled ? "none" : "1px solid var(--ink)",
        background: filled ? "var(--ink)" : "transparent",
        color: filled ? "var(--pill-ink)" : "var(--ink)",
        cursor: "pointer",
        fontSize: 18,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "inherit",
        transition: "background 200ms ease, color 200ms ease",
      }}
    >
      {children}
    </button>
  );
}

/* ---- Player Page ---- */
export default function PlayerPage() {
  const router = useRouter();
  const { selectedPoses, practiceHistory, setPracticeHistory } = useAppContext();

  const styleColorMap = useMemo(() => {
    const map: Record<string, string> = {};
    for (const s of styles) map[s.id] = s.color;
    return map;
  }, []);

  // Read durations from review page or use defaults
  const durations = useMemo(() => {
    const map: Record<string, number> = {};
    for (const pose of selectedPoses) {
      map[pose.id] = pose.default_duration_seconds || DEFAULT_DURATION;
    }
    return map;
  }, [selectedPoses]);

  const getDuration = useCallback(
    (index: number) => {
      if (index < 0 || index >= selectedPoses.length) return DEFAULT_DURATION;
      return durations[selectedPoses[index].id] ?? DEFAULT_DURATION;
    },
    [selectedPoses, durations],
  );

  const [state, setState] = useState<PlayerState>(() =>
    createInitialState(getDuration(0)),
  );

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasRecorded = useRef(false);

  // Record completed session
  const recordSession = useCallback(() => {
    if (hasRecorded.current) return;
    hasRecorded.current = true;
    const totalDuration = selectedPoses.reduce(
      (sum, p) => sum + (durations[p.id] ?? DEFAULT_DURATION),
      0,
    );
    const session: PracticeSession = {
      id: `sess-${Date.now()}`,
      sequence_name: "Custom Sequence",
      style_id: selectedPoses[0]?.style_id ?? "hatha-vinyasa",
      duration_seconds: totalDuration,
      date: new Date().toISOString().slice(0, 10),
      pose_count: selectedPoses.length,
    };
    setPracticeHistory((prev) => [session, ...prev]);
  }, [selectedPoses, durations, setPracticeHistory]);

  // Timer tick
  useEffect(() => {
    if (state.paused || state.phase === "complete") {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setState((prev) => {
        if (prev.phase === "countdown") {
          return tickCountdown(prev);
        }
        if (prev.phase === "pose") {
          return tickPoseTimer(prev, selectedPoses.length, getDuration);
        }
        return prev;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [state.paused, state.phase, selectedPoses.length, getDuration]);

  // Navigate on complete
  useEffect(() => {
    if (state.phase === "complete") {
      recordSession();
      const timeout = setTimeout(() => router.push("/complete"), 500);
      return () => clearTimeout(timeout);
    }
  }, [state.phase, recordSession, router]);

  // Redirect if no poses
  if (selectedPoses.length === 0) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <div style={{ textAlign: "center", padding: 32 }}>
          <p className="display-md" style={{ color: "var(--ink)", marginBottom: 16 }}>
            No sequence loaded
          </p>
          <button
            type="button"
            onClick={() => router.push("/builder")}
            style={{
              background: "var(--pill)",
              color: "var(--pill-ink)",
              border: "none",
              borderRadius: 999,
              padding: "14px 32px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Go to Builder
          </button>
        </div>
      </div>
    );
  }

  const currentPose: Pose = selectedPoses[state.poseIndex];
  const nextPose: Pose | undefined = selectedPoses[state.poseIndex + 1];
  const progressPercent = getProgressPercent(state.poseIndex, selectedPoses.length);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--bg)",
        position: "relative",
      }}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={() => router.push("/builder/review")}
        aria-label="Close player"
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          width: 44,
          height: 44,
          borderRadius: 999,
          border: "1px solid var(--rule)",
          background: "var(--bg)",
          cursor: "pointer",
          fontSize: 20,
          color: "var(--ink)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "inherit",
          zIndex: 10,
        }}
      >
        &#10005;
      </button>

      {/* Progress bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: "var(--rule)",
          zIndex: 10,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progressPercent}%`,
            background: "var(--ink)",
            transition: "width 350ms cubic-bezier(.65,0,.35,1)",
          }}
        />
      </div>

      {/* Pose counter */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 10,
        }}
      >
        <span
          className="mono"
          style={{ color: "var(--ink-3)", fontSize: 11 }}
        >
          {String(state.poseIndex + 1).padStart(2, "0")}/{String(selectedPoses.length).padStart(2, "0")}
        </span>
      </div>

      {/* Main content area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 32px 160px",
        }}
      >
        {state.phase === "countdown" && (
          <div style={{ textAlign: "center" }}>
            <p className="eyebrow" style={{ marginBottom: 16 }}>
              Get Ready
            </p>
            <p
              className="display-xl"
              style={{
                color: "var(--ink)",
                fontSize: "clamp(80px, 20vw, 160px)",
                lineHeight: 1,
                fontWeight: 700,
              }}
            >
              {state.countdownValue}
            </p>
            <p
              className="display-sm"
              style={{ marginTop: 24, color: "var(--ink-2)" }}
            >
              {currentPose.name}
            </p>
          </div>
        )}

        {state.phase === "pose" && (
          <div style={{ textAlign: "center", width: "100%", maxWidth: 480 }}>
            {/* Current pose card */}
            <div
              style={{
                background: "var(--card)",
                borderRadius: 18,
                border: "1px solid var(--rule)",
                overflow: "hidden",
                marginBottom: 32,
              }}
            >
              {/* Placeholder image */}
              <div
                style={{
                  height: 200,
                  background: styleColorMap[currentPose.style_id] ?? "#ccc",
                  opacity: 0.35,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  className="mono"
                  style={{ color: "var(--ink)", opacity: 0.7, fontSize: 14 }}
                >
                  POSE {String(currentPose.number).padStart(2, "0")}
                </span>
              </div>
              <div style={{ padding: "16px 20px" }}>
                <p className="display-md" style={{ color: "var(--ink)", marginBottom: 4 }}>
                  {currentPose.name}
                </p>
                <p className="small" style={{ fontStyle: "italic" }}>
                  {currentPose.sanskrit_name}
                </p>
              </div>
            </div>

            {/* Timer */}
            <p
              style={{
                fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                fontSize: "clamp(48px, 10vw, 72px)",
                fontWeight: 500,
                color: "var(--ink)",
                lineHeight: 1,
                letterSpacing: "0.04em",
                marginBottom: 32,
              }}
            >
              {formatTimer(state.timeRemaining)}
            </p>

            {/* Next pose preview */}
            {nextPose && (
              <div style={{ marginTop: 8 }}>
                <p className="eyebrow" style={{ marginBottom: 8 }}>
                  Up Next
                </p>
                <p className="display-sm" style={{ color: "var(--ink-2)" }}>
                  {nextPose.name}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Transport controls */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "var(--bg)",
          borderTop: "1px solid var(--rule)",
          padding: "20px 0 40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 24,
          zIndex: 50,
        }}
      >
        <IconButton
          onClick={() =>
            setState((prev) => skipBack(prev, getDuration))
          }
          ariaLabel="Previous pose"
        >
          &#9664;&#9664;
        </IconButton>

        <IconButton
          onClick={() => setState((prev) => togglePause(prev))}
          ariaLabel={state.paused ? "Play" : "Pause"}
          filled
        >
          {state.paused ? "\u25B6" : "\u2759\u2759"}
        </IconButton>

        <IconButton
          onClick={() =>
            setState((prev) =>
              skipForward(prev, selectedPoses.length, getDuration),
            )
          }
          ariaLabel="Next pose"
        >
          &#9654;&#9654;
        </IconButton>
      </div>
    </div>
  );
}
