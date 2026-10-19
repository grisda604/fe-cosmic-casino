type IconProps = { className?: string };

/** ให้ตรงกับ preflight/CSS ของ Nuxt+Tailwind (`svg { display: block }`) เมื่อมี SSR */
const SVG_ICON_STYLE = { display: "block" } as const;

export function IconCoinGold({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg style={SVG_ICON_STYLE} className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" fill="#e6c260" stroke="#b7832f" strokeWidth="1.2" />
      <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="800" fill="#171717">
        $
      </text>
    </svg>
  );
}

export function IconCoinChip({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg style={SVG_ICON_STYLE} className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" fill="#c62828" stroke="#8b1a1a" strokeWidth="1.2" />
      <circle cx="12" cy="12" r="4" fill="#fff" opacity="0.35" />
    </svg>
  );
}

export function IconSwap({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg style={SVG_ICON_STYLE} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M7 7h11l-3-3M17 17H6l3 3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconMail({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg style={SVG_ICON_STYLE} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function IconSearch({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg style={SVG_ICON_STYLE} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3-3" strokeLinecap="round" />
    </svg>
  );
}

export function IconMore({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg style={SVG_ICON_STYLE} className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <circle cx="5" cy="12" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="19" cy="12" r="1.8" />
    </svg>
  );
}

export function IconSpeaker({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg style={SVG_ICON_STYLE} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M11 5 6 9H3v6h3l5 4V5z" />
      <path d="M16 8a5 5 0 0 1 0 8M19 5a9 9 0 0 1 0 14" strokeLinecap="round" />
    </svg>
  );
}

export function IconChevronRight({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg style={SVG_ICON_STYLE} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconCrown({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg style={SVG_ICON_STYLE} className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3 18h18v2H3v-2zm2.5-8 3.2 3.5L12 6l3.3 7.5 3.2-3.5L21 16H3l2.5-6z" />
    </svg>
  );
}

export function IconHeart({ className = "h-4 w-4", filled }: IconProps & { filled?: boolean }) {
  return (
    <svg style={SVG_ICON_STYLE} className={className} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.5-7 10-7 10z" />
    </svg>
  );
}

export function IconHome({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg style={SVG_ICON_STYLE} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5z" />
    </svg>
  );
}

export function IconGamepad({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg style={SVG_ICON_STYLE} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="8" width="18" height="8" rx="4" />
      <path d="M8 12v3M6.5 13.5h3M16 13h3M17.5 11.5v3" strokeLinecap="round" />
    </svg>
  );
}

export function IconMegaphone({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg style={SVG_ICON_STYLE} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M4 10v4h4l5 4V6L8 10H4z" />
      <path d="M16 8a4 4 0 0 1 0 8" />
    </svg>
  );
}

export function IconUser({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg style={SVG_ICON_STYLE} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c1.5-3.5 4-5 7-5s5.5 1.5 7 5" />
    </svg>
  );
}

export function IconHeadset({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg style={SVG_ICON_STYLE} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <rect x="3" y="14" width="4" height="6" rx="2" />
      <rect x="17" y="14" width="4" height="6" rx="2" />
    </svg>
  );
}

export function IconDeposit({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg style={SVG_ICON_STYLE} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 3v12M8 11l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="4" y="17" width="16" height="4" rx="1" />
    </svg>
  );
}

export function IconWithdraw({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg style={SVG_ICON_STYLE} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M7 12h10" strokeLinecap="round" />
    </svg>
  );
}

export function IconBitcoin({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg style={SVG_ICON_STYLE} className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14.5 10.2c.6-.3 1-.9 1-1.7 0-1.2-.9-2-2.4-2h-2v8h2.4c1.5 0 2.5-.8 2.5-2.1 0-.8-.4-1.4-1.5-1.8zm-1.5-2.7h1c.7 0 1.1.3 1.1.9s-.4.9-1.1.9h-1V7.5zm1.2 5.5h-1.2v-2h1.2c.8 0 1.3.4 1.3 1s-.5 1-1.3 1zM12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
    </svg>
  );
}
