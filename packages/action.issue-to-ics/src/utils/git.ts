import { exec } from 'shelljs';
import ghpages from 'gh-pages';
import path from 'path';

export function commitAndPush(path: string, message: string) {
  exec(`git config user.email "bot@minung.dev"`);
  exec(`git config user.name "Bot"`);
  exec(`git add ${path}`);
  exec(`git commit -m "${message}"`);
  exec(`git push --force origin main:docs`);
}

export function publishApi(filePath: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    ghpages.publish(
      filePath,
      {
        user: {
          name: 'Bot',
          email: 'bot@minung.dev',
        },
      },
      (err) => {
        if (err) {
          return reject(err);
        }
        return resolve();
      },
    );
  });
}

export function getFileContentFromDocs(filePath: string) {
  exec(`git fetch`);

  const result = exec(
    `git show origin/docs:${path.join(
      'packages/action.issue-to-ics',
      filePath,
      'index.json',
    )}`,
    {
      silent: true,
    },
  );

  if (result.code !== 0) {
    throw new Error(result.stderr);
  }

  return result.stdout;
}
