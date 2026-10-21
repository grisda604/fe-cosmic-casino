import type { LobbyGameItem } from "@/lib/lotto/load-lobby-games";
import { LobbyGameCard } from "./LobbyGameCard";
import { LottoCarouselSlide, LottoPeekCarousel } from "./LottoPeekCarousel";

type Props = {
  items: LobbyGameItem[];
};

/**
 * เกมยอดนิยม — carousel แถวเดียว (เหมือนแถวเกมอื่น): desktop เห็น 4–6 ใบเต็มตามความกว้างแถว + ใบถัดไปโผล่ครึ่งใบ
 * การ์ดมีแถบ "ผู้เล่นออนไลน์" (mock สุ่มทุก 3 วิ) · ประกอบจากเกมที่โหลดแล้ว ไม่มีข้อมูลใหม่ (design.md §5.7)
 */
export function TrendingGames({ items }: Props) {
  if (items.length === 0) return null;
  return (
    <section className="motion-reveal" aria-label="เกมยอดนิยม">
      <LottoPeekCarousel
        ariaLabel="เกมยอดนิยม"
        mode="7grid"
        heading={{ title: "เกมยอดนิยม", icon: "/assets/3d/menuicon/rank.avif", viewAllHref: "/casino" }}
      >
        {items.map((item, index) => (
          <LottoCarouselSlide key={item.id}>
            <LobbyGameCard item={item} index={index} variant="wide" layout="carousel" online />
          </LottoCarouselSlide>
        ))}
      </LottoPeekCarousel>
    </section>
  );
}
