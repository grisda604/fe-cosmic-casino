import type { ReactNode } from "react";

import { WalletSummary } from "@/components/layout/WalletSummary";
import { IconMail, IconMore, IconSearch } from "../ui/icons";

function HeaderIconButton({ label, children }: { label: string; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="surface-control flex h-10 w-10 items-center justify-center rounded-full text-[var(--text-secondary)] transition-transform active:scale-[0.98] hover:text-[var(--text-primary)]"
    >
      {children}
    </button>
  );
}

export function TopHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--surface-0)]/95 pt-2 pb-1">
      <div className="mx-auto grid max-w-[480px] grid-cols-[1fr_auto_1fr] items-center gap-2 px-[var(--shell-pad-x)]">
        <div className="justify-self-start">
          <WalletSummary />
        </div>
        <div className="justify-self-center text-center">
          <p className="gold-text m-0 text-[22px] font-extrabold tracking-[0.12em] leading-none">
            PHANTOM
          </p>
          <span className="mt-0.5 inline-block text-[10px] text-[var(--gold-primary)]" aria-hidden>
            ♛
          </span>
        </div>
        <div className="flex justify-end gap-1.5">
          <HeaderIconButton label="ข้อความ">
            <IconMail />
          </HeaderIconButton>
          <HeaderIconButton label="ค้นหา">
            <IconSearch />
          </HeaderIconButton>
          <HeaderIconButton label="เมนูเพิ่มเติม">
            <IconMore />
          </HeaderIconButton>
        </div>
      </div>
    </header>
  );
}
