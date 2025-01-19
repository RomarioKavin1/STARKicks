import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Crown, Star } from "lucide-react";

interface PackType {
  id: string;
  name: string;
  type: "basic" | "premium" | "elite";
  price: number;
  description: string;
  cardCount: number;
  rarityOdds: {
    common: number;
    rare: number;
    epic: number;
    legendary: number;
  };
}

const availablePacks: PackType[] = [
  {
    id: "basic",
    name: "Standard Pack",
    type: "basic",
    price: 1000,
    description: "A basic pack with a chance for rare cards",
    cardCount: 3,
    rarityOdds: {
      common: 70,
      rare: 25,
      epic: 4,
      legendary: 1,
    },
  },
  {
    id: "premium",
    name: "Premium Pack",
    type: "premium",
    price: 2500,
    description: "Better odds for epic and legendary cards",
    cardCount: 5,
    rarityOdds: {
      common: 50,
      rare: 35,
      epic: 12,
      legendary: 3,
    },
  },
  {
    id: "elite",
    name: "Elite Pack",
    type: "elite",
    price: 5000,
    description: "Guaranteed legendary with best odds",
    cardCount: 7,
    rarityOdds: {
      common: 30,
      rare: 40,
      epic: 20,
      legendary: 10,
    },
  },
];

export function PackSelection() {
  const [selectedPack, setSelectedPack] = useState<PackType | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const handlePackClick = (pack: PackType) => {
    setSelectedPack(pack);
    setShowConfirm(true);
  };

  const getPackIcon = (type: string) => {
    switch (type) {
      case "basic":
        return <CreditCard className="w-12 h-12 text-gray-400" />;
      case "premium":
        return <Star className="w-12 h-12 text-blue-400" />;
      case "elite":
        return <Crown className="w-12 h-12 text-purple-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-pixel text-center mb-12 text-yellow-400">
        CARD PACKS
      </h1>

      <div className="grid grid-cols-3 gap-12 max-w-5xl mx-auto">
        {availablePacks.map((pack) => (
          <motion.div
            key={pack.id}
            className="pack-container"
            onClick={() => handlePackClick(pack)}
            whileHover={{ scale: 1.02 }}
          >
            <div className={`pack pack-${pack.type}`}>
              <div className="pack-content">
                <div className="pack-cards font-pixel text-sm">
                  {pack.cardCount} Cards
                </div>

                <div className="pack-icon">{getPackIcon(pack.type)}</div>

                <h3 className="pack-name">{pack.name}</h3>
                <p className="pack-description">{pack.description}</p>

                <div className="rarity-bars">
                  <div className="rarity-bar">
                    <div
                      className="rarity-fill"
                      style={{ width: `${pack.rarityOdds.legendary}%` }}
                    />
                  </div>
                  <div className="rarity-bar">
                    <div
                      className="rarity-fill"
                      style={{ width: `${pack.rarityOdds.epic}%` }}
                    />
                  </div>
                  <div className="rarity-bar">
                    <div
                      className="rarity-fill"
                      style={{ width: `${pack.rarityOdds.rare}%` }}
                    />
                  </div>
                </div>

                <div className="pack-price">{pack.price} COINS</div>
              </div>
              <div className="pack-decoration" />
              <div className="pack-border" />
              <div className="pack-shine" />
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showConfirm && selectedPack && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowConfirm(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 p-8 rounded-2xl max-w-md w-full mx-4"
            >
              <h2 className="text-2xl font-pixel mb-6 text-center">
                {selectedPack.name}
              </h2>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="font-pixel text-yellow-400 mb-2">
                    Rarity Odds
                  </h3>
                  <ul className="space-y-1 text-sm">
                    <li className="text-gray-400">
                      Common: {selectedPack.rarityOdds.common}%
                    </li>
                    <li className="text-blue-400">
                      Rare: {selectedPack.rarityOdds.rare}%
                    </li>
                    <li className="text-purple-400">
                      Epic: {selectedPack.rarityOdds.epic}%
                    </li>
                    <li className="text-yellow-400">
                      Legendary: {selectedPack.rarityOdds.legendary}%
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-pixel text-yellow-400 mb-2">Contains</h3>
                  <p className="text-sm">{selectedPack.cardCount} Cards</p>
                  {selectedPack.type === "premium" && (
                    <p className="text-sm text-blue-400 mt-2">
                      Guaranteed Epic+
                    </p>
                  )}
                  {selectedPack.type === "elite" && (
                    <p className="text-sm text-yellow-400 mt-2">
                      Guaranteed Legendary
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  className="arcade-btn bg-gray-600"
                  onClick={() => setShowConfirm(false)}
                >
                  CANCEL
                </button>
                <button
                  className="arcade-btn"
                  onClick={() => {
                    // Handle purchase/open
                  }}
                >
                  OPEN ({selectedPack.price} COINS)
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
