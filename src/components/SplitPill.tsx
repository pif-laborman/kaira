"use client";

import { useState } from "react";

interface SplitPillProps {
  label: string;
  onClick?: () => void;
  size?: "default" | "sm";
  variant?: "default" | "inverted" | "light";
}

export function SplitPill({
  label,
  onClick,
  size = "default",
  variant = "default",
}: SplitPillProps) {
  const [hovered, setHovered] = useState(false);
  const h = size === "sm" ? 42 : 52;
  const isInverted = variant === "inverted" || variant === "light";
  const bg = isInverted ? "var(--card)" : "var(--pill)";
  const color = isInverted ? "var(--ink)" : "var(--pill-ink)";

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
        fontFamily: "inherit",
      }}
    >
      <span
        style={{
          height: h,
          padding: "0 32px",
          borderRadius: 999,
          background: bg,
          color,
          display: "inline-flex",
          alignItems: "center",
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: "0.04em",
          textTransform: "uppercase" as const,
          transform: hovered ? "translateX(-3px)" : "translateX(0)",
          transition: "transform 350ms cubic-bezier(.65,0,.35,1)",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
      <span
        style={{
          width: h,
          height: h,
          borderRadius: 999,
          background: bg,
          color,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          transform: hovered ? "translateX(8px)" : "translateX(0)",
          transition: "transform 350ms cubic-bezier(.65,0,.35,1)",
        }}
        aria-hidden
      >
        &#8594;
      </span>
    </button>
  );
}
