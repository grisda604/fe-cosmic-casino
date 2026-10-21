import Image from "next/image";
import { Trophy } from "lucide-react";
import { topCasinoLeaders, type CasinoTopLeader } from "@/lib/lotto/mock-casino-winners";
import showcase from "./showcase.module.css";
import styles from "./top-leaders.module.css";

const RANK_CLASS: Record<number, string> = {
  1: styles.rank1,
  2: styles.rank2,
  3: styles.rank3,
};

function formatPrize(value: number): string {
  return `฿${value.toLocaleString("en-US")}`;
}

function LeaderCard({ item }: { item: CasinoTopLeader }) {
  return (
    <article className={`motion-lift ${styles.card} ${RANK_CLASS[item.rank] ?? ""}`}>
      <div className={styles.avatarWrap}>
        <span className={styles.laurel} aria-hidden />
        <span className={styles.avatarRing}>
          <Image src={`/Avartar/${item.avatar}.webp`} alt="" width={56} height={56} className={styles.avatar} unoptimized />
        </span>
        <span className={styles.ribbon}>{item.rank}</span>
      </div>
      <p className={styles.prize}>{formatPrize(item.prize)}</p>
      <p className={styles.name}>{item.name}</p>
      <div className={styles.meta}>
        <span className={styles.metaItem}>
          <span className={styles.metaLabel}>ประเภทเกม</span>
          <span className={styles.metaGame}>{item.gameType}</span>
        </span>
        <span className={styles.metaItem}>
          <span className={styles.metaLabel}>ค่ายเกม</span>
          <span className={styles.metaValue}>{item.provider.name}</span>
        </span>
      </div>
    </article>
  );
}

/** ผู้ชนะรางวัลสูงสุด 5 อันดับจากการเล่นคาสิโน (mock) — ก่อน section ผู้โชคดี */
export function TopLeadersSection() {
  const leaders = topCasinoLeaders(5);
  return (
    <section className={`${showcase.section} motion-reveal`} aria-label="ผู้ชนะสูงสุด">
      <div className={showcase.header}>
        <div className={showcase.headerLeft}>
          <Trophy className={styles.headIcon} strokeWidth={1.75} aria-hidden />
          <div>
            <h2 className={showcase.title}>ผู้ชนะสูงสุด</h2>
            <p className={styles.subtitle}>อัปเดตทุกวัน เล่นคาสิโนแล้วขึ้นอันดับ 1!</p>
          </div>
        </div>
      </div>
      <div className={styles.grid}>
        {leaders.map((item) => (
          <LeaderCard key={item.rank} item={item} />
        ))}
      </div>
    </section>
  );
}
