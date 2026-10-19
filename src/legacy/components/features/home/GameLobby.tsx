"use client";

import { useState } from "react";

import { CATEGORIES, GAME_TABS, GAMES } from "./mock-data";
import { GameCard } from "./GameCard";

export function GameLobby() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeCategory, setActiveCategory] = useState("home");

  return (
    <section className="px-[var(--shell-pad-x)] pb-2" aria-label="ล็obby เกม">
      <div className="flex gap-2">
        <nav className="flex w-[76px] shrink-0 flex-col gap-1.5" aria-label="หมวดเกม">
          {CATEGORIES.map((cat) => {
            const active = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`flex min-h-[68px] flex-col items-center justify-center gap-1 rounded-[var(--radius-md)] border px-1 text-center text-[10px] font-bold leading-tight active:scale-[0.98] ${
                  active
                    ? "is-active-gold border-[#b7832f]"
                    : "surface-control text-[var(--text-secondary)]"
                }`}
              >
                <span className="text-[18px] leading-none" aria-hidden>
                  {cat.id === "home" ? "⌂" : cat.id === "casino" ? "♠" : "7"}
                </span>
                {cat.label}
              </button>
            );
          })}
        </nav>
        <div className="min-w-0 flex-1">
          <div className="surface-control mb-2 grid grid-cols-3 gap-0.5 rounded-[var(--radius-pill)] p-1">
            {GAME_TABS.map((tab, index) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(index)}
                className={`h-10 rounded-[var(--radius-pill)] text-[11px] font-bold ${
                  index === activeTab
                    ? "is-active-gold"
                    : "bg-transparent text-[var(--text-muted)]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {GAMES.map((game) => (
              <GameCard key={game.id} {...game} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
