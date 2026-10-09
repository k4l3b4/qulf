import { ChevronRight } from "lucide-react";

export function MiniList({ items, mono }: { items: string[]; mono?: boolean }) {
  return (
    <div className="overflow-hidden rounded-lg border border-neutral-800 bg-black">
      {items.map((item, i) => (
        <div
          key={item}
          className="flex items-center justify-between px-4 py-2.5 text-xs"
          style={{
            borderBottom:
              i < items.length - 1
                ? "1px solid rgba(255,255,255,0.06)"
                : undefined,
            color: item.includes("soon") ? "#333" : "#777",
            fontFamily: mono ? "monospace" : undefined,
          }}
        >
          <span>{item}</span>
          {!item.includes("soon") && (
            <ChevronRight
              className="size-3 shrink-0 text-neutral-700"
              aria-hidden
            />
          )}
        </div>
      ))}
    </div>
  );
}
