// src/models/game.cairo
use starknet::ContractAddress;
use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};

#[derive(Copy, Drop, Serde, starknet::Store)]
struct Game {
    #[key]
    id: u64,
    player1: ContractAddress,
    player2: ContractAddress,
    current_turn: ContractAddress,
    state: u8, // 0: not started, 1: in progress, 2: finished
    winner: ContractAddress,
}

#[dojo::contract]
mod game_component {
    use super::Game;
    use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};

    #[external(v0)]
    impl GameComponentImpl of super::IGame<ContractState> {
        fn get_game(self: @ContractState, game_id: u64) -> Game {
            let world = self.world_dispatcher.read();
            get!(world, game_id, (Game))
        }
    }
}