import { execSync, execFileSync } from 'child_process';

export function getLatestCommit() {
  try {
    const hash = execFileSync('git', ['rev-parse', 'HEAD']).toString().trim();
    const message = execFileSync('git', ['log', '-1', '--pretty=format:%B'])
      .toString()
      .trim();
    const author = execFileSync('git', ['log', '-1', '--pretty=%an'])
      .toString()
      .trim();
    const date = execFileSync('git', ['log', '-1', '--pretty=%ad'])
      .toString()
      .trim();

    return {
      hash,
      message,
      author,
      date
    };
  } catch (err) {
    return null;
  }
}

export function getRecentCommits(limit = 5) {
  try {
    const raw = execFileSync('git', [
      'log',
      `-${limit}`,
      '--pretty=format:%h|%an|%ad|%s'
    ])
      .toString()
      .trim();

    return raw.split('\n').map(line => {
      const [hash, author, date, message] = line.split('|');
      return { hash, author, date, message };
    });
  } catch {
    return [];
  }
}

export function autoCommit(message) {
  try {
    execFileSync('git', ['add', '.']);
    execFileSync('git', ['commit', '-m', message]);
    console.log("Changes committed.");
  } catch (err) {
    console.log("No changes to commit.");
  }
} 
