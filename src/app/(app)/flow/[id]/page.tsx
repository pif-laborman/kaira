"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { premadeFlows } from "@/data/premade-flows";
import { poses } from "@/data/poses";
import { styles } from "@/data/styles";
import { SplitPill } from "@/components/SplitPill";
import { RegistrationMark } from "@/components/RegistrationMark";

export const DEFAULT_DURATION = 30;
export const DURATION_STEP = 5;
export const MIN_DURATION = 5;

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function resolveFlowPoses(poseIds: string[]) {
  const poseMap = new Map(poses.map((p) => [p.id, p]));
  return poseIds.map((id) => poseMap.get(id)).filter(Boolean) as typeof poses;
}

/* --- Duration Button --- */
function DurationButton({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label === "+" ? "Increase duration" : "Decrease duration"}
      style={{
        width: 32,
        height: 32,
        borderRadius: 999,
        border: "1px solid var(--rule)",
        background: "transparent",
        cursor: disabled ? "default" : "pointer",
        fontSize: 16,
        fontWeight: 600,
        color: disabled ? "var(--ink-3)" : "var(--ink)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "inherit",
        opacity: disabled ? 0.4 : 1,
        transition: "opacity 200ms ease",
      }}
    >
      {label}
    </button>
  );
}

/* --- Flow Pose Card --- */
function FlowPoseCard({
  pose,
  styleColor,
  duration,
  onIncrease,
  onDecrease,
}: {
  pose: (typeof poses)[number];
  styleColor: string;
  duration: number;
  onIncrease: () => void;
  onDecrease: () => void;
}) {
  return (
    <div
      style={{
        background: "var(--card)",
        borderRadius: 18,
        border: "1px solid var(--rule)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Placeholder image area */}
      <div
        style={{
          height: 100,
          background: styleColor,
          opacity: 0.35,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <span
          className="mono"
          style={{
            position: "absolute",
            top: 8,
            left: 10,
            color: "var(--ink)",
            opacity: 0.7,
          }}
        >
          {String(pose.number).padStart(2, "0")}
        </span>
      </div>

      {/* Side badge */}
      {pose.has_sides && (
        <div
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            background: "var(--blush)",
            borderRadius: 999,
            padding: "3px 10px",
            fontSize: 10,
            fontWeight: 600,
            color: "var(--ink-2)",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          L+R
        </div>
      )}

      {/* Content */}
      <div style={{ padding: "12px 14px" }}>
        <p
          className="display-sm" style={{ marginBottom: 8, color: "var(--ink)" }}
        >
          {pose.name}
        </p>

        {/* Duration controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          <DurationButton
            label="-"
            onClick={onDecrease}
            disabled={duration <= MIN_DURATION}
          />
          <span
            className="mono"
            style={{
              color: "var(--ink)",
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            {formatDuration(duration)}
          </span>
          <DurationButton label="+" onClick={onIncrease} />
        </div>
      </div>
    </div>
  );
}

export default function FlowDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { setSelectedPoses } = useAppContext();
  const [bookmarked, setBookmarked] = useState(false);

  const flowId = params.id as string;
  const flow = premadeFlows.find((f) => f.id === flowId);
  const style = flow ? styles.find((s) => s.id === flow.style_id) : undefined;
  const flowPoses = useMemo(
    () => (flow ? resolveFlowPoses(flow.pose_ids) : []),
    [flow],
  );

  const [durations, setDurations] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    for (const p of flowPoses) {
      init[p.id] = p.default_duration_seconds || DEFAULT_DURATION;
    }
    return init;
  });

  const getDuration = useCallback(
    (poseId: string) => durations[poseId] ?? DEFAULT_DURATION,
    [durations],
  );

  const increaseDuration = useCallback((poseId: string) => {
    setDurations((prev) => ({
      ...prev,
      [poseId]: (prev[poseId] ?? DEFAULT_DURATION) + DURATION_STEP,
    }));
  }, []);

  const decreaseDuration = useCallback((poseId: string) => {
    setDurations((prev) => {
      const current = prev[poseId] ?? DEFAULT_DURATION;
      if (current <= MIN_DURATION) return prev;
      return { ...prev, [poseId]: current - DURATION_STEP };
    });
  }, []);

  const totalDuration = useMemo(
    () => flowPoses.reduce((sum, p) => sum + getDuration(p.id), 0),
    [flowPoses, getDuration],
  );

  const handleStart = useCallback(() => {
    setSelectedPoses(flowPoses);
    router.push("/player");
  }, [flowPoses, setSelectedPoses, router]);

  if (!flow) {
    return (
      <div className="page" style={{ paddingTop: "clamp(16px, 3vw, 32px)" }}>
        <div style={{ textAlign: "center", paddingTop: 80 }}>
          <p className="display-md" style={{ color: "var(--ink)", marginBottom: 16 }}>
            Flow not found
          </p>
          <p className="body-lg" style={{ marginBottom: 32 }}>
            This flow does not exist.
          </p>
          <SplitPill label="Back to Home" onClick={() => router.push("/home")} />
        </div>
      </div>
    );
  }

  const styleColor = style?.color ?? "var(--rule)";

  return (
    <div className="page" style={{ paddingTop: 0, paddingBottom: 160 }}>
      {/* Header image area */}
      <div
        style={{
          height: 220,
          background: styleColor,
          opacity: 0.3,
          position: "relative",
          borderRadius: "0 0 18px 18px",
        }}
      />

      {/* Overlaid header content */}
      <div
        style={{
          position: "relative",
          marginTop: -220,
          height: 220,
          padding: "clamp(16px, 3vw, 40px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Top row: back + bookmark */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
            style={{
              width: 44,
              height: 44,
              borderRadius: 999,
              border: "1px solid var(--ink)",
              background: "var(--overlay-light)",
              cursor: "pointer",
              fontSize: 18,
              color: "var(--ink)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "inherit",
              backdropFilter: "blur(4px)",
            }}
          >
            &#8592;
          </button>
          <button
            type="button"
            onClick={() => setBookmarked((v) => !v)}
            aria-label={bookmarked ? "Remove bookmark" : "Bookmark flow"}
            style={{
              width: 44,
              height: 44,
              borderRadius: 999,
              border: "1px solid var(--ink)",
              background: bookmarked ? "var(--ink)" : "var(--overlay-light)",
              cursor: "pointer",
              fontSize: 18,
              color: bookmarked ? "var(--pill-ink)" : "var(--ink)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "inherit",
              backdropFilter: "blur(4px)",
              transition: "background 200ms ease, color 200ms ease",
            }}
          >
            {bookmarked ? "\u2665" : "\u2661"}
          </button>
        </div>

        {/* Style pill badge */}
        <div>
          <span
            style={{
              display: "inline-block",
              background: "var(--overlay-light)",
              borderRadius: 999,
              padding: "5px 14px",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--ink)",
              backdropFilter: "blur(4px)",
            }}
          >
            {style?.name ?? "Yoga"}
          </span>
        </div>
      </div>

      {/* Flow details */}
      <div style={{ padding: "24px clamp(16px, 3vw, 40px) 0" }}>
        {/* Flow name */}
        <h1 className="display-md" style={{ color: "var(--ink)", marginBottom: 12 }}>
          {flow.name}
        </h1>

        {/* Duration + difficulty pills */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              background: "var(--tag-bg)",
              borderRadius: 999,
              padding: "5px 12px",
              fontSize: 12,
              fontWeight: 500,
              color: "var(--ink-2)",
            }}
          >
            <span className="mono" style={{ fontSize: 12 }}>
              {flow.duration_minutes}m
            </span>
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              background: "var(--tag-bg)",
              borderRadius: 999,
              padding: "5px 12px",
              fontSize: 12,
              fontWeight: 500,
              color: "var(--ink-2)",
              textTransform: "capitalize",
            }}
          >
            {flow.difficulty}
          </span>
        </div>

        {/* Teacher */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 999,
              background: "var(--card-2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              color: "var(--ink-3)",
              fontWeight: 600,
              flexShrink: 0,
            }}
          >
            {flow.teacher_name.charAt(0)}
          </div>
          <span className="body-lg" style={{ color: "var(--ink-2)" }}>
            {flow.teacher_name}
          </span>
        </div>

        {/* Description */}
        <p className="body-lg" style={{ color: "var(--ink-2)", marginBottom: 32, lineHeight: 1.6 }}>
          {flow.description}
        </p>

        {/* Registration marks */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <RegistrationMark />
          <RegistrationMark />
        </div>

        {/* Section heading */}
        <p className="eyebrow" style={{ marginBottom: 12 }}>
          {flowPoses.length} Pose{flowPoses.length !== 1 ? "s" : ""}
        </p>

        {/* 3-column pose grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {flowPoses.map((pose, idx) => (
            <FlowPoseCard
              key={`${pose.id}-${idx}`}
              pose={pose}
              styleColor={styleColor}
              duration={getDuration(pose.id)}
              onIncrease={() => increaseDuration(pose.id)}
              onDecrease={() => decreaseDuration(pose.id)}
            />
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          position: "fixed",
          bottom: 80,
          left: 0,
          right: 0,
          background: "var(--bg)",
          borderTop: "1px solid var(--rule)",
          padding: "14px clamp(16px, 3vw, 40px)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 50,
        }}
      >
        {/* Total duration */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18, color: "var(--ink-2)" }}>&#9201;</span>
          <span
            className="mono"
            style={{ color: "var(--ink)", fontSize: 13, fontWeight: 500 }}
          >
            {Math.floor(totalDuration / 60)}m {totalDuration % 60 > 0 ? `${totalDuration % 60}s` : ""}
          </span>
        </div>

        {/* Start button */}
        <SplitPill label="Start" onClick={handleStart} />
      </div>
    </div>
  );
}
