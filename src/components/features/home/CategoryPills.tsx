"use client";

import Image from "next/image";
import Link, { usePathname } from "@/lib/i18n/navigation";
import { LOBBY_CATEGORIES, resolveLobbyCategory } from "./lobby-category";
import styles from "./category-pills.module.css";

/**
 * แถบ pill หมวดเกม (หวย · คาสิโน · สล็อต ...) — แถวเลื่อนข้างใต้แบนเนอร์
 * active = พื้นทองเต็ม ตัวหนังสือเข้ม · ที่เหลือ = พื้น surface + ขอบบาง (design.md §5.3)
 */
export function CategoryPills({ bar = false }: { bar?: boolean }) {
  const active = resolveLobbyCategory(usePathname());

  return (
    <nav className={`${styles.root} ${bar ? styles.bar : ""}`} aria-label="หมวดเกม">
      {LOBBY_CATEGORIES.map((item) => {
        const isActive = item.key === active;
        return (
          <Link
            key={item.key}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={`motion-press ${styles.pill} ${isActive ? styles.pillActive : ""}`}
          >
            <Image src={item.icon} alt="" width={30} height={30} unoptimized className={styles.icon} aria-hidden />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
