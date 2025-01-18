#[cfg(test)]
mod tests {
    use dojo_cairo_test::WorldStorageTestTrait;
    use dojo::model::{ModelStorage, ModelValueStorage, ModelStorageTest};
    use dojo::world::WorldStorageTrait;
    use dojo_cairo_test::{spawn_test_world, NamespaceDef, TestResource, ContractDefTrait, ContractDef};

    use dojo_starter::systems::actions::{actions, IActionsDispatcher, IActionsDispatcherTrait};
    use dojo_starter::models::{Card, Game, PlayerDeck};

    fn namespace_def() -> NamespaceDef {
        let ndef = NamespaceDef {
            namespace: "dojo_starter", resources: [
                TestResource::Model(Card::TEST_CLASS_HASH),
                TestResource::Model(Game::TEST_CLASS_HASH),
                TestResource::Model(PlayerDeck::TEST_CLASS_HASH),
                TestResource::Event(actions::CardSpawned::TEST_CLASS_HASH),
                TestResource::Event(actions::GameCreated::TEST_CLASS_HASH),
                TestResource::Event(actions::DeckSet::TEST_CLASS_HASH),
                TestResource::Event(actions::CardPlayed::TEST_CLASS_HASH),
                TestResource::Event(actions::TurnEnded::TEST_CLASS_HASH),
                TestResource::Event(actions::TurnResolved::TEST_CLASS_HASH),
                TestResource::Contract(actions::TEST_CLASS_HASH)
            ].span()
        };

        ndef
    }

    fn contract_defs() -> Span<ContractDef> {
        [
            ContractDefTrait::new(@"dojo_starter", @"actions")
                .with_writer_of([dojo::utils::bytearray_hash(@"dojo_starter")].span())
        ].span()
    }

    #[test]
    fn test_spawn_and_create_game() {
        // Initialize test environment
        let caller = starknet::contract_address_const::<0x0>();
        let ndef = namespace_def();

        // Register the resources
        let mut world = spawn_test_world([ndef].span());

        // Sync permissions and initializations
        world.sync_perms_and_inits(contract_defs());

        // Get contract address and create dispatcher
        let (contract_address, _) = world.dns(@"actions").unwrap();
        let actions_system = IActionsDispatcher { contract_address };

        // Test spawn
        actions_system.spawn();

        // Test initial card creation
        let card: Card = world.read_model((caller, 1213));
        assert(card.attack == 70, 'wrong initial attack');
        assert(card.defense == 70, 'wrong initial defense');
        assert(!card.in_deck, 'should not be in deck');

        // Test game creation
        let game_id = actions_system.create_game(1);
        let game: Game = world.read_model((game_id, caller));
        assert(game.status == 1, 'wrong game status');
        assert(game.player_energy == 2, 'wrong initial energy');
        assert(game.is_attack_turn, 'should start with attack');
    }

    #[test]
    fn test_deck_setup() {
        let caller = starknet::contract_address_const::<0x0>();
        let ndef = namespace_def();
        let mut world = spawn_test_world([ndef].span());
        world.sync_perms_and_inits(contract_defs());

        let (contract_address, _) = world.dns(@"actions").unwrap();
        let actions_system = IActionsDispatcher { contract_address };

        // Spawn first to create cards
        actions_system.spawn();

        // Create test deck
        let mut deck_cards = array![1213, 1214, 1215, 1216, 1217];
        let result = actions_system.set_deck(deck_cards);
        assert(result.is_ok(), 'deck setup failed');

        // Verify card is in deck
        let card: Card = world.read_model((caller, 1213));
        assert(card.in_deck, 'card should be in deck');

        // Verify deck entry
        let deck: PlayerDeck = world.read_model((caller, 0));
        assert(deck.card_id == 1213, 'wrong card in deck slot 0');
    }

    #[test]
    #[available_gas(30000000)]
    fn test_play_card_and_turn() {
        let caller = starknet::contract_address_const::<0x0>();
        let ndef = namespace_def();
        let mut world = spawn_test_world([ndef].span());
        world.sync_perms_and_inits(contract_defs());

        let (contract_address, _) = world.dns(@"actions").unwrap();
        let actions_system = IActionsDispatcher { contract_address };

        // Setup game state
        actions_system.spawn();
        let game_id = actions_system.create_game(1);
        
        let mut deck_cards = array![1213, 1214, 1215, 1216, 1217];
        actions_system.set_deck(deck_cards);

        // Test normal attack
        let result = actions_system.play_card(game_id, 1213, false);
        assert(result.is_ok(), 'play card failed');

        // Verify game state after play
        let game: Game = world.read_model((game_id, caller));
        assert(game.player_energy == 1, 'wrong energy after play');
        assert(!game.current_turn, 'should be AI turn');

        // Test end turn
        let result = actions_system.end_turn(game_id);
        assert(result.is_ok(), 'end turn failed');

        // Verify turn switch and energy increment
        let updated_game: Game = world.read_model((game_id, caller));
        assert(updated_game.current_turn, 'should be player turn');
        assert(updated_game.player_energy == 2, 'wrong energy after turn');
        assert(!updated_game.is_attack_turn, 'should switch to defense');
    }
}