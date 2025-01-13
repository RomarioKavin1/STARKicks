// app/page.tsx
"use client";
import { useAccount } from "@starknet-react/core";
import ConnectWallet from "@/components/ConnectWallet";
import { useEffect, useState } from "react";

export default function Home() {
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <main className="min-h-screen pixel-art-bg text-white flex items-center justify-center p-8">
      <div className="arcade-cabinet">
        <div className="arcade-screen">
          {isLoading ? (
            <div className="loading-screen">
              <div className="loading-text">LOADING...</div>
            </div>
          ) : (
            <div className="game-content">
              {/* Title Section */}
              <div className="game-header">
                <h1 className="game-title pixel-gradient-text mb-2">
                  StarKicks
                </h1>
                <p className="game-subtitle">
                  Build Your Ultimate Football Team on Starknet
                </p>
              </div>

              {/* Wallet Section */}
              <div className="wallet-section">
                <ConnectWallet />
              </div>

              {/* Features Section */}
              {address && (
                <div className="features-section">
                  <ArcadeFeatureCard
                    title="Collect"
                    description="Collect unique football player cards"
                    icon="🎴"
                  />
                  <ArcadeFeatureCard
                    title="Battle"
                    description="Challenge AI or other players"
                    icon="⚔️"
                  />
                  <ArcadeFeatureCard
                    title="Trade"
                    description="Trade cards in the marketplace"
                    icon="💱"
                  />
                </div>
              )}

              {/* CTA */}
              {!address && (
                <div className="cta-section">
                  <p className="insert-coin">INSERT COIN</p>
                </div>
              )}
            </div>
          )}
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

function ArcadeFeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="arcade-card">
      <div className="card-icon">{icon}</div>
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
    </div>
  );
}
