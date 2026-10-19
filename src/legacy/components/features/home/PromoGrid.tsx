import { PROMO_TILES } from "./mock-data";

export function PromoGrid() {
  return (
    <section className="px-[var(--shell-pad-x)]" aria-label="โปรโมชั่น">
      <div className="grid gap-2" style={{ gridTemplateColumns: "1fr 1.8fr 1fr" }}>
        {PROMO_TILES.map((tile) => (
          <button
            key={tile.id}
            type="button"
            className={`relative aspect-[5/4] overflow-hidden rounded-[13px] border border-[var(--border-default)] bg-gradient-to-br ${tile.gradient} text-left transition-transform active:scale-[0.98]`}
          >
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-1.5 pb-1.5 pt-6 text-[8px] font-bold leading-tight text-[var(--text-primary)]">
              {tile.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
