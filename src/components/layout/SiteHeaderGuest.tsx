import type { ReactNode } from "react";
import Link from "next/link";

import { IconMore, IconSearch } from "@/components/ui/icons";

function HeaderIconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(214,217,220,0.28)] bg-[rgba(0,0,0,0.45)] text-[var(--text-primary)] transition-transform active:scale-[0.96] sm:h-10 sm:w-10"
    >
      {children}
    </Link>
  );
}

/** Header โหมด guest ตาม ptmx-app — โลโก้ซ้าย, ค้นหา + เมนูขวา */
export function SiteHeaderGuest() {
  return (
    <header className="w-full bg-[#000000]">
      <div className="mx-auto flex h-[56px] max-w-[var(--body-width,480px)] items-center justify-between gap-3 px-4 sm:h-[64px]">
        <Link href="/" className="shrink-0 no-underline" aria-label="Phantom หน้าแรก">
          <span
            className="gold-text text-[26px] font-bold leading-none tracking-[0.06em] sm:text-[30px]"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            PHANTOM
          </span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-2.5">
          <HeaderIconLink href="/search" label="ค้นหา">
            <IconSearch className="h-5 w-5" />
          </HeaderIconLink>
          <HeaderIconLink href="/login" label="เมนูเพิ่มเติม">
            <IconMore className="h-5 w-5" />
          </HeaderIconLink>
        </div>
      </div>
    </header>
  );
}
