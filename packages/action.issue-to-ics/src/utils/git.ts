import * as github from '@actions/github';
import { exec } from 'shelljs';
import ghpages from 'gh-pages';

export function publishApi(filePath: string): Promise<void> {
  const token = process.env.GH_TOKEN;
  if (!token) {
    throw new Error('Require github token!');
  }

  const { repository } = github.context.payload;

  return new Promise<void>((resolve, reject) => {
    if (!repository) {
      return;
    }

    ghpages.publish(
      filePath,
      {
        repo: `https://x-access-token:${token}@github.com/${repository.full_name}.git`,
        silent: true,
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
