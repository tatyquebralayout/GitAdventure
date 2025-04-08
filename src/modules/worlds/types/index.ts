export interface World {
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  status: 'locked' | 'unlocked' | 'completed';
  position: {
    x: number;
    y: number;
  };
  challenges: Challenge[];
  isUnlocked?: boolean;
  progress?: number;
}

export interface Challenge {
  id: string;
  name: string;
  description: string;
  objectives?: string[];
}

export interface WorldViewProps {
  worlds: World[];
  onWorldSelect: (worldId: string) => void;
  currentWorld?: string;
}