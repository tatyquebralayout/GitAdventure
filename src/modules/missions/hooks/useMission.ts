import { useState, useEffect } from 'react';
import type { Mission, MissionStatus } from '../types';

/**
 * Hook para gerenciar missões
 * 
 * @param missionId ID da missão (opcional)
 * @returns Métodos e estado para interagir com missões
 */
export function useMission(missionId?: string) {
  const [mission, setMission] = useState<Mission | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar detalhes da missão (simulado por enquanto)
  useEffect(() => {
    if (!missionId) {
      setIsLoading(false);
      return;
    }

    const fetchMission = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Simulação de carregamento de uma missão
        // No futuro, isso buscará a missão de um serviço/API
        setTimeout(() => {
          const mockMission: Mission = {
            id: missionId,
            worldId: 'world-1',
            title: 'Sua Primeira Missão Git',
            description: 'Aprenda a clonar um repositório e fazer seu primeiro commit.',
            difficulty: 'beginner',
            status: 'available',
            repositoryTemplate: 'https://github.com/tatyquebralayout/mission-template-1',
            requirements: [
              {
                id: 'req-1',
                description: 'Clone o repositório',
                type: 'command',
                validationRule: 'git clone'
              },
              {
                id: 'req-2',
                description: 'Adicione um arquivo ao stage',
                type: 'command',
                validationRule: 'git add'
              },
              {
                id: 'req-3',
                description: 'Faça seu primeiro commit',
                type: 'command',
                validationRule: 'git commit'
              }
            ],
            hints: [
              {
                id: 'hint-1',
                text: 'Use git clone URL para clonar o repositório'
              },
              {
                id: 'hint-2',
                text: 'Use git add . para adicionar todos os arquivos modificados'
              }
            ],
            rewards: {
              xp: 100,
              achievements: ['first-commit']
            },
            prerequisites: [],
            estimatedTime: 15
          };
          
          setMission(mockMission);
          setIsLoading(false);
        }, 800);
      } catch (err) {
        setError('Erro ao carregar a missão');
        setIsLoading(false);
      }
    };

    fetchMission();
  }, [missionId]);

  // Iniciar uma missão
  const startMission = async () => {
    if (!mission) return;
    
    try {
      // No futuro, isso fará um fork do repositório template
      // e configurará o ambiente local
      
      // Por enquanto, apenas atualizamos o status
      setMission(prev => prev ? { 
        ...prev, 
        status: 'in_progress' 
      } : null);
      
      return true;
    } catch (err) {
      setError('Erro ao iniciar a missão');
      return false;
    }
  };

  // Validar requisitos da missão
  const validateRequirement = (requirementId: string, value: string): boolean => {
    if (!mission) return false;
    
    const requirement = mission.requirements.find(req => req.id === requirementId);
    if (!requirement) return false;
    
    // Lógica simplificada de validação
    return value.includes(requirement.validationRule);
  };

  // Completar uma missão
  const completeMission = async () => {
    if (!mission) return false;
    
    try {
      // No futuro, isso validará todos os requisitos e enviará para o sistema
      
      // Por enquanto, apenas atualizamos o status
      setMission(prev => prev ? {
        ...prev,
        status: 'completed'
      } : null);
      
      return true;
    } catch (err) {
      setError('Erro ao completar a missão');
      return false;
    }
  };

  return {
    mission,
    isLoading,
    error,
    startMission,
    validateRequirement,
    completeMission
  };
} 