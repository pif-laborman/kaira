"use client";

import { useState } from "react";
import type { Pose } from "@/data/poses";
import { chakras } from "@/data/chakras";
import { styles } from "@/data/styles";

export interface PoseDetailModalProps {
  pose: Pose;
  onClose: () => void;
}

export function PoseDetailModal({ pose, onClose }: PoseDetailModalProps) {
  const [precautionsOpen, setPrecautionsOpen] = useState(false);
  const [howToOpen, setHowToOpen] = useState(false);

  const style = styles.find((s) => s.id === pose.style_id);
  const styleColor = style?.color ?? "var(--blush-2)";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "var(--overlay)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "var(--bg)",
          borderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
          width: "min(520px, 100vw)",
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Color block header */}
        <div
          style={{
            height: 180,
            background: styleColor,
            opacity: 0.4,
            borderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: 48,
              color: "var(--ink)",
              opacity: 0.3,
              fontWeight: 700,
            }}
          >
            {String(pose.number).padStart(2, "0")}
          </span>
        </div>

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close pose detail"
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            width: 36,
            height: 36,
            borderRadius: 999,
            border: "1px solid var(--rule)",
            background: "var(--overlay-light)",
            cursor: "pointer",
            fontSize: 16,
            color: "var(--ink-2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "inherit",
            zIndex: 1,
          }}
        >
          &#10005;
        </button>

        {/* Content */}
        <div style={{ padding: "24px clamp(20px, 3vw, 32px) 32px" }}>
          {/* Pose name */}
          <h2 className="display-md" style={{ color: "var(--ink)", marginBottom: 4 }}>
            {pose.name}
          </h2>
          <p className="body" style={{ color: "var(--ink-3)", fontStyle: "italic", marginBottom: 24 }}>
            {pose.sanskrit_name}
          </p>

          {/* Video placeholder */}
          <div
            style={{
              height: 160,
              background: "var(--card-2)",
              borderRadius: 8,
              border: "1px solid var(--rule)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 24,
              gap: 8,
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              style={{ opacity: 0.35 }}
            >
              <circle cx="16" cy="16" r="15" stroke="var(--ink-3)" strokeWidth="1.5" />
              <polygon points="13,10 23,16 13,22" fill="var(--ink-3)" />
            </svg>
            <span className="small" style={{ color: "var(--ink-3)" }}>
              Video placeholder
            </span>
          </div>

          {/* Precautions accordion */}
          <AccordionSection
            title="Precautions"
            isOpen={precautionsOpen}
            onToggle={() => setPrecautionsOpen((o) => !o)}
          >
            {pose.precautions.length > 0 ? (
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {pose.precautions.map((p, i) => (
                  <li
                    key={i}
                    className="body"
                    style={{ color: "var(--ink-2)", marginBottom: 6 }}
                  >
                    {p}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="body" style={{ color: "var(--ink-3)" }}>
                No specific precautions listed.
              </p>
            )}
          </AccordionSection>

          {/* How to practice accordion */}
          <AccordionSection
            title="How to Practice"
            isOpen={howToOpen}
            onToggle={() => setHowToOpen((o) => !o)}
          >
            <p className="body" style={{ color: "var(--ink-2)", lineHeight: 1.6 }}>
              {pose.detailed_instructions}
            </p>
          </AccordionSection>

          {/* Chakras row */}
          <div style={{ marginTop: 24 }}>
            <p className="eyebrow" style={{ marginBottom: 12 }}>
              Chakras
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {chakras.map((c) => {
                const isActive = pose.chakras.includes(c.id);
                return (
                  <div
                    key={c.id}
                    title={c.name}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 999,
                      background: isActive ? c.color : "var(--card-2)",
                      border: isActive
                        ? `2px solid ${c.color}`
                        : "1px solid var(--rule)",
                      opacity: isActive ? 1 : 0.4,
                      transition: "opacity 0.2s ease",
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- Accordion Section --- */
function AccordionSection({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        borderTop: "1px solid var(--rule)",
        paddingTop: 16,
        marginBottom: 16,
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          fontFamily: "inherit",
        }}
      >
        <span className="display-sm" style={{ color: "var(--ink)" }}>
          {title}
        </span>
        <span
          style={{
            color: "var(--ink-3)",
            fontSize: 18,
            transition: "transform 0.2s ease",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          &#9662;
        </span>
      </button>
      {isOpen && (
        <div style={{ marginTop: 12 }}>
          {children}
        </div>
      )}
    </div>
  );
}
