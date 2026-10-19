import Link from "next/link";

const items = [
  { href: "/", label: "หน้าหลัก", match: (path: string) => path === "/" },
  { href: "/lobby", label: "คาสิโน", match: (path: string) => path === "/lobby" || path.startsWith("/providers") },
  { href: "/games", label: "สล็อต", match: (path: string) => path === "/games" || path.startsWith("/play") },
] as const;

type SiteCategoryNavProps = {
  activePath: string;
};

/** หมวดหลัก: หน้าหลัก · คาสิโน · สล็อต */
export function SiteCategoryNav({ activePath }: SiteCategoryNavProps) {
  return (
    <nav
      className="border-b border-[rgba(214,217,220,0.12)] bg-[#000000] px-4 pb-2"
      aria-label="หมวดเกม"
    >
      <div className="mx-auto flex max-w-[var(--body-width,480px)] gap-2">
        {items.map((item) => {
          const active = item.match(activePath);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 rounded-[12px] py-2 text-center text-[13px] font-bold transition-transform active:scale-[0.98] ${
                active
                  ? "is-active-gold border border-[#b7832f] text-[#171717]"
                  : "border border-[rgba(214,217,220,0.2)] bg-[rgba(255,255,255,0.04)] text-[var(--text-secondary)]"
              }`}
              aria-current={active ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
