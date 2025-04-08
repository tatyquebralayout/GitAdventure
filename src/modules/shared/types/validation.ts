export interface Objective {
  id: string;
  description: string;
  type: 'command' | 'state';
  criteria: string;
  completed: boolean;
}

export interface ChallengeContext {
  id: string;
  objectives: Objective[];
  currentStep: number;
}

export interface CommandValidation {
  isValid: boolean;
  message: string;
  progress: number;
}

export interface ProgressUpdate {
  userId: string;
  challengeId: string;
  completedAt: Date;
  score: number;
}