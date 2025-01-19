"use client";
import { BackButton } from "@/components/backButton";
import { PreGameCountdown } from "@/components/game/Pregame";
import { TeamCard } from "@/components/game/TeamCard";
import { WalletButton } from "@/components/walletButton";
import { useRouter } from "next/navigation";
// app/battle/page.tsx
import { SetStateAction, useState } from "react";

const AI_TEAMS = [
  {
    id: "mancity",
    name: "Manchester City",
    logo: "/teams/529.png", // Add your team logos
    difficulty: "Medium",
    description: "Red Devils AI with attacking style",
    primaryColor: "red-600",
    secondaryColor: "yellow-400",
  },
  {
    id: "juventus",
    name: "Juventus",
    logo: "/teams/496.png",
    difficulty: "Hard",
    description: "Old Lady AI with defensive tactics",
    primaryColor: "gray-100",
    secondaryColor: "gray-900",
  },
  {
    id: "barca",
    name: "Barcelona",
    logo: "/teams/529.png",
    difficulty: "Hard",
    description: "Tiki-taka style AI play",
    primaryColor: "blue-600",
    secondaryColor: "red-600",
  },
];

export default function BattlePage() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showCountdown, setShowCountdown] = useState(false);
  const router = useRouter();
  const handleTeamSelect = (team: SetStateAction<null>) => {
    setSelectedTeam(team);
  };

  const handlePlayClick = () => {
    setShowCountdown(true);
  };

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
        <div className="arcade-screen">
          <BackButton />
          <WalletButton />
          {showCountdown ? (
            <PreGameCountdown onComplete={() => router.push("/battle/game")} />
          ) : (
            <div className="game-content p-8">
              <h1 className="text-4xl font-pixel text-center mb-8 text-yellow-400">
                SELECT OPPONENT
              </h1>

              <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto">
                {AI_TEAMS.map((team) => (
                  <TeamCard
                    key={team.id}
                    team={team}
                    isSelected={selectedTeam?.id === team.id}
                    onSelect={() => handleTeamSelect(team)}
                  />
                ))}
              </div>

              {selectedTeam && (
                <div className="fixed bottom-64 left-1/2 transform -translate-x-1/2">
                  <button
                    onClick={handlePlayClick}
                    className="arcade-btn bg-yellow-500 text-black px-8 py-3"
                  >
                    PLAY VS {selectedTeam.name}
                  </button>
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

// components/battle/PreGameCountdown.tsx
