import { IconHeart } from "@/components/ui/icons";

type GameCardProps = {
  title: string;
  players: number;
  tags: readonly ("Hot" | "New")[];
  hue: number;
};

export function GameCard({ title, players, tags, hue }: GameCardProps) {
  return (
    <article className="relative aspect-[3/4] w-[108px] shrink-0 overflow-hidden rounded-[var(--radius-md)] bg-[var(--surface-3)] shadow-[0_4px_14px_rgba(0,0,0,0.28)] sm:w-[118px]">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(145deg, hsl(${hue} 55% 42%) 0%, hsl(${hue} 40% 18%) 100%)`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25" />
      <div className="absolute left-1.5 top-1.5 flex flex-wrap gap-1">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-[var(--radius-xs)] px-1 py-0.5 text-[9px] font-bold uppercase text-white"
            style={{ background: tag === "Hot" ? "var(--status-hot)" : "var(--status-new)" }}
          >
            {tag}
          </span>
        ))}
      </div>
      <button
        type="button"
        className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/45 text-white"
        aria-label={`เพิ่ม ${title} ในรายการโปรด`}
      >
        <IconHeart className="h-3.5 w-3.5" />
      </button>
      <div className="absolute inset-x-0 bottom-0 p-2">
        <p className="m-0 truncate text-[10px] font-bold text-white">{title}</p>
        <p className="m-0 mt-1 inline-flex rounded-full bg-black/55 px-1.5 py-0.5 text-[9px] tabular-nums text-[var(--text-secondary)]">
          {players.toLocaleString()} คนเล่น
        </p>
      </div>
    </article>
  );
}
