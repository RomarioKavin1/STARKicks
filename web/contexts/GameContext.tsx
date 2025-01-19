// contexts/GameContext.tsx
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { Card, GameState, GameAction } from "@/types/game";
import { mockCards } from "@/mock/cards";

const initialState: GameState = {
  playerEnergy: 2,
  opponentEnergy: 2,
  playerScore: 0,
  opponentScore: 0,
  currentTurn: "player",
  playerCards: mockCards.slice(0, 5),
  opponentCards: mockCards.slice(5, 10),
  selectedCard: undefined,
  turnTimeLeft: 30,
  isAttackingTurn: true,
  showVersusAnimation: false,
  versusCards: null,
  gameOver: false, // Add this new state
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "ATTACK":
    case "SPECIAL": {
      if (!action.card || !action.target || state.showVersusAnimation)
        return state;

      const energyCost = action.type === "SPECIAL" ? 2 : 1;
      if (state.playerEnergy < energyCost) return state;

      return {
        ...state,
        playerEnergy: state.playerEnergy - energyCost,
        showVersusAnimation: true,
        versusCards: {
          attacker: action.card,
          defender: action.target,
          isSpecial: action.type === "SPECIAL",
        },
      };
    }

    case "RESOLVE_VERSUS": {
      if (!action.winner) return state;

      const newPlayerScore =
        action.winner === "player" ? state.playerScore + 1 : state.playerScore;
      const newOpponentScore =
        action.winner === "opponent"
          ? state.opponentScore + 1
          : state.opponentScore;
      const isGameOver = newPlayerScore >= 3 || newOpponentScore >= 3;

      return {
        ...state,
        playerScore: newPlayerScore,
        opponentScore: newOpponentScore,
        showVersusAnimation: false,
        versusCards: null,
        currentTurn: isGameOver
          ? state.currentTurn
          : state.currentTurn === "player"
          ? "opponent"
          : "player",
        turnTimeLeft: 30,
        isAttackingTurn: !state.isAttackingTurn,
        gameOver: isGameOver,
      };
    }

    case "START_OPPONENT_TURN": {
      if (state.showVersusAnimation || state.currentTurn !== "opponent")
        return state;

      const randomAttacker =
        state.opponentCards[
          Math.floor(Math.random() * state.opponentCards.length)
        ];
      const randomTarget =
        state.playerCards[Math.floor(Math.random() * state.playerCards.length)];
      const useSpecial = Math.random() > 0.7 && state.opponentEnergy >= 2;
      const energyCost = useSpecial ? 2 : 1;

      if (state.opponentEnergy < energyCost) {
        return {
          ...state,
          currentTurn: "player",
          turnTimeLeft: 30,
          isAttackingTurn: !state.isAttackingTurn,
        };
      }

      return {
        ...state,
        showVersusAnimation: true,
        versusCards: {
          attacker: randomAttacker,
          defender: randomTarget,
          isSpecial: useSpecial,
        },
        opponentEnergy: state.opponentEnergy - energyCost,
      };
    }

    case "END_TURN":
      if (state.showVersusAnimation) return state;
      return {
        ...state,
        currentTurn: "opponent",
        turnTimeLeft: 30,
        isAttackingTurn: !state.isAttackingTurn,
      };

    case "UPDATE_TIMER":
      if (state.showVersusAnimation) return state;
      if (state.turnTimeLeft <= 0) {
        return {
          ...state,
          currentTurn: state.currentTurn === "player" ? "opponent" : "player",
          turnTimeLeft: 30,
          isAttackingTurn: !state.isAttackingTurn,
        };
      }
      return {
        ...state,
        turnTimeLeft: state.turnTimeLeft - 1,
      };

    case "ADD_ENERGY":
      if (state.showVersusAnimation) return state;
      return {
        ...state,
        playerEnergy: Math.min(state.playerEnergy + 1, 10),
        opponentEnergy: Math.min(state.opponentEnergy + 1, 10),
      };

    default:
      return state;
  }
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Timer effect
  useEffect(() => {
    if (state.gameOver || state.showVersusAnimation) return;

    const timer = setInterval(() => {
      dispatch({ type: "UPDATE_TIMER" });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.gameOver, state.showVersusAnimation]);

  // AI turn effect
  useEffect(() => {
    if (state.gameOver || state.showVersusAnimation) return;

    if (state.currentTurn === "opponent") {
      const timer = setTimeout(() => {
        dispatch({ type: "START_OPPONENT_TURN" });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [state.currentTurn, state.gameOver, state.showVersusAnimation]);

  // Energy regeneration effect
  useEffect(() => {
    if (state.gameOver || state.showVersusAnimation) return;

    const timer = setInterval(() => {
      dispatch({ type: "ADD_ENERGY" });
    }, 5000);

    return () => clearInterval(timer);
  }, [state.gameOver, state.showVersusAnimation]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}
const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}>({
  state: initialState,
  dispatch: () => null,
});
export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
