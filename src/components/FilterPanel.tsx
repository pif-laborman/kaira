"use client";

import { useState, useMemo, useCallback } from "react";
import { categories } from "@/data/categories";
import { chakras } from "@/data/chakras";
import { Pill } from "@/components/Pill";

export interface FilterState {
  search: string;
  categoryIds: string[];
  chakraIds: string[];
}

export const emptyFilters: FilterState = {
  search: "",
  categoryIds: [],
  chakraIds: [],
};

export function FilterPanel({
  filters,
  onChange,
  onClose,
}: {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onClose: () => void;
}) {
  const [local, setLocal] = useState<FilterState>(filters);

  const toggleCategory = useCallback((id: string) => {
    setLocal((prev) => ({
      ...prev,
      categoryIds: prev.categoryIds.includes(id)
        ? prev.categoryIds.filter((c) => c !== id)
        : [...prev.categoryIds, id],
    }));
  }, []);

  const toggleChakra = useCallback((id: string) => {
    setLocal((prev) => ({
      ...prev,
      chakraIds: prev.chakraIds.includes(id)
        ? prev.chakraIds.filter((c) => c !== id)
        : [...prev.chakraIds, id],
    }));
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocal((prev) => ({ ...prev, search: e.target.value }));
  }, []);

  const handleClear = useCallback(() => {
    setLocal(emptyFilters);
  }, []);

  const handleDone = useCallback(() => {
    onChange(local);
    onClose();
  }, [local, onChange, onClose]);

  const activeCount = useMemo(
    () => local.categoryIds.length + local.chakraIds.length + (local.search ? 1 : 0),
    [local],
  );

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "var(--overlay)",
        display: "flex",
        justifyContent: "flex-end",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "min(400px, 90vw)",
          height: "100%",
          background: "var(--bg)",
          overflowY: "auto",
          padding: "clamp(24px, 3vw, 40px)",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <h2 className="display-md" style={{ color: "var(--ink)" }}>
            Filters
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
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
          >
            &#10005;
          </button>
        </div>

        {/* Search */}
        <div style={{ marginBottom: 28 }}>
          <label className="eyebrow" style={{ display: "block", marginBottom: 10 }}>
            Search Poses
          </label>
          <input
            type="text"
            value={local.search}
            onChange={handleSearchChange}
            placeholder="Search by name or Sanskrit name..."
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: 999,
              border: "1px solid var(--rule)",
              background: "var(--card-2)",
              fontSize: 14,
              fontFamily: "inherit",
              color: "var(--ink)",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Categories */}
        <div style={{ marginBottom: 28 }}>
          <p className="eyebrow" style={{ marginBottom: 12 }}>
            Categories
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {categories.map((cat) => (
              <Pill
                key={cat.id}
                label={cat.name}
                variant="default"
                active={local.categoryIds.includes(cat.id)}
                onClick={() => toggleCategory(cat.id)}
              />
            ))}
          </div>
        </div>

        {/* Chakras */}
        <div style={{ marginBottom: 28 }}>
          <p className="eyebrow" style={{ marginBottom: 12 }}>
            Chakras
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {chakras.map((ch) => (
              <Pill
                key={ch.id}
                label={ch.name}
                variant="default"
                active={local.chakraIds.includes(ch.id)}
                onClick={() => toggleChakra(ch.id)}
              />
            ))}
          </div>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Footer */}
        <div
          style={{
            display: "flex",
            gap: 12,
            paddingTop: 16,
            borderTop: "1px solid var(--rule)",
          }}
        >
          <button
            type="button"
            onClick={handleClear}
            style={{
              flex: 1,
              padding: "14px 22px",
              borderRadius: 999,
              border: "1px solid var(--ink)",
              background: "transparent",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: "inherit",
              color: "var(--ink)",
            }}
          >
            Clear{activeCount > 0 ? ` (${activeCount})` : ""}
          </button>
          <button
            type="button"
            onClick={handleDone}
            style={{
              flex: 1,
              padding: "14px 22px",
              borderRadius: 999,
              border: "none",
              background: "var(--pill)",
              color: "var(--pill-ink)",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
