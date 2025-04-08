/**
 * Logger Service
 * 
 * Serviço responsável por centralizar todos os logs da aplicação,
 * permitindo diferentes níveis de log e integração com serviços de
 * monitoramento externos.
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 99
}

export interface LogMessage {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: string;
  data?: any;
}

/**
 * Configurações do logger
 */
export interface LoggerConfig {
  minLevel: LogLevel;
  enableConsole: boolean;
  enableRemote: boolean;
  remoteEndpoint?: string;
  contextPrefix?: string;
}

/**
 * Serviço de log para aplicação
 */
export class LoggerService {
  private static instance: LoggerService;
  private config: LoggerConfig = {
    minLevel: LogLevel.INFO,
    enableConsole: true,
    enableRemote: false
  };
  
  private logHistory: LogMessage[] = [];
  
  /**
   * Construtor privado para implementar Singleton
   */
  private constructor() {}

  /**
   * Obtém a instância única do serviço (Singleton)
   */
  public static getInstance(): LoggerService {
    if (!LoggerService.instance) {
      LoggerService.instance = new LoggerService();
    }
    return LoggerService.instance;
  }

  /**
   * Configura o logger
   */
  public configure(config: Partial<LoggerConfig>): void {
    this.config = {
      ...this.config,
      ...config
    };
  }

  /**
   * Cria uma mensagem de log
   */
  private createLogMessage(
    level: LogLevel,
    message: string,
    context?: string,
    data?: any
  ): LogMessage {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      context: context ? 
        (this.config.contextPrefix ? `${this.config.contextPrefix}:${context}` : context) 
        : undefined,
      data
    };
  }

  /**
   * Registra uma mensagem no console se habilitado
   */
  private logToConsole(logMsg: LogMessage): void {
    if (!this.config.enableConsole || logMsg.level < this.config.minLevel) {
      return;
    }

    const contextStr = logMsg.context ? `[${logMsg.context}]` : '';
    const dataStr = logMsg.data ? `\n${JSON.stringify(logMsg.data, null, 2)}` : '';
    
    switch (logMsg.level) {
      case LogLevel.DEBUG:
        console.debug(`🔍 DEBUG ${contextStr}: ${logMsg.message}${dataStr}`);
        break;
      case LogLevel.INFO:
        console.info(`ℹ️ INFO ${contextStr}: ${logMsg.message}${dataStr}`);
        break;
      case LogLevel.WARN:
        console.warn(`⚠️ WARN ${contextStr}: ${logMsg.message}${dataStr}`);
        break;
      case LogLevel.ERROR:
        console.error(`❌ ERROR ${contextStr}: ${logMsg.message}${dataStr}`);
        break;
    }
  }

  /**
   * Envia o log para um endpoint remoto se habilitado
   */
  private async logToRemote(logMsg: LogMessage): Promise<void> {
    if (!this.config.enableRemote || !this.config.remoteEndpoint || logMsg.level < this.config.minLevel) {
      return;
    }

    try {
      // Simulação do envio para um endpoint remoto
      // Em produção, aqui seria uma chamada fetch real
      
      // await fetch(this.config.remoteEndpoint, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(logMsg)
      // });
      
      // Para fins de desenvolvimento, apenas simulamos o envio
      setTimeout(() => {
        console.debug(`🌐 Log sent to remote: ${this.config.remoteEndpoint}`);
      }, 100);
      
    } catch (error) {
      // Ironia: logging a falha de um serviço de log
      console.error('Failed to send log to remote endpoint', error);
    }
  }

  /**
   * Registra uma mensagem de debug
   */
  public debug(message: string, context?: string, data?: any): void {
    const logMsg = this.createLogMessage(LogLevel.DEBUG, message, context, data);
    this.logToConsole(logMsg);
    this.logToRemote(logMsg);
    this.logHistory.push(logMsg);
  }

  /**
   * Registra uma mensagem de informação
   */
  public info(message: string, context?: string, data?: any): void {
    const logMsg = this.createLogMessage(LogLevel.INFO, message, context, data);
    this.logToConsole(logMsg);
    this.logToRemote(logMsg);
    this.logHistory.push(logMsg);
  }

  /**
   * Registra uma mensagem de aviso
   */
  public warn(message: string, context?: string, data?: any): void {
    const logMsg = this.createLogMessage(LogLevel.WARN, message, context, data);
    this.logToConsole(logMsg);
    this.logToRemote(logMsg);
    this.logHistory.push(logMsg);
  }

  /**
   * Registra uma mensagem de erro
   */
  public error(message: string, context?: string, data?: any): void {
    const logMsg = this.createLogMessage(LogLevel.ERROR, message, context, data);
    this.logToConsole(logMsg);
    this.logToRemote(logMsg);
    this.logHistory.push(logMsg);
  }

  /**
   * Obtém o histórico de logs
   */
  public getLogHistory(minLevel: LogLevel = LogLevel.DEBUG): LogMessage[] {
    return this.logHistory.filter(log => log.level >= minLevel);
  }

  /**
   * Limpa o histórico de logs
   */
  public clearHistory(): void {
    this.logHistory = [];
  }
}

// Exporta uma instância do serviço para uso em toda a aplicação
export const loggerService = LoggerService.getInstance(); 