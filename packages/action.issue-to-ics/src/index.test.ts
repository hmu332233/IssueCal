import { WebhookPayload } from '@actions/github/lib/interfaces';
import { Issue } from './types';
import { convertToIssue, convertToIcs } from './index';

describe('convertToIssue', () => {
  test('should convert webhook payload to issue', () => {
    const payload: WebhookPayload = {
      issue: {
        id: 123,
        number: 1,
        title: 'Test Issue',
        body: 'description: Test description\ndate: 2023-03-28\ntimezone: UTC',
      },
    };

    const expectedIssue: Issue = {
      id: '123',
      number: 1,
      title: 'Test Issue',
      description: 'Test description',
      date: '2023-03-28',
      timezone: 'UTC',
    };

    expect(convertToIssue(payload)).toEqual(expectedIssue);
  });

  test('should return undefined if payload does not have issue property', () => {
    const payload: WebhookPayload = {};
    expect(convertToIssue(payload)).toBeUndefined();
  });

  test('should throw error if date field is missing in issue body', () => {
    const payload: WebhookPayload = {
      issue: {
        id: 123,
        number: 1,
        title: 'Test Issue',
        body: 'description: Test description\ntimezone: UTC',
      },
    };

    expect(() => convertToIssue(payload)).toThrow(
      "The required 'date' field is missing from the issue body.",
    );
  });
});

describe('convertToIcs', () => {
  test('should convert array of issues to iCalendar string', () => {
    const issues: Issue[] = [
      {
        id: '1',
        number: 1,
        title: 'Test Issue 1',
        description: 'Test description 1',
        date: '2023-03-28',
        timezone: 'UTC',
      },
      {
        id: '2',
        number: 2,
        title: 'Test Issue 2',
        description: 'Test description 2',
        date: '2023-04-01',
        timezone: 'UTC',
      },
    ];

    const icsString = convertToIcs(issues);
    const icsLines = icsString.split('\r\n');
    expect(icsLines).toContain('BEGIN:VCALENDAR');
    expect(icsLines).toContain('BEGIN:VEVENT');
    expect(icsLines).toContain('SUMMARY:Test Issue 1');
    expect(icsLines).toContain('SUMMARY:Test Issue 2');
    expect(icsLines).toContain('END:VEVENT');
    expect(icsLines).toContain('END:VCALENDAR');
  });
});
