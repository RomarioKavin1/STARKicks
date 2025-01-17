// systems/card_system.cairo
#[starknet::interface]
trait ICardSystem<TContractState> {
    fn mint_card(ref self: TContractState, player: ContractAddress) -> Card;
    fn transfer_card(ref self: TContractState, card_id: u64, to: ContractAddress);
    fn get_card_stats(self: @TContractState, card_id: u64) -> (u8, u8, u8);
}

#[dojo::contract]
mod card_system {
    use super::ICardSystem;
    use starknet::{ContractAddress, get_caller_address};

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        CardMinted: CardMinted,
        CardTransferred: CardTransferred,
    }

    #[derive(Drop, starknet::Event)]
    struct CardMinted {
        player: ContractAddress,
        card_id: u64
    }

    #[derive(Drop, starknet::Event)]
    struct CardTransferred {
        from: ContractAddress,
        to: ContractAddress,
        card_id: u64
    }

    #[external(v0)]
    impl CardSystemImpl of ICardSystem<ContractState> {
        fn mint_card(ref self: ContractState, player: ContractAddress) -> Card {
            let world = self.world_dispatcher.read();
            let card_id = world.next_id();

            // Random stats generation would go here
            let card = Card {
                id: card_id,
                owner: player,
                name: 'New Card',
                attack: 70,
                control: 70,
                defense: 70,
                position: 0,
                rarity: 0,
                special_ability: '',
                in_deck: false,
            };

            set!(world, (card));
            emit!(world, CardMinted { player, card_id });

            card
        }

        fn transfer_card(ref self: ContractState, card_id: u64, to: ContractAddress) {
            let world = self.world_dispatcher.read();
            let player = get_caller_address();

            let mut card = get!(world, (card_id), (Card));
            assert(card.owner == player, 'Not card owner');
            assert(!card.in_deck, 'Card in deck');

            card.owner = to;
            set!(world, (card));

            emit!(world, CardTransferred { from: player, to, card_id });
        }

        fn get_card_stats(self: @ContractState, card_id: u64) -> (u8, u8, u8) {
            let world = self.world_dispatcher.read();
            let card = get!(world, (card_id), (Card));
            (card.attack, card.control, card.defense)
        }
    }
}