import { HERO_IMAGE } from "./mock-data";

export function HeroCarousel() {
  return (
    <section className="px-[var(--shell-pad-x)]" aria-label="แบนเนอร์หลัก">
      <div className="relative aspect-[4/1] w-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--surface-3)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_IMAGE}
          alt="Welcome to Phantom Slot and Casino"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
        <div className="relative flex h-full flex-col justify-center px-4 py-3">
          <p className="m-0 max-w-[62%] text-[11px] font-bold uppercase leading-snug tracking-wide text-[var(--text-primary)] sm:text-xs">
            Welcome to Phantom
            <br />
            Slot &amp; Casino Online Platform
          </p>
          <button
            type="button"
            className="btn-gold mt-2 h-8 w-max min-h-0 px-4 text-[11px] font-extrabold uppercase tracking-wide"
          >
            Play Now
          </button>
        </div>
      </div>
    </section>
  );
}
