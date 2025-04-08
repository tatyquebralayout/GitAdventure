import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { AuthContextType, AuthState, AuthUser } from '../modules/auth/types';

const initialAuthState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  error: null
};

// Criação do contexto de autenticação
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider para o contexto de autenticação
export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);

  // Inicialização - verificar se o usuário já está autenticado
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Implementação futura: verificar token no localStorage
        // e validar com o GitHub se necessário
        
        // Temporário: apenas para simular o fim do carregamento
        setAuthState(prev => ({ ...prev, isLoading: false }));
      } catch (error) {
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          user: null,
          error: 'Falha ao verificar autenticação'
        });
      }
    };

    checkAuthStatus();
  }, []);

  // Método de login usando GitHub OAuth
  const login = async () => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // Implementação futura: Iniciar fluxo de autenticação OAuth com GitHub
      
      // Temporário: Simular um login bem-sucedido após 1 segundo
      setTimeout(() => {
        const mockUser: AuthUser = {
          id: '123456',
          username: 'tatyquebralayout',
          displayName: 'Tatiana Quebra Layout',
          avatarUrl: 'https://github.com/tatyquebralayout.png',
          accessToken: 'mock-token-123'
        };
        
        setAuthState({
          isAuthenticated: true,
          isLoading: false,
          user: mockUser,
          error: null
        });
      }, 1000);
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Falha ao realizar login'
      }));
    }
  };

  // Método de logout
  const logout = async () => {
    try {
      // Implementação futura: Remover token do localStorage e talvez revogar no GitHub
      
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        error: null
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        error: 'Falha ao realizar logout'
      }));
    }
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para usar o contexto de autenticação
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  
  return context;
} 