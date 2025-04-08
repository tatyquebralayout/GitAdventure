/**
 * Tipos relacionados à autenticação e gerenciamento de sessão
 */

/**
 * Representa um usuário autenticado via GitHub
 */
export interface AuthUser {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  accessToken: string;
}

/**
 * Estado de autenticação
 */
export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: AuthUser | null;
  error: string | null;
}

/**
 * Contexto de autenticação
 */
export interface AuthContextType {
  authState: AuthState;
  login: () => Promise<void>;
  logout: () => Promise<void>;
} 