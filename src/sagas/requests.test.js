import { call, put } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import {
  getRequestById as byId,
  getRequestByIdSuccess,
  getRequestsFailure,
  getRequestsSuccess,
  addRequestCommentSuccess,
  addRequestCommentFailed,
  addRequestComment as byIdComment
} from '../actions/requests';
import {
  getRequestById,
  getRequestByIdSaga,
  getRequests,
  getRequestSaga,
  addRequestCommentByIdSaga,
  addCommentById
} from './requests';

const requests = require('../mocks/requestsMocksData');

describe('requests saga', () => {
  describe('getRequests saga', () => {
    let generator;
    const error = 'error';
    const input = { filters: { priority: ['medium'], status: [], timeframe: {} }, offset: 0, limit: 20 };
    const returnData = {
      isFetching: false,
      items: requests,
      hasMore: true,
      offset: 0,
      newPosts: false,
      initialOffset: 0
    };

    it('tests the api call', async () => {
      fetch.mockResponseOnce(() => new Promise((resolve) => setTimeout(() => resolve({ body: { input } }), 100)));
      const response = await getRequests();
      await fetch(response.url);
      expect(fetch).toBeCalledWith(response.url);
      expect(response.status).toEqual(200);
      expect(response.statusText).toEqual('OK');
    });

    it('handles success', () => {
      generator = getRequestSaga(input);
      expect(generator.next().value).toEqual(call(getRequests, input));
      expect(generator.next({ body: returnData }).value).toEqual(put(getRequestsSuccess(returnData)));
    });

    it('handles failure', () => {
      generator = cloneableGenerator(getRequestSaga)(input);
      expect(generator.next().value).toEqual(call(getRequests, input));
      expect(generator.throw(error).value).toEqual(put(getRequestsFailure(error)));
    });
  });

  describe('getRequestById saga', () => {
    const request = requests[0];
    let generator;
    const error = 'error';

    it('tests the api call', async () => {
      fetch.mockResponseOnce(() => new Promise((resolve) => setTimeout(() => resolve({ body: { request } }), 100)));
      const response = await getRequestById(request.id);
      await fetch(response.url);
      expect(fetch).toBeCalledWith(response.url);
      expect(response.status).toEqual(200);
      expect(response.statusText).toEqual('OK');
    });

    it('handles success', () => {
      generator = cloneableGenerator(getRequestByIdSaga)(byId(request.id));
      expect(generator.next().value).toEqual(call(getRequestById, request.id));
      expect(generator.next({ body: request }).value).toEqual(put(getRequestByIdSuccess(request)));
    });

    it('handles failure', () => {
      generator = cloneableGenerator(getRequestByIdSaga)(byId(request.id));
      expect(generator.next().value).toEqual(call(getRequestById, request.id));
      expect(generator.throw(error).value).toEqual(put(getRequestsFailure(error)));
    });
  });

  describe('addCommentById', () => {
    const request = requests[0];
    const comment = request.worklog[0].text;
    let generator;
    const error = 'error';

    it('tests the api call', async () => {
      fetch.mockResponseOnce(() => new Promise((resolve) => setTimeout(() => resolve({ body: { request } }), 100)));
      const response = await addCommentById(request.id, { requestBody: { text: comment } });
      await fetch(response.url);
      expect(fetch).toBeCalledWith(response.url);
      expect(response.status).toEqual(200);
      expect(response.statusText).toEqual('OK');
    });

    it('handles success', () => {
      generator = cloneableGenerator(addRequestCommentByIdSaga)(byIdComment(request.id, comment));
      expect(generator.next().value).toEqual(call(addCommentById, request.id, comment));
      expect(generator.next({ body: request }).value).toEqual(put(addRequestCommentSuccess(request)));
    });

    it('handles failure', () => {
      generator = cloneableGenerator(addRequestCommentByIdSaga)(byIdComment(request.id, comment));
      expect(generator.next().value).toEqual(call(addCommentById, request.id, comment));
      expect(generator.throw(error).value).toEqual(put(addRequestCommentFailed(error)));
    });
  });
});
