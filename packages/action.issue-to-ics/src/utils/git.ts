import { exec } from 'shelljs';
import path from 'path';

export function commitAndPush(path: string, message: string) {
  exec(`git config user.email "bot@minung.dev"`);
  exec(`git config user.name "Bot"`);
  exec(`git add ${path}`);
  exec(`git commit -m "${message}"`);
  exec(`git push --force origin main:docs`);
}

export function getFileContentFromDocs(filePath: string) {
  exec(`git fetch`);

  const result = exec(
    `git show origin/docs:${path.resolve(
      'packages/action.issue-to-ics',
      filePath,
    )}`,
    { silent: true },
  );

  if (result.code !== 0) {
    throw new Error(result.stderr);
  }

  return result.stdout;
}
