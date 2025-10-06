# 📋 Sistema de Logging com Winston

## 🚀 **Implementação Completa**

Sistema de logging robusto implementado com Winston que captura **TODOS** os `console.log`, `console.error`, `console.warn` e `console.info` da aplicação.

## 📁 **Estrutura de Arquivos**

```
backend/
├── src/
│   ├── config/
│   │   └── winston.ts          # Configuração principal do Winston
│   ├── middleware/
│   │   └── requestLogger.ts    # Middleware para logs HTTP
│   ├── utils/
│   │   └── loggerUtils.ts      # Utilitários de logging
│   └── examples/
│       └── loggingExample.ts   # Exemplos de uso
├── logs/                       # Diretório dos arquivos de log
│   ├── application-YYYY-MM-DD.log
│   ├── error-YYYY-MM-DD.log
│   ├── exceptions-YYYY-MM-DD.log
│   └── rejections-YYYY-MM-DD.log
└── .env                        # LOG_LEVEL=info
```

## 📊 **Tipos de Logs Gerados**

### **1. Logs de Aplicação (`application-YYYY-MM-DD.log`)**
- Todos os `console.log`, `console.info`, `console.warn`
- Logs de requisições HTTP
- Logs estruturados da aplicação

### **2. Logs de Erro (`error-YYYY-MM-DD.log`)**
- Todos os `console.error`
- Erros capturados pela aplicação
- Stack traces completos

### **3. Logs de Exceções (`exceptions-YYYY-MM-DD.log`)**
- Exceções não capturadas
- Erros críticos do sistema

### **4. Logs de Rejeições (`rejections-YYYY-MM-DD.log`)**
- Promises rejeitadas não tratadas

## 🔧 **Configuração**

### **Variáveis de Ambiente (.env)**
```env
# Níveis: error, warn, info, debug
LOG_LEVEL=info
```

### **Rotação de Arquivos**
- **Rotação:** Diária (YYYY-MM-DD)
- **Compressão:** Automática (.gz)
- **Tamanho máximo:** 20MB por arquivo
- **Retenção:** 14 dias (aplicação), 30 dias (erros)

## 💻 **Como Usar**

### **1. Console Logs (Automático)**
```typescript
// Estes serão automaticamente capturados
console.log('Mensagem de info');
console.error('Mensagem de erro');
console.warn('Mensagem de aviso');
console.info('Mensagem informativa');
```

### **2. Logs Estruturados**
```typescript
import { logInfo, logError, logWarn } from '../utils/loggerUtils';

// Log básico
logInfo('Usuário logado', { userId: 123, email: 'user@example.com' });

// Log de erro
logError('Falha na conexão', new Error('Timeout'), { host: 'localhost' });

// Log de aviso
logWarn('Limite atingido', { limit: 100, current: 95 });
```

### **3. Logs Específicos do Domínio**
```typescript
import { logWhatsApp, logTicket, logUser, logMessage } from '../utils/loggerUtils';

// WhatsApp
logWhatsApp('connection', 1, 'Conectado', { session: 'main' });

// Tickets
logTicket('created', 123, 'Novo ticket', { contactId: 456 });

// Usuários
logUser('login', 789, 'Login realizado', { ip: '192.168.1.1' });

// Mensagens
logMessage('sent', 'msg_123', 'Enviada', { type: 'text' });
```

## 📈 **Formato dos Logs**

### **Console (Desenvolvimento)**
```
10-01-2025 14:30:25 [info]: Usuário logado {"userId":123,"email":"user@example.com"}
10-01-2025 14:30:26 [error]: Falha na conexão {"error":"Timeout","host":"localhost"}
```

### **Arquivo JSON (Produção)**
```json
{
  "timestamp": "10-01-2025 14:30:25",
  "level": "info",
  "message": "Usuário logado",
  "service": "vipclub-backend",
  "userId": 123,
  "email": "user@example.com"
}
```

## 🔍 **Logs de Requisições HTTP**

Todas as requisições HTTP são automaticamente logadas:

```json
{
  "timestamp": "10-01-2025 14:30:25",
  "level": "info",
  "message": "HTTP Request",
  "method": "POST",
  "url": "/api/tickets",
  "ip": "192.168.1.1",
  "userAgent": "Mozilla/5.0...",
  "requestId": "uuid-123"
}
```

## 🛠️ **Níveis de Log**

- **error:** Erros críticos
- **warn:** Avisos importantes
- **info:** Informações gerais (padrão)
- **debug:** Informações detalhadas

## 📋 **Monitoramento**

### **Verificar Logs em Tempo Real**
```bash
# Logs gerais
tail -f logs/application-2025-01-10.log

# Apenas erros
tail -f logs/error-2025-01-10.log

# Todos os logs
tail -f logs/*.log
```

### **Buscar por Padrões**
```bash
# Buscar por usuário específico
grep "userId.*123" logs/application-*.log

# Buscar erros de conexão
grep -i "connection.*error" logs/error-*.log
```

## ✅ **Benefícios Implementados**

- ✅ **Captura automática** de todos os console.log
- ✅ **Rotação diária** de arquivos
- ✅ **Compressão automática** de logs antigos
- ✅ **Logs estruturados** em JSON
- ✅ **Diferentes níveis** de log
- ✅ **Logs de requisições HTTP**
- ✅ **Tratamento de exceções** não capturadas
- ✅ **Logs específicos** por domínio (WhatsApp, Tickets, etc.)
- ✅ **Configuração flexível** via .env

## 🚀 **Status**

✅ **Sistema de Logging Completo e Funcional**

Todos os `console.log` da aplicação agora são automaticamente salvos em arquivos com rotação diária!