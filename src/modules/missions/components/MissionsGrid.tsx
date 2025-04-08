import { useState } from 'react';
import { MissionCard } from './MissionCard';
import { sampleMissions } from '../data/sampleMissions';
import type { Mission } from '../types';

interface MissionsGridProps {
  worldId: string;
  onSelectMission: (mission: Mission) => void;
}

export function MissionsGrid({ worldId, onSelectMission }: MissionsGridProps) {
  // Filtrar missões pelo worldId
  const worldMissions = sampleMissions.filter(mission => mission.worldId === worldId);
  
  // Estado para missão selecionada (no futuro, esse estado pode ser gerenciado em um nível mais alto)
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  
  const handleMissionClick = (mission: Mission) => {
    setSelectedMission(mission);
    onSelectMission(mission);
  };
  
  if (worldMissions.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-github-text-secondary">Nenhuma missão disponível para este mundo.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {worldMissions.map(mission => (
        <MissionCard
          key={mission.id}
          mission={mission}
          onClick={handleMissionClick}
        />
      ))}
    </div>
  );
} 