"use client";

import { ArrowUp } from "lucide-react";

export function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-16 border-t border-ink/8 pt-8 pb-12 text-xs text-muted">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div>
          <p className="font-hero text-sm font-bold text-ink">Feye</p>
          <p className="mt-0.5 text-[11px] text-muted">
            ขอบคุณที่แวะมานะ❤️
          </p>
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-card px-4 py-2 font-medium text-ink transition-colors hover:bg-card/70"
        >
          <span>กลับขึ้นข้างบน</span>
          <ArrowUp className="size-3" strokeWidth={2} />
        </button>
      </div>
    </footer>
  );
}
