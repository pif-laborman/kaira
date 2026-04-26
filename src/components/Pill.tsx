"use client";

export type PillVariant = "default" | "dark" | "outline";

export function Pill({
  label,
  variant = "default",
  active = false,
  onClick,
}: {
  label: string;
  variant?: PillVariant;
  active?: boolean;
  onClick?: () => void;
}) {
  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 500,
    padding: "8px 14px",
    cursor: onClick ? "pointer" : "default",
    border: "none",
    fontFamily: "inherit",
    transition: "background 200ms ease, color 200ms ease, border-color 200ms ease",
    whiteSpace: "nowrap",
  };

  const variantStyles: Record<PillVariant, React.CSSProperties> = {
    default: {
      background: active ? "var(--ink)" : "var(--tag-bg)",
      color: active ? "var(--card-2)" : "var(--ink-2)",
    },
    dark: {
      background: "var(--ink)",
      color: "var(--card-2)",
    },
    outline: {
      background: active ? "var(--ink)" : "transparent",
      color: active ? "var(--card-2)" : "var(--ink-2)",
      border: active ? "1px solid var(--ink)" : "1px solid var(--rule)",
    },
  };

  const style = { ...baseStyle, ...variantStyles[variant] };

  if (onClick) {
    return (
      <button type="button" onClick={onClick} style={style}>
        {label}
      </button>
    );
  }

  return <span style={style}>{label}</span>;
}
