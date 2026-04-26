"use client";

import { useState } from "react";

export function SaveSequenceModal({
  onSave,
  onCancel,
}: {
  onSave: (name: string) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState("");

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(20, 19, 15, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        padding: "0 16px",
      }}
      onClick={onCancel}
    >
      <div
        role="dialog"
        aria-label="Save this Sequence"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--card)",
          borderRadius: 18,
          padding: "clamp(24px, 3vw, 48px)",
          width: "100%",
          maxWidth: 420,
          boxShadow: "0 18px 50px -28px rgba(20,18,16,0.35)",
        }}
      >
        <h2
          className="display-md"
          style={{ color: "var(--ink)", marginBottom: 24 }}
        >
          Save this Sequence
        </h2>

        <label
          className="eyebrow"
          htmlFor="sequence-name"
          style={{ display: "block", marginBottom: 8 }}
        >
          Sequence Name
        </label>
        <input
          id="sequence-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Morning Flow"
          autoFocus
          style={{
            width: "100%",
            padding: "14px 16px",
            borderRadius: 8,
            border: "1px solid var(--rule)",
            background: "var(--card-2)",
            fontFamily: "inherit",
            fontSize: 15,
            color: "var(--ink)",
            outline: "none",
            marginBottom: 28,
            boxSizing: "border-box",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 12,
          }}
        >
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: "14px 22px",
              borderRadius: 999,
              border: "1px solid var(--ink)",
              background: "transparent",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase" as const,
              color: "var(--ink)",
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => name.trim() && onSave(name.trim())}
            disabled={!name.trim()}
            style={{
              padding: "14px 22px",
              borderRadius: 999,
              border: "none",
              background: name.trim() ? "var(--pill)" : "var(--rule)",
              color: name.trim() ? "var(--pill-ink)" : "var(--ink-3)",
              cursor: name.trim() ? "pointer" : "default",
              fontFamily: "inherit",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase" as const,
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
