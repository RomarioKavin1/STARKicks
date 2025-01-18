use dojo_starter::models::{Card,Game,PlayerDeck};
// define the interface
#[starknet::interface]
trait IActions<T> {
    fn spawn(ref self: T);
    fn create_game(ref self: T,game_id:u32) -> u32;
    fn set_deck(ref self: T, card_ids: Array<u32>) -> Result<(), felt252>;
    fn play_card(ref self: T, game_id: u32, card_id: u32, is_special: bool) -> Result<(), felt252>;
    
}

// dojo decorator
#[dojo::contract]
pub mod actions {
    use super::{IActions, Card,Game,PlayerDeck};
    use starknet::{ContractAddress, get_caller_address};
    use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};
    use dojo::model::{ModelStorage, ModelValueStorage};
    use dojo::event::EventStorage;

    #[derive(Copy, Drop, Serde)]
    #[dojo::event]
    pub struct CardSpawned {
        #[key]
        player: ContractAddress,
        card_id: u32,
    }
    #[derive(Copy, Drop, Serde)]
    #[dojo::event]
    pub struct GameCreated {
        #[key]
        player: ContractAddress,
        game_id: u32,
    }
    #[derive(Copy, Drop, Serde)]
    #[dojo::event]
    pub struct DeckSet {
        #[key]
        player: ContractAddress,
        deck_size: u8,
    }
    #[derive(Copy, Drop, Serde)]
    #[dojo::event]
    pub struct CardPlayed {
        #[key]
        player: ContractAddress,
        game_id: u32,
        card_id: u32,
        is_special: bool,
        energy_cost: u8,
    }

    #[abi(embed_v0)]
    impl ActionsImpl of IActions<ContractState> {
        fn spawn(ref self: ContractState) {
            // Get the default world.
            let mut world = self.world_default();

            // Get the address of the current caller, possibly the player's address.
            let player = get_caller_address();
            // Retrieve the player's current position from the world.

            // Create new card
            let new_card = Card {
                player,
                id: 1213,
                attack: 70,
                defense: 70,
                control: 70,
                position: 0,
                rarity: 0,
                in_deck: false,
            };
            world.write_model(@new_card);
        }
        fn create_game(ref self: ContractState,game_id:u32) -> u32 {
            let mut world = self.world_default();
            let player = get_caller_address();    
            // Create new game state
            let new_game = Game {
                game_id,
                player,
                current_turn: true, // Player goes first
                player_energy: 2,
                ai_energy: 2,
                player_score: 0,
                ai_score: 0,
                status: 1, // In progress
            };
    
            // Write game to world
            world.write_model(@new_game);
    
            // Emit event
            world.emit_event(@GameCreated{player, game_id});
    
            game_id
        }
        fn set_deck(ref self: ContractState, card_ids: Array<u32>) -> Result<(), felt252> {
            let mut world = self.world_default();
            let player = get_caller_address();

            // Verify deck size
            assert(card_ids.len() == 5, 'Deck must contain 5 cards');

            // Verify card ownership and set deck
            let mut i = 0;
            loop {
                if i >= card_ids.len() {
                    break;
                }

                // Read card using proper World API
                let card: Card = world.read_model((player, *card_ids[i]));
                assert(card.player == player, 'Player must own card');
                assert(!card.in_deck, 'Card already in deck');

                // Update card to be in deck
                let updated_card = Card {
                    player,
                    id: *card_ids[i],
                    attack: card.attack,
                    defense: card.defense,
                    control: card.control,
                    position: card.position,
                    rarity: card.rarity,
                    in_deck: true,
                };

                // Create deck entry
                let deck_entry = PlayerDeck {
                    player,
                    card_slot: i.try_into().unwrap(),
                    card_id: *card_ids[i],
                };

                // Write updated states using proper World API
                world.write_model(@updated_card);
                world.write_model(@deck_entry);

                i += 1;
            };

            // Emit event using proper World API
            world.emit_event(@DeckSet { player, deck_size: 5_u8 });

            Result::Ok(())
        }
        fn play_card(
            ref self: ContractState, 
            game_id: u32, 
            card_id: u32, 
            is_special: bool
        ) -> Result<(), felt252> {
            let mut world = self.world_default();
            let player = get_caller_address();
        
            // Read game state
            let mut game: Game = world.read_model((game_id, player));
            assert(game.status == 1, 'Game not in progress');
            assert(game.current_turn, 'Not player turn');
        
            // Calculate energy cost
            let energy_cost = if is_special { 2 } else { 1 };
            assert(game.player_energy >= energy_cost, 'Not enough energy');
        
            // Verify card ownership and in deck
            let card: Card = world.read_model((player, card_id));
            assert(card.player == player, 'Not card owner');
            assert(card.in_deck, 'Card not in deck');
        
            // Verify card in player deck for this game
            let deck :PlayerDeck = world.read_model((player, card_id));
            let card_slot:u8 = deck.card_slot;
            assert(card_slot > 0, 'Card not in active deck');
        
            // Update game state
            let updated_game = Game {
                game_id: game.game_id,
                player: game.player,
                current_turn: game.current_turn,
                player_energy: game.player_energy - energy_cost,
                ai_energy: game.ai_energy,
                player_score: game.player_score,
                ai_score: game.ai_score,
                status: game.status,
            };
        
            // Write updated state
            world.write_model(@updated_game);
        
            // Emit event
            world.emit_event(
                @CardPlayed { 
                    player, 
                    game_id, 
                    card_id, 
                    is_special, 
                    energy_cost 
                }
            );
        
            Result::Ok(())
        }
        
    }

    #[generate_trait]
    impl InternalImpl of InternalTrait {
        // Use the default namespace "dojo_starter".
        // This function is handy since the ByteArray can't be const.
        fn world_default(self: @ContractState) -> dojo::world::WorldStorage {
            self.world(@"dojo_starter")
        }
    }
}