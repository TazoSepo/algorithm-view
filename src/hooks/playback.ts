type PlaybackState = { index: number; playing: boolean };
type PlaybackAction =
  | { type: "advance" | "toggle"; lastIndex: number }
  | { type: "goToStep"; index: number; lastIndex: number };

export function playbackReducer(
  state: PlaybackState,
  action: PlaybackAction,
): PlaybackState {
  const lastIndex = Math.max(0, action.lastIndex);
  if (action.type === "goToStep") {
    return {
      index: Math.min(lastIndex, Math.max(0, action.index)),
      playing: false,
    };
  }
  if (action.type === "toggle") {
    return {
      index: state.index === lastIndex ? 0 : state.index,
      playing: lastIndex > 0 && !state.playing,
    };
  }
  if (!state.playing) return state;
  const index = Math.min(lastIndex, state.index + 1);
  return { index, playing: index < lastIndex };
}
