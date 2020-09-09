/* eslint-disable no-param-reassign */
import escapeStringRegexp from 'escape-string-regexp';
import isObject from 'isobject';
import api from '../schemas';

export const checkSchema = (schemaName, body) => {
  const assertSchema = api.assertSchema(schemaName, '1.0.0');
  assertSchema(body);
};

const toQueryString = (filter) => {
  if (Array.isArray(filter)) return filter.map((x) => `"${x}"`).join(',');
  return filter ? `"${filter}"` : '';
};

const extractTimeframeArg = (timeframeArg) => {
  const timeframe = {};
  if (!isObject(timeframeArg)) {
    timeframe.isRegex = false;
    timeframe.qs = timeframeArg || '';
  } else {
    timeframe.isRegex = timeframeArg.isRegex || false;
    timeframe.qs = timeframeArg.qs || '';
  }
  return timeframe;
};

export const streamURL = (args) => {
  args = args || {};
  const type = args.type || null;
  const interest = args.interest || false;
  const offset = args.offset || '';
  const limit = args.limit || '20';

  const typeQs = toQueryString(type);

  let offsetQs = '?';
  if (offset !== '') offsetQs = `?offset=${offset}&`;
  return (
    `${Cypress.config().baseUrl}/web/v1/api/stream${offsetQs}` +
    `limit=${limit}&filters={"type":[${typeQs}],"interest":[${interest ? '"starred"' : ''}]}`
  );
};

export const investigationsURL = (args) => {
  args = args || {};
  const limit = args.limit || '20';
  const offset = args.offset || '0';

  const statusQs = toQueryString(args.status || null);
  const priorityQs = toQueryString(args.priority || null);
  const timeframe = extractTimeframeArg(args.timeframe);

  const url =
    `${Cypress.config().baseUrl}/web/v1/api/investigations?offset=${offset}` +
    `&limit=${limit}&filters={"priority":[${priorityQs}],` +
    `"status":[${statusQs}],"timeframe":{timeframeToken}}`;

  if (!timeframe.isRegex) return url.replace('timeframeToken', timeframe.qs);
  return new RegExp(escapeStringRegexp(url).replace('timeframeToken', timeframe.qs));
};

export const requestsURL = (args) => {
  args = args || {};
  const limit = args.limit || '20';
  const offset = args.offset || '0';
  const status = toQueryString(args.status || null);
  const timeframe = extractTimeframeArg(args.timeframe);

  const url =
    `${Cypress.config().baseUrl}/web/v1/api/requests?offset=${offset}` +
    `&limit=${limit}&filters={"status":[${status}],"timeframe":{timeframeToken}}`;

  if (!timeframe.isRegex) return url.replace('timeframeToken', timeframe.qs);
  return new RegExp(escapeStringRegexp(url).replace('timeframeToken', timeframe.qs));
};
