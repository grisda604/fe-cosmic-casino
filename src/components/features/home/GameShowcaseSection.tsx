import { SectionHeader } from "@/components/ui/SectionHeader";
import type { LobbyGameItem } from "@/lib/lotto/load-lobby-games";
import { LobbyGameCard } from "./LobbyGameCard";
import {
  LottoCarouselSlide,
  LottoPeekCarousel,
} from "./LottoPeekCarousel";
import showcase from "./showcase.module.css";

type Props = {
  title: string;
  /** ไอคอน 3D ของหัว section (public/assets/3d/menuicon/*) */
  iconSrc: string;
  items: LobbyGameItem[];
  cardVariant?: "tall" | "wide";
  cardWidth?: string;
  /** carousel 7 ใบ + เลื่อนดูเพิ่ม */
  carousel?: boolean;
  showViewAll?: boolean;
  /** ปลายทางปุ่ม «ดูทั้งหมด» */
  viewAllHref?: string;
};

/** ปลายทางปุ่ม «ดูทั้งหมด» เริ่มต้นตามหัวข้อ section */
const DEFAULT_VIEW_ALL_HREF: Record<string, string> = {
  "คาสิโนออนไลน์": "/casino",
  "สล็อตออนไลน์": "/slots",
  "กีฬาออนไลน์": "/sport",
};

/** แถวเกมของ lobby — หัวมาตรฐาน (ไอคอน · ชื่อ · ดูทั้งหมด · ลูกศร) + แถวการ์ด (design.md §5.2, §5.5) */
export function GameShowcaseSection({
  title,
  iconSrc,
  items,
  cardVariant = "wide",
  cardWidth,
  carousel = false,
  showViewAll,
  viewAllHref,
}: Props) {
  if (items.length === 0) return null;
  const allHref = showViewAll ? (viewAllHref ?? DEFAULT_VIEW_ALL_HREF[title]) : undefined;

  if (carousel) {
    return (
      <section className="motion-reveal">
        <LottoPeekCarousel
          ariaLabel={title}
          mode="7grid"
          heading={{ title, icon: iconSrc, viewAllHref: allHref }}
        >
          {items.map((item, index) => (
            <LottoCarouselSlide key={item.id}>
              <LobbyGameCard index={index} item={item} variant={cardVariant} layout="carousel" />
            </LottoCarouselSlide>
          ))}
        </LottoPeekCarousel>
      </section>
    );
  }

  return (
    <section className="motion-reveal flex flex-col gap-2.5">
      <SectionHeader title={title} icon={iconSrc} viewAllHref={allHref} />
      <div className={showcase.track}>
        {items.map((item, index) => (
          <LobbyGameCard
            key={item.id}
            index={index}
            item={item}
            variant={cardVariant}
            width={cardWidth ?? "22%"}
          />
        ))}
      </div>
    </section>
  );
}
