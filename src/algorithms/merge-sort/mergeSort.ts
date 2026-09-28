import type { AlgorithmItem, AlgorithmRun, AlgorithmStep } from "../types";
import type { MergeSortState } from "./types";

export function mergeSort(
  input: readonly number[],
): AlgorithmRun<MergeSortState> {
  const items = input.map((value, index) => ({ id: `item-${index}`, value }));
  const steps: AlgorithmStep<MergeSortState>[] = [];
  const groups: string[][] = [items.map((item) => item.id)];
  let comparisons = 0;
  let writes = 0;

  function record(
    phase: string,
    description: string,
    codeLineId: string,
    merging: number[] = [],
    comparing: string[] = [],
    output: AlgorithmItem[] = [],
  ) {
    steps.push({
      phase,
      description,
      codeLineIds: [codeLineId],
      comparisons,
      writes,
      state: {
        groups: groups.map((group) => [...group]),
        comparing: [...comparing],
        merging: [...merging],
        output: output.map((item) => item.id),
      },
    });
  }

  function sort(part: AlgorithmItem[]): AlgorithmItem[] {
    if (part.length <= 1) {
      record(
        "Base case",
        part.length
          ? `${part[0].value} is already a sorted group of one.`
          : "An empty array is already sorted.",
        "base",
      );
      return part;
    }

    const middle = Math.floor(part.length / 2);
    const groupIndex = groups.findIndex((group) => group[0] === part[0].id);
    groups.splice(
      groupIndex,
      1,
      part.slice(0, middle).map((item) => item.id),
      part.slice(middle).map((item) => item.id),
    );
    record(
      "Split",
      `Split [${part.map((item) => item.value).join(", ")}] into two smaller groups.`,
      "split",
    );
    const left = sort(part.slice(0, middle));
    const right = sort(part.slice(middle));
    const leftIndex = groups.findIndex((group) => group[0] === left[0].id);
    const activeGroups = [leftIndex, leftIndex + 1];
    const output: AlgorithmItem[] = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
      comparisons++;
      record(
        "Compare",
        `Compare ${left[i].value} and ${right[j].value}.`,
        "compare",
        activeGroups,
        [left[i].id, right[j].id],
        output,
      );
      const takeLeft = left[i].value <= right[j].value;
      const next = takeLeft ? left[i++] : right[j++];
      output.push(next);
      writes++;
      record(
        "Take",
        `Take ${next.value} from the ${takeLeft ? "left" : "right"} group into the merge output.`,
        "take",
        activeGroups,
        [],
        output,
      );
    }

    for (const item of [...left.slice(i), ...right.slice(j)]) {
      output.push(item);
      writes++;
      record(
        "Take",
        `Append ${item.value} from the remaining group.`,
        "append",
        activeGroups,
        [],
        output,
      );
    }

    groups.splice(
      leftIndex,
      2,
      output.map((item) => item.id),
    );
    record(
      "Merge",
      `Merged group: [${output.map((item) => item.value).join(", ")}].`,
      "return",
    );
    return output;
  }

  record(
    "Ready",
    "Start with the input array. Follow each split, comparison, and merge.",
    "start",
  );
  const result = sort(items).map((item) => item.value);
  record("Done", `Sorting complete: [${result.join(", ")}].`, "return");
  return { items, steps, result };
}
