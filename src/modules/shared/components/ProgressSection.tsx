import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import type { Challenge } from '../hooks/useChallenge';

interface ProgressSectionProps {
  challenge: Challenge;
}

export function ProgressSection({ challenge }: ProgressSectionProps) {
  const completedObjectives = challenge.objectives.filter(obj => obj.completed).length;
  const totalObjectives = challenge.objectives.length;
  const progressPercentage = (completedObjectives / totalObjectives) * 100;

  return (
    <div className="bg-github-darker rounded-lg border border-github-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-github-text-primary font-semibold">{challenge.title}</h3>
        <span className="text-github-text-secondary text-sm">
          {completedObjectives}/{totalObjectives} objetivos
        </span>
      </div>

      <div className="mb-4">
        <div className="h-2 bg-github-dark rounded-full overflow-hidden">
          <div 
            className="h-full bg-github-accent transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        {challenge.objectives.map((objective, index) => (
          <div 
            key={index}
            className="flex items-start gap-3 text-sm"
          >
            {objective.completed ? (
              <CheckCircle2 className="w-5 h-5 text-github-success flex-shrink-0 mt-0.5" />
            ) : (
              <Circle className="w-5 h-5 text-github-text-secondary flex-shrink-0 mt-0.5" />
            )}
            <span className={objective.completed ? 'text-github-text-primary' : 'text-github-text-secondary'}>
              {objective.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}