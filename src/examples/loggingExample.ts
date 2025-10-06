// Exemplo de como usar o sistema de logging

import { 
  logInfo, 
  logError, 
  logWarn, 
  logDebug,
  logWhatsApp,
  logTicket,
  logUser,
  logMessage 
} from '../utils/loggerUtils';

// Exemplos de uso:

// 1. Logs básicos
console.log('Este é um console.log normal que será capturado');
console.error('Este é um console.error que será capturado');
console.warn('Este é um console.warn que será capturado');

// 2. Logs estruturados
logInfo('Aplicação iniciada', { port: 4000, env: 'development' });

logError('Erro ao conectar com banco de dados', new Error('Connection timeout'), {
  host: 'localhost',
  port: 5432
});

logWarn('Limite de requisições atingido', { 
  ip: '192.168.1.1', 
  limit: 100 
});

// 3. Logs específicos do domínio
logWhatsApp('connection', 1, 'WhatsApp conectado com sucesso', {
  sessionName: 'session1',
  qrCode: false
});

logTicket('created', 123, 'Novo ticket criado', {
  contactId: 456,
  userId: 789,
  status: 'open'
});

logUser('login', 789, 'Usuário fez login', {
  email: 'user@example.com',
  ip: '192.168.1.1'
});

logMessage('sent', 'msg_123', 'Mensagem enviada', {
  ticketId: 123,
  type: 'text',
  length: 50
});

// 4. Logs com objetos complexos
const complexObject = {
  user: { id: 1, name: 'João' },
  ticket: { id: 123, status: 'open' },
  messages: [
    { id: 1, text: 'Olá' },
    { id: 2, text: 'Como posso ajudar?' }
  ]
};

logInfo('Processando dados complexos', complexObject);