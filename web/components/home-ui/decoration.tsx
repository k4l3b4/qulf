export function Cross({ className }: { className?: string }) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      aria-hidden
      className={`absolute ${className ?? ""}`}
    >
      <title>Cross</title>
      <path d="M5.5 0V11M0 5.5H11" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function GridCrosses({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-10 text-neutral-800 ${className ?? ""}`}
    >
      <Cross className="left-[-0.5px] top-[-0.5px] -translate-x-1/2 -translate-y-1/2" />
      <Cross className="right-[-0.5px] top-[-0.5px] translate-x-1/2 -translate-y-1/2" />
      <Cross className="left-[-0.5px] bottom-[-0.5px] -translate-x-1/2 translate-y-1/2" />
      <Cross className="right-[-0.5px] bottom-[-0.5px] translate-x-1/2 translate-y-1/2" />
    </div>
  );
}

export function SectionKicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-sm font-medium text-red-500">
      <span aria-hidden className="size-2 rounded-[1px] bg-red-500" />
      {children}
    </p>
  );
}