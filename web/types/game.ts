// types/game.ts
export type Rarity = "common" | "rare" | "epic" | "legendary";

export type Card = {
  id: string;
  name: string;
  attack: number;
  control: number;
  defense: number;
  position: "attack" | "midfield" | "defense";
  rarity: Rarity;
  specialAbility?: {
    name: string;
    cost: number;
    effect: string;
  };
  image?: string;
};

export type VersusCards = {
  attacker: Card;
  defender: Card;
  isSpecial: boolean;
};

export type GameState = {
  playerEnergy: number;
  opponentEnergy: number;
  playerScore: number;
  opponentScore: number;
  currentTurn: "player" | "opponent";
  playerCards: Card[];
  opponentCards: Card[];
  selectedCard?: Card;
  turnTimeLeft: number;
  isAttackingTurn: boolean;
  showVersusAnimation: boolean;
  versusCards: VersusCards | null;
  gameOver: boolean;
};

export type GameAction = {
  type:
    | "ATTACK"
    | "SPECIAL"
    | "SWITCH_POSITION"
    | "END_TURN"
    | "START_OPPONENT_TURN"
    | "RESOLVE_VERSUS"
    | "UPDATE_TIMER"
    | "ADD_ENERGY";
  card?: Card;
  target?: Card;
  winner?: "player" | "opponent";
};
