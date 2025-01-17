// src/models/card.cairo
use starknet::ContractAddress;
use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};
use super::super::types::{CardPosition, CardRarity};

#[derive(Copy, Drop, Serde, starknet::Store)]
struct Card {
    #[key]
    id: u64,
    #[key]
    owner: ContractAddress,
    name: felt252,
    attack: u8,
    control: u8,
    defense: u8,
    rarity: CardRarity,
    special_ability: felt252,
    in_deck: bool,
}