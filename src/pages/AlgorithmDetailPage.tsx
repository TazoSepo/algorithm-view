import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router";
import { getAlgorithm } from "../algorithms/registry";
import type { AlgorithmDefinition } from "../algorithms/types";
import { AlgorithmInput } from "../components/playground/AlgorithmInput";
import { AlgorithmPlayer } from "../components/playground/AlgorithmPlayer";
import { NotFoundPage } from "./NotFoundPage";

export function AlgorithmDetailPage() {
  const { algorithmId } = useParams();
  const definition = getAlgorithm(algorithmId);
  if (!definition) return <NotFoundPage algorithm />;
  return <AlgorithmDetail key={definition.algorithmId} definition={definition} />;
}

function AlgorithmDetail<State>({
  definition,
}: {
  definition: AlgorithmDefinition<State>;
}) {
  const [execution, setExecution] = useState(() => ({
    id: 0,
    run: definition.run(definition.defaultInput),
  }));

  useEffect(() => {
    document.title = `${definition.name} · Algorithm Visuals`;
  }, [definition.name]);

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-7 sm:px-6 sm:py-10">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-700"
      >
        <ArrowLeft className="size-4" />
        All algorithms
      </Link>
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
          {definition.category} / Playground
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          {definition.name}
        </h1>
        <p className="mt-3 text-slate-600">{definition.description}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-slate-600">
          <span className="rounded-md border border-slate-200 bg-white px-3 py-1.5">
            Time Complexity - {definition.timeComplexity}
          </span>
          <span className="rounded-md border border-slate-200 bg-white px-3 py-1.5">
            Space Complexity - {definition.spaceComplexity}
          </span>
          <span className="rounded-md border border-teal-200 bg-teal-50 px-3 py-1.5 text-teal-700">
            {definition.stable ? "Stable sort" : "Unstable sort"}
          </span>
        </div>
      </div>
      <AlgorithmInput
        defaultInput={definition.defaultInput}
        onApply={(input) => {
          const run = definition.run(input);
          setExecution((previous) => ({ id: previous.id + 1, run }));
        }}
      />
      <AlgorithmPlayer
        key={execution.id}
        definition={definition}
        run={execution.run}
      />
      <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-8">
        <h2 className="text-lg font-semibold text-slate-900">How it works</h2>
        <div className="mt-5 grid gap-6 sm:grid-cols-3">
          {definition.explanation.map((part, index) => (
            <div key={part.title}>
              <p className="mb-2 font-mono text-xs text-blue-600">
                0{index + 1}
              </p>
              <h3 className="text-sm font-semibold text-slate-800">
                {part.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {part.text}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 border-t border-slate-100 pt-4 text-xs leading-relaxed text-slate-500">
          Complexity describes merge sort itself. This playground also records
          full snapshots for backward navigation, which uses additional time and
          memory. A write counts one value copied into a merge output.
        </p>
      </section>
      <details className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <summary className="cursor-pointer px-5 py-4 text-sm font-semibold text-slate-800">
          TypeScript implementation
        </summary>
        <p className="px-5 pb-4 text-xs text-slate-500">
          The actual implementation running above, including execution
          recording.
        </p>
        <pre className="max-h-[32rem] overflow-auto border-t border-slate-200 bg-slate-950 p-5 text-xs leading-6 text-slate-200">
          <code>{definition.source}</code>
        </pre>
      </details>
    </div>
  );
}
