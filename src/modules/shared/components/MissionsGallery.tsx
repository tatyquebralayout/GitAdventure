import React from 'react';
import { Star, Trophy, Clock } from 'lucide-react';

interface Mission {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  difficulty: string;
  rewards: string[];
  status: 'available' | 'in_progress' | 'completed';
  worldId: string;
}

const missions: Mission[] = [
  {
    id: '1',
    title: 'Iniciando com Git',
    description: 'Aprenda os comandos básicos do Git e comece sua jornada.',
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb',
    duration: '30 min',
    difficulty: 'Iniciante',
    rewards: ['Badge Iniciante', '100 XP'],
    status: 'available',
    worldId: 'basics'
  },
  {
    id: '2',
    title: 'Dominando Branches',
    description: 'Explore o poder das branches para desenvolvimento paralelo.',
    image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498',
    duration: '45 min',
    difficulty: 'Intermediário',
    rewards: ['Badge Branch Master', '200 XP'],
    status: 'available',
    worldId: 'branching'
  },
  {
    id: '3',
    title: 'Merge e Conflitos',
    description: 'Aprenda a resolver conflitos e fazer merges corretamente.',
    image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498',
    duration: '60 min',
    difficulty: 'Avançado',
    rewards: ['Badge Merge Master', '300 XP'],
    status: 'available',
    worldId: 'branching'
  },
  {
    id: '4',
    title: 'Git Reset e Revert',
    description: 'Aprenda a desfazer alterações e voltar no tempo.',
    image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498',
    duration: '45 min',
    difficulty: 'Intermediário',
    rewards: ['Badge Time Master', '200 XP'],
    status: 'available',
    worldId: 'basics'
  }
];

interface MissionsGalleryProps {
  worldId?: string;
}

export function MissionsGallery({ worldId }: MissionsGalleryProps) {
  const filteredMissions = worldId 
    ? missions.filter(mission => mission.worldId === worldId)
    : missions;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-6">
        {filteredMissions.map((mission) => (
          <div
            key={mission.id}
            className="bg-github-darker rounded-lg border border-github-border overflow-hidden hover:border-github-accent transition-colors group"
          >
            <div className="aspect-video relative overflow-hidden">
              <img
                src={`${mission.image}?auto=format&fit=crop&w=800&q=80`}
                alt={mission.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-github-darker to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-semibold mb-1">{mission.title}</h3>
                <p className="text-github-text-secondary text-sm line-clamp-2">
                  {mission.description}
                </p>
              </div>
            </div>

            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-github-text-secondary">
                  <Clock className="w-4 h-4" />
                  <span>{mission.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-github-text-secondary">
                  <Star className="w-4 h-4" />
                  <span>{mission.difficulty}</span>
                </div>
              </div>

              <div>
                <h4 className="text-github-text-primary text-sm font-medium mb-2">Recompensas</h4>
                <div className="flex flex-wrap gap-2">
                  {mission.rewards.map((reward, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#1c2129] text-github-text-secondary text-xs"
                    >
                      <Trophy className="w-3 h-3" />
                      <span>{reward}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full py-2 bg-github-accent hover:bg-github-accent/90 text-white rounded-md transition-colors text-sm font-medium">
                Iniciar Missão
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}