import { call, put } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import {
  getSocAnnouncementFailure,
  getSocAnnouncementSuccess
} from '../actions/socAnnouncement';
import { getSecurityAnnouncement, getSocAnnouncement } from './socAnnouncement';

describe('socAnnouncement saga', () => {
  let generator;
  const apiResponse = { detailedDescription: 'message' };
  const error = 'error';

  it('tests the api call', async () => {
    fetch.mockResponseOnce(() => new Promise((resolve) => setTimeout(() => resolve({ body: { apiResponse } }), 100)));
    const response = await getSocAnnouncement();
    await fetch(response.url);
    expect(fetch).toBeCalledWith(response.url);
    expect(response.status).toEqual(200);
    expect(response.statusText).toEqual('OK');
  });

  it('handles success', () => {
    generator = cloneableGenerator(getSecurityAnnouncement)();
    expect(generator.next().value).toEqual(call(getSocAnnouncement));
    expect(generator.next({ body: apiResponse }).value).toEqual(
      put(getSocAnnouncementSuccess(apiResponse.detailedDescription))
    );
  });

  it('handles failure', () => {
    generator = cloneableGenerator(getSecurityAnnouncement)();
    expect(generator.next().value).toEqual(call(getSocAnnouncement));
    expect(generator.throw(error).value).toEqual(put(getSocAnnouncementFailure(error)));
  });
});
