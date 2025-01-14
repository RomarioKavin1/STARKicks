"use client";
import { GameBoard } from "@/components/game/GameBoard";
import { GameProvider } from "@/contexts/GameContext";

export default function BattlePage() {
  return (
    <main className="min-h-screen pixel-art-bg text-white flex items-center justify-center p-8">
      <div className="arcade-cabinet">
        <div className="arcade-screen">
          <GameProvider>
            <GameBoard />
          </GameProvider>
        </div>

        {/* Arcade Controls */}
        <div className="arcade-controls">
          <div className="controls-left">
            <div className="joystick" />
          </div>
          <div className="controls-right">
            <div className="arcade-button red" />
            <div className="arcade-button blue" />
          </div>
        </div>
      </div>
    </main>
  );
}
