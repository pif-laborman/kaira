export function RegistrationMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        position: "relative",
        width: 14,
        height: 14,
        opacity: 0.55,
        flexShrink: 0,
      }}
      aria-hidden="true"
    >
      <span
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          width: 1,
          height: 14,
          background: "var(--ink-3)",
          transform: "translateX(-50%)",
        }}
      />
      <span
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          width: 14,
          height: 1,
          background: "var(--ink-3)",
          transform: "translateY(-50%)",
        }}
      />
    </span>
  );
}
