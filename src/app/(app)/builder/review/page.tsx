"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import type { SavedSequence } from "@/context/AppContext";
import { styles } from "@/data/styles";
import { SplitPill } from "@/components/SplitPill";
import { GhostButton } from "@/components/GhostButton";
import { RegistrationMark } from "@/components/RegistrationMark";
import { SaveSequenceModal } from "@/components/SaveSequenceModal";
import type { Pose } from "@/data/poses";

export const DEFAULT_DURATION = 30;
export const DURATION_STEP = 5;
export const MIN_DURATION = 5;

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function formatTotalDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return `${s}s`;
  if (s === 0) return `${m}m`;
  return `${m}m ${s}s`;
}

/** Remove selected poses from the list */
export function removePoses(poses: Pose[], selectedIds: Set<string>): Pose[] {
  return poses.filter((p) => !selectedIds.has(p.id));
}

/** Duplicate selected poses, inserting copies after each original */
export function duplicatePoses(poses: Pose[], selectedIds: Set<string>): Pose[] {
  const result: Pose[] = [];
  for (const pose of poses) {
    result.push(pose);
    if (selectedIds.has(pose.id)) {
      result.push({ ...pose });
    }
  }
  return result;
}

/** Toggle side label for a pose */
export function toggleSideLabel(
  sideLabels: Record<string, string>,
  poseId: string,
): Record<string, string> {
  const current = sideLabels[poseId] ?? "L+R";
  const next = current === "L+R" ? "Right Side" : current === "Right Side" ? "Left Side" : "L+R";
  return { ...sideLabels, [poseId]: next };
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
  editMode,
  selected,
  onToggleSelect,
  sideLabel,
  onToggleSide,
}: {
  pose: Pose;
  styleColor: string;
  duration: number;
  onIncrease: () => void;
  onDecrease: () => void;
  editMode: boolean;
  selected: boolean;
  onToggleSelect: () => void;
  sideLabel: string;
  onToggleSide: () => void;
}) {
  return (
    <div
      style={{
        background: "var(--card)",
        borderRadius: 18,
        border: selected ? "2px solid var(--ink)" : "1px solid var(--rule)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Edit mode checkbox */}
      {editMode && (
        <button
          type="button"
          onClick={onToggleSelect}
          aria-label={selected ? "Deselect pose" : "Select pose"}
          data-testid="edit-checkbox"
          style={{
            position: "absolute",
            top: 8,
            left: 8,
            width: 24,
            height: 24,
            borderRadius: 6,
            border: selected ? "none" : "2px solid var(--ink-2)",
            background: selected ? "var(--ink)" : "var(--card)",
            cursor: "pointer",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--card)",
            fontSize: 14,
            fontWeight: 700,
            padding: 0,
          }}
        >
          {selected ? "\u2713" : ""}
        </button>
      )}

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
            left: editMode ? 38 : 10,
            color: "var(--ink)",
            opacity: 0.7,
          }}
        >
          {String(pose.number).padStart(2, "0")}
        </span>
      </div>

      {/* Side badge - toggleable in edit mode */}
      {pose.has_sides && (
        <button
          type="button"
          onClick={editMode ? onToggleSide : undefined}
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
            border: "none",
            cursor: editMode ? "pointer" : "default",
            fontFamily: "inherit",
          }}
        >
          {sideLabel}
        </button>
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
  const { selectedPoses, setSelectedPoses, savedSequences, setSavedSequences } = useAppContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [savedMessage, setSavedMessage] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editSelected, setEditSelected] = useState<Set<string>>(new Set());
  const [sideLabels, setSideLabels] = useState<Record<string, string>>({});

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

  const toggleEditSelect = useCallback((poseId: string) => {
    setEditSelected((prev) => {
      const next = new Set(prev);
      if (next.has(poseId)) next.delete(poseId);
      else next.add(poseId);
      return next;
    });
  }, []);

  const handleRemove = useCallback(() => {
    if (editSelected.size === 0) return;
    const updated = removePoses(selectedPoses, editSelected);
    setSelectedPoses(updated);
    // Clean up durations for removed poses
    setDurations((prev) => {
      const next = { ...prev };
      for (const id of editSelected) {
        delete next[id];
      }
      return next;
    });
    setEditSelected(new Set());
  }, [editSelected, selectedPoses, setSelectedPoses]);

  const handleDuplicate = useCallback(() => {
    if (editSelected.size === 0) return;
    const updated = duplicatePoses(selectedPoses, editSelected);
    setSelectedPoses(updated);
    setEditSelected(new Set());
  }, [editSelected, selectedPoses, setSelectedPoses]);

  const handleDoneEdit = useCallback(() => {
    setEditMode(false);
    setEditSelected(new Set());
  }, []);

  const handleEnterEdit = useCallback(() => {
    setEditMode(true);
    setMenuOpen(false);
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
            <p className="eyebrow" style={{ marginBottom: 4 }}>
              {editMode ? "Edit Mode" : "Review"}
            </p>
            <p className="display-md" style={{ color: "var(--ink)" }}>
              {editMode
                ? `${editSelected.size} Selected`
                : `${selectedPoses.length} Pose${selectedPoses.length !== 1 ? "s" : ""}`}
            </p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {!editMode && (
            <GhostButton label="Edit" onClick={handleEnterEdit} />
          )}
          {!editMode && (
            <OverflowMenu
              open={menuOpen}
              onToggle={() => setMenuOpen((v) => !v)}
              onSave={() => {
                setMenuOpen(false);
                setSaveModalOpen(true);
              }}
            />
          )}
        </div>
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
        {selectedPoses.map((pose, idx) => (
          <ReviewCard
            key={`${pose.id}-${idx}`}
            pose={pose}
            styleColor={styleColorMap[pose.style_id] ?? "#ccc"}
            duration={getDuration(pose.id)}
            onIncrease={() => increaseDuration(pose.id)}
            onDecrease={() => decreaseDuration(pose.id)}
            editMode={editMode}
            selected={editSelected.has(pose.id)}
            onToggleSelect={() => toggleEditSelect(pose.id)}
            sideLabel={sideLabels[pose.id] ?? "L+R"}
            onToggleSide={() => setSideLabels((prev) => toggleSideLabel(prev, pose.id))}
          />
        ))}
      </div>

      {/* Success message */}
      {savedMessage && (
        <div
          style={{
            position: "fixed",
            top: 16,
            left: "50%",
            transform: "translateX(-50%)",
            background: "var(--ink)",
            color: "var(--pill-ink)",
            padding: "12px 24px",
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 600,
            zIndex: 110,
            letterSpacing: "0.04em",
          }}
        >
          Saved to Library
        </div>
      )}

      {/* Save modal */}
      {saveModalOpen && (
        <SaveSequenceModal
          onCancel={() => setSaveModalOpen(false)}
          onSave={(name: string) => {
            const styleId = selectedPoses[0]?.style_id ?? "";
            const newSeq: SavedSequence = {
              id: `saved-${Date.now()}`,
              name,
              poseIds: selectedPoses.map((p) => p.id),
              durations: { ...durations },
              styleId,
              totalDuration,
              createdAt: new Date().toISOString().split("T")[0],
            };
            setSavedSequences((prev) => [...prev, newSeq]);
            setSaveModalOpen(false);
            setSavedMessage(true);
            setTimeout(() => setSavedMessage(false), 2000);
          }}
        />
      )}

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
        {editMode ? (
          <>
            <div style={{ display: "flex", gap: 8 }}>
              <GhostButton label="Remove" onClick={handleRemove} />
              <GhostButton label="Duplicate" onClick={handleDuplicate} />
            </div>
            <GhostButton label="Done" onClick={handleDoneEdit} />
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}
