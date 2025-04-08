export interface UserData {
  id: string;
  githubToken: string;
  displayName: string;
  email: string;
  avatarUrl: string;
  createdAt: Date;
}

export interface ProgressData {
  completedChallenges: string[];
  unlockedAchievements: string[];
  currentLevel: number;
  lastSyncedAt: Date;
}

export interface UserSettings {
  theme: 'light' | 'dark';
  soundEnabled: boolean;
  language: string;
  notifications: boolean;
}