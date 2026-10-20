import { SectionHeader } from "@/components/ui/SectionHeader";
import type { LobbyGameItem } from "@/lib/lotto/load-lobby-games";
import { LobbyGameCard } from "./LobbyGameCard";
import styles from "./trending-games.module.css";

type Props = {
  items: LobbyGameItem[];
};

/**
 * เกมยอดนิยม — กริดการ์ดเกม 2 แถว (desktop 5 คอลัมน์ · มือถือ 3 คอลัมน์)
 * รวมจากรายการเกมที่โหลดไว้แล้ว (ไม่มีข้อมูลใหม่) · ไอคอนหัว = menuicon/rank (design.md §5.5)
 */
export function TrendingGames({ items }: Props) {
  if (items.length === 0) return null;
  return (
    <section className="motion-reveal flex flex-col gap-2.5" aria-label="เกมยอดนิยม">
      <SectionHeader title="เกมยอดนิยม" icon="/assets/3d/menuicon/rank.avif" viewAllHref="/casino" />
      <div className={styles.grid}>
        {items.map((item, index) => (
          <LobbyGameCard key={item.id} item={item} index={index} variant="wide" layout="grid" online />
        ))}
      </div>
    </section>
  );
}
