import { IconChevronRight, IconSpeaker } from "../ui/icons";
import { TICKER_TEXT } from "@/components/features/home/mock-data";

export function AnnouncementTicker() {
  const line = `${TICKER_TEXT} · ${TICKER_TEXT}`;

  return (
    <div
      className="ticker-wrap mx-[var(--shell-pad-x)] flex h-10 items-center gap-2 overflow-hidden rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-1)] px-2.5"
      style={{ borderTopColor: "var(--border-subtle)", borderBottomColor: "var(--border-subtle)" }}
    >
      <span className="shrink-0 text-[var(--gold-primary)]">
        <IconSpeaker />
      </span>
      <div className="relative min-w-0 flex-1 overflow-hidden">
        <p className="ticker-track m-0 flex w-max whitespace-nowrap text-[12px] text-[var(--text-secondary)]">
          <span className="pr-16">{line}</span>
          <span className="pr-16" aria-hidden>
            {line}
          </span>
        </p>
      </div>
      <span className="shrink-0 text-[var(--gold-200)]">
        <IconChevronRight />
      </span>
    </div>
  );
}
