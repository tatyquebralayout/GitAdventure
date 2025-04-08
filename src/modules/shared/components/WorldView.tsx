import React from 'react';
import { GithubIcon, Lock, CheckCircle } from 'lucide-react';
import type { World, WorldViewProps } from '../types';

const worldNames = [
  'Mundo Físico',
  'Sistemas Naturais',
  'Cultura e Sociedade',
  'História e Passado',
  'Sistemas de Poder',
  'Tecnologia e Magia',
  'Vida Cotidiana',
  'Interações e Relações',
  'Sistemas de Suporte'
];

export function WorldView({ worlds, onWorldSelect, currentWorld }: WorldViewProps) {
  return (
    <div className="space-y-6">
      {/* Text description area */}
      <div className="bg-[#161b22] rounded-lg p-4 border border-github-border">
        <h3 className="text-github-text-primary font-medium mb-2">Universo Git</h3>
        <p className="text-github-text-secondary text-sm">
          Explore o vasto universo do Git através de 9 mundos emocionantes. 
          Cada mundo representa uma nova aventura no aprendizado do controle de versão.
          Desbloqueie novos conhecimentos e torne-se um mestre do Git!
        </p>
      </div>

      {/* Grid of 9 world circles */}
      <div className="grid grid-cols-3 gap-x-4 gap-y-8">
        {[...Array(9)].map((_, index) => {
          const world = worlds[index];
          const isActive = currentWorld === world?.id;
          
          return (
            <div key={world?.id || `empty-${index}`} className="flex flex-col items-center gap-3 group">
              <button
                onClick={() => world?.isUnlocked && onWorldSelect(world.id)}
                className={`
                  w-16 h-16 rounded-full flex items-center justify-center
                  transition-all duration-300 ease-in-out transform
                  hover:scale-110 relative
                  ${world?.isUnlocked 
                    ? 'bg-[#161b22] hover:bg-[#1c2129] cursor-pointer border-2 border-github-border hover:border-github-accent' 
                    : 'bg-[#161b22] cursor-not-allowed border-2 border-github-border opacity-50'}
                  ${isActive ? 'ring-2 ring-github-accent border-github-accent scale-105' : ''}
                  before:content-[''] before:absolute before:inset-0 before:rounded-full
                  before:bg-gradient-stars before:opacity-0 hover:before:opacity-100 before:transition-opacity
                  shadow-github-medium hover:shadow-github-heavy
                `}
              >
                {world ? (
                  world.isUnlocked ? (
                    world.progress === 100 ? (
                      <CheckCircle className="w-6 h-6 text-green-400 transition-transform group-hover:scale-110" />
                    ) : (
                      <GithubIcon className="w-6 h-6 text-github-accent transition-transform group-hover:scale-110" />
                    )
                  ) : (
                    <Lock className="w-6 h-6 text-github-text-secondary transition-transform group-hover:scale-110" />
                  )
                ) : (
                  <Lock className="w-6 h-6 text-github-text-secondary transition-transform group-hover:scale-110" />
                )}

                {/* Progress ring */}
                {world?.isUnlocked && world.progress > 0 && world.progress < 100 && (
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle
                      className="text-github-accent"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="transparent"
                      r="31"
                      cx="32"
                      cy="32"
                      strokeDasharray={`${world.progress * 1.95} 195`}
                    />
                  </svg>
                )}
              </button>

              {/* World name */}
              <div className="text-center">
                <span className="text-xs text-github-text-primary font-medium px-2 block">
                  {worldNames[index]}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}