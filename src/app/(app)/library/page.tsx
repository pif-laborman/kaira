import { RegistrationMark } from "@/components/RegistrationMark";

export default function LibraryPage() {
  return (
    <div className="page frame">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 32 }}>
        <RegistrationMark />
        <RegistrationMark />
      </div>
      <h1 className="display-lg" style={{ color: "var(--ink)", marginBottom: 8 }}>
        Library
      </h1>
      <p className="body-lg">
        Your saved sequences will appear here.
      </p>
    </div>
  );
}
