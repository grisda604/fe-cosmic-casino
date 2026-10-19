import type { ReactNode } from "react";

import { IconCoinChip, IconCoinGold, IconSwap } from "@/components/ui/icons";

function WalletRow({ icon, amount }: { icon: ReactNode; amount: string }) {
  return (
    <div className="flex items-center justify-between gap-2 text-[11px] leading-none">
      <span className="shrink-0 opacity-95">{icon}</span>
      <span className="font-bold tabular-nums text-[var(--text-primary)]">{amount}</span>
    </div>
  );
}

export function WalletSummary() {
  return (
    <div className="flex items-center gap-1.5">
      <div className="surface-control w-[132px] rounded-[15px] px-2.5 py-2">
        <WalletRow icon={<IconCoinGold />} amount="0.00" />
        <div className="mt-1.5">
          <WalletRow icon={<IconCoinChip />} amount="0.00" />
        </div>
      </div>
      <button
        type="button"
        className="surface-control flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[var(--gold-primary)] transition-transform active:scale-[0.98]"
        aria-label="สลับยอดเงิน"
      >
        <IconSwap className="h-4 w-4" />
      </button>
    </div>
  );
}
