"use client";

import { useState } from "react";
import { RegistrationMark } from "@/components/RegistrationMark";
import Link from "next/link";

export function UserIcon({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export function ToggleSwitch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      style={{
        width: 48,
        height: 28,
        borderRadius: 18,
        border: "none",
        backgroundColor: checked ? "var(--ink)" : "var(--rule)",
        position: "relative",
        cursor: "pointer",
        transition: "background-color 200ms ease",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 3,
          left: checked ? 23 : 3,
          width: 22,
          height: 22,
          borderRadius: "50%",
          backgroundColor: "var(--bg)",
          transition: "left 200ms ease",
        }}
      />
    </button>
  );
}

export function togglePoseName(current: boolean): boolean {
  return !current;
}

function SettingsRow({
  label,
  right,
  onClick,
}: {
  label: string;
  right?: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 0",
        borderBottom: "1px solid var(--rule-2)",
        cursor: onClick ? "pointer" : undefined,
      }}
    >
      <span
        className="body-lg"
        style={{ color: "var(--ink-2)" }}
      >
        {label}
      </span>
      {right && <div>{right}</div>}
    </div>
  );
}

function ChevronRight() {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--ink-3)"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

export default function ProfilePage() {
  const [playPoseName, setPlayPoseName] = useState(false);

  return (
    <div className="page frame" style={{ paddingBottom: 80 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 32 }}>
        <RegistrationMark />
        <RegistrationMark />
      </div>

      <h1
        className="display-lg"
        style={{ color: "var(--ink)", marginBottom: 40 }}
      >
        Profile
      </h1>

      {/* Avatar + Name */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: "50%",
            backgroundColor: "var(--bg-2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 16,
            color: "var(--ink-3)",
          }}
        >
          <UserIcon size={40} />
        </div>
        <h2
          className="display-sm"
          style={{ color: "var(--ink)", marginBottom: 4 }}
        >
          Kaira User
        </h2>
        <p className="small" style={{ color: "var(--ink-3)" }}>
          hello@kaira.app
        </p>
      </div>

      {/* Settings */}
      <div style={{ marginBottom: 32 }}>
        <p
          className="eyebrow"
          style={{ marginBottom: 12 }}
        >
          Settings
        </p>

        <SettingsRow
          label="Play pose name"
          right={
            <ToggleSwitch
              checked={playPoseName}
              onChange={setPlayPoseName}
            />
          }
        />

        <Link href="/progress" style={{ textDecoration: "none" }}>
          <SettingsRow
            label="Practice Stats"
            right={<ChevronRight />}
          />
        </Link>

        <SettingsRow
          label="Customer Center"
          right={<ChevronRight />}
        />

        <SettingsRow
          label="Log Out"
          right={<ChevronRight />}
        />
      </div>

      {/* Version */}
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <span
          className="mono"
          style={{ color: "var(--ink-3)" }}
        >
          v1.0.0
        </span>
      </div>
    </div>
  );
}
