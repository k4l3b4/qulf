"use client";

import {
  Blocks,
  Database,
  KeyRound,
  LayoutTemplate,
  Lock,
  ShieldCheck,
  Webhook,
} from "lucide-react";
import type React from "react";

/* ── Node definitions ─────────────────────────────────────── */
interface DiagramNode {
  id: string;
  label: string;
  sub: string;
  x: number;
  y: number;
  isCore?: boolean;
  colorName: string;
  colorHex: string;
  icon: React.ElementType;
  animDelay: number;
}

const NODES: DiagramNode[] = [
  {
    id: "core",
    label: "Qulf Core",
    sub: "auth engine",
    x: 310,
    y: 180,
    isCore: true,
    colorName: "red",
    colorHex: "#ef4444",
    icon: ShieldCheck,
    animDelay: 0,
  },
  {
    id: "frameworks",
    label: "Frameworks",
    sub: "FastAPI · Litestar",
    x: 100,
    y: 80,
    colorName: "blue",
    colorHex: "#60a5fa",
    icon: LayoutTemplate,
    animDelay: 0.3,
  },
  {
    id: "databases",
    label: "Databases",
    sub: "SQLAlchemy · Motor",
    x: 100,
    y: 280,
    colorName: "amber",
    colorHex: "#fbbf24",
    icon: Database,
    animDelay: 0.6,
  },
  {
    id: "plugins",
    label: "Plugins",
    sub: "OAuth · TOTP · Magic",
    x: 310,
    y: 40,
    colorName: "violet",
    colorHex: "#a78bfa",
    icon: Blocks,
    animDelay: 0.9,
  },
  {
    id: "sessions",
    label: "Sessions",
    sub: "JWT · Cookie · Store",
    x: 520,
    y: 80,
    colorName: "cyan",
    colorHex: "#22d3ee",
    icon: KeyRound,
    animDelay: 1.2,
  },
  {
    id: "security",
    label: "Security",
    sub: "RBAC · Rate-limit",
    x: 520,
    y: 280,
    colorName: "rose",
    colorHex: "#f43f5e",
    icon: Lock,
    animDelay: 1.5,
  },
  {
    id: "api",
    label: "REST API",
    sub: "OpenAPI · Typed routes",
    x: 310,
    y: 320,
    colorName: "emerald",
    colorHex: "#10b981",
    icon: Webhook,
    animDelay: 1.8,
  },
];

// Build cubic-bezier path from core
function buildPath(x1: number, y1: number, x2: number, y2: number): string {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;

  // Perpendicular offset for outward curves
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.sqrt(dx * dx + dy * dy);

  // Bend magnitude
  const offset = 45;
  const bx = mx + (-dy / length) * offset;
  const by = my + (dx / length) * offset;

  return `M ${x1} ${y1} Q ${bx} ${by} ${x2} ${y2}`;
}

export function QulfArchDiagram() {
  const core = NODES.find((n) => n.isCore);
  const satellites = NODES.filter((n) => !n.isCore);
  if (!core) return;

  return (
    <div className="relative mx-auto w-full max-w-155 select-none">
      <svg
        className="h-auto w-full drop-shadow-xl"
        viewBox="0 0 620 360"
        aria-label="Qulf architecture diagram"
        role="img"
      >
        <defs>
          <style>{`
            @keyframes dash-flow {
              from { stroke-dashoffset: 24; }
              to   { stroke-dashoffset: 0; }
            }
            .beam {
              /* Wider dash spacing */
              stroke-dasharray: 8 16;
              animation: dash-flow 1s linear infinite;
            }
            @keyframes pulse-core {
              0%, 100% { opacity: 0.3; transform: scale(1); }
              50% { opacity: 0.5; transform: scale(1.1); }
            }
            .core-glow {
              animation: pulse-core 3s ease-in-out infinite;
              transform-origin: 310px 180px;
            }
          `}</style>

          <pattern
            id="hexagons"
            width="24"
            height="40"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(0.5)"
          >
            <path
              fill="none"
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="1"
              d="M12 0l12 7v14l-12 7-12-7V7z"
            />
            <path
              fill="none"
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="1"
              d="M12 20l12 7v14l-12 7-12-7v-14z"
            />
          </pattern>

          <filter
            id="glow"
            filterUnits="userSpaceOnUse"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(220,38,38,0.3)" />
            <stop offset="100%" stopColor="rgba(220,38,38,0)" />
          </radialGradient>
        </defs>

        {/* Background grid */}
        <rect width="620" height="360" fill="url(#hexagons)" rx="16" />

        {/* Core ambient glow */}
        <circle
          cx={core.x}
          cy={core.y}
          r="120"
          fill="url(#coreGlow)"
          className="core-glow pointer-events-none"
        />

        {/* Background tracks */}
        {satellites.map((n) => (
          <path
            key={`track-${n.id}`}
            d={buildPath(core.x, core.y, n.x, n.y)}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="2"
            className="pointer-events-none"
          />
        ))}

        {/* Animated dashed flow lines */}
        {satellites.map((n) => (
          <path
            key={`beam-${n.id}`}
            d={buildPath(core.x, core.y, n.x, n.y)}
            fill="none"
            stroke={n.colorHex}
            strokeWidth="1.5"
            strokeOpacity={0.65}
            className="beam pointer-events-none"
            filter="url(#glow)"
            style={{ animationDelay: `-${n.animDelay}s` }}
          />
        ))}

        {/* Satellites */}
        {satellites.map((n) => {
          const Icon = n.icon;
          const w = 150;
          const h = 70;
          return (
            <foreignObject
              key={n.id}
              x={n.x - w / 2}
              y={n.y - h / 2}
              width={w}
              height={h}
              className="overflow-visible"
            >
              <div className="group flex h-full w-full items-center justify-center p-2">
                <div className="relative flex w-full items-center gap-2.5 rounded-xl border border-white/10 bg-neutral-950/60 p-2 shadow-xl backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:border-white/20 group-hover:bg-neutral-900/80 cursor-default">
                  {/* Glow behind icon */}
                  <div
                    className="absolute left-2 top-2 h-7 w-7 rounded-lg opacity-40 blur-md transition-opacity duration-300 group-hover:opacity-70 pointer-events-none"
                    style={{ backgroundColor: n.colorHex }}
                  />

                  {/* Icon Box */}
                  <div
                    className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-neutral-900"
                    style={{ color: n.colorHex }}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>

                  {/* Text content */}
                  <div className="flex flex-col overflow-hidden whitespace-nowrap">
                    <span className="text-[11px] font-semibold tracking-tight text-neutral-200 transition-colors group-hover:text-white">
                      {n.label}
                    </span>
                    <span className="truncate text-[9px] font-medium text-neutral-500">
                      {n.sub}
                    </span>
                  </div>
                </div>
              </div>
            </foreignObject>
          );
        })}

        {/* Core Node */}
        <foreignObject
          x={core.x - 90}
          y={core.y - 60}
          width={180}
          height={120}
          className="overflow-visible z-20"
        >
          <div className="group flex h-full w-full items-center justify-center p-2">
            <div className="relative flex flex-col items-center justify-center rounded-2xl border border-red-500/30 bg-neutral-950/80 px-5 py-3 shadow-[0_0_40px_-10px_rgba(220,38,38,0.4)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-red-500/60 hover:shadow-[0_0_60px_-10px_rgba(220,38,38,0.6)] cursor-default">
              {/* Spinning decorative border */}
              <div className="absolute inset-0 rounded-2xl border border-red-500/10 mask-[linear-gradient(transparent,white)] pointer-events-none" />

              <div className="relative mb-1.5 flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-500 shadow-inner">
                <core.icon className="h-5 w-5" />
              </div>

              <span className="text-[13px] font-bold tracking-tight text-white shadow-black drop-shadow-md">
                {core.label}
              </span>
              <span className="mt-0.5 rounded bg-red-950/50 px-1.5 py-0.5 text-[8.5px] font-bold uppercase tracking-wider text-red-400">
                {core.sub}
              </span>
            </div>
          </div>
        </foreignObject>
      </svg>
    </div>
  );
}
