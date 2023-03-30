import { Event } from './types';
import { convertToEvent, convertToIcs } from './index';

describe('convertToIssue', () => {
  test('should convert webhook payload to issue', () => {
    const issue = {
      id: 123,
      number: 1,
      title: 'Test Issue',
      body: 'description: Test description\ndate: 2023-03-28\ntimezone: UTC',
    };

    const expectedEvent: Event = {
      id: '123',
      number: 1,
      title: 'Test Issue',
      description: 'Test description',
      date: '2023-03-28',
      timezone: 'UTC',
    };

    expect(convertToEvent(issue)).toEqual(expectedEvent);
  });

  test('should throw error if date field is missing in issue body', () => {
    const issue = {
      id: 123,
      number: 1,
      title: 'Test Issue',
      body: 'description: Test description\ntimezone: UTC',
    };

    expect(() => convertToEvent(issue)).toThrow(
      "The required 'date' field is missing from the issue body.",
    );
  });
});

describe('convertToIcs', () => {
  test('should convert array of issues to iCalendar string', () => {
    const events: Event[] = [
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

    const icsString = convertToIcs(events);
    const icsLines = icsString.split('\r\n');
    expect(icsLines).toContain('BEGIN:VCALENDAR');
    expect(icsLines).toContain('BEGIN:VEVENT');
    expect(icsLines).toContain('SUMMARY:Test Issue 1');
    expect(icsLines).toContain('SUMMARY:Test Issue 2');
    expect(icsLines).toContain('END:VEVENT');
    expect(icsLines).toContain('END:VCALENDAR');
  });
});
