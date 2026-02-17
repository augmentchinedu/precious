import fs from 'fs/promises';
import path from 'path';

export function getToday() {
  return new Date().toISOString().split('T')[0];
}

export async function getNewSessionLogFile() {
  const date = new Date().toISOString().split('T')[0];
  const LOGS_DIR = path.join(process.cwd(), 'logs', date);

  // Ensure logs directory exists
  await fs.mkdir(LOGS_DIR, { recursive: true });

  const files = await fs.readdir(LOGS_DIR);
  const sessionFiles = files.filter(f => f.startsWith('session_') && f.endsWith('.md'));
  const numbers = sessionFiles.map(f => parseInt(f.match(/session_(\d+)\.md$/)?.[1] || '0'));
  const nextNumber = numbers.length ? Math.max(...numbers) + 1 : 1;

  return path.join(LOGS_DIR, `session_${nextNumber}.md`);
}

// Recursive function to read all files in a directory
export async function readFilesRecursively(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = {};

  for (const entry of entries) {

    if (entry.name === "node_modules" || entry.name === ".git" || entry.name === "logs") {
      continue;
    }

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      Object.assign(files, await readFilesRecursively(fullPath));
    } else if (entry.isFile()) {
      try {
        files[fullPath.replace(process.cwd() + path.sep, '')] = await fs.readFile(fullPath, 'utf-8');
      } catch (err) {
        console.error(`Failed to read file ${fullPath}:`, err.message);
      }
    }
  }

  return files;
}


export function extractFileAction(text) {
  const match = text.match(/===FILE_ACTION===([\s\S]*?)===END_FILE_ACTION===/);
  if (!match) return null;

  const block = match[1];

  const typeMatch = block.match(/type:\s*(create|append)/);
  const pathMatch = block.match(/path:\s*(.+)/);

  if (!typeMatch || !pathMatch) return null;

  const content = block.split('---')[1]?.trim();

  return {
    type: typeMatch[1],
    path: pathMatch[1].trim(),
    content
  };
}
