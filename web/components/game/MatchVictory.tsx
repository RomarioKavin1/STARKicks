import React, { useEffect, useState } from "react";

interface MatchVictoryProps {
  winner: "player" | "opponent";
  score: [number, number]; // [playerScore, opponentScore]
  onComplete: () => void;
}

export const MatchVictory = ({
  winner,
  score,
  onComplete,
}: MatchVictoryProps) => {
  const [sparks, setSparks] = useState<
    Array<{ id: number; left: number; top: number; delay: number }>
  >([]);

  useEffect(() => {
    // Create sparks
    const newSparks = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setSparks(newSparks);

    // Complete after animation
    const timer = setTimeout(onComplete, 5000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="match-victory">
      {/* Victory Text */}
      <div className="text-center">
        <h1 className="victory-text mb-8">
          {winner === "player" ? "VICTORY!" : "GAME OVER"}
        </h1>

        <div className="text-4xl font-pixel mb-8">
          <span className="text-yellow-400">{score[0]}</span>
          <span className="text-white mx-4">-</span>
          <span className="text-red-400">{score[1]}</span>
        </div>

        <div className="text-2xl font-pixel text-gray-400">
          {winner === "player"
            ? "You are the champion!"
            : "Better luck next time!"}
        </div>
      </div>

      {/* Celebration Sparks */}
      <div className="winner-sparks">
        {sparks.map((spark) => (
          <div
            key={spark.id}
            className="spark"
            style={{
              left: `${spark.left}%`,
              top: `${spark.top}%`,
              animationDelay: `${spark.delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
