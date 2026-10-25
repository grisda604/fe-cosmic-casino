/**
 * หมวดเกมของ lobby — ลำดับเมนูมาตรฐาน (ใช้ตรงกันทั้งแถบเมนูใต้ header และ sidebar):
 * หน้าหลัก · คาสิโน · สล็อต · ยิงปลา · กีฬา · หวย · เกมไพ่
 */
export type LobbyCategoryKey = "home" | "casino" | "slots" | "fishing" | "sports" | "lottery" | "cards";

export const LOBBY_CATEGORIES: {
  key: LobbyCategoryKey;
  label: string;
  icon: string;
  href: string;
}[] = [
  { key: "home", label: "หน้าหลัก", icon: "/menu-icon/home.webp", href: "/" },
  { key: "casino", label: "คาสิโน", icon: "/menu-icon/casino.webp", href: "/casino" },
  { key: "slots", label: "สล็อต", icon: "/menu-icon/slot.webp", href: "/slots" },
  { key: "fishing", label: "ยิงปลา", icon: "/menu-icon/fish.webp", href: "/fishing" },
  { key: "sports", label: "กีฬา", icon: "/menu-icon/sport.webp", href: "/sport" },
  { key: "lottery", label: "หวย", icon: "/menu-icon/lotto.webp", href: "/lottery" },
  { key: "cards", label: "เกมไพ่", icon: "/menu-icon/card.webp", href: "/cards" },
];

/** หมวดที่ active จาก pathname — "/" (หน้าแรก) = หน้าหลัก · path ยาวก่อน */
export function resolveLobbyCategory(pathname: string): LobbyCategoryKey {
  for (const c of LOBBY_CATEGORIES) {
    if (c.href === "/") continue;
    if (pathname === c.href || pathname.startsWith(`${c.href}/`)) return c.key;
  }
  return "home";
}
