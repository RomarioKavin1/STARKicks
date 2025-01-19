import { DojoProvider, DojoCall } from "@dojoengine/core";
import { Account, AccountInterface, BigNumberish, CairoOption, CairoCustomEnum, ByteArray } from "starknet";
import * as models from "./models.gen";

export function setupWorld(provider: DojoProvider) {

	const build_actions_createGame_calldata = (gameId: BigNumberish): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "create_game",
			calldata: [gameId],
		};
	};

	const actions_createGame = async (snAccount: Account | AccountInterface, gameId: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_actions_createGame_calldata(gameId),
				"dojo_starter",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_actions_endTurn_calldata = (gameId: BigNumberish): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "end_turn",
			calldata: [gameId],
		};
	};

	const actions_endTurn = async (snAccount: Account | AccountInterface, gameId: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_actions_endTurn_calldata(gameId),
				"dojo_starter",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_actions_playCard_calldata = (gameId: BigNumberish, cardId: BigNumberish, isSpecial: boolean): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "play_card",
			calldata: [gameId, cardId, isSpecial],
		};
	};

	const actions_playCard = async (snAccount: Account | AccountInterface, gameId: BigNumberish, cardId: BigNumberish, isSpecial: boolean) => {
		try {
			return await provider.execute(
				snAccount,
				build_actions_playCard_calldata(gameId, cardId, isSpecial),
				"dojo_starter",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_actions_setDeck_calldata = (cardIds: Array<BigNumberish>): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "set_deck",
			calldata: [cardIds],
		};
	};

	const actions_setDeck = async (snAccount: Account | AccountInterface, cardIds: Array<BigNumberish>) => {
		try {
			return await provider.execute(
				snAccount,
				build_actions_setDeck_calldata(cardIds),
				"dojo_starter",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_actions_spawn_calldata = (): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "spawn",
			calldata: [],
		};
	};

	const actions_spawn = async (snAccount: Account | AccountInterface) => {
		try {
			return await provider.execute(
				snAccount,
				build_actions_spawn_calldata(),
				"dojo_starter",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};



	return {
		actions: {
			createGame: actions_createGame,
			buildCreateGameCalldata: build_actions_createGame_calldata,
			endTurn: actions_endTurn,
			buildEndTurnCalldata: build_actions_endTurn_calldata,
			playCard: actions_playCard,
			buildPlayCardCalldata: build_actions_playCard_calldata,
			setDeck: actions_setDeck,
			buildSetDeckCalldata: build_actions_setDeck_calldata,
			spawn: actions_spawn,
			buildSpawnCalldata: build_actions_spawn_calldata,
		},
	};
}