// contexts/GameContext.tsx
import { mockCards } from "@/mock/cards";
import { GameState, GameAction, Card } from "@/types/game";
import { createContext, useContext, useReducer } from "react";

type GameContextType = {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
};
const initialGameState: GameState = {
  playerEnergy: 2,
  opponentEnergy: 2,
  playerScore: 0,
  opponentScore: 0,
  currentTurn: "player",
  playerCards: mockCards.slice(0, 5), // First 5 cards for player
  opponentCards: mockCards.slice(5, 10), // Next 5 cards for opponent
  selectedCard: undefined,
};

const GameContext = createContext<GameContextType | undefined>(undefined);
function calculateAttackSuccess(attacker: Card, defender: Card): boolean {
  // Basic attack calculation
  const attackValue = attacker.attack;
  const defenseValue = defender.defense;

  // Add position bonuses
  const positionMultiplier = {
    attack: 1.2,
    midfield: 1.0,
    defense: 0.8,
  };

  const finalAttack = attackValue * positionMultiplier[attacker.position];
  const finalDefense = defenseValue * positionMultiplier[defender.position];

  // Calculate success chance
  const successChance = (finalAttack / (finalAttack + finalDefense)) * 100;

  // Random roll
  return Math.random() * 100 < successChance;
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "ATTACK":
      if (!action.card || !action.target || state.playerEnergy < 1)
        return state;
      return {
        ...state,
        playerEnergy: state.playerEnergy - 1,
        // Calculate attack success and update score
        playerScore: calculateAttackSuccess(action.card, action.target)
          ? state.playerScore + 1
          : state.playerScore,
        currentTurn: "opponent",
      };

    case "SPECIAL":
      if (!action.card?.specialAbility || state.playerEnergy < 2) return state;
      return {
        ...state,
        playerEnergy: state.playerEnergy - 2,
        // Implement special ability effects
        currentTurn: "opponent",
      };

    case "END_TURN":
      return {
        ...state,
        currentTurn: state.currentTurn === "player" ? "opponent" : "player",
        playerEnergy: state.currentTurn === "opponent" ? 2 : state.playerEnergy,
      };

    default:
      return state;
  }
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used within GameProvider");
  return context;
};
