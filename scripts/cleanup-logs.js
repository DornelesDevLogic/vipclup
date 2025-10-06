const fs = require('fs');
const path = require('path');

const logsDir = path.join(__dirname, '../logs');
const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 dias

function cleanupLogs() {
  if (!fs.existsSync(logsDir)) return;

  const files = fs.readdirSync(logsDir);
  const now = Date.now();
  let deletedCount = 0;

  files.forEach(file => {
    const filePath = path.join(logsDir, file);
    const stats = fs.statSync(filePath);
    
    if (now - stats.mtime.getTime() > maxAge) {
      fs.unlinkSync(filePath);
      console.log(`Removido: ${file}`);
      deletedCount++;
    }
  });

  console.log(`${deletedCount} arquivos removidos.`);
}

cleanupLogs();