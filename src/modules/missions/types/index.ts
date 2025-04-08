/**
 * Tipos relacionados às missões
 */

/**
 * Representa um requisito para uma missão
 */
export interface MissionRequirement {
  id: string;
  description: string;
  type: 'command' | 'file_state' | 'custom';
  validationRule: string;
}

/**
 * Representa uma dica para ajudar o usuário em uma missão
 */
export interface MissionHint {
  id: string;
  text: string;
  unlockAfter?: number; // tempo em segundos após o início da missão
}

/**
 * Dificuldade da missão
 */
export type MissionDifficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';

/**
 * Estado da missão
 */
export type MissionStatus = 'locked' | 'available' | 'in_progress' | 'completed';

/**
 * Representa uma missão completa
 */
export interface Mission {
  id: string;
  worldId: string;
  title: string;
  description: string;
  difficulty: MissionDifficulty;
  status: MissionStatus;
  repositoryTemplate: string; // URL do repositório template no GitHub
  requirements: MissionRequirement[];
  hints: MissionHint[];
  rewards: {
    xp: number;
    achievements: string[];
  };
  prerequisites: string[]; // IDs de missões que devem ser completadas antes
  estimatedTime: number; // tempo estimado em minutos
} 