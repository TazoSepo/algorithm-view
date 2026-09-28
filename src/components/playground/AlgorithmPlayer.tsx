import type { AlgorithmDefinition, AlgorithmRun } from "../../algorithms/types";
import { useAlgorithmPlayer } from "../../hooks/useAlgorithmPlayer";
import { PlaybackControls } from "./PlaybackControls";
import { CodePanel } from "./CodePanel";

type Props<State> = {
  definition: AlgorithmDefinition<State>;
  run: AlgorithmRun<State>;
};

export function AlgorithmPlayer<State>({ definition, run }: Props<State>) {
  const player = useAlgorithmPlayer(run.steps.length);
  const step = run.steps[player.index];
  const Visualizer = definition.Visualizer;

  return (
    <section
      aria-label="Algorithm playground"
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-8">
        <h2 className="text-sm font-semibold text-slate-800">
          Execution playground
        </h2>
        <div className="flex gap-5 text-xs text-slate-500 tabular-nums">
          <span>{step.comparisons} comparisons</span>
          <span>{step.writes} writes</span>
        </div>
      </div>
      <div className="grid min-w-0 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="min-w-0">
          <Visualizer items={run.items} step={step} />
        </div>
        <CodePanel lines={definition.pseudocode} activeIds={step.codeLineIds} />
      </div>
      <div
        className="flex min-h-24 items-start gap-4 border-t border-slate-100 bg-blue-50/50 px-5 py-5 sm:px-8"
        aria-live={player.playing ? "off" : "polite"}
        aria-atomic="true"
      >
        <span className="shrink-0 rounded-md border border-blue-200 bg-white px-2.5 py-1 text-xs font-semibold text-blue-700">
          {step.phase}
        </span>
        <p className="pt-0.5 text-sm leading-relaxed text-slate-700">
          {step.description}
        </p>
      </div>
      <PlaybackControls player={player} stepCount={run.steps.length} />
    </section>
  );
}
