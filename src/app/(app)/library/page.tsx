"use client";

import { useAppContext } from "@/context/AppContext";
import { RegistrationMark } from "@/components/RegistrationMark";
import { styles } from "@/data/styles";
import { poses } from "@/data/poses";

function formatTotalDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return `${s}s`;
  if (s === 0) return `${m}m`;
  return `${m}m ${s}s`;
}

export default function LibraryPage() {
  const { savedSequences } = useAppContext();

  const styleMap: Record<string, { name: string; color: string }> = {};
  for (const s of styles) {
    styleMap[s.id] = { name: s.name, color: s.color };
  }

  return (
    <div className="page frame" style={{ paddingBottom: 100 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 32 }}>
        <RegistrationMark />
        <RegistrationMark />
      </div>
      <h1 className="display-lg" style={{ color: "var(--ink)", marginBottom: 8 }}>
        Library
      </h1>
      <p className="body-lg" style={{ marginBottom: 32 }}>
        Your saved sequences
      </p>

      {savedSequences.length === 0 ? (
        <div style={{ textAlign: "center", paddingTop: 48 }}>
          <p className="body-lg" style={{ color: "var(--ink-3)" }}>
            No saved sequences yet. Build a sequence and save it from the review screen.
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {savedSequences.map((seq) => {
            const firstPoseId = seq.poseIds[0];
            const firstPose = poses.find((p) => p.id === firstPoseId);
            const style = seq.styleId
              ? styleMap[seq.styleId]
              : firstPose
                ? styleMap[firstPose.style_id]
                : null;
            const total =
              seq.totalDuration ??
              seq.poseIds.reduce((sum, id) => sum + (seq.durations[id] ?? 30), 0);

            return (
              <div
                key={seq.id}
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--rule)",
                  borderRadius: 18,
                  padding: "clamp(20px, 2.5vw, 32px)",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                {/* Style color swatch */}
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: style?.color ?? "var(--tag-bg)",
                    flexShrink: 0,
                    opacity: 0.6,
                  }}
                />

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    className="display-sm"
                    style={{
                      color: "var(--ink)",
                      marginBottom: 4,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {seq.name}
                  </p>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span
                      className="mono"
                      style={{ color: "var(--ink-3)", fontSize: 11 }}
                    >
                      {seq.poseIds.length} POSE{seq.poseIds.length !== 1 ? "S" : ""}
                    </span>
                    <span style={{ color: "var(--rule)", fontSize: 11 }}>|</span>
                    <span
                      className="mono"
                      style={{ color: "var(--ink-3)", fontSize: 11 }}
                    >
                      {formatTotalDuration(total)}
                    </span>
                    {style && (
                      <>
                        <span style={{ color: "var(--rule)", fontSize: 11 }}>|</span>
                        <span
                          className="small"
                          style={{ color: "var(--ink-3)" }}
                        >
                          {style.name}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <span
                  className="mono"
                  style={{ color: "var(--ink-3)", fontSize: 10, flexShrink: 0 }}
                >
                  {seq.createdAt}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
