import { call, put } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import { getAlertConFailure, getAlertConSuccess } from '../actions/alertCon';
import { getAlertCon, getAlertConStatus } from './alertCon';

beforeEach(() => {
  fetch.resetMocks();
});

describe('alertCon saga', () => {
  let generator;
  const apiResponse = { level: 'LEVEL_3' };
  const error = 'error';

  it('tests the api call', async () => {
    fetch.mockResponseOnce(() => new Promise((resolve) => setTimeout(() => resolve({ body: { apiResponse } }), 100)));
    const response = await getAlertCon();
    await fetch(response.url);
    expect(fetch).toBeCalledWith(response.url);
    expect(response.status).toEqual(200);
    expect(response.statusText).toEqual('OK');
  });

  it('handles success', () => {
    generator = cloneableGenerator(getAlertConStatus)(apiResponse.level);
    expect(generator.next().value).toEqual(call(getAlertCon));
    expect(generator.next({ body: apiResponse }).value).toEqual(put(getAlertConSuccess(apiResponse.level)));
    expect(generator.next().done).toBeTruthy();
  });

  it('handles failure', () => {
    generator = cloneableGenerator(getAlertConStatus)(apiResponse.level);
    expect(generator.next().value).toEqual(call(getAlertCon));
    expect(generator.throw(error).value).toEqual(put(getAlertConFailure(error)));
  });
});
