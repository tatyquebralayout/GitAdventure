import { UserData, UserSettings, ProgressData } from '../types';

export class StorageManager {
  private readonly PREFIX = 'git-adventure:';

  saveUser(userData: UserData): void {
    localStorage.setItem(`${this.PREFIX}user`, JSON.stringify(userData));
  }

  getUser(): UserData | null {
    const data = localStorage.getItem(`${this.PREFIX}user`);
    return data ? JSON.parse(data) : null;
  }

  saveProgress(progress: ProgressData): void {
    localStorage.setItem(`${this.PREFIX}progress`, JSON.stringify(progress));
  }

  getProgress(): ProgressData | null {
    const data = localStorage.getItem(`${this.PREFIX}progress`);
    return data ? JSON.parse(data) : null;
  }

  saveSettings(settings: UserSettings): void {
    localStorage.setItem(`${this.PREFIX}settings`, JSON.stringify(settings));
  }

  getSettings(): UserSettings | null {
    const data = localStorage.getItem(`${this.PREFIX}settings`);
    return data ? JSON.parse(data) : null;
  }

  clear(): void {
    localStorage.removeItem(`${this.PREFIX}user`);
    localStorage.removeItem(`${this.PREFIX}progress`);
    localStorage.removeItem(`${this.PREFIX}settings`);
  }
}