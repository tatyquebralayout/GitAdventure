/**
 * Dados de exemplo para missões do Git Adventure
 */

import type { Mission } from '../types';

export const sampleMissions: Mission[] = [
  {
    id: 'mission-1',
    worldId: 'world-1',
    title: 'Primeiros Passos com Git',
    description: 'Aprenda os comandos básicos do Git e faça seu primeiro commit.',
    difficulty: 'beginner',
    status: 'available',
    repositoryTemplate: 'https://github.com/tatyquebralayout/git-adventure-mission1',
    requirements: [
      {
        id: 'req-1-1',
        description: 'Inicialize um repositório Git',
        type: 'command',
        validationRule: 'git init'
      },
      {
        id: 'req-1-2',
        description: 'Adicione um arquivo ao stage',
        type: 'command',
        validationRule: 'git add'
      },
      {
        id: 'req-1-3',
        description: 'Crie seu primeiro commit',
        type: 'command',
        validationRule: 'git commit'
      }
    ],
    hints: [
      {
        id: 'hint-1-1',
        text: 'Use git init para criar um novo repositório'
      },
      {
        id: 'hint-1-2',
        text: 'Use git add <arquivo> para adicionar arquivos específicos ao stage'
      },
      {
        id: 'hint-1-3',
        text: 'Use git commit -m "mensagem" para criar um commit com uma mensagem descritiva'
      }
    ],
    rewards: {
      xp: 100,
      achievements: ['first-commit']
    },
    prerequisites: [],
    estimatedTime: 15
  },
  {
    id: 'mission-2',
    worldId: 'world-1',
    title: 'Navegação no Histórico',
    description: 'Aprenda a visualizar e navegar pelo histórico de commits do repositório.',
    difficulty: 'beginner',
    status: 'locked',
    repositoryTemplate: 'https://github.com/tatyquebralayout/git-adventure-mission2',
    requirements: [
      {
        id: 'req-2-1',
        description: 'Visualize o log de commits',
        type: 'command',
        validationRule: 'git log'
      },
      {
        id: 'req-2-2',
        description: 'Examine as mudanças em um commit específico',
        type: 'command',
        validationRule: 'git show'
      },
      {
        id: 'req-2-3',
        description: 'Navegue entre commits usando checkout',
        type: 'command',
        validationRule: 'git checkout'
      }
    ],
    hints: [
      {
        id: 'hint-2-1',
        text: 'Use git log para ver o histórico de commits'
      },
      {
        id: 'hint-2-2',
        text: 'Use git show <hash> para ver detalhes de um commit específico'
      }
    ],
    rewards: {
      xp: 150,
      achievements: ['time-traveler']
    },
    prerequisites: ['mission-1'],
    estimatedTime: 20
  },
  {
    id: 'mission-3',
    worldId: 'world-2',
    title: 'Trabalhando com Branches',
    description: 'Aprenda a criar e gerenciar branches para organizar seu trabalho.',
    difficulty: 'intermediate',
    status: 'locked',
    repositoryTemplate: 'https://github.com/tatyquebralayout/git-adventure-mission3',
    requirements: [
      {
        id: 'req-3-1',
        description: 'Crie uma nova branch',
        type: 'command',
        validationRule: 'git branch'
      },
      {
        id: 'req-3-2',
        description: 'Mude para a nova branch',
        type: 'command',
        validationRule: 'git checkout'
      },
      {
        id: 'req-3-3',
        description: 'Faça mudanças e commits na nova branch',
        type: 'command',
        validationRule: 'git commit'
      },
      {
        id: 'req-3-4',
        description: 'Mescle a branch com a branch principal',
        type: 'command',
        validationRule: 'git merge'
      }
    ],
    hints: [
      {
        id: 'hint-3-1',
        text: 'Use git branch <nome> para criar uma nova branch'
      },
      {
        id: 'hint-3-2',
        text: 'Use git checkout <nome> para mudar de branch'
      }
    ],
    rewards: {
      xp: 200,
      achievements: ['branch-master']
    },
    prerequisites: ['mission-2'],
    estimatedTime: 30
  }
]; 