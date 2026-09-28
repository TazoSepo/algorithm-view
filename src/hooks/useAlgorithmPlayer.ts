import { useEffect, useReducer, useState } from "react";
import { playbackReducer } from "./playback";

export function useAlgorithmPlayer(stepCount: number) {
  const [state, dispatch] = useReducer(playbackReducer, {
    index: 0,
    playing: false,
  });
  const [speed, setSpeed] = useState(1);
  const lastIndex = Math.max(0, stepCount - 1);

  useEffect(() => {
    if (!state.playing) return;
    const timer = window.setTimeout(
      () => dispatch({ type: "advance", lastIndex }),
      1000 / speed,
    );
    return () => window.clearTimeout(timer);
  }, [state.index, state.playing, speed, lastIndex]);

  return {
    ...state,
    speed,
    setSpeed,
    goToStep: (index: number) => dispatch({ type: "goToStep", index, lastIndex }),
    toggle: () => dispatch({ type: "toggle", lastIndex }),
  };
}
