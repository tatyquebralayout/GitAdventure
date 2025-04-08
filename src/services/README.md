# Serviços (Services)

Este diretório contém serviços que encapsulam lógica de negócio independente da interface do usuário. Os serviços são responsáveis por operações como comunicação com APIs, armazenamento de dados, validação e outras funcionalidades compartilhadas.

## Estrutura

```
services/
├── api.ts           # Serviço de comunicação com APIs externas (GitHub)
├── storage.ts       # Serviço para armazenamento local de dados
├── validation.ts    # Serviço para validação de comandos Git e requisitos
└── index.ts         # Exportações centralizadas dos serviços
```

## Serviços Disponíveis

### API Service (`api.ts`)

Responsável por encapsular todas as chamadas a APIs externas, principalmente a API do GitHub.

**Funcionalidades principais:**
- Autenticação com GitHub
- Obtenção de informações de usuário
- Busca e fork de repositórios
- Salvamento de progresso em Gists

**Uso:**
```typescript
import { apiService } from '../services';

// Inicializar com token (após login)
apiService.initialize(token);

// Obter usuário atual
const user = await apiService.getCurrentUser();

// Criar fork de um repositório para uma missão
const repoUrl = await apiService.forkMissionRepository('owner/repo');
```

### Storage Service (`storage.ts`)

Gerencia o armazenamento local de dados usando localStorage e sessionStorage.

**Funcionalidades principais:**
- Armazenamento persistente de dados
- Serialização/deserialização automática
- Gerenciamento de tokens, configurações e progresso

**Uso:**
```typescript
import { storageService, StorageKeys } from '../services';

// Salvar dado
storageService.set(StorageKeys.USER_PROGRESS, progressData);

// Recuperar dado
const progress = storageService.get(StorageKeys.USER_PROGRESS);

// Remover dado
storageService.remove(StorageKeys.CURRENT_MISSION);
```

### Validation Service (`validation.ts`)

Responsável por validar comandos Git e requisitos de missões.

**Funcionalidades principais:**
- Validação de comandos Git contra requisitos
- Verificação de estado de arquivos
- Validação de conclusão de missões

**Uso:**
```typescript
import { validationService } from '../services';

// Validar um comando
const result = validationService.validateCommand(
  'git add .', 
  missionRequirement
);

// Verificar se todos os requisitos foram cumpridos
const missionComplete = validationService.validateAllRequirements(
  mission.requirements,
  completedRequirements
);
```

## Padrões e Convenções

1. **Singleton Pattern**: Todos os serviços utilizam o padrão Singleton para garantir uma única instância durante a execução da aplicação.

2. **Tratamento de Erros**: Os serviços capturam e registram erros internamente, retornando valores nulos ou resultados de erro em vez de propagar exceções.

3. **Tipagem Forte**: Todos os serviços utilizam tipagem TypeScript para garantir segurança e autocompletar IDE.

4. **API Consistente**: Mantemos uma API consistente entre serviços para facilitar o uso.

## Diagrama de Interação

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  API Service    │◄────┤  Components     │────►│ Storage Service │
│                 │     │                 │     │                 │
└────────┬────────┘     └────────┬────────┘     └─────────────────┘
         │                       │                       ▲
         │                       │                       │
         │                       ▼                       │
         │             ┌─────────────────┐               │
         └────────────►│                 │───────────────┘
                       │ Validation Svc  │
                       │                 │
                       └─────────────────┘
``` 