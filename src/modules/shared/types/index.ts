export interface World {
  id: string;
  name: string;
  theme: {
    background: string;
    music?: string;
    ambientEffects: string[];
  };
  narrative: {
    introStory: string;
    mainObjective: string;
    conclusion: string;
    characters: Character[];
  };
  chapters: Chapter[];
  isUnlocked: boolean;
  progress: number;
}

export interface Character {
  id: string;
  name: string;
  role: string;
  avatar: string;
  dialogues: Record<string, string>;
}

export interface Chapter {
  id: string;
  title: string;
  challenges: Challenge[];
  isCompleted: boolean;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  objectives: string[];
  hints: string[];
  validation: {
    expectedCommands: string[];
    successCondition: string;
  };
  isCompleted: boolean;
}

export interface WorldViewProps {
  worlds: World[];
  onWorldSelect: (worldId: string) => void;
  currentWorld?: string;
}