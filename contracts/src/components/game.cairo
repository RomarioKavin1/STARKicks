#[derive(Component, Copy, Drop, Serde)]
struct Game {
    #[key]
    id: u64,
    player1: ContractAddress,
    player2: ContractAddress,
    current_turn: ContractAddress,
    state: u8,
}