import { WebhookPayload } from '@actions/github/lib/interfaces';
import * as core from '@actions/core';
import * as github from '@actions/github';
import { createEvents, EventAttributes } from 'ics';
import { createIcsFile, createJsonFile, readJsonFile } from './utils/file';
import { commitAndPush } from './utils/git';
import { getTimeArray } from './utils/date';
import { stringToObject } from './utils/string';
import { Event } from './types';

const CALENDAR_NAME = process.env.CALENDAR_NAME;

/**
 * Converts a WebhookPayload issue object into an Issue object.
 * @param payload The WebhookPayload object to convert.
 * @returns An Issue object or undefined if the WebhookPayload object does not contain an issue property.
 */
export function convertToEvent(
  issue: Exclude<WebhookPayload['issue'], undefined>,
): Event {
  const { date, timezone, description } = stringToObject(issue.body || '');

  if (!date) {
    throw new Error(
      "The required 'date' field is missing from the issue body.",
    );
  }

  return {
    id: `${issue.id}`,
    number: issue.number,
    title: issue.title,
    description,
    date,
    timezone,
  };
}

/**
 * Converts an array of Issue objects into an iCalendar string.
 * @param issues An array of Issue objects to convert.
 * @returns A string in the iCalendar format
 */
export function convertToIcs(issues: Event[]): string {
  const events = issues.map((issue) => {
    const event: EventAttributes = {
      // productId: 'minung--ics',
      calName: CALENDAR_NAME,
      start: getTimeArray(issue.date, issue.timezone),
      startInputType: 'utc',
      duration: { hours: 24 },
      title: issue.title,
      description: issue.description,
      classification: 'PUBLIC',
      status: 'CONFIRMED',
      // busyStatus: 'BUSY',
    };
    return event;
  });

  const { error, value } = createEvents(events);

  if (error) {
    throw error;
  }

  return value || '';
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

export async function run(): Promise<void> {
  try {
    const { issue, action } = github.context.payload;

    if (!issue) {
      return;
    }

    const event = convertToEvent(issue);

    const issueDirPath = './data/events';

    // FIXME: 브랜치가 달라서 여기는 항상 {}만 리턴하는 버그가 있음
    const eventMap = readJsonFile(issueDirPath) as Record<string, Event>;
    switch (action) {
      case 'opened':
      case 'edited':
        eventMap[event.id] = event;
        break;
      case 'deleted':
      case 'closed':
        delete eventMap[event.id];
        break;
      default:
        break;
    }

    const icsString = convertToIcs(Object.values(eventMap));

    createIcsFile(issueDirPath, icsString);
    createJsonFile(issueDirPath, eventMap);
    commitAndPush(issueDirPath, 'Update events');
  } catch (error) {
    core.setFailed(getErrorMessage(error));
  }
}

run();
