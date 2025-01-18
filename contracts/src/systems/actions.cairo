use dojo_starter::models::{Card,Game};
// define the interface
#[starknet::interface]
trait IActions<T> {
    fn spawn(ref self: T);
    fn create_game(ref self: T) -> u32;
}

// dojo decorator
#[dojo::contract]
pub mod actions {
    use super::{IActions, Card,Game};
    use starknet::{ContractAddress, get_caller_address};
    
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
        fn create_game(ref self: ContractState) -> u32 {
            let mut world = self.world_default();
            let player = get_caller_address();
            
            // Generate a simple game ID (you can make this more sophisticated)
            let game_id = world.uuid();
    
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