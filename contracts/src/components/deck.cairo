#[derive(Component, Copy, Drop, Serde)]
struct Deck {
    #[key]
    player: ContractAddress,
    cards: Span<u64>,
    selected: bool,
}
