"use client";

import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import styles from "./lotto-carousel.module.css";

type Props = {
  children: ReactNode;
  ariaLabel: string;
  mode?: "2peek" | "4peek" | "7grid";
  compact?: boolean;
  /** มี heading = หัว section มาตรฐาน + ลูกศรเลื่อนอยู่ในหัว (ไม่มี = ลูกศรลอยขอบแถว แบบเดิม) */
  heading?: { title: string; icon?: string; viewAllHref?: string; id?: string };
};

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d={dir === "left" ? "M10 3L5 8L10 13" : "M6 3L11 8L6 13"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LottoPeekCarousel({
  children,
  ariaLabel,
  mode = "4peek",
  compact,
  heading,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const syncNav = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth - 2;
    setCanPrev(el.scrollLeft > 2);
    setCanNext(el.scrollLeft < max);
  }, []);

  useEffect(() => {
    syncNav();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", syncNav, { passive: true });
    const ro = new ResizeObserver(syncNav);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", syncNav);
      ro.disconnect();
    };
  }, [syncNav, children]);

  const scrollByPage = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const slide = el.querySelector<HTMLElement>(`.${styles.slide}`);
    const gap = 8;
    /* 7grid: เลื่อนทีละ "จำนวนใบที่เห็นเต็ม" ตามค่าที่ CSS คำนวณจริง (ปรับตามความกว้างแถว) */
    const cssVisible = Math.floor(parseFloat(getComputedStyle(el).getPropertyValue("--carousel-visible")) || 0);
    const page = mode === "7grid" ? Math.max(1, cssVisible || 3) : window.matchMedia("(min-width: 1024px)").matches ? 3 : mode === "2peek" ? 2 : 4;
    const step = slide
      ? slide.offsetWidth * page + gap * (page - 1)
      : el.clientWidth * 0.85;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const prevBtn = (
    <button
      type="button"
      className={`${styles.navBtn} ${heading ? styles.navInline : styles.navPrev}`}
      aria-label="เลื่อนไปทางซ้าย"
      disabled={!canPrev}
      onClick={() => scrollByPage(-1)}
    >
      <Chevron dir="left" />
    </button>
  );
  const nextBtn = (
    <button
      type="button"
      className={`${styles.navBtn} ${heading ? styles.navInline : styles.navNext}`}
      aria-label="เลื่อนไปทางขวา"
      disabled={!canNext}
      onClick={() => scrollByPage(1)}
    >
      <Chevron dir="right" />
    </button>
  );

  return (
    <div className={`${styles.carouselWrap} ${heading ? styles.carouselWithHead : ""}`}>
      {heading ? (
        <SectionHeader
          title={heading.title}
          icon={heading.icon}
          viewAllHref={heading.viewAllHref}
          headingId={heading.id}
          nav={
            <>
              {prevBtn}
              {nextBtn}
            </>
          }
        />
      ) : (
        prevBtn
      )}
      <div
        ref={trackRef}
        className={`${styles.track} ${compact ? styles.trackCompact : ""} ${mode === "2peek" ? styles.trackMode2Peek : ""} ${mode === "7grid" ? styles.trackMode7Grid : ""}`}
        data-count={Children.count(children)}
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
      >
        {children}
      </div>
      {heading ? null : nextBtn}
    </div>
  );
}

export function LottoCarouselSlide({
  children,
  variant = "default",
}: {
  children: ReactNode;
  variant?: "default" | "thai";
}) {
  return (
    <div
      className={`${styles.slide} ${variant === "thai" ? styles.slideThai : ""}`}
    >
      {children}
    </div>
  );
}
