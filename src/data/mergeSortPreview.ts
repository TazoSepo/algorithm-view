import type { MergeSortExample } from "../types/mergeSortPreview";

export const mergeSortPreview: MergeSortExample = {
  bars: [
    { id: "a", value: 40 },
    { id: "b", value: 75 },
    { id: "c", value: 25 },
    { id: "d", value: 90 },
  ],
  steps: [
    {
      phase: "Split",
      description: "Start with four unsorted values.",
      groups: [["a", "b", "c", "d"]],
    },
    {
      phase: "Split",
      description: "Split the array into two halves.",
      groups: [
        ["a", "b"],
        ["c", "d"],
      ],
    },
    {
      phase: "Split",
      description: "Split the left half into single values.",
      groups: [["a"], ["b"], ["c", "d"]],
    },
    {
      phase: "Merge",
      description: "Compare 40 and 75 to merge the left pair.",
      groups: [["a"], ["b"], ["c", "d"]],
      merging: [0, 1],
      comparing: ["a", "b"],
      output: [],
    },
    {
      phase: "Merge",
      description: "40 is smaller. Move it into the merge output.",
      groups: [["a"], ["b"], ["c", "d"]],
      merging: [0, 1],
      output: ["a"],
    },
    {
      phase: "Merge",
      description: "Append the remaining value, 75.",
      groups: [["a"], ["b"], ["c", "d"]],
      merging: [0, 1],
      output: ["a", "b"],
    },
    {
      phase: "Merge",
      description: "The left half is now sorted: 40, 75.",
      groups: [
        ["a", "b"],
        ["c", "d"],
      ],
    },
    {
      phase: "Split",
      description: "Now split the right half into single values.",
      groups: [["a", "b"], ["c"], ["d"]],
    },
    {
      phase: "Merge",
      description: "Compare 25 and 90 to merge the right pair.",
      groups: [["a", "b"], ["c"], ["d"]],
      merging: [1, 2],
      comparing: ["c", "d"],
      output: [],
    },
    {
      phase: "Merge",
      description: "25 is smaller. Move it into the merge output.",
      groups: [["a", "b"], ["c"], ["d"]],
      merging: [1, 2],
      output: ["c"],
    },
    {
      phase: "Merge",
      description: "Append the remaining value, 90.",
      groups: [["a", "b"], ["c"], ["d"]],
      merging: [1, 2],
      output: ["c", "d"],
    },
    {
      phase: "Merge",
      description: "Both halves are sorted. Merge them together next.",
      groups: [
        ["a", "b"],
        ["c", "d"],
      ],
    },
    {
      phase: "Merge",
      description: "Compare the first value of each half: 40 and 25.",
      groups: [
        ["a", "b"],
        ["c", "d"],
      ],
      merging: [0, 1],
      comparing: ["a", "c"],
      output: [],
    },
    {
      phase: "Merge",
      description: "Take 25. Now compare 40 and 90.",
      groups: [
        ["a", "b"],
        ["c", "d"],
      ],
      merging: [0, 1],
      comparing: ["a", "d"],
      output: ["c"],
    },
    {
      phase: "Merge",
      description: "Take 40. Now compare 75 and 90.",
      groups: [
        ["a", "b"],
        ["c", "d"],
      ],
      merging: [0, 1],
      comparing: ["b", "d"],
      output: ["c", "a"],
    },
    {
      phase: "Merge",
      description: "Take 75. The left half is now empty.",
      groups: [
        ["a", "b"],
        ["c", "d"],
      ],
      merging: [0, 1],
      output: ["c", "a", "b"],
    },
    {
      phase: "Merge",
      description: "Append 90, the last remaining value.",
      groups: [
        ["a", "b"],
        ["c", "d"],
      ],
      merging: [0, 1],
      output: ["c", "a", "b", "d"],
    },
    {
      phase: "Done",
      description: "Merge complete: 25, 40, 75, 90.",
      groups: [["c", "a", "b", "d"]],
    },
  ],
};
