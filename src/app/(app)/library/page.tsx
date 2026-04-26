"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { RegistrationMark } from "@/components/RegistrationMark";
import { SplitPill } from "@/components/SplitPill";
import { styles } from "@/data/styles";
import { poses } from "@/data/poses";

export function formatTotalDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return `${s}s`;
  if (s === 0) return `${m}m`;
  return `${m}m ${s}s`;
}

export function filterSequencesByName(
  sequences: { name: string }[],
  query: string
): { name: string }[] {
  if (!query.trim()) return sequences;
  const q = query.trim().toLowerCase();
  return sequences.filter((s) => s.name.toLowerCase().includes(q));
}

const styleMap: Record<string, { name: string; color: string }> = {};
for (const s of styles) {
  styleMap[s.id] = { name: s.name, color: s.color };
}

const poseMap: Record<string, { style_id: string }> = {};
for (const p of poses) {
  poseMap[p.id] = { style_id: p.style_id };
}

export default function LibraryPage() {
  const { savedSequences, setSelectedPoses } = useAppContext();
  const [search, setSearch] = useState("");
  const router = useRouter();

  const filtered = useMemo(
    () => filterSequencesByName(savedSequences, search),
    [savedSequences, search]
  );

  function handleSequenceClick(seq: (typeof savedSequences)[number]) {
    const selectedPoses = seq.poseIds
      .map((id) => poses.find((p) => p.id === id))
      .filter(Boolean) as typeof poses;
    setSelectedPoses(selectedPoses);
    router.push("/builder/review");
  }

  return (
    <div className="page frame" style={{ paddingBottom: 100 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 32 }}>
        <RegistrationMark />
        <RegistrationMark />
      </div>
      <h1 className="display-lg" style={{ color: "var(--ink)", marginBottom: 32 }}>
        Your Library
      </h1>

      {/* Search input */}
      <div style={{ marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Search sequences..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            height: 48,
            padding: "0 16px",
            borderRadius: 8,
            border: "1px solid var(--rule)",
            background: "var(--card-2)",
            fontSize: 15,
            color: "var(--ink)",
            fontFamily: "inherit",
            outline: "none",
          }}
        />
      </div>

      {savedSequences.length === 0 ? (
        /* Empty state - no sequences at all */
        <div style={{ textAlign: "center", paddingTop: 64 }}>
          <p
            className="body-lg"
            style={{ color: "var(--ink-3)", marginBottom: 24 }}
          >
            No sequences yet. Build your first flow.
          </p>
          <div style={{ display: "inline-block" }}>
            <SplitPill label="Build a Flow" onClick={() => router.push("/builder")} />
          </div>
        </div>
      ) : filtered.length === 0 ? (
        /* Search returned no results */
        <div style={{ textAlign: "center", paddingTop: 48 }}>
          <p className="body-lg" style={{ color: "var(--ink-3)" }}>
            No sequences match &ldquo;{search}&rdquo;
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {filtered.map((seq) => {
            const seqTyped = seq as (typeof savedSequences)[number];
            const total =
              seqTyped.totalDuration ??
              seqTyped.poseIds.reduce(
                (sum, id) => sum + (seqTyped.durations[id] ?? 30),
                0
              );

            return (
              <button
                key={seqTyped.id}
                type="button"
                onClick={() => handleSequenceClick(seqTyped)}
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--rule)",
                  borderRadius: 18,
                  padding: "clamp(16px, 2vw, 24px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "inherit",
                  width: "100%",
                  transition: "background 200ms ease",
                }}
              >
                {/* Thumbnail strip - pose colors */}
                <div
                  style={{
                    display: "flex",
                    gap: 3,
                    height: 6,
                    borderRadius: 4,
                    overflow: "hidden",
                    width: "100%",
                  }}
                >
                  {seqTyped.poseIds.map((poseId, i) => {
                    const pose = poseMap[poseId];
                    const color = pose
                      ? styleMap[pose.style_id]?.color ?? "var(--tag-bg)"
                      : "var(--tag-bg)";
                    return (
                      <div
                        key={`${poseId}-${i}`}
                        style={{
                          flex: 1,
                          background: color,
                          borderRadius: 4,
                        }}
                      />
                    );
                  })}
                </div>

                {/* Name + duration row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    width: "100%",
                  }}
                >
                  <span
                    className="display-sm"
                    style={{
                      color: "var(--ink)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    {seqTyped.name}
                  </span>
                  <span
                    className="mono"
                    style={{
                      background: "var(--tag-bg)",
                      padding: "4px 10px",
                      borderRadius: 999,
                      color: "var(--ink-3)",
                      fontSize: 11,
                      flexShrink: 0,
                    }}
                  >
                    {formatTotalDuration(total)}
                  </span>
                </div>

                {/* Pose count + style info */}
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span
                    className="mono"
                    style={{ color: "var(--ink-3)", fontSize: 11 }}
                  >
                    {seqTyped.poseIds.length} POSE
                    {seqTyped.poseIds.length !== 1 ? "S" : ""}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
