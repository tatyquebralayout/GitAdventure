import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, GitBranch, File, Map, Eye, Command } from 'lucide-react';

interface TerminalProps {
  type: 'simulation' | 'interactive';
  onCommand?: (command: string) => void;
  output?: string;
}

const gitCommands = [
  'init',
  'add',
  'commit',
  'status',
  'branch',
  'checkout',
  'merge',
  'pull',
  'push',
  'log',
  'reset',
  'revert',
];

export function Terminal({ type, onCommand, output }: TerminalProps) {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [activeTab, setActiveTab] = useState<'terminal' | 'graph' | 'files' | 'minimap'>('terminal');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLPreElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onCommand && command.trim()) {
      onCommand(command.trim());
      setHistory(prev => [...prev, command.trim()]);
      setCommand('');
      setHistoryIndex(-1);
      setSuggestions([]);
      setSelectedSuggestion(-1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (suggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedSuggestion(prev => (prev + 1) % suggestions.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedSuggestion(prev => (prev - 1 + suggestions.length) % suggestions.length);
      } else if (e.key === 'Tab' || e.key === 'Enter') {
        e.preventDefault();
        if (selectedSuggestion >= 0) {
          const parts = command.split(' ');
          parts[parts.length - 1] = suggestions[selectedSuggestion];
          setCommand(parts.join(' '));
          setSuggestions([]);
          setSelectedSuggestion(-1);
        }
      }
    } else {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex < history.length - 1) {
          const newIndex = historyIndex + 1;
          setHistoryIndex(newIndex);
          setCommand(history[history.length - 1 - newIndex]);
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          setHistoryIndex(newIndex);
          setCommand(history[history.length - 1 - newIndex]);
        } else if (historyIndex === 0) {
          setHistoryIndex(-1);
          setCommand('');
        }
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCommand(value);

    if (value.startsWith('git ')) {
      const parts = value.split(' ');
      const lastPart = parts[parts.length - 1];
      
      if (parts.length === 2) {
        const matches = gitCommands.filter(cmd => 
          cmd.startsWith(lastPart) && cmd !== lastPart
        );
        setSuggestions(matches);
        setSelectedSuggestion(matches.length > 0 ? 0 : -1);
      } else {
        setSuggestions([]);
        setSelectedSuggestion(-1);
      }
    } else {
      setSuggestions([]);
      setSelectedSuggestion(-1);
    }
  };

  useEffect(() => {
    if (type === 'interactive') {
      inputRef.current?.focus();
    }
  }, [type]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div className="bg-github-darker rounded-lg border border-github-border overflow-hidden h-[600px] flex flex-col">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-github-border bg-github-dark">
        <TerminalIcon className="w-4 h-4 text-github-text-secondary" />
        <span className="text-github-text-primary text-sm font-medium">
          {type === 'simulation' ? 'Simulação Git' : 'Terminal Interativo'}
        </span>
      </div>

      {type === 'simulation' && (
        <div className="flex border-b border-github-border">
          <button
            onClick={() => setActiveTab('terminal')}
            className={`
              flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors duration-200
              ${activeTab === 'terminal'
                ? 'text-github-text-primary border-b-2 border-github-accent'
                : 'text-github-text-secondary hover:text-github-text-primary'
              }
            `}
          >
            <TerminalIcon className="w-4 h-4" />
            Terminal
          </button>
          <button
            onClick={() => setActiveTab('graph')}
            className={`
              flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors duration-200
              ${activeTab === 'graph'
                ? 'text-github-text-primary border-b-2 border-github-accent'
                : 'text-github-text-secondary hover:text-github-text-primary'
              }
            `}
          >
            <GitBranch className="w-4 h-4" />
            Grafo
          </button>
          <button
            onClick={() => setActiveTab('files')}
            className={`
              flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors duration-200
              ${activeTab === 'files'
                ? 'text-github-text-primary border-b-2 border-github-accent'
                : 'text-github-text-secondary hover:text-github-text-primary'
              }
            `}
          >
            <File className="w-4 h-4" />
            Arquivos
          </button>
          <button
            onClick={() => setActiveTab('minimap')}
            className={`
              flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors duration-200
              ${activeTab === 'minimap'
                ? 'text-github-text-primary border-b-2 border-github-accent'
                : 'text-github-text-secondary hover:text-github-text-primary'
              }
            `}
          >
            <Map className="w-4 h-4" />
            Minimap
          </button>
        </div>
      )}

      <div className="flex-1 flex overflow-hidden">
        {type === 'interactive' ? (
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-github-border scrollbar-track-transparent">
              <pre 
                ref={outputRef}
                className="p-4 font-mono text-sm whitespace-pre-wrap text-github-text-primary"
              >
                {output || 'Digite um comando git para começar...'}
              </pre>
            </div>
            <div className="relative">
              {suggestions.length > 0 && (
                <div 
                  ref={suggestionsRef}
                  className="absolute bottom-full left-0 w-full bg-github-dark border-t border-github-border rounded-t-lg overflow-hidden"
                >
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={suggestion}
                      className={`
                        px-4 py-2 text-sm font-mono cursor-pointer
                        ${index === selectedSuggestion
                          ? 'bg-github-accent text-white'
                          : 'text-github-text-primary hover:bg-github-darker'
                        }
                      `}
                      onClick={() => {
                        const parts = command.split(' ');
                        parts[parts.length - 1] = suggestion;
                        setCommand(parts.join(' '));
                        setSuggestions([]);
                        setSelectedSuggestion(-1);
                        inputRef.current?.focus();
                      }}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
              <form 
                onSubmit={handleSubmit}
                className="flex items-center gap-2 p-4 border-t border-github-border bg-github-dark"
              >
                <Command className="w-4 h-4 text-github-accent" />
                <input
                  ref={inputRef}
                  type="text"
                  value={command}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-github-text-primary font-mono text-sm focus:outline-none placeholder-github-text-secondary"
                  placeholder="Digite seu comando git..."
                  autoComplete="off"
                  spellCheck="false"
                />
              </form>
            </div>
          </div>
        ) : (
          <>
            <div className="w-1/2 border-r border-github-border flex flex-col">
              <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-github-border scrollbar-track-transparent">
                <pre 
                  ref={outputRef}
                  className="p-4 font-mono text-sm whitespace-pre-wrap text-github-text-primary"
                >
                  {output || 'Digite um comando git para começar...'}
                </pre>
              </div>
            </div>

            <div className="w-1/2 overflow-y-auto scrollbar-thin scrollbar-thumb-github-border scrollbar-track-transparent">
              {activeTab === 'terminal' && (
                <div className="p-4">
                  <div className="bg-github-dark rounded-lg p-4 border border-github-border">
                    <div className="flex items-center gap-2 mb-4">
                      <Eye className="w-4 h-4 text-github-accent" />
                      <span className="text-github-text-primary text-sm font-medium">
                        Visualização do Estado
                      </span>
                    </div>
                    <pre className="text-xs font-mono text-github-text-secondary whitespace-pre-wrap">
                      {output}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}