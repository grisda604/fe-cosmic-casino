"use client";

import { useState, type ComponentType } from "react";
import dynamic from "next/dynamic";
import {
  Award,
  Cherry,
  Dices,
  Fish,
  Gift,
  Home,
  Megaphone,
  Palette,
  PanelLeftClose,
  PanelLeftOpen,
  Spade,
  Ticket,
  Trophy,
} from "lucide-react";
import Link, { useLocale, usePathname } from "@/lib/i18n/navigation";
import { LocaleFlag } from "@/components/i18n/LocaleFlag";
import { LOCALE_LABELS } from "@/lib/i18n/config";
import { useLazyOverlayMount } from "@/hooks/useLazyOverlayMount";
import { useT } from "@/lib/i18n/I18nProvider";
import styles from "./lobby-sidebar.module.css";

const ThemePickerSheet = dynamic(() =>
  import("@/components/theme/ThemePickerSheet").then((m) => m.ThemePickerSheet),
);
const LanguagePickerSheet = dynamic(() =>
  import("@/components/i18n/LanguagePickerSheet").then((m) => m.LanguagePickerSheet),
);

type SidebarItem = {
  id: string;
  href: string;
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" }>;
  ns: "home" | "nav";
  key: string;
};

/** หมวดเกม (กลุ่มบน) — ลำดับมาตรฐานเดียวกับแถบเมนูใต้ header (lobby-category.ts): หน้าหลัก · คาสิโน · สล็อต · ยิงปลา · กีฬา · หวย · เกมไพ่ */
const GAME_ITEMS: SidebarItem[] = [
  { id: "home", href: "/", icon: Home, ns: "home", key: "categories.home" },
  { id: "casino", href: "/casino", icon: Dices, ns: "home", key: "categories.casino" },
  { id: "slots", href: "/slots", icon: Cherry, ns: "home", key: "categories.slots" },
  { id: "fishing", href: "/fishing", icon: Fish, ns: "home", key: "categories.fishing" },
  { id: "sports", href: "/sport", icon: Trophy, ns: "home", key: "categories.sports" },
  { id: "lottery", href: "/lottery", icon: Ticket, ns: "home", key: "categories.lottery" },
  { id: "cards", href: "/cards", icon: Spade, ns: "home", key: "categories.cards" },
];

/** กลุ่มโปรโมชั่น: โปรโมชั่น · กิจกรรม · ลุ้นรางวัล (กลุ่มที่สอง — คั่นด้วยเส้น) */
const PROMO_ITEMS: SidebarItem[] = [
  { id: "promotions", href: "/promotions", icon: Megaphone, ns: "nav", key: "menu.promotions" },
  { id: "activities", href: "/event", icon: Gift, ns: "nav", key: "menu.activities" },
  { id: "rewards", href: "/reward", icon: Award, ns: "nav", key: "menuSections.rewards" },
];

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

type Props = {
  collapsed: boolean;
  onToggle: () => void;
};

/**
 * Sidebar desktop (≥1024) ตรึงซ้ายจอ เต็มความสูง — ขยาย 248px (ไอคอน+ชื่อ) / ย่อ 64px (ไอคอนอย่างเดียว)
 * ปุ่มบนสุดสลับย่อ/ขยาย · สถานะจำใน localStorage (design.md §5.8)
 */
export function LobbySidebar({ collapsed, onToggle }: Props) {
  const t = useT("nav");
  const tHome = useT("home");
  const tCommon = useT("common");
  const locale = useLocale();
  const pathname = usePathname();
  const [themeOpen, setThemeOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const themeMounted = useLazyOverlayMount(themeOpen);
  const langMounted = useLazyOverlayMount(langOpen);

  const labelOf = (item: SidebarItem) =>
    item.ns === "home" ? tHome(item.key as "categories.home") : t(item.key as "menu.promotions");

  const renderItem = (item: SidebarItem) => {
    const active = isActivePath(pathname, item.href);
    const label = labelOf(item);
    const Icon = item.icon;
    return (
      <li key={item.id}>
        <Link
          href={item.href}
          className={`${styles.link} ${active ? styles.linkActive : ""}`}
          aria-current={active ? "page" : undefined}
          title={label}
        >
          <Icon className={styles.icon} aria-hidden="true" />
          <span className={styles.label}>{label}</span>
        </Link>
      </li>
    );
  };

  const toggleLabel = collapsed ? t("header.showSidebar") : t("header.hideSidebar");
  const ToggleIcon = collapsed ? PanelLeftOpen : PanelLeftClose;

  return (
    <aside
      className={`${styles.aside} ${collapsed ? styles.asideCollapsed : ""}`}
      aria-label={t("desktop.sidebar")}
    >
      <button
        type="button"
        className={styles.toggle}
        onClick={onToggle}
        aria-expanded={!collapsed}
        aria-label={toggleLabel}
        title={toggleLabel}
      >
        <ToggleIcon className={styles.icon} aria-hidden="true" />
        <span className={styles.label}>{t("desktop.gameCategories")}</span>
      </button>

      <nav className={styles.nav} aria-label={t("desktop.gameCategories")}>
        <ul className={styles.list}>{GAME_ITEMS.map(renderItem)}</ul>
        <ul className={`${styles.list} ${styles.group}`}>{PROMO_ITEMS.map(renderItem)}</ul>
      </nav>

      <div className={styles.bottom}>
        <button
          type="button"
          className={styles.link}
          onClick={() => setThemeOpen(true)}
          title={tCommon("theme.fab")}
        >
          <Palette className={styles.icon} aria-hidden="true" />
          <span className={styles.label}>{tCommon("theme.fab")}</span>
        </button>
        <button
          type="button"
          className={styles.link}
          onClick={() => setLangOpen(true)}
          aria-label={tCommon("languagePicker.title")}
          title={tCommon("languagePicker.title")}
        >
          <span className={styles.icon} aria-hidden="true">
            <LocaleFlag locale={locale} className="h-[22px] w-[22px]" />
          </span>
          <span className={styles.label}>{LOCALE_LABELS[locale].short}</span>
        </button>
      </div>

      {themeMounted ? <ThemePickerSheet isOpen={themeOpen} onClose={() => setThemeOpen(false)} /> : null}
      {langMounted ? <LanguagePickerSheet isOpen={langOpen} onClose={() => setLangOpen(false)} /> : null}
    </aside>
  );
}
