import { call, put } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import { getProfileFailure, getProfileSuccess } from '../actions/profile';
import { profile } from '../mocks/profile.mocks';
import { initMatomo } from '../utils/matomoUtil';
import { getProfile, getProfileSaga } from './profile';

jest.mock('react-piwik');

describe('profile saga', () => {
  let generator;
  const apiResponse = { profile };
  const error = 'error';

  it('tests the api call', async () => {
    fetch.mockResponseOnce(() => new Promise((resolve) => setTimeout(() => resolve({ body: { apiResponse } }), 100)));
    const response = await getProfile();
    await fetch(response.url);
    expect(fetch).toBeCalledWith(response.url);
    expect(response.status).toEqual(200);
    expect(response.statusText).toEqual('OK');
  });

  it('handles success', () => {
    generator = cloneableGenerator(getProfileSaga)();
    expect(generator.next().value).toEqual(call(getProfile));
    expect(generator.next({ body: profile }).value).toEqual(call(initMatomo, profile));
    expect(generator.next({ body: apiResponse }).value).toEqual(put(getProfileSuccess(profile)));
    expect(generator.next().done).toBeTruthy();
  });

  it('handles failure', () => {
    generator = cloneableGenerator(getProfileSaga)();
    expect(generator.next().value).toEqual(call(getProfile));
    expect(generator.throw(error).value).toEqual(put(getProfileFailure(error)));
  });
});
