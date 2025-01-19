import React, { useEffect, useState } from "react";
import { Card } from "@/types/game";
import { PlayerCard } from "./PlayerCard";

interface VersusAnimationProps {
  attackingCard: Card;
  defendingCard: Card;
  isSpecialMove: boolean;
  onComplete: (winner: "player" | "opponent") => void;
}

export const VersusAnimation = ({
  attackingCard,
  defendingCard,
  isSpecialMove,
  onComplete,
}: VersusAnimationProps) => {
  const [showStats, setShowStats] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const [calculatedWinner, setCalculatedWinner] = useState<
    "player" | "opponent" | null
  >(null);

  // Calculate winner once when component mounts
  useEffect(() => {
    const calculateWinner = () => {
      // Base attack value
      const attackValue = isSpecialMove
        ? attackingCard.attack * 1.5
        : attackingCard.attack;

      const defenseValue = defendingCard.defense;

      // Control bonuses
      const attackerControlBonus = attackingCard.control / 100;
      const defenderControlBonus = defendingCard.control / 100;

      // Final values including control bonuses
      const finalAttackValue = attackValue * (1 + attackerControlBonus);
      const finalDefenseValue = defenseValue * (1 + defenderControlBonus);

      console.log("Attack calculation:", {
        baseAttack: attackValue,
        controlBonus: attackerControlBonus,
        finalAttack: finalAttackValue,
      });

      console.log("Defense calculation:", {
        baseDefense: defenseValue,
        controlBonus: defenderControlBonus,
        finalDefense: finalDefenseValue,
      });

      return finalAttackValue > finalDefenseValue ? "player" : "opponent";
    };

    const winner = calculateWinner();
    setCalculatedWinner(winner);
  }, [attackingCard, defendingCard, isSpecialMove]);

  // Handle animation sequence
  useEffect(() => {
    if (!calculatedWinner) return;

    const showStatsTimer = setTimeout(() => {
      setShowStats(true);
    }, 1000);

    const showWinnerTimer = setTimeout(() => {
      setShowWinner(true);
    }, 2000);

    const completeTimer = setTimeout(() => {
      onComplete(calculatedWinner);
    }, 3000);

    return () => {
      clearTimeout(showStatsTimer);
      clearTimeout(showWinnerTimer);
      clearTimeout(completeTimer);
    };
  }, [calculatedWinner, onComplete]);

  return (
    <div className="versus-container fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      <div className="flex items-center gap-16">
        {/* Attacking Card */}
        <div className="versus-left transform transition-all duration-500">
          <div className="scale-150">
            <PlayerCard
              card={attackingCard}
              onSelect={() => {}}
              isSelected={false}
              isOpponent={false}
            />
            {showStats && (
              <div className="mt-4">
                <div className="text-center text-yellow-400 font-pixel mb-2">
                  Attack Power
                </div>
                <div className="stats-bar bg-red-900/50 h-4 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500 transition-all duration-1000"
                    style={{
                      width: `${
                        isSpecialMove
                          ? attackingCard.attack * 1.5
                          : attackingCard.attack
                      }%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="versus-text text-8xl font-pixel text-yellow-400">
          VS
        </div>

        {/* Defending Card */}
        <div className="versus-right transform transition-all duration-500">
          <div className="scale-150">
            <PlayerCard
              card={defendingCard}
              onSelect={() => {}}
              isSelected={false}
              isOpponent={true}
            />
            {showStats && (
              <div className="mt-4">
                <div className="text-center text-blue-400 font-pixel mb-2">
                  Defense Power
                </div>
                <div className="stats-bar bg-blue-900/50 h-4 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-1000"
                    style={{ width: `${defendingCard.defense}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showWinner && calculatedWinner && (
        <div className="absolute bottom-20 left-0 right-0 text-center">
          <div className="winner-announcement text-4xl font-pixel">
            {calculatedWinner === "player" ? (
              <span className="text-yellow-400">ATTACK SUCCESSFUL!</span>
            ) : (
              <span className="text-red-400">DEFENSE HELD!</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
