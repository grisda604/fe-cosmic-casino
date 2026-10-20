"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";

const TICK_MS = 3000;
const SPREAD = 120;

/**
 * จำนวนผู้เล่นออนไลน์ (mock) — เริ่มที่ค่าฐาน แล้วสุ่มใหม่ทุก 3 วินาทีในช่วง ±120 รอบค่าฐาน
 * ค่าเริ่มต้นตรงกับ server (ไม่สุ่มตอน render แรก) เพื่อไม่ให้ hydration mismatch
 */
export function LiveOnlineCount({ base, className }: { base: number; className?: string }) {
  const [count, setCount] = useState(base);

  useEffect(() => {
    /* เลื่อนจังหวะเริ่มแบบสุ่มเล็กน้อย ให้การ์ดต่างใบไม่เปลี่ยนเลขพร้อมกันหมด */
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        const next = base + Math.round((Math.random() * 2 - 1) * SPREAD);
        setCount(Math.max(50, next));
      }, TICK_MS);
    }, Math.random() * 1000);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [base]);

  return (
    <span className={className} aria-label="ผู้เล่นออนไลน์">
      <Users className="h-3.5 w-3.5" aria-hidden="true" />
      <span className="tabular-nums">{count.toLocaleString("en-US")}</span>
    </span>
  );
}
