import { loadCasinoShowcase, loadSlotShowcase, loadSportsShowcase } from "@/lib/lotto/load-lobby-games";
import { LottoHomeContent } from "./LottoHomeContent";

/** เนื้อหาหน้าแรก (เฉพาะส่วนที่เปลี่ยนตามแท็บ) — เปลือก header / sidebar / bottom nav อยู่ใน (tabs)/layout.tsx */
export async function LottoHomePage() {
  const [casino, slots, sports] = await Promise.all([
    loadCasinoShowcase(),
    loadSlotShowcase(),
    loadSportsShowcase(),
  ]);

  return <LottoHomeContent casino={casino} slots={slots} sports={sports} />;
}
