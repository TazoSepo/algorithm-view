import { useState } from "react";
import { Shuffle } from "lucide-react";
import { parseSortingInput } from "../../algorithms/input";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type Props = {
  defaultInput: readonly number[];
  onApply: (input: number[]) => void;
};

export function AlgorithmInput({ defaultInput, onApply }: Props) {
  const [draft, setDraft] = useState(defaultInput.join(", "));
  const [error, setError] = useState("");

  function apply(text: string) {
    try {
      const input = parseSortingInput(text);
      onApply(input);
      setError("");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Check your input.");
    }
  }

  function randomize() {
    const text = Array.from(
      { length: 6 },
      () => Math.floor(Math.random() * 99) + 1,
    ).join(", ");
    setDraft(text);
    apply(text);
  }

  return (
    <form
      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
      onSubmit={(event) => {
        event.preventDefault();
        apply(draft);
      }}
    >
      <label
        htmlFor="algorithm-input"
        className="mb-2 block text-sm font-semibold text-slate-800"
      >
        Your input
      </label>
      <div className="flex flex-wrap gap-2">
        <Input
          id="algorithm-input"
          className="h-10 min-w-0 flex-1 basis-52 font-mono"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby="input-help input-error"
        />
        <Button
          type="submit"
          className="h-10 bg-blue-700 text-white hover:bg-blue-800"
        >
          Apply
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-10"
          onClick={randomize}
        >
          <Shuffle />
          Randomize
        </Button>
      </div>
      <p id="input-help" className="mt-2 text-xs text-slate-500">
        1–16 whole numbers, from -999 to 999. Apply starts a new run.
      </p>
      <p
        id="input-error"
        role={error ? "alert" : undefined}
        className={error ? "mt-2 text-sm text-red-700" : "hidden"}
      >
        {error}
      </p>
    </form>
  );
}
