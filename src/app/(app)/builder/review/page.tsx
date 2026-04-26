"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { styles } from "@/data/styles";
import { SplitPill } from "@/components/SplitPill";
import { RegistrationMark } from "@/components/RegistrationMark";
import type { Pose } from "@/data/poses";

const DEFAULT_DURATION = 30;
const DURATION_STEP = 5;
const MIN_DURATION = 5;

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function formatTotalDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return `${s}s`;
  if (s === 0) return `${m}m`;
  return `${m}m ${s}s`;
}

/* --- Icon Button for +/- --- */
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

/* --- Pose Review Card --- */
function ReviewCard({
  pose,
  styleColor,
  duration,
  onIncrease,
  onDecrease,
}: {
  pose: Pose;
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
          data-testid="side-badge"
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
          className="display-sm"
          style={{ fontSize: 15, marginBottom: 8, color: "var(--ink)" }}
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

/* --- Overflow Menu --- */
function OverflowMenu({
  open,
  onToggle,
  onSave,
}: {
  open: boolean;
  onToggle: () => void;
  onSave: () => void;
}) {
  return (
    <div style={{ position: "relative" }}>
      <button
        type="button"
        onClick={onToggle}
        aria-label="More options"
        style={{
          width: 44,
          height: 44,
          borderRadius: 999,
          border: "1px solid var(--rule)",
          background: "transparent",
          cursor: "pointer",
          fontSize: 20,
          color: "var(--ink)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "inherit",
          letterSpacing: "0.1em",
        }}
      >
        &#8943;
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: 50,
            right: 0,
            background: "var(--card)",
            border: "1px solid var(--rule)",
            borderRadius: 12,
            padding: "4px 0",
            minWidth: 180,
            boxShadow: "0 8px 24px rgba(20,19,15,0.12)",
            zIndex: 60,
          }}
        >
          <button
            type="button"
            onClick={onSave}
            style={{
              width: "100%",
              padding: "12px 16px",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: 14,
              fontWeight: 500,
              color: "var(--ink)",
              textAlign: "left",
            }}
          >
            Save to Library
          </button>
        </div>
      )}
    </div>
  );
}

/* --- Review Page --- */
export default function ReviewPage() {
  const router = useRouter();
  const { selectedPoses } = useAppContext();
  const [menuOpen, setMenuOpen] = useState(false);

  const [durations, setDurations] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    for (const pose of selectedPoses) {
      init[pose.id] = DEFAULT_DURATION;
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
    () => selectedPoses.reduce((sum, p) => sum + getDuration(p.id), 0),
    [selectedPoses, getDuration],
  );

  const styleColorMap = useMemo(() => {
    const map: Record<string, string> = {};
    for (const s of styles) {
      map[s.id] = s.color;
    }
    return map;
  }, []);

  if (selectedPoses.length === 0) {
    return (
      <div className="page" style={{ paddingTop: "clamp(16px, 3vw, 32px)" }}>
        <div style={{ textAlign: "center", paddingTop: 80 }}>
          <p className="display-md" style={{ color: "var(--ink)", marginBottom: 16 }}>
            No poses selected
          </p>
          <p className="body-lg" style={{ marginBottom: 32 }}>
            Go back to the builder to add poses to your sequence.
          </p>
          <SplitPill label="Back to Builder" onClick={() => router.push("/builder")} />
        </div>
      </div>
    );
  }

  return (
    <div className="page" style={{ paddingTop: "clamp(16px, 3vw, 32px)", paddingBottom: 160 }}>
      {/* Top Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            type="button"
            onClick={() => router.push("/builder")}
            aria-label="Back to builder"
            style={{
              width: 44,
              height: 44,
              borderRadius: 999,
              border: "1px solid var(--ink)",
              background: "transparent",
              cursor: "pointer",
              fontSize: 18,
              color: "var(--ink)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "inherit",
            }}
          >
            &#8592;
          </button>
          <div>
            <p className="eyebrow" style={{ marginBottom: 4 }}>Review</p>
            <p className="display-md" style={{ color: "var(--ink)" }}>
              {selectedPoses.length} Pose{selectedPoses.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <OverflowMenu
          open={menuOpen}
          onToggle={() => setMenuOpen((v) => !v)}
          onSave={() => {
            setMenuOpen(false);
            // US-008 will wire this to a save modal
          }}
        />
      </div>

      {/* Registration marks */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <RegistrationMark />
        <RegistrationMark />
      </div>

      {/* 3-column grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
        }}
      >
        {selectedPoses.map((pose) => (
          <ReviewCard
            key={pose.id}
            pose={pose}
            styleColor={styleColorMap[pose.style_id] ?? "#ccc"}
            duration={getDuration(pose.id)}
            onIncrease={() => increaseDuration(pose.id)}
            onDecrease={() => decreaseDuration(pose.id)}
          />
        ))}
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
        {/* Total duration bottom-left */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18, color: "var(--ink-2)" }}>&#9201;</span>
          <span
            className="mono"
            style={{ color: "var(--ink)", fontSize: 13, fontWeight: 500 }}
          >
            {formatTotalDuration(totalDuration)}
          </span>
        </div>

        {/* Start button bottom-right */}
        <SplitPill label="Start" onClick={() => router.push("/player")} />
      </div>
    </div>
  );
}
