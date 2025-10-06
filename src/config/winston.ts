import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';

// Criar diretório de logs se não existir
const logsDir = path.join(__dirname, '../../logs');

// Configuração de transporte para logs gerais com rotação diária
const dailyRotateFileTransport = new DailyRotateFile({
  filename: path.join(logsDir, 'application-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '10m',
  maxFiles: '7d',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  )
});

// Configuração de transporte para logs de erro
const errorRotateFileTransport = new DailyRotateFile({
  filename: path.join(logsDir, 'error-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '5m',
  maxFiles: '14d',
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  )
});

// Configuração de transporte para console
const consoleTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      let msg = `${timestamp} [${level}]: ${message}`;
      if (Object.keys(meta).length > 0) {
        msg += ` ${JSON.stringify(meta)}`;
      }
      return msg;
    })
  )
});

// Criar logger principal
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'vipclub-backend' },
  transports: [
    dailyRotateFileTransport,
    errorRotateFileTransport,
    consoleTransport
  ],
  exceptionHandlers: [
    new DailyRotateFile({
      filename: path.join(logsDir, 'exceptions-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '5m',
      maxFiles: '14d'
    })
  ],
  rejectionHandlers: [
    new DailyRotateFile({
      filename: path.join(logsDir, 'rejections-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '5m',
      maxFiles: '14d'
    })
  ]
});

// Interceptar console.log, console.error, console.warn, console.info
const originalConsole = {
  log: console.log,
  error: console.error,
  warn: console.warn,
  info: console.info,
  debug: console.debug
};

console.log = (...args: any[]) => {
  const message = args.map(arg => {
    if (typeof arg === 'object') {
      const str = JSON.stringify(arg);
      return str.length > 1000 ? `[Objeto grande: ${str.substring(0, 100)}...]` : str;
    }
    return String(arg);
  }).join(' ');
  logger.info(message);
  originalConsole.log(...args);
};

console.error = (...args: any[]) => {
  const message = args.map(arg => {
    if (typeof arg === 'object') {
      const str = JSON.stringify(arg);
      return str.length > 1000 ? `[Objeto grande: ${str.substring(0, 100)}...]` : str;
    }
    return String(arg);
  }).join(' ');
  logger.error(message);
  originalConsole.error(...args);
};

console.warn = (...args: any[]) => {
  const message = args.map(arg => {
    if (typeof arg === 'object') {
      const str = JSON.stringify(arg);
      return str.length > 1000 ? `[Objeto grande: ${str.substring(0, 100)}...]` : str;
    }
    return String(arg);
  }).join(' ');
  logger.warn(message);
  originalConsole.warn(...args);
};

console.info = (...args: any[]) => {
  const message = args.map(arg => {
    if (typeof arg === 'object') {
      const str = JSON.stringify(arg);
      return str.length > 1000 ? `[Objeto grande: ${str.substring(0, 100)}...]` : str;
    }
    return String(arg);
  }).join(' ');
  logger.info(message);
  originalConsole.info(...args);
};

console.debug = (...args: any[]) => {
  const message = args.map(arg => {
    if (typeof arg === 'object') {
      const str = JSON.stringify(arg);
      return str.length > 1000 ? `[Objeto grande: ${str.substring(0, 100)}...]` : str;
    }
    return String(arg);
  }).join(' ');
  logger.debug(message);
  originalConsole.debug(...args);
};

export { logger, originalConsole };