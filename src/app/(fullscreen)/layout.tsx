import { AppProvider } from "@/context/AppContext";

export default function FullscreenLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
        {children}
      </div>
    </AppProvider>
  );
}
