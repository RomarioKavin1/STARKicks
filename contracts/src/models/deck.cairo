// src/models/deck.cairo
use starknet::ContractAddress;
use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};

#[derive(Copy, Drop, Serde, starknet::Store)]
struct Deck {
    #[key]
    player: ContractAddress,
    cards: Array<u64>,
    is_active: bool,
}

#[dojo::contract]
mod deck_component {
    use super::Deck;
    use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};

    #[external(v0)]
    impl DeckComponentImpl of super::IDeck<ContractState> {
        fn get_deck(self: @ContractState, player: ContractAddress) -> Deck {
            let world = self.world_dispatcher.read();
            get!(world, player, (Deck))
        }
    }
}