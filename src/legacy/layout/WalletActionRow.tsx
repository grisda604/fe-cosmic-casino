import Link from "next/link";

import { IconDeposit, IconWithdraw } from "@/legacy/ui/icons";

export function WalletActionRow() {
  return (
    <div className="grid grid-cols-2 gap-2 px-[var(--shell-pad-x)]">
      <Link
        href="/bank/deposit"
        className="btn-gold flex h-[52px] items-center justify-center gap-2 text-[15px]"
      >
        <IconDeposit className="h-5 w-5 text-[#171717]" />
        ฝาก
      </Link>
      <Link
        href="/withdraw"
        className="btn-dark flex h-[52px] items-center justify-center gap-2 text-[15px]"
      >
        <IconWithdraw className="h-5 w-5 text-[var(--gold-primary)]" />
        ถอน
      </Link>
    </div>
  );
}
