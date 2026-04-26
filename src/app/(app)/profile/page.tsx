import { RegistrationMark } from "@/components/RegistrationMark";

export default function ProfilePage() {
  return (
    <div className="page frame">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 32 }}>
        <RegistrationMark />
        <RegistrationMark />
      </div>
      <h1 className="display-lg" style={{ color: "var(--ink)", marginBottom: 8 }}>
        Profile
      </h1>
      <p className="body-lg">
        Your account settings and preferences.
      </p>
    </div>
  );
}
