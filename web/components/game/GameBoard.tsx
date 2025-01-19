import { useGame } from "@/contexts/GameContext";
import { Card, GameAction } from "@/types/game";
import { useEffect, useState } from "react";
import { PlayerCard } from "./PlayerCard";
import { VersusAnimation } from "./versusAnimation";
import { MatchVictory } from "./MatchVictory";
import { useRouter } from "next/navigation";

export function GameBoard() {
  const { state, dispatch } = useGame();
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [targetCard, setTargetCard] = useState<Card | null>(null);
  const [showMatchVictory, setShowMatchVictory] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (state.gameOver) {
      // Small delay before showing victory screen to ensure animations complete
      const timer = setTimeout(() => {
        setShowMatchVictory(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [state.gameOver]);

  const handleOpponentCardSelect = (card: Card) => {
    if (!selectedCard || state.currentTurn !== "player" || state.gameOver)
      return;
    setTargetCard(card);
  };

  const handleAction = (actionType: "ATTACK" | "SPECIAL") => {
    if (!selectedCard || !targetCard || state.gameOver) return;

    dispatch({
      type: actionType,
      card: selectedCard,
      target: targetCard,
    });

    setSelectedCard(null);
    setTargetCard(null);
  };
  const handleVersusComplete = (winner: "player" | "opponent") => {
    dispatch({ type: "RESOLVE_VERSUS", winner });
  };

  const handleMatchVictoryComplete = () => {
    setShowMatchVictory(false);
    router.push("/");
  };
  return (
    <div className="game-content h-full relative p-8">
      {/* Football Field Background */}
      <div className="football-field relative h-full w-full rounded-xl overflow-hidden flex">
        {/* Field Markings */}
        <div className="field-markings absolute inset-0">
          {/* Center Circle */}
          <div className="center-circle" />
          {/* Center Line */}
          <div className="center-line" />
          {/* Left Goal */}
          <div className="goal-area left-goal">
            <div className="penalty-box" />
            <div className="goal-post" />
          </div>
          {/* Right Goal */}
          <div className="goal-area right-goal">
            <div className="penalty-box" />
            <div className="goal-post" />
          </div>
          {/* Side Lines are part of the field background */}
        </div>
        <div className="absolute top-0 left-0 w-full h-2 bg-gray-800">
          <div
            className="h-full bg-yellow-500 transition-all duration-1000"
            style={{ width: `${(state.turnTimeLeft / 30) * 100}%` }}
          />
        </div>

        {/* Turn Indicator */}
        <div className="absolute top-4 left-4 font-pixel text-lg">
          {state.currentTurn === "player" ? (
            <span className="text-yellow-400">YOUR TURN</span>
          ) : (
            <span className="text-red-400">OPPONENT'S TURN</span>
          )}
          <span className="ml-4 text-white">
            {state.isAttackingTurn ? "(ATTACKING)" : "(DEFENDING)"}
          </span>
        </div>

        {/* Versus Animation */}
        {state.showVersusAnimation && state.versusCards && (
          <VersusAnimation
            attackingCard={state.versusCards.attacker}
            defendingCard={state.versusCards.defender}
            isSpecialMove={state.versusCards.isSpecial}
            onComplete={(winner) => {
              dispatch({ type: "RESOLVE_VERSUS", winner });
            }}
          />
        )}
        {/* Score Display */}
        <div
          className="score-bar absolute top-4 left-1/2 transform -translate-x-1/2 
             bg-gray-900/80 px-6 py-3 rounded-lg z-30"
        >
          <div className="flex items-center gap-8">
            <div className="score font-pixel text-2xl">
              <span className="text-red-400">{state.opponentScore}</span>
              <span className="text-white mx-3">-</span>
              <span className="text-yellow-400">{state.playerScore}</span>
            </div>
            <div className="energy font-pixel text-yellow-400">
              ENERGY {state.playerEnergy}
            </div>
          </div>
        </div>

        <div className="teams-container relative flex w-full">
          {/* Opponent's Team (Left Side) */}
          <div className="w-1/2 flex items-center justify-center">
            <div className="formation-grid">
              <div className="grid grid-cols-3 gap-x-12 relative">
                {/* First Column - Defender (near goal) */}
                <div className="col-start-1 flex items-center justify-center">
                  <PlayerCard
                    card={state.opponentCards[4]}
                    onSelect={handleOpponentCardSelect}
                    isSelected={targetCard?.id === state.opponentCards[4].id}
                    isOpponent={true}
                  />
                </div>

                {/* Middle Column - Midfielders */}
                <div className="col-start-2 space-y-8">
                  {state.opponentCards.slice(2, 4).map((card) => (
                    <PlayerCard
                      key={card.id}
                      card={card}
                      onSelect={handleOpponentCardSelect}
                      isSelected={targetCard?.id === card.id}
                      isOpponent={true}
                    />
                  ))}
                </div>

                {/* Last Column - Attackers */}
                <div className="col-start-3 space-y-8">
                  {state.opponentCards.slice(0, 2).map((card) => (
                    <PlayerCard
                      key={card.id}
                      card={card}
                      onSelect={handleOpponentCardSelect}
                      isSelected={targetCard?.id === card.id}
                      isOpponent={true}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right side remains the same */}
          <div className="w-1/2 flex items-center justify-center">
            <div className="formation-grid">
              <div className="grid grid-cols-3 gap-x-12 relative">
                {/* First Column - Attackers */}
                <div className="col-start-1 space-y-8">
                  {state.playerCards.slice(0, 2).map((card) => (
                    <PlayerCard
                      key={card.id}
                      card={card}
                      onSelect={setSelectedCard}
                      isSelected={selectedCard?.id === card.id}
                      isOpponent={false}
                    />
                  ))}
                </div>

                {/* Middle Column - Midfielders */}
                <div className="col-start-2 space-y-8">
                  {state.playerCards.slice(2, 4).map((card) => (
                    <PlayerCard
                      key={card.id}
                      card={card}
                      onSelect={setSelectedCard}
                      isSelected={selectedCard?.id === card.id}
                      isOpponent={false}
                    />
                  ))}
                </div>

                {/* Last Column - Defender */}
                <div className="col-start-3 flex items-center justify-center">
                  <PlayerCard
                    card={state.playerCards[4]}
                    onSelect={setSelectedCard}
                    isSelected={selectedCard?.id === state.playerCards[4].id}
                    isOpponent={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          className="action-bar absolute bottom-4 left-1/2 transform -translate-x-1/2 
           flex gap-4 bg-gray-900/80 p-4 rounded-lg"
        >
          {selectedCard &&
            !state.gameOver && ( // Add gameOver check here
              <>
                <button
                  className={`arcade-btn ${
                    state.playerEnergy < 1 ? "disabled" : ""
                  }`}
                  onClick={() => handleAction("ATTACK")}
                  disabled={state.playerEnergy < 1}
                >
                  ATTACK (1)
                </button>
                <button
                  className={`arcade-btn ${
                    state.playerEnergy < 2 ? "disabled" : ""
                  }`}
                  onClick={() => handleAction("SPECIAL")}
                  disabled={state.playerEnergy < 2}
                >
                  {selectedCard.specialAbility?.name || "SPECIAL"} (2)
                </button>
              </>
            )}
          {!state.gameOver && ( // Add gameOver check here
            <button
              className="arcade-btn"
              onClick={() => dispatch({ type: "END_TURN" })}
            >
              END TURN
            </button>
          )}
        </div>
      </div>
      {showMatchVictory && (
        <MatchVictory
          winner={state.playerScore >= 3 ? "player" : "opponent"}
          score={[state.playerScore, state.opponentScore]}
          onComplete={handleMatchVictoryComplete}
        />
      )}
    </div>
  );
}
