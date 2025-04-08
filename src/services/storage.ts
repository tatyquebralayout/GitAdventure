/**
 * Storage Service
 * 
 * Serviço para gerenciamento de dados locais, utilizando localStorage ou sessionStorage.
 * Provê uma API consistente para armazenamento e recuperação de dados com serialização/deserialização automática.
 */

/**
 * Chaves utilizadas no armazenamento local
 */
export enum StorageKeys {
  AUTH_TOKEN = 'git_adventure_auth_token',
  USER_PROGRESS = 'git_adventure_progress',
  USER_SETTINGS = 'git_adventure_settings',
  CURRENT_MISSION = 'git_adventure_current_mission',
  COMPLETED_MISSIONS = 'git_adventure_completed_missions',
  ACHIEVEMENTS = 'git_adventure_achievements'
}

/**
 * Tipo de armazenamento
 */
export type StorageType = 'local' | 'session';

/**
 * Serviço de armazenamento local
 */
export class StorageService {
  private static instance: StorageService;

  /**
   * Construtor privado para implementar Singleton
   */
  private constructor() {}

  /**
   * Obtém a instância única do serviço (Singleton)
   */
  public static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  /**
   * Salva um valor no armazenamento
   */
  public set<T>(key: StorageKeys, value: T, type: StorageType = 'local'): void {
    try {
      const storage = type === 'local' ? localStorage : sessionStorage;
      const serialized = JSON.stringify(value);
      storage.setItem(key, serialized);
    } catch (error) {
      console.error(`Erro ao salvar ${key} no armazenamento:`, error);
    }
  }

  /**
   * Recupera um valor do armazenamento
   */
  public get<T>(key: StorageKeys, type: StorageType = 'local'): T | null {
    try {
      const storage = type === 'local' ? localStorage : sessionStorage;
      const serialized = storage.getItem(key);
      
      if (!serialized) {
        return null;
      }
      
      return JSON.parse(serialized) as T;
    } catch (error) {
      console.error(`Erro ao recuperar ${key} do armazenamento:`, error);
      return null;
    }
  }

  /**
   * Remove um valor do armazenamento
   */
  public remove(key: StorageKeys, type: StorageType = 'local'): void {
    try {
      const storage = type === 'local' ? localStorage : sessionStorage;
      storage.removeItem(key);
    } catch (error) {
      console.error(`Erro ao remover ${key} do armazenamento:`, error);
    }
  }

  /**
   * Limpa todo o armazenamento relacionado à aplicação
   */
  public clearAll(): void {
    try {
      // Remove todos os itens relacionados à aplicação do localStorage
      Object.values(StorageKeys).forEach(key => {
        localStorage.removeItem(key);
      });
      
      // Remove todos os itens relacionados à aplicação do sessionStorage
      Object.values(StorageKeys).forEach(key => {
        sessionStorage.removeItem(key);
      });
    } catch (error) {
      console.error('Erro ao limpar armazenamento:', error);
    }
  }
}

// Exporta uma instância do serviço para uso em toda a aplicação
export const storageService = StorageService.getInstance(); 