use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};
use starknet::ContractAddress;

fn assert_game_state(
    world: IWorldDispatcher,
    game_id: u64,
    expected_turn: ContractAddress,
    expected_state: u8
) {
    let game = get!(world, game_id, (Game));
    assert(game.current_turn == expected_turn, 'Wrong turn');
    assert(game.state == expected_state, 'Wrong state');
}

fn assert_player_state(
    world: IWorldDispatcher,
    player: ContractAddress,
    expected_energy: u8,
    expected_score: u8
) {
    let player_state = get!(world, (player), (Player));
    assert(player_state.energy == expected_energy, 'Wrong energy');
    assert(player_state.score == expected_score, 'Wrong score');
}