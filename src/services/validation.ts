/**
 * Validation Service
 * 
 * Serviço responsável por validar comandos Git e requisitos de missões.
 * Provê funções para verificar se comandos executados pelo usuário
 * atendem aos critérios definidos nas missões.
 */

import type { MissionRequirement } from '../modules/missions/types';

/**
 * Tipo que representa o resultado de uma validação
 */
export interface ValidationResult {
  isValid: boolean;
  message: string;
  details?: any;
}

/**
 * Tipo de verificação a ser feita
 */
export enum ValidationType {
  COMMAND = 'command',
  FILE_STATE = 'file_state',
  CUSTOM = 'custom'
}

/**
 * Serviço de validação de comandos Git e requisitos de missões
 */
export class ValidationService {
  private static instance: ValidationService;

  /**
   * Construtor privado para implementar Singleton
   */
  private constructor() {}

  /**
   * Obtém a instância única do serviço (Singleton)
   */
  public static getInstance(): ValidationService {
    if (!ValidationService.instance) {
      ValidationService.instance = new ValidationService();
    }
    return ValidationService.instance;
  }

  /**
   * Valida um comando executado pelo usuário contra um requisito de missão
   */
  public validateCommand(command: string, requirement: MissionRequirement): ValidationResult {
    try {
      if (requirement.type !== 'command') {
        return {
          isValid: false,
          message: 'Tipo de requisito incompatível com validação de comando'
        };
      }

      const { validationRule } = requirement;
      
      // Verificações simples baseadas em string
      if (validationRule.startsWith('contains:')) {
        const substring = validationRule.substring('contains:'.length).trim();
        const isValid = command.includes(substring);
        
        return {
          isValid,
          message: isValid
            ? `Comando válido! Contém "${substring}"`
            : `Comando inválido. Deve conter "${substring}"`
        };
      }
      
      // Verificações baseadas em regex
      if (validationRule.startsWith('regex:')) {
        const pattern = validationRule.substring('regex:'.length).trim();
        const regex = new RegExp(pattern);
        const isValid = regex.test(command);
        
        return {
          isValid,
          message: isValid
            ? 'Comando válido!'
            : `Comando inválido. Não corresponde ao padrão necessário`
        };
      }
      
      // Verificações de comandos Git específicos
      if (validationRule === 'git init') {
        const isValid = command.trim() === 'git init';
        return {
          isValid,
          message: isValid
            ? 'Repositório inicializado corretamente!'
            : 'O comando deve ser exatamente "git init"'
        };
      }
      
      if (validationRule === 'git add') {
        const isValid = command.startsWith('git add ');
        return {
          isValid,
          message: isValid
            ? 'Arquivos adicionados ao stage corretamente!'
            : 'O comando deve começar com "git add"'
        };
      }
      
      if (validationRule === 'git commit') {
        const isValid = command.startsWith('git commit ');
        return {
          isValid,
          message: isValid
            ? 'Commit realizado corretamente!'
            : 'O comando deve começar com "git commit"'
        };
      }
      
      // Caso não encontre uma regra específica
      return {
        isValid: false,
        message: 'Regra de validação desconhecida ou não implementada'
      };
    } catch (error) {
      console.error('Erro ao validar comando:', error);
      return {
        isValid: false,
        message: 'Erro ao validar comando',
        details: error
      };
    }
  }

  /**
   * Valida o estado atual dos arquivos contra um requisito
   */
  public validateFileState(files: any[], requirement: MissionRequirement): ValidationResult {
    try {
      if (requirement.type !== 'file_state') {
        return {
          isValid: false,
          message: 'Tipo de requisito incompatível com validação de estado de arquivo'
        };
      }

      // Implementar lógica de validação de estado de arquivos
      // Isso dependeria de como os arquivos são representados no sistema
      
      return {
        isValid: false,
        message: 'Validação de estado de arquivos não implementada'
      };
    } catch (error) {
      console.error('Erro ao validar estado de arquivos:', error);
      return {
        isValid: false,
        message: 'Erro ao validar estado de arquivos',
        details: error
      };
    }
  }

  /**
   * Valida se todos os requisitos de uma missão foram cumpridos
   */
  public validateAllRequirements(requirements: MissionRequirement[], completedRequirements: string[]): ValidationResult {
    try {
      const missingRequirements = requirements.filter(
        req => !completedRequirements.includes(req.id)
      );
      
      const isValid = missingRequirements.length === 0;
      
      return {
        isValid,
        message: isValid
          ? 'Todos os requisitos foram cumpridos!'
          : `Faltam ${missingRequirements.length} requisitos para completar`,
        details: missingRequirements
      };
    } catch (error) {
      console.error('Erro ao validar todos os requisitos:', error);
      return {
        isValid: false,
        message: 'Erro ao validar todos os requisitos',
        details: error
      };
    }
  }
}

// Exporta uma instância do serviço para uso em toda a aplicação
export const validationService = ValidationService.getInstance(); 