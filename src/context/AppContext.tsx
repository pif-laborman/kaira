"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Pose } from "@/data/poses";
import type { PracticeSession } from "@/data/practice-history";

export interface SavedSequence {
  id: string;
  name: string;
  poseIds: string[];
  durations: Record<string, number>;
  createdAt: string;
}

export interface OnboardingData {
  completed: boolean;
  selectedGoal: string | null;
  selectedPainPoints: string[];
  tinderResults: Record<string, boolean>;
  preferences: Record<string, string>;
}

interface AppState {
  selectedPoses: Pose[];
  setSelectedPoses: React.Dispatch<React.SetStateAction<Pose[]>>;
  savedSequences: SavedSequence[];
  setSavedSequences: React.Dispatch<React.SetStateAction<SavedSequence[]>>;
  practiceHistory: PracticeSession[];
  setPracticeHistory: React.Dispatch<React.SetStateAction<PracticeSession[]>>;
  onboardingData: OnboardingData;
  setOnboardingData: React.Dispatch<React.SetStateAction<OnboardingData>>;
}

const AppContext = createContext<AppState | null>(null);

const SEED_SEQUENCES: SavedSequence[] = [
  {
    id: "saved-001",
    name: "Morning Sun Flow",
    poseIds: ["hv-001", "hv-005", "hv-002", "hv-003", "hv-004", "hv-006", "hv-007"],
    durations: {
      "hv-001": 60, "hv-005": 45, "hv-002": 30, "hv-003": 45,
      "hv-004": 30, "hv-006": 45, "hv-007": 60,
    },
    createdAt: "2026-04-20",
  },
  {
    id: "saved-002",
    name: "Evening Wind Down",
    poseIds: ["yin-001", "yin-002", "yin-004", "yin-003", "yin-005"],
    durations: {
      "yin-001": 120, "yin-002": 120, "yin-004": 90,
      "yin-003": 120, "yin-005": 90,
    },
    createdAt: "2026-04-22",
  },
];

const DEFAULT_ONBOARDING: OnboardingData = {
  completed: false,
  selectedGoal: null,
  selectedPainPoints: [],
  tinderResults: {},
  preferences: {},
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedPoses, setSelectedPoses] = useState<Pose[]>([]);
  const [savedSequences, setSavedSequences] = useState<SavedSequence[]>(SEED_SEQUENCES);
  const [practiceHistory, setPracticeHistory] = useState<PracticeSession[]>([]);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>(DEFAULT_ONBOARDING);

  return (
    <AppContext.Provider
      value={{
        selectedPoses,
        setSelectedPoses,
        savedSequences,
        setSavedSequences,
        practiceHistory,
        setPracticeHistory,
        onboardingData,
        setOnboardingData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return ctx;
}
