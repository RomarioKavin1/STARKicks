import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayerCard } from "../game/PlayerCard";
import { Card } from "@/types/game";
import { mockCards } from "@/mock/cards";
import { CreditCard, Crown, Star } from "lucide-react";
import confetti from "canvas-confetti";

interface PackOpeningProps {
  packType: "basic" | "premium" | "elite";
  onComplete: () => void;
  isOpen: boolean;
}

export function PackOpening({
  packType,
  onComplete,
  isOpen,
}: PackOpeningProps) {
  const [stage, setStage] = useState<"pack" | "opening" | "revealing">("pack");
  const [currentCardIndex, setCurrentCardIndex] = useState(-1);
  const [cards, setCards] = useState<Card[]>([]);
  useEffect(() => {
    if (isOpen) {
      setStage("pack");
      setCurrentCardIndex(-1);
      generatePack();
    }
  }, [isOpen]);
  const generateCard = useCallback(
    (forcedRarity?: string): Card => {
      const getRarity = () => {
        if (forcedRarity) return forcedRarity;

        const rand = Math.random() * 100;
        let odds;

        switch (packType) {
          case "elite":
            odds = { legendary: 10, epic: 20, rare: 40, common: 30 };
            break;
          case "premium":
            odds = { legendary: 3, epic: 12, rare: 35, common: 50 };
            break;
          default:
            odds = { legendary: 1, epic: 4, rare: 25, common: 70 };
        }

        if (rand < odds.legendary) return "legendary";
        if (rand < odds.legendary + odds.epic) return "epic";
        if (rand < odds.legendary + odds.epic + odds.rare) return "rare";
        return "common";
      };

      const baseCard = {
        ...mockCards[Math.floor(Math.random() * mockCards.length)],
      };
      return {
        ...baseCard,
        id: Math.random().toString(36).substr(2, 9),
        rarity: getRarity() as "common" | "rare" | "epic" | "legendary",
      };
    },
    [packType]
  );

  const generatePack = useCallback(() => {
    const cardCount = packType === "elite" ? 7 : packType === "premium" ? 5 : 3;
    let newCards: Card[] = [];

    if (packType === "elite") {
      newCards.push(generateCard("legendary"));
      newCards.push(generateCard("epic"));
    } else if (packType === "premium") {
      newCards.push(generateCard("epic"));
    }

    while (newCards.length < cardCount) {
      newCards.push(generateCard());
    }

    newCards = newCards.sort(() => Math.random() - 0.5);
    setCards(newCards);
  }, [packType, generateCard]);

  useEffect(() => {
    generatePack();
  }, [generatePack]);

  const handleClick = () => {
    if (stage === "pack") {
      setStage("opening");
      setTimeout(() => {
        setStage("revealing");
        setCurrentCardIndex(0);
      }, 1000);
    } else if (stage === "revealing") {
      if (currentCardIndex < cards.length - 1) {
        setCurrentCardIndex((prev) => prev + 1);
      } else {
        onComplete();
      }
    }
  };

  const getPackIcon = () => {
    switch (packType) {
      case "basic":
        return <CreditCard className="w-16 h-16 text-gray-400" />;
      case "premium":
        return <Star className="w-16 h-16 text-blue-400" />;
      case "elite":
        return <Crown className="w-16 h-16 text-purple-400" />;
    }
  };

  const createParticles = (rarity: string) => {
    if (rarity === "legendary" || rarity === "epic") {
      confetti({
        particleCount: rarity === "legendary" ? 100 : 50,
        spread: 70,
        origin: { y: 0.6 },
        colors:
          rarity === "legendary"
            ? ["#fbbf24", "#f59e0b", "#d97706"]
            : ["#a855f7", "#7c3aed", "#6d28d9"],
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/90" />

          {/* Content container */}
          <div
            className="relative z-10 w-full max-w-4xl p-8 flex flex-col items-center justify-center min-h-[600px]"
            onClick={handleClick}
          >
            <AnimatePresence mode="wait">
              {stage === "pack" && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className={`physical-pack pack-${packType} cursor-pointer hover:scale-105 transition-transform duration-300`}
                >
                  <div className="pack-front">
                    <div className="pack-logo">{getPackIcon()}</div>
                    <div className="pack-decoration" />
                    <div className="pack-shine" />
                    <div className="pack-glow" />
                  </div>
                  <div className="pack-back" />
                </motion.div>
              )}

              {stage === "opening" && (
                <motion.div
                  className={`physical-pack pack-${packType} pack-opening`}
                >
                  <div className="pack-front">
                    <div className="pack-logo">{getPackIcon()}</div>
                    <div className="pack-decoration" />
                  </div>
                  <div className="pack-back" />
                </motion.div>
              )}

              {stage === "revealing" &&
                currentCardIndex >= 0 &&
                cards[currentCardIndex] && (
                  <div className="flex flex-col items-center gap-6">
                    <motion.div
                      key={currentCardIndex}
                      initial={{ scale: 0.5, y: 100, opacity: 0 }}
                      animate={{ scale: 1.5, y: 0, opacity: 1 }}
                      className={
                        cards[currentCardIndex].rarity === "legendary"
                          ? "legendary-reveal"
                          : cards[currentCardIndex].rarity === "epic"
                          ? "epic-reveal"
                          : ""
                      }
                      onAnimationStart={() =>
                        createParticles(cards[currentCardIndex].rarity)
                      }
                    >
                      <PlayerCard
                        card={cards[currentCardIndex]}
                        onSelect={() => {}}
                        isSelected={false}
                        isOpponent={false}
                      />
                    </motion.div>

                    <div className="text-yellow-400 font-pixel text-lg">
                      {currentCardIndex + 1} / {cards.length}
                    </div>
                  </div>
                )}
            </AnimatePresence>

            {stage === "pack" && (
              <div className="absolute bottom-8 text-white font-pixel text-lg">
                Click the pack to open
              </div>
            )}

            {stage === "revealing" && (
              <div className="absolute bottom-8 text-white font-pixel text-lg">
                Click to continue
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
