"use client";

import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import Link from "@/lib/i18n/navigation";
import { useT } from "@/lib/i18n/I18nProvider";

type LogoItem = { id: string; name: string; logoSrc: string; href: string };

const logo = (file: string) => `/provider%20logo/${file}`;

/** โลโก้ค่ายจาก public/provider logo — กดแล้วไปหน้าสล็อต */
const PROVIDER_LOGOS: LogoItem[] = [
  { id: "pg-soft", name: "PG Soft", logoSrc: logo("logo-horizontal-dark-smm-pg-soft.webp"), href: "/slots" },
  { id: "pp", name: "Pragmatic Play", logoSrc: logo("pp.webp"), href: "/slots" },
  { id: "jili", name: "JILI", logoSrc: logo("logo-horizontal-dark-wt-jili.webp"), href: "/slots" },
  { id: "joker", name: "Joker", logoSrc: logo("logo-horizontal-dark-wt-joker.webp"), href: "/slots" },
  { id: "habanero", name: "Habanero", logoSrc: logo("logo-horizontal-dark-wt-habanero.webp"), href: "/slots" },
  { id: "cq9", name: "CQ9", logoSrc: logo("logo-horizontal-dark-wt-cq9.webp"), href: "/slots" },
  { id: "evoplay", name: "Evoplay", logoSrc: logo("logo-horizontal-dark-wt-evo-play.webp"), href: "/slots" },
  { id: "red-tiger", name: "Red Tiger", logoSrc: logo("logo-horizontal-dark-wt-red-tiger.webp"), href: "/slots" },
  { id: "netent", name: "NetEnt", logoSrc: logo("logo-horizontal-dark-wt-netent-slot.webp"), href: "/slots" },
  { id: "rich88", name: "Rich88", logoSrc: logo("logo-horizontal-dark-wt-rich88.webp"), href: "/slots" },
  { id: "fa-chai", name: "Fa Chai", logoSrc: logo("logo-horizontal-dark-wt-fa-chai.webp"), href: "/slots" },
  { id: "kalamba", name: "Kalamba", logoSrc: logo("logo-horizontal-dark-wt-kalamba.webp"), href: "/slots" },
];

/**
 * แถวโลโก้ค่ายเลื่อนอัตโนมัติ — พอร์ตจาก glass ProviderLogoMarquee
 * grayscale ปกติ · hover โลโก้ขาว · หยุดเลื่อนเมื่อ hover (CSS ใน styles/motion-glass.css)
 */
export function ProviderLogoMarquee() {
  const t = useT("home");

  const renderGroup = (groupKey: string, ariaHidden?: boolean) => (
    <div
      className="provider-logo-marquee__group flex shrink-0 items-center gap-[clamp(0.75rem,2vw,1.25rem)] px-[clamp(0.375rem,1vw,0.75rem)]"
      aria-hidden={ariaHidden || undefined}
    >
      {PROVIDER_LOGOS.map((item) => (
        <Link
          key={`${groupKey}-${item.id}`}
          href={item.href}
          className="provider-logo-marquee__link flex h-14 w-[clamp(7rem,13vw,9.5rem)] shrink-0 items-center justify-center rounded-[var(--ui-radius-tile)] border border-[var(--ui-stroke)] bg-[var(--ui-gray)] px-3"
          aria-label={t("providers.logoAriaLabel", { name: item.name })}
          tabIndex={ariaHidden ? -1 : undefined}
        >
          <Image
            src={item.logoSrc}
            alt=""
            width={152}
            height={40}
            unoptimized
            className="provider-logo-marquee__img h-full w-auto max-w-full object-contain"
          />
        </Link>
      ))}
    </div>
  );

  return (
    <section className="motion-reveal flex w-full min-w-0 max-w-full flex-col gap-2.5 overflow-hidden" aria-label={t("providers.marqueeAriaLabel")}>
      <SectionHeader title="ค่ายเกม" icon="/assets/3d/menuicon/information.avif" />
      <div className="provider-logo-marquee relative w-full overflow-hidden">
        <div className="provider-logo-marquee__track flex">
          {renderGroup("a")}
          {renderGroup("b", true)}
        </div>
      </div>
    </section>
  );
}
