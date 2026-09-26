import type { PreviewStep } from "./preview";

export type MergeSortBar = {
  id: string;
  value: number;
};

export type MergeSortStep = PreviewStep & {
  phase: "Split" | "Merge" | "Done";
  groups: string[][];
  comparing?: string[];
  merging?: number[];
  output?: string[];
};

export type MergeSortExample = {
  bars: MergeSortBar[];
  steps: MergeSortStep[];
};
