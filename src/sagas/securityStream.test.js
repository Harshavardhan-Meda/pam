import { call, put } from 'redux-saga/effects';
import {
  getSecurityStreamFailure,
  getSecurityStreamSuccess
} from '../actions/securityStream';
import { getSecurityStream, getStream } from './securityStream';

const stream = require('../mocks/streamMockData');

describe('securityStream saga', () => {
  let generator;
  const error = 'error';
  const input = { filters: {}, offset: '', limit: 20 };
  const returnData = {
    isFetching: false,
    items: stream,
    hasMore: true,
    offset: '',
    newPosts: false,
    initialOffset: ''
  };

  it('tests the api call', async () => {
    fetch.mockResponseOnce(() => new Promise((resolve) => setTimeout(() => resolve({ body: { input } }), 100)));
    const response = await getStream(input);
    await fetch(response.url);
    expect(fetch).toBeCalledWith(response.url);
    expect(response.status).toEqual(200);
    expect(response.statusText).toEqual('OK');
  });

  it('handles success', () => {
    generator = getSecurityStream(input);
    expect(generator.next().value).toEqual(call(getStream, input));
    expect(generator.next({ body: returnData }).value).toEqual(put(getSecurityStreamSuccess(returnData)));
  });

  it('handles failure', () => {
    generator = getSecurityStream(input);
    expect(generator.next().value).toEqual(call(getStream, input));
    expect(generator.throw(error).value).toEqual(put(getSecurityStreamFailure(error)));
  });
});
