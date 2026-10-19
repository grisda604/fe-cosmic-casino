import { HomeScreenShortcutPromo } from "@/components/features/home/HomeScreenShortcutPromo";
import { LottoHomePage } from "@/components/features/home/LottoHomePage";

/** หน้าแรก — / (เปลือกอยู่ใน (tabs)/layout.tsx) */
export default function Home() {
  return (
    <>
      <LottoHomePage />
      <HomeScreenShortcutPromo className="lg:hidden" />
    </>
  );
}
