"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Clover } from "lucide-react";
import { initialCasinoWinners, nextCasinoWinner, type CasinoWinnerItem } from "@/lib/lotto/mock-casino-winners";
import showcase from "./showcase.module.css";
import styles from "./hall-of-fame.module.css";

const ROW_COUNT = 6;
/** มีผู้โชคดีรายใหม่ (สุ่ม) เข้ามาแทนที่รายเก่าสุดทุก ๆ กี่ ms */
const FEED_TICK_MS = 5000;

/**
 * ผู้โชคดี — ผู้ถูกรางวัลจากการเล่นคาสิโนล่าสุด (mock สุ่ม) เป็นแถว live feed · ใต้ section ผู้ชนะสูงสุด
 * ต่อแถว: โปรไฟล์ผู้เล่น · ประเภทเกม · ค่ายเกม (ชื่อเท่านั้น ไม่มีรูป) · จำนวนรางวัลที่ได้
 */
export function HallOfFameSection() {
  /* รายการเริ่มต้นคงที่ (ตรงกับ server) แล้วค่อยสุ่มรายใหม่ทุก FEED_TICK_MS ฝั่ง client */
  const [winners, setWinners] = useState<CasinoWinnerItem[]>(() => initialCasinoWinners(ROW_COUNT));
  const sequence = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      sequence.current += 1;
      const next = nextCasinoWinner(sequence.current);
      setWinners((prev) => [next, ...prev].slice(0, ROW_COUNT));
    }, FEED_TICK_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={`${showcase.section} motion-reveal`} aria-label="ผู้โชคดี">
      <div className={showcase.header}>
        <div className={showcase.headerLeft}>
          <Clover className={styles.headIcon} strokeWidth={1.75} aria-hidden />
          <div>
            <h2 className={showcase.title}>ผู้โชคดี</h2>
            <p className={styles.subtitle}>ผู้โชคดีจากการเล่นคาสิโนล่าสุด</p>
          </div>
        </div>
      </div>

      <div className={styles.table} role="table" aria-label="ผู้โชคดีจากการเล่นคาสิโนล่าสุด">
        <div className={`${styles.row} ${styles.headRow}`} role="row">
          <span role="columnheader">ผู้เล่น</span>
          <span role="columnheader" className={styles.colType}>ประเภทเกม</span>
          <span role="columnheader" className={styles.colProvider}>ค่ายเกม</span>
          <span role="columnheader" className={styles.colPrize}>จำนวนรางวัลที่ได้</span>
        </div>
        {winners.map((item) => (
          <div key={item.id} className={styles.row} role="row">
            <span className={styles.player} role="cell">
              <Image src={`/Avartar/${item.avatar}.webp`} alt="" width={32} height={32} className={styles.avatar} unoptimized />
              <span className={styles.name}>{item.name}</span>
            </span>
            <span className={`${styles.cell} ${styles.colType}`} role="cell">
              {item.gameType}
            </span>
            <span className={`${styles.cell} ${styles.colProvider}`} role="cell">
              {item.provider.name}
            </span>
            <span className={`${styles.prize} ${styles.colPrize}`} role="cell">
              ฿{item.prize.toLocaleString("en-US")}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
