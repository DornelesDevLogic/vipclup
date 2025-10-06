import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/winston';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  // Log da requisição
  logger.info('HTTP Request', {
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    requestId: req.id
  });

  // Interceptar o final da resposta
  const originalSend = res.send;
  res.send = function(body) {
    const duration = Date.now() - start;
    
    logger.info('HTTP Response', {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      requestId: req.id
    });
    
    return originalSend.call(this, body);
  };

  next();
};