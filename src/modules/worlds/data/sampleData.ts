import type { World } from '../types';

export const sampleWorlds: World[] = [
  {
    id: 'basics',
    name: 'Fundamentos do Git',
    description: 'Aprenda os comandos básicos do Git e comece sua jornada.',
    difficulty: 'beginner',
    status: 'unlocked',
    position: { x: 0, y: 0 },
    challenges: [
      {
        id: 'init',
        name: 'Iniciando um Repositório',
        description: 'Aprenda a criar seu primeiro repositório Git.'
      },
      {
        id: 'commit',
        name: 'Primeiro Commit',
        description: 'Faça seu primeiro commit e salve alterações.'
      }
    ]
  },
  {
    id: 'branching',
    name: 'Mundo das Branches',
    description: 'Explore o poder das branches e trabalho paralelo.',
    difficulty: 'intermediate',
    status: 'locked',
    position: { x: 1, y: 1 },
    challenges: [
      {
        id: 'create-branch',
        name: 'Criando Branches',
        description: 'Aprenda a criar e alternar entre branches.'
      }
    ]
  },
  {
    id: 'remote',
    name: 'Universo Remoto',
    description: 'Conecte-se com repositórios remotos e colabore.',
    difficulty: 'advanced',
    status: 'locked',
    position: { x: 2, y: 0 },
    challenges: [
      {
        id: 'push-pull',
        name: 'Push e Pull',
        description: 'Sincronize seu trabalho com repositórios remotos.'
      }
    ]
  }
];