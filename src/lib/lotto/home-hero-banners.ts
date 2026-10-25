/** อัตราส่วนต้นฉบับ HomeProBanner (Mbanner-1.avif 1916×821) */
export const HOME_HERO_BANNER_ASPECT = {
  width: 1916,
  height: 821,
} as const;

/** สไลด์แบนเนอร์หน้าแรก — public/HomeProBanner */
export type HomeHeroBannerSlide = {
  id: string;
  src: string;
  /** ไฟล์ขนาดเล็ก (960px) สำหรับจอ < 768px — ลดไบต์ที่กิน LCP บนมือถือ */
  mobileSrc: string;
  alt: string;
};

export const HOME_HERO_BANNER_SLIDES: HomeHeroBannerSlide[] = [
  {
    id: "home-pro-mbanner-1",
    src: "/HomeProBanner/Mbanner-1.avif",
    mobileSrc: "/HomeProBanner/Mbanner-1-m.avif",
    alt: "Phantom — แพลตฟอร์มหวยออนไลน์",
  },
  {
    id: "home-pro-mbanner-2",
    src: "/HomeProBanner/Mbanner-2.avif",
    mobileSrc: "/HomeProBanner/Mbanner-2-m.avif",
    alt: "Phantom — โปรโมชัน",
  },
];
