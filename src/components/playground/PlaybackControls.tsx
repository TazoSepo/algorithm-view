import { Pause, Play, RotateCcw, SkipBack, SkipForward } from "lucide-react";
import { Button } from "../ui/button";
import type { useAlgorithmPlayer } from "../../hooks/useAlgorithmPlayer";

type Props = {
  player: ReturnType<typeof useAlgorithmPlayer>;
  stepCount: number;
};

export function PlaybackControls({ player, stepCount }: Props) {
  return (
    <div className="space-y-5 border-t border-slate-200 p-5 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            className="h-10"
            onClick={() => player.goToStep(0)}
          >
            <RotateCcw />
            Reset
          </Button>
          <Button
            variant="outline"
            className="h-10"
            disabled={player.index === 0}
            onClick={() => player.goToStep(player.index - 1)}
          >
            <SkipBack />
            Previous
          </Button>
          <Button
            className="h-10 min-w-24 bg-blue-700 text-white hover:bg-blue-800"
            onClick={player.toggle}
          >
            {player.playing ? <Pause /> : <Play />}
            {player.playing
              ? "Pause"
              : player.index === stepCount - 1
                ? "Replay"
                : "Play"}
          </Button>
          <Button
            variant="outline"
            className="h-10"
            disabled={player.index === stepCount - 1}
            onClick={() => player.goToStep(player.index + 1)}
          >
            Next
            <SkipForward />
          </Button>
        </div>
        <label className="flex items-center gap-3 text-sm text-slate-600">
          Speed
          <select
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900"
            value={player.speed}
            onChange={(event) => player.setSpeed(Number(event.target.value))}
          >
            {[0.5, 1, 2, 4].map((speed) => (
              <option key={speed} value={speed}>
                {speed}×
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="block">
        <span className="mb-2 flex justify-between text-xs text-slate-500">
          <span>Timeline</span>
          <span className="tabular-nums">
            Step {player.index + 1} of {stepCount}
          </span>
        </span>
        <input
          className="block w-full cursor-pointer accent-blue-700"
          aria-label="Execution step"
          type="range"
          min={0}
          max={stepCount - 1}
          value={player.index}
          onChange={(event) => player.goToStep(Number(event.target.value))}
        />
      </label>
    </div>
  );
}
