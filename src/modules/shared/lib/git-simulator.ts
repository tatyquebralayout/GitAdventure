import { GitState, CommandResult, StateValidation } from '../types';

export class GitSimulator {
  private repoState: GitState;

  constructor() {
    this.repoState = {
      files: [],
      branches: [{ name: 'main', commits: [] }],
      currentBranch: 'main',
      head: 'main',
      stage: []
    };
  }

  executeCommand(command: string): CommandResult {
    const [cmd, ...args] = command.trim().split(' ');
    
    switch (cmd) {
      case 'init':
        return this.initRepository();
      case 'status':
        return this.getStatus();
      case 'add':
        return this.stageFiles(args[0]);
      case 'commit':
        return this.commit(args);
      default:
        return {
          success: false,
          message: `Comando desconhecido: ${cmd}`
        };
    }
  }

  validateState(): StateValidation {
    return {
      isValid: true,
      message: 'Estado do repositório válido'
    };
  }

  private initRepository(): CommandResult {
    return {
      success: true,
      message: 'Repositório Git inicializado com sucesso'
    };
  }

  private getStatus(): CommandResult {
    return {
      success: true,
      message: this.formatStatus()
    };
  }

  private stageFiles(path: string): CommandResult {
    return {
      success: true,
      message: `Arquivos adicionados à área de preparação: ${path}`
    };
  }

  private commit(args: string[]): CommandResult {
    const messageIndex = args.indexOf('-m') + 1;
    const message = args[messageIndex];

    if (!message) {
      return {
        success: false,
        message: 'É necessário fornecer uma mensagem de commit'
      };
    }

    return {
      success: true,
      message: `[${this.repoState.currentBranch} ${message}] Alterações commitadas`
    };
  }

  private formatStatus(): string {
    const lines = [
      `No ramo ${this.repoState.currentBranch}`,
      '',
      'Nada para commitar, diretório de trabalho limpo'
    ];
    return lines.join('\n');
  }
}