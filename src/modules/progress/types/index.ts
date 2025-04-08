/**
 * Tipos relacionados ao progresso do usuário
 */

/**
 * Representa um nível de experiência
 */
export interface Level {
  level: number;
  requiredXp: number;
  title: string;
}

/**
 * Representação de uma conquista desbloqueável
 */
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'hidden';
  unlockedAt: Date | null;
}

/**
 * Histórico de uma missão completada
 */
export interface CompletedMission {
  missionId: string;
  completedAt: Date;
  timeTaken: number; // em segundos
  attempts: number;
}

/**
 * Estado de progresso do usuário
 */
export interface UserProgress {
  userId: string;
  totalXp: number;
  level: number;
  completedMissions: CompletedMission[];
  achievements: Achievement[];
  unlockedWorlds: string[];
  lastActive: Date;
} 