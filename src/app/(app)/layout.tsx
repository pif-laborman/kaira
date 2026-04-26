import { AppProvider } from "@/context/AppContext";
import { BottomNav } from "@/components/BottomNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <div style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: 80 }}>
        {children}
      </div>
      <BottomNav />
    </AppProvider>
  );
}
