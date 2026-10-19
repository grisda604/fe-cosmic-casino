import { IconSearch } from "@/components/ui/icons";

export function SearchGameInput() {
  return (
    <section className="px-[var(--shell-pad-x)]">
      <label className="search-field surface-control flex h-11 items-center gap-2 rounded-[15px] px-3">
        <IconSearch className="h-5 w-5 text-[var(--text-muted)]" />
        <input
          type="search"
          placeholder="ค้นหาเกม..."
          className="min-w-0 flex-1 border-0 bg-transparent text-[14px] outline-none placeholder:text-[var(--text-muted)]"
        />
      </label>
    </section>
  );
}
