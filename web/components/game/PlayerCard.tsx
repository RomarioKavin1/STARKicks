import { getRarityClass } from "@/lib/gameUtils";
import { Card } from "@/types/game";

interface PlayerCardProps {
  card: Card;
  onSelect: (card: Card) => void;
  isSelected: boolean;
  isOpponent: boolean;
}
export function PlayerCard({
  card,
  onSelect,
  isSelected,
  isOpponent,
}: PlayerCardProps) {
  return (
    <div
      className={`player-card relative transition-all duration-300 hover:z-10
        ${getRarityClass(card.rarity)}
        ${isSelected ? "scale-110 z-20" : ""}
        ${isOpponent ? "opponent-card" : "player-card-hover"}
      `}
      onClick={() => onSelect(card)}
    >
      <div className={`absolute inset-0 card-glow ${card.rarity}`} />

      {/* Card Content */}
      <div className="relative z-10 p-3 h-full flex flex-col">
        {/* Player Image */}
        <div className="player-image-container mb-2">
          <div className="player-image bg-gray-700 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
            <span className="text-2xl font-bold">{card.name[0]}</span>
          </div>
        </div>

        {/* Card Info */}
        <div className="text-center">
          <h3 className="font-pixel text-sm text-white mb-2 truncate">
            {card.name}
          </h3>

          <div className="stats grid grid-cols-3 gap-1 text-xs mb-2">
            <div className="stat">
              <span className="text-red-400">ATK</span>
              <span className="block">{card.attack}</span>
            </div>
            <div className="stat">
              <span className="text-blue-400">CTL</span>
              <span className="block">{card.control}</span>
            </div>
            <div className="stat">
              <span className="text-green-400">DEF</span>
              <span className="block">{card.defense}</span>
            </div>
          </div>

          {card.specialAbility && !isOpponent && (
            <div className="special-move mt-1">
              <span className="text-[10px] font-pixel text-yellow-400 block special-pulse">
                {card.specialAbility.name}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
