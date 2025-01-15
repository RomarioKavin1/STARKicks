use starknet::ContractAddress;

#[derive(Model, Copy, Drop, Serde)]
struct Deck {
    #[key]
    player: ContractAddress,
    cards: Array<u64>,
    is_active: bool,
    attack_count: u8,
    midfield_count: u8,
    defense_count: u8,
    total_attack: u16,
    total_defense: u16,
    total_control: u16,
}