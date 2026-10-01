import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('.', import.meta.url));
const SERVICES = ['backend', 'frontend'];
const FAILURE_EXIT_CODE = 1;

function startService(name) {
  const cwd = `${ROOT}${name}`;
  return spawn(process.execPath, ['--no-warnings', 'server.js'], { cwd, stdio: 'inherit' });
}

function main() {
  if (!existsSync(`${ROOT}backend/node_modules/express`)) {
    process.stderr.write('Faltan dependencias. Ejecuta primero: npm run setup\n');
    process.exit(FAILURE_EXIT_CODE);
  }
  const children = SERVICES.map(startService);
  const stopAll = () => children.forEach((child) => child.kill());
  process.on('SIGINT', stopAll);
  process.on('SIGTERM', stopAll);
  children.forEach((child) => child.on('exit', stopAll));
  process.stdout.write('\nJuego listo en http://localhost:5500  (Ctrl+C para detener)\n\n');
}

main();
