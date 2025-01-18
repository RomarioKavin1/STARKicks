import type { SchemaType as ISchemaType } from "@dojoengine/sdk";

import { BigNumberish } from 'starknet';

type WithFieldOrder<T> = T & { fieldOrder: string[] };

// Type definition for `dojo_starter::models::Card` struct
export interface Card {
	player: string;
	id: BigNumberish;
	attack: BigNumberish;
	defense: BigNumberish;
	control: BigNumberish;
	position: BigNumberish;
	rarity: BigNumberish;
	in_deck: boolean;
}

// Type definition for `dojo_starter::models::CardValue` struct
export interface CardValue {
	id: BigNumberish;
	attack: BigNumberish;
	defense: BigNumberish;
	control: BigNumberish;
	position: BigNumberish;
	rarity: BigNumberish;
	in_deck: boolean;
}

// Type definition for `dojo_starter::models::Game` struct
export interface Game {
	game_id: BigNumberish;
	player: string;
	current_turn: boolean;
	player_energy: BigNumberish;
	ai_energy: BigNumberish;
	player_score: BigNumberish;
	ai_score: BigNumberish;
	status: BigNumberish;
	is_attack_turn: boolean;
	round_number: BigNumberish;
}

// Type definition for `dojo_starter::models::GameValue` struct
export interface GameValue {
	current_turn: boolean;
	player_energy: BigNumberish;
	ai_energy: BigNumberish;
	player_score: BigNumberish;
	ai_score: BigNumberish;
	status: BigNumberish;
	is_attack_turn: boolean;
	round_number: BigNumberish;
}

// Type definition for `dojo_starter::models::PlayerDeck` struct
export interface PlayerDeck {
	player: string;
	card_slot: BigNumberish;
	card_id: BigNumberish;
}

// Type definition for `dojo_starter::models::PlayerDeckValue` struct
export interface PlayerDeckValue {
	card_id: BigNumberish;
}

// Type definition for `dojo_starter::models::GameCompleted` struct
export interface GameCompleted {
	player: string;
	game_id: BigNumberish;
	player_goals: BigNumberish;
	ai_goals: BigNumberish;
	winner: string;
}

// Type definition for `dojo_starter::models::GameCompletedValue` struct
export interface GameCompletedValue {
	game_id: BigNumberish;
	player_goals: BigNumberish;
	ai_goals: BigNumberish;
	winner: string;
}

// Type definition for `dojo_starter::systems::actions::actions::CardPlayed` struct
export interface CardPlayed {
	player: string;
	game_id: BigNumberish;
	card_id: BigNumberish;
	is_special: boolean;
	energy_cost: BigNumberish;
}

// Type definition for `dojo_starter::systems::actions::actions::CardPlayedValue` struct
export interface CardPlayedValue {
	game_id: BigNumberish;
	card_id: BigNumberish;
	is_special: boolean;
	energy_cost: BigNumberish;
}

// Type definition for `dojo_starter::systems::actions::actions::CardSpawned` struct
export interface CardSpawned {
	player: string;
	card_id: BigNumberish;
}

// Type definition for `dojo_starter::systems::actions::actions::CardSpawnedValue` struct
export interface CardSpawnedValue {
	card_id: BigNumberish;
}

// Type definition for `dojo_starter::systems::actions::actions::DeckSet` struct
export interface DeckSet {
	player: string;
	deck_size: BigNumberish;
}

// Type definition for `dojo_starter::systems::actions::actions::DeckSetValue` struct
export interface DeckSetValue {
	deck_size: BigNumberish;
}

// Type definition for `dojo_starter::systems::actions::actions::GameCreated` struct
export interface GameCreated {
	player: string;
	game_id: BigNumberish;
}

// Type definition for `dojo_starter::systems::actions::actions::GameCreatedValue` struct
export interface GameCreatedValue {
	game_id: BigNumberish;
}

// Type definition for `dojo_starter::systems::actions::actions::TurnEnded` struct
export interface TurnEnded {
	player: string;
	game_id: BigNumberish;
	next_turn: boolean;
}

// Type definition for `dojo_starter::systems::actions::actions::TurnEndedValue` struct
export interface TurnEndedValue {
	game_id: BigNumberish;
	next_turn: boolean;
}

// Type definition for `dojo_starter::systems::actions::actions::TurnResolved` struct
export interface TurnResolved {
	player: string;
	game_id: BigNumberish;
	is_attack_turn: boolean;
	player_power: BigNumberish;
	ai_power: BigNumberish;
	goal_scored: boolean;
	scorer: BigNumberish;
}

// Type definition for `dojo_starter::systems::actions::actions::TurnResolvedValue` struct
export interface TurnResolvedValue {
	game_id: BigNumberish;
	is_attack_turn: boolean;
	player_power: BigNumberish;
	ai_power: BigNumberish;
	goal_scored: boolean;
	scorer: BigNumberish;
}

export interface SchemaType extends ISchemaType {
	dojo_starter: {
		Card: WithFieldOrder<Card>,
		CardValue: WithFieldOrder<CardValue>,
		Game: WithFieldOrder<Game>,
		GameValue: WithFieldOrder<GameValue>,
		PlayerDeck: WithFieldOrder<PlayerDeck>,
		PlayerDeckValue: WithFieldOrder<PlayerDeckValue>,
		GameCompleted: WithFieldOrder<GameCompleted>,
		GameCompletedValue: WithFieldOrder<GameCompletedValue>,
		CardPlayed: WithFieldOrder<CardPlayed>,
		CardPlayedValue: WithFieldOrder<CardPlayedValue>,
		CardSpawned: WithFieldOrder<CardSpawned>,
		CardSpawnedValue: WithFieldOrder<CardSpawnedValue>,
		DeckSet: WithFieldOrder<DeckSet>,
		DeckSetValue: WithFieldOrder<DeckSetValue>,
		GameCreated: WithFieldOrder<GameCreated>,
		GameCreatedValue: WithFieldOrder<GameCreatedValue>,
		TurnEnded: WithFieldOrder<TurnEnded>,
		TurnEndedValue: WithFieldOrder<TurnEndedValue>,
		TurnResolved: WithFieldOrder<TurnResolved>,
		TurnResolvedValue: WithFieldOrder<TurnResolvedValue>,
	},
}
export const schema: SchemaType = {
	dojo_starter: {
		Card: {
			fieldOrder: ['player', 'id', 'attack', 'defense', 'control', 'position', 'rarity', 'in_deck'],
			player: "",
			id: 0,
			attack: 0,
			defense: 0,
			control: 0,
			position: 0,
			rarity: 0,
			in_deck: false,
		},
		CardValue: {
			fieldOrder: ['id', 'attack', 'defense', 'control', 'position', 'rarity', 'in_deck'],
			id: 0,
			attack: 0,
			defense: 0,
			control: 0,
			position: 0,
			rarity: 0,
			in_deck: false,
		},
		Game: {
			fieldOrder: ['game_id', 'player', 'current_turn', 'player_energy', 'ai_energy', 'player_score', 'ai_score', 'status', 'is_attack_turn', 'round_number'],
			game_id: 0,
			player: "",
			current_turn: false,
			player_energy: 0,
			ai_energy: 0,
			player_score: 0,
			ai_score: 0,
			status: 0,
			is_attack_turn: false,
			round_number: 0,
		},
		GameValue: {
			fieldOrder: ['current_turn', 'player_energy', 'ai_energy', 'player_score', 'ai_score', 'status', 'is_attack_turn', 'round_number'],
			current_turn: false,
			player_energy: 0,
			ai_energy: 0,
			player_score: 0,
			ai_score: 0,
			status: 0,
			is_attack_turn: false,
			round_number: 0,
		},
		PlayerDeck: {
			fieldOrder: ['player', 'card_slot', 'card_id'],
			player: "",
			card_slot: 0,
			card_id: 0,
		},
		PlayerDeckValue: {
			fieldOrder: ['card_id'],
			card_id: 0,
		},
		GameCompleted: {
			fieldOrder: ['player', 'game_id', 'player_goals', 'ai_goals', 'winner'],
			player: "",
			game_id: 0,
			player_goals: 0,
			ai_goals: 0,
			winner: "",
		},
		GameCompletedValue: {
			fieldOrder: ['game_id', 'player_goals', 'ai_goals', 'winner'],
			game_id: 0,
			player_goals: 0,
			ai_goals: 0,
			winner: "",
		},
		CardPlayed: {
			fieldOrder: ['player', 'game_id', 'card_id', 'is_special', 'energy_cost'],
			player: "",
			game_id: 0,
			card_id: 0,
			is_special: false,
			energy_cost: 0,
		},
		CardPlayedValue: {
			fieldOrder: ['game_id', 'card_id', 'is_special', 'energy_cost'],
			game_id: 0,
			card_id: 0,
			is_special: false,
			energy_cost: 0,
		},
		CardSpawned: {
			fieldOrder: ['player', 'card_id'],
			player: "",
			card_id: 0,
		},
		CardSpawnedValue: {
			fieldOrder: ['card_id'],
			card_id: 0,
		},
		DeckSet: {
			fieldOrder: ['player', 'deck_size'],
			player: "",
			deck_size: 0,
		},
		DeckSetValue: {
			fieldOrder: ['deck_size'],
			deck_size: 0,
		},
		GameCreated: {
			fieldOrder: ['player', 'game_id'],
			player: "",
			game_id: 0,
		},
		GameCreatedValue: {
			fieldOrder: ['game_id'],
			game_id: 0,
		},
		TurnEnded: {
			fieldOrder: ['player', 'game_id', 'next_turn'],
			player: "",
			game_id: 0,
			next_turn: false,
		},
		TurnEndedValue: {
			fieldOrder: ['game_id', 'next_turn'],
			game_id: 0,
			next_turn: false,
		},
		TurnResolved: {
			fieldOrder: ['player', 'game_id', 'is_attack_turn', 'player_power', 'ai_power', 'goal_scored', 'scorer'],
			player: "",
			game_id: 0,
			is_attack_turn: false,
			player_power: 0,
			ai_power: 0,
			goal_scored: false,
			scorer: 0,
		},
		TurnResolvedValue: {
			fieldOrder: ['game_id', 'is_attack_turn', 'player_power', 'ai_power', 'goal_scored', 'scorer'],
			game_id: 0,
			is_attack_turn: false,
			player_power: 0,
			ai_power: 0,
			goal_scored: false,
			scorer: 0,
		},
	},
};
export enum ModelsMapping {
	Card = 'dojo_starter-Card',
	CardValue = 'dojo_starter-CardValue',
	Game = 'dojo_starter-Game',
	GameValue = 'dojo_starter-GameValue',
	PlayerDeck = 'dojo_starter-PlayerDeck',
	PlayerDeckValue = 'dojo_starter-PlayerDeckValue',
	GameCompleted = 'dojo_starter-GameCompleted',
	GameCompletedValue = 'dojo_starter-GameCompletedValue',
	CardPlayed = 'dojo_starter-CardPlayed',
	CardPlayedValue = 'dojo_starter-CardPlayedValue',
	CardSpawned = 'dojo_starter-CardSpawned',
	CardSpawnedValue = 'dojo_starter-CardSpawnedValue',
	DeckSet = 'dojo_starter-DeckSet',
	DeckSetValue = 'dojo_starter-DeckSetValue',
	GameCreated = 'dojo_starter-GameCreated',
	GameCreatedValue = 'dojo_starter-GameCreatedValue',
	TurnEnded = 'dojo_starter-TurnEnded',
	TurnEndedValue = 'dojo_starter-TurnEndedValue',
	TurnResolved = 'dojo_starter-TurnResolved',
	TurnResolvedValue = 'dojo_starter-TurnResolvedValue',
}