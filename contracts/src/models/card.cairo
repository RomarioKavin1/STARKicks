use starknet::ContractAddress;

#[derive(Model, Copy, Drop, Serde)]
struct Card {
    #[key]
    id: u64,
    #[key]
    owner: ContractAddress,
    name: felt252,
    attack: u8,
    control: u8,
    defense: u8,
    position: u8, // 0: attack, 1: midfield, 2: defense
    rarity: u8,   // 0: common, 1: rare, 2: epic, 3: legendary
    special_ability: felt252,
    in_deck: bool,
}