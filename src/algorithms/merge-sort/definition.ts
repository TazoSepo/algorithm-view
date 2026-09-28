import type { AlgorithmDefinition } from "../types";
import type { MergeSortState } from "./types";
import { mergeSort } from "./mergeSort";
import { MergeSortVisualizer } from "./MergeSortVisualizer";
import source from "./mergeSort.ts?raw";
import { MergeSortPreview } from "../../components/previews/MergeSortPreview";

export const mergeSortDefinition: AlgorithmDefinition<MergeSortState> = {
  algorithmId: "merge-sort",
  name: "Merge sort",
  description:
    "Divide the input into smaller groups, then merge them in order.",
  category: "Sorting",
  timeComplexity: "O(n log n)",
  spaceComplexity: "O(n)",
  stable: true,
  Preview: MergeSortPreview,
  defaultInput: [38, 12, 27, 5, 19, 8],
  run: mergeSort,
  Visualizer: MergeSortVisualizer,
  source,
  pseudocode: [
    { id: "start", text: "mergeSort(values)" },
    { id: "base", text: "  if size ≤ 1: return values" },
    { id: "split", text: "  split values into two halves" },
    { id: "recurse", text: "  sort each half recursively" },
    { id: "compare", text: "  compare the first unused values" },
    { id: "take", text: "  take the smaller (left on ties)" },
    { id: "repeat", text: "  repeat while both have values" },
    { id: "append", text: "  append the remaining values" },
    { id: "return", text: "  return the merged array" },
  ],
  explanation: [
    {
      title: "Divide",
      text: "Split the array in half until each group holds one value. A single value is already sorted.",
    },
    {
      title: "Compare and merge",
      text: "Compare the first unused value from each sorted half. Copy the smaller one into the output, then repeat. When a half is exhausted, append the rest.",
    },
    {
      title: "Keep equal values stable",
      text: "On a tie, take the left value first. Equal values retain their original order; the position labels let you follow them.",
    },
  ],
};
