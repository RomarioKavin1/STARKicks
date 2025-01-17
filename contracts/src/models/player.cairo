// src/models/player.cairo
use starknet::ContractAddress;
use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};

#[derive(Copy, Drop, Serde, starknet::Store)]
struct Player {
    #[key]
    address: ContractAddress,
    energy: u8,
    score: u8,
    deck_ready: bool,
}

#[dojo::contract]
mod player_component {
    use super::Player;
    use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};

    #[external(v0)]
    impl PlayerComponentImpl of super::IPlayer<ContractState> {
        fn get_player(self: @ContractState, address: ContractAddress) -> Player {
            let world = self.world_dispatcher.read();
            get!(world, address, (Player))
        }
    }
}