use starknet::ContractAddress;
use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};

#[starknet::interface]
trait IGameActions<TContractState> {
    fn create_game(self: @TContractState, player2: ContractAddress) -> u64;
    fn make_move(self: @TContractState, game_id: u64, card_id: u64, target_id: u64);
    fn end_turn(self: @TContractState, game_id: u64);
}

#[dojo::contract]
mod game_actions {
    use super::IGameActions;
    use starknet::{ContractAddress, get_caller_address};
    use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};
    
    // Event for moves
    #[derive(Drop, starknet::Event)]
    struct MoveMade {
        game_id: u64,
        player: ContractAddress,
        card_id: u64,
        target_id: u64,
    }

    #[external(v0)]
    impl GameActionsImpl of IGameActions<ContractState> {
        fn create_game(self: @ContractState, player2: ContractAddress) -> u64 {
            let world = self.world_dispatcher.read();
            let player = get_caller_address();
            
            // Verify both players have ready decks
            let player1_deck = get!(world, (player), (Deck));
            let player2_deck = get!(world, (player2), (Deck));
            
            assert(player1_deck.is_active && player2_deck.is_active, 'Decks not ready');

            // Create new game
            let game_id = world.next_id();
            set!(
                world,
                (Game {
                    id: game_id,
                    player1: player,
                    player2,
                    current_turn: player,
                    state: 1, // in progress
                    winner: starknet::contract_address_const::<0>(),
                })
            );

            // Set initial player states
            set!(
                world,
                (
                    Player { address: player, energy: 2, score: 0, deck_ready: true },
                    Player { address: player2, energy: 2, score: 0, deck_ready: true }
                )
            );

            game_id
        }

        fn make_move(
            self: @ContractState, 
            game_id: u64, 
            card_id: u64, 
            target_id: u64
        ) {
            let world = self.world_dispatcher.read();
            let player = get_caller_address();
            
            // Get game state
            let game = get!(world, game_id, (Game));
            assert(game.state == 1, 'Game not in progress');
            assert(game.current_turn == player, 'Not your turn');
            
            // Get player state
            let mut player_state = get!(world, (player), (Player));
            assert(player_state.energy >= 1, 'Not enough energy');
            
            // Get cards
            let attacking_card = get!(world, (card_id), (Card));
            let target_card = get!(world, (target_id), (Card));
            
            // Process attack
            let success = process_attack(attacking_card, target_card);
            if success {
                player_state.score += 1;
                set!(world, (player_state));
            }
            
            // Emit move event
            emit!(world, MoveMade { game_id, player, card_id, target_id });
            
            // Update energy and game state
            player_state.energy -= 1;
            set!(world, (player_state));
        }

        fn end_turn(self: @ContractState, game_id: u64) {
            let world = self.world_dispatcher.read();
            let player = get_caller_address();
            
            // Get and validate game state
            let mut game = get!(world, game_id, (Game));
            assert(game.state == 1, 'Game not in progress');
            assert(game.current_turn == player, 'Not your turn');
            
            // Switch turns and reset energy
            let next_player = if game.player1 == player { game.player2 } else { game.player1 };
            game.current_turn = next_player;
            
            // Reset energy for next player
            let mut next_player_state = get!(world, (next_player), (Player));
            next_player_state.energy = 2;
            
            set!(world, (game, next_player_state));
        }
    }
}