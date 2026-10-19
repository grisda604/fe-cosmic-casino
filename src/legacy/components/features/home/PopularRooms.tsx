import { IconChevronRight, IconCrown } from "@/legacy/ui/icons";

import { ROOMS } from "./mock-data";

function RoadmapGrid() {
  const cells = Array.from({ length: 36 }, (_, i) => {
    const mod = i % 5;
    if (mod === 0) return "bg-[#e51f28]";
    if (mod === 2) return "bg-[#3d8df5]";
    return "bg-[var(--surface-4)]";
  });

  return (
    <div className="grid grid-cols-6 gap-[3px] rounded-[8px] border border-[var(--border-subtle)] bg-[var(--surface-2)] p-1.5">
      {cells.map((cls, i) => (
        <span key={i} className={`aspect-square rounded-full ${cls}`} />
      ))}
    </div>
  );
}

function RoomCard({ name, players }: { name: string; players: number }) {
  return (
    <article className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--border-default)] bg-[var(--surface-3)]">
      <div className="relative aspect-[16/10] bg-gradient-to-br from-[#2a2418] to-[#121416]" />
      <div className="border-t border-[var(--border-subtle)] px-2 py-1.5">
        <p className="m-0 truncate text-[11px] font-semibold">{name}</p>
        <p className="m-0 text-[10px] tabular-nums text-[var(--text-muted)]">{players} คน</p>
      </div>
      <div className="px-2 pb-2">
        <RoadmapGrid />
      </div>
    </article>
  );
}

export function PopularRooms() {
  return (
    <section className="px-[var(--shell-pad-x)]" aria-labelledby="popular-rooms-title">
      <div className="panel-dark p-3">
        <div className="mb-2.5 flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <span className="text-[var(--gold-primary)]">
              <IconCrown />
            </span>
            <h2 id="popular-rooms-title" className="m-0 truncate text-[17px] font-bold">
              ห้องยอดนิยม
            </h2>
          </div>
          <IconChevronRight className="h-5 w-5 shrink-0 text-[var(--gold-200)]" aria-hidden />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {ROOMS.map((room) => (
            <RoomCard key={room.id} name={room.name} players={room.players} />
          ))}
        </div>
      </div>
    </section>
  );
}
