"use client";
import { useGame } from "@/contexts/GameContext";
import { Card } from "@/types/game";
import { useState } from "react";
import { PlayerCard } from "@/components/game/PlayerCard";

export default function DeckBuilder() {
  const { state } = useGame();
  const [collection, setCollection] = useState<Card[]>(state.playerCards);
  const [currentDeck, setCurrentDeck] = useState<Card[]>(
    state.playerCards.slice(0, 5)
  );
  const [selectedDeckSlot, setSelectedDeckSlot] = useState<number | null>(null);

  return (
    <div className="deck-builder h-full p-6">
      {/* Current Deck Display */}
      <div className="current-deck-section mb-8">
        <h2 className="font-pixel text-xl text-yellow-400 mb-4 mt-16">
          CURRENT DECK
        </h2>
        <div className="deck-slots flex gap-4 justify-center">
          {currentDeck.map((card, index) => (
            <div
              key={index}
              className={`deck-slot relative ${
                selectedDeckSlot === index
                  ? "scale-105 ring-2 ring-yellow-400"
                  : ""
              }`}
              onClick={() => setSelectedDeckSlot(index)}
            >
              <PlayerCard
                card={card}
                onSelect={() => {}}
                isSelected={false}
                isOpponent={false}
              />
              <div className="position-label absolute -top-2 -left-2 bg-gray-900 px-2 py-1 rounded font-pixel text-xs z-30">
                {index === 0
                  ? "ATK 1"
                  : index === 1
                  ? "ATK 2"
                  : index === 2
                  ? "MID 1"
                  : index === 3
                  ? "MID 2"
                  : "DEF"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Collection Display */}
      <div className="collection-section">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-pixel text-xl text-yellow-400">COLLECTION</h2>
          {/* Filters */}
          <div className="filters flex gap-4">
            <select
              className="arcade-select bg-gray-800 border border-gray-700 px-3 py-1 rounded font-pixel text-sm"
              onChange={(e) => {
                /* Add filter logic */
              }}
            >
              <option value="all">All</option>
              <option value="attack">Attack</option>
              <option value="midfield">Midfield</option>
              <option value="defense">Defense</option>
            </select>
            <select
              className="arcade-select bg-gray-800 border border-gray-700 px-3 py-1 rounded font-pixel text-sm"
              onChange={(e) => {
                /* Add filter logic */
              }}
            >
              <option value="all">All Rarities</option>
              <option value="common">Common</option>
              <option value="rare">Rare</option>
              <option value="epic">Epic</option>
              <option value="legendary">Legendary</option>
            </select>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="cards-grid h-[400px] overflow-y-auto grid grid-cols-5 gap-4 p-4 bg-gray-900/50 rounded-lg">
          {collection.map((card) => (
            <div
              key={card.id}
              className="cursor-pointer transform transition-transform hover:scale-105"
              onClick={() => {
                if (selectedDeckSlot !== null) {
                  const newDeck = [...currentDeck];
                  newDeck[selectedDeckSlot] = card;
                  setCurrentDeck(newDeck);
                  setSelectedDeckSlot(null);
                }
              }}
            >
              <PlayerCard
                card={card}
                onSelect={() => {}}
                isSelected={false}
                isOpponent={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="actions mt-6 flex justify-center gap-4">
        <button
          className="arcade-btn"
          onClick={() => {
            /* Save deck logic */
          }}
        >
          SAVE DECK
        </button>
        <button
          className="arcade-btn"
          onClick={() => {
            /* Reset deck logic */
          }}
        >
          RESET
        </button>
      </div>
    </div>
  );
}
