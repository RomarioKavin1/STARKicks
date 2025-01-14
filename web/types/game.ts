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

export type GameState = {
  playerEnergy: number;
  opponentEnergy: number;
  playerScore: number;
  opponentScore: number;
  currentTurn: "player" | "opponent";
  playerCards: Card[];
  opponentCards: Card[];
  selectedCard?: Card;
};

export type GameAction = {
  type: "ATTACK" | "SPECIAL" | "SWITCH_POSITION" | "END_TURN";
  card?: Card;
  target?: Card;
};
