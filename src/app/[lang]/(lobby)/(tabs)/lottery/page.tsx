import { LotteryHubPage } from "@/components/features/lottery/hub/LotteryHubPage";
import { fetchLotteryHub } from "@/lib/api/lotteryContent";

/**
 * หมวดหวย — ใช้เปลือก lobby เดียวกับหมวดเกมอื่น (แถบเมนูใต้ header · sidebar · rail ขวา) + hero ชื่อหมวดกลางจอ
 * ดึงข้อมูล hub ฝั่ง server แล้วส่งลงไป — การ์ด/ผลหวยอยู่ใน HTML แรก ไม่ต้องรอ hydrate + fetch ฝั่ง client (LCP)
 */
export default async function LotteryCategoryRoutePage() {
  const res = await fetchLotteryHub();
  return <LotteryHubPage hub={res.ok ? res.data : undefined} />;
}
