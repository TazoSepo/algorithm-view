import { AlgorithmCard } from "./components/AlgorithmCard";
import { MergeSortPreview } from "./components/previews/MergeSortPreview";

const algorithmCards = [
  <AlgorithmCard
    title="Merge sort"
    description="Merge sort divides a list into smaller parts, sorts them, and merges them back into one ordered list."
    preview={<MergeSortPreview />}
  />,
];

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-3">
          <span className="text-xl font-semibold text-blue-950">
            Algorithm Visuals
          </span>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/TazoSepo/algorithm-view"
            className="rounded-sm text-sm font-medium text-blue-700 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
          >
            GitHub Project
          </a>
        </div>
      </header>
      <main className="py-4">
        <div className="mx-auto flex max-w-5xl flex-col items-center px-6">
          <h1 className="max-w-4xl text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Explore algorithms, one step at a time.
          </h1>
          <p className="mt-3 max-w-3xl text-center text-base leading-relaxed text-slate-600">
            An interactive visualization tool that brings data structures and
            algorithms to life, making complex operations intuitive through
            step-by-step execution.
          </p>
          <div className="mt-6 w-full max-w-md">
            {algorithmCards.map((card) => {
              return card;
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
