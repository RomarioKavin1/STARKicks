import { Card } from "@/types/game";

// mock/cards.ts
export const mockCards: Card[] = [
  {
    id: "1",
    name: "Messi",
    attack: 90,
    control: 95,
    defense: 40,
    position: "attack",
    specialAbility: {
      name: "Dribble Master",
      cost: 2,
      effect: "Guaranteed successful attack",
    },
    rarity: "epic",
    team: "529",
  },
  {
    id: "2",
    name: "Ronaldo",
    attack: 92,
    control: 85,
    defense: 35,
    position: "attack",
    specialAbility: {
      name: "Perfect Strike",
      cost: 2,
      effect: "High chance of goal",
    },
    rarity: "epic",
    team: "505",
  },
  {
    id: "3",
    name: "De Bruyne",
    attack: 85,
    control: 93,
    defense: 60,
    position: "midfield",
    specialAbility: {
      name: "Perfect Pass",
      cost: 2,
      effect: "Boost next attack",
    },
    rarity: "epic",
    team: "50",
  },
  {
    id: "4",
    name: "Modric",
    attack: 80,
    control: 90,
    defense: 65,
    position: "midfield",
    specialAbility: {
      name: "Field Control",
      cost: 2,
      effect: "Reduce opponent energy",
    },
    rarity: "epic",
    team: "47",
  },
  {
    id: "5",
    name: "Van Dijk",
    attack: 65,
    control: 75,
    defense: 90,
    position: "defense",
    specialAbility: {
      name: "Concrete Wall",
      cost: 2,
      effect: "Block next attack",
    },
    rarity: "legendary",
    team: "212",
  },
  // Opponent Cards
  {
    id: "6",
    name: "Haaland",
    attack: 92,
    control: 80,
    defense: 40,
    position: "attack",
    specialAbility: {
      name: "Power Shot",
      cost: 2,
      effect: "High damage attack",
    },
    rarity: "legendary",
    team: "50",
  },
  {
    id: "7",
    name: "Mbappe",
    attack: 91,
    control: 88,
    defense: 35,
    position: "attack",
    specialAbility: {
      name: "Speed Burst",
      cost: 2,
      effect: "Guaranteed attack",
    },
    rarity: "legendary",
    team: "85",
  },
  {
    id: "8",
    name: "Bellingham",
    attack: 82,
    control: 88,
    defense: 75,
    position: "midfield",
    specialAbility: {
      name: "All-Round",
      cost: 2,
      effect: "Boost all stats",
    },
    rarity: "epic",
    team: "496",
  },
  {
    id: "9",
    name: "Kimmich",
    attack: 78,
    control: 90,
    defense: 85,
    position: "midfield",
    specialAbility: {
      name: "Tactician",
      cost: 2,
      effect: "Extra energy next turn",
    },
    rarity: "epic",
    team: "529",
  },
  {
    id: "10",
    name: "Dias",
    attack: 60,
    control: 80,
    defense: 89,
    position: "defense",
    specialAbility: {
      name: "Defensive Wall",
      cost: 2,
      effect: "Block incoming damage",
    },
    rarity: "epic",
    team: "212",
  },
];
