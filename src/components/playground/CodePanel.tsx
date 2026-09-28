type Props = {
  lines: readonly { id: string; text: string }[];
  activeIds: readonly string[];
};

export function CodePanel({ lines, activeIds }: Props) {
  return (
    <aside className="min-w-0 border-t border-slate-200 bg-slate-50/70 py-6 lg:border-t-0 lg:border-l">
      <h2 className="mb-5 px-5 text-xs font-semibold uppercase tracking-widest text-slate-500">
        Pseudocode
      </h2>
      <ol className="overflow-x-auto font-mono text-xs leading-7">
        {lines.map((line, index) => (
          <li
            key={line.id}
            aria-current={activeIds.includes(line.id) ? "step" : undefined}
            className={`flex min-w-max gap-4 border-l-2 px-4 ${activeIds.includes(line.id) ? "border-blue-600 bg-blue-100 text-blue-950" : "border-transparent text-slate-600"}`}
          >
            <span
              aria-hidden="true"
              className="w-4 shrink-0 text-right text-slate-400"
            >
              {index + 1}
            </span>
            <code className="whitespace-pre">{line.text}</code>
          </li>
        ))}
      </ol>
    </aside>
  );
}
