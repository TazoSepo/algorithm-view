type AlgorithmPreviewProps = {
  data: number[];
};

export function AlgorithmPreview({ data }: AlgorithmPreviewProps) {
  const maxValue = Math.max(1, ...data);

  return (
    <figure className="rounded-lg bg-slate-50 p-4">
      <figcaption className="text-sm text-slate-600">Unsorted input</figcaption>
      <ol className="flex h-40 items-end justify-center gap-2">
        {data.map((value, index) => (
          <li
            key={index}
            className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"
          >
            <div
              aria-hidden="true"
              className="w-full max-w-10 rounded-t-md bg-blue-600"
              style={{ height: `${(value / maxValue) * 112}px` }}
            />
            <span className="text-xs font-medium text-slate-600 tabular-nums">
              {value}
            </span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
