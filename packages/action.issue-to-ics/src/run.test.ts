import * as core from '@actions/core';
import * as github from '@actions/github';
import { getEventsFromGhPages } from './utils/git';
import { run } from './index';

jest.mock('@actions/core');
jest.mock('@actions/github');
jest.mock('./utils/file');
jest.mock('./utils/git');

const mockIssue = {
  id: '1',
  number: 1,
  title: 'Test Issue',
  body: 'date: 2023-04-01\ntimezone: UTC\ndescription: Test event',
};

describe('run', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getEventsFromGhPages as jest.Mock).mockReturnValue('{}');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test.each([['opened'], ['edited'], ['closed'], ['deleted']])(
    'should handle %s action',
    async (action) => {
      github.context.payload.issue = mockIssue;
      github.context.payload.action = action;

      await run();

      expect(core.setFailed).not.toHaveBeenCalled();
    },
  );

  test('should handle invalid issue', async () => {
    const invalidIssue = { ...mockIssue, body: 'Invalid issue body' };
    github.context.payload.issue = invalidIssue;
    github.context.payload.action = 'opened';

    await run();

    expect(core.setFailed).toHaveBeenCalledWith(
      "The required 'date' field is missing from the issue body.",
    );
  });
});
