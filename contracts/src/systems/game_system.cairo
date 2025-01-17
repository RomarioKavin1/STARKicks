// systems/game_system.cairo
#[starknet::interface]
trait IGameSystem<TContractState> {
    fn create_game(ref self: TContractState, player2: ContractAddress) -> u64;
    fn make_move(ref self: TContractState, game_id: u64, card_id: u64, target_id: u64);
    fn end_turn(ref self: TContractState, game_id: u64);
    fn forfeit_game(ref self: TContractState, game_id: u64);
}

#[dojo::contract]
mod game_system {
    use super::IGameSystem;
    use starknet::{ContractAddress, get_caller_address, get_block_timestamp};

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        GameStarted: GameStarted,
        MoveMade: MoveMade,
        GameEnded: GameEnded,
    }

    #[external(v0)]
    impl GameSystemImpl of IGameSystem<ContractState> {
        fn create_game(ref self: ContractState, player2: ContractAddress) -> u64 {
            let world = self.world_dispatcher.read();
            let player = get_caller_address();
            
            // Verify both players have ready decks
            let player1_deck = get!(world, (player), (Deck));
            let player2_deck = get!(world, (player2), (Deck));
            
            assert(player1_deck.is_active && player2_deck.is_active, 'Decks not ready');

            let game_id = world.next_id();
            let game = Game {
                id: game_id,
                player1: player,
                player2,
                current_turn: player,
                state: 1,
                winner: starknet::contract_address_const::<0>(),
                turn_count: 0,
                player1_score: 0,
                player2_score: 0,
                last_move_timestamp: get_block_timestamp(),
            };

            set!(world, (game));
            game_id
        }

        // Implement other game functions...
    }
}