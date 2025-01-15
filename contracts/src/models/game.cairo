use starknet::ContractAddress;

#[derive(Model, Copy, Drop, Serde)]
struct Game {
    #[key]
    id: u64,
    player1: ContractAddress,
    player2: ContractAddress,
    current_turn: ContractAddress,
    state: u8, // 0: not started, 1: in progress, 2: finished
    winner: ContractAddress,
    turn_count: u8,
    player1_score: u8,
    player2_score: u8,
    last_move_timestamp: u64,
}