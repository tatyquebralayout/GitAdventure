import { useState } from 'react';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  objectives: {
    description: string;
    completed: boolean;
  }[];
  hints: string[];
  currentHintIndex: number;
}

const initialChallenge: Challenge = {
  id: 'init-repository',
  title: 'Criando Seu Primeiro Repositório',
  description: 'Aprenda como criar e inicializar um repositório Git.',
  objectives: [
    {
      description: 'Inicialize um novo repositório Git usando git init',
      completed: false
    },
    {
      description: 'Verifique o status do repositório usando git status',
      completed: false
    }
  ],
  hints: [
    'Comece digitando "git init" para criar um novo repositório',
    'Use "git status" para ver o estado atual do seu repositório',
    'O comando "git" seguido de um subcomando permite realizar várias operações'
  ],
  currentHintIndex: 0
};

export function useChallenge() {
  const [challenge, setChallenge] = useState<Challenge>(initialChallenge);

  const validateCommand = (command: string) => {
    const [cmd, subCmd] = command.trim().split(' ');
    
    if (cmd !== 'git') return;

    setChallenge(prev => ({
      ...prev,
      objectives: prev.objectives.map(obj => {
        if (!obj.completed) {
          if (subCmd === 'init' && obj.description.includes('git init')) {
            return { ...obj, completed: true };
          }
          if (subCmd === 'status' && obj.description.includes('git status')) {
            return { ...obj, completed: true };
          }
        }
        return obj;
      })
    }));
  };

  const getNextHint = () => {
    if (challenge.currentHintIndex < challenge.hints.length - 1) {
      setChallenge(prev => ({
        ...prev,
        currentHintIndex: prev.currentHintIndex + 1
      }));
    }
  };

  const getCurrentHint = () => {
    return challenge.hints[challenge.currentHintIndex];
  };

  const isCompleted = () => {
    return challenge.objectives.every(obj => obj.completed);
  };

  return {
    challenge,
    validateCommand,
    getNextHint,
    getCurrentHint,
    isCompleted
  };
}