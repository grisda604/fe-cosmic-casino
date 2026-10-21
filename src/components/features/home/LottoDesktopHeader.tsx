"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { Plus, Search } from "lucide-react";
import Link, { useRouter } from "@/lib/i18n/navigation";
import { useT } from "@/lib/i18n/I18nProvider";
import { NotificationBellButton } from "@/components/notifications/NotificationBellButton";
import { useNotifications } from "@/components/notifications/NotificationProvider";
import { useProfile } from "@/hooks/api/account";
import { useLotterySlipFirstPage } from "@/hooks/api/lotterySlips";
import { useAuthUI } from "@/context/AuthUIContext";
import { useDeposit } from "@/context/DepositContext";
import type { WalletSnapshot } from "@/lib/lotto/load-wallet-snapshot";
import { BahtIcon } from "./BahtIcon";
import { DevQuickLogin } from "./DevQuickLogin";

type Props = {
  logoSrc: string;
  loggedIn: boolean;
  wallet: WalletSnapshot;
};

const PENDING_FILTER = { scope: "pending", market: "", result: "", range: "" } as const;

/** กลุ่มขวาของคนที่ login — กระดิ่ง · โพยค้าง · ยอดเงิน+ฝาก · avatar (ภาพอ้างอิง) */
function MemberCluster({ wallet }: { wallet: WalletSnapshot }) {
  const tNav = useT("nav");
  const tLottery = useT("lottery");
  const { openDeposit } = useDeposit();
  const { openNotifications } = useNotifications();
  const profile = useProfile();
  const pending = useLotterySlipFirstPage(PENDING_FILTER, () => ({ scope: "pending" }));
  const pendingCount = pending.data?.summary.count ?? 0;
  const name = profile.data?.displayName ?? "";
  const avatarUrl = profile.data?.avatarUrl;

  return (
    <>
      <NotificationBellButton className="dh-icon" onClick={openNotifications} />

      {/* <Link
        href="/lottery/slips"
        className="dh-icon"
        aria-label={pendingCount > 0 ? tLottery("hub.mySlipsPendingAria", { count: pendingCount }) : tLottery("hub.mySlipsAria")}
        title={tLottery("hub.mySlips")}
      >
        <Ticket className="h-5 w-5" aria-hidden="true" />
        {pendingCount > 0 ? <span className="dh-icon__badge">{pendingCount > 99 ? "99+" : pendingCount}</span> : null}
      </Link> */}

      <div className="dh-wallet">
        <span className="dh-wallet__coin" aria-hidden>
          <BahtIcon />
        </span>
        <span className="dh-wallet__value">{wallet.money}</span>
        <button
          type="button"
          className="dh-wallet__plus"
          onClick={openDeposit}
          aria-label={tNav("bottomNav.deposit")}
          title={tNav("bottomNav.deposit")}
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
        </button>
      </div>

      <Link href="/profile" className="dh-avatar" aria-label={name || tNav("header.profile")} title={name || undefined}>
        {avatarUrl ? <Image src={avatarUrl} alt="" width={40} height={40} unoptimized /> : null}
      </Link>
    </>
  );
}

/** กลุ่มขวาของ guest — ปุ่มเข้าสู่ระบบ/สมัคร */
function GuestCluster() {
  const { openLogin, openRegister } = useAuthUI();
  return (
    <>
      <DevQuickLogin className="dh-auth dh-auth--dev" />
      <button type="button" className="dh-auth dh-auth--ghost" onClick={openLogin}>
        เข้าสู่ระบบ
      </button>
      <button type="button" className="dh-auth" onClick={openRegister}>
        สมัครสมาชิก
      </button>
    </>
  );
}

/**
 * Header desktop (≥1024): ซ้าย = ช่องค้นหา · กลาง = โลโก้ · ขวา = กระดิ่ง · ยอดเงิน+ฝาก · avatar
 * mobile ใช้ header เดิมใน LottoSiteHeader (กลุ่มนี้ซ่อนด้วย CSS ต่ำกว่า 1024)
 */
export function LottoDesktopHeader({ logoSrc, loggedIn, wallet }: Props) {
  const tNav = useT("nav");
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");

  /** เริ่มเลื่อนหน้า → ตั้ง data-scrolled บน <header> เพื่อให้ CSS ใส่พื้นไล่เฉดสีธีม */
  useEffect(() => {
    const header = rootRef.current?.closest<HTMLElement>(".lotto-site-header");
    if (!header) return;
    const update = () => header.setAttribute("data-scrolled", String(window.scrollY > 8));
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const onSearch = (event: FormEvent) => {
    event.preventDefault();
    const q = query.trim();
    router.push(q ? `/slots?q=${encodeURIComponent(q)}` : "/slots");
  };

  return (
    <div className="header-desktop" ref={rootRef}>
      <div className="dh-inner">
      <div className="dh-left">
        <form className="dh-search" role="search" onSubmit={onSearch}>
          <label htmlFor="dh-search-input" className="sr-only">
            {tNav("header.searchLabel")}
          </label>
          <input
            id="dh-search-input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={tNav("header.searchPlaceholder")}
            autoComplete="off"
            spellCheck={false}
          />
          <button type="submit" aria-label={tNav("desktop.searchGames")}>
            <Search className="h-4 w-4" aria-hidden="true" />
          </button>
        </form>
      </div>

      <Link href="/" className="dh-logo">
        <Image src={logoSrc} alt="Phantom" width={1123} height={217} className="dh-logo__img" priority unoptimized />
      </Link>

      <div className="dh-right">{loggedIn ? <MemberCluster wallet={wallet} /> : <GuestCluster />}</div>
      </div>
    </div>
  );
}
