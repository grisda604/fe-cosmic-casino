import { AppShell } from "@/components/layout/AppShell";

import { GameLobby } from "./GameLobby";
import { HeroCarousel } from "./HeroCarousel";
import { PopularRooms } from "./PopularRooms";
import { PromoGrid } from "./PromoGrid";
import { SearchGameInput } from "./SearchGameInput";

export function HomePage() {
  return (
    <AppShell>
      <HeroCarousel />
      <PromoGrid />
      <PopularRooms />
      <SearchGameInput />
      <GameLobby />
    </AppShell>
  );
}
