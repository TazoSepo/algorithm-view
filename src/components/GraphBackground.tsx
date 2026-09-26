import { useEffect, useId, useRef, useState } from "react";
import "./GraphBackground.css";

const nodes = [
  { x: 50, y: 95 },
  { x: 210, y: 140 },
  { x: 395, y: 75 },
  { x: 600, y: 110 },
  { x: 795, y: 70 },
  { x: 975, y: 125 },
  { x: 1150, y: 85 },
  { x: 105, y: 295 },
  { x: 285, y: 320 },
  { x: 465, y: 270 },
  { x: 680, y: 315 },
  { x: 865, y: 260 },
  { x: 1060, y: 305 },
  { x: 35, y: 495 },
  { x: 225, y: 520 },
  { x: 410, y: 465 },
  { x: 610, y: 535 },
  { x: 785, y: 470 },
  { x: 965, y: 510 },
  { x: 1170, y: 480 },
  { x: 100, y: 715 },
  { x: 310, y: 675 },
  { x: 505, y: 735 },
  { x: 710, y: 680 },
  { x: 895, y: 730 },
  { x: 1100, y: 685 },
];

const edges = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [0, 7],
  [1, 7],
  [1, 8],
  [2, 9],
  [3, 9],
  [3, 10],
  [4, 11],
  [5, 12],
  [6, 12],
  [7, 8],
  [8, 9],
  [9, 10],
  [10, 11],
  [11, 12],
  [7, 13],
  [8, 14],
  [9, 15],
  [10, 16],
  [10, 17],
  [11, 18],
  [12, 19],
  [13, 14],
  [14, 15],
  [15, 16],
  [16, 17],
  [17, 18],
  [18, 19],
  [13, 20],
  [14, 21],
  [15, 21],
  [16, 22],
  [17, 23],
  [18, 24],
  [19, 25],
  [20, 21],
  [21, 22],
  [22, 23],
  [23, 24],
  [24, 25],
];

const routes = [
  [0, 7, 13, 14, 21, 22, 23, 24, 25],
  [25, 19, 12, 11, 10, 3, 2, 1, 0],
];

export function GraphBackground() {
  const glowId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const positions = nodes.map((node) => ({
    x: (node.x / 1200) * size.width,
    y: (node.y / 800) * size.height,
  }));

  function edgePath(from: number, to: number, includeStart = true) {
    const start = positions[from];
    const end = positions[to];
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const distance = Math.hypot(dx, dy) || 1;
    const bend =
      Math.min(distance * 0.09, 16) *
      ((from + to) % 2 ? 1 : -1) *
      (from < to ? 1 : -1);
    const cx = (start.x + end.x) / 2 - (dy / distance) * bend;
    const cy = (start.y + end.y) / 2 + (dx / distance) * bend;

    return `${includeStart ? `M ${start.x} ${start.y} ` : ""}Q ${cx} ${cy} ${end.x} ${end.y}`;
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="graph-background pointer-events-none fixed inset-0 z-0 overflow-hidden text-blue-500 opacity-25"
    >
      <svg
        viewBox={`0 0 ${size.width} ${size.height}`}
        className="h-full w-full"
        focusable="false"
      >
        <defs>
          <radialGradient id={glowId}>
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.5" />
            <stop offset="45%" stopColor="currentColor" stopOpacity="0.16" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g fill="none" stroke="currentColor" strokeWidth="1" opacity="0.42">
          {edges.map(([from, to]) => (
            <path
              key={`${from}-${to}`}
              d={edgePath(from, to)}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          {routes.map((route, index) => (
            <path
              key={index}
              className="graph-background-pulse"
              d={route
                .slice(1)
                .map((node, point) => edgePath(route[point], node, point === 0))
                .join(" ")}
              pathLength="1"
              strokeDasharray="0.018 0.982"
              vectorEffect="non-scaling-stroke"
              style={{ animationDelay: `${index * -11}s` }}
            />
          ))}
        </g>
        <g fill="currentColor">
          {positions.map((node, index) => (
            <g key={index}>
              <circle
                className="graph-background-glow"
                cx={node.x}
                cy={node.y}
                r={index % 4 === 0 ? 22 : 15}
                fill={`url(#${glowId})`}
                style={{ animationDelay: `${index * -0.7}s` }}
              />
              {index % 4 === 0 && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.75"
                  opacity="0.4"
                />
              )}
              <circle
                cx={node.x}
                cy={node.y}
                r={index % 4 === 0 ? 3 : 2}
                opacity="0.85"
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
