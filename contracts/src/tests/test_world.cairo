#[cfg(test)]
mod tests {
    use dojo::test_utils::spawn_test_world;
    use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};
    use starknet::testing::set_caller_address;
    use core::traits::Into;
    use core::array::ArrayTrait;

    use super::super::{
        models::{Card, Player, Game, Deck}, 
        systems::{card_system, game_system, deck_system}
    };

    const PLAYER1: felt252 = 0x123;
    const PLAYER2: felt252 = 0x456;

    #[test]
    fn test_create_game() {
        // Spawn test world
        let world = spawn_test_world();
        
        // Set up test account
        set_caller_address(PLAYER1.into());

        // Create test cards for both players
        let player1_cards = create_test_deck(world, PLAYER1.into());
        let player2_cards = create_test_deck(world, PLAYER2.into());

        // Create decks
        let deck_system = deck_system::DeckSystemImpl::new(world);
        deck_system.create_deck(player1_cards);
        
        set_caller_address(PLAYER2.into());
        deck_system.create_deck(player2_cards);

        // Create game
        set_caller_address(PLAYER1.into());
        let game_system = game_system::GameSystemImpl::new(world);
        let game_id = game_system.create_game(PLAYER2.into());

        // Get game state
        let game = get!(world, game_id, (Game));

        // Assert game created correctly
        assert(game.player1 == PLAYER1.into(), 'Wrong player1');
        assert(game.player2 == PLAYER2.into(), 'Wrong player2');
        assert(game.state == 1, 'Wrong game state'); // 1 = in progress
        assert(game.current_turn == PLAYER1.into(), 'Wrong turn');
    }

    #[test]
    fn test_make_move() {
        let world = spawn_test_world();
        
        // Set up game with two players
        let (game_id, player1_cards, player2_cards) = setup_test_game(world);
        
        // Make a move
        set_caller_address(PLAYER1.into());
        let game_system = game_system::GameSystemImpl::new(world);
        
        let attacking_card = player1_cards[0];
        let target_card = player2_cards[0];
        
        game_system.make_move(game_id, attacking_card, target_card);

        // Get updated game state
        let game = get!(world, game_id, (Game));
        let player = get!(world, (PLAYER1.into()), (Player));

        // Verify move results
        assert(player.energy < 2, 'Energy not consumed');
        assert(game.current_turn == PLAYER1.into(), 'Wrong turn'); // Turn shouldn't change until end_turn
    }

    #[test]
    fn test_end_turn() {
        let world = spawn_test_world();
        
        // Set up game
        let (game_id, _, _) = setup_test_game(world);
        
        // Make move and end turn
        set_caller_address(PLAYER1.into());
        let game_system = game_system::GameSystemImpl::new(world);
        
        game_system.end_turn(game_id);

        // Get updated game state
        let game = get!(world, game_id, (Game));
        
        // Verify turn changed
        assert(game.current_turn == PLAYER2.into(), 'Turn not changed');
        
        // Verify new player has full energy
        let player2 = get!(world, (PLAYER2.into()), (Player));
        assert(player2.energy == 2, 'Energy not reset');
    }

    #[test]
    #[should_panic(expected: ('Not your turn',))]
    fn test_wrong_turn() {
        let world = spawn_test_world();
        
        // Set up game
        let (game_id, player1_cards, player2_cards) = setup_test_game(world);
        
        // Try to move with wrong player
        set_caller_address(PLAYER2.into());
        let game_system = game_system::GameSystemImpl::new(world);
        
        game_system.make_move(game_id, player2_cards[0], player1_cards[0]);
    }

    #[test]
    #[should_panic(expected: ('Not enough energy',))]
    fn test_not_enough_energy() {
        let world = spawn_test_world();
        
        // Set up game
        let (game_id, player1_cards, player2_cards) = setup_test_game(world);
        
        set_caller_address(PLAYER1.into());
        let game_system = game_system::GameSystemImpl::new(world);
        
        // Make moves until energy is depleted
        game_system.make_move(game_id, player1_cards[0], player2_cards[0]);
        game_system.make_move(game_id, player1_cards[1], player2_cards[0]);
        
        // Try to move with no energy
        game_system.make_move(game_id, player1_cards[2], player2_cards[0]);
    }

    // Helper functions
    fn create_test_deck(world: IWorldDispatcher, owner: ContractAddress) -> Array<u64> {
        let card_system = card_system::CardSystemImpl::new(world);
        let mut cards = ArrayTrait::new();
        
        // Create 2 attackers
        let card1 = card_system.mint_card(owner);
        let card2 = card_system.mint_card(owner);
        
        // Create 2 midfielders
        let card3 = card_system.mint_card(owner);
        let card4 = card_system.mint_card(owner);
        
        // Create 1 defender
        let card5 = card_system.mint_card(owner);

        cards.append(card1.id);
        cards.append(card2.id);
        cards.append(card3.id);
        cards.append(card4.id);
        cards.append(card5.id);

        cards
    }

    fn setup_test_game(world: IWorldDispatcher) -> (u64, Array<u64>, Array<u64>) {
        // Create cards and decks
        let player1_cards = create_test_deck(world, PLAYER1.into());
        let player2_cards = create_test_deck(world, PLAYER2.into());

        // Set up decks
        let deck_system = deck_system::DeckSystemImpl::new(world);
        
        set_caller_address(PLAYER1.into());
        deck_system.create_deck(player1_cards);
        
        set_caller_address(PLAYER2.into());
        deck_system.create_deck(player2_cards);

        // Create game
        set_caller_address(PLAYER1.into());
        let game_system = game_system::GameSystemImpl::new(world);
        let game_id = game_system.create_game(PLAYER2.into());

        (game_id, player1_cards, player2_cards)
    }
}