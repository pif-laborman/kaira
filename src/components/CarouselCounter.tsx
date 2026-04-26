"use client";

export function CarouselCounter({
  current,
  total,
  onPrev,
  onNext,
}: {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  const label = `${String(current).padStart(2, "0")}/${String(total).padStart(2, "0")}`;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <button
        onClick={onPrev}
        aria-label="Previous"
        style={{
          width: 44,
          height: 44,
          borderRadius: "var(--radius-pill)",
          border: "1px solid var(--ink)",
          background: "transparent",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background var(--dur-wash) ease, color var(--dur-wash) ease",
          color: "var(--ink)",
          fontSize: 18,
        }}
      >
        &#8592;
      </button>
      <span
        className="mono"
        style={{ color: "var(--ink-3)", fontSize: 13, minWidth: 48, textAlign: "center" }}
      >
        {label}
      </span>
      <button
        onClick={onNext}
        aria-label="Next"
        style={{
          width: 44,
          height: 44,
          borderRadius: "var(--radius-pill)",
          border: "1px solid var(--ink)",
          background: "transparent",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background var(--dur-wash) ease, color var(--dur-wash) ease",
          color: "var(--ink)",
          fontSize: 18,
        }}
      >
        &#8594;
      </button>
    </div>
  );
}
