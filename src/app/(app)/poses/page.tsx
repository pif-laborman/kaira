"use client";

import { useState } from "react";
import { Pill } from "@/components/Pill";
import { PoseDetailModal } from "@/components/PoseDetailModal";
import { poses, styles, chakras } from "@/data";
import type { Pose } from "@/data";

/* --- Pure helpers (exported for testing) --- */

export function filterPoses(
  allPoses: Pose[],
  styleFilter: string,
  searchQuery: string,
): Pose[] {
  let filtered = allPoses;
  if (styleFilter !== "all") {
    filtered = filtered.filter((p) => p.style_id === styleFilter);
  }
  if (searchQuery.trim()) {
    const q = searchQuery.trim().toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sanskrit_name.toLowerCase().includes(q),
    );
  }
  return filtered;
}

export function getStyleColor(styleId: string): string {
  return styles.find((s) => s.id === styleId)?.color ?? "var(--blush-2)";
}

export function getStyleName(styleId: string): string {
  return styles.find((s) => s.id === styleId)?.name ?? "Unknown";
}

/* --- Page component --- */

export default function PosesPage() {
  const [styleFilter, setStyleFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [detailPose, setDetailPose] = useState<Pose | null>(null);

  const filtered = filterPoses(poses, styleFilter, searchQuery);

  return (
    <div style={{ padding: "24px clamp(16px, 3vw, 32px) 100px" }}>
      {/* Heading */}
      <h1 className="display-lg" style={{ color: "var(--ink)", marginBottom: 8 }}>
        Pose Library
      </h1>
      <p
        className="mono"
        style={{ color: "var(--ink-3)", marginBottom: 24, fontSize: 13 }}
      >
        {filtered.length} poses
      </p>

      {/* Search input */}
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Search by name or Sanskrit..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: 8,
            border: "1px solid var(--rule)",
            background: "var(--bg)",
            fontFamily: "inherit",
            fontSize: 14,
            color: "var(--ink)",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Style filter pills */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          marginBottom: 28,
        }}
      >
        <Pill
          label="All"
          active={styleFilter === "all"}
          onClick={() => setStyleFilter("all")}
        />
        {styles.map((s) => (
          <Pill
            key={s.id}
            label={s.name}
            active={styleFilter === s.id}
            onClick={() => setStyleFilter(s.id)}
          />
        ))}
      </div>

      {/* Pose grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "48px 0" }}>
          <p className="body-lg" style={{ color: "var(--ink-3)" }}>
            No poses found.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 16,
          }}
        >
          {filtered.map((pose) => {
            const styleColor = getStyleColor(pose.style_id);
            const styleName = getStyleName(pose.style_id);
            const poseChakras = chakras.filter((c) =>
              pose.chakras.includes(c.id),
            );

            return (
              <button
                key={pose.id}
                type="button"
                onClick={() => setDetailPose(pose)}
                style={{
                  background: "var(--bg)",
                  border: "1px solid var(--rule)",
                  borderRadius: 18,
                  padding: 0,
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "inherit",
                  overflow: "hidden",
                  transition: "border-color 200ms ease",
                }}
              >
                {/* Color block placeholder */}
                <div
                  style={{
                    height: 100,
                    background: styleColor,
                    opacity: 0.35,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: 28,
                      fontWeight: 700,
                      color: "var(--ink)",
                      opacity: 0.3,
                    }}
                  >
                    {String(pose.number).padStart(2, "0")}
                  </span>
                </div>

                {/* Card content */}
                <div style={{ padding: "12px 14px 14px" }}>
                  <p
                    className="display-sm"
                    style={{
                      color: "var(--ink)",
                      marginBottom: 2,
                      lineHeight: 1.3,
                    }}
                  >
                    {pose.name}
                  </p>
                  <p
                    className="small"
                    style={{
                      color: "var(--ink-3)",
                      fontStyle: "italic",
                      marginBottom: 10,
                    }}
                  >
                    {pose.sanskrit_name}
                  </p>

                  {/* Style pill */}
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: 11,
                      fontWeight: 500,
                      padding: "4px 10px",
                      borderRadius: 999,
                      background: "var(--tag-bg)",
                      color: "var(--ink-2)",
                      marginBottom: 10,
                    }}
                  >
                    {styleName}
                  </span>

                  {/* Chakra dots */}
                  {poseChakras.length > 0 && (
                    <div style={{ display: "flex", gap: 5, marginTop: 2 }}>
                      {poseChakras.map((c) => (
                        <div
                          key={c.id}
                          title={c.name}
                          style={{
                            width: 14,
                            height: 14,
                            borderRadius: 999,
                            background: c.color,
                            border: `1.5px solid ${c.color}`,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Pose detail modal */}
      {detailPose && (
        <PoseDetailModal
          pose={detailPose}
          onClose={() => setDetailPose(null)}
        />
      )}
    </div>
  );
}
