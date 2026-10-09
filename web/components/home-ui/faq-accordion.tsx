import { ChevronRight } from "lucide-react";
import { useState } from "react";

export function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="border-t border-neutral-800">
      {items.map((item, i) => (
        <div key={item.q} className="border-b border-neutral-800">
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-medium text-neutral-200 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 md:text-lg"
            aria-expanded={open === i}
          >
            {item.q}
            <ChevronRight
              className={`size-4 shrink-0 text-neutral-600 transition-transform duration-300 ${open === i ? "rotate-90 text-red-500" : ""}`}
              aria-hidden
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-out ${open === i ? "max-h-96 pb-5" : "max-h-0"}`}
          >
            <p className="text-sm leading-7 text-neutral-400">{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}