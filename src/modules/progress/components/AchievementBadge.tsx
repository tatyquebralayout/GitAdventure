import type { Achievement } from '../types';

interface AchievementBadgeProps {
  achievement: Achievement;
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
}

export function AchievementBadge({ 
  achievement, 
  size = 'md', 
  showTooltip = true 
}: AchievementBadgeProps) {
  const { title, description, icon, category, unlockedAt } = achievement;
  
  const isUnlocked = unlockedAt !== null;
  
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-lg',
    lg: 'w-16 h-16 text-2xl'
  };
  
  const categoryColors = {
    beginner: 'bg-green-500',
    intermediate: 'bg-blue-500',
    advanced: 'bg-purple-500',
    expert: 'bg-amber-500',
    hidden: 'bg-gray-500'
  };
  
  return (
    <div className="relative group">
      <div 
        className={`
          ${sizeClasses[size]} flex items-center justify-center rounded-full
          ${isUnlocked 
            ? `${categoryColors[category]} shadow-md` 
            : 'bg-github-border/30 opacity-40'
          }
          transition-transform duration-300 group-hover:scale-110
        `}
      >
        <span role="img" aria-label={title}>
          {isUnlocked ? icon : '?'}
        </span>
      </div>
      
      {showTooltip && (
        <div className="
          absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48
          bg-github-darker border border-github-border rounded-md shadow-github-heavy
          opacity-0 invisible group-hover:opacity-100 group-hover:visible
          transition-opacity duration-200 z-10 p-3
        ">
          <div className="flex flex-col gap-1">
            <h4 className="font-medium text-github-text-primary">{title}</h4>
            <p className="text-xs text-github-text-secondary">{description}</p>
            {isUnlocked && (
              <p className="text-xs text-github-text-secondary mt-1">
                Desbloqueado em {unlockedAt.toLocaleDateString()}
              </p>
            )}
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1.5 border-8 border-transparent border-t-github-border"></div>
        </div>
      )}
    </div>
  );
}