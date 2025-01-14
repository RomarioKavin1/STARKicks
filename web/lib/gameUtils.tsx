import { Rarity } from "@/types/game";

export const getRarityClass = (rarity: Rarity): string => {
  switch (rarity) {
    case "legendary":
      return "rarity-legendary";
    case "epic":
      return "rarity-epic";
    case "rare":
      return "rarity-rare";
    default:
      return "rarity-common";
  }
};
