use starknet::ContractAddress;

#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct Card {
    #[key]
    id: u64,
    name: felt252,
    attack: u8,
    control: u8,
    defense: u8,
    position: u8,
    rarity: u8,
    special_ability: felt252,
    owner: ContractAddress,
}