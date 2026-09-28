import { describe, expect, test } from "bun:test";
import { mergeSort } from "../src/algorithms/merge-sort/mergeSort";
import { parseSortingInput } from "../src/algorithms/input";

describe("merge sort trace", () => {
  test.each([
    [[], []],
    [[7], [7]],
    [
      [4, 2],
      [2, 4],
    ],
    [
      [38, 12, 27, 5, 19],
      [5, 12, 19, 27, 38],
    ],
    [
      [3, -1, 0, 3, -1],
      [-1, -1, 0, 3, 3],
    ],
    [
      [1, 2, 3],
      [1, 2, 3],
    ],
    [
      [5, 4, 3, 2, 1],
      [1, 2, 3, 4, 5],
    ],
  ])("sorts %j without changing its input", (input, expected) => {
    const original = [...input];
    const run = mergeSort(input);
    expect(run.result).toEqual(expected);
    expect(input).toEqual(original);
    expect(run.steps.at(-1)?.phase).toBe("Done");
    const finalIds = run.steps.at(-1)!.state.groups.flat();
    expect(
      finalIds.map((id) => run.items.find((item) => item.id === id)!.value),
    ).toEqual(expected);
  });

  test("preserves every element and original order among equal values", () => {
    const run = mergeSort([3, 1, 3, 1]);
    expect(run.steps.at(-1)!.state.groups.flat()).toEqual([
      "item-1",
      "item-3",
      "item-0",
      "item-2",
    ]);
    for (const step of run.steps) {
      expect([...step.state.groups.flat()].sort()).toEqual([
        "item-0",
        "item-1",
        "item-2",
        "item-3",
      ]);
    }
  });

  test("records an accurate comparison and separate output snapshots", () => {
    const run = mergeSort([4, 2]);
    const comparison = run.steps.find((step) => step.phase === "Compare")!;
    expect(comparison.state.comparing).toEqual(["item-0", "item-1"]);
    expect(comparison.state.output).toEqual([]);
    const writes = run.steps.filter((step) => step.phase === "Take");
    expect(writes.map((step) => step.state.output)).toEqual([
      ["item-1"],
      ["item-1", "item-0"],
    ]);
    expect(run.steps[0].state.groups).toEqual([["item-0", "item-1"]]);
    expect(run.steps.at(-1)!.comparisons).toBe(1);
    expect(run.steps.at(-1)!.writes).toBe(2);
  });

  test("snapshots never share modifiable nested arrays", () => {
    const run = mergeSort([5, 1, 3]);
    for (let i = 1; i < run.steps.length; i++) {
      const previous = run.steps[i - 1].state;
      const current = run.steps[i].state;
      expect(current.groups).not.toBe(previous.groups);
      for (const group of current.groups) {
        expect(previous.groups.includes(group)).toBe(false);
      }
      expect(current.output).not.toBe(previous.output);
    }
  });
});

describe("sorting input", () => {
  test("accepts signed integers, duplicates, and whitespace", () => {
    expect(parseSortingInput(" 4, -2, 0, 4 ")).toEqual([4, -2, 0, 4]);
  });
  test.each([
    "",
    "1,,2",
    "1,",
    "abc",
    "1.5",
    "Infinity",
    "1e2",
    "1000",
    "-1000",
    Array(17).fill("1").join(","),
  ])("rejects %j", (text) => {
    expect(() => parseSortingInput(text)).toThrow();
  });
});
