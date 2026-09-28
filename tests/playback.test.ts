import { expect, test } from "bun:test";
import { playbackReducer } from "../src/hooks/playback";

test("automatically stop at the final frame", () => {
  expect(
    playbackReducer(
      { index: 2, playing: true },
      { type: "advance", lastIndex: 3 },
    ),
  ).toEqual({ index: 3, playing: false });
});

test("ignore a stale timer after pause", () => {
  expect(
    playbackReducer(
      { index: 2, playing: false },
      { type: "advance", lastIndex: 3 },
    ),
  ).toEqual({ index: 2, playing: false });
});

test("going to a step pauses playback and clamps to the available frames", () => {
  expect(
    playbackReducer(
      { index: 2, playing: true },
      { type: "goToStep", index: -1, lastIndex: 3 },
    ),
  ).toEqual({ index: 0, playing: false });
  expect(
    playbackReducer(
      { index: 2, playing: true },
      { type: "goToStep", index: 50, lastIndex: 3 },
    ),
  ).toEqual({ index: 3, playing: false });
});

test("play restarts a completed trace and pause retains its position", () => {
  expect(
    playbackReducer(
      { index: 3, playing: false },
      { type: "toggle", lastIndex: 3 },
    ),
  ).toEqual({ index: 0, playing: true });
  expect(
    playbackReducer(
      { index: 2, playing: true },
      { type: "toggle", lastIndex: 3 },
    ),
  ).toEqual({ index: 2, playing: false });
});
