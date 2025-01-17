#[derive(Drop, Copy, Serde)]
enum CardPosition {
    Attack,
    Midfield,
    Defense
}

#[derive(Drop, Copy, Serde)]
enum CardRarity {
    Common,
    Rare,
    Epic,
    Legendary
}
// src/types.cairo
use starknet::ContractAddress;

// Define the position type
#[derive(Drop, Copy, Serde, PartialEq)]
enum CardPosition {
    Attack: (),
    Midfield: (),
    Defense: ()
}

// Define the rarity type
#[derive(Drop, Copy, Serde, PartialEq)]
enum CardRarity {
    Common: (),
    Rare: (),
    Epic: (),
    Legendary: ()
}

// Define the formation
#[derive(Drop, Copy, Serde)]
struct Formation {
    attack: u8,
    midfield: u8,
    defense: u8
}

const MAX_DECK_SIZE: u8 = 5;