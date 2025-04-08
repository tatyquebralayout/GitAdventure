import React from 'react';
import { MessageCircle, Play, Lightbulb } from 'lucide-react';

interface DialogueBoxProps {
  message: string;
  character: {
    name: string;
    avatar: string;
  };
  onStart?: () => void;
  onHint?: () => void;
}

export function DialogueBox({ message, character, onStart, onHint }: DialogueBoxProps) {
  return (
    <div className="bg-github-darker rounded-lg border border-github-border p-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-github-dark flex-shrink-0 border-2 border-github-border">
          <img
            src={character.avatar}
            alt={character.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-github-text-primary mb-2">{character.name}</h4>
          <div className="bg-github-dark rounded-lg p-4 relative border border-github-border mb-4">
            <MessageCircle className="absolute -top-2 -left-2 w-4 h-4 text-github-accent/20" />
            <p className="text-github-text-primary">{message}</p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={onStart}
              className="flex items-center gap-2 px-4 py-2 bg-github-accent hover:bg-github-accent/90 text-white rounded-md transition-colors"
            >
              <Play className="w-4 h-4" />
              <span>Iniciar</span>
            </button>
            <button
              onClick={onHint}
              className="flex items-center gap-2 px-4 py-2 bg-github-dark hover:bg-github-darker text-github-text-primary border border-github-border rounded-md transition-colors"
            >
              <Lightbulb className="w-4 h-4" />
              <span>Dica</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}