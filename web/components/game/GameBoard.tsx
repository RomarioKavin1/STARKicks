import { useGame } from "@/contexts/GameContext";
import { Card, GameAction } from "@/types/game";
import { useState } from "react";
import { PlayerCard } from "./PlayerCard";

export function GameBoard() {
  const { state, dispatch } = useGame();
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [targetCard, setTargetCard] = useState<Card | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleOpponentCardSelect = (card: Card) => {
    if (!selectedCard) return;
    setTargetCard(card);
  };

  const handleAction = (actionType: "ATTACK" | "SPECIAL") => {
    if (!selectedCard || !targetCard) return;

    setIsAnimating(true);

    dispatch({
      type: actionType,
      card: selectedCard,
      target: targetCard,
    });

    // Reset after animation
    setTimeout(() => {
      setIsAnimating(false);
      setSelectedCard(null);
      setTargetCard(null);
    }, 1500);
  };
  // Handle opponent card selection (for targeting

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
          {selectedCard && (
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
          <button
            className="arcade-btn"
            onClick={() => dispatch({ type: "END_TURN" })}
          >
            END TURN
          </button>
        </div>
      </div>
    </div>
  );
}
