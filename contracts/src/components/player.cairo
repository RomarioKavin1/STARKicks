#[derive(Component, Copy, Drop, Serde)]
struct Player {
    #[key]
    address: ContractAddress,
    energy: u8,
    score: u8,
}

