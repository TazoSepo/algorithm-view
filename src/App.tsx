import { useState } from "react";
import { AlgorithmCard } from "./components/AlgorithmCard";
import { MergeSortPreview } from "./components/previews/MergeSortPreview";
import { Input } from "./components/ui/input";
import { GraphBackground } from "./components/GraphBackground";

const algorithmCards = [
  <AlgorithmCard
    key="merge-sort"
    title="Merge sort"
    description="Merge sort divides a list into smaller parts, sorts them, and merges them back into one ordered list."
    preview={<MergeSortPreview />}
  />,
  <AlgorithmCard
    key="bubble-sort"
    title="Bubble sort"
    description="Merge sort divides a list into smaller parts, sorts them, and merges them back into one ordered list."
    preview={<MergeSortPreview />}
  />,
  <AlgorithmCard
    key="select-sort"
    title="Select sort"
    description="Merge sort divides a list into smaller parts, sorts them, and merges them back into one ordered list."
    preview={<MergeSortPreview />}
  />,
  <AlgorithmCard
    key="quick-sort"
    title="Quick sort"
    description="Merge sort divides a list into smaller parts, sorts them, and merges them back into one ordered list."
    preview={<MergeSortPreview />}
  />,
  <AlgorithmCard
    key="quick-bort"
    title="Quick bort"
    description="Merge sort divides a list into smaller parts, sorts them, and merges them back into one ordered list."
    preview={<MergeSortPreview />}
  />,
];

export default function App() {
  const [searchString, setSearchString] = useState("");

  return (
    <div className="relative isolate min-h-screen bg-slate-50">
      <GraphBackground />
      <header className="relative z-10 border-b border-slate-200 bg-white">
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
      <main className="relative z-10 py-4">
        <div className="mx-auto flex max-w-5xl flex-col items-center px-6">
          <h1 className="max-w-4xl text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Explore algorithms, one step at a time.
          </h1>
          <p className="mt-3 max-w-3xl text-center text-base leading-relaxed text-slate-600">
            An interactive visualization tool that brings data structures and
            algorithms to life, making complex operations intuitive through
            step-by-step execution.
          </p>
          <Input
            type="text"
            className="max-w-xl mt-4"
            placeholder="What are you looking for?"
            value={searchString}
            onChange={(e) => {
              setSearchString(e.target.value);
            }}
          ></Input>
          <div className="mt-6 flex w-full flex-wrap justify-center gap-6">
            {algorithmCards.map((card) => {
              const matches = card.props.title
                .toLowerCase()
                .includes(searchString.trim().toLowerCase());

              if (!matches) {
                return null;
              }

              return card;
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
