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