#[starknet::interface]
trait IDeckSystem<TContractState> {
    fn create_deck(ref self: TContractState, card_ids: Array<u64>) -> bool;
    fn modify_deck(ref self: TContractState, card_ids: Array<u64>) -> bool;
    fn validate_deck(ref self: TContractState, deck: Deck) -> bool;
    fn get_deck(self: @TContractState, player: ContractAddress) -> Option<Deck>;
}

#[dojo::contract]
mod deck_system {
    use super::IDeckSystem;
    use starknet::{ContractAddress, get_caller_address};

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        DeckCreated: DeckCreated,
        DeckModified: DeckModified,
    }

    #[derive(Drop, starknet::Event)]
    struct DeckCreated {
        player: ContractAddress,
        deck_id: u64
    }

    #[derive(Drop, starknet::Event)]
    struct DeckModified {
        player: ContractAddress,
        deck_id: u64
    }

    #[external(v0)]
    impl DeckSystemImpl of IDeckSystem<ContractState> {
        fn create_deck(ref self: ContractState, card_ids: Array<u64>) -> bool {
            let world = self.world_dispatcher.read();
            let player = get_caller_address();

            // Validate deck size
            assert(card_ids.len() == MAX_DECK_SIZE, 'Invalid deck size');

            // Validate card ownership and create formation
            let mut attack_count = 0;
            let mut midfield_count = 0;
            let mut defense_count = 0;

            // Count positions
            let mut i = 0;
            loop {
                if i >= card_ids.len() {
                    break;
                }
                let card = get!(world, (card_ids[i]), (Card));
                assert(card.owner == player, 'Card not owned');
                
                match card.position {
                    CardPosition::Attack => attack_count += 1,
                    CardPosition::Midfield => midfield_count += 1,
                    CardPosition::Defense => defense_count += 1,
                }
                i += 1;
            };

            // Validate formation (2-2-1)
            assert(attack_count == 2, 'Need 2 attackers');
            assert(midfield_count == 2, 'Need 2 midfielders');
            assert(defense_count == 1, 'Need 1 defender');

            // Create deck
            let formation = Formation {
                attack: attack_count,
                midfield: midfield_count,
                defense: defense_count
            };

            let deck = Deck {
                player,
                cards: card_ids,
                is_active: true,
                formation
            };

            // Save deck
            set!(world, (deck));

            // Emit event
            emit!(world, DeckCreated { player, deck_id: world.next_id() });

            true
        }

        fn modify_deck(ref self: ContractState, card_ids: Array<u64>) -> bool {
            let world = self.world_dispatcher.read();
            let player = get_caller_address();

            // Get existing deck
            let mut deck = get!(world, (player), (Deck));
            assert(deck.is_active, 'No active deck');

            // Validate new deck
            assert(card_ids.len() == MAX_DECK_SIZE, 'Invalid deck size');

            // Similar position validation as create_deck
            let mut attack_count = 0;
            let mut midfield_count = 0;
            let mut defense_count = 0;

            let mut i = 0;
            loop {
                if i >= card_ids.len() {
                    break;
                }
                let card = get!(world, (card_ids[i]), (Card));
                assert(card.owner == player, 'Card not owned');
                
                match card.position {
                    CardPosition::Attack => attack_count += 1,
                    CardPosition::Midfield => midfield_count += 1,
                    CardPosition::Defense => defense_count += 1,
                }
                i += 1;
            };

            assert(attack_count == 2, 'Need 2 attackers');
            assert(midfield_count == 2, 'Need 2 midfielders');
            assert(defense_count == 1, 'Need 1 defender');

            // Update deck
            deck.cards = card_ids;
            deck.formation = Formation {
                attack: attack_count,
                midfield: midfield_count,
                defense: defense_count
            };

            set!(world, (deck));

            // Emit event
            emit!(world, DeckModified { player, deck_id: world.next_id() });

            true
        }

        fn validate_deck(ref self: ContractState, deck: Deck) -> bool {
            // Implementation of deck validation rules
            let world = self.world_dispatcher.read();
            
            if deck.cards.len() != MAX_DECK_SIZE {
                return false;
            }

            // Validate formation
            let formation = deck.formation;
            if formation.attack != 2 || formation.midfield != 2 || formation.defense != 1 {
                return false;
            }

            true
        }

        fn get_deck(self: @ContractState, player: ContractAddress) -> Option<Deck> {
            let world = self.world_dispatcher.read();
            let deck = get!(world, (player), (Deck));
            if deck.is_active {
                Option::Some(deck)
            } else {
                Option::None
            }
        }
    }
}