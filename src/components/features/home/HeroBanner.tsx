"use client";

import Image from "next/image";
import { useMemo, useRef } from "react";
import {
  buildLoopedTrack,
  useInfiniteSnapCarousel,
} from "@/hooks/useInfiniteSnapCarousel";
import {
  HOME_HERO_BANNER_ASPECT,
  HOME_HERO_BANNER_SLIDES,
} from "@/lib/lotto/home-hero-banners";
import styles from "./hero-banner.module.css";

export function HeroBanner() {
  const slides = HOME_HERO_BANNER_SLIDES;
  const sectionRef = useRef<HTMLElement>(null);
  const trackItems = useMemo(() => buildLoopedTrack(slides), [slides]);

  const { scrollContainerRef, logicalIndex, loopEnabled, scrollToLogicalIndex, pauseFor } =
    useInfiniteSnapCarousel(slides.length);

  if (slides.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-label="แบนเนอร์โปรโมชัน"
      aria-roledescription="carousel"
    >
      <div
        ref={scrollContainerRef}
        className={styles.track}
        aria-live="polite"
      >
        {trackItems.map(({ item, key }, index) => (
          <div key={key} className={styles.slide}>
            <Image
              src={item.src}
              alt={item.alt}
              width={HOME_HERO_BANNER_ASPECT.width}
              height={HOME_HERO_BANNER_ASPECT.height}
              className={styles.image}
              sizes="(min-width: 1024px) 1280px, 100vw"
              priority={index <= 1}
              unoptimized={item.src.endsWith(".avif")}
            />
          </div>
        ))}
      </div>
      {slides.length > 1 ? (
        <div className={styles.arrows}>
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              className={styles.arrow}
              aria-label={dir === -1 ? "แบนเนอร์ก่อนหน้า" : "แบนเนอร์ถัดไป"}
              onClick={() => {
                pauseFor(12_000);
                scrollToLogicalIndex((logicalIndex + dir + slides.length) % slides.length);
              }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  d={dir === -1 ? "M10 3L5 8L10 13" : "M6 3L11 8L6 13"}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ))}
        </div>
      ) : null}
      {slides.length > 1 ? (
        <div className={styles.dots} role="tablist" aria-label="เลือกแบนเนอร์">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={logicalIndex === index}
              aria-label={`แบนเนอร์ ${index + 1}`}
              className={`${styles.dot} ${logicalIndex === index ? styles.dotActive : ""}`}
              onClick={() => {
                pauseFor(12_000);
                scrollToLogicalIndex(index);
              }}
            />
          ))}
        </div>
      ) : null}
      <span className="sr-only">
        {loopEnabled
          ? `สไลด์ ${logicalIndex + 1} จาก ${slides.length}`
          : null}
      </span>
    </section>
  );
}
