"use client";

import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import { RegistrationMark } from "@/components/RegistrationMark";
import { CarouselCounter } from "@/components/CarouselCounter";
import { styles, premadeFlows } from "@/data";
import type { PremadeFlow, YogaStyle } from "@/data";

/* --- Explore categories for pre-made sequences --- */
export interface ExploreCategory {
  id: string;
  name: string;
  flowIds: string[];
}

export const exploreCategories: ExploreCategory[] = [
  { id: "energy-boost", name: "Energy Boost", flowIds: ["flow-004", "flow-001"] },
  { id: "emotional-release", name: "Emotional Release", flowIds: ["flow-002", "flow-005"] },
  { id: "posture", name: "Posture", flowIds: ["flow-003", "flow-001"] },
  { id: "detoxing", name: "Detoxing", flowIds: ["flow-004", "flow-002"] },
  { id: "intuition", name: "Intuition", flowIds: ["flow-005", "flow-004"] },
];

export function getFlowsForCategory(categoryId: string): PremadeFlow[] {
  const cat = exploreCategories.find((c) => c.id === categoryId);
  if (!cat) return [];
  const flowMap = new Map(premadeFlows.map((f) => [f.id, f]));
  return cat.flowIds.map((id) => flowMap.get(id)).filter(Boolean) as PremadeFlow[];
}

export function getFlowCountForStyle(styleId: string): number {
  return premadeFlows.filter((f) => f.style_id === styleId).length;
}

/* --- Horizontal Scroll Section --- */
function ScrollSection({
  eyebrow,
  title,
  itemCount,
  children,
}: {
  eyebrow: string;
  title: string;
  itemCount: number;
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const scrollTo = useCallback(
    (i: number) => {
      const clamped = Math.max(0, Math.min(i, itemCount - 1));
      setIndex(clamped);
      const container = containerRef.current;
      if (!container) return;
      const child = container.children[clamped] as HTMLElement | undefined;
      if (child) {
        child.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
      }
    },
    [itemCount],
  );

  return (
    <section style={{ marginBottom: "clamp(40px, 5vw, 64px)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <RegistrationMark />
        <RegistrationMark />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 24,
        }}
      >
        <div>
          <p className="eyebrow" style={{ marginBottom: 8 }}>
            {eyebrow}
          </p>
          <h2 className="display-md" style={{ color: "var(--ink)" }}>
            {title}
          </h2>
        </div>
        <CarouselCounter
          current={index + 1}
          total={itemCount}
          onPrev={() => scrollTo(index - 1)}
          onNext={() => scrollTo(index + 1)}
        />
      </div>
      <div
        ref={containerRef}
        style={{
          display: "flex",
          gap: 16,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
          paddingBottom: 4,
        }}
      >
        {children}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
        <RegistrationMark />
        <RegistrationMark />
      </div>
    </section>
  );
}

/* --- Explore Category Card --- */
function ExploreCategoryCard({
  category,
  isActive,
  onClick,
}: {
  category: ExploreCategory;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        minWidth: 200,
        borderRadius: "var(--radius-lg)",
        background: isActive ? "var(--blush)" : "var(--card-2)",
        border: isActive ? "2px solid var(--ink)" : "2px solid transparent",
        padding: "24px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        cursor: "pointer",
        textAlign: "left",
        scrollSnapAlign: "start",
        transition: "background 200ms ease, border-color 200ms ease",
      }}
    >
      {/* Placeholder illustration area */}
      <div
        style={{
          width: "100%",
          height: 80,
          borderRadius: "var(--radius-md)",
          background: isActive ? "var(--blush-2)" : "var(--bg-2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span className="mono" style={{ color: "var(--ink-3)", fontSize: 10 }}>
          ILLUSTRATION
        </span>
      </div>
      <span className="display-sm" style={{ color: "var(--ink)" }}>
        {category.name}
      </span>
      <span
        style={{
          background: "var(--tag-bg)",
          borderRadius: "var(--radius-pill)",
          padding: "4px 10px",
          fontSize: 11,
          fontWeight: 500,
          color: "var(--ink-3)",
          alignSelf: "flex-start",
        }}
      >
        {category.flowIds.length} {category.flowIds.length === 1 ? "practice" : "practices"}
      </span>
    </button>
  );
}

/* --- Style Card with practice count --- */
function ExploreStyleCard({ style, flowCount }: { style: YogaStyle; flowCount: number }) {
  return (
    <Link
      href={`/builder?style=${encodeURIComponent(style.name)}`}
      style={{
        minWidth: 160,
        borderRadius: "var(--radius-lg)",
        background: "var(--card)",
        border: "1px solid var(--rule)",
        overflow: "hidden",
        textDecoration: "none",
        color: "var(--ink)",
        display: "flex",
        flexDirection: "column",
        scrollSnapAlign: "start",
      }}
    >
      <div
        style={{
          height: 80,
          background: style.color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
      <div style={{ padding: "16px 16px 18px" }}>
        <span className="display-sm" style={{ display: "block", marginBottom: 8 }}>
          {style.name}
        </span>
        <span
          className="mono"
          style={{ color: "var(--ink-3)", fontSize: 11 }}
        >
          {flowCount} {flowCount === 1 ? "PRACTICE" : "PRACTICES"}
        </span>
      </div>
    </Link>
  );
}

/* --- Filtered Flow Card --- */
function FlowListCard({ flow }: { flow: PremadeFlow }) {
  const style = styles.find((s) => s.id === flow.style_id);
  return (
    <Link
      href={`/flow/${flow.id}`}
      style={{
        display: "flex",
        gap: 16,
        padding: "16px 0",
        borderBottom: "1px solid var(--rule)",
        textDecoration: "none",
        color: "var(--ink)",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: "var(--radius-md)",
          background: style?.color ?? "var(--bg-2)",
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1 }}>
        <p className="display-sm" style={{ marginBottom: 4 }}>
          {flow.name}
        </p>
        <div style={{ display: "flex", gap: 8 }}>
          <span
            style={{
              background: "var(--tag-bg)",
              borderRadius: "var(--radius-pill)",
              padding: "4px 10px",
              fontSize: 12,
              fontWeight: 500,
            }}
          >
            {flow.duration_minutes} min
          </span>
          <span
            style={{
              background: "var(--tag-bg)",
              borderRadius: "var(--radius-pill)",
              padding: "4px 10px",
              fontSize: 12,
              fontWeight: 500,
              textTransform: "capitalize",
            }}
          >
            {flow.difficulty}
          </span>
        </div>
      </div>
      <span style={{ color: "var(--ink-3)", fontSize: 18 }}>&#8594;</span>
    </Link>
  );
}

/* --- Explore Page --- */
export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredFlows = activeCategory ? getFlowsForCategory(activeCategory) : [];
  const activeCatName = activeCategory
    ? exploreCategories.find((c) => c.id === activeCategory)?.name ?? ""
    : "";

  return (
    <div className="page" style={{ paddingTop: "clamp(24px, 4vw, 48px)" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <RegistrationMark />
        <RegistrationMark />
      </div>
      <h1
        className="display-lg"
        style={{ color: "var(--ink)", marginBottom: "clamp(32px, 5vw, 56px)" }}
      >
        Explore
      </h1>

      {/* Pre-Made Sequences by Category */}
      <ScrollSection
        eyebrow="Discover"
        title="Pre-Made Sequences"
        itemCount={exploreCategories.length}
      >
        {exploreCategories.map((cat) => (
          <ExploreCategoryCard
            key={cat.id}
            category={cat}
            isActive={activeCategory === cat.id}
            onClick={() =>
              setActiveCategory((prev) => (prev === cat.id ? null : cat.id))
            }
          />
        ))}
      </ScrollSection>

      {/* Filtered flows for selected category */}
      {activeCategory && filteredFlows.length > 0 && (
        <section style={{ marginBottom: "clamp(40px, 5vw, 64px)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <RegistrationMark />
            <RegistrationMark />
          </div>
          <h3
            className="display-sm"
            style={{ color: "var(--ink)", marginBottom: 16 }}
          >
            {activeCatName}
          </h3>
          <div>
            {filteredFlows.map((flow) => (
              <FlowListCard key={flow.id} flow={flow} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
            <RegistrationMark />
            <RegistrationMark />
          </div>
        </section>
      )}

      {/* By Style */}
      <ScrollSection
        eyebrow="Styles"
        title="By Style"
        itemCount={styles.length}
      >
        {styles.map((s) => (
          <ExploreStyleCard
            key={s.id}
            style={s}
            flowCount={getFlowCountForStyle(s.id)}
          />
        ))}
      </ScrollSection>
    </div>
  );
}
