import { useProgress } from '../hooks/useProgress';
import { AchievementBadge } from './AchievementBadge';

export function AchievementsDisplay() {
  const { progress, isLoading, error } = useProgress();
  
  if (isLoading) {
    return (
      <div className="p-4 text-center">
        <div className="animate-pulse h-24 bg-github-border/20 rounded-md"></div>
      </div>
    );
  }
  
  if (error || !progress) {
    return (
      <div className="p-4 text-center">
        <p className="text-github-text-secondary">
          {error || 'Faça login para ver suas conquistas'}
        </p>
      </div>
    );
  }
  
  const { achievements } = progress;
  
  if (achievements.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-github-text-secondary">
          Você ainda não possui conquistas. Complete missões para desbloquear!
        </p>
      </div>
    );
  }
  
  return (
    <div className="p-4">
      <h3 className="text-github-text-primary font-medium mb-4">Suas Conquistas</h3>
      <div className="flex flex-wrap gap-4">
        {achievements.map(achievement => (
          <AchievementBadge
            key={achievement.id}
            achievement={achievement}
            size="md"
          />
        ))}
      </div>
    </div>
  );
}
