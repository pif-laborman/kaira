"use client";

import { useRef, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { RegistrationMark } from "@/components/RegistrationMark";
import { CarouselCounter } from "@/components/CarouselCounter";
import { styles, premadeFlows, categories, poses } from "@/data";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

/* --- Style Card --- */
function StyleCard({ style }: { style: (typeof styles)[number] }) {
  return (
    <Link
      href={`/builder?style=${encodeURIComponent(style.name)}`}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        minWidth: 100,
        textDecoration: "none",
        color: "var(--ink)",
      }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: "var(--radius-lg)",
          background: style.color,
        }}
      />
      <span
        className="small"
        style={{ color: "var(--ink-2)", textAlign: "center", fontWeight: 500 }}
      >
        {style.name}
      </span>
    </Link>
  );
}

/* --- Flow Card --- */
function FlowCard({ flow }: { flow: (typeof premadeFlows)[number] }) {
  return (
    <Link
      href={`/flow/${flow.id}`}
      style={{
        display: "flex",
        flexDirection: "column",
        minWidth: 240,
        borderRadius: "var(--radius-lg)",
        background: "var(--card)",
        border: "1px solid var(--rule)",
        overflow: "hidden",
        textDecoration: "none",
        color: "var(--ink)",
      }}
    >
      <div
        style={{
          height: 140,
          background: "var(--bg-2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span className="mono" style={{ color: "var(--ink-3)" }}>
          PLACEHOLDER
        </span>
      </div>
      <div style={{ padding: "16px 20px" }}>
        <p className="display-sm" style={{ marginBottom: 10 }}>
          {flow.name}
        </p>
        <div style={{ display: "flex", gap: 8 }}>
          <span
            style={{
              background: "var(--tag-bg)",
              borderRadius: "var(--radius-pill)",
              padding: "6px 12px",
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
              padding: "6px 12px",
              fontSize: 12,
              fontWeight: 500,
              textTransform: "capitalize",
            }}
          >
            {flow.difficulty}
          </span>
        </div>
      </div>
    </Link>
  );
}

/* --- Category Card --- */
function CategoryCard({
  category,
  count,
}: {
  category: (typeof categories)[number];
  count: number;
}) {
  return (
    <div
      style={{
        minWidth: 160,
        borderRadius: "var(--radius-lg)",
        background: "var(--card-2)",
        padding: "24px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <span className="display-sm" style={{ color: "var(--ink)" }}>
        {category.name}
      </span>
      <span className="mono" style={{ color: "var(--ink-3)" }}>
        {count} {count === 1 ? "PRACTICE" : "PRACTICES"}
      </span>
    </div>
  );
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

/* --- Home Page --- */
export default function HomePage() {
  const dailyFlows = premadeFlows.slice(0, 4);

  const categoryPoseCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const cat of categories) {
      counts[cat.id] = poses.filter((p) => p.categories.includes(cat.id)).length;
    }
    return counts;
  }, []);

  return (
    <div className="page" style={{ paddingTop: "clamp(24px, 4vw, 48px)" }}>
      {/* Greeting */}
      <div style={{ marginBottom: "clamp(32px, 5vw, 56px)" }}>
        <h1 className="display-lg" style={{ color: "var(--ink)", marginBottom: 8 }}>
          {getGreeting()}, Yogi
        </h1>
        <p className="body-lg">What would you like to practice today?</p>
      </div>

      {/* Pick a Yoga Style */}
      <ScrollSection eyebrow="Styles" title="Pick a Yoga Style" itemCount={styles.length}>
        {styles.map((s) => (
          <StyleCard key={s.id} style={s} />
        ))}
      </ScrollSection>

      {/* Daily Practice */}
      <ScrollSection eyebrow="Daily Practice" title="Today's Flows" itemCount={dailyFlows.length}>
        {dailyFlows.map((f) => (
          <FlowCard key={f.id} flow={f} />
        ))}
      </ScrollSection>

      {/* Explore by Category */}
      <ScrollSection
        eyebrow="Categories"
        title="Explore by Category"
        itemCount={categories.length}
      >
        {categories.map((c) => (
          <CategoryCard key={c.id} category={c} count={categoryPoseCounts[c.id] ?? 0} />
        ))}
      </ScrollSection>
    </div>
  );
}
