// components/battle/TeamCard.tsx
interface Team {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  difficulty: string;
  description: string;
}

interface TeamCardProps {
  team: Team;
  isSelected: boolean;
  onSelect: () => void;
}

export function TeamCard({ team, isSelected, onSelect }: TeamCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ${
        isSelected ? "ring-4 ring-yellow-400 scale-105" : ""
      }`}
    >
      <div className={`bg-${team.primaryColor} p-6 h-full bg-opacity-90`}>
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
            <img src={team.logo} alt={team.name} />
            {/* <span className="text-2xl">{team.name[0]}</span> */}
          </div>
          <div>
            <h3 className="text-xl font-pixel mb-1">{team.name}</h3>
            <span className={`text-${team.secondaryColor} font-pixel text-sm`}>
              {team.difficulty}
            </span>
          </div>
        </div>
        <p className="text-xs opacity-80 font-pixel">{team.description}</p>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </div>
  );
}
