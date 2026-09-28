import type { AlgorithmItem, AlgorithmStep } from "../types";
import type { MergeSortState } from "./types";

type Props = {
  items: readonly AlgorithmItem[];
  step: AlgorithmStep<MergeSortState>;
};

export function MergeSortVisualizer({ items, step }: Props) {
  const byId = new Map(items.map((item) => [item.id, item]));
  const { groups, merging, comparing, output } = step.state;
  const outputSize = merging.reduce(
    (size, index) => size + groups[index].length,
    0,
  );

  function tile(id: string, inOutput = false) {
    const selected = comparing.includes(id);
    const moved = !inOutput && output.includes(id);
    return (
      <div
        key={id}
        className={`flex h-14 w-12 shrink-0 flex-col items-center justify-center rounded-lg border font-mono text-base font-semibold transition-colors motion-reduce:transition-none ${selected ? "border-amber-400 bg-amber-100 text-amber-950" : inOutput || step.phase === "Done" ? "border-teal-300 bg-teal-50 text-teal-800" : "border-blue-200 bg-white text-blue-800"} ${moved ? "opacity-30" : ""}`}
      >
        {byId.get(id)?.value}
        <span className="text-[9px] font-normal opacity-70">
          {selected
            ? "compare"
            : inOutput
              ? "taken"
              : moved
                ? "copied"
                : `#${items.findIndex((item) => item.id === id) + 1}`}
        </span>
      </div>
    );
  }

  return (
    <figure className="flex min-h-80 flex-col justify-center gap-8 px-4 py-8 sm:px-8">
      <div>
        <figcaption className="mb-4 text-xs font-medium uppercase tracking-widest text-slate-500">
          {step.phase === "Done" ? "Sorted array" : "Subarrays"}
        </figcaption>
        <div className="flex flex-wrap items-start justify-center gap-3">
          {groups.map((group, index) => (
            <div
              key={group.join("-")}
              className={`max-w-full overflow-x-auto rounded-xl border p-2 ${merging.includes(index) ? "border-blue-400 bg-blue-50" : "border-slate-200 bg-slate-50/80"}`}
            >
              <div className="flex gap-1.5">{group.map((id) => tile(id))}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="min-h-24">
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-slate-500">
          Merge output
        </p>
        {merging.length > 0 ? (
          <div className="overflow-x-auto rounded-xl border border-dashed border-teal-200 bg-teal-50/40 p-2">
            <div className="flex w-max min-w-full justify-center gap-1.5">
              {output.map((id) => tile(id, true))}
              {Array.from(
                { length: outputSize - output.length },
                (_, index) => (
                  <span
                    key={`empty-${index}`}
                    aria-label="Empty output position"
                    className="h-14 w-12 shrink-0 rounded-lg border border-dashed border-teal-200"
                  />
                ),
              )}
            </div>
          </div>
        ) : (
          <p className="py-4 text-center text-sm text-slate-400">
            {step.phase === "Done"
              ? "All groups have been merged."
              : "Values appear here when two groups are merged."}
          </p>
        )}
      </div>
      <div className="flex flex-wrap gap-4 text-xs text-slate-500">
        <span>🟨 Comparing</span>
        <span>🟩 Taken into output</span>
        <span># Original position</span>
      </div>
    </figure>
  );
}
