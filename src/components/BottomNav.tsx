"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavTab {
  label: string;
  href: string;
  icon: (active: boolean) => React.ReactNode;
}

const HomeIcon = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? "var(--ink)" : "var(--ink-3)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
    <path d="M9 21V12h6v9" />
  </svg>
);

const ExploreIcon = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? "var(--ink)" : "var(--ink-3)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" fill={active ? "var(--ink)" : "none"} stroke={active ? "var(--ink)" : "var(--ink-3)"} />
  </svg>
);

const LibraryIcon = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? "var(--ink)" : "var(--ink-3)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
  </svg>
);

const ProfileIcon = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? "var(--ink)" : "var(--ink-3)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M20 21c0-3.3-3.6-6-8-6s-8 2.7-8 6" />
  </svg>
);

const tabs: NavTab[] = [
  { label: "Home", href: "/home", icon: (a) => <HomeIcon active={a} /> },
  { label: "Explore", href: "/explore", icon: (a) => <ExploreIcon active={a} /> },
  { label: "Library", href: "/library", icon: (a) => <LibraryIcon active={a} /> },
  { label: "Profile", href: "/profile", icon: (a) => <ProfileIcon active={a} /> },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "var(--bg)",
        borderTop: "1px solid var(--rule)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: 64,
          maxWidth: 480,
          margin: "0 auto",
        }}
      >
        {tabs.map((tab) => {
          const active = pathname === tab.href || pathname.startsWith(tab.href + "/");
          return (
            <Link
              key={tab.label}
              href={tab.href}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                textDecoration: "none",
                color: active ? "var(--ink)" : "var(--ink-3)",
                transition: `color var(--dur-wash) ease`,
              }}
            >
              {tab.icon(active)}
              <span
                style={{
                  fontSize: 11,
                  fontWeight: active ? 600 : 400,
                  letterSpacing: "0.02em",
                }}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
