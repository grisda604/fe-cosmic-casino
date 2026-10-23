"use client";

import type { CSSProperties } from "react";
import type { VipRankId } from "@/types/vip";
import { getVipRankImageSrc, getVipRankTier } from "@/data/vipMockData";
import { Lock as LockIcon } from "lucide-react";
import s from "./vip-emblem.module.css";

/** อนุภาค stardust (ค่าคงที่ — ห้ามสุ่มตอน render กัน hydration ไม่ตรง) · x = ตำแหน่งแนวนอน %, d = delay วิ, t = ระยะเวลา วิ, z = ขนาด px */
const DUST = [
  { x: 18, d: 0, t: 5.2, z: 3 },
  { x: 32, d: 1.4, t: 6.1, z: 2 },
  { x: 46, d: 2.6, t: 5.6, z: 4 },
  { x: 58, d: 0.8, t: 6.8, z: 2 },
  { x: 70, d: 3.2, t: 5.4, z: 3 },
  { x: 82, d: 1.9, t: 6.4, z: 2 },
  { x: 25, d: 4.1, t: 5.9, z: 2 },
  { x: 40, d: 3.6, t: 7.0, z: 3 },
  { x: 64, d: 4.6, t: 6.2, z: 4 },
  { x: 76, d: 0.4, t: 5.8, z: 2 },
  { x: 52, d: 5.2, t: 6.6, z: 3 },
  { x: 12, d: 2.2, t: 6.9, z: 2 },
  { x: 88, d: 3.9, t: 5.5, z: 3 },
  { x: 36, d: 5.8, t: 7.2, z: 2 },
] as const;

/**
 * ตราแรงค์ VIP — รูปนิ่ง (public/rank/still) + แสง glow ด้านหลัง + stardust ลอยขึ้นแล้วเลือนหาย
 * glow/stardust แสดงเฉพาะตราใหญ่ที่ active (lg ขึ้นไป) · prefers-reduced-motion = ไม่ขยับ
 * ใช้ใน modal แท็บระดับของฉัน / แร็งค์ / ตารางสิทธิประโยชน์
 */
export function VipRankEmblem({
  rankId,
  size = "lg",
  inactive = false,
  /** false = ไม่เล่นอนิเมชัน stardust (carousel ข้างๆ / ตารางสิทธิ) */
  playing = true,
}: {
  rankId: VipRankId;
  size?: "xs" | "sm" | "lg" | "xl" | "2xl";
  inactive?: boolean;
  playing?: boolean;
}) {
  const tier = getVipRankTier(rankId);
  const src = getVipRankImageSrc(rankId);

  const dim =
    size === "2xl"
      ? "h-40 w-40 sm:h-52 sm:w-52"
      : size === "xl"
        ? "h-32 w-32 sm:h-36 sm:w-36"
        : size === "lg"
          ? "h-[88px] w-[88px]"
          : size === "sm"
            ? "h-12 w-12"
            : "h-8 w-8";
  const lockLg = size === "xl" || size === "lg";
  const fx = !inactive && size !== "xs" && size !== "sm";
  const dust = fx && playing && (size === "xl" || size === "2xl");

  return (
    <div
      className={`${s.root} relative flex ${dim} items-center justify-center ${inactive ? "opacity-45 grayscale-[0.85]" : ""}`}
      style={{ "--emblem-accent": tier.accent } as CSSProperties}
      aria-hidden="true"
    >
      {fx ? <span className={s.glow} /> : null}
      {dust ? (
        <span className={s.dustLayer}>
          {DUST.map((p, i) => (
            <i
              key={i}
              className={s.dust}
              style={{ left: `${p.x}%`, width: p.z, height: p.z, animationDelay: `${p.d}s`, animationDuration: `${p.t}s` }}
            />
          ))}
        </span>
      ) : null}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" draggable={false} className="relative z-[1] h-full w-full object-contain" />
      {inactive && lockLg && (
        <span className="absolute inset-0 z-[2] flex items-center justify-center">
          <LockIcon className={`text-[var(--text-muted)] ${size === "xl" ? "h-7 w-7" : "h-5 w-5"}`} />
        </span>
      )}
    </div>
  );
}
