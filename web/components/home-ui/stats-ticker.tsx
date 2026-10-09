const STATS = [
  { value: "< 5 min", label: "to integrate" },
  { value: "MIT", label: "license" },
  { value: "100%", label: "typed" },
  { value: "0", label: "vendor lock-in" },
];

export default function StatsTicker() {
  return (
    <div className="grid grid-cols-2 gap-px bg-neutral-800 sm:grid-cols-4">
      {STATS.map((s) => (
        <div key={s.label} className="bg-neutral-950 px-6 py-5 text-center">
          <p className="text-2xl font-bold tracking-tight text-white">
            {s.value}
          </p>
          <p className="mt-1 text-xs text-neutral-500 uppercase tracking-widest">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}