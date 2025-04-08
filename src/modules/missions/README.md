# Módulo de Missões

Este módulo gerencia as missões de aprendizado de Git, incluindo definição, exibição, interação e validação de missões.

## Estrutura

```
missions/
├── components/             # Componentes de UI para missões
│   ├── MissionCard.tsx     # Card que exibe uma missão individual
│   └── MissionsGrid.tsx    # Grid que exibe várias missões
├── data/                   # Dados de exemplo e configurações
│   └── sampleMissions.ts   # Missões de exemplo para desenvolvimento
├── hooks/                  # Hooks personalizados
│   └── useMission.ts       # Hook para gerenciar estado e interações de missão
├── types/                  # Definições de tipos
│   └── index.ts            # Tipos relacionados a missões
├── index.ts                # Exportações públicas do módulo
└── README.md               # Documentação do módulo
```

## Componentes

### MissionCard

Componente que exibe um card com detalhes de uma missão, incluindo título, descrição, dificuldade e status.

**Props:**
- `mission: Mission` - Dados da missão a ser exibida
- `onClick: (mission: Mission) => void` - Callback quando o card é clicado

**Uso:**
```tsx
import { MissionCard } from '../modules/missions';

<MissionCard 
  mission={missionData} 
  onClick={handleMissionSelect} 
/>
```

### MissionsGrid

Componente que exibe um grid de missões filtradas por mundo.

**Props:**
- `worldId: string` - ID do mundo para filtrar as missões
- `onSelectMission: (mission: Mission) => void` - Callback quando uma missão é selecionada

**Uso:**
```tsx
import { MissionsGrid } from '../modules/missions';

<MissionsGrid 
  worldId="world-1" 
  onSelectMission={handleMissionSelect} 
/>
```

## Hooks

### useMission

Hook personalizado para gerenciar o estado e interações de uma missão.

**Parâmetros:**
- `missionId?: string` - ID opcional da missão a ser carregada

**Retorno:**
- `mission: Mission | null` - Dados da missão carregada
- `isLoading: boolean` - Status de carregamento
- `error: string | null` - Mensagem de erro, se houver
- `startMission: () => Promise<boolean>` - Função para iniciar a missão
- `validateRequirement: (requirementId: string, value: string) => boolean` - Função para validar um requisito
- `completeMission: () => Promise<boolean>` - Função para completar a missão

**Uso:**
```tsx
import { useMission } from '../modules/missions';

function MissionDetail({ missionId }) {
  const { 
    mission, 
    isLoading, 
    startMission, 
    validateRequirement,
    completeMission 
  } = useMission(missionId);
  
  // Resto do componente...
}
```

## Tipos

### Mission

Interface que representa uma missão completa.

```typescript
export interface Mission {
  id: string;
  worldId: string;
  title: string;
  description: string;
  difficulty: MissionDifficulty;
  status: MissionStatus;
  repositoryTemplate: string;
  requirements: MissionRequirement[];
  hints: MissionHint[];
  rewards: {
    xp: number;
    achievements: string[];
  };
  prerequisites: string[];
  estimatedTime: number;
}
```

### MissionRequirement

Interface que representa um requisito para completar uma missão.

```typescript
export interface MissionRequirement {
  id: string;
  description: string;
  type: 'command' | 'file_state' | 'custom';
  validationRule: string;
}
```

### MissionHint

Interface que representa uma dica para ajudar o usuário na missão.

```typescript
export interface MissionHint {
  id: string;
  text: string;
  unlockAfter?: number;
}
```

## Fluxo de Uso das Missões

1. **Navegação**: Usuário seleciona um mundo e vê as missões disponíveis no `MissionsGrid`
2. **Seleção**: Usuário clica em uma missão no `MissionCard`
3. **Início**: Usuário inicia a missão com `startMission()`
4. **Execução**: Usuário realiza comandos Git que são validados com `validateRequirement()`
5. **Conclusão**: Usuário completa todos os requisitos e finaliza com `completeMission()`
6. **Recompensa**: Usuário recebe XP e conquistas, e novas missões são desbloqueadas

## Integração com Outros Módulos

O módulo de missões interage principalmente com:

- **Serviço de Validação**: Para validar comandos e requisitos das missões
- **Módulo de Mundos**: Para agrupar missões por mundo temático
- **Módulo de Progresso**: Para rastrear missões completadas e recompensas
- **Serviço de API**: Para clonar repositórios de missões e validar soluções

## Diagrama de Fluxo

```
┌─────────────┐     ┌───────────────┐     ┌──────────────┐
│             │     │               │     │              │
│MissionsGrid │────►│ useMission    │────►│Validation Svc│
│             │     │               │     │              │
└─────────────┘     └───────┬───────┘     └──────────────┘
        ▲                   │                     ▲
        │                   ▼                     │
        │           ┌───────────────┐     ┌──────┴───────┐
        └───────────┤               │     │              │
                    │ MissionCard   │     │  API Service │
                    │               │     │              │
                    └───────────────┘     └──────────────┘
```

## Desenvolvimento Futuro

- Implementação da validação automática de requisitos
- Sistema de dicas progressivas baseado no tempo
- Missões colaborativas para múltiplos usuários
- Editor de código integrado para missões específicas
- Sistema de feedback e avaliação de dificuldade 