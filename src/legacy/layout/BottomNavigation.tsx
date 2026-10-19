import type { ReactNode } from "react";
import Link from "next/link";

import {
  IconBitcoin,
  IconGamepad,
  IconHome,
  IconMegaphone,
  IconUser,
} from "@/legacy/ui/icons";

type NavItem = {
  id: string;
  label: string;
  href: string;
  icon: ReactNode;
  center?: boolean;
};

const items: NavItem[] = [
  { id: "home", label: "หน้าหลัก", href: "/", icon: <IconHome /> },
  { id: "play", label: "เล่นเกม", href: "/lobby", icon: <IconGamepad /> },
  { id: "wallet", label: "ฝาก/ถอน", href: "/bank", icon: <IconBitcoin />, center: true },
  { id: "promo", label: "โปรโมชั่น", href: "/promotion", icon: <IconMegaphone /> },
  { id: "profile", label: "โปรไฟล์", href: "/profile", icon: <IconUser /> },
];

export function BottomNavigation() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--border-subtle)] bg-gradient-to-t from-[#0a0c0d] to-[#121416]/98"
      style={{ height: "var(--bottom-nav-h)" }}
      aria-label="เมนูหลัก"
    >
      <div className="mx-auto flex h-full max-w-[480px] items-end justify-between px-2 pb-2 pt-1">
        {items.map((item) => {
          if (item.center) {
            return (
              <Link
                key={item.id}
                href={item.href}
                className="-mt-5 flex flex-col items-center gap-0.5"
                aria-label={item.label}
              >
                <span className="gold-fill flex h-[52px] w-[52px] items-center justify-center rounded-full border border-[#b7832f] text-[#171717] shadow-[0_4px_14px_rgba(0,0,0,0.35),0_0_12px_rgba(226,187,85,0.16)]">
                  {item.icon}
                </span>
                <span className="text-[10px] font-medium text-[var(--text-secondary)]">{item.label}</span>
              </Link>
            );
          }

          const homeNav = item.id === "home";
          const playNav = item.id === "play";
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex min-w-[56px] flex-col items-center gap-0.5 rounded-[var(--radius-md)] px-1 py-1 transition-transform active:scale-[0.98] ${
                playNav
                  ? "is-active-gold px-2 py-1.5 text-[#171717]"
                  : homeNav
                    ? "text-[var(--gold-primary)]"
                    : "text-[var(--text-muted)]"
              }`}
              aria-current={homeNav ? "page" : undefined}
            >
              {item.icon}
              <span className="text-[11px] font-medium leading-none">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
