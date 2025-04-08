import { PlayCircle, Clock, Star, Lock } from 'lucide-react';
import type { Mission } from '../types';

interface MissionCardProps {
  mission: Mission;
  onClick: (mission: Mission) => void;
}

export function MissionCard({ mission, onClick }: MissionCardProps) {
  const isLocked = mission.status === 'locked';
  
  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-orange-100 text-orange-800',
    expert: 'bg-red-100 text-red-800'
  };

  const statusColors = {
    locked: 'bg-gray-100 text-gray-500',
    available: 'bg-blue-100 text-blue-800',
    in_progress: 'bg-purple-100 text-purple-800',
    completed: 'bg-green-100 text-green-800'
  };

  return (
    <div 
      className={`relative rounded-lg border ${isLocked ? 'border-github-border/50 bg-github-darker/50 opacity-75' : 'border-github-border bg-github-darker/80 hover:border-github-accent/50 hover:shadow-github-medium'} transition-all cursor-pointer backdrop-blur-sm p-4`}
      onClick={() => onClick(mission)}
    >
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-github-darker/30 backdrop-blur-sm z-10">
          <Lock className="w-8 h-8 text-github-border" />
        </div>
      )}
      
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-github-text-primary font-medium">{mission.title}</h3>
            <p className="text-github-text-secondary text-sm mt-1">{mission.description}</p>
          </div>
        </div>
        
        <div className="mt-auto pt-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-2 py-0.5 rounded-full text-xs ${difficultyColors[mission.difficulty]}`}>
              {mission.difficulty}
            </span>
            
            <span className={`px-2 py-0.5 rounded-full text-xs ${statusColors[mission.status]}`}>
              {mission.status === 'locked' ? 'Bloqueado' : 
               mission.status === 'available' ? 'Disponível' : 
               mission.status === 'in_progress' ? 'Em Progresso' : 'Concluído'}
            </span>
            
            <span className="flex items-center gap-1 text-github-text-secondary text-xs ml-auto">
              <Clock className="w-3 h-3" />
              {mission.estimatedTime} min
            </span>
            
            <span className="flex items-center gap-1 text-github-text-secondary text-xs">
              <Star className="w-3 h-3" />
              {mission.rewards.xp} XP
            </span>
          </div>
          
          {!isLocked && (
            <button 
              className="mt-3 w-full flex items-center justify-center gap-2 text-sm font-medium px-3 py-1.5 rounded bg-github-accent/10 text-github-accent hover:bg-github-accent/20 transition-colors"
            >
              <PlayCircle className="w-4 h-4" />
              {mission.status === 'completed' ? 'Revisar' : mission.status === 'in_progress' ? 'Continuar' : 'Iniciar'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 