import { logger } from '../config/winston';

// Utilitários para logging estruturado
export const logInfo = (message: string, meta?: any) => {
  logger.info(message, meta);
};

export const logError = (message: string, error?: Error | any, meta?: any) => {
  logger.error(message, { error: error?.message || error, stack: error?.stack, ...meta });
};

export const logWarn = (message: string, meta?: any) => {
  logger.warn(message, meta);
};

export const logDebug = (message: string, meta?: any) => {
  logger.debug(message, meta);
};

// Log específico para WhatsApp/Baileys
export const logWhatsApp = (action: string, whatsappId: number, message: string, meta?: any) => {
  logger.info(`WhatsApp ${action}`, {
    whatsappId,
    message,
    ...meta
  });
};

// Log específico para tickets
export const logTicket = (action: string, ticketId: number, message: string, meta?: any) => {
  logger.info(`Ticket ${action}`, {
    ticketId,
    message,
    ...meta
  });
};

// Log específico para usuários
export const logUser = (action: string, userId: number, message: string, meta?: any) => {
  logger.info(`User ${action}`, {
    userId,
    message,
    ...meta
  });
};

// Log específico para mensagens
export const logMessage = (action: string, messageId: string, message: string, meta?: any) => {
  logger.info(`Message ${action}`, {
    messageId,
    message,
    ...meta
  });
};

export { logger };