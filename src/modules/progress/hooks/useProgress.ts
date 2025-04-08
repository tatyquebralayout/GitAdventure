import { useState, useEffect } from 'react';
import type { UserProgress, CompletedMission, Achievement } from '../types';
import { useAuth } from '../../../context/AuthContext';

/**
 * Hook para gerenciar o progresso do usuário
 * 
 * @returns Métodos e estado para interagir com o progresso do usuário
 */
export function useProgress() {
  const { authState } = useAuth();
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar o progresso do usuário (simulado por enquanto)
  useEffect(() => {
    if (!authState.isAuthenticated) {
      setProgress(null);
      setIsLoading(false);
      return;
    }

    const fetchProgress = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Simulação de carregamento do progresso
        // No futuro, isso buscará o progresso de um serviço/API ou GitHub Gists
        setTimeout(() => {
          const mockProgress: UserProgress = {
            userId: authState.user?.id || '',
            totalXp: 250,
            level: 2,
            completedMissions: [
              {
                missionId: 'mission-1',
                completedAt: new Date('2023-04-01'),
                timeTaken: 900, // 15 minutos
                attempts: 1
              }
            ],
            achievements: [
              {
                id: 'first-commit',
                title: 'Primeiro Commit',
                description: 'Você fez seu primeiro commit!',
                icon: '🌟',
                category: 'beginner',
                unlockedAt: new Date('2023-04-01')
              }
            ],
            unlockedWorlds: ['world-1'],
            lastActive: new Date()
          };
          
          setProgress(mockProgress);
          setIsLoading(false);
        }, 800);
      } catch (err) {
        setError('Erro ao carregar o progresso');
        setIsLoading(false);
      }
    };

    fetchProgress();
  }, [authState.isAuthenticated, authState.user?.id]);

  // Adicionar uma missão completada
  const addCompletedMission = async (mission: CompletedMission): Promise<boolean> => {
    if (!progress || !authState.isAuthenticated) return false;
    
    try {
      // No futuro, isso enviará a missão completada para o serviço/API
      
      // Por enquanto, apenas atualizamos o estado local
      setProgress(prev => {
        if (!prev) return null;
        
        return {
          ...prev,
          completedMissions: [...prev.completedMissions, mission],
          // Adiciona XP (valor simulado)
          totalXp: prev.totalXp + 100,
          // Atualiza o nível baseado no XP total (lógica simplificada)
          level: Math.floor((prev.totalXp + 100) / 200) + 1,
          lastActive: new Date()
        };
      });
      
      return true;
    } catch (err) {
      setError('Erro ao adicionar missão completada');
      return false;
    }
  };

  // Adicionar uma conquista
  const addAchievement = async (achievement: Achievement): Promise<boolean> => {
    if (!progress || !authState.isAuthenticated) return false;
    
    try {
      // No futuro, isso enviará a conquista para o serviço/API
      
      // Por enquanto, apenas atualizamos o estado local
      setProgress(prev => {
        if (!prev) return null;
        
        // Verifica se a conquista já existe
        const existingAchievement = prev.achievements.find(a => a.id === achievement.id);
        if (existingAchievement) return prev;
        
        return {
          ...prev,
          achievements: [...prev.achievements, achievement],
          // Adiciona XP (valor simulado)
          totalXp: prev.totalXp + 50,
          // Atualiza o nível baseado no XP total (lógica simplificada)
          level: Math.floor((prev.totalXp + 50) / 200) + 1,
          lastActive: new Date()
        };
      });
      
      return true;
    } catch (err) {
      setError('Erro ao adicionar conquista');
      return false;
    }
  };

  // Desbloquear um mundo
  const unlockWorld = async (worldId: string): Promise<boolean> => {
    if (!progress || !authState.isAuthenticated) return false;
    
    try {
      // No futuro, isso enviará o mundo desbloqueado para o serviço/API
      
      // Por enquanto, apenas atualizamos o estado local
      setProgress(prev => {
        if (!prev) return null;
        
        // Verifica se o mundo já está desbloqueado
        if (prev.unlockedWorlds.includes(worldId)) return prev;
        
        return {
          ...prev,
          unlockedWorlds: [...prev.unlockedWorlds, worldId],
          lastActive: new Date()
        };
      });
      
      return true;
    } catch (err) {
      setError('Erro ao desbloquear mundo');
      return false;
    }
  };

  return {
    progress,
    isLoading,
    error,
    addCompletedMission,
    addAchievement,
    unlockWorld
  };
} 