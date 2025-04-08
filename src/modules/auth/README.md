# Módulo de Autenticação

Este módulo é responsável por gerenciar o processo de autenticação do usuário com o GitHub, incluindo login, logout e persistência da sessão.

## Estrutura

```
auth/
├── components/             # Componentes relacionados à autenticação
│   └── LoginButton.tsx     # Botão de login/logout com GitHub
├── hooks/                  # Hooks personalizados
│   └── useAuth.ts          # (Futuro) Hook para acesso ao contexto de autenticação
├── types/                  # Definições de tipos
│   └── index.ts            # Tipos relacionados à autenticação
├── index.ts                # Exportações públicas do módulo
└── README.md               # Documentação do módulo
```

## Componentes

### LoginButton

Componente que exibe um botão para login/logout com GitHub, mostrando diferentes estados com base na autenticação.

**Props:**
- `className?: string` - Classes CSS adicionais
- `variant?: 'primary' | 'secondary'` - Variante visual do botão
- `size?: 'sm' | 'md' | 'lg'` - Tamanho do botão

**Uso:**
```tsx
import { LoginButton } from '../modules/auth';

// Uso básico
<LoginButton />

// Com personalização
<LoginButton 
  variant="secondary" 
  size="lg"
  className="my-custom-class"
/>
```

## Tipos

### AuthUser

Interface que representa um usuário autenticado via GitHub.

```typescript
export interface AuthUser {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  accessToken: string;
}
```

### AuthState

Interface que representa o estado de autenticação.

```typescript
export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: AuthUser | null;
  error: string | null;
}
```

### AuthContextType

Interface que representa o tipo do contexto de autenticação.

```typescript
export interface AuthContextType {
  authState: AuthState;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}
```

## Fluxo de Autenticação

O fluxo de autenticação segue estas etapas:

1. Usuário clica no botão de login (`LoginButton`)
2. A função `login()` do contexto de autenticação é chamada
3. Inicia-se o fluxo OAuth com o GitHub (redirecionamento ou popup)
4. Após autenticação bem-sucedida, o token é armazenado
5. O estado de autenticação é atualizado com as informações do usuário
6. Componentes que usam o contexto são re-renderizados com o novo estado

## Integração com Outros Módulos

O módulo de autenticação interage principalmente com:

- **Serviço de API**: Para realizar chamadas autenticadas à API do GitHub
- **Serviço de Armazenamento**: Para persistir o token e dados de sessão
- **Módulo de Progresso**: Para associar o progresso ao usuário autenticado
- **Componentes da UI**: Para exibir informações do usuário logado

## Diagrama de Fluxo

```
┌─────────────┐     ┌───────────────┐     ┌──────────────┐
│             │     │               │     │              │
│  LoginButton│────►│ AuthContext   │────►│ API Service  │
│             │     │               │     │              │
└─────────────┘     └───────┬───────┘     └──────────────┘
                            │                     ▲
                            ▼                     │
                    ┌───────────────┐     ┌──────┴───────┐
                    │               │     │              │
                    │ UserProfile   │     │Storage Service│
                    │               │     │              │
                    └───────────────┘     └──────────────┘
```

## Desenvolvimento Futuro

- Implementação completa do fluxo OAuth com GitHub
- Adição de múltiplos provedores de autenticação
- Gerenciamento de permissões baseado em níveis de acesso
- Perfis de usuário mais detalhados
- Integração com sistema de amigos/seguidores 