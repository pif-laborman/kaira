"use client";

import { Suspense, useState, useMemo, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { styles } from "@/data/styles";
import { poses } from "@/data/poses";
import { useAppContext } from "@/context/AppContext";
import { SplitPill } from "@/components/SplitPill";
import { GhostButton } from "@/components/GhostButton";
import { RegistrationMark } from "@/components/RegistrationMark";
import { FilterPanel, emptyFilters } from "@/components/FilterPanel";
import type { FilterState } from "@/components/FilterPanel";
import type { Pose } from "@/data/poses";
import type { YogaStyle } from "@/data/styles";
import { PoseDetailModal } from "@/components/PoseDetailModal";

/* --- Style Grid Overlay --- */
function StyleOverlay({
  selectedStyleId,
  onSelect,
  onClose,
}: {
  selectedStyleId: string;
  onSelect: (style: YogaStyle) => void;
  onClose: () => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "var(--overlay)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "var(--card)",
          borderRadius: "var(--radius-lg)",
          padding: "clamp(24px, 3vw, 48px)",
          width: "min(440px, 90vw)",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 className="display-md" style={{ color: "var(--ink)" }}>Choose a Style</h2>
          <button
            type="button"
            onClick={onClose}
            style={{
              width: 36,
              height: 36,
              borderRadius: 999,
              border: "1px solid var(--rule)",
              background: "transparent",
              cursor: "pointer",
              fontSize: 16,
              color: "var(--ink-2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "inherit",
            }}
            aria-label="Close style selector"
          >
            &#10005;
          </button>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
            gap: 12,
          }}
        >
          {styles.map((s) => (
            <button
              type="button"
              key={s.id}
              onClick={() => onSelect(s)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                padding: 16,
                borderRadius: "var(--radius-lg)",
                border: s.id === selectedStyleId ? "2px solid var(--ink)" : "1px solid var(--rule)",
                background: s.id === selectedStyleId ? "var(--card-2)" : "var(--card)",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 8,
                  background: s.color,
                }}
              />
              <span className="small" style={{ fontWeight: 500, color: "var(--ink-2)", textAlign: "center" }}>
                {s.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* --- Pose Card --- */
function PoseCard({
  pose,
  styleColor,
  isSelected,
  onToggle,
  onInfo,
}: {
  pose: Pose;
  styleColor: string;
  isSelected: boolean;
  onToggle: () => void;
  onInfo: () => void;
}) {
  return (
    <div
      style={{
        background: "var(--card)",
        borderRadius: 18,
        border: isSelected ? "2px solid var(--ink)" : "1px solid var(--rule)",
        overflow: "hidden",
        cursor: "pointer",
        textAlign: "left",
        fontFamily: "inherit",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          textAlign: "left",
          fontFamily: "inherit",
          width: "100%",
        }}
      >
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
          {isSelected && (
            <span
              style={{
                position: "absolute",
                top: 8,
                right: 10,
                width: 22,
                height: 22,
                borderRadius: 999,
                background: "var(--ink)",
                color: "var(--pill-ink)",
                fontSize: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
              }}
            >
              &#10003;
            </span>
          )}
        </div>
        <div style={{ padding: "12px 14px" }}>
          <p className="display-sm" style={{ marginBottom: 2, color: "var(--ink)" }}>
            {pose.name}
          </p>
          <p className="small" style={{ color: "var(--ink-3)", marginBottom: 6, fontStyle: "italic" }}>
            {pose.sanskrit_name}
          </p>
          <p className="small" style={{ color: "var(--ink-2)", lineHeight: 1.4 }}>
            {pose.instruction_text}
          </p>
        </div>
      </button>
      {/* Info button to open pose detail */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onInfo();
        }}
        aria-label={`View details for ${pose.name}`}
        style={{
          position: "absolute",
          bottom: 10,
          right: 10,
          width: 36,
          height: 36,
          borderRadius: 999,
          border: "1px solid var(--rule)",
          background: "var(--bg)",
          cursor: "pointer",
          fontSize: 14,
          fontWeight: 700,
          color: "var(--ink-3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "inherit",
        }}
      >
        i
      </button>
    </div>
  );
}

/* --- Selected Poses Strip --- */
function SelectedStrip({
  selectedPoses,
  onRemove,
}: {
  selectedPoses: Pose[];
  onRemove: (id: string) => void;
}) {
  if (selectedPoses.length === 0) return null;

  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        overflowX: "auto",
        scrollbarWidth: "none",
        padding: "12px 0",
        alignItems: "center",
      }}
    >
      <span className="mono" style={{ color: "var(--ink-3)", flexShrink: 0 }}>
        {selectedPoses.length} SELECTED
      </span>
      {selectedPoses.map((p) => (
        <button
          type="button"
          key={p.id}
          onClick={() => onRemove(p.id)}
          title={`Remove ${p.name}`}
          style={{
            width: 44,
            height: 44,
            borderRadius: 8,
            border: "1px solid var(--rule)",
            background: "var(--card-2)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            position: "relative",
            fontFamily: "inherit",
            fontSize: 11,
            fontWeight: 600,
            color: "var(--ink-2)",
          }}
        >
          {String(p.number).padStart(2, "0")}
        </button>
      ))}
    </div>
  );
}

/* --- Builder Page --- */
export default function BuilderPage() {
  return (
    <Suspense>
      <BuilderContent />
    </Suspense>
  );
}

function BuilderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { selectedPoses, setSelectedPoses } = useAppContext();

  const initialStyleName = searchParams.get("style") ?? "Hatha Vinyasa";
  const initialStyle = styles.find((s) => s.name === initialStyleName) ?? styles[0];
  const [currentStyle, setCurrentStyle] = useState<YogaStyle>(initialStyle);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(emptyFilters);
  const [detailPose, setDetailPose] = useState<Pose | null>(null);

  const filteredPoses = useMemo(() => {
    let result = poses.filter((p) => p.style_id === currentStyle.id);

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sanskrit_name.toLowerCase().includes(q),
      );
    }

    if (filters.categoryIds.length > 0) {
      result = result.filter((p) =>
        filters.categoryIds.some((cid) => p.categories.includes(cid)),
      );
    }

    if (filters.chakraIds.length > 0) {
      result = result.filter((p) =>
        filters.chakraIds.some((cid) => p.chakras.includes(cid)),
      );
    }

    return result;
  }, [currentStyle.id, filters]);

  const selectedIds = useMemo(
    () => new Set(selectedPoses.map((p) => p.id)),
    [selectedPoses],
  );

  const togglePose = useCallback(
    (pose: Pose) => {
      setSelectedPoses((prev) => {
        if (prev.some((p) => p.id === pose.id)) {
          return prev.filter((p) => p.id !== pose.id);
        }
        return [...prev, pose];
      });
    },
    [setSelectedPoses],
  );

  const removePose = useCallback(
    (id: string) => {
      setSelectedPoses((prev) => prev.filter((p) => p.id !== id));
    },
    [setSelectedPoses],
  );

  const handleSelectStyle = useCallback((style: YogaStyle) => {
    setCurrentStyle(style);
    setOverlayOpen(false);
  }, []);

  return (
    <div className="page" style={{ paddingTop: "clamp(16px, 3vw, 32px)" }}>
      {/* Top Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <div>
          <p className="eyebrow" style={{ marginBottom: 6 }}>Sequence Builder</p>
          <button
            type="button"
            onClick={() => setOverlayOpen(true)}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span className="display-md" style={{ color: "var(--ink)" }}>{currentStyle.name}</span>
            <span style={{ color: "var(--ink-3)", fontSize: 14 }}>&#9662;</span>
          </button>
        </div>
        <button
          type="button"
          onClick={() => router.push("/home")}
          aria-label="Close builder"
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
          &#10005;
        </button>
      </div>

      {/* Registration marks */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <RegistrationMark />
        <RegistrationMark />
      </div>

      {/* Selected Poses Strip */}
      <SelectedStrip selectedPoses={selectedPoses} onRemove={removePose} />

      {/* Pose Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 16,
          paddingBottom: 100,
          marginTop: 16,
        }}
      >
        {filteredPoses.map((pose) => (
          <PoseCard
            key={pose.id}
            pose={pose}
            styleColor={currentStyle.color}
            isSelected={selectedIds.has(pose.id)}
            onToggle={() => togglePose(pose)}
            onInfo={() => setDetailPose(pose)}
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
          padding: "12px clamp(16px, 3vw, 40px)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 50,
        }}
      >
        <GhostButton
          label={
            filters.categoryIds.length + filters.chakraIds.length > 0
              ? `Filters (${filters.categoryIds.length + filters.chakraIds.length})`
              : "Filters"
          }
          onClick={() => setFilterPanelOpen(true)}
        />
        <SplitPill
          label="Next"
          onClick={() => router.push("/builder/review")}
        />
      </div>

      {/* Style Overlay */}
      {overlayOpen && (
        <StyleOverlay
          selectedStyleId={currentStyle.id}
          onSelect={handleSelectStyle}
          onClose={() => setOverlayOpen(false)}
        />
      )}

      {/* Filter Panel */}
      {filterPanelOpen && (
        <FilterPanel
          filters={filters}
          onChange={setFilters}
          onClose={() => setFilterPanelOpen(false)}
        />
      )}

      {/* Pose Detail Modal */}
      {detailPose && (
        <PoseDetailModal
          pose={detailPose}
          onClose={() => setDetailPose(null)}
        />
      )}
    </div>
  );
}
