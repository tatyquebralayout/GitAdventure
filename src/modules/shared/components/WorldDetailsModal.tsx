import { X, ArrowRight, Star } from 'lucide-react';
import type { World } from '../../worlds/types';

interface WorldDetailsModalProps {
  world: World;
  onClose: () => void;
  onEnter: () => void;
}

export function WorldDetailsModal({ world, onClose, onEnter }: WorldDetailsModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-github-darker border border-github-border rounded-lg w-full max-w-2xl mx-4 overflow-hidden shadow-github-heavy">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-github-border">
          <h2 className="text-xl font-semibold text-github-text-primary">{world.name}</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-github-text-secondary hover:text-github-text-primary transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="prose prose-invert max-w-none">
            <p className="text-github-text-primary mb-6">{world.description}</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-[#161b22] rounded-lg p-4 border border-github-border">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-github-accent" />
                <span className="text-github-text-primary text-sm font-medium">Dificuldade</span>
              </div>
              <p className="text-github-text-primary capitalize">{world.difficulty}</p>
            </div>
            <div className="bg-[#161b22] rounded-lg p-4 border border-github-border">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-github-accent" />
                <span className="text-github-text-primary text-sm font-medium">Desafios</span>
              </div>
              <p className="text-github-text-primary">{world.challenges.length} missões</p>
            </div>
            <div className="bg-[#161b22] rounded-lg p-4 border border-github-border">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-github-accent" />
                <span className="text-github-text-primary text-sm font-medium">Status</span>
              </div>
              <p className="text-github-text-primary capitalize">{world.status}</p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <h3 className="text-github-text-primary font-medium">Desafios Disponíveis</h3>
            {world.challenges.map((challenge) => (
              <div
                key={challenge.id}
                className="bg-[#161b22] rounded-lg p-4 border border-github-border"
              >
                <h4 className="text-github-text-primary font-medium mb-2">{challenge.name}</h4>
                <p className="text-github-text-secondary text-sm">{challenge.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-github-border bg-[#161b22]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-github-text-primary hover:text-white transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onEnter}
            className="flex items-center gap-2 px-4 py-2 bg-github-accent hover:bg-github-accent/90 text-white rounded-md transition-colors"
          >
            <span>Entrar no Mundo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}