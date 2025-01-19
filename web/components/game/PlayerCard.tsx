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
  const getRarityDisplay = (rarity: string) => {
    return rarity.charAt(0).toUpperCase() + rarity.slice(1);
  };

  const getBorderStyles = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "border-4 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.5)]";
      case "epic":
        return "border-4 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]";
      case "rare":
        return "border-4 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]";
      default:
        return "border-4 border-gray-500";
    }
  };

  return (
    <div
      className={`relative w-36 h-52 transform transition-all duration-300 hover:scale-105 
        ${isSelected ? "scale-110 z-20" : "z-10"}
        ${isOpponent ? "opponent-card" : ""}`}
      onClick={() => onSelect(card)}
    >
      <div
        className={`absolute inset-0 rounded-lg ${getBorderStyles(card.rarity)} 
          bg-gray-800 overflow-hidden`}
      >
        <div className="relative z-10 h-full p-3 flex flex-col">
          <div
            className={`absolute -top-0.5 -right-0.5 px-2 py-0.5 text-[10px] font-pixel rounded-bl-lg rounded-tr-lg ${
              card.rarity === "legendary"
                ? "bg-yellow-500 text-black"
                : card.rarity === "epic"
                ? "bg-purple-500 text-white"
                : card.rarity === "rare"
                ? "bg-blue-500 text-white"
                : "bg-gray-500 text-white"
            }`}
          >
            {getRarityDisplay(card.rarity)}
          </div>

          <div className="player-image-container mb-2">
            <div className="player-image bg-gray-700 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                <img src={`/teams/${card.team}.png`} alt={card.name} />
              </span>
            </div>
          </div>

          <div className="text-center flex-1 flex flex-col">
            <h3 className="font-pixel text-sm text-white mb-2 truncate">
              {card.name}
            </h3>

            <div className="stats grid grid-cols-3 gap-1 text-xs mb-2">
              <div className="stat bg-red-900/30 rounded p-1">
                <span className="text-red-400 block">ATK</span>
                <span className="text-white">{card.attack}</span>
              </div>
              <div className="stat bg-blue-900/30 rounded p-1">
                <span className="text-blue-400 block">CTL</span>
                <span className="text-white">{card.control}</span>
              </div>
              <div className="stat bg-green-900/30 rounded p-1">
                <span className="text-green-400 block">DEF</span>
                <span className="text-white">{card.defense}</span>
              </div>
            </div>

            {card.specialAbility && !isOpponent && (
              <div className="mt-auto">
                <div className="bg-yellow-500/10 p-1 rounded">
                  <p className="text-[10px] font-pixel text-yellow-400 line-clamp-2 break-words">
                    {card.specialAbility.name}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
