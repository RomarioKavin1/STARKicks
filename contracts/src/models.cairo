use starknet::{ContractAddress};

#[derive(Copy, Drop, Serde, Debug)]
#[dojo::model]
pub struct Card {
    #[key]
    pub player: ContractAddress,  // Key field acts like primary key
    pub id: u32,
    pub attack: u8,
    pub defense: u8,
    pub control: u8,
    pub position: u8,
    pub rarity: u8,
    pub in_deck: bool,
}
#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct Game {
    #[key]
    pub game_id: u32,
    #[key]
    pub player: ContractAddress,
    pub current_turn: bool, // true for player, false for AI
    pub player_energy: u8,
    pub ai_energy: u8,
    pub player_score: u8,
    pub ai_score: u8,
    pub status: u8, // 0: not started, 1: in progress, 2: ended
    pub is_attack_turn: bool, // true for attack, false for defend
    pub round_number: u8, // to track energy distribution
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct PlayerDeck {
    #[key]
    pub player: ContractAddress,
    #[key]
    pub card_slot: u8, // 1 to 5 for each card slot
    pub card_id: u32,
}
#[derive(Copy, Drop, Serde)]
#[dojo::event]
pub struct GameCompleted {
    #[key]
    player: ContractAddress,
    game_id: u32,
    player_goals: u8,
    ai_goals: u8,
    winner: ContractAddress, // player address for player win, 0 for AI win
}