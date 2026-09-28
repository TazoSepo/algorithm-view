import { mergeSortDefinition } from "./merge-sort/definition";

export const algorithms = [mergeSortDefinition];

export function getAlgorithm(algorithmId: string | undefined) {
  return algorithms.find((algorithm) => algorithm.algorithmId === algorithmId);
}

export const upcomingAlgorithms = [
  {
    algorithmId: "bubble-sort",
    name: "Bubble sort",
    description:
      "Compare neighboring values and swap them until the array is sorted.",
  },
  {
    algorithmId: "selection-sort",
    name: "Selection sort",
    description:
      "Find the smallest remaining value and move it into its final position.",
  },
  {
    algorithmId: "quick-sort",
    name: "Quick sort",
    description:
      "Partition values around a pivot, then sort each partition recursively.",
  },
];
