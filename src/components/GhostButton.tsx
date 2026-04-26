"use client";

import { useState } from "react";

interface GhostButtonProps {
  label: string;
  onClick?: () => void;
}

export function GhostButton({ label, onClick }: GhostButtonProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: "1px solid var(--ink)",
        borderRadius: 999,
        padding: "14px 22px",
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: "0.16em",
        textTransform: "uppercase" as const,
        background: hovered ? "var(--ink)" : "transparent",
        color: hovered ? "var(--card)" : "var(--ink)",
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "background 200ms ease, color 200ms ease",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );
}
