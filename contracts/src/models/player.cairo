use starknet::ContractAddress;

#[derive(Model, Copy, Drop, Serde)]
struct Player {
    #[key]
    address: ContractAddress,
    energy: u8,
    score: u8,
    deck_ready: bool,
    total_cards: u32,
    games_played: u32,
    games_won: u32,
}