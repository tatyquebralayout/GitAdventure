/**
 * API Service
 * 
 * Serviço responsável por encapsular todas as chamadas a APIs externas,
 * incluindo GitHub, e quaisquer outras APIs que venham a ser utilizadas.
 * 
 * Este serviço centraliza o tratamento de erros, autenticação e transformação
 * de dados para o restante da aplicação.
 */

import { Octokit } from '@octokit/rest';
import type { AuthUser } from '../modules/auth/types';
import type { Mission } from '../modules/missions/types';

/**
 * Classe que gerencia as chamadas à API do GitHub e outras APIs externas
 */
export class ApiService {
  private static instance: ApiService;
  private octokit: Octokit | null = null;
  private token: string | null = null;

  /**
   * Construtor privado para implementar Singleton
   */
  private constructor() {}

  /**
   * Obtém a instância única do serviço (Singleton)
   */
  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  /**
   * Inicializa o cliente do Octokit com um token de acesso
   */
  public initialize(token: string): void {
    this.token = token;
    this.octokit = new Octokit({ 
      auth: token 
    });
  }

  /**
   * Limpa o token e o cliente do Octokit
   */
  public clearAuth(): void {
    this.token = null;
    this.octokit = new Octokit();
  }

  /**
   * Verifica se o usuário está autenticado
   */
  public isAuthenticated(): boolean {
    return !!this.token;
  }

  /**
   * Obtém informações do usuário autenticado
   */
  public async getCurrentUser(): Promise<AuthUser | null> {
    try {
      if (!this.octokit) {
        this.octokit = new Octokit();
      }

      if (this.token) {
        const { data } = await this.octokit.users.getAuthenticated();
        return {
          id: data.id.toString(),
          username: data.login,
          displayName: data.name || data.login,
          avatarUrl: data.avatar_url,
          accessToken: this.token
        };
      }

      // Para demonstração, retornamos um usuário de exemplo
      // Em produção, isso não existiria
      const { data } = await this.octokit.users.getByUsername({
        username: 'tatyquebralayout'
      });

      return {
        id: data.id.toString(),
        username: data.login,
        displayName: data.name || data.login,
        avatarUrl: data.avatar_url,
        accessToken: 'demo-token'
      };

    } catch (error) {
      console.error('Erro ao obter usuário:', error);
      return null;
    }
  }

  /**
   * Obtém missões com base no ID do mundo
   */
  public async getMissions(worldId: string): Promise<Mission[]> {
    // Em uma implementação real, isso buscaria missões de uma API
    // Por enquanto, simulamos uma chamada de API
    
    try {
      // Simulando tempo de resposta de API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Aqui, em um projeto real, buscaríamos as missões do servidor
      // Por enquanto, retornamos um vetor vazio para ser preenchido depois
      return [];
    } catch (error) {
      console.error('Erro ao buscar missões:', error);
      return [];
    }
  }

  /**
   * Cria um fork de um repositório template para uma missão
   */
  public async forkMissionRepository(templateRepo: string): Promise<string | null> {
    try {
      if (!this.octokit || !this.token) {
        throw new Error('Usuário não autenticado');
      }

      // Separa o owner/repo
      const [owner, repo] = templateRepo.split('/');
      
      const { data } = await this.octokit.repos.createFork({
        owner,
        repo
      });

      return data.html_url;
    } catch (error) {
      console.error('Erro ao criar fork:', error);
      return null;
    }
  }

  /**
   * Salva o progresso do usuário em um GitHub Gist
   */
  public async saveProgress(progressData: any): Promise<boolean> {
    try {
      if (!this.octokit || !this.token) {
        throw new Error('Usuário não autenticado');
      }

      const content = JSON.stringify(progressData, null, 2);
      
      // Verifica se já existe um gist para o progresso
      // Em um caso real, armazenaríamos o ID do gist em algum lugar
      
      // Cria um novo gist
      await this.octokit.gists.create({
        files: {
          'git-adventure-progress.json': {
            content
          }
        },
        description: 'Git Adventure - Progresso do usuário',
        public: false
      });

      return true;
    } catch (error) {
      console.error('Erro ao salvar progresso:', error);
      return false;
    }
  }
}

// Exporta uma instância do serviço para uso em toda a aplicação
export const apiService = ApiService.getInstance(); 