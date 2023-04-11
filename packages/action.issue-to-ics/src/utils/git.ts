import * as github from '@actions/github';
import { exec } from 'shelljs';
import ghpages from 'gh-pages';

const token = process.env.GH_TOKEN;
if (!token) {
  throw new Error('Require github token!');
}

// TODO: 불필요한 git 관련 코드 모두 제거하기
export function commitAndPush(path: string, message: string) {
  exec(`git config user.email "bot@minung.dev"`);
  exec(`git config user.name "Bot"`);
  exec(`git add ${path}`);
  exec(`git commit -m "${message}"`);
  exec(`git push --force origin main:docs`);
}

export function publishApi(filePath: string): Promise<void> {
  const { repository } = github.context.payload;

  return new Promise<void>((resolve, reject) => {
    if (!repository) {
      return;
    }

    ghpages.publish(
      filePath,
      {
        // repo: `https://${token}@github.com/${repository.full_name}.git`,
        // repo: `https://github.com/${repository.full_name}.git`,
        // silent: true,
        user: {
          name: 'github-actions[bot]',
          email: 'github-actions[bot]@users.noreply.github.com',
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

export function getEventsFromGhPages() {
  exec(`git fetch`);
  ``;
  const result = exec(`git show origin/gh-pages:events.json`, {
    silent: true,
  });

  if (result.code !== 0) {
    console.log(result.stderr);
    return '{}';
  }

  return result.stdout;
}
