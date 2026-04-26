"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { SplitPill } from "@/components/SplitPill";
import { GhostButton } from "@/components/GhostButton";
import { Pill } from "@/components/Pill";
import {
  goalOptions,
  painPoints,
  tinderStatements,
  testimonialsByGoal,
  processingMessages,
} from "@/data/onboarding";
import { styles } from "@/data/styles";
import { poses } from "@/data/poses";

const TOTAL_STEPS = 11;
const CONTENT_EASE = "cubic-bezier(.22,1,.36,1)";
const SLIDE_DURATION = 520;
const MINI_BUILDER_POSE_COUNT = 6;
const MINI_BUILDER_MIN_SELECT = 3;

// Exported for testing
export function getStepTitle(step: number): string {
  switch (step) {
    case 1: return "Welcome";
    case 2: return "Goal";
    case 3: return "Pain Points";
    case 4: return "Social Proof";
    case 5: return "Tinder Cards";
    case 6: return "Personalized Solution";
    case 7: return "Preferences";
    case 8: return "Processing";
    case 9: return "App Demo";
    case 10: return "Value Delivery";
    case 11: return "Account Gate";
    default: return "";
  }
}

// Exported for testing - get poses for mini builder based on preferred style
export function getMiniBuilderPoses(
  stylePrefs: string[],
  count: number = MINI_BUILDER_POSE_COUNT
) {
  const preferredStyle = stylePrefs[0] || "hatha-vinyasa";
  const stylePoses = poses.filter((p) => p.style_id === preferredStyle);
  return stylePoses.slice(0, count);
}

// Exported for testing - format duration as MM:SS
export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

// Exported for testing - maps pain points to features
export function mapPainPointsToFeatures(selectedPainPointIds: string[]): Array<{
  painPoint: string;
  feature: string;
}> {
  const mapping: Record<string, { painPoint: string; feature: string }> = {
    "prep-time": {
      painPoint: "Class prep takes too long",
      feature: "Build full sequences in under 5 minutes",
    },
    "generic": {
      painPoint: "Pre-recorded classes feel generic",
      feature: "Every flow is built by you, for you",
    },
    "combining": {
      painPoint: "I don't know which poses to combine",
      feature: "Smart pose suggestions based on style and chakra",
    },
    "consistency": {
      painPoint: "I can't stay consistent",
      feature: "Quick daily flows that fit any schedule",
    },
  };
  return selectedPainPointIds
    .filter((id) => mapping[id])
    .map((id) => mapping[id]);
}

const SESSION_LENGTHS = ["15 min", "30 min", "45 min", "60 min"];

// --- Step Components ---

function StepWelcome({ onNext }: { onNext: () => void }) {
  return (
    <div style={{ textAlign: "center", padding: "60px 24px 40px" }}>
      <div
        style={{
          width: 200,
          height: 200,
          borderRadius: 18,
          background: "var(--blush)",
          margin: "0 auto 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: 48, color: "var(--ink-3)" }}>&#9788;</span>
      </div>
      <h1 className="display-lg" style={{ color: "var(--ink)", marginBottom: 16 }}>
        Your practice, reimagined
      </h1>
      <p className="body-lg" style={{ maxWidth: 360, margin: "0 auto 40px" }}>
        Build custom yoga sequences, track your progress, and deepen your practice with Kaira.
      </p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <SplitPill label="Get Started" onClick={onNext} />
      </div>
    </div>
  );
}

function StepGoal({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div style={{ padding: "0 24px" }}>
      <h2 className="display-md" style={{ color: "var(--ink)", marginBottom: 8 }}>
        What brings you to Kaira?
      </h2>
      <p className="body-lg" style={{ marginBottom: 32 }}>
        Pick the goal that resonates most.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {goalOptions.map((goal) => {
          const isActive = selected === goal.id;
          return (
            <button
              key={goal.id}
              type="button"
              data-testid={`goal-${goal.id}`}
              onClick={() => onSelect(goal.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "20px 24px",
                borderRadius: 18,
                border: isActive
                  ? "2px solid var(--ink)"
                  : "1px solid var(--rule)",
                background: isActive ? "var(--card-2)" : "var(--card)",
                cursor: "pointer",
                textAlign: "left",
                fontFamily: "inherit",
                transition: "border-color 200ms ease, background 200ms ease",
              }}
            >
              <div style={{ flex: 1 }}>
                <div
                  className="display-sm"
                  style={{ color: "var(--ink)", marginBottom: 4 }}
                >
                  {goal.label}
                </div>
                <div className="small" style={{ color: "var(--ink-3)" }}>
                  {goal.description}
                </div>
              </div>
              {isActive && (
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 999,
                    background: "var(--ink)",
                    color: "var(--pill-ink)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    flexShrink: 0,
                  }}
                >
                  &#10003;
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepPainPoints({
  selected,
  onToggle,
}: {
  selected: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <div style={{ padding: "0 24px" }}>
      <h2 className="display-md" style={{ color: "var(--ink)", marginBottom: 8 }}>
        What holds you back?
      </h2>
      <p className="body-lg" style={{ marginBottom: 32 }}>
        Select all that apply.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {painPoints.map((pp) => {
          const isActive = selected.includes(pp.id);
          return (
            <button
              key={pp.id}
              type="button"
              data-testid={`pain-${pp.id}`}
              onClick={() => onToggle(pp.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "20px 24px",
                borderRadius: 18,
                border: isActive
                  ? "2px solid var(--ink)"
                  : "1px solid var(--rule)",
                background: isActive ? "var(--card-2)" : "var(--card)",
                cursor: "pointer",
                textAlign: "left",
                fontFamily: "inherit",
                transition: "border-color 200ms ease, background 200ms ease",
              }}
            >
              <div style={{ flex: 1 }}>
                <div className="display-sm" style={{ color: "var(--ink)" }}>
                  {pp.label}
                </div>
              </div>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 999,
                  background: isActive ? "var(--ink)" : "var(--tag-bg)",
                  color: isActive ? "var(--pill-ink)" : "var(--ink-3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  flexShrink: 0,
                  transition: "background 200ms ease, color 200ms ease",
                }}
              >
                {isActive ? "\u2713" : ""}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepSocialProof({ goalId }: { goalId: string | null }) {
  const key = goalId || "personal";
  const testimonial = testimonialsByGoal[key] || testimonialsByGoal["personal"];

  return (
    <div style={{ padding: "0 24px" }}>
      <h2 className="display-md" style={{ color: "var(--ink)", marginBottom: 32 }}>
        You&apos;re not alone
      </h2>
      <div
        style={{
          background: "var(--blush)",
          borderRadius: 18,
          padding: "clamp(24px, 3vw, 48px)",
        }}
      >
        <p
          className="body-lg"
          style={{
            color: "var(--ink)",
            fontStyle: "italic",
            marginBottom: 24,
            lineHeight: 1.6,
          }}
        >
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        <div>
          <div
            className="display-sm"
            style={{ color: "var(--ink)", marginBottom: 2 }}
          >
            {testimonial.name}
          </div>
          <div className="small" style={{ color: "var(--ink-3)" }}>
            {testimonial.role}
          </div>
        </div>
      </div>
    </div>
  );
}

function StepTinderCards({
  onSwipe,
  results,
}: {
  onSwipe: (id: string, agree: boolean) => void;
  results: Record<string, boolean>;
}) {
  const pendingCards = tinderStatements.filter((s) => !(s.id in results));
  const currentCard = pendingCards[0];
  const [swipeDir, setSwipeDir] = useState<"left" | "right" | null>(null);
  const [animating, setAnimating] = useState(false);

  const handleSwipe = useCallback(
    (agree: boolean) => {
      if (!currentCard || animating) return;
      setSwipeDir(agree ? "right" : "left");
      setAnimating(true);
      setTimeout(() => {
        onSwipe(currentCard.id, agree);
        setSwipeDir(null);
        setAnimating(false);
      }, SLIDE_DURATION);
    },
    [currentCard, animating, onSwipe]
  );

  // Touch/drag support
  const startX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 60) {
      handleSwipe(dx > 0);
    }
  };

  if (!currentCard) {
    return (
      <div style={{ padding: "0 24px", textAlign: "center" }}>
        <h2 className="display-md" style={{ color: "var(--ink)", marginBottom: 16 }}>
          Nice!
        </h2>
        <p className="body-lg">
          We got a sense of what matters to you. Let&apos;s continue.
        </p>
      </div>
    );
  }

  const cardOffset =
    swipeDir === "left"
      ? "translateX(-120%) rotate(-8deg)"
      : swipeDir === "right"
      ? "translateX(120%) rotate(8deg)"
      : "translateX(0) rotate(0)";

  return (
    <div style={{ padding: "0 24px" }}>
      <h2 className="display-md" style={{ color: "var(--ink)", marginBottom: 8 }}>
        Quick reactions
      </h2>
      <p className="body-lg" style={{ marginBottom: 32 }}>
        Swipe right if you agree, left if not.
      </p>
      <div
        style={{
          position: "relative",
          minHeight: 220,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          data-testid="tinder-card"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            width: "100%",
            maxWidth: 340,
            background: "var(--card)",
            border: "1px solid var(--rule)",
            borderRadius: 18,
            padding: "clamp(24px, 3vw, 48px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            transform: cardOffset,
            opacity: swipeDir ? 0.4 : 1,
            transition: `transform ${SLIDE_DURATION}ms ${CONTENT_EASE}, opacity ${SLIDE_DURATION}ms ${CONTENT_EASE}`,
          }}
        >
          <p className="display-sm" style={{ color: "var(--ink)" }}>
            {currentCard.text}
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 24,
          marginTop: 32,
        }}
      >
        <button
          type="button"
          data-testid="swipe-disagree"
          onClick={() => handleSwipe(false)}
          style={{
            width: 56,
            height: 56,
            borderRadius: 999,
            border: "1px solid var(--rule)",
            background: "var(--card)",
            cursor: "pointer",
            fontSize: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "inherit",
          }}
        >
          &#10007;
        </button>
        <button
          type="button"
          data-testid="swipe-agree"
          onClick={() => handleSwipe(true)}
          style={{
            width: 56,
            height: 56,
            borderRadius: 999,
            border: "none",
            background: "var(--ink)",
            color: "var(--pill-ink)",
            cursor: "pointer",
            fontSize: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "inherit",
          }}
        >
          &#10003;
        </button>
      </div>
      <div
        className="mono"
        style={{ textAlign: "center", marginTop: 16, color: "var(--ink-3)" }}
      >
        {Object.keys(results).length + 1} / {tinderStatements.length}
      </div>
    </div>
  );
}

function StepPersonalizedSolution({
  selectedPainPointIds,
}: {
  selectedPainPointIds: string[];
}) {
  const mappings = mapPainPointsToFeatures(selectedPainPointIds);
  const fallback = selectedPainPointIds.length === 0;

  return (
    <div style={{ padding: "0 24px" }}>
      <h2 className="display-md" style={{ color: "var(--ink)", marginBottom: 8 }}>
        Built for exactly this
      </h2>
      <p className="body-lg" style={{ marginBottom: 32 }}>
        Kaira turns your challenges into features.
      </p>
      {fallback ? (
        <div
          style={{
            background: "var(--card-2)",
            borderRadius: 18,
            padding: "24px",
          }}
        >
          <p className="body-lg" style={{ color: "var(--ink)" }}>
            Kaira gives you the tools to build, play, and track custom yoga
            sequences tailored to your goals.
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {mappings.map((m, i) => (
            <div
              key={i}
              style={{
                background: "var(--card-2)",
                borderRadius: 18,
                padding: "20px 24px",
              }}
            >
              <div
                style={{
                  color: "var(--ink-3)",
                  fontSize: 15,
                  textDecoration: "line-through",
                  marginBottom: 8,
                }}
              >
                {m.painPoint}
              </div>
              <div
                className="display-sm"
                style={{ color: "var(--ink)", fontWeight: 700 }}
              >
                {m.feature}
              </div>
            </div>
          ))}
        </div>
      )}
      <div
        className="mono"
        style={{
          marginTop: 32,
          textAlign: "center",
          color: "var(--ink-3)",
          textTransform: "uppercase",
        }}
      >
        {mappings.length > 0 ? `${mappings.length} solutions matched` : ""}
      </div>
    </div>
  );
}

function StepPreferences({
  stylePrefs,
  sessionLength,
  onToggleStyle,
  onSelectLength,
}: {
  stylePrefs: string[];
  sessionLength: string;
  onToggleStyle: (id: string) => void;
  onSelectLength: (len: string) => void;
}) {
  return (
    <div style={{ padding: "0 24px" }}>
      <h2 className="display-md" style={{ color: "var(--ink)", marginBottom: 8 }}>
        Almost there
      </h2>
      <p className="body-lg" style={{ marginBottom: 32 }}>
        Customize your experience.
      </p>

      <div style={{ marginBottom: 32 }}>
        <div
          className="eyebrow"
          style={{ marginBottom: 12, color: "var(--ink-3)" }}
        >
          Preferred styles (pick up to 3)
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {styles.map((s) => (
            <Pill
              key={s.id}
              label={s.name}
              active={stylePrefs.includes(s.id)}
              onClick={() => onToggleStyle(s.id)}
            />
          ))}
        </div>
      </div>

      <div>
        <div
          className="eyebrow"
          style={{ marginBottom: 12, color: "var(--ink-3)" }}
        >
          Ideal session length
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {SESSION_LENGTHS.map((len) => (
            <Pill
              key={len}
              label={len}
              active={sessionLength === len}
              onClick={() => onSelectLength(len)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Step 8: Processing ---

function StepProcessing({
  stylePrefs,
  goalId,
}: {
  stylePrefs: string[];
  goalId: string | null;
}) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const styleName =
    styles.find((s) => s.id === (stylePrefs[0] || "hatha-vinyasa"))?.name ||
    "your";
  const goalLabel =
    goalOptions.find((g) => g.id === goalId)?.label || "your goals";

  const messages = [
    `Finding ${styleName} poses...`,
    `Curating flows for ${goalLabel}...`,
    "Personalizing your home screen...",
  ];

  useEffect(() => {
    const totalDuration = processingMessages.reduce(
      (sum, m) => sum + m.delay_ms,
      0
    );
    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 2, 100));
    }, totalDuration / 50);

    let elapsed = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 1; i < messages.length; i++) {
      elapsed += processingMessages[i - 1]?.delay_ms || 800;
      timers.push(setTimeout(() => setMessageIndex(i), elapsed));
    }

    return () => {
      clearInterval(progressInterval);
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ padding: "60px 24px", textAlign: "center" }}>
      <h2
        className="display-md"
        style={{ color: "var(--ink)", marginBottom: 32 }}
      >
        Building your practice...
      </h2>
      <div
        style={{
          width: "100%",
          maxWidth: 300,
          height: 6,
          borderRadius: 3,
          background: "var(--rule)",
          margin: "0 auto 32px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "var(--ink)",
            borderRadius: 3,
            transition: "width 60ms linear",
          }}
        />
      </div>
      <p
        className="body-lg"
        style={{
          color: "var(--ink-3)",
          transition: "opacity 300ms ease",
          minHeight: 28,
        }}
      >
        {messages[messageIndex]}
      </p>
    </div>
  );
}

// --- Step 9: Mini-Builder Demo ---

function StepMiniBuilder({
  stylePrefs,
  selectedPoseIds,
  onTogglePose,
}: {
  stylePrefs: string[];
  selectedPoseIds: string[];
  onTogglePose: (id: string) => void;
}) {
  const miniPoses = getMiniBuilderPoses(stylePrefs);
  const hasEnough = selectedPoseIds.length >= MINI_BUILDER_MIN_SELECT;
  const styleName =
    styles.find((s) => s.id === (stylePrefs[0] || "hatha-vinyasa"))?.name ||
    "Hatha Vinyasa";

  return (
    <div style={{ padding: "0 24px" }}>
      <h2
        className="display-md"
        style={{ color: "var(--ink)", marginBottom: 8 }}
      >
        Build your first flow
      </h2>
      <p className="body-lg" style={{ marginBottom: 8 }}>
        Tap {MINI_BUILDER_MIN_SELECT}-4 poses from {styleName} to create a
        sequence.
      </p>
      <div
        className="mono"
        style={{ color: "var(--ink-3)", marginBottom: 24, fontSize: 12 }}
      >
        {selectedPoseIds.length} SELECTED
      </div>

      {/* Selection strip */}
      {selectedPoseIds.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 24,
            overflowX: "auto",
            scrollbarWidth: "none",
            paddingBottom: 4,
          }}
        >
          {selectedPoseIds.map((id) => {
            const pose = miniPoses.find((p) => p.id === id);
            if (!pose) return null;
            const styleColor =
              styles.find((s) => s.id === pose.style_id)?.color || "var(--rule)";
            return (
              <button
                key={id}
                type="button"
                onClick={() => onTogglePose(id)}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 8,
                  background: styleColor,
                  border: "2px solid var(--ink)",
                  cursor: "pointer",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "inherit",
                }}
              >
                <span className="mono" style={{ fontSize: 10, color: "var(--pill-ink)" }}>
                  {pose.number}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Pose grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 12,
        }}
      >
        {miniPoses.map((pose) => {
          const isSelected = selectedPoseIds.includes(pose.id);
          const styleColor =
            styles.find((s) => s.id === pose.style_id)?.color || "var(--rule)";
          return (
            <button
              key={pose.id}
              type="button"
              data-testid={`mini-pose-${pose.id}`}
              onClick={() => onTogglePose(pose.id)}
              style={{
                borderRadius: 18,
                border: isSelected
                  ? "2px solid var(--ink)"
                  : "1px solid var(--rule)",
                background: "var(--card)",
                cursor: "pointer",
                overflow: "hidden",
                textAlign: "left",
                fontFamily: "inherit",
                padding: 0,
                transition: "border-color 200ms ease",
              }}
            >
              <div
                style={{
                  height: 60,
                  background: styleColor,
                  opacity: 0.6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  className="mono"
                  style={{ color: "var(--pill-ink)", fontSize: 14, fontWeight: 700 }}
                >
                  {String(pose.number).padStart(2, "0")}
                </span>
              </div>
              <div style={{ padding: "12px 14px" }}>
                <div
                  className="display-sm"
                  style={{
                    color: "var(--ink)",
                    fontSize: 14,
                    marginBottom: 2,
                  }}
                >
                  {pose.name}
                </div>
                <div
                  className="small"
                  style={{
                    color: "var(--ink-3)",
                    fontStyle: "italic",
                    fontSize: 11,
                  }}
                >
                  {pose.sanskrit_name}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Confirmation */}
      {hasEnough && (
        <div
          style={{
            textAlign: "center",
            marginTop: 24,
            padding: "16px",
            background: "var(--blush)",
            borderRadius: 18,
          }}
        >
          <p className="display-sm" style={{ color: "var(--ink)" }}>
            You just built your first flow!
          </p>
        </div>
      )}
    </div>
  );
}

// --- Step 10: Value Delivery ---

function StepValueDelivery({
  selectedPoseIds,
  onPlayNow,
  onSaveContinue,
}: {
  selectedPoseIds: string[];
  onPlayNow: () => void;
  onSaveContinue: () => void;
}) {
  const selectedPoses = selectedPoseIds
    .map((id) => poses.find((p) => p.id === id))
    .filter(Boolean) as typeof poses;

  const totalDuration = selectedPoses.reduce(
    (sum, p) => sum + p.default_duration_seconds,
    0
  );

  return (
    <div style={{ padding: "0 24px" }}>
      <h2
        className="display-md"
        style={{ color: "var(--ink)", marginBottom: 8 }}
      >
        Your first sequence
      </h2>
      <p className="body-lg" style={{ marginBottom: 24 }}>
        Here is what you built. Try it out or save and continue.
      </p>

      {/* 3-column review grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 12,
          marginBottom: 24,
        }}
      >
        {selectedPoses.map((pose, i) => {
          const styleColor =
            styles.find((s) => s.id === pose.style_id)?.color || "var(--rule)";
          return (
            <div
              key={`${pose.id}-${i}`}
              style={{
                borderRadius: 18,
                border: "1px solid var(--rule)",
                overflow: "hidden",
                background: "var(--card)",
              }}
            >
              <div
                style={{
                  height: 48,
                  background: styleColor,
                  opacity: 0.6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  className="mono"
                  style={{ color: "var(--pill-ink)", fontSize: 12, fontWeight: 700 }}
                >
                  {String(pose.number).padStart(2, "0")}
                </span>
              </div>
              <div style={{ padding: "10px 10px 12px" }}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "var(--ink)",
                    marginBottom: 4,
                    lineHeight: 1.3,
                  }}
                >
                  {pose.name}
                </div>
                <div
                  className="mono"
                  style={{ fontSize: 11, color: "var(--ink-3)" }}
                >
                  {formatDuration(pose.default_duration_seconds)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total duration */}
      <div
        className="mono"
        style={{
          textAlign: "center",
          color: "var(--ink-3)",
          marginBottom: 32,
        }}
      >
        TOTAL: {formatDuration(totalDuration)}
      </div>

      {/* Actions */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <SplitPill label="Play Now" onClick={onPlayNow} />
        <GhostButton label="Save & Continue" onClick={onSaveContinue} />
      </div>
    </div>
  );
}

// --- Step 11: Account Gate ---

function StepAccountGate({ onSkip }: { onSkip: () => void }) {
  const [email, setEmail] = useState("");

  return (
    <div style={{ padding: "0 24px", textAlign: "center" }}>
      <h2
        className="display-md"
        style={{ color: "var(--ink)", marginBottom: 8 }}
      >
        Save your progress
      </h2>
      <p className="body-lg" style={{ marginBottom: 32 }}>
        Create an account to keep your sequences and practice history.
      </p>
      <div style={{ maxWidth: 340, margin: "0 auto" }}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          data-testid="email-input"
          style={{
            width: "100%",
            padding: "16px 20px",
            borderRadius: 18,
            border: "1px solid var(--rule)",
            background: "var(--card)",
            fontSize: 16,
            fontFamily: "inherit",
            color: "var(--ink)",
            outline: "none",
            marginBottom: 16,
            boxSizing: "border-box",
          }}
        />
        <button
          type="button"
          data-testid="create-account-btn"
          style={{
            width: "100%",
            padding: "16px 24px",
            borderRadius: 18,
            border: "none",
            background: "var(--ink)",
            color: "var(--pill-ink)",
            fontSize: 16,
            fontWeight: 600,
            fontFamily: "inherit",
            cursor: "pointer",
            marginBottom: 20,
          }}
        >
          Create Account
        </button>
        <button
          type="button"
          data-testid="skip-account"
          onClick={onSkip}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 14,
            color: "var(--ink-3)",
            fontFamily: "inherit",
            textDecoration: "underline",
            padding: 0,
          }}
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}

// --- Progress Indicator ---

function ProgressIndicator({ step, total }: { step: number; total: number }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        padding: "16px 0",
      }}
    >
      <div style={{ display: "flex", gap: 6 }}>
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background:
                i + 1 === step ? "var(--ink)" : "var(--rule)",
              transition: "background 200ms ease",
            }}
          />
        ))}
      </div>
      <span
        className="mono"
        style={{ color: "var(--ink-3)", fontSize: 11 }}
      >
        {String(step).padStart(2, "0")}/{String(total).padStart(2, "0")}
      </span>
    </div>
  );
}

// --- Main Page ---

export default function OnboardingPage() {
  const router = useRouter();
  const {
    onboardingData,
    setOnboardingData,
    setSelectedPoses,
    setSavedSequences,
  } = useAppContext();
  const [step, setStep] = useState(1);
  const [slideDir, setSlideDir] = useState<"left" | "right">("left");
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Local state mirroring context
  const [selectedGoal, setSelectedGoal] = useState<string | null>(
    onboardingData.selectedGoal
  );
  const [selectedPainPoints, setSelectedPainPoints] = useState<string[]>(
    onboardingData.selectedPainPoints
  );
  const [tinderResults, setTinderResults] = useState<Record<string, boolean>>(
    onboardingData.tinderResults
  );
  const [stylePrefs, setStylePrefs] = useState<string[]>(
    onboardingData.preferences.stylePreferences
      ? onboardingData.preferences.stylePreferences.split(",")
      : []
  );
  const [sessionLength, setSessionLength] = useState<string>(
    onboardingData.preferences.sessionLength || ""
  );

  // Mini-builder selected pose ids (step 9)
  const [miniBuilderPoseIds, setMiniBuilderPoseIds] = useState<string[]>([]);

  // Sync to context on changes
  useEffect(() => {
    setOnboardingData({
      completed: false,
      selectedGoal,
      selectedPainPoints,
      tinderResults,
      preferences: {
        stylePreferences: stylePrefs.join(","),
        sessionLength,
      },
    });
  }, [selectedGoal, selectedPainPoints, tinderResults, stylePrefs, sessionLength, setOnboardingData]);

  // Auto-advance from processing step after 3 seconds
  useEffect(() => {
    if (step === 8) {
      const timer = setTimeout(() => {
        setStep(9);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const animateTo = useCallback(
    (nextStep: number) => {
      if (isTransitioning) return;
      setSlideDir(nextStep > step ? "left" : "right");
      setIsTransitioning(true);
      setTimeout(() => {
        setStep(nextStep);
        setIsTransitioning(false);
      }, SLIDE_DURATION);
    },
    [step, isTransitioning]
  );

  const completeOnboarding = useCallback(() => {
    setOnboardingData((prev) => ({ ...prev, completed: true }));
    router.push("/home");
  }, [setOnboardingData, router]);

  const goNext = useCallback(() => {
    if (step < TOTAL_STEPS) {
      animateTo(step + 1);
    } else {
      completeOnboarding();
    }
  }, [step, animateTo, completeOnboarding]);

  const goBack = useCallback(() => {
    if (step > 1) animateTo(step - 1);
  }, [step, animateTo]);

  const handleGoalSelect = useCallback((id: string) => {
    setSelectedGoal(id);
  }, []);

  const handlePainToggle = useCallback((id: string) => {
    setSelectedPainPoints((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  }, []);

  const handleTinderSwipe = useCallback((id: string, agree: boolean) => {
    setTinderResults((prev) => ({ ...prev, [id]: agree }));
  }, []);

  const handleToggleStyle = useCallback((id: string) => {
    setStylePrefs((prev) => {
      if (prev.includes(id)) return prev.filter((s) => s !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  }, []);

  const handleSelectLength = useCallback((len: string) => {
    setSessionLength(len);
  }, []);

  const handleMiniBuilderToggle = useCallback(
    (id: string) => {
      setMiniBuilderPoseIds((prev) => {
        if (prev.includes(id)) return prev.filter((p) => p !== id);
        if (prev.length >= 4) return prev;
        return [...prev, id];
      });
    },
    []
  );

  const handlePlayNow = useCallback(() => {
    // Load mini-builder poses into context and navigate to player
    const selectedMiniPoses = miniBuilderPoseIds
      .map((id) => poses.find((p) => p.id === id))
      .filter(Boolean) as typeof poses;
    setSelectedPoses(selectedMiniPoses);
    setOnboardingData((prev) => ({ ...prev, completed: true }));
    router.push("/player");
  }, [miniBuilderPoseIds, setSelectedPoses, setOnboardingData, router]);

  const handleSaveContinue = useCallback(() => {
    // Save the mini-builder sequence to library
    const selectedMiniPoses = miniBuilderPoseIds
      .map((id) => poses.find((p) => p.id === id))
      .filter(Boolean) as typeof poses;
    if (selectedMiniPoses.length > 0) {
      const durations: Record<string, number> = {};
      let totalDuration = 0;
      for (const p of selectedMiniPoses) {
        durations[p.id] = p.default_duration_seconds;
        totalDuration += p.default_duration_seconds;
      }
      setSavedSequences((prev) => [
        ...prev,
        {
          id: `onboarding-${Date.now()}`,
          name: "My First Flow",
          poseIds: miniBuilderPoseIds,
          durations,
          styleId: selectedMiniPoses[0].style_id,
          totalDuration,
          createdAt: new Date().toISOString().split("T")[0],
        },
      ]);
    }
    // Advance to account gate
    animateTo(11);
  }, [miniBuilderPoseIds, setSavedSequences, animateTo]);

  const slideOffset = isTransitioning
    ? slideDir === "left"
      ? "translateX(-100%)"
      : "translateX(100%)"
    : "translateX(0)";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
        maxWidth: 480,
        margin: "0 auto",
        overflow: "hidden",
      }}
    >
      {/* Top bar: back + skip */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 24px 0",
          minHeight: 44,
        }}
      >
        {step > 1 ? (
          <button
            type="button"
            data-testid="back-button"
            onClick={goBack}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 24,
              color: "var(--ink)",
              padding: 0,
              fontFamily: "inherit",
            }}
          >
            &#8592;
          </button>
        ) : (
          <div />
        )}
        <button
          type="button"
          data-testid="skip-button"
          onClick={goNext}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 13,
            color: "var(--ink-3)",
            padding: 0,
            fontFamily: "inherit",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            fontWeight: 500,
          }}
        >
          Skip
        </button>
      </div>

      {/* Progress indicator */}
      <ProgressIndicator step={step} total={TOTAL_STEPS} />

      {/* Step content with slide animation */}
      <div
        style={{
          flex: 1,
          paddingTop: 16,
          paddingBottom: 100,
          transform: slideOffset,
          opacity: isTransitioning ? 0.3 : 1,
          transition: `transform ${SLIDE_DURATION}ms ${CONTENT_EASE}, opacity ${SLIDE_DURATION}ms ${CONTENT_EASE}`,
        }}
      >
        {step === 1 && <StepWelcome onNext={goNext} />}
        {step === 2 && (
          <StepGoal selected={selectedGoal} onSelect={handleGoalSelect} />
        )}
        {step === 3 && (
          <StepPainPoints
            selected={selectedPainPoints}
            onToggle={handlePainToggle}
          />
        )}
        {step === 4 && <StepSocialProof goalId={selectedGoal} />}
        {step === 5 && (
          <StepTinderCards
            onSwipe={handleTinderSwipe}
            results={tinderResults}
          />
        )}
        {step === 6 && (
          <StepPersonalizedSolution selectedPainPointIds={selectedPainPoints} />
        )}
        {step === 7 && (
          <StepPreferences
            stylePrefs={stylePrefs}
            sessionLength={sessionLength}
            onToggleStyle={handleToggleStyle}
            onSelectLength={handleSelectLength}
          />
        )}
        {step === 8 && (
          <StepProcessing stylePrefs={stylePrefs} goalId={selectedGoal} />
        )}
        {step === 9 && (
          <StepMiniBuilder
            stylePrefs={stylePrefs}
            selectedPoseIds={miniBuilderPoseIds}
            onTogglePose={handleMiniBuilderToggle}
          />
        )}
        {step === 10 && (
          <StepValueDelivery
            selectedPoseIds={miniBuilderPoseIds}
            onPlayNow={handlePlayNow}
            onSaveContinue={handleSaveContinue}
          />
        )}
        {step === 11 && <StepAccountGate onSkip={completeOnboarding} />}
      </div>

      {/* Bottom CTA - steps 2-7 and 9 (step 1 has own CTA, 8 auto-advances, 10 has own CTAs, 11 has own CTA) */}
      {step > 1 && step <= 7 && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            maxWidth: 480,
            padding: "16px 24px 32px",
            background:
              "linear-gradient(transparent, var(--bg) 20%)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <SplitPill label="Continue" onClick={goNext} />
        </div>
      )}
      {step === 9 && miniBuilderPoseIds.length >= MINI_BUILDER_MIN_SELECT && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            maxWidth: 480,
            padding: "16px 24px 32px",
            background:
              "linear-gradient(transparent, var(--bg) 20%)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <SplitPill label="Continue" onClick={goNext} />
        </div>
      )}
      {step === 11 && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            maxWidth: 480,
            padding: "16px 24px 32px",
            background:
              "linear-gradient(transparent, var(--bg) 20%)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <SplitPill label="Finish" onClick={completeOnboarding} />
        </div>
      )}
    </div>
  );
}
