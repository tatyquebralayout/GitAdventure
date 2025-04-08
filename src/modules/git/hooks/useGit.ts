import { useState } from 'react';

interface GitFile {
  name: string;
  status: 'untracked' | 'modified' | 'staged' | 'committed';
  content: string;
}

interface GitBranch {
  name: string;
  commits: string[];
}

interface GitState {
  files: GitFile[];
  branches: GitBranch[];
  currentBranch: string;
  head: string;
  stage: GitFile[];
}

const initialGitState: GitState = {
  files: [],
  branches: [{ name: 'main', commits: [] }],
  currentBranch: 'main',
  head: 'main',
  stage: []
};

export function useGit() {
  const [gitState, setGitState] = useState<GitState>(initialGitState);

  const executeCommand = (command: string): string => {
    const [cmd, ...args] = command.trim().split(' ');

    switch (cmd) {
      case 'git':
        return handleGitCommand(args);
      default:
        return `Comando não encontrado: ${cmd}`;
    }
  };

  const handleGitCommand = (args: string[]): string => {
    const [subCmd, ...subArgs] = args;

    switch (subCmd) {
      case 'init':
        return 'Repositório Git vazio inicializado';
      case 'status':
        return generateStatusOutput();
      case 'add':
        return handleAdd(subArgs[0]);
      case 'commit':
        return handleCommit(subArgs);
      default:
        return `Comando Git desconhecido: ${subCmd}`;
    }
  };

  const generateStatusOutput = (): string => {
    const output = ['No ramo ' + gitState.currentBranch];
    
    if (gitState.stage.length === 0 && gitState.files.filter(f => f.status === 'modified').length === 0) {
      output.push('nada a submeter, diretório de trabalho limpo');
    } else {
      if (gitState.stage.length > 0) {
        output.push('\nMudanças a serem submetidas:');
        gitState.stage.forEach(file => {
          output.push(`  novo arquivo: ${file.name}`);
        });
      }

      const modified = gitState.files.filter(f => f.status === 'modified');
      if (modified.length > 0) {
        output.push('\nMudanças não organizadas para submissão:');
        modified.forEach(file => {
          output.push(`  modificado: ${file.name}`);
        });
      }
    }

    return output.join('\n');
  };

  const handleAdd = (path: string): string => {
    if (path === '.') {
      const untracked = gitState.files.filter(f => f.status === 'untracked' || f.status === 'modified');
      setGitState(prev => ({
        ...prev,
        stage: [...prev.stage, ...untracked],
        files: prev.files.map(f => 
          f.status === 'untracked' || f.status === 'modified' 
            ? { ...f, status: 'staged' } 
            : f
        )
      }));
      return 'Adicionadas todas as mudanças à área de preparação';
    }
    return `adicionar '${path}'`;
  };

  const handleCommit = (args: string[]): string => {
    if (!args.includes('-m')) {
      return 'Por favor, forneça uma mensagem de commit usando -m "sua mensagem"';
    }
    
    const messageIndex = args.indexOf('-m') + 1;
    const message = args[messageIndex];
    
    if (!message) {
      return 'Por favor, forneça uma mensagem de commit';
    }

    setGitState(prev => ({
      ...prev,
      stage: [],
      files: prev.files.map(f => f.status === 'staged' ? { ...f, status: 'committed' } : f),
      branches: prev.branches.map(b => 
        b.name === prev.currentBranch 
          ? { ...b, commits: [...b.commits, message] }
          : b
      )
    }));

    return `[${gitState.currentBranch} ${message}] Mudanças submetidas`;
  };

  return {
    gitState,
    executeCommand
  };
}