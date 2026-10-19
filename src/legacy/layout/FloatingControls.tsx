import { IconHeadset } from "../ui/icons";

export function FloatingControls() {
  return (
    <button
      type="button"
      className="surface-control fixed right-2 bottom-[calc(var(--bottom-nav-h)+12px)] z-40 flex items-center gap-1.5 rounded-[var(--radius-pill)] border border-[var(--border-default)] px-2.5 py-2 text-[11px] font-semibold text-[var(--text-secondary)] shadow-[0_4px_14px_rgba(0,0,0,0.28)] transition-transform active:scale-[0.98]"
      aria-label="ติดต่อฝ่ายบริการ"
    >
      <span className="text-[var(--gold-primary)]">
        <IconHeadset />
      </span>
      ติดต่อ
    </button>
  );
}
