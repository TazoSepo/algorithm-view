import { AlgorithmPreview } from "../AlgorithmPreview";
import { mergeSortPreview } from "../../data/mergeSortPreview";
import type { MergeSortBar, MergeSortStep } from "../../types/mergeSortPreview";

export function MergeSortPreview() {
  return (
    <AlgorithmPreview
      steps={mergeSortPreview.steps}
      renderStep={(step) => (
        <MergeSortFrame bars={mergeSortPreview.bars} step={step} />
      )}
    />
  );
}
type MergeSortFrameProps = {
  bars: MergeSortBar[];
  step: MergeSortStep;
};

function MergeSortFrame({ bars, step }: MergeSortFrameProps) {
  const maxValue = Math.max(1, ...bars.map((bar) => bar.value));
  const sourceOrder = step.groups.flat();
  const outputSize =
    step.merging?.reduce(
      (count, groupIndex) => count + step.groups[groupIndex].length,
      0,
    ) ?? 0;
  const outputOffset = (bars.length - outputSize) / 2;

  return (
    <figure>
      <figcaption className="min-h-10 text-xs leading-relaxed text-slate-700">
        {step.description}
      </figcaption>
      <div
        role="img"
        aria-label={`${step.description} Groups: ${step.groups.map((group) => group.map((id) => bars.find((bar) => bar.id === id)?.value).join(", ")).join("; ")}.${step.output ? ` Merge output: ${step.output.map((id) => bars.find((bar) => bar.id === id)?.value).join(", ") || "empty"}.` : ""}`}
      >
        <div className="relative h-48" aria-hidden="true">
          <span className="absolute top-0 text-xs text-slate-500">
            {step.phase === "Done" ? "Sorted array" : "Subarrays"}
          </span>
          {step.groups.map((group, groupIndex) => (
            <div
              key={group.join("-")}
              className={`absolute top-5 h-18 rounded-lg border ${step.merging?.includes(groupIndex) ? "border-blue-300 bg-blue-50" : "border-slate-200"}`}
              style={{
                left: `calc(${(sourceOrder.indexOf(group[0]) / bars.length) * 100}% + 3px)`,
                width: `calc(${(group.length / bars.length) * 100}% - 6px)`,
              }}
            />
          ))}
          {step.output && (
            <>
              <span className="absolute top-24 text-xs text-slate-500">
                Merge output
              </span>
              {Array.from({ length: outputSize }, (_, index) => (
                <div
                  key={index}
                  className="absolute top-30 h-16 rounded-lg border border-dashed border-teal-200 bg-teal-50/50"
                  style={{
                    left: `calc(${((index + outputOffset) / bars.length) * 100}% + 3px)`,
                    width: `calc(${100 / bars.length}% - 6px)`,
                  }}
                />
              ))}
            </>
          )}
          {bars.map((bar) => {
            const outputIndex = step.output?.indexOf(bar.id) ?? -1;
            const inOutput = outputIndex !== -1;
            const position = inOutput
              ? outputIndex + outputOffset
              : sourceOrder.indexOf(bar.id);
            const comparing = step.comparing?.includes(bar.id);
            const complete = inOutput || step.phase === "Done";

            return (
              <div
                key={bar.id}
                className="absolute left-0 top-0 z-10 flex h-16 flex-col items-center justify-end gap-1 px-2 transition-transform duration-500 ease-in-out motion-reduce:transition-none"
                style={{
                  width: `${100 / bars.length}%`,
                  transform: `translate(${position * 100}%, ${inOutput ? 120 : 24}px)`,
                }}
              >
                <div
                  className={`w-full max-w-9 rounded-t-md transition-colors duration-300 motion-reduce:transition-none ${comparing ? "bg-amber-500 ring-2 ring-amber-300 ring-offset-2" : complete ? "bg-teal-600" : "bg-blue-600"}`}
                  style={{ height: `${(bar.value / maxValue) * 40}px` }}
                />
                <span className="text-xs font-medium text-slate-700 tabular-nums">
                  {bar.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-amber-500" />
          Comparing
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-teal-600" />
          Merged
        </span>
      </div>
    </figure>
  );
}
