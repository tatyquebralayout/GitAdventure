# Módulo de Progresso

Este módulo gerencia o progresso do usuário na plataforma, incluindo missões completadas, conquistas desbloqueadas, e estatísticas de uso.

## Estrutura

```
progress/
├── components/             # Componentes de UI para progresso
│   ├── AchievementCard.tsx # Card que exibe uma conquista
│   ├── ProgressBar.tsx     # Barra de progresso visual
│   └── UserStats.tsx       # Componente de estatísticas do usuário
├── hooks/                  # Hooks personalizados
│   └── useProgress.ts      # Hook para gerenciar estado de progresso
├── types/                  # Definições de tipos
│   └── index.ts            # Tipos relacionados ao progresso
└── index.ts                # Exportações públicas do módulo
```

## Componentes

### AchievementCard

Componente que exibe um card com detalhes de uma conquista, incluindo título, descrição e ícone.

**Props:**
- `achievement: Achievement` - Dados da conquista a ser exibida
- `unlocked: boolean` - Estado de desbloqueio da conquista

**Uso:**
```tsx
import { AchievementCard } from '../modules/progress';

<AchievementCard 
  achievement={achievementData} 
  unlocked={true} 
/>
```

### ProgressBar

Componente que exibe uma barra de progresso visual para missões ou mundos.

**Props:**
- `current: number` - Valor atual
- `total: number` - Valor total
- `label?: string` - Rótulo opcional para a barra
- `color?: string` - Cor da barra

**Uso:**
```tsx
import { ProgressBar } from '../modules/progress';

<ProgressBar 
  current={3} 
  total={10} 
  label="Missões Completadas" 
/>
```

### UserStats

Componente que exibe estatísticas do usuário como XP total, missões completadas e conquistas desbloqueadas.

**Props:**
- `userId: string` - ID do usuário

**Uso:**
```tsx
import { UserStats } from '../modules/progress';

<UserStats userId="user123" />
```

## Hooks

### useProgress

Hook personalizado para gerenciar o estado e interações relacionadas ao progresso do usuário.

**Parâmetros:**
- `userId?: string` - ID opcional do usuário (usa usuário autenticado como padrão)

**Retorno:**
- `progress: UserProgress | null` - Dados de progresso do usuário
- `isLoading: boolean` - Status de carregamento
- `error: string | null` - Mensagem de erro, se houver
- `updateMissionProgress: (missionId: string, status: MissionStatus) => Promise<boolean>` - Função para atualizar o progresso de uma missão
- `addAchievement: (achievementId: string) => Promise<boolean>` - Função para adicionar uma conquista ao usuário
- `addXp: (amount: number) => Promise<number>` - Função para adicionar XP ao usuário
- `getCompletedMissions: () => string[]` - Função para obter missões completadas
- `saveProgress: () => Promise<boolean>` - Função para salvar o progresso no servidor

**Uso:**
```tsx
import { useProgress } from '../modules/progress';

function UserProfile() {
  const { 
    progress, 
    isLoading, 
    getCompletedMissions,
    addXp 
  } = useProgress();
  
  // Resto do componente...
}
```

## Tipos

### UserProgress

Interface principal que representa o progresso de um usuário.

```typescript
export interface UserProgress {
  userId: string;
  totalXp: number;
  level: number;
  completedMissions: CompletedMission[];
  achievements: string[];
  currentWorld: string;
  stats: UserStats;
  lastSaved: string;
}
```

### CompletedMission

Interface que representa uma missão completada pelo usuário.

```typescript
export interface CompletedMission {
  missionId: string;
  completedAt: string;
  timeSpent: number;
  attempts: number;
}
```

### UserStats

Interface que representa estatísticas de uso do usuário.

```typescript
export interface UserStats {
  totalCommands: number;
  sessionsCompleted: number;
  streakDays: number;
  totalTimeSpent: number;
  favoriteCommands: { [command: string]: number };
}
```

## Fluxo de Gerenciamento de Progresso

1. **Inicialização**: O progresso do usuário é carregado ao autenticar
2. **Atualização Contínua**: As ações do usuário são registradas e atualizadas em tempo real
3. **Completar Missão**: Ao completar uma missão, o status é atualizado e XP é concedido
4. **Conquistas**: Baseado nas ações e progresso, conquistas são desbloqueadas automaticamente
5. **Persistência**: O progresso é salvo no servidor em intervalos regulares e ao desconectar

## Integração com Outros Módulos

O módulo de progresso interage principalmente com:

- **Módulo de Missões**: Para atualizar o status de missões completadas
- **Módulo de Autenticação**: Para associar o progresso a um usuário específico
- **Serviço de API**: Para persistir os dados de progresso no servidor
- **Serviço de Armazenamento**: Para cache local do progresso

## Diagrama de Fluxo

```
┌─────────────┐     ┌───────────────┐     ┌──────────────┐
│             │     │               │     │              │
│ Auth Module │────►│ useProgress   │────►│ API Service  │
│             │     │               │     │              │
└─────────────┘     └───────┬───────┘     └──────────────┘
                            │                     ▲
                            ▼                     │
                    ┌───────────────┐     ┌──────┴───────┐
                    │ Componentes   │     │   Storage    │
                    │ de UI         │     │   Service    │
                    └───────────────┘     └──────────────┘
```

## Desenvolvimento Futuro

- Sistema de níveis e recompensas por nível
- Medalhas para achievements especiais
- Placar de líderes com ranking de usuários
- Análise detalhada de desempenho com gráficos
- Sincronização entre dispositivos do progresso
- Sistema de backup e restauração de progresso 