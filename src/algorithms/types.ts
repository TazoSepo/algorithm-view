import type { ComponentType } from "react";

export type AlgorithmStep<State> = {
  phase: string;
  description: string;
  state: State;
  codeLineIds: readonly string[];
  comparisons: number;
  writes: number;
};

export type AlgorithmItem = { id: string; value: number };

export type AlgorithmRun<State> = {
  items: readonly AlgorithmItem[];
  steps: readonly AlgorithmStep<State>[];
  result: readonly number[];
};

export type AlgorithmDefinition<State> = {
  algorithmId: string;
  name: string;
  description: string;
  category: string;
  timeComplexity: string;
  spaceComplexity: string;
  stable: boolean;
  Preview: ComponentType;
  defaultInput: readonly number[];
  run: (input: readonly number[]) => AlgorithmRun<State>;
  Visualizer: ComponentType<{
    items: readonly AlgorithmItem[];
    step: AlgorithmStep<State>;
  }>;
  pseudocode: readonly { id: string; text: string }[];
  source: string;
  explanation: readonly { title: string; text: string }[];
};
