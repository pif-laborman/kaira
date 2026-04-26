import { RegistrationMark } from "@/components/RegistrationMark";

export default function ExplorePage() {
  return (
    <div className="page frame">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 32 }}>
        <RegistrationMark />
        <RegistrationMark />
      </div>
      <h1 className="display-lg" style={{ color: "var(--ink)", marginBottom: 8 }}>
        Explore
      </h1>
      <p className="body-lg">
        Discover pre-made flows and sequences.
      </p>
    </div>
  );
}
