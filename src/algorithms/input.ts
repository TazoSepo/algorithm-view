export function parseSortingInput(text: string): number[] {
  const tokens = text.split(",").map((token) => token.trim());
  if (tokens.length > 16 || tokens.some((token) => !/^[+-]?\d+$/.test(token))) {
    throw new Error("Enter 1–16 whole numbers separated by commas.");
  }
  const values = tokens.map(Number);
  if (
    values.some(
      (value) => !Number.isSafeInteger(value) || Math.abs(value) > 999,
    )
  ) {
    throw new Error("Each number must be between -999 and 999.");
  }
  return values;
}
