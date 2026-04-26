import { RegistrationMark } from "@/components/RegistrationMark";

export default function HomePage() {
  return (
    <div className="page frame">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 32 }}>
        <RegistrationMark />
        <RegistrationMark />
      </div>
      <h1 className="display-lg" style={{ color: "var(--ink)", marginBottom: 8 }}>
        Good morning
      </h1>
      <p className="body-lg">
        What would you like to practice today?
      </p>
    </div>
  );
}
