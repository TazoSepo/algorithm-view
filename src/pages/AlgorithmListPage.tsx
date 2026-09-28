import { useEffect, useState } from "react";
import { algorithms, upcomingAlgorithms } from "../algorithms/registry";
import { AlgorithmCard } from "../components/AlgorithmCard";
import { Input } from "../components/ui/input";

export function AlgorithmListPage() {
  const [searchString, setSearchString] = useState("");
  const matches = (name: string) =>
    name.toLowerCase().includes(searchString.trim().toLowerCase());
  const available = algorithms.filter((algorithm) => matches(algorithm.name));
  const upcoming = upcomingAlgorithms.filter((algorithm) =>
    matches(algorithm.name),
  );
  useEffect(() => {
    document.title = "Algorithm Visuals";
  }, []);

  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center px-6 py-8">
      <h1 className="max-w-4xl text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Explore algorithms, one step at a time.
      </h1>
      <p className="mt-3 max-w-3xl text-center text-base leading-relaxed text-slate-600">
        An interactive visualization tool that brings data structures and
        algorithms to life, making complex operations intuitive through
        step-by-step execution.
      </p>
      <Input
        type="search"
        aria-label="Search algorithms"
        className="mt-4 max-w-xl"
        placeholder="What are you looking for?"
        value={searchString}
        onChange={(event) => setSearchString(event.target.value)}
      />
      <div className="mt-6 flex w-full flex-wrap justify-center gap-6">
        {available.map((algorithm) => (
          <AlgorithmCard
            key={algorithm.algorithmId}
            algorithmId={algorithm.algorithmId}
            title={algorithm.name}
            description={algorithm.description}
            preview={<algorithm.Preview />}
          />
        ))}
        {upcoming.map((algorithm) => (
          <AlgorithmCard
            key={algorithm.algorithmId}
            title={algorithm.name}
            description={algorithm.description}
          />
        ))}
      </div>
      {available.length + upcoming.length === 0 && (
        <p className="py-12 text-sm text-slate-500">
          No algorithms match “{searchString}”.
        </p>
      )}
    </div>
  );
}
