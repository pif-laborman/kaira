import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  formatTimer,
  getProgressPercent,
  createInitialState,
  tickCountdown,
  tickPoseTimer,
  skipForward,
  skipBack,
  togglePause,
  DEFAULT_DURATION,
} from "../../app/(fullscreen)/player/page.tsx";

describe("Player: formatTimer", () => {
  it("formats zero", () => {
    assert.equal(formatTimer(0), "00:00");
  });

  it("formats seconds only", () => {
    assert.equal(formatTimer(45), "00:45");
  });

  it("formats minutes and seconds", () => {
    assert.equal(formatTimer(90), "01:30");
  });

  it("pads single digits", () => {
    assert.equal(formatTimer(5), "00:05");
  });

  it("formats large values", () => {
    assert.equal(formatTimer(600), "10:00");
  });
});

describe("Player: getProgressPercent", () => {
  it("returns 0 for empty sequence", () => {
    assert.equal(getProgressPercent(0, 0), 0);
  });

  it("returns correct percent for first pose of 4", () => {
    assert.equal(getProgressPercent(0, 4), 25);
  });

  it("returns 100 for last pose", () => {
    assert.equal(getProgressPercent(3, 4), 100);
  });

  it("returns 50 for midpoint", () => {
    assert.equal(getProgressPercent(1, 4), 50);
  });
});

describe("Player: createInitialState", () => {
  it("starts in countdown phase", () => {
    const state = createInitialState(30);
    assert.equal(state.phase, "countdown");
    assert.equal(state.poseIndex, 0);
    assert.equal(state.countdownValue, 3);
    assert.equal(state.timeRemaining, 30);
    assert.equal(state.paused, false);
  });
});

describe("Player: tickCountdown", () => {
  it("decrements countdown from 3 to 2", () => {
    const state = createInitialState(30);
    const next = tickCountdown(state);
    assert.equal(next.countdownValue, 2);
    assert.equal(next.phase, "countdown");
  });

  it("transitions to pose phase when countdown reaches 1", () => {
    const state = { ...createInitialState(30), countdownValue: 1 };
    const next = tickCountdown(state);
    assert.equal(next.phase, "pose");
    assert.equal(next.countdownValue, 0);
  });

  it("does nothing when paused", () => {
    const state = { ...createInitialState(30), paused: true };
    const next = tickCountdown(state);
    assert.equal(next.countdownValue, 3);
  });

  it("does nothing in pose phase", () => {
    const state = { ...createInitialState(30), phase: "pose" as const };
    const next = tickCountdown(state);
    assert.equal(next.phase, "pose");
  });
});

describe("Player: tickPoseTimer", () => {
  const getDuration = () => 30;

  it("decrements time remaining", () => {
    const state = { ...createInitialState(30), phase: "pose" as const, countdownValue: 0 };
    const next = tickPoseTimer(state, 3, getDuration);
    assert.equal(next.timeRemaining, 29);
  });

  it("advances to next pose countdown when timer hits 1", () => {
    const state = {
      ...createInitialState(30),
      phase: "pose" as const,
      countdownValue: 0,
      timeRemaining: 1,
    };
    const next = tickPoseTimer(state, 3, getDuration);
    assert.equal(next.phase, "countdown");
    assert.equal(next.poseIndex, 1);
    assert.equal(next.countdownValue, 3);
    assert.equal(next.timeRemaining, 30);
  });

  it("completes after last pose timer expires", () => {
    const state = {
      ...createInitialState(30),
      phase: "pose" as const,
      poseIndex: 2,
      timeRemaining: 1,
    };
    const next = tickPoseTimer(state, 3, getDuration);
    assert.equal(next.phase, "complete");
  });

  it("does nothing when paused", () => {
    const state = {
      ...createInitialState(30),
      phase: "pose" as const,
      paused: true,
    };
    const next = tickPoseTimer(state, 3, getDuration);
    assert.equal(next.timeRemaining, 30);
  });
});

describe("Player: skipForward", () => {
  const getDuration = () => 30;

  it("advances to next pose with countdown", () => {
    const state = createInitialState(30);
    const next = skipForward(state, 3, getDuration);
    assert.equal(next.poseIndex, 1);
    assert.equal(next.phase, "countdown");
    assert.equal(next.countdownValue, 3);
  });

  it("completes if at last pose", () => {
    const state = { ...createInitialState(30), poseIndex: 2 };
    const next = skipForward(state, 3, getDuration);
    assert.equal(next.phase, "complete");
  });
});

describe("Player: skipBack", () => {
  const getDuration = () => 30;

  it("goes to previous pose", () => {
    const state = { ...createInitialState(30), poseIndex: 2 };
    const next = skipBack(state, getDuration);
    assert.equal(next.poseIndex, 1);
    assert.equal(next.phase, "countdown");
  });

  it("stays at 0 when already at first pose", () => {
    const state = createInitialState(30);
    const next = skipBack(state, getDuration);
    assert.equal(next.poseIndex, 0);
    assert.equal(next.phase, "countdown");
  });
});

describe("Player: togglePause", () => {
  it("pauses when playing", () => {
    const state = createInitialState(30);
    const next = togglePause(state);
    assert.equal(next.paused, true);
  });

  it("resumes when paused", () => {
    const state = { ...createInitialState(30), paused: true };
    const next = togglePause(state);
    assert.equal(next.paused, false);
  });
});

describe("Player: DEFAULT_DURATION", () => {
  it("is 30 seconds", () => {
    assert.equal(DEFAULT_DURATION, 30);
  });
});
