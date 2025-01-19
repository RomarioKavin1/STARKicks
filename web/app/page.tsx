"use client";
import { useAccount } from "@starknet-react/core";
import ConnectWallet from "@/components/ConnectWallet";
import { useEffect, useState } from "react";
import { ArcadeFeatureCard } from "@/components/ArcadeFeatureCard";
import { Logo } from "@/components/logo";

export default function Home() {
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <main className="min-h-screen text-white flex items-center justify-center p-8 relative">
      <div className="arcade-bg">
        <div className="bg-grid" />
        <div className="bg-gradient" />
        <div className="bg-scanlines" />
        <div className="bg-orbs">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
        </div>
      </div>

      <div className="arcade-cabinet">
        <div className="arcade-screen z-10">
          {isLoading ? (
            <div className="loading-screen">
              <div className="loading-text">LOADING...</div>
            </div>
          ) : (
            <div className="game-content">
              <div className="game-header justify-center items-center flex flex-col">
                <Logo />
                <h1 className="game-title pixel-gradient-text mb-2">
                  STARK<span className="text-orange-300">icks</span>
                </h1>
                <p className="game-subtitle">
                  Build Your Ultimate Football Team on Starknet
                </p>
              </div>

              <div className="wallet-section">
                <ConnectWallet />
              </div>

              {address && (
                <div className="features-section">
                  <ArcadeFeatureCard
                    title="Collect"
                    description="Collect unique football player cards"
                    icon="🎴"
                    route="/pack"
                  />
                  <ArcadeFeatureCard
                    title="Battle"
                    description="Challenge AI or other players"
                    icon="⚔️"
                    route="/battle"
                  />
                  <ArcadeFeatureCard
                    title="Trade"
                    description="Trade cards in the marketplace"
                    icon="💱"
                    route="/"
                  />
                  <ArcadeFeatureCard
                    title="Deck"
                    description="Set your deck"
                    icon="🃏"
                    route="/deck"
                  />
                </div>
              )}

              {/* CTA */}
              {!address && (
                <div className="cta-section">
                  <p className="insert-coin">CONNECT WALLET TO GET STARTED</p>
                </div>
              )}
            </div>
          )}
        </div>

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
